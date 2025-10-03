# Scripts Directory

Helper scripts for database management and setup.

## Scripts

### `import-db.py`
Imports database from AWS RDS Parquet exports in `db/strapi/` folder.

**Features:**
- Drops and recreates public schema (clean slate)
- Creates tables with proper primary keys
- Sets up PostgreSQL sequences for auto-incrementing IDs
- Imports all data from Parquet files
- Automatically resets admin users (by default)

**Usage:**
```bash
# From project root
python3 scripts/import-db.py

# Skip admin reset
python3 scripts/import-db.py --skip-admin-reset

# Or use Make command
make import-db
```

**Requirements:**
```bash
# Create virtual environment (recommended)
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies from requirements.txt (at project root)
pip install -r ../requirements.txt

# Or install manually
pip install pandas pyarrow psycopg2-binary

# Or install globally (not recommended)
python3 -m pip install --user pandas pyarrow psycopg2-binary
```

**Note:** Always activate the virtual environment before running scripts:
```bash
source venv/bin/activate  # macOS/Linux
venv\Scripts\activate     # Windows
```

**Environment Variables:**
- `DATABASE_HOST` (default: `localhost`)
- `DATABASE_PORT` (default: `5433`)
- `DATABASE_NAME` (default: `schild_db`)
- `DATABASE_USERNAME` (default: `postgres`)
- `DATABASE_PASSWORD` (default: `postgres`)

---

### `reset-admin.py`
Resets Strapi admin users without reimporting data.

**Features:**
- Deletes all admin users and their role links
- Clears admin references from content tables (prevents foreign key errors)
- Allows Strapi to prompt for new admin creation on next startup
- Safe to run multiple times

**Usage:**
```bash
# From project root
python3 scripts/reset-admin.py

# Or use Make command
make reset-admin
```

**When to use:**
- After database import when you can't log in
- When you've forgotten admin credentials
- When migrating from production to development

---

### `start.sh`
One-command setup script for Docker.

**Usage:**
```bash
# From project root
./scripts/start.sh
```

**What it does:**
1. Checks if Docker is running
2. Builds Docker images
3. Starts all services
4. Imports database (if `db/strapi` exists)
5. Shows access URLs and next steps

---

## Docker vs Local

### Local Execution
Run scripts directly on your host machine:
```bash
python3 scripts/import-db.py
python3 scripts/reset-admin.py
```

**Prerequisites:**
- Python 3.x
- Required packages: `pandas`, `pyarrow`, `psycopg2-binary`
- PostgreSQL accessible at configured host/port

### Docker Execution
Run scripts inside Docker containers:
```bash
make import-db-docker
make reset-admin-docker

# Or directly
docker-compose run --rm db-import python3 import-db.py
docker-compose run --rm db-import python3 reset-admin.py
```

**Prerequisites:**
- Docker Desktop installed and running
- Docker images built (`make build`)

---

## Troubleshooting

### Script can't find db/strapi folder
Make sure you're running from the project root:
```bash
cd /path/to/nsa-schild
python3 scripts/import-db.py
```

### Connection refused
Check your database is running:
```bash
# Local PostgreSQL
pg_isready -h localhost -p 5433

# Docker PostgreSQL
docker-compose ps postgres
```

### Foreign key constraint errors
This should be fixed automatically by the scripts clearing admin references.
If you still see errors, try:
```bash
python3 scripts/reset-admin.py
# Then restart Strapi
```

### Module not found errors
Install Python dependencies:
```bash
python3 -m pip install --user pandas pyarrow psycopg2-binary
```

---

## Adding New Scripts

When adding new scripts to this folder:

1. **Make executable** (if shell script):
   ```bash
   chmod +x scripts/new-script.sh
   ```

2. **Update Dockerfile.db-import** (if Python script for Docker):
   ```dockerfile
   COPY scripts/new-script.py .
   ```

3. **Add to Makefile** (for convenience):
   ```makefile
   new-command:
       python3 scripts/new-script.py
   ```

4. **Document in this README**

