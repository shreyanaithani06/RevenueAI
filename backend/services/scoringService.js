/**
 * Dynamic Payment Recovery Scoring Engine
 */
function calculateRecoveryScore(paymentData) {
  let score = 50; // Base score
  const failureReason = (paymentData.failureReason || '').toLowerCase();
  const amount = Number(paymentData.amount) || 0;

  // 1. Failure Reason Weightage
  if (failureReason.includes('timeout') || failureReason.includes('network') || failureReason.includes('gateway')) {
    score += 40; // Soft decline - high recovery probability
  } else if (failureReason.includes('insufficient') || failureReason.includes('balance')) {
    score += 30; // Medium recovery probability via payday/reminder retry
  } else if (failureReason.includes('expired') || failureReason.includes('incorrect')) {
    score += 20; // Requires customer intervention
  } else if (failureReason.includes('stolen') || failureReason.includes('blacklisted') || failureReason.includes('fraud')) {
    score -= 40; // Hard decline - near-zero recovery probability
  }

  // 2. Transaction Size Heuristics
  if (amount > 50000) {
    score -= 5; // Higher value transactions require manual/multi-step authentication
  } else if (amount < 5000) {
    score += 5; // Lower values auto-retry with higher success
  }

  
  const finalScore = Math.max(0, Math.min(100, score));

  let recommendedAction = 'NO_ACTION';
  if (finalScore >= 85) {
    recommendedAction = 'SMART_RETRY';
  } else if (finalScore >= 75) {
    recommendedAction = 'SEND_REMINDER';
  } else if (finalScore >= 60) {
    recommendedAction = 'UPDATE_PAYMENT_METHOD';
  }

  return {
    recoveryScore: finalScore,
    recommendedAction,
    isRecoverable: finalScore >= 50
  };
}

module.exports = {
  calculateRecoveryScore
};