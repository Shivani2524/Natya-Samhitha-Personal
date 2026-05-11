"""
PDF Ingestion Pipeline for Natya Samhitha

This script:
1. Extracts text from a PDF file (Natya Shastra sample)
2. Chunks the text into shloka-level units
3. Generates BGE embeddings for each chunk
4. Stores the chunks + embeddings into Supabase PostgreSQL (pgvector)

Usage:
    cd NatyaSamhita  (project root)
    python -m ai_core.ingest --pdf backend/data/sample_natyashastra.pdf
"""

import argparse
import re
from pathlib import Path

from PyPDF2 import PdfReader
from sentence_transformers import SentenceTransformer

from ai_core.config import ai_settings
from ai_core.db import get_db_connection
from ai_core.utils import normalize_iast


def extract_text_from_pdf(pdf_path: str) -> str:
    """Extract all text from a PDF file."""
    reader = PdfReader(pdf_path)
    full_text = ""
    for page in reader.pages:
        text = page.extract_text()
        if text:
            full_text += text + "\n"
    return full_text


def chunk_by_shloka(text: str) -> list[dict]:
    """
    Split text into shloka-level chunks.

    Strategy:
    - Split on double newlines (paragraph boundaries) as a rough heuristic.
    - Each chunk is treated as a potential shloka unit.
    - Filter out very short chunks (headers, page numbers, etc.)
    - Apply IAST normalization to each chunk.

    For a production corpus, this would be replaced with
    structured XML/JSON parsing with explicit verse markers.
    """
    # Split on double newlines, verse markers (॥, //, ||), or 'Verse \d+' keywords
    raw_chunks = re.split(r"\n{2,}|(?:॥|//|\|\|)|(?=Verse \d+)", text)

    chunks = []
    for i, chunk in enumerate(raw_chunks):
        cleaned = chunk.strip()
        # Skip very short fragments (likely headers, page numbers)
        if len(cleaned) < 30:
            continue

        normalized = normalize_iast(cleaned)
        chunks.append({
            "shloka_index": i,
            "shloka_iast": normalized,
            "explanation": "",  # Will be populated later or by LLM
            "chapter": "",       # Will be extracted from context
            "metadata": {}
        })

    return chunks


def generate_embeddings(chunks: list[dict]) -> list[dict]:
    """
    Generate BGE-base-en-v1.5 embeddings for each chunk.
    Runs locally via sentence-transformers.
    """
    print(f"Loading embedding model: {ai_settings.EMBEDDING_MODEL_NAME}...")
    model = SentenceTransformer(ai_settings.EMBEDDING_MODEL_NAME)

    texts = [c["shloka_iast"] for c in chunks]
    print(f"Generating embeddings for {len(texts)} chunks...")
    embeddings = model.encode(texts, show_progress_bar=True, normalize_embeddings=True)

    for i, chunk in enumerate(chunks):
        chunk["embedding"] = embeddings[i].tolist()

    return chunks


def store_in_database(chunks: list[dict], document_title: str, source_path: str):
    """
    Store document + chunks + embeddings into PostgreSQL (Supabase).
    """
    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            # Insert the document record
            cur.execute(
                """
                INSERT INTO documents (title, source_type, source_path)
                VALUES (%s, %s, %s)
                RETURNING id
                """,
                (document_title, "pdf", source_path)
            )
            doc_id = cur.fetchone()["id"]
            print(f"Created document record: {doc_id}")

            # Insert each shloka with its embedding
            for chunk in chunks:
                embedding_str = "[" + ",".join(str(v) for v in chunk["embedding"]) + "]"
                cur.execute(
                    """
                    INSERT INTO shlokas (document_id, shloka_index, shloka_iast, explanation, chapter, metadata, embedding)
                    VALUES (%s, %s, %s, %s, %s, %s::jsonb, %s::vector)
                    """,
                    (
                        doc_id,
                        chunk["shloka_index"],
                        chunk["shloka_iast"],
                        chunk.get("explanation", ""),
                        chunk.get("chapter", ""),
                        "{}",
                        embedding_str
                    )
                )

            conn.commit()
            print(f"Successfully stored {len(chunks)} chunks in database.")

    except Exception as e:
        conn.rollback()
        print(f"Error storing data: {e}")
        raise
    finally:
        conn.close()


def ingest_pdf(pdf_path: str):
    """Full ingestion pipeline: PDF -> chunks -> embeddings -> database."""
    path = Path(pdf_path)
    if not path.exists():
        raise FileNotFoundError(f"PDF not found: {pdf_path}")

    print(f"[1/4] Extracting text from: {path.name}")
    raw_text = extract_text_from_pdf(pdf_path)
    print(f"      Extracted {len(raw_text)} characters.")

    print(f"[2/4] Chunking into shloka-level units...")
    chunks = chunk_by_shloka(raw_text)
    print(f"      Created {len(chunks)} chunks.")

    if not chunks:
        print("WARNING: No valid chunks found. Check the PDF content.")
        return

    print(f"[3/4] Generating embeddings...")
    chunks = generate_embeddings(chunks)

    print(f"[4/4] Storing in database...")
    store_in_database(chunks, document_title=path.stem, source_path=str(path))

    print("Ingestion complete!")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Ingest a Natya Shastra PDF into Supabase")
    parser.add_argument("--pdf", required=True, help="Path to the PDF file")
    args = parser.parse_args()
    ingest_pdf(args.pdf)
