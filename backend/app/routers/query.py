from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from app.models.schemas import QueryRequest, QueryResponse
from app.services.query_service import process_query, process_query_for_stream, stream_explanation

router = APIRouter()


@router.post("", response_model=QueryResponse)
@router.post("/", response_model=QueryResponse)
async def submit_query(request: QueryRequest):
    """Execute the RAG pipeline and return structured results."""
    result = await process_query(request.query)
    
    return QueryResponse(
        query_id=result["query_id"],
        shlokas=result["shlokas"],
        explanation=result["explanation"],
        image_refs=result["image_refs"]
    )


@router.post("/stream")
async def stream_query(request: QueryRequest):
    """
    Stream the RAG explanation as plain text chunks.
    The frontend reads this via ReadableStream to show progressive text.
    """
    # Retrieve relevant shlokas for context
    retrieved_shlokas = await process_query_for_stream(request.query)

    async def generate():
        async for chunk in stream_explanation(request.query, retrieved_shlokas):
            yield chunk

    return StreamingResponse(
        generate(),
        media_type="text/plain",
        headers={
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no",
        }
    )
