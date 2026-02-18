# POS System Monorepo

Enterprise-grade Point of Sale (POS) system built with a microservices architecture.

## Architecture

The project is organized as a monorepo using **TurboRepo** and **pnpm**.

### Directory Structure

- **apps/**: User-facing applications (Web, Mobile, Desktop) and API Gateway.
- **services/**: Backend microservices (Auth, Inventory, Orders, etc.).
- **packages/**: Shared libraries (Database, Types, UI, etc.).

## Getting Started

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Run development server:
   ```bash
   pnpm dev
   ```

3. Build all packages:
   ```bash
   pnpm build
   ```
