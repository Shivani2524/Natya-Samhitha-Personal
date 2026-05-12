# Knowledge

> Central repository for architectural decisions, tricky bug fixes, reusable context, and gotchas. Updated at the close of every feature.

## Architecture Decisions
- **Database**: LanceDB was chosen to keep vector text search and document metadata together locally, preventing the need for a separate DB just for embeddings.
- **Backend/Frontend Link**: Standard REST with FastAPI handling all LLM interactions; strictly decoupled from the JS UI for simplicity.

## Patterns & Gotchas
*(Empty for now - to be populated during Feature development)*
