import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { executeRecoveryAction } from '../services/api';

export default function CustomerPortal() {
  const { paymentId } = useParams();
  const [status, setStatus] = useState('PENDING');

  const handleRetry = async () => {
    setStatus('PROCESSING');

    // Make live API call to update payment status in MySQL
    const res = await executeRecoveryAction(paymentId || 1, 'UPDATE_PAYMENT_METHOD');

    if (res.success) {
      setStatus('SUCCESS');
    } else {
      setStatus('FAILED');
    }
  };

  return (
    <div className="container py-5 text-center text-white" style={{ maxWidth: '500px' }}>
      <div className="card bg-dark border-secondary p-4 shadow-lg">
        <h3 className="mb-3 text-warning">Payment Recovery Portal</h3>
        <p style={{ color: '#94a3b8' }}>
          Transaction ID: <strong>#{paymentId || '1'}</strong>
        </p>

        {status === 'PENDING' && (
          <div>
            <p className="mb-4" style={{ color: '#94a3b8' }}>
              Your previous payment attempt failed. Click below to re-authorize securely.
            </p>
            <button className="btn btn-primary btn-lg w-100 fw-bold" onClick={handleRetry}>
              Retry Payment Now
            </button>
          </div>
        )}

        {status === 'PROCESSING' && (
          <div className="py-3">
            <div className="spinner-border text-primary mb-3" role="status"></div>
            <p className="text-muted">Processing recovery transaction via gateway...</p>
          </div>
        )}

        {status === 'SUCCESS' && (
          <div className="alert alert-success mt-3 border-0" role="alert">
            <h4 className="alert-heading fw-bold">Payment Recovered!</h4>
            <p className="mb-0">Your account has been updated and marked as active.</p>
          </div>
        )}

        {status === 'FAILED' && (
          <div className="alert alert-danger mt-3 border-0" role="alert">
            <h4 className="alert-heading fw-bold">Transaction Failed</h4>
            <p className="mb-0">Could not retry payment. Please check your account details.</p>
          </div>
        )}
      </div>
    </div>
  );
}