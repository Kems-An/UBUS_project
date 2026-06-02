// src/components/NotificationBell.tsx
// Drop this component into StudentLayout and DriverLayout headers

import { useState, useRef, useEffect } from 'react';
import { Bell, X, CheckCheck, Bus, Ticket } from 'lucide-react';
import type { AppNotification } from '../hooks/useNotifications';

interface Props {
  notifications: AppNotification[];
  unreadCount: number;
  markAllRead: () => void;
  dismiss: (id: string) => void;
}

export default function NotificationBell({ notifications, unreadCount, markAllRead, dismiss }: Props) {
  const [open, setOpen]     = useState(false);
  const panelRef            = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const formatTime = (date: Date) => {
    const diff = Math.floor((Date.now() - date.getTime()) / 1000);
    if (diff < 60)  return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
  };

  return (
    <div ref={panelRef} className="relative">
      {/* Bell button */}
      <button
        onClick={() => { setOpen(o => !o); if (!open && unreadCount > 0) markAllRead(); }}
        className="relative p-2.5 rounded-xl bg-white border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors shadow-sm"
      >
        <Bell size={18} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center border-2 border-white animate-bounce">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute right-0 top-12 w-80 bg-white border border-[var(--color-border)] rounded-2xl shadow-2xl z-50 overflow-hidden">
          
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-border)]">
            <div className="flex items-center gap-2">
              <Bell size={14} className="text-[var(--color-primary)]" />
              <span className="text-xs font-black text-[var(--color-primary-dark)] uppercase tracking-wider">
                Notifications
              </span>
              {unreadCount > 0 && (
                <span className="px-1.5 py-0.5 bg-rose-100 text-rose-600 text-[10px] font-black rounded-full">
                  {unreadCount} new
                </span>
              )}
            </div>
            {notifications.length > 0 && (
              <button onClick={markAllRead}
                className="flex items-center gap-1 text-[10px] font-black text-[var(--color-primary)] uppercase tracking-wider hover:underline">
                <CheckCheck size={12} /> Mark all read
              </button>
            )}
          </div>

          {/* Notification list */}
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="py-10 text-center">
                <Bell size={24} className="text-[var(--color-text-muted)] mx-auto mb-2 opacity-30" />
                <p className="text-xs font-bold text-[var(--color-text-muted)]">No notifications yet</p>
              </div>
            ) : (
              notifications.map(n => (
                <div key={n.id}
                  className={`flex items-start gap-3 px-4 py-3 border-b border-[var(--color-border)] last:border-0 ${!n.read ? 'bg-blue-50/50' : ''}`}>
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                    n.type === 'boarding' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {n.type === 'boarding' ? <Bus size={14} /> : <Ticket size={14} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-black text-[var(--color-primary-dark)]">{n.title}</p>
                    <p className="text-[11px] text-[var(--color-text-muted)] mt-0.5 leading-relaxed">{n.message}</p>
                    <p className="text-[10px] text-[var(--color-text-muted)] mt-1 opacity-60">{formatTime(n.time)}</p>
                  </div>
                  <button onClick={() => dismiss(n.id)}
                    className="p-1 text-[var(--color-text-muted)] hover:text-rose-500 transition-colors shrink-0">
                    <X size={12} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
