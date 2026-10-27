const express = require('express');
const router = express.Router();
const {
  authenticateAdmin,
  generateAdminToken,
  revokeAdminToken,
  requireAdminAuth,
  isIpLockedOut,
  recordFailedLogin,
  clearFailedLogins,
} = require('../services/authService');
const { getPool, isTiDBConnected, memoryDb, saveLocalEnquiries } = require('../config/db');

// Allowed status values for enquiries
const ALLOWED_STATUSES = ['new', 'contacted', 'in-progress', 'resolved', 'closed'];

// =============================================================================
// AUTHENTICATION ROUTES
// =============================================================================

/**
 * POST /api/admin/login - Authenticate admin and return secure session token
 */
router.post('/login', async (req, res) => {
  try {
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';

    if (isIpLockedOut(clientIp)) {
      return res.status(429).json({
        success: false,
        error: 'Too many failed login attempts. Please wait 15 minutes before trying again.',
      });
    }

    const { username, password } = req.body || {};

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        error: 'Username and password are required.',
      });
    }

    const isValid = authenticateAdmin(username.trim(), password);

    if (!isValid) {
      recordFailedLogin(clientIp);
      return res.status(401).json({
        success: false,
        error: 'Invalid admin username or password.',
      });
    }

    clearFailedLogins(clientIp);
    const token = generateAdminToken(username.trim(), 2 * 3600); // 2 hours

    return res.json({
      success: true,
      message: 'Admin authentication successful.',
      token,
      admin: {
        username: username.trim(),
        role: 'admin',
      },
    });
  } catch (err) {
    console.error('Error in admin login:', err.message);
    return res.status(500).json({ success: false, error: 'Internal authentication error.' });
  }
});

/**
 * POST /api/admin/logout - Invalidate active session token
 */
router.post('/logout', (req, res) => {
  const authHeader = req.headers['authorization'];
  let token = null;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.slice(7).trim();
  } else if (req.headers['x-admin-token']) {
    token = req.headers['x-admin-token'];
  }

  if (token) {
    revokeAdminToken(token);
  }

  return res.json({
    success: true,
    message: 'Logged out successfully.',
  });
});

/**
 * GET /api/admin/me - Verify current admin session
 */
router.get('/me', requireAdminAuth, (req, res) => {
  return res.json({
    success: true,
    admin: req.admin,
  });
});

// =============================================================================
// ENQUIRY MANAGEMENT ROUTES (Protected by requireAdminAuth)
// =============================================================================

/**
 * GET /api/admin/enquiries - List, search, filter, and paginate enquiries
 */
router.get('/enquiries', requireAdminAuth, async (req, res) => {
  try {
    const {
      search = '',
      status = 'all',
      interest = 'all',
      page = 1,
      limit = 25,
    } = req.query;

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 25));
    const offset = (pageNum - 1) * limitNum;
    const searchTerm = String(search).trim().toLowerCase();

    const pool = getPool();

    if (pool && isTiDBConnected()) {
      // Build parameterized TiDB SQL query
      const whereClauses = [];
      const queryParams = [];

      if (searchTerm) {
        whereClauses.push('(LOWER(name) LIKE ? OR LOWER(email) LIKE ? OR phone LIKE ? OR LOWER(message) LIKE ?)');
        const searchPattern = `%${searchTerm}%`;
        queryParams.push(searchPattern, searchPattern, searchPattern, searchPattern);
      }

      if (status && status !== 'all' && ALLOWED_STATUSES.includes(status)) {
        whereClauses.push('status = ?');
        queryParams.push(status);
      }

      if (interest && interest !== 'all') {
        whereClauses.push('interest = ?');
        queryParams.push(interest);
      }

      const whereSql = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

      // Count query
      const [countResult] = await pool.query(
        `SELECT COUNT(*) as total FROM enquiries ${whereSql}`,
        queryParams
      );
      const total = countResult[0]?.total || 0;

      // Stats query
      const [statsResult] = await pool.query(`
        SELECT 
          COUNT(*) as totalCount,
          SUM(CASE WHEN status = 'new' OR status IS NULL THEN 1 ELSE 0 END) as newCount,
          SUM(CASE WHEN status = 'in-progress' OR status = 'contacted' THEN 1 ELSE 0 END) as inProgressCount,
          SUM(CASE WHEN status = 'resolved' OR status = 'closed' THEN 1 ELSE 0 END) as resolvedCount
        FROM enquiries
      `);

      // Data query
      const dataParams = [...queryParams, limitNum, offset];
      const [rows] = await pool.query(
        `SELECT id, name, phone, email, interest, message, COALESCE(status, 'new') as status, admin_notes, created_at 
         FROM enquiries 
         ${whereSql} 
         ORDER BY created_at DESC 
         LIMIT ? OFFSET ?`,
        dataParams
      );

      return res.json({
        success: true,
        page: pageNum,
        limit: limitNum,
        total,
        stats: statsResult[0] || {},
        data: rows,
      });
    } else {
      // Local Persistent Storage Filter
      let filtered = [...memoryDb.enquiries];

      // Global Stats across all local enquiries
      const stats = {
        totalCount: filtered.length,
        newCount: filtered.filter((e) => !e.status || e.status === 'new').length,
        inProgressCount: filtered.filter((e) => e.status === 'in-progress' || e.status === 'contacted').length,
        resolvedCount: filtered.filter((e) => e.status === 'resolved' || e.status === 'closed').length,
      };

      if (searchTerm) {
        filtered = filtered.filter(
          (e) =>
            (e.name && e.name.toLowerCase().includes(searchTerm)) ||
            (e.email && e.email.toLowerCase().includes(searchTerm)) ||
            (e.phone && e.phone.includes(searchTerm)) ||
            (e.message && e.message.toLowerCase().includes(searchTerm))
        );
      }

      if (status && status !== 'all') {
        filtered = filtered.filter((e) => (e.status || 'new') === status);
      }

      if (interest && interest !== 'all') {
        filtered = filtered.filter((e) => e.interest === interest);
      }

      const total = filtered.length;
      const paginated = filtered.slice(offset, offset + limitNum);

      return res.json({
        success: true,
        page: pageNum,
        limit: limitNum,
        total,
        stats,
        data: paginated,
      });
    }
  } catch (err) {
    console.error('Error in GET /api/admin/enquiries:', err.message);
    return res.status(500).json({ success: false, error: 'Failed to retrieve enquiries.' });
  }
});

/**
 * PATCH /api/admin/enquiries/:id - Update status and admin notes for an enquiry
 */
router.patch('/enquiries/:id', requireAdminAuth, async (req, res) => {
  try {
    const enquiryId = parseInt(req.params.id, 10);
    if (isNaN(enquiryId)) {
      return res.status(400).json({ success: false, error: 'Invalid enquiry ID.' });
    }

    const { status, adminNotes } = req.body || {};

    if (status && !ALLOWED_STATUSES.includes(status)) {
      return res.status(400).json({
        success: false,
        error: `Invalid status. Allowed values: ${ALLOWED_STATUSES.join(', ')}`,
      });
    }

    const sanitizedNotes = typeof adminNotes === 'string' ? adminNotes.trim().replace(/[<>]/g, '') : undefined;

    const pool = getPool();
    if (pool && isTiDBConnected()) {
      // TiDB update
      const updates = [];
      const params = [];

      if (status) {
        updates.push('status = ?');
        params.push(status);
      }
      if (sanitizedNotes !== undefined) {
        updates.push('admin_notes = ?');
        params.push(sanitizedNotes);
      }

      if (updates.length === 0) {
        return res.status(400).json({ success: false, error: 'No update fields provided.' });
      }

      params.push(enquiryId);
      const [result] = await pool.query(
        `UPDATE enquiries SET ${updates.join(', ')} WHERE id = ?`,
        params
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ success: false, error: 'Enquiry not found.' });
      }

      const [updatedRows] = await pool.query('SELECT * FROM enquiries WHERE id = ?', [enquiryId]);
      return res.json({
        success: true,
        message: 'Enquiry updated successfully.',
        data: updatedRows[0],
      });
    } else {
      // Local Persistent Storage update
      const index = memoryDb.enquiries.findIndex((e) => e.id === enquiryId);
      if (index === -1) {
        return res.status(404).json({ success: false, error: 'Enquiry not found.' });
      }

      if (status) {
        memoryDb.enquiries[index].status = status;
      }
      if (sanitizedNotes !== undefined) {
        memoryDb.enquiries[index].admin_notes = sanitizedNotes;
      }

      saveLocalEnquiries(memoryDb.enquiries);

      return res.json({
        success: true,
        message: 'Enquiry updated successfully.',
        data: memoryDb.enquiries[index],
      });
    }
  } catch (err) {
    console.error('Error in PATCH /api/admin/enquiries/:id:', err.message);
    return res.status(500).json({ success: false, error: 'Failed to update enquiry.' });
  }
});

/**
 * DELETE /api/admin/enquiries/:id - Remove an enquiry
 */
router.delete('/enquiries/:id', requireAdminAuth, async (req, res) => {
  try {
    const enquiryId = parseInt(req.params.id, 10);
    if (isNaN(enquiryId)) {
      return res.status(400).json({ success: false, error: 'Invalid enquiry ID.' });
    }

    const pool = getPool();
    if (pool && isTiDBConnected()) {
      const [result] = await pool.query('DELETE FROM enquiries WHERE id = ?', [enquiryId]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ success: false, error: 'Enquiry not found.' });
      }
      return res.json({ success: true, message: 'Enquiry deleted successfully.' });
    } else {
      const index = memoryDb.enquiries.findIndex((e) => e.id === enquiryId);
      if (index === -1) {
        return res.status(404).json({ success: false, error: 'Enquiry not found.' });
      }
      memoryDb.enquiries.splice(index, 1);
      saveLocalEnquiries(memoryDb.enquiries);
      return res.json({ success: true, message: 'Enquiry deleted successfully.' });
    }
  } catch (err) {
    console.error('Error in DELETE /api/admin/enquiries/:id:', err.message);
    return res.status(500).json({ success: false, error: 'Failed to delete enquiry.' });
  }
});

module.exports = router;
