# NSA-Schild

Product catalog web application with multi-language support (English/German).

## Prerequisites

- Docker & Docker Compose (for backend)
- Node.js 18.10.0 (for frontend development only)
- Python 3.8+ (for database import scripts)

## Quick Start

### First Time Setup

```bash
# 1. Set database export path (REQUIRED - must be outside this repository)
export DB_EXPORT_PATH=/path/to/your/database/export

# 2. Complete setup (builds images, starts services, prompts for database import)
make setup

# 3. Create Strapi admin on first visit
# Open http://localhost:1337/admin and create the first admin user

# 4. Run the frontend
cd frontend
npm install
npm run dev
```

### Daily Use

```bash
# Start services (prompts for import if database not imported)
make start

# Stop services (keeps data)
make stop
```

## Access

- Strapi Admin: http://localhost:1337/admin
- Next.js App: http://localhost:3000

## Stack

- Backend: Strapi CMS v4.24.3 + PostgreSQL 15.6 (exact: sha256:1ebd963e5c598f944a4e9ba27de4c95289d663dcc73731025aa53c5254094d8f)
- Frontend: Next.js 14 (React, TypeScript, Tailwind CSS)

## Commands

**Essential:**
```bash
make setup         # First-time setup (builds + starts + prompts for DB import)
make start         # Start services (prompts for import if database not imported)
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

- Sharp module error
```bash
# Ensure placeholder plugin is disabled
# File: backend/config/plugins.ts
# Set: placeholder.enabled = false
make restart
```
- More issues? See `AGENT.md` for comprehensive troubleshooting.

## Documentation

- `AGENT.md` - Complete developer guide
- `DOCKER.md` - Docker setup details
