import { Portfolio } from '@crypto-portfolio/core';

export function MarketTable({ portfolio }: { portfolio: Portfolio }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {portfolio.assets.map((asset) => (
            <tr key={asset.symbol}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{asset.symbol}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{asset.amount.toFixed(4)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${asset.price.toLocaleString()}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">${asset.value.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
