// ==============================================================================
// WinTech Digital Partner - 1-Time Database to Local Storage Sync Script
// Run: node sync-database.js (from server directory) or npm run sync:db
// ==============================================================================
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const { initDatabase, getPool, isTiDBConnected, saveLocalEnquiries, memoryDb } = require('./config/db');

const LOCAL_DATA_FILE = path.join(__dirname, 'data/enquiries.json');

async function syncOnce() {
  console.log('================================================================');
  console.log('🔄 WINTECH 1-TIME DATABASE TO LOCAL STORAGE SYNC');
  console.log('================================================================\n');

  console.log('1. Connecting to database...');
  await initDatabase();

  const pool = getPool();
  if (!pool || !isTiDBConnected()) {
    console.log('\n⚠️  Remote TiDB database is not connected or credentials not set in server/.env.');
    console.log(`ℹ️  Current Local Storage file: ${LOCAL_DATA_FILE}`);
    console.log(`📊 Local records count: ${memoryDb.enquiries.length}`);
    process.exit(0);
    return;
  }

  try {
    console.log('2. Fetching all enquiries from TiDB database...');
    const [rows] = await pool.query('SELECT * FROM enquiries ORDER BY created_at DESC');

    console.log(`3. Saving ${rows.length} records into local storage file (${LOCAL_DATA_FILE})...`);
    saveLocalEnquiries(rows);

    console.log('\n================================================================');
    console.log(`✅ SUCCESS: Synced ${rows.length} enquiries from database to local storage!`);
    console.log(`📁 File location: ${LOCAL_DATA_FILE}`);
    console.log('================================================================');
  } catch (err) {
    console.error('\n❌ Error syncing from database:', err.message);
  } finally {
    try {
      await pool.end();
    } catch (_) {}
    process.exit(0);
  }
}

syncOnce();
