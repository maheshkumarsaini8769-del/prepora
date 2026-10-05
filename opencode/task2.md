You are implementing the PREPORA educational platform's Smart YouTube Lecture Discovery system.

IMPORTANT:
Do not blindly publish the first YouTube search result.

The system must automatically discover relevant educational lectures, rank them intelligently, and provide strong admin control before content becomes the primary recommended lecture.

The architecture must be:

Student selects:
Class → Subject → Chapter → Topic
        ↓
YouTube Search
        ↓
Multiple Candidate Videos
        ↓
Validation + Filtering
        ↓
Relevance Scoring
        ↓
Confidence Classification
        ↓
Admin Approval / Automatic Recommendation
        ↓
Student receives the best available lecture

============================================================
1. CORE PRINCIPLE
============================================================

The system must NOT assume:

"First YouTube result = best lecture."

Instead:

SEARCH
→ FILTER
→ SCORE
→ VERIFY
→ CLASSIFY
→ APPROVE
→ RECOMMEND

Quality and curriculum relevance are more important than raw views.

============================================================
2. CONTENT HIERARCHY
============================================================

Every lecture must belong to:

Class
↓
Subject
↓
Chapter
↓
Topic

Examples:

Class 11
→ Mathematics
→ Relations & Functions
→ Domain and Range

Class 12
→ Physics
→ Ray Optics
→ Lens Formula

This hierarchy must come from the database.

Do not rely on manually typed strings from the frontend.

============================================================
3. SEARCH CANDIDATES
============================================================

When there is no approved lecture for a topic/chapter:

Search YouTube using the YouTube Data API.

Generate multiple search queries instead of relying on one query.

For example:

Query 1:
"Class 11 Mathematics Relations and Functions full chapter Hindi"

Query 2:
"Class 11 Maths Relations Functions one shot Hindi"

Query 3:
"Class 11 Relations Functions complete lecture Hindi"

For a topic:

Query 1:
"Class 11 Mathematics Domain Range Hindi"

Query 2:
"Class 11 Domain and Range Functions lecture"

Query 3:
"Class 11 Domain Range one shot Hindi"

Use the actual database values to generate queries.

============================================================
4. SEARCH FILTERS
============================================================

Where supported by the API, prioritize:

type = video

and:

videoEmbeddable = true

Also filter out inappropriate/unwanted content.

Do not intentionally select:

YouTube Shorts
Unrelated videos
Music
Entertainment
Promotional-only videos
Random livestreams
Wrong classes
Wrong subjects
Wrong chapters
Wrong topics

============================================================
5. CANDIDATE COUNT
============================================================

For every discovery operation:

Try to collect approximately 5–10 strong candidates.

Do not show all candidates to students.

Candidates are for the recommendation engine/admin review.

If fewer than 5 useful videos are found, do NOT fill the list with irrelevant videos.

Quality is more important than quantity.

============================================================
6. VIDEO METADATA
============================================================

For each candidate collect only necessary public metadata.

Example:

youtubeVideoId
title
description
channelTitle
publishedAt
thumbnail
duration
viewCount
likeCount where available
url

Do not download the video.

Do not store the video file.

Do not re-host YouTube content.

============================================================
7. HARD FILTERS
============================================================

Before scoring, remove candidates that fail critical requirements.

Reject if:

- Wrong subject
- Clearly wrong class
- Clearly unrelated chapter
- Clearly unrelated topic
- Video unavailable
- Private video
- Deleted video
- Non-embeddable when Watch Here requires embedding
- Obviously promotional/unrelated content

For full chapter searches, reject videos that only cover a tiny unrelated subtopic.

For topic searches, reject videos that don't actually explain that topic.

============================================================
8. FULL CHAPTER VS TOPIC
============================================================

The scoring system must understand two different lecture types.

TYPE A:

FULL_CHAPTER

TYPE B:

TOPIC

For FULL_CHAPTER:

Prefer titles/descriptions indicating:

Full Chapter
Complete Chapter
Complete Lecture
One Shot
Revision
Chapter Lecture

But do not trust title alone.

For TOPIC:

Prefer exact topic matches.

Example:

Requested:

Domain and Range

Strong match:

"Domain and Range of Functions Class 11"

Weak match:

"Relations and Functions Full Chapter"

The second may be useful as a backup but should not outrank an exact topic lecture.

============================================================
9. RELEVANCE SCORING ENGINE
============================================================

Create a server-side scoring function.

Example maximum score:

100 points.

Suggested scoring:

Exact topic match:
+30

Exact chapter match:
+25

Correct subject:
+15

Correct class:
+15

Correct language:
+5

Lecture type match:
+5

Educational relevance:
+5

Suitable duration:
+3

Good engagement:
+2

Total:
100+

Normalize final score to 0–100.

Do not use views as the main quality signal.

Curriculum accuracy is more important.

============================================================
10. LANGUAGE
============================================================

Respect the configured student language.

If the platform is configured for Hindi/Hinglish:

Prefer:

Hindi
Hinglish

over unrelated English content.

But if no good Hindi result exists:

Allow a high-quality English result as a fallback.

Never select a poor Hindi video simply because it is Hindi.

Quality + relevance comes first.

============================================================
11. DURATION
============================================================

Use duration intelligently.

For FULL_CHAPTER:

Prefer an appropriately long lecture.

Do not automatically reject short videos because some chapters may genuinely have short high-quality revision lectures.

For TOPIC:

Prefer topic-appropriate duration.

Avoid extremely short videos unless they genuinely explain the requested topic.

Do not assume:

Longer = Better.

============================================================
12. QUALITY SIGNALS
============================================================

Use multiple signals.

Possible signals:

- Exact curriculum match
- Title relevance
- Description relevance
- Topic keyword match
- Chapter keyword match
- Class keyword match
- Language
- Duration
- Views
- Engagement where available
- Recency
- Channel/video metadata
- Embeddability

Never allow popularity alone to determine the winner.

============================================================
13. CONFIDENCE LEVEL
============================================================

After scoring, classify:

GREEN:

90–100

HIGH CONFIDENCE

Automatically eligible for recommendation.

YELLOW:

75–89

MEDIUM CONFIDENCE

Send to admin review before becoming the primary recommendation.

RED:

0–74

LOW CONFIDENCE

Do not automatically recommend to students.

This threshold must be configurable in admin/system settings.

============================================================
14. ADMIN APPROVAL
============================================================

Create:

Admin → Content → Lecture Discovery

Admin should see:

--------------------------------------------

Relations & Functions
Class 11
Mathematics
Full Chapter

Candidate Videos:

1.
Title
Channel
Duration
Score: 96
Confidence: HIGH

[Preview]
[Approve]
[Reject]

2.
Title
Channel
Duration
Score: 89
Confidence: MEDIUM

[Preview]
[Approve]
[Reject]

3.
Title
Channel
Duration
Score: 71
Confidence: LOW

[Reject]

--------------------------------------------

Admin can approve the best candidate.

============================================================
15. ADMIN PREVIEW
============================================================

Admin must be able to preview the candidate before approval.

Provide:

[Preview]

and:

[Open in YouTube]

Do not require admin to manually search YouTube.

Admin should be able to quickly compare candidates.

============================================================
16. ADMIN APPROVED LECTURE
============================================================

When admin approves a candidate:

status:

APPROVED

It becomes the primary recommended lecture.

Student requests:

Class 11
→ Mathematics
→ Relations & Functions

Backend returns the approved lecture.

Do NOT call YouTube Search API again.

============================================================
17. PRIORITY SYSTEM
============================================================

Recommendation priority must be:

1. ADMIN_SELECTED_PRIMARY
2. ADMIN_APPROVED
3. ADMIN_FEATURED
4. HIGH_CONFIDENCE_AUTO_APPROVED
5. CACHED_HIGH_SCORE
6. BACKUP_APPROVED

Never allow a new automatic result to silently replace an admin-approved lecture.

============================================================
18. ADMIN REPLACE
============================================================

Admin should have:

[Replace Lecture]

Clicking it shows:

Current Lecture

and:

Candidate Alternatives

Admin can choose another candidate.

Or paste another YouTube URL manually.

After replacement:

The new lecture becomes:

ADMIN_SELECTED_PRIMARY

and receives highest priority.

============================================================
19. BACKUP LECTURE
============================================================

Allow admin to configure:

Primary Lecture
Backup Lecture

If the primary video becomes unavailable:

Use the backup automatically.

Flow:

Primary available?
YES → show primary.

NO →
Check backup.

Backup available?
YES → show backup.

NO →
Run discovery/fallback process.

This prevents broken lecture pages.

============================================================
20. VIDEO AVAILABILITY CHECK
============================================================

Do not assume a stored video remains available forever.

When practical, verify:

Video exists
Video is public
Video can be embedded if Watch Here is enabled

If a previously approved video becomes unavailable:

mark:

UNAVAILABLE

Do not delete historical records unnecessarily.

Try backup lecture.

============================================================
21. ADMIN DASHBOARD
============================================================

Add a section:

Lecture Health

Show:

Total Lectures
Approved
Pending Review
Rejected
Unavailable
Need Review

Example:

Approved:
1,240

Pending:
37

Unavailable:
12

Low Confidence:
48

This helps admin maintain content quality.

============================================================
22. BULK DISCOVERY
============================================================

Admin should be able to run:

[Discover Lectures]

for:

Entire Chapter

or:

Entire Subject

or:

Selected Topics

Example:

Admin selects:

Class 11
Mathematics
Relations & Functions

[Discover Lectures]

System searches for:

Full Chapter
Introduction
Relations
Types of Relations
Functions
Domain
Range
Composite Functions
etc.

Then creates candidate recommendations.

Do not automatically replace existing approved lectures.

============================================================
23. BULK APPROVAL
============================================================

Admin can approve multiple HIGH-CONFIDENCE candidates.

Example:

☑ Domain & Range — 94
☑ Types of Functions — 96
☑ Composite Functions — 92

[Approve Selected]

But require confirmation before bulk approval.

============================================================
24. MANUAL LECTURE ADD
============================================================

Admin can manually add:

YouTube URL

System extracts:

videoId

Then validates the URL.

Admin selects:

Class
Subject
Chapter
Topic
Lecture Type

Then:

[Save Lecture]

Manual admin-selected content receives higher priority than automatic discovery.

============================================================
25. DUPLICATE DETECTION
============================================================

Do not store the same YouTube video repeatedly for the same content.

Use:

youtubeVideoId

as a unique/reference key where appropriate.

If the same video is already attached:

Show:

"Video already exists."

============================================================
26. DISCOVERY CACHE
============================================================

Store discovery results temporarily.

Example:

LectureDiscovery {
    _id,

    classLevel,
    subjectId,
    chapterId,
    topicId,
    lectureType,

    query,
    candidates,

    discoveredAt,
    expiresAt
}

Do not permanently treat old search results as fresh.

Allow re-discovery when required.

============================================================
27. YOUTUBE API QUOTA
============================================================

Do not search YouTube every time students open a page.

Student request:

GET lecture

↓

Database approved lecture?

YES
→ return immediately.

NO
↓

Cached candidate?

YES
→ use candidate if valid.

NO
↓

YouTube API discovery.

This minimizes API quota usage.

============================================================
28. API KEY SECURITY
============================================================

YouTube API key must remain server-side.

Use:

YOUTUBE_API_KEY

in backend environment variables.

Never expose the secret unnecessarily to frontend.

Never commit it to GitHub.

Never put it in public JavaScript bundles.

============================================================
29. WATCH HERE
============================================================

When student selects:

[▶ Watch Here]

play the selected YouTube video inside PREPORA using the official YouTube embed/player.

Keep this functionality because the user wants both viewing methods.

Use responsive 16:9 layout.

If the selected video cannot be embedded:

Hide/disable Watch Here.

Keep:

[↗ Open in YouTube]

available.

Do not break the page.

============================================================
30. OPEN IN YOUTUBE
============================================================

Every lecture should provide:

[↗ Open in YouTube]

Open the original official YouTube URL.

Example:

https://www.youtube.com/watch?v=VIDEO_ID

On mobile, allow normal YouTube app/browser behavior.

The student can then see:

Creator/channel name
YouTube interface
Comments
Likes
Share
Normal YouTube functionality

Do not hide creator attribution.

============================================================
31. PREPORA UI BRANDING
============================================================

Inside PREPORA:

Do not create coaching-brand sections.

Use:

Recommended Lecture
Best Match
Full Chapter
Topic Lecture

Do not artificially make the creator appear to be PREPORA.

When the user opens YouTube, the original creator identity naturally remains visible.

============================================================
32. STUDENT EXPERIENCE
============================================================

Student does NOT see the complicated scoring system.

Student should see a simple result:

--------------------------------------------

⭐ Recommended Lecture

Relations & Functions
Full Chapter

Class 11 • Mathematics
Hindi

[Thumbnail]

[▶ Watch Here]

[↗ Open in YouTube]

--------------------------------------------

Optionally:

Why this lecture?

"Best match for this chapter."

Do not expose internal ranking details unless useful.

============================================================
33. FORMULA SHEET CONNECTION
============================================================

Every topic should connect to:

Formula Sheet
and
Lecture.

Example:

Domain and Range

[Formula Sheet]

[Watch Lecture]

This should use the same canonical:

Class
Subject
Chapter
Topic

IDs.

============================================================
34. PLANNER CONNECTION
============================================================

Allow:

[Add Revision to Planner]

For example:

"Revise Domain and Range"

Use the existing planner system.

Do not create duplicate planner logic.

============================================================
35. STUDENT ACTIVITY
============================================================

Track meaningful events:

LECTURE_OPENED
WATCH_HERE_CLICKED
OPENED_YOUTUBE
TOPIC_VIEWED
FORMULA_VIEWED
FORMULA_COPIED
REVISION_ADDED

Do not claim exact watch duration unless technically reliable.

============================================================
36. SECURITY
============================================================

Apply the existing PREPORA authentication architecture.

Student:

Can only read permitted educational content.

Admin:

Can approve/edit/replace lectures.

Backend must enforce authorization.

Never trust:

studentId
role
admin=true

from frontend requests.

YouTube API credentials remain server-side.

============================================================
37. ADMIN CONTENT AUDIT
============================================================

Every admin action should be logged:

Lecture discovered
Lecture approved
Lecture rejected
Lecture replaced
Lecture disabled
Primary lecture changed
Backup lecture changed

Example:

Admin approved:

Relations & Functions
Video ID: XXXXX
Time: 05 Oct 2026 17:30

============================================================
38. MOBILE ADMIN
============================================================

Admin review should also work on mobile.

Candidate cards should not overflow.

Buttons:

Preview
Approve
Reject
Replace

must be touch-friendly.

============================================================
39. PERFORMANCE
============================================================

Use:

Caching
Lazy loading
Pagination
Database indexes
Debounced search
Optimized thumbnails

Do not load 100 YouTube thumbnails simultaneously.

Load candidate videos only when admin opens discovery/review.

============================================================
40. FAILURE HANDLING
============================================================

If YouTube API fails:

Do not break PREPORA.

If approved lecture exists:

show approved lecture.

If backup exists:

use backup.

If no lecture exists:

show:

"No lecture is available yet."

Admin can manually add one.

============================================================
41. AUTOMATIC REFRESH
============================================================

Do not constantly replace recommendations.

Automatic rediscovery should happen only when:

- No approved lecture exists
- Current lecture is unavailable
- Admin manually requests discovery
- Candidate cache expires
- Content is marked for review

Never silently replace a good admin-approved lecture.

============================================================
42. FINAL RECOMMENDATION LOGIC
============================================================

For a student request:

Class 11
Mathematics
Relations & Functions
Full Chapter

Backend should execute:

1. Find ADMIN_SELECTED_PRIMARY
2. If available → return it
3. Else find ADMIN_APPROVED
4. If available → return it
5. Else find HIGH_CONFIDENCE_APPROVED
6. If available → return it
7. Else check backup
8. Else use cached high-confidence candidate
9. If no valid candidate → trigger discovery/fallback according to configured policy

Never return an unrelated video just to fill the UI.

============================================================
43. QUALITY PRINCIPLE
============================================================

The system must prefer:

NO VIDEO

over:

WRONG VIDEO.

If confidence is low, show:

"No highly relevant lecture found yet."

instead of showing an unrelated lecture.

This is extremely important for educational accuracy.

============================================================
44. ADMIN CONTROL PRINCIPLE
============================================================

The admin is the final authority.

Automatic system:

Finds
Filters
Scores
Suggests

Admin:

Approves
Rejects
Replaces
Prioritizes

Once admin selects a primary lecture, automatic discovery must respect that decision.

============================================================
45. FINAL TESTING
============================================================

Test:

TEST 1
Select a chapter with no lecture.

Expected:
YouTube candidates discovered.

TEST 2
Multiple candidates.

Expected:
They are scored.

TEST 3
High confidence.

Expected:
Eligible for automatic recommendation.

TEST 4
Medium confidence.

Expected:
Admin review.

TEST 5
Low confidence.

Expected:
Not recommended.

TEST 6
Admin approves candidate.

Expected:
Student sees approved lecture.

TEST 7
Admin replaces lecture.

Expected:
New lecture immediately becomes primary.

TEST 8
Primary video becomes unavailable.

Expected:
Backup lecture used.

TEST 9
Student clicks Watch Here.

Expected:
Video plays inside PREPORA.

TEST 10
Student clicks Open in YouTube.

Expected:
Original YouTube video opens.

TEST 11
YouTube API unavailable.

Expected:
Existing approved/cached content continues working.

TEST 12
Duplicate video discovered.

Expected:
Duplicate handled safely.

TEST 13
Wrong chapter video.

Expected:
Low score/rejected.

TEST 14
Correct chapter but wrong topic.

Expected:
Should not outrank exact topic match.

TEST 15
Admin-approved lecture exists.

Expected:
Automatic search cannot silently replace it.

============================================================
46. FINAL ADMIN EXPERIENCE
============================================================

The ideal admin workflow should take approximately seconds:

Admin opens:

Content
→ Lecture Discovery

Selects:

Class 11
Mathematics
Relations & Functions

Clicks:

[Discover Lectures]

System returns:

5–10 candidates

Admin sees:

Video
Title
Channel
Duration
Score
Confidence
Preview

Admin clicks:

[Approve]

Done.

Student immediately sees:

⭐ Recommended Lecture

[▶ Watch Here]
[↗ Open in YouTube]

============================================================
47. FINAL SYSTEM PRINCIPLE
============================================================

The final architecture is:

YouTube
↓
Discovery
↓
Filtering
↓
Relevance Scoring
↓
Confidence
↓
Admin Review when needed
↓
Approved Recommendation
↓
Student

NOT:

YouTube
↓
First Search Result
↓
Student

The system must be designed for educational accuracy, not just automation.

============================================================
48. FINAL REPORT
============================================================

After implementation report:

- Files created
- Files modified
- Database models
- APIs
- YouTube integration
- Ranking algorithm
- Confidence thresholds
- Admin workflow
- Caching strategy
- Backup strategy
- Security measures
- API quota protection
- Tests performed
- Failed tests
- Known limitations
- Production requirements

Never claim a feature is tested if it was not actually tested.

If something could not be verified, clearly state:

NOT VERIFIED.

FINAL REQUIREMENT:

Build a system where PREPORA automatically finds the best relevant YouTube lectures, but never blindly trusts YouTube search results.

Admin must always have the ability to approve, replace, reject, prioritize, and manage the recommended lecture.

The student experience must remain simple and clean.