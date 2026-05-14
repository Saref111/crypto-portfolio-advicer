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
