const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

// GET /api/dashboard/stats - KPI Metrics
router.get('/stats', dashboardController.getStats);

// GET /api/dashboard/queue - Priority Queue
router.get('/queue', dashboardController.getQueue);

module.exports = router;