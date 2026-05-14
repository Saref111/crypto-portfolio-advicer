'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { PortfolioAnalytics } from '@crypto-portfolio/core';

const COLORS = ['#2563eb', '#8b5cf6', '#ec4899', '#f97316', '#eab308', '#22c55e'];

export function AllocationPieChart({ analytics }: { analytics: PortfolioAnalytics }) {
  const data = analytics.allocations
    .filter(a => a.percentage > 1) // Only show assets > 1%
    .slice(0, 6);

  return (
    <div className="h-[320px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="45%"
            innerRadius={70}
            outerRadius={90}
            paddingAngle={8}
            dataKey="value"
            nameKey="symbol"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} className="outline-none" />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: 'none',
              borderRadius: '12px',
              boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
              padding: '12px'
            }}
            itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
            formatter={(value: number) => [`$${value.toLocaleString()}`, 'Value']}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
            formatter={(value) => <span className="text-xs font-bold text-gray-600 uppercase ml-1">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
