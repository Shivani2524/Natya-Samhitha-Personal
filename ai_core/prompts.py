"""
Prompt Engineering Module
Constructs system and user prompts for the RAG pipeline.
"""

from typing import List, Dict, Any


def build_context_string(context_shlokas: List[Dict[str, Any]]) -> str:
    """Build a context string from retrieved shlokas for the LLM prompt."""
    context_parts = []
    for s in context_shlokas:
        parts = []
        if s.get("shloka_iast"):
            parts.append(f"Shloka (IAST):\n{s['shloka_iast']}")
        if s.get("sanskrit"):
            parts.append(f"Sanskrit:\n{s['sanskrit']}")
        if s.get("translation"):
            parts.append(f"Translation:\n{s['translation']}")
        if s.get("explanation"):
            parts.append(f"Explanation:\n{s['explanation']}")
        if s.get("chapter"):
            parts.append(f"Chapter: {s['chapter']}")
        context_parts.append("\n".join(parts) + "\n---")
    return "\n".join(context_parts)


def build_messages(query: str, context_str: str) -> list:
    """Build the chat messages (system + user) for the LLM."""
    system_prompt = (
        "You are an expert scholar of the Natya Shastra and classical Indian arts. "
        "Your role is to answer the user's query accurately using the provided context. "
        "Always preserve the exact IAST spelling of Sanskrit terms from the context. "
        "Provide a clear, educational, and well-structured response."
    )

    user_prompt = f"""
Context from Natya Shastra:
{context_str}

User Query: {query}

Based on the context provided, answer the user's query. If the context does not contain the answer, acknowledge that but try to provide helpful insights if possible.
"""
    return [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_prompt},
    ]
