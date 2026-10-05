You are working on my existing PREPORA educational website.

EXISTING WEBSITE:
https://test-green-pi-22.vercel.app/planner

IMPORTANT:
Do NOT rebuild the entire website from scratch.

First inspect the existing project completely and understand:

- Existing React/Vite structure
- Existing routes
- Existing authentication
- Existing planner
- Existing backend
- Existing MongoDB/Mongoose models
- Existing API structure
- Existing UI/design system
- Existing responsive behavior
- Existing video functionality if already implemented
- Existing student/admin architecture

Then integrate the new features into the existing system.

DO NOT unnecessarily replace working code.

DO NOT destroy existing functionality.

DO NOT create duplicate authentication/planner systems.

The final product must feel like one polished educational platform called PREPORA.

============================================================
1. FEATURES TO ADD
============================================================

Add TWO major educational systems:

A. FORMULA SHEET
B. SMART LECTURES

The complete student flow should be:

FORMULA SHEET:

Subject
↓
Chapter
↓
Topic
↓
Formula / Short Notes / Important Concepts


LECTURES:

Subject
↓
Chapter
↓
Choose:

[Full Chapter Lecture]

OR

[Topic-wise Lecture]

↓
Recommended best YouTube lecture

Student gets TWO watching options:

[▶ Watch Here]

AND

[↗ Open in YouTube]

Both options must work.

============================================================
2. IMPORTANT EXISTING VIDEO BEHAVIOR
============================================================

DO NOT REMOVE THE EXISTING IN-WEBSITE VIDEO EXPERIENCE if it already exists.

The student should still be able to watch the YouTube video inside PREPORA.

Add another option:

[↗ Open in YouTube]

So the final system supports BOTH:

1. Watch inside PREPORA
2. Open the original video on YouTube

Do not replace one with the other.

============================================================
3. LECTURE UI BRANDING
============================================================

PREPORA should have its own clean educational UI.

Do NOT display coaching-platform names around lecture cards.

Do NOT create sections such as:

"PW Lectures"
"Physics Wallah Lectures"
"Unacademy Lectures"
"Vedantu Lectures"

etc.

Instead use neutral PREPORA labels:

"Recommended Lecture"

"Best Match"

"Full Chapter Lecture"

"Topic-wise Lecture"

"Recommended for this Topic"

"Quick Revision"

The actual YouTube player may naturally display YouTube/creator attribution.

DO NOT attempt to remove, fake, or modify required YouTube attribution.

When the student clicks:

[↗ Open in YouTube]

open the ORIGINAL YouTube video.

Therefore, the student can naturally see exactly which creator/channel made the video.

============================================================
4. LECTURES PAGE
============================================================

Create a dedicated:

/lectures

page.

Add it to the existing PREPORA sidebar.

Suggested navigation:

Dashboard
My Planner
Practice
Notes
Lectures
Formula Sheet
Tests
Performance
Doubt & Help

Use the existing PREPORA visual language.

Do not create an unrelated design.

Use:

- Premium dark UI if existing design is dark
- Rounded cards
- Clean typography
- Smooth animations
- Responsive layout
- Proper loading skeletons
- Empty states
- Error states

============================================================
5. LECTURE MAIN FLOW
============================================================

Student opens:

Lectures

Show:

"Learn smarter with chapter-wise and topic-wise lectures."

Then:

Choose Subject

[Physics]
[Chemistry]
[Mathematics]
[Biology]

The available subjects should come from the database/curriculum.

Do NOT hard-code the UI so that only these four subjects are possible.

Architecture should support future subjects.

============================================================
6. CHAPTER SELECTION
============================================================

After selecting a subject:

Example:

Mathematics

Show:

Mathematics Chapters

1. Relations & Functions
2. Trigonometric Functions
3. Complex Numbers
4. Linear Inequalities
5. Permutations & Combinations
6. Binomial Theorem
7. Sequences & Series
8. Straight Lines
9. Conic Sections
10. Statistics
11. Probability

Use the actual configured curriculum.

Support:

Class 9
Class 10
Class 11
Class 12

and future classes.

The class should be part of the content structure.

============================================================
7. CHAPTER PAGE
============================================================

After selecting:

Mathematics
→ Relations & Functions

show:

Relations & Functions

Class 11
Mathematics
Chapter 1

Then show TWO main options:

--------------------------------------------

[▶ FULL CHAPTER LECTURE]

Watch the complete chapter in one lecture.

--------------------------------------------

[☰ TOPIC-WISE LECTURES]

Choose exactly what you want to learn.

--------------------------------------------

Below this show:

Chapter Topics

1. Introduction
2. Relations
3. Types of Relations
4. Functions
5. Domain
6. Range
7. Types of Functions
8. One-One Function
9. Many-One Function
10. Onto Function
11. Into Function
12. Composite Function
13. Invertible Function

The topics must come from the database.

============================================================
8. FULL CHAPTER LECTURE
============================================================

When the student selects:

Full Chapter Lecture

show the best available complete chapter lecture.

Example:

--------------------------------------------
Recommended Lecture

Relations & Functions
Full Chapter Lecture

Class 11 • Mathematics
Hindi

[YouTube Thumbnail]

Duration: 3h 28m

[▶ Watch Here]

[↗ Open in YouTube]
--------------------------------------------

The selected video must actually correspond to the complete chapter.

Do NOT select a random topic video.

============================================================
9. TOPIC-WISE LECTURES
============================================================

When the student chooses:

Topic-wise Lectures

show:

Chapter Topics

[Domain]
[Range]
[Types of Functions]
[One-One Function]
[Many-One Function]
[Onto Function]
[Composite Function]
etc.

When the student clicks:

Domain

show:

Domain of a Function

Recommended Lecture

[Thumbnail]

[▶ Watch Here]

[↗ Open in YouTube]

Then optionally show:

More Recommended Lectures

But keep recommendations limited and useful.

Do NOT turn PREPORA into a YouTube clone.

============================================================
10. WATCH HERE
============================================================

The existing in-website video behavior must remain.

When student clicks:

[▶ Watch Here]

play the selected YouTube video inside PREPORA using the official YouTube embed/player mechanism.

Use a responsive 16:9 player.

It must work correctly on:

- Android
- iPhone
- Tablet
- Desktop

Do NOT download the video.

Do NOT re-host the video.

Do NOT proxy the audiovisual content through our server.

Use the official YouTube player/embed.

============================================================
11. OPEN IN YOUTUBE
============================================================

Every lecture must also have:

[↗ Open in YouTube]

This must open the ORIGINAL YouTube video.

Example:

https://www.youtube.com/watch?v=VIDEO_ID

On mobile, use normal platform behavior so the YouTube app can open when available.

Otherwise open YouTube in the browser.

The student should then see the normal YouTube interface including:

- Video title
- Creator/channel name
- YouTube controls
- Comments
- Like/share
- Normal YouTube experience

Do NOT hide creator attribution.

Do NOT replace the original YouTube page with a fake PREPORA page.

============================================================
12. NO COACHING BRAND NAMES OUTSIDE VIDEO
============================================================

PREPORA's own UI must NOT contain the name of the video creator/coaching platform as a promotional label.

For example, do NOT show:

"PW Recommended"
"Unacademy Recommended"
"Physics Wallah Section"

Instead:

"Recommended Lecture"
"Best Match"
"Full Chapter Lecture"

The official YouTube page/player may naturally show the creator/channel name.

That is expected.

============================================================
13. AUTOMATIC YOUTUBE DISCOVERY
============================================================

Do NOT manually add thousands of videos.

Build a YouTube discovery system.

Use the YouTube Data API to search for relevant educational videos.

Search dynamically using:

Class
Subject
Chapter
Topic
Language
Lecture type

Examples:

"Class 11 Mathematics Relations Functions full chapter Hindi"

"Class 11 Mathematics Domain Range Hindi"

"Class 12 Physics Ray Optics full chapter Hindi"

"Class 10 Science Electricity Hindi"

The system should automatically find relevant videos.

============================================================
14. ONLY USE RELEVANT VIDEOS
============================================================

Do NOT simply select the first search result.

Filter and rank results.

Prefer videos that have:

- Correct class
- Correct subject
- Correct chapter
- Exact topic match
- Hindi/Hinglish where appropriate
- Clear educational explanation
- Appropriate duration
- Good relevance
- Good engagement
- Good educational quality
- Public availability
- Embeddable availability
- Useful/recent content where relevant

Avoid:

- Shorts
- Unrelated videos
- Clickbait
- Promotional-only videos
- Wrong class
- Wrong subject
- Wrong chapter
- Wrong topic
- Random live streams
- Entertainment videos
- Poor-quality matches

============================================================
15. BEST VIDEO RANKING
============================================================

Create a ranking/scoring system.

Example:

Exact topic match
+35

Exact chapter match
+30

Correct subject
+25

Correct class
+25

Correct language
+15

Educational relevance
+15

Suitable duration
+10

Good engagement
+10

Recent/useful content
+5

Embeddable
REQUIRED

Do not select a video just because it has the highest views.

Educational relevance must be more important than popularity.

============================================================
16. FULL CHAPTER DETECTION
============================================================

For FULL_CHAPTER searches, prioritize:

"full chapter"
"complete chapter"
"one shot"
"complete lecture"

But do NOT trust the title alone.

Verify that the result is actually related to the selected chapter.

For example:

If the chapter is:

Relations & Functions

do not select:

Only Domain and Range

as the full chapter lecture.

That should only be used as a topic lecture.

============================================================
17. TOPIC DETECTION
============================================================

For topic:

Domain and Range

prefer:

Domain and Range lectures

Do not select:

Full Mathematics course
Unrelated Functions lecture
Random Class 12 lecture

unless it genuinely explains the selected topic.

============================================================
18. ADMIN OVERRIDE
============================================================

Automatic YouTube discovery is useful, but ADMIN must have complete control.

Admin should be able to:

- Add lecture
- Edit lecture
- Delete lecture
- Replace lecture
- Set recommended lecture
- Set backup lecture
- Disable lecture
- Mark featured
- Approve automatically discovered lecture
- Reject automatically discovered lecture

Admin should be able to override automatic selection.

============================================================
19. ADMIN ADD LECTURE
============================================================

Admin form:

Class
Subject
Chapter
Topic
Lecture Type

Options:

FULL_CHAPTER
TOPIC

YouTube URL

Title

Language

Description

Priority

Featured

Active

Recommended

Admin only needs to paste the YouTube URL.

The system extracts the video ID.

Do NOT accept arbitrary iframe HTML.

Store only the validated YouTube video ID.

============================================================
20. LECTURE DATABASE
============================================================

Create a model similar to:

Lecture {
    _id,

    classLevel,

    subjectId,

    chapterId,

    topicId,

    type,

    youtubeVideoId,

    title,

    description,

    thumbnail,

    duration,

    language,

    source,

    priority,

    isFeatured,

    isRecommended,

    isActive,

    approvalStatus,

    createdAt,

    updatedAt
}

type:

FULL_CHAPTER
TOPIC

source:

YOUTUBE

approvalStatus:

AUTO_DISCOVERED
PENDING_REVIEW
APPROVED
REJECTED

============================================================
21. AUTOMATIC DISCOVERY + ADMIN APPROVAL
============================================================

For production quality:

New automatically discovered videos should preferably enter:

PENDING_REVIEW

or be automatically accepted only when the ranking confidence is very high.

Admin can then:

Approve
Reject
Replace

Once approved, store the video ID and use it without searching YouTube again every time.

============================================================
22. YOUTUBE API CACHING
============================================================

IMPORTANT:

Do NOT call the YouTube Search API every time a student opens a topic.

Flow:

Student opens topic

↓

Backend checks database

↓

Approved lecture exists?

YES
↓
Return existing lecture

NO
↓
Check cached discovery

If no suitable cached result:

YouTube API search

↓

Rank results

↓

Save suitable result

↓

Return result

This reduces:

- API quota usage
- Server load
- Response time

============================================================
23. YOUTUBE API KEY
============================================================

Keep YouTube API credentials server-side.

Use:

YOUTUBE_API_KEY=

in backend environment variables.

NEVER expose the secret unnecessarily in frontend code.

NEVER commit it to GitHub.

Update:

.env.example

with:

YOUTUBE_API_KEY=

but no real key.

============================================================
24. FORMULA SHEET
============================================================

Create a dedicated:

/formula-sheet

page.

Add to sidebar:

Formula Sheet

Student flow:

Subject
↓
Chapter
↓
Topic
↓
Formula

============================================================
25. FORMULA SHEET UI
============================================================

Example:

Formula Sheet

Choose Subject:

[Physics]
[Chemistry]
[Mathematics]
[Biology]

Then:

Choose Chapter

Then:

Choose Topic

Then show formula cards.

Example:

-----------------------------------------

Quadratic Formula

x = (-b ± √(b² - 4ac)) / 2a

Used for:
Solving quadratic equations.

Important:
★★★★★

[Copy Formula]

-----------------------------------------

Use KaTeX or MathJax for proper mathematical rendering.

Do NOT display complex formulas as broken plain text.

============================================================
26. FORMULA DATABASE
============================================================

Create:

Formula {
    _id,

    classLevel,

    subjectId,

    chapterId,

    topicId,

    title,

    formula,

    explanation,

    example,

    tags,

    importance,

    order,

    isActive,

    createdAt,

    updatedAt
}

============================================================
27. FORMULA SEARCH
============================================================

Add a search box:

Search formulas, topics, chapters...

Search should support:

Formula name
Topic
Chapter
Subject
Tags

Example:

Search:

"quadratic"

Results:

Mathematics
→ Quadratic Equations

Formula:

x = (-b ± √(b² - 4ac)) / 2a

============================================================
28. QUICK REVISION
============================================================

Add:

Quick Revision

Example:

Mathematics
→ Relations & Functions
→ Quick Revision

Show the most important formulas/concepts on one page.

Each chapter should have:

Important formulas
Important definitions
Important identities
Important shortcuts

Allow:

[Copy]

and if practical:

[Print]
[Download PDF]

============================================================
29. FORMULA + LECTURE CONNECTION
============================================================

Connect Formula Sheet and Lectures.

Every topic should ideally have:

[View Formula]

and:

[Watch Lecture]

Example:

Domain & Range

[View Formula/Concept]

[Watch Topic Lecture]

This makes PREPORA a connected learning system instead of separate pages.

============================================================
30. ADD TO PLANNER
============================================================

Integrate with the existing planner.

On lecture/topic/formula pages add:

[Add to Planner]

Example:

Student is viewing:

Relations & Functions

Click:

[Add Revision to Planner]

Create a planner task:

"Revise Relations & Functions"

with appropriate subject/chapter/topic information.

Do NOT create a second planner system.

Use the existing planner.

============================================================
31. STUDENT PROGRESS
============================================================

Track useful learning events.

Possible events:

LECTURE_OPENED
LECTURE_PLAY_CLICKED
YOUTUBE_OPENED
TOPIC_VIEWED
FORMULA_VIEWED
FORMULA_COPIED
CHAPTER_VIEWED
REVISION_ADDED_TO_PLANNER

Do NOT falsely claim exact YouTube watch percentage unless technically reliable.

For example:

"Student opened lecture"

is valid.

But:

"Student watched 87%"

should NOT be stored unless the implementation can reliably determine it.

============================================================
32. DAILY ACTIVITY
============================================================

Integrate educational activity with the existing student daily stream.

Example:

05 October

09:10
Viewed Mathematics → Relations & Functions

09:15
Opened Domain & Range lecture

09:40
Copied Quadratic Formula

10:00
Added Relations & Functions revision to planner

This should appear in the student's own activity stream.

Admin should be able to see appropriate student activity according to the existing admin permissions.

============================================================
33. SEARCH
============================================================

Create a global educational search.

Search:

Subjects
Chapters
Topics
Formulas
Lectures

Example:

Search:

"Newton"

Results:

Physics
→ Laws of Motion
→ Newton's Laws
→ Important formulas
→ Recommended lectures

Another:

Search:

"Integration"

Results:

Mathematics
→ Integrals
→ Formula Sheet
→ Topic-wise lectures

============================================================
34. MOBILE EXPERIENCE
============================================================

Mobile-first design is mandatory.

Lecture flow on mobile:

Lectures

↓

Select Subject

↓

Select Chapter

↓

Full Chapter / Topic-wise

↓

Select Topic

↓

Lecture Card

↓

[▶ Watch Here]
[↗ YouTube]

The embedded video must remain responsive.

No horizontal overflow.

Formula cards must fit small screens.

Buttons must be touch-friendly.

============================================================
35. DESKTOP EXPERIENCE
============================================================

Desktop should use the available screen properly.

Suggested layout:

Left:
Chapter/Topic navigation

Right:
Lecture/content

or:

Subject → Chapter → Topic navigation

Use the existing PREPORA design language.

Do not make the page unnecessarily crowded.

============================================================
36. EMPTY STATES
============================================================

If no lecture exists:

"No suitable lecture found yet."

Then:

[Search Again]

or:

"Admin can add a recommended lecture."

Do NOT show random unrelated videos.

If no formula exists:

"No formula has been added for this topic yet."

============================================================
37. ERROR HANDLING
============================================================

If YouTube API fails:

Do not break PREPORA.

If cached approved lecture exists:

show cached lecture.

If no cached lecture exists:

show a clean error/empty state.

Example:

"Lecture temporarily unavailable."

Admin can manually add a YouTube lecture.

============================================================
38. SECURITY
============================================================

Apply the existing PREPORA security architecture.

Students can only access permitted content.

Admin content APIs require server-side admin authorization.

Never trust:

studentId
role
admin=true

from the frontend.

YouTube API credentials remain server-side.

Admin actions must be authorized on the backend.

============================================================
39. DATABASE STRUCTURE
============================================================

Architecture should support:

Course/Class
    ↓
Subject
    ↓
Chapter
    ↓
Topic
    ↓
Formula
    ↓
Lecture

Example:

Class 11
→ Mathematics
→ Relations & Functions
→ Domain and Range
→ Formula
→ Recommended Lecture

Do NOT duplicate subject/chapter/topic names unnecessarily in every collection if IDs can safely reference the canonical content structure.

============================================================
40. CONTENT SEEDING
============================================================

Create a proper content-seeding system.

Seed:

Classes
Subjects
Chapters
Topics
Formulas

Then use the YouTube discovery service to find suitable lectures.

Do NOT hard-code hundreds of YouTube URLs inside React components.

Content belongs in the database.

============================================================
41. ADMIN CONTENT MANAGEMENT
============================================================

Admin panel should have:

Content Management

├── Classes
├── Subjects
├── Chapters
├── Topics
├── Formulas
└── Lectures

Admin can:

Create
Edit
Delete
Reorder
Enable
Disable

content.

For lectures:

Auto-discovered
Pending Review
Approved
Rejected
Featured
Recommended
Backup

============================================================
42. YOUTUBE RULES
============================================================

Use official YouTube functionality.

DO NOT:

- Download YouTube videos
- Re-host YouTube videos
- Store video files
- Strip creator attribution
- Fake ownership
- Circumvent YouTube restrictions
- Proxy the video through PREPORA

For "Watch Here":

Use the official YouTube embed/player.

For "Open in YouTube":

Open the original YouTube watch URL.

PREPORA only organizes and recommends the videos.

============================================================
43. LECTURE CARD DESIGN
============================================================

Use a polished card like:

--------------------------------------------

[YouTube Thumbnail]

Relations & Functions
Complete Chapter Lecture

Class 11 • Mathematics
Hindi • 3h 28m

Recommended for this chapter

[▶ Watch Here]

[↗ Open in YouTube]

--------------------------------------------

For topic:

--------------------------------------------

[Thumbnail]

Domain and Range

Topic-wise Lecture

Class 11 • Mathematics
Hindi • 18 min

[▶ Watch Here]

[↗ Open in YouTube]

--------------------------------------------

Do NOT add unnecessary coaching brand labels.

============================================================
44. "BEST VIDEO" LOGIC
============================================================

The system must prioritize QUALITY and RELEVANCE.

Do not simply use:

Most viewed video.

Instead:

Exact curriculum match
+
Correct class
+
Correct chapter/topic
+
Correct language
+
Educational quality
+
Suitable duration
+
Good relevance

Then select the best result.

If admin has manually approved a video:

ADMIN APPROVED VIDEO
must take priority over automatic discovery.

============================================================
45. PERFORMANCE
============================================================

Use:

- Lazy loading
- Debounced search
- API caching
- Database indexes
- Pagination where needed
- Optimized thumbnails
- Progressive loading

Do not load every lecture for every chapter when the student opens the Lectures page.

Load:

Subject
→ Chapter
→ Topic
→ Lecture

progressively.

============================================================
46. ACCESSIBILITY
============================================================

Add:

Keyboard navigation
Accessible buttons
Readable contrast
Proper focus states
Alt text for thumbnails
Clear error messages
Accessible dropdowns

Do not rely only on colors to communicate status.

============================================================
47. FINAL USER EXPERIENCE
============================================================

The final student experience should feel like:

PREPORA

Dashboard
My Planner
Practice
Notes
Lectures
Formula Sheet
Tests
Performance
Doubt & Help

LECTURES:

Subject
↓
Chapter
↓
Full Chapter / Topic-wise
↓
Recommended best lecture
↓
[▶ Watch Here]
[↗ Open in YouTube]

FORMULA SHEET:

Subject
↓
Chapter
↓
Topic
↓
Formula
↓
Explanation
↓
Example
↓
[Copy]
[Watch Related Lecture]

============================================================
48. DO NOT BREAK EXISTING WEBSITE
============================================================

Before changing code:

Inspect everything.

Identify:

- Existing files
- Existing components
- Existing routes
- Existing APIs
- Existing database
- Existing video implementation
- Existing planner

Then integrate.

Do NOT rewrite the whole website.

Do NOT remove existing planner functionality.

Do NOT remove existing authentication.

Do NOT replace existing video functionality.

Extend what already works.

============================================================
49. IMPLEMENTATION ORDER
============================================================

STEP 1
Audit existing project.

STEP 2
Understand existing database.

STEP 3
Create/extend content models.

STEP 4
Create Subject → Chapter → Topic structure.

STEP 5
Create Formula model.

STEP 6
Create Formula Sheet UI.

STEP 7
Create Lecture model.

STEP 8
Create YouTube discovery service.

STEP 9
Create video-ranking logic.

STEP 10
Create YouTube caching.

STEP 11
Create Lecture UI.

STEP 12
Keep Watch Here functionality.

STEP 13
Add Open in YouTube functionality.

STEP 14
Create Admin lecture management.

STEP 15
Create Admin formula management.

STEP 16
Connect Formula ↔ Lecture.

STEP 17
Connect content ↔ Planner.

STEP 18
Add student activity tracking.

STEP 19
Add responsive mobile UI.

STEP 20
Test desktop.

STEP 21
Test mobile.

STEP 22
Test YouTube failure/caching.

STEP 23
Test security.

STEP 24
Run final regression test.

============================================================
50. FINAL TEST CHECKLIST
============================================================

Before declaring the feature complete:

LECTURES:

[ ] Lectures page works
[ ] Subject selection works
[ ] Chapter selection works
[ ] Topic selection works
[ ] Full Chapter option works
[ ] Topic-wise option works
[ ] Best relevant YouTube video is selected
[ ] Irrelevant videos are filtered
[ ] Watch Here works
[ ] Open in YouTube works
[ ] YouTube app/browser behavior works
[ ] Existing video functionality is preserved
[ ] Mobile video works
[ ] Desktop video works

FORMULA SHEET:

[ ] Subject selection works
[ ] Chapter selection works
[ ] Topic selection works
[ ] Formula cards work
[ ] Math rendering works
[ ] Search works
[ ] Copy formula works
[ ] Quick Revision works
[ ] Mobile layout works

ADMIN:

[ ] Admin can add formulas
[ ] Admin can edit formulas
[ ] Admin can delete/disable formulas
[ ] Admin can add YouTube lectures
[ ] Admin can replace lectures
[ ] Admin can approve/reject discovered videos
[ ] Admin can feature lectures
[ ] Admin can set recommended lectures

PLANNER:

[ ] Add to Planner works
[ ] Existing planner remains functional

SECURITY:

[ ] YouTube API key is protected
[ ] Admin endpoints are protected
[ ] Students cannot modify content
[ ] Student data isolation remains intact
[ ] Authentication remains functional

============================================================
51. FINAL REPORT
============================================================

After implementation, report:

1. Files created
2. Files modified
3. Existing files preserved
4. Database models added
5. Database models modified
6. API endpoints added
7. YouTube API configuration
8. Environment variables
9. Formula system
10. Lecture system
11. YouTube recommendation logic
12. Admin controls
13. Planner integration
14. Student activity tracking
15. Mobile improvements
16. Security checks
17. Tests performed
18. Problems discovered
19. Remaining limitations
20. Production deployment requirements

IMPORTANT:

Do not say "everything is perfect" without testing.

If something cannot be verified, explicitly say:

"Not verified."

The final implementation must be production-oriented, scalable, secure, responsive, and integrated with the existing PREPORA website.

MOST IMPORTANT FINAL BEHAVIOR:

STUDENT:

Lectures
→ Subject
→ Chapter
→ Full Chapter / Topic
→ Best relevant YouTube video
→ [Watch Here] OR [Open in YouTube]

Formula Sheet
→ Subject
→ Chapter
→ Topic
→ Formula
→ Explanation
→ Related Lecture

The student should NEVER have to manually search YouTube to find the appropriate lecture.

PREPORA should automatically find and organize the best relevant videos, while the actual video remains on YouTube.

Do not remove the existing in-website video option.
Do not remove the Open in YouTube option.
Both must exist.