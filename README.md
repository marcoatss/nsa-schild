# NSA-Schild

Product catalog web application with multi-language support (English/German).

## Prerequisites

- Docker & Docker Compose (for backend)
- Node.js 18.17.0+ (for frontend development only)
- Python 3.8+ (for database import scripts)

**Node.js Version Management:**
```bash
# If using nvm (recommended)
nvm use 18.17.0

# Or install Node.js 18.17.0+ directly
```

## Quick Start

### First Time Setup

```bash
# 1. Set database export path (REQUIRED - must be outside this repository)
export DB_EXPORT_PATH=/path/to/your/database/export

# 2. Start development environment
make start  # Sets up .env files and starts backend services

# 3. Create Strapi admin on first visit
# Open http://localhost:1337/admin and create the first admin user

# 4. Run the frontend
cd frontend
npm install
npm run dev
```

### Daily Use

```bash
# Development (backend only - recommended)
make start              # Sets up env files and starts backend + database

# Then run frontend locally (faster development)
cd frontend
npm run dev             # Frontend at http://localhost:3000

# OR run everything in Docker (slower)
make start-full-detached # Start backend + frontend + database (background)
make start-full         # Start with live logs (blocks terminal)

# Stop services
make stop
```

## Environment Files

The project uses environment-specific configuration files:

**Development Mode:**
- `backend/.env.development` - Created by `make start` (Docker service URLs, dev settings)
- `frontend/.env.local` - Created by `make start` (localhost URLs for browser access)

**Production Mode:**
- `backend/.env.production` - Created by `make start-prod` (Docker service URLs, production settings)
- `frontend/.env.production` - Created by `make start-prod` (Docker service URLs for containerized frontend)

**Template Files (committed to git):**
- `backend/.env.example` - Template for backend configuration
- `frontend/.env.example` - Template for frontend configuration

## Access

- **Strapi Admin**: http://localhost:1337/admin
- **Next.js App**: http://localhost:3000 (run `cd frontend && npm run dev` OR `make start-full-detached`)

## Stack

- Backend: Strapi CMS v4.24.3 + PostgreSQL 15.6 (exact: sha256:1ebd963e5c598f944a4e9ba27de4c95289d663dcc73731025aa53c5254094d8f)
- Frontend: Next.js 14 (React, TypeScript, Tailwind CSS)

## Commands

**Essential:**
```bash
make start         # Start development services (sets up .env.development files + starts backend)
make start-prod    # Start production services (sets up .env.production files + starts all services)
make stop          # Stop services (keeps data)
make destroy       # Destroy everything including data (⚠️ requires typing "DESTROY")
```

**Database (when needed):**
```bash
export DB_EXPORT_PATH=/absolute/path/outside/this/repo

# Option 1: Import using local Python (requires: pip install -r requirements.txt)
make import-db

# Option 2: Import using Docker (no Python setup needed)
make import-db-docker

# Other database commands
make force-import  # Force re-import (destroys existing data)
make reset-admin   # Reset Strapi admin users
```

**Development:**
```bash
make logs          # View backend logs
cd frontend && npm install && npm run dev    # Frontend development
```

## Features

- Product catalog (Categories → Subcategories → Products)
- Material management
- Quote request system
- Multi-language (EN/DE)
- File uploads (AWS S3 in production)
- SEO optimized
- Excel export functionality

## Troubleshooting

**Frontend shows "Failed to parse URL" or connection errors:**
```bash
# Frontend environment files are automatically created by make commands:
# - make start creates frontend/.env.local (for local development)
# - make start-prod creates frontend/.env.production (for Docker)
# If issues persist, manually create:
cd frontend
cp .env.example .env.local
# Restart frontend dev server
```

**Sharp module error:**
```bash
# Ensure placeholder plugin is disabled
# File: backend/config/plugins.ts
# Set: placeholder.enabled = false
make restart
```

**Frontend not accessible at localhost:3000:**
- Backend runs in Docker by default (only port 1337)
- Frontend must be run locally: `cd frontend && npm run dev`
- OR start everything in Docker: `make start-full-detached` (background)

**Terminal blocked when using `make start-full`:**
- Use `make start-full-detached` to run in background
- Or press `Ctrl+C` to stop, then use detached version

More issues? See `AGENT.md` for comprehensive troubleshooting.

## Production Deployment

### Quick Setup

```bash
# 1. Clone repository
git clone <repository-url>
cd nsa-schild

# 2. Start in production mode
make start-prod  # Creates .env.production files with Docker service URLs and starts services (detached)

# 3. Edit production environment files (automatically used by Docker containers)
# Backend .env.production is automatically configured for Docker containers:
# - DATABASE_HOST=postgres (Docker service name)
# - NODE_ENV=production
# - Other values copied from .env.example

# Frontend .env.production is automatically configured for Docker containers:
# - NEXT_PUBLIC_URL_BACKEND=http://backend:1337 (Docker service name)

# Edit both files with your production values:
# - Database credentials, JWT secrets, AWS S3 credentials, domain URLs

# 4. Import database (if needed)
export DB_EXPORT_PATH=/path/to/production/database
make import-db-docker

# 5. Create admin user and configure
# Visit http://localhost:1337/admin (or your domain)
# Create the first admin user
# Configure public API permissions: Settings → Users & Permissions → Roles → Public
# Enable 'find' and 'findOne' for all content types
```

### Production Environment Variables

**Backend (`backend/.env.production`):**
```bash
NODE_ENV=production
DATABASE_CLIENT=postgres
DATABASE_HOST=your-db-host
DATABASE_PORT=5432
DATABASE_NAME=schild_db
DATABASE_USERNAME=your-username
DATABASE_PASSWORD=your-password
APP_KEYS=your-app-keys
JWT_SECRET=your-jwt-secret
ADMIN_JWT_SECRET=your-admin-jwt-secret
API_TOKEN_SALT=your-api-token-salt
TRANSFER_TOKEN_SALT=your-transfer-token-salt

# Optional: AWS S3 for file uploads
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=your-region
S3_BUCKET_NAME=your-bucket-name
```

**Frontend (`frontend/.env.production`):**
```bash
NEXT_PUBLIC_URL_BACKEND=https://your-backend-domain.com
NEXT_PUBLIC_SITE_URL=https://your-frontend-domain.com
```

### Deployment Options

**Option 1: Single Server (Docker Compose)**
```bash
# All services on one server
make start-full-detached
# Access: backend.domain.com, frontend.domain.com
```

**Option 2: Separate Services**
```bash
# Backend only (Strapi + Database)
make start

# Frontend on separate server
cd frontend
npm run build
npm start
```

**Option 3: Cloud Platforms**
- **Backend**: Deploy to Railway, DigitalOcean, AWS, etc.
- **Frontend**: Deploy to Vercel, Netlify, etc.
- **Database**: Use managed PostgreSQL (AWS RDS, DigitalOcean, etc.)

### Security Checklist

- [ ] Change all default secrets and passwords
- [ ] Use HTTPS for all domains
- [ ] Configure firewall (only ports 80, 443)
- [ ] Set up SSL certificates
- [ ] Configure CORS for production domains
- [ ] Enable Strapi rate limiting
- [ ] Set up database backups
- [ ] Configure monitoring and logs

## Documentation

- `AGENT.md` - Complete developer guide
- `DOCKER.md` - Docker setup details
