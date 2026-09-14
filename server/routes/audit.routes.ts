import express, { Request, Response } from 'express';
import AuditLog from '../models/AuditLog.js';

const router = express.Router();

// GET /api/audit - List audit logs with filters & search
router.get('/', async (req: Request, res: Response) => {
  try {
    const {
      adminEmail,
      action,
      entityType,
      search,
      startDate,
      endDate,
      page = '1',
      limit = '50'
    } = req.query;

    const filter: any = {};
    if (adminEmail && adminEmail !== 'All') filter.adminEmail = adminEmail;
    if (action && action !== 'All') filter.action = action;
    if (entityType && entityType !== 'All') filter.entityType = entityType;

    if (startDate || endDate) {
      filter.timestamp = {};
      if (startDate) filter.timestamp.$gte = new Date(startDate as string);
      if (endDate) filter.timestamp.$lte = new Date(endDate as string);
    }

    if (search && typeof search === 'string') {
      const regex = new RegExp(search, 'i');
      filter.$or = [
        { entityId: regex },
        { adminEmail: regex },
        { action: regex }
      ];
    }

    const pageNum = parseInt(page as string, 10) || 1;
    const limitNum = Math.min(parseInt(limit as string, 10) || 50, 100);

    const logs = await AuditLog.find(filter)
      .sort({ timestamp: -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum);

    const total = await AuditLog.countDocuments(filter);

    res.json({
      success: true,
      logs,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum)
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/audit/meta/actions - Distinct action names
router.get('/meta/actions', async (_req: Request, res: Response) => {
  try {
    const actions = await AuditLog.distinct('action');
    res.json({ success: true, actions });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
