#!/usr/bin/env python3
"""
Reset Strapi Admin Users

This script deletes all admin users and their role links from the database,
allowing Strapi to prompt for a new admin user creation on next startup.

Usage:
    python reset-admin.py
"""

import psycopg2
import os
from pathlib import Path

# Load database connection details from backend/.env
def load_env():
    env_path = Path(__file__).parent / 'backend' / '.env'
    env_vars = {}
    
    if env_path.exists():
        with open(env_path, 'r') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    key, value = line.split('=', 1)
                    env_vars[key] = value
    
    return env_vars

env_vars = load_env()

DB_HOST = env_vars.get('DATABASE_HOST', os.getenv('DATABASE_HOST', 'localhost'))
DB_PORT = env_vars.get('DATABASE_PORT', os.getenv('DATABASE_PORT', '5433'))
DB_NAME = env_vars.get('DATABASE_NAME', os.getenv('DATABASE_NAME', 'schild_db'))
DB_USER = env_vars.get('DATABASE_USERNAME', os.getenv('DATABASE_USERNAME', 'postgres'))
DB_PASSWORD = env_vars.get('DATABASE_PASSWORD', os.getenv('DATABASE_PASSWORD', 'postgres'))

def reset_admin_users():
    """Delete all admin users and their role links"""
    try:
        conn = psycopg2.connect(
            host=DB_HOST,
            port=DB_PORT,
            database=DB_NAME,
            user=DB_USER,
            password=DB_PASSWORD
        )
        cursor = conn.cursor()
        
        print("🔍 Checking for existing admin users...")
        
        # Check if tables exist
        cursor.execute("""
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_name = 'admin_users'
            )
        """)
        
        if not cursor.fetchone()[0]:
            print("⚠️  No admin_users table found. Database might not be initialized yet.")
            conn.close()
            return
        
        # Count existing admin users
        cursor.execute("SELECT COUNT(*) FROM admin_users")
        count = cursor.fetchone()[0]
        
        if count == 0:
            print("✅ No admin users found. Strapi will prompt for admin creation on next startup.")
            conn.close()
            return
        
        print(f"📋 Found {count} admin user(s)")
        
        # Clear created_by_id and updated_by_id from all tables that reference admin_users
        # This prevents foreign key constraint violations
        print("🧹 Clearing admin references from content tables...")
        tables_to_clear = ['files', 'upload_folders', 'products', 'categories', 'subcategories', 
                          'materials', 'homepages', 'abouts', 'catalogues', 'show_cases', 'quotes']
        
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
            except Exception:
                # Table might not exist or might not have these columns
                pass
        
        # Delete admin users role links first (foreign key constraint)
        cursor.execute("DELETE FROM admin_users_roles_links")
        print("   ✓ Deleted admin user role links")
        
        # Delete admin users
        cursor.execute("DELETE FROM admin_users")
        print("   ✓ Deleted admin users")
        
        conn.commit()
        cursor.close()
        conn.close()
        
        print("\n✅ Admin users reset successfully!")
        print("   Next time you start Strapi, it will prompt you to create a new admin user.")
        
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        if 'conn' in locals():
            conn.close()

if __name__ == "__main__":
    print("🚀 Resetting Strapi admin users...")
    print(f"🗄️  Database: postgresql://{DB_USER}@{DB_HOST}:{DB_PORT}/{DB_NAME}\n")
    reset_admin_users()

