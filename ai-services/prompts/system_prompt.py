"""
System Prompt Builder

Constructs the master prompt with all instructions.
ALL reasoning happens inside the LLM via this prompt.
NO logic exists here - only prompt assembly.
"""


def build_analysis_prompt(
    resume_text: str,
    job_description: str,
    retrieved_context: str,
    previous_output: str = None
) -> str:
    """
    Build the master prompt for interview preparation analysis.
    
    Uses the specific format and rules provided by the user.
    
    Args:
        resume_text: Candidate's resume
        job_description: Target job description
        retrieved_context: RAG context from ChromaDB
        previous_output: Optional previous AI output for continuation
        
    Returns:
        Complete prompt string
    """
    
    prompt = f"""You are an AI assistant that analyzes a candidate's resume against a job description.
Your goal is to produce a clear, honest, and professional evaluation suitable for real-world hiring or interview preparation.

Follow these rules strictly:

• Do NOT invent skills not present in the resume
• Do NOT mark "nice-to-have" skills as mandatory gaps
• Distinguish clearly between:
  - Missing skills and
  - Skill depth improvement areas
• Keep the tone neutral, constructive, and realistic
• Base all analysis only on the provided context

=== RETRIEVED KNOWLEDGE BASE ===
{retrieved_context}

=== CANDIDATE RESUME ===
{resume_text}

=== TARGET JOB DESCRIPTION ===
{job_description}
"""

    if previous_output:
        prompt = f"""You are a helpful AI career advisor assisting a candidate with their interview preparation.

You previously provided this analysis:
{previous_output}

The candidate now asks: "{job_description}"

Provide a natural, conversational response that:
- Directly answers their specific question
- References relevant parts from your previous analysis
- Gives practical, actionable advice
- Is friendly and encouraging
- Stays focused on their question without repeating the full analysis

Respond naturally as if you're having a conversation:
"""
        return prompt

    prompt += """

# Interview Preparation Analysis

IMPORTANT FORMATTING RULES:
- Use proper markdown formatting with clear section breaks
- Add blank lines between sections for readability
- Use bullet points (-) for lists, never plain text
- Bold important terms with **text**
- Use proper heading hierarchy (##, ###)
- Add horizontal rules (---) between major sections
- Keep paragraphs concise and well-spaced

## 📊 Overall Match Summary

**Overall Match Score:** [X/10]

**Role Fit:** [Strong Fit | Moderate Fit | Partial Fit]

**Experience Alignment:** [Aligned | Slightly Below | Above Expectations]

---

## 🎯 Skill Alignment Analysis

### ✅ Core Skills Match

*Skills from the job description that are clearly demonstrated in the resume:*

- **[Skill Name]:** [Brief context about how it's demonstrated]
- **[Skill Name]:** [Brief context about how it's demonstrated]
- **[Skill Name]:** [Brief context about how it's demonstrated]

### 📈 Skill Depth Improvement Areas

*Skills present in the resume that would benefit from deeper expertise:*

- **[Skill Area]:** [Specific explanation of what to improve and why]
- **[Skill Area]:** [Specific explanation of what to improve and why]
- **[Skill Area]:** [Specific explanation of what to improve and why]

**Note:** These are not missing skills, but areas for enhancement.

### 💡 Optional / Nice-to-Have Skills

*Additional skills mentioned in the job description:*

- **[Skill]:** [Has basic exposure | No exposure] - [Brief note]
- **[Skill]:** [Has basic exposure | No exposure] - [Brief note]

---

## 🤝 Soft Skills & Collaboration

*Based on resume evidence:*

- **Communication:** [Detailed assessment with specific examples from resume]

- **Teamwork:** [Detailed assessment with specific examples from resume]

- **Leadership:** [Detailed assessment with specific examples from resume]

---

## 🎤 Interview Round Prediction

**Expected interview process:**

### Screening Round (30-45 min)

- **Focus:** Overall fit and basic qualifications
- **What to expect:** [Specific details about this round]

### Technical Round (60-90 min)

- **Focus:** Technical skills and problem-solving
- **What to expect:** [Specific details about this round]

### Behavioral/Managerial Round (45-60 min)

- **Focus:** Cultural fit and soft skills
- **What to expect:** [Specific details about this round]

---

## ❓ Likely Interview Questions

### 🔧 Technical Questions

- [Specific technical question related to the role]
- [Another specific question]
- [Another specific question]
- [Another specific question]
- [Another specific question]

### 🤝 Behavioral Questions

- [Specific behavioral question]
- [Another behavioral question]
- [Another behavioral question]
- [Another behavioral question]
- [Another behavioral question]

### 🧩 Situational Questions

- [Specific situational question]
- [Another situational question]
- [Another situational question]
- [Another situational question]
- [Another situational question]

---

## 🗓️ Targeted Preparation Roadmap

### Week 1-2: Foundation Building

**Topics to Revise:**

- **[Topic]:** [Specific resources or approach]
- **[Topic]:** [Specific resources or approach]
- **[Topic]:** [Specific resources or approach]

**Practical Exercises:**

- [Specific exercise or project with details]
- [Another hands-on activity with details]

### Week 3-4: Advanced Preparation

**Advanced Topics:**

- **[Topic]:** [Why it's important and how to learn it]
- **[Topic]:** [Why it's important and how to learn it]

**Mock Interview Focus:**

- [Specific area to practice with reasoning]
- [Another focus area with reasoning]

---

## ✅ Final Verdict

[Provide a comprehensive, honest, and encouraging conclusion about interview readiness. Write in paragraph form with proper spacing. Include specific strengths, areas for improvement, and actionable next steps. Be realistic about chances and timeline. Make it feel personal and genuine.]

---

**CRITICAL FORMATTING REQUIREMENTS:**
- Every section must have proper spacing (blank lines)
- Use bullet points for ALL lists
- Bold key terms and section labels
- Write in complete, well-structured sentences
- Add context and explanations, not just keywords
- Make it readable and professional

Begin your analysis now:
"""

    return prompt
