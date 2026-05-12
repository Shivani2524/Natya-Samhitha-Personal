# Implementation Plan

## Edit 1: Setup Backend Core & Dependencies
- Populate `backend/pixi.toml` with necessary dependencies: `fastapi`, `uvicorn`, `httpx` (for async Fathom requests), `lancedb`, `python-dotenv`, and `pytest`.
- Initialize `backend/app/main.py` with the barebones FastAPI app instance.

## Edit 2: Database Abstraction
- Create `backend/app/database/lancedb_client.py`.
- Define the `Conversation` schema (Call Title, Date, Fathom ID, and the entire transcript as plain text/JSON). 
- Note: No chunking is performed in this feature.
- Write methods to connect to the local directory `data/db` and execute insertions.

## Edit 3: Fathom Service 
- Create `backend/app/services/fathom_service.py`.
- Securely load the `FATHOM_API_KEY` from the environment.
- Add an asynchronous function to request transcripts from the Fathom API filtered by `start_date` and `end_date`.

## Edit 4: FastAPI Router & Orchestration
- Create `backend/app/api/ingest.py`.
- Implement the `POST /api/ingest/fathom` endpoint.
- Connect the Fathom Service fetch call directly to the Database Client insert method.
- Wire the router to the main FastAPI application in `main.py`.

## Edit 5: Final Review & Tests
- Execute unit and integration tests as outlined in `Tests.md`.
- Present the final Test Results and system run state to the developer before closing out the feature.
