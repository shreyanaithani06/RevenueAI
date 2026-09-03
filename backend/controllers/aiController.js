const { analyzeFailedPayment } = require('../services/aiAgentService');
const { calculateRecoveryScore } = require('../services/scoringService');


exports.analyzePayment = async (req, res, next) => {
  try {
    const paymentData = req.body;
    
    const ruleScore = calculateRecoveryScore(paymentData);
    const aiInsight = await analyzeFailedPayment(paymentData);

    res.json({
      success: true,
      data: {
        ...ruleScore,
        aiReasoning: aiInsight.reasoning || 'Automated classification completed.',
        geminiSuggestion: aiInsight.recommendedAction || ruleScore.recommendedAction
      }
    });
  } catch (error) {
    next(error);
  }
};


exports.getMacroInsights = async (req, res, next) => {
  try {
    res.json([
      {
        id: 1,
        category: 'Systemic Gateway Issue',
        title: 'HDFC & ICICI Bank Network Timeouts',
        impact: '₹3.4L Revenue At Risk',
        severity: 'HIGH',
        recommendation: 'Enable auto-scheduling to defer retries by 45 minutes.'
      },
      {
        id: 2,
        category: 'Customer Behavior Pattern',
        title: 'Payday Recovery Velocity',
        impact: '₹2.1L Recoverable',
        severity: 'MEDIUM',
        recommendation: 'Queue failed recurring transactions for 1st/5th payday execution.'
      }
    ]);
  } catch (error) {
    next(error);
  }
};