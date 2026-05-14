import { z } from 'zod';

export const BinanceCredentialsSchema = z.object({
  apiKey: z.string().min(1, 'API Key is required'),
  apiSecret: z.string().min(1, 'API Secret is required'),
});

export type BinanceCredentials = z.infer<typeof BinanceCredentialsSchema>;

export const AssetSchema = z.object({
  symbol: z.string(),
  amount: z.number(),
  price: z.number(),
  value: z.number(),
});

export type Asset = z.infer<typeof AssetSchema>;

export const PortfolioSchema = z.object({
  totalValue: z.number(),
  assets: z.array(AssetSchema),
  timestamp: z.date(),
});

export type Portfolio = z.infer<typeof PortfolioSchema>;

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export const MarketDataSchema = z.object({
  symbol: z.string(),
  price: z.number(),
  priceChangePercent: z.number(),
});

export type MarketData = z.infer<typeof MarketDataSchema>;

export const PortfolioHistoryEntrySchema = z.object({
  timestamp: z.date(),
  totalValue: z.number(),
});

export type PortfolioHistoryEntry = z.infer<typeof PortfolioHistoryEntrySchema>;

export const PortfolioAnalyticsSchema = z.object({
  totalValueUsd: z.number(),
  totalValueBtc: z.number(),
  pnl24h: z.number(),
  pnl24hPercent: z.number(),
  allocations: z.array(z.object({
    symbol: z.string(),
    percentage: z.number(),
    value: z.number(),
  })),
});

export type PortfolioAnalytics = z.infer<typeof PortfolioAnalyticsSchema>;
