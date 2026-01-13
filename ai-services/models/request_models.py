"""
Request Models

Pydantic models for API request and response validation.
"""

from pydantic import BaseModel
from typing import Optional


class QueryRequest(BaseModel):
    """Request model for AI query."""
    resume_text: str
    job_description: str
    previous_output: Optional[str] = None


class QueryResponse(BaseModel):
    """Response model containing AI-generated output."""
    ai_output: str
