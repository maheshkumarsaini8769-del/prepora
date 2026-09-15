You are a senior product engineer, UX architect, education-platform architect, AI content-generation engineer, database architect and QA engineer.

You are working on my existing education platform:

PREPORA
Practice • Test • Analyze • Improve

IMPORTANT:
Do NOT rebuild the website from scratch.
Do NOT replace the existing design unnecessarily.
Do NOT remove existing working features.
Do NOT change the brand identity.
Do NOT introduce a completely different UI.

First inspect the existing codebase, routes, components, database models, APIs, authentication, AI generation logic and current UI.

Then improve the existing implementation.

The website has already been designed and partially implemented for both:

1. Student-facing platform
2. Admin Panel

I reviewed the current website and screen recordings and identified areas that need improvement.

The goal is to make PREPORA feel like a serious, production-quality education platform rather than an AI-generated demo.

==================================================
1. CORE PRODUCT PHILOSOPHY
==================================================

PREPORA's core learning loop is:

PRACTICE
↓
TEST
↓
ANALYZE
↓
IDENTIFY WEAKNESS
↓
TARGETED PRACTICE
↓
RETEST
↓
IMPROVE

The most important differentiator is:

FIX MY WEAKNESS

This should not be just another menu item.

It should become one of the core product experiences.

The system should identify weak chapters/topics/concepts/question types from actual student performance and generate a targeted action plan.

==================================================
2. DO NOT DESTROY CURRENT UI
==================================================

Preserve:

- current PREPORA branding
- current typography
- current overall visual language
- current card style
- current navigation
- current responsive structure
- existing pages
- existing working functionality

Only make changes where they improve:

- usability
- visual hierarchy
- consistency
- responsiveness
- information density
- accessibility
- professional appearance
- performance
- correctness

Avoid:

- excessive gradients
- excessive glassmorphism
- neon colors
- childish/gaming UI
- unnecessary animations
- huge decorative elements
- excessive purple cards
- AI-looking paragraphs
- excessive rounded containers everywhere

PREPORA should feel premium, clean, intelligent and trustworthy.

==================================================
3. STUDENT NAVIGATION
==================================================

Keep the current navigation but improve information architecture.

Primary navigation should clearly prioritize:

HOME
PRACTICE
TESTS
PAPERS
PROFILE

Group secondary features logically.

Suggested structure:

MAIN
- Practice
- Tests
- Papers

IMPROVE
- Fix My Weakness
- Mistake Book
- Smart Revision
- Formula Flashcards

PLAN
- Study Planner
- Goals & Milestones

ANALYZE
- Performance Analytics
- Readiness

SUPPORT
- AI Doubt Solver
- Doubts / Mentorship

Do not force the user to understand every feature before starting study.

The Home page should answer:

"What should I do right now?"

==================================================
4. HOME DASHBOARD
==================================================

Keep the existing personalized dashboard concept.

Improve it so the most important information appears first:

1. Today's target
2. Continue where I left off
3. Weakness that needs attention
4. Recommended practice
5. Test/revision reminder
6. Performance summary

Example:

TODAY'S TARGET
30 questions
Physics • Current Electricity

CONTINUE
Chapter Practice → 12 questions remaining

FIX THIS WEAKNESS
Electrostatics
Accuracy: 48%
Repeated mistakes: 6

[Fix My Weakness →]

Do not fill the dashboard with too many explanatory paragraphs.

==================================================
5. PRACTICE EXPERIENCE
==================================================

Practice should support:

- Subject
- Chapter
- Topic
- Subtopic
- Difficulty
- Question count
- Question type
- Exam type
- Custom practice
- Weakness-based practice

Question screen should support:

- question
- options
- timer
- mark for review
- skip
- submit
- hint
- solution after submission
- concept
- important point
- common mistake
- exam tip
- recommended time

After every answer capture:

- selected option
- correct/incorrect
- time spent
- question difficulty
- topic
- concept
- mistake type
- confidence if enabled

Do not expose unnecessary analytics during active solving.

==================================================
6. FIX MY WEAKNESS
==================================================

Make this a first-class feature.

Input:

- chapter performance
- topic accuracy
- concept accuracy
- repeated mistakes
- question time
- skipped questions
- negative marking
- difficulty-wise performance
- recent tests
- historical performance

Output:

WEAKNESS DETECTED

Topic:
Electrostatics

Accuracy:
48%

Confidence:
Low

Repeated mistake:
Conceptual confusion

Recommended action:

Step 1
Review concept

Step 2
Solve 10 targeted questions

Step 3
Take 5-question mini test

Step 4
Retest after revision

Step 5
Recalculate mastery

The system must not simply show random questions.

Questions must be selected based on the detected weakness.

==================================================
7. MISTAKE BOOK
==================================================

Every incorrect question should be capable of entering the mistake system.

Store:

- question
- question version
- selected answer
- correct answer
- mistake type
- topic
- concept
- time taken
- attempt number
- date
- explanation
- student's previous attempts

Mistake categories can include:

- Conceptual mistake
- Calculation mistake
- Careless mistake
- Misread question
- Formula mistake
- Time-pressure mistake
- Guessing
- Knowledge gap

Allow:

Review
Practice Again
Fix Weakness
Mark Resolved

Detect repeated mistakes automatically.

==================================================
8. SMART REVISION
==================================================

Support spaced revision.

Revision items can come from:

- mistakes
- formulas
- weak concepts
- flashcards
- important questions
- previously incorrect questions

Show:

Due today
Upcoming
Mastered
Needs revision

Do not create fake mastery.

Mastery must be based on actual performance.

==================================================
9. PERFORMANCE ANALYTICS
==================================================

Keep the existing analytics concept.

Improve information hierarchy.

Show:

- Accuracy
- Attempt rate
- Average time
- Correct/wrong/skipped
- Subject performance
- Chapter performance
- Topic performance
- Difficulty performance
- Question-type performance
- Negative marking
- Improvement trend
- Repeated mistakes
- Readiness

Avoid long AI-generated paragraphs.

Prefer:

Metric
↓
Reason
↓
Action

Example:

NEGATIVE MARKING RISK

Physics

Accuracy:
61%

Incorrect:
12

Potential avoidable errors:
5

[Practice Accuracy →]

==================================================
10. RANK / PERCENTILE PREDICTION
==================================================

If rank or percentile prediction exists:

Never represent it as an official NTA result.

Use wording such as:

Estimated Rank Range

Based on current performance

Prediction only — not an official examination result.

Predictions must show uncertainty/range.

Do not make false precision claims.

If insufficient data exists:

"Not enough data yet"

instead of inventing a prediction.

==================================================
11. MOBILE RESPONSIVENESS
==================================================

The website is primarily important on mobile.

Audit every screen for:

- horizontal overflow
- clipped text
- table overflow
- oversized cards
- tiny buttons
- inconsistent padding
- overlapping elements
- fixed navigation problems
- modal overflow
- long titles
- chart responsiveness

Desktop tables can remain tables.

On mobile, convert complex tables into responsive cards when necessary.

For example:

JEE MAIN
2024
15 Questions
PYQ

Published

[View]

instead of forcing a wide table.

==================================================
12. ADMIN PANEL
==================================================

Preserve the current Admin Panel architecture.

It should support:

Dashboard
Students
Questions
Tests
Papers
Subjects
Chapters
Topics
Reports
AI Content Factory
Analytics
Security & Admins
System Status
Settings
Audit Logs

Use role-based access control.

Roles:

- Super Admin
- Content Admin
- Test Admin
- Reviewer
- Support Admin
- Analytics Admin

Do not rely only on frontend button hiding.

Every protected API/action must perform server-side authorization.

==================================================
13. AI CONTENT FACTORY
==================================================

THIS IS THE MOST IMPORTANT SYSTEM.

The current AI Content Factory must become a REAL production workflow.

Do NOT simulate progress.

Do NOT display fake progress percentages.

Do NOT create fake generated questions.

Do NOT say "generation complete" until the database actually contains the required valid questions.

Workflow:

PDF UPLOAD
↓
FILE VALIDATION
↓
TEXT EXTRACTION / OCR
↓
SOURCE ANALYSIS
↓
SUBJECT DETECTION
↓
CLASS DETECTION
↓
CHAPTER DETECTION
↓
SECTION DETECTION
↓
TOPIC DETECTION
↓
SUBTOPIC DETECTION
↓
CONCEPT EXTRACTION
↓
KNOWLEDGE MAP
↓
SOURCE COVERAGE ANALYSIS
↓
QUESTION BLUEPRINT
↓
BATCH GENERATION
↓
VALIDATION
↓
DUPLICATE CHECK
↓
SEMANTIC DUPLICATE CHECK
↓
QUALITY CHECK
↓
SOURCE TRACEABILITY CHECK
↓
EXAM CLASSIFICATION
↓
DIFFICULTY CLASSIFICATION
↓
ACCEPT / REJECT
↓
REPLACEMENT GENERATION
↓
COVERAGE CHECK
↓
ADMIN REVIEW
↓
APPROVE
↓
PUBLISH

Never auto-publish AI-generated content.

Admin remains the final authority.

==================================================
14. 400 VALID QUESTIONS — CRITICAL
==================================================

The target is:

MINIMUM 400 VALID UNIQUE QUESTIONS PER CHAPTER.

Admin options:

400
500
750
1000
Custom

Default:

400

IMPORTANT:

"400 generated" does NOT mean completion.

Completion means:

400 VALID + UNIQUE + SOURCE-SUPPORTED questions are approved-ready.

Example:

Generated:
450

Duplicates:
22

Rejected:
18

Invalid:
4

Valid:
406

Then:

Target:
400

Status:
COMPLETE

If:

Generated:
450

Valid:
372

Then:

Status:
INCOMPLETE

Remaining:
28

The system must continue generation.

==================================================
15. BATCH GENERATION
==================================================

Do NOT attempt to generate 400 questions in one AI request.

Use background batch jobs.

Example:

Target = 400

Batch size:
25–50 questions

Example:

Batch 1 → 50
Batch 2 → 50
Batch 3 → 50
Batch 4 → 50
...

Continue until 400 VALID UNIQUE questions exist.

If a batch generates:

50 generated
7 duplicates
4 rejected
39 valid

Then:

Accepted:
39

Remaining:
361

The system automatically schedules another batch.

Do not stop because the original number of generated questions reached 400.

==================================================
16. REAL-TIME GENERATION STATUS
==================================================

Show real generation state.

Example:

AI CONTENT FACTORY

Target:
400 valid questions

Progress:
138 / 400 valid

Current batch:
Batch 4

Generating:
22 / 40

Accepted:
31

Duplicates:
6

Rejected:
3

Remaining:
262

Current stage:
Semantic validation

Last activity:
10:32:14 AM

Estimated remaining:
Based only on real job telemetry, otherwise omit estimate.

Statuses:

QUEUED
EXTRACTING
ANALYZING SOURCE
BUILDING BLUEPRINT
GENERATING
VALIDATING
CHECKING DUPLICATES
CHECKING QUALITY
GENERATING REPLACEMENTS
FINAL COVERAGE CHECK
READY FOR REVIEW
COMPLETE
FAILED
PAUSED
CANCELLED

If AI API fails:

show:

Batch failed
Reason
Retry available

Never fake progress.

==================================================
17. GENERATION CONTRACT
==================================================

Before generation begins, show a confirmation screen.

Example:

GENERATION CONTRACT

SOURCE
NCERT Biology Class 11

CHAPTER
The Living World

TARGET
400 valid unique questions

SOURCE COVERAGE
73%

DIFFICULTY
Easy 30%
Medium 50%
Hard 20%

EXAM SUITABILITY
NEET
CBSE
RBSE

QUESTION TYPES
MCQ
Assertion-Reason
Statement Based
Match/other supported formats

EXCLUDED TOPICS
Topics not supported by source

[START GENERATION]

This contract must be saved with the AI job.

==================================================
18. TOPIC WEIGHTS
==================================================

The admin may enter importance weights.

Do NOT interpret 19 topics each having 15% as 285% final allocation.

Weights are importance indicators.

Normalize supported topic weights to 100%.

Display:

Topic
Admin Weight
AI Recommended Weight
Final Weight
Allocated Questions
Source Support

Example:

Diversity
Admin: 15%
AI: 14.2%
Final: 14.2%
Questions: 57

Nomenclature
Admin: 15%
AI: 12.8%
Final: 12.8%
Questions: 51

Unsupported topic
Admin: 15%
AI: 0%
Final: 0%
Questions: 0

The final question allocation must total exactly the requested target.

==================================================
19. SOURCE COVERAGE
==================================================

This is extremely important.

Do not use only exact phrase matching.

Use semantic source mapping.

For each topic:

SUPPORTED
PARTIALLY SUPPORTED
NOT FOUND

Store evidence:

- source document
- version
- page
- section
- text span/chunk reference

For PARTIALLY SUPPORTED topics:

Only generate questions from supported concepts.

Do not fill unsupported parts using general model knowledge.

==================================================
20. SOURCE-GROUNDING RULE
==================================================

The uploaded educational source is the primary source of truth for source-grounded generation.

The AI must not silently invent missing information.

If a topic is absent:

Question target:
0

Reason:
Not supported by source.

If the source cannot safely support 400 unique questions:

DO NOT:

- repeat questions
- create paraphrase duplicates
- hallucinate facts
- import unsupported textbook content silently

Instead show:

"Source capacity is insufficient for the requested target."

Example:

Safe unique capacity:
286

Requested:
400

Additional source required:
114

Admin can upload another authorized source.

==================================================
21. CURRENT THE LIVING WORLD SOURCE
==================================================

For the currently tested NCERT Biology Class 11 "The Living World" source:

The source supports topics including:

- Diversity / living world
- Nomenclature
- Identification
- Binomial nomenclature
- Scientific naming rules
- ICBN / botanical nomenclature
- ICZN / zoological nomenclature
- Classification
- Taxa
- Taxonomy
- Systematics
- Taxonomic categories
- Species
- Genus
- Family
- Order
- Class
- Phylum
- Taxonomic hierarchy
- Man
- Housefly
- Mango
- Wheat and related hierarchy examples

The source explicitly explains binomial nomenclature, including genus + specific epithet and naming conventions. :contentReference[oaicite:2]{index=2}

It also explains classification, taxa and taxonomy. :contentReference[oaicite:3]{index=3}

It describes systematics and evolutionary relationships. :contentReference[oaicite:4]{index=4}

It covers species, genus, family, order, class and phylum hierarchy. :contentReference[oaicite:5]{index=5} :contentReference[oaicite:6]{index=6}

IMPORTANT:

If Taxonomical Aids topics such as:

- Herbarium
- Botanical Gardens
- Arboretums
- Museum
- Zoological Parks
- Key
- Monograph

are not present in the uploaded source, mark them:

NOT FOUND IN SOURCE

and allocate:

0 questions.

Do not hallucinate questions for them.

The source's exercises themselves include classification, species, taxon, hierarchy and scientific-name questions, so the generation engine can use those concepts as coverage signals without copying the exercise questions verbatim. :contentReference[oaicite:7]{index=7}

==================================================
22. QUESTION GENERATION BLUEPRINT
==================================================

Before generating questions, create a blueprint.

Blueprint dimensions:

Topic
Subtopic
Concept
Difficulty
Question type
Exam suitability
Cognitive level
Question intent

Example:

Topic:
Binomial Nomenclature

Concept:
Genus + specific epithet

Easy:
definition / recognition

Medium:
application / error detection

Hard:
multi-statement reasoning

Avoid generating 50 questions that test the same fact in different wording.

==================================================
23. QUESTION DIVERSITY
==================================================

Question diversity is mandatory.

Avoid:

Q1:
What is X?

Q2:
Define X.

Q3:
X means?

Q4:
Which option defines X?

These may all be semantic duplicates.

Use different cognitive patterns:

- Concept identification
- Application
- Comparison
- Sequence
- Statement analysis
- Error detection
- Classification
- Example-based reasoning
- Assertion-Reason
- Multiple statements
- Match-style questions where supported
- Scenario/application questions
- Exam-style conceptual traps

Do not force unsupported question types.

==================================================
24. DIFFICULTY
==================================================

Default:

Easy:
30%

Medium:
50%

Hard:
20%

But difficulty must be based on actual reasoning complexity.

Do not label a simple factual recall question as Hard just to satisfy the percentage.

Admin should be able to change distribution.

==================================================
25. EXAM CLASSIFICATION
==================================================

Each question can have multiple suitability tags:

NEET
CBSE
RBSE

Do not create separate duplicate copies of the same question.

Use one master question bank.

Store:

examSuitability:
[
"NEET",
"CBSE"
]

If a question is suitable for multiple exams, reuse the same master question.

==================================================
26. QUESTION DATA MODEL
==================================================

Each question should store:

questionId
questionVersion
subject
class
chapter
topic
subtopic
concept
questionType
difficulty
cognitiveLevel
questionText
options
correctAnswer
explanation
solution
conceptExplanation
importantPoint
commonMistake
examTip
recommendedTime
marks
negativeMarks
examSuitability
sourceDocumentId
sourceVersionId
sourcePage
sourceSection
sourceEvidence
status
createdAt
updatedAt
createdBy
approvedBy
approvedAt

==================================================
27. QUALITY GATES
==================================================

Every AI question must pass:

1. Valid question structure
2. Exactly one correct answer unless question type explicitly supports otherwise
3. Options logically valid
4. No ambiguous wording
5. Explanation supports answer
6. Source evidence exists
7. No unsupported claims
8. Difficulty is reasonable
9. Exam classification is reasonable
10. No semantic duplicate
11. No accidental answer leakage
12. No malformed formatting
13. No broken math/scientific notation
14. No placeholder text
15. No "AI generated" visible to students

Failed questions go to:

REJECTED

and replacement generation is triggered.

==================================================
28. DUPLICATE DETECTION
==================================================

Use multiple layers:

Layer 1:
Exact text duplicate

Layer 2:
Normalized text duplicate

Layer 3:
Option similarity

Layer 4:
Semantic similarity / embeddings

Layer 5:
Same concept + same reasoning pattern + same answer pattern

A paraphrased duplicate should still be detected.

Example:

Question A:
Which is the genus in Mangifera indica?

Question B:
In Mangifera indica, which word represents the genus?

These should be flagged as near duplicates.

Never automatically delete a question.

Show:

Possible duplicate
Similarity:
94%

[Compare]
[Keep]
[Reject]

Admin decides.

==================================================
29. REPLACEMENT ENGINE
==================================================

If a question is rejected or duplicate:

Do not simply paraphrase it.

Generate a replacement from another unused:

- concept
- subtopic
- cognitive pattern
- difficulty
- exam pattern

Maintain blueprint coverage.

==================================================
30. COVERAGE CHECK
==================================================

Before completion calculate:

Target questions
Valid questions
Duplicate count
Rejected count
Topic coverage
Concept coverage
Difficulty distribution
Question-type distribution
Exam distribution
Source coverage

Example:

400 / 400 valid

Topic coverage:
100%

Concept coverage:
94%

Easy:
120
Medium:
200
Hard:
80

Duplicates rejected:
43

Rejected for quality:
21

Status:
READY FOR REVIEW

==================================================
31. ADMIN REVIEW
==================================================

Never auto-publish.

Question states:

DRAFT
GENERATING
VALIDATING
PENDING REVIEW
APPROVED
PUBLISHED
REJECTED
ARCHIVED

Admin can:

Approve
Reject
Edit
Request Replacement
Compare Duplicate
View Source
View Version
Publish

Bulk review should be available.

==================================================
32. QUESTION VERSIONING
==================================================

If an approved question is edited:

Create a new version.

Old student attempts must remain linked to the old question version.

Never change historical attempt meaning.

Example:

Question ID:
Q-1001

Version:
v1

Student attempted v1.

Admin later edits it.

New version:
v2

Old attempt remains connected to v1.

==================================================
33. SOURCE VERSIONING
==================================================

Every uploaded PDF should have:

Source ID
Version
File hash
Upload time
Uploaded by
Extraction status
Analysis status

If the same PDF is uploaded again:

Detect duplicate source.

Allow:

Use existing source
Create new version
Cancel

==================================================
34. AI JOB SYSTEM
==================================================

AI generation must run as background jobs.

Job fields:

jobId
sourceId
sourceVersion
targetCount
currentValidCount
generatedCount
duplicateCount
rejectedCount
remainingCount
currentBatch
batchSize
status
progress
startedAt
updatedAt
completedAt
error
retryCount
provider
model
promptVersion

Support:

Pause
Resume
Retry failed batch
Cancel

If the browser closes:

The job must continue server-side if infrastructure supports it.

Opening Admin Panel again should show the current job state.

==================================================
35. FAILURE RECOVERY
==================================================

If an AI request fails:

Do not lose previous valid questions.

Save progress after every accepted batch.

Retry only failed batch.

Use exponential backoff where appropriate.

If provider quota is reached:

Pause job.

Show:

AI provider quota reached.

Do NOT silently switch to a paid API.

Do NOT silently charge the admin.

Admin must explicitly choose another configured provider if available.

==================================================
36. AI PROVIDER ABSTRACTION
==================================================

Do not hard-code the application around one AI provider.

Create provider abstraction.

Example:

AIProvider

generateQuestions()
analyzeSource()
validateQuestion()
generateReplacement()

Provider configuration must be server-side.

Never expose API keys in frontend.

==================================================
37. AI USAGE DASHBOARD
==================================================

Admin should see:

Provider
Model
Requests today
Tokens if available
Successful requests
Failed requests
Estimated usage
Quota status
Average generation time

Never expose secret API keys.

==================================================
38. ADMIN DASHBOARD
==================================================

Show:

Students
Active users
Questions
Published questions
Pending review
Tests
Papers
AI jobs
Failed AI jobs
Reports
System health

AI Content Factory widget:

Active Jobs
Completed
Failed
Pending Review

Example:

AI JOBS

The Living World
286 / 400
Generating

Physics
400 / 400
Ready for Review

Chemistry
400 / 400
Complete

==================================================
39. PAPER LIBRARY
==================================================

Support:

JEE
NEET
CBSE
RBSE

Fields:

Exam
Year
Subject
Paper type
Question count
Answer key
Status
Source
Rights/licensing metadata

Do not assume that publicly available papers can automatically be commercially redistributed.

Keep source/licensing information in admin metadata.

==================================================
40. SEARCH SYSTEM
==================================================

Admin search should support:

Student
Question
Subject
Chapter
Topic
Date
Exam
Difficulty
Status
Source
AI job
Paper
Question ID

Student search should support relevant:

Subject
Chapter
Topic
Question
Paper
Formula
Revision content

==================================================
41. REPORT SYSTEM
==================================================

Students can report:

Wrong answer
Wrong explanation
Ambiguous question
Typo
Duplicate
Technical problem
Other

Admin sees:

Report count
Question
Reporter
Reason
Status
Action

Actions:

Review
Correct
Reject report
Archive question
Create new version

==================================================
42. TECHNICAL ERROR SYSTEM
==================================================

Admin should have:

System Status

Monitor:

API
Database
Authentication
AI provider
File processing
Question generation
Background jobs

Show:

Operational
Degraded
Down

Also create:

Technical Reports
Error logs
Job failures
Recent errors

Never expose sensitive server information to normal students.

==================================================
43. AUDIT LOG
==================================================

Log important admin actions:

Who
What
When
Before
After
IP/device metadata only where appropriate and legally justified

Examples:

Question approved
Question published
Question rejected
Source uploaded
AI job started
AI job cancelled
Role changed
Setting changed

==================================================
44. ADMIN UX IMPROVEMENTS
==================================================

Use clear hierarchy.

Avoid giant paragraphs.

Replace long descriptions with:

Metric
Status
Action

Use clear badges:

SUCCESS
WARNING
ERROR
PROCESSING
PENDING

Use confirmation dialogs for destructive actions.

Use toast notifications for successful actions.

Use skeleton loading states.

Use empty states.

Use retry states.

Use proper error messages.

==================================================
45. TABLE RESPONSIVENESS
==================================================

On desktop:

Use tables.

On mobile:

Convert important tables into cards where horizontal scrolling harms usability.

Never allow important information to be clipped.

==================================================
46. PERFORMANCE
==================================================

Optimize:

- lazy loading
- pagination
- database indexing
- server-side filtering
- background jobs
- caching where appropriate
- debounced search
- batch operations

Never load thousands of questions into the browser unnecessarily.

==================================================
47. SECURITY
==================================================

Implement/verify:

- server-side RBAC
- secure authentication
- secure sessions
- password hashing
- protected admin APIs
- rate limiting
- input validation
- file type validation
- file size limits
- upload scanning where practical
- API key protection
- CSRF protection where applicable
- secure headers
- audit logging

Do not trust client-provided:

role
userId
permissions
question status
approval state

==================================================
48. DATABASE INTEGRITY
==================================================

Use proper indexes for:

questionId
chapterId
topicId
status
examSuitability
difficulty
sourceId
sourceVersion
AIJob status

Prevent duplicate question IDs.

Prevent accidental duplicate publishing.

Use transactions where required.

==================================================
49. FREE AI / API LIMIT HANDLING
==================================================

The application must work with configured free-tier AI providers where available.

Do not promise unlimited free AI.

Implement:

daily request limits
provider quota detection
usage tracking
pause/resume

If quota is exhausted:

show an honest message.

Do not automatically use a paid provider.

==================================================
50. STUDENT TRUST
==================================================

Never fake:

- AIR
- percentile
- score
- progress
- AI generation status
- mastery
- question count
- source verification

If data is insufficient:

Say:

"Not enough data yet."

If prediction is uncertain:

Show a range.

If AI job is still running:

Say:

"Generating..."

not:

"Almost complete"

unless actual progress supports it.

==================================================
51. FINAL QA CHECK
==================================================

After implementing changes, test:

Student:

- Login
- Home
- Practice
- Questions
- Tests
- Papers
- Mistake Book
- Fix My Weakness
- Revision
- Analytics
- Profile

Admin:

- Login
- Dashboard
- Source upload
- PDF extraction
- Topic detection
- Source coverage
- Weight normalization
- Generation Contract
- 400-question generation
- Batch processing
- Duplicate detection
- Replacement generation
- Quality validation
- Review
- Approval
- Publishing
- Versioning
- Reports
- Search
- RBAC
- System status
- AI usage

==================================================
52. CRITICAL ACCEPTANCE TEST
==================================================

Use this exact test scenario.

Upload:

NCERT Biology Class 11
Chapter:
The Living World

Set:

Target:
400

Difficulty:
30/50/20

Generate.

The system must:

1. Extract source
2. Detect supported topics
3. Mark unsupported topics as NOT FOUND
4. Normalize weights
5. Create blueprint
6. Start background AI job
7. Generate batches
8. Validate questions
9. Detect duplicates
10. Reject bad questions
11. Generate replacements
12. Continue until 400 VALID UNIQUE questions
13. Run coverage check
14. Move to READY FOR REVIEW
15. Allow admin review
16. Only then allow publish

If the source cannot safely support 400 unique questions:

STOP honestly.

Show safe capacity.

Do not hallucinate.

==================================================
53. DO NOT FAKE BACKEND FUNCTIONALITY
==================================================

This is extremely important.

Do not create UI that pretends something is implemented when the backend is not actually implemented.

Bad:

"400 / 400 generated"

when only demo data exists.

Bad:

"Source verified"

without actual source analysis.

Bad:

"Duplicate checked"

without duplicate detection.

Bad:

"AI generation complete"

without actual AI job completion.

If something is not implemented yet:

Clearly identify it as:

NOT IMPLEMENTED

and create the proper implementation instead of a fake simulation.

==================================================
54. PRESERVE EXISTING DATA
==================================================

Before changing database structures:

Inspect current schema.

Do not delete existing data.

Create migrations where needed.

Do not break existing users, questions, tests or attempts.

==================================================
55. CODE QUALITY
==================================================

Use:

- reusable components
- reusable services
- typed data models
- clear API boundaries
- validation schemas
- error handling
- logging
- comments only where useful
- environment variables for secrets
- modular architecture

Avoid giant components and duplicated logic.

==================================================
56. FINAL UI STYLE
==================================================

PREPORA should feel:

Premium
Modern
Academic
Trustworthy
Fast
Intelligent
Clean

Not:

Childish
Gaming-focused
Over-designed
Neon
AI-template-looking

Use the existing visual identity as the foundation.

Use purple primarily for important actions/selected states rather than making every card purple.

Maintain strong contrast and accessibility.

==================================================
57. IMPORTANT IMPLEMENTATION RULE
==================================================

Before coding:

1. Inspect the existing project.
2. Identify what is already implemented.
3. Identify what is simulated.
4. Identify missing backend functionality.
5. Identify duplicate functionality.
6. Identify broken flows.
7. Create an implementation plan.
8. Then implement.

Do not blindly overwrite working code.

==================================================
58. DELIVERABLE
==================================================

After implementation provide:

1. What was already working
2. What was fixed
3. What was newly implemented
4. Database changes
5. API changes
6. AI pipeline changes
7. Security changes
8. UI/UX changes
9. Remaining limitations
10. Exact test results

Most importantly:

The final system must prioritize correctness over visual simulation.

PREPORA should never claim that 400 questions are ready unless 400 valid, unique and source-supported questions actually exist.