"""
RAG Service - Context Retrieval

Retrieves relevant documents from ChromaDB using similarity search.
NO logic, NO scoring, NO thresholds - just raw retrieval.
Preserves existing RAG implementation.
"""

import chromadb
from services.embedding_service import generate_embedding


def retrieve_context(query: str, collection_name: str = "interview_prep", top_k: int = 3) -> str:
    """
    Retrieve relevant context from ChromaDB.
    
    This function performs pure retrieval with NO intelligence.
    It returns raw text that will be passed to the LLM.
    
    Args:
        query: Search query (typically resume + job description)
        collection_name: ChromaDB collection name
        top_k: Number of documents to retrieve
        
    Returns:
        Concatenated text from retrieved documents
    """
    client = chromadb.PersistentClient(path="./chroma_db")
    
    try:
        collection = client.get_collection(name=collection_name)
    except Exception:
        # If collection doesn't exist, return empty context
        return ""
    
    # Generate query embedding using existing embedding provider
    query_embedding = generate_embedding(query)
    
    # Retrieve similar documents
    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=top_k
    )
    
    # Concatenate retrieved documents
    if results['documents'] and len(results['documents']) > 0:
        context = "\n\n".join(results['documents'][0])
        return context
    
    return ""
