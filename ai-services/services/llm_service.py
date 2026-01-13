"""
LLM Service - Orchestration Layer

Orchestrates: RAG retrieval → prompt building → Groq generation.
Contains NO intelligence, NO decision logic, NO scoring.
Pure orchestration only.
"""

from clients.groq_client import generate
from services.rag_service import retrieve_context
from services.scraper_service import scrape_company_info, extract_company_name
from prompts.system_prompt import build_analysis_prompt


async def process_query(
    resume_text: str,
    job_description: str,
    previous_output: str = None
) -> str:
    """
    Process interview preparation query with RAG-enhanced context.
    
    This function is stateless and contains NO logic.
    It chains: retrieve → scrape → build prompt → generate.
    
    Args:
        resume_text: Candidate's resume
        job_description: Target job description
        previous_output: Optional previous AI output for continuation
        
    Returns:
        AI-generated analysis as string
    """
    
    company_info = None
    if not previous_output:
        company_name = extract_company_name(job_description)
        if company_name:
            print(f"Scraping interview info for: {company_name}")
            company_info = await scrape_company_info(company_name)
    
    query = f"{resume_text}\n\n{job_description}"
    retrieved_context = retrieve_context(query)
    
    prompt = build_analysis_prompt(
        resume_text=resume_text,
        job_description=job_description,
        retrieved_context=retrieved_context,
        previous_output=previous_output,
        company_info=company_info
    )
    
    ai_output = generate(prompt)
    
    return ai_output
