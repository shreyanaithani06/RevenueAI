import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const performanceData = [
  { day: 'Mon', recovered: 40000, failed: 12000 },
  { day: 'Tue', recovered: 30000, failed: 15000 },
  { day: 'Wed', recovered: 20000, failed: 8000 },
  { day: 'Thu', recovered: 27800, failed: 9500 },
  { day: 'Fri', recovered: 18900, failed: 11000 },
  { day: 'Sat', recovered: 23900, failed: 7000 },
  { day: 'Sun', recovered: 34900, failed: 6000 },
];

export default function AnalyticsInsights() {
  return (
    <div className="container-fluid p-0">
      {/* Header with increased bottom margin & proper scaling */}
      <div className="mb-4 pb-2">
        <h2 className="fw-bold mb-2" style={{ color: '#0f172a', fontSize: '1.65rem' }}>
          AI Business Insights
        </h2>
        <p className="text-secondary mb-0" style={{ fontSize: '0.9rem' }}>
          Macro-level analysis of payment failure patterns and root causes.
        </p>
      </div>

      {/* Insight Card 1 */}
      <div className="card border-0 shadow-sm bg-white p-4 mb-4" style={{ borderRadius: '12px' }}>
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div className="d-flex align-items-center gap-3">
            <div className="p-3 bg-danger bg-opacity-10 rounded-3 text-danger">
              <i className="bi bi-bank fs-4"></i>
            </div>
            <div>
              <span className="text-secondary fw-semibold text-uppercase tracking-wider d-block mb-1" style={{ fontSize: '0.75rem', letterSpacing: '0.05em' }}>
                Systemic Gateway Issue
              </span>
              <h5 className="fw-bold mb-0" style={{ color: '#0f172a', fontSize: '1.15rem', lineHeight: '1.4' }}>
                HDFC &amp; ICICI Bank Network Timeouts During Peak Hours
              </h5>
            </div>
          </div>
          <span className="badge bg-danger px-3 py-2 fw-medium" style={{ fontSize: '0.8rem' }}>
            ₹3.4L Revenue At Risk
          </span>
        </div>

        <p className="my-3" style={{ color: '#334155', fontSize: '0.925rem', lineHeight: '1.6' }}>
          64% of soft payment declines occurred between 2:00 PM and 4:00 PM due to core banking gateway timeouts. Automatic retries during this window failed 3x more often.
        </p>

        {/* Uncrowded AI Strategic Recommendation Box */}
        <div className="p-3 rounded-3 mt-3" style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
          <div className="fw-semibold d-flex align-items-center gap-2 mb-2" style={{ color: '#0f172a', fontSize: '0.85rem' }}>
            <i className="bi bi-lightbulb-fill text-warning"></i> AI Strategic Recommendation
          </div>
          <p className="mb-0" style={{ color: '#475569', fontSize: '0.875rem', lineHeight: '1.5' }}>
            Enable auto-scheduling to defer retries by 45 minutes when HDFC gateway latency exceeds 800ms.
          </p>
        </div>
      </div>

      {/* Insight Card 2 */}
      <div className="card border-0 shadow-sm bg-white p-4 mb-4" style={{ borderRadius: '12px' }}>
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div className="d-flex align-items-center gap-3">
            <div className="p-3 bg-success bg-opacity-10 rounded-3 text-success">
              <i className="bi bi-calendar-check fs-4"></i>
            </div>
            <div>
              <span className="text-secondary fw-semibold text-uppercase tracking-wider d-block mb-1" style={{ fontSize: '0.75rem', letterSpacing: '0.05em' }}>
                Customer Behavior Pattern
              </span>
              <h5 className="fw-bold mb-0" style={{ color: '#0f172a', fontSize: '1.15rem', lineHeight: '1.4' }}>
                High Payday Recovery Velocity on 1st &amp; 5th of the Month
              </h5>
            </div>
          </div>
          <span className="badge bg-success px-3 py-2 fw-medium" style={{ fontSize: '0.8rem' }}>
            ₹2.1L Recoverable
          </span>
        </div>

        <p className="my-3" style={{ color: '#334155', fontSize: '0.925rem', lineHeight: '1.6' }}>
          Failed debit attempts due to insufficient funds show an 84% recovery success rate when retried on salary credit days (1st and 5th of each month).
        </p>

        {/* Uncrowded AI Strategic Recommendation Box */}
        <div className="p-3 rounded-3 mt-3" style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
          <div className="fw-semibold d-flex align-items-center gap-2 mb-2" style={{ color: '#0f172a', fontSize: '0.85rem' }}>
            <i className="bi bi-lightbulb-fill text-warning"></i> AI Strategic Recommendation
          </div>
          <p className="mb-0" style={{ color: '#475569', fontSize: '0.875rem', lineHeight: '1.5' }}>
            Smart Retry Timing has automatically queued 18 failed recurring transactions for the upcoming 1st-of-month payday execution.
          </p>
        </div>
      </div>

      {/* Telemetry Chart Container */}
      <div className="card border-0 shadow-sm bg-white p-4" style={{ borderRadius: '12px' }}>
        <h5 className="fw-bold mb-4" style={{ color: '#0f172a', fontSize: '1.1rem' }}>
          Recovery Trend Stream
        </h5>
        <div style={{ width: '100%', height: 280, minWidth: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="day" stroke="#64748b" fontSize={12} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  borderColor: '#e2e8f0',
                  color: '#0f172a',
                  borderRadius: '6px'
                }}
              />
              <Area type="monotone" dataKey="recovered" stroke="#2563eb" fill="#3b82f6" fillOpacity={0.15} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}