import { PrismaClient } from '@prisma/client';
import { Portfolio } from '@crypto-portfolio/core';

export class PortfolioRepository {
  constructor(private prisma: PrismaClient) {}

  async saveSnapshot(portfolio: Portfolio) {
    return this.prisma.portfolioSnapshot.create({
      data: {
        totalValue: portfolio.totalValue,
        timestamp: portfolio.timestamp,
        assets: {
          create: portfolio.assets.map(asset => ({
            symbol: asset.symbol,
            amount: asset.amount,
            price: asset.price,
            value: asset.value,
          })),
        },
      },
      include: {
        assets: true,
      },
    });
  }

  async getLatestSnapshot() {
    return this.prisma.portfolioSnapshot.findFirst({
      orderBy: {
        timestamp: 'desc',
      },
      include: {
        assets: true,
      },
    });
  }
}
