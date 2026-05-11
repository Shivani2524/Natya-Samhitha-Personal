"""
Embedding Module
Handles embedding model loading and query encoding using BGE-base-en-v1.5.
"""

from sentence_transformers import SentenceTransformer
from ai_core.config import ai_settings

# Lazy-load the embedding model
_embedding_model = None


def get_embedding_model() -> SentenceTransformer:
    """Lazy-load and cache the SentenceTransformer embedding model."""
    global _embedding_model
    if _embedding_model is None:
        _embedding_model = SentenceTransformer(ai_settings.EMBEDDING_MODEL_NAME, device="cpu")
    return _embedding_model


def get_query_embedding(query: str) -> list[float]:
    """
    Generate a normalized embedding for a search query.
    Uses BGE instruction prefix for optimal retrieval quality.
    """
    model = get_embedding_model()
    # BGE specifies using instruction for query embeddings
    instruction = "Represent this sentence for searching relevant passages: "
    embedding = model.encode(instruction + query, normalize_embeddings=True)
    return embedding.tolist()
