import { Worker, Job } from 'bullmq';
import { BinanceService } from '../services/binance.service';
import Redis from 'ioredis';

const redisConnection = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', {
  maxRetriesPerRequest: null
});

export function createSnapshotWorker(binanceService: BinanceService) {
  const worker = new Worker(
    'historical-snapshot',
    async (job: Job) => {
      const apiKey = process.env.BINANCE_API_KEY;
      const apiSecret = process.env.BINANCE_API_SECRET;

      if (!apiKey || !apiSecret) {
        throw new Error('Missing Binance credentials in environment');
      }
      console.log('Taking historical snapshot for job:', job.id);
      return await binanceService.syncPortfolio({ apiKey, apiSecret });
    },
    { connection: redisConnection }
  );

  return worker;
}
