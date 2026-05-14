import { MarketData } from '@crypto-portfolio/core';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export function TopGainersLosers({ marketData }: { marketData: MarketData[] }) {
  const sorted = [...marketData].sort((a, b) => b.priceChangePercent - a.priceChangePercent);
  const gainers = sorted.slice(0, 2);
  const losers = sorted.slice(-2).reverse();

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {gainers.map(m => (
          <div key={m.symbol} className="flex items-center justify-between p-2 rounded-xl bg-green-50/50 border border-green-100/50">
            <div className="flex items-center gap-2">
              <div className="p-1 bg-green-100 rounded-lg">
                <TrendingUp className="w-3 h-3 text-green-600" />
              </div>
              <span className="text-xs font-bold text-gray-700">{m.symbol.replace('USDT', '')}</span>
            </div>
            <span className="text-xs font-bold text-green-600">+{m.priceChangePercent.toFixed(2)}%</span>
          </div>
        ))}
      </div>
      <div className="space-y-2">
        {losers.map(m => (
          <div key={m.symbol} className="flex items-center justify-between p-2 rounded-xl bg-red-50/50 border border-red-100/50">
            <div className="flex items-center gap-2">
              <div className="p-1 bg-red-100 rounded-lg">
                <TrendingDown className="w-3 h-3 text-red-600" />
              </div>
              <span className="text-xs font-bold text-gray-700">{m.symbol.replace('USDT', '')}</span>
            </div>
            <span className="text-xs font-bold text-red-600">{m.priceChangePercent.toFixed(2)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
