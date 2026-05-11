import sys
import os

# Add the project root to sys.path to allow importing ai_core
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import query, shlokas, feedback

app = FastAPI(
    title="Natya Samhitha API",
    description="Backend API for the Natya Samhitha Platform",
    version="0.1.0",
    redirect_slashes=False
)

# CORS — allow the Next.js dev server and common local origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(query.router, prefix="/api/v1/query", tags=["Query"])
app.include_router(shlokas.router, prefix="/api/v1/shlokas", tags=["Shlokas"])
app.include_router(feedback.router, prefix="/api/v1/feedback", tags=["Feedback"])

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
