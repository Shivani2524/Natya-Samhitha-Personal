import psycopg2
from psycopg2.extras import RealDictCursor
from app.core.config import settings

def get_db_connection():
    """
    Returns a raw psycopg2 connection to Supabase PostgreSQL.
    Uses the DATABASE_URL from environment variables.
    """
    conn = psycopg2.connect(settings.DATABASE_URL, cursor_factory=RealDictCursor)
    return conn

from typing import Optional

def execute_query(query: str, params: Optional[tuple] = None, fetch: bool = True):
    """Execute a SQL query and optionally fetch results."""
    conn = get_db_connection()
    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
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
