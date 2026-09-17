PREPORA — COMPLETE 100K+ QUESTION + FULL WEBSITE QA AUDIT + REAL PREVIOUS PAPER VERIFICATION
=============================================================================================

IMPORTANT:

You are NOT doing a small UI fix.

You must perform a COMPLETE END-TO-END AUDIT of the existing PREPORA website.

The goal is:

1. 100,000+ VALID questions system
2. Correct Easy / Medium / Hard filtering
3. Correct Test Builder
4. Correct Practice system
5. Correct Previous Papers system
6. Correct Performance/Analytics
7. Correct Admin Panel
8. Correct Login Activity
9. Correct AI Content Factory
10. Correct mobile + desktop UI
11. Complete regression testing of the ENTIRE website

DO NOT claim something is fixed unless you actually test it.

DO NOT use fake data.

DO NOT use fake progress.

DO NOT use fake question counts.

DO NOT assume a feature works because the UI exists.

=============================================================================================
PHASE 1 — COMPLETE CODEBASE AUDIT
=============================================================================================

First inspect the entire project.

Inspect:

- Frontend
- Backend
- APIs
- Database
- Database schema
- Authentication
- Authorization
- Admin panel
- Student panel
- Question Bank
- Test Builder
- Practice
- Previous Papers
- Model Papers
- AI Content Factory
- AI Doubt Solver
- Search
- Filters
- Performance
- Analytics
- Mistake Book
- Revision
- Fix My Weakness
- Dashboard
- Profile
- Settings
- Notifications
- Reports
- Doubts
- Mobile navigation
- Desktop navigation
- Loading states
- Error states
- Empty states
- Network recovery
- Autosave
- Pagination
- Sorting
- Caching

Find ROOT CAUSES.

Do not only patch visible symptoms.

=============================================================================================
PHASE 2 — 100,000+ QUESTION SYSTEM
=============================================================================================

PREPORA must support 100,000+ VALID questions platform-wide.

IMPORTANT:

"100,000+" means:

100,000+ VALID + UNIQUE + CORRECT + PUBLISHABLE questions.

Do NOT count:

- Duplicates
- Invalid questions
- Broken questions
- Missing-answer questions
- Rejected questions
- Unverified questions
- Deleted questions
- Fake placeholder records

Every question must contain valid metadata:

- questionId
- questionVersion
- subject
- class
- exam
- chapter
- topic
- difficulty
- questionType
- contentType
- questionText
- options where applicable
- correctAnswer
- explanation
- solution where required
- source
- verificationStatus
- createdAt
- updatedAt

Use background jobs for large-scale generation/import.

Generation must be resumable.

If generation stops at 62,000:

Resume from 62,001.

Never restart unnecessarily.

=============================================================================================
PHASE 3 — QUESTION DIFFICULTY
=============================================================================================

Canonical difficulty values:

EASY
MEDIUM
HARD

Normalize all old records.

Never treat:

easy
Easy
Easy 
EASY

as separate values.

Same for Medium and Hard.

Invalid difficulty:

NEEDS_REVIEW

Do not randomly assign difficulty.

Default AI generation target:

30% EASY
50% MEDIUM
20% HARD

But count only VALID UNIQUE questions.

Show actual inventory.

Example:

Total: 100,000
Easy: 30,200
Medium: 49,500
Hard: 20,300

Never fake these values.

=============================================================================================
PHASE 4 — FULL FILTER TESTING
=============================================================================================

TEST EVERY FILTER.

Do not just inspect code.

Actually execute test cases.

Test:

- All Subjects
- Physics
- Chemistry
- Biology
- Mathematics where applicable
- All Chapters
- Individual Chapter
- All Topics
- Individual Topic
- Easy
- Medium
- Hard
- All Difficulties
- Question Type
- Exam
- Class
- Content Type
- Published status
- Search

Then test combinations:

Subject + Difficulty

Chapter + Difficulty

Topic + Difficulty

Subject + Chapter

Subject + Chapter + Topic

Subject + Chapter + Difficulty

Subject + Topic + Difficulty

Search + Difficulty

Search + Subject

Search + Chapter

Search + Topic

Search + Difficulty + Subject + Chapter + Topic

Every selected filter must apply using correct AND logic.

=============================================================================================
PHASE 5 — HARD / MEDIUM / EASY TEST BUILDER
=============================================================================================

This is CRITICAL.

Open Test Builder and actually create tests.

Test:

10 Easy
10 Medium
10 Hard

Then:

20 Easy
20 Medium
20 Hard

Then:

50 Easy
50 Medium
50 Hard

Then larger valid quantities based on inventory.

For every test verify:

- Correct number of questions
- Correct difficulty
- Correct subject
- Correct chapter
- Correct topic
- Correct exam
- Correct contentType
- No duplicate question
- No wrong difficulty
- No model paper accidentally included
- No PYQ accidentally included
- No random unrelated topic included

Example:

User selects:

Physics
Kinematics
Hard
50 Questions

System must first calculate:

eligibleCount

If eligibleCount = 73:

Allow 50.

If eligibleCount = 31:

DO NOT silently give 20.

Show:

"31 Hard questions available."

Options:

[Practice 31]

[Generate 19 More]

Never change Hard to Medium/Easy automatically.

Never duplicate questions.

=============================================================================================
PHASE 6 — DATABASE FILTER VS FRONTEND FILTER
=============================================================================================

Filtering must happen at database/API level.

Correct:

FILTER
→ COUNT
→ RANDOMIZE/SORT
→ SELECT
→ PAGINATE

NOT:

FETCH RANDOM QUESTIONS
→ FILTER IN FRONTEND
→ SHOW WHATEVER REMAINS

Verify API response against database counts.

If database says:

Hard = 82

API must correctly return:

82 eligible questions.

Frontend must display:

82.

Test all three layers.

DATABASE
↓
API
↓
FRONTEND

=============================================================================================
PHASE 7 — QUESTION CONTENT TYPE SEPARATION
=============================================================================================

Strictly separate:

QUESTION_BANK
PYQ
MODEL_PAPER
SAMPLE_PAPER
MOCK_TEST
PRACTICE_SET
AI_GENERATED
CUSTOM_TEST

TEST THIS.

Normal Practice/Test Builder must NOT accidentally include:

- Model Papers
- Previous Year Papers

unless explicitly selected.

Previous Papers must remain separate.

Model Papers must remain separate.

AI-generated questions must remain correctly labelled.

=============================================================================================
PHASE 8 — REAL PREVIOUS YEAR PAPERS
=============================================================================================

Audit and verify real Previous Year Papers.

Supported categories:

- JEE Main
- JEE Advanced
- NEET UG
- CBSE
- RBSE

Use REAL papers from authoritative/official sources where available.

Do NOT:

- Invent papers
- Reconstruct missing papers with AI
- Generate fake PYQs
- Label AI questions as PYQ
- Mix Model Papers with PYQs

For every imported paper store:

paperId
exam
year
session
date
shift
paperNumber
class
subject
language
setCode
contentType
sourceType
sourceURL
sourceDocument
rightsStatus
verificationStatus
questionCount
answerKeyStatus
createdAt

Before publishing:

Verify source.

Verify document.

Verify year.

Verify exam.

Verify question count.

Verify paper identity.

Verify answer key if available.

=============================================================================================
PHASE 9 — PREVIOUS PAPER INVENTORY CHECK
=============================================================================================

After importing Previous Papers, generate an exact inventory.

Example format:

JEE MAIN
2020:
- Session 1: ...
- Session 2: ...
- Available shifts/papers: ...

2021:
...

JEE ADVANCED
2020:
- Paper 1
- Paper 2

2021:
- Paper 1
- Paper 2

...

NEET
2020:
- Set(s) actually imported

...

CBSE
2020:
- Class
- Subject
- Paper

...

RBSE
2020:
- Class
- Subject
- Paper

...

IMPORTANT:

Only list papers that ACTUALLY exist in the PREPORA database after verification.

Do NOT say:

"2020–2026 added"

unless the individual papers have actually been imported and verified.

If something is missing, explicitly write:

NOT ADDED / NOT VERIFIED / SOURCE ONLY / RIGHTS REVIEW REQUIRED

=============================================================================================
PHASE 10 — PREVIOUS PAPER PAGE TEST
=============================================================================================

Open Previous Papers page.

Test filters:

Exam
Year
Session
Date
Shift
Paper
Subject
Class
Language
Set/Code

Test:

JEE Main
JEE Advanced
NEET
CBSE
RBSE

Verify that filtering does not mix papers.

Open several actual papers.

Verify:

- PDF/document opens
- Questions visible
- Correct order
- Options preserved
- Images preserved
- Question count correct
- Answer key mapping correct where available
- Paper metadata correct

=============================================================================================
PHASE 11 — ADMIN PANEL AUDIT
=============================================================================================

Test every Admin Panel section.

Dashboard
AI Content Factory
Question Bank
Test Builder
Previous Papers
Model Papers
Students
Reports
Doubts
Analytics
Syllabus
AI Studio
System Status
Security
Admins
Settings

Every page must:

- Load
- Filter
- Search
- Sort
- Paginate
- Save
- Edit
- Delete where permitted
- Show loading state
- Show error state
- Show empty state

Do not leave broken buttons.

Do not leave fake counters.

=============================================================================================
PHASE 12 — ADMIN LOGIN ACTIVITY
=============================================================================================

Verify Login Activity.

Admin must see real:

- User name
- Email
- User ID
- Role
- Login time
- Last active
- Device
- OS
- Browser
- Session
- IP
- Login status
- Logout where available

Do not expose:

- Passwords
- API keys
- Auth tokens
- Sensitive secrets

Test:

Student login
Admin login
Failed login
Logout
Multiple sessions

Verify records are actually created in database.

=============================================================================================
PHASE 13 — STUDENT PRACTICE SYSTEM
=============================================================================================

Actually use the student flow.

Test:

Subject
→ Chapter
→ Topic
→ Difficulty
→ Number of Questions
→ Start Practice

Verify every step.

Test:

All Topics

Make sure ALL supported topics appear.

No missing topics.

No duplicate topics.

No unrelated topics.

Test:

Easy
Medium
Hard

and verify actual questions match selection.

=============================================================================================
PHASE 14 — SEARCH
=============================================================================================

Test question search.

Search:

- Exact question
- Partial question
- Keyword
- Subject
- Chapter
- Topic
- Difficulty

Combine search with filters.

Verify results are actually relevant.

No random unrelated questions.

=============================================================================================
PHASE 15 — PERFORMANCE PAGE
=============================================================================================

Actually attempt questions and tests.

Then verify Performance.

Check:

- Attempted
- Correct
- Incorrect
- Skipped
- Accuracy
- Average time
- Subject performance
- Chapter performance
- Topic performance
- Difficulty performance
- Test history
- Practice history
- Mistakes
- Repeated mistakes
- Mastery
- Readiness

Numbers must come from deterministic database calculations.

AI must NOT invent statistics.

Test:

Easy performance

Medium performance

Hard performance

Subject performance

Chapter performance

Topic performance

=============================================================================================
PHASE 16 — MISTAKE + FIX MY WEAKNESS
=============================================================================================

Actually answer questions incorrectly.

Verify:

Mistake Book

Repeated Mistake Detection

Weak Topic Detection

Fix My Weakness

Recommended Practice

Retest

The loop must work:

WRONG
→ MISTAKE
→ ANALYZE
→ WEAKNESS
→ TARGETED PRACTICE
→ RETEST

Verify the recommended questions actually match the weakness.

=============================================================================================
PHASE 17 — AI DOUBT SOLVER
=============================================================================================

Test multiple question types:

- Simple theory
- Physics numerical
- Chemistry numerical
- Biology theory
- Formula question
- Derivation
- Conceptual question
- Image-based question where supported

Verify:

- Correct subject detection
- Correct chapter detection
- Correct answer
- Correct formula
- Correct calculation
- Proper math rendering
- No raw LaTeX
- No fake "Grounded in PREPORA"
- Correct source state

Possible source states:

PREPORA_GROUNDED
GENERAL_AI
WEB_VERIFIED
MIXED

Do not claim PREPORA grounding unless PREPORA content was actually retrieved.

=============================================================================================
PHASE 18 — AI QUESTION VALIDATION
=============================================================================================

Every AI-generated question must pass:

Question validation
Answer validation
Math validation
Duplicate detection
Semantic duplicate detection
Difficulty validation
Topic validation
Source validation
Formatting validation

MCQ:

Exactly ONE correct answer.

Numerical:

Independent calculation check.

If validation fails:

REJECT

or

REGENERATE.

Never publish blindly.

=============================================================================================
PHASE 19 — MOBILE TESTING
=============================================================================================

Test the entire website on:

360px
375px
390px
412px

Check:

- No horizontal overflow
- No clipped text
- No broken tables
- No broken charts
- No inaccessible buttons
- No filter overflow
- Bottom navigation
- Modals
- Test Builder
- Previous Papers
- Admin pages
- Performance
- Question cards

Desktop also:

1024
1280
1440+

=============================================================================================
PHASE 20 — NAVIGATION TEST
=============================================================================================

Click every important navigation item.

Verify:

No dead links.

No blank pages.

No incorrect route.

No accidental redirect.

No broken back button.

No lost state where state should persist.

=============================================================================================
PHASE 21 — NETWORK / ERROR TESTING
=============================================================================================

Test:

Slow network
Failed API
Timeout
Refresh
Back button
Double click
Page reload during generation
Page reload during test
Temporary network loss

Verify:

No lost test attempt.

No duplicate submission.

No corrupted question generation job.

Autosave where required.

Retry where appropriate.

=============================================================================================
PHASE 22 — SECURITY TEST
=============================================================================================

Test role permissions.

Student cannot access admin APIs.

Reviewer cannot perform Super Admin actions.

Content Admin cannot perform unauthorized security actions.

Do not rely only on frontend hiding.

Authorization must happen server-side.

Check:

- API authorization
- Admin routes
- Database access
- IDOR risks
- Input validation
- File upload validation
- Rate limiting where needed
- Secret exposure

=============================================================================================
PHASE 23 — UI QUALITY AUDIT
=============================================================================================

After functional testing, inspect design.

PREPORA should remain:

Premium
Clean
Academic
Professional
Fast
Mobile-first

Use the existing monochrome design direction.

Avoid:

- Excessive purple
- Excessive gradients
- Excessive glassmorphism
- Childish/gaming UI
- Too many cards
- Huge empty spaces
- Inconsistent typography

Fix:

Spacing
Typography
Alignment
Buttons
Forms
Tables
Charts
Empty states
Loading states
Error states

=============================================================================================
PHASE 24 — PERFORMANCE
=============================================================================================

Check:

- Page loading
- API response time
- Database queries
- Large question-bank queries
- Pagination
- Search
- Filtering
- Test generation
- AI jobs
- Previous Paper loading

Do not load 100,000 questions into browser memory.

Use:

Server-side filtering
Pagination
Indexes
Efficient queries
Caching where appropriate

=============================================================================================
PHASE 25 — FINAL REGRESSION TEST
=============================================================================================

After all fixes, run the entire flow again.

STUDENT:

Login
→ Dashboard
→ Practice
→ Filter
→ Test Builder
→ Start Test
→ Submit
→ Analysis
→ Mistake Book
→ Fix My Weakness
→ Revision
→ Retest
→ Performance
→ Previous Papers
→ Doubt Solver
→ Search

ADMIN:

Login
→ Dashboard
→ Question Inventory
→ Filters
→ Question Review
→ AI Content Factory
→ Generate
→ Validate
→ Approve
→ Publish
→ Previous Papers
→ Model Papers
→ Students
→ Login Activity
→ Analytics
→ Reports
→ Settings

Do not skip steps.

=============================================================================================
PHASE 26 — FINAL REPORT
=============================================================================================

At the VERY END provide a complete audit report.

SECTION 1 — OVERALL RESULT

- Total issues found
- Critical issues
- Major issues
- Minor issues
- Fixed issues
- Remaining issues

SECTION 2 — QUESTION INVENTORY

Give REAL database numbers:

Total valid questions:
Easy:
Medium:
Hard:

Also:

Published:
Pending:
Draft:
Rejected:
Duplicates:

Breakdown by:

Exam
Subject
Chapter
Topic
Difficulty
Content Type

SECTION 3 — TEST BUILDER RESULTS

Report actual tests performed:

Easy tests:
Medium tests:
Hard tests:
Mixed difficulty tests:
50-question tests:
Insufficient inventory tests:

For every failed test:

Expected
Actual
Root Cause
Fix

SECTION 4 — FILTER TEST RESULTS

List every filter tested.

Example:

Physics + Hard — PASS
Chemistry + Medium — PASS
Biology + Easy — PASS
Physics + Kinematics + Hard — PASS
Search + Hard — PASS

Do NOT write PASS unless actually tested.

SECTION 5 — PREVIOUS PAPERS — MANDATORY

This section is extremely important.

Give an EXACT list of Previous Papers that were ACTUALLY ADDED.

For each:

Exam
Year
Session
Date
Shift
Paper
Subject
Class
Set/Code
Question Count
Source
Verification Status
Answer Key Status
Rights Status

Separate:

JEE MAIN
JEE ADVANCED
NEET UG
CBSE
RBSE

Also provide:

NOT ADDED
NOT VERIFIED
SOURCE ONLY
RIGHTS REVIEW REQUIRED

Do not hide missing papers.

Do not claim a year is complete unless all intended papers for that year/category were actually verified/imported.

SECTION 6 — ADMIN LOGIN ACTIVITY

Confirm whether:

Login recording works
Logout recording works
Failed login recording works
Device detection works
Browser detection works
Admin filtering works

SECTION 7 — PERFORMANCE

Report whether:

Accuracy
Time
Mistakes
Mastery
Readiness
Weakness
Retest

were tested against real attempt data.

SECTION 8 — MOBILE

Report:

360
375
390
412

PASS/FAIL for major flows.

SECTION 9 — SECURITY

Report:

Authentication
Authorization
Admin permissions
API protection
Secret protection

SECTION 10 — REMAINING ISSUES

Clearly list anything that still needs work.

FINAL RULE:

Never say:

"Everything is fixed"

unless the complete regression test was actually executed.

Never invent test results.

Never invent question counts.

Never invent Previous Papers.

Never invent verification status.

Use REAL database/system data only.