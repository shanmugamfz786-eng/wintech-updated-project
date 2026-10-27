const express = require('express');
const router = express.Router();
const { getPool, isTiDBConnected, memoryDb } = require('../config/db');

// GET /api/courses
router.get('/', async (req, res) => {
  try {
    const pool = getPool();
    if (pool && isTiDBConnected()) {
      const [rows] = await pool.query('SELECT * FROM courses ORDER BY id ASC');
      return res.json({ success: true, count: rows.length, data: rows });
    } else {
      return res.json({
        success: true,
        count: memoryDb.courses.length,
        data: memoryDb.courses
      });
    }
  } catch (error) {
    console.error('Error in GET /api/courses:', error);
    return res.status(500).json({ success: false, error: 'Database query failed' });
  }
});

module.exports = router;
