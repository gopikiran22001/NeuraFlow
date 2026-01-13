"""
LLM Service - Orchestration Layer

Orchestrates: RAG retrieval → prompt building → Groq generation.
Contains NO intelligence, NO decision logic, NO scoring.
Pure orchestration only.
"""

from clients.groq_client import generate
from services.rag_service import retrieve_context
from prompts.system_prompt import build_analysis_prompt


async def process_query(
    resume_text: str,
    job_description: str,
    previous_output: str = None
) -> str:
    """
    Process interview preparation query with RAG-enhanced context.
    
    This function is stateless and contains NO logic.
    It chains: retrieve → build prompt → generate.
    
    Args:
        resume_text: Candidate's resume
        job_description: Target job description
        previous_output: Optional previous AI output for continuation
        
    Returns:
        AI-generated analysis as string
    """
    
    # Step 1: Retrieve relevant context from knowledge base (RAG)
    query = f"{resume_text}\n\n{job_description}"
    retrieved_context = retrieve_context(query)
    
    # Step 2: Build the master prompt with all context
    prompt = build_analysis_prompt(
        resume_text=resume_text,
        job_description=job_description,
        retrieved_context=retrieved_context,
        previous_output=previous_output
    )
    
    # Step 3: Generate analysis using Groq LLM
    # ALL reasoning happens inside the LLM
    ai_output = generate(prompt)
    
    return ai_output
