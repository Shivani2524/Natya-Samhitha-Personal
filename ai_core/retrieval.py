"""
Retrieval Module
Handles vector similarity search against the pgvector-enabled shlokas table.
"""

from typing import List, Dict, Any
from ai_core.db import execute_query
from sentence_transformers import CrossEncoder
from ai_core.config import ai_settings

# Initialize the reranker (this might take a moment on first load)
# Using singleton pattern implicitly by defining at module level
try:
    print(f"Loading reranker model: {ai_settings.RERANKER_MODEL_NAME}...")
    reranker_model = CrossEncoder(ai_settings.RERANKER_MODEL_NAME, max_length=512, device="cpu")
except Exception as e:
    print(f"Failed to load reranker model: {e}")
    reranker_model = None


def search_shlokas(query_str: str, query_embedding: list[float], top_k: int = 3) -> List[Dict[str, Any]]:
    """
    Perform a two-stage retrieval:
      1. Cosine similarity search on the shlokas table using pgvector (top 15).
      2. Neural reranking using CrossEncoder for precision (top_k).

    Args:
        query_str: The raw user query.
        query_embedding: The query vector (768-dim BGE embedding).
        top_k: Number of final top results to return.

    Returns:
        List of shloka dicts with similarity scores.
    """
    # Format embedding for pgvector
    embedding_str = "[" + ",".join(str(v) for v in query_embedding) + "]"

    # Stage 1: Fast Vector Search (Recall) - fetch 15 candidates
    candidate_k = 15
    query = """
    SELECT id, shloka_index, shloka_iast, sanskrit, transliteration,
           translation, explanation, application, chapter, category,
           1 - (embedding <=> %s::vector) as similarity
    FROM shlokas
    ORDER BY embedding <=> %s::vector
    LIMIT %s;
    """
    
    results = execute_query(query, (embedding_str, embedding_str, candidate_k))

    if not results:
        return []

    # Deduplicate by shloka text to avoid showing the same verse twice
    # and to save reranking time on identical rows
    seen = set()
    dedup_results = []
    for r in results:
        text = (r.get('shloka_iast') or '').strip()
        if text and text not in seen:
            seen.add(text)
            dedup_results.append(r)
        elif not text:
            # If no IAST text, include it (or you could deduplicate by translation)
            dedup_results.append(r)
            
    results = dedup_results

    if not reranker_model:
        # Fallback to pure vector search if reranker failed
        return [dict(r) for r in results[:top_k]]

    # Stage 2: CrossEncoder Reranking (Precision)
    pairs = []
    for r in results:
        # Combine relevant text fields for reranking context
        context = f"{r.get('shloka_iast', '')} {r.get('translation', '')} {r.get('explanation', '')}"
        pairs.append([query_str, context])

    # Predict scores
    scores = reranker_model.predict(pairs)

    # Assign new scores and sort
    for i, r in enumerate(results):
        r['rerank_score'] = float(scores[i])

    results.sort(key=lambda x: x['rerank_score'], reverse=True)

    # Return top_k as standard dictionaries to satisfy type checkers
    return [dict(r) for r in results[:top_k]]
