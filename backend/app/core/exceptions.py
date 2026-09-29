from __future__ import annotations

"""GraphRAG Intelligence Engine - Custom Exceptions"""

from typing import TypeVar, Type

T = TypeVar("T")

class GraphRAGException(Exception):
    """Base exception for GraphRAG application."""
    
    def __init__(self, message: str, error_code: str = "graphrag_error", status_code: int = 500):
        self.message = message
        self.error_code = error_code
        self.status_code = status_code
        super().__init__(self.message)


class DocumentNotFoundError(GraphRAGException):
    """Raised when a document is not found."""
    
    def __init__(self, document_id: str):
        super().__init__(
            message=f"Document with ID {document_id} not found",
            error_code="document_not_found",
            status_code=404,
        )


class ValidationError(GraphRAGException):
    """Raised when input validation fails."""
    
    def __init__(self, message: str, field: str | None = None):
        self.field = field
        super().__init__(
            message=message,
            error_code="validation_error",
            status_code=400,
        )


class AuthenticationError(GraphRAGException):
    """Raised when authentication fails."""
    
    def __init__(self, message: str = "Authentication failed"):
        super().__init__(
            message=message,
            error_code="authentication_error",
            status_code=401,
        )


class UnauthorizedError(GraphRAGException):
    """Raised when user is not authorized."""
    
    def __init__(self, message: str = "Unauthorized"):
        super().__init__(
            message=message,
            error_code="unauthorized_error",
            status_code=401,
        )


class ForbiddenError(GraphRAGException):
    """Raised when user is forbidden from accessing a resource."""
    
    def __init__(self, message: str = "Forbidden"):
        super().__init__(
            message=message,
            error_code="forbidden_error",
            status_code=403,
        )


class RAGPipelineError(GraphRAGException):
    """Raised when RAG pipeline fails."""
    
    def __init__(self, message: str, step: str | None = None):
        self.step = step
        super().__init__(
            message=message,
            error_code="rag_pipeline_error",
            status_code=500,
        )


class EmbeddingError(RAGPipelineError):
    """Raised when embedding generation fails."""
    pass


class RetrievalError(RAGPipelineError):
    """Raised when retrieval fails."""
    pass


class GraphError(RAGPipelineError):
    """Raised when graph operations fail."""
    pass