PREPORA — PHASE 1 MAJOR FEATURE EXPANSION

IMPORTANT:
Update the EXISTING PREPORA prototype.

DO NOT rebuild the website from scratch.
DO NOT change the existing overall visual identity.
DO NOT remove existing functionality.

Keep:
- Existing navigation
- Existing responsive design
- Existing test engine
- Existing practice engine
- Existing result system
- Existing PREPORA branding
- Existing purple/white premium UI

This is an ADDITIVE UPDATE.

The main objective is:

MAKE PREPORA A COMPLETE STUDENT STUDY ECOSYSTEM.

A student should be able to come to PREPORA and handle most of their daily preparation from one place:

LEARN
→ REVISE
→ PRACTICE
→ ASK DOUBTS
→ TAKE TEST
→ ANALYZE
→ FIND WEAKNESS
→ FIX WEAKNESS
→ REVISE MISTAKES
→ RETEST
→ TRACK PROGRESS

Do NOT integrate Supabase yet.
Do NOT integrate real AI APIs yet.
Do NOT integrate payment.
Do NOT integrate real ads.
Do NOT use copyrighted content.

Use realistic mock data and localStorage/local state.

==================================================
1. SMART DAILY PLAN
==================================================

Add:

"Today's Plan"

The student should not have to decide everything manually.

Example:

TODAY'S PLAN
75 minutes

1. Physics — Kinematics
20 Questions
20 min
Status: Pending

2. Chemistry — Chemical Bonding
15 Questions
15 min
Status: Pending

3. Biology — Cell
20 Questions
20 min
Status: Pending

4. Mini Test
20 Questions
20 min

Buttons:

Start
Continue
Completed

The plan should be generated using the student's mock:

- Weak topics
- Pending revision
- Recent mistakes
- Upcoming test
- Selected exam
- Class

Use rule-based logic in Phase 1.

Do NOT call it AI.

==================================================
2. CHAPTER MASTERY
==================================================

Every chapter should have a Mastery Score.

Example:

KINEMATICS

Mastery:
64%

Concept:
72%
Accuracy:
68%
Speed:
51%
Hard Questions:
39%

Topics:

Distance & Displacement — 82% 🟢
Velocity — 71% 🟡
Graphs — 43% 🔴
Relative Motion — 38% 🔴

Buttons:

Practice
Chapter Test
Formula Sheet
Flashcards
PYQ
Fix Weak Topics

Calculate mastery using available mock attempt data.

Do NOT hardcode fake student analytics.

==================================================
3. REPEATED MISTAKE DETECTION
==================================================

Extend Mistake Book.

If the same topic/question concept has multiple mistakes:

Show:

⚠️ REPEATED MISTAKE

"You made mistakes in this concept 4 times."

Show:

Topic
Mistake count
Last mistake
Most common mistake reason

Example:

Electrostatics
4 mistakes

Calculation Error — 2
Concept Not Clear — 1
Misread Question — 1

Button:

FIX THIS CONCEPT

Click:

5 Easy Questions
↓
5 Medium Questions
↓
Mini Retest

==================================================
4. STEP-BY-STEP SOLUTION SYSTEM
==================================================

Improve explanations.

Every solved question should support:

Question

Given

Find

Concept

Formula

Why this formula?

Step 1
Step 2
Step 3

Final Answer

Common Mistake

Shortcut / Exam Tip

Difficulty

Do not just show the final answer.

For numerical questions especially:

Given:
...

Formula:
...

Substitution:
...

Answer:
...

Use demo content.

==================================================
5. RE-ATTEMPT SYSTEM
==================================================

Mistake Book must support:

"Retry Without Solution"

When retrying:

Hide previous answer.
Hide previous explanation.

Student solves again.

After submission show:

FIRST ATTEMPT
Wrong
Time: 2m 10s

SECOND ATTEMPT
Correct
Time: 58s

Improvement:

Accuracy improved
Time improved

Store attempt history locally.

==================================================
6. QUESTION DECISION TRAINING
==================================================

Add a post-test analysis:

"Should you have skipped this question?"

For questions with excessive time:

Show:

🟡 Time Drainer

"You spent 3m 40s on this question."

Recommended:
1m 20s

Coach:

"This question consumed too much time."

Do NOT say the student definitely should have skipped it.

Use:

"Consider attempting it later in an exam."

Also track:

Correct + Too Slow
Wrong + Too Much Time
Wrong + Very Fast
Unattempted + Time Ran Out

==================================================
7. UNATTEMPTED REASON
==================================================

When reviewing an unattempted question:

Ask:

"Why did you leave this question?"

Options:

- Ran out of time
- Concept not known
- Question looked difficult
- Could not understand
- Wanted to attempt later
- Other

Save locally.

Analytics:

Unattempted Reasons

Time shortage: 40%
Concept gap: 30%
Difficulty: 20%
Other: 10%

Use actual user-selected data.

==================================================
8. GUESS DETECTION
==================================================

Create rule-based "Possible Guess" indicator.

Example:

Wrong answer
Very low time spent

Show:

⚠️ Possible Guess

Do NOT claim certainty.

Use wording:

"Your answer pattern may indicate guessing."

Track:

Possible Guess count.

==================================================
9. STUDY SESSION MODE
==================================================

Add:

"I HAVE 20 MINUTES"

Options:

10 min
20 min
30 min
45 min
60 min

PREPORA creates a focused study session.

Example:

20 MINUTES

5 min
Formula Revision

10 min
Weak Topic Practice

5 min
Mini Quiz

Button:

START SESSION

After completing:

Session Summary

==================================================
10. SMART "WHAT SHOULD I STUDY?"
==================================================

Add prominent dashboard button:

"WHAT SHOULD I STUDY?"

When clicked:

Analyze:

- Weak topics
- Due revisions
- Recent mistakes
- Test performance
- Upcoming tests

Return:

Priority 1
Kinematics
42% mastery
HIGH PRIORITY

Priority 2
Chemical Bonding
55% mastery

Priority 3
Cell Biology
61% mastery

Button:

START RECOMMENDED PRACTICE

==================================================
11. "DON'T STUDY THIS NOW"
==================================================

If mastery is already high:

Example:

Current topic:
Units & Measurements

Mastery:
94%

Show:

🟢 Strong Topic

"Your current performance is strong here."

"Consider spending today's study time on a weaker topic."

Recommended:

Rotational Motion
43%

Do not prevent the student from studying the strong topic.

==================================================
12. EXAM READINESS SCORE
==================================================

Create:

EXAM READINESS

Example:

JEE Readiness
68 / 100

Breakdown:

Concepts: 74
Accuracy: 71
Speed: 58
Consistency: 76
Hard Questions: 49

Biggest Improvement Area:

SPEED

Recommended:

Complete:
3 Speed Practice Sessions

Use mock data and rule-based calculations.

==================================================
13. FORMULA + QUICK REVISION
==================================================

Keep the existing Formula Sheet and Flashcards feature.

Add:

"15 MIN QUICK REVISION"

Flow:

Select:
Subject
Chapter

Start

Formula Card 1/10

Flip
Know It
Need Revision

At end:

Known: 7
Need Revision: 3

Button:

Review 3 Again

==================================================
14. NOTES / PERSONAL STUDY NOTES
==================================================

Improve Notes.

Allow:

Create Note
Edit
Delete
Search

Attach note to:

Subject
Chapter
Topic

Example:

Physics
Kinematics
"My shortcut for graph questions"

Show notes inside Chapter page.

==================================================
15. DOUBT CENTER
==================================================

Add:

"DOUBT CENTER"

The student can:

Type a doubt
Paste a question
Select subject
Select chapter

Example:

Subject:
Physics

Chapter:
Kinematics

Question:
"I don't understand why velocity becomes negative here."

Buttons:

ASK DOUBT

In Phase 1:

Use predefined demo responses / mock mentor responses.

DO NOT call external AI.

Clearly label demo/mock responses if necessary.

Future Phase 2 can connect AI.

==================================================
16. PERSONAL DM / CHAT SYSTEM
==================================================

IMPORTANT:

Add a safe communication system.

Do NOT create unrestricted anonymous public chat.

Create:

MESSAGES / DM

Student can see:

Mentor
Prep Support
Study Group (future-ready)

For Phase 1 use demo conversations.

--------------------------------------------------
INBOX
--------------------------------------------------

Show:

Messages

Prepora Mentor
"Your Physics test analysis is ready."

Study Support
"Your doubt has been reviewed."

Show:

Unread count.

--------------------------------------------------
CHAT SCREEN
--------------------------------------------------

Features:

Message bubbles
Timestamp
Read status
Text input
Send button

Buttons:

Send
Attach Question

The student can send:

Text
Question reference

Example:

"I don't understand Question 12."

Attached:

Question #12 — Kinematics

The mentor can reply:

"Let's solve this step by step..."

--------------------------------------------------
IMPORTANT SAFETY / MODERATION ARCHITECTURE
--------------------------------------------------

Even though this is only a prototype, design the system for:

- Report Message
- Block User
- Delete Message
- Admin Moderation
- Abuse Report
- Spam Protection
- Message Rate Limit
- Privacy Controls

Do NOT create public student-to-student unrestricted messaging in Phase 1.

The future system should support moderated communication.

==================================================
17. DOUBT → QUESTION LINK
==================================================

This is important.

From any question:

"Ask Doubt"

Button.

When clicked:

Open Doubt Center.

Automatically attach:

Question
Subject
Chapter
Topic
Question ID

Example:

Attached Question:
Physics — Kinematics — Q12

Student types doubt.

This prevents students from having to explain the entire question again.

==================================================
18. RESOURCE HUB
==================================================

Create:

"Study Resources"

Inside:

Formula Sheets
Flashcards
Chapter Notes
Practice
PYQs
Model Papers
Tests
Mistake Book
Revision

Each chapter should act as a central hub.

Example:

PHYSICS
↓
KINEMATICS

Learn
Practice
PYQ
Test
Formula
Flashcards
Notes
Mistakes
Revision

The student should not need to leave PREPORA to move between these resources.

==================================================
19. CHAPTER LEARNING FLOW
==================================================

Create a consistent chapter page:

Chapter Overview

1. Learn / Notes
2. Formula Sheet
3. Flashcards
4. Basic Practice
5. Medium Practice
6. Hard Practice
7. PYQ
8. Chapter Test
9. Mistakes
10. Revision

This should become the student's central study workspace.

==================================================
20. FULL STUDY SEARCH
==================================================

Global search should search:

Questions
Topics
Chapters
Tests
Papers
Formula
Flashcards
Notes
Mistakes

Example:

Search:
"Kinematics"

Results:

Chapter
Questions
PYQs
Tests
Formula
Flashcards
Notes

Filters:

Exam
Class
Subject
Chapter
Topic
Difficulty
Year

==================================================
21. TEST RESULT — ACTION PLAN
==================================================

Do not stop at:

"Your score is 142."

After result show:

WHAT TO DO NEXT

1. Fix Kinematics
42% accuracy

2. Revise Electrostatics formulas

3. Practice 10 calculation questions

4. Retake Physics mini test

Buttons:

Fix Weakness
Start Revision
Practice Mistakes
Retest

==================================================
22. WEEKLY STUDY REPORT
==================================================

Create:

Weekly Report

Questions:
142

Tests:
5

Accuracy:
72%

Study Time:
6h 20m

Strongest:
Chemistry

Weakest:
Physics

Most Common Mistake:
Calculation Error

Biggest Time Problem:
Maths

Recommended next week:

Physics:
+2 sessions

Maths:
+1 speed session

Use local mock data.

==================================================
23. LEADERBOARD
==================================================

Add leaderboard architecture but keep it secondary.

Show:

Weekly Top 10

Rank
Student
Score
Accuracy

Also:

Your Rank
Topper Average
Median Score

Avoid exposing unnecessary personal information.

Use demo names.

Make leaderboard optional/configurable.

==================================================
24. HOME — NEW PRIORITY LAYOUT
==================================================

Update dashboard hierarchy.

Top:

PREPORA

Good morning, Student.

Target:
JEE 2027

Then:

TODAY'S PLAN

Then:

WHAT SHOULD I STUDY?

Then quick actions:

Practice
Take Test
Build Test
PYQ
Fix Weakness
Doubt Center

Then:

Continue Learning

Weak Topics

Mistake Pattern

Upcoming Revision

Recent Tests

Do not overload the first screen.

==================================================
25. MOBILE BOTTOM NAVIGATION
==================================================

Keep:

Home
Practice
Tests
Papers
Profile

Inside More/Menu:

Mistakes
Weakness
Revision
Formula
Flashcards
Notes
Doubt Center
Messages
Performance
Settings

Do not put 15 icons in bottom navigation.

==================================================
26. DESKTOP SIDEBAR
==================================================

Keep clean grouping:

LEARN

Home
Practice
Chapters
Formula
Flashcards

TEST

Tests
Build My Test
Papers

IMPROVE

Mistakes
Fix My Weakness
Revision
Performance

SUPPORT

Doubt Center
Messages

ACCOUNT

Profile
Settings

==================================================
27. GLOBAL QUICK ACTION
==================================================

Add a floating/quick action button where appropriate:

"WHAT DO YOU WANT TO DO?"

Options:

Practice
Take Test
Revise
Fix Weakness
Ask Doubt

Do not make it visually intrusive.

==================================================
28. LOCAL DATA ARCHITECTURE
==================================================

Extend local mock data.

Add types:

StudyPlan
StudySession
ChapterMastery
MistakePattern
Doubt
Message
MessageThread
Flashcard
Formula
WeeklyReport
ExamReadiness

All should be strongly typed.

==================================================
29. STORAGE
==================================================

Use localStorage through centralized utilities.

Persist:

Test attempts
Question time
Mistakes
Mistake tags
Mistake notes
Bookmarks
Flashcard status
Notes
Study sessions
Daily plan progress
Doubt drafts
Messages
User preferences

==================================================
30. IMPORTANT PRIVACY RULE
==================================================

Do not expose:

Real personal data
Phone numbers
Email addresses
Private student information

Use demo student profiles.

Future backend should be designed with privacy in mind.

==================================================
31. PERFORMANCE
==================================================

Do not load every feature's data on every page.

Use:

Lazy loading where appropriate
Reusable components
Efficient state management

Do not create unnecessary dependencies.

==================================================
32. NO FAKE AI
==================================================

If a feature is not connected to real AI yet:

Use rule-based logic or demo responses.

Do NOT write:

"AI analyzed your behavior"

unless actual AI is connected.

Instead:

"Based on your recent practice"

or

"Demo recommendation"

==================================================
33. NO FAKE EXAM CLAIMS
==================================================

Do not claim:

"This is exactly the official JEE interface"

unless it is verified.

Use:

"Exam-style interface"

and make exam settings configurable.

==================================================
34. COMPLETE USER JOURNEY
==================================================

Test this complete flow:

Student opens PREPORA

↓

Dashboard

↓

Today's Plan

↓

Recommended Topic

↓

Chapter

↓

Formula Revision

↓

Flashcards

↓

Practice

↓

Question

↓

Answer

↓

Detailed Solution

↓

Test

↓

Real Exam Mode

↓

Question Time Analytics

↓

Submit

↓

Result

↓

Time Analysis

↓

Mistake Analysis

↓

Mistake Tag

↓

Mistake Book

↓

Repeated Mistake Detection

↓

Fix Weakness

↓

Targeted Practice

↓

Retest

↓

Performance improves

↓

Weekly Report

Also test:

Question
↓
Ask Doubt
↓
Doubt Center
↓
Attached Question
↓
Send Message
↓
Inbox
↓
Chat

==================================================
35. FINAL PRODUCT PRINCIPLE
==================================================

PREPORA should NOT feel like:

"Just another question bank."

It should feel like:

"MY PERSONAL EXAM PREPARATION SYSTEM"

The student should be able to:

Study
Practice
Revise
Test
Analyze
Ask Doubts
Track Mistakes
Fix Weakness
Improve Speed
Review Formulas
Make Notes
Retest
Track Progress

all inside PREPORA.

==================================================
36. FINAL QA
==================================================

Before finishing:

Check every button.

Check every route.

Check mobile.

Check desktop.

Check test timer.

Check question-level time.

Check result calculations.

Check mistake storage.

Check flashcard storage.

Check notes.

Check search.

Check doubt center.

Check messages.

Check daily plan.

Check chapter mastery.

Check repeated mistakes.

Check weakness flow.

Check responsive layouts.

No dead buttons.

No broken links.

No console errors.

Do not redesign unrelated pages.

==================================================
FINAL OUTPUT
==================================================

Provide:

1. Updated project structure
2. Components added
3. Components modified
4. Routes added
5. Data types added
6. Mock data added
7. Local storage keys
8. Complete list of working features
9. Features intentionally reserved for Phase 2
10. How to run the project

MOST IMPORTANT:

BUILD THE ACTUAL WORKING PROTOTYPE.

DO NOT JUST CREATE STATIC UI MOCKUPS.

The goal is to make PREPORA feel like a complete student preparation ecosystem even before the real backend is connected.