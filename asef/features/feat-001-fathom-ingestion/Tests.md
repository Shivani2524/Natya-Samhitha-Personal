# Tests

## Unit Tests

1. **API Router** (`tests/test_api_ingest.py`):
   - Test `POST /api/ingest/fathom` with valid dates -> Should return 200 and a success summary JSON.
   - Test `POST /api/ingest/fathom` with missing or invalid date formats -> Should return 422 Unprocessable Entity.

2. **Fathom Service** (`tests/test_fathom_service.py`):
   - Mock a successful Fathom API response -> Service should correctly construct auth headers and return parsed transcript dictionaries.
   - Mock a Fathom API failure (e.g., 401 Unauthorized or 500) -> Service should elegantly handle and raise the appropriate Python exception.

3. **Database Client** (`tests/test_lancedb_client.py`):
   - Test initialization of the LanceDB table `conversations`.
   - Test inserting a full transcript document (as raw JSON/Text with metadata) -> Should verify the record exists in the local LanceDB directory.

## Integration Tests

1. **End-to-End Ingestion Flow**:
   - Using a mock Fathom API HTTP response and an ephemeral/temp LanceDB directory, sending a payload to the FastAPI endpoint should execute the complete flow and yield a `200 OK` with accurate ingestion counts.
