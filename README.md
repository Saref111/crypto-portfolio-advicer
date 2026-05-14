# Crypto Portfolio Tracker

A comprehensive cryptocurrency portfolio management system that synchronizes with Binance, provides historical snapshots, and offers advanced analytics.

## Architecture

This project is a monorepo managed with [pnpm](https://pnpm.io/) workspaces and [Turborepo](https://turbo.build/).

### Applications

- **`apps/web`**: A modern [Next.js](https://nextjs.org/) frontend for visualizing portfolio data, market prices, and analytics.
- **`apps/api`**: A high-performance [Fastify](https://www.fastify.io/) backend providing RESTful endpoints and managing background workers.

### Packages

- **`packages/core`**: Shared business logic and shared utilities.
- **`packages/exchange`**: Dedicated Binance API client for fetching market data and portfolio information.

## Tech Stack

- **Frontend**: Next.js, Tailwind CSS, Recharts, Zustand.
- **Backend**: Fastify, Node.js, TypeScript.
- **Database**: PostgreSQL with [Prisma ORM](https://www.prisma.io/).
- **Task Queue**: [BullMQ](https://docs.bullmq.io/) with Redis for background jobs (portfolio syncing, snapshots).
- **Infrastructure**: Docker and Docker Compose.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (>= 20.0.0)
- [pnpm](https://pnpm.io/) (>= 10.0.0)
- [Docker](https://www.docker.com/) and Docker Compose

### Local Development Setup

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd crypto-portfolio
    ```

2.  **Install dependencies**:
    ```bash
    pnpm install
    ```

3.  **Setup environment variables**:
    Copy the example environment file and fill in your credentials:
    ```bash
    cp .env.example .env
    ```

4.  **Start infrastructure**:
    Spin up PostgreSQL and Redis using Docker Compose:
    ```bash
    docker-compose up -d postgres redis
    ```

5.  **Initialize Database**:
    Generate the Prisma client and run migrations:
    ```bash
    pnpm --filter api prisma:generate
    pnpm --filter api prisma:migrate
    ```

6.  **Run in development mode**:
    ```bash
    pnpm dev
    ```
    - Frontend: `http://localhost:3000`
    - Backend: `http://localhost:3001`

### Running with Docker

You can run the entire stack using Docker Compose:

```bash
docker-compose up --build
```

## Environment Variables

The following environment variables are required:

| Variable | Description | Default |
| :--- | :--- | :--- |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:password@localhost:5432/crypto_portfolio` |
| `REDIS_URL` | Redis connection string | `redis://localhost:6379` |
| `BINANCE_API_KEY` | Your Binance API Key | - |
| `BINANCE_API_SECRET` | Your Binance API Secret | - |
| `NEXT_PUBLIC_API_URL` | URL of the backend API (Frontend) | `http://localhost:3001` |
