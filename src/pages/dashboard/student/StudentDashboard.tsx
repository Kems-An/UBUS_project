import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { 
  Bus, Calendar, ArrowRight, 
  Clock, Navigation, Ticket,
  TrendingUp, History, MapPin,
  Sparkles
} from 'lucide-react';

const SUPABASE_URL     = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

interface Booking {
  id: string;
  seat_number: string;
  status: string;
  created_at: string;
  departure: string;
  destination: string;
  amount: number;
}

export default function StudentDashboard() {
  const { user } = useAuth();
  const mapRef  = useRef<HTMLDivElement>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading,  setLoading]  = useState(true);

  // ── Init Google Map directly on the div ref ──
  // No useJsApiLoader — map loads from the global script in main.tsx
  useEffect(() => {
    const initMap = () => {
      if (!mapRef.current) return;
      if (!(window as any).google?.maps) return;
      new (window as any).google.maps.Map(mapRef.current, {
        center: { lat: 4.1549, lng: 9.2884 },
        zoom: 15,
        mapTypeControl:    false,
        streetViewControl: false,
        fullscreenControl: false,
      });
    };

    // If google is already loaded, init immediately
    if ((window as any).google?.maps) {
      initMap();
    } else {
      // Otherwise wait for the script to finish loading
      const script = document.getElementById('google-maps-script');
      if (script) {
        script.addEventListener('load', initMap);
        return () => script.removeEventListener('load', initMap);
      }
    }
  }, []);

  useEffect(() => { fetchBookings(); }, [user]);

  const fetchBookings = async () => {
    if (!user?.auth_id) { setLoading(false); return; }
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/bookings?user_id=eq.${user.auth_id}&order=created_at.desc&limit=10&select=*`,
      { headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` } }
    );
    const data = await res.json();
    if (Array.isArray(data)) setBookings(data);
    setLoading(false);
  };

  const totalTrips     = bookings.length;
  const completedTrips = bookings.filter(b => b.status === 'scanned').length;
  const totalSpent     = bookings.reduce((s, b) => s + (b.amount || 0), 0);
  const upcomingTrip   = bookings.find(b => b.status === 'confirmed');
  const recentBookings = bookings.slice(0, 4);

  const getStatusStyle = (status: string) => {
    if (status === 'confirmed') return 'bg-blue-50 text-blue-600';
    if (status === 'scanned')   return 'bg-emerald-50 text-emerald-600';
    if (status === 'cancelled') return 'bg-rose-50 text-rose-600';
    return 'bg-slate-50 text-slate-500';
  };

  return (
    <div className="pt-4 pb-8 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">

      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div>
          <h2 className="text-4xl font-extrabold tracking-tight text-[var(--color-primary-dark)]">
            Welcome, {user?.full_name?.split(' ')[0]} 
            <Sparkles size={32} className="text-[var(--color-primary-dark)] animate-pulse inline-block" />
          </h2>
          <div className="flex items-center gap-2 mt-2 text-sm text-[var(--color-text-muted)]">
            <Clock size={16} className="text-[var(--color-primary)]" />
            <span>
              {upcomingTrip
                ? `Upcoming: ${upcomingTrip.departure || 'N/A'} → ${upcomingTrip.destination || 'N/A'}`
                : 'No upcoming trips — book one now'}
            </span>
          </div>
        </div>
        <Link to="/dashboard/student/route-selection"
          className="group flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-sm text-white bg-gradient-to-br from-[var(--color-primary-dark)] to-[var(--color-primary)] shadow-xl hover:scale-[1.02] transition-transform self-start md:self-auto">
          <Bus size={18} /> Book a Shuttle
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">

        {/* Live Map — uses raw div ref, no useJsApiLoader */}
        <div className="md:col-span-8 h-[380px] rounded-[2rem] bg-white border border-[var(--color-border)] relative overflow-hidden shadow-sm">
          <div className="absolute top-6 left-6 z-10 p-4 rounded-2xl bg-white/90 backdrop-blur-md shadow-xl border border-white/20">
            <div className="flex items-center gap-3 mb-1">
              <div className="p-2 bg-[var(--color-primary-dark)] rounded-lg text-white">
                <Navigation size={16} />
              </div>
              <h3 className="font-bold text-sm text-[var(--color-primary-dark)]">University of Buea</h3>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <p className="text-[11px] text-green-600 font-bold uppercase tracking-wider">System Active</p>
            </div>
          </div>
          {/* Map mounts here — no React component needed */}
          <div ref={mapRef} className="w-full h-full" />
        </div>

        {/* Stats Card */}
<div className="md:col-span-4 p-8 rounded-[2rem] bg-white border border-[var(--color-border)]/60 flex flex-col justify-between relative overflow-hidden group shadow-[0_10px_30px_-10px_rgba(34,197,94,0.12)] hover:shadow-[0_12px_40px_-8px_rgba(var(--color-primary-rgb),0.2)] transition-all duration-500">
  
  {/* Ambient background accent decoration */}
  <div className="absolute inset-0 bg-gradient-to-br from-green-50/20 via-transparent to-[var(--color-primary)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

  {/* Large watermark background bus icon (adjusted opacity for light background) */}
  <div className="absolute -right-10 -top-10 text-neutral-100 group-hover:text-green-50 group-hover:scale-110 transition-all duration-700 pointer-events-none">
    <Bus size={180} />
  </div>
  
  {/* Top Section */}
  <div className="relative z-10">
    <div className="h-12 w-12 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center mb-4 transition-colors group-hover:bg-[var(--color-bg-soft)] group-hover:border-[var(--color-border)]">
      <TrendingUp size={24} className="text-green-600 group-hover:text-[var(--color-primary)] transition-colors" />
    </div>
    <h3 className="text-xl font-black italic text-[var(--color-primary-dark)]">With UBUS!</h3>
    <p className="text-xs text-[var(--color-text-muted)] font-medium mt-1">
      {completedTrips > 0 ? `${completedTrips} trips completed` : 'Start booking to track your trips'}
    </p>
  </div>
  
  {/* Bottom Metrics Section */}
  <div className="relative z-10 pt-8 border-t border-neutral-100 mt-6">
    <div className="flex items-baseline gap-2">
      <span className="text-6xl font-black tracking-tighter text-[var(--color-primary-dark)]">
        {loading ? '...' : totalTrips}
      </span>
      <span className="text-[var(--color-primary)] font-bold text-xl uppercase tracking-wider">trips</span>
    </div>
    
    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 mt-2">
      {loading ? '' : `${totalSpent} XAF spent`}
    </p>
    <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[var(--color-text-muted)]/70 mt-0.5">
      Lifetime Bookings
    </p>
  </div>
</div>

        {/* Upcoming Trip */}
        <div className="md:col-span-5 p-8 rounded-[2rem] bg-white border border-[var(--color-border)] shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-[var(--color-primary-dark)] flex items-center gap-2">
              <Calendar size={18} className="text-[var(--color-primary)]" /> Upcoming Trip
            </h3>
            <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-[var(--color-bg-muted)] border border-[var(--color-border)] uppercase tracking-wider">
              {upcomingTrip ? 'Confirmed' : 'None'}
            </span>
          </div>

          {upcomingTrip ? (
            <div className="flex gap-6">
              <div className="flex flex-col items-center py-1">
                <div className="w-4 h-4 rounded-full border-4 border-[var(--color-primary)] bg-white ring-4 ring-blue-50" />
                <div className="w-[2px] flex-1 bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-border)] my-2" />
                <div className="w-4 h-4 rounded-full bg-[var(--color-primary-dark)]" />
              </div>
              <div className="space-y-8">
                <div>
                  <p className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest mb-1">Departure</p>
                  <p className="font-bold text-base text-[var(--color-primary-dark)]">{upcomingTrip.departure || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest mb-1">Destination</p>
                  <p className="font-bold text-base text-[var(--color-primary-dark)]">{upcomingTrip.destination || 'N/A'}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center gap-3">
              <Bus size={28} className="text-[var(--color-text-muted)] opacity-30" />
              <p className="text-sm text-[var(--color-text-muted)] font-medium">No upcoming trips</p>
              <Link to="/dashboard/student/route-selection"
                className="text-xs font-black text-[var(--color-primary)] uppercase tracking-wider flex items-center gap-1 hover:underline">
                Book now <ArrowRight size={12} />
              </Link>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="md:col-span-7 p-8 rounded-[2rem] bg-white border border-[var(--color-border)] shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-[var(--color-primary-dark)] flex items-center gap-2">
              <History size={18} className="text-[var(--color-primary)]" /> Recent Activity
            </h3>
            <Link to="/dashboard/student/bookings"
              className="text-[10px] font-black text-[var(--color-primary)] uppercase tracking-wider flex items-center gap-1 hover:underline">
              View all <ArrowRight size={10} />
            </Link>
          </div>

          {loading ? (
            <div className="py-8 text-center">
              <div className="w-6 h-6 border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          ) : recentBookings.length === 0 ? (
            <div className="py-8 text-center">
              <Ticket size={28} className="text-[var(--color-text-muted)] mx-auto mb-2 opacity-30" />
              <p className="text-sm text-[var(--color-text-muted)] font-medium">No bookings yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentBookings.map(b => (
                <div key={b.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-[var(--color-bg-soft,#f8fafc)] transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)]">
                      <Bus size={16} />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-[var(--color-primary-dark)]">
                        {b.departure && b.destination ? `${b.departure} → ${b.destination}` : `Seat ${b.seat_number}`}
                      </p>
                      <p className="text-[10px] text-[var(--color-text-muted)]">
                        {new Date(b.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${getStatusStyle(b.status)}`}>
                    {b.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="md:col-span-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Book Shuttle', icon: <Bus size={20} />,      to: '/dashboard/student/route-selection', color: 'var(--color-primary)'      },
            { label: 'My Bookings', icon: <History size={20} />,   to: '/dashboard/student/bookings',        color: '#10b981'                    },
            { label: 'Schedule',    icon: <Calendar size={20} />,  to: '/dashboard/student/routes',  color: '#f59e0b'                    },
            { label: 'My Profile',  icon: <MapPin size={20} />,    to: '/dashboard/student/profile',         color: '#8b5cf6'                    },
          ].map(a => (
            <Link key={a.label} to={a.to}
              className="flex flex-col items-center gap-2 p-5 bg-white border border-[var(--color-border)] rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all text-center">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white" style={{ backgroundColor: a.color }}>
                {a.icon}
              </div>
              <span className="text-xs font-black text-[var(--color-primary-dark)] uppercase tracking-wider">{a.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
