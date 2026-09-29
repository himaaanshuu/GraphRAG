# GraphRAG Intelligence Engine

A production-grade Knowledge Intelligence Engine combining semantic RAG, vector/BM25 retrieval, and Neo4j knowledge graph capabilities.

## Problem Statement

Traditional RAG systems struggle with multi-hop reasoning, source provenance, and context preservation across complex documents. This system bridges vector search, BM25 keyword retrieval, and knowledge graph traversal to deliver accurate, cited answers with full source tracking.

## Key Features

- **Document Ingestion**: PDF and text parsing with metadata extraction
- **Semantic Chunking**: Advanced text splitting with overlap strategies
- **Dual Retrieval**: Vector similarity (pgvector) + BM25 keyword search
- **Knowledge Graph**: Neo4j-powered entity and relationship extraction
- **Hybrid Fusion**: Reranked combination of retrieval sources
- **Multi-Hop QA**: Graph traversal for indirect reasoning
- **Citation Grounding**: Source provenance from document to answer
- **RAG Evaluation**: Built-in evaluation framework with metrics
- **Observability**: Structured logging and request tracing
- **Authentication**: JWT-based user auth with protected routes
- **Production API**: FastAPI with full OpenAPI documentation
- **React Frontend**: Modern UI with chat, graph visualization, and document management
- **Dockerized Infrastructure**: PostgreSQL, Neo4j, Redis services

## Architecture Overview

The system follows a modular pipeline:

1. **Ingestion** → Document parsing and cleaning
2. **Chunking** → Semantic text splitting
3. **Embedding** → Vector generation
4. **Storage** → PostgreSQL + pgvector + Neo4j
5. **Retrieval** → Vector + BM25 + Graph search
6. **Fusion** → Reranked result combination
7. **Context Construction** → Provenance-aware context building
8. **LLM Generation** → Answer with citations
9. **Evaluation** → Metrics and benchmarking

## Tech Stack

- **Backend**: FastAPI, Python, SQLAlchemy, pgvector, Neo4j Driver
- **Database**: PostgreSQL, Neo4j, Redis
- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **RAG**: SentenceTransformers, BM25, Rerankers
- **Testing**: pytest, httpx

## Project Structure

```
graphrag-intelligence/
├── README.md                  # This file
├── PROJECT.md                 # Architecture and conventions
├── requirements.md            # Product and technical requirements
├── .env.example              # Environment variables
├── .gitignore               # Git ignore rules
├── docker-compose.yml         # Infrastructure services
├── Dockerfile               # Backend container definition
├── Makefile                 # Common development commands
├── requirements.txt         # Python dependencies
└── pyproject.toml           # Python project configuration
├── backend/                 # FastAPI application
│   └── ...
├── frontend/                # React TypeScript frontend
│   └── ...
├── data/                    # Raw and processed data
│   └── ...
├── docs/                    # Documentation
│   └── ...
└── .github/                 # CI/CD workflows
    └── ...
```

## Installation

### Prerequisites

- Docker and Docker Compose
- Python 3.11+
- Node.js 18+

### Local Development

```bash
# Clone and initialize
git clone <repository-url>
cd graphrag-intelligence

# Start infrastructure
docker-compose up -d

# Install backend dependencies
cd backend
pip install -r requirements.txt

# Install frontend dependencies
cd ../frontend
npm install

# Set up environment
cp .env.example .env
# Edit .env with your configuration

# Start the backend
cd ../backend
uvicorn app.main:app --reload

# Start the frontend
cd ../frontend
npm run dev
```

## Docker Setup

```bash
docker-compose up -d
# Services: backend, frontend, postgres, neo4j, redis
```

## Example Query

1. Upload a document via the frontend
2. System parses and chunks the content
3. Embeddings generated and stored in pgvector
4. Entities and relationships extracted to Neo4j
5. Ask a question - system retrieves via hybrid search
6. Reranked results provide context with citations
7. LLM generates answer with source provenance

## Evaluation

The system includes a RAG evaluation framework to assess answer quality, citation accuracy, and retrieval effectiveness using configurable test datasets.

## Roadmap

- MVP: Core ingestion, embedding, vector search, basic QA
- v2: BM25, hybrid retrieval, graph extraction, multi-hop QA
- v3: Advanced reranking, citation verification, batch processing, team features

## License

MIT License - see LICENSE file for details.