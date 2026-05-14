import Fastify from 'fastify';
import { PrismaClient } from '@prisma/client';
import { PortfolioRepository } from './repositories/portfolio.repository';
import { BinanceService } from './services/binance.service';
import { MarketService } from './services/market.service';
import { AnalyticsService } from './services/analytics.service';
import { portfolioRoutes } from './routes/portfolio';
import { Queue } from 'bullmq';
import Redis from 'ioredis';
import { createPortfolioWorker } from './workers/portfolio.worker';
import { createSnapshotWorker } from './workers/snapshot.worker';
import dotenv from 'dotenv';

dotenv.config();

const fastify = Fastify({
  logger: true,
});

// Manual CORS implementation
fastify.addHook('onRequest', async (request, reply) => {
  reply.header('Access-Control-Allow-Origin', '*');
  reply.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  reply.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (request.method === 'OPTIONS') {
    return reply.status(204).send();
  }
});

const prisma = new PrismaClient();
const portfolioRepository = new PortfolioRepository(prisma);
const binanceService = new BinanceService(portfolioRepository);

const apiKey = process.env.BINANCE_API_KEY || '';
const apiSecret = process.env.BINANCE_API_SECRET || '';
const credentials = { apiKey, apiSecret };

const marketService = new MarketService(credentials);
const analyticsService = new AnalyticsService(portfolioRepository, marketService);

// BullMQ setup
const redisConnection = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', {
  maxRetriesPerRequest: null
});
const portfolioQueue = new Queue('portfolio-sync', { connection: redisConnection });
const snapshotQueue = new Queue('historical-snapshot', { connection: redisConnection });

createPortfolioWorker(binanceService);
createSnapshotWorker(binanceService);

// Schedule recurring jobs
async function setupJobs() {
  await portfolioQueue.add('sync', {}, {
    repeat: { pattern: '*/5 * * * *' } // Every 5 minutes
  });
  await snapshotQueue.add('snapshot', {}, {
    repeat: { pattern: '0 * * * *' } // Every hour
  });
}

setupJobs().catch(console.error);

fastify.register(portfolioRoutes, {
  binanceService,
  marketService,
  analyticsService
});

const start = async () => {
  try {
    await fastify.listen({ port: 3001, host: '0.0.0.0' });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
