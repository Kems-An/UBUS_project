import { useState, useEffect } from 'react';
import { 
  Users, Wallet, CalendarCheck,
 Bell,  ShieldAlert, 
   QrCode
} from 'lucide-react';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

interface Booking {
  id: string;
  seat_number: string;
  phone: string;
  provider: string;
  amount: number;
  status: string; 
  reference: string;
  created_at: string;
  user_id: string;
}

interface User {
  id: string;
  auth_id: string;
  full_name: string;
  email: string;
  role: string;
}

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    const [bRes, uRes] = await Promise.all([
      fetch(`${SUPABASE_URL}/rest/v1/bookings?order=created_at.desc&limit=50&select=*`, {
        headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` }
      }),
      fetch(`${SUPABASE_URL}/rest/v1/users?select=*`, {
        headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` }
      }),
    ]);
    const b = await bRes.json();
    const u = await uRes.json();
    if (Array.isArray(b)) setBookings(b);
    if (Array.isArray(u)) setUsers(u);
    setLoading(false);
  };

  const students = users.filter(u => u.role === 'student');
  const drivers = users.filter(u => u.role === 'driver');
  const todayBookings = bookings.filter(b => {
    const today = new Date().toDateString();
    return new Date(b.created_at).toDateString() === today;
  });
  const todayRevenue = todayBookings.reduce((sum, b) => sum + (b.amount || 0), 0);
  const confirmedCount = bookings.filter(b => b.status === 'confirmed').length;
  const scannedCount = bookings.filter(b => b.status === 'scanned').length;
  const totalRevenue = bookings.reduce((sum, b) => sum + (b.amount || 0), 0);

  // Build hourly chart data from today's bookings
  const hourlyData = Array(8).fill(0).map((_, i) => {
    const hour = 8 + i * 2;
    const count = todayBookings.filter(b => {
      const h = new Date(b.created_at).getHours();
      return h >= hour && h < hour + 2;
    }).length;
    return { hour, count };
  });
  const maxCount = Math.max(...hourlyData.map(d => d.count), 1);

  const getUserName = (userId: string) => {
    const u = users.find(u => u.auth_id === userId);
    return u?.full_name ?? 'Unknown Student';
  };

  const getStatusStyle = (status: string) => {
    if (status === 'confirmed') return 'bg-blue-50 text-blue-600';
    if (status === 'scanned') return 'bg-emerald-50 text-emerald-600';
    if (status === 'cancelled') return 'bg-rose-50 text-rose-600';
    return 'bg-slate-50 text-slate-500';
  };

  return (
    <div className="p-4 lg:p-10 max-w-[1600px] mx-auto w-full animate-in fade-in duration-300">
      
      {/* ─── HEADER ─── */}
      <header className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div>
          <p className="text-[10px] font-black text-[var(--color-primary)] uppercase tracking-[0.2em]">Admin Panel</p>
          <h2 className="text-3xl font-black text-[var(--color-primary-dark)] tracking-tight mt-1">System Overview</h2>
        </div>
        <div className="flex items-center gap-4 self-end md:self-auto">
          <button
            onClick={fetchData}
            className="px-5 py-2.5 bg-[var(--color-primary-dark)] text-white rounded-xl text-xs font-black tracking-widest uppercase shadow-sm hover:opacity-90 transition-opacity"
          >
            Refresh Data
          </button>
          <div className="relative p-3.5 bg-white rounded-xl text-[var(--color-text-muted)] shadow-sm border border-[var(--color-border)]">
            <Bell size={18} />
            {confirmedCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white animate-pulse" />
            )}
          </div>
        </div>
      </header>

      {/* ─── KPI CARDS ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { label: 'Total Students', value: loading ? '...' : students.length.toString(), trend: `${drivers.length} drivers`, icon: <Users size={22} />, variant: 'primary' },
          { label: "Today's Bookings", value: loading ? '...' : todayBookings.length.toString(), trend: 'Today', icon: <CalendarCheck size={22} />, variant: 'secondary', isLive: true },
          { label: 'Tickets Scanned', value: loading ? '...' : scannedCount.toString(), trend: `${confirmedCount} pending`, icon: <QrCode size={22} />, variant: 'primary' },
          { label: 'Total Revenue', value: loading ? '...' : `${totalRevenue} XAF`, trend: `${todayRevenue} today`, icon: <Wallet size={22} />, variant: 'dark' },
        ].map((card, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-[var(--color-border)] hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-6">
              <div className={`p-3 rounded-xl border ${
                card.variant === 'dark' 
                  ? 'bg-[var(--color-primary-dark)] text-white border-transparent'
                  : 'bg-[var(--color-bg-soft,#f1f5f9)] text-[var(--color-primary)] border-[var(--color-border)]'
              }`}>
                {card.icon}
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[var(--color-bg-soft,#f1f5f9)] rounded-md border border-[var(--color-border)]">
                {card.isLive && <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] animate-pulse" />}
                <span className="text-[9px] font-black text-[var(--color-text-muted)] uppercase tracking-wider">{card.trend}</span>
              </div>
            </div>
            <p className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest mb-1">{card.label}</p>
            <h3 className="text-2xl font-black tracking-tight text-[var(--color-primary-dark)]">{card.value}</h3>
          </div>
        ))}
      </div>

      {/* ─── CHART + ALERT ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">
        
        {/* Booking Activity Chart */}
        <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-[var(--color-border)]">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-xl font-black tracking-tight text-[var(--color-primary-dark)]">Today's Booking Activity</h3>
              <p className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest mt-1">Bookings per 2-hour window</p>
            </div>
            <span className="text-xs font-black text-[var(--color-text-muted)]">{todayBookings.length} total today</span>
          </div>
          <div className="h-48 flex items-end justify-between gap-3 sm:gap-6 px-2">
            {hourlyData.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer h-full">
                <span className="text-[9px] font-black text-[var(--color-primary)] opacity-0 group-hover:opacity-100 transition-opacity">
                  {d.count}
                </span>
                <div className="w-full bg-[var(--color-bg-soft,#f1f5f9)] rounded-t-xl relative overflow-hidden flex flex-col justify-end h-full">
                  <div
                    className="bg-[var(--color-primary)] group-hover:opacity-90 transition-all duration-300 rounded-t-lg"
                    style={{ height: `${(d.count / maxCount) * 100}%`, minHeight: d.count > 0 ? '8px' : '0' }}
                  />
                </div>
                <span className="text-[10px] font-bold text-[var(--color-text-muted)]">{d.hour}:00</span>
              </div>
            ))}
          </div>
        </div>

        {/* Status Summary */}
        <div className="lg:col-span-4">
          <div className="bg-[var(--color-primary-dark)] p-6 sm:p-8 rounded-2xl text-white shadow-md flex flex-col h-full justify-between">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <ShieldAlert size={16} className="text-rose-400" />
                <h3 className="text-[10px] font-black uppercase tracking-widest text-white/50">Booking Status</h3>
              </div>
              <div className="space-y-4">
                {[
                  { label: 'Confirmed', value: confirmedCount, color: 'bg-blue-400' },
                  { label: 'Scanned/Used', value: scannedCount, color: 'bg-emerald-400' },
                  { label: 'Total', value: bookings.length, color: 'bg-white' },
                ].map((s, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${s.color}`} />
                      <span className="text-xs font-bold text-white/70">{s.label}</span>
                    </div>
                    <span className="text-lg font-black">{loading ? '...' : s.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Total Revenue</p>
              <p className="text-2xl font-black mt-1">{loading ? '...' : `${totalRevenue} XAF`}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── RECENT BOOKINGS TABLE ─── */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-[var(--color-border)]">
        <div className="p-6 sm:p-8 flex justify-between items-center border-b border-[var(--color-border)]">
          <div>
            <h3 className="text-xl font-black tracking-tight text-[var(--color-primary-dark)]">Recent Bookings</h3>
            <p className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest mt-0.5">Live entry stream</p>
          </div>
        </div>

        {loading ? (
          <div className="p-10 text-center">
            <div className="w-8 h-8 border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm text-[var(--color-text-muted)] mt-3">Loading data...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[10px] font-black text-[var(--color-text-muted)] uppercase tracking-widest bg-[var(--color-bg-soft,#f8fafc)] border-b border-[var(--color-border)]">
                  {['Student', 'Seat', 'Provider', 'Amount', 'Date', 'Status'].map(h => (
                    <th key={h} className="px-6 py-4 font-black">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                {bookings.slice(0, 10).map(b => (
                  <tr key={b.id} className="hover:bg-[var(--color-bg-soft,#f8fafc)]/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] text-xs font-black">
                          {getUserName(b.user_id)?.charAt(0) ?? '?'}
                        </div>
                        <span className="text-sm font-bold text-[var(--color-primary-dark)] max-w-[120px] truncate">
                          {getUserName(b.user_id)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-black text-sm text-[var(--color-primary-dark)]">{b.seat_number}</td>
                    <td className="px-6 py-4 text-xs font-bold uppercase text-[var(--color-text-muted)]">{b.provider}</td>
                    <td className="px-6 py-4 font-black text-sm text-[var(--color-primary-dark)]">{b.amount} XAF</td>
                    <td className="px-6 py-4 text-xs text-[var(--color-text-muted)]">
                      {new Date(b.created_at).toLocaleString('en-GB', {
                        day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', hour12: true
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${getStatusStyle(b.status)}`}>
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {bookings.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-sm text-[var(--color-text-muted)]">
                      No bookings yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
