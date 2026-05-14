import { FastifyInstance } from 'fastify';
import { BinanceService } from '../services/binance.service';

export async function portfolioRoutes(fastify: FastifyInstance, options: { binanceService: BinanceService }) {
  const { binanceService } = options;

  fastify.get('/health', async () => {
    return { status: 'ok' };
  });

  fastify.get('/portfolio', async (request, reply) => {
    const portfolio = await binanceService.getPortfolio();
    if (!portfolio) {
      return reply.status(404).send({ error: 'No portfolio data found' });
    }
    return portfolio;
  });

  fastify.get('/portfolio/assets', async (request, reply) => {
    const portfolio = await binanceService.getPortfolio();
    if (!portfolio) {
      return reply.status(404).send({ error: 'No portfolio data found' });
    }
    return portfolio.assets;
  });

  fastify.post('/portfolio/sync', async (request, reply) => {
    const apiKey = process.env.BINANCE_API_KEY;
    const apiSecret = process.env.BINANCE_API_SECRET;

    if (!apiKey || !apiSecret) {
      return reply.status(400).send({ error: 'Binance credentials not configured' });
    }

    try {
      const portfolio = await binanceService.syncPortfolio({ apiKey, apiSecret });
      return portfolio;
    } catch (error: any) {
      return reply.status(500).send({ error: error.message });
    }
  });
}
