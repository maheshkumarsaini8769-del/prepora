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

  const title = data.title || 'PREPORA Notification';
  const options = {
    body: data.message || data.body || 'You have an important study update from PREPORA.',
    icon: '/pwa-icon.svg',
    badge: '/pwa-icon.svg',
    vibrate: [200, 100, 200],
    data: {
      url: data.actionUrl || data.url || '/'
    },
    actions: [
      { action: 'open', title: 'Open PREPORA' }
    ],
    tag: data.id || `prepora-notif-${Date.now()}`,
    renotify: true
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// Notification click event: focus existing tab or open new window
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = event.notification.data?.url || '/';

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // If a window is already open, focus it and navigate
      for (const client of clientList) {
        if (client.url && 'focus' in client) {
          client.focus();
          if ('navigate' in client && targetUrl !== '/') {
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
