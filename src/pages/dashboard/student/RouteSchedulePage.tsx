import { useState, useEffect } from 'react';
import { Bus, Clock, Users, Search, CheckCircle2, XCircle, AlertCircle, RefreshCw } from 'lucide-react';

const SUPABASE_URL    = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

interface Shuttle {
  id: string;
  name: string;
  route: string;
  capacity: number;
  departure_time: string;
  status: string;
  seats_taken?: number;
}

export default function RouteSchedulePage() {
  const [shuttles,   setShuttles]   = useState<Shuttle[]>([]);
  const [loading,    setLoading]    = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search,     setSearch]     = useState('');

  useEffect(() => { fetchShuttles(); }, []);

  const fetchShuttles = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    const [sRes, bRes] = await Promise.all([
      fetch(`${SUPABASE_URL}/rest/v1/shuttles?order=departure_time.asc&select=*`, {
        headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` },
      }),
      fetch(`${SUPABASE_URL}/rest/v1/bookings?status=in.(confirmed,scanned)&select=shuttle_id`, {
        headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` },
      }),
    ]);

    const sData: Shuttle[] = await sRes.json();
    const bData: any[]     = await bRes.json();

    if (Array.isArray(sData)) {
      const takenMap: { [id: string]: number } = {};
      if (Array.isArray(bData)) {
        bData.forEach(b => {
          if (b.shuttle_id) takenMap[b.shuttle_id] = (takenMap[b.shuttle_id] || 0) + 1;
        });
      }
      setShuttles(sData.map(s => ({ ...s, seats_taken: takenMap[s.id] || 0 })));
    }

    setLoading(false);
    setRefreshing(false);
  };

  const filtered = shuttles.filter(s =>
    s.name?.toLowerCase().includes(search.toLowerCase()) ||
    s.route?.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusIcon = (s: Shuttle) => {
    const available = s.capacity - (s.seats_taken ?? 0);
    if (s.status === 'maintenance') return <AlertCircle size={14} className="text-amber-500" />;
    if (available === 0 || s.status === 'full') return <XCircle size={14} className="text-rose-500" />;
    return <CheckCircle2 size={14} className="text-emerald-500" />;
  };

  const getStatusLabel = (s: Shuttle) => {
    const available = s.capacity - (s.seats_taken ?? 0);
    if (s.status === 'maintenance') return { label: 'Maintenance', cls: 'bg-amber-50 text-amber-700 border-amber-100' };
    if (available === 0 || s.status === 'full') return { label: 'Full',  cls: 'bg-rose-50 text-rose-700 border-rose-100' };
    return { label: 'Available', cls: 'bg-emerald-50 text-emerald-700 border-emerald-100' };
  };

  const getCapacityBar = (s: Shuttle) => {
    const pct = Math.round(((s.seats_taken ?? 0) / s.capacity) * 100);
    const color = pct > 80 ? 'bg-rose-400' : pct > 50 ? 'bg-amber-400' : 'bg-emerald-400';
    return { pct, color };
  };

  return (
    <div className="pt-6 pb-12 px-4 sm:px-8 lg:px-12 max-w-5xl mx-auto animate-in fade-in duration-300">

      {/* Header */}
      <header className="mb-8">
        <p className="text-[10px] font-black text-[var(--color-primary)] uppercase tracking-[0.2em]">
          Live Schedule
        </p>
        <h2 className="text-3xl font-black text-[var(--color-primary-dark)] tracking-tight mt-1">
          Shuttle Schedule
        </h2>
        <p className="text-xs text-[var(--color-text-muted)] font-medium mt-1">
          Real-time availability of all campus shuttles
        </p>
      </header>

      {/* Search + Refresh */}
      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search shuttles or routes..."
            className="w-full pl-9 pr-4 py-3 border border-[var(--color-border)] rounded-xl text-sm outline-none focus:border-[var(--color-primary)] transition-colors"
          />
        </div>
        <button onClick={() => fetchShuttles(true)} disabled={refreshing}
          className="flex items-center gap-2 px-4 py-3 border border-[var(--color-border)] bg-white rounded-xl text-xs font-black uppercase tracking-widest text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">
          <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Total Shuttles', value: shuttles.length },
          { label: 'Available',      value: shuttles.filter(s => (s.capacity - (s.seats_taken ?? 0)) > 0 && s.status !== 'maintenance').length },
          { label: 'Fully Booked',   value: shuttles.filter(s => (s.capacity - (s.seats_taken ?? 0)) === 0 || s.status === 'full').length },
        ].map((s, i) => (
          <div key={i} className="bg-white border border-[var(--color-border)] rounded-2xl p-5 shadow-sm text-center">
            <p className="text-2xl font-black text-[var(--color-primary-dark)]">{loading ? '...' : s.value}</p>
            <p className="text-[10px] font-black uppercase tracking-widest text-[var(--color-text-muted)] mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Shuttle Cards */}
      {loading ? (
        <div className="py-16 text-center">
          <div className="w-8 h-8 border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-[var(--color-text-muted)] mt-3">Loading schedule...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-16 text-center bg-white border border-[var(--color-border)] rounded-2xl">
          <Bus size={32} className="text-[var(--color-text-muted)] mx-auto mb-3 opacity-30" />
          <p className="font-bold text-[var(--color-primary-dark)]">No shuttles found</p>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">
            {shuttles.length === 0 ? 'Admin has not added any shuttles yet.' : 'Try a different search term.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map(s => {
            const { pct, color }      = getCapacityBar(s);
            const { label, cls }      = getStatusLabel(s);
            const available           = s.capacity - (s.seats_taken ?? 0);

            return (
              <div key={s.id}
                className="bg-white border border-[var(--color-border)] rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-[var(--color-primary-dark)] text-white flex flex-col items-center justify-center shrink-0">
                      <span className="text-[8px] font-bold opacity-60 uppercase">Bus</span>
                      <span className="text-sm font-black leading-tight">{s.name.replace('Shuttle ', '#')}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-black text-base text-[var(--color-primary-dark)]">{s.name}</h4>
                        <span className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${cls}`}>
                          {getStatusIcon(s)} {label}
                        </span>
                      </div>
                      <p className="text-xs text-[var(--color-text-muted)] font-medium mt-1">{s.route || 'Campus Route'}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="flex items-center gap-1.5 text-xs font-bold text-[var(--color-text-muted)]">
                          <Clock size={12} /> {s.departure_time}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs font-bold text-[var(--color-text-muted)]">
                          <Users size={12} /> {s.seats_taken ?? 0}/{s.capacity} taken
                        </span>
                        <span className={`text-xs font-black ${available > 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
                          {available} left
                        </span>
                      </div>
                      {/* Capacity bar */}
                      <div className="mt-2 w-48 h-1.5 bg-[var(--color-bg-soft,#f1f5f9)] rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:ml-auto">
                    <div className="text-right">
                      <p className="text-[10px] font-black uppercase tracking-widest text-[var(--color-text-muted)]">Capacity</p>
                      <p className="text-lg font-black text-[var(--color-primary-dark)]">{s.capacity} seats</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
