from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from app.models.schemas import QueryRequest, QueryResponse
from app.services.query_service import process_query, process_query_for_stream, stream_explanation
from app.services.cache_service import cache_service
import json
import asyncio
from ai_core.utils import format_shloka
import uuid

router = APIRouter()


@router.post("", response_model=QueryResponse)
@router.post("/", response_model=QueryResponse)
async def submit_query(request: QueryRequest):
    """Execute the RAG pipeline and return structured results."""
    cached = await cache_service.get_cached_query(request.query)
    if cached:
        return QueryResponse(
            query_id=str(uuid.uuid4()),
            shlokas=cached.get("shlokas", []),
            explanation=cached.get("explanation", ""),
            image_refs=cached.get("image_refs", [])
        )

    result = await process_query(request.query, history=request.history)
    
    await cache_service.set_cached_query(request.query, {
        "shlokas": result["shlokas"],
        "explanation": result["explanation"],
        "image_refs": result["image_refs"]
    })

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
    """
    cached = await cache_service.get_cached_query(request.query)
    if cached:
        async def generate_cached():
            yield "---SHLOKAS---\n"
            yield json.dumps(cached.get("shlokas", []))
            yield "\n---EXPLANATION---\n"
            
            explanation = cached.get("explanation", "")
            chunk_size = 100
            for i in range(0, len(explanation), chunk_size):
                yield explanation[i:i+chunk_size]
                await asyncio.sleep(0.002)

        return StreamingResponse(
            generate_cached(),
            media_type="text/plain",
            headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"}
        )

    # Retrieve relevant shlokas for context
    retrieved_shlokas = await process_query_for_stream(request.query)
    formatted_shlokas = [format_shloka(s) for s in retrieved_shlokas]

    async def generate():
        yield "---SHLOKAS---\n"
        yield json.dumps(formatted_shlokas)
        yield "\n---EXPLANATION---\n"
        
        full_explanation = ""
        async for chunk in stream_explanation(request.query, retrieved_shlokas, history=request.history):
            full_explanation += chunk
            yield chunk

        # Save to cache after streaming finishes
        await cache_service.set_cached_query(
            request.query, 
            {
                "shlokas": formatted_shlokas, 
                "explanation": full_explanation,
                "image_refs": []
            }
        )

    return StreamingResponse(
        generate(),
        media_type="text/plain",
        headers={
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no",
        }
    )
