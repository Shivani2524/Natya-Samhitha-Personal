"""
Query Service — Thin Backend Wrapper
Delegates all AI/LLM logic to the ai_core module.
This file exists so that the routers don't need to change their imports.
"""

from ai_core import (
    process_query,
    process_query_for_stream,
    stream_explanation,
)

# Re-export for the routers
__all__ = [
    "process_query",
    "process_query_for_stream",
    "stream_explanation",
]
