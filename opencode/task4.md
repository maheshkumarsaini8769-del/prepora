PREPORA — PHASE 1.5 STUDENT PROBLEM-SOLVING ECOSYSTEM UPDATE

IMPORTANT:
You are updating the EXISTING PREPORA project.

DO NOT rebuild the project from scratch.
DO NOT replace the existing UI.
DO NOT change the PREPORA branding.
DO NOT remove existing features.
DO NOT break existing routes.
DO NOT create a second test engine.

Keep the existing:
- PREPORA design
- Purple/white visual system
- Responsive layouts
- Navigation
- Practice Engine
- Test Engine
- Timer
- Question-level time analytics
- Exam Hall Tools
- Mistake Tagging
- Formula Flashcards
- Time Allocation Coach
- Result Analysis
- Mistake Book
- Fix My Weakness
- Notes
- Doubt Center
- Messages/DM
- Admin Panel

This update adds the remaining high-value student features.

==================================================
MAIN PRODUCT OBJECTIVE
==================================================

PREPORA should feel like:

"MY COMPLETE EXAM PREPARATION SYSTEM"

A student should be able to do almost everything required for preparation without repeatedly leaving PREPORA.

Complete journey:

PLAN
→ LEARN
→ REVISE
→ PRACTICE
→ ASK DOUBT
→ TEST
→ ANALYZE
→ FIND MISTAKES
→ FIND WEAKNESS
→ FIX WEAKNESS
→ RETEST
→ TRACK PROGRESS

==================================================
1. COMPLETE SYLLABUS TRACKER
==================================================

Create a complete Syllabus Tracker.

Page:

/syllabus

Allow:

Exam
Class
Subject

Example:

JEE
Class 11
Physics

Show chapters with status:

Not Started
Learning
Practicing
Strong
Needs Revision
Completed

Example:

Physics

Units & Measurements       🟢 Strong
Kinematics                  🟡 Practicing
Laws of Motion              🔴 Needs Revision
Work Energy Power           ⚪ Not Started

Show:

Overall Completion
58%

Chapter progress.

Each chapter card:

Chapter Name
Progress %
Status

Buttons:

Open Chapter
Practice
Test
Revise

==================================================
2. CHAPTER HUB
==================================================

Every chapter should become a complete study workspace.

Example:

Physics
→ Kinematics

Top:

Chapter Mastery
64%

Then tabs/cards:

📖 Learn
📝 Notes
🧮 Formula Sheet
🃏 Flashcards
✍️ Basic Practice
🔥 Advanced Practice
📄 PYQ
🧪 Chapter Test
❌ Mistakes
🔄 Revision

The student should be able to access all chapter resources from one place.

Do not force the student to navigate through unrelated pages.

==================================================
3. SMART DAILY PLAN
==================================================

Create:

/daily-plan

Dashboard section:

TODAY'S PLAN

Example:

75 MINUTES

1.
Physics — Kinematics
20 Questions
20 min
[Start]

2.
Chemistry — Chemical Bonding
15 Questions
15 min
[Start]

3.
Formula Revision
10 min
[Start]

4.
Mini Test
20 min
[Start]

Plan should be generated using:

- Weak topics
- Due revisions
- Recent mistakes
- Recent test performance
- Selected exam
- Class

Use rule-based logic in Phase 1.

Do NOT call it AI.

Allow:

Complete
Skip
Start
Continue

Show:

Today's Progress
2 / 4 tasks completed

==================================================
4. STUDY PLANNER
==================================================

Create:

/planner

Allow student to choose:

Exam
Class
Target Date
Daily Study Time

Example:

Target:
JEE 2027

Daily Study Time:
2 hours

Show:

Weekly Plan

Monday
Physics — Kinematics
Chemistry — Mole Concept

Tuesday
Maths — Quadratic Equations
Physics — Laws of Motion

Allow:

Add Task
Edit Task
Delete Task
Mark Complete

Use localStorage.

Do not create unrealistic plans.

==================================================
5. "WHAT SHOULD I STUDY?"
==================================================

Create a prominent action:

WHAT SHOULD I STUDY?

Analyze:

- Weak topics
- Pending revision
- Mistake frequency
- Low accuracy
- Slow questions
- Recent tests

Show:

YOUR TOP PRIORITY

Kinematics
42% mastery
HIGH PRIORITY

Why?

Low accuracy
High mistake count
Repeated mistakes

Button:

START PRACTICE

Also show:

Next Priority
Chemical Bonding

Third Priority
Cell Biology

==================================================
6. "DON'T STUDY THIS NOW"
==================================================

If a topic has high mastery:

Example:

Units & Measurements
94% Mastery

Show:

🟢 STRONG TOPIC

"You are performing well here."

"Consider spending today's time on a weaker topic."

Recommended:

Rotational Motion
43% Mastery

Do NOT block the strong topic.

Student can still open it.

==================================================
7. CONCEPT GAP DETECTOR
==================================================

Create:

Concept Analysis

Instead of only showing:

Physics = 62%

Show:

Physics

Concept Strength:
74%

Application:
58%

Accuracy:
66%

Speed:
51%

Hard Questions:
38%

Then topic breakdown:

Kinematics Graphs
43% 🔴

Relative Motion
48% 🔴

Velocity
71% 🟡

Distance & Displacement
86% 🟢

Button:

FIX CONCEPT

==================================================
8. DIFFICULTY PERFORMANCE
==================================================

Add to Performance and Result pages:

Difficulty Analysis

Easy:
Accuracy 91%

Medium:
Accuracy 68%

Hard:
Accuracy 37%

Show insight:

"Your basic concepts are strong, but application on difficult questions needs improvement."

Generate this from actual mock attempt data.

==================================================
9. SPEED PRACTICE MODE
==================================================

Create:

/speed-practice

Modes:

30 Seconds
60 Seconds
90 Seconds
120 Seconds

Student selects:

Subject
Chapter
Difficulty

Start.

Show:

Question
Countdown
Answer

After each question:

Correct/Wrong
Time Used
Recommended Time

At end:

Speed Score
Accuracy
Average Time
Questions Too Slow

Do not make speed mode unnecessarily stressful.

==================================================
10. ADAPTIVE PRACTICE
==================================================

Create an adaptive practice mode.

Logic:

If correct:
→ increase difficulty gradually

If wrong:
→ give easier question from same concept

If wrong repeatedly:
→ show concept explanation
→ basic question
→ medium question

Flow:

Concept
↓
Easy
↓
Medium
↓
Hard
↓
PYQ

Use mock question pool.

Do not claim AI.

Call it:

Adaptive Practice

==================================================
11. SIMILAR QUESTION PRACTICE
==================================================

After a wrong question:

Show:

"Practice Similar Questions"

Generate/select 5 ORIGINAL mock questions from:

Same subject
Same chapter
Same topic
Similar difficulty

Do NOT copy the original question.

Flow:

Wrong Question
↓
Explanation
↓
5 Similar Questions
↓
Mini Result

==================================================
12. "I'M STUCK" SYSTEM
==================================================

On practice question screen add:

"I'm Stuck"

When clicked show:

Need a Hint?

Options:

💡 Show Hint
🧮 Show Formula
1️⃣ Show First Step
📖 Show Concept
✅ Show Full Solution

Do not immediately reveal the full answer.

Each level should progressively reveal more help.

For demo data use predefined hints.

==================================================
13. COMPLETE STEP-BY-STEP SOLUTION
==================================================

Improve question explanations.

Every suitable question should support:

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
Exam Tip

Example:

Given:
...

Find:
...

Formula:
...

Substitution:
...

Final Answer:
...

Make this visually easy to scan.

==================================================
14. REVISION CENTER
==================================================

Create:

/revision

Sections:

Due Today
Upcoming
Completed

Sources:

Mistake Book
Flashcards
Weak Topics
Previously Wrong Questions
Saved Notes

Show:

12 questions due today

Button:

START REVISION

Revision session should work.

At completion:

Correct
Wrong
Needs Review

==================================================
15. SPACED REVISION
==================================================

For mistakes/flashcards support:

Day 1
Day 3
Day 7
Day 14

Use localStorage.

Allow:

Review Now
Move to Tomorrow
Mark Mastered

Do not create notifications that cannot actually work in this prototype.

==================================================
16. EXAM READINESS
==================================================

Create:

/readiness

Show:

JEE Readiness
68 / 100

Breakdown:

Concepts
74

Accuracy
71

Speed
58

Consistency
76

Hard Questions
49

Show:

BIGGEST IMPROVEMENT AREA

Speed

Recommended:

3 Speed Practice Sessions

Use rule-based calculations.

Label clearly as:

PREPORA Readiness Score

Do NOT present it as an official exam score.

==================================================
17. GOALS & MILESTONES
==================================================

Create:

/goals

Allow:

Target Exam
Target Score
Target Date

Example:

Target:
180 / 300

Current:
142 / 300

Progress:

78.8%

Milestones:

100 Questions
250 Questions
500 Questions
10 Tests
25 Tests
7 Day Streak
First Full Mock
Weak Topic Fixed

Use lightweight gamification.

Do not overdo badges.

==================================================
18. PERSONAL PROGRESS
==================================================

Improve Performance page.

Show comparison with previous performance:

Previous Test:
121

Current Test:
148

Improvement:
+27

Accuracy:
61% → 74%

Average Time:
1m 48s → 1m 21s

Weak Topic:
Kinematics

Current:
42%

Previous:
31%

Show improvement trends.

==================================================
19. WEEKLY REPORT
==================================================

Create:

/weekly-report

Show:

Questions Attempted
Tests Completed
Study Time
Accuracy
Average Time

Strongest Subject
Weakest Subject

Most Common Mistake

Biggest Time Problem

Weakest Topics

Then:

NEXT WEEK RECOMMENDATION

Example:

Physics:
+2 practice sessions

Maths:
+1 speed session

Revision:
12 questions

Use actual local data.

==================================================
20. RESOURCE HUB
==================================================

Create:

/resources

Categories:

Notes
Formula Sheets
Flashcards
Practice
PYQs
Model Papers
Tests
Mistakes
Revision

Allow filtering by:

Exam
Class
Subject
Chapter

==================================================
21. GLOBAL SEARCH — EVERYTHING
==================================================

Improve existing Search.

Search across:

Questions
Chapters
Topics
Tests
Papers
Formula
Flashcards
Notes
Mistakes
Resources

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
Mistakes

Allow filters:

Exam
Class
Subject
Chapter
Topic
Difficulty
Year

Search should work with mock data.

==================================================
22. QUESTION REPORTING
==================================================

Add:

"Report Question"

Reasons:

Wrong Answer
Wrong Explanation
Typo
Duplicate
Poor Question
Image Problem
Other

Optional message.

Save locally.

Admin page:

/admin/reports

Show:

Question
Report Reason
Message
Date
Status

Actions:

Review
Resolve
Dismiss

==================================================
23. HELP CENTER
==================================================

Create:

/help

Categories:

Account
Practice
Tests
Results
Mistakes
Revision
Doubt Center
Technical Issues

Add:

FAQ
Contact Support
Report Problem

Use mock support content.

==================================================
24. DOUBT CENTER IMPROVEMENT
==================================================

Keep existing Doubt Center.

Add:

Question Attachment

From any question:

ASK DOUBT

Automatically attach:

Question
Subject
Chapter
Topic
Question ID

Student types:

"My doubt is..."

Send.

Open:

Doubt Thread

==================================================
25. MESSAGE / DM SYSTEM
==================================================

Keep the existing safe DM system.

Student can message:

Prep Support
Demo Mentor

Features:

Send message
Timestamp
Read status
Attach Question
Report Message
Delete Message

Do NOT create unrestricted anonymous student-to-student DM.

Design future moderation support:

Report
Block
Admin moderation
Spam protection

==================================================
26. CHAPTER QUICK ACTION BAR
==================================================

On every chapter page show:

[Learn]
[Practice]
[Test]
[PYQ]
[Formula]
[Flashcards]
[Revision]
[Mistakes]

This should be persistent and easy to access.

==================================================
27. MOBILE UX
==================================================

Do not overload mobile.

Bottom navigation remains:

Home
Practice
Tests
Papers
Profile

More menu:

Syllabus
Daily Plan
Revision
Mistakes
Weakness
Formula
Flashcards
Notes
Doubt
Messages
Performance
Goals
Settings

Make Chapter Hub and Test UI especially mobile-friendly.

==================================================
28. DATA ARCHITECTURE
==================================================

Add strongly typed models:

Syllabus
ChapterProgress
StudyPlan
StudyTask
StudySession
ChapterMastery
ConceptPerformance
RevisionItem
Goal
Milestone
WeeklyReport
Doubt
Message
QuestionReport

Use centralized mock services.

Example:

mockSyllabusService
mockStudyPlanService
mockRevisionService
mockAnalyticsService
mockDoubtService

Do not scatter mock logic across pages.

==================================================
29. LOCAL STORAGE
==================================================

Persist:

Syllabus progress
Daily plan
Study tasks
Revision status
Goals
Mistake data
Question attempts
Time analytics
Flashcard status
Notes
Bookmarks
Doubts
Messages
Question reports
User preferences

Use centralized storage utilities.

==================================================
30. IMPORTANT — NO FAKE DATA ANALYTICS
==================================================

Whenever possible calculate:

- Accuracy
- Mastery
- Time
- Mistakes
- Progress
- Revision status

from actual stored interactions.

Do not simply hardcode:

"Your accuracy is 84%"

if the user has not actually generated that data.

For initial empty users, provide clearly labeled DEMO DATA so the UI doesn't look empty.

Allow:

"Use Demo Data"

or initialize a demo student profile.

==================================================
31. NO FAKE AI
==================================================

Do not claim AI is running.

Phase 1 uses:

Rule-based recommendations
Mock doubt responses
Mock resources

Future Phase 2 can add:

AI Tutor
AI Doubt Solver
AI Question Generator
AI Personalized Study Planner

==================================================
32. NO OFFICIAL EXAM CLAIMS
==================================================

Do not claim:

"Official JEE interface"

"Official percentile"

"Official rank"

"Guaranteed college prediction"

Use:

Exam-style
Estimated
PREPORA Score
Demo

until real verified data and methodology are implemented.

==================================================
33. COMPLETE STUDENT JOURNEY QA
==================================================

Test this:

Student opens dashboard

↓

"What should I study?"

↓

Kinematics recommended

↓

Open Chapter Hub

↓

Read Notes

↓

Formula Sheet

↓

Flashcards

↓

Practice

↓

"I'm Stuck"

↓

Hint

↓

Solve

↓

Similar Questions

↓

Chapter Test

↓

Real Exam Test

↓

Question Time Analytics

↓

Submit

↓

Result

↓

Why did I lose marks?

↓

Mistake Tag

↓

Mistake Book

↓

Repeated Mistake

↓

Fix Weakness

↓

Adaptive Practice

↓

Revision

↓

Retest

↓

Performance Improvement

↓

Weekly Report

Also test:

Syllabus
→ Chapter Progress

Daily Plan
→ Complete Task

Goals
→ Progress

Doubt
→ Attach Question
→ Send

Search
→ Find Chapter/Question/Test/Formula

Question
→ Report
→ Admin Reports

==================================================
34. UX PRINCIPLE
==================================================

At every important point ask:

"Can the student take the next useful action without leaving PREPORA?"

Examples:

Wrong Question:
→ Practice Similar

Weak Topic:
→ Fix Topic

Slow Question:
→ Speed Practice

Formula Forgotten:
→ Flashcard

Repeated Mistake:
→ Targeted Practice

Doubt:
→ Ask Doubt

Revision Due:
→ Start Revision

Low Score:
→ What Should I Study?

Do not leave the student at a dead-end analytics screen.

==================================================
35. FINAL HOME DASHBOARD
==================================================

The home dashboard should prioritize:

1. Today's Plan

2. What Should I Study?

3. Continue Learning

4. Weak Topics

5. Revision Due

6. Recent Test

7. Mistake Pattern

8. Quick Actions

Quick Actions:

Practice
Take Test
Build Test
PYQ
Fix Weakness
Ask Doubt

Keep it clean.

==================================================
36. FINAL QUALITY STANDARD
==================================================

PREPORA must feel like a real product.

NOT:

A collection of random feature pages.

Everything must connect.

The student should feel:

"I know what to study."

"I can study it here."

"I can practice it here."

"I can ask my doubt here."

"I can test myself here."

"I know why I lost marks."

"I know what I need to improve."

"I know what I should revise."

"I can retest myself."

"I can see my improvement."

==================================================
37. DO NOT BREAK EXISTING FEATURES
==================================================

Before finishing:

Verify every existing route.

Verify existing Test Engine.

Verify timer.

Verify question navigation.

Verify result calculation.

Verify time analytics.

Verify exam tools.

Verify mistake tagging.

Verify flashcards.

Verify Time Coach.

Verify Doubt Center.

Verify DM.

Verify Admin Panel.

No regressions.

==================================================
38. FINAL DELIVERABLE
==================================================

Return:

1. Updated project structure
2. New pages
3. New components
4. Modified components
5. New data types
6. New mock services
7. LocalStorage keys
8. New routes
9. Complete working feature list
10. Phase 2 remaining features

MOST IMPORTANT:

DO NOT ONLY DESIGN THESE FEATURES.

IMPLEMENT THEM.
PREPORA — AI ADAPTIVE LEARNING SYSTEM + AI TEACHER + MIND MAP + SMART STUDY PLANNER
====================================================================================

PROJECT:
PREPORA

TAGLINE:
Practice • Test • Analyze • Improve

IMPORTANT:
This is an EXISTING production-style education platform.

Do NOT rebuild the website from scratch.

Do NOT remove existing features.

Do NOT break existing business logic.

Do NOT replace working systems unnecessarily.

First inspect the existing codebase and understand the current architecture.

Then integrate the following features into the existing PREPORA system.

The new features MUST connect with the existing:

- 100,000+ question system
- Question Bank
- JEE Main
- JEE Advanced
- NEET UG
- CBSE
- RBSE
- Real Previous Year Papers
- Test Builder
- Easy / Medium / Hard
- Performance Analytics
- Mistake Book
- Repeated Mistake Detection
- Fix My Weakness
- Smart Revision
- Chapter Mastery
- AI Doubt Solver
- AI Content Factory
- Student Dashboard
- Admin Panel
- Authentication
- Search
- Reports
- Goals

The new system must NOT become an isolated feature.

Everything should work as ONE connected adaptive preparation engine.

====================================================================================
1. CORE PRODUCT EXPERIENCE
====================================================================================

Change the student experience from:

Question → Answer → Done

to:

UNDERSTAND
→ LEARN
→ PRACTICE
→ ANALYZE
→ DETECT WEAKNESS
→ TARGETED PRACTICE
→ TEST
→ REVISION
→ RETEST
→ MASTERY

PREPORA should continuously understand what the student needs to study next.

Main student question:

"What should I study NOW?"

This should become a major dashboard feature.

====================================================================================
2. AI STUDY PLANNER
====================================================================================

Create:

"AI Study Planner"

Student enters:

- Exam
- Exam date
- Class
- Subjects
- Daily available study time
- Preferred study time
- Current preparation level
- Target score if provided
- Completed chapters
- Weak chapters
- Strong chapters

Use actual PREPORA data:

- Performance
- Accuracy
- Mistakes
- Repeated mistakes
- Chapter mastery
- Topic mastery
- Difficulty performance
- Previous tests
- Practice history
- Revision history
- Remaining syllabus
- PYQ performance

AI generates a personalized plan.

Example:

TODAY

Physics
Kinematics
45 min

Chemistry
Mole Concept
40 min

Biology
Cell
50 min

Practice
25 questions

Revision
15 minutes

Mini Test
20 questions

IMPORTANT:

The planner must NOT randomly recommend topics.

Recommendations must be based on real student data.

====================================================================================
3. ADAPTIVE DAILY PLAN
====================================================================================

The plan must change based on performance.

Example:

Student performs badly in:

Physics → Kinematics → Graphs

Then next plan automatically increases:

- Graph revision
- Easy/Medium practice
- Concept explanation
- Targeted questions
- Retest

If student masters it:

Reduce repetition.

Move to next weak concept.

The system should continuously adapt.

====================================================================================
4. AI TEACHER / AI TUTOR
====================================================================================

Add:

"AI Teacher"

This is NOT just a generic chatbot.

AI Teacher must behave like an interactive tutor.

Modes:

1. Learn
2. Explain
3. Example
4. Practice
5. Hint
6. Check Answer
7. Correct Mistake
8. Retest

Example:

Student:

"I don't understand Kinematics."

AI Teacher:

STEP 1
Explain the concept simply.

STEP 2
Give a real/simple example.

STEP 3
Ask a basic question.

STEP 4
Check student's answer.

STEP 5
Explain mistake if wrong.

STEP 6
Give Medium question.

STEP 7
Give Hard question only when ready.

STEP 8
Create mini test.

The AI must adapt explanation difficulty to the student.

====================================================================================
5. AI TEACHER CONTEXT
====================================================================================

AI Teacher should understand:

- Student class
- Exam
- Subject
- Chapter
- Topic
- Current mastery
- Previous mistakes
- Preferred difficulty
- Previous conversation context

But never blindly trust UI dropdowns.

If:

Selected Subject = Chemistry

but question is clearly Physics,

detect mismatch.

Show:

"Your selected subject appears inconsistent with the question."

Actions:

[Switch to Physics]
[Continue Anyway]

Never silently use wrong subject context.

====================================================================================
6. AI TEACHER + PREPORA CONTENT
====================================================================================

AI Teacher should use PREPORA content when relevant.

Source states:

PREPORA_GROUNDED
GENERAL_AI
WEB_VERIFIED
MIXED

Only show:

"Grounded in PREPORA"

when PREPORA content was actually retrieved.

If no PREPORA content was retrieved:

Do not claim PREPORA grounding.

====================================================================================
7. PROGRESSIVE HINT SYSTEM
====================================================================================

For questions:

Do NOT immediately reveal the full answer.

Provide:

Hint 1:
Conceptual hint

Hint 2:
Formula / approach

Hint 3:
Next step

Then:

Full Solution

Student controls:

[Hint 1]
[Hint 2]
[Show Solution]

Track hint usage.

Use hint usage as a learning signal.

If student repeatedly needs hints on a topic:

mark that concept as potentially weak.

====================================================================================
8. INTERACTIVE MIND MAP
====================================================================================

Add:

"Mind Map"

for every supported chapter.

Structure:

CHAPTER
│
├── TOPIC
│   ├── SUBTOPIC
│   │   ├── CONCEPT
│   │   ├── QUESTIONS
│   │   ├── MISTAKES
│   │   └── MASTERY
│
└── REVISION

Example:

KINEMATICS

Motion
├── Distance
├── Displacement
├── Speed
├── Velocity
└── Acceleration

Graphs
├── Position-Time
├── Velocity-Time
└── Acceleration-Time

Each node should show:

Mastery %
Questions attempted
Accuracy
Mistakes
Hard questions
Last practiced
Next revision

Clicking a node should open:

Concept
→ Learn
→ Practice
→ Questions
→ Mistakes
→ Revision

====================================================================================
9. MIND MAP VISUALIZATION
====================================================================================

Mind Map should be:

Interactive
Zoomable
Scrollable
Clickable
Mobile responsive

Use visual states:

Mastered
Learning
Weak
Not Started

Do not use excessive colors.

Keep PREPORA's premium monochrome design.

Semantic status colors can be used minimally.

====================================================================================
10. CHAPTER LEARNING PAGE
====================================================================================

Create/upgrade chapter page:

CHAPTER OVERVIEW

Show:

Mastery
Topics
Questions
Accuracy
Mistakes
PYQs
Revision status

Actions:

[Learn]
[Mind Map]
[Practice]
[Test]
[PYQs]
[Revise]

Example:

Kinematics

Mastery: 68%

Topics:
8

Questions:
146

Accuracy:
71%

Mistakes:
23

PYQs:
42

Next:

"Fix Graph-based Motion questions"

====================================================================================
11. SMART REVISION PLANNER
====================================================================================

Integrate with existing Smart Revision.

Revision should consider:

- Last studied time
- Accuracy
- Mistakes
- Repeated mistakes
- Difficulty
- Mastery
- Forgetting/revision schedule

Generate:

Today's Revision

1. Kinematics Graphs
2. Chemical Bonding
3. Cell Division

Each item:

Why revise?

Example:

"Kinematics Graphs — accuracy 48% in your last 2 attempts."

Then:

[Revise Now]

====================================================================================
12. EXAM COUNTDOWN
====================================================================================

Add:

Exam Countdown

Example:

NEET UG

127 days remaining

JEE Main

94 days remaining

CBSE Physics

61 days remaining

Connect countdown with study planner.

Do not use fake dates.

Use actual configured exam dates.

If exam date is unknown:

ask student to configure it.

====================================================================================
13. PREPARATION TIMELINE
====================================================================================

Create:

Preparation Timeline

PHASE 1
Complete syllabus

PHASE 2
Concept strengthening

PHASE 3
Practice

PHASE 4
PYQs

PHASE 5
Mock Tests

PHASE 6
Revision

PHASE 7
Final preparation

Timeline must adapt to:

Exam date
Remaining syllabus
Student mastery

====================================================================================
14. PERSONALIZED "WHAT SHOULD I STUDY NOW?"
====================================================================================

Add prominent dashboard component:

"What should I study now?"

Show ONE primary recommendation.

Example:

Study Kinematics — Graphs

Reason:

Accuracy: 48%
Last attempted: 3 days ago
Repeated mistakes: 4
Mastery: 42%

Actions:

[Start 15 Questions]
[Learn Concept]
[Revise]

This recommendation must come from deterministic student data.

AI may explain WHY.

====================================================================================
15. FIX MY WEAKNESS INTEGRATION
====================================================================================

AI Planner + AI Teacher + Mind Map + Fix My Weakness must be connected.

Flow:

Performance
↓
Weakness Detection
↓
Weak Topic
↓
Mind Map
↓
Concept Learning
↓
AI Teacher
↓
Targeted Practice
↓
Mini Test
↓
Retest
↓
Mastery Update

This is the core PREPORA loop.

====================================================================================
16. ADAPTIVE QUESTION SELECTION
====================================================================================

When AI Teacher or Study Planner starts practice:

Use real Question Bank.

Filter by:

Exam
Subject
Chapter
Topic
Difficulty
Question Type
Content Type
Published status

Never randomly select unrelated questions.

If weakness is:

Kinematics → Velocity-Time Graph

questions must target that concept.

Do NOT just select generic Kinematics questions.

====================================================================================
17. DIFFICULTY ADAPTATION
====================================================================================

Start based on student's level.

Example:

Weak student:

Easy
→ Easy
→ Medium

Strong student:

Medium
→ Hard

Do not automatically give Hard questions to everyone.

Difficulty must remain:

EASY
MEDIUM
HARD

and must match database values.

Never silently substitute another difficulty.

====================================================================================
18. AI GENERATED PRACTICE
====================================================================================

If enough verified questions do not exist:

Show:

"Only 17 verified questions are available."

Option:

[Practice 17]

[Generate More]

If generating:

AI Generated questions must pass:

- Question validation
- Answer validation
- Math validation
- Difficulty validation
- Topic validation
- Duplicate detection
- Semantic duplicate detection
- Source validation where applicable

Never publish unvalidated AI questions.

====================================================================================
19. 100K+ QUESTION SYSTEM INTEGRATION
====================================================================================

The new features must work with the 100,000+ question system.

Never load 100,000 questions into the browser.

Use:

Database filtering
Indexes
Pagination
Efficient API queries

Question recommendation should query only eligible questions.

====================================================================================
20. REAL PREVIOUS PAPER INTEGRATION
====================================================================================

AI Study Planner should be able to recommend:

Real Previous Year Papers

Categories:

JEE Main
JEE Advanced
NEET UG
CBSE
RBSE

PYQs must remain separate from:

AI Generated
Question Bank
Model Papers

If recommending a PYQ:

show actual paper metadata.

Example:

JEE Advanced
2024
Paper 1
Physics

[Attempt Paper]

Never label AI-generated questions as PYQs.

====================================================================================
21. PYQ PERFORMANCE ANALYSIS
====================================================================================

After a student attempts a previous paper:

Analyze:

- Score
- Accuracy
- Time
- Subject
- Chapter
- Topic
- Difficulty where available
- Mistakes
- Weakness

Then feed results into:

Study Planner
Fix My Weakness
Revision
AI Teacher

====================================================================================
22. AI TEACHER FROM MISTAKES
====================================================================================

If student makes a mistake:

Show:

"Learn from this mistake"

AI Teacher explains:

1. What student did
2. Why it was wrong
3. Correct concept
4. Correct approach
5. Similar example
6. Practice question
7. Retest

Do NOT shame the student.

====================================================================================
23. PERFORMANCE INTELLIGENCE
====================================================================================

AI can interpret real metrics.

Example:

"Your Chemistry accuracy is improving, but Organic Chemistry reaction questions remain a weak area."

The number must come from actual database data.

AI must NOT invent:

scores
accuracy
rank
mastery
attempts

Deterministic backend calculates metrics.

AI explains them.

====================================================================================
24. HOME DASHBOARD UPGRADE
====================================================================================

Student Home should show:

GREETING

Exam Countdown

"What should I study now?"

Today's Plan

Today's Progress

Weakness Alert

Continue Learning

Quick Practice

Upcoming Revision

Recent Test

Performance Snapshot

Do not create too many equal-weight cards.

Use strong visual hierarchy.

====================================================================================
25. DAILY PLAN UI
====================================================================================

Example:

TODAY'S PLAN

08:00
Physics — Kinematics
45 min
[Start]

10:00
Chemistry — Mole Concept
40 min
[Start]

14:00
Biology — Cell
50 min
[Start]

18:00
Revision
20 min
[Start]

20:00
Mini Test
20 questions
[Start]

Show completion:

3/5 completed

But values must come from real activity.

====================================================================================
26. GOALS
====================================================================================

Add goals:

Daily Questions
Daily Study Time
Weekly Tests
Chapter Completion
Accuracy Target
Exam Target

Example:

Daily Target:

50 Questions

Completed:

32 / 50

Progress:

64%

Never use fake progress.

====================================================================================
27. NOTIFICATION / REMINDER LOGIC
====================================================================================

Optional reminders:

Revision due
Daily plan
Incomplete target
Scheduled test

Do not spam.

Student can disable reminders.

====================================================================================
28. MOBILE UX
====================================================================================

All new features must work at:

360px
375px
390px
412px

Mind Map:
Use horizontal/vertical scrolling appropriately.

AI Teacher:
Chat must remain usable.

Study Planner:
Timeline must stack vertically.

Chapter:
No horizontal overflow.

Test Builder:
Filters must remain usable.

Previous Papers:
Cards instead of wide tables on mobile.

====================================================================================
29. PREMIUM PREPORA DESIGN
====================================================================================

Keep existing PREPORA monochrome design direction.

Primary:

Black
White
Gray

Use semantic colors only when necessary:

Success
Warning
Error

Avoid:

Excessive purple
Neon
Gaming style
Childish illustrations
Excessive gradients
Excessive glassmorphism
Huge shadows
Card overload

Typography must clearly distinguish:

Primary action
Main heading
Section
Metadata
Secondary information

====================================================================================
30. AI SAFETY + ACCURACY
====================================================================================

Never claim:

100% AI accuracy.

Every educational answer must pass validation where applicable.

For numerical questions:

Independent calculation validation.

For MCQs:

Exactly one correct answer.

For formulas:

Validate mathematical rendering.

Use proper:

KaTeX / MathJax

Never display raw:

\frac
\sqrt
^{}
LaTeX

to students.

====================================================================================
31. DATA MODEL
====================================================================================

Create proper models/entities where needed:

StudyPlan
StudyPlanItem
LearningSession
MindMap
MindMapNode
RevisionSchedule
AITutorSession
TutorMessage
StudentGoal
ExamSchedule
LearningRecommendation

Connect them to:

User
Question
Attempt
Subject
Chapter
Topic
Mistake
Test
Paper

Do not duplicate existing entities unnecessarily.

Reuse existing IDs/schema where possible.

====================================================================================
32. ADMIN CONTROLS
====================================================================================

Admin should be able to configure:

- Exams
- Exam dates
- Study plan rules
- Revision rules
- AI Teacher settings
- Mind Map hierarchy
- Topic hierarchy
- Difficulty
- Question availability
- AI usage limits

Admin should see:

AI Teacher usage
Study plan completion
Most common weak topics
Most practiced chapters
Most requested concepts
Hint usage
Retest performance

Use real analytics.

====================================================================================
33. ADMIN LOGIN ACTIVITY
====================================================================================

Preserve the existing Login Activity requirement.

Admin can see real:

User
Email
Role
Login time
Last active
Device
OS
Browser
Session
IP
Status

Never expose passwords or authentication secrets.

====================================================================================
34. FULL END-TO-END TESTING
====================================================================================

DO NOT just build the UI.

Actually test the features.

Test:

Student Login
↓
Dashboard
↓
Exam selection
↓
Study Planner
↓
"What should I study now?"
↓
Chapter
↓
Mind Map
↓
Concept
↓
AI Teacher
↓
Practice
↓
Easy
↓
Medium
↓
Hard
↓
Submit
↓
Mistake
↓
Fix My Weakness
↓
Revision
↓
Retest
↓
Performance

Also test:

Previous Paper
↓
Attempt
↓
Analysis
↓
Weakness
↓
Study Plan update

====================================================================================
35. FILTER TESTING
====================================================================================

Test every combination.

Subject
Chapter
Topic
Difficulty
Exam
Content Type
Question Type

Test:

Easy
Medium
Hard

Make sure:

Hard NEVER returns Medium/Easy.

Medium NEVER returns Easy/Hard.

Easy NEVER returns Medium/Hard.

Test Builder requested count must match available inventory.

If 50 requested but only 27 available:

show 27.

Never silently change the difficulty.

====================================================================================
36. REAL DATA TEST
====================================================================================

Compare:

DATABASE
↓
API
↓
FRONTEND
↓
UI

Example:

Database:

Hard = 83

API:

Hard = 83

UI:

Hard = 83

All must match.

No hardcoded values.

====================================================================================
37. REGRESSION TESTING
====================================================================================

After adding all features, verify existing features still work:

- Authentication
- Dashboard
- Practice
- Test Builder
- Question Bank
- Previous Papers
- Model Papers
- Performance
- Mistakes
- Revision
- Fix My Weakness
- AI Doubt Solver
- Search
- Admin Panel
- AI Content Factory
- Login Activity

If any existing feature breaks, fix it before finalizing.

====================================================================================
38. PERFORMANCE
====================================================================================

Optimize:

Database queries
Indexes
API calls
AI calls
Caching
Pagination
Mind Map loading
Large question bank
Previous Paper loading

Do not make the dashboard perform dozens of unnecessary API calls.

Use efficient aggregated APIs where appropriate.

====================================================================================
39. FINAL AUDIT REPORT — MANDATORY
====================================================================================

At the END provide a detailed report.

1. FEATURES ADDED

List every feature actually implemented.

2. FEATURES MODIFIED

List every existing feature changed.

3. BUGS FOUND

List:

Bug
Root Cause
Fix
Test Result

4. QUESTION SYSTEM

Report REAL:

Total questions
Easy
Medium
Hard
Published
AI Generated
PYQ
Model Paper
Practice

5. FILTER TEST RESULTS

Report actual:

Easy filter
Medium filter
Hard filter
Subject filter
Chapter filter
Topic filter
Combined filters
Search filters

6. TEST BUILDER RESULTS

Report actual tests performed:

10 Easy
10 Medium
10 Hard
20 Easy
20 Medium
20 Hard
50 Easy
50 Medium
50 Hard

Only report PASS when actually tested.

7. AI TEACHER TESTS

Test:

Theory
Numerical
Concept
Mistake explanation
Hints
Retest

8. STUDY PLANNER TEST

Verify plan generation from real student data.

9. MIND MAP TEST

Verify:

Chapter
Topic
Subtopic
Concept
Mastery
Mistakes
Questions

10. FIX MY WEAKNESS TEST

Verify:

Weakness
→ Targeted Practice
→ Revision
→ Retest
→ Mastery update

11. PREVIOUS PAPERS — MANDATORY

Give EXACT list of papers actually present in database.

Separate:

JEE MAIN
JEE ADVANCED
NEET UG
CBSE
RBSE

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
Rights Status

Also explicitly list:

NOT ADDED
NOT VERIFIED
SOURCE ONLY
RIGHTS REVIEW REQUIRED

Never invent missing papers.

12. ADMIN TEST

Verify:

Dashboard
Question Bank
AI Factory
Previous Papers
Students
Analytics
Login Activity
Settings
Security

13. MOBILE TEST

360
375
390
412

14. SECURITY TEST

Authentication
Authorization
Admin permissions
API protection
Secret protection

15. PERFORMANCE TEST

Page load
API
Database
Question filtering
Test generation
AI generation

16. REMAINING ISSUES

Clearly list anything not fixed.

FINAL RULE:

Do not say:

"Everything is fixed"

unless you actually performed the tests.

Do not invent:

Question counts
Test results
PYQ papers
AI accuracy
Analytics
Login records

Only report REAL results from the running application/database.

The final report must be honest and traceable.
ALL PHASE 1 / PHASE 1.5 FEATURES MUST BE FUNCTIONAL USING MOCK DATA.

The final prototype should feel like a complete PREPORA student preparation ecosystem before Supabase and real APIs are connected.