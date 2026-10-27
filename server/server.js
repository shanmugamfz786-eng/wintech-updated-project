const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const { initDatabase, isTiDBConnected } = require('./config/db');
const { isEmailConfigured } = require('./services/emailService');
const enquiryRoutes = require('./routes/enquiryRoutes');
const courseRoutes = require('./routes/courseRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Healthcheck & Database / Email Status
app.get('/api/health', (req, res) => {
  const tidbOnline = isTiDBConnected();
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'WinTech Digital Partner Backend',
    database: {
      type: 'TiDB',
      connected: tidbOnline,
      storageMode: tidbOnline ? 'persistent-tidb' : 'volatile-in-memory (data resets on server restart)',
    },
    emailNotification: {
      enabled: isEmailConfigured(),
      provider: process.env.SMTP_HOST || 'unconfigured',
    },
  });
});

// Mount Routes
app.use('/api/admin', adminRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/courses', courseRoutes);

// Catch-all 404 for unknown API endpoints
app.use('/api/*', (req, res) => {
  res.status(404).json({ success: false, error: 'Endpoint not found' });
});

// Start Server and Initialize TiDB
app.listen(PORT, async () => {
  console.log(`\n🚀 WinTech Express Server running on http://localhost:${PORT}`);
  console.log(`📡 Healthcheck: http://localhost:${PORT}/api/health\n`);
  await initDatabase();
});
