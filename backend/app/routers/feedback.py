from fastapi import APIRouter, HTTPException
from app.models.schemas import FeedbackRequest
from app.services.database import execute_query

router = APIRouter()


@router.post("")
@router.post("/")
async def submit_feedback(request: FeedbackRequest):
    """Log user feedback (thumbs up/down) for a query response."""
    try:
        execute_query(
            """
            INSERT INTO feedback_log (query_id, feedback)
            VALUES (%s, %s)
            """,
            (request.query_id, request.feedback),
            fetch=False
        )
        return {"status": "success"}
    except Exception as e:
        print(f"Error logging feedback: {e}")
        raise HTTPException(status_code=500, detail="Failed to log feedback")
