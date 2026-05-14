import { Card } from "@/components/dashboard/total-value-card";
import { PortfolioTable } from "@/components/dashboard/portfolio-table";

async function getPortfolio() {
  try {
    const res = await fetch("http://localhost:3001/portfolio", { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch (e) {
    return null;
  }
}

export default async function DashboardPage() {
  const portfolio = await getPortfolio();

  if (!portfolio) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-gray-500">No portfolio data available. Please trigger a sync.</p>
        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Sync Now (Simulation)
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Total Balance" value={`$${portfolio.totalValue.toLocaleString()}`} subtitle="+2.5% since last sync" />
        <Card title="Assets Count" value={portfolio.assets.length.toString()} />
        <Card title="Last Updated" value={new Date(portfolio.timestamp).toLocaleTimeString()} />
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-900">Your Assets</h3>
        <PortfolioTable assets={portfolio.assets} />
      </div>
    </div>
  );
}
