import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { time: '00:00', recovered: 12000, attempted: 18000 },
  { time: '04:00', recovered: 8000, attempted: 14000 },
  { time: '08:00', recovered: 45000, attempted: 62000 },
  { time: '12:00', recovered: 89000, attempted: 110000 },
  { time: '16:00', recovered: 64000, attempted: 85000 },
  { time: '20:00', recovered: 35000, attempted: 48000 },
];

export default function RecoveryTrendChart() {
  return (
    <div className="card border-0 shadow-sm bg-white p-3 h-100">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="card-title fw-bold mb-0" style={{ color: '#0f172a' }}>
          <i className="bi bi-graph-up-arrow text-primary me-2"></i>Recovery Velocity Trend
        </h5>
        <span className="badge bg-primary-subtle text-primary border border-primary-subtle">
          24h Live Stream
        </span>
      </div>
      
      <div style={{ width: '100%', height: 260 }}>
        <ResponsiveContainer>
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRecovered" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="time" stroke="#64748b" fontSize={12} tickLine={false} />
            <YAxis 
              stroke="#64748b" 
              fontSize={12} 
              tickLine={false}
              tickFormatter={(val) => `₹${val / 1000}k`}
            />
            <Tooltip
              contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', color: '#0f172a', borderRadius: '6px' }}
              formatter={(value) => [`₹${Number(value).toLocaleString('en-IN')}`, 'Recovered']}
            />
            <Area 
              type="monotone" 
              dataKey="recovered" 
              stroke="#2563eb" 
              strokeWidth={2.5}
              fillOpacity={1} 
              fill="url(#colorRecovered)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}