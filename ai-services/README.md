# NeuraFlow AI Services (Refactored)

Stateless AI microservice powered by Groq API with RAG.

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Set up Groq API key:
```bash
cp .env.example .env
# Edit .env and add your Groq API key
```

3. Ingest interview preparation documents (one-time):
```bash
python ingest.py
```

4. Run the service:
```bash
python app.py
```

The API will be available at `http://localhost:8000`

## API Usage

### POST /ai/query (Primary Endpoint)

```json
{
  "resume_text": "Your resume text here...",
  "job_description": "Job description text here...",
  "previous_output": "Optional: previous AI output for continuation"
}
```

Response:
```json
{
  "ai_output": "Complete AI-generated analysis..."
}
```

### POST /analyze (Legacy - Backward Compatible)

Same request/response format as `/ai/query`

## Architecture

- **Stateless**: No database, no sessions, no state
- **LLM Provider**: Groq API (llama3-8b-8192)
- **Embeddings**: Sentence-Transformers (all-MiniLM-L6-v2) - local, free
- **RAG-Powered**: ChromaDB for context retrieval
- **Pure Orchestration**: No business logic, all intelligence from LLM

## What Changed

### Replaced
- ❌ Ollama for LLM inference → ✅ Groq API
- ❌ Ollama for embeddings → ✅ Sentence-Transformers
- ❌ `llm/llm_client.py` → ✅ `clients/groq_client.py`
- ❌ `main.py` → ✅ `app.py`

### Preserved
- ✅ RAG retrieval logic (ChromaDB)
- ✅ Prompt building
- ✅ Orchestration flow
- ✅ API contract (backward compatible)

---

## Why This ai-services Module Contains No ML, No DL, and No Rule-Based AI

### 1. No Machine Learning or Deep Learning Implementation

**What we DON'T do:**
- Train models
- Fine-tune models
- Implement neural networks
- Backpropagation or gradient descent
- Model optimization or hyperparameter tuning
- Custom loss functions or training loops

**What we DO:**
- Use a pretrained LLM (llama3:8b) as-is
- Call the model via API (Ollama)
- The model was trained by Meta, not by us

**Why:** Training and deep learning require massive datasets, compute resources, and ML expertise. We leverage existing pretrained models that already contain the intelligence we need.

### 2. No Rule-Based AI

**What we DON'T do:**
- Keyword matching or scoring
- If-then-else decision trees
- Threshold-based classifications
- Heuristic algorithms
- Pattern matching with hardcoded rules
- Weighted scoring systems

**What we DO:**
- Pass all inputs to the LLM via a prompt
- Let the LLM perform ALL reasoning
- Return the LLM's output directly

**Why:** Rule-based systems are brittle, require constant maintenance, and can't handle nuance. LLMs can reason about context, understand natural language, and make sophisticated judgments without hardcoded rules.

### 3. Where Intelligence Lives

**In this codebase:**
- `llm/llm_client.py`: Calls pretrained LLM (no intelligence here, just API call)
- `rag/retriever.py`: Similarity search (mathematical operation, not AI reasoning)
- `rag/prompt_builder.py`: String concatenation (no intelligence, just assembly)
- `services/analysis_service.py`: Orchestration (no intelligence, just flow control)

**In the LLM (external):**
- Skill gap analysis reasoning
- Interview round prediction logic
- Question generation creativity
- Roadmap planning intelligence

### 4. RAG is Not Training

**What RAG does:**
- Stores documents with embeddings
- Retrieves relevant text via similarity search
- Passes retrieved text to LLM as context

**What RAG does NOT do:**
- Modify the LLM's weights
- Train or fine-tune the model
- Teach the model new capabilities

**Why it's different:** RAG is like giving someone a reference book before asking a question. The person (LLM) doesn't change; they just have more information to work with.

### 5. Provider Agnostic Design

The entire architecture is designed so that:
- Only `llm/llm_client.py` knows about Ollama
- Switching to OpenAI requires changing only that one file
- All other components call `generate(prompt)` without knowing the provider

This proves we're not implementing AI—we're consuming it as a service.

### 6. Stateless = No Learning

This service:
- Doesn't remember previous interactions (unless explicitly passed)
- Doesn't improve over time
- Doesn't adapt to user behavior
- Doesn't accumulate knowledge

Every request is independent. The LLM doesn't "learn" from usage.

---

## Summary

This ai-services module is a **thin orchestration layer** that:
1. Retrieves relevant context (RAG)
2. Builds a comprehensive prompt
3. Calls a pretrained LLM
4. Returns the LLM's output

**All intelligence comes from the pretrained LLM.** We implement zero ML, zero DL, and zero rule-based AI. We're building a smart system by composing existing AI capabilities, not by implementing AI ourselves.
