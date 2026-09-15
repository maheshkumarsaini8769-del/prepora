PREPORA — GEMINI AI COMPLETE INTEGRATION & INTELLIGENT AI SYSTEM

You are a senior full-stack engineer, AI architect, UX designer and education-tech product engineer.

You are working on the EXISTING PREPORA website.

PREPORA
Practice • Test • Analyze • Improve

IMPORTANT:
Do NOT rebuild the website from scratch.
Do NOT remove existing functionality.
Do NOT replace working features with mock/static implementations.
First inspect the existing codebase and understand the current architecture.

Your task is to integrate Google Gemini API into PREPORA wherever AI genuinely improves the product.

==================================================
1. GEMINI API CONFIGURATION
==================================================

Use Google Gemini API.

The admin/developer will provide the Gemini API key.

NEVER expose the API key in frontend/client-side code.

Use environment variables on the server/backend.

Example:

GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE

Never hardcode the key.

Never return the key through an API response.

Never store the key in the database unless there is a secure encrypted configuration system.

Create a centralized server-side Gemini service.

Example architecture:

Frontend
   ↓
PREPORA Backend
   ↓
Gemini Service
   ↓
Gemini API

The frontend must NEVER directly call Gemini using the secret API key.

==================================================
2. AI PROVIDER ABSTRACTION
==================================================

Do not hard-code Gemini calls throughout the application.

Create a reusable AI service layer.

Example:

AIProvider
 ├── GeminiProvider
 └── FutureProvider

This allows another model/provider to be added later without rewriting the whole application.

==================================================
3. AI DOUBT SOLVER
==================================================

This is the primary student-facing Gemini feature.

Student can ask ANY legitimate educational question.

The question does NOT have to exist in PREPORA's database.

Examples:

"What is gravity?"

"What is force?"

"Explain photosynthesis."

"Solve 2x + 5 = 15."

"Why does current flow?"

"Explain this concept simply."

The AI must answer using:

1. PREPORA content when relevant
2. General model knowledge when PREPORA content is unavailable
3. Web/current information only when the application has an approved web-search capability and the question requires current information

Do NOT restrict the AI to the PREPORA database.

==================================================
4. QUESTION UNDERSTANDING — MANDATORY
==================================================

Before generating an answer, identify internally:

Intent
Subject
Chapter if identifiable
Topic
Concept
Question type
Difficulty/level if identifiable

Example:

User:
"What is gravity?"

Internal understanding:

Intent:
Definition

Subject:
Physics

Topic:
Gravitation

Concept:
Gravity

Then generate the answer specifically for that concept.

Do NOT treat every Physics question as a generic Physics question.

==================================================
5. NO GENERIC TEMPLATE ANSWERS
==================================================

NEVER generate irrelevant generic text such as:

"Governing physics principles of..."

unless the actual question requires it.

Never insert random formulas.

Example:

Question:
"What is gravity?"

Correct:

"Gravity is the force of attraction between objects having mass. Near Earth's surface, gravity pulls objects toward the Earth's centre."

Optional relevant relation:

W = mg

Do NOT automatically output:

F = ma

just because the question is about Physics.

Question:

"What is force?"

Then:

"Force is a push or pull that can change an object's motion or shape."

Relevant formula:

F = ma

The formula should only appear when it actually helps answer the question.

==================================================
6. ANSWER VERIFICATION
==================================================

Every AI answer must pass an answer-quality check before being shown when practical.

Verify:

1. Does the answer directly answer the question?
2. Is the identified concept correct?
3. Are formulas relevant?
4. Are calculations correct?
5. Are units correct?
6. Is there contradictory information?
7. Is the explanation understandable?
8. Did the AI accidentally answer a different question?
9. Did it invent a source/reference?
10. Is the confidence sufficient?

If verification fails:

Regenerate.

Do not show the failed response.

==================================================
7. SMART ANSWER FORMAT
==================================================

Do not make every answer unnecessarily long.

Simple question:

Answer
+
short explanation
+
example if useful

Complex question:

Answer
Concept
Explanation
Formula if relevant
Example
Common mistake
Related practice

Adapt answer length to the question.

==================================================
8. STUDENT LEVEL
==================================================

If the user's class/exam level is known:

Class 11
Class 12
JEE
NEET
CBSE
RBSE

adapt the explanation accordingly.

If level is unknown:

Use a clear student-friendly explanation.

Do not unnecessarily use advanced terminology.

==================================================
9. PROGRESSIVE HINT SYSTEM
==================================================

For questions that require solving:

HINT 1
→ small clue

HINT 2
→ concept

HINT 3
→ approach

FULL SOLUTION
→ complete solution

Do not reveal the full solution immediately when the student specifically asks for a hint.

==================================================
10. IMAGE DOUBT SOLVER
==================================================

If the student uploads an image containing:

Question
Diagram
Graph
Equation
Book page
Handwritten problem

analyze the image and answer the question.

The AI should identify:

visible question
diagram information
given values
options
required result

If the image is unclear:

say what is unclear instead of inventing missing information.

==================================================
11. MATH / NUMERICAL VERIFICATION
==================================================

For numerical questions:

extract values
identify formula
calculate
verify result
check units

Example:

Given:
m = 5 kg
a = 2 m/s²

F = ma
F = 5 × 2
F = 10 N

Final:
10 N

Do not provide an unverified numerical result.

==================================================
12. PREPORA CONTENT GROUNDING
==================================================

When the student asks about something covered by PREPORA content:

retrieve relevant approved content first.

Then use Gemini to explain it.

IMPORTANT:

PREPORA content is a trusted learning context,
NOT the only possible source of knowledge.

If relevant PREPORA content is not found:

Gemini may answer using general knowledge.

Never falsely claim:

"According to PREPORA..."

unless PREPORA content was actually retrieved.

==================================================
13. CURRENT INFORMATION
==================================================

For questions requiring current information:

current events
current office holders
latest exam announcements
current schedules
current prices
recent changes

Do not rely blindly on model memory.

If web search is available in the application:

use it.

If web search is unavailable:

clearly state that current verification is unavailable rather than pretending the information is current.

==================================================
14. AI RESPONSE SAFETY
==================================================

For medical, legal, financial or other high-stakes questions:

provide appropriate caution.

Do not present uncertain information as guaranteed professional advice.

For unsafe requests:

follow appropriate safety policies.

==================================================
15. FIX MY WEAKNESS AI
==================================================

Use Gemini to analyze student performance.

Inputs can include:

accuracy
mistakes
question history
topics
chapters
time per question
mistake types
test results
revision history

Gemini should identify:

weak concept
probable reason
recommended action

Example:

Weak Topic:
Electrostatics

Accuracy:
48%

Repeated mistake:
4 times

AI analysis:

"Your main issue appears to be applying the electric-field formula in multi-step questions."

Then:

Recommended:

5 concept questions
5 easy questions
10 medium questions
5 timed questions
retest

Do not generate a weakness diagnosis from insufficient data.

==================================================
16. AI-GENERATED PRACTICE
==================================================

When appropriate, Gemini can generate new practice questions.

Every generated question must go through:

Source/knowledge validation
Answer validation
Duplicate detection
Quality validation
Topic validation
Difficulty validation

Never directly publish AI-generated questions.

==================================================
17. 400 QUESTIONS PER CHAPTER
==================================================

AI Content Factory target:

400 VALID UNIQUE QUESTIONS.

400 generated questions does NOT mean completion.

Only count questions that pass validation.

Use batches:

25–50 questions per batch.

Continue until:

400 valid unique questions

or until the source genuinely cannot support more high-quality unique questions.

Never hallucinate or repeat questions just to reach 400.

==================================================
18. QUESTION GENERATION PIPELINE
==================================================

PDF
↓
Extract
↓
Analyze
↓
Identify Topics
↓
Build Knowledge Map
↓
Build Question Blueprint
↓
Generate Batch
↓
Validate
↓
Check Answer
↓
Check Duplicate
↓
Check Topic
↓
Check Difficulty
↓
Accept / Reject
↓
Generate Replacement
↓
Coverage Check
↓
Admin Review
↓
Publish

==================================================
19. SOURCE VERIFICATION
==================================================

For source-based question generation:

Every question should maintain:

source document
source version
chapter
topic
section/page reference when available
concept

Never invent source references.

If the source does not contain the requested topic:

do not pretend that it does.

==================================================
20. SEMANTIC DUPLICATE DETECTION
==================================================

Detect:

Exact duplicates
Near duplicates
Semantic duplicates
Same concept with almost identical question structure

Flag them.

Do not automatically delete.

Generate replacement questions.

==================================================
21. AI CONTENT FACTORY — REAL PROGRESS
==================================================

Show actual backend job state.

Example:

Generating Questions

286 / 400 Valid

Accepted:
286

Duplicates:
31

Rejected:
18

Remaining:
114

Current Batch:
6

Stage:
Semantic Validation

Never fake progress.

If job is stuck:

show:

Processing delayed

[ Retry ]

[ View Error ]

==================================================
22. AI USAGE CONTROL
==================================================

Track:

requests
successful requests
failed requests
tokens if available
latency
daily usage
generation jobs
errors

Add configurable limits.

Prevent accidental infinite AI loops.

Every background generation job must have:

maximum retries
timeout
failure state
resume capability

==================================================
23. AI FAILURE HANDLING
==================================================

If Gemini fails:

Do not break the website.

Show:

AI SERVICE TEMPORARILY UNAVAILABLE

Your previous progress is saved.

[ Retry ]

For Content Factory:

pause the job safely.

Never lose already validated questions.

==================================================
24. CHAT MEMORY
==================================================

Within a doubt conversation, remember the recent context.

Example:

Student:
"What is force?"

AI answers.

Student:
"Give an example."

AI should understand that "it" refers to force.

But do not expose unnecessary personal information to the model.

==================================================
25. FOLLOW-UP QUESTIONS
==================================================

Allow:

Explain simpler
Give example
Explain step by step
Give hint
Why?
Show formula
Give similar question
Test me on this

These should use the current conversation context.

==================================================
26. AI → PRACTICE CONNECTION
==================================================

After explaining a concept:

Show:

SIMILAR PRACTICE

[ Practice 5 Questions ]

After a wrong answer:

[ Practice Similar ]

After repeated mistakes:

[ Fix My Weakness ]

AI should connect explanation directly to PREPORA learning actions.

==================================================
27. AI → REVISION CONNECTION
==================================================

If a student struggles with a concept:

Allow:

[ Add to Revision ]

Then create a revision item linked to:

subject
chapter
topic
concept
mistake

==================================================
28. AI → MISTAKE BOOK CONNECTION
==================================================

When AI explains a student's wrong answer:

allow:

[ Save Explanation ]

The explanation can be attached to the mistake record.

==================================================
29. ADMIN AI CONTROLS
==================================================

Admin should be able to configure:

AI enabled/disabled
model
daily request limits
content-generation limits
maximum retries
generation batch size
verification level

Do not expose API secrets in the UI unnecessarily.

==================================================
30. AI LOGGING
==================================================

Log safe metadata:

request ID
timestamp
feature
model
success/failure
latency
token usage if available
error category

Do not unnecessarily store sensitive student conversations.

==================================================
31. COST CONTROL
==================================================

Do not call Gemini multiple times unnecessarily.

Use intelligent routing.

Simple question:
one generation + lightweight validation when appropriate.

Complex/high-risk/generated content:
stronger verification.

Cache appropriate repeated explanations where safe.

Set rate limits.

Prevent abuse.

==================================================
32. UI FOR AI DOUBT SOLVER
==================================================

Keep the interface clean.

Student sees:

Ask PREPORA AI

[ Type your question... ]

[ Upload Image ]

Suggested:

Explain this concept
Solve a question
Give me a hint
Why is this answer wrong?

AI answer:

Clear answer
Formula if relevant
Example if useful

Actions:

Explain simpler
Give example
Practice similar
Save to revision

==================================================
33. DO NOT MAKE AI LOOK LIKE A GENERIC CHATBOT
==================================================

The AI should feel integrated into PREPORA.

AI should understand:

student performance
weaknesses
mistakes
revision
practice
tests

but only use the data required for the current task.

==================================================
34. FINAL AI QUALITY RULE
==================================================

Before showing any educational answer, the system should conceptually ask:

"Did I answer exactly what the student asked?"

Examples:

"What is gravity?"
→ explain gravity.

"What is force?"
→ explain force.

"Why does gravity act?"
→ explain gravitational attraction.

"Calculate force when m=5kg and a=2m/s²."
→ calculate 10N.

Do NOT answer a different question just because it belongs to the same subject.

==================================================
35. FINAL IMPLEMENTATION
==================================================

First inspect the existing codebase.

Then implement:

1. Gemini backend service
2. Secure API key handling
3. AI provider abstraction
4. AI Doubt Solver
5. Question understanding
6. Answer verification
7. Progressive hints
8. Image question support if existing upload infrastructure supports it
9. PREPORA content retrieval
10. AI-generated practice
11. Fix My Weakness AI
12. AI → Practice connection
13. AI → Revision connection
14. AI → Mistake Book connection
15. 400-question Content Factory integration
16. Batch generation
17. Duplicate detection
18. Replacement generation
19. Real AI job progress
20. Usage tracking
21. Failure/retry handling
22. Admin controls
23. Security
24. Rate limiting
25. Mobile UI

==================================================
36. DO NOT BREAK EXISTING PRODUCT
==================================================

Before finishing:

Test:

Home
Practice
Question solving
Tests
Custom Test
Papers
Analytics
Mistake Book
Fix My Weakness
Revision
Admin Panel
AI Content Factory
PDF processing
Question generation
Question review

Verify existing functionality still works.

==================================================
FINAL PRODUCT GOAL
==================================================

PREPORA should not simply have "an AI chatbot".

It should have an intelligent academic assistant integrated throughout the product.

Student asks ANY educational question:
→ AI answers.

Student doesn't understand:
→ Explain simpler.

Student is stuck:
→ Give hint.

Student makes mistake:
→ Explain why.

Student repeatedly struggles:
→ Detect weakness.

Weakness detected:
→ Create targeted practice.

Practice completed:
→ Retest.

Improvement:
→ Show measurable progress.

CORE LOOP:

ASK
→ UNDERSTAND
→ EXPLAIN
→ PRACTICE
→ ANALYZE
→ FIX
→ REVISE
→ RETEST
→ IMPROVE

Implement this using Gemini API securely and reliably.

DO NOT CLAIM 100% accuracy.
Instead, build strong verification, grounding, calculation checking and regeneration mechanisms to minimize incorrect answers.