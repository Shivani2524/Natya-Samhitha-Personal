"""
LLM Interaction Module
Handles Groq API calls for both streaming and non-streaming responses.
"""

from typing import List, Dict, Any, AsyncGenerator, Optional
from openai import AsyncOpenAI
from ai_core.config import ai_settings
from ai_core.prompts import build_context_string, build_messages


async def generate_rag_response(query: str, context_shlokas: List[Dict[str, Any]], history: Optional[list] = None) -> str:
    """Generate a complete (non-streaming) RAG response via Groq."""
    client = AsyncOpenAI(
        api_key=ai_settings.GROQ_API_KEY,
        base_url=ai_settings.GROQ_BASE_URL
    )

    context_str = build_context_string(context_shlokas)
    messages = build_messages(query, context_str, history)

    try:
        response = await client.chat.completions.create(
            model=ai_settings.GROQ_MODEL,
            messages=messages,
            max_tokens=800,
            temperature=0.3
        )
        return response.choices[0].message.content or ""
    except Exception as e:
        print(f"Error calling Groq API: {e}")
        return "I apologize, but I am currently unable to generate a detailed explanation due to an external service error."


async def stream_explanation(query: str, context_shlokas: List[Dict[str, Any]], history: Optional[list] = None) -> AsyncGenerator[str, None]:
    """Stream the RAG explanation token-by-token via Groq's streaming API."""
    client = AsyncOpenAI(
        api_key=ai_settings.GROQ_API_KEY,
        base_url=ai_settings.GROQ_BASE_URL
    )

    context_str = build_context_string(context_shlokas)
    messages = build_messages(query, context_str, history)

    try:
        stream = await client.chat.completions.create(
            model=ai_settings.GROQ_MODEL,
            messages=messages,
            max_tokens=800,
            temperature=0.3,
            stream=True
        )
        async for chunk in stream:
            delta = chunk.choices[0].delta
            if delta.content:
                yield delta.content
    except Exception as e:
        print(f"Error streaming from Groq API: {e}")
        yield "I apologize, but I am currently unable to generate a detailed explanation due to an external service error."
