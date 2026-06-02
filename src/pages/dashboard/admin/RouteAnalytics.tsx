import React, { useState, useEffect } from 'react';
import { 
  MapPin, TrendingUp, Calendar, Route, Clock, 
  Bus, Search, Users, Filter, Layers, RefreshCw
} from 'lucide-react';

const SUPABASE_URL    = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

interface Booking {
  id: string;
  seat_number: string;
  status: string;
  created_at: string;
  departure: string;
  destination: string;
  amount: number;
  provider: string;
  shuttle_id: string;
}

interface Shuttle {
  id: string;
  name: string;
  route: string;
  capacity: number;
  departure_time: string;
  status: string;
}

interface DaySummary {
  day: string;
  totalBookings: number;
  revenue: number;
  peakHour: string;
}

interface RouteRow {
  departure: string;
  destination: string;
  count: number;
  revenue: number;
}

const RoutesAnalytics: React.FC = () => {
  const [bookings,  setBookings]  = useState<Booking[]>([]);
  const [shuttles,  setShuttles]  = useState<Shuttle[]>([]);
  const [loading,   setLoading]   = useState(true);
  const [refreshing,setRefreshing]= useState(false);
  const [searchTerm,setSearchTerm]= useState('');
  const [statusFilter,setStatusFilter] = useState<'All' | 'active' | 'full' | 'maintenance'>('All');

  useEffect(() => { fetchData(); }, []);

  const fetchData = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    const [bRes, sRes] = await Promise.all([
      fetch(`${SUPABASE_URL}/rest/v1/bookings?order=created_at.desc&select=*`, {
        headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` },
      }),
      fetch(`${SUPABASE_URL}/rest/v1/shuttles?order=departure_time.asc&select=*`, {
        headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` },
      }),
    ]);

    const bData = await bRes.json();
    const sData = await sRes.json();
    if (Array.isArray(bData)) setBookings(bData);
    if (Array.isArray(sData)) setShuttles(sData);
    setLoading(false);
    setRefreshing(false);
  };

  // ── Weekly summary from real booking dates ──
  const DAY_NAMES = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const daySummary: DaySummary[] = DAY_NAMES.slice(1, 7).map(day => {
    const dayIdx = DAY_NAMES.indexOf(day);
    const dayBookings = bookings.filter(b => new Date(b.created_at).getDay() === dayIdx);
    const revenue     = dayBookings.reduce((s, b) => s + (b.amount || 0), 0);

    // Find peak hour
    const hourCounts: { [h: number]: number } = {};
    dayBookings.forEach(b => {
      const h = new Date(b.created_at).getHours();
      hourCounts[h] = (hourCounts[h] || 0) + 1;
    });
    const peakH = Object.entries(hourCounts).sort((a, b) => b[1] - a[1])[0];
    const peakHour = peakH ? `${peakH[0]}:00` : 'N/A';

    return { day, totalBookings: dayBookings.length, revenue, peakHour };
  });

  // ── Route frequency from real departure/destination data ──
  const routeMap: { [key: string]: RouteRow } = {};
  bookings.forEach(b => {
    if (!b.departure || !b.destination) return;
    const key = `${b.departure}|||${b.destination}`;
    if (!routeMap[key]) routeMap[key] = { departure: b.departure, destination: b.destination, count: 0, revenue: 0 };
    routeMap[key].count++;
    routeMap[key].revenue += b.amount || 0;
  });
  const topRoutes = Object.values(routeMap)
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  // ── Shuttle table with real booking counts ──
  const shuttleStats = shuttles.map(s => {
    const sBookings = bookings.filter(b => b.shuttle_id === s.id);
    const taken     = sBookings.filter(b => b.status === 'confirmed' || b.status === 'scanned').length;
    return { ...s, bookingsCount: sBookings.length, seatsTaken: taken, available: s.capacity - taken };
  });

  const filteredShuttles = shuttleStats.filter(s => {
    const matchSearch = s.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.route?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchFilter = statusFilter === 'All' || s.status === statusFilter;
    return matchSearch && matchFilter;
  });

  const totalRevenue   = bookings.reduce((s, b) => s + (b.amount || 0), 0);
  const totalBookings  = bookings.length;
  const weekBookings   = bookings.filter(b => {
    const d = new Date(b.created_at);
    const now = new Date();
    return (now.getTime() - d.getTime()) < 7 * 24 * 60 * 60 * 1000;
  }).length;

  const maxBookings = Math.max(...daySummary.map(d => d.totalBookings), 1);

  return (
    <div className="p-4 lg:p-10 max-w-[1600px] mx-auto w-full animate-in fade-in duration-300 space-y-10">

      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-[var(--color-primary-dark)] tracking-tight">
            Transit <span className="text-[var(--color-primary)]">Route Analytics</span>
          </h2>
          <p className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-widest mt-1">
            Live data from Supabase — real bookings and routes
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-[var(--color-border)] shadow-sm">
            <Calendar size={14} className="text-[var(--color-primary)]" />
            <span className="text-xs font-black text-[var(--color-primary-dark)] uppercase tracking-wide">All Time</span>
          </div>
          <button onClick={() => fetchData(true)} disabled={refreshing}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[var(--color-border)] rounded-xl text-xs font-black uppercase tracking-widest text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors shadow-sm">
            <RefreshCw size={13} className={refreshing ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Bookings', value: loading ? '...' : totalBookings.toString(), trend: 'All time', icon: <Route size={22} /> },
          { label: 'Weekly Bookings', value: loading ? '...' : weekBookings.toString(), trend: 'Last 7 days', icon: <Users size={22} /> },
          { label: 'Active Shuttles', value: loading ? '...' : shuttles.filter(s => s.status === 'available').length.toString(), trend: 'Available now', icon: <Layers size={22} /> },
          { label: 'Total Revenue', value: loading ? '...' : `${totalRevenue.toLocaleString()} XAF`, trend: 'All time', icon: <TrendingUp size={22} /> },
        ].map((s, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-[var(--color-border)] hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 rounded-xl bg-[var(--color-bg-soft,#f1f5f9)] text-[var(--color-primary)] border border-[var(--color-border)]">
                {s.icon}
              </div>
              <span className="text-[9px] font-black text-[var(--color-text-muted)] uppercase tracking-wider px-2 py-1 bg-[var(--color-bg-soft,#f1f5f9)] rounded-md border border-[var(--color-border)]">
                {s.trend}
              </span>
            </div>
            <p className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest mb-1">{s.label}</p>
            <h3 className="text-2xl font-black tracking-tight text-[var(--color-primary-dark)]">{s.value}</h3>
          </div>
        ))}
      </div>

      {/* Weekly Booking Chart */}
      <div className="bg-white rounded-2xl shadow-sm border border-[var(--color-border)] overflow-hidden">
        <div className="p-6 sm:p-8 border-b border-[var(--color-border)]">
          <h3 className="text-lg font-black tracking-tight text-[var(--color-primary-dark)]">Weekly Booking Distribution</h3>
          <p className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest mt-0.5">
            Real booking counts per day of the week
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black text-[var(--color-text-muted)] uppercase tracking-widest bg-[var(--color-bg-soft,#f8fafc)] border-b border-[var(--color-border)]">
                {['Day', 'Bookings', 'Volume', 'Revenue (XAF)', 'Peak Hour'].map(h => (
                  <th key={h} className="px-6 py-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {daySummary.map((d, i) => (
                <tr key={i} className="hover:bg-[var(--color-bg-soft,#f8fafc)]/40 transition-colors">
                  <td className="px-6 py-4 font-bold text-sm text-[var(--color-primary-dark)]">{d.day}</td>
                  <td className="px-6 py-4 text-xs font-black text-[var(--color-text-muted)]">
                    {loading ? '...' : <span className="text-[var(--color-primary-dark)]">{d.totalBookings}</span>}
                  </td>
                  <td className="px-6 py-4 w-48">
                    <div className="w-full h-2 bg-[var(--color-bg-soft,#f1f5f9)] rounded-full overflow-hidden">
                      <div className="h-full bg-[var(--color-primary)] rounded-full"
                        style={{ width: `${(d.totalBookings / maxBookings) * 100}%` }} />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-black text-emerald-600">
                    {loading ? '...' : `+${d.revenue.toLocaleString()}`}
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1 bg-slate-50 border border-slate-100 rounded-md px-2 py-1 text-[11px] font-bold text-slate-600 w-fit">
                      <Clock size={11} /> {d.peakHour}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Student Routes */}
      {topRoutes.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-[var(--color-border)] overflow-hidden">
          <div className="p-6 border-b border-[var(--color-border)]">
            <h3 className="text-lg font-black text-[var(--color-primary-dark)]">Most Popular Student Routes</h3>
            <p className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest mt-0.5">
              Based on actual student departure and destination entries
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-black text-[var(--color-text-muted)] uppercase tracking-widest bg-[var(--color-bg-soft,#f8fafc)] border-b border-[var(--color-border)]">
                  {['Departure', 'Destination', 'Bookings', 'Revenue (XAF)'].map(h => (
                    <th key={h} className="px-6 py-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                {topRoutes.map((r, i) => (
                  <tr key={i} className="hover:bg-[var(--color-bg-soft,#f8fafc)]/40 transition-colors">
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-1.5 text-sm font-bold text-[var(--color-primary-dark)]">
                        <MapPin size={13} className="text-[var(--color-primary)] shrink-0" /> {r.departure}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-1.5 text-sm font-bold text-[var(--color-primary-dark)]">
                        <MapPin size={13} className="text-rose-400 shrink-0" /> {r.destination}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-black text-[var(--color-primary-dark)]">{r.count}</td>
                    <td className="px-6 py-4 font-black text-emerald-600">+{r.revenue.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Shuttle Performance */}
      <div className="bg-white rounded-2xl shadow-sm border border-[var(--color-border)] overflow-hidden">
        <div className="p-6 border-b border-[var(--color-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-black text-[var(--color-primary-dark)]">Shuttle Performance</h3>
            <p className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest mt-0.5">
              Live seat occupancy per shuttle
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
              <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search shuttles..."
                className="pl-9 pr-4 py-2.5 border border-[var(--color-border)] rounded-xl text-xs outline-none focus:border-[var(--color-primary)] w-44 transition-colors"
              />
            </div>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value as any)}
              className="border border-[var(--color-border)] rounded-xl px-3 py-2.5 text-xs font-black uppercase outline-none bg-white cursor-pointer">
              <option value="All">All</option>
              <option value="available">Available</option>
              <option value="full">Full</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black text-[var(--color-text-muted)] uppercase tracking-widest bg-[var(--color-bg-soft,#f8fafc)] border-b border-[var(--color-border)]">
                {['Shuttle', 'Route', 'Departure', 'Seats Taken', 'Occupancy', 'Status'].map(h => (
                  <th key={h} className="px-6 py-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {loading ? (
                <tr><td colSpan={6} className="px-6 py-10 text-center text-sm text-[var(--color-text-muted)]">Loading...</td></tr>
              ) : filteredShuttles.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-10 text-center text-sm text-[var(--color-text-muted)]">No shuttles found</td></tr>
              ) : filteredShuttles.map(s => {
                const pct = Math.round((s.seatsTaken / s.capacity) * 100);
                const barColor = pct > 80 ? 'bg-rose-400' : pct > 50 ? 'bg-amber-400' : 'bg-emerald-400';
                const statusCls = s.status === 'available' ? 'bg-emerald-50 text-emerald-700' : s.status === 'full' ? 'bg-rose-50 text-rose-700' : 'bg-amber-50 text-amber-700';
                return (
                  <tr key={s.id} className="hover:bg-[var(--color-bg-soft,#f8fafc)]/40 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-[var(--color-primary-dark)] text-white flex items-center justify-center">
                          <Bus size={14} />
                        </div>
                        <span className="font-bold text-sm text-[var(--color-primary-dark)]">{s.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs text-[var(--color-text-muted)] max-w-[160px] truncate">{s.route || 'Campus Route'}</td>
                    <td className="px-6 py-4 text-xs font-bold text-[var(--color-primary-dark)]">{s.departure_time}</td>
                    <td className="px-6 py-4 text-xs font-black text-[var(--color-primary-dark)]">{s.seatsTaken}/{s.capacity}</td>
                    <td className="px-6 py-4 w-40">
                      <div className="w-full h-1.5 bg-[var(--color-bg-soft,#f1f5f9)] rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${barColor}`} style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-[10px] font-black text-[var(--color-text-muted)] mt-1 block">{pct}%</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${statusCls}`}>
                        {s.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RoutesAnalytics;
