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
## 34. MAXIMUM SECURITY / ANTI-BYPASS AUDIT

Treat security as a first-class requirement.

The application must remain secure even if an attacker:

- Downloads/views all frontend JavaScript
- Opens browser DevTools
- Inspects network requests
- Modifies frontend JavaScript
- Calls APIs directly using Postman/cURL
- Changes request parameters
- Changes studentId values
- Changes role values
- Deletes cookies
- Modifies localStorage/sessionStorage
- Replays requests
- Attempts to reuse expired sessions
- Attempts to access admin APIs as a student
- Attempts to access another student's data
- Tries to bypass frontend route protection
- Tries to call hidden/unlinked API endpoints
- Attempts brute-force login/OTP
- Tries parameter manipulation
- Attempts NoSQL injection
- Attempts XSS
- Attempts CSRF
- Attempts session fixation/hijacking
- Attempts privilege escalation

IMPORTANT:

Never depend on frontend code for security.

Frontend protection is ONLY UX.

Backend authorization is the actual security boundary.

==================================================
35. NEVER PUT SECRETS IN FRONTEND
==================================================

Absolutely NEVER expose:

- MongoDB URI
- Database credentials
- JWT/session secrets
- WhatsApp API secret
- WhatsApp access token
- Admin secret
- Encryption keys
- Internal API credentials
- Service account credentials

inside:

React code
Vite variables
public/
JavaScript bundles
HTML
GitHub repository

Anything beginning with a secret/private credential must remain server-side.

If a VITE_ variable contains a secret, redesign it.

==================================================
36. ASSUME FRONTEND CODE IS PUBLIC
==================================================

Design the system under this assumption:

"An attacker can download and inspect every byte of the frontend."

Therefore:

Even if attacker modifies:

isAdmin = true

or:

studentId = anotherStudent

or:

authenticated = true

the backend must reject unauthorized requests.

Never implement:

if (user.isAdmin) {
   showAdmin();
}

as the security mechanism.

Instead:

Frontend:
show/hide UI

Backend:
verify authenticated session
verify server-side role
verify authorization
execute request only if allowed

==================================================
37. BACKEND AUTHORIZATION
==================================================

Every protected endpoint must use authorization middleware.

Example:

requireAuth
requireStudent
requireAdmin
requireSuperAdmin

For every request:

1. Validate session
2. Validate session expiration
3. Validate session revocation
4. Load authenticated user server-side
5. Determine role server-side
6. Authorize requested resource
7. Execute database query

Never trust:

req.body.studentId
req.query.studentId
req.params.studentId
req.body.role
req.body.isAdmin

for authorization.

==================================================
38. PREVENT STUDENT DATA BYPASS
==================================================

A student must NEVER be able to access another student's data.

Bad:

GET /api/students/:studentId/planner

where student can simply change:

/students/STUDENT_B/planner

If such endpoint exists, authorization MUST verify ownership.

Prefer:

GET /api/my/planner

Backend derives student ID from authenticated session.

For admin:

GET /api/admin/students/:studentId/planner

Backend verifies:

authenticatedUser.role === ADMIN or SUPER_ADMIN

before accessing the requested student.

==================================================
39. IDOR / BROKEN ACCESS CONTROL TEST
==================================================

Perform explicit IDOR testing.

Create:

Student A
Student B

Login as Student A.

Try to access:

Student B profile
Student B planner
Student B tasks
Student B progress
Student B activity
Student B session
Student B login history

by changing:

IDs
UUIDs
MongoDB IDs
query parameters
request bodies
URLs

EVERY attempt must return:

403 Forbidden

or:

404 Not Found

without leaking private information.

==================================================
40. ADMIN BYPASS TEST
==================================================

Login as Student.

Attempt:

/api/admin/*
/admin/*
admin endpoints
admin actions

using:

browser
Postman
cURL
modified headers
modified request body

Expected:

403 Forbidden.

Changing frontend JavaScript must NOT grant admin access.

Changing:

role=ADMIN

in request body must NOT work.

==================================================
41. SESSION SECURITY
==================================================

Session IDs must be:

- Cryptographically random
- High entropy
- Unpredictable
- Server validated
- Expirable
- Revocable
- Rotated when required

Do not use:

timestamp
mobile number
studentId
email
incrementing IDs

as session IDs.

If a session is revoked, it must remain unusable even if attacker possesses the old cookie/token.

Implement server-side session invalidation.

==================================================
42. SESSION HIJACKING PROTECTION
==================================================

Use:

HttpOnly
Secure
SameSite

cookies.

Regenerate/rotate session identifiers after authentication where appropriate.

Set reasonable:

session expiration
idle timeout

Do not create permanent authentication sessions by default.

For sensitive account changes:

Require re-authentication or OTP when appropriate.

==================================================
43. CSRF PROTECTION
==================================================

If cookie-based authentication is used:

Implement appropriate CSRF protection for state-changing requests.

Protect:

POST
PUT
PATCH
DELETE

requests.

Use:

SameSite cookies

plus appropriate CSRF strategy.

Do not assume CORS alone is CSRF protection.

==================================================
44. CORS
==================================================

Never use:

Access-Control-Allow-Origin: *

for authenticated production APIs unless there is a specific reason.

Allow only trusted production frontend origins.

Example:

https://your-production-domain.com

Do not dynamically reflect arbitrary Origin headers.

Do not allow credentials from unknown origins.

==================================================
45. RATE LIMITING
==================================================

Implement separate rate limits for:

Login
OTP send
OTP verification
Password reset
Password change
Registration
Admin login
Sensitive APIs

Example conceptual policy:

Login:
limited attempts per IP + account

OTP:
limited sends per mobile + IP

OTP verification:
limited attempts per OTP session

Do not make rate limits so aggressive that normal students are constantly blocked.

Add temporary cooldown after repeated failures.

==================================================
46. BRUTE FORCE PROTECTION
==================================================

Prevent:

Password brute force
OTP brute force
Credential stuffing

After repeated failed attempts:

- Rate-limit
- Temporary cooldown
- Log security event

Never reveal:

"Mobile exists"
"Password is wrong"

in a way that allows account enumeration.

Use generic authentication error messages where appropriate.

==================================================
47. OTP SECURITY
==================================================

OTP must:

- Expire quickly
- Be single-use
- Have attempt limits
- Have resend cooldown
- Be rate-limited
- Never appear in frontend API response
- Never appear in production logs
- Never be stored as plaintext if avoidable

Do not accept old OTPs.

Do not accept an OTP twice.

Invalidate previous OTP when a new OTP is issued.

==================================================
48. PASSWORD SECURITY
==================================================

Use Argon2id or strong bcrypt configuration.

Never store:

password

in plaintext.

Never return:

passwordHash

through an API.

Never log passwords.

Generated passwords must use a cryptographically secure random generator.

Do not use predictable passwords based on:

mobile number
name
DOB
student ID
9999
123456
password

==================================================
49. INPUT VALIDATION
==================================================

Validate all input server-side.

Do not trust frontend validation.

Validate:

mobile
name
password
studentId
dates
planner data
task data
admin parameters

Reject unexpected fields where appropriate.

Use schemas such as:

Zod
Joi
express-validator

or an equivalent robust validation layer.

==================================================
50. NoSQL INJECTION
==================================================

Because MongoDB is being used:

Protect against NoSQL injection.

Never blindly pass user-controlled objects into MongoDB queries.

Example dangerous pattern:

Model.find(req.body)

Do NOT do this.

Explicitly construct allowed query fields.

Sanitize/filter MongoDB operators such as:

$ne
$gt
$gte
$lt
$in
$where

where appropriate.

==================================================
51. XSS PROTECTION
==================================================

Protect against stored and reflected XSS.

User-generated:

names
notes
tasks
descriptions
comments

must never be blindly rendered as HTML.

Do not use dangerouslySetInnerHTML unless absolutely required and sanitized with a trusted sanitizer.

Apply proper output encoding.

Set security headers.

==================================================
52. SECURITY HEADERS
==================================================

Implement appropriate production security headers, for example through Helmet or equivalent:

Content-Security-Policy
X-Content-Type-Options
Referrer-Policy
Frame protection
Strict-Transport-Security in HTTPS production
appropriate Permissions-Policy

Do not blindly copy an unsafe CSP.

Test the actual application after applying CSP.

==================================================
53. CLICKJACKING
==================================================

Prevent sensitive pages from being embedded in unauthorized iframes.

Protect:

Admin
Student dashboard
Account
Settings
Authentication

using appropriate frame protections.

==================================================
54. API RESPONSE SECURITY
==================================================

Never return unnecessary sensitive information.

Student API should NOT return:

passwordHash
session secrets
internal credentials
OTP
database internals
other students' data

Admin APIs should return only information required for the admin UI.

==================================================
55. ERROR HANDLING
==================================================

Production errors must not expose:

Stack traces
MongoDB queries
Database connection strings
Environment variables
Internal filesystem paths
Secrets
Internal architecture details

Return safe error messages.

Log detailed errors server-side.

==================================================
56. DATABASE SECURITY
==================================================

MongoDB must NOT be publicly exposed to the internet.

Use:

MongoDB authentication
Network restrictions
Strong credentials
TLS where appropriate
Least-privilege database user

Application should use a database user with only required permissions.

Do not use MongoDB root/admin credentials for normal application queries.

==================================================
57. SERVER SECURITY
==================================================

Production server must use:

HTTPS
Secure environment variables
Firewall/network restrictions
Updated dependencies
Secure Node.js configuration
No debug mode
No exposed development ports

Do not expose:

MongoDB
Redis
internal admin services
debug endpoints

to the public internet unnecessarily.

==================================================
58. API DISCOVERY DOES NOT EQUAL SECURITY
==================================================

Assume attackers will discover all API endpoints.

Even if an endpoint is:

hidden
unused in frontend
not linked
obfuscated

it must still require proper authentication and authorization.

Security must NOT depend on hidden URLs.

==================================================
59. DO NOT RELY ON OBFUSCATION
==================================================

Do not attempt to protect business logic by:

- Obfuscated URLs
- Hidden frontend buttons
- Random API paths
- Hidden routes
- Minified JavaScript

Minification is NOT security.

Real security must be server-side.

==================================================
60. SOURCE CODE PROTECTION
==================================================

The frontend JavaScript delivered to browsers is inherently accessible to users.

Therefore:

DO NOT put proprietary secrets in frontend code.

DO NOT put database credentials in frontend.

DO NOT put private API keys in frontend.

For backend source code:

- Keep repository private if possible
- Use GitHub secrets/environment variables
- Never commit .env
- Add .env to .gitignore
- Rotate any credential accidentally committed

Important:

A private repository reduces source-code exposure but does NOT replace application security.

==================================================
61. DEPENDENCY SECURITY
==================================================

Audit npm dependencies.

Run:

npm audit

and appropriate dependency checks.

Remove unnecessary packages.

Keep security-sensitive packages updated.

Do not blindly upgrade everything without testing.

Check for known vulnerabilities before production deployment.

==================================================
62. FILE UPLOAD SECURITY
==================================================

If the application supports profile/image/document uploads:

Validate:

file type
file size
extension
MIME type

Do not trust filename extensions.

Do not execute uploaded files.

Store uploads outside executable directories or use trusted object storage.

Generate safe server-side filenames.

==================================================
63. SECURITY LOGGING
==================================================

Log important security events:

Login success
Login failure
OTP request
OTP failure
Password reset
Password change
Session revoked
Admin force logout
Admin privilege changes
Suspicious authorization attempts

Never log:

Passwords
OTP values
Session secrets
API keys

==================================================
64. SECURITY AUDIT ENDPOINT
==================================================

Do NOT create a public security test endpoint.

If diagnostic endpoints are required:

- Admin-only
- Disabled in production unless necessary
- No sensitive output

==================================================
65. AUTOMATED SECURITY TESTS
==================================================

Create automated tests for:

Authentication bypass
Authorization bypass
IDOR
Role escalation
Session revocation
Password reset
OTP abuse
Brute force
NoSQL injection
XSS
CSRF
CORS
Expired sessions
Invalid sessions
Admin endpoints

Especially test:

"Can Student A access Student B?"

"Can Student modify role=ADMIN?"

"Can Student use old session after new login?"

"Can Student access admin API directly?"

"Can attacker change studentId?"

"Can attacker reuse OTP?"

"Can attacker brute-force OTP?"

==================================================
66. FINAL RED-TEAM CHECK
==================================================

Before declaring the feature complete, act like an attacker.

Assume:

I can see the complete frontend source.
I can use DevTools.
I can modify every frontend request.
I can call every API manually.
I know MongoDB document IDs.
I know API endpoint names.
I can create fake JSON requests.
I can change cookies.
I can change headers.
I can change student IDs.
I can change role values.

Try to bypass:

Student authentication
Student data isolation
Admin authorization
Session revocation
Password protection
OTP protection

Fix every vulnerability discovered.

Do not claim "100% secure".

Instead provide a final security audit report with:

PASS
FAIL
WARNING
NOT APPLICABLE

for every major security category.

==================================================
67. FINAL SECURITY REPORT
==================================================

At the end provide:

Security Score:
[realistic assessment]

Critical vulnerabilities:
[list]

High vulnerabilities:
[list]

Medium vulnerabilities:
[list]

Low vulnerabilities:
[list]

Security improvements implemented:
[list]

Remaining risks:
[list]

Production requirements:
[list]

Most importantly:

DO NOT declare the application production-ready if a critical authentication or authorization bypass remains.