const nodemailer = require('nodemailer');

let customTransporter = null;

/**
 * Mask email address for safe logging (e.g. "ad***@example.com")
 */
function maskEmail(email) {
  if (!email || typeof email !== 'string') return 'unknown';
  const parts = email.split('@');
  if (parts.length !== 2) return '***';
  const name = parts[0];
  const domain = parts[1];
  const maskedName = name.length <= 2 ? name[0] + '*' : name.slice(0, 2) + '*'.repeat(name.length - 2);
  return `${maskedName}@${domain}`;
}

/**
 * Determine if required SMTP configuration is present and not dummy placeholders
 */
function isEmailConfigured() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) return false;

  const placeholderPatterns = [
    'your-business-email',
    'your_business_email',
    'your_email',
    'your_actual',
    'your-actual',
    'your-16-character-app-password',
    'your_actual_16_character_app_password',
    'your_app_specific_password',
    'un_gmail',
    'un_app_password',
    'notification_receive_panra_email',
  ];

  return !placeholderPatterns.some(
    (pattern) => user.toLowerCase().includes(pattern) || pass.toLowerCase().includes(pattern)
  );
}

/**
 * Get or create the Nodemailer transport instance
 */
function getTransporter() {
  if (customTransporter) {
    return customTransporter;
  }

  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
  const isSecure = process.env.SMTP_SECURE === 'true' || port === 465;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  return nodemailer.createTransport({
    host,
    port,
    secure: isSecure,
    auth: {
      user,
      pass,
    },
    // Connection timeout safety (10 seconds)
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });
}

/**
 * Override transporter for testing (e.g., jsonTransport or mock)
 */
function setTestTransporter(transporter) {
  customTransporter = transporter;
}

/**
 * Reset test transporter back to default
 */
function resetTransporter() {
  customTransporter = null;
}

/**
 * Send admin notification email for a successfully saved enquiry
 * @param {Object} enquiry - Sanitized enquiry details
 * @returns {Promise<{ sent: boolean, skipped?: boolean, error?: string, messageId?: string }>}
 */
async function sendEnquiryNotification(enquiry) {
  // If no custom transporter and environment variables are incomplete or placeholders, safely skip
  if (!customTransporter && !isEmailConfigured()) {
    const user = process.env.SMTP_USER || '';
    if (user.includes('your-business-email') || user.includes('your_email')) {
      console.log('[Email Notification] SMTP placeholders detected in server/.env. Replace with your actual Gmail and 16-character App Password to enable live notifications.');
    } else {
      console.log('[Email Notification] SMTP credentials not configured in server/.env (notifications safely disabled)');
    }
    return { sent: false, skipped: true, reason: 'SMTP credentials not configured or placeholder detected' };
  }

  const sender = process.env.SMTP_USER || 'no-reply@wintechdigitalpartner.com';
  const recipient = process.env.NOTIFICATION_RECIPIENT || process.env.SMTP_USER;

  if (!recipient) {
    console.warn('[Email Notification] No recipient address configured (NOTIFICATION_RECIPIENT). Notification skipped.');
    return { sent: false, skipped: true, reason: 'Missing NOTIFICATION_RECIPIENT' };
  }

  const submissionDate = enquiry.createdAt ? new Date(enquiry.createdAt) : new Date();
  const formattedTime = submissionDate.toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'medium',
  });

  const subject = `New WinTech Enquiry: [${enquiry.interest || 'General'}] from ${enquiry.name}`;

  const textBody = `
=====================================================
NEW CONTACT ENQUIRY - WiNTech Digital Partner
=====================================================

Customer Details:
-----------------
Name:        ${enquiry.name}
Phone:       ${enquiry.phone}
Email:       ${enquiry.email ? enquiry.email : '(Not provided)'}
Category:    ${enquiry.interest}
Date & Time: ${formattedTime} (IST)

Customer Message:
-----------------
${enquiry.message ? enquiry.message : '(No message provided)'}

=====================================================
This is an automated notification from the WinTech Digital Partner website backend.
Database Record ID: ${enquiry.id || 'N/A'}
=====================================================
`.trim();

  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; margin: 0; padding: 24px; color: #0f172a; }
    .email-container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
    .email-header { background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%); color: #ffffff; padding: 24px 32px; }
    .email-header h1 { margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.02em; }
    .email-header p { margin: 4px 0 0 0; color: #93c5fd; font-size: 13px; }
    .email-body { padding: 32px; }
    .badge { display: inline-block; background: #e0f2fe; color: #0369a1; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: 600; margin-bottom: 20px; }
    .detail-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    .detail-table td { padding: 10px 12px; font-size: 14px; border-bottom: 1px solid #f1f5f9; }
    .detail-table td.label { font-weight: 600; color: #64748b; width: 120px; }
    .detail-table td.value { color: #0f172a; font-weight: 500; }
    .message-box { background: #f8fafc; border-left: 4px solid #2563eb; padding: 16px; border-radius: 0 8px 8px 0; margin-top: 8px; font-size: 14px; line-height: 1.6; color: #334155; white-space: pre-wrap; }
    .email-footer { background: #f8fafc; padding: 16px 32px; font-size: 12px; color: #94a3b8; text-align: center; border-top: 1px solid #e2e8f0; }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      <h1>New Customer Enquiry</h1>
      <p>WiNTech Digital Partner — Contact Form Submission</p>
    </div>
    <div class="email-body">
      <div class="badge">${enquiry.interest || 'General Enquiry'}</div>
      <table class="detail-table">
        <tr>
          <td class="label">Full Name:</td>
          <td class="value"><strong>${enquiry.name}</strong></td>
        </tr>
        <tr>
          <td class="label">Phone:</td>
          <td class="value"><a href="tel:${enquiry.phone}" style="color: #2563eb; text-decoration: none;">${enquiry.phone}</a></td>
        </tr>
        <tr>
          <td class="label">Email:</td>
          <td class="value">${enquiry.email ? `<a href="mailto:${enquiry.email}" style="color: #2563eb; text-decoration: none;">${enquiry.email}</a>` : '<span style="color: #94a3b8;">Not provided</span>'}</td>
        </tr>
        <tr>
          <td class="label">Category:</td>
          <td class="value">${enquiry.interest}</td>
        </tr>
        <tr>
          <td class="label">Received At:</td>
          <td class="value">${formattedTime} IST</td>
        </tr>
      </table>

      <h3 style="font-size: 14px; font-weight: 600; color: #475569; margin: 0 0 8px 0;">Customer Message:</h3>
      <div class="message-box">
        ${enquiry.message ? enquiry.message : '<em style="color: #94a3b8;">No message entered.</em>'}
      </div>
    </div>
    <div class="email-footer">
      Automated notification from WinTech Digital Partner website • Record ID: ${enquiry.id || 'N/A'}
    </div>
  </div>
</body>
</html>
`.trim();

  try {
    const transporter = getTransporter();
    const mailOptions = {
      from: `"WinTech Notifications" <${sender}>`,
      to: recipient,
      subject,
      text: textBody,
      html: htmlBody,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`[Email Notification] Admin email successfully dispatched to ${maskEmail(recipient)} (Message ID: ${info.messageId || 'sent'})`);
    return {
      sent: true,
      messageId: info.messageId,
      envelope: info.envelope,
      message: info.message,
    };
  } catch (err) {
    // Safe error logging: NEVER print password or full transport credentials
    console.error(`[Email Notification] Delivery failed: ${err.message}`);
    return {
      sent: false,
      error: err.message,
    };
  }
}

module.exports = {
  isEmailConfigured,
  sendEnquiryNotification,
  setTestTransporter,
  resetTransporter,
};
