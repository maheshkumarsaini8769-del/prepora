import express, { Response } from 'express';
import { randomBytes } from 'crypto';
import Planner, { IPlanner, IPlannerTaskItem } from '../models/Planner.js';
import DailyProgress from '../models/DailyProgress.js';
import StudentActivity from '../models/StudentActivity.js';
import { authenticateUser, AuthRequest } from '../middleware/auth.js';

const router = express.Router();

function getTodayString(): string {
  return new Date().toISOString().split('T')[0];
}

// GET /api/planner - Get the authenticated student's planner for a date (defaults to today)
router.get('/', authenticateUser, async (req: AuthRequest, res: Response) => {
  try {
    const studentId = req.studentId || req.userId!;
    const date = (req.query.date as string) || getTodayString();

    let planner = await Planner.findOne({ studentId, date });

    const exam = req.user?.targetExam || 'JEE';
    const classLevel = String(req.user?.classLevel || '11');
    const isNeet = exam === 'NEET';
    const isClass11 = classLevel === '11';

    const hasWrongClassTasks = !!(planner && (
      (isClass11 && planner.tasks.some(t => t.title.includes('Definite Integration') || t.title.includes('Electrostatics') || t.chapter === 'Electrostatics' || t.chapter === 'Definite Integration')) ||
      (!isClass11 && planner.tasks.some(t => t.title.includes('Kinematics') || t.chapter === 'Kinematics'))
    ));

    if (!planner || hasWrongClassTasks || req.query.refresh === 'true') {
      // Auto-initialize standard student daily plan if first time today or class changed

      let task1: IPlannerTaskItem;
      let task2: IPlannerTaskItem;
      let task3: IPlannerTaskItem;

      if (isClass11) {
        task1 = {
          id: `task_${Date.now()}_1`,
          title: 'Physics — Kinematics Problem Solving',
          subject: 'Physics',
          chapter: 'Kinematics',
          topic: 'Motion in a Straight Line & Projectiles',
          taskType: 'Practice',
          durationMinutes: 45,
          isCompleted: false,
          notes: 'Class 11 core mechanics drill',
          timeSlot: 'Morning (09:00 - 09:45)',
          order: 1
        };
        task2 = {
          id: `task_${Date.now()}_2`,
          title: 'Chemistry — Chemical Bonding & Molecular Structure',
          subject: 'Chemistry',
          chapter: 'Chemical Bonding and Molecular Structure',
          topic: 'Hybridization & VSEPR Theory',
          taskType: 'Revision',
          durationMinutes: 40,
          isCompleted: false,
          notes: 'Class 11 high-yield bonding principles',
          timeSlot: 'Afternoon (14:00 - 14:40)',
          order: 2
        };
        task3 = {
          id: `task_${Date.now()}_3`,
          title: isNeet ? 'Biology — Cell: The Unit of Life' : 'Mathematics — Quadratic Equations & Relations',
          subject: isNeet ? 'Biology' : 'Mathematics',
          chapter: isNeet ? 'Cell: The Unit of Life' : 'Quadratic Equations',
          topic: isNeet ? 'Organelles & Endomembrane System' : 'Roots of Quadratic Equations & Graphs',
          taskType: 'Practice',
          durationMinutes: 50,
          isCompleted: false,
          notes: 'Class 11 high-scoring topic for target exam',
          timeSlot: 'Evening (18:00 - 18:50)',
          order: 3
        };
      } else {
        task1 = {
          id: `task_${Date.now()}_1`,
          title: 'Physics — Electrostatics & Gauss Law',
          subject: 'Physics',
          chapter: 'Electrostatics',
          topic: 'Electric Field & Gauss Theorem',
          taskType: 'Practice',
          durationMinutes: 45,
          isCompleted: false,
          notes: 'Class 12 core electromagnetism drill',
          timeSlot: 'Morning (09:00 - 09:45)',
          order: 1
        };
        task2 = {
          id: `task_${Date.now()}_2`,
          title: 'Chemistry — Solutions & Colligative Properties',
          subject: 'Chemistry',
          chapter: 'Solutions',
          topic: 'Raoult Law & Osmotic Pressure',
          taskType: 'Revision',
          durationMinutes: 40,
          isCompleted: false,
          notes: 'Class 12 physical chemistry focus',
          timeSlot: 'Afternoon (14:00 - 14:40)',
          order: 2
        };
        task3 = {
          id: `task_${Date.now()}_3`,
          title: isNeet ? 'Biology — Principles of Inheritance' : 'Mathematics — Definite Integration',
          subject: isNeet ? 'Biology' : 'Mathematics',
          chapter: isNeet ? 'Principles of Inheritance and Variation' : 'Integral Calculus',
          topic: isNeet ? 'Mendelian Genetics & Chromosomal Theory' : 'Properties of Definite Integrals',
          taskType: 'Practice',
          durationMinutes: 50,
          isCompleted: false,
          notes: 'Class 12 high-yield target exam topic',
          timeSlot: 'Evening (18:00 - 18:50)',
          order: 3
        };
      }

      const initialTasks: IPlannerTaskItem[] = [
        task1,
        task2,
        task3,
        {
          id: `task_${Date.now()}_4`,
          title: `${exam} Class ${classLevel} Benchmark Mini Mock Test`,
          subject: 'Physics',
          chapter: isClass11 ? 'Class 11 Mixed Syllabus' : 'Class 12 Mixed Syllabus',
          taskType: 'Mock Test',
          durationMinutes: 30,
          isCompleted: false,
          notes: 'Class-appropriate time coach benchmark test',
          timeSlot: 'Night (21:00 - 21:30)',
          order: 4
        }
      ];

      if (planner) {
        planner.targetExam = exam;
        planner.classLevel = classLevel;
        planner.tasks = initialTasks;
        await planner.save();
      } else {
        try {
          planner = new Planner({
            id: `pln_${Date.now()}_${randomBytes(3).toString('hex')}`,
            studentId,
            date,
            targetExam: exam,
            classLevel,
            dailyStudyHours: 2.75,
            tasks: initialTasks
          });
          await planner.save();
        } catch {
          planner = await Planner.findOne({ studentId, date });
          if (planner) {
            planner.targetExam = exam;
            planner.classLevel = classLevel;
            planner.tasks = initialTasks;
            await planner.save();
          }
        }
      }

      // Initialize DailyProgress
      await DailyProgress.findOneAndUpdate(
        { studentId, date },
        {
          $setOnInsert: {
            id: `dp_${Date.now()}_${randomBytes(3).toString('hex')}`,
            studentId,
            date,
            tasksTotal: initialTasks.length,
            tasksCompleted: 0,
            studyTimeMinutes: 0,
            questionsSolved: (req.user as any)?.todayQuestionsCount || 0,
            accuracyPercentage: (req.user as any)?.overallAccuracy || 0,
            streakDays: (req.user as any)?.streakDays || 1,
            goalsCompleted: 0,
            goalsTotal: 3
          }
        },
        { upsert: true, new: true }
      );
    }

    // Record PLANNER_OPENED activity (throttle to max once every 2 hours)
    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
    const recentOpen = await StudentActivity.findOne({
      studentId,
      type: 'PLANNER_OPENED',
      createdAt: { $gte: twoHoursAgo }
    });
    if (!recentOpen) {
      await StudentActivity.create({
        id: `act_${Date.now()}_${randomBytes(3).toString('hex')}`,
        studentId,
        type: 'PLANNER_OPENED',
        title: 'Planner Opened',
        description: `Student checked study planner for ${date}`
      }).catch(() => null);
    }

    res.json({ success: true, data: planner });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to fetch planner', error: error.message });
  }
});

// POST /api/planner/tasks - Add task to authenticated student's planner
router.post('/tasks', authenticateUser, async (req: AuthRequest, res: Response) => {
  try {
    const studentId = req.studentId || req.userId!;
    const {
      title,
      subject = 'Physics',
      chapter = '',
      topic = '',
      taskType = 'Practice',
      durationMinutes = 30,
      notes = '',
      timeSlot = '',
      date = getTodayString()
    } = req.body || {};

    if (!title) {
      return res.status(400).json({ success: false, message: 'Task title is required.' });
    }

    const newTask: IPlannerTaskItem = {
      id: req.body.id || `task_${Date.now()}_${randomBytes(3).toString('hex')}`,
      title: title.trim(),
      subject,
      chapter,
      topic,
      taskType,
      durationMinutes: Number(durationMinutes) || 30,
      isCompleted: Boolean(req.body.isCompleted || false),
      notes,
      timeSlot,
      day: req.body.day || '',
      order: 1
    };

    let planner;
    try {
      planner = await Planner.findOneAndUpdate(
        { studentId, date },
        {
          $push: { tasks: newTask },
          $setOnInsert: {
            id: `pln_${Date.now()}_${randomBytes(3).toString('hex')}`,
            studentId,
            date,
            targetExam: req.body.targetExam || 'JEE',
            classLevel: req.body.classLevel || '12',
            dailyStudyHours: 3.5
          }
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    } catch {
      // High-concurrency insert race recovery
      planner = await Planner.findOneAndUpdate(
        { studentId, date },
        { $push: { tasks: newTask } },
        { new: true }
      );
    }

    // Update DailyProgress
    await DailyProgress.findOneAndUpdate(
      { studentId, date },
      {
        $inc: { tasksTotal: 1 },
        $setOnInsert: {
          id: `dp_${Date.now()}_${randomBytes(3).toString('hex')}`,
          studentId,
          date,
          tasksCompleted: 0,
          studyTimeMinutes: 0,
          questionsSolved: 0,
          accuracyPercentage: 0,
          streakDays: 1,
          goalsCompleted: 0,
          goalsTotal: 0
        }
      },
      { upsert: true }
    );

    // Record activity
    await StudentActivity.create({
      id: `act_${Date.now()}_${randomBytes(3).toString('hex')}`,
      studentId,
      type: 'TASK_CREATED',
      title: `Task Created: ${newTask.title}`,
      description: `${newTask.subject} • ${newTask.durationMinutes} mins`
    }).catch(() => null);

    res.json({ success: true, data: planner, newTask });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to create task', error: error.message });
  }
});

// PUT /api/planner/tasks/:taskId - Update a task (e.g. toggle complete)
router.put('/tasks/:taskId', authenticateUser, async (req: AuthRequest, res: Response) => {
  try {
    const studentId = req.studentId || req.userId!;
    const { taskId } = req.params;
    const { isCompleted, notes, title, durationMinutes, date = getTodayString() } = req.body || {};

    // 1. First look up planner having this task ID directly across all records for this student
    let planner = await Planner.findOne({ studentId, 'tasks.id': taskId });
    if (!planner) {
      planner = await Planner.findOne({ studentId, date });
    }
    if (!planner) {
      return res.status(404).json({ success: false, message: 'Planner not found.' });
    }

    const taskIndex = planner.tasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) {
      return res.status(404).json({ success: false, message: 'Task not found in your planner.' });
    }

    const prevCompleted = planner.tasks[taskIndex].isCompleted;
    if (isCompleted !== undefined) planner.tasks[taskIndex].isCompleted = Boolean(isCompleted);
    if (notes !== undefined) planner.tasks[taskIndex].notes = notes;
    if (title) planner.tasks[taskIndex].title = title;
    if (durationMinutes) planner.tasks[taskIndex].durationMinutes = Number(durationMinutes);
    if (req.body.day) planner.tasks[taskIndex].day = req.body.day;

    await planner.save();

    // If transitioned to completed, update progress & log activity
    if (!prevCompleted && isCompleted === true) {
      const addedMinutes = planner.tasks[taskIndex].durationMinutes || 30;
      await DailyProgress.findOneAndUpdate(
        { studentId, date },
        {
          $inc: { tasksCompleted: 1, studyTimeMinutes: addedMinutes },
          $setOnInsert: {
            id: `dp_${Date.now()}_${randomBytes(3).toString('hex')}`,
            studentId,
            date,
            tasksTotal: 1,
            questionsSolved: 0,
            accuracyPercentage: 0,
            streakDays: 1,
            goalsCompleted: 0,
            goalsTotal: 0
          }
        },
        { upsert: true }
      );

      await StudentActivity.create({
        id: `act_${Date.now()}_${randomBytes(3).toString('hex')}`,
        studentId,
        type: 'TASK_COMPLETED',
        title: `Task Completed: ${planner.tasks[taskIndex].title}`,
        description: `Subject: ${planner.tasks[taskIndex].subject} (+${addedMinutes}m study time)`
      }).catch(() => null);
    } else if (prevCompleted && isCompleted === false) {
      await DailyProgress.findOneAndUpdate(
        { studentId, date },
        {
          $inc: { tasksCompleted: -1 },
          $setOnInsert: {
            id: `dp_${Date.now()}_${randomBytes(3).toString('hex')}`,
            studentId,
            date,
            tasksTotal: 1,
            studyTimeMinutes: 0,
            questionsSolved: 0,
            accuracyPercentage: 0,
            streakDays: 1,
            goalsCompleted: 0,
            goalsTotal: 0
          }
        },
        { upsert: true }
      );
    }

    res.json({ success: true, data: planner, updatedTask: planner.tasks[taskIndex] });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to update task', error: error.message });
  }
});

// DELETE /api/planner/tasks/:taskId - Remove a task
router.delete('/tasks/:taskId', authenticateUser, async (req: AuthRequest, res: Response) => {
  try {
    const studentId = req.studentId || req.userId!;
    const { taskId } = req.params;
    const date = (req.query.date as string) || getTodayString();

    let planner = await Planner.findOne({ studentId, 'tasks.id': taskId });
    if (!planner) {
      planner = await Planner.findOne({ studentId, date });
    }
    if (!planner) {
      return res.status(404).json({ success: false, message: 'Planner not found.' });
    }

    const removedTask = planner.tasks.find(t => t.id === taskId);
    planner.tasks = planner.tasks.filter(t => t.id !== taskId);
    await planner.save();

    if (removedTask) {
      const decCompleted = removedTask.isCompleted ? 1 : 0;
      await DailyProgress.findOneAndUpdate(
        { studentId, date },
        {
          $inc: { tasksTotal: -1, tasksCompleted: -decCompleted }
        }
      );
    }

    res.json({ success: true, data: planner, message: 'Task deleted successfully.' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to delete task', error: error.message });
  }
});

// GET /api/planner/progress/today - Authenticated student's daily progress
router.get('/progress/today', authenticateUser, async (req: AuthRequest, res: Response) => {
  try {
    const studentId = req.studentId || req.userId!;
    const date = getTodayString();

    let progress = await DailyProgress.findOne({ studentId, date });
    if (!progress) {
      const planner = await Planner.findOne({ studentId, date });
      const tasksTotal = planner?.tasks?.length || 0;
      const tasksCompleted = planner?.tasks?.filter(t => t.isCompleted)?.length || 0;

      progress = new DailyProgress({
        id: `dp_${Date.now()}_${randomBytes(3).toString('hex')}`,
        studentId,
        date,
        tasksTotal,
        tasksCompleted,
        studyTimeMinutes: tasksCompleted * 30,
        questionsSolved: (req.user as any)?.todayQuestionsCount || 0,
        accuracyPercentage: (req.user as any)?.overallAccuracy || 0,
        streakDays: (req.user as any)?.streakDays || 1,
        goalsCompleted: tasksCompleted >= 3 ? 3 : tasksCompleted,
        goalsTotal: 3
      });
      await progress.save();
    }

    res.json({ success: true, data: progress });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to fetch progress', error: error.message });
  }
});

// GET /api/planner/activity/stream - Authenticated student's activity stream
router.get('/activity/stream', authenticateUser, async (req: AuthRequest, res: Response) => {
  try {
    const studentId = req.studentId || req.userId!;
    const limit = Math.min(50, Number(req.query.limit) || 20);

    const activities = await StudentActivity.find({ studentId })
      .sort({ createdAt: -1 })
      .limit(limit);

    res.json({ success: true, data: activities });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to fetch activity stream', error: error.message });
  }
});

export default router;
