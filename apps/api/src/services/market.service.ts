import { BinanceClient } from '@crypto-portfolio/exchange';
import { MarketData, BinanceCredentials } from '@crypto-portfolio/core';

export class MarketService {
  private binanceClient: BinanceClient;

  constructor(credentials: BinanceCredentials) {
    this.binanceClient = new BinanceClient(credentials);
  }

  async getMarketPrices(): Promise<MarketData[]> {
    const tickers = await this.binanceClient.getTicker24hr();
    return tickers
      .filter((t: any) => t.symbol.endsWith('USDT'))
      .map((t: any) => ({
        symbol: t.symbol,
        price: parseFloat(t.lastPrice),
        priceChangePercent: parseFloat(t.priceChangePercent),
      }));
  }
}
