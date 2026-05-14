'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { PortfolioHistoryEntry } from '@crypto-portfolio/core';

export function HistoryLineChart({ history }: { history: PortfolioHistoryEntry[] }) {
  const data = history.map(h => ({
    ...h,
    formattedTimestamp: new Date(h.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  }));

  return (
    <div className="h-[350px] w-full -ml-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis
            dataKey="formattedTimestamp"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 500 }}
            dy={10}
          />
          <YAxis
            hide
            domain={['auto', 'auto']}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: 'none',
              borderRadius: '12px',
              boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
              padding: '12px'
            }}
            itemStyle={{ fontSize: '12px', fontWeight: 'bold', color: '#2563eb' }}
            labelStyle={{ fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}
            formatter={(value: number) => [`$${value.toLocaleString()}`, 'Total Balance']}
          />
          <Area
            type="monotone"
            dataKey="totalValue"
            stroke="#2563eb"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorValue)"
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
