.PHONY: help build setup start down restart logs clean import-db reset-admin backend frontend setup-env start-prod

# State tracking file
DB_STATE_FILE = .db_imported

# Default target
help:
	@echo "NSA Schild Commands"
	@echo ""
	@echo "Main Commands:"
	@echo "  make start              - Start development environment (backend only, sets up env files)"
	@echo "  make start-prod         - Start production environment (all services, sets up env files)"
	@echo ""
	@echo "Daily Use:"
	@echo "  make start-logs         - Start services with live logs"
	@echo "  make start-full         - Start ALL services with live logs (blocks terminal)"
	@echo "  make start-full-detached - Start ALL services in background"
	@echo "  make start-wait         - Start services and wait silently"
	@echo "  make stop               - Stop all services (remove containers)"
	@echo "  make restart            - Restart all services"
	@echo ""
	@echo "Database Management:"
	@echo "  make import-db          - Import database using local Python"
	@echo "  make import-db-docker   - Import database using Docker (no Python setup)"
	@echo "  make reset-admin        - Reset admin users (allows new admin creation)"
	@echo "  make force-import       - Force re-import database (destroys existing data)"
	@echo ""
	@echo "  Required: export DB_EXPORT_PATH=/path/to/database"
	@echo ""
	@echo "Development:"
	@echo "  make logs               - View logs from all services"
	@echo "  make backend            - View backend logs only"
	@echo "  make frontend           - View frontend logs only"
	@echo ""
	@echo "Maintenance:"
	@echo "  make build              - Build all Docker images"
	@echo "  make destroy            - Destroy everything (ALL DATA LOST!)"
	@echo ""

# Start development environment (backend only)
start:
	@echo "🚀 Starting development environment..."
	@echo ""
	@echo "Step 1: Setting up environment files..."
	@if [ ! -f backend/.env.development ]; then \
		echo "   Creating backend/.env.development from .env.example (Docker URLs + dev settings)..."; \
		sed 's|DATABASE_HOST=localhost|DATABASE_HOST=postgres|g; s|DATABASE_PASSWORD=your-secure-password|DATABASE_PASSWORD=postgres|g' backend/.env.example > backend/.env.development 2>/dev/null || echo "   ⚠️  backend/.env.example not found, you'll need to create backend/.env.development manually"; \
	else \
		echo "   ✅ backend development environment file already exists"; \
	fi
	@if [ ! -f frontend/.env.local ] && [ ! -f frontend/.env.production ]; then \
		echo "   Creating frontend/.env.local from .env.example..."; \
		cp frontend/.env.example frontend/.env.local 2>/dev/null || echo "   ⚠️  frontend/.env.example not found, you'll need to create frontend/.env.local manually"; \
	else \
		echo "   ✅ frontend environment file already exists"; \
	fi
	@echo ""
	@echo "Step 2: Building Docker images..."
	docker compose build --progress=plain postgres backend
	@echo ""
	@echo "Step 3: Starting services..."
	ENV_SUFFIX="" docker compose up -d postgres backend
	@echo ""
	@echo "Step 4: Waiting for services to be ready..."
	@timeout=120; \
	while [ $$timeout -gt 0 ]; do \
		if curl -s -f http://localhost:1337/admin >/dev/null 2>&1; then \
			break; \
		fi; \
		echo "   Waiting for Strapi..."; \
		sleep 2; \
		timeout=$$((timeout - 2)); \
	done; \
	if [ $$timeout -le 0 ]; then \
		echo "❌ Timeout waiting for Strapi to start"; \
		echo "   Check logs with: make logs"; \
		exit 1; \
	fi
	@echo ""
	@if [ ! -f $(DB_STATE_FILE) ]; then \
		echo "⚠️  Database not imported yet!"; \
		echo ""; \
		echo "   This application works best with imported data."; \
		echo "   Would you like to import the database now?"; \
		echo ""; \
		echo "   (Make sure to set: export DB_EXPORT_PATH=/path/to/database)"; \
		echo ""; \
		read -p "   Import database? (y/n): " -r; \
		if [[ "$$REPLY" =~ ^[Yy]$$ ]]; then \
			echo ""; \
			echo "   Starting database import..."; \
			make import-db; \
			if [ $$? -eq 0 ]; then \
				echo ""; \
				echo "   ✅ Database imported successfully!"; \
				echo "   Restarting services to apply changes..."; \
				make restart; \
			else \
				echo ""; \
				echo "   ❌ Database import failed!"; \
				echo "   Common issues:"; \
				echo "   • DB_EXPORT_PATH not set or path doesn't exist"; \
				echo "   • Export path contains no .parquet files"; \
				echo "   • Export doesn't contain actual content data"; \
				echo ""; \
				echo "   Setup cannot continue without database."; \
				exit 1; \
			fi; \
		else \
			echo ""; \
			echo "   ⚠️  Proceeding without database import..."; \
			echo "   The application will start with empty database."; \
			echo "   You can import database later with:"; \
			echo "   export DB_EXPORT_PATH=/path/to/database && make import-db"; \
		fi; \
		echo ""; \
		echo "✅ Development environment ready!"; \
		echo "   Backend:  http://localhost:1337/admin"; \
		echo "   Frontend: http://localhost:3000 (run 'npm run dev' in frontend/)"; \
	else \
		echo "✅ Database already imported"; \
		echo ""; \
		echo "✅ Development environment ready!"; \
		echo "   Backend:  http://localhost:1337/admin"; \
		echo "   Frontend: http://localhost:3000 (run 'npm run dev' in frontend/)"; \
	fi

# Build all images
build:
	@echo "📦 Building Docker images..."
	@echo "   This may take a few minutes on first build..."
	docker compose build --progress=plain


# Start all services (with auto-build check)
# Start all services with live logs
start-logs:
	docker compose up

# Start all services including frontend (with live logs)
start-full:
	docker compose --profile full up

# Start all services including frontend (detached)
start-full-detached:
	docker compose --profile full up -d

# Start services and wait (without showing progress)
start-wait:
	docker compose up -d
	@echo ""
	@echo "⏳ Waiting for Strapi to be ready..."
	@timeout=120; \
	while [ $$timeout -gt 0 ]; do \
		if curl -s -f http://localhost:1337/admin >/dev/null 2>&1; then \
			break; \
		fi; \
		sleep 2; \
		timeout=$$((timeout - 2)); \
	done; \
	if [ $$timeout -le 0 ]; then \
		echo "❌ Timeout waiting for Strapi to start"; \
		exit 1; \
	fi
	@echo "✅ Strapi is ready!"

# Stop all services (containers only, keep for restart)
stop:
	docker compose stop

# Stop and remove containers + networks (but keep volumes)
down:
	docker compose down

# Destroy everything (containers, networks, volumes)
# Force re-import database (destroys existing data)
force-import:
	@echo "⚠️  WARNING: This will destroy existing database data!"
	@echo "   This action cannot be undone!"
	@echo ""
	@read -p "Type 'FORCE' to confirm: " -r; \
	if [[ "$$REPLY" == "FORCE" ]]; then \
		echo ""; \
		echo "🗑️  Force importing database..."; \
		rm -f $(DB_STATE_FILE); \
		export DB_EXPORT_PATH="$$DB_EXPORT_PATH" && make import-db; \
	else \
		echo "❌ Force import cancelled"; \
	fi

destroy:
	@echo "⚠️  DANGER: This will destroy ALL data (containers, networks, volumes)!"
	@echo "   This action cannot be undone!"
	@echo ""
	@read -p "Type 'DESTROY' to confirm: " -r; \
	if [[ "$$REPLY" == "DESTROY" ]]; then \
		echo ""; \
		echo "🗑️  Destroying everything..."; \
		docker compose down -v --remove-orphans; \
		rm -f $(DB_STATE_FILE); \
		echo "✅ Everything destroyed!"; \
	else \
		echo "❌ Destruction cancelled"; \
	fi

# Restart all services
restart:
	@echo "🔄 Restarting services..."
	docker compose restart
	@echo ""
	@echo "⏳ Waiting for Strapi to be ready..."
	@timeout=120; \
	while [ $$timeout -gt 0 ]; do \
		if curl -s -f http://localhost:1337/admin >/dev/null 2>&1; then \
			break; \
		fi; \
		echo "   Waiting for Strapi..."; \
		sleep 2; \
		timeout=$$((timeout - 2)); \
	done; \
	if [ $$timeout -le 0 ]; then \
		echo "❌ Timeout waiting for Strapi to start"; \
		echo "   Check logs with: make logs"; \
		exit 1; \
	fi
	@echo ""
	@echo "✅ Services restarted and ready!"
	@echo "   Backend:  http://localhost:1337/admin"
	@echo "   Frontend: http://localhost:3000"

# View logs (auto-detects environment)
logs:
	@if [ -f backend/.env.production ]; then \
		echo "📋 Production environment detected, using .env.production files"; \
		ENV_SUFFIX=".production" docker compose logs -f; \
	else \
		echo "📋 Development environment detected, using .env.development files"; \
		ENV_SUFFIX="" docker compose logs -f; \
	fi

# Backend logs only (auto-detects environment)
backend:
	@if [ -f backend/.env.production ]; then \
		ENV_SUFFIX=".production" docker compose logs -f backend; \
	else \
		ENV_SUFFIX="" docker compose logs -f backend; \
	fi

# Frontend logs only (auto-detects environment)
frontend:
	@if [ -f backend/.env.production ]; then \
		ENV_SUFFIX=".production" docker compose logs -f frontend; \
	else \
		ENV_SUFFIX="" docker compose logs -f frontend; \
	fi

# Import database
import-db:
	@echo "🚀 Importing database..."
	@if [ -n "$$DB_EXPORT_PATH" ]; then \
		echo "📂 Using path: $$DB_EXPORT_PATH"; \
	else \
		echo "❌ DB_EXPORT_PATH is required!"; \
		echo "   Usage: export DB_EXPORT_PATH=/path/to/database"; \
		exit 1; \
	fi
	@if python3 scripts/import-db.py; then \
		echo "✅" > $(DB_STATE_FILE); \
		echo ""; \
		echo "✅ Database imported successfully!"; \
		echo "   Database import state saved"; \
		echo "   Restart backend with: make restart"; \
	else \
		echo ""; \
		echo "❌ Database import FAILED!"; \
		echo "   Check the error messages above"; \
		echo "   Fix the issues and try again"; \
		exit 1; \
	fi

# Import database (Docker)
import-db-docker:
	@echo "🚀 Importing database (Docker)..."
	@if [ -n "$$DB_EXPORT_PATH" ]; then \
		echo "📂 Using host path: $$DB_EXPORT_PATH"; \
		echo "📂 Mounting to container at: /external/db"; \
	else \
		echo "❌ DB_EXPORT_PATH is required!"; \
		echo "   Usage: export DB_EXPORT_PATH=/path/to/database && make import-db-docker"; \
		exit 1; \
	fi
	@docker compose run --rm -e DB_EXPORT_PATH="/external/db" -v "$$DB_EXPORT_PATH:/external/db:ro" db-import python3 import-db.py
	@if [ $$? -eq 0 ]; then \
		echo "✅" > $(DB_STATE_FILE); \
		echo ""; \
		echo "✅ Database imported successfully!"; \
		echo "   Restart backend with: make restart"; \
	else \
		echo ""; \
		echo "❌ Database import FAILED!"; \
		exit 1; \
	fi

# Reset admin users
reset-admin:
	@echo "🔐 Resetting admin users..."
	python3 scripts/reset-admin.py
	@echo ""
	@echo "✅ Admin users reset!"
	@echo "   Restart backend with: make restart"

# Setup environment files for development
setup-env:
	@echo "🔧 Setting up development environment files..."
	@if [ ! -f backend/.env ] && [ ! -f backend/.env.production ] && [ ! -f backend/.env.local ]; then \
		echo "   Creating backend/.env from .env.example (localhost URLs)..."; \
		cp backend/.env.example backend/.env 2>/dev/null || echo "   ⚠️  backend/.env.example not found, you'll need to create backend/.env manually"; \
	else \
		echo "   ✅ backend environment file already exists"; \
	fi
	@if [ ! -f frontend/.env.local ] && [ ! -f frontend/.env.production ]; then \
		echo "   Creating frontend/.env.local from .env.example (localhost URLs)..."; \
		cp frontend/.env.example frontend/.env.local 2>/dev/null || echo "   ⚠️  frontend/.env.example not found, you'll need to create frontend/.env.local manually"; \
	else \
		echo "   ✅ frontend environment file already exists"; \
	fi
	@echo ""
	@echo "✅ Development environment setup complete!"
	@echo "   For production: use 'make start-prod' (automatically creates .env.production with Docker URLs)"
	@echo "   Edit the .env files with your configuration before starting services"

# Reset admin users (Docker)
reset-admin-docker:
	@echo "🔐 Resetting admin users (Docker)..."
	docker compose run --rm db-import python3 reset-admin.py
	@echo ""
	@echo "✅ Admin users reset!"
	@echo "   Restart backend with: make restart"

# Start in production mode (with detached services)
start-prod:
	@echo "🚀 Starting in production mode..."
	@echo ""
	@echo "Step 1: Setting up environment files..."
	@if [ ! -f backend/.env.production ] && [ ! -f backend/.env.local ]; then \
		if [ -f backend/.env.example ]; then \
			echo "   Creating backend/.env.production from .env.example (Docker URLs + production mode)..."; \
			sed 's|DATABASE_HOST=localhost|DATABASE_HOST=postgres|g; s|NODE_ENV=development|NODE_ENV=production|g; s|DATABASE_PASSWORD=your-secure-password|DATABASE_PASSWORD=postgres|g' backend/.env.example > backend/.env.production; \
		else \
			echo "   ⚠️  backend/.env.example not found, creating empty backend/.env.production"; \
			touch backend/.env.production; \
		fi; \
	else \
		echo "   ✅ backend production environment file already exists"; \
	fi
	@if [ ! -f frontend/.env.production ]; then \
		if [ -f frontend/.env.example ]; then \
			echo "   Creating frontend/.env.production from .env.example (Docker URLs)..."; \
			sed 's|http://localhost:1337|http://backend:1337|g' frontend/.env.example > frontend/.env.production; \
		else \
			echo "   ⚠️  frontend/.env.example not found, creating empty frontend/.env.production"; \
			touch frontend/.env.production; \
		fi; \
	else \
		echo "   ✅ frontend production environment file already exists"; \
	fi
	@echo ""
	@echo "Step 2: Building Docker images for production..."
	docker compose build --progress=plain
	@echo ""
	@echo "Step 3: Starting production services..."
	ENV_SUFFIX=".production" docker compose --profile full up -d
	@echo ""
	@echo "Step 4: Waiting for services to be ready..."
	@timeout=120; \
	while [ $$timeout -gt 0 ]; do \
		if curl -s -f http://localhost:1337/admin >/dev/null 2>&1; then \
			break; \
		fi; \
		echo "   Waiting for Strapi..."; \
		sleep 2; \
		timeout=$$((timeout - 2)); \
	done; \
	if [ $$timeout -le 0 ]; then \
		echo "❌ Timeout waiting for Strapi to start"; \
		echo "   Check logs with: make logs"; \
		exit 1; \
	fi
	@echo ""
	@echo "✅ Production mode started!"
	@echo ""
	@echo "📋 Next steps:"
	@echo "   1. Edit backend/.env.production with your production values"
	@echo "   2. Edit frontend/.env.production with your production URLs"
	@echo "   3. Import database (if needed): export DB_EXPORT_PATH=/path/to/db && make import-db-docker"
	@echo "   4. Create admin user: http://localhost:1337/admin"
	@echo "   5. Configure public API permissions in Strapi admin"
	@echo ""
	@echo "🌐 Services running:"
	@echo "   Backend:  http://localhost:1337/admin"
	@echo "   Frontend: http://localhost:3000"


