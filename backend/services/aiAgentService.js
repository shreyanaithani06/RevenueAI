const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'MOCK_KEY');

/**
 * Analyzes a failed transaction and generates recovery intelligence using Gemini AI
 */

async function analyzeFailedPayment(paymentData) {
  try {
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
      return getFallbackAnalysis(paymentData);
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
    You are an autonomous AI Payment Recovery Agent for an e-commerce platform.
    Analyze the following failed transaction and determine the best recovery action:

    - Customer: ${paymentData.customerName}
    - Amount: ₹${paymentData.amount}
    - Failure Reason: ${paymentData.failureReason}
    - Error Code: ${paymentData.errorCode || 'N/A'}

    Provide a JSON response with the following keys:
    1. "recoveryScore": Integer from 0 to 100 (probability of successful recovery).
    2. "recommendedAction": One of ["SMART_RETRY", "SEND_REMINDER", "UPDATE_PAYMENT_METHOD", "NO_ACTION"].
    3. "reasoning": A 1-sentence explanation of why this action was chosen.

    Return ONLY raw JSON with no Markdown wrapping.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();

    return JSON.parse(text);
  } catch (error) {
    console.error('Gemini AI Service Error:', error.message);
    return getFallbackAnalysis(paymentData);
  }
}

/**
 * Heuristic fallback in case Gemini API is offline or unconfigured
 */
function getFallbackAnalysis(payment) {
  const reason = (payment.failureReason || '').toLowerCase();

  if (reason.includes('timeout') || reason.includes('gateway')) {
    return {
      recoveryScore: 90,
      recommendedAction: 'SMART_RETRY',
      reasoning: 'Temporary bank server timeout detected. Soft decline can be recovered via smart retry.'
    };
  } else if (reason.includes('insufficient') || reason.includes('balance')) {
    return {
      recoveryScore: 82,
      recommendedAction: 'SEND_REMINDER',
      reasoning: 'Insufficient funds detected. A customer payment link is recommended.'
    };
  } else if (reason.includes('expired') || reason.includes('card')) {
    return {
      recoveryScore: 75,
      recommendedAction: 'UPDATE_PAYMENT_METHOD',
      reasoning: 'Card expired or invalid payment details. Prompt customer to update payment method.'
    };
  } else {
    return {
      recoveryScore: 20,
      recommendedAction: 'NO_ACTION',
      reasoning: 'Hard decline or fraudulent card. Block retries to prevent unnecessary gateway fees.'
    };
  }
}

module.exports = {
  analyzeFailedPayment
};