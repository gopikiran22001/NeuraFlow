"""
Embedding Service

Generates text embeddings using Sentence-Transformers.
Local, free, no API keys required.
"""

from sentence_transformers import SentenceTransformer

# Load model once (singleton pattern)
_model = None

def _get_model():
    global _model
    if _model is None:
        _model = SentenceTransformer('all-MiniLM-L6-v2')
    return _model


def generate_embedding(text: str) -> list:
    """
    Generate embedding for text using Sentence-Transformers.
    
    Args:
        text: Text to embed
        
    Returns:
        Embedding vector as list
    """
    model = _get_model()
    embedding = model.encode(text, convert_to_numpy=True)
    return embedding.tolist()
