"""
Groq Client - LLM Provider

This is the ONLY file that knows about Groq.
Replaces Ollama with Groq API for LLM inference.
"""

from groq import Groq
import httpx
from clients.secret import GROQ_API_KEY

# Initialize Groq client with custom httpx client to avoid proxies issue
try:
    # Create a custom httpx client without proxies
    http_client = httpx.Client()
    client = Groq(
        api_key=GROQ_API_KEY(),
        http_client=http_client
    )
except Exception as e:
    # Fallback: try without custom http_client
    client = Groq(
        api_key=GROQ_API_KEY()
    )


def generate(prompt: str, model: str = "llama-3.1-8b-instant") -> str:
    """
    Generate text using Groq API.
    
    This function is provider-agnostic from the caller's perspective.
    ALL intelligence and reasoning happens inside the LLM based on the prompt.
    
    Args:
        prompt: Complete prompt with all context and instructions
        model: Groq model name (default: llama-3.1-8b-instant)
        
    Returns:
        Raw LLM output as string
    """
    try:
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            model=model,
            temperature=0.7,
            max_tokens=2048
        )
        
        return chat_completion.choices[0].message.content
    except Exception as e:
        print(f"Groq API Error: {e}")
        raise Exception(f"LLM generation failed: {str(e)}")
