const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

// POST /api/ai/analyze - Trigger AI analysis on a transaction
router.post('/analyze', aiController.analyzePayment);

// GET /api/ai/insights - Get macro system insights
router.get('/insights', aiController.getMacroInsights);

module.exports = router;