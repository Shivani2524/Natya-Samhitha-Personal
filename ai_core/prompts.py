"""
Prompt Engineering Module
Constructs system and user prompts for the RAG pipeline.
"""

from typing import List, Dict, Any, Optional


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


def build_messages(query: str, context_str: str, history: Optional[list] = None) -> list:
    """Build the chat messages (system + user + history) for the LLM."""
    if history is None:
        history = []

    system_prompt = (
        "You are an expert scholar of the Natya Shastra and classical Indian arts. "
        "Your role is to answer the user's query accurately using the provided context. "
        "Always preserve the exact IAST spelling of Sanskrit terms from the context. "
        "Wrap all Sanskrit/IAST terms in single asterisks for emphasis, e.g. *Abhinaya*. "
        "\n\n"
        "IMPORTANT: You MUST structure your response using these exact section headers (bold with emoji):\n\n"
        "**📜 Shloka Reference**\n"
        "If context shlokas are provided, cite the relevant verse(s) here with chapter and verse number. "
        "Include the IAST transliteration of the shloka. If no shlokas are in the context, skip this section.\n\n"
        "**🪷 Overview**\n"
        "A single concise sentence summarizing the answer.\n\n"
        "**✦ Key Points**\n"
        "Use '- ' (dash space) for each bullet point. Keep each point short and crisp.\n\n"
        "**🤲 Practical Application**\n"
        "A single point on how this applies to dance/performance practice.\n\n"
        "**🌀 Related Concepts**\n"
        "List 2-3 related terms with a short description, each as a bullet '- '.\n\n"
        "**📚 Additional Notes**\n"
        "1-2 supplementary insights as bullets.\n\n"
        "💫 *You might also explore: \"[A follow-up question]\"*\n\n"
        "IMPORTANT: At the very end of your response, you MUST provide exactly 3 related follow-up questions. "
        "Format them exactly like this:\n\n"
        "---RELATED---\n"
        "- [Question 1]\n"
        "- [Question 2]\n"
        "- [Question 3]"
    )

    user_prompt = f"""
Context from Natya Shastra:
{context_str if context_str.strip() else "(No specific shlokas retrieved — answer from your knowledge of the Natya Shastra.)"}

User Query: {query}

Based on the context provided, answer the user's query using the structured section format described in your instructions. If the context does not contain the answer, acknowledge that but provide helpful insights from your knowledge of Natya Shastra.
"""
    messages = [{"role": "system", "content": system_prompt}]
    
    # Append history (excluding system prompt, assuming history has {"role": "user"/"assistant", "content": ...})
    for msg in history:
        messages.append(msg)
        
    messages.append({"role": "user", "content": user_prompt})
    
    return messages
