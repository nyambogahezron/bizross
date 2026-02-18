# Contributing to POS System

Thank you for your interest in contributing! This is a monorepo managed by **TurboRepo** and **pnpm**.

## Getting Started

1.  **Prerequisites**:
    *   Node.js >= 18
    *   pnpm >= 9 (`npm i -g pnpm`)

2.  **Setup**:
    ```bash
    git clone <repository-url>
    cd pos
    pnpm install
    ```

3.  **Development**:
    *   Run all apps: `pnpm dev`
    *   Run specific app: `pnpm --filter @pos/web dev`

## Directory Structure

*   `apps/`: User-facing applications.
*   `services/`: Backend microservices.
*   `packages/`: Shared libraries.

## Pull Request Process

1.  Ensure all tests match the code changes.
2.  Run `pnpm lint` and `pnpm build` to ensure no errors.
3.  Update documentation if needed.
