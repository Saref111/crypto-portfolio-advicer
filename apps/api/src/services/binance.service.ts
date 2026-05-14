import { BinanceClient } from '@crypto-portfolio/exchange';
import { Portfolio, BinanceCredentials } from '@crypto-portfolio/core';
import { PortfolioRepository } from '../repositories/portfolio.repository';

export class BinanceService {
  constructor(private portfolioRepository: PortfolioRepository) {}

  async syncPortfolio(credentials: BinanceCredentials): Promise<Portfolio> {
    const client = new BinanceClient(credentials);
    const assets = await client.getPortfolio();
    const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0);
    
    const portfolio: Portfolio = {
      totalValue,
      assets,
      timestamp: new Date(),
    };

    await this.portfolioRepository.saveSnapshot(portfolio);
    return portfolio;
  }

  async getPortfolio(): Promise<Portfolio | null> {
    const snapshot = await this.portfolioRepository.getLatestSnapshot();
    if (!snapshot) return null;

    return {
      totalValue: snapshot.totalValue,
      assets: snapshot.assets.map(a => ({
        symbol: a.symbol,
        amount: a.amount,
        price: a.price,
        value: a.value,
      })),
      timestamp: snapshot.timestamp,
    };
  }
}
