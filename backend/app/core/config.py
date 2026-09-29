from __future__ import annotations

"""GraphRAG Intelligence Engine - Core Configuration"""

from pydantic import Field
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    # Application
    app_env: str = "development"
    app_debug: bool = True
    app_host: str = "0.0.0.0"
    app_port: int = 8000

    # Database
    database_url: str = "postgresql://postgres:postgres@localhost:5432/graphrag"

    # Neo4j
    neo4j_uri: str = "bolt://localhost:7687"
    neo4j_username: str = "neo4j"
    neo4j_password: str = "neo4j"

    # Redis
    redis_url: str = "redis://localhost:6379"

    # LLM
    llm_provider: str = "openai"
    llm_api_key: str = ""
    llm_model: str = "gpt-4o-mini"

    # Embedding
    embedding_model: str = "all-miniLM-L6-v2"

    # Authentication
    jwt_secret_key: str = "change-this-to-a-secure-random-value"
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 15

    # CORS
    cors_origins: list[str] = ["http://localhost:5173", "http://localhost:3000"]

    # Model configuration
    embedding_dimension: int = 384  # all-miniLM-L6-v2 default

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


# Singleton instance
settings = Settings()  # type: ignore[assignment]