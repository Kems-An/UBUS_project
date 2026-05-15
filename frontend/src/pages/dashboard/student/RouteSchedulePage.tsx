import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type RouteStatus = 'On Time' | 'Delayed' | 'Full' | 'Cancelled';

interface Schedule {
  departure: string;
  arrival: string;
  seats: number;
}

interface Route {
  id: number;
  name: string;
  from: string;
  to: string;
  frequency: string;
  stops: number;
  status: RouteStatus;
  schedules: Schedule[];
  tags: string[];
}

const ROUTES: Route[] = [
  {
    id: 1,
    name: 'Science District Express',
    from: 'Main Gate Station',
    to: 'Science & Engineering Block',
    frequency: 'Every 15 mins',
    stops: 8,
    status: 'On Time',
    tags: ['Express', 'Popular'],
    schedules: [
      { departure: '07:30 AM', arrival: '07:52 AM', seats: 12 },
      { departure: '07:45 AM', arrival: '08:07 AM', seats: 6 },
      { departure: '08:15 AM', arrival: '08:37 AM', seats: 18 },
    ],
  },
  {
    id: 2,
    name: 'Campus Night Loop',
    from: 'Student Union South',
    to: 'North Residence Halls',
    frequency: 'Every 30 mins',
    stops: 6,
    status: 'On Time',
    tags: ['Night Service'],
    schedules: [
      { departure: '08:00 PM', arrival: '08:28 PM', seats: 20 },
      { departure: '08:30 PM', arrival: '08:58 PM', seats: 14 },
    ],
  },
  {
    id: 3,
    name: 'East Campus Express',
    from: 'Central Transit Hub',
    to: 'Innovation Park East',
    frequency: 'Every 20 mins',
    stops: 5,
    status: 'Delayed',
    tags: ['Express'],
    schedules: [
      { departure: '09:00 AM', arrival: '09:18 AM', seats: 8 },
      { departure: '09:40 AM', arrival: '09:58 AM', seats: 3 },
    ],
  },
];

function getStatusStyle(status: RouteStatus): React.CSSProperties {
  switch (status) {
    case 'On Time': return { background: 'var(--color-secondary-light)', color: 'var(--color-primary-dark)' };
    case 'Delayed': return { background: '#FFF3CD', color: '#856404' };
    case 'Full': return { background: '#E8E8E8', color: '#555' };
    case 'Cancelled': return { background: '#FFDAD6', color: '#ba1a1a' };
  }
}

export default function RoutesSchedulePage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<RouteStatus | 'All'>('All');
  const [expandedRoute, setExpandedRoute] = useState<number | null>(1);

  const filtered = ROUTES.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase()) ||
                          r.from.toLowerCase().includes(search.toLowerCase()) ||
                          r.to.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-8 lg:p-12">
      <header className="mb-8">
        <h2 className="text-3xl font-bold mb-1" style={{ color: 'var(--color-primary-dark)', fontFamily: 'Manrope, sans-serif' }}>
          Routes & Schedules
        </h2>
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Select a route and book your seat.</p>
      </header>

      <div className="flex flex-col sm:flex-row gap-4 mb-8 p-5 rounded-2xl bg-white border border-[var(--color-border)]">
        <div className="flex-1 relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2">🔍</span>
          <input
            type="text"
            placeholder="Search routes..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm bg-[var(--color-bg-soft)] border border-[var(--color-border)] outline-none"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {(['All', 'On Time', 'Delayed', 'Cancelled'] as const).map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${statusFilter === s ? 'bg-[var(--color-primary)] text-white' : 'bg-[var(--color-bg-muted)] text-[var(--color-text-muted)]'}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map(route => {
          const isExpanded = expandedRoute === route.id;
          return (
            <div key={route.id} className={`rounded-2xl overflow-hidden border bg-white transition-all ${isExpanded ? 'border-[var(--color-primary)]' : 'border-[var(--color-border)]'}`}>
              <button onClick={() => setExpandedRoute(isExpanded ? null : route.id)} className="w-full text-left p-6 flex justify-between items-center">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-[var(--color-bg-muted)]">🚌</div>
                  <div>
                    <h3 className="font-bold text-base" style={{ color: 'var(--color-primary-dark)' }}>{route.name}</h3>
                    <p className="text-sm text-[var(--color-text-muted)]">{route.from} → {route.to}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase" style={getStatusStyle(route.status)}>{route.status}</span>
                  <span className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}>▼</span>
                </div>
              </button>
              
              {isExpanded && (
                <div className="px-6 pb-6 pt-2 border-t border-[var(--color-bg-muted)]">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-[10px] font-bold uppercase text-[var(--color-text-muted)]">
                        <th className="pb-3">Departure</th>
                        <th className="pb-3">Availability</th>
                        <th className="pb-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--color-bg-muted)]">
                      {route.schedules.map((sched, idx) => (
                        <tr key={idx}>
                          <td className="py-4 font-bold text-sm">{sched.departure}</td>
                          <td className="py-4 text-xs text-green-600">{sched.seats} seats left</td>
                          <td className="py-4 text-right">
                            <button 
                              onClick={() => navigate('/dashboard/student/payment', { state: { seat: 'Auto-Assigned' } })}
                              className="px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white font-bold text-xs"
                            >
                              Book Seat
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}