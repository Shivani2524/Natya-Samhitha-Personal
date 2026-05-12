# Architecture.md

## Components

- **Backend API (FastAPI)**:
  - Responsibility: Expose REST APIs for the frontend (search, graph traversal, and summary generation). Manages ingestion of Fathom transcripts, chunking, and orchestration of LLM calls for concept extraction and RAG queries.
  - Key files/modules: `backend/app/main.py`, `backend/app/api/`, `backend/app/services/`
- **Frontend Client**:
  - Responsibility: Present a clean, flat UI containing an interactive concept graph. Handles user inputs (search queries), renders connected nodes, displays selected conversation snippets, and shows LLM-driven summaries.
  - Key files/modules: `frontend/index.html`, `frontend/src/`
- **Database (LanceDB)**:
  - Responsibility: Act as an embedded, single-directory local data store for Fathom metadata, conversation chunks (Snippets), extracted Concepts (Nodes), and their Relationships (Edges). Also natively stores and queries vector embeddings for RAG searches.
  - Key files/modules: `backend/app/database/`, `backend/data/`
- **LLM Engine Integration**:
  - Responsibility: Graph extraction (parsing transcripts to Concepts + Relationships) and dynamic summarization over retrieved RAG contents.
  - Key files/modules: `backend/app/services/llm.py`

## Connections

- **Frontend** → **Backend API**:
  - Method: REST HTTP (JSON).
  - Notes: Search queries, node clicking events, and summary requests flow from Frontend to Backend. Backend returns sub-graph JSON, snippet text, and generated summaries.
- **Backend API** → **Database**:
  - Method: Direct local file connection (SQL/Vector search).
  - Notes: Stores and retrieves nodes, edges, snippets, and searches embeddings to perform RAG.
- **Backend API** → **LLM Engine**:
  - Method: External API calls (e.g., via LangChain/LlamaIndex or direct standard API integrations).
  - Notes: Passes transcript chunks for concept extraction or retrieved pieces for summarization. Strictly uses local `.env` variables for API keys.

## Folder Structure

```
./
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI application entry point
│   │   ├── api/                 # API routes (search, graph, summary)
│   │   ├── services/            # Business logic (LLM extraction, RAG orchestration)
│   │   ├── models/              # Defined Pydantic schema and DB models
│   │   └── database/            # Local DB abstraction
│   ├── tests/                   # Pytest testing suite
│   ├── data/                    # Storage for the local database directory (ignored in git)
│   └── pixi.toml                # Package management for Python (Pixi)
├── frontend/
│   ├── index.html               # Main Web App entry
│   ├── src/                     # JS source files, Graph rendering logic
│   ├── style.css                # Clean, flat UI styling
│   ├── package.json             # NPM package management configuration
│   └── tests/                   # Frontend unit tests
├── asef/                        # Agent configuration and artifacts
│   ├── Project.md
│   ├── Architecture.md
│   ├── FlowDiagram.md
│   └── ...
└── .env                         # Environment variables (MUST BE gitignored)
```

## Code Style Guidelines

- **Naming**:
  - Python: `snake_case` for variables/functions, `CamelCase` for classes.
  - JavaScript: `camelCase` for variables/functions, `PascalCase` for components.
- **File Organisation**: Separation of concerns. Avoid bloated files. Routes strictly handle I/O and status codes; business logic belongs in services.
- **Imports**: Group imports—standard library first, third-party packages second, local application modules last.
- **Comments**: Focus on the 'why' rather than 'what'. Provide module-level docstrings and API schema annotations.
