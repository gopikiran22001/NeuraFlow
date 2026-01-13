import re
import asyncio
from typing import Dict, Optional
import httpx
from bs4 import BeautifulSoup


async def scrape_company_info(company_name: str) -> Dict[str, str]:
    """
    Scrape company interview information from Glassdoor-like sources.
    
    Args:
        company_name: Name of the company
        
    Returns:
        Dictionary with interview process, rounds, and questions
    """
    try:
        search_query = f"{company_name} interview process questions rounds"
        
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        
        async with httpx.AsyncClient(timeout=10.0, follow_redirects=True) as client:
            response = await client.get(
                f"https://www.google.com/search?q={search_query}",
                headers=headers
            )
            
            if response.status_code != 200:
                return _get_default_info()
            
            soup = BeautifulSoup(response.text, 'html.parser')
            
            snippets = []
            for result in soup.find_all('div', class_='BNeawe s3v9rd AP7Wnd'):
                text = result.get_text()
                if any(keyword in text.lower() for keyword in ['interview', 'round', 'question', 'process']):
                    snippets.append(text)
            
            if not snippets:
                return _get_default_info()
            
            return {
                'process': _extract_process(snippets),
                'rounds': _extract_rounds(snippets),
                'questions': _extract_questions(snippets),
                'tips': _extract_tips(snippets)
            }
            
    except Exception as e:
        print(f"Scraping error: {e}")
        return _get_default_info()


def _extract_process(snippets: list) -> str:
    """Extract interview process information."""
    process_keywords = ['process', 'stages', 'steps', 'phases']
    for snippet in snippets:
        if any(kw in snippet.lower() for kw in process_keywords):
            return snippet[:500]
    return "Standard multi-round interview process with technical and behavioral assessments."


def _extract_rounds(snippets: list) -> str:
    """Extract interview rounds information."""
    rounds_keywords = ['round', 'stage', 'phase']
    rounds_info = []
    
    for snippet in snippets:
        if any(kw in snippet.lower() for kw in rounds_keywords):
            rounds_info.append(snippet[:300])
    
    if rounds_info:
        return " | ".join(rounds_info[:3])
    
    return "Typical rounds: Phone Screen → Technical Interview → System Design → Behavioral → Final Round"


def _extract_questions(snippets: list) -> str:
    """Extract common interview questions."""
    question_keywords = ['question', 'asked', 'ask', 'quiz']
    questions = []
    
    for snippet in snippets:
        if any(kw in snippet.lower() for kw in question_keywords):
            questions.append(snippet[:400])
    
    if questions:
        return " | ".join(questions[:3])
    
    return "Common questions include technical problem-solving, system design, and behavioral scenarios."


def _extract_tips(snippets: list) -> str:
    """Extract interview tips."""
    tips_keywords = ['tip', 'advice', 'prepare', 'recommendation']
    tips = []
    
    for snippet in snippets:
        if any(kw in snippet.lower() for kw in tips_keywords):
            tips.append(snippet[:300])
    
    if tips:
        return " | ".join(tips[:2])
    
    return "Prepare thoroughly, practice coding problems, and understand the company's products and culture."


def _get_default_info() -> Dict[str, str]:
    """Return default interview information when scraping fails."""
    return {
        'process': 'Standard interview process with multiple rounds including technical and behavioral assessments.',
        'rounds': 'Phone Screen → Technical Round → System Design → Behavioral Interview → Final Round',
        'questions': 'Technical coding problems, system design scenarios, behavioral questions using STAR method.',
        'tips': 'Practice coding problems, review system design patterns, prepare STAR stories, research company culture.'
    }


def extract_company_name(job_description: str) -> Optional[str]:
    """
    Extract company name from job description.
    
    Args:
        job_description: Job description text
        
    Returns:
        Company name or None
    """
    patterns = [
        r'(?:at|@|for)\s+([A-Z][A-Za-z0-9\s&]+?)(?:\s+is|\s+seeks|\s+looking|\n|,)',
        r'^([A-Z][A-Za-z0-9\s&]+?)\s+(?:is|seeks|looking)',
        r'Company:\s*([A-Z][A-Za-z0-9\s&]+)',
    ]
    
    for pattern in patterns:
        match = re.search(pattern, job_description, re.MULTILINE)
        if match:
            company = match.group(1).strip()
            if len(company) > 2 and len(company) < 50:
                return company
    
    return None
