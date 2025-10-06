#!/bin/bash
# Check if Python dependencies for import-db.py are installed

echo "🔍 Checking Python dependencies..."

MISSING=""

# Check for pandas
if ! python3 -c "import pandas" 2>/dev/null; then
    echo "❌ pandas - NOT installed"
    MISSING="$MISSING pandas"
else
    echo "✅ pandas - installed"
fi

# Check for pyarrow
if ! python3 -c "import pyarrow" 2>/dev/null; then
    echo "❌ pyarrow - NOT installed"
    MISSING="$MISSING pyarrow"
else
    echo "✅ pyarrow - installed"
fi

# Check for psycopg2
if ! python3 -c "import psycopg2" 2>/dev/null; then
    echo "❌ psycopg2 - NOT installed"
    MISSING="$MISSING psycopg2-binary"
else
    echo "✅ psycopg2 - installed"
fi

if [ -n "$MISSING" ]; then
    echo ""
    echo "⚠️  Missing dependencies detected!"
    echo ""
    echo "Install with:"
    echo "  pip install$MISSING"
    echo ""
    echo "Or use requirements.txt:"
    echo "  pip install -r requirements.txt"
    echo ""
    echo "Or use Docker import (no Python setup needed):"
    echo "  make import-db-docker"
    exit 1
else
    echo ""
    echo "✅ All dependencies installed!"
    exit 0
fi

