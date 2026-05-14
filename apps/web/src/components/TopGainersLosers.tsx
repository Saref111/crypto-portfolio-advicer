import { MarketData } from '@crypto-portfolio/core';

export function TopGainersLosers({ marketData }: { marketData: MarketData[] }) {
  const sorted = [...marketData].sort((a, b) => b.priceChangePercent - a.priceChangePercent);
  const gainers = sorted.slice(0, 3);
  const losers = sorted.slice(-3).reverse();

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <h3 className="text-sm font-medium text-green-600 mb-2">Top Gainers</h3>
        <div className="space-y-2">
          {gainers.map(m => (
            <div key={m.symbol} className="flex justify-between text-sm bg-green-50 p-2 rounded">
              <span>{m.symbol.replace('USDT', '')}</span>
              <span className="font-bold">+{m.priceChangePercent.toFixed(2)}%</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium text-red-600 mb-2">Top Losers</h3>
        <div className="space-y-2">
          {losers.map(m => (
            <div key={m.symbol} className="flex justify-between text-sm bg-red-50 p-2 rounded">
              <span>{m.symbol.replace('USDT', '')}</span>
              <span className="font-bold">{m.priceChangePercent.toFixed(2)}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
