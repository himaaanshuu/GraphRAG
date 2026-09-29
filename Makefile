.PHONY: help run dev test docker-up docker-down logs migrate db-shell seed ingest graph evaluate fmt lint

help: ## Show this help message
	@grep -E '^[a-zA-Z_-]+:.*?##' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "} {printf "\033[36m%-20s\033[0m %s\n", $1, $2}'

run: ## Start the backend development server
	cd backend && uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

dev: ## Start both backend and frontend development servers
	@make docker-up && \
	make run & \
	cd frontend && npm run dev

test: ## Run the test suite
	cd backend && pytest

docker-up: ## Start Docker infrastructure services
	docker-compose up -d

docker-down: ## Stop Docker infrastructure services
	docker-compose down

logs: ## View logs for all services
	docker-compose logs -f

logs-backend: ## View backend service logs
	docker-compose logs -f backend

logs-frontend: ## View frontend service logs
	docker-compose logs -f frontend

logs-postgres: ## View PostgreSQL logs
	docker-compose logs -f postgres

logs-neo4j: ## View Neo4j logs
	docker-compose logs -f neo4j

logs-redis: ## View Redis logs
	docker-compose logs -f redis

migrate: ## Run database migrations
	cd backend && alembic upgrade head 2>/dev/null || echo "No migrations configured or alembic not installed"

db-shell: ## Open PostgreSQL shell
	docker exec -it graphrag-postgres psql -U postgres -d graphrag

seed: ## Seed the database with initial data
	cd backend && python scripts/seed_database.py

ingest: ## Ingest documents from data/raw
	cd backend && python scripts/ingest_documents.py

graph: ## Build the knowledge graph
	cd backend && python scripts/build_graph.py

evaluate: ## Run RAG evaluation
	cd backend && python scripts/evaluate_rag.py

fmt: ## Format Python code
	cd backend && ruff format .

lint: ## Lint Python code
	cd backend && ruff check .

init: ## Initialize the project (install deps, etc.)
	cd backend && pip install -r requirements.txt
	cd frontend && npm install

welcome: ## Print welcome message
	@echo "GraphRAG Intelligence Engine"
	@echo "Run 'make help' for available commands"