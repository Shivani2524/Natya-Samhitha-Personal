from pydantic import BaseModel
from typing import List, Optional
from uuid import UUID


class QueryRequest(BaseModel):
    query: str
    history: Optional[List[dict]] = []


class ShlokaResponse(BaseModel):
    id: str
    sanskrit: Optional[str] = None
    shloka_iast: Optional[str] = None
    transliteration: Optional[str] = None
    translation: Optional[str] = None
    explanation: Optional[str] = None
    application: Optional[str] = None
    chapter: Optional[str] = None
    category: Optional[str] = None


class QueryResponse(BaseModel):
    query_id: str
    shlokas: List[ShlokaResponse]
    explanation: str
    image_refs: Optional[List[str]] = []
    related_topics: Optional[List[str]] = []


class FeedbackRequest(BaseModel):
    query_id: str
    feedback: int  # 1 for thumbs up, -1 for thumbs down
