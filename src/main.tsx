import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.css';
// Handle Vite chunk preload errors across deployments
if (typeof window !== 'undefined') {
  window.addEventListener('vite:preloadError', (event) => {
    event.preventDefault();
    console.warn('[Prepora] Detected vite:preloadError due to new deployment. Reloading...');
    const reloadKey = 'prepora_chunk_reload';
    const lastReload = sessionStorage.getItem(reloadKey);
    const now = Date.now();
    if (!lastReload || now - parseInt(lastReload, 10) > 10000) {
      sessionStorage.setItem(reloadKey, String(now));
      window.location.reload();
    }
  });

  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason;
    const msg = reason?.message || String(reason || '');
    if (
      msg.includes('dynamically imported module') ||
      msg.includes('error loading dynamically imported') ||
      msg.includes('Failed to fetch dynamically imported') ||
      msg.includes('disallowed MIME type') ||
      msg.includes('importing a module script')
    ) {
      event.preventDefault();
      console.warn('[Prepora] Caught dynamic chunk import rejection. Reloading latest bundle...', msg);
      const reloadKey = 'prepora_chunk_reload';
      const lastReload = sessionStorage.getItem(reloadKey);
      const now = Date.now();
      if (!lastReload || now - parseInt(lastReload, 10) > 10000) {
        sessionStorage.setItem(reloadKey, String(now));
        window.location.reload();
      }
    }
  });
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
