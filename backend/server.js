const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const paymentRoutes = require('./routes/paymentRoutes');
const aiRoutes = require('./routes/aiRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS and JSON body parsing
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/payments', paymentRoutes);

app.use('/api/ai', aiRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    service: 'RevenueAI Backend Engine',
    timestamp: new Date().toISOString()
  });
});

// 404 Route Handler
app.use((req, res) => {
  res.status(404).json({ error: 'API route not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Server Error Stack:', err.stack);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`🚀 RevenueAI Backend running on http://localhost:${PORT}`);
  console.log(`⚡ API Health Check available at http://localhost:${PORT}/api/health`);
});