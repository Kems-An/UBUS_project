import { useState, useEffect } from 'react';
import { Bus, Users, Wifi, Zap, ArrowRight, Clock, AlertCircle, RefreshCw, MapPin } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
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

export default function ShuttleSelectionPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // ── Get departure/destination from Route Selection ──
  const departure   = (location.state as any)?.departure   ?? '';
  const destination = (location.state as any)?.destination ?? '';

  const [shuttles, setShuttles] = useState<Shuttle[]>([]);
  const [loading, setLoading]   = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => { fetchShuttles(); }, []);

  const fetchShuttles = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    const [sRes, bRes] = await Promise.all([
      // Only fetch shuttles that are NOT full/unavailable/maintenance
      fetch(`${SUPABASE_URL}/rest/v1/shuttles?status=neq.maintenance&order=departure_time.asc&select=*`, {
        headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` },
      }),
      fetch(`${SUPABASE_URL}/rest/v1/bookings?status=in.(confirmed,scanned)&select=shuttle_id`, {
        headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` },
      }),
    ]);

    const shuttlesData: Shuttle[] = await sRes.json();
    const bookingsData: any[]     = await bRes.json();

    if (Array.isArray(shuttlesData)) {
      // Count seats taken per shuttle
      const takenMap: { [id: string]: number } = {};
      if (Array.isArray(bookingsData)) {
        bookingsData.forEach(b => {
          if (b.shuttle_id) takenMap[b.shuttle_id] = (takenMap[b.shuttle_id] || 0) + 1;
        });
      }

      const enriched = shuttlesData.map(s => ({
        ...s,
        seats_taken: takenMap[s.id] || 0,
      }));

      // Auto-mark full shuttles in DB (fire-and-forget)
      enriched.forEach(async s => {
        const isFull = s.seats_taken! >= s.capacity;
        if (isFull && s.status !== 'full') {
          await fetch(`${SUPABASE_URL}/rest/v1/shuttles?id=eq.${s.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              apikey: SUPABASE_ANON_KEY,
              Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
              Prefer: 'return=minimal',
            },
            body: JSON.stringify({ status: 'full' }),
          });
        }
      });

      setShuttles(enriched);
    }

    setLoading(false);
    setRefreshing(false);
  };

  const getAvailability = (s: Shuttle) => {
    const taken     = s.seats_taken ?? 0;
    const available = s.capacity - taken;
    const pct       = Math.round((taken / s.capacity) * 100);
    return { taken, available, pct };
  };

  const handleSelect = (shuttle: Shuttle) => {
    const { available } = getAvailability(shuttle);
    if (available === 0 || shuttle.status === 'full') return;
    navigate('/dashboard/student/seat-selection', {
      state: {
        shuttleId:   shuttle.id,
        shuttleName: shuttle.name,
        departure,
        destination,
      },
    });
  };

  // ── LOADING ──
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-[var(--color-text-muted)] mt-3 font-medium">Loading available shuttles...</p>
        </div>
      </div>
    );
  }

  const availableShuttles = shuttles.filter(s => {
    const { available } = getAvailability(s);
    return available > 0 && s.status !== 'full';
  });
  const fullShuttles = shuttles.filter(s => {
    const { available } = getAvailability(s);
    return available === 0 || s.status === 'full';
  });

  return (
    <div className="pt-6 pb-12 px-4 sm:px-8 lg:px-12 max-w-5xl mx-auto">

      {/* ── Header ── */}
      <div className="bg-white border border-[var(--color-border)] rounded-[2.5rem] p-8 mb-10 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-[var(--color-primary)]/10 rounded-2xl flex items-center justify-center text-[var(--color-primary)]">
              <Bus size={28} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-primary)] mb-1">Step 02</p>
              <h2 className="text-3xl font-black tracking-tight text-[var(--color-primary-dark)] leading-none">Choose Shuttle</h2>
            </div>
          </div>

          {/* Trip summary */}
          {departure && destination && (
            <div className="flex items-center gap-2 bg-[var(--color-bg-muted)] px-5 py-3 rounded-2xl border border-[var(--color-border)]">
              <MapPin size={14} className="text-[var(--color-primary)] shrink-0" />
              <span className="text-xs font-black text-[var(--color-primary-dark)]">
                {departure} → {destination}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ── Refresh button ── */}
      <div className="flex justify-end mb-4">
        <button onClick={() => fetchShuttles(true)} disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 text-xs font-black uppercase tracking-widest text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">
          <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {/* ── No shuttles at all ── */}
      {shuttles.length === 0 && (
        <div className="bg-white border border-[var(--color-border)] rounded-[2rem] p-10 text-center">
          <AlertCircle size={32} className="text-[var(--color-text-muted)] mx-auto mb-3 opacity-40" />
          <p className="font-bold text-[var(--color-primary-dark)]">No shuttles found</p>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">The admin has not created any shuttles yet. Please check back later.</p>
        </div>
      )}

      {/* ── Available shuttles ── */}
      {availableShuttles.length > 0 && (
        <div className="mb-8">
          <p className="text-[10px] font-black uppercase tracking-widest text-[var(--color-text-muted)] mb-4 px-1">
            Available Shuttles ({availableShuttles.length})
          </p>
          <div className="space-y-4">
            {availableShuttles.map(shuttle => {
              const { taken, available, pct } = getAvailability(shuttle);
              return (
                <div key={shuttle.id}
                  className="bg-white border border-[var(--color-border)] rounded-3xl p-6 hover:shadow-lg hover:border-[var(--color-primary)]/30 transition-all group cursor-pointer"
                  onClick={() => handleSelect(shuttle)}
                >
                  <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-5 w-full lg:w-auto">
                      <div className="w-16 h-16 bg-[var(--color-primary-dark)] text-white rounded-2xl flex flex-col items-center justify-center shrink-0">
                        <span className="text-[9px] font-bold opacity-60 uppercase">Bus</span>
                        <span className="text-lg font-black leading-tight">{shuttle.name.replace('Shuttle ', '#')}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-black text-[var(--color-primary-dark)]">{shuttle.name}</h4>
                        <div className="flex flex-wrap items-center gap-4 mt-1">
                          <span className="flex items-center gap-1.5 text-xs font-bold text-[var(--color-text-muted)]">
                            <Clock size={13} /> Departs: {shuttle.departure_time}
                          </span>
                          <span className="flex items-center gap-1.5 text-xs font-bold text-[var(--color-text-muted)]">
                            <Users size={13} /> {taken}/{shuttle.capacity} seats taken
                          </span>
                          <span className="text-xs font-black text-emerald-600">
                            {available} seat{available !== 1 ? 's' : ''} left
                          </span>
                        </div>
                        {/* Capacity bar */}
                        <div className="mt-2.5 w-48 h-1.5 bg-[var(--color-bg-soft,#f1f5f9)] rounded-full overflow-hidden">
                          <div className={`h-full rounded-full transition-all duration-500 ${
                            pct > 80 ? 'bg-rose-400' : pct > 50 ? 'bg-amber-400' : 'bg-emerald-400'
                          }`} style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-[var(--color-bg-muted)] rounded-xl text-[var(--color-primary)]"><Wifi size={18} /></div>
                      <div className="p-2.5 bg-[var(--color-bg-muted)] rounded-xl text-[var(--color-primary)]"><Zap size={18} /></div>
                    </div>

                    <button
                      className="w-full lg:w-auto px-8 py-4 bg-[var(--color-primary)] text-white rounded-2xl font-black text-sm flex items-center justify-center gap-3 group-hover:scale-105 transition-transform"
                    >
                      Select Shuttle <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Full shuttles ── */}
      {fullShuttles.length > 0 && (
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-[var(--color-text-muted)] mb-4 px-1">
            Full Shuttles ({fullShuttles.length})
          </p>
          <div className="space-y-3">
            {fullShuttles.map(shuttle => (
              <div key={shuttle.id}
                className="bg-white border border-[var(--color-border)] rounded-3xl p-5 opacity-60">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-slate-300 text-white rounded-2xl flex flex-col items-center justify-center shrink-0">
                      <span className="text-[9px] font-bold opacity-60 uppercase">Bus</span>
                      <span className="text-base font-black leading-tight">{shuttle.name.replace('Shuttle ', '#')}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-black text-[var(--color-text-muted)]">{shuttle.name}</h4>
                        <span className="text-[9px] font-black px-2 py-0.5 rounded-md bg-rose-100 text-rose-600 uppercase tracking-wider">Full</span>
                      </div>
                      <span className="flex items-center gap-1.5 text-xs font-bold text-[var(--color-text-muted)] mt-1">
                        <Clock size={12} /> Departs: {shuttle.departure_time} · {shuttle.capacity}/{shuttle.capacity} seats taken
                      </span>
                    </div>
                  </div>
                  <span className="px-5 py-3 rounded-2xl bg-slate-100 text-slate-400 font-black text-sm cursor-not-allowed">
                    Fully Booked
                  </span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-[var(--color-text-muted)] mt-3 px-1 font-medium">
            These shuttles are at full capacity. Please choose from the available shuttles above.
          </p>
        </div>
      )}

      {/* All full, none available */}
      {shuttles.length > 0 && availableShuttles.length === 0 && (
        <div className="mt-6 p-6 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3">
          <AlertCircle size={20} className="text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-black text-amber-800">All shuttles are currently full</p>
            <p className="text-sm text-amber-700 mt-1">Please check back later or contact the admin to add more shuttles.</p>
          </div>
        </div>
      )}
    </div>
  );
}
