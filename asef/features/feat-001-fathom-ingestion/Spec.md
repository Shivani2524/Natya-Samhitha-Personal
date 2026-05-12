# Spec.md

> Feature contract — the single source of truth for what this Feature does.

## Feature Description & Behaviour

We need a backend API route that, when called, fetches transcripts from the Fathom API for a specified date range. These transcripts must then be chunked (if necessary) and stored into LanceDB alongside relevant metadata (call title, date, Fathom ID).

### Acceptance Criteria

1. A FastAPI route (e.g., `POST /api/ingest/fathom`) accepts a JSON payload with a start and end date.
2. The backend successfully authenticates and pulls transcript data from Fathom using an API key stored in `.env`.
3. Transcripts are converted into Snippet documents and saved into the local LanceDB database with associated Conversation metadata.
4. The endpoint returns a JSON response summarizing how many conversations and individual snippets were successfully ingested.

## Architecture Changes

No architecture changes. This instantiates the backend API and database connections laid out in `Architecture.md`.

## Major Code Changes & Locations

- `backend/app/api/ingest.py` (NEW): Define the ingestion API router.
- `backend/app/services/fathom_service.py` (NEW): External Fathom API implementation for querying and formatting transcripts based on date ranges.
- `backend/app/database/lancedb_client.py` (NEW): Database initialization and insertion methods for storing the Fathom Snippets.
- `backend/app/main.py` (NEW): FastAPI server entry point.
- `backend/pixi.toml` (NEW): Backend python dependencies (fastapi, requests/httpx, lancedb, uvicorn, python-dotenv).
- `.env` / `.env.example`: Introduction of `FATHOM_API_KEY`.
