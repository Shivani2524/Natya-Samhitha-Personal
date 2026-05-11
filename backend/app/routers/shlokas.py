from fastapi import APIRouter, HTTPException
from app.models.schemas import ShlokaResponse
from app.services.database import execute_query

router = APIRouter()


@router.get("/{id}", response_model=ShlokaResponse)
async def get_shloka(id: str):
    """Fetch a single shloka by its UUID from the database."""
    results = execute_query(
        """
        SELECT id, shloka_iast, sanskrit, transliteration, translation,
               explanation, application, chapter, category
        FROM shlokas
        WHERE id = %s
        """,
        (id,)
    )

    if not results:
        raise HTTPException(status_code=404, detail="Shloka not found")

    row = results[0]
    return ShlokaResponse(
        id=str(row["id"]),
        shloka_iast=row.get("shloka_iast"),
        sanskrit=row.get("sanskrit"),
        transliteration=row.get("transliteration"),
        translation=row.get("translation"),
        explanation=row.get("explanation"),
        application=row.get("application"),
        chapter=row.get("chapter"),
        category=row.get("category"),
    )
