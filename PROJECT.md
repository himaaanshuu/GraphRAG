# GraphRAG Intelligence Engine

## 1. Project Overview

GraphRAG Intelligence Engine is a production-grade Knowledge Intelligence System that combines vector-based semantic retrieval, BM25 keyword search, and Neo4j knowledge graph traversal to deliver multi-hop QA with full citation grounding and source provenance. The system is designed as a modular, scalable platform suitable for complex knowledge work rather than simple PDF chatbots.

## 2. Tech Stack

### Backend
- FastAPI (API framework)
- SQLAlchemy + pgvector (PostgreSQL)
- Neo4j Driver (knowledge graph)
- Redis (caching/queues)
- Pydantic (validation)
- JWT (authentication)
- Pytest (testing)

### Frontend
- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS (styling)
- React Router (routing)
- Zustand (state management)
- Axios (HTTP client)

### RAG/AI
- SentenceTransformers / OpenAI embeddings
- BM25 (via rank-bm25)
- Rerankers (cross-encoder)
- OpenAI or Anthropic LLM

### Infrastructure
- PostgreSQL 15
- Neo4j 5
- Redis 7

## 3. Complete Directory Structure

graphrag-intelligence/
│
├── README.md              # Public-facing project overview
├── PROJECT.md             # Architecture and conventions (primary AI agent context)
├── requirements.md        # Product and technical requirements specification
├── .env.example           # Environment variable placeholders
├── .gitignore             # Git exclusion rules
├── docker-compose.yml     # Infrastructure service definitions
├── Dockerfile             # Backend container definition
├── Makefile               # Development command shortcuts
├── requirements.txt       # Python dependencies (auto-generated from pyproject.toml)
├── pyproject.toml         # Python project configuration

├── backend/               # FastAPI application (primary backend code)
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py        # Application entry point
│   │   │
│   │   ├── api/
│   │   │   ├── __init__.py
│   │   │   ├── dependencies.py  # Auth and DI dependencies
│   │   │   │
│   │   │   └── routes/
│   │   │       ├── __init__.py
│   │   │       ├── auth.py        # Login/register routes
│   │   │       ├── documents.py   # Document upload and management
│   │   │       ├── search.py      # Hybrid retrieval endpoints
│   │   │       ├── chat.py        # Chat/QA endpoints
│   │   │       ├── graph.py       # Graph traversal queries
│   │   │       └── evaluation.py  # RAG evaluation endpoints
│   │
│   ├── core/
│   │   ├── __init__.py
│   │   ├── config.py        # Application configuration
│   │   ├── security.py      # Password hashing, JWT
│   │   ├── logging.py       # Structured logging setup
│   │   └── exceptions.py    # Custom exception types
│   │
│   ├── models/
│   │   ├── __init__.py
│   │   ├── user.py          # User model
│   │   ├── document.py      # Document model
│   │   ├── chunk.py         # Chunk model
│   │   ├── entity.py        # Entity model
│   │   ├── relationship.py  # Relationship model
│   │   └── conversation.py  # Conversation model
│   │
│   ├── schemas/
│   │   ├── __init__.py
│   │   ├── auth.py          # Auth schemas (Login, Register)
│   │   ├── document.py      # Document schemas
│   │   ├── search.py        # Search schemas
│   │   ├── chat.py          # Chat/QA schemas
│   │   └── graph.py         # Graph schemas
│   │
│   ├── services/
│   │   ├── __init__.py
│   │   ├── document_service.py    # Document processing pipeline
│   │   ├── ingestion_service.py   # Document ingestion orchestration
│   │   ├── embedding_service.py   # Embedding generation
│   │   ├── retrieval_service.py   # Vector/BM25/graph retrieval
│   │   ├── graph_service.py       # Neo4j operations
│   │   ├── reranking_service.py   # Result reranking
│   │   ├── llm_service.py         # LLM wrapper
│   │   ├── citation_service.py    # Citation/provenance tracking
│   │   ├── evaluation_service.py  # RAG evaluation metrics
│   │   └── conversation_service.py# Conversation management
│   │
│   ├── rag/
│   │   ├── __init__.py
│   │   ├── chunking.py          # Semantic chunking strategies
│   │   ├── embeddings.py          # Embedding service wrappers
│   │   ├── hybrid_search.py       # Vector + BM25 fusion
│   │   ├── vector_search.py       # pgvector search
│   │   ├── bm25_search.py         # Keyword search
│   │   ├── graph_retrieval.py     # Neo4j graph queries
│   │   ├── query_decomposition.py # Query decomposition for multi-hop
│   │   ├── reranker.py            # Reranking logic
│   │   ├── context_builder.py     # Provenance-aware context construction
│   │   └── pipeline.py            # Composed RAG pipeline
│   │
│   ├── graph/
│   │   ├── __init__.py
│   │   ├── neo4j_client.py      # Neo4j connection management
│   │   ├── entity_extractor.py    # Entity extraction from text
│   │   ├── relationship_extractor.py # Relationship extraction
│   │   ├── graph_builder.py       # Graph construction from entities
│   │   ├── graph_queries.py       # Parameterized Cypher queries
│   │   └── path_ranker.py         # Path scoring for traversal
│   │
│   ├── ingestion/
│   │   ├── __init__.py
│   │   ├── pdf_loader.py          # PDF text extraction
│   │   ├── document_parser.py     # Document structure parsing
│   │   ├── text_cleaner.py        # Text cleaning/normalization
│   │   ├── metadata_extractor.py  # Metadata extraction from docs
│   │   └── pipeline.py            # Ingestion pipeline orchestration
│   │
│   ├── database/
│   │   ├── __init__.py
│   │   ├── postgres.py            # PostgreSQL connection + pgvector
│   │   ├── neo4j.py               # Neo4j connection
│   │   ├── redis.py               # Redis connection
│   │   └── migrations/              # DB migration files
│   │
│   └── utils/
│       ├── __init__.py
│       ├── text.py                # Text utility functions
│       ├── hashing.py             # File/content hashing
│       ├── tokens.py              # Token counting utilities
│       └── validators.py          # Input validation

├── frontend/                # React TypeScript frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── chat/          # Chat component suite
│   │   │   ├── graph/           # Knowledge graph visualization
│   │   │   ├── documents/       # Document management UI
│   │   │   ├── citations/       # Citation/ provenance view
│   │   │   └── ui/              # Reusable UI primitives
│   │   │
│   │   ├── pages/             # Page-level components
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Chat.tsx
│   │   │   ├── Documents.tsx
│   │   │   ├── KnowledgeGraph.tsx
│   │   │   └── Evaluation.tsx
│   │   │
│   │   ├── services/          # API service wrappers
│   │   │   └── api.ts
│   │ │
│   │   ├── hooks/             # Custom React hooks
│   │   │   ├── useChat.ts
│   │   │   ├── useDocuments.ts
│   │   │   └── useGraph.ts
│   │ │
│   │   ├── types/             # TypeScript type definitions
│   │   │   └── index.ts
│   │ │
│   │   ├── store/             # Global state (Zustand)
│   │   │   └── appStore.ts
│   │ │
│   │   ├── App.tsx            # Root component with routing
│   │   ├── main.tsx           # Application entry point
│   │   └── index.css          # Global styles
│   │
│   ├── public/                # Static assets
│   │
│   ├── package.json           # Node dependencies
│   ├── tsconfig.json          # TypeScript config
│   └── vite.config.ts         # Vite config
│
├── data/                    # Data directories
│   ├── raw/                   # Raw input documents (.gitkeep)
│   ├── processed/             # Processed/chunked data (.gitkeep)
│   └── evaluation/            # Evaluation datasets (.gitkeep)
│
├── docs/                    # Documentation markdown files
│   ├── architecture.md        # System architecture diagram description
│   ├── api.md                 # API endpoint reference
│   ├── database.md            # Database schema documentation
│   ├── rag-pipeline.md        # RAG pipeline step description
│   └── graph-schema.md        # Neo4j graph schema description
│
├── tests/                   # Test suites
│   ├── __init__.py
│   ├── unit/                  # Unit tests
│   ├── integration/           # Integration tests
│   ├── rag/                   # RAG pipeline tests
│   └── evaluation/            # Evaluation framework tests
│
├── scripts/                 # Operational scripts
│   ├── seed_database.py       # Initial data seeding
│   ├── ingest_documents.py     # Document ingestion script
│   ├── build_graph.py           # Knowledge graph building script
│   └── evaluate_rag.py          # RAG evaluation script
│
├── requirements.txt         # Python dependencies
└── pyproject.toml           # Python project metadata

## 4. File-by-File Responsibilities

### Root Files
- **README.md**: Public-facing project summary, installation, and roadmap
- **PROJECT.md**: Primary context source for AI coding agents; architecture, conventions, file responsibilities
- **requirements.md**: Product objectives, functional requirements, non-functional requirements
- **.env.example**: Environment variable placeholders (never committed with real secrets)
- **.gitignore**: Git exclusions for Python, Node, Docker, IDE artifacts
- **docker-compose.yml**: Infrastructure services (postgres, neo4j, redis, backend, frontend)
- **Dockerfile**: Backend service definition for Docker
- **Makefile**: Development shortcuts (run, test, docker commands)
- **requirements.txt**: Python dependencies
- **pyproject.toml**: Package configuration, dependencies, entry points

### Backend - app/main.py
- FastAPI application entry point
- Middleware configuration
- Route registration
- Health check endpoint

### Backend - app/core/config.py
- Pydantic settings model using pydantic-settings
- Reads from environment variables
- Default values for development

### Backend - app/core/security.py
- Password hashing with passlib
- JWT token creation and verification
- Current user dependency

### Backend - app/core/logging.py
- Structured logger configuration
- JSON log format
- Request ID tracking

### Backend - app/core/exceptions.py
- Custom exception classes
- FastAPI exception handlers

### Backend - app/models/
- SQLAlchemy models for PostgreSQL
- Pydantic schemas for API validation
- Relationship definitions

### Backend - app/schemas/
- Pydantic models for API request/response validation
- Separation of DB models and API schemas

### Backend - app/services/
- Business logic layer
- Each service has a single responsibility
- Dependencies injected via constructor or FastAPI Depends

### Backend - app/rag/
- Modular RAG pipeline components
- Each stage is independently testable
- Pipeline composition for end-to-end RAG

### Backend - app/graph/
- Neo4j operations
- Entity/relationship extraction
- Graph queries and traversal

### Backend - app/ingestion/
- Document parsing and processing
- PDF/text loader utilities
- Pipeline orchestration

### Backend - app/database/
- Database connection management
- Connection pooling
- Migration support

### Backend - app/utils/
- Text utilities, hashing, token counting
- Validation helpers used across the codebase

### Frontend - src/components/chat/
- Chat message rendering
- Message sending interface
- Conversation history management

### Frontend - src/components/graph/
- Knowledge graph visualization
- Node/edge interaction
- Traversal path highlighting

### Frontend - src/components/documents/
- Document upload interface
- Document list management
- Preview functionality

### Frontend - src/components/citations/
- Citation display with source links
- Provenance tracking visualization

### Frontend - src/components/ui/
- Reusable primitives (buttons, inputs, modals)
- Tailwind-based styling

### Frontend - src/pages/
- Dashboard overview page
- Chat interface page
- Document management page
- Knowledge graph visualization page
- Evaluation results page

### Frontend - src/hooks/
- useChat: Chat state and API interaction
- useDocuments: Document management hooks
- useGraph: Graph data fetching hooks

### Frontend - src/types/
- Central type definitions shared across frontend
- API response types

### Frontend - src/store/
- Global Zustand store
- State persistence

## 5. Architecture

### Clean Architecture Layers

```
┌─────────────────────────────────────────────────────────────┐
│                    Presentation Layer                       │
│  (React Frontend + TypeScript + Tailwind)                  │
└─────────────────────────────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────┐
│                    API Layer                                  │
│  (FastAPI + Pydantic + JWT Auth)                            │
│  └── Routes thin, delegating to services                     │
└─────────────────────────────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────┐
│                    Service Layer                              │
│  (Business logic, orchestration, retrieval, graph ops)      │
│  ├── document_service.py                                    │
│   ├── ingestion_service.py                                  │
│   ├── embedding_service.py                                  │
│   ├── retrieval_service.py                                  │
│   ├── graph_service.py                                      │
│   ├── reranking_service.py                                  │
│   ├── llm_service.py                                        │
│   ├── citation_service.py                                   │
│   ├── evaluation_service.py                                 │
│   └── conversation_service.py                               │
└─────────────────────────────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────┐
│                    Data Access Layer                        │
│  (SQLAlchemy models + Neo4j driver)                       │
│  ├── database/postgres.py                                   │
│   ├── database/neo4j.py                                     │
│   └── database/redis.py                                     │
└─────────────────────────────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────┐
│                    Storage Layer                            │
│  (PostgreSQL + pgvector, Neo4j, Redis)                     │
└─────────────────────────────────────────────────────────────┘
```

### RAG Pipeline Architecture

```
Document
    ↓
Parsing        (pdf_loader, document_parser)
    ↓
Cleaning       (text_cleaner, normalisation)
    ↓
Chunking       (semantic chunking with overlap)
    ↓
Embedding      (SentenceTransformers / OpenAI)
    ↓
Storage
   ├─ PostgreSQL + pgvector   (vector storage)
   └─ Neo4j                  (graph storage)

┌─────────────────────────────────────────────────────────────────────┐
│                    Retrieval                                  │
│  ┌─────────────┐  ┌─────────────┐  ┌───────────────────────┐      │
│  │ Vector Search│  │ BM25 Search │  │ Graph Search          │      │
│  │ (pgvector)   │  │ (rank-bm25) │  │ (Neo4j Cypher)        │      │
│  └─────────────┘  └─────────────┘  └───────────────────────┘      │
└───────────────────────────────┬───────────────────────┬─────────────┘
                                │                       │
                                ↓                       ↓
┌─────────────────────────────────────────────────────────────────────┐
│                    Fusion / Reranking                         │
│  Results fused from vector, BM25, and graph sources             │
│  Reranked using cross-encoder or LLM-based reranker             │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                ↓
┌─────────────────────────────────────────────────────────────┐
│            Context Construction                             │
│  Provenance-aware context building with source tracking        │
│  Citation inclusion                                         │
│  Multi-hop path integration                                 │
└─────────────────────────────────────────────────────────────┘
                                │
                                ↓
┌─────────────────────────────────────────────────────────────┐
│                 LLM Generation                              │
│  Answer generation with citation formatting                 │
└─────────────────────────────────────────────────────────────┘
                                │
                                ↓
┌─────────────────────────────────────────────────────────────┐
│               Citation Verification                         │
│  Source verification and grounding                          │
└─────────────────────────────────────────────────────────────┘
```

### Authentication Flow

1. User registers or logs in via `/api/auth/register` or `/api/auth/login`
2. Credentials validated, password hashed with bcrypt
3. JWT token issued with access token expiry
4. Token sent via `Authorization: Bearer <token>` header
5. Protected routes use `current_user` dependency
6. User role/permissions checked per route

### Database Architecture

#### PostgreSQL (pgvector)
- **users**: id, email, hashed_name, created_at
- **documents**: id, user_id, filename, filepath, status, created_at
- **chunks**: id, document_id, content, embedding, metadata, created_at
- **conversations**: id, user_id, title, created_at
- **messages**: id, conversation_id, role, content, created_at
- **evaluation_runs**: id, name, status, created_at, finished_at

#### Neo4j
- **Document**: id, content, source_uri, created_at
- **Chunk**: id, text, paragraph_index, document_id
- **Entity**: id, name, entity_type, salience, created_at
- **Relationship**: id, start_entity, end_entity, relationship_type, salience, created_at

Provenance links: Each Entity and Relationship links back to source Chunk → Document.

## 6. Application Flow

### Document Ingestion Flow

1. User uploads document via frontend
2. `/api/documents/upload` receives file
3. `ingestion_service.pipeline` orchestrates:
   - `pdf_loader.py` or text parser extracts text
   - `document_parser.py` structures the content
   - `text_cleaner.py` normalizes whitespace, removes headers
   - `metadata_extractor.py` extracts title, dates, authors
   - `chunking.py` splits into semantic chunks
   - `embeddings.py` generates vector embeddings
   - `postgres.save_chunks()` stores chunks + embeddings
   - `graph_service.extract()` runs entity/relationship extraction
   - `neo4jClient.save()` stores graph nodes/relationships
4. Response returns document ID and processing status

### Query Flow

1. User submits question via frontend
2. `/api/chat/query` receives request
3. `retrieval_service.hybrid_search`:
   - Vector search against pgvector
   - BM25 keyword search
   - Graph traversal for related entities
4. Results fused via `reranking_service`
5. `context_builder.py` constructs provenance-aware context
6. LLM generates answer with citations
7. Response includes answer + sources + citations

### Authentication Flow

1. POST /api/auth/login → validate credentials → JWT token
2. GET protected route → `current_user` dependency extracts token
3. Token validated against JWT_SECRET_KEY
4. User ID available in route handlers

## 7. Data Flow

### Ingestion Data Flow

```
Uploaded File
    │
    ├─► pdf_loader.py     (text extraction)
    │     │
    │     └─► raw text + metadata
    │
    ├─► document_parser.py (structure analysis)
    │         │
    │         └─► structured text
    │
    ├─► text_cleaner.py    (normalization)
    │         │
    │         └─► cleaned text
    │
    ├─► metadata_extractor.py (extract info)
    │         │
    │         └─► enriched metadata
    │
    ├─► chunking.py        (semantic split)
    │          │
    │          └─► [chunk1, chunk2, ...]
    │
    ├─► embedding.py       (vector generation)
    │          │
    │          └─► [embedding1, embedding2, ...]
    │
    ├─► postgres store     (chunks + vectors in pgvector)
    │
    └─► graph extraction   (Neo4j entity/rel extraction)
          │
          └─► (Entity, Relationship) nodes
```

### Query Data Flow

```
User Question
    │
    ├─► retrieval_service.hybrid_search()
    │     ├─► vector_search(pgvector)
    │     ├─► bm25_search(rank-bm25)
    │     └─► graph_traversal(Neo4j)
    │
    ├─► reranking_service.fuse_rerank()
    │     └─► ranked results with scores
    │
    ├─► context_builder.build()
    │     ├─► selected chunks + passages
    │     ├─► entity context from Neo4j
    │     └─► citation graph
    │
    ├─► llm_service.generate()
    │     └─► answer + source references
    │
    └─► response to user
        ├─► answer text
        ├─► citations
        └─► source provenance
```

## 8. API Flow

### Route Structure

```
GET  /api/health                          # Health check
GET  /api/auth/me                         # Current user
POST /api/auth/login                      # User login
POST /api/auth/register                   # User registration
GET  /api/documents/                      # List user documents
POST /api/documents/                      # Upload document
GET  /api/documents/{id}                  # Get document details
DELETE /api/documents/{id}                # Delete document
GET  /api/search                          # Hybrid search
POST /api/chat/query                      # Submit query
GET  /api/graph                           # Graph overview
GET  /api/evaluation                      # Evaluation status
```

### Route Handler Pattern

Each route handler follows this pattern:

```python
@router.post("/chat/query", response_model=ChatResponse)
async def chat_query(
    request: ChatRequest,
    current_user: User = Depends(dependencies.get_current_user),
    retrieval_service: RetrievalService = Depends(services.get_retrieval_service),
    context_builder: ContextBuilder = Depends(services.get_context_builder),
    llm_service: LLMService = Depends(services.get_llm_service),
):
    # Thin handler - validation + dependency injection
    # Business logic in services
    # Return DTO response
```

## 9. Database Relationships

### PostgreSQL Tables

```
users (1)──────(*) documents
documents (1)──────(*) chunks
users (1)──────(*) conversations
conversations (1)──────(*) messages
evaluation_runs (standalone) - no direct FK required but linked by app_name
```

### Neo4j Graph Schema

```
(Document)-[:HAS_CHUNK]->(Chunk)
(Chunk)-[:MENTIONS]->(Entity)
(Entity)-[:HAS_RELATIONSHIP]->(Relationship)
(Entity)-[:IS_TYPE_OF]->(EntityType)

Provenance:
(Chunk)-[:FROM_DOCUMENT]->(Document)
(Entity)-[:FROM_CHUNK]->(Chunk)
(Relationship)-FROM_ENTITY1, FROM_ENTITY2→(Entity nodes)
```

### Provenance Chain

```
Answer Source → Citation → Entity/Relationship → Chunk → Document → Source File
```

## 10. Authentication Flow

### Registration

1. POST /api/auth/register with {email, password, full_name}
2. Password hashed with bcrypt
3. User record created in PostgreSQL
4. JWT access token generated
5. Token returned to client

### Login

1. POST /api/auth/login with {email, password}
2. Credentials verified against DB
3. JWT access token generated
4. Token returned to client

### Protected Routes

1. Client sends `Authorization: Bearer <token>` header
2. `current_user` dependency decodes token
3. User injected into route handler
4. Token expiry checked (access token: 15min, refresh: 7d)

### Token Management

- Access tokens: 15 minutes expiration
- Refresh token flow available via refresh endpoint
- Token blacklisting available via Redis
- All routes require authentication except /api/health and /api/auth/login/register

## 11. Important Dependencies

### Python (requirements.txt)
- fastapi==0.104.1
- uvicorn[standard]==0.27.0
- sqlalchemy[asyncio]==2.0.23
- psycopg[binary]==3.1.0
- pgvector==0.2.0
- neo4j==5.4.0
- redis==5.0.1
- python-jose[cryptography]==3.3.0
- passlib[bcrypt]==1.7.4
- pydantic==2.7.0
- pydantic-settings==2.2.0
- pytest==8.2.0
- httpx==0.27.0
- python-dotenv==1.0.0
- rank-bm25==0.2.0
- sentence-transformers==2.2.0
- torch==2.3.0 (or tensorFlow alternative)
- transformers==4.41.0
- cross-encoder==0.1.0

### Node (package.json)
- react@18
- typescript@5
- vite@5
- tailwindcss@3
- react-dom@18
- @types/react@18
- @types/node@20

## 12. Environment Variables

See .env.example for full list:

```
APP_ENV=development
APP_DEBUG=True
APP_HOST=0.0.0.0
APP_PORT=8000

DATABASE_URL=postgresql://postgres:postgres@localhost:5432/graphrag
NEO4J_URI=bolt://localhost:7687
NEO4J_USERNAME=neo4j
NEO4J_PASSWORD=neo4j
REDIS_URL=redis://localhost:6379

LLM_PROVIDER=openai
LLM_API_KEY=sk-your-key-here
LLM_MODEL=gpt-4o-mini

EMBEDDING_MODEL=all-miniLM-L6-v2

JWT_SECRET_KEY=your-jwt-secret-key
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=15

CORS_ORIGINS=["http://localhost:5173", "http://localhost:3000"]
```

## 13. Important Business Logic

### Document Status Pipeline
draft → processing → processed → failed

### Chunk Uniqueness
Chunks are hashed by content. Duplicate content produces duplicate chunk records (intentional for multi-document support), but embedding is computed once and cached.

### Retrieval Fusion
Vector results + BM25 results + Graph results are fused using reciprocal rank fusion (RRF). Top N results passed to reranker.

### Citation Grounding
Every answer citation traces back to:
- Answer quote → chunk content → document filename → source URI
- If provenance broken, citation marked as "unverified"

### Entity Salience
Entities extracted from higher-frequency or central positions in text receive higher salience scores, used for graph ranking.

## 14. Coding Conventions

### Python
- PEP 8 formatting
- Type hints on all public functions
- snake_case for functions/variables
- PascalCase for classes and functions at module level
- UPPER_SNAKE_CASE for constants
- Docstrings for all public functions (numpy format)
- Small focused functions (max 10-15 lines)
- Early returns over nested if/else
- Explicit error handling with custom exceptions
- Async for I/O-bound operations (DB, LLM calls)
- Synchronous for CPU-bound operations (chunking, embedding batching)

### TypeScript/React
- Strict TypeScript mode
- camelCase for variables and functions
- PascalCase for React components
- Explicit types for API models (interfaces)
- No `any` unless absolutely necessary
- JSDoc for component props
- Functional components with hooks over class components

### Git
- Conventional commit messages
- Feature branches off main
- PRs must have passing tests
- Documentation updates with significant changes

## 15. Known Issues

- Initial setup requires Docker infrastructure
- Embedding model loading may be slow on first run
- Neo4j full-text indexing requires language configuration
- BM25 requires stopword language configuration
- CORS configured for local dev only; restrict for production

## 16. Rules for AI when modifying the project

1. Read PROJECT.md before modifying the project.
2. Read requirements.md before implementing requirements.
3. Never invent functionality that is not required.
4. Never fabricate benchmark results.
5. Never fabricate citations.
6. Never remove existing functionality without explicit instruction.
7. Never expose secrets.
8. Never hardcode API keys.
9. Preserve source provenance.
10. Keep graph and vector retrieval modular.
11. Do not replace Neo4j without explicit approval.
12. Do not replace PostgreSQL/pgvector without explicit approval.
13. Do not replace the chosen architecture without approval.
14. Update documentation when architecture changes.
15. Update tests when behavior changes.
16. Evaluate retrieval changes against the evaluation dataset.
17. Do not put business logic inside API route handlers.
18. Do not put business logic directly inside React components.
19. Do not introduce unnecessary dependencies.
20. Prefer existing project utilities before creating duplicates.
21. Do not silently downgrade advanced functionality to a simpler implementation.
22. Explain architectural tradeoffs before making major architectural changes.
23. Keep backward compatibility for existing API contracts unless explicitly instructed otherwise.
24. Do not delete files simply because they are currently unused.
25. Before implementing a major feature, inspect the existing architecture and identify the correct module for the feature.