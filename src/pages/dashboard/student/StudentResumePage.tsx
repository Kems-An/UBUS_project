import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Ticket, ArrowRight, CheckCircle2, History,
  Activity, XCircle, Clock, Bus, Download
} from 'lucide-react';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const SESSION_KEY = 'shuttle_session';

interface Booking {
  id: string;
  seat_number: string;
  phone: string;
  provider: string;
  amount: number;
  status: string;
  reference: string;
  created_at: string;
}

function getCurrentUser() {
  try {
    const saved = localStorage.getItem(SESSION_KEY);
    if (!saved) return null;
    return JSON.parse(saved).profile ?? null;
  } catch { return null; }
}

export default function StudentDashboardResume() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0, confirmed: 0, scanned: 0, cancelled: 0, totalSpent: 0
  });

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const user = getCurrentUser();
    if (!user) { setLoading(false); return; }

    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/bookings?user_id=eq.${user.auth_id}&order=created_at.desc&select=*`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
      }
    );

    const data: Booking[] = await res.json();
    if (Array.isArray(data)) {
      setBookings(data);
      setStats({
        total: data.length,
        confirmed: data.filter(b => b.status === 'confirmed').length,
        scanned: data.filter(b => b.status === 'scanned').length,
        cancelled: data.filter(b => b.status === 'cancelled').length,
        totalSpent: data.reduce((sum, b) => sum + (b.amount || 0), 0),
      });
    }
    setLoading(false);
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'scanned': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'cancelled': return 'bg-rose-50 text-rose-600 border-rose-100';
      default: return 'bg-slate-50 text-slate-500 border-slate-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <Clock size={12} />;
      case 'scanned': return <CheckCircle2 size={12} />;
      case 'cancelled': return <XCircle size={12} />;
      default: return <Clock size={12} />;
    }
  };

  const handleViewTicket = (booking: Booking) => {
    const user = getCurrentUser();
    navigate('/dashboard/student/ticket', {
      state: {
        bookingId: booking.id,
        seat: booking.seat_number,
        phone: booking.phone,
        provider: booking.provider,
        bookedAt: booking.created_at,
        status: booking.status,
        reference: booking.reference,
        studentName: user?.full_name ?? '',
        studentId: user?.student_id ?? '',
        routeName: 'Campus Route',
      }
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 lg:p-10 space-y-8 animate-in fade-in duration-700 overflow-x-hidden">
      
      {/* ─── HEADER ─── */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[var(--color-primary)]">
            <Activity size={16} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Live Account Status</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-black tracking-tight text-[var(--color-primary-dark)]">
            My Bookings
          </h2>
          <p className="text-xs md:text-sm text-[var(--color-text-muted)]">
            Your transit history and active tickets.
          </p>
        </div>
        <Link 
          to="/dashboard/student/route-selection"
          className="flex items-center justify-center gap-3 px-6 py-4 bg-[var(--color-primary)] text-white rounded-2xl font-bold text-sm shadow-lg shadow-[var(--color-primary)]/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <Ticket size={18} />
          Book New Trip
        </Link>
      </header>

      {/* ─── KPI GRID ─── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        {[
          { label: 'Total Trips', value: stats.total, icon: <Ticket size={18} />, color: 'var(--color-primary)' },
          { label: 'Confirmed', value: stats.confirmed, icon: <Clock size={18} />, color: '#3b82f6' },
          { label: 'Completed', value: stats.scanned, icon: <CheckCircle2 size={18} />, color: '#10b981' },
          { label: 'Total Spent', value: `${stats.totalSpent} XAF`, icon: <Bus size={18} />, color: 'var(--color-primary-dark)' },
        ].map((s, i) => (
          <div key={i} className="bg-white border border-[var(--color-border)] rounded-2xl p-5 shadow-sm">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: s.color + '15', color: s.color }}>
              {s.icon}
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-[var(--color-text-muted)]">{s.label}</p>
            <p className="text-xl font-black text-[var(--color-primary-dark)] mt-1">{loading ? '...' : s.value}</p>
          </div>
        ))}
      </div>

      {/* ─── BOOKINGS TABLE ─── */}
      <div className="bg-white border border-[var(--color-border)] rounded-[2rem] shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 p-6 border-b border-[var(--color-border)]">
          <History size={18} className="text-[var(--color-primary)]" />
          <h3 className="font-black text-[var(--color-primary-dark)]">Booking History</h3>
        </div>

        {loading ? (
          <div className="p-10 text-center">
            <div className="w-8 h-8 border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm text-[var(--color-text-muted)] mt-3">Loading your bookings...</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="p-10 text-center">
            <Ticket size={32} className="text-[var(--color-text-muted)] mx-auto mb-3 opacity-40" />
            <p className="font-bold text-[var(--color-text-muted)]">No bookings yet</p>
            <p className="text-sm text-[var(--color-text-muted)] mt-1">Your booking history will appear here</p>
            <Link to="/dashboard/student/route-selection"
              className="inline-flex items-center gap-2 mt-4 px-5 py-3 bg-[var(--color-primary-dark)] text-white rounded-xl font-bold text-sm">
              Book your first trip <ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-[var(--color-border)]">
            {bookings.map((booking) => (
              <div key={booking.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 gap-4 hover:bg-[var(--color-bg-muted,#f8fafc)] transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[var(--color-bg-soft,#f1f5f9)] flex items-center justify-center text-[var(--color-primary)] shrink-0">
                    <Bus size={18} />
                  </div>
                  <div>
                    <p className="font-black text-[var(--color-primary-dark)] text-sm">
                      Seat {booking.seat_number}
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                      {new Date(booking.created_at).toLocaleString('en-GB', {
                        day: '2-digit', month: 'short', year: 'numeric',
                        hour: '2-digit', minute: '2-digit', hour12: true
                      })}
                    </p>
                    <p className="text-[10px] text-[var(--color-text-muted)] mt-0.5 font-mono">
                      Ref: {booking.reference}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:ml-auto">
                  <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${getStatusStyle(booking.status)}`}>
                    {getStatusIcon(booking.status)}
                    {booking.status}
                  </span>
                  <span className="font-black text-sm text-[var(--color-primary-dark)]">
                    {booking.amount} XAF
                  </span>
                  {(booking.status === 'confirmed' || booking.status === 'scanned') && (
                    <button
                      onClick={() => handleViewTicket(booking)}
                      className="flex items-center gap-1.5 px-3 py-2 bg-[var(--color-primary-dark)] text-white rounded-xl text-[10px] font-black uppercase tracking-wider hover:opacity-90 transition-opacity"
                    >
                      <Download size={12} /> Ticket
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
