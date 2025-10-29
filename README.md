# JP Addison Personal Site & T3 Stack Example

A minimal personal website built on the [T3 Stack](https://create.t3.gg/), with some basic features to jumpstart future projects.

## Features

- **Homepage** - Short bio and links
- **Email Authentication** - Magic link system using NextAuth.js (console logging for development)
- **Protected Routes** - Server-side authentication with automatic redirects
- **Dual Data Patterns** - Both Server Actions and tRPC implementations side-by-side
- **Structured Logging** - Logging system with configurable verbosity

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Authentication**: NextAuth.js v5 with email provider
- **Database**: Prisma with SQLite (easily swappable)
- **Styling**: Tailwind CSS v4
- **Type Safety**: TypeScript with strict configuration
- **API**: tRPC for type-safe client-server communication
- **Dev Tools**: ESLint, Prettier, pre-commit hooks

## Quick Start

```bash
# Clone and install
git clone <repo-url>
cd jpaddison-net-3
npm install

# Set up environment
cp .env.example .env
# Generate AUTH_SECRET: npx auth secret

# Initialize database
npm run db:push

# Start development
npm run dev        # http://localhost:3000
```

## Key Pages

- **/** - Homepage
- **/auth/login** - Email authentication page
- **/protected** - Authenticated page showcasing Server Actions vs tRPC
- **/text-chunker** - Text chunking tool for splitting large texts based on token limits

## Project Structure

```
src/
├── app/
│   ├── auth/login/          # Email authentication
│   ├── protected/           # Protected route examples
│   └── page.tsx             # Homepage
├── server/
│   ├── api/routers/         # tRPC routers
│   └── auth/                # NextAuth.js configuration
└── trpc/                    # Client-side tRPC setup
```

## Logging System

The application includes a structured logging system with configurable verbosity.

### Configuration

Set the log level via environment variable:

```bash
NEXT_PUBLIC_LOG_LEVEL="debug"  # Shows all logs including detailed debugging
NEXT_PUBLIC_LOG_LEVEL="info"   # Default - shows operational info
NEXT_PUBLIC_LOG_LEVEL="warn"   # Only warnings and errors
NEXT_PUBLIC_LOG_LEVEL="error"  # Only errors
```

### Usage

Import and use the pre-configured loggers:

```typescript
// Use pre-configured named loggers
import { authLogger, apiLogger, dbLogger } from "~/lib/logger";

// Log with context
authLogger.info("User logged in", { userId: user.id });
apiLogger.debug("API request", { endpoint: "/api/users", method: "GET" });

// Create custom loggers for new features
import { createLogger } from "~/lib/logger";
const myFeatureLogger = createLogger("MY_FEATURE");
myFeatureLogger.warn("Validation failed", { field: "email" });

// Context-scoped logging
const userLogger = authLogger.withContext({ userId: "123" });
userLogger.info("Session created"); // Automatically includes userId
```

## Deployment

This project is ready for deployment on Vercel, Netlify, or any Node.js hosting platform. See the [T3 deployment guides](https://create.t3.gg/en/deployment/vercel) for platform-specific instructions.

## Use as Template

This repository serves as a canonical example of:

- Modern T3 Stack setup with latest practices
- Authentication patterns for personal sites
- Server Actions vs tRPC architectural decisions
- Comprehensive development workflow setup

Perfect for bootstrapping new projects or demonstrating full-stack TypeScript patterns.
