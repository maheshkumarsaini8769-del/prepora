You are working on my existing PREPORA student planner website.

Existing website:
https://test-green-pi-22.vercel.app/planner

IMPORTANT:
Do NOT rebuild the entire website from scratch.
Do NOT unnecessarily change the existing UI/design.
First inspect the existing project structure, frontend, backend, database models, authentication logic, routes, planner logic, and existing UI. Understand what is already implemented, then integrate the new system cleanly.

## MAIN GOAL

Build a secure student authentication and student-isolated data system with:

1. WhatsApp OTP for first-time verification
2. Automatically generated unique password after OTP verification
3. Normal future login using mobile number + password
4. OTP should NOT be required for every login
5. Only ONE active login/session per student at a time
6. If the same student logs in on another phone/browser, the previous session must immediately become invalid
7. Every student's planner/data must be completely isolated
8. Admin must be able to see each student's data separately
9. Admin must be able to force logout a student
10. Maintain student login/session/activity history
11. Add a daily student activity/progress stream
12. Keep the architecture production-ready and scalable

==================================================
1. FIRST AUDIT THE EXISTING PROJECT
==================================================

Before writing code:

- Inspect all frontend folders
- Inspect all backend folders
- Inspect package.json files
- Inspect existing React routes
- Inspect existing authentication
- Inspect existing API endpoints
- Inspect MongoDB/Mongoose models
- Inspect environment variables
- Inspect planner components
- Inspect current student data structure
- Inspect admin functionality if already present
- Inspect current login/register pages
- Inspect current deployment configuration

Create an internal understanding of:

Frontend:
React / Vite / existing framework

Backend:
Node.js / Express / existing architecture

Database:
MongoDB / Mongoose

Do not replace working functionality unless necessary.

If something already exists, extend it instead of creating duplicate systems.

==================================================
2. STUDENT ACCOUNT SYSTEM
==================================================

Create a Student model similar to:

Student {
    _id,
    studentId,
    name,
    mobile,
    passwordHash,

    whatsappVerified,

    status,

    createdAt,
    updatedAt,
    lastLoginAt,
    lastLogoutAt,

    currentSessionId,

    profileData
}

studentId must be unique.

mobile must be unique.

Never store the plain-text password.

Use a strong password hashing algorithm such as Argon2id or bcrypt with an appropriate cost factor.

==================================================
3. FIRST-TIME REGISTRATION
==================================================

Flow:

Student enters:

Mobile Number
Name / required registration information

Then:

SEND WHATSAPP OTP

WhatsApp OTP verification is required only for account verification/recovery/new-device verification.

After successful OTP verification:

Automatically create the student account.

Generate a cryptographically secure random password.

DO NOT use:

9999

as a production password.

9999 may exist only as a development/testing fallback if absolutely required, and it must be disabled in production.

Generated password example:

Pp7#Kx29Lm

Show it once to the student:

--------------------------------
Account Created Successfully

Mobile:
98XXXXXXXX

Password:
Pp7#Kx29Lm

[Copy Password]

Save this password safely.
--------------------------------

Do not store the plain-text password in the database.

Store only passwordHash.

==================================================
4. NORMAL LOGIN
==================================================

After first registration, the student should NOT need WhatsApp OTP for every login.

Login page:

Mobile Number
Password

[Login]

Backend:

1. Find student by mobile
2. Verify password
3. Create new authenticated session
4. Revoke previous active session
5. Store new currentSessionId
6. Create secure authentication cookie/session
7. Redirect to planner

==================================================
5. SINGLE ACTIVE DEVICE / SESSION SYSTEM
==================================================

THIS IS CRITICAL.

Each student can have only ONE active authenticated session.

Example:

Student logs in on Phone A.

Database:

currentSessionId = SESSION_A

Phone A works normally.

Then the same student logs in on Phone B.

Backend must:

1. Detect existing SESSION_A
2. Revoke SESSION_A
3. Create SESSION_B
4. Set currentSessionId = SESSION_B

Phone A must no longer be authorized.

When Phone A makes another API request:

Backend checks:

Does authenticated session ID equal student's currentSessionId?

If NO:

Return something like:

401 SESSION_REVOKED

Frontend automatically logs the student out and shows:

"Your account was signed in on another device."

Then redirect to login.

DO NOT implement this security only with localStorage.

The server/database must be the source of truth.

==================================================
6. SESSION SECURITY
==================================================

Use secure server-side authentication.

Prefer:

HttpOnly
Secure
SameSite

cookies for browser authentication.

Do not put sensitive authentication tokens in localStorage unless there is a strong architectural reason.

Session IDs must be:

- Cryptographically random
- Unpredictable
- Expire appropriately
- Revocable
- Rotated when appropriate

Create a Session model if required:

Session {
    _id,
    sessionId,
    studentId,
    deviceInfo,
    userAgent,
    ipAddress,
    createdAt,
    lastActiveAt,
    expiresAt,
    revokedAt,
    revokeReason,
    status
}

Only one session may have:

status = ACTIVE

for a student.

==================================================
7. LOGOUT
==================================================

When student clicks Logout:

1. Revoke current session
2. Clear secure authentication cookie
3. Update lastLogoutAt
4. Redirect to login

Do not delete the student account.

==================================================
8. PASSWORD CHANGE
==================================================

Add:

Settings
→ Change Password

Fields:

Current Password
New Password
Confirm New Password

After successful password change:

- Hash new password
- Update passwordHash
- Revoke existing sessions
- Require a fresh login

Show:

"Password changed successfully. Please log in again."

==================================================
9. FORGOT PASSWORD
==================================================

Because the student normally logs in with password, provide:

Forgot Password?

Flow:

Mobile Number
↓
WhatsApp OTP
↓
Verify OTP
↓
Create new password
OR
Generate secure temporary password

Do NOT expose whether a mobile number exists in a way that enables account enumeration.

Rate-limit OTP requests.

Rate-limit login attempts.

==================================================
10. OTP SYSTEM
==================================================

WhatsApp OTP should NOT be used for normal login.

Use OTP for:

- First account verification
- Forgot password
- Account recovery
- Suspicious/new-device verification if later enabled
- Important security actions if required

OTP requirements:

- Short expiry
- One-time use
- Store hashed OTP where practical
- Maximum attempts
- Resend cooldown
- Rate limiting
- Never log OTP in production
- Never expose OTP in API responses

Create a clean WhatsApp OTP service abstraction so the provider can be changed later.

Example:

WhatsAppOTPService.sendOTP()
WhatsAppOTPService.verifyOTP()

Do not hard-code provider credentials.

Use environment variables.

==================================================
11. STUDENT DATA ISOLATION
==================================================

THIS IS EXTREMELY IMPORTANT.

Every student-owned database record must contain:

studentId

Examples:

Planner
Task
DailyProgress
StudySession
Notes
Attendance
Activity
Goals

Example:

{
    studentId: "...",
    date: "...",
    tasks: [...]
}

Every API must derive studentId from the authenticated session.

DO NOT trust:

studentId

sent by the frontend.

Bad:

GET /planner?studentId=STUDENT_A

Better:

GET /planner

Backend gets:

studentId = authenticatedSession.studentId

Then queries:

Planner.find({
    studentId: authenticatedStudentId
})

A student must NEVER be able to access another student's data by changing an ID in the browser/API.

Apply authorization at the backend/database query level.

==================================================
12. DAILY STUDENT STREAM
==================================================

Create a daily activity/progress stream for each student.

Example:

05 October 2026

08:00
Planner opened

09:15
Task "Mathematics" completed

11:20
Study session completed

01:30
Task "English" completed

04:45
Daily goal completed

Store meaningful activity events.

Possible model:

StudentActivity {
    _id,
    studentId,
    type,
    title,
    description,
    metadata,
    createdAt
}

Examples:

LOGIN
LOGOUT
TASK_COMPLETED
TASK_CREATED
PLANNER_OPENED
STUDY_SESSION_STARTED
STUDY_SESSION_COMPLETED
GOAL_COMPLETED
PASSWORD_CHANGED

Do not create unnecessary activity records on every tiny frontend action.

==================================================
13. DAILY PROGRESS
==================================================

Create/extend a daily progress system.

Example:

Student:

Today's Progress
----------------

Tasks:
8 / 10

Completion:
80%

Study Time:
3h 20m

Goals:
4 / 5

Streak:
12 days

Daily progress must belong to the authenticated student.

==================================================
14. ADMIN STUDENT MANAGEMENT
==================================================

Create an Admin → Students section.

Admin should see:

Student ID
Name
Mobile
Status
Created Date
Last Login
Last Active
Current Session Status
Today's Progress

Example:

Students

--------------------------------
Mahesh
98XXXXXXXX
Active
Last Login: Today 4:32 PM
Progress: 80%
Session: Active

[View Student]
--------------------------------

Admin search:

Search by:
- Name
- Mobile
- Student ID

Add filters:

Active
Inactive
Recently Active
Never Logged In

==================================================
15. ADMIN STUDENT DETAIL PAGE
==================================================

When admin clicks:

View Student

show:

Profile
Account Information
Today's Planner
Daily Progress
Tasks
Study Sessions
Goals
Activity Timeline
Login History
Session Information

Use tabs:

Overview
Planner
Progress
Activity
Login History

Example:

Student Overview

Name: Mahesh
Mobile: 98XXXXXXXX
Student ID: STU_XXXX
Account Created: ...
Last Login: ...
Current Session: Active

Today's Progress:
80%

Weekly Progress:
...

==================================================
16. ADMIN FORCE LOGOUT
==================================================

Admin should have:

[Force Logout]

When clicked:

Confirm:

"Are you sure you want to log out this student from their current device?"

If confirmed:

- Revoke current session
- Clear currentSessionId if appropriate
- Create activity log
- Student's next API request receives SESSION_REVOKED
- Frontend logs out automatically

==================================================
17. ADMIN SESSION MONITORING
==================================================

Admin can see:

Current Device
Browser
Last Active
Login Time
Session Status

Example:

Current Session

Device:
Android

Browser:
Chrome

Login:
05 Oct 2026 04:32 PM

Last Active:
05 Oct 2026 04:48 PM

Status:
ACTIVE

[Force Logout]

Do not rely on device fingerprinting as the primary security mechanism.

The active server-side session is the actual security mechanism.

==================================================
18. LOGIN HISTORY
==================================================

Maintain security/login history.

Example:

05 Oct 2026 04:32 PM
Login successful
Android / Chrome

05 Oct 2026 04:31 PM
Previous session revoked
Reason: New login

04 Oct 2026 07:12 PM
Logout

Store:

LoginHistory {
    studentId,
    eventType,
    deviceInfo,
    userAgent,
    ipAddress,
    timestamp,
    reason
}

Do not expose sensitive information unnecessarily.

==================================================
19. FRONTEND SESSION HANDLING
==================================================

Create a central authentication/session provider.

For example:

AuthContext

It should handle:

currentStudent
isAuthenticated
loading
login()
logout()
refreshSession()
handleSessionRevoked()

Global API handling:

If API returns:

401 SESSION_REVOKED

then:

1. Clear frontend authentication state
2. Clear relevant cached student data
3. Redirect to login
4. Show:

"Your account was signed in on another device."

Avoid infinite redirect loops.

==================================================
20. PLANNER INTEGRATION
==================================================

The existing:

/planner

page must continue working.

After authentication:

/planner

should automatically load only the logged-in student's planner.

Do not require the frontend to send studentId manually.

Example:

GET /api/planner

Backend:

authenticated session
↓
studentId
↓
student planner

If student logs out:

Planner data must no longer remain accessible.

If session is revoked:

Planner API must return unauthorized.

==================================================
21. SECURITY REQUIREMENTS
==================================================

Implement:

- Password hashing
- Secure sessions
- HttpOnly cookies
- Secure cookies in production
- SameSite protection
- CSRF protection where applicable
- Rate limiting
- Login attempt protection
- OTP rate limiting
- OTP expiry
- OTP attempt limit
- Input validation
- Request validation
- Authorization middleware
- Role-based access control
- Admin authorization
- No student-to-student data access
- No plaintext passwords
- No plaintext OTP storage where avoidable
- No secrets in frontend code
- Environment variables for secrets
- Proper error handling
- Security logging

Never trust client-provided:

studentId
role
admin status
session status

All must be determined server-side.

==================================================
22. ROLES
==================================================

Create role-based access:

STUDENT
ADMIN
SUPER_ADMIN

Student:

Can access only own data.

Admin:

Can access authorized student management.

Super Admin:

Can manage admins and system-level configuration.

Never trust role sent from frontend.

==================================================
23. API STRUCTURE
==================================================

Keep APIs organized.

Example:

/api/auth/register
/api/auth/send-otp
/api/auth/verify-otp
/api/auth/login
/api/auth/logout
/api/auth/forgot-password
/api/auth/reset-password
/api/auth/change-password
/api/auth/session

/api/planner
/api/tasks
/api/progress
/api/activity

/api/admin/students
/api/admin/students/:id
/api/admin/students/:id/activity
/api/admin/students/:id/progress
/api/admin/students/:id/sessions
/api/admin/students/:id/force-logout

Use middleware:

requireAuth
requireStudent
requireAdmin
requireSuperAdmin

==================================================
24. DATABASE INDEXES
==================================================

Add appropriate indexes.

Examples:

Student.mobile → unique index
Student.studentId → unique index

Session.sessionId → unique index
Session.studentId → index
Session.status → index

Planner.studentId → index
Planner.studentId + date → compound index

Activity.studentId + createdAt → index

LoginHistory.studentId + timestamp → index

Optimize queries for many students.

==================================================
25. DATA RETENTION
==================================================

Do not store unlimited activity forever without planning.

Use appropriate retention rules for:

- Session records
- Login history
- Activity events

Keep important audit data while preventing unnecessary database growth.

==================================================
26. UI/UX
==================================================

Keep the existing PREPORA design language.

Do not make the authentication screens look like a completely different website.

Create:

Login
Register
OTP Verification
Account Created
Forgot Password
Reset Password
Change Password
Session Revoked
Profile/Settings

Make all screens:

- Mobile-first
- Responsive
- Clean
- Fast
- Accessible
- Good loading states
- Good error states
- No layout jumps

Password field should include:

Show / Hide password

Copy generated password button.

==================================================
27. IMPORTANT PRODUCT DECISION
==================================================

Do NOT force WhatsApp OTP on every login.

The desired cost-saving architecture is:

FIRST TIME:

WhatsApp OTP
↓
Account creation
↓
Generated password

NORMAL:

Mobile + Password
↓
Login

RECOVERY:

WhatsApp OTP
↓
Reset password

NEW LOGIN:

Mobile + Password
↓
Old session revoked
↓
New session active

==================================================
28. DO NOT BREAK EXISTING DATA
==================================================

Before modifying existing database models:

- Inspect current schema
- Create migration strategy if required
- Preserve existing planner records
- Add studentId safely
- Do not delete existing production data
- Do not reset MongoDB
- Do not drop collections

If old records don't have studentId, create a safe migration plan and clearly identify records that cannot be automatically assigned.

==================================================
29. ENVIRONMENT VARIABLES
==================================================

Keep all secrets server-side.

Examples:

MONGODB_URI=
SESSION_SECRET=
WHATSAPP_API_KEY=
WHATSAPP_PHONE_NUMBER_ID=
WHATSAPP_BUSINESS_ACCOUNT_ID=

Never expose these through VITE_ frontend variables.

Never commit .env files.

Update .env.example with placeholder values.

==================================================
30. TESTING
==================================================

Before declaring completion, test this exact scenario.

TEST A:

Create Student A.

Verify WhatsApp OTP.

Generate password.

Login.

Open planner.

Create tasks.

Confirm data is saved.

TEST B:

Login Student A on Phone/Browser B using same mobile + password.

Expected:

Browser A session becomes invalid.

Browser B works.

Browser A API request:

401 SESSION_REVOKED

Browser A redirects to login.

TEST C:

Create Student B.

Login Student B.

Confirm Student B cannot see Student A's:

Planner
Tasks
Progress
Activity
Sessions

TEST D:

Try manually changing student ID in API request.

Expected:

Access denied.

TEST E:

Admin opens Student A.

Admin can see only Student A's data.

Admin force logout.

Student A gets logged out.

TEST F:

Student changes password.

Old session becomes invalid.

Student must log in with new password.

TEST G:

Forgot password.

OTP verification.

New password.

Login works.

TEST H:

Rate-limit OTP and login attempts.

==================================================
31. IMPLEMENTATION APPROACH
==================================================

Work in this order:

STEP 1
Audit existing code.

STEP 2
Document existing authentication/data architecture.

STEP 3
Design database changes.

STEP 4
Implement Student model.

STEP 5
Implement Session model.

STEP 6
Implement OTP service abstraction.

STEP 7
Implement registration.

STEP 8
Implement password generation.

STEP 9
Implement login.

STEP 10
Implement single-active-session logic.

STEP 11
Implement auth middleware.

STEP 12
Secure planner APIs.

STEP 13
Implement daily activity/progress.

STEP 14
Implement admin student management.

STEP 15
Implement force logout.

STEP 16
Implement password recovery/change.

STEP 17
Integrate frontend auth state.

STEP 18
Integrate existing /planner.

STEP 19
Test student isolation.

STEP 20
Test session revocation.

STEP 21
Test admin access control.

STEP 22
Production security review.

==================================================
32. VERY IMPORTANT CODING RULE
==================================================

Do NOT blindly generate thousands of lines of code.

First inspect the existing code and identify exactly which files need modification.

Then make small, controlled changes.

After each major change:

- Run the project
- Check for errors
- Test affected API
- Test frontend
- Fix regressions

Do not rewrite working components unnecessarily.

==================================================
33. FINAL DELIVERABLE
==================================================

When implementation is complete, provide:

1. Files created
2. Files modified
3. Database models added/changed
4. API endpoints added
5. Authentication flow
6. Session flow
7. OTP flow
8. Student data isolation strategy
9. Admin features
10. Environment variables required
11. Migration requirements
12. Testing results
13. Security issues found
14. Remaining improvements

Also clearly tell me:

- What was already present
- What you changed
- What you did NOT change
- Any risks
- Any production configuration still required

MOST IMPORTANT:

The final system must behave like:

FIRST LOGIN
WhatsApp OTP → Account → Generated Password

EVERY NORMAL LOGIN
Mobile + Password → Login

SECOND DEVICE LOGIN
New login → Old session immediately revoked

STUDENT DATA
Student A → only Student A data
Student B → only Student B data

ADMIN
Admin → student-wise data + progress + activity + login history

OTP
Used only when actually required, not on every normal login.

Build this as a production-quality authentication and student-management architecture, not as a demo-only implementation.
