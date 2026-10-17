// Utility for Browser Web Push Notification Registration & Subscription

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

export async function registerPushNotifications(userInfo?: {
  id?: string;
  phone?: string;
  targetExam?: string;
}): Promise<{ success: boolean; permission: NotificationPermission | 'unsupported'; message?: string }> {
  if (!isPushNotificationSupported()) {
    return { success: false, permission: 'unsupported', message: 'Browser does not support Web Push notifications.' };
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
        message: permission === 'denied'
          ? 'Notification permission was denied in browser settings.'
          : 'Notification permission was dismissed.'
      };
    }

    // 2. Register Service Worker
    const registration = await navigator.serviceWorker.register('/sw.js', { scope: '/' });
    await navigator.serviceWorker.ready;

    // 3. Fetch VAPID Public Key from server
    const keyRes = await fetch('/api/notifications/vapid-public-key');
    const keyData = await keyRes.json();
    const publicKey = keyData.publicKey;

    if (!publicKey) {
      throw new Error('VAPID public key not provided by server.');
    }

    // 4. Subscribe to Push Manager
    let subscription = await registration.pushManager.getSubscription();
    if (!subscription) {
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey) as any
      });
    }

    // 5. Send Subscription to Backend
    const phone = userInfo?.phone || localStorage.getItem('prepora_user_phone') || '';
    const userId = userInfo?.id || '';
    const targetExam = userInfo?.targetExam || 'JEE';

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

    const saveData = await saveRes.json();
    if (saveData.success) {
      localStorage.setItem('prepora_push_enabled', 'true');
      return { success: true, permission: 'granted', message: 'Push notifications enabled successfully!' };
    }

    return { success: true, permission: 'granted' };
  } catch (error: any) {
    console.error('[WebPush] Error setting up notifications:', error);
    return { success: false, permission: Notification.permission, message: error.message };
  }
}
