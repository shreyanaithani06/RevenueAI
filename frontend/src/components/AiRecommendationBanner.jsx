import React from 'react';

export default function AiRecommendationBanner({ onRunRecovery }) {
  return (
    <div 
      className="card border-0 mb-4"
      style={{
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        borderLeft: '4px solid #2563eb',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        cursor: 'default'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = '0 12px 24px -6px rgba(37, 99, 235, 0.12), 0 4px 8px -4px rgba(0, 0, 0, 0.04)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
      }}
    >
      <div className="card-body p-4">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
          <div className="d-flex align-items-center gap-2">
            <span 
              className="fw-bold px-3 py-1 rounded-2 d-inline-flex align-items-center"
              style={{
                backgroundColor: '#eff6ff',
                color: '#2563eb',
                fontSize: '0.725rem',
                letterSpacing: '0.04em',
                textTransform: 'uppercase'
              }}
            >
              <i className="bi bi-cpu-fill me-2 fs-6"></i> AI Command Recommendation
            </span>

            <span 
              className="badge bg-success-subtle text-success border border-success-subtle px-2.5 py-1 fw-medium d-inline-flex align-items-center"
              style={{ fontSize: '0.725rem' }}
            >
              <i className="bi bi-check-circle-fill me-1.5"></i> High Confidence (92%)
            </span>
          </div>

          <span 
            className="badge bg-light text-secondary border px-2.5 py-1 fw-normal d-inline-flex align-items-center"
            style={{ fontSize: '0.75rem' }}
          >
            <i className="bi bi-clock-history me-1.5 text-primary"></i> Updated 2m ago
          </span>
        </div>

        {/* Action Content Row */}
        <div className="row align-items-center mt-2">
          <div className="col-md-8">
            {/* Dominant Heading Size */}
            <h3 
              className="fw-bold mb-2" 
              style={{ color: '#0f172a', letterSpacing: '-0.4px', fontSize: '1.45rem', lineHeight: '1.3' }}
            >
              Prioritize 37 High-Value Payments Worth ₹4.2L Today
            </h3>

            {/* Compact Body Text with Explicit Icon Spacing */}
            <p className="text-secondary mb-0" style={{ fontSize: '0.875rem', lineHeight: '1.6' }}>
              <i className="bi bi-info-circle-fill me-2 text-primary"></i>
              Analysis indicates <strong className="text-dark">15 returning customers</strong> failed due to temporary bank network timeouts. Executing a <strong className="text-dark">Smart Retry</strong> now carries a <strong className="text-success">71% estimated recovery probability</strong>.
            </p>
          </div>

          <div className="col-md-4 text-md-end mt-3 mt-md-0">
            <button 
              className="btn btn-primary btn-lg fw-bold px-4 shadow-sm border-0 position-relative"
              onClick={onRunRecovery}
              style={{
                transition: 'all 0.2s ease',
                background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                fontSize: '0.95rem'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.03)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(37, 99, 235, 0.35)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
              }}
            >
              <i className="bi bi-play-fill me-2 fs-5 align-middle"></i> Run Smart Recovery
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}