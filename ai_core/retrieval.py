"""
Retrieval Module
Handles vector similarity search against the pgvector-enabled shlokas table.
"""

from typing import List, Dict, Any
from ai_core.db import execute_query


def search_shlokas(query_embedding: list[float], top_k: int = 3) -> List[Dict[str, Any]]:
    """
    Perform cosine similarity search on the shlokas table using pgvector.

    Args:
        query_embedding: The query vector (768-dim BGE embedding).
        top_k: Number of top results to return.

    Returns:
        List of shloka dicts with similarity scores.
    """
    # Format embedding for pgvector
    embedding_str = "[" + ",".join(str(v) for v in query_embedding) + "]"

    # Cosine distance (<=> ) search — select all available columns
    query = """
    SELECT id, shloka_index, shloka_iast, sanskrit, transliteration,
           translation, explanation, application, chapter, category,
           1 - (embedding <=> %s::vector) as similarity
    FROM shlokas
    ORDER BY embedding <=> %s::vector
    LIMIT %s;
    """

    # execute_query returns dicts via RealDictCursor
    results = execute_query(query, (embedding_str, embedding_str, top_k))
    return results
