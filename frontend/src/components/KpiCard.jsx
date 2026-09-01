import React from 'react';

export default function KpiCard({ title, value, badgeText, badgeBg }) {
  const getTopBorderColor = () => {
    if (badgeBg.includes('danger')) return '#ef4444';
    if (badgeBg.includes('success')) return '#10b981';
    if (badgeBg.includes('primary')) return '#2563eb';
    return '#0ea5e9';
  };

  return (
    <div 
      className="card border-0 shadow-sm bg-white h-100 p-3 position-relative overflow-hidden"
      style={{
        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        borderTop: `3px solid ${getTopBorderColor()}`
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 12px 20px -8px rgba(0, 0, 0, 0.08)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-2">
        <span className="small text-secondary fw-semibold">{title}</span>
        <span className={`badge ${badgeBg} px-2 py-1 shadow-sm`}>{badgeText}</span>
      </div>
      <div className="d-flex align-items-baseline gap-2">
        <h3 className="fw-bold mb-0" style={{ color: '#0f172a', letterSpacing: '-0.5px' }}>
          {value}
        </h3>
      </div>
    </div>
  );
}