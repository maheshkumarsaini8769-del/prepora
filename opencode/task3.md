# PREPORA — STUDY SEARCH FEATURE
## Unified Search: Formula + Lecture + Notes + Planner

Existing PREPORA project ko pehle audit karo. Existing working features, UI, database, authentication aur APIs ko break mat karo. Study Search ko existing architecture ke saath integrate karo.

---

## 1. CORE IDEA

PREPORA me ek global **Study Search** feature add karo.

Student search box me kuch bhi type kar sake, for example:

- Newton
- Newton's Laws
- Quadratic Formula
- Relations & Functions
- Domain and Range
- Trigonometric Ratios
- Chemical Bonding
- Organic Chemistry

Search karne ke baad ek unified result page/open search panel dikhe jisme relevant learning resources ek hi jagah milen:

### SEARCH RESULTS
1. Formula
2. Lectures
3. Notes
4. Planner / Revision
5. Related Topics

Goal:

> Student ko alag-alag Formula Sheet, Lectures, Notes aur Planner sections me manually search na karna pade.

---

# 2. SEARCH UI

Student dashboard/navigation me prominent global search add karo.

Placeholder:

**"Search topics, formulas, chapters, lectures..."**

Desktop:
- Top navigation/search area me large search bar.

Mobile:
- Full-width search button/input.
- Touch friendly.
- No horizontal overflow.

Search ke time:
- Debounce API requests.
- Minimum 2 characters ke baad suggestions/results.
- Loading skeleton.
- Empty state.
- Error state.

---

# 3. SEARCH SUGGESTIONS

Student type kare:

`newt`

To suggestions aa sakti hain:

- Newton's Laws of Motion
- Newton's First Law
- Newton's Second Law
- Newton's Third Law
- Newton's Laws — Formula
- Newton's Laws — Lectures

Suggestions ko relevant database content se generate karo.

Recent searches optionally show karo:

**Recent Searches**
- Quadratic Formula
- Relations & Functions
- Newton's Laws

Student recent search clear bhi kar sake.

---

# 4. SEARCH RESULT PAGE

Search:

**"Quadratic Formula"**

Result page:

### Header

**Search results for "Quadratic Formula"**

Optional result count:

`18 resources found`

Filters:

- All
- Formulas
- Lectures
- Notes
- Planner

Additional filters:

- Class
- Subject
- Chapter
- Topic
- Language

---

# 5. FORMULA RESULTS

Formula section:

### Formula

**Quadratic Formula**

Show:

- Formula title
- Formula
- Short explanation
- Example
- Subject
- Chapter
- Topic
- Importance

Actions:

**View Formula**

**Copy Formula**

**Add Revision**

**Related Lecture**

If multiple formulas exist:

Show the most relevant formula first.

Ranking should consider:

- Exact title match
- Exact topic match
- Chapter match
- Subject match
- Class match
- Search keyword match
- Formula importance

---

# 6. LECTURE RESULTS

Search result me relevant lectures show karo.

Example:

### Recommended Lecture

**Quadratic Equations — Full Chapter Lecture**

Metadata:

`Class 10 • Mathematics`

`Full Chapter Lecture`

`Hindi`

`Duration`

Buttons:

**▶ Watch Here**

**↗ Open in YouTube**

Existing PREPORA video functionality preserve karo.

### Watch Here

Official YouTube embed/player ke through PREPORA ke andar video play ho.

### Open in YouTube

Original YouTube URL/app open ho.

YouTube videos ko download ya re-host mat karo.

PREPORA UI me unnecessary coaching-brand labels mat add karo. Official YouTube player/page attribution naturally remain kar sakta hai.

---

# 7. TOPIC-WISE LECTURES

Agar search exact topic se match kare:

Example:

`Domain and Range`

To result:

### Topic-wise Lecture

**Domain and Range**

`Class 11 • Mathematics`

Actions:

**Watch Here**

**Open in YouTube**

Topic lecture ko generic chapter lecture se priority do jab exact topic match available ho.

---

# 8. NOTES RESULTS

Existing Notes system ko search ke saath integrate karo.

Show:

### Notes

**Relations & Functions — Short Notes**

Preview:

- Important definitions
- Key concepts
- Important points

Actions:

**Open Notes**

**Add Revision**

Agar notes system me relevant content nahi hai:

Notes section hide/empty state gracefully show karo.

Wrong/unrelated notes mat show karo.

---

# 9. PLANNER INTEGRATION

Study Search ka most useful part:

Student kisi topic ko search kare aur directly Planner se connect kar sake.

Example:

Search:

**Newton's Laws**

Result:

### Study / Revision

**Add to Planner**

Click karne par existing PREPORA Planner use karo.

NEW planner system create mat karo.

Existing planner me:

- Topic
- Subject
- Chapter
- Resource reference
- Task type
- Date
- Optional priority
- Optional reminder

add/update ho.

Example:

`Revise Newton's Laws`

Student date select kare:

`Tomorrow`

Then:

**Add to Planner**

---

# 10. SMART "STUDY THIS" ACTION

Har major search result ke saath optionally:

**Study This**

button ho.

Isse student ko relevant resources ka combined study flow mile:

1. Read Formula
2. Read Notes
3. Watch Lecture
4. Add Revision to Planner
5. Practice Questions

Ye feature existing modules ko connect kare.

---

# 11. RELATED TOPICS

Search result ke bottom par:

### Related Topics

Example:

Search:
`Quadratic Formula`

Related:

- Quadratic Equations
- Discriminant
- Roots of Quadratic Equation
- Factorisation
- Graph of Quadratic Equation

Related topics database ke actual subject/chapter/topic relationships se generate karo.

Random AI-generated topics ko directly publish mat karo.

---

# 12. SEARCH RESULT RANKING

Search results ko relevance ke according rank karo.

Suggested scoring:

Exact title match: +35

Exact topic match: +30

Exact chapter match: +20

Subject match: +15

Class match: +15

Keyword match: +10

Tag match: +10

Resource importance: +5

Recently updated/active content: +3

Popularity/usage: +2

Normalize final score to 0–100.

Exact educational relevance ko popularity se zyada priority do.

Wrong but popular content ko top result mat banao.

---

# 13. SEARCH INTELLIGENCE

Search query ko intelligently normalize karo.

Examples:

`newton`

`Newton laws`

`newtons law`

`newton's laws`

`Newton Law of Motion`

In queries ko relevant same topic/resources se map karne ki koshish karo.

Support:

- Case-insensitive search
- Basic typo tolerance
- Singular/plural matching
- Apostrophe variations
- Whitespace normalization
- Keyword matching

But aggressive fuzzy matching se unrelated results mat lao.

---

# 14. SEARCH ARCHITECTURE

Backend endpoint:

`GET /api/search?q=...`

Optional parameters:

- classLevel
- subjectId
- chapterId
- topicId
- type
- page
- limit

Example:

`/api/search?q=newton&type=all`

Response structure:

```json
{
  "query": "newton",
  "total": 12,
  "results": {
    "formulas": [],
    "lectures": [],
    "notes": [],
    "planner": [],
    "relatedTopics": []
  }
}
```

Pagination implement karo where required.

---

# 15. SEARCH DATABASE DESIGN

Existing schemas ko reuse karo.

Agar required ho to searchable fields properly index karo.

Formula searchable fields:

- title
- formula
- explanation
- tags
- subjectId
- chapterId
- topicId

Lecture searchable fields:

- title
- description
- topicId
- chapterId
- subjectId
- tags

Notes searchable fields:

- title
- content
- tags
- subjectId
- chapterId
- topicId

MongoDB indexes/search strategy performance ke according implement karo.

Large dataset ke liye inefficient full collection scan avoid karo.

---

# 16. PERSONALIZED SEARCH

Search results student ke class/academic context ke according prioritize karo.

Example:

Agar student Class 11 me hai aur search karta hai:

`Relations`

to Class 11 Mathematics ke relevant resources ko priority mile.

Lekin incorrect class content ko completely hide karna required nahi hai agar user explicitly filters change kare.

---

# 17. SEARCH + ACTIVITY TRACKING

Meaningful activity track karo.

Events:

- SEARCH_PERFORMED
- SEARCH_RESULT_OPENED
- FORMULA_VIEWED
- FORMULA_COPIED
- LECTURE_OPENED
- WATCH_HERE_CLICKED
- OPENED_YOUTUBE
- NOTES_OPENED
- REVISION_ADDED

Activity me sensitive secrets store mat karo.

Search history ko privacy-safe rakho.

---

# 18. SEARCH ANALYTICS FOR ADMIN

Admin dashboard me optional analytics:

### Most Searched Topics

Example:

1. Quadratic Formula
2. Newton's Laws
3. Relations & Functions

### Searches With No Result

Example:

- Probability
- Integration
- Chemical Bonding

Isse admin ko pata chalega ki students ko kis content ki need hai.

Admin dekh sake:

- Search query
- Result count
- Date/time
- Optional anonymous aggregate statistics

Individual student search history ko unnecessarily expose mat karo.

---

# 19. NO-RESULT EXPERIENCE

Agar result nahi mile:

Don't show random content.

Show:

**No highly relevant study material found.**

Then suggestions:

- Check spelling
- Try chapter/topic name
- Browse subjects
- Browse Formula Sheet
- Browse Lectures

Example:

> No highly relevant resources found for "integration".

Buttons:

**Browse Mathematics**

**Open Formula Sheet**

**Browse Lectures**

---

# 20. EMPTY/FAILURE STATES

Handle:

- API failure
- Database failure
- YouTube API failure
- No formula
- No lecture
- No notes
- No planner item
- Slow network

One failed resource type should NOT break the entire search page.

Example:

Formula unavailable but lectures available:

Show lectures normally.

---

# 21. SECURITY

Study Search ko secure backend architecture ke through implement karo.

Never trust:

- studentId from frontend
- role from frontend
- classLevel blindly
- admin flag
- resource ownership

Protected student resources ke liye authenticated session se student identity derive karo.

Student A ko Student B ke private notes/planner data search se access nahi milna chahiye.

Admin-only analytics endpoints server-side authorization se protect karo.

Input validation aur rate limiting implement karo.

Search query ko safely handle karo to prevent:

- NoSQL injection
- XSS
- abuse
- excessive database queries

---

# 22. PERFORMANCE

Search fast feel hona chahiye.

Implement:

- Debounced input
- API caching where useful
- Database indexes
- Pagination
- Lazy loading
- Result limits
- Avoid unnecessary duplicate API calls

YouTube API ko har keystroke par call mat karo.

YouTube search sirf lecture discovery/admin workflow ke through use karo.

Student Study Search preferably PREPORA ke already-approved/cached lecture data ko search kare.

---

# 23. MOBILE UX

Mobile first design.

Search screen:

- Full-width search
- Sticky search bar where useful
- Large touch targets
- Cards stacked vertically
- No horizontal scrolling
- Bottom actions accessible
- Video/player responsive
- Filters as horizontal scroll/chips or filter sheet

---

# 24. UI STYLE

Existing PREPORA design system preserve karo.

Do not create a completely separate visual style.

Use:

- clean educational UI
- modern cards
- subtle animations
- clear typography
- consistent spacing
- accessible contrast
- responsive layout

Search result sections visually distinguishable hon:

Formula
Lecture
Notes
Planner
Related Topics

But page overloaded feel nahi hona chahiye.

---

# 25. FINAL USER FLOW

Example:

Student opens PREPORA.

Search bar:

`Newton`

↓

Suggestions:

**Newton's Laws of Motion**

Student selects it.

↓

Search Results:

### Formula
Newton's Laws — Important Formula

[View Formula] [Copy] [Add Revision]

### Recommended Lecture
Newton's Laws of Motion — Full Chapter

[Watch Here] [Open in YouTube]

### Notes
Newton's Laws — Quick Notes

[Open Notes]

### Study Plan
Revise Newton's Laws

[Add to Planner]

### Related Topics
- Force
- Momentum
- Friction
- Work & Energy

This should feel like one connected learning experience rather than four separate features.

---

# 26. IMPORTANT RULE

Do not rebuild the existing PREPORA application.

First:

1. Audit existing frontend.
2. Audit backend.
3. Audit database/schema.
4. Find existing Formula system.
5. Find existing Lecture system.
6. Find existing Notes system.
7. Find existing Planner.
8. Find existing authentication/session system.
9. Reuse existing APIs/components where possible.
10. Implement Study Search incrementally.
11. Test existing functionality after every major change.

Do not delete working data.

Do not drop production collections.

Do not replace existing planner logic unnecessarily.

---

# 27. ACCEPTANCE CRITERIA

Feature is complete only when:

- Student can search from global search.
- Search results combine Formula + Lecture + Notes + Planner.
- Exact topic gets highest relevance.
- Class/subject/chapter context works.
- Formula can be opened/copied.
- Lecture can be watched inside PREPORA.
- Lecture can be opened in YouTube.
- Notes can be opened.
- Revision can be added to existing Planner.
- Related topics work.
- No-result state works.
- Search is responsive on mobile.
- Search does not expose another student's private data.
- Admin analytics work if implemented.
- Search remains fast with larger content.
- Existing PREPORA features continue working.

---

# REAL PRODUCT GOAL

Study Search ko PREPORA ka central learning entry point banao.

Student ko ye feel hona chahiye:

> "Mujhe jo padhna hai, bas search karo — PREPORA mujhe us topic ke relevant formula, notes, lecture aur revision plan ek hi jagah de dega."

Do not make it just a database search box.

Make it a **Unified Study Discovery System**.