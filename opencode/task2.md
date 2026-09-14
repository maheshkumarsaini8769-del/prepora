IMPORTANT FIX — AI MUST NOT STOP AT 25 QUESTIONS

The current PDF-to-question system generated only 25 questions
from a complete Biology chapter.

This is NOT acceptable for PREPORA's question-bank generation system.

Do NOT solve this by simply increasing max_tokens.

Build a BATCHED QUESTION GENERATION ENGINE.

==================================================
CORE RULE
==================================================

When admin uploads a chapter PDF and requests:

"Generate Questions"

the system must generate the requested number of
VALID UNIQUE questions.

Example:

Requested:
100 questions

The system must NOT generate:

25 → Done

Instead:

Batch 1 → 20 questions
Batch 2 → 20 questions
Batch 3 → 20 questions
Batch 4 → 20 questions
Batch 5 → 20 questions

Then:

Combine
↓
Validate
↓
Duplicate Check
↓
Quality Check
↓
Topic Coverage Check
↓
Generate replacements for rejected/duplicate questions
↓
Final 100 valid questions

==================================================
1. ADMIN INPUT
==================================================

Admin selects:

PDF:
The Living World

Requested Questions:

[ 100 ]

Exam:

☑ NEET
☑ CBSE
☑ RBSE

Difficulty:

Auto

Question Type:

Auto

Then:

[ GENERATE QUESTIONS ]

==================================================
2. NEVER STOP EARLY
==================================================

If admin requests 100 questions:

The job is considered incomplete until:

100 VALID questions

are available.

Bad:

Generated: 25
Status: Completed

Correct:

Generated: 25 / 100
Status: Generating...

Continue automatically.

==================================================
3. BATCH GENERATION
==================================================

Never ask the AI model to generate hundreds of questions
in one API request.

Use batches.

Recommended:

10–25 questions per batch depending on provider limits.

Example:

Requested = 100

Batch size = 20

Batch 1:
1–20

Batch 2:
21–40

Batch 3:
41–60

Batch 4:
61–80

Batch 5:
81–100

==================================================
4. TOPIC-FIRST GENERATION
==================================================

DO NOT generate all questions from the whole PDF randomly.

First create:

CHAPTER KNOWLEDGE MAP

Example:

The Living World

Topics:

1. Diversity in the Living World
2. Nomenclature
3. Identification
4. Binomial Nomenclature
5. Scientific Naming Rules
6. Classification
7. Taxa
8. Taxonomy
9. Systematics
10. Taxonomic Categories
11. Species
12. Genus
13. Family
14. Order
15. Class
16. Phylum
17. Kingdom
18. Taxonomic Hierarchy
19. Taxonomic Examples

Use the actual PDF content to determine topics.

The uploaded chapter contains these sections and taxonomic
hierarchy material, including the organism examples table. 

==================================================
5. TOPIC DISTRIBUTION
==================================================

If requested:

100 questions

Do NOT randomly generate.

Distribute questions according to:

Topic importance
Content size
Concept density
Exam relevance

Example:

Diversity:
10

Nomenclature:
12

Binomial Nomenclature:
12

Classification:
10

Taxonomy:
8

Systematics:
6

Species:
10

Genus:
8

Family:
6

Order:
5

Class:
4

Phylum:
4

Kingdom:
3

Hierarchy/examples:
2

The exact distribution must be calculated dynamically.

Do not hardcode these numbers.

==================================================
6. CONCEPT COVERAGE
==================================================

Each topic should contain multiple concepts.

For example:

Binomial nomenclature:

- Generic name
- Specific epithet
- Capitalization
- Italics
- Handwritten underlining
- Author citation
- Mangifera indica

Generate different questions testing different concepts.

Do NOT generate:

20 questions asking the same thing in slightly different words.

==================================================
7. QUESTION VARIETY
==================================================

Within the requested question count, vary:

Concept-based
Statement-based
Application
Classification
Example-based
Sequence/order
Match-type where appropriate
Assertion-reason where appropriate
Case-based where appropriate

But:

DO NOT generate question types that are not appropriate
for the selected exam.

==================================================
8. NEET POOL
==================================================

If NEET is selected:

Generate NEET-suitable questions.

Focus on:

NCERT-aligned concepts
Important facts
Conceptual traps
Statement-based questions
Application of concepts
Closely related options
Competitive-level distractors

Every question must remain supported by the source material.

==================================================
9. CBSE POOL
==================================================

If CBSE selected:

Generate:

NCERT-based
Conceptual
Understanding-based
Application-based
Competency-oriented where appropriate
Case-based where appropriate

==================================================
10. RBSE POOL
==================================================

If RBSE selected:

Generate questions suitable for the selected RBSE
curriculum/content available to the system.

Do NOT assume CBSE and RBSE are identical.

If alignment cannot be confidently determined:

Flag for admin review.

==================================================
11. ONE MASTER QUESTION BANK
==================================================

Do NOT create duplicate questions for every exam.

One question can have:

NEET ✓
CBSE ✓
RBSE ✓

Example:

Question #5001

Exam suitability:

NEET
CBSE
RBSE

This question can be used by all three pools.

==================================================
12. DUPLICATE CONTROL
==================================================

Every generated batch must be checked against:

Existing database questions
Previous batches
Current batch

Use:

Exact duplicate detection

AND

Semantic similarity detection.

Example:

Question A:
Similarity = 94%

Question B:
Similarity = 38%

94%:

Possible Duplicate

38%:

Unique

The threshold must be configurable.

==================================================
13. REPLACEMENT SYSTEM
==================================================

This is VERY IMPORTANT.

Suppose:

Requested:
100

Generated:
100

After quality check:

Valid:
87

Duplicates:
8

Rejected:
5

Final:
87

DO NOT finish.

Automatically request:

13 replacement questions.

Then validate them again.

Continue until:

100 VALID UNIQUE QUESTIONS

or the source genuinely cannot support more.

==================================================
14. PREVENT INFINITE LOOP
==================================================

Maximum generation attempts:

Configurable.

Example:

Requested:
100

Attempts:
10 batches

If the system determines that the source cannot safely
support additional unique questions:

Stop and show:

"Only 93 high-quality unique questions could be generated
from this source without repeating concepts."

Do NOT generate low-quality or hallucinated questions just
to reach the requested number.

==================================================
15. SOURCE-GROUNDED QUESTIONS
==================================================

Every question must have:

sourceDocumentId
sourceVersion
sourcePage
sourceSection
sourceConcept

Admin can click:

View Source

and see where the concept came from.

For example, the PDF describes binomial nomenclature,
including generic name, specific epithet and naming rules
on page 4. 

The question generator should be able to trace questions
back to this material.

==================================================
16. QUESTION QUALITY CHECK
==================================================

Before a question enters the final pool:

Check:

✓ Question complete
✓ 4 valid options where applicable
✓ Correct answer exists
✓ Only one correct answer for single-correct MCQ
✓ Explanation matches answer
✓ No contradictory explanation
✓ Topic valid
✓ Source support exists
✓ Exam suitability valid
✓ Difficulty valid
✓ No duplicate
✓ No ambiguous wording
✓ No broken formatting
✓ No hallucinated fact

Failed questions:

→ Reject

Then automatically generate replacement.

==================================================
17. DIFFICULTY DISTRIBUTION
==================================================

If:

Difficulty = Auto

Create a balanced distribution based on selected exam.

Example:

Easy:
30%

Medium:
50%

Hard:
20%

Make this configurable.

Do NOT hardcode one distribution forever.

==================================================
18. GENERATION JOB UI
==================================================

Admin should see real progress.

Example:

AI CONTENT FACTORY

The Living World

Generating Questions

████████████░░░░ 68%

68 / 100 valid questions

Batch:
4 / 5

Current:

Generating Taxonomic Categories...

Then show:

Generated:
80

Valid:
68

Duplicates:
7

Rejected:
5

Remaining:
32

==================================================
19. BATCH FAILURE RECOVERY
==================================================

If Batch 3 fails:

DO NOT lose:

Batch 1
Batch 2

Retry only failed batch.

Example:

Batch 3:
Failed

Reason:
Provider timeout

[Retry Batch]

==================================================
20. API LIMIT HANDLING
==================================================

If AI provider returns:

Rate limit
Quota exceeded
Timeout
Temporary error

Handle gracefully.

Do NOT automatically switch to a paid provider.

Show:

"AI provider limit reached."

Keep generated questions safe.

Allow:

Resume Job
Retry Later

==================================================
21. FREE-TIER SAFETY
==================================================

The system must work with a free-tier AI provider where
available.

IMPORTANT:

Never assume unlimited free generation.

Admin must explicitly configure:

Provider
API key
Model
Daily limit

If daily limit is reached:

Pause generation.

No unexpected paid API calls.

==================================================
22. RESUME GENERATION
==================================================

If admin closes the browser:

Generation must continue server-side where supported.

When admin returns:

Show:

The Living World

Generation:

72 / 100

[Resume / View Job]

Do not start from zero.

==================================================
23. QUESTION COUNT MUST BE EXACT
==================================================

Admin requests:

50

Final:

50 valid unique questions

Admin requests:

100

Final:

100 valid unique questions

Admin requests:

250

Final:

250 valid unique questions

unless the system genuinely determines that the source
cannot safely support the requested amount.

==================================================
24. EXISTING QUESTIONS MUST BE INCLUDED
==================================================

When generating a new batch:

Check the entire PREPORA question database.

Do not create questions that already exist.

Also compare against previously generated batches
from the same PDF.

==================================================
25. GENERATION MODES
==================================================

Provide:

QUICK

Generate smaller set quickly.

STANDARD

Balanced question generation.

DEEP

Maximum topic/concept coverage with stronger quality
checking.

Example:

Quick:
25

Standard:
100

Deep:
200+

Admin can still enter custom count.

==================================================
26. "GENERATE MORE" BUTTON
==================================================

After a chapter is published:

Show:

Questions:
100

[Generate 25 More]

When clicked:

AI analyzes existing questions first.

Then generates:

25 NEW questions

without repeating existing concepts unnecessarily.

==================================================
27. QUESTION COVERAGE DASHBOARD
==================================================

After generation:

Show:

Total:
100

Unique:
91

Pending Review:
9

Topics Covered:
17 / 18

Concepts Covered:
42 / 47

NEET:
78

CBSE:
84

RBSE:
71

These are suitability counts and may overlap.

==================================================
28. FINAL PIPELINE
==================================================

PDF
↓
Extract
↓
Understand
↓
Knowledge Map
↓
Topic Detection
↓
Concept Detection
↓
Question Blueprint
↓
Batch Generation
↓
Source Validation
↓
Answer Validation
↓
Quality Check
↓
Duplicate Check
↓
Exam Classification
↓
Difficulty Classification
↓
Replacement Generation
↓
Final Question Pool
↓
Admin Review
↓
Approve
↓
Publish

==================================================
29. IMPORTANT
==================================================

NEVER do this:

PDF
↓
AI
↓
25 questions
↓
DONE

Instead:

PDF
↓
AI Planning
↓
Batch 1
↓
Validation
↓
Batch 2
↓
Validation
↓
Batch 3
↓
Validation
↓
...
↓
Requested Count Reached
↓
Final Quality Check
↓
Admin Review

==================================================
30. FINAL ACCEPTANCE TEST
==================================================

Test with the uploaded Biology chapter:

The Living World

Request:

100 questions

Expected behavior:

The system should NOT stop after 25.

It should automatically continue generating batches,
checking them and replacing duplicates/rejected questions.

Final target:

100 valid unique questions.

Also verify topic coverage across the chapter.

Do NOT simply repeat the same concept 100 times.

==================================================
31. IMPORTANT EXISTING FUNCTIONALITY
==================================================

Do not break:

Admin Panel
PDF Upload
Question Database
Question Review
Tests
Practice
NEET
CBSE
RBSE
Search
Analytics
Duplicate Detection
Question Versioning

Integrate the new batch-generation engine into the
existing PREPORA architecture.

FIRST inspect the existing implementation.

Then modify only what is required.

Do NOT rewrite the entire project unnecessarily.
==================================================
🔥 MINIMUM 400 QUESTIONS PER CHAPTER
==================================================

CRITICAL REQUIREMENT:

For every sufficiently detailed chapter PDF, PREPORA should
target a MINIMUM of 400 high-quality, unique questions.

Example:

Admin uploads:

Biology
Class 11
The Living World.pdf

System target:

400 QUESTIONS MINIMUM

The AI must NOT stop at:

25
50
100
200

simply because one generation request is complete.

The generation system must continue automatically using
multiple batches.

==================================================
1. GENERATION TARGET
==================================================

Default:

Minimum:
400

Admin options:

400
500
750
1000
Custom

Example:

[ 400 Questions ]

If admin selects 400:

Target = 400 VALID UNIQUE QUESTIONS

==================================================
2. BATCH GENERATION
==================================================

NEVER request 400 questions from the AI in one API call.

Use batches.

Recommended:

Batch size:
10–25 questions

Example:

400 requested

Batch 1 → 20
Batch 2 → 20
Batch 3 → 20
...
Batch 20 → 20

But batch size must be dynamically adjusted according to
the AI provider's actual limits.

==================================================
3. VALID QUESTION COUNT
==================================================

IMPORTANT:

"Generated" does NOT mean "valid".

Example:

Generated:
450

Duplicates:
25

Rejected:
18

Quality failed:
7

Valid:
400

Only then:

STATUS = COMPLETE

The system must count only valid, unique, approved-for-review
questions toward the target.

==================================================
4. AUTOMATIC REPLACEMENT
==================================================

Example:

Target:
400

Generated:
400

After validation:

Valid:
340

Duplicate:
35

Rejected:
25

Then automatically generate:

60 replacement questions.

Continue validation.

If:

Valid:
390

Generate:

10 more.

Continue until:

VALID UNIQUE = 400

==================================================
5. TOPIC COVERAGE
==================================================

Before generating questions:

First analyze the complete PDF.

Create:

Chapter
↓
Sections
↓
Topics
↓
Subtopics
↓
Concepts

Then create a question-generation blueprint.

DO NOT randomly generate 400 questions.

Every major concept should receive appropriate coverage.

==================================================
6. QUESTION DIVERSITY
==================================================

400 questions must contain meaningful variation.

Generate combinations of:

Concept-based
Fact-based
Understanding-based
Application-based
Statement-based
Multiple-statement
Comparison
Classification
Example-based
Sequence/order
Assertion-Reason where appropriate
Match-the-following where appropriate
Case-based where appropriate
Diagram/data-based where supported
NCERT-line/concept interpretation
Common-confusion questions

Do NOT generate the same question with only
different wording.

==================================================
7. DIFFICULTY DISTRIBUTION
==================================================

Default automatic distribution:

Easy:
30%

Medium:
50%

Hard:
20%

For 400:

Easy ≈ 120
Medium ≈ 200
Hard ≈ 80

BUT:

This must be configurable.

The AI should also consider the actual chapter content.

==================================================
8. EXAM DISTRIBUTION
==================================================

The master question bank should support:

NEET
CBSE
RBSE

One question may belong to multiple exams.

Example:

Question #1024

NEET ✓
CBSE ✓
RBSE ✓

Do NOT create three identical copies.

==================================================
9. NEET QUESTION COVERAGE
==================================================

For NEET-suitable questions:

Focus on:

- Core chapter concepts
- Important facts
- Conceptual understanding
- Statement-based reasoning
- Closely related distractors
- Application where supported
- Common exam traps
- NCERT-aligned content

Every question must remain supported by the source.

==================================================
10. CBSE QUESTION COVERAGE
==================================================

For CBSE:

Generate suitable combinations of:

- Conceptual questions
- Understanding
- Application
- Competency-oriented questions where appropriate
- Case-based questions where appropriate
- Important definitions
- Classification/comparison
- Source-supported interpretation

==================================================
11. RBSE QUESTION COVERAGE
==================================================

For RBSE:

Generate only where the source/curriculum information
supports the classification.

Do NOT assume:

CBSE = RBSE

If confidence is insufficient:

RBSE suitability:
"Needs Review"

==================================================
12. 400 QUESTIONS MUST COVER THE WHOLE CHAPTER
==================================================

IMPORTANT:

Do not generate:

300 questions from first 20% of chapter
and
100 questions from remaining content.

First analyze content density.

Then distribute questions proportionally.

Example:

Topic A:
12%

Topic B:
18%

Topic C:
25%

Topic D:
15%

Topic E:
30%

Question distribution should approximately reflect
concept/content importance.

==================================================
13. CONCEPT DIVERSITY CHECK
==================================================

For every question store:

conceptId
topicId
subtopicId

Before accepting a new question:

Check whether too many existing questions are testing
the same concept in the same way.

If overrepresented:

AI should move to an under-covered concept.

==================================================
14. 400 QUESTIONS QUALITY GATE
==================================================

Every question must pass:

✓ Source support
✓ Correct answer
✓ Option validation
✓ Explanation validation
✓ Topic validation
✓ Exam suitability
✓ Difficulty validation
✓ Duplicate check
✓ Semantic similarity check
✓ Formatting check
✓ No hallucination
✓ No ambiguous answer

Only valid questions count toward 400.

==================================================
15. QUESTION QUALITY TIERS
==================================================

Internally classify:

A — High Quality
B — Acceptable
C — Needs Review
D — Reject

Only:

A + B

should normally enter the admin review queue.

C:

Needs manual review.

D:

Reject and regenerate.

==================================================
16. NEVER LOWER QUALITY TO REACH 400
==================================================

THIS IS CRITICAL.

If the chapter genuinely does not contain enough
independent concepts to safely produce 400 questions:

DO NOT create fake/repetitive questions just to reach 400.

Instead show:

"400 unique high-quality questions could not be safely
generated from this source without excessive repetition."

Show:

Valid Questions:
372

Recommended Action:

Upload additional authorized source material
OR
Generate more with broader curriculum context.

==================================================
17. "GENERATE MORE" SYSTEM
==================================================

After 400 questions:

Show:

Question Bank:
400

Button:

[ + Generate 50 More ]

If clicked:

The system MUST first analyze all existing 400 questions.

Then generate 50 NEW questions.

Do not repeat existing questions.

==================================================
18. CHAPTER QUESTION COUNTER
==================================================

Every chapter should display:

Total Questions:
400

NEET:
XXX

CBSE:
XXX

RBSE:
XXX

Easy:
XXX

Medium:
XXX

Hard:
XXX

Approved:
XXX

Pending:
XXX

Rejected:
XXX

Duplicates:
XXX

==================================================
19. GENERATION PROGRESS
==================================================

Show real-time progress.

Example:

THE LIVING WORLD

Generating Question Bank

━━━━━━━━━━━━━━━━━━ 73%

292 / 400 valid questions

Current Batch:
15 / 20

Topics Covered:
18 / 19

Quality Checks:
✓

Duplicate Checks:
✓

Remaining:
108

Do NOT show:

"Generating 400 questions..."

with no progress information.

==================================================
20. BACKGROUND JOB
==================================================

400-question generation must run as a background job.

Admin should be able to:

Leave page
Close browser
Return later

The job should retain its state.

Example:

AI Job #2048

292 / 400

Status:
Running

==================================================
21. FAILED BATCH RECOVERY
==================================================

If:

Batch 11 fails

DO NOT restart the entire generation.

Keep:

Batch 1–10

Retry only:

Batch 11

If provider temporarily reaches quota:

Pause job safely.

Allow:

Resume

==================================================
22. AI PROVIDER LIMITS
==================================================

Do NOT assume unlimited free API usage.

The system must:

- Respect provider rate limits
- Respect token limits
- Respect daily quotas
- Retry temporary failures
- Pause on quota exhaustion
- Never automatically trigger paid usage

Admin must be able to configure:

Daily question generation limit.

==================================================
23. 400 QUESTIONS SHOULD BE ORIGINAL
==================================================

Do NOT copy the PDF directly.

Use the PDF as the knowledge/source material.

Generate original questions.

Do not reproduce long textbook passages.

Every question should have a source reference for admin
verification.

==================================================
24. SOURCE TRACEABILITY
==================================================

Each question:

sourceDocumentId
sourceVersion
sourcePage
sourceSection
sourceConcept

Admin can:

View Source

and inspect the relevant PDF location.

==================================================
25. FINAL GENERATION ALGORITHM
==================================================

IMPLEMENT THIS LOGIC:

target = 400

analyzePDF()

createKnowledgeMap()

createTopicBlueprint()

WHILE validUniqueQuestions < target:

    generateNextBatch()

    validateQuestions()

    detectDuplicates()

    classifyExam()

    classifyDifficulty()

    checkConceptCoverage()

    rejectInvalidQuestions()

    saveValidQuestions()

    calculateRemaining()

    if temporaryAPIError:
        retryBatch()

    if providerQuotaReached:
        pauseJob()

    if maximumAttemptsReached:
        evaluateSourceCapacity()

END WHILE

runFinalQualityCheck()

createAdminReviewQueue()

==================================================
26. FINAL RULE
==================================================

The system is NOT COMPLETE when:

"AI generated 25 questions."

The system is COMPLETE when:

"400 valid, unique, source-supported questions are ready
for admin review."

OR, if 400 cannot be responsibly supported:

"Maximum safe question capacity reached."

Never sacrifice educational quality merely to display
the number 400.