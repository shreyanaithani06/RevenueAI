import React from 'react';
import { Link } from 'react-router-dom';

export default function PriorityQueueTable({ payments, onExecuteAction }) {
  if (!payments || payments.length === 0) {
    return (
      <div className="card shadow-sm border-0 p-4 text-center text-muted">
        No failed payments found in queue.
      </div>
    );
  }

  return (
    <div className="card shadow-sm border-0 mb-4">
      <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
        <h5 className="fw-bold mb-0 text-dark">
          High-Priority Recovery Queue
        </h5>
        <span className="badge bg-primary rounded-pill fs-6">
          {payments.length} Total Records
        </span>
      </div>

      {/* Adding overflow scroll container so all 100 rows can be viewed smoothly */}
      <div className="table-responsive" style={{ maxHeight: '550px', overflowY: 'auto' }}>
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light sticky-top">
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Failure Reason</th>
              <th>Recovery Score</th>
              <th>Recommended Action</th>
              <th>Status</th>
              <th className="text-end">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Iterating over ALL records from MySQL without .slice() restrictions */}
            {payments.map((row) => (
              <tr key={row.id}>
                <td className="fw-bold text-secondary">#{row.id}</td>
                <td>
                  <div className="fw-semibold text-dark d-flex align-items-center gap-2">
                    <span>{row.customerName}</span>
                    <Link 
                      to={`/portal/${row.id}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-primary text-decoration-none small"
                      title="Open Customer Link"
                    >
                      🔗
                    </Link>
                  </div>
                  <div className="small text-muted">{row.customerEmail}</div>
                </td>
                <td className="fw-semibold">₹{Number(row.amount).toLocaleString('en-IN')}</td>
                <td>
                  <span className="badge bg-light text-dark border">
                    {row.failureReason}
                  </span>
                </td>
                <td>
                  <span className={`badge ${row.recoveryScore >= 80 ? 'bg-success' : row.recoveryScore >= 50 ? 'bg-warning text-dark' : 'bg-danger'}`}>
                    {row.recoveryScore}/100
                  </span>
                </td>
                <td>
                  <code className="text-primary fw-semibold">{row.recommendedAction}</code>
                </td>
                <td>
                  <span className={`badge ${row.status === 'RECOVERED' ? 'bg-success' : 'bg-warning text-dark'}`}>
                    {row.status}
                  </span>
                </td>
                <td className="text-end">
                  <button
                    className={`btn btn-sm ${row.status === 'RECOVERED' ? 'btn-outline-secondary' : 'btn-success fw-semibold'}`}
                    onClick={() => onExecuteAction(row.id, row.recommendedAction)}
                    disabled={row.status === 'RECOVERED'}
                  >
                    {row.status === 'RECOVERED' ? 'Recovered' : 'Execute Strategy'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}