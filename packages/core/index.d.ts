import { z } from 'zod';
export declare const BinanceCredentialsSchema: z.ZodObject<{
    apiKey: z.ZodString;
    apiSecret: z.ZodString;
}, z.core.$strip>;
export type BinanceCredentials = z.infer<typeof BinanceCredentialsSchema>;
export declare const AssetSchema: z.ZodObject<{
    symbol: z.ZodString;
    amount: z.ZodNumber;
    price: z.ZodNumber;
    value: z.ZodNumber;
}, z.core.$strip>;
export type Asset = z.infer<typeof AssetSchema>;
export declare const PortfolioSchema: z.ZodObject<{
    totalValue: z.ZodNumber;
    assets: z.ZodArray<z.ZodObject<{
        symbol: z.ZodString;
        amount: z.ZodNumber;
        price: z.ZodNumber;
        value: z.ZodNumber;
    }, z.core.$strip>>;
    timestamp: z.ZodDate;
}, z.core.$strip>;
export type Portfolio = z.infer<typeof PortfolioSchema>;
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}
