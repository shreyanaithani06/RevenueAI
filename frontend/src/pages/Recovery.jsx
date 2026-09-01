import React, { useState, useEffect } from 'react';
import { getPriorityQueue, triggerRecoveryAction } from '../services/api';

export default function Recovery() {
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionStatus, setActionStatus] = useState(null);

  useEffect(() => {
    fetchRecoveryQueue();
  }, []);

  const fetchRecoveryQueue = async () => {
    try {
      setLoading(true);
      const res = await getPriorityQueue();
      // Supports array directly or res.data response payload
      const data = res?.data || res || [];
      setQueue(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error loading recovery queue:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExecute = async (paymentId, actionType) => {
    setActionStatus({ id: paymentId, message: `Executing ${actionType}...`, type: 'info' });
    try {
      await triggerRecoveryAction(paymentId, actionType);
      setActionStatus({ id: paymentId, message: `Successfully executed ${actionType}!`, type: 'success' });
      fetchRecoveryQueue(); // Refresh queue data
    } catch (error) {
      setActionStatus({ id: paymentId, message: `Failed to execute action.`, type: 'danger' });
    }
  };

  return (
    <div className="container-fluid p-0">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-1" style={{ color: '#0f172a' }}>🔄 Recovery Command Center</h3>
          <p className="small mb-0 text-secondary">Automated Smart-Retries & Customer Intervention Queues</p>
        </div>
        <button className="btn btn-sm btn-outline-primary fw-semibold" onClick={fetchRecoveryQueue}>
          ⚡ Refresh Queue
        </button>
      </div>

      {actionStatus && (
        <div className={`alert alert-${actionStatus.type} alert-dismissible fade show mb-3 py-2 small`} role="alert">
          {actionStatus.message}
          <button type="button" className="btn-close py-2" onClick={() => setActionStatus(null)}></button>
        </div>
      )}

      <div className="card border-0 shadow-sm bg-white">
        <div className="card-header bg-white border-bottom py-3">
          <h5 className="card-title fw-semibold text-primary mb-0">Active Recovery Tasks</h5>
        </div>
        <div className="card-body p-0">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status"></div>
              <p className="mt-2 text-secondary small">Fetching actionable recovery items...</p>
            </div>
          ) : queue.length === 0 ? (
            <div className="text-center py-5 text-secondary small">
              No pending recovery actions found.
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table align-middle mb-0">
                <thead>
                  <tr>
                    <th>Transaction ID</th>
                    <th>Customer</th>
                    <th>Amount</th>
                    <th>Recovery Score</th>
                    <th>Recommended Strategy</th>
                    <th className="text-end">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {queue.map((item) => (
                    <tr key={item.id}>
                      <td className="fw-semibold text-primary">#TXN-{item.id}</td>
                      <td>
                        <div className="fw-semibold text-dark">{item.customerName}</div>
                        <div className="small text-secondary">{item.customerEmail}</div>
                      </td>
                      <td className="fw-bold text-dark">₹{Number(item.amount).toLocaleString('en-IN')}</td>
                      <td>
                        <span className={`badge ${item.recoveryScore >= 75 ? 'bg-success' : item.recoveryScore >= 50 ? 'bg-warning text-dark' : 'bg-danger'}`}>
                          {item.recoveryScore} / 100
                        </span>
                      </td>
                      <td>
                        <span className="badge bg-primary-subtle text-primary border border-primary-subtle px-2 py-1">
                          {item.recommendedAction || 'SMART_RETRY'}
                        </span>
                      </td>
                      <td className="text-end">
                        <button
                          className="btn btn-sm btn-success fw-semibold me-2"
                          onClick={() => handleExecute(item.id, item.recommendedAction || 'SMART_RETRY')}
                        >
                          Execute Strategy
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}