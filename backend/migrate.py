"""
Database Migration Script for Natya Samhitha
Creates all required tables in Supabase PostgreSQL.

Usage:
    cd backend
    source venv/bin/activate
    python migrate.py
"""

import psycopg2
from app.core.config import settings


def run_migration():
    print(f"Connecting to database...")
    conn = psycopg2.connect(settings.DATABASE_URL)
    conn.autocommit = True

    try:
        with conn.cursor() as cur:
            # 1. Enable pgvector extension
            print("[1/4] Enabling pgvector extension...")
            cur.execute("CREATE EXTENSION IF NOT EXISTS vector;")

            # 2. Create documents table
            print("[2/4] Creating documents table...")
            cur.execute("""
                CREATE TABLE IF NOT EXISTS documents (
                    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                    title TEXT NOT NULL,
                    source_type TEXT NOT NULL DEFAULT 'pdf',
                    source_path TEXT,
                    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
                );
            """)

            # 3. Create shlokas table
            print("[3/4] Creating shlokas table...")
            cur.execute("""
                CREATE TABLE IF NOT EXISTS shlokas (
                    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                    document_id UUID REFERENCES documents(id) ON DELETE CASCADE,
                    shloka_index INTEGER,
                    shloka_iast TEXT,
                    sanskrit TEXT,
                    transliteration TEXT,
                    translation TEXT,
                    explanation TEXT,
                    application TEXT,
                    chapter TEXT,
                    category TEXT,
                    metadata JSONB DEFAULT '{}',
                    embedding vector(768),
                    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
                );
            """)

            # Create index for vector similarity search
            cur.execute("""
                CREATE INDEX IF NOT EXISTS shlokas_embedding_idx
                ON shlokas
                USING ivfflat (embedding vector_cosine_ops)
                WITH (lists = 10);
            """)

            # 4. Create feedback_log table
            print("[4/4] Creating feedback_log table...")
            cur.execute("""
                CREATE TABLE IF NOT EXISTS feedback_log (
                    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                    query_id TEXT NOT NULL,
                    query_text TEXT,
                    feedback INTEGER NOT NULL CHECK (feedback IN (1, -1)),
                    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
                );
            """)

            print("\n✅ Migration complete! All tables created successfully.")

    except Exception as e:
        print(f"\n❌ Migration failed: {e}")
        raise
    finally:
        conn.close()


if __name__ == "__main__":
    run_migration()
