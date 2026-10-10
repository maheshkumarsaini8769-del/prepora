import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Notification, { INotification } from '../models/Notification.js';
import AuditLog from '../models/AuditLog.js';
import { authenticateUser, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BACKUP_FILE = path.join(__dirname, '../data/notifications_backup.json');

// In-memory fallback in case of MongoDB transient connection delay
const fallbackNotifications: Array<any> = [];

// Load disk backup if present
try {
  if (fs.existsSync(BACKUP_FILE)) {
    const raw = fs.readFileSync(BACKUP_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      fallbackNotifications.push(...parsed);
    }
  }
} catch (e) {
  console.warn('[Notification] Could not load backup notifications:', e);
}

function persistToDiskBackup(item: any) {
  try {
    if (!fallbackNotifications.some((n) => n.id === item.id)) {
      fallbackNotifications.unshift(item);
    }
    fs.promises.writeFile(BACKUP_FILE, JSON.stringify(fallbackNotifications, null, 2), 'utf-8').catch(() => null);
  } catch {
    // Non-fatal
  }
}

// -------------------------------------------------------------
// GET /api/notifications - Retrieve notifications for student
// -------------------------------------------------------------
router.get('/', async (req: Request, res: Response) => {
  try {
    const { userId = 'anonymous', phone = '' } = req.query;
    const cleanPhone = String(phone).replace(/[^0-9]/g, '').slice(-10);

    const conditions: any[] = [
      { targetType: 'BROADCAST' }
    ];

    if (userId && userId !== 'anonymous') {
      conditions.push({ targetType: 'SPECIFIC_USER', targetUserId: userId });
    }

    if (cleanPhone && cleanPhone.length === 10) {
      conditions.push({ targetType: 'SPECIFIC_USER', targetUserPhone: new RegExp(cleanPhone) });
    }

    let docs: any[] = [];
    try {
      docs = await Notification.find({ $or: conditions })
        .sort({ createdAt: -1 })
        .limit(50);
    } catch {
      // Fallback in-memory
      docs = fallbackNotifications.filter((n) => {
        if (n.targetType === 'BROADCAST') return true;
        if (userId && n.targetUserId === userId) return true;
        if (cleanPhone && n.targetUserPhone && n.targetUserPhone.includes(cleanPhone)) return true;
        return false;
      });
    }

    // Map to student-friendly format with isRead calculation
    const userTokens = [String(userId), cleanPhone].filter(Boolean);

    const notifications = docs.map((doc: any) => {
      const readArray: string[] = doc.readBy || [];
      const isRead = userTokens.some((t) => readArray.includes(t));

      const createdAt = new Date(doc.createdAt || Date.now());
      const now = Date.now();
      const diffMs = now - createdAt.getTime();
      const diffMin = Math.floor(diffMs / 60000);
      const diffHour = Math.floor(diffMin / 60);

      let timeAgo = 'Just now';
      if (diffHour >= 24) {
        timeAgo = createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      } else if (diffHour >= 1) {
        timeAgo = `${diffHour}h ago`;
      } else if (diffMin >= 1) {
        timeAgo = `${diffMin}m ago`;
      }

      return {
        id: doc.id,
        title: doc.title,
        message: doc.message,
        type: doc.type || 'announcement',
        actionUrl: doc.actionUrl || '',
        timestamp: timeAgo,
        isRead,
        createdAt: doc.createdAt
      };
    });

    return res.json({ success: true, notifications });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// -------------------------------------------------------------
// POST /api/notifications/:id/read - Mark notification as read
// -------------------------------------------------------------
router.post('/:id/read', async (req: Request, res: Response) => {
  try {
    const { userId = '', phone = '' } = req.body || {};
    const token = String(userId || phone || 'user').trim();

    if (token) {
      await Notification.findOneAndUpdate(
        { id: req.params.id },
        { $addToSet: { readBy: token } }
      ).catch(() => null);

      const inMem = fallbackNotifications.find((n) => n.id === req.params.id);
      if (inMem) {
        inMem.readBy = inMem.readBy || [];
        if (!inMem.readBy.includes(token)) inMem.readBy.push(token);
      }
    }

    return res.json({ success: true });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// -------------------------------------------------------------
// POST /api/notifications/broadcast - Send broadcast or targeted notification (Admin)
// -------------------------------------------------------------
router.post('/broadcast', authenticateUser, requireAdmin, async (req: Request, res: Response) => {
  try {
    const {
      title,
      message,
      type = 'announcement',
      targetType = 'BROADCAST',
      targetPhone = '',
      targetUserId = '',
      actionUrl = '',
      adminEmail = 'admin@prepora.internal'
    } = req.body || {};

    if (!title || !message) {
      return res.status(400).json({
        success: false,
        message: 'Notification title and message content are required.'
      });
    }

    const cleanPhone = targetPhone ? String(targetPhone).replace(/[^0-9]/g, '').slice(-10) : '';

    const newNotif = {
      id: `notif-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      targetType: targetType === 'SPECIFIC_USER' ? 'SPECIFIC_USER' : 'BROADCAST',
      targetUserId: targetUserId ? String(targetUserId).trim() : '',
      targetUserPhone: cleanPhone,
      title: String(title).trim(),
      message: String(message).trim(),
      type: ['announcement', 'practice', 'revision', 'test', 'support_reply', 'achievement'].includes(type)
        ? type
        : 'announcement',
      actionUrl: String(actionUrl || '').trim(),
      senderAdminEmail: adminEmail || 'admin@prepora.internal',
      readBy: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    let savedDoc: any = null;
    try {
      savedDoc = await new Notification(newNotif).save();
    } catch {
      // In-memory fallback
      persistToDiskBackup(newNotif);
      savedDoc = newNotif;
    }

    persistToDiskBackup(newNotif);

    // Record in Audit Log
    try {
      await new AuditLog({
        id: `aud-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        adminId: 'admin',
        adminEmail: adminEmail || 'admin@prepora.internal',
        adminRole: 'admin',
        action: targetType === 'BROADCAST' ? 'Broadcast Notification to All' : 'Send Targeted Notification',
        entityType: 'System',
        entityId: newNotif.id,
        afterValue: newNotif
      }).save();
    } catch {
      // Non-fatal
    }

    return res.status(201).json({
      success: true,
      notification: savedDoc,
      message: targetType === 'BROADCAST'
        ? 'Broadcast notification sent successfully to all students!'
        : `Notification sent successfully to ${cleanPhone || targetUserId}!`
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// -------------------------------------------------------------
// GET /api/notifications/admin - List all sent notifications (Admin)
// -------------------------------------------------------------
router.get('/admin', authenticateUser, requireAdmin, async (req: Request, res: Response) => {
  try {
    let list: any[] = [];
    try {
      list = await Notification.find().sort({ createdAt: -1 }).limit(100);
    } catch {
      list = fallbackNotifications;
    }

    // Merge any missing fallback items
    const ids = new Set(list.map((n) => n.id));
    for (const item of fallbackNotifications) {
      if (!ids.has(item.id)) {
        list.push(item);
      }
    }

    return res.json({
      success: true,
      notifications: list,
      total: list.length,
      broadcastCount: list.filter((n) => n.targetType === 'BROADCAST').length,
      targetedCount: list.filter((n) => n.targetType === 'SPECIFIC_USER').length
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// -------------------------------------------------------------
// DELETE /api/notifications/admin/:id - Delete notification (Admin)
// -------------------------------------------------------------
router.delete('/admin/:id', authenticateUser, requireAdmin, async (req: Request, res: Response) => {
  try {
    await Notification.deleteOne({ id: req.params.id }).catch(() => null);
    const idx = fallbackNotifications.findIndex((n) => n.id === req.params.id);
    if (idx !== -1) {
      fallbackNotifications.splice(idx, 1);
    }
    return res.json({ success: true, message: 'Notification deleted successfully.' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
