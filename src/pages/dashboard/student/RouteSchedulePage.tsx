import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Bus, 
  ChevronDown, 
  Clock, 
  MapPin, 
  Users, 
  ArrowRight,
  Filter,
  AlertCircle,
  CheckCircle2,
  XCircle
} from 'lucide-react';

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
    to: 'Science Block', // Shortened for mobile width
    frequency: '15 mins',
    stops: 8,
    status: 'On Time',
    tags: ['Express'],
    schedules: [
      { departure: '07:30 AM', arrival: '07:52 AM', seats: 12 },
      { departure: '07:45 AM', arrival: '08:07 AM', seats: 6 },
    ],
  },
  {
    id: 2,
    name: 'Campus Night Loop',
    from: 'Student Union',
    to: 'North Halls',
    frequency: '30 mins',
    stops: 6,
    status: 'On Time',
    tags: ['Night'],
    schedules: [
      { departure: '08:00 PM', arrival: '08:28 PM', seats: 20 },
    ],
  },
];

function StatusBadge({ status }: { status: RouteStatus }) {
  const styles = {
    'On Time': 'bg-emerald-50 text-emerald-700 border-emerald-100',
    'Delayed': 'bg-amber-50 text-amber-700 border-amber-100',
    'Full': 'bg-slate-50 text-slate-700 border-slate-100',
    'Cancelled': 'bg-rose-50 text-rose-700 border-rose-100',
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold border uppercase tracking-wider whitespace-nowrap ${styles[status]}`}>
      {status}
    </span>
  );
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
    /* Added overflow-x-hidden to the root and w-screen/max-w-full mix to ensure no bleed */
    <div className="w-full max-w-full overflow-x-hidden px-4 py-6 animate-in fade-in duration-500">
      
      <header className="mb-6">
        <div className="flex items-center gap-2 text-[var(--color-primary)] mb-1">
            <Bus size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest">Campus Transit</span>
        </div>
        <h2 className="text-2xl font-black tracking-tight text-[var(--color-primary-dark)]">
          Routes
        </h2>
      </header>

      {/* Search & Filters */}
      <div className="flex flex-col gap-3 mb-6">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-white border border-[var(--color-border)] outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
          />
        </div>
        
        {/* Filter bar with no-scrollbar and touch-action-pan-x */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 touch-pan-x">
          {(['All', 'On Time', 'Delayed', 'Cancelled'] as const).map(s => ( 
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold whitespace-nowrap border transition-all ${
                statusFilter === s 
                ? 'bg-[var(--color-primary-dark)] text-white border-transparent' 
                : 'bg-white text-gray-500 border-gray-100'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Routes List */}
      <div className="space-y-3">
        {filtered.map(route => {
          const isExpanded = expandedRoute === route.id;
          return (
            <div 
              key={route.id} 
              className={`rounded-xl bg-white border transition-all overflow-hidden ${
                isExpanded ? 'border-[var(--color-primary)] shadow-md' : 'border-gray-100'
              }`}
            >
              <button 
                onClick={() => setExpandedRoute(isExpanded ? null : route.id)} 
                className="w-full p-4"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                      isExpanded ? 'bg-[var(--color-primary)] text-white' : 'bg-gray-50 text-gray-400'
                    }`}>
                      <Bus size={20} strokeWidth={2} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-sm text-[var(--color-primary-dark)] truncate">{route.name}</h3>
                      <div className="flex items-center gap-1 text-[10px] text-gray-400 mt-0.5">
                          <MapPin size={10} />
                          <span className="truncate">{route.to}</span>
                          <StatusBadge status={route.status} />
                      </div>
                    </div>
                  </div>
                  <ChevronDown size={16} className={`text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </div>
              </button>
              
              {isExpanded && (
                <div className="border-t border-gray-50 bg-gray-50/20">
                  {/* Container for table that allows local scroll ONLY if needed */}
                  <div className="overflow-x-auto w-full">
                    <table className="w-full text-left table-fixed">
                      <thead className="bg-gray-50/50">
                        <tr className="text-[9px] font-bold uppercase text-gray-400">
                          <th className="px-4 py-2 w-[40%]">Time</th>
                          <th className="px-4 py-2 w-[30%] text-center">Seats</th>
                          <th className="px-4 py-2 w-[30%] text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {route.schedules.map((sched, idx) => (
                          <tr key={idx}>
                            <td className="px-4 py-3">
                                <div className="text-xs font-bold text-gray-700">{sched.departure}</div>
                            </td>
                            <td className="px-4 py-3 text-center">
                                <span className="text-[10px] font-bold text-emerald-600">{sched.seats}</span>
                            </td>
                            <td className="px-4 py-3 text-right">
                              <button 
                                onClick={() => navigate('/dashboard/student/payment')}
                                className="px-3 py-1 rounded-md bg-[var(--color-primary-dark)] text-white font-bold text-[10px]"
                              >
                                Book
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}