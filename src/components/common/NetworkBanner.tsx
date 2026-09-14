import React, { useState, useEffect } from 'react';
import { WifiOff, RefreshCw, CheckCircle2 } from 'lucide-react';

export const NetworkBanner: React.FC = () => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [syncState, setSyncState] = useState<'idle' | 'offline' | 'syncing' | 'synced'>('idle');

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setSyncState('syncing');

      // Dispatch custom event for sync engine
      window.dispatchEvent(new CustomEvent('prepora:network-reconnected'));

      // Transition to synced after 1.8s
      const timer1 = setTimeout(() => {
        setSyncState('synced');
        // Fade out banner
        const timer2 = setTimeout(() => {
          setSyncState('idle');
        }, 3000);
        return () => clearTimeout(timer2);
      }, 1800);

      return () => clearTimeout(timer1);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setSyncState('offline');
      window.dispatchEvent(new CustomEvent('prepora:network-disconnected'));
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial check
    if (!navigator.onLine) {
      setSyncState('offline');
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (syncState === 'idle') return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 shadow-md ${
        syncState === 'offline'
          ? 'bg-amber-600 text-white'
          : syncState === 'syncing'
          ? 'bg-indigo-600 text-white'
          : 'bg-emerald-600 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between text-xs sm:text-sm font-medium">
        <div className="flex items-center gap-2">
          {syncState === 'offline' && (
            <>
              <WifiOff className="w-4 h-4 animate-pulse" />
              <span>You are offline. Your progress is saved safely on your device.</span>
            </>
          )}
          {syncState === 'syncing' && (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Back online. Syncing your test answers and progress...</span>
            </>
          )}
          {syncState === 'synced' && (
            <>
              <CheckCircle2 className="w-4 h-4" />
              <span>All changes safely synced to cloud.</span>
            </>
          )}
        </div>

        <span className="text-[11px] opacity-80 hidden sm:inline">
          {syncState === 'offline' ? 'Auto-sync will resume automatically' : 'Encrypted & Idempotent'}
        </span>
      </div>
    </div>
  );
};
