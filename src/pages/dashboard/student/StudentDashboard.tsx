import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { 
  Bus, 
  Calendar, 
  ArrowRight, 
  Clock, 
  MapPin, 
  Users, 
  Activity, 
  Compass,
  QrCode
} from 'lucide-react';

export default function StudentDashboard() {
  const { user } = useAuth();

  // Mock data representing newly added route selection exploration component
  const availableShuttles = [
    { id: '1', route: 'Route A', name: 'Bus 402', destination: 'Student Union South', eta: '3 mins', seats: '8 available' },
    { id: '2', route: 'Route B', name: 'Bus 108', destination: 'Science Complex', eta: '11 mins', seats: '14 available' },
    { id: '3', route: 'Express', name: 'Bus 215', destination: 'Main Gate Station', eta: '18 mins', seats: 'Full' },
  ];

  return (
    <div className="py-6 px-4 md:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Header Section */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-[var(--color-border)]/50 pb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--color-primary-dark)]">
            Welcome, {user?.full_name || 'Student'}
          </h2>
          <div className="flex items-center gap-2 mt-2 text-sm text-[var(--color-text-muted)]">
            <Clock size={15} className="text-[var(--color-primary)]" />
            <span>Next shuttle departs in 12 minutes from </span>
            <span className="font-medium text-[var(--color-primary-dark)]">Central Hub</span>
          </div>
        </div>
        
        <Link 
          to="/dashboard/student/route-selection" 
          className="group flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-medium text-sm text-white bg-gradient-to-br from-[var(--color-primary-dark)] to-[var(--color-primary)] shadow-md transition-all hover:opacity-95 active:scale-[0.99]"
        >
          <Bus size={18} />
          Book a Shuttle
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </header>

      {/* Grid Layout Grid Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Replacement Content: Live Shuttles & Route Discovery Panel */}
        <div className="lg:col-span-8 p-6 md:p-8 rounded-2xl bg-white border border-[var(--color-border)] shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-lg text-[var(--color-primary-dark)] flex items-center gap-2">
                <Compass size={18} className="text-[var(--color-primary)]" />
                Nearby Active Shuttles
              </h3>
              <p className="text-xs text-[var(--color-text-muted)] mt-0.5">Real-time terminal statuses on your regular campus routes</p>
            </div>
            <span className="text-[10px] font-medium px-2.5 py-1 rounded-md bg-blue-50 text-[var(--color-primary)] tracking-wide uppercase">
              Live Fleet
            </span>
          </div>

          <div className="space-y-3">
            {availableShuttles.map((shuttle) => (
              <div 
                key={shuttle.id} 
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-[var(--color-border)]/70 hover:border-[var(--color-primary)]/30 transition-colors bg-[var(--color-bg-soft)]/40 gap-4"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-white border border-[var(--color-border)] rounded-lg text-[var(--color-primary-dark)] mt-0.5 shadow-2xs">
                    <Bus size={18} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-sm text-[var(--color-primary-dark)]">{shuttle.name}</h4>
                      <span className="text-[10px] px-2 py-0.5 bg-white border border-[var(--color-border)] rounded text-[var(--color-text-muted)] font-medium">
                        {shuttle.route}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--color-text-muted)] mt-1 flex items-center gap-1">
                      <MapPin size={12} /> Heading to {shuttle.destination}
                    </p>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-0 border-[var(--color-border)]/40 pt-2 sm:pt-0">
                  <span className={`text-xs font-medium ${shuttle.eta === '3 mins' ? 'text-green-600' : 'text-[var(--color-primary-dark)]'}`}>
                    {shuttle.eta}
                  </span>
                  <span className="text-[11px] text-[var(--color-text-muted)] mt-0.5 flex items-center gap-1">
                    <Users size={12} /> {shuttle.seats}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Impact Stats */}
        <div className="lg:col-span-4 p-8 rounded-2xl bg-[var(--color-primary-dark)] text-white flex flex-col justify-between relative overflow-hidden group min-h-[280px]">
          <div className="absolute -right-6 -top-6 opacity-5 group-hover:scale-105 transition-transform duration-500">
            <Bus size={180} />
          </div>

          <div className="relative z-10">
            <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center mb-6 backdrop-blur-xs">
              <Activity size={20} className="text-blue-300" />
            </div>
            <h3 className="text-lg font-medium">Commute Efficiency</h3>
            <p className="text-xs opacity-75 mt-1">Saved 12 hours of transit time this calendar month</p>
          </div>

          <div className="relative z-10 pt-6">
            <div className="flex items-baseline gap-1.5">
              <span className="text-5xl font-bold tracking-tight">24</span>
              <span className="text-[var(--color-primary)] font-medium text-sm">completed trips</span>
            </div>
            <p className="text-[10px] font-medium uppercase tracking-wider opacity-45 mt-1.5">Lifetime Platform Bookings</p>
          </div>
        </div>

        {/* Upcoming Trip Timeline */}
        <div className="lg:col-span-5 p-6 md:p-8 rounded-2xl bg-white border border-[var(--color-border)] shadow-xs">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-semibold text-[var(--color-primary-dark)] flex items-center gap-2">
              <Calendar size={18} className="text-[var(--color-primary)]" />
              Upcoming Scheduled Trip
            </h3>
            <span className="text-[10px] font-medium px-2.5 py-1 rounded-md bg-[var(--color-bg-soft)] border border-[var(--color-border)] text-[var(--color-text-muted)] tracking-wider uppercase">
              Today
            </span>
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col items-center py-1">
              <div className="w-3.5 h-3.5 rounded-full border-2 border-[var(--color-primary)] bg-white ring-4 ring-blue-50" />
              <div className="w-[1px] flex-1 border-l border-dashed border-[var(--color-border)] my-2" />
              <div className="w-3.5 h-3.5 rounded-full bg-[var(--color-primary-dark)]" />
            </div>
            
            <div className="space-y-8 flex-1">
              <div className="relative">
                <p className="text-[10px] font-medium text-[var(--color-text-muted)] uppercase tracking-wider">Pickup — 14:15</p>
                <p className="font-medium text-base text-[var(--color-primary-dark)] mt-0.5">Main Gate Station</p>
              </div>
              <div className="relative">
                <p className="text-[10px] font-medium text-[var(--color-text-muted)] uppercase tracking-wider">Dropoff — 14:40</p>
                <p className="font-medium text-base text-[var(--color-primary-dark)] mt-0.5">Student Union South</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="lg:col-span-7 p-6 md:p-8 rounded-2xl border border-dashed border-[var(--color-border)] bg-white/40 flex items-center justify-center min-h-[220px]">
          <div className="text-center max-w-xs space-y-2">
            <div className="mx-auto w-8 h-8 rounded-full bg-[var(--color-bg-soft)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)]">
              <QrCode size={16} />
            </div>
            <p className="text-xs text-[var(--color-text-muted)] font-medium">
              Recent boarding logs, active ticket passes, and rewards histories will display inside this container layout.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}