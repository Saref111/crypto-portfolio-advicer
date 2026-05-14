import { create } from 'zustand';
import { Portfolio, MarketData, PortfolioAnalytics, PortfolioHistoryEntry } from '@crypto-portfolio/core';

interface PortfolioState {
  portfolio: Portfolio | null;
  marketData: MarketData[];
  analytics: PortfolioAnalytics | null;
  history: PortfolioHistoryEntry[];
  isLoading: boolean;
  error: string | null;
  fetchDashboardData: () => Promise<void>;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const usePortfolioStore = create<PortfolioState>((set) => ({
  portfolio: null,
  marketData: [],
  analytics: null,
  history: [],
  isLoading: false,
  error: null,

  fetchDashboardData: async () => {
    set({ isLoading: true, error: null });
    try {
      const [portfolioRes, marketRes, analyticsRes, historyRes] = await Promise.all([
        fetch(`${API_URL}/portfolio`),
        fetch(`${API_URL}/market/prices`),
        fetch(`${API_URL}/portfolio/analytics`),
        fetch(`${API_URL}/portfolio/history`),
      ]);

      if (!portfolioRes.ok || !marketRes.ok || !analyticsRes.ok || !historyRes.ok) {
        throw new Error('Failed to fetch dashboard data');
      }

      const [portfolio, marketData, analytics, history] = await Promise.all([
        portfolioRes.json(),
        marketRes.json(),
        analyticsRes.json(),
        historyRes.json(),
      ]);

      set({
        portfolio,
        marketData,
        analytics,
        history,
        isLoading: false,
      });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
}));
