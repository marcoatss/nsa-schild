# Docker Setup Guide

This project is fully containerized with Docker for easy development and deployment.

## Quick Start

### Prerequisites
- Docker Desktop installed ([download here](https://www.docker.com/products/docker-desktop))
- Make (optional, but recommended)

### 1. Build and Start Services

**Option A: Backend + Database only (Recommended)**
```bash
# Using Make
make build
make up

# Or using docker-compose
docker-compose build
docker-compose up -d
```

Then run frontend locally for faster development:
```bash
cd frontend
npm run dev
```

**Option B: Full Docker Stack (Backend + Frontend + Database)**
```bash
# Using docker-compose with profile
docker-compose --profile full up -d

# Or build and run
docker-compose --profile full up --build -d
```

Services will be available at:
- **Backend (Strapi)**: http://localhost:1337/admin
- **Frontend (Next.js)**: http://localhost:3000
- **Database (PostgreSQL)**: localhost:5433

> **💡 Recommendation**: Run frontend locally (`npm run dev`) for faster hot-reload and easier debugging. Use Docker only when you need to test the full containerized setup.

### 2. Import Database (if you have `db/` folder)

```bash
# Using Make (runs locally)
make import-db

# Or using Docker
make import-db-docker

# Or using docker-compose directly
docker-compose run --rm db-import
```

This will:
- Import all data from `db/strapi/` Parquet files
- Reset admin users (allows you to create a new admin)
- Set up proper primary keys and sequences

### 3. Create Admin User

After import, visit http://localhost:1337/admin and create your first admin user.

---

## Common Commands

### Using Make (Recommended)

```bash
make help                # Show all available commands
make up                  # Start all services
make down                # Stop all services
make restart             # Restart all services
make logs                # View logs from all services
make backend             # View backend logs only
make frontend            # View frontend logs only
make import-db           # Import database (local Python)
make import-db-docker    # Import database (Docker)
make reset-admin         # Reset admin users (local Python)
make reset-admin-docker  # Reset admin users (Docker)
make clean               # Remove all containers and volumes
```

### Using Docker Compose

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Restart a service
docker-compose restart backend

# Import database (from Docker)
docker-compose run --rm db-import

# Import database (local Python, faster)
python3 scripts/import-db.py

# Reset admin users (from Docker)
docker-compose run --rm db-import python3 reset-admin.py

# Reset admin users (local Python, faster)
python3 scripts/reset-admin.py

# Open shell in a service
docker-compose exec backend sh
docker-compose exec postgres psql -U postgres -d schild_db
```

---

## Architecture

### Services

1. **postgres** - PostgreSQL 15 database
   - Port: 5433 (host) → 5432 (container)
   - Volume: `postgres_data` (persistent storage)

2. **backend** - Strapi CMS (Node.js 18.10.0)
   - Port: 1337
   - Depends on: postgres
   - Volume: `backend_uploads` (file uploads)

3. **frontend** - Next.js app (Node.js 18.10.0)
   - Port: 3000
   - Depends on: backend

4. **db-import** - Python tool for database import
   - Profile: `tools` (doesn't start automatically)
   - Run on-demand with `docker-compose run`

### Volumes

- `postgres_data` - Database storage (persistent)
- `backend_uploads` - File uploads (persistent)
- Code volumes - Hot-reload for development

---

## Development Workflow

### First Time Setup

1. Build images: `make build`
2. Start services: `make up` (backend + database only)
3. Import database: `make import-db`
4. Create admin user at http://localhost:1337/admin
5. Configure public permissions in Strapi admin
6. Run frontend locally: `cd frontend && npm run dev`
7. View frontend at http://localhost:3000

### Daily Development

**Recommended: Hybrid Setup (Docker backend + Local frontend)**

```bash
# Terminal 1: Start Docker services (backend + database)
make up
make logs backend  # Optional: view backend logs

# Terminal 2: Run frontend locally
cd frontend
npm run dev

# Make code changes (hot-reload enabled for both)
# ...

# When done
make down  # Stop Docker services
# Ctrl+C in frontend terminal
```

**Why hybrid?**
- ✅ **Faster frontend hot-reload** (no Docker overhead)
- ✅ **Direct access to frontend logs** in terminal
- ✅ **Easier debugging** with browser dev tools
- ✅ **Backend in Docker** for consistency
- ✅ **Database in Docker** for easy management

### Alternative: Full Docker

```bash
# Start everything in Docker
docker-compose --profile full up

# View logs
docker-compose logs -f

# Stop everything
docker-compose --profile full down
```

Use this when:
- Testing full containerized setup
- Matching production environment
- Working on Docker configuration

### Database Management

```bash
# Reset database and reimport
make clean
make up
make import-db

# Reset admin users only
make reset-admin
make restart
```

---

## Troubleshooting

### Services not starting

```bash
# Check service status
docker-compose ps

# Check logs for errors
make logs

# Restart a specific service
docker-compose restart backend
```

### Database connection errors

```bash
# Check if postgres is healthy
docker-compose ps postgres

# Check postgres logs
docker-compose logs postgres

# Verify database exists
docker-compose exec postgres psql -U postgres -l
```

### Port already in use

If ports 1337, 3000, or 5433 are already in use:

1. Stop conflicting services:
   ```bash
   # Find process using port
   lsof -ti:1337 | xargs kill -9
   lsof -ti:3000 | xargs kill -9
   lsof -ti:5433 | xargs kill -9
   ```

2. Or change ports in `docker-compose.yml`

### Clean slate restart

```bash
# Remove everything and start fresh
make clean
make build
make up
make import-db
```

### Node modules issues

If you see module errors:

```bash
# Rebuild images from scratch
docker-compose build --no-cache

# Or rebuild specific service
docker-compose build --no-cache backend
```

---

## Production Deployment

For production, create a `docker-compose.prod.yml`:

```yaml
version: '3.8'

services:
  backend:
    environment:
      NODE_ENV: production
    command: npm start

  frontend:
    environment:
      NODE_ENV: production
    command: npm start
```

Then deploy with:

```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

---

## Environment Variables

Environment variables are set in `docker-compose.yml`. To override:

1. Create `.env` file in project root:
   ```bash
   APP_KEYS=your_custom_keys
   JWT_SECRET=your_custom_secret
   ```

2. Docker Compose will automatically load them

---

## Backup & Restore

### Backup Database

```bash
# Backup to file
docker-compose exec postgres pg_dump -U postgres schild_db > backup.sql

# Or backup to custom format (compressed)
docker-compose exec postgres pg_dump -U postgres -Fc schild_db > backup.dump
```

### Restore Database

```bash
# From SQL file
docker-compose exec -T postgres psql -U postgres schild_db < backup.sql

# From custom format
docker-compose exec postgres pg_restore -U postgres -d schild_db /path/to/backup.dump
```

---

## Performance Tips

1. **Allocate more resources to Docker**
   - Docker Desktop → Settings → Resources
   - Increase CPU and Memory

2. **Use volumes wisely**
   - Code volumes enable hot-reload but can be slower on macOS/Windows
   - For production, copy code into image instead

3. **Prune unused resources**
   ```bash
   docker system prune -a --volumes
   ```

---

## Support

For issues or questions, check:
- `AGENT.md` - Detailed project documentation
- `README.md` - High-level overview
- Strapi docs: https://docs.strapi.io
- Next.js docs: https://nextjs.org/docs

