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

ALL PHASE 1 / PHASE 1.5 FEATURES MUST BE FUNCTIONAL USING MOCK DATA.

The final prototype should feel like a complete PREPORA student preparation ecosystem before Supabase and real APIs are connected.