import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import webpush from 'web-push';
import Notification, { INotification } from '../models/Notification.js';
import PushSubscription from '../models/PushSubscription.js';
import AuditLog from '../models/AuditLog.js';
import { authenticateUser, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BACKUP_FILE = path.join(__dirname, '../data/notifications_backup.json');
const PUSH_SUBS_BACKUP_FILE = path.join(__dirname, '../data/push_subscriptions_backup.json');

// Setup VAPID keys for Web Push Notifications
const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY || 'BPVvS_QyNnkOgsScKTCECOb7vTUxncWsRNXQaDolwupkn4G2Y9WpjdvHSrx7MAWsjtQJwXkvIc7qyQtMxgZ-DYI';
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY || 'xccmwf0G40wObkeg08tDqSOAuYpQV89p_HeDR_qw5pM';
const VAPID_SUBJECT = process.env.VAPID_SUBJECT || 'mailto:admin@prepora.internal';

try {
  webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);
} catch (e) {
  console.warn('[WebPush] Error initializing VAPID:', e);
}

// In-memory fallbacks
const fallbackNotifications: Array<any> = [];
const fallbackPushSubscriptions: Array<any> = [];

// Load disk backup for notifications if present
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

// Load disk backup for push subscriptions if present
try {
  if (fs.existsSync(PUSH_SUBS_BACKUP_FILE)) {
    const raw = fs.readFileSync(PUSH_SUBS_BACKUP_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      fallbackPushSubscriptions.push(...parsed);
    }
  }
} catch (e) {
  console.warn('[PushSub] Could not load backup push subscriptions:', e);
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

function persistPushSubBackup(item: any) {
  try {
    const idx = fallbackPushSubscriptions.findIndex(
      (s) => s.subscription?.endpoint === item.subscription?.endpoint
    );
    if (idx !== -1) {
      fallbackPushSubscriptions[idx] = { ...fallbackPushSubscriptions[idx], ...item };
    } else {
      fallbackPushSubscriptions.unshift(item);
    }
    fs.promises.writeFile(
      PUSH_SUBS_BACKUP_FILE,
      JSON.stringify(fallbackPushSubscriptions, null, 2),
      'utf-8'
    ).catch(() => null);
  } catch {
    // Non-fatal
  }
}

// Helper to send Web Push Notifications in background even if app is closed
async function dispatchWebPush(notification: {
  id?: string;
  title: string;
  message: string;
  actionUrl?: string;
  type?: string;
  targetType: string;
  targetUserPhone?: string;
  targetUserId?: string;
  targetExam?: string;
}) {
  try {
    const pushPayload = JSON.stringify({
      id: notification.id || `push-${Date.now()}`,
      title: notification.title,
      message: notification.message,
      actionUrl: notification.actionUrl || '/',
      type: notification.type || 'announcement'
    });

    let query: any = {};
    if (notification.targetType === 'SPECIFIC_USER') {
      const orConditions: any[] = [];
      if (notification.targetUserPhone) {
        orConditions.push({ phone: notification.targetUserPhone });
      }
      if (notification.targetUserId) {
        orConditions.push({ userId: notification.targetUserId });
        orConditions.push({ studentId: notification.targetUserId });
      }
      if (orConditions.length > 0) {
        query.$or = orConditions;
      }
    } else if (notification.targetType === 'EXAM_SPECIFIC' && notification.targetExam && notification.targetExam !== 'ALL') {
      query.$or = [{ targetExam: notification.targetExam }, { targetExam: 'ALL' }];
    }

    let subscriptions: any[] = [];
    try {
      subscriptions = await PushSubscription.find(query).maxTimeMS(5000).limit(2000).lean();
    } catch (dbErr) {
      console.warn('[WebPush] DB query error, falling back to disk cache:', dbErr);
    }

    if (!subscriptions || subscriptions.length === 0) {
      // Use memory/disk backup
      subscriptions = fallbackPushSubscriptions.filter((s) => {
        if (!s.subscription?.endpoint) return false;
        if (notification.targetType === 'SPECIFIC_USER') {
          if (notification.targetUserPhone && s.phone && s.phone.includes(notification.targetUserPhone)) return true;
          if (notification.targetUserId && (s.userId === notification.targetUserId || s.studentId === notification.targetUserId)) return true;
          return false;
        }
        if (notification.targetType === 'EXAM_SPECIFIC' && notification.targetExam && notification.targetExam !== 'ALL') {
          return s.targetExam === notification.targetExam || s.targetExam === 'ALL';
        }
        return true;
      });
    }

    if (!subscriptions || subscriptions.length === 0) {
      return { sent: 0, failed: 0 };
    }

    let sentCount = 0;
    let failedCount = 0;

    const pushPromises = subscriptions.map(async (subDoc: any) => {
      try {
        if (!subDoc.subscription || !subDoc.subscription.endpoint) return;
        await webpush.sendNotification(subDoc.subscription, pushPayload);
        sentCount++;
      } catch (err: any) {
        failedCount++;
        // If subscription is expired or unsubscribed (HTTP 404 or 410), delete it
        if (err.statusCode === 404 || err.statusCode === 410) {
          await PushSubscription.deleteOne({ 'subscription.endpoint': subDoc.subscription?.endpoint }).catch(() => null);
          const fIdx = fallbackPushSubscriptions.findIndex(
            (s) => s.subscription?.endpoint === subDoc.subscription?.endpoint
          );
          if (fIdx !== -1) {
            fallbackPushSubscriptions.splice(fIdx, 1);
            fs.promises.writeFile(PUSH_SUBS_BACKUP_FILE, JSON.stringify(fallbackPushSubscriptions, null, 2), 'utf-8').catch(() => null);
          }
        }
      }
    });

    await Promise.allSettled(pushPromises);
    return { sent: sentCount, failed: failedCount };
  } catch (err) {
    console.warn('[WebPush] Error in dispatchWebPush:', err);
    return { sent: 0, failed: 0 };
  }
}

// -------------------------------------------------------------
// GET /api/notifications/vapid-public-key - Provide public key for browser subscription
// -------------------------------------------------------------
router.get('/vapid-public-key', (req: Request, res: Response) => {
  return res.json({
    success: true,
    publicKey: VAPID_PUBLIC_KEY
  });
});

// -------------------------------------------------------------
// POST /api/notifications/subscribe-push - Register a browser push subscription
// -------------------------------------------------------------
router.post('/subscribe-push', async (req: Request, res: Response) => {
  try {
    const { subscription, phone, userId, targetExam = 'ALL', userAgent = '' } = req.body || {};

    if (!subscription || !subscription.endpoint || !subscription.keys) {
      return res.status(400).json({ success: false, message: 'Valid push subscription object is required.' });
    }

    const cleanPhone = phone ? String(phone).replace(/[^0-9]/g, '').slice(-10) : '';
    const id = `psub-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    const subItem = {
      id,
      userId: userId ? String(userId) : undefined,
      phone: cleanPhone || undefined,
      targetExam: targetExam || 'ALL',
      subscription,
      userAgent: userAgent || '',
      updatedAt: new Date()
    };

    // Save to disk backup immediately
    persistPushSubBackup(subItem);

    // Save/Upsert in MongoDB
    try {
      await PushSubscription.findOneAndUpdate(
        { 'subscription.endpoint': subscription.endpoint },
        {
          $set: subItem,
          $setOnInsert: {
            createdAt: new Date()
          }
        },
        { upsert: true, new: true, maxTimeMS: 5000 }
      );
    } catch (dbErr) {
      console.warn('[WebPush] Warning: Push subscription saved to disk backup (DB transient delay):', dbErr);
    }

    return res.json({
      success: true,
      message: 'Mobile browser push notifications registered successfully! You will now receive background alerts.'
    });
  } catch (error: any) {
    console.error('[WebPush] Error saving push subscription:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

// -------------------------------------------------------------
// POST /api/notifications/test-push - Send instant test push to user's device
// -------------------------------------------------------------
router.post('/test-push', async (req: Request, res: Response) => {
  try {
    const { endpoint, phone, userId } = req.body || {};
    let subDoc: any = null;

    if (endpoint) {
      try {
        subDoc = await PushSubscription.findOne({ 'subscription.endpoint': endpoint }).maxTimeMS(4000).lean();
      } catch {
        subDoc = fallbackPushSubscriptions.find((s) => s.subscription?.endpoint === endpoint);
      }
    }

    if (!subDoc && phone) {
      const cleanPhone = String(phone).replace(/[^0-9]/g, '').slice(-10);
      try {
        subDoc = await PushSubscription.findOne({ phone: new RegExp(cleanPhone) }).sort({ updatedAt: -1 }).maxTimeMS(4000).lean();
      } catch {
        subDoc = fallbackPushSubscriptions.find((s) => s.phone && s.phone.includes(cleanPhone));
      }
    }

    if (!subDoc && userId) {
      try {
        subDoc = await PushSubscription.findOne({ userId: String(userId) }).sort({ updatedAt: -1 }).maxTimeMS(4000).lean();
      } catch {
        subDoc = fallbackPushSubscriptions.find((s) => s.userId === String(userId));
      }
    }

    if (!subDoc) {
      // Fallback: pick the latest registered device
      subDoc = fallbackPushSubscriptions[0];
      if (!subDoc) {
        try {
          subDoc = await PushSubscription.findOne().sort({ updatedAt: -1 }).maxTimeMS(4000).lean();
        } catch {
          // ignore
        }
      }
    }

    if (!subDoc || !subDoc.subscription || !subDoc.subscription.endpoint) {
      return res.status(404).json({
        success: false,
        message: 'No push subscription found on device. Please click "Allow Notifications" first!'
      });
    }

    const testPayload = JSON.stringify({
      id: `test-${Date.now()}`,
      title: 'PREPORA • Background Alert Active! 🚀',
      message: 'Background notifications are working smoothly even when Prepora is closed.',
      actionUrl: '/practice',
      type: 'achievement'
    });

    await webpush.sendNotification(subDoc.subscription, testPayload);

    return res.json({
      success: true,
      message: 'Test notification sent directly to your device via Web Push!'
    });
  } catch (error: any) {
    console.error('[WebPush] Error sending test push:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

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
        .limit(50)
        .maxTimeMS(5000);
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
        timestamp: timeAgo,
        isRead,
        type: doc.type || 'announcement',
        actionUrl: doc.actionUrl || '/practice',
        createdAt: doc.createdAt
      };
    });

    return res.json({
      success: true,
      notifications,
      unreadCount: notifications.filter((n) => !n.isRead).length
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// -------------------------------------------------------------
// POST /api/notifications/:id/read - Mark single notification as read
// -------------------------------------------------------------
router.post('/:id/read', async (req: Request, res: Response) => {
  try {
    const { userId = 'anonymous', phone = '' } = req.body;
    const cleanPhone = String(phone).replace(/[^0-9]/g, '').slice(-10);
    const token = cleanPhone || String(userId);

    if (token) {
      await Notification.findOneAndUpdate(
        { id: req.params.id },
        { $addToSet: { readBy: token }, $set: { updatedAt: new Date() } }
      ).catch(() => null);

      const inMem = fallbackNotifications.find((n) => n.id === req.params.id);
      if (inMem) {
        inMem.readBy = inMem.readBy || [];
        if (!inMem.readBy.includes(token)) inMem.readBy.push(token);
        persistToDiskBackup(inMem);
      }
    }

    return res.json({ success: true, message: 'Notification marked as read.' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// -------------------------------------------------------------
// POST /api/notifications/read-all - Mark all notifications as read
// -------------------------------------------------------------
router.post('/read-all', async (req: Request, res: Response) => {
  try {
    const { userId = 'anonymous', phone = '' } = req.body;
    const cleanPhone = String(phone).replace(/[^0-9]/g, '').slice(-10);
    const token = cleanPhone || String(userId);

    if (token) {
      await Notification.updateMany(
        {},
        { $addToSet: { readBy: token } }
      ).catch(() => null);

      fallbackNotifications.forEach((n) => {
        n.readBy = n.readBy || [];
        if (!n.readBy.includes(token)) n.readBy.push(token);
      });
      fs.promises.writeFile(BACKUP_FILE, JSON.stringify(fallbackNotifications, null, 2), 'utf-8').catch(() => null);
    }

    return res.json({ success: true, message: 'All notifications marked as read.' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// -------------------------------------------------------------
// POST /api/notifications/broadcast (and /send) - Send notification + Web Push (Admin)
// -------------------------------------------------------------
const handleSendNotification = async (req: Request, res: Response) => {
  try {
    const {
      title,
      message,
      type = 'announcement',
      targetType = 'BROADCAST',
      targetPhone = '',
      targetUserId = '',
      targetExam = 'ALL',
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
      targetType: targetType === 'SPECIFIC_USER' ? 'SPECIFIC_USER' : targetType === 'EXAM_SPECIFIC' ? 'EXAM_SPECIFIC' : 'BROADCAST',
      targetUserId: targetUserId ? String(targetUserId).trim() : '',
      targetUserPhone: cleanPhone,
      targetExam: targetExam || 'ALL',
      title: String(title).trim(),
      message: String(message).trim(),
      type: ['announcement', 'practice', 'revision', 'test', 'support_reply', 'achievement'].includes(type)
        ? type
        : 'announcement',
      actionUrl: String(actionUrl || '').trim() || '/practice',
      senderAdminEmail: adminEmail || 'admin@prepora.internal',
      readBy: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    let savedDoc: any = null;
    try {
      savedDoc = await new Notification(newNotif).save();
    } catch {
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
        action: targetType === 'BROADCAST' ? 'Broadcast Notification to All' : `Send Targeted Notification to ${cleanPhone || targetExam}`,
        entityType: 'System',
        entityId: newNotif.id,
        afterValue: newNotif
      }).save();
    } catch {
      // Non-fatal
    }

    // Trigger Web Push Notification to offline users / closed browser tabs
    const pushResult = await dispatchWebPush(newNotif);

    return res.status(201).json({
      success: true,
      notification: savedDoc,
      webPush: pushResult,
      message: targetType === 'BROADCAST'
        ? `Broadcast notification sent to all students! (Delivered to ${pushResult.sent} background devices)`
        : targetType === 'EXAM_SPECIFIC'
        ? `Notification sent to all ${targetExam} students! (Delivered to ${pushResult.sent} background devices)`
        : `Notification sent successfully to ${cleanPhone || targetUserId}! (Delivered to ${pushResult.sent} background devices)`
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

router.post('/broadcast', authenticateUser, requireAdmin, handleSendNotification);
router.post('/send', authenticateUser, requireAdmin, handleSendNotification);

// -------------------------------------------------------------
// GET /api/notifications/admin - List all sent notifications & push stats (Admin)
// -------------------------------------------------------------
router.get('/admin', authenticateUser, requireAdmin, async (req: Request, res: Response) => {
  try {
    let list: any[] = [];
    try {
      list = await Notification.find().sort({ createdAt: -1 }).limit(100).maxTimeMS(4000);
    } catch {
      list = fallbackNotifications;
    }

    const ids = new Set(list.map((n) => n.id));
    for (const item of fallbackNotifications) {
      if (!ids.has(item.id)) {
        list.push(item);
      }
    }

    // Count push subscribers (max of DB count or fallback backup count)
    const dbSubscribers = await PushSubscription.countDocuments().maxTimeMS(4000).catch(() => 0);
    const totalSubscribers = Math.max(dbSubscribers, fallbackPushSubscriptions.length);

    return res.json({
      success: true,
      notifications: list,
      total: list.length,
      totalSubscribers,
      broadcastCount: list.filter((n) => n.targetType === 'BROADCAST').length,
      targetedCount: list.filter((n) => n.targetType === 'SPECIFIC_USER').length
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// -------------------------------------------------------------
// DELETE /api/notifications/:id - Delete a sent notification (Admin)
// -------------------------------------------------------------
router.delete('/:id', authenticateUser, requireAdmin, async (req: Request, res: Response) => {
  try {
    await Notification.deleteOne({ id: req.params.id }).catch(() => null);
    const idx = fallbackNotifications.findIndex((n) => n.id === req.params.id);
    if (idx !== -1) {
      fallbackNotifications.splice(idx, 1);
      persistToDiskBackup({ id: '__flush__' });
    }
    return res.json({ success: true, message: 'Notification deleted successfully.' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
