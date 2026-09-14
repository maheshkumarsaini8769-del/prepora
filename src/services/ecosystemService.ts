import { 
  DailyPlan, 
  DailyPlanItem, 
  ChapterMastery, 
  TopicMastery, 
  StudySession, 
  DoubtItem, 
  MessageThread, 
  ExamReadiness, 
  WeeklyReport, 
  LeaderboardEntry,
  SubjectName,
  ExamType,
  UnattemptedReason,
  Question,
  SyllabusChapter,
  PlannerTask,
  StudentGoal,
  QuestionReport,
  QuestionReportReason,
  ResourceItem
} from '../types';
import { getStorageItem, setStorageItem } from '../utils/storage';
import { testService } from './testService';
import { questionService } from './questionService';
import { userService } from './userService';

const DAILY_PLAN_KEY = 'prepora_daily_plan';
const DOUBTS_KEY = 'prepora_doubts';
const MESSAGES_KEY = 'prepora_messages';
const UNATTEMPTED_KEY = 'prepora_unattempted_reasons';
const SYLLABUS_KEY = 'prepora_syllabus';
const PLANNER_TASKS_KEY = 'prepora_planner_tasks';
const GOALS_KEY = 'prepora_goals';
const QUESTION_REPORTS_KEY = 'prepora_question_reports';

class MockEcosystemService {
  // -------------------------------------------------------------
  // 1. SMART DAILY PLAN
  // -------------------------------------------------------------
  public getDailyPlan(): DailyPlan {
    const todayStr = new Date().toISOString().split('T')[0];
    const saved = getStorageItem<DailyPlan | null>(DAILY_PLAN_KEY as any, null);
    if (saved && saved.date === todayStr) {
      return saved;
    }

    // Generate fresh plan based on user profile and weaknesses
    const profile = userService.getProfile();
    const weaknesses = userService.getWeaknesses();
    const topWeak = weaknesses[0] || { chapter: 'Kinematics', subject: 'Physics' };
    const secondWeak = weaknesses[1] || { chapter: 'Thermodynamics', subject: 'Chemistry' };

    const initialPlan: DailyPlan = {
      date: todayStr,
      totalDurationMinutes: 75,
      completedMinutes: 0,
      items: [
        {
          id: 'dp-1',
          title: `${topWeak.subject} — ${topWeak.chapter}`,
          subject: topWeak.subject,
          chapter: topWeak.chapter,
          questionCount: 20,
          durationMinutes: 20,
          status: 'pending',
          type: 'practice',
          actionUrl: `/practice?chapter=${encodeURIComponent(topWeak.chapter)}`
        },
        {
          id: 'dp-2',
          title: `${secondWeak.subject} — ${secondWeak.chapter}`,
          subject: secondWeak.subject,
          chapter: secondWeak.chapter,
          questionCount: 15,
          durationMinutes: 15,
          status: 'pending',
          type: 'practice',
          actionUrl: `/practice?chapter=${encodeURIComponent(secondWeak.chapter)}`
        },
        {
          id: 'dp-3',
          title: profile.targetExam === 'NEET' ? 'Biology — Cell Structure & Function' : 'Mathematics — Definite Integrals',
          subject: profile.targetExam === 'NEET' ? 'Biology' : 'Mathematics',
          chapter: profile.targetExam === 'NEET' ? 'Cell: The Unit of Life' : 'Integral Calculus',
          questionCount: 20,
          durationMinutes: 20,
          status: 'pending',
          type: 'revision',
          actionUrl: `/chapters/${encodeURIComponent(profile.targetExam === 'NEET' ? 'Cell: The Unit of Life' : 'Integral Calculus')}`
        },
        {
          id: 'dp-4',
          title: 'Daily Speed Mini Mock',
          subject: topWeak.subject,
          chapter: 'Mixed Section',
          questionCount: 10,
          durationMinutes: 20,
          status: 'pending',
          type: 'test',
          actionUrl: '/tests'
        }
      ]
    };

    setStorageItem(DAILY_PLAN_KEY as any, initialPlan);
    return initialPlan;
  }

  public toggleDailyPlanItem(itemId: string): DailyPlan {
    const plan = this.getDailyPlan();
    const item = plan.items.find(i => i.id === itemId);
    if (item) {
      item.status = item.status === 'completed' ? 'pending' : 'completed';
      plan.completedMinutes = plan.items
        .filter(i => i.status === 'completed')
        .reduce((sum, i) => sum + i.durationMinutes, 0);
      setStorageItem(DAILY_PLAN_KEY as any, plan);
    }
    return plan;
  }

  // -------------------------------------------------------------
  // 2. CHAPTER MASTERY
  // -------------------------------------------------------------
  public getChapterMastery(chapterName: string): ChapterMastery {
    const topics = questionService.getTopics(chapterName);
    const questions = questionService.filterQuestions({ chapter: chapterName });
    const sample = questions[0];
    const sub: SubjectName = sample ? sample.subject : 'Physics';

    // Calculate dynamic subtopics based on questions and mistake records
    const mistakes = userService.getMistakes().filter(m => m.chapter.toLowerCase() === chapterName.toLowerCase());

    const topicMasteryList: TopicMastery[] = topics.map((t, idx) => {
      const topicMistakes = mistakes.filter(m => m.topic.toLowerCase() === t.toLowerCase()).length;
      let pct = 78 - (topicMistakes * 18) + (idx % 3 === 0 ? 12 : -8);
      pct = Math.max(32, Math.min(95, pct));
      const statusStr = pct >= 75 ? 'green' : pct >= 50 ? 'yellow' : 'red';
      return {
        topic: t,
        topicName: t,
        percentage: pct,
        accuracy: pct,
        questionsAttempted: 8 + (idx * 3),
        status: statusStr
      };
    });

    const avg = topicMasteryList.length > 0 
      ? Math.round(topicMasteryList.reduce((acc, t) => acc + t.percentage, 0) / topicMasteryList.length)
      : 65;

    return {
      chapter: chapterName,
      chapterName,
      subject: sub,
      overallMastery: avg,
      conceptMastery: Math.min(96, avg + 4),
      conceptUnderstanding: Math.min(96, avg + 4),
      accuracyMastery: Math.max(35, avg - 2),
      accuracy: Math.max(35, avg - 2),
      speedMastery: Math.max(30, avg - 8),
      speedVsIdeal: Math.max(30, avg - 8),
      hardQuestionMastery: Math.max(25, avg - 14),
      hardQuestionsConquered: Math.max(25, avg - 14),
      topics: topicMasteryList
    };
  }

  // -------------------------------------------------------------
  // 3. STUDY SESSION ("I HAVE 20 MINUTES")
  // -------------------------------------------------------------
  public getStudySession(durationMinutes: 10 | 20 | 30 | 45 | 60): StudySession {
    switch (durationMinutes) {
      case 10:
        return {
          durationMinutes: 10,
          title: '10-Minute Power Sprint',
          segments: [
            { type: 'formula', title: 'High-Yield Formula Flashcards', durationMinutes: 4, description: 'Rapidly recall 8 vital equations' },
            { type: 'quiz', title: 'Speed Drill (5 MCQs)', durationMinutes: 6, description: 'Solve 5 quick questions under clock pressure' }
          ]
        };
      case 30:
        return {
          durationMinutes: 30,
          title: '30-Minute Targeted Block',
          segments: [
            { type: 'formula', title: 'Formula & Shortcut Review', durationMinutes: 7, description: 'Inspect key formulas and dimensional relations' },
            { type: 'practice', title: 'Weak Concept Practice (12 Qs)', durationMinutes: 15, description: 'Work through tagged error questions' },
            { type: 'quiz', title: 'Speed Check (8 Qs)', durationMinutes: 8, description: 'Consolidate newly refreshed concepts' }
          ]
        };
      case 45:
      case 60:
        return {
          durationMinutes: durationMinutes,
          title: `${durationMinutes}-Minute Deep Mastery Session`,
          segments: [
            { type: 'formula', title: 'Formula Deep Dive', durationMinutes: 10, description: 'Derivations & constraint boundaries' },
            { type: 'practice', title: 'Multi-Step Problem Solving', durationMinutes: Math.round(durationMinutes * 0.55), description: 'Solve JEE/NEET medium & hard level questions' },
            { type: 'quiz', title: 'Full Section Mini Mock', durationMinutes: Math.round(durationMinutes * 0.3), description: 'Simulated examination timing' }
          ]
        };
      case 20:
      default:
        return {
          durationMinutes: 20,
          title: '20-Minute Focus Session',
          segments: [
            { type: 'formula', title: 'Formula Revision', durationMinutes: 5, description: 'Review high-yield chapter equations' },
            { type: 'practice', title: 'Weak Topic Practice', durationMinutes: 10, description: 'Target 8 questions from your red-flagged topics' },
            { type: 'quiz', title: 'Mini Retest', durationMinutes: 5, description: 'Validate retention with a 5-question speed test' }
          ]
        };
    }
  }

  // -------------------------------------------------------------
  // 4. RECOMMENDATIONS ("WHAT SHOULD I STUDY?" & "DON'T STUDY THIS NOW")
  // -------------------------------------------------------------
  public getStudyRecommendations(): {
    priorities: { rank: number; chapter: string; subject: SubjectName; mastery: number; priorityLabel: 'HIGH PRIORITY' | 'MEDIUM PRIORITY' | 'ROUTINE'; reason: string }[];
    strongAdvisory?: { chapter: string; subject: SubjectName; mastery: number; recommendedAlternative: string };
  } {
    const weaknesses = userService.getWeaknesses();
    const mistakes = userService.getMistakes();

    const priorities = [
      {
        rank: 1,
        chapter: weaknesses[0]?.chapter || 'Kinematics',
        subject: (weaknesses[0]?.subject || 'Physics') as SubjectName,
        mastery: 42,
        priorityLabel: 'HIGH PRIORITY' as const,
        reason: `${mistakes.filter(m => m.subject === 'Physics').length || 4} mistakes logged recently; accuracy is currently below 50%.`
      },
      {
        rank: 2,
        chapter: weaknesses[1]?.chapter || 'Thermodynamics',
        subject: (weaknesses[1]?.subject || 'Chemistry') as SubjectName,
        mastery: 54,
        priorityLabel: 'MEDIUM PRIORITY' as const,
        reason: 'Formula recall gaps identified in recent test attempts.'
      },
      {
        rank: 3,
        chapter: weaknesses[2]?.chapter || 'Integral Calculus',
        subject: (weaknesses[2]?.subject || 'Mathematics') as SubjectName,
        mastery: 63,
        priorityLabel: 'ROUTINE' as const,
        reason: 'Due for spaced repetition to maintain consistent problem solving speed.'
      }
    ];

    return {
      priorities,
      strongAdvisory: {
        chapter: 'Units and Measurements',
        subject: 'Physics',
        mastery: 92,
        recommendedAlternative: 'Rotational Motion (43% mastery)'
      }
    };
  }

  // -------------------------------------------------------------
  // 5. EXAM READINESS SCORE
  // -------------------------------------------------------------
  public getExamReadiness(exam: ExamType = 'JEE'): ExamReadiness {
    const attempts = testService.getAllAttempts();
    const avgAcc = attempts.length > 0 
      ? Math.round(attempts.reduce((sum, a) => sum + a.accuracyPercentage, 0) / attempts.length)
      : 71;

    return {
      exam,
      score: Math.min(94, Math.max(45, Math.round(avgAcc * 0.9 + 5))),
      concepts: 74,
      accuracy: avgAcc,
      speed: 58,
      consistency: 76,
      hardQuestions: 49,
      biggestImprovementArea: 'Speed & Time Management',
      recommendedAction: 'Complete 3 speed-practice sessions to reduce time drainers in calculation questions.'
    };
  }

  // -------------------------------------------------------------
  // 6. WEEKLY STUDY REPORT
  // -------------------------------------------------------------
  public getWeeklyReport(): WeeklyReport {
    const attempts = testService.getAllAttempts();
    const totalQ = attempts.reduce((sum, a) => sum + a.totalQuestions, 0) + 72;
    const totalSecs = attempts.reduce((sum, a) => sum + a.timeTakenSeconds, 0) + 12000;
    const avgAcc = attempts.length > 0
      ? Math.round(attempts.reduce((sum, a) => sum + a.accuracyPercentage, 0) / attempts.length)
      : 72;

    return {
      weekStartDate: 'Monday, 8 Sep 2026',
      totalQuestions: totalQ,
      totalTests: Math.max(1, attempts.length),
      overallAccuracy: avgAcc,
      totalStudyTimeMinutes: Math.round(totalSecs / 60),
      strongestSubject: 'Chemistry',
      weakestSubject: 'Physics',
      topMistakeReason: 'Calculation Error',
      biggestTimeProblemSubject: 'Mathematics',
      nextWeekRecommendations: [
        'Physics: Schedule +2 concept repair sessions on Mechanics.',
        'Mathematics: Enforce a 2-minute cutoff rule to avoid negative traps.',
        'Formula Sheet: Run daily 15-minute quick revision flashcard drills.'
      ]
    };
  }

  // -------------------------------------------------------------
  // 7. DOUBT CENTER
  // -------------------------------------------------------------
  public getDoubts(): DoubtItem[] {
    const saved = getStorageItem<DoubtItem[]>(DOUBTS_KEY as any, []);
    if (saved.length > 0) return saved;

    const initialDoubts: DoubtItem[] = [
      {
        id: 'd-001',
        subject: 'Physics',
        chapter: 'Kinematics',
        topic: 'Projectile Motion',
        questionId: 'phy-11-003',
        questionSnippet: 'A projectile launched at angle θ with the horizontal reaches a maximum height equal to one-fourth...',
        studentQuestion: 'Why do we equate sin θ = cos θ directly in the formula? How does tan θ = 1 come out?',
        timestamp: 'Yesterday at 4:15 PM',
        status: 'resolved',
        replies: [
          {
            id: 'r-001',
            sender: 'mentor',
            senderName: 'Prof. Verma (Prepora Physics)',
            message: 'Great query! Standard projectile relations give H = (u² sin²θ)/(2g) and R = (2u² sinθ cosθ)/g. When H = R/4, we get (u² sin²θ)/(2g) = (2u² sinθ cosθ)/(4g). Cancelling common terms (u²/g and factors of 2) leaves sin²θ = sinθ cosθ => sinθ = cosθ => tanθ = 1, hence θ = 45°.',
            timestamp: 'Yesterday at 4:40 PM'
          }
        ]
      },
      {
        id: 'd-002',
        subject: 'Chemistry',
        chapter: 'Thermodynamics',
        topic: 'Gibbs Free Energy',
        studentQuestion: 'Under what exact condition is an endothermic reaction (ΔH > 0) spontaneous at room temperature?',
        timestamp: '2 days ago',
        status: 'resolved',
        replies: [
          {
            id: 'r-002',
            sender: 'mentor',
            senderName: 'Dr. Sharma (Prepora Chemistry)',
            message: 'Recall ΔG = ΔH - TΔS. If ΔH > 0, spontaneity requires ΔG < 0, which is only possible if ΔS > 0 and the temperature is high enough such that TΔS > ΔH.',
            timestamp: '2 days ago'
          }
        ]
      }
    ];

    setStorageItem(DOUBTS_KEY as any, initialDoubts);
    return initialDoubts;
  }

  public askDoubt(
    subject: SubjectName,
    chapter: string,
    studentQuestion: string,
    questionContext?: { id: string; snippet: string; topic?: string }
  ): DoubtItem {
    const doubts = this.getDoubts();
    const newDoubt: DoubtItem = {
      id: `d-${Date.now()}`,
      subject,
      chapter,
      topic: questionContext?.topic,
      questionId: questionContext?.id,
      questionSnippet: questionContext?.snippet,
      studentQuestion,
      timestamp: 'Just now',
      status: 'resolved',
      replies: [
        {
          id: `r-${Date.now()}`,
          sender: 'mentor',
          senderName: 'Prepora Academic Mentor',
          message: `Hello! I reviewed your doubt regarding ${chapter}. Let's break this down systematically:\n\n1. Identify the given physical constraints.\n2. Re-check the standard formula definition.\n3. Make sure units and coordinate directions are consistent.\n\nTip: You can retry this question in your Mistake Book anytime without the solution revealed!`,
          timestamp: 'Just now'
        }
      ]
    };

    doubts.unshift(newDoubt);
    setStorageItem(DOUBTS_KEY as any, doubts);
    return newDoubt;
  }

  // -------------------------------------------------------------
  // 8. PERSONAL DM / SAFE MESSAGES
  // -------------------------------------------------------------
  public getMessageThreads(): MessageThread[] {
    const saved = getStorageItem<MessageThread[]>(MESSAGES_KEY as any, []);
    if (saved.length > 0) return saved;

    const initialThreads: MessageThread[] = [
      {
        id: 'thread-mentor',
        contactName: 'Prepora Academic Mentor',
        role: 'Prepora Mentor',
        unreadCount: 1,
        lastMessageTimestamp: '10:30 AM',
        messages: [
          {
            id: 'm-1',
            sender: 'mentor',
            text: 'Hello! Your recent Physics test analysis is ready. You made rapid progress in Kinematics, but watch out for negative marks in work-energy questions.',
            timestamp: '10:30 AM',
            read: false
          }
        ]
      },
      {
        id: 'thread-support',
        contactName: 'Prepora Prep Support',
        role: 'Prep Support',
        unreadCount: 0,
        lastMessageTimestamp: 'Yesterday',
        messages: [
          {
            id: 'm-2',
            sender: 'support',
            text: 'Welcome to Prepora! If you need help with test tools, custom test builders, or your mistake logs, feel free to drop a message here.',
            timestamp: 'Yesterday',
            read: true
          }
        ]
      }
    ];

    setStorageItem(MESSAGES_KEY as any, initialThreads);
    return initialThreads;
  }

  public sendMessage(
    threadId: string, 
    text: string, 
    attachedQuestion?: { id: string; subject: SubjectName; chapter: string; snippet: string }
  ): MessageThread[] {
    const threads = this.getMessageThreads();
    const thread = threads.find(t => t.id === threadId);
    if (!thread) return threads;

    const userMsg = {
      id: `m-${Date.now()}`,
      sender: 'student' as const,
      text,
      timestamp: 'Just now',
      read: true,
      attachedQuestion
    };
    thread.messages.push(userMsg);
    thread.lastMessageTimestamp = 'Just now';

    // Simulate safe automated response
    const replyText = attachedQuestion
      ? `Thank you for sharing Question ${attachedQuestion.id}. I have recorded this in your review queue. Let's inspect the step-by-step substitution together.`
      : 'Thank you for reaching out! I will review your study progress and provide guidance shortly.';

    setTimeout(() => {
      thread.messages.push({
        id: `m-reply-${Date.now()}`,
        sender: thread.role === 'Prepora Mentor' ? 'mentor' : 'support',
        text: replyText,
        timestamp: 'Just now',
        read: false
      });
      thread.unreadCount += 1;
      setStorageItem(MESSAGES_KEY as any, threads);
    }, 1000);

    setStorageItem(MESSAGES_KEY as any, threads);
    return threads;
  }

  public reportMessage(messageId: string): void {
    // Flag message in audit log
    console.log(`[Safety & Moderation] Message ${messageId} reported for review.`);
  }

  public blockThread(threadId: string): void {
    const threads = this.getMessageThreads().filter(t => t.id !== threadId);
    setStorageItem(MESSAGES_KEY as any, threads);
  }

  // -------------------------------------------------------------
  // 9. UNATTEMPTED QUESTIONS SURVEY
  // -------------------------------------------------------------
  public recordUnattemptedReason(questionId: string, reason: UnattemptedReason): void {
    const map = getStorageItem<Record<string, UnattemptedReason>>(UNATTEMPTED_KEY as any, {});
    map[questionId] = reason;
    setStorageItem(UNATTEMPTED_KEY as any, map);
  }

  public getUnattemptedReasonsSummary(): { reason: UnattemptedReason; count: number; percentage: number }[] {
    const map = getStorageItem<Record<string, UnattemptedReason>>(UNATTEMPTED_KEY as any, {
      'phy-11-004': 'Ran out of time',
      'chem-11-003': 'Concept not known',
      'math-11-004': 'Question looked difficult'
    });

    const counts: Record<string, number> = {};
    const total = Object.keys(map).length || 1;

    Object.values(map).forEach(r => {
      counts[r] = (counts[r] || 0) + 1;
    });

    return [
      { reason: 'Ran out of time', count: counts['Ran out of time'] || 0, percentage: Math.round(((counts['Ran out of time'] || 0) / total) * 100) },
      { reason: 'Concept not known', count: counts['Concept not known'] || 0, percentage: Math.round(((counts['Concept not known'] || 0) / total) * 100) },
      { reason: 'Question looked difficult', count: counts['Question looked difficult'] || 0, percentage: Math.round(((counts['Question looked difficult'] || 0) / total) * 100) },
      { reason: 'Could not understand', count: counts['Could not understand'] || 0, percentage: Math.round(((counts['Could not understand'] || 0) / total) * 100) },
      { reason: 'Wanted to attempt later', count: counts['Wanted to attempt later'] || 0, percentage: Math.round(((counts['Wanted to attempt later'] || 0) / total) * 100) },
      { reason: 'Other', count: counts['Other'] || 0, percentage: Math.round(((counts['Other'] || 0) / total) * 100) }
    ];
  }

  // -------------------------------------------------------------
  // 10. LEADERBOARD (WEEKLY TOP 10)
  // -------------------------------------------------------------
  public getLeaderboard(): {
    topperAverage: number;
    medianScore: number;
    userRank: number;
    entries: LeaderboardEntry[];
  } {
    return {
      topperAverage: 284,
      medianScore: 198,
      userRank: 14,
      entries: [
        { rank: 1, studentName: 'Aarav S. (Kota)', score: 295, accuracy: 96, testsTaken: 12 },
        { rank: 2, studentName: 'Ananya P. (Delhi)', score: 288, accuracy: 94, testsTaken: 11 },
        { rank: 3, studentName: 'Rohan K. (Hyderabad)', score: 282, accuracy: 92, testsTaken: 14 },
        { rank: 4, studentName: 'Sanya M. (Jaipur)', score: 276, accuracy: 91, testsTaken: 9 },
        { rank: 5, studentName: 'Devansh T. (Bangalore)', score: 271, accuracy: 89, testsTaken: 10 },
        { rank: 6, studentName: 'Pooja R. (Mumbai)', score: 265, accuracy: 88, testsTaken: 8 },
        { rank: 7, studentName: 'Ishaan G. (Kolkata)', score: 258, accuracy: 87, testsTaken: 11 },
        { rank: 8, studentName: 'Kavya V. (Chennai)', score: 252, accuracy: 86, testsTaken: 9 },
        { rank: 9, studentName: 'Aditya N. (Chandigarh)', score: 247, accuracy: 84, testsTaken: 8 },
        { rank: 10, studentName: 'Sneha D. (Pune)', score: 241, accuracy: 83, testsTaken: 10 }
      ]
    };
  }

  // -------------------------------------------------------------
  // 11. SYLLABUS TRACKER (Task 4)
  // -------------------------------------------------------------
  public getSyllabus(exam: ExamType = 'JEE', classLevel: '11' | '12' = '11', subject?: SubjectName): SyllabusChapter[] {
    const defaultSyllabus: SyllabusChapter[] = [
      // Physics Class 11
      {
        id: 'syl-phy-1',
        name: 'Units & Measurements',
        subject: 'Physics',
        classLevel: '11',
        exam: 'JEE',
        progressPercent: 94,
        status: 'Strong',
        weightage: 'Low',
        subtopics: [
          { name: 'SI Units & Dimensions', isMastered: true },
          { name: 'Dimensional Analysis', isMastered: true },
          { name: 'Errors & Significant Figures', isMastered: true }
        ]
      },
      {
        id: 'syl-phy-2',
        name: 'Kinematics',
        subject: 'Physics',
        classLevel: '11',
        exam: 'JEE',
        progressPercent: 54,
        status: 'Practicing',
        weightage: 'High',
        subtopics: [
          { name: 'Motion in 1D & Free Fall', isMastered: true },
          { name: 'Kinematic Graphs', isMastered: false },
          { name: 'Projectile Motion', isMastered: true },
          { name: 'Relative Motion in 2D', isMastered: false }
        ]
      },
      {
        id: 'syl-phy-3',
        name: 'Laws of Motion',
        subject: 'Physics',
        classLevel: '11',
        exam: 'JEE',
        progressPercent: 42,
        status: 'Needs Revision',
        weightage: 'High',
        subtopics: [
          { name: "Newton's 3 Laws & Free Body Diagrams", isMastered: true },
          { name: 'Static & Kinetic Friction', isMastered: false },
          { name: 'Circular Motion Dynamics', isMastered: false }
        ]
      },
      {
        id: 'syl-phy-4',
        name: 'Work Energy Power',
        subject: 'Physics',
        classLevel: '11',
        exam: 'JEE',
        progressPercent: 15,
        status: 'Learning',
        weightage: 'High',
        subtopics: [
          { name: 'Work by Variable Force', isMastered: false },
          { name: 'Work-Energy Theorem', isMastered: true },
          { name: 'Conservative Forces & Potential Energy', isMastered: false },
          { name: 'Collisions in 1D and 2D', isMastered: false }
        ]
      },
      {
        id: 'syl-phy-5',
        name: 'Rotational Motion',
        subject: 'Physics',
        classLevel: '11',
        exam: 'JEE',
        progressPercent: 0,
        status: 'Not Started',
        weightage: 'High',
        subtopics: [
          { name: 'Center of Mass & Linear Momentum', isMastered: false },
          { name: 'Moment of Inertia Theorems', isMastered: false },
          { name: 'Torque & Angular Momentum', isMastered: false },
          { name: 'Pure Rolling Motion', isMastered: false }
        ]
      },
      // Chemistry Class 11
      {
        id: 'syl-chem-1',
        name: 'Some Basic Concepts of Chemistry',
        subject: 'Chemistry',
        classLevel: '11',
        exam: 'JEE',
        progressPercent: 88,
        status: 'Strong',
        weightage: 'Medium',
        subtopics: [
          { name: 'Mole Concept & Molar Mass', isMastered: true },
          { name: 'Stoichiometric Calculations', isMastered: true },
          { name: 'Limiting Reagent', isMastered: true }
        ]
      },
      {
        id: 'syl-chem-2',
        name: 'Structure of Atom',
        subject: 'Chemistry',
        classLevel: '11',
        exam: 'JEE',
        progressPercent: 72,
        status: 'Practicing',
        weightage: 'High',
        subtopics: [
          { name: 'Bohr Model & Emission Spectrum', isMastered: true },
          { name: 'De Broglie & Heisenberg Principle', isMastered: true },
          { name: 'Quantum Numbers & Electronic Config', isMastered: false }
        ]
      },
      {
        id: 'syl-chem-3',
        name: 'Chemical Bonding & Molecular Structure',
        subject: 'Chemistry',
        classLevel: '11',
        exam: 'JEE',
        progressPercent: 38,
        status: 'Needs Revision',
        weightage: 'High',
        subtopics: [
          { name: 'VSEPR Theory & Geometries', isMastered: true },
          { name: 'Hybridization sp, sp2, sp3, sp3d', isMastered: false },
          { name: 'Molecular Orbital Theory (MOT)', isMastered: false }
        ]
      },
      {
        id: 'syl-chem-4',
        name: 'Thermodynamics',
        subject: 'Chemistry',
        classLevel: '11',
        exam: 'JEE',
        progressPercent: 62,
        status: 'Practicing',
        weightage: 'High',
        subtopics: [
          { name: 'First Law of Thermodynamics', isMastered: true },
          { name: 'Enthalpy & Hess Law', isMastered: true },
          { name: 'Entropy & Gibbs Free Energy', isMastered: false }
        ]
      },
      // Mathematics Class 11
      {
        id: 'syl-math-1',
        name: 'Sets, Relations & Functions',
        subject: 'Mathematics',
        classLevel: '11',
        exam: 'JEE',
        progressPercent: 82,
        status: 'Strong',
        weightage: 'Medium',
        subtopics: [
          { name: 'Subsets, Union & Intersections', isMastered: true },
          { name: 'Domain & Range of Functions', isMastered: true },
          { name: 'Types of Relations', isMastered: false }
        ]
      },
      {
        id: 'syl-math-2',
        name: 'Trigonometric Functions',
        subject: 'Mathematics',
        classLevel: '11',
        exam: 'JEE',
        progressPercent: 65,
        status: 'Practicing',
        weightage: 'High',
        subtopics: [
          { name: 'Trigonometric Identities & Values', isMastered: true },
          { name: 'Compound & Multiple Angle Formulas', isMastered: true },
          { name: 'Trigonometric Equations', isMastered: false }
        ]
      },
      {
        id: 'syl-math-3',
        name: 'Quadratic Equations & Complex Numbers',
        subject: 'Mathematics',
        classLevel: '11',
        exam: 'JEE',
        progressPercent: 48,
        status: 'Needs Revision',
        weightage: 'High',
        subtopics: [
          { name: 'Roots, Discriminant & Nature of Roots', isMastered: true },
          { name: 'Location of Roots Conditions', isMastered: false },
          { name: 'Modulus, Argument & Polar Form', isMastered: false }
        ]
      },
      {
        id: 'syl-math-4',
        name: 'Sequences and Series',
        subject: 'Mathematics',
        classLevel: '11',
        exam: 'JEE',
        progressPercent: 0,
        status: 'Not Started',
        weightage: 'High',
        subtopics: [
          { name: 'Arithmetic Progressions (AP)', isMastered: false },
          { name: 'Geometric Progressions (GP)', isMastered: false },
          { name: 'Special Series & Sigma Notation', isMastered: false }
        ]
      }
    ];

    const saved = getStorageItem<SyllabusChapter[]>(SYLLABUS_KEY as any, defaultSyllabus);
    return saved.filter(c => {
      const matchClass = !classLevel || c.classLevel === classLevel;
      const matchSubj = !subject || c.subject === subject;
      return matchClass && matchSubj;
    });
  }

  public updateChapterStatus(chapterId: string, status: SyllabusChapter['status'], progressPercent?: number): void {
    const list = this.getSyllabus('JEE', '11');
    const updated = list.map(ch => {
      if (ch.id === chapterId) {
        return {
          ...ch,
          status,
          progressPercent: progressPercent !== undefined ? progressPercent : ch.progressPercent
        };
      }
      return ch;
    });
    setStorageItem(SYLLABUS_KEY as any, updated);
  }

  // -------------------------------------------------------------
  // 12. STUDY PLANNER (Weekly Task Schedule)
  // -------------------------------------------------------------
  public getPlannerTasks(): PlannerTask[] {
    const defaultTasks: PlannerTask[] = [
      { id: 'pt-1', day: 'Monday', subject: 'Physics', chapter: 'Kinematics', taskType: 'Practice', durationMinutes: 45, completed: true, notes: 'Projectile motion high priority' },
      { id: 'pt-2', day: 'Monday', subject: 'Chemistry', chapter: 'Some Basic Concepts of Chemistry', taskType: 'Concept', durationMinutes: 30, completed: true, notes: 'Mole concept notes review' },
      { id: 'pt-3', day: 'Tuesday', subject: 'Mathematics', chapter: 'Quadratic Equations & Complex Numbers', taskType: 'Practice', durationMinutes: 40, completed: false, notes: 'Location of roots drill' },
      { id: 'pt-4', day: 'Tuesday', subject: 'Physics', chapter: 'Laws of Motion', taskType: 'Formula', durationMinutes: 20, completed: false, notes: 'Friction coefficients flashcards' },
      { id: 'pt-5', day: 'Wednesday', subject: 'Chemistry', chapter: 'Chemical Bonding & Molecular Structure', taskType: 'Revision', durationMinutes: 35, completed: false, notes: 'Hybridization rules' },
      { id: 'pt-6', day: 'Wednesday', subject: 'Mathematics', chapter: 'Trigonometric Functions', taskType: 'Test', durationMinutes: 25, completed: false, notes: '10-Q timed quiz' },
      { id: 'pt-7', day: 'Thursday', subject: 'Physics', chapter: 'Kinematics', taskType: 'Revision', durationMinutes: 30, completed: false, notes: 'Mistake book blind retry' },
      { id: 'pt-8', day: 'Friday', subject: 'Chemistry', chapter: 'Structure of Atom', taskType: 'Practice', durationMinutes: 45, completed: false, notes: 'Bohr orbits and quantum numbers' },
      { id: 'pt-9', day: 'Saturday', subject: 'Mathematics', chapter: 'Sets, Relations & Functions', taskType: 'Test', durationMinutes: 60, completed: false, notes: 'Weekly subject checkpoint' },
      { id: 'pt-10', day: 'Sunday', subject: 'Physics', chapter: 'Laws of Motion', taskType: 'Revision', durationMinutes: 30, completed: false, notes: 'Weekly wrap up & audit' }
    ];
    return getStorageItem<PlannerTask[]>(PLANNER_TASKS_KEY as any, defaultTasks);
  }

  public addPlannerTask(task: Omit<PlannerTask, 'id'>): PlannerTask {
    const tasks = this.getPlannerTasks();
    const newTask: PlannerTask = {
      ...task,
      id: `pt-${Date.now()}`
    };
    tasks.push(newTask);
    setStorageItem(PLANNER_TASKS_KEY as any, tasks);
    return newTask;
  }

  public togglePlannerTask(id: string): PlannerTask[] {
    const tasks = this.getPlannerTasks();
    const updated = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    setStorageItem(PLANNER_TASKS_KEY as any, updated);
    return updated;
  }

  public deletePlannerTask(id: string): PlannerTask[] {
    const tasks = this.getPlannerTasks();
    const updated = tasks.filter(t => t.id !== id);
    setStorageItem(PLANNER_TASKS_KEY as any, updated);
    return updated;
  }

  // -------------------------------------------------------------
  // 13. GOALS & MILESTONES
  // -------------------------------------------------------------
  public getGoals(): StudentGoal {
    const defaultGoal: StudentGoal = {
      id: 'sg-1',
      targetExam: 'JEE',
      targetScore: 220,
      maxScore: 300,
      targetDate: '2026-05-15',
      currentEstimatedScore: 168,
      milestones: [
        { id: 'm-1', title: 'Century Solver', description: 'Solve 100 practice questions', targetValue: 100, currentValue: 100, unit: 'Qs', achieved: true, rewardBadge: '🎯' },
        { id: 'm-2', title: 'Problem Hunter', description: 'Solve 250 practice questions', targetValue: 250, currentValue: 184, unit: 'Qs', achieved: false, rewardBadge: '⚡' },
        { id: 'm-3', title: 'Mock Veteran', description: 'Attempt 5 full-length exam simulations', targetValue: 5, currentValue: 3, unit: 'Tests', achieved: false, rewardBadge: '🏆' },
        { id: 'm-4', title: 'Streak Titan', description: 'Maintain a 7-day study streak', targetValue: 7, currentValue: 5, unit: 'Days', achieved: false, rewardBadge: '🔥' },
        { id: 'm-5', title: 'Weakness Slayer', description: 'Clear 3 repeated mistake clusters in Mistake Book', targetValue: 3, currentValue: 2, unit: 'Chapters', achieved: false, rewardBadge: '🛡️' }
      ]
    };
    return getStorageItem<StudentGoal>(GOALS_KEY as any, defaultGoal);
  }

  public updateGoalTargets(targetScore: number, targetDate: string): StudentGoal {
    const current = this.getGoals();
    const updated = { ...current, targetScore, targetDate };
    setStorageItem(GOALS_KEY as any, updated);
    return updated;
  }

  // -------------------------------------------------------------
  // 14. QUESTION REPORTING (For Students & Admin)
  // -------------------------------------------------------------
  public reportQuestion(report: { questionId: string; questionSnippet: string; subject: SubjectName; chapter: string; reason: QuestionReportReason; message?: string }): QuestionReport {
    const existing = getStorageItem<QuestionReport[]>(QUESTION_REPORTS_KEY as any, [
      {
        id: 'rep-1',
        questionId: 'phy-11-002',
        questionSnippet: 'A stone thrown vertically upwards reaches max height...',
        subject: 'Physics',
        chapter: 'Kinematics',
        reason: 'Typo',
        message: 'Option C has unit m/s2 instead of m/s',
        createdAt: '2026-09-12',
        status: 'Pending'
      },
      {
        id: 'rep-2',
        questionId: 'chem-11-001',
        questionSnippet: 'Calculate number of moles in 44g of CO2...',
        subject: 'Chemistry',
        chapter: 'Some Basic Concepts of Chemistry',
        reason: 'Wrong Explanation',
        message: 'Step 2 misses the atomic mass of oxygen x 2',
        createdAt: '2026-09-13',
        status: 'Reviewed'
      }
    ]);

    const newReport: QuestionReport = {
      id: `rep-${Date.now()}`,
      ...report,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'Pending'
    };

    existing.unshift(newReport);
    setStorageItem(QUESTION_REPORTS_KEY as any, existing);
    return newReport;
  }

  public getQuestionReports(): QuestionReport[] {
    return getStorageItem<QuestionReport[]>(QUESTION_REPORTS_KEY as any, [
      {
        id: 'rep-1',
        questionId: 'phy-11-002',
        questionSnippet: 'A stone thrown vertically upwards reaches max height...',
        subject: 'Physics',
        chapter: 'Kinematics',
        reason: 'Typo',
        message: 'Option C has unit m/s2 instead of m/s',
        createdAt: '2026-09-12',
        status: 'Pending'
      },
      {
        id: 'rep-2',
        questionId: 'chem-11-001',
        questionSnippet: 'Calculate number of moles in 44g of CO2...',
        subject: 'Chemistry',
        chapter: 'Some Basic Concepts of Chemistry',
        reason: 'Wrong Explanation',
        message: 'Step 2 misses the atomic mass of oxygen x 2',
        createdAt: '2026-09-13',
        status: 'Reviewed'
      }
    ]);
  }

  public updateReportStatus(reportId: string, status: QuestionReport['status']): QuestionReport[] {
    const list = this.getQuestionReports();
    const updated = list.map(r => r.id === reportId ? { ...r, status } : r);
    setStorageItem(QUESTION_REPORTS_KEY as any, updated);
    return updated;
  }

  // -------------------------------------------------------------
  // 15. RESOURCE HUB
  // -------------------------------------------------------------
  public getResources(subject?: SubjectName, category?: ResourceItem['category']): ResourceItem[] {
    const allResources: ResourceItem[] = [
      {
        id: 'res-1',
        title: 'Kinematics Complete Master Notes & Derivations',
        category: 'Notes',
        subject: 'Physics',
        chapter: 'Kinematics',
        classLevel: '11',
        exam: 'JEE',
        actionUrl: '/chapters/Kinematics',
        itemCount: '18 Pages',
        fileSize: '2.4 MB',
        description: 'Comprehensive high-yield notes covering 1D motion, graphs, relative velocity, and projectile formulas.'
      },
      {
        id: 'res-2',
        title: 'Laws of Motion & Friction Formula Cheat Sheet',
        category: 'Formula Sheets',
        subject: 'Physics',
        chapter: 'Laws of Motion',
        classLevel: '11',
        exam: 'JEE',
        actionUrl: '/chapters/Laws%20of%20Motion',
        itemCount: '24 Formulas',
        fileSize: '1.1 MB',
        description: 'Instant recall sheet with free body diagrams, pulley constraints, and pseudo force formulations.'
      },
      {
        id: 'res-3',
        title: 'Chemical Bonding Flashcard Deck',
        category: 'Flashcards',
        subject: 'Chemistry',
        chapter: 'Chemical Bonding & Molecular Structure',
        classLevel: '11',
        exam: 'JEE',
        actionUrl: '/chapters/Chemical%20Bonding%20%26%20Molecular%20Structure',
        itemCount: '32 Cards',
        fileSize: 'Interactive',
        description: 'Leitner spaced repetition cards for hybridizations, bond angles, and MOT electronic configurations.'
      },
      {
        id: 'res-4',
        title: 'JEE Main 2024 Kinematics Past Year Questions (PYQs)',
        category: 'PYQs',
        subject: 'Physics',
        chapter: 'Kinematics',
        classLevel: '11',
        exam: 'JEE',
        actionUrl: '/papers',
        itemCount: '15 Questions',
        fileSize: 'CBT Simulator',
        description: 'All shift questions from JEE Main 2024 with step-by-step verified explanations and timer stats.'
      },
      {
        id: 'res-5',
        title: 'Quadratic Equations & Complex Numbers Master Problem Bank',
        category: 'Practice',
        subject: 'Mathematics',
        chapter: 'Quadratic Equations & Complex Numbers',
        classLevel: '11',
        exam: 'JEE',
        actionUrl: '/practice?chapter=Quadratic%20Equations%20%26%20Complex%20Numbers',
        itemCount: '45 Questions',
        fileSize: 'Multi-Tier',
        description: 'Graded problem set spanning basic algebra up to advanced location of roots and geometrical locus.'
      },
      {
        id: 'res-6',
        title: 'Atomic Structure NCERT Line-by-Line Revision Notes',
        category: 'Notes',
        subject: 'Chemistry',
        chapter: 'Structure of Atom',
        classLevel: '11',
        exam: 'JEE',
        actionUrl: '/chapters/Structure%20of%20Atom',
        itemCount: '12 Pages',
        fileSize: '1.8 MB',
        description: 'Crucial textbook pointers, graphs of radial probability distribution, and Hund/Pauli exceptions.'
      },
      {
        id: 'res-7',
        title: 'Full Syllabus Mock Paper 1 (Latest 2026 NTA Pattern)',
        category: 'Model Papers',
        subject: 'Physics',
        chapter: 'All Chapters',
        classLevel: '11',
        exam: 'JEE',
        actionUrl: '/tests',
        itemCount: '75 Questions',
        fileSize: '3 Hours CBT',
        description: 'Full simulation paper testing all 3 subjects with exact +4/-1 marking scheme and question palette.'
      }
    ];

    return allResources.filter(r => {
      const matchSubj = !subject || r.subject === subject;
      const matchCat = !category || r.category === category;
      return matchSubj && matchCat;
    });
  }
}

export const ecosystemService = new MockEcosystemService();
