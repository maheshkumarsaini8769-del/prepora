PREPORA — PRODUCTION RELIABILITY & ACCOUNT SYSTEM UPGRADE

IMPORTANT:
This is an upgrade to the EXISTING PREPORA application.

DO NOT redesign the existing website.

DO NOT change the current PREPORA visual identity, layout, colors, typography, navigation or existing UI unnecessarily.

DO NOT remove or break any existing feature.

Keep the current PREPORA UI exactly as it is unless a small UI addition is required for one of the features below.

Implement all features as REAL working functionality, not dummy buttons or placeholder screens.

==================================================
1. 🔐 PROPER LOGIN + ACCOUNT RECOVERY
==================================================

Build a production-ready authentication system.

Support:

- Email + password login
- Email OTP verification
- Forgot password
- Reset password
- Logout
- Multiple-device sessions
- Session management
- Profile data synchronization

AUTH FLOW:

Signup:

Name
Email
Password
Confirm Password

Then:

Email verification / OTP

Login:

Email
Password

OR

Email OTP

Forgot Password:

Enter email
→ Send OTP / reset verification
→ Verify
→ New password
→ Confirm password
→ Password updated

SECURITY:

- Never store plain-text passwords.
- Hash passwords securely on the backend.
- Never expose authentication secrets to frontend.
- Validate all inputs server-side.
- Rate-limit login and OTP requests.
- OTP must expire.
- Prevent OTP brute force.
- Secure session/token handling.
- Logout must invalidate the appropriate session.
- Protect authenticated API routes.

MULTIPLE DEVICES:

Create a session/device system.

Example:

Chrome — Windows
Active now

Android Phone
Active 2 hours ago

Provide:

Manage Devices
Log out this device
Log out all other devices

Do not expose sensitive device information.

PROFILE SYNC:

The same account must show the same:

- Tests
- Attempts
- Bookmarks
- Mistakes
- Notes
- Revision
- Study plan
- Progress
- Weak topics

across devices.

==================================================
2. 📶 LOW INTERNET / NETWORK RECOVERY
==================================================

PREPORA must remain usable during unstable internet.

Especially during tests.

TEST ANSWER SAFETY:

When student selects an answer:

Immediately save it locally.

Do NOT depend on a successful network request before considering the answer safe.

Use local browser storage / IndexedDB for test state.

Store:

- Test ID
- Attempt ID
- Question ID
- Selected answer
- Mark for review
- Question status
- Current question
- Timer state
- Relevant timestamps

If internet disappears:

Show:

"Connection lost — your progress is safe."

Do NOT clear answers.

Do NOT restart the test.

Do NOT redirect the student to login.

When internet returns:

"Connection restored — syncing your progress..."

Then automatically sync unsent changes with backend.

IMPORTANT:

Use idempotent sync logic.

The same answer must not be duplicated if the request is retried.

Handle:

Online
→ Offline
→ Online

smoothly.

==================================================
3. 💾 AUTO-SAVE EVERYTHING
==================================================

The user should almost never need a manual Save button.

Automatically save:

- Test answers
- Practice progress
- Bookmarks
- Notes
- Mistakes
- Revision progress
- Study plan
- Flashcard progress
- Test position
- Question position
- Relevant user preferences

TEST AUTOSAVE:

Every answer change should be persisted locally immediately.

Backend sync should happen automatically whenever possible.

Also periodically sync active test state.

If the browser closes:

Restore the test safely.

Example:

"Continue Kinematics Test"

Q17 / 30

Continue Test

Do not lose completed answers.

PRACTICE AUTOSAVE:

If student leaves:

Save:

Chapter
Topic
Current question
Answered questions
Progress

When returning:

"Continue Practice"

==================================================
4. 🧹 DUPLICATE QUESTION DETECTION
==================================================

Build duplicate detection into the question management system.

Before adding a question:

Check exact duplicates.

Then check similar/semantic duplicates.

Compare:

- Question text
- Options
- Concept
- Topic
- Correct answer
- Question structure

Use multiple levels:

EXACT DUPLICATE

SIMILAR QUESTION

POSSIBLE DUPLICATE

UNIQUE

ADMIN WARNING:

When creating/importing:

"Possible duplicate detected."

Show:

Existing Question
New Question
Similarity score
Topic
Source

Admin actions:

Keep New
Use Existing
Edit New
Ignore Warning

IMPORTANT:

Do not automatically delete questions.

Duplicate detection should warn the admin.

For AI-generated questions, duplicate checking must happen BEFORE publishing.

==================================================
5. ✅ QUESTION QUALITY CONTROL
==================================================

Students must be able to report problematic questions.

Add:

Report Question

Reasons:

- Wrong Answer
- Wrong Explanation
- Ambiguous Question
- Typo / Spelling
- Duplicate
- Incorrect Option
- Missing Information
- Other

Optional:

Student comment

Admin panel:

Question Reports

Each report:

Question
Reported by
Reason
Comment
Date
Status

Statuses:

Pending
Under Review
Resolved
Rejected

Admin actions:

Review
Edit Question
Change Answer
Change Explanation
Reject Report
Mark Resolved

IMPORTANT:

Do not automatically change a question based on one student report.

Require admin review.

After correction:

Keep change history.

==================================================
6. 📚 CONTENT VERSIONING
==================================================

Question and chapter content must be versioned.

IMPORTANT PROBLEM TO SOLVE:

If a question is edited after students have already attempted it, old attempts must remain historically correct.

Example:

Question Version 1
Student attempted it
Later admin edits question

Old attempt must still reference:

Question Version 1

New tests use:

Question Version 2

Store:

questionId
versionNumber
questionSnapshot / immutable attempt snapshot

Track:

Created
Edited
Published
Unpublished
Archived

QUESTION HISTORY:

Admin should be able to see:

Version 1
Version 2
Version 3

For every version:

Question text
Options
Correct answer
Explanation
Difficulty
Tags
Changed by
Changed at

Do NOT overwrite historical attempt data.

==================================================
7. 🔄 CONTINUE WHERE YOU LEFT
==================================================

Create a universal continuation system.

If student leaves:

Practice
Test
Revision
Study session

save their last state.

Dashboard should show:

CONTINUE WHERE YOU LEFT

Example:

Continue Kinematics Practice

Question 17 / 30

68% completed

[Continue]

For tests:

Continue Full Mock Test

Question 42 / 75

Time remaining:
01:24:35

[Continue Test]

For practice:

Continue Physics
→ Kinematics
→ Question 17

Restore:

- Current question
- Selected answers
- Marked questions
- Timer where applicable
- Progress
- Question state

IMPORTANT:

Never restore an expired/submitted test as active.

==================================================
8. 📥 ADMIN IMPORT / EXPORT
==================================================

Build a complete admin bulk content management system.

IMPORT:

Support:

CSV
Excel (.xlsx)

Admin flow:

Upload file
→ Validate
→ Preview
→ Detect errors
→ Detect duplicates
→ Show import summary
→ Confirm
→ Import

Before import show:

Total rows
Valid rows
Invalid rows
Duplicate rows
Warnings

Example:

500 rows

Valid: 472
Invalid: 18
Possible duplicates: 10

Admin can download error report.

VALIDATION:

Check:

Required fields
Subject
Chapter
Topic
Question
Options
Correct answer
Difficulty
Question type

Prevent invalid data from entering production.

BULK EDIT:

Admin can select multiple questions and change:

Subject
Chapter
Topic
Difficulty
Tags
Status

Do not accidentally overwrite question content.

EXPORT:

Export questions.

Export tests.

Export reports.

Export selected data.

Use CSV/XLSX where appropriate.

==================================================
9. 🛠️ ADMIN AUDIT LOG
==================================================

Create a complete admin audit system.

Track important admin actions.

Example:

Admin A

Edited Question #1234

14 Sep 2026
10:42 AM

Changed:

Correct Answer:
B → C

Explanation:
Updated

Store:

Admin ID
Admin role
Action
Entity type
Entity ID
Before value
After value
Timestamp
Relevant metadata

Actions to track:

Create
Edit
Delete/archive
Publish
Unpublish
Approve
Reject
Import
Export
Change answer
Change explanation
Change difficulty
Change permissions
Change settings

ADMIN AUDIT PAGE:

Filters:

Admin
Action
Entity
Date range

Search:

Question ID
Test ID
Admin

IMPORTANT:

Audit logs should be append-only from normal admin UI.

==================================================
10. 🚨 SYSTEM STATUS / ERROR REPORTING
==================================================

Create a technical issue reporting system.

STUDENT:

Add:

Report Technical Problem

Reasons:

Test submission failed
Page not loading
Login problem
Question not loading
Timer problem
Payment problem
Other

Student can add:

Description
Screenshot if supported
Current page
Test ID if applicable

Automatically capture safe technical context:

Browser
Device type
OS
App version
Route/page
Timestamp
Relevant request/error ID

Do NOT collect unnecessary personal information.

ADMIN:

Create:

System Reports

Show:

Issue
Severity
Status
Affected feature
Date
User report
Error ID

Statuses:

Open
Investigating
Resolved
Closed

Severity:

Low
Medium
High
Critical

==================================================
11. 🚨 TEST SUBMISSION FAILURE TRACKING
==================================================

This is especially important.

When student clicks:

SUBMIT TEST

Do NOT immediately destroy local test state.

Submission flow:

1. Validate local test state
2. Save final state locally
3. Send submission request
4. Backend validates attempt
5. Backend calculates/stores result
6. Confirm successful submission
7. Mark local attempt submitted
8. Clear temporary active-test state only AFTER successful confirmation

If submission fails:

Show:

"Test submission couldn't be completed."

Your answers are safe.

[Retry Submission]

Do not force the student to retake the test.

If internet is unavailable:

"You're offline. Your answers are saved and will be submitted when you're connected."

==================================================
12. 🔁 RELIABLE SYNC ENGINE
==================================================

Create a small reusable sync layer.

Each local change should have:

event/change ID
entity ID
timestamp
operation
sync status

Statuses:

Pending
Syncing
Synced
Failed

If sync fails:

Retry automatically with safe backoff.

Prevent:

Duplicate records
Duplicate answers
Duplicate submissions

Use idempotency keys for important backend operations such as:

Test submission
Answer synchronization
Bulk import

==================================================
13. 🌐 NETWORK STATUS UI
==================================================

Global network indicator.

ONLINE:

Normal state.

OFFLINE:

Show small banner:

"You are offline. Your progress is saved locally."

RECONNECT:

"Back online. Syncing..."

SYNC COMPLETE:

"All changes synced."

Do not constantly show annoying notifications.

==================================================
14. 🧠 DATA SAFETY RULE
==================================================

The following hierarchy must be followed:

LOCAL SAVE
↓
SERVER SYNC
↓
SERVER CONFIRMATION

Never:

SERVER FAILURE
↓
DELETE LOCAL DATA

Never lose student progress because of:

- network failure
- browser refresh
- accidental tab close
- API timeout
- temporary server error

==================================================
15. 🗄️ DATABASE REQUIREMENTS
==================================================

Use the existing MongoDB architecture.

Add/update appropriate collections/models for:

Users
Sessions
Questions
QuestionVersions
QuestionReports
TestAttempts
TestAnswers
SyncEvents
AuditLogs
TechnicalReports
ImportJobs
ImportErrors

Use proper indexes.

Important indexes should include appropriate combinations for:

userId
attemptId
questionId
version
status
createdAt

Do not create unnecessary indexes.

==================================================
16. 🔒 SECURITY REQUIREMENTS
==================================================

Backend must be the source of truth for:

Authentication
Authorization
Test submission
Scoring
Question publishing
Admin actions
Import validation
Audit logging

Never trust:

Frontend score
Frontend admin role
Frontend permissions
Frontend submission status

Admin APIs must verify admin authorization server-side.

Validate all request bodies.

Rate-limit sensitive endpoints.

Do not expose:

JWT secrets
MongoDB credentials
API keys
OTP secrets

to the browser.

==================================================
17. 🧪 EDGE CASE TESTING
==================================================

Test these scenarios:

A.
Student answers Q1
→ Internet disconnects
→ Student answers Q2
→ Refresh
→ Answers remain.

B.
Student starts test
→ Browser closes
→ Reopens website
→ Continue Test appears.

C.
Student submits test
→ Network fails
→ Retry
→ Only one final submission created.

D.
Admin imports 500 questions
→ 20 invalid
→ 10 duplicates
→ Valid questions imported
→ Errors downloadable.

E.
Admin edits a question
→ Old student attempt remains unchanged.

F.
Two devices open same account
→ Changes synchronize safely.

G.
Student reports wrong answer
→ Admin reviews
→ Corrects question
→ Old attempt remains linked to old version.

H.
Admin changes explanation
→ Audit log records before/after.

I.
API temporarily fails
→ UI doesn't lose local data.

==================================================
18. UI ADDITIONS
==================================================

Only add UI where necessary.

Add:

Profile
→ Security
→ Active Devices

Dashboard:

Continue Where You Left

Test:

Connection status

Practice:

Autosave status only when useful

Question:

Report Question

Admin:

Question Reports
Import/Export
Audit Logs
System Reports
Import Jobs

Do NOT redesign the entire website for these features.

==================================================
19. IMPORTANT UX RULE
==================================================

The system should feel automatic.

Student should NOT have to think:

"Did my answer save?"

Instead:

Answer selected
→ automatically saved.

Network lost
→ progress remains safe.

Network returns
→ automatically syncs.

Browser closed
→ Continue Test appears.

Submission failed
→ Retry without losing answers.

==================================================
20. FINAL ACCEPTANCE CRITERIA
==================================================

Do not mark this work complete just because the UI exists.

Each feature must actually work end-to-end.

Verify:

[ ] Login works
[ ] OTP works
[ ] Forgot password works
[ ] Multiple-device sessions work
[ ] Profile sync works
[ ] Offline answer saving works
[ ] Reconnection sync works
[ ] Autosave works
[ ] Continue where left works
[ ] Duplicate detection works
[ ] Question reporting works
[ ] Admin review works
[ ] Question versioning works
[ ] Historical attempts remain correct
[ ] CSV import works
[ ] Excel import works
[ ] Validation works
[ ] Export works
[ ] Audit logs work
[ ] Technical reports work
[ ] Test submission failure recovery works
[ ] No duplicate submission occurs
[ ] Admin authorization is server-side
[ ] Existing PREPORA features still work
[ ] Existing PREPORA UI is not unnecessarily changed
[ ] Mobile responsive behavior works

==================================================
FINAL INSTRUCTION
==================================================

First inspect the EXISTING PREPORA codebase and database structure.

Do not blindly create duplicate models, APIs, components or pages.

Reuse existing architecture wherever possible.

Before changing anything:

1. Identify existing authentication.
2. Identify existing MongoDB models.
3. Identify existing test/attempt system.
4. Identify existing question system.
5. Identify existing admin panel.
6. Identify existing state management.
7. Identify existing API layer.
8. Identify existing local storage mechanisms.

Then implement these features incrementally.

Preserve backward compatibility.

Do not break existing data.

Do not replace working functionality unnecessarily.

The goal is to make PREPORA reliable enough for real students, especially during long tests and unstable Indian mobile networks.

BUILD PRODUCTION-READY FUNCTIONALITY, NOT MOCK UI.