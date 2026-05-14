'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PortfolioHistoryEntry } from '@crypto-portfolio/core';

export function HistoryLineChart({ history }: { history: PortfolioHistoryEntry[] }) {
  const data = history.map(h => ({
    ...h,
    timestamp: new Date(h.timestamp).toLocaleTimeString(),
  }));

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip
             formatter={(value: number) => `$${value.toLocaleString()}`}
          />
          <Line type="monotone" dataKey="totalValue" stroke="#8884d8" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
