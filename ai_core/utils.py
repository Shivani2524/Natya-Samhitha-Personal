"""
AI Core Utilities
Common helper functions for text processing and data formatting.
"""

import unicodedata
from typing import Dict, Any


def normalize_iast(text: str) -> str:
    """
    Apply NFC Unicode normalization to preserve IAST diacritics.
    This is a non-negotiable requirement from the architecture doc.
    """
    return unicodedata.normalize("NFC", text)


def format_shloka(s: Dict[str, Any]) -> Dict[str, Any]:
    """Format a raw DB shloka row into the clean response shape."""
    return {
        "id": str(s["id"]),
        "shloka_iast": s.get("shloka_iast") or None,
        "sanskrit": s.get("sanskrit") or None,
        "transliteration": s.get("transliteration") or None,
        "translation": s.get("translation") or None,
        "explanation": s.get("explanation") or None,
        "application": s.get("application") or None,
        "chapter": s.get("chapter") or None,
        "category": s.get("category") or None,
    }
