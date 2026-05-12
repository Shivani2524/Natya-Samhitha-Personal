# Project.md

## Metadata

- **Project Name**: Natya Samhita
- **Version**: 0.1.0
- **Repository**: git@github.com:Alonzo-Spark/natyaSamhita.git
- **Created**: 5/5/26
- **Primary Maintainer**: Ganesh Katrapati

## Goals

1. Build an AI-powered knowledge assistant for Natya Shastra and classical Indian performing arts.
2. Allow users to ask questions about mudras, rasas, bhavas, adavus, dance postures, and performance concepts.
3. Support document-based retrieval (RAG) using Natya Shastra PDFs and related curated sources.
4. Enable OCR extraction from scanned classical texts for searchable knowledge ingestion.
5. Provide context-aware answers strictly based on uploaded knowledge sources.
6. Include multilingual support for easier accessibility.
7. Build a clean interactive UI for students, researchers, and dance practitioners.
8. Support semantic search across concepts and linked references.

## Tech Stack

<!-- Languages, frameworks, databases, infrastructure. Include version constraints where they matter. -->

- **Language**: Python (backend), TypeScript (frontend)
- **Framework**: FastAPI + Uvicorn (backend), Next.js 16 (frontend)
- **Database**: Supabase PostgreSQL + pgvector
- **LLM Integration**: Groq API (Llama 3.3 70B) via OpenAI SDK
- **PDF Processing**: PyPDF2
- **Embeddings**: Sentence Transformers — BAAI/bge-base-en-v1.5 (local)
- **Reranking**: CrossEncoder — BAAI/bge-reranker-base
- **Chunking Strategy**: Regex-based custom shloka-level splitter
- **Caching**: Upstash Redis
- **UI Components**: shadcn/ui, Framer Motion, Lucide Icons, Tailwind CSS v4
- **State Management**: Zustand
- **Infrastructure**: Local development
- **Package Manager**: pip (backend), npm (frontend)
- **Testing**: Pytest (backend), Vitest (frontend)


## Users & Personas

### Persona 1: Dance Student
- **Description**: Learns Bharatanatyam/Kuchipudi and needs conceptual clarity.
- **Workflow**:
  - Ask questions about mudras, expressions, postures
  - View explanations with references
  - Learn meanings and usage

### Persona 2: Researcher
- **Description**: Studies Natya Shastra academically.
- **Workflow**:
  - Search ancient concepts
  - Compare chapters/topics
  - Retrieve exact references from source texts

### Persona 3: General User
- **Description**: Curious about Indian classical dance traditions.
- **Workflow**:
  - Ask simple questions
  - Explore concepts visually
  - Learn cultural significance

## Rules & Guardrails

<!-- Hard constraints the agent must never violate — security policies, performance budgets, regulatory requirements, coding standards. -->

- Keep a .env file and DO NOT commit that to git
- All API Keys should be in .env and should never be seen by you. 

