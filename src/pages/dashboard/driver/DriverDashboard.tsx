import { useState, useEffect } from 'react';
import { 
  Users, ShieldCheck, PlayCircle, Clock,
   Radio, CheckCircle2, CalendarDays,
  QrCode
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

interface Booking {
  id: string;
  seat_number: string;
  phone: string;
  status: string;
  created_at: string;
  reference: string;
}

export default function DriverDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchTodayBookings(); }, []);

  const fetchTodayBookings = async () => {
    const today = new Date().toISOString().split('T')[0];
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/bookings?created_at=gte.${today}&order=created_at.desc&select=*`,
      { headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` } }
    );
    const data = await res.json();
    if (Array.isArray(data)) setBookings(data);
    setLoading(false);
  };

  const confirmedCount = bookings.filter(b => b.status === 'confirmed').length;
  const scannedCount = bookings.filter(b => b.status === 'scanned').length;
  const totalToday = bookings.length;

  const driverName = user?.full_name ?? 'Driver';

  return (
    <div className="animate-in fade-in duration-700 space-y-8 pb-12 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden pt-6">
      
      {/* ─── HEADER ─── */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-[var(--color-border)]">
        <div className="space-y-1">
          <p className="text-[10px] font-black text-[var(--color-primary)] uppercase tracking-[0.2em]">Driver Portal</p>
          <h2 className="text-3xl md:text-4xl font-black text-[var(--color-primary-dark)] tracking-tight">
            Welcome, {driverName}
          </h2>
          <p className="text-sm text-[var(--color-text-muted)] font-medium">Here's your shift summary for today</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => navigate('/dashboard/driver/scan')}
            className="flex items-center gap-2 px-5 py-3 bg-[var(--color-primary-dark)] text-white rounded-2xl font-black text-sm shadow-lg hover:opacity-90 transition-opacity"
          >
            <QrCode size={18} /> Scan Ticket
          </button>
        </div>
      </header>

      {/* ─── STATS ─── */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Today's Bookings", value: loading ? '...' : totalToday.toString(), desc: 'Passengers booked today', icon: <Users size={22} />, trend: 'Today' },
          { title: 'Awaiting Boarding', value: loading ? '...' : confirmedCount.toString(), desc: 'Confirmed, not yet scanned', icon: <Clock size={22} />, trend: 'Pending' },
          { title: 'Boarded', value: loading ? '...' : scannedCount.toString(), desc: 'QR tickets verified today', icon: <ShieldCheck size={22} />, trend: 'Scanned' },
          { title: 'Boarding Rate', value: loading || totalToday === 0 ? '0%' : `${Math.round((scannedCount / totalToday) * 100)}%`, desc: 'Scanned vs total bookings', icon: <CheckCircle2 size={22} />, trend: 'Rate' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white border border-[var(--color-border)] p-6 rounded-[2rem] shadow-sm flex flex-col justify-between hover:border-[var(--color-primary)]/40 transition-colors group">
            <div className="flex justify-between items-start gap-2 mb-4">
              <div className="p-3 bg-[var(--color-bg-soft,#f1f5f9)] text-[var(--color-primary-dark)] rounded-xl group-hover:bg-[var(--color-primary)]/10 transition-colors">
                {stat.icon}
              </div>
              <span className="text-[9px] font-black text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-2 py-0.5 rounded-md uppercase tracking-wide">
                {stat.trend}
              </span>
            </div>
            <div>
              <p className="text-[10px] font-black text-[var(--color-text-muted)] uppercase tracking-wider mb-1">{stat.title}</p>
              <h3 className="text-2xl font-black text-[var(--color-primary-dark)] tracking-tight mb-1">{stat.value}</h3>
              <p className="text-xs font-medium text-[var(--color-text-muted)]">{stat.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* ─── SCAN PROMPT + PASSENGER LIST ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Today's Passenger List */}
        <div className="lg:col-span-8 bg-white border border-[var(--color-border)] rounded-[2.5rem] shadow-sm overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-[var(--color-border)]">
            <div className="flex items-center gap-3">
              <CalendarDays size={18} className="text-[var(--color-primary)]" />
              <h4 className="text-lg font-black text-[var(--color-primary-dark)]">Today's Passengers</h4>
            </div>
            <button onClick={fetchTodayBookings}
              className="text-xs font-black text-[var(--color-primary)] uppercase tracking-widest hover:underline">
              Refresh
            </button>
          </div>

          {loading ? (
            <div className="p-10 text-center">
              <div className="w-8 h-8 border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          ) : bookings.length === 0 ? (
            <div className="p-10 text-center">
              <Users size={32} className="text-[var(--color-text-muted)] mx-auto mb-3 opacity-30" />
              <p className="text-sm font-bold text-[var(--color-text-muted)]">No bookings today yet</p>
            </div>
          ) : (
            <div className="divide-y divide-[var(--color-border)]">
              {bookings.map(b => (
                <div key={b.id} className="flex items-center justify-between px-6 py-4 hover:bg-[var(--color-bg-soft,#f8fafc)] transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] font-black text-sm">
                      {b.seat_number}
                    </div>
                    <div>
                      <p className="font-black text-sm text-[var(--color-primary-dark)]">Seat {b.seat_number}</p>
                      <p className="text-xs text-[var(--color-text-muted)]">+237 {b.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      b.status === 'scanned' 
                        ? 'bg-emerald-50 text-emerald-600' 
                        : 'bg-blue-50 text-blue-600'
                    }`}>
                      {b.status === 'scanned' ? '✓ Boarded' : 'Awaiting'}
                    </span>
                    <span className="text-[10px] text-[var(--color-text-muted)] font-mono">
                      {new Date(b.created_at).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: true })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Actions Panel */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          <div className="bg-[var(--color-primary-dark)] p-6 rounded-[2.5rem] text-white shadow-lg flex flex-col justify-between min-h-[200px] relative overflow-hidden">
            <div className="relative z-10">
              <QrCode size={28} className="mb-3 text-white/80" />
              <h4 className="font-black text-lg tracking-tight mb-1">Ready to Board?</h4>
              <p className="text-white/60 text-xs font-medium">Scan passenger QR tickets to verify and board</p>
            </div>
            <button
              onClick={() => navigate('/dashboard/driver/scan')}
              className="mt-6 w-full py-3.5 px-4 bg-white text-[var(--color-primary-dark)] rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-opacity-90 transition-all relative z-10"
            >
              <PlayCircle size={18} /> Start Scanning
            </button>
            <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-[var(--color-primary)]/20 rounded-full blur-2xl pointer-events-none" />
          </div>

          <div className="bg-white border border-[var(--color-border)] p-6 rounded-[2.5rem] shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <Radio size={16} className="text-[var(--color-primary)]" />
              <h4 className="font-black text-base text-[var(--color-primary-dark)]">Shift Status</h4>
            </div>
            <div className="space-y-3.5">
              {[
                { label: 'Confirmed Tickets', value: confirmedCount.toString(), active: true },
                { label: 'Boarded', value: scannedCount.toString(), active: true },
                { label: 'Total Today', value: totalToday.toString(), active: false },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-[var(--color-bg-soft,#f1f5f9)] last:border-0">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-2 h-2 rounded-full ${item.active ? 'bg-[var(--color-primary)]' : 'bg-slate-300'}`} />
                    <span className="text-xs font-bold text-[var(--color-primary-dark)]">{item.label}</span>
                  </div>
                  <span className="text-sm font-black text-[var(--color-primary-dark)]">{loading ? '...' : item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
