"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortfolioSchema = exports.AssetSchema = exports.BinanceCredentialsSchema = void 0;
const zod_1 = require("zod");
exports.BinanceCredentialsSchema = zod_1.z.object({
    apiKey: zod_1.z.string().min(1, 'API Key is required'),
    apiSecret: zod_1.z.string().min(1, 'API Secret is required'),
});
exports.AssetSchema = zod_1.z.object({
    symbol: zod_1.z.string(),
    amount: zod_1.z.number(),
    price: zod_1.z.number(),
    value: zod_1.z.number(),
});
exports.PortfolioSchema = zod_1.z.object({
    totalValue: zod_1.z.number(),
    assets: zod_1.z.array(exports.AssetSchema),
    timestamp: zod_1.z.date(),
});
