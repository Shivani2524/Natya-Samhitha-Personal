"""
AI Core Database Utilities
Standalone DB connection layer — no imports from backend.
Used by the AI module for vector search and ingestion operations.
"""

import psycopg2
from psycopg2.extras import RealDictCursor
from ai_core.config import ai_settings


def get_db_connection():
    """
    Returns a raw psycopg2 connection to Supabase PostgreSQL.
    Uses the DATABASE_URL from AI config.
    """
    conn = psycopg2.connect(ai_settings.DATABASE_URL, cursor_factory=RealDictCursor)
    return conn


def execute_query(query: str, params: tuple = None, fetch: bool = True):
    """Execute a SQL query and optionally fetch results."""
    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            cur.execute(query, params)
            if fetch:
                results = cur.fetchall()
            else:
                results = None
            conn.commit()
        return results
    except Exception as e:
        conn.rollback()
        raise e
    finally:
        conn.close()
