# NSA-Schild

Product catalog web application with multi-language support (English/German).

## Stack

- **Backend**: Strapi CMS v4.24.3 (Docker only)
- **Frontend**: Next.js 14 (React, TypeScript) 
- **Database**: PostgreSQL (Docker)
- **Styling**: Tailwind CSS

## Quick Start

### 1. Clone & Start Backend (Docker)
```bash
git clone <repository-url>
cd nsa-schild

# Start backend services
make build
make up

# IMPORTANT: Import database if ./db folder exists
make import-db
```

### 2. Start Frontend (Local - Optional)
```bash
# For faster development, run frontend locally
cd frontend
npm install
npm run dev
```

### 3. Access Application
- **Backend Admin**: http://localhost:1337/admin
- **Frontend**: http://localhost:3000
- **API**: http://localhost:1337/api

## Prerequisites

- **Docker & Docker Compose** (for backend)
- **Node.js 18.10.0** (for frontend development only)
- **Python 3.8+** (for database import scripts)

## Important Notes

> **⚠️ Database Import is MANDATORY**  
> If the `./db` folder exists, you MUST import the database before starting the backend.  
> The system will block you if you skip this step.

> **⚠️ Backend runs in Docker only**  
> No local Node.js installation needed for backend development.

## Setup Frontend Locally (Optional)

If you want faster frontend development:

```bash
# Install Node 18.10.0 (if not installed)
nvm install 18.10.0
nvm use 18.10.0

# Install frontend dependencies
cd frontend
npm install
npm run dev
```

## Commands

**Backend (Docker):**
```bash
make build         # Build Docker images
make up            # Start backend services
make down          # Stop all services
make logs          # View container logs
make import-db     # Import database from ./db folder
make reset-admin   # Reset admin users
```

**Frontend (Local):**
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
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

**Frontend shows blank page?**
- Enable public API permissions in Strapi admin
- Ensure content is published in Strapi admin

**Database import issues?**
- Check if `./db` folder exists
- Run `make import-db` before starting backend

**More issues?** See [AGENT.md](./AGENT.md) for comprehensive troubleshooting

## Documentation

- **[AGENT.md](./AGENT.md)** - Complete developer guide
- **[DOCKER.md](./DOCKER.md)** - Docker setup details

