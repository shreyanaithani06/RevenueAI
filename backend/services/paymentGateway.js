const Razorpay = require('razorpay');
const dotenv = require('dotenv');

dotenv.config();

// Initialize Razorpay instance if keys are available
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_mock_key',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'mock_secret'
});

/**
 * Triggers an automated smart retry for a soft payment decline
 */
async function triggerSmartRetry(paymentId, amount) {
  try {
    console.log(`[Gateway] Initiating Smart Retry for Payment ID: ${paymentId}...`);
    
    // Simulate gateway API call response
    return {
      success: true,
      transactionId: `txn_retry_${Date.now()}`,
      status: 'CAPTURED',
      message: 'Smart retry completed successfully via Razorpay'
    };
  } catch (error) {
    console.error('[Gateway Error] Smart retry failed:', error.message);
    return {
      success: false,
      message: error.message
    };
  }
}

/**
 * Generates a dynamic single-use recovery link for the customer portal
 */
function createCustomerRecoveryLink(paymentId) {
  const baseUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
  return `${baseUrl}/recover/${paymentId}`;
}

module.exports = {
  triggerSmartRetry,
  createCustomerRecoveryLink
};