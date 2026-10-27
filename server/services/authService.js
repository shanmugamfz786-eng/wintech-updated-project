const crypto = require('crypto');

// In-memory set of revoked tokens (cleared on logout)
const revokedTokens = new Set();

// Failed login attempt tracking for brute-force protection
const failedLoginAttempts = new Map();
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function base64UrlEncode(str) {
  return Buffer.from(str)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function base64UrlDecode(str) {
  let s = str.replace(/-/g, '+').replace(/_/g, '/');
  while (s.length % 4) s += '=';
  return Buffer.from(s, 'base64').toString('utf8');
}

function getJwtSecret() {
  return process.env.ADMIN_SECRET_KEY || 'wintech-admin-local-dev-secret-key-32chars!!';
}

/**
 * Generate a cryptographically signed HMAC-SHA256 session token
 */
function generateAdminToken(username = 'admin', ttlSeconds = 2 * 3600) {
  const header = base64UrlEncode(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const now = Math.floor(Date.now() / 1000);
  const payload = base64UrlEncode(
    JSON.stringify({
      sub: username,
      role: 'admin',
      iat: now,
      exp: now + ttlSeconds,
      jti: crypto.randomBytes(8).toString('hex'),
    })
  );
  const signature = crypto
    .createHmac('sha256', getJwtSecret())
    .update(`${header}.${payload}`)
    .digest('base64url');

  return `${header}.${payload}.${signature}`;
}

/**
 * Verify token authenticity, expiration, and revocation status
 */
function verifyAdminToken(token) {
  if (!token || typeof token !== 'string') return null;
  if (revokedTokens.has(token)) return null;

  const parts = token.split('.');
  if (parts.length !== 3) return null;

  const [headerB64, payloadB64, signatureB64] = parts;
  const expectedSignature = crypto
    .createHmac('sha256', getJwtSecret())
    .update(`${headerB64}.${payloadB64}`)
    .digest('base64url');

  if (signatureB64.length !== expectedSignature.length) return null;
  if (!crypto.timingSafeEqual(Buffer.from(signatureB64), Buffer.from(expectedSignature))) {
    return null;
  }

  try {
    const payload = JSON.parse(base64UrlDecode(payloadB64));
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) {
      return null; // Expired session
    }
    return payload;
  } catch (_) {
    return null;
  }
}

/**
 * Invalidate a token on logout
 */
function revokeAdminToken(token) {
  if (token && typeof token === 'string') {
    revokedTokens.add(token);
  }
}

/**
 * Check brute-force lockout for IP
 */
function isIpLockedOut(ip) {
  const record = failedLoginAttempts.get(ip);
  if (!record) return false;
  if (Date.now() - record.lastAttempt > LOCKOUT_WINDOW_MS) {
    failedLoginAttempts.delete(ip);
    return false;
  }
  return record.count >= MAX_FAILED_ATTEMPTS;
}

function recordFailedLogin(ip) {
  const record = failedLoginAttempts.get(ip) || { count: 0, lastAttempt: Date.now() };
  record.count += 1;
  record.lastAttempt = Date.now();
  failedLoginAttempts.set(ip, record);
}

function clearFailedLogins(ip) {
  failedLoginAttempts.delete(ip);
}

/**
 * Authenticate admin credentials
 */
function authenticateAdmin(username, password) {
  const validUser = process.env.ADMIN_USERNAME || 'admin';
  const validPass = process.env.ADMIN_PASSWORD || 'wintech@2026';

  if (!username || !password) return false;

  const uPadded = String(username).padEnd(64).slice(0, 64);
  const vUPadded = validUser.padEnd(64).slice(0, 64);
  const pPadded = String(password).padEnd(64).slice(0, 64);
  const vPPadded = validPass.padEnd(64).slice(0, 64);

  const uMatch = crypto.timingSafeEqual(Buffer.from(uPadded), Buffer.from(vUPadded));
  const pMatch = crypto.timingSafeEqual(Buffer.from(pPadded), Buffer.from(vPPadded));

  return uMatch && pMatch && username === validUser && password === validPass;
}

/**
 * Express middleware to protect admin routes
 */
function requireAdminAuth(req, res, next) {
  // 1. Check Bearer token or x-admin-token
  const authHeader = req.headers['authorization'];
  let token = null;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.slice(7).trim();
  } else if (req.headers['x-admin-token']) {
    token = req.headers['x-admin-token'];
  }

  if (token) {
    const payload = verifyAdminToken(token);
    if (payload) {
      req.admin = payload;
      req.token = token;
      return next();
    }
  }

  // 2. Server-to-server API Key check (for CLI/backend scripts)
  const serverKey = process.env.ADMIN_SECRET_KEY;
  const providedKey = req.headers['x-admin-key'] || req.query.admin_key;
  if (serverKey && providedKey && providedKey === serverKey) {
    req.admin = { sub: 'api-key', role: 'admin' };
    return next();
  }

  return res.status(401).json({
    success: false,
    error: 'Unauthorized: Admin authentication required.',
    code: 'AUTH_REQUIRED',
  });
}

module.exports = {
  generateAdminToken,
  verifyAdminToken,
  revokeAdminToken,
  authenticateAdmin,
  requireAdminAuth,
  isIpLockedOut,
  recordFailedLogin,
  clearFailedLogins,
};
