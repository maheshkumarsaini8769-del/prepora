// PREPORA Service Worker for Web Push Notifications & Offline Alerts
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Handle incoming Web Push Notifications even when app/browser tab is closed
self.addEventListener('push', (event) => {
  let data = {};
  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data = { title: 'PREPORA Alert', message: event.data.text() };
    }
  }

  const title = data.title || 'PREPORA • Study Alert';
  const options = {
    body: data.message || data.body || 'You have an important study update from PREPORA.',
    icon: '/pwa-192.png',
    badge: '/badge-96.png',
    image: data.image || undefined,
    vibrate: [200, 100, 200, 100, 200],
    data: {
      url: data.actionUrl || data.url || '/',
      timestamp: Date.now()
    },
    actions: [
      { action: 'open', title: 'Open Prepora 🚀' },
      { action: 'dismiss', title: 'Dismiss' }
    ],
    tag: data.tag || data.id || `prepora-notif-${Date.now()}`,
    renotify: true,
    requireInteraction: Boolean(data.requireInteraction)
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// Notification click event: focus existing tab or open new window
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'dismiss') {
    return;
  }

  const rawUrl = event.notification.data?.url || '/';
  const targetUrl = new URL(rawUrl, self.location.origin).href;

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // If a window is already open, focus it and navigate
      for (const client of clientList) {
        if ('focus' in client) {
          client.focus();
          if ('navigate' in client && targetUrl !== client.url) {
            client.navigate(targetUrl);
          }
          return;
        }
      }
      // If no window is open, open a new window
      if (self.clients.openWindow) {
        return self.clients.openWindow(targetUrl);
      }
    })
  );
});
