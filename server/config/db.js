const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

let pool = null;
let isConnectedToTiDB = false;

// -----------------------------------------------------------------------------
// Safe Local File Persistence (Survives server restarts during local dev)
// -----------------------------------------------------------------------------
const DATA_DIR = path.join(__dirname, '../data');
const LOCAL_ENQUIRIES_FILE = path.join(DATA_DIR, 'enquiries.json');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function loadLocalEnquiries() {
  ensureDataDir();
  if (fs.existsSync(LOCAL_ENQUIRIES_FILE)) {
    try {
      const content = fs.readFileSync(LOCAL_ENQUIRIES_FILE, 'utf8');
      const data = JSON.parse(content);
      if (Array.isArray(data)) return data;
    } catch (err) {
      console.warn('⚠️ Could not parse local enquiries file, initializing empty store.');
    }
  }
  return [];
}

function saveLocalEnquiries(enquiries) {
  ensureDataDir();
  try {
    fs.writeFileSync(LOCAL_ENQUIRIES_FILE, JSON.stringify(enquiries, null, 2), 'utf8');
  } catch (err) {
    console.error('❌ Failed to save enquiries to local file:', err.message);
  }
}

// Memory database with local file-backed persistence for offline operation
const memoryDb = {
  enquiries: loadLocalEnquiries(),
  courses: [
    { id: 1, title: 'MERN Stack Development', category: 'Web Development', icon: 'react' },
    { id: 2, title: 'Python Programming', category: 'Programming', icon: 'python' },
    { id: 3, title: 'Java Development', category: 'Software Development', icon: 'java' },
    { id: 4, title: 'Generative AI', category: 'AI & Data', icon: 'sparkle' },
    { id: 5, title: 'AI & Machine Learning', category: 'AI & Data', icon: 'brain' },
    { id: 6, title: 'Full Stack Development', category: 'Web Development', icon: 'layers' },
    { id: 7, title: 'Frontend Development', category: 'Web Development', icon: 'html' },
    { id: 8, title: 'WordPress Development', category: 'CMS & Web', icon: 'wordpress' },
    { id: 9, title: 'Digital Marketing', category: 'Marketing', icon: 'megaphone' }
  ]
};

async function initDatabase() {
  const host = process.env.TIDB_HOST;
  const user = process.env.TIDB_USER;
  const password = process.env.TIDB_PASSWORD;
  const database = process.env.TIDB_DATABASE || 'wintech_db';
  const port = process.env.TIDB_PORT ? parseInt(process.env.TIDB_PORT, 10) : 4000;
  const enableSsl = process.env.TIDB_ENABLE_SSL !== 'false';

  if (!host || !user) {
    console.log('\x1b[33m%s\x1b[0m', 'ℹ️  TiDB Cloud credentials not configured in server/.env.');
    console.log('\x1b[32m%s\x1b[0m', `✅ Local persistent file storage active (${memoryDb.enquiries.length} enquiries loaded from server/data/enquiries.json).`);
    return;
  }

  try {
    const config = {
      host,
      port,
      user,
      password,
      database,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    };

    if (enableSsl) {
      config.ssl = {
        minVersion: 'TLSv1.2',
        rejectUnauthorized: true
      };
    }

    pool = mysql.createPool(config);

    // Test connection
    await pool.query('SELECT 1 + 1 AS result');
    isConnectedToTiDB = true;
    console.log('\x1b[32m%s\x1b[0m', '✅ Connected to TiDB database successfully!');

    // Initialize Schema
    await createTables();
  } catch (err) {
    console.error('\x1b[31m%s\x1b[0m', `❌ TiDB connection failed (${err.message}). Using local persistent file store as fallback.`);
    isConnectedToTiDB = false;
  }
}

async function createTables() {
  if (!pool) return;
  try {
    // 1. Enquiries Table with status and admin notes
    await pool.query(`
      CREATE TABLE IF NOT EXISTS enquiries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(150) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        email VARCHAR(150),
        interest VARCHAR(100) NOT NULL,
        message TEXT,
        status VARCHAR(50) DEFAULT 'new',
        admin_notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Schema migration check for existing tables
    try {
      await pool.query('ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT "new"');
      await pool.query('ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS admin_notes TEXT');
    } catch (_) {}

    // 2. Courses Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS courses (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(150) NOT NULL,
        category VARCHAR(100) NOT NULL,
        icon VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Check if courses already seeded
    const [existing] = await pool.query('SELECT COUNT(*) as cnt FROM courses');
    if (existing[0].cnt === 0) {
      for (const course of memoryDb.courses) {
        await pool.query(
          'INSERT INTO courses (title, category, icon) VALUES (?, ?, ?)',
          [course.title, course.category, course.icon]
        );
      }
      console.log('🌱 Seeded default courses into TiDB database.');
    }
  } catch (err) {
    console.error('Error creating TiDB tables:', err.message);
  }
}

function getStorageMode() {
  if (pool && isConnectedToTiDB) {
    return 'persistent-tidb-cloud';
  }
  return 'persistent-local-file (server/data/enquiries.json)';
}

module.exports = {
  initDatabase,
  getPool: () => pool,
  isTiDBConnected: () => isConnectedToTiDB,
  getStorageMode,
  saveLocalEnquiries,
  memoryDb
};
