import { useState } from 'react';

type FilterType = 'all' | 'unread' | 'system';

interface Notification {
  id: number;
  type: 'error' | 'success' | 'info' | 'muted';
  icon: string;
  title: string;
  body: string;
  time: string;
  unread: boolean;
  action?: string;
}

const NOTIFICATIONS: Notification[] = [
  { id: 1, type: 'error', icon: '⚠️', title: 'Route Delay: North Campus Express', body: 'Due to construction on College Ave, the North Campus Express is experiencing a 15-minute delay.', time: '10 MIN AGO', unread: true, action: 'Check Alternate Route' },
  { id: 2, type: 'success', icon: '✅', title: 'Seat Reserved: Academic Hub Loop', body: 'Your reservation for tomorrow at 8:30 AM (Bus #402) has been confirmed.', time: '2 HOURS AGO', unread: false, action: 'View Ticket' },
  { id: 3, type: 'info', icon: '📢', title: 'Holiday Schedule Update', body: 'Shuttle services will operate on a reduced frequency during the upcoming semester break.', time: 'YESTERDAY', unread: true },
  { id: 4, type: 'muted', icon: '💬', title: 'Support Case Resolved: #4492', body: '"Thank you for reporting the lost umbrella. It has been found at the Student Union."', time: '3 DAYS AGO', unread: false },
];

const borderColors: Record<Notification['type'], string> = {
  error: '#ba1a1a',
  success: 'transparent',
  info: 'var(--color-primary)',
  muted: 'transparent',
};

export default function NotificationsPage() {
  const [filter, setFilter] = useState<FilterType>('all');

  const filtered = NOTIFICATIONS.filter(n => {
    if (filter === 'unread') return n.unread;
    if (filter === 'system') return n.type === 'error' || n.type === 'info';
    return true;
  });

  return (
    <div className="p-8 lg:p-12">
      <header className="mb-10">
        <h2 className="text-3xl font-bold mb-1" style={{ color: 'var(--color-primary-dark)', fontFamily: 'Manrope, sans-serif' }}>Notifications</h2>
        <p className="text-sm text-[var(--color-text-muted)]">Stay updated with your transit schedule and campus announcements.</p>
      </header>

      <div className="grid grid-cols-12 gap-8 max-w-5xl">
        {/* Sidebar */}
        <div className="col-span-12 lg:col-span-3 space-y-5">
          <div className="flex flex-col gap-2">
            {(['all', 'unread', 'system'] as const).map(id => (
              <button
                key={id}
                onClick={() => setFilter(id)}
                className={`px-4 py-2.5 rounded-lg text-sm text-left transition-all ${filter === id ? 'bg-white font-bold border-l-4 border-[var(--color-primary)]' : 'text-[var(--color-text-muted)]'}`}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </button>
            ))}
          </div>
          <div className="p-5 rounded-xl text-white bg-gradient-to-br from-[var(--color-primary-dark)] to-[var(--color-primary)]">
            <h4 className="font-bold text-sm mb-1">Live Tracking</h4>
            <p className="text-xs opacity-80 mb-4">Route "North Loop" is 2 mins away.</p>
            <button className="w-full py-2 rounded-lg text-xs font-bold bg-white/20">View Map</button>
          </div>
        </div>

        {/* List */}
        <div className="col-span-12 lg:col-span-9 space-y-4">
          {filtered.map(n => (
            <div
              key={n.id}
              className={`flex gap-5 p-6 rounded-xl border-l-4 transition-all ${n.unread ? 'bg-white shadow-sm' : 'bg-[var(--color-bg-soft)]'}`}
              style={{ borderColor: borderColors[n.type] }}
            >
              <div className="w-11 h-11 rounded-full flex items-center justify-center text-xl bg-[var(--color-bg-muted)]">{n.icon}</div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-sm text-[var(--color-primary-dark)]">{n.title}</h4>
                  <span className="text-xs text-[var(--color-text-muted)]">{n.time}</span>
                </div>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{n.body}</p>
                {n.action && (
                  <button className="mt-3 text-xs font-bold px-3 py-1.5 rounded-full bg-[var(--color-secondary-light)] text-[var(--color-primary-dark)]">
                    {n.action}
                  </button>
                )}
              </div>
              {n.unread && <div className="w-2.5 h-2.5 rounded-full self-center bg-[var(--color-primary)]" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}