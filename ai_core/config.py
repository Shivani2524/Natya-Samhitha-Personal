"""
AI Core Configuration
Standalone config for the AI/LLM module — no imports from backend.
Loads environment variables from the project root .env file.
"""

import os
from pathlib import Path
from dotenv import load_dotenv

# Load .env from project root (NatyaSamhita/.env) or backend/.env
_project_root = Path(__file__).resolve().parent.parent
_env_candidates = [
    _project_root / ".env",
    _project_root / "backend" / ".env",
]

for env_path in _env_candidates:
    if env_path.exists():
        load_dotenv(dotenv_path=env_path, override=True)
        break


class AISettings:
    """Settings for the AI/LLM pipeline — fully independent from backend config."""

    # Database (needed for vector search + ingestion)
    DATABASE_URL: str = os.getenv("DATABASE_URL", "")

    # Groq LLM
    GROQ_API_KEY: str = os.getenv("GROQ_API_KEY", "")
    GROQ_BASE_URL: str = os.getenv("GROQ_BASE_URL", "https://api.groq.com/openai/v1")
    GROQ_MODEL: str = os.getenv("GROQ_MODEL", "llama-3.3-70b-versatile")

    # Upstash Redis Cache
    UPSTASH_REDIS_REST_URL: str = os.getenv("UPSTASH_REDIS_REST_URL") or os.getenv("UPSTASH_REDIS_URL") or ""
    UPSTASH_REDIS_REST_TOKEN: str = os.getenv("UPSTASH_REDIS_REST_TOKEN") or os.getenv("UPSTASH_REDIS_TOKEN") or ""

    # Embedding Model
    EMBEDDING_MODE: str = os.getenv("EMBEDDING_MODE", "local")
    EMBEDDING_MODEL_NAME: str = "BAAI/bge-base-en-v1.5"
    EMBEDDING_DIMENSION: int = 768
    RERANKER_MODEL_NAME: str = "BAAI/bge-reranker-base"

ai_settings = AISettings()
