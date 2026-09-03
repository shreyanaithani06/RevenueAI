import React, { useState, useEffect } from 'react';
import { getFailedPayments } from '../services/api';

export default function FailedPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchFailedPayments();
  }, []);

  const fetchFailedPayments = async () => {
    try {
      setLoading(true);
      const data = await getFailedPayments();
      setPayments(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching failed payments:', error);
      setPayments([]);
    } finally {
      setLoading(false);
    }
  };

  // 1. Filter based on user search term
  const filteredPayments = payments.filter((p) => {
    const search = searchTerm.toLowerCase();
    return (
      p.customerName?.toLowerCase().includes(search) ||
      p.customerEmail?.toLowerCase().includes(search) ||
      p.failureReason?.toLowerCase().includes(search) ||
      p.id?.toString().includes(search)
    );
  });

  // 2. Sort so RECOVERED payments always appear at the top
  const sortedPayments = [...filteredPayments].sort((a, b) => {
    if (a.status === 'RECOVERED' && b.status !== 'RECOVERED') return -1;
    if (a.status !== 'RECOVERED' && b.status === 'RECOVERED') return 1;
    return 0; // retain default order for same statuses
  });

  return (
    <div className="container-fluid p-0">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">⚠️ Failed Payments Log</h2>
          <p className="small mb-0" style={{ color: '#94a3b8' }}>
            Detailed classification of all transaction declines & soft errors
          </p>
        </div>
        <div style={{ width: '280px' }}>
          <input
            type="text"
            className="form-control form-control-sm bg-dark text-white border-secondary"
            placeholder="Search customer, reason, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="card bg-dark border-secondary shadow-sm">
        <div className="card-body p-0">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-danger" role="status"></div>
              <p className="mt-2 text-muted small">Loading failed payment records...</p>
            </div>
          ) : sortedPayments.length === 0 ? (
            <div className="text-center py-5 text-muted small">
              No matching failed payment logs found.
            </div>
          ) : (
            <div className="table-responsive" style={{ maxHeight: '600px', overflowY: 'auto' }}>
              <table className="table table-light table-hover align-middle mb-0">
                <thead className="sticky-top bg-dark">
                  <tr className="text-secondary small border-secondary">
                    <th>ID</th>
                    <th>Customer Info</th>
                    <th>Amount</th>
                    <th>Failure Reason</th>
                    <th>Category</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedPayments.map((item) => (
                    <tr key={item.id} className="border-secondary">
                      <td className="small" style={{ color: '#94a3b8' }}>#{item.id}</td>
                      <td>
                        <div className="fw-semibold text-black">{item.customerName}</div>
                        <div className="small" style={{ color: '#94a3b8' }}>{item.customerEmail}</div>
                      </td>
                      <td className="fw-bold text-white">₹{Number(item.amount).toLocaleString('en-IN')}</td>
                      <td className="text-danger small">{item.failureReason}</td>
                      <td>
                        <span className="badge bg-secondary border border-secondary">
                          {item.failureReason?.toLowerCase().includes('timeout') ? 'Soft Network Error' : 'Bank Decline'}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${item.status === 'RECOVERED' ? 'bg-success' : 'bg-danger'}`}>
                          {item.status || 'FAILED'}
                        </span>
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