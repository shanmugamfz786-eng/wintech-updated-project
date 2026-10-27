const express = require('express');
const router = express.Router();
const { getPool, isTiDBConnected, memoryDb, saveLocalEnquiries } = require('../config/db');
const { sendEnquiryNotification } = require('../services/emailService');
const { requireAdminAuth } = require('../services/authService');

// Simple in-memory rate limiting per IP (10 requests per 15 minutes)
const ipSubmissionTracker = new Map();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 10;

function checkRateLimit(ip) {
  const now = Date.now();
  const timestamps = ipSubmissionTracker.get(ip) || [];
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }
  recent.push(now);
  ipSubmissionTracker.set(ip, recent);
  return true;
}

// POST /api/enquiries - Submit enquiry
router.post('/', async (req, res) => {
  try {
    // 1. Anti-spam honeypot trap
    const honeypot = req.body.website || req.body._gotcha;
    if (honeypot) {
      // Silently accept spam bot submissions without storing
      return res.status(201).json({
        success: true,
        message: 'Enquiry received successfully!',
      });
    }

    // 2. IP Rate Limiting check
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
    if (!checkRateLimit(clientIp)) {
      return res.status(429).json({
        success: false,
        error: 'Too many submissions. Please wait a few minutes before trying again.',
      });
    }

    // 3. Flexible field extraction & sanitization
    const rawName = req.body.name || req.body.fullName;
    const rawPhone = req.body.phone || req.body.phoneNumber;
    const rawEmail = req.body.email || req.body.emailAddress;
    const rawInterest = req.body.interest || req.body.interestedIn || req.body.serviceType;
    const rawMessage = req.body.message;

    // Sanitize string helper (trim & strip HTML tags)
    const sanitize = (str) => (typeof str === 'string' ? str.trim().replace(/[<>]/g, '') : '');

    const name = sanitize(rawName);
    const phone = sanitize(rawPhone);
    const email = sanitize(rawEmail);
    const interest = sanitize(rawInterest);
    const message = sanitize(rawMessage);

    // 4. Strict Validation
    if (!name || name.length < 2) {
      return res.status(400).json({
        success: false,
        error: 'Full name is required (minimum 2 characters).',
      });
    }

    // Validate phone number (accepts Indian format 10 digits, optional +91 or 0)
    const phoneDigitsOnly = phone.replace(/\D/g, '');
    if (phoneDigitsOnly.length < 10 || phoneDigitsOnly.length > 13) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a valid 10-digit phone number.',
      });
    }

    // Validate email if provided
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a valid email address.',
      });
    }

    if (!interest) {
      return res.status(400).json({
        success: false,
        error: 'Please select an area of interest.',
      });
    }

    // 5. Store in TiDB Database or Memory DB Fallback
    const pool = getPool();
    if (pool && isTiDBConnected()) {
      const [result] = await pool.query(
        'INSERT INTO enquiries (name, phone, email, interest, message) VALUES (?, ?, ?, ?, ?)',
        [name, phone, email || '', interest, message || '']
      );

      // Safe logging without exposing sensitive phone number
      console.log(`[Enquiry API] New enquiry recorded in TiDB (ID: ${result.insertId}, Category: ${interest})`);

      // Send email notification ONLY after enquiry has been successfully saved to DB
      // Failure to deliver email will NOT roll back the DB or report false failure to customer
      sendEnquiryNotification({
        id: result.insertId,
        name,
        phone,
        email,
        interest,
        message,
        createdAt: new Date(),
      }).catch((err) => {
        console.error(`[Email Notification] Safe background catch: ${err.message}`);
      });

      return res.status(201).json({
        success: true,
        message: 'Enquiry submitted successfully to database!',
        data: {
          id: result.insertId,
          name,
          interest,
        },
      });
    } else {
      // Local Persistent Store Fallback (persists to server/data/enquiries.json)
      const maxId = memoryDb.enquiries.reduce((max, e) => (e.id > max ? e.id : max), 0);
      const newEnquiry = {
        id: maxId + 1,
        name,
        phone,
        email: email || '',
        interest,
        message: message || '',
        status: 'new',
        admin_notes: '',
        created_at: new Date().toISOString(),
      };
      memoryDb.enquiries.unshift(newEnquiry);
      saveLocalEnquiries(memoryDb.enquiries);

      console.log(`[Enquiry API] New enquiry recorded in Local Store (ID: ${newEnquiry.id}, Category: ${interest})`);

      // Send email notification ONLY after enquiry has been successfully saved
      // Failure to deliver email will NOT roll back store or report false failure to customer
      sendEnquiryNotification({
        id: newEnquiry.id,
        name,
        phone,
        email,
        interest,
        message,
        createdAt: newEnquiry.created_at,
      }).catch((err) => {
        console.error(`[Email Notification] Safe background catch: ${err.message}`);
      });

      return res.status(201).json({
        success: true,
        message: 'Enquiry received successfully!',
        data: {
          id: newEnquiry.id,
          name: newEnquiry.name,
          interest: newEnquiry.interest,
        },
      });
    }
  } catch (error) {
    console.error('Error in POST /api/enquiries:', error.message);
    return res.status(500).json({
      success: false,
      error: 'Internal server error while processing your enquiry. Please try again.',
    });
  }
});

// GET /api/enquiries - Retrieve enquiries (Protected: requires admin Bearer token or x-admin-key)
router.get('/', requireAdminAuth, async (req, res) => {
  try {

    const pool = getPool();
    if (pool && isTiDBConnected()) {
      const [rows] = await pool.query(
        'SELECT * FROM enquiries ORDER BY created_at DESC LIMIT 50'
      );
      return res.json({ success: true, count: rows.length, data: rows });
    } else {
      return res.json({
        success: true,
        count: memoryDb.enquiries.length,
        data: memoryDb.enquiries
      });
    }
  } catch (error) {
    console.error('Error in GET /api/enquiries:', error);
    return res.status(500).json({ success: false, error: 'Database query failed' });
  }
});

module.exports = router;
