from fastapi import APIRouter, HTTPException
from app.models.schemas import SlokaResponse
from app.services.database import execute_query

router = APIRouter()


@router.get("/{id}", response_model=SlokaResponse)
async def get_sloka(id: str):
    """Fetch a single sloka by its UUID from the database."""
    results = execute_query(
        """
        SELECT id, sloka_iast, sanskrit, transliteration, translation,
               explanation, application, chapter, category
        FROM slokas
        WHERE id = %s
        """,
        (id,)
    )

    if not results:
        raise HTTPException(status_code=404, detail="Sloka not found")

    row = results[0]
    return SlokaResponse(
        id=str(row["id"]),
        sloka_iast=row.get("sloka_iast"),
        sanskrit=row.get("sanskrit"),
        transliteration=row.get("transliteration"),
        translation=row.get("translation"),
        explanation=row.get("explanation"),
        application=row.get("application"),
        chapter=row.get("chapter"),
        category=row.get("category"),
    )
