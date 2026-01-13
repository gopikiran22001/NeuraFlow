"""
RAG Ingestion - One-Time Document Loading

Loads interview preparation documents into ChromaDB.
Uses Sentence-Transformers for embeddings.
"""

import chromadb
from services.embedding_service import generate_embedding


def ingest_documents(documents: list[dict], collection_name: str = "interview_prep"):
    """
    Ingest interview preparation documents into ChromaDB.
    
    Args:
        documents: List of dicts with 'text' and 'id' keys
        collection_name: Name of the ChromaDB collection
    """
    client = chromadb.PersistentClient(path="./chroma_db")
    
    collection = client.get_or_create_collection(
        name=collection_name,
        metadata={"description": "Interview preparation knowledge base"}
    )
    
    # Generate embeddings using existing embedding service
    for doc in documents:
        embedding = generate_embedding(doc['text'])
        
        collection.add(
            ids=[doc['id']],
            embeddings=[embedding],
            documents=[doc['text']]
        )
    
    print(f"Ingested {len(documents)} documents into ChromaDB")


if __name__ == "__main__":
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
    
    ingest_documents(sample_docs)
