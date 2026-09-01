import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { name: 'Bank Timeout', value: 42, color: '#dc3545' },
  { name: 'Insufficient Funds', value: 31, color: '#ffc107' },
  { name: 'Auth Dropouts', value: 19, color: '#0d6efd' },
  { name: 'Stolen/Expired', value: 8, color: '#6c757d' },
];

export default function FailureReasonChart() {
  return (
    <div className="card border-0 shadow-sm bg-white p-3 h-100">
      {/* High-Contrast Heading */}
      <h5 className="card-title fw-bold mb-3" style={{ color: '#0f172a' }}>
        <i className="bi bi-pie-chart-fill text-primary me-2"></i>Failure Reason Breakdown
      </h5>
      <div style={{ width: '100%', height: 260 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={85}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', color: '#0f172a', borderRadius: '6px' }}
              formatter={(value) => [`${value}%`, 'Share']}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36} 
              formatter={(value) => <span style={{ color: '#475569', fontSize: '0.85rem' }}>{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}