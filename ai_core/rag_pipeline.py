"""
RAG Pipeline Orchestration
Coordinates the full Retrieval-Augmented Generation pipeline:
  query → embed → retrieve → generate → format
"""

import uuid
from typing import Dict, Any, List

from ai_core.embeddings import get_query_embedding
from ai_core.retrieval import search_shlokas
from ai_core.llm import generate_rag_response
from ai_core.utils import format_shloka


async def process_query(query: str) -> Dict[str, Any]:
    """
    Orchestrates the full RAG pipeline for a given query.

    Steps:
        1. Generate query embedding (BGE)
        2. Retrieve relevant shlokas (pgvector)
        3. Generate explanation (Groq LLM)
        4. Format and return results

    Returns:
        Dict with query_id, shlokas, explanation, and image_refs.
    """
    query_id = str(uuid.uuid4())

    # 1. Generate query embedding
    query_embedding = get_query_embedding(query)

    # 2. Retrieve relevant shlokas
    retrieved_shlokas = search_shlokas(query_embedding, top_k=3)

    # 3. Generate response using Groq
    explanation = await generate_rag_response(query, retrieved_shlokas)

    # 4. Format the output
    formatted_shlokas = [format_shloka(s) for s in retrieved_shlokas]

    return {
        "query_id": query_id,
        "shlokas": formatted_shlokas,
        "explanation": explanation,
        "image_refs": []
    }


async def process_query_for_stream(query: str) -> List[Dict[str, Any]]:
    """
    Returns retrieved shlokas for use by the streaming endpoint.
    The streaming endpoint handles the LLM call itself via stream_explanation().
    """
    query_embedding = get_query_embedding(query)
    retrieved_shlokas = search_shlokas(query_embedding, top_k=3)
    return retrieved_shlokas
