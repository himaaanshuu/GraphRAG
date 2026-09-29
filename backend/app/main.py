from __future__ import annotations

"""GraphRAG Intelligence Engine - Main Application Entry Point"""

from fastapi import FastAPI
from app.core.config import settings

app = FastAPI(
    title="GraphRAG Intelligence Engine",
    version="0.1.0",
    description="Production-grade Knowledge Intelligence Engine",
)

@app.get("/api/health", tags=["health"])
async def health_check():
    """Health check endpoint"""
    return {"status": "ok", "service": "graphrag-intelligence"}

# Include routers will be added here as they are developed