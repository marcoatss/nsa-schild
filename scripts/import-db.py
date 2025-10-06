#!/usr/bin/env python3
"""
Import Parquet database export into PostgreSQL
"""
import os
import sys
import glob
import pandas as pd
import psycopg2
from psycopg2 import sql
from pathlib import Path

# Database connection settings (from environment or defaults)
DB_CONFIG = {
    'host': os.getenv('DATABASE_HOST', 'localhost'),
    'port': int(os.getenv('DATABASE_PORT', '5433')),
    'database': os.getenv('DATABASE_NAME', 'schild_db'),
    'user': os.getenv('DATABASE_USERNAME', 'postgres'),
    'password': os.getenv('DATABASE_PASSWORD', 'postgres')
}

# Path to parquet files (configurable via environment or default)
def get_db_export_path():
    """Get database export path with safety checks"""
    custom_path = os.getenv('DB_EXPORT_PATH')
    
    if not custom_path:
        print("❌ ERROR: Database import requires external path!")
        print("   Usage: export DB_EXPORT_PATH=/path/to/database && make import-db")
        print("")
        print("   Example:")
        print("   export DB_EXPORT_PATH=/tmp/database-export")
        print("   make import-db")
        sys.exit(1)
    
    db_path = Path(custom_path).resolve()
    
    # Security check: prevent paths from being inside repository
    # Get repository root (handle both local and Docker environments)
    script_dir = Path(__file__).parent.resolve()
    
    # In Docker: /app/import-db.py (no parent.parent, script is at root of /app)
    # In local: /path/to/repo/scripts/import-db.py (need parent.parent)
    if script_dir.name == 'scripts':
        # Local environment: script is in scripts/ folder
        repo_root = script_dir.parent.resolve()
    else:
        # Docker environment: script is copied to /app directly
        repo_root = script_dir.resolve()
    
    # Only check if repo_root is meaningful (not system root /)
    if repo_root != Path('/') and db_path.is_relative_to(repo_root):
        print(f"❌ ERROR: Database export path cannot be inside the repository!")
        print(f"   Repository root: {repo_root}")
        print(f"   Export path: {db_path}")
        print(f"   This is a security measure to prevent accidental data loss.")
        print(f"")
        print(f"   Solutions:")
        print(f"   1. Move your database export outside the repository")
        print(f"   2. Use a different path:")
        print(f"      export DB_EXPORT_PATH=/path/to/external/database/export")
        print(f"      make import-db")
        sys.exit(1)
    
    return db_path

DB_EXPORT_PATH = get_db_export_path()

def get_table_name(folder_name):
    """Extract table name from folder (e.g., 'public.abouts' -> 'abouts')"""
    return folder_name.replace('public.', '')

def import_table(conn, folder_path):
    """Import a single table from parquet files"""
    table_name = get_table_name(folder_path.name)
    
    # Find all parquet files in the folder (AWS export structure has subdirs)
    parquet_files = list(folder_path.glob('**/*.parquet'))
    
    if not parquet_files:
        print(f"  ⚠️  No parquet files found in {folder_path.name}")
        return
    
    print(f"  📦 Importing {table_name} ({len(parquet_files)} files)...")
    
    try:
        # Read all parquet files for this table
        dfs = []
        for pfile in parquet_files:
            df = pd.read_parquet(pfile)
            dfs.append(df)
        
        # Combine all dataframes
        if dfs:
            combined_df = pd.concat(dfs, ignore_index=True)
            
            if len(combined_df) == 0:
                print(f"     ✓ Empty table, skipping")
                return
            
            # Create table structure
            cursor = conn.cursor()
            
            # Get column types from pandas DataFrame
            columns = []
            primary_key = None
            
            for col_name, dtype in combined_df.dtypes.items():
                if pd.api.types.is_integer_dtype(dtype):
                    col_type = 'INTEGER'
                elif pd.api.types.is_float_dtype(dtype):
                    col_type = 'DOUBLE PRECISION'
                elif pd.api.types.is_bool_dtype(dtype):
                    col_type = 'BOOLEAN'
                elif pd.api.types.is_datetime64_any_dtype(dtype):
                    col_type = 'TIMESTAMP'
                else:
                    col_type = 'TEXT'
                
                # Detect primary key (usually 'id' column)
                if col_name == 'id' and pd.api.types.is_integer_dtype(dtype):
                    col_type = 'INTEGER PRIMARY KEY'
                    primary_key = 'id'
                
                columns.append(f'"{col_name}" {col_type}')
            
            # Drop table if exists and create new
            cursor.execute(f'DROP TABLE IF EXISTS "{table_name}" CASCADE')
            create_sql = f'CREATE TABLE "{table_name}" ({", ".join(columns)})'
            cursor.execute(create_sql)
            
            # Insert data with conflict handling
            for _, row in combined_df.iterrows():
                placeholders = ', '.join(['%s'] * len(row))
                cols = ', '.join([f'"{col}"' for col in combined_df.columns])
                insert_sql = f'INSERT INTO "{table_name}" ({cols}) VALUES ({placeholders}) ON CONFLICT DO NOTHING'
                
                # Convert NaN to None for SQL NULL
                values = [None if pd.isna(v) else v for v in row]
                cursor.execute(insert_sql, values)
            
            # If table has an 'id' primary key, set the sequence to max(id) + 1
            if primary_key == 'id':
                cursor.execute(f'SELECT MAX(id) FROM "{table_name}"')
                max_id = cursor.fetchone()[0]
                if max_id is not None:
                    # Create sequence and set it as default
                    seq_name = f'{table_name}_id_seq'
                    cursor.execute(f'CREATE SEQUENCE IF NOT EXISTS "{seq_name}"')
                    cursor.execute(f'SELECT setval(\'"{seq_name}"\', {max_id})')
                    cursor.execute(f'ALTER TABLE "{table_name}" ALTER COLUMN id SET DEFAULT nextval(\'"{seq_name}"\')') 
            
            conn.commit()
            cursor.close()
            print(f"     ✓ Imported {len(combined_df)} rows")
        
    except Exception as e:
        print(f"     ✗ Error: {str(e)}")
        conn.rollback()

def main():
    print("🚀 Starting database import from Parquet files...")
    print(f"📂 Source: {DB_EXPORT_PATH}")
    print(f"🗄️  Target: postgresql://{DB_CONFIG['user']}@{DB_CONFIG['host']}:{DB_CONFIG['port']}/{DB_CONFIG['database']}\n")
    
    # Check if export path exists
    if not DB_EXPORT_PATH.exists():
        print(f"❌ Error: Export path not found: {DB_EXPORT_PATH}")
        sys.exit(1)
    
    # Check if path contains Parquet files (recursively)
    parquet_files = list(DB_EXPORT_PATH.rglob("*.parquet"))
    if not parquet_files:
        print(f"⚠️  WARNING: No Parquet files found in: {DB_EXPORT_PATH}")
        print(f"   The export directory exists but contains no .parquet files")
        print(f"   This might result in an empty database import")
        print(f"")
        print(f"   Expected: Database export with .parquet files")
        print(f"   Found: {list(DB_EXPORT_PATH.iterdir()) if DB_EXPORT_PATH.is_dir() else 'Not a directory'}")
        print(f"")
        print(f"   Continuing anyway, but expect empty content tables...")
    else:
        print(f"✅ Found {len(parquet_files)} Parquet files")
    
    # Connect to PostgreSQL
    try:
        conn = psycopg2.connect(**DB_CONFIG)
        print("✅ Connected to PostgreSQL")
    except Exception as e:
        print(f"❌ Failed to connect to PostgreSQL: {e}")
        print("\nMake sure:")
        print("  1. PostgreSQL Docker container is running")
        print("  2. Database credentials are correct")
        sys.exit(1)
    
    # Clean database completely
    print("🧹 Cleaning database...")
    try:
        cursor = conn.cursor()
        # Drop all tables and sequences first
        cursor.execute("""
            DO $$ DECLARE
                r RECORD;
            BEGIN
                -- Drop all tables
                FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
                    EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(r.tablename) || ' CASCADE';
                END LOOP;
                -- Drop all sequences
                FOR r IN (SELECT sequence_name FROM information_schema.sequences WHERE sequence_schema = 'public') LOOP
                    EXECUTE 'DROP SEQUENCE IF EXISTS ' || quote_ident(r.sequence_name) || ' CASCADE';
                END LOOP;
            END $$;
        """)
        conn.commit()
        print("✅ Database cleaned successfully\n")
    except Exception as e:
        print(f"❌ Failed to clean database: {e}")
        conn.rollback()
        conn.close()
        sys.exit(1)
    
    # Look for strapi subdirectory (common export structure)
    strapi_path = DB_EXPORT_PATH / "strapi"
    if strapi_path.exists() and strapi_path.is_dir():
        print(f"📁 Found strapi export directory: {strapi_path}")
        export_path = strapi_path
    else:
        print(f"📁 Using export root directory: {DB_EXPORT_PATH}")
        export_path = DB_EXPORT_PATH
    
    # Get all table folders
    table_folders = sorted([d for d in export_path.iterdir() if d.is_dir()])
    
    print(f"Found {len(table_folders)} tables to import\n")
    
    # Import each table
    for folder in table_folders:
        import_table(conn, folder)
    
    return conn  # Return connection for optional admin reset

def reset_admin_users(conn):
    """Delete all admin users and their role links to allow new admin creation"""
    try:
        cursor = conn.cursor()
        
        # Check if admin_users table exists
        cursor.execute("""
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_name = 'admin_users'
            )
        """)
        
        if not cursor.fetchone()[0]:
            print("\n⚠️  No admin_users table found (will be created by Strapi)")
            cursor.close()
            return
        
        # Count existing admin users
        cursor.execute("SELECT COUNT(*) FROM admin_users")
        count = cursor.fetchone()[0]
        
        if count == 0:
            print("\n✅ No admin users found. Strapi will prompt for admin creation.")
            cursor.close()
            return
        
        print(f"\n🔐 Resetting {count} admin user(s)...")
        
        # Clear created_by_id and updated_by_id from all tables that reference admin_users
        # This prevents foreign key constraint violations
        tables_to_clear = ['files', 'upload_folders', 'products', 'categories', 'subcategories', 
                          'materials', 'homepages', 'abouts', 'catalogues', 'show_cases', 'quotes', 'i18n_locale']
        
        for table in tables_to_clear:
            try:
                cursor.execute(f"""
                    UPDATE "{table}" 
                    SET created_by_id = NULL, updated_by_id = NULL
                    WHERE created_by_id IS NOT NULL OR updated_by_id IS NOT NULL
                """)
                rows_updated = cursor.rowcount
                if rows_updated > 0:
                    print(f"   ✓ Cleared admin references from {table} ({rows_updated} rows)")
            except Exception as table_error:
                # Table might not exist or might not have these columns
                pass
        
        # Delete admin users role links first (foreign key constraint)
        cursor.execute("DELETE FROM admin_users_roles_links")
        cursor.execute("DELETE FROM admin_users")
        conn.commit()
        
        print("   ✓ Admin users reset. Strapi will prompt for new admin on startup.")
        cursor.close()
        
    except Exception as e:
        print(f"   ⚠️  Could not reset admin users: {str(e)}")
        conn.rollback()

def validate_content_import(conn):
    """Validate that content data was actually imported"""
    print("\n🔍 Validating content import...")
    
    try:
        cursor = conn.cursor()
        
        # Check key content tables
        content_tables = {
            'products': 'Products',
            'categories': 'Categories', 
            'materials': 'Materials',
            'catalogues': 'Catalogues',
            'subcategories': 'Subcategories'
        }
        
        total_content = 0
        empty_tables = []
        
        for table, display_name in content_tables.items():
            try:
                cursor.execute(f"SELECT COUNT(*) FROM {table}")
                count = cursor.fetchone()[0]
                total_content += count
                
                if count == 0:
                    empty_tables.append(display_name)
                else:
                    print(f"   ✓ {display_name}: {count} records")
            except Exception:
                # Table might not exist
                empty_tables.append(display_name)
        
        cursor.close()
        
        if total_content == 0:
            print("\n⚠️  WARNING: No content data found in database!")
            print("   This could mean:")
            print("   1. The database export doesn't contain content data")
            print("   2. The Parquet files are missing or empty")
            print("   3. The export path is incorrect")
            print("")
            print("   To verify your export:")
            print("   1. Check if DB_EXPORT_PATH contains .parquet files")
            print("   2. Verify the export contains actual content (not just schema)")
            print("   3. Try exporting from a Strapi instance with data")
            print("")
            print("   The application will work but will have no content.")
        elif empty_tables:
            print(f"\n⚠️  WARNING: Some content tables are empty: {', '.join(empty_tables)}")
            print(f"   Total content records: {total_content}")
            print("   This might be expected depending on your export.")
        else:
            print(f"\n✅ Content validation passed!")
            print(f"   Total content records: {total_content}")
            
    except Exception as e:
        print(f"\n⚠️  Could not validate content import: {str(e)}")

if __name__ == '__main__':
    import sys
    
    # Check for --skip-admin-reset flag
    skip_reset = '--skip-admin-reset' in sys.argv
    
    conn = main()
    
    if conn and not skip_reset:
        reset_admin_users(conn)
    
    if conn:
        # Validate that content data was imported
        validate_content_import(conn)
        conn.close()
        print("\n✅ All operations completed!")

