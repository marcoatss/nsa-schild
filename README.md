# NSA-Schild

Product catalog web application with multi-language support (English/German).

## Stack

- **Backend**: Strapi CMS v4.24.3 (Node.js)
- **Frontend**: Next.js 14 (React, TypeScript)
- **Database**: PostgreSQL
- **Styling**: Tailwind CSS

## Two Ways to Run

### Option 1: Docker (Recommended) 🐳

**Easiest way to get started!**

```bash
# Quick start
./scripts/start.sh

# Or step by step
make build     # Build images
make up        # Start all services
make import-db # Import database
```

See **[DOCKER.md](DOCKER.md)** for complete Docker documentation.

### Option 2: Local Development

## Prerequisites

- **Node.js 18.10.0** (use nvm to manage versions - see below)
- **Python 3.8+** (for database import scripts)
- PostgreSQL (or Docker for database only)

### Important: Node.js Version

This project requires **Node.js 18.10.0**.

#### Install Node Version Manager (nvm)

**macOS/Linux:**
```bash
# Download and install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

# The script will automatically add nvm to your shell profile
# Restart terminal or manually load nvm:
source ~/.zshrc   # for zsh
source ~/.bashrc  # for bash

# Verify nvm installation
nvm --version
```

**Windows:**
- Download [nvm-windows](https://github.com/coreybutler/nvm-windows/releases)
- Run the installer
- Open a new terminal and verify: `nvm version`

**Alternative (macOS with Homebrew):**
```bash
brew install nvm
# Follow post-install instructions to add nvm to your shell profile
```

#### Install and use Node 18.10.0 with nvm

```bash
# Install Node 18.10.0
nvm install 18.10.0

# Use Node 18.10.0 in current session
nvm use 18.10.0

# Set Node 18.10.0 as default for all new terminals (recommended)
nvm alias default 18.10.0

# Verify installation
node -v  # Should show v18.10.0
npm -v   # Should show v8.19.2
```

**Pro tip:** This project includes a `.nvmrc` file in the root directory. When you enter the project directory, just run `nvm use` to automatically switch to the correct Node version (18.10.0).

## Quick Start

### 1. Database Setup (Choose one)

**PostgreSQL with Docker (Recommended):**
```bash
docker run -d --name schild-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=schild_db -p 5433:5432 postgres:latest
```

**Or SQLite:** No setup needed - Strapi creates `.tmp/data.db` automatically

### 2. Import Production Data (Optional)

If you have database exports in `db/` folder:
```bash
python3 -m pip install --user pandas pyarrow psycopg2-binary
python3 import-db.py
```

### 3. Backend Setup

```bash
cd backend
npm install

# Configure backend/.env:
# - For Docker PostgreSQL: DATABASE_PORT=5433
# - Generate secrets: node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

npm run develop       # Starts on http://localhost:1337
```

Create admin at `http://localhost:1337/admin`, then **enable public API permissions**:
- Settings → Users & Permissions → Roles → Public
- Enable `find` and `findOne` for all content types

### 4. Frontend Setup

```bash
cd frontend
npm install

# Edit frontend/.env for local dev:
# NEXT_PUBLIC_URL_BACKEND=http://localhost:1337
# NEXT_PUBLIC_SITE_URL=http://localhost:3000

npm run dev           # Starts on http://localhost:3000
```

## Environment Variables

### Backend (`backend/.env`)

The project includes a `backend/.env` file with empty values. Configure it for your environment:

**For local development with PostgreSQL:**
```bash
# Database
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=schild_db
DATABASE_USERNAME=your_username
DATABASE_PASSWORD=your_password

# Secrets (generate with: node -e "console.log(require('crypto').randomBytes(32).toString('base64'))")
APP_KEYS=key1,key2,key3,key4
JWT_SECRET=your_jwt_secret
ADMIN_JWT_SECRET=your_admin_jwt_secret
API_TOKEN_SALT=your_api_token_salt
TRANSFER_TOKEN_SALT=your_transfer_token_salt

# Environment
NODE_ENV=development
HOST=0.0.0.0
PORT=1337
```

**For local development with SQLite (easier):**
```bash
# Leave DATABASE_CLIENT empty or set to sqlite
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db

# Secrets (generate as above)
APP_KEYS=key1,key2,key3,key4
JWT_SECRET=your_jwt_secret
ADMIN_JWT_SECRET=your_admin_jwt_secret
API_TOKEN_SALT=your_api_token_salt
TRANSFER_TOKEN_SALT=your_transfer_token_salt

# Environment
NODE_ENV=development
```

### Frontend (`frontend/.env`)

The project includes a `frontend/.env` file with production URLs. Update it for local development:

```bash
# Local development
NEXT_PUBLIC_URL_BACKEND=http://localhost:1337
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Production (already configured in the file)
# NEXT_PUBLIC_URL_BACKEND=https://backend.schild.taotor.com
# NEXT_PUBLIC_SITE_URL=https://www.schild-einrichtung.de
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

## Troubleshooting

**Frontend shows blank page?**
- Enable public API permissions in Strapi (see step 3 above)
- Ensure content is published in Strapi admin

**Images not loading?**
- Expected with imported production data (references AWS S3)
- Upload new images via Strapi admin for local development

**More issues?** See [AGENT.md](./AGENT.md) troubleshooting section

## Documentation

- **[AGENT.md](./AGENT.md)** - Comprehensive guide for AI assistants and developers

## License

© 2025. All rights reserved.

