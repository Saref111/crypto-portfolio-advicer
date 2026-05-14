'use client';

import { useEffect } from 'react';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import { AllocationPieChart } from '@/components/AllocationPieChart';
import { HistoryLineChart } from '@/components/HistoryLineChart';
import { MarketTable } from '@/components/MarketTable';
import { TopGainersLosers } from '@/components/TopGainersLosers';
import { TrendingUp, TrendingDown, DollarSign, Bitcoin, RefreshCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function DashboardPage() {
  const { portfolio, analytics, marketData, history, isLoading, error, fetchDashboardData } = usePortfolioStore();

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 30000); // Poll every 30 seconds
    return () => clearInterval(interval);
  }, [fetchDashboardData]);

  if (isLoading && !portfolio) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-500 font-medium">Loading your portfolio...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
        <div className="max-w-md w-full bg-red-50 border border-red-100 rounded-2xl p-6 text-center">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-2xl font-bold">!</span>
          </div>
          <h3 className="text-red-900 font-bold text-lg mb-2">Sync Failed</h3>
          <p className="text-red-700 mb-6">{error}</p>
          <button
            onClick={() => fetchDashboardData()}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-colors shadow-sm"
          >
            <RefreshCcw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
        <div className="max-w-md">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Bitcoin className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-gray-900 font-bold text-xl mb-2">No Portfolio Data</h3>
          <p className="text-gray-500 mb-0">Connect your Binance API keys in settings to start tracking your assets.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Real-time performance and asset allocation.</p>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className={cn("w-2 h-2 rounded-full", isLoading ? "bg-blue-500 animate-pulse" : "bg-green-500")} />
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            Last updated: {new Date(portfolio.timestamp).toLocaleTimeString()}
          </span>
        </div>
      </header>

      {analytics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Balance"
            value={`$${analytics.totalValueUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            icon={<DollarSign className="w-5 h-5 text-blue-600" />}
            trend={analytics.pnl24hPercent}
            trendLabel="24h"
            bgClass="bg-blue-50"
          />
          <StatCard
            title="BTC Value"
            value={`${analytics.totalValueBtc.toFixed(4)} BTC`}
            icon={<Bitcoin className="w-5 h-5 text-orange-600" />}
            bgClass="bg-orange-50"
          />
          <StatCard
            title="24h P&L"
            value={`${analytics.pnl24h >= 0 ? '+' : ''}$${analytics.pnl24h.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            icon={<TrendingUp className="w-5 h-5 text-green-600" />}
            bgClass="bg-green-50"
            valueClass={analytics.pnl24h >= 0 ? "text-green-600" : "text-red-600"}
          />
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
             <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Market Movers</h3>
             <TopGainersLosers marketData={marketData} />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">Historical Performance</h2>
              <div className="flex gap-2">
                {['1D', '1W', '1M', 'ALL'].map(t => (
                  <button key={t} className={cn("px-3 py-1 text-xs font-semibold rounded-lg transition-colors",
                    t === '1D' ? "bg-gray-900 text-white" : "text-gray-500 hover:bg-gray-100")}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <HistoryLineChart history={history} />
          </section>

          <section className="bg-white overflow-hidden rounded-2xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">Your Assets</h2>
            </div>
            <MarketTable portfolio={portfolio} />
          </section>
        </div>

        <div className="space-y-8">
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Asset Allocation</h2>
            {analytics && <AllocationPieChart analytics={analytics} />}
          </section>

          <section className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-2xl shadow-lg text-white">
            <h3 className="text-lg font-bold mb-2">Smart Insights</h3>
            <p className="text-blue-100 text-sm leading-relaxed mb-4">
              Your portfolio is currently 85% correlated with BTC. Consider diversifying into stablecoins or other alts to reduce volatility.
            </p>
            <button className="w-full py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-sm font-semibold transition-colors">
              View AI Analysis
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, trend, trendLabel, bgClass, valueClass }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div className={cn("p-2.5 rounded-xl", bgClass)}>
          {icon}
        </div>
        {trend !== undefined && (
          <div className={cn(
            "flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold",
            trend >= 0 ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
          )}>
            {trend >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {Math.abs(trend).toFixed(2)}%
            <span className="font-normal opacity-70 ml-0.5">{trendLabel}</span>
          </div>
        )}
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">{title}</p>
        <p className={cn("text-2xl font-bold tracking-tight text-gray-900", valueClass)}>{value}</p>
      </div>
    </div>
  );
}
