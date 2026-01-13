"""
Error Utilities

Custom exceptions for AI service errors.
"""


class AIServiceError(Exception):
    """Base exception for AI service errors."""
    pass


class LLMError(AIServiceError):
    """Exception for LLM generation errors."""
    pass


class RAGError(AIServiceError):
    """Exception for RAG retrieval errors."""
    pass


class EmbeddingError(AIServiceError):
    """Exception for embedding generation errors."""
    pass
