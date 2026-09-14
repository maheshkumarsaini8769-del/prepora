PREPORA — CONNECT EXISTING PROJECT TO MONGODB

IMPORTANT:
The existing PREPORA frontend is already built.

DO NOT rebuild the UI.
DO NOT redesign the existing website.
DO NOT remove existing features.
DO NOT break existing routes.
DO NOT create a second test engine.

Your job is now to convert the existing prototype into a real full-stack application using:

Frontend:
Existing PREPORA frontend

Backend:
Node.js + Express + TypeScript
(or use the project's existing backend framework if one already exists)

Database:
MongoDB

==================================================
MONGODB CREDENTIALS
==================================================

I will provide the MongoDB connection details through environment variables.

Create/use:

MONGODB_URI="mongodb+srv://<db_username>:BJF9QCgdvWliHs02@cluster0.077ex67.mongodb.net/?appName=Cluster0"
MONGODB_USERNAME="maheshkumarsaini8769_db_user"
MONGODB_PASSWORD="BJF9QCgdvWliHs02"
MONGODB_DATABASE="prepore_db"

IMPORTANT:

NEVER put these values directly inside frontend code.

NEVER expose MongoDB credentials to the browser.

NEVER commit .env to Git.

Create:

.env

and:

.env.example

The real .env must be ignored by Git.

If the MongoDB connection URI already contains username/password, use the URI appropriately instead of unnecessarily duplicating credentials.

==================================================
1. FIRST INSPECT THE EXISTING PROJECT
==================================================

Before modifying anything:

Inspect the complete existing project.

Understand:

- Framework
- Folder structure
- Existing routes
- Existing components
- Existing test engine
- Existing mock services
- Existing types
- Existing localStorage
- Existing state management
- Existing admin pages

Do NOT blindly overwrite files.

Create a short implementation plan based on the actual existing code.

Then implement it.

==================================================
2. ARCHITECTURE
==================================================

Use:

Frontend
    ↓
Backend API
    ↓
MongoDB

Never:

Frontend
    ↓
MongoDB directly

The browser must communicate only with backend API endpoints.

==================================================
3. DATABASE CONNECTION
==================================================

Create a centralized MongoDB connection.

Use:

MONGODB_URI

Support connection pooling.

Handle:

- Connection errors
- Reconnection
- Graceful shutdown
- Environment validation

Application should fail clearly if required environment variables are missing.

Do not expose credentials in error messages.

==================================================
4. DATABASE MODELS
==================================================

Create proper MongoDB/Mongoose models OR use the project's existing database library if appropriate.

Create models for:

User
Profile
Exam
Class
Subject
Chapter
Topic
Question
Test
TestAttempt
TestAnswer
Paper
PaperQuestion
AnswerKey
Bookmark
Mistake
RevisionItem
Flashcard
Formula
Note
StudyPlan
StudyTask
StudySession
Progress
ChapterMastery
WeakTopic
Goal
Milestone
Doubt
Message
MessageThread
Notification
QuestionReport
LeaderboardEntry

Do NOT create unnecessary collections if embedding/subdocuments is more appropriate.

Design schemas for scalability.

==================================================
5. USER / PROFILE
==================================================

Store:

userId
name
email
class
exam
board
targetYear
targetScore
createdAt
updatedAt

Prepare architecture for authentication.

Do not implement insecure password storage.

If authentication already exists in the project, integrate it securely.

Otherwise create the database architecture first and clearly separate authentication from profile data.

==================================================
6. QUESTION DATABASE
==================================================

Question schema should support:

id
exam
class
board
subject
chapter
topic
difficulty
questionType

questionEn
questionHi

options
correctAnswer

explanation
concept
given
find
formula
steps
finalAnswer
commonMistake
examTip

recommendedTimeSeconds

source
sourceYear
sourceSession

status

createdAt
updatedAt

Support:

Original
PYQ
Model
Demo

Do not copy copyrighted content.

==================================================
7. TEST DATABASE
==================================================

Test schema:

id
title
exam
class
subjects
chapters
topics
questionIds
questionCount
durationSeconds
difficulty
source
negativeMarking
marksPerCorrect
marksPerWrong
calculatorEnabled
languageOptions
recommendedSubjectTime

createdAt
updatedAt

Make exam configuration flexible.

Do NOT hardcode one permanent JEE/NEET pattern.

==================================================
8. TEST ATTEMPT
==================================================

This is extremely important.

Store every attempt.

TestAttempt:

id
userId
testId

startedAt
submittedAt
totalTimeSeconds

score
maxScore

correct
wrong
unattempted

accuracy

subjectPerformance

questionAnswers

Question-level data:

questionId
selectedAnswer
isCorrect
isAnswered
isMarkedForReview
isVisited
timeSpentSeconds
recommendedTimeSeconds
timeTag

Possible:

Speed Master
Time Drainer
Negative Trap
Unattempted
Time Out

Also store:

mistakeReason
mistakeNote

This data will power PREPORA analytics.

==================================================
9. TIME ANALYTICS
==================================================

Store actual question-level time.

Do NOT calculate from fake values.

Use:

questionStartedAt
questionEndedAt
timeSpentSeconds

Calculate:

Average Time
Fastest
Slowest
Time Drainers
Speed Masters
Negative Traps

Create reusable analytics functions.

==================================================
10. MISTAKE BOOK
==================================================

Store:

userId
questionId
testAttemptId

mistakeReason:

Calculation Error
Formula Forgot
Concept Not Clear
Misread Question
Wrong Option Selected
Ran Out of Time
Guess
Careless Mistake
Other

mistakeNote

createdAt
updatedAt

Support:

Retry
View Solution
Edit Tag
Delete

Track repeated mistakes.

==================================================
11. WEAKNESS ENGINE
==================================================

Create server-side/service-layer calculations for:

Weak Topics
Chapter Mastery
Subject Performance

Use:

Accuracy
Attempt Count
Wrong Answers
Difficulty
Time
Repeated Mistakes

Return:

Strong
Needs Improvement
Weak

Do not claim AI.

Use rule-based analytics initially.

==================================================
12. REVISION SYSTEM
==================================================

Store:

userId
questionId
source
scheduledDate
status
revisionStage

Support:

Day 1
Day 3
Day 7
Day 14

Allow:

Review Now
Move
Mastered

==================================================
13. FLASHCARDS
==================================================

Store:

subject
chapter
topic
front
back
formula
unit
importance

User flashcard progress:

known
needsRevision
lastReviewed
nextReview

==================================================
14. FORMULA SHEET
==================================================

Store:

subject
chapter
topic
formulaName
formula
variables
unit
note

Frontend should retrieve formulas through API.

==================================================
15. NOTES
==================================================

Store user notes:

userId
title
content
subject
chapter
topic
createdAt
updatedAt

CRUD:

Create
Read
Update
Delete

==================================================
16. DAILY PLAN
==================================================

Store:

userId
date
tasks

Task:

type
title
subject
chapter
topic
duration
questionCount
status

Support:

Pending
In Progress
Completed
Skipped

==================================================
17. GOALS
==================================================

Store:

userId
exam
targetScore
targetDate
currentScore
progress

Milestones.

==================================================
18. DOUBT CENTER
==================================================

Store:

Doubt:

userId
questionId
subject
chapter
topic
message
status
createdAt
updatedAt

Status:

Open
In Review
Answered
Closed

Allow:

Question attachment
Text

Prepare for future image attachments.

==================================================
19. DM / MESSAGES
==================================================

Create:

MessageThread
Message

Support:

Student → Mentor
Student → Support

Message:

senderId
threadId
text
attachedQuestionId
readAt
createdAt

DO NOT create unrestricted anonymous student-to-student messaging.

Prepare fields for:

Report
Block
Moderation

==================================================
20. NOTIFICATIONS
==================================================

Store:

userId
title
message
type
read
createdAt

Support:

Mark as read
Mark all as read

==================================================
21. BOOKMARKS
==================================================

Store:

userId
itemType
itemId
createdAt

Support:

Questions
Tests
Papers
Notes
Formula
Flashcards

==================================================
22. QUESTION REPORTS
==================================================

Store:

userId
questionId
reason
message
status
createdAt
resolvedAt

Admin can:

Review
Resolve
Dismiss

==================================================
23. SYLLABUS
==================================================

Create hierarchical structure:

Exam
→ Class
→ Subject
→ Chapter
→ Topic

Do not duplicate syllabus unnecessarily.

Student progress should reference these IDs.

==================================================
24. API STRUCTURE
==================================================

Create clean REST APIs.

Example:

/api/auth

/api/users
/api/profile

/api/exams
/api/subjects
/api/chapters
/api/topics

/api/questions
/api/questions/:id

/api/practice

/api/tests
/api/tests/:id

/api/test-attempts
/api/test-attempts/:id

/api/papers

/api/bookmarks

/api/mistakes

/api/weakness

/api/revision

/api/formulas

/api/flashcards

/api/notes

/api/study-plan

/api/goals

/api/performance

/api/doubts

/api/messages

/api/notifications

/api/reports

Use proper HTTP methods:

GET
POST
PATCH
DELETE

Use validation.

==================================================
25. SECURITY
==================================================

Implement:

Input validation
Request validation
Authentication-ready middleware
Authorization
Admin authorization
Rate limiting where appropriate
CORS configuration
Secure headers
Error handling

Never trust client-provided:

userId
score
correctAnswer
admin status

Server should calculate important values.

For test results:

The server should verify answers against the database's correct answer.

Do NOT accept:

{
  score: 300
}

from the frontend as the source of truth.

==================================================
26. ADMIN
==================================================

Connect existing Admin Panel to MongoDB.

Admin can:

Create Question
Edit Question
Delete Question
Approve Question

Create Test
Edit Test
Delete Test

Manage Papers
Manage Reports

Manage Chapters
Manage Topics

Manage Users where authorized

==================================================
27. QUESTION CRUD
==================================================

Admin question editor must save to MongoDB.

Fields:

Question
Options
Correct Answer
Explanation
Concept
Formula
Steps
Difficulty
Exam
Class
Subject
Chapter
Topic
Recommended Time
Source
Status

Validation required.

==================================================
28. TEST BUILDER
==================================================

Existing Build My Test should use real MongoDB questions.

Student selects:

Exam
Class
Subjects
Chapters
Topics
Question count
Difficulty
Source
Duration
Negative marking

Backend selects suitable questions.

Avoid duplicates.

If insufficient questions:

Return:

"Only X suitable questions are available."

Never silently generate unavailable questions.

==================================================
29. SEARCH
==================================================

Connect global search to MongoDB.

Search:

Questions
Chapters
Topics
Tests
Papers
Formula
Flashcards
Notes

Add indexes for common searches.

Do not scan the entire database unnecessarily.

==================================================
30. PERFORMANCE
==================================================

Add appropriate MongoDB indexes.

Especially:

Questions:
exam
class
subject
chapter
topic
difficulty

TestAttempts:
userId
testId
createdAt

Mistakes:
userId
questionId
createdAt

Revision:
userId
scheduledDate

Messages:
threadId
createdAt

Notes:
userId
updatedAt

Use pagination.

Do NOT return thousands of records in one request.

==================================================
31. MIGRATE MOCK DATA
==================================================

The existing mock data should NOT simply remain the permanent source.

Create a migration/seed script.

Example:

npm run seed

It should insert demo:

Users
Questions
Tests
Chapters
Subjects
Papers
Formulas
Flashcards

Clearly mark demo data.

Avoid duplicate seed records.

Use stable IDs or upsert logic.

==================================================
32. FRONTEND SERVICE LAYER
==================================================

Replace:

mockQuestionService

with:

apiQuestionService

Replace:

mockTestService

with:

apiTestService

Replace:

mockProgressService

with:

apiProgressService

etc.

The UI components should NOT directly contain fetch logic everywhere.

Use centralized API services.

==================================================
33. API ERROR HANDLING
==================================================

Frontend must properly handle:

Loading
Error
Empty
Unauthorized
Forbidden
Not Found
Validation Error
Server Error

Show user-friendly messages.

Never show raw database errors.

==================================================
34. OFFLINE / NETWORK HANDLING
==================================================

If API is unavailable:

Show:

"Unable to connect. Please try again."

Do not erase local unsaved state.

For an active test, preserve the current local test state temporarily so a network failure does not immediately destroy the student's answers.

==================================================
35. TEST SUBMISSION SAFETY
==================================================

Prevent duplicate submission.

Use:

submission status

Example:

in_progress
submitting
submitted

If the user double clicks Submit:

Only one submission should be created.

==================================================
36. IMPORTANT TEST LOGIC
==================================================

During test:

Frontend tracks interaction.

Backend receives final attempt data.

Backend verifies:

- Test exists
- Questions belong to test
- Selected options are valid
- Correct answers from database
- Marks
- Negative marking
- Score
- Accuracy
- Correct/Wrong/Unattempted

Server generates authoritative result.

==================================================
37. ANALYTICS
==================================================

Create backend functions for:

Score
Accuracy
Time Analytics
Subject Performance
Chapter Performance
Difficulty Performance
Mistake Patterns
Weak Topics
Readiness Score

Keep calculations modular.

==================================================
38. PRIVACY
==================================================

Students should only be able to access their own:

Attempts
Mistakes
Bookmarks
Notes
Goals
Revision
Messages
Doubts
Personal progress

One student must NEVER be able to request another student's private data by changing an ID in the URL.

==================================================
39. ADMIN SECURITY
==================================================

Admin endpoints must require admin authorization.

Never rely on:

isAdmin: true

from frontend request body.

Determine authorization server-side.

==================================================
40. ENVIRONMENT VARIABLES
==================================================

Create:

.env.example

Example:

MONGODB_URI=
MONGODB_DATABASE=
JWT_SECRET=
API_BASE_URL=

Do not put real secrets into source code.

Add .env to .gitignore.

==================================================
41. HEALTH CHECK
==================================================

Create:

GET /api/health

Return:

API status
Database status

Example:

{
  "api": "ok",
  "database": "connected"
}

Do not expose credentials.

==================================================
42. DEVELOPMENT MODE
==================================================

Support:

npm run dev

Frontend and backend should be easy to run.

Document:

How to install
How to configure .env
How to seed database
How to start frontend
How to start backend

==================================================
43. DEPLOYMENT PREPARATION
==================================================

Prepare production-safe configuration.

Do NOT hardcode localhost.

Use environment variables for:

API URL
MongoDB
JWT
CORS

The final architecture should support deployment later.

==================================================
44. DO NOT BREAK THE UI
==================================================

Existing PREPORA design must remain.

Do not redesign:

Dashboard
Practice
Test screen
Result
Admin
Mobile navigation

Only connect them to real APIs and add required loading/error states.

==================================================
45. MIGRATION CHECK
==================================================

After implementation verify:

Dashboard loads from API

↓

Practice loads questions from MongoDB

↓

Question answer works

↓

Practice result works

↓

Start Test

↓

Timer works

↓

Question navigation works

↓

Question-level time stored

↓

Submit Test

↓

Backend calculates result

↓

Result displayed

↓

Mistakes stored

↓

Mistake tagging works

↓

Weakness updates

↓

Revision queue updates

↓

Flashcard progress stores

↓

Notes save

↓

Bookmarks save

↓

Doubt saves

↓

Messages save

↓

Search works

↓

Admin can manage questions

↓

Build My Test uses MongoDB

==================================================
46. DATABASE QUALITY
==================================================

Use:

Indexes
Validation
Pagination
Timestamps
References
Proper schema design

Avoid:

Huge documents
Duplicated question data
Unbounded arrays
N+1 queries
NoSQL injection vulnerabilities

==================================================
47. IMPORTANT — DO NOT DELETE MOCK FUNCTIONALITY UNTIL API WORKS
==================================================

Implement feature-by-feature.

Recommended migration order:

1. MongoDB connection
2. Models
3. Seed data
4. Question API
5. Test API
6. Test attempt API
7. Result calculation
8. Mistakes
9. Progress
10. Revision
11. Notes
12. Bookmarks
13. Flashcards
14. Daily Plan
15. Doubts
16. Messages
17. Admin
18. Search
19. Remaining analytics

After each migration, test the feature.

==================================================
48. FINAL SECURITY CHECK
==================================================

Before finishing:

Search the complete project for:

MongoDB URI
MongoDB password
JWT secret
API keys
Passwords
Secrets

Make sure no real secret is committed into source code.

Check .gitignore.

==================================================
49. FINAL DELIVERABLE
==================================================

At the end provide:

1. Backend structure
2. Frontend changes
3. MongoDB schemas
4. API endpoints
5. Environment variables
6. Seed command
7. Development commands
8. Database indexes
9. Authentication architecture
10. Security measures
11. Features successfully connected
12. Features still using mock data
13. Exact next steps

MOST IMPORTANT:

DO NOT JUST CONNECT MONGODB.

CONNECT THE EXISTING PREPORA PRODUCT PROPERLY.

The final architecture must be:

PREPORA FRONTEND
        ↓
SECURE BACKEND API
        ↓
MONGODB

The student experience must remain unchanged except that data is now persistent and real.