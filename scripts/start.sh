#!/bin/bash

# Quick start script for NSA-Schild project

set -e

echo "🚀 NSA-Schild Quick Start"
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker Desktop and try again."
    exit 1
fi

echo "✅ Docker is running"
echo ""

# Check if db folder exists
if [ ! -d "db/strapi" ]; then
    echo "⚠️  No database export found in db/strapi/"
    echo "   Continuing without database import..."
    echo ""
fi

# Build images
echo "📦 Building Docker images..."
docker-compose build

# Start services
echo "🚀 Starting services..."
docker-compose up -d

# Wait for services to be healthy
echo "⏳ Waiting for services to start..."
sleep 10

# Import database if exists
if [ -d "db/strapi" ]; then
    echo "📂 Importing database..."
    docker-compose run --rm db-import
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "🌐 Services:"
echo "   Backend:  http://localhost:1337/admin"
echo "   Frontend: http://localhost:3000"
echo ""
echo "📝 Next steps:"
echo "   1. Visit http://localhost:1337/admin"
echo "   2. Create your admin user"
echo "   3. Configure public permissions (Settings → Roles → Public)"
echo "   4. Visit http://localhost:3000"
echo ""
echo "💡 Useful commands:"
echo "   make logs        - View logs"
echo "   make restart     - Restart services"
echo "   make down        - Stop services"
echo "   make reset-admin - Reset admin users"
echo ""

