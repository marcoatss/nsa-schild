.PHONY: help build up down restart logs clean import-db reset-admin backend frontend

# Default target
help:
	@echo "NSA Schild Commands"
	@echo ""
	@echo "Setup & Start:"
	@echo "  make build              - Build all Docker images"
	@echo "  make up                 - Start all services (backend, frontend, postgres)"
	@echo "  make down               - Stop all services"
	@echo "  make restart            - Restart all services"
	@echo ""
	@echo "Database (Local):"
	@echo "  make import-db          - Import database from db/strapi folder"
	@echo "  make reset-admin        - Reset admin users (allows new admin creation)"
	@echo ""
	@echo "Database (Docker):"
	@echo "  make import-db-docker   - Import database using Docker"
	@echo "  make reset-admin-docker - Reset admin users using Docker"
	@echo ""
	@echo "Development:"
	@echo "  make logs               - View logs from all services"
	@echo "  make backend            - View backend logs only"
	@echo "  make frontend           - View frontend logs only"
	@echo ""
	@echo "Maintenance:"
	@echo "  make clean              - Stop and remove all containers, volumes, and images"
	@echo ""

# Build all images
build:
	docker-compose build

# Start all services
up:
	docker-compose up -d
	@echo ""
	@echo "✅ Services started!"
	@echo "   Backend:  http://localhost:1337/admin"
	@echo "   Frontend: http://localhost:3000"
	@echo ""
	@echo "Run 'make import-db' to import database from db/strapi folder"
	@echo "Run 'make logs' to view logs"

# Stop all services
down:
	docker-compose down

# Restart all services
restart:
	docker-compose restart

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
	@echo "🚀 Importing database from db/strapi folder..."
	python3 scripts/import-db.py
	@echo ""
	@echo "✅ Database imported!"
	@echo "   Restart backend with: make restart"

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

# Clean everything
clean:
	@echo "⚠️  This will remove all containers, volumes, and images!"
	@read -p "Are you sure? [y/N] " -n 1 -r; \
	echo; \
	if [[ $$REPLY =~ ^[Yy]$$ ]]; then \
		docker-compose down -v; \
		docker-compose rm -f; \
		docker volume prune -f; \
		echo "✅ Cleanup complete!"; \
	fi

