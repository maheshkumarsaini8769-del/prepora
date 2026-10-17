// Utility for Browser Web Push Notification Registration, Subscription & Testing

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export function isPushNotificationSupported(): boolean {
  return (
    typeof window !== 'undefined' &&
    'serviceWorker' in navigator &&
    'PushManager' in window &&
    'Notification' in window
  );
}

export function getPushPermissionStatus(): NotificationPermission | 'unsupported' {
  if (!isPushNotificationSupported()) return 'unsupported';
  return Notification.permission;
}

export interface PushUserInfo {
  id?: string;
  phone?: string;
  targetExam?: string;
}

/**
 * Register service worker and subscribe to web push notifications
 */
export async function registerPushNotifications(
  userInfo?: PushUserInfo
): Promise<{ success: boolean; permission: NotificationPermission | 'unsupported'; message?: string }> {
  if (!isPushNotificationSupported()) {
    return {
      success: false,
      permission: 'unsupported',
      message: 'Your browser or device does not support Web Push notifications.'
    };
  }

  try {
    // 1. Request Browser Permission if not yet granted
    let permission = Notification.permission;
    if (permission === 'default') {
      permission = await Notification.requestPermission();
    }

    if (permission !== 'granted') {
      return {
        success: false,
        permission,
        message:
          permission === 'denied'
            ? 'Notifications are blocked in your browser settings. Please enable them in site permissions.'
            : 'Notification prompt was closed without granting permission.'
      };
    }

    // 2. Register Service Worker with root scope
    const registration = await navigator.serviceWorker.register('/sw.js', { scope: '/' });
    await navigator.serviceWorker.ready;

    // 3. Fetch VAPID Public Key from backend
    let publicKey = '';
    try {
      const keyRes = await fetch('/api/notifications/vapid-public-key');
      const keyData = await keyRes.json();
      publicKey = keyData.publicKey;
    } catch (e) {
      console.warn('[WebPush] Error fetching public key from server:', e);
    }

    if (!publicKey) {
      // Fallback default VAPID key
      publicKey = 'BPVvS_QyNnkOgsScKTCECOb7vTUxncWsRNXQaDolwupkn4G2Y9WpjdvHSrx7MAWsjtQJwXkvIc7qyQtMxgZ-DYI';
    }

    // 4. Subscribe to Push Manager safely
    let subscription = await registration.pushManager.getSubscription();

    try {
      if (!subscription) {
        subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(publicKey) as any
        });
      }
    } catch (subErr) {
      console.warn('[WebPush] Resubscribing due to key renewal:', subErr);
      if (subscription) {
        await subscription.unsubscribe().catch(() => null);
      }
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey) as any
      });
    }

    // 5. Send Subscription to Backend
    const phone = userInfo?.phone || localStorage.getItem('prepora_user_phone') || '';
    const userId = userInfo?.id || localStorage.getItem('prepora_user_id') || '';
    const targetExam = userInfo?.targetExam || localStorage.getItem('prepora_target_exam') || 'ALL';

    const saveRes = await fetch('/api/notifications/subscribe-push', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        subscription: subscription.toJSON(),
        phone,
        userId,
        targetExam,
        userAgent: navigator.userAgent
      })
    });

    const saveData = await saveRes.json().catch(() => ({ success: true }));

    localStorage.setItem('prepora_push_enabled', 'true');
    localStorage.setItem('prepora_push_last_synced', String(Date.now()));

    // 6. Show immediate local welcome confirmation so student instantly sees native notification
    try {
      if (registration.showNotification) {
        registration.showNotification('PREPORA Notifications Active! 🎉', {
          body: 'You will now receive test reminders, streak alerts, and teacher updates on your phone.',
          icon: '/pwa-192.png',
          badge: '/badge-96.png',
          vibrate: [200, 100, 200],
          data: { url: '/practice' },
          tag: 'prepora-welcome'
        } as any);
      }
    } catch (localNotifErr) {
      console.warn('[WebPush] Local notification fallback:', localNotifErr);
    }

    return {
      success: true,
      permission: 'granted',
      message: saveData.message || 'Push notifications enabled successfully!'
    };
  } catch (error: any) {
    console.error('[WebPush] Error setting up notifications:', error);
    return {
      success: false,
      permission: Notification.permission,
      message: error?.message || 'Failed to enable notifications.'
    };
  }
}

/**
 * Silently sync existing push subscription when permission is already granted
 */
export async function syncExistingPushSubscription(userInfo?: PushUserInfo): Promise<void> {
  if (!isPushNotificationSupported()) return;
  if (Notification.permission !== 'granted') return;

  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();

    if (!subscription) {
      // If permission is granted but subscription is missing, recreate it
      await registerPushNotifications(userInfo);
      return;
    }

    // Sync with backend every 6 hours or when user logs in
    const lastSynced = localStorage.getItem('prepora_push_last_synced');
    const now = Date.now();
    const shouldSync = !lastSynced || now - parseInt(lastSynced, 10) > 6 * 3600 * 1000 || userInfo?.phone;

    if (shouldSync) {
      const phone = userInfo?.phone || localStorage.getItem('prepora_user_phone') || '';
      const userId = userInfo?.id || localStorage.getItem('prepora_user_id') || '';
      const targetExam = userInfo?.targetExam || localStorage.getItem('prepora_target_exam') || 'ALL';

      await fetch('/api/notifications/subscribe-push', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subscription: subscription.toJSON(),
          phone,
          userId,
          targetExam,
          userAgent: navigator.userAgent
        })
      });

      localStorage.setItem('prepora_push_last_synced', String(now));
      localStorage.setItem('prepora_push_enabled', 'true');
    }
  } catch (err) {
    console.warn('[WebPush] Silent sync error:', err);
  }
}

/**
 * Send a real backend push notification test to current browser/device
 */
export async function sendTestPushNotification(phone?: string, userId?: string): Promise<{ success: boolean; message: string }> {
  if (!isPushNotificationSupported()) {
    return { success: false, message: 'Web Push is not supported in this browser.' };
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();

    const res = await fetch('/api/notifications/test-push', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        endpoint: subscription?.endpoint || '',
        phone: phone || localStorage.getItem('prepora_user_phone') || '',
        userId: userId || localStorage.getItem('prepora_user_id') || ''
      })
    });

    const data = await res.json();
    return {
      success: Boolean(data.success),
      message: data.message || (data.success ? 'Test notification sent!' : 'Failed to send test push.')
    };
  } catch (err: any) {
    return { success: false, message: err?.message || 'Network error sending test notification.' };
  }
}
