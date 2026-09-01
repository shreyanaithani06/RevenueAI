import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 1. Fetch KPI Dashboard Metrics from MySQL
export const getDashboardStats = async () => {
  try {
    const response = await api.get('/payments/stats');
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return {
      revenueAtRisk: '₹0',
      revenueRecovered: '₹0',
      recoveryRate: '0%',
      savedGatewayFees: '₹0'
    };
  }
};

// 2. Fetch ALL 100 Failed Payments from MySQL
export const getFailedPayments = async () => {
  try {
    const response = await api.get('/payments/queue');
    return response.data;
  } catch (error) {
    console.error('Error fetching recovery queue from MySQL:', error);
    return [];
  }
};

export const getPriorityQueue = async () => {
  return getFailedPayments();
};

// 3. Execute Strategy Action in MySQL Database
export const executeRecoveryAction = async (paymentId, action) => {
  try {
    const response = await api.post('/payments/execute', { paymentId, action });
    return response.data;
  } catch (error) {
    console.error('Error executing recovery action:', error);
    return { success: false };
  }
};

export const executeRecoveryTask = async (paymentId, action) => {
  return executeRecoveryAction(paymentId, action);
};

export const triggerRecoveryAction = async (paymentId, action) => {
  return executeRecoveryAction(paymentId, action);
};

export const getInsights = async () => {
  try {
    const response = await api.get('/insights');
    return response.data;
  } catch (error) {
    return [];
  }
};

export default api;