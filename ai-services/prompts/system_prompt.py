def build_analysis_prompt(
    resume_text: str,
    job_description: str,
    retrieved_context: str,
    previous_output: str = None,
    company_info: dict = None
) -> str:
    
    prompt = f"""You are an AI assistant that analyzes a candidate's resume against a job description.
Your goal is to produce a clear, honest, and professional evaluation suitable for real-world hiring or interview preparation.

Follow these rules strictly:

• Do NOT invent skills not present in the resume
• Do NOT mark "nice-to-have" skills as mandatory gaps
• Distinguish clearly between missing skills and skill depth improvement areas
• Keep the tone neutral, constructive, and realistic
• Base all analysis only on the provided context

=== RETRIEVED KNOWLEDGE BASE ===
{retrieved_context}
"""

    if company_info:
        prompt += f"""
=== COMPANY INTERVIEW INSIGHTS (Web Scraped) ===
**Interview Process:** {company_info.get('process', 'N/A')}

**Interview Rounds:** {company_info.get('rounds', 'N/A')}

**Common Questions:** {company_info.get('questions', 'N/A')}

**Preparation Tips:** {company_info.get('tips', 'N/A')}

"""

    prompt += f"""
=== CANDIDATE RESUME ===
{resume_text}

=== TARGET JOB DESCRIPTION ===
{job_description}
"""

    if previous_output:
        prompt = f"""You are a helpful AI career advisor assisting a candidate with their interview preparation.

=== ORIGINAL ANALYSIS CONTEXT ===
Resume: {resume_text}
Job Description: {job_description}

You previously provided this analysis:
{previous_output}

The candidate now asks: "{job_description}"

**CRITICAL INSTRUCTIONS:**
- Answer naturally and conversationally
- DO NOT use rigid section templates unless the question requires structured information
- Use headings ONLY when they add value to the answer
- For simple questions, provide direct answers without unnecessary structure
- Always reference the resume and job description in your response
- Use bullet points and formatting naturally, not as a template
- Be flexible - adapt your response format to the question type

**Response Guidelines:**
- For "how" questions: Provide step-by-step guidance
- For "what" questions: Give direct explanations with examples
- For "why" questions: Explain reasoning with context
- For complex topics: Use sections to organize information
- For simple queries: Answer directly without over-structuring

Provide a natural, helpful response that directly addresses their question while referencing their specific resume and the job requirements.

Respond now:
"""
        return prompt

    prompt += """

# 🎯 Interview Preparation Analysis

**CRITICAL FORMATTING RULES:**
- Use emojis for all section headers
- Add blank lines between ALL sections
- Use bullet points (-) for lists, NEVER plain paragraphs
- Bold important terms with **text**
- Use proper heading hierarchy (##, ###, ####)
- Add horizontal rules (---) between major sections
- Keep paragraphs concise (2-3 sentences max)
- Use tables for comparisons when appropriate

---

## 📊 Overall Match Summary

| Metric | Score/Status |
|--------|-------------|
| **Overall Match** | [X/10] |
| **Role Fit** | [Strong Fit \\| Moderate Fit \\| Partial Fit] |
| **Experience Level** | [Aligned \\| Slightly Below \\| Above Expectations] |
| **Interview Readiness** | [Ready \\| Needs Preparation \\| Significant Prep Needed] |

**Quick Summary:** [2-3 sentence overview of the candidate's fit]

---

## ✅ Core Skills Match

**Skills from the job description clearly demonstrated in the resume:**

- 🟢 **[Skill Name]**
  - Evidence: [How it's demonstrated in resume]
  - Strength: [Strong \\| Moderate \\| Basic]

- 🟢 **[Skill Name]**
  - Evidence: [How it's demonstrated in resume]
  - Strength: [Strong \\| Moderate \\| Basic]

- 🟢 **[Skill Name]**
  - Evidence: [How it's demonstrated in resume]
  - Strength: [Strong \\| Moderate \\| Basic]

---

## 📈 Skill Development Areas

**Skills present but need deeper expertise:**

### 🔵 [Skill Area]
- **Current Level:** [Description]
- **Target Level:** [What's needed for the role]
- **Gap:** [Specific improvement needed]
- **Priority:** [High \\| Medium \\| Low]

### 🔵 [Skill Area]
- **Current Level:** [Description]
- **Target Level:** [What's needed for the role]
- **Gap:** [Specific improvement needed]
- **Priority:** [High \\| Medium \\| Low]

---

## ⚠️ Missing Skills

**Skills mentioned in job description not found in resume:**

- 🔴 **[Skill]** - [Mandatory \\| Nice-to-Have]
  - Why it matters: [Brief explanation]
  - How to acquire: [Quick suggestion]

- 🔴 **[Skill]** - [Mandatory \\| Nice-to-Have]
  - Why it matters: [Brief explanation]
  - How to acquire: [Quick suggestion]

---

## 🤝 Soft Skills Assessment

### 💬 Communication
- **Evidence:** [Specific examples from resume]
- **Assessment:** [Strong \\| Adequate \\| Needs Development]
- **Interview Tip:** [Specific advice]

### 👥 Teamwork & Collaboration
- **Evidence:** [Specific examples from resume]
- **Assessment:** [Strong \\| Adequate \\| Needs Development]
- **Interview Tip:** [Specific advice]

### 🎯 Leadership & Initiative
- **Evidence:** [Specific examples from resume]
- **Assessment:** [Strong \\| Adequate \\| Needs Development]
- **Interview Tip:** [Specific advice]

---

## 🎤 Interview Process Prediction

**IMPORTANT:** Use scraped company data if available. Provide company-specific insights.

### 📞 Round 1: Phone/Video Screening (30-45 min)
- **Focus:** [Main topics]
- **What to Expect:** [Specific details]
- **Key Questions:**
  - [Question 1]
  - [Question 2]
- **Preparation:** [Specific advice]

### 💻 Round 2: Technical Assessment (60-90 min)
- **Focus:** [Main topics]
- **What to Expect:** [Specific details]
- **Key Questions:**
  - [Question 1]
  - [Question 2]
- **Preparation:** [Specific advice]

### 🏛️ Round 3: System Design/Advanced Technical (60-90 min)
- **Focus:** [Main topics]
- **What to Expect:** [Specific details]
- **Key Questions:**
  - [Question 1]
  - [Question 2]
- **Preparation:** [Specific advice]

### 👤 Round 4: Behavioral/Cultural Fit (45-60 min)
- **Focus:** [Main topics]
- **What to Expect:** [Specific details]
- **Key Questions:**
  - [Question 1]
  - [Question 2]
- **Preparation:** [Specific advice]

### 🎯 Round 5: Final/Hiring Manager (30-45 min)
- **Focus:** [Main topics]
- **What to Expect:** [Specific details]
- **Key Questions:**
  - [Question 1]
  - [Question 2]
- **Preparation:** [Specific advice]

---

## ❓ Likely Interview Questions

**IMPORTANT:** Prioritize questions from scraped company data.

### 🔧 Technical Questions

1. **[Specific technical question]**
   - Why they ask: [Reasoning]
   - How to answer: [Brief strategy]

2. **[Specific technical question]**
   - Why they ask: [Reasoning]
   - How to answer: [Brief strategy]

3. **[Specific technical question]**
   - Why they ask: [Reasoning]
   - How to answer: [Brief strategy]

### 🧠 Behavioral Questions (Use STAR Method)

1. **[Specific behavioral question]**
   - What they're looking for: [Key traits]
   - STAR approach: [Brief guidance]

2. **[Specific behavioral question]**
   - What they're looking for: [Key traits]
   - STAR approach: [Brief guidance]

3. **[Specific behavioral question]**
   - What they're looking for: [Key traits]
   - STAR approach: [Brief guidance]

### 🧩 Situational/Problem-Solving Questions

1. **[Specific situational question]**
   - Approach: [How to tackle it]

2. **[Specific situational question]**
   - Approach: [How to tackle it]

3. **[Specific situational question]**
   - Approach: [How to tackle it]

---

## 📅 4-Week Preparation Roadmap

### 📆 Week 1: Foundation Building

**🎯 Goals:**
- [Specific goal 1]
- [Specific goal 2]

**📚 Topics to Study:**
- **[Topic]:** [Resources and approach]
- **[Topic]:** [Resources and approach]
- **[Topic]:** [Resources and approach]

**🛠️ Hands-On Practice:**
- [Specific project or exercise]
- [Another practical activity]

**⏱️ Time Commitment:** [X hours/day]

---

### 📆 Week 2: Skill Development

**🎯 Goals:**
- [Specific goal 1]
- [Specific goal 2]

**📚 Topics to Study:**
- **[Topic]:** [Resources and approach]
- **[Topic]:** [Resources and approach]
- **[Topic]:** [Resources and approach]

**🛠️ Hands-On Practice:**
- [Specific project or exercise]
- [Another practical activity]

**⏱️ Time Commitment:** [X hours/day]

---

### 📆 Week 3: Advanced Preparation

**🎯 Goals:**
- [Specific goal 1]
- [Specific goal 2]

**📚 Topics to Study:**
- **[Topic]:** [Resources and approach]
- **[Topic]:** [Resources and approach]
- **[Topic]:** [Resources and approach]

**🛠️ Hands-On Practice:**
- [Specific project or exercise]
- [Another practical activity]

**⏱️ Time Commitment:** [X hours/day]

---

### 📆 Week 4: Mock Interviews & Polish

**🎯 Goals:**
- [Specific goal 1]
- [Specific goal 2]

**🎤 Mock Interview Focus:**
- [Specific area with reasoning]
- [Another focus area with reasoning]

**📝 Final Preparations:**
- [Specific task]
- [Another task]

**⏱️ Time Commitment:** [X hours/day]

---

## 📚 Recommended Resources

### 💻 Online Courses
- **[Course Name]:** [Platform] - [Why it's relevant]
- **[Course Name]:** [Platform] - [Why it's relevant]

### 📖 Books
- **[Book Title]:** [Author] - [Key topics covered]
- **[Book Title]:** [Author] - [Key topics covered]

### 🎯 Practice Platforms
- **[Platform]:** [What to practice]
- **[Platform]:** [What to practice]

### 🌐 Websites & Blogs
- **[Resource]:** [What you'll learn]
- **[Resource]:** [What you'll learn]

---

## ✅ Final Verdict

### 📊 Interview Readiness Score: [X/10]

**🟢 Strengths:**
- [Specific strength with evidence]
- [Another strength with evidence]
- [Another strength with evidence]

**🟡 Areas for Improvement:**
- [Specific area with actionable advice]
- [Another area with actionable advice]
- [Another area with actionable advice]

**🎯 Realistic Timeline:**
- **Minimum Preparation:** [X weeks] - [What this achieves]
- **Recommended Preparation:** [X weeks] - [What this achieves]
- **Optimal Preparation:** [X weeks] - [What this achieves]

**💬 Bottom Line:**
[2-3 sentences providing honest, encouraging assessment of chances and what needs to be done. Be realistic but motivating.]

---

## 🚀 Immediate Next Steps

1. ✅ **[Action]** - [Why and how] - [Timeline]
2. ✅ **[Action]** - [Why and how] - [Timeline]
3. ✅ **[Action]** - [Why and how] - [Timeline]
4. ✅ **[Action]** - [Why and how] - [Timeline]
5. ✅ **[Action]** - [Why and how] - [Timeline]

---

**💬 Need More Help?**
Feel free to ask follow-up questions about:
- Specific technical topics
- Interview question strategies
- Resume improvements
- Preparation resources
- Timeline adjustments

**Good luck! You've got this! 🚀**

---

Begin your analysis now:
"""

    return prompt
