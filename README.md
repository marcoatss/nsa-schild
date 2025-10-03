# NSA-Schild

Product catalog web application with multi-language support (English/German).

## Stack

- **Backend**: Strapi CMS v4.24.3 (Node.js)
- **Frontend**: Next.js 14 (React, TypeScript)
- **Database**: PostgreSQL
- **Styling**: Tailwind CSS

## Prerequisites

- **Node.js 20.x** (use nvm to manage versions - see below)
- PostgreSQL (or SQLite for development)

### Important: Node.js Version

This project requires **Node.js 20.x**. Using Node 18 or 24+ will cause engine warnings.

**Install and use Node 20 with nvm:**
```bash
# Install nvm (if not already installed)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

# Restart terminal or source your profile
source ~/.zshrc  # or ~/.bashrc

# Install Node 20
nvm install 20

# Use Node 20 (run this in each new terminal)
nvm use 20

# Set Node 20 as default
nvm alias default 20

# Verify
node -v  # Should show v20.x.x
```

**Pro tip:** This project includes a `.nvmrc` file. Just run `nvm use` in the project directory to automatically switch to the correct Node version.

## Quick Start

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env  # Configure environment variables
npm run develop       # Starts on http://localhost:1337
```

Create admin account at `http://localhost:1337/admin`

### Frontend Setup

```bash
cd frontend
npm install
cp .env.local.example .env.local  # Configure environment variables
npm run dev           # Starts on http://localhost:3000
```

## Environment Variables

**Backend** (`backend/.env`):
```bash
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_NAME=schild_db
DATABASE_USERNAME=your_username
DATABASE_PASSWORD=your_password
APP_KEYS=generate_random_keys
```

**Frontend** (`frontend/.env.local`):
```bash
NEXT_PUBLIC_URL_BACKEND=http://localhost:1337
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Project Structure

```
nsa-schild/
├── backend/          # Strapi CMS (port 1337)
├── frontend/         # Next.js app (port 3000)
└── db/              # Database exports (not tracked in git)
```

## Commands

**Backend:**
- `npm run develop` - Development mode with auto-reload
- `npm run build` - Build for production
- `npm run start` - Start production server

**Frontend:**
- `npm run dev` - Development mode
- `npm run build` - Build for production
- `npm run start` - Start production server

## Features

- Product catalog (Categories → Subcategories → Products)
- Material management
- Quote request system
- Multi-language (EN/DE)
- File uploads (AWS S3 in production)
- SEO optimized
- Excel export functionality

## Documentation

- **[AGENT.md](./AGENT.md)** - Comprehensive guide for AI assistants and developers

## License

© 2025. All rights reserved.


