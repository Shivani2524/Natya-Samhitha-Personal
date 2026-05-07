"""
AI Core Module — Natya Samhitha
================================
Standalone AI/LLM pipeline for the Natya Samhitha platform.
This module is fully independent and has ZERO imports from the backend.

Public API:
    - process_query(query) -> dict         Full RAG pipeline
    - process_query_for_stream(query)      Retrieve shlokas for streaming
    - generate_rag_response(query, ctx)    Non-streaming LLM call
    - stream_explanation(query, ctx)       Streaming LLM call
    - get_query_embedding(query)           Generate query embedding
    - search_shlokas(embedding, top_k)     Vector similarity search
    - ingest_pdf(pdf_path)                 PDF ingestion pipeline
"""

from ai_core.rag_pipeline import process_query, process_query_for_stream
from ai_core.llm import generate_rag_response, stream_explanation
from ai_core.embeddings import get_query_embedding
from ai_core.retrieval import search_shlokas
from ai_core.ingest import ingest_pdf

__all__ = [
    "process_query",
    "process_query_for_stream",
    "generate_rag_response",
    "stream_explanation",
    "get_query_embedding",
    "search_shlokas",
    "ingest_pdf",
]
