import { Portfolio, PortfolioAnalytics, MarketData } from '@crypto-portfolio/core';
import { PortfolioRepository } from '../repositories/portfolio.repository';
import { MarketService } from './market.service';

export class AnalyticsService {
  constructor(
    private portfolioRepository: PortfolioRepository,
    private marketService: MarketService
  ) {}

  async getAnalytics(): Promise<PortfolioAnalytics | null> {
    const snapshot = await this.portfolioRepository.getLatestSnapshot();
    if (!snapshot) return null;

    const marketData = await this.marketService.getMarketPrices();
    const marketMap = new Map(marketData.map(m => [m.symbol, m]));

    const btcMarket = marketMap.get('BTCUSDT');
    const btcPrice = btcMarket ? btcMarket.price : 1;

    const totalValueUsd = snapshot.totalValue;
    const totalValueBtc = totalValueUsd / btcPrice;

    let pnl24h = 0;

    snapshot.assets.forEach((asset: any) => {
      const market = marketMap.get(`${asset.symbol}USDT`);
      if (market) {
        const prevPrice = market.price / (1 + market.priceChangePercent / 100);
        const assetPnl = (market.price - prevPrice) * asset.amount;
        pnl24h += assetPnl;
      }
    });

    const pnl24hPercent = totalValueUsd > 0 ? (pnl24h / (totalValueUsd - pnl24h)) * 100 : 0;

    const allocations = snapshot.assets.map((asset: any) => ({
      symbol: asset.symbol,
      percentage: (asset.value / totalValueUsd) * 100,
      value: asset.value,
    })).sort((a: any, b: any) => b.value - a.value);

    return {
      totalValueUsd,
      totalValueBtc,
      pnl24h,
      pnl24hPercent,
      allocations,
    };
  }

  async getHistory(): Promise<any[]> {
    const snapshots = await this.portfolioRepository.getHistory();
    return snapshots.map((s: any) => ({
      timestamp: s.timestamp,
      totalValue: s.totalValue,
    }));
  }
}
