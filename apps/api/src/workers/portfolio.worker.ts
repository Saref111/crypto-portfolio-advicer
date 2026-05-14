import { Worker, Job } from 'bullmq';
import { BinanceService } from '../services/binance.service';
import Redis from 'ioredis';

const redisConnection = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', {
  maxRetriesPerRequest: null
});

export function createPortfolioWorker(binanceService: BinanceService) {
  const worker = new Worker(
    'portfolio-sync',
    async (job: Job) => {
      const apiKey = process.env.BINANCE_API_KEY;
      const apiSecret = process.env.BINANCE_API_SECRET;

      if (!apiKey || !apiSecret) {
        throw new Error('Missing Binance credentials in environment');
      }
      console.log('Syncing portfolio for job:', job.id);
      return await binanceService.syncPortfolio({ apiKey, apiSecret });
    },
    { connection: redisConnection }
  );

  worker.on('completed', (job) => {
    console.log(`Job ${job.id} completed!`);
  });

  worker.on('failed', (job, err) => {
    console.log(`Job ${job?.id} failed with ${err.message}`);
  });

  return worker;
}
