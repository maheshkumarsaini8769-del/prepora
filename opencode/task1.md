PREPORA — COMPLETE ADMIN PANEL
BUILD A PRODUCTION-READY ADMIN CONTROL CENTER

IMPORTANT:
This is the ADMIN PANEL for the existing PREPORA education platform.

Do NOT redesign or break the student-facing PREPORA website.

Admin Panel must use the same PREPORA design system, but it should feel more powerful and information-dense.

Build REAL functionality.
No fake statistics.
No dummy buttons.
No placeholder CRUD.

Use the existing backend, MongoDB models and APIs wherever possible.
First inspect the existing codebase before creating new models or APIs.

==================================================
1. ADMIN LOGIN & SECURITY
==================================================

Create a separate secure admin authentication system.

Admin login:

Email
Password
OTP / 2FA if configured

Security:

- Secure password hashing
- Session management
- Multiple admin devices
- Logout current device
- Logout all devices
- Rate limiting
- Server-side authorization
- Admin route protection
- Session expiration
- Suspicious login tracking

NEVER trust admin permissions from frontend.

==================================================
2. ROLE & PERMISSION MANAGEMENT
==================================================

Support multiple admin roles.

SUPER ADMIN
- Full access

CONTENT ADMIN
- Questions
- Chapters
- Subjects
- Notes
- Formulas
- Flashcards

TEST ADMIN
- Tests
- Mock tests
- Test blueprints
- Papers
- Answer keys

REVIEWER
- Question review
- Reports
- Approve/reject content

SUPPORT ADMIN
- Technical reports
- User support
- Doubts
- Messages

ANALYTICS ADMIN
- Analytics
- Reports
- Performance

Each permission should be configurable.

Example:

Questions:
View ✓
Create ✓
Edit ✓
Delete ✕
Publish ✓

==================================================
3. ADMIN DASHBOARD
==================================================

Create a professional command center.

Top cards:

Total Students
Active Students
Questions
Tests
Papers
Reports
Pending Reviews
System Status

Then:

STUDENT ACTIVITY

- Daily active users
- Weekly active users
- New registrations
- Tests attempted
- Questions solved

CONTENT HEALTH

- Published questions
- Draft questions
- Pending review
- Reported questions
- Possible duplicates

TEST ACTIVITY

- Tests created
- Tests attempted
- Average score
- Average accuracy
- Submission failures

SYSTEM HEALTH

- API status
- Database status
- Background jobs
- Failed jobs
- Error rate

IMPORTANT:
All numbers must come from real database data.

==================================================
4. QUESTION MANAGEMENT
==================================================

Main section:

Questions

Features:

- Search
- Filter
- Sort
- Pagination
- Bulk actions

Filters:

Exam
Class
Board
Subject
Chapter
Topic
Difficulty
Question Type
Source
Status
Created Date
Updated Date

Question statuses:

Draft
Pending Review
Approved
Published
Rejected
Archived

Actions:

Create
Edit
Preview
Duplicate
Archive
Publish
Unpublish
Report
View History

==================================================
5. QUESTION CREATOR
==================================================

Create professional question editor.

Fields:

Exam
Class
Board
Subject
Chapter
Topic
Question Type
Difficulty
Source
Year
Language
Tags

Question:

Question text

Options:

A
B
C
D

Correct Answer

Solution

Detailed Explanation

Concept

Important Point

Shortcut

Common Mistake

Exam Tip

Recommended Time

Marks

Negative Marks

Question status.

Support:

Image
Equation
Chemical formula
Math notation

Preview exactly how student will see it.

==================================================
6. QUESTION QUALITY CONTROL
==================================================

Every new question can go through:

Draft
↓
Review
↓
Approved
↓
Published

Reviewer sees:

Question
Options
Answer
Solution
Tags
Difficulty
Duplicate warnings

Actions:

Approve
Reject
Request Changes

Reject reason:

Wrong Answer
Wrong Explanation
Ambiguous
Duplicate
Typo
Incorrect Concept
Poor Quality
Other

==================================================
7. DUPLICATE DETECTION
==================================================

Before publishing:

Run:

Exact duplicate check
Similar question check
Semantic similarity check

Show:

Possible Duplicate

Existing question
New question
Similarity score

Admin can:

Keep New
Merge
Edit
Ignore

Never automatically delete content.

==================================================
8. QUESTION VERSION HISTORY
==================================================

Every published question must support versioning.

Example:

Question #1024

Version 1
Version 2
Version 3

Show:

Changed By
Changed Date
What Changed

Example:

Correct Answer:
B → C

Explanation:
Updated

IMPORTANT:

Old test attempts must remain linked to the old question version.

Never destroy historical attempt data.

==================================================
9. BULK IMPORT
==================================================

Support:

CSV
Excel XLSX

Flow:

Upload
↓
Parse
↓
Validate
↓
Duplicate Check
↓
Preview
↓
Import

Show:

Total rows
Valid
Invalid
Duplicates
Warnings

Allow:

Import valid rows
Download error report
Cancel

Never partially corrupt the database.

==================================================
10. BULK EXPORT
==================================================

Export:

Questions
Tests
Papers
Users
Reports
Analytics

Filters should apply before export.

Support:

CSV
XLSX

==================================================
11. SUBJECT / CHAPTER / TOPIC MANAGEMENT
==================================================

Create hierarchy:

Exam
→ Class
→ Board
→ Subject
→ Chapter
→ Topic

Admin can:

Create
Edit
Reorder
Archive
Publish

Example:

JEE
→ Class 11
→ Physics
→ Kinematics
→ Motion in One Dimension

Keep content hierarchy reusable across:

Practice
Tests
PYQs
Analytics
Weakness Engine
Revision

==================================================
12. PAPER LIBRARY
==================================================

Manage:

JEE Papers
NEET Papers
CBSE Papers
RBSE Papers
Model Papers
Sample Papers

Fields:

Exam
Year
Session/Shift
Class
Subject
Paper
Answer Key
Source
Status

Actions:

Upload
Preview
Publish
Unpublish
Archive
Edit Metadata

IMPORTANT:
Only host/reproduce papers where PREPORA has the required rights or permission.

Otherwise store/link the authorized source appropriately.

==================================================
13. TEST MANAGEMENT
==================================================

Create:

Full Mock
Subject Test
Chapter Test
Topic Test
Mini Test
Custom Test
Daily Test

Fields:

Test Name
Exam
Class
Subjects
Chapters
Topics
Question Count
Difficulty
Duration
Marks
Negative Marking
Blueprint
Status

Statuses:

Draft
Scheduled
Published
Archived

==================================================
14. TEST BLUEPRINT BUILDER
==================================================

Admin must be able to define exact question distribution.

Example:

Physics
Mechanics — 8
Electrodynamics — 7
Modern Physics — 5
Other — 5

Difficulty:

Easy 30%
Medium 50%
Hard 20%

Source:

PYQ 40%
Original 60%

The engine should try to satisfy the blueprint.

If insufficient questions exist:

Show:

"Only 18 suitable questions available; 25 requested."

Never silently use unrelated questions.

==================================================
15. TEST SCHEDULING
==================================================

Admin can schedule tests.

Fields:

Start date/time
End date/time
Duration
Availability

Optional:

Class restriction
Exam restriction
User group

Show upcoming tests.

==================================================
16. TEST MONITORING
==================================================

During active tests show:

Students Started
Students Completed
Students In Progress
Average Score
Average Accuracy
Submission Failures

Do NOT expose unnecessary personal data.

==================================================
17. TEST RESULT ANALYTICS
==================================================

Admin can inspect aggregate performance.

Show:

Average Score
Median Score
Accuracy
Correct
Wrong
Unattempted
Average Time

Breakdown:

Subject
Chapter
Topic
Difficulty
Question

Find:

Very easy questions with unusually low accuracy
Questions with unusually high wrong rate
Time-draining questions
Possible ambiguous questions

These should be signals for review, not automatic accusations.

==================================================
18. STUDENT MANAGEMENT
==================================================

Students section.

Search by:

Name
Email
Class
Exam
Target year

Profile:

Basic account information
Selected exam
Class
Board
Progress
Tests
Accuracy
Activity

Actions:

View Profile
Suspend
Restore
Reset relevant account access
View sessions where permitted

Do NOT allow admins to see passwords.

==================================================
19. STUDENT PROGRESS
==================================================

Student profile should show:

Questions attempted
Tests attempted
Average accuracy
Study time
Streak
Strong subjects
Weak subjects
Recent activity
Chapter mastery

Do not expose private data beyond admin permissions.

==================================================
20. WEAKNESS ENGINE ADMIN
==================================================

Admin can inspect the logic powering:

Fix My Weakness

Show:

Weak topic
Accuracy
Attempts
Repeated mistakes
Average time
Difficulty performance

Allow configuration of thresholds.

Example:

Weak:
< 50%

Needs Improvement:
50–70%

Strong:
> 70%

Do not hardcode if these values need future adjustment.

==================================================
21. MISTAKE BOOK MANAGEMENT
==================================================

Admin analytics only.

Show aggregate:

Most common mistake

Calculation Error
Concept Not Clear
Formula Forgotten
Misread Question
Time Issue
Wrong Option
Guess
Careless Mistake

Use this to improve content.

==================================================
22. REVISION SYSTEM
==================================================

Manage spaced revision rules.

Default:

Day 1
Day 3
Day 7
Day 14

Admin can configure intervals.

Track:

Due revisions
Completed revisions
Skipped
Success rate

==================================================
23. FORMULA & FLASHCARD MANAGEMENT
==================================================

Admin can create/edit:

Formula Cards
Flashcards

Fields:

Subject
Chapter
Topic
Question/front
Answer/back
Explanation
Difficulty
Tags

Preview student view.

==================================================
24. NOTES / STUDY MATERIAL
==================================================

Manage:

Chapter notes
Revision notes
Formula sheets
Study resources

Fields:

Title
Subject
Chapter
Topic
Exam
Class
Content
Attachment
Status

Statuses:

Draft
Review
Published
Archived

==================================================
25. AI QUESTION GENERATION
==================================================

Create:

AI Question Generator

Flow:

Select:

Exam
Class
Subject
Chapter
Topic
Difficulty
Question count
Question type

Generate

↓
AI Draft Queue

↓
Duplicate Detection

↓
Quality Checks

↓
Human Review

↓
Approve

↓
Publish

IMPORTANT:

AI-generated questions must NEVER automatically become trusted published content without configured review/quality controls.

Store:

AI job ID
Model/provider
Prompt metadata where appropriate
Generation timestamp
Generated questions
Review status
Reviewer
Final status

Do not expose API keys.

==================================================
26. AI QUESTION QUALITY CHECK
==================================================

For generated questions check:

Missing answer
Multiple correct options
No correct option
Option duplication
Question duplication
Explanation mismatch
Difficulty mismatch
Missing topic
Invalid formatting

Flag questionable questions.

==================================================
27. REPORT MANAGEMENT
==================================================

Central:

Reports Center

Question Reports
Technical Reports
Content Reports
User Reports

Filters:

Type
Status
Severity
Date

Actions:

Open
Assign
Resolve
Reject
Close

==================================================
28. TECHNICAL ERROR CENTER
==================================================

Show:

API errors
Test submission failures
Login failures
Sync failures
Background job failures

Fields:

Error ID
Feature
Severity
Timestamp
Status

Do NOT expose sensitive secrets or tokens in logs.

==================================================
29. SYSTEM STATUS
==================================================

Dashboard:

Backend
Database
Authentication
Storage
Email/OTP
AI service
Background jobs

Status:

Operational
Degraded
Down

Include:

Last checked
Safe error message

==================================================
30. ADMIN AUDIT LOG
==================================================

Record important admin actions.

Example:

Admin:
Content Admin

Action:
Edited Question

Entity:
Question #1024

Before:
Answer B

After:
Answer C

Date:
14 Sep 2026

Track:

Create
Edit
Delete/archive
Publish
Unpublish
Approve
Reject
Import
Export
Settings changes
Permission changes

Audit logs should be append-only from normal UI.

==================================================
31. ADMIN NOTIFICATIONS
==================================================

Show notifications for:

New question reports
Pending reviews
Import failures
System errors
Test submission failures
AI generation completed
Scheduled test
Critical system issues

Use severity levels.

==================================================
32. CONTENT SEARCH
==================================================

Global admin search.

Search across:

Questions
Users
Tests
Papers
Chapters
Reports
Notes
Flashcards

Example:

Search:
"Kinematics"

Results grouped by:

Questions
Topics
Tests
Reports

==================================================
33. ADMIN DASHBOARD WIDGETS
==================================================

Allow admin dashboard widgets to show:

Today's registrations
Today's tests
Pending reviews
Reported questions
AI drafts
System health
Top weak topics
Most attempted chapters

Admin should be able to hide/reorder non-critical widgets if architecture allows.

==================================================
34. DATA SAFETY
==================================================

NEVER hard delete important educational history.

Prefer:

Archive
Unpublish
Deactivate

Historical:

Test attempts
Answers
Scores
Question versions

must remain intact.

==================================================
35. DATABASE BACKUP / DATA MANAGEMENT
==================================================

Provide safe admin controls for:

Backup status
Export data
Import data

Do NOT expose raw MongoDB credentials.

Do not allow dangerous database operations from normal admin UI.

==================================================
36. ADMIN SETTINGS
==================================================

Settings:

General
Authentication
Exam configuration
Question settings
Test settings
Negative marking
Revision intervals
Difficulty thresholds
Ad configuration
Notification settings
AI settings
Maintenance mode
Feature flags

IMPORTANT:

Exam patterns should be configurable.

Do not hardcode JEE/NEET question counts permanently.

==================================================
37. AD MANAGEMENT
==================================================

Since PREPORA has free users:

Admin can configure:

Ad enabled/disabled
Placement
Frequency limit
Premium ad-free behavior

Important:

Maximum free-user ad frequency must be enforced server-side.

Never place ads:

Inside question options
Over active test controls
In a way that interferes with answering

==================================================
38. SUBSCRIPTION ARCHITECTURE
==================================================

Keep subscription architecture optional for future.

Plans:

Free
Premium

Admin can manage:

Plan name
Price
Features
Status

Do not make core educational content dependent on premium unless explicitly configured.

==================================================
39. FEATURE FLAGS
==================================================

Create feature flag system.

Examples:

AI Doubt
Community
Parent Dashboard
Flashcards
Adaptive Practice
Smart Revision

Admin can:

Enable
Disable

Prefer gradual rollout capability.

==================================================
40. ADMIN HELP / DOCUMENTATION
==================================================

Create simple Help section:

How to create questions
How to approve questions
How to import Excel
How duplicate detection works
How to create tests
How to interpret reports

==================================================
41. ADMIN UI DESIGN
==================================================

Use PREPORA design language.

Desktop-first but responsive.

Sidebar:

Dashboard
Students
Content
Questions
Tests
Papers
AI
Analytics
Reports
System
Settings

Use nested menus where required.

Design:

Clean
Premium
Professional
Information-dense but readable

Use:

Cards
Tables
Filters
Drawers
Modal editors
Tabs
Charts

Avoid:

Excessive gradients
Excessive glassmorphism
Huge decorative graphics
Unnecessary animations

Admin panel should feel like a serious control center.

==================================================
42. RESPONSIVE ADMIN
==================================================

Desktop:

Full sidebar + tables.

Tablet:

Collapsible sidebar.

Mobile:

Sidebar → drawer
Tables → responsive cards
Filters → bottom sheet
Actions → overflow menu

Admin should still be usable from mobile.

==================================================
43. PERFORMANCE
==================================================

Do NOT load thousands of records at once.

Use:

Pagination
Server-side filtering
Server-side sorting
Lazy loading
Debounced search
Virtualized lists where useful

Charts should request aggregated data instead of downloading raw records.

==================================================
44. API ARCHITECTURE
==================================================

Use the existing backend architecture.

Create secure endpoints for:

Admin authentication
Users
Questions
Question versions
Question reports
Subjects
Chapters
Topics
Tests
Test attempts
Papers
Answer keys
AI jobs
Imports
Exports
Audit logs
Technical reports
System health
Settings

Every endpoint must verify authorization.

==================================================
45. VALIDATION
==================================================

Validate:

Frontend
Backend
Database

Never rely only on frontend validation.

For important actions:

Create
Edit
Publish
Delete/archive
Import
Export
Change permissions

require appropriate permission checks.

==================================================
46. AUDITABLE IMPORTANT ACTIONS
==================================================

Every sensitive admin operation should generate an audit record.

Especially:

Question answer changes
Question deletion/archive
Publishing
Test changes
Student suspension
Permission changes
Settings changes
Bulk imports
Bulk edits

==================================================
47. FINAL ADMIN SIDEBAR
==================================================

FINAL STRUCTURE:

🏠 Dashboard

👨‍🎓 Students
   - All Students
   - Activity
   - Progress

📚 Content
   - Subjects
   - Chapters
   - Topics
   - Notes
   - Formulas
   - Flashcards

❓ Questions
   - All Questions
   - Create Question
   - Review Queue
   - Reports
   - Duplicate Queue
   - Versions
   - Import
   - Export

📝 Tests
   - All Tests
   - Create Test
   - Blueprint Builder
   - Scheduled Tests
   - Live Monitoring
   - Results

📄 Papers
   - PYQs
   - Model Papers
   - Sample Papers
   - Answer Keys

🤖 AI
   - Generate Questions
   - Draft Queue
   - AI Review
   - AI Jobs

📊 Analytics
   - Platform
   - Students
   - Questions
   - Tests
   - Weak Topics
   - Mistakes

🚨 Reports
   - Question Reports
   - Technical Reports
   - User Reports

🛠 System
   - System Status
   - Error Logs
   - Sync Status
   - Background Jobs

🔐 Security
   - Admins
   - Roles
   - Permissions
   - Sessions
   - Audit Logs

⚙ Settings
   - General
   - Exams
   - Tests
   - Revision
   - Ads
   - Subscriptions
   - Feature Flags

==================================================
48. MOST IMPORTANT RULE
==================================================

Admin panel must control the entire PREPORA content lifecycle:

CREATE
↓
VALIDATE
↓
DUPLICATE CHECK
↓
REVIEW
↓
APPROVE
↓
PUBLISH
↓
STUDENT USE
↓
REPORT
↓
REVIEW
↓
VERSION UPDATE
↓
ANALYTICS

Nothing important should require directly editing MongoDB manually.

==================================================
49. FINAL QA
==================================================

Before declaring completion verify:

[ ] Admin login
[ ] Role permissions
[ ] Student management
[ ] Question CRUD
[ ] Question review
[ ] Duplicate detection
[ ] Question versioning
[ ] Bulk import
[ ] Bulk export
[ ] Subject/chapter/topic management
[ ] Paper management
[ ] Test builder
[ ] Test blueprint
[ ] Test scheduling
[ ] Test monitoring
[ ] Result analytics
[ ] AI question generation
[ ] AI review queue
[ ] Notes
[ ] Formulas
[ ] Flashcards
[ ] Reports
[ ] Technical errors
[ ] System status
[ ] Audit logs
[ ] Admin notifications
[ ] Settings
[ ] Feature flags
[ ] Ad configuration
[ ] Subscription architecture
[ ] Mobile responsive
[ ] Server-side authorization
[ ] Existing student website still works

FINAL INSTRUCTION:

FIRST inspect the existing PREPORA codebase.

Identify existing:

- MongoDB models
- APIs
- Authentication
- Admin components
- Question system
- Test system
- User system
- Analytics
- Existing UI components

Then integrate the Admin Panel into the existing architecture.

DO NOT rewrite working systems unnecessarily.

DO NOT create duplicate models or APIs.

DO NOT use fake data in production screens.

DO NOT break existing student functionality.

Build this as a REAL production-ready PREPORA ADMIN CONTROL CENTER.