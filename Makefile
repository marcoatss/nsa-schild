.PHONY: help build setup start down restart logs clean import-db reset-admin backend frontend

# State tracking file
DB_STATE_FILE = .db_imported

# Default target
help:
	@echo "NSA Schild Commands"
	@echo ""
	@echo "Setup (First Time):"
	@echo "  make setup              - Complete first-time setup (build + import + start)"
	@echo ""
	@echo "Daily Use:"
	@echo "  make start              - Start services (prompts for import if needed)"
	@echo "  make start-logs         - Start all services with live logs"
	@echo "  make start-wait         - Start services and wait silently"
	@echo "  make stop               - Stop all services (remove containers)"
	@echo "  make restart            - Restart all services"
	@echo ""
	@echo "Database Management:"
	@echo "  make import-db          - Import database (requires DB_EXPORT_PATH)"
	@echo "  make reset-admin        - Reset admin users (allows new admin creation)"
	@echo "  make force-import       - Force re-import database (destroys existing data)"
	@echo ""
	@echo "  Custom DB path: export DB_EXPORT_PATH=/path/to/database"
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

# Complete first-time setup
setup:
	@echo "🚀 First-time setup starting..."
	@echo ""
	@echo "Step 1: Building Docker images..."
	docker-compose build --progress=plain
	@echo ""
	@echo "Step 2: Starting services..."
	docker-compose up -d
	@echo ""
	@echo "Step 3: Waiting for services to be ready..."
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
		echo "✅ Setup complete! Services are ready."; \
		echo "   Backend:  http://localhost:1337/admin"; \
		echo "   Frontend: http://localhost:3000"; \
	else \
		echo "✅ Database already imported"; \
		echo ""; \
		echo "✅ Setup complete! Services are ready."; \
		echo "   Backend:  http://localhost:1337/admin"; \
		echo "   Frontend: http://localhost:3000"; \
	fi

# Build all images
build:
	@echo "📦 Building Docker images..."
	@echo "   This may take a few minutes on first build..."
	docker-compose build --progress=plain


# Start all services (with auto-build check)
start:
	@echo "🔍 Checking if build is needed..."
	@if ! docker images | grep -q "nsa-schild-backend"; then \
		echo "📦 Building images (first time)..."; \
		docker-compose build; \
	else \
		echo "✅ Images already built, starting services..."; \
	fi
	@echo ""
	docker-compose up -d
	@echo ""
	@echo "🔄 Starting services..."
	@echo "⏳ Waiting for Strapi to be ready..."
	@echo ""
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
				echo "   Application cannot run without database."; \
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
		echo "✅ All services are ready!"; \
		echo "   Backend:  http://localhost:1337/admin"; \
		echo "   Frontend: http://localhost:3000"; \
	else \
		echo "✅ All services are ready!"; \
		echo "   Backend:  http://localhost:1337/admin"; \
		echo "   Frontend: http://localhost:3000"; \
		echo ""; \
		echo "✅ Database already imported"; \
	fi
	@echo "Run 'make logs' to view logs"

# Start all services with live logs
start-logs:
	docker-compose up

# Start services and wait (without showing progress)
start-wait:
	docker-compose up -d
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
	docker-compose stop

# Stop and remove containers + networks (but keep volumes)
down:
	docker-compose down

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
		docker-compose down -v --remove-orphans; \
		rm -f $(DB_STATE_FILE); \
		echo "✅ Everything destroyed!"; \
	else \
		echo "❌ Destruction cancelled"; \
	fi

# Restart all services
restart:
	@echo "🔄 Restarting services..."
	docker-compose restart
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

# View logs
logs:
	docker-compose logs -f

# Backend logs only
backend:
	docker-compose logs -f backend

# Frontend logs only
frontend:
	docker-compose logs -f frontend

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
	@echo "🚀 Importing database from db/strapi folder (Docker)..."
	docker-compose run --rm db-import python3 import-db.py
	@echo ""
	@echo "✅ Database imported!"
	@echo "   Restart backend with: make restart"

# Reset admin users
reset-admin:
	@echo "🔐 Resetting admin users..."
	python3 scripts/reset-admin.py
	@echo ""
	@echo "✅ Admin users reset!"
	@echo "   Restart backend with: make restart"

# Reset admin users (Docker)
reset-admin-docker:
	@echo "🔐 Resetting admin users (Docker)..."
	docker-compose run --rm db-import python3 reset-admin.py
	@echo ""
	@echo "✅ Admin users reset!"
	@echo "   Restart backend with: make restart"


