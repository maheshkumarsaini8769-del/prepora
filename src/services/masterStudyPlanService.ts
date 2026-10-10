/**
 * Master Study Plan Service
 * Powers Prepora's Automated Curriculum Engine:
 * - 30 Chapters × 10 Topics = 300 Topics per Subject (Physics, Chemistry, Maths / Biology)
 * - Daily Automatic Cadence: 1 Topic per Subject + Lecture (45m) + DPP Practice (15 Questions = 45 daily questions)
 * - Bi-Monthly Examination Schedule: Every month 2 exams held (Day 15 Mid-Month & Day 30 End-Month Cumulative)
 * - Full Dated Calendar Roadmap: Date-wise schedule with direct lecture & practice actions
 * - Zero-Configuration for New Students: Automatically generated, student only sets Exam Date
 */

import {
  physics30Chapters,
  chemistry30Chapters,
  mathematics30Chapters,
  biology30Chapters,
  CurriculumChapter,
  CurriculumTopic
} from '../data/masterCurriculum300';
import { userService } from './userService';

export interface DaySubjectTopic {
  subject: 'Physics' | 'Chemistry' | 'Mathematics' | 'Biology';
  chapterNumber: number;
  chapterName: string;
  topicNumber: number;
  topicName: string;
  lectureDurationMinutes: number;
  dppQuestionCount: number;
  lectureCompleted: boolean;
  dppCompleted: boolean;
}

export interface MonthlyExam {
  examId: string;
  title: string;
  type: 'MID_MONTH_MILESTONE' | 'MONTH_END_CUMULATIVE';
  monthIndex: number;
  questionCount: number;
  marks: number;
  durationMinutes: number;
  syllabusCoverage: string;
  completed: boolean;
  score?: number;
}

export interface DayPlan {
  dayNumber: number;
  date: string; // YYYY-MM-DD
  formattedDate: string;
  dayOfWeek: string;
  topics: DaySubjectTopic[];
  dailyTotalLectureMinutes: number;
  dailyTotalDppQuestions: number;
  exam?: MonthlyExam;
  allCompleted: boolean;
}

export interface MasterRoadmapSummary {
  targetExam: string;
  classLevel: string;
  startDate: string;
  targetDate: string;
  totalDays: number;
  totalTopicsPerSubject: number;
  totalChaptersPerSubject: number;
  totalExamsScheduled: number;
  topicsPerDayRate: number;
  completedTopicsCount: number;
  completedDppsCount: number;
  completedExamsCount: number;
  progressPercentage: number;
}

export interface MasterRoadmapState {
  summary: MasterRoadmapSummary;
  days: DayPlan[];
}

const STORAGE_KEY = 'prepora_master_study_plan_v2';
const CONFIG_KEY = 'prepora_planner_config';

class MasterStudyPlanService {
  /**
   * Flatten 30 chapters x 10 topics into a linear list of 300 topics for a given subject
   */
  private flattenSubjectTopics(chapters: CurriculumChapter[]): {
    subject: 'Physics' | 'Chemistry' | 'Mathematics' | 'Biology';
    chapterNumber: number;
    chapterName: string;
    topic: CurriculumTopic;
  }[] {
    const list: {
      subject: 'Physics' | 'Chemistry' | 'Mathematics' | 'Biology';
      chapterNumber: number;
      chapterName: string;
      topic: CurriculumTopic;
    }[] = [];

    chapters.forEach((ch) => {
      ch.topics.forEach((tp) => {
        list.push({
          subject: ch.subject,
          chapterNumber: ch.chapterNumber,
          chapterName: ch.chapterName,
          topic: tp
        });
      });
    });

    return list;
  }

  /**
   * Determine allowed subjects based on Target Exam (NEET gets Biology, JEE gets Mathematics)
   */
  public getSubjectList(exam: string): ('Physics' | 'Chemistry' | 'Mathematics' | 'Biology')[] {
    const isNeet = exam.toUpperCase().includes('NEET');
    if (isNeet) {
      return ['Physics', 'Chemistry', 'Biology'];
    }
    return ['Physics', 'Chemistry', 'Mathematics'];
  }

  /**
   * Generate fresh full roadmap from startDate to targetDate
   */
  public generateFullPlan(targetDateStr?: string): MasterRoadmapState {
    const profile = userService.getProfile();
    const targetExam = profile.targetExam || 'JEE';
    const classLevel = profile.classLevel || '12';

    // Get saved target date or fallback
    let targetDate = targetDateStr;
    if (!targetDate) {
      const savedConfig = localStorage.getItem(CONFIG_KEY);
      if (savedConfig) {
        try {
          targetDate = JSON.parse(savedConfig).targetDate;
        } catch {
          // ignore
        }
      }
    }
    if (!targetDate) {
      targetDate = '2026-05-15';
    }

    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date(targetDate);
    end.setHours(0, 0, 0, 0);

    const diffMs = Math.max(1000 * 60 * 60 * 24, end.getTime() - start.getTime());
    const totalDaysAvailable = Math.max(30, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));

    const subjects = this.getSubjectList(targetExam);

    const pTopics = this.flattenSubjectTopics(physics30Chapters);
    const cTopics = this.flattenSubjectTopics(chemistry30Chapters);
    const mTopics = this.flattenSubjectTopics(
      subjects.includes('Biology') ? biology30Chapters : mathematics30Chapters
    );

    const totalTopicsCount = 300; // Fixed: 30 chapters * 10 topics
    const days: DayPlan[] = [];

    // Calculate topics per day pace:
    // If user has >= 300 days: 1 topic/day
    // If user has < 300 days: 1 topic/day for first days, or 2 topics/day
    const topicsPerDayRate = totalDaysAvailable < 200 ? 2 : 1;
    const daysCount = Math.min(totalDaysAvailable, Math.ceil(totalTopicsCount / topicsPerDayRate) + 20);

    let topicPointer = 0;
    let totalExams = 0;

    for (let dayIdx = 0; dayIdx < daysCount; dayIdx++) {
      const currentCalDate = new Date(start.getTime() + dayIdx * 24 * 60 * 60 * 1000);
      const dateIso = currentCalDate.toISOString().split('T')[0];
      const dayNum = dayIdx + 1;

      const formattedDate = currentCalDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
      const dayOfWeek = currentCalDate.toLocaleDateString('en-US', { weekday: 'short' });

      // Daily subjects topics
      const dayTopics: DaySubjectTopic[] = [];

      for (let step = 0; step < topicsPerDayRate && topicPointer + step < totalTopicsCount; step++) {
        const currIdx = topicPointer + step;

        // Physics
        const p = pTopics[currIdx];
        if (p) {
          dayTopics.push({
            subject: 'Physics',
            chapterNumber: p.chapterNumber,
            chapterName: p.chapterName,
            topicNumber: p.topic.topicNumber,
            topicName: p.topic.topicName,
            lectureDurationMinutes: p.topic.recommendedLectureMinutes,
            dppQuestionCount: p.topic.dppQuestionCount,
            lectureCompleted: false,
            dppCompleted: false
          });
        }

        // Chemistry
        const c = cTopics[currIdx];
        if (c) {
          dayTopics.push({
            subject: 'Chemistry',
            chapterNumber: c.chapterNumber,
            chapterName: c.chapterName,
            topicNumber: c.topic.topicNumber,
            topicName: c.topic.topicName,
            lectureDurationMinutes: c.topic.recommendedLectureMinutes,
            dppQuestionCount: c.topic.dppQuestionCount,
            lectureCompleted: false,
            dppCompleted: false
          });
        }

        // Maths or Biology
        const m = mTopics[currIdx];
        if (m) {
          dayTopics.push({
            subject: m.subject,
            chapterNumber: m.chapterNumber,
            chapterName: m.chapterName,
            topicNumber: m.topic.topicNumber,
            topicName: m.topic.topicName,
            lectureDurationMinutes: m.topic.recommendedLectureMinutes,
            dppQuestionCount: m.topic.dppQuestionCount,
            lectureCompleted: false,
            dppCompleted: false
          });
        }
      }

      topicPointer += topicsPerDayRate;

      // Bi-Monthly Exam schedule:
      // Day 15 of every 30-day block = Mid-Month Review Exam
      // Day 30 of every 30-day block = End-Month Grand Cumulative Mock Exam
      let exam: MonthlyExam | undefined = undefined;
      const monthNumber = Math.floor(dayIdx / 30) + 1;
      const dayInMonth = (dayIdx % 30) + 1;

      if (dayInMonth === 15) {
        totalExams++;
        exam = {
          examId: `EXAM_M${monthNumber}_MID`,
          title: `Month ${monthNumber} Mid-Term Milestone Test`,
          type: 'MID_MONTH_MILESTONE',
          monthIndex: monthNumber,
          questionCount: 75,
          marks: 300,
          durationMinutes: 180,
          syllabusCoverage: `Days 1–15 Topics of Month ${monthNumber} (${dayTopics.map((t) => t.chapterName).slice(0, 3).join(', ')})`,
          completed: false
        };
      } else if (dayInMonth === 30) {
        totalExams++;
        exam = {
          examId: `EXAM_M${monthNumber}_FINAL`,
          title: `Month ${monthNumber} Grand Cumulative Mock Exam`,
          type: 'MONTH_END_CUMULATIVE',
          monthIndex: monthNumber,
          questionCount: 75,
          marks: 300,
          durationMinutes: 180,
          syllabusCoverage: `Full Month ${monthNumber} Cumulative Syllabus (All 30 Covered Topics)`,
          completed: false
        };
      }

      const totalMins = dayTopics.reduce((acc, t) => acc + t.lectureDurationMinutes, 0);
      const totalQuestions = dayTopics.reduce((acc, t) => acc + t.dppQuestionCount, 0);

      days.push({
        dayNumber: dayNum,
        date: dateIso,
        formattedDate,
        dayOfWeek,
        topics: dayTopics,
        dailyTotalLectureMinutes: totalMins,
        dailyTotalDppQuestions: totalQuestions,
        exam,
        allCompleted: false
      });
    }

    const summary: MasterRoadmapSummary = {
      targetExam,
      classLevel,
      startDate: start.toISOString().split('T')[0],
      targetDate,
      totalDays: days.length,
      totalTopicsPerSubject: totalTopicsCount,
      totalChaptersPerSubject: 30,
      totalExamsScheduled: totalExams,
      topicsPerDayRate,
      completedTopicsCount: 0,
      completedDppsCount: 0,
      completedExamsCount: 0,
      progressPercentage: 0
    };

    const state: MasterRoadmapState = { summary, days };
    this.saveState(state);
    return state;
  }

  /**
   * Get current master roadmap, auto-generating if not yet present
   */
  public getMasterRoadmap(): MasterRoadmapState {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as MasterRoadmapState;
        if (parsed.days && parsed.days.length > 0) {
          // Recompute progress metrics dynamically
          this.recalculateMetrics(parsed);
          return parsed;
        }
      } catch {
        // regenerate
      }
    }
    return this.generateFullPlan();
  }

  /**
   * Save state to localStorage
   */
  private saveState(state: MasterRoadmapState): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  /**
   * Recalculate summary metrics from days array
   */
  private recalculateMetrics(state: MasterRoadmapState): void {
    let completedTopics = 0;
    let completedDpps = 0;
    let totalTopics = 0;
    let completedExams = 0;
    let totalExams = 0;

    state.days.forEach((d) => {
      d.topics.forEach((t) => {
        totalTopics++;
        if (t.lectureCompleted) completedTopics++;
        if (t.dppCompleted) completedDpps++;
      });
      if (d.exam) {
        totalExams++;
        if (d.exam.completed) completedExams++;
      }
      d.allCompleted = d.topics.every((t) => t.lectureCompleted && t.dppCompleted);
    });

    state.summary.completedTopicsCount = completedTopics;
    state.summary.completedDppsCount = completedDpps;
    state.summary.completedExamsCount = completedExams;
    state.summary.progressPercentage = totalTopics > 0 ? Math.round(((completedTopics + completedDpps) / (totalTopics * 2)) * 100) : 0;
  }

  /**
   * Toggle lecture completion status
   */
  public toggleLecture(date: string, subject: string, topicNumber: number): MasterRoadmapState {
    const state = this.getMasterRoadmap();
    const day = state.days.find((d) => d.date === date);
    if (day) {
      const top = day.topics.find((t) => t.subject === subject && t.topicNumber === topicNumber);
      if (top) {
        top.lectureCompleted = !top.lectureCompleted;
      }
    }
    this.recalculateMetrics(state);
    this.saveState(state);
    return state;
  }

  /**
   * Toggle DPP completion status
   */
  public toggleDpp(date: string, subject: string, topicNumber: number): MasterRoadmapState {
    const state = this.getMasterRoadmap();
    const day = state.days.find((d) => d.date === date);
    if (day) {
      const top = day.topics.find((t) => t.subject === subject && t.topicNumber === topicNumber);
      if (top) {
        top.dppCompleted = !top.dppCompleted;
      }
    }
    this.recalculateMetrics(state);
    this.saveState(state);
    return state;
  }

  /**
   * Toggle exam completed
   */
  public toggleExam(date: string, examId: string, score?: number): MasterRoadmapState {
    const state = this.getMasterRoadmap();
    const day = state.days.find((d) => d.date === date);
    if (day && day.exam && day.exam.examId === examId) {
      day.exam.completed = !day.exam.completed;
      if (score !== undefined) {
        day.exam.score = score;
      }
    }
    this.recalculateMetrics(state);
    this.saveState(state);
    return state;
  }

  /**
   * Get today's plan card
   */
  public getTodayPlan(): DayPlan {
    const state = this.getMasterRoadmap();
    const todayIso = new Date().toISOString().split('T')[0];
    const match = state.days.find((d) => d.date === todayIso);
    if (match) return match;
    // Return first day as active plan
    return state.days[0] || null;
  }

  /**
   * Change target exam date and gracefully rebuild calendar dates
   */
  public setTargetExamDate(newDate: string): MasterRoadmapState {
    // Preserve completed states map: `subject:chapter:topic:type` -> boolean
    const state = this.getMasterRoadmap();
    const completedMap = new Set<string>();
    state.days.forEach((d) => {
      d.topics.forEach((t) => {
        if (t.lectureCompleted) {
          completedMap.add(`LEC:${t.subject}:${t.chapterNumber}:${t.topicNumber}`);
        }
        if (t.dppCompleted) {
          completedMap.add(`DPP:${t.subject}:${t.chapterNumber}:${t.topicNumber}`);
        }
      });
      if (d.exam?.completed) {
        completedMap.add(`EXAM:${d.exam.examId}`);
      }
    });

    // Generate fresh plan with new target date
    const newState = this.generateFullPlan(newDate);

    // Reapply completions
    newState.days.forEach((d) => {
      d.topics.forEach((t) => {
        if (completedMap.has(`LEC:${t.subject}:${t.chapterNumber}:${t.topicNumber}`)) {
          t.lectureCompleted = true;
        }
        if (completedMap.has(`DPP:${t.subject}:${t.chapterNumber}:${t.topicNumber}`)) {
          t.dppCompleted = true;
        }
      });
      if (d.exam && completedMap.has(`EXAM:${d.exam.examId}`)) {
        d.exam.completed = true;
      }
    });

    this.recalculateMetrics(newState);
    this.saveState(newState);

    // Also update prepora_planner_config
    try {
      const savedConfig = localStorage.getItem(CONFIG_KEY);
      const conf = savedConfig ? JSON.parse(savedConfig) : {};
      conf.targetDate = newDate;
      localStorage.setItem(CONFIG_KEY, JSON.stringify(conf));
    } catch {
      // ignore
    }

    return newState;
  }
}

export const masterStudyPlanService = new MasterStudyPlanService();
