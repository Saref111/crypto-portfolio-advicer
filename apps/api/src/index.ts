import Fastify from 'fastify';
import { PrismaClient } from '@prisma/client';
import { PortfolioRepository } from './repositories/portfolio.repository';
import { BinanceService } from './services/binance.service';
import { portfolioRoutes } from './routes/portfolio';
import dotenv from 'dotenv';

dotenv.config();

const fastify = Fastify({
  logger: true,
});

const prisma = new PrismaClient();
const portfolioRepository = new PortfolioRepository(prisma);
const binanceService = new BinanceService(portfolioRepository);

fastify.register(portfolioRoutes, { binanceService });

const start = async () => {
  try {
    await fastify.listen({ port: 3001, host: '0.0.0.0' });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
