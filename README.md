# Natya Samhitha

An AI-powered knowledge platform dedicated to exploring the wisdom of the **Natya Shastra** using a modern RAG (Retrieval-Augmented Generation) pipeline.

## Project Structure

This repository is split into three main modules:

1. **`ai_core/`**: The standalone LLM and AI brain. Contains the RAG orchestration, vector embeddings (BGE-base), PDF ingestion pipeline, and Groq integration.
2. **`backend/`**: A lightweight FastAPI server that handles API routes, Supabase/pgvector database connections, and serves as a gateway to the `ai_core`.
3. **`frontend/`**: A responsive Next.js application that provides the user interface for asking questions and displaying the generated explanations and retrieved shlokas.

## Getting Started (Local Development)

### 1. Database & AI Backend Setup

First, set up your Python environment and configuration for the backend services:

```bash
# Navigate to the backend
cd backend

# Create and activate a virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install all dependencies (backend + ai_core)
pip install -r requirements.txt
pip install -r ../ai_core/requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your actual Supabase credentials and Groq API key!
```

To run the backend server (starts on `http://localhost:8000`):
```bash
# From the project ROOT directory (important so ai_core is importable)
source backend/venv/bin/activate
PYTHONPATH=.:backend uvicorn backend.app.main:app --reload --port 8000
```

### 2. Frontend Setup

In a new terminal window, set up the Next.js frontend:

```bash
# Navigate to the frontend
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will run on [http://localhost:3000](http://localhost:3000).

## Data (OCR PDFs)

The OCR-processed PDFs of the Natya Shastra chapters are stored in `data/ocr-project/`. These are required if you want to run the ingestion pipeline (`ai_core/ingest.py`) to repopulate your vector database.
