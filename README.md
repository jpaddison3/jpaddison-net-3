# JP Addison Personal Site & T3 Stack Example

A minimal personal website built on the [T3 Stack](https://create.t3.gg/), with some basic features to jumpstart future projects.

## Features

- **Homepage** - Short bio and links
- **Email Authentication** - Magic link system using NextAuth.js (console logging for development)
- **Protected Routes** - Server-side authentication with automatic redirects
- **Dual Data Patterns** - Both Server Actions and tRPC implementations side-by-side

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

## Deployment

This project is ready for deployment on Vercel, Netlify, or any Node.js hosting platform. See the [T3 deployment guides](https://create.t3.gg/en/deployment/vercel) for platform-specific instructions.

## Use as Template

This repository serves as a canonical example of:

- Modern T3 Stack setup with latest practices
- Authentication patterns for personal sites
- Server Actions vs tRPC architectural decisions
- Comprehensive development workflow setup

Perfect for bootstrapping new projects or demonstrating full-stack TypeScript patterns.
