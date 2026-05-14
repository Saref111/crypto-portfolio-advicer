'use client';

import { useEffect } from 'react';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import { AllocationPieChart } from '@/components/AllocationPieChart';
import { HistoryLineChart } from '@/components/HistoryLineChart';
import { MarketTable } from '@/components/MarketTable';
import { TopGainersLosers } from '@/components/TopGainersLosers';
import { TrendingUp, TrendingDown, DollarSign, Bitcoin } from 'lucide-react';

export default function DashboardPage() {
  const { portfolio, analytics, marketData, history, isLoading, error, fetchDashboardData } = usePortfolioStore();

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 30000); // Poll every 30 seconds
    return () => clearInterval(interval);
  }, [fetchDashboardData]);

  if (isLoading && !portfolio) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-red-500 bg-red-50 p-4 rounded-lg border border-red-200">
          Error: {error}
        </div>
        <button
          onClick={() => fetchDashboardData()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-gray-500 text-lg font-medium">No portfolio data available.</p>
        <p className="text-gray-400">Please make sure the API is running and Binance credentials are configured.</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500">Real-time crypto portfolio analytics</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Last updated: {new Date(portfolio.timestamp).toLocaleTimeString()}</p>
          </div>
        </header>

        {analytics && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <DollarSign className="w-6 h-6 text-blue-600" />
                </div>
                <span className={`text-sm font-medium flex items-center ${analytics.pnl24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {analytics.pnl24h >= 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                  {analytics.pnl24hPercent.toFixed(2)}%
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-1">Total Value (USD)</p>
              <p className="text-2xl font-bold">${analytics.totalValueUsd.toLocaleString()}</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-orange-50 rounded-lg">
                  <Bitcoin className="w-6 h-6 text-orange-600" />
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-1">Total Value (BTC)</p>
              <p className="text-2xl font-bold">{analytics.totalValueBtc.toFixed(4)} BTC</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-green-50 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-1">24h P&L</p>
              <p className={`text-2xl font-bold ${analytics.pnl24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {analytics.pnl24h >= 0 ? '+' : ''}${analytics.pnl24h.toLocaleString()}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <TopGainersLosers marketData={marketData} />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold mb-6">Historical Performance</h2>
              <HistoryLineChart history={history} />
            </section>

            <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold mb-6">Your Assets</h2>
              <MarketTable portfolio={portfolio} />
            </section>
          </div>

          <div className="space-y-8">
            <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold mb-6">Asset Allocation</h2>
              {analytics && <AllocationPieChart analytics={analytics} />}
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
