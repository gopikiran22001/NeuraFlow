"""
NeuraFlow AI Services - Refactored with Groq

Stateless FastAPI microservice for AI-powered interview preparation.
Uses Groq API for LLM, preserves existing RAG and embeddings.
"""

from fastapi import FastAPI, HTTPException
from models.request_models import QueryRequest, QueryResponse
from services.llm_service import process_query
from utils.errors import AIServiceError

app = FastAPI(
    title="NeuraFlow AI Services",
    description="AI microservice powered by Groq with RAG",
    version="2.0.0"
)


@app.get("/")
def health_check():
    """Health check endpoint."""
    return {
        "service": "NeuraFlow AI Services",
        "status": "running",
        "version": "2.0.0",
        "llm_provider": "Groq"
    }


@app.post("/ai/query", response_model=QueryResponse)
async def query(request: QueryRequest):
    """
    Process AI query with RAG-enhanced context.
    
    Args:
        request: User query with resume, job description, and optional previous output
        
    Returns:
        AI-generated response
    """
    try:
        response = await process_query(
            resume_text=request.resume_text,
            job_description=request.job_description,
            previous_output=request.previous_output
        )
        return QueryResponse(ai_output=response)
    except AIServiceError as e:
        print(f"AI Service Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        print(f"Unexpected Error: {e}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Internal error: {str(e)}")


# Backward compatibility endpoint
@app.post("/analyze")
async def analyze(request: QueryRequest):
    """Legacy endpoint for backward compatibility."""
    return await query(request)

def initialize_RAG():
    import ingest
    sample_docs = [
        {
            "id": "doc1",
            "text": """
            Technical Interview Preparation:
            - System design questions focus on scalability, reliability, and maintainability
            - Coding interviews test data structures, algorithms, and problem-solving
            - Behavioral interviews assess cultural fit and past experiences
            - Always use STAR method (Situation, Task, Action, Result) for behavioral questions
            """
        },
        {
            "id": "doc2",
            "text": """
            Common Interview Rounds:
            - Phone Screen: 30-45 min, basic technical and cultural fit
            - Technical Round 1: 60 min, coding and problem-solving
            - Technical Round 2: 60 min, system design or advanced topics
            - Behavioral/Manager Round: 45-60 min, leadership and teamwork
            - Final Round: 30 min, executive or team fit
            """
        },
        {
            "id": "doc3",
            "text": """
            Skill Gap Analysis Framework:
            - Compare required skills in job description with resume skills
            - Identify missing technical skills, tools, and frameworks
            - Assess experience level gaps (junior vs senior expectations)
            - Note soft skill requirements (leadership, communication)
            - Prioritize gaps by importance to the role
            """
        },
        {
            "id": "doc4",
            "text": """
            Interview Question Types by Role:
            - Backend Engineer: API design, databases, caching, microservices
            - Frontend Engineer: React/Vue, state management, performance optimization
            - Full Stack: End-to-end feature implementation, deployment
            - DevOps: CI/CD, containerization, monitoring, infrastructure as code
            - Data Engineer: ETL pipelines, data modeling, distributed systems
            """
        },
        {
            "id": "doc5",
            "text": """
            Preparation Roadmap Structure:
            - Week 1: Fill critical skill gaps with online courses or documentation
            - Week 2: Practice coding problems on LeetCode/HackerRank
            - Week 3: Study system design patterns and practice mock interviews
            - Week 4: Review behavioral questions and prepare STAR stories
            - Daily: Read company blog, understand their tech stack and culture
            """
        }
    ]
    
    ingest.ingest_documents(sample_docs)
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
