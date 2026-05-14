import { Portfolio } from '@crypto-portfolio/core';
import { cn } from '@/lib/utils';

export function MarketTable({ portfolio }: { portfolio: Portfolio }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50/50">
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Asset</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100 text-right">Amount</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100 text-right">Price</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100 text-right">Value</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {portfolio.assets.map((asset) => (
            <tr key={asset.symbol} className="hover:bg-gray-50/50 transition-colors group">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600 group-hover:bg-white transition-colors">
                    {asset.symbol[0]}
                  </div>
                  <span className="font-semibold text-gray-900">{asset.symbol}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <span className="text-sm font-medium text-gray-600">{asset.amount.toLocaleString(undefined, { maximumFractionDigits: 6 })}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <span className="text-sm font-medium text-gray-600">${asset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <span className="text-sm font-bold text-gray-900">${asset.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
