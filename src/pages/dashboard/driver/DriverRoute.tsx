import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { 
  Navigation, Clock, 
  Bus, MapPin, Users, RefreshCw, QrCode
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

interface Booking {
  id: string;
  seat_number: string;
  phone: string;
  status: string;
  created_at: string;
  departure: string;
  destination: string;
  shuttle_id: string;
}

export default function DriverSchedule() {
  const { user }   = useAuth();
  const navigate   = useNavigate();
  const [shuttles,   setShuttles]   = useState<Shuttle[]>([]);
  const [bookings,   setBookings]   = useState<Booking[]>([]);
  const [selected,   setSelected]   = useState<string | null>(null);
  const [loading,    setLoading]    = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true); else setLoading(true);

    const today = new Date().toISOString().split('T')[0];
    const [sRes, bRes] = await Promise.all([
      fetch(`${SUPABASE_URL}/rest/v1/shuttles?order=departure_time.asc&select=*`, {
        headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` },
      }),
      fetch(`${SUPABASE_URL}/rest/v1/bookings?created_at=gte.${today}&order=created_at.desc&select=*`, {
        headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` },
      }),
    ]);

    const sData: Shuttle[] = await sRes.json();
    const bData: Booking[] = await bRes.json();

    if (Array.isArray(sData)) {
      // Count seats taken per shuttle
      const takenMap: { [id: string]: number } = {};
      if (Array.isArray(bData)) {
        bData.forEach(b => {
          if (b.shuttle_id && (b.status === 'confirmed' || b.status === 'scanned')) {
            takenMap[b.shuttle_id] = (takenMap[b.shuttle_id] || 0) + 1;
          }
        });
      }
      setShuttles(sData.map(s => ({ ...s, seats_taken: takenMap[s.id] || 0 })));
      if (sData.length > 0 && !selected) setSelected(sData[0].id);
    }

    if (Array.isArray(bData)) setBookings(bData);
    setLoading(false);
    setRefreshing(false);
  };

  const activeShuttle = shuttles.find(s => s.id === selected);
  const shuttleBookings = bookings.filter(b => b.shuttle_id === selected);
  const confirmedCount  = shuttleBookings.filter(b => b.status === 'confirmed').length;
  const scannedCount    = shuttleBookings.filter(b => b.status === 'scanned').length;
  const available       = activeShuttle ? activeShuttle.capacity - (activeShuttle.seats_taken ?? 0) : 0;

  const getStatusStyle = (status: string) => {
    if (status === 'scanned')   return 'bg-emerald-50 text-emerald-600';
    if (status === 'confirmed') return 'bg-blue-50 text-blue-600';
    return 'bg-slate-50 text-slate-500';
  };

  return (
    <div className="animate-in fade-in duration-500 space-y-8 pb-12 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">

      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-[var(--color-primary-dark)] tracking-tight">
            Daily Schedule
          </h2>
          <p className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-widest mt-1.5">
            Live shuttle assignments and passenger lists
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-white border border-[var(--color-border)] rounded-xl flex items-center gap-2.5 shadow-sm">
            <div className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-pulse" />
            <span className="text-[10px] font-black text-[var(--color-primary-dark)] uppercase tracking-wider">On-Duty</span>
          </div>
          <button onClick={() => fetchData(true)} disabled={refreshing}
            className="p-2.5 bg-white border border-[var(--color-border)] rounded-xl text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">
            <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Active Shuttle Card */}
        <div className="lg:col-span-8 bg-[var(--color-primary)] text-white rounded-2xl p-8 relative overflow-hidden flex flex-col justify-between min-h-[240px] shadow-sm">
          <div className="relative z-10">
            <span className="text-[9px] font-black tracking-widest bg-white/15 px-3 py-1 rounded-full uppercase border border-white/10">
              Active Shuttle
            </span>
            <h3 className="text-3xl font-black mt-4 tracking-tight">
              {activeShuttle?.name ?? (loading ? 'Loading...' : 'No shuttles available')}
            </h3>
            {activeShuttle && (
              <p className="mt-2 text-white/80 flex items-center gap-2 font-semibold text-xs">
                <Bus size={14} /> Driver: {user?.full_name ?? 'You'}
              </p>
            )}
          </div>
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6 mt-6 pt-6 border-t border-white/10">
            {activeShuttle && (
              <div className="space-y-1">
                <p className="text-[9px] font-bold text-white/60 uppercase tracking-widest">Departure Time</p>
                <p className="text-lg font-black">{activeShuttle.departure_time}</p>
              </div>
            )}
            <button onClick={() => navigate('/dashboard/driver/scan')}
              className="bg-white text-[var(--color-primary-dark)] font-black px-6 py-3.5 rounded-xl hover:bg-opacity-90 transition-all text-xs flex items-center gap-2 shrink-0">
              <QrCode size={14} /> Scan Tickets
            </button>
          </div>
          <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Shift Stats */}
        <div className="lg:col-span-4 bg-white border border-[var(--color-border)] rounded-2xl p-6 flex flex-col justify-between shadow-sm">
          <h4 className="text-[10px] font-black text-[var(--color-text-muted)] uppercase tracking-widest mb-4">
            Shift Progress
          </h4>
          <div className="space-y-4">
            {[
              { label: 'Awaiting Boarding', value: confirmedCount },
              { label: 'Boarded (Scanned)', value: scannedCount  },
              { label: 'Seats Available',   value: available      },
            ].map((item, i) => (
              <div key={i} className="flex justify-between items-center py-2 border-b border-[var(--color-bg-soft,#f1f5f9)] last:border-0">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[var(--color-primary)]" />
                  <span className="text-xs font-bold text-[var(--color-primary-dark)]">{item.label}</span>
                </div>
                <span className="text-base font-black text-[var(--color-primary-dark)]">
                  {loading ? '...' : item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Shuttle Selector */}
        <div className="lg:col-span-12 space-y-3">
          <h3 className="text-lg font-black text-[var(--color-primary-dark)]">All Shuttles Today</h3>
          {loading ? (
            <div className="p-8 text-center bg-white border border-[var(--color-border)] rounded-2xl">
              <div className="w-6 h-6 border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          ) : shuttles.length === 0 ? (
            <div className="p-8 text-center bg-white border border-[var(--color-border)] rounded-2xl">
              <Bus size={28} className="text-[var(--color-text-muted)] mx-auto mb-2 opacity-30" />
              <p className="text-sm text-[var(--color-text-muted)]">No shuttles created yet. Admin must add shuttles.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {shuttles.map(s => {
                const sBookings = bookings.filter(b => b.shuttle_id === s.id);
                const isActive  = selected === s.id;
                return (
                  <div key={s.id} onClick={() => setSelected(s.id)}
                    className={`group bg-white p-5 rounded-2xl border transition-all cursor-pointer flex flex-col md:flex-row md:items-center gap-5 ${
                      isActive ? 'border-[var(--color-primary)] ring-1 ring-[var(--color-primary)]/10 shadow-sm' : 'border-[var(--color-border)] hover:bg-[var(--color-bg-soft,#f8fafc)]'
                    }`}>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isActive ? 'bg-[var(--color-primary)] text-white' : 'bg-[var(--color-bg-soft,#f1f5f9)] text-[var(--color-primary-dark)]'}`}>
                      <Bus size={22} />
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-base font-black text-[var(--color-primary-dark)]">{s.name}</h4>
                        {isActive && (
                          <span className="text-[9px] font-black px-2 py-0.5 rounded-md bg-[var(--color-primary)]/10 text-[var(--color-primary)] uppercase tracking-wider">
                            Selected
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-semibold text-[var(--color-text-muted)]">
                        <span className="flex items-center gap-1"><Clock size={12} /> {s.departure_time}</span>
                        <span className="flex items-center gap-1"><Users size={12} /> {s.seats_taken ?? 0}/{s.capacity} booked</span>
                        <span className="flex items-center gap-1"><Navigation size={12} /> {sBookings.filter(b => b.status === 'scanned').length} scanned</span>
                      </div>
                    </div>
                    <div className="md:ml-auto">
                      <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                        s.status === 'full' ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'
                      }`}>
                        {s.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Passenger list for selected shuttle */}
        {selected && (
          <div className="lg:col-span-12 bg-white border border-[var(--color-border)] rounded-2xl overflow-hidden shadow-sm">
            <div className="p-5 border-b border-[var(--color-border)] flex items-center justify-between">
              <h4 className="font-black text-[var(--color-primary-dark)]">
                Passengers — {activeShuttle?.name} ({shuttleBookings.length} bookings)
              </h4>
            </div>
            {shuttleBookings.length === 0 ? (
              <div className="p-8 text-center">
                <Users size={28} className="text-[var(--color-text-muted)] mx-auto mb-2 opacity-30" />
                <p className="text-sm text-[var(--color-text-muted)]">No bookings for this shuttle today</p>
              </div>
            ) : (
              <div className="divide-y divide-[var(--color-border)]">
                {shuttleBookings.map(b => (
                  <div key={b.id} className="flex items-center justify-between px-5 py-4 hover:bg-[var(--color-bg-soft,#f8fafc)] transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] font-black text-sm">
                        {b.seat_number}
                      </div>
                      <div>
                        <p className="font-black text-sm text-[var(--color-primary-dark)]">Seat {b.seat_number}</p>
                        {b.departure && b.destination && (
                          <p className="text-[10px] text-[var(--color-text-muted)] flex items-center gap-1">
                            <MapPin size={10} /> {b.departure} → {b.destination}
                          </p>
                        )}
                        <p className="text-[10px] text-[var(--color-text-muted)]">+237 {b.phone}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${getStatusStyle(b.status)}`}>
                      {b.status === 'scanned' ? '✓ Boarded' : 'Awaiting'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
