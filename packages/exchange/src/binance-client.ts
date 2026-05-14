import axios, { AxiosInstance } from 'axios';
import CryptoJS from 'crypto-js';
import { Asset, BinanceCredentials } from '@crypto-portfolio/core';

export class BinanceClient {
  private client: AxiosInstance;
  private readonly apiKey: string;
  private readonly apiSecret: string;
  private readonly baseUrl = 'https://api.binance.com';

  constructor(credentials: BinanceCredentials) {
    this.apiKey = credentials.apiKey;
    this.apiSecret = credentials.apiSecret;
    this.client = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'X-MBX-APIKEY': this.apiKey,
      },
    });
  }

  private sign(queryString: string): string {
    return CryptoJS.HmacSHA256(queryString, this.apiSecret).toString(CryptoJS.enc.Hex);
  }

  private async request(path: string, method: 'GET' | 'POST' = 'GET', params: Record<string, any> = {}) {
    const timestamp = Date.now();
    const queryParams = { ...params, timestamp };
    const queryString = Object.entries(queryParams)
      .map(([key, val]) => `${key}=${val}`)
      .join('&');
    const signature = this.sign(queryString);
    const url = `${path}?${queryString}&signature=${signature}`;

    try {
      const response = await this.client.request({
        method,
        url,
      });
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.status === 429) {
        throw new Error('Binance API Rate Limit Exceeded');
      }
      throw error;
    }
  }

  async getBalances(): Promise<any[]> {
    const data = await this.request('/api/v3/account');
    return data.balances.filter((b: any) => parseFloat(b.free) > 0 || parseFloat(b.locked) > 0);
  }

  async getTickerPrices(): Promise<Record<string, number>> {
    const response = await axios.get(`${this.baseUrl}/api/v3/ticker/price`);
    const prices: Record<string, number> = {};
    response.data.forEach((ticker: any) => {
      prices[ticker.symbol] = parseFloat(ticker.price);
    });
    return prices;
  }

  async getPortfolio(): Promise<Asset[]> {
    const [balances, prices] = await Promise.all([this.getBalances(), this.getTickerPrices()]);
    
    const assets: Asset[] = balances.map((b) => {
      const amount = parseFloat(b.free) + parseFloat(b.locked);
      const symbol = b.asset;
      let price = 1;
      
      if (symbol !== 'USDT') {
        price = prices[`${symbol}USDT`] || 0;
      }

      return {
        symbol,
        amount,
        price,
        value: amount * price,
      };
    }).filter(a => a.value > 0.01);

    return assets;
  }
}
