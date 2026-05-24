import { useAuth } from '../../../context/AuthContext';
import { 
  Navigation, 
  CheckCircle2, 
  Search, 
  Map as MapIcon, 
  Clock, 
  Bus, 
  MapPin,
  ExternalLink
} from 'lucide-react';

const ROUTES = [
  {
    id: 1,
    title: "Main Campus Loop",
    status: "COMPLETED",
    time: "06:00 AM - 08:00 AM",
    stops: 12,
    shuttle: "SH-102",
    isCompleted: true,
  },
  {
    id: 2,
    title: "North-South Connector",
    status: "ON-DUTY",
    time: "08:00 AM - 12:00 PM",
    stops: 8,
    shuttle: "SH-102",
    isActive: true,
  },
  {
    id: 3,
    title: "Evening Express",
    status: "NEXT TRIP",
    time: "01:00 PM - 03:00 PM",
    stops: 4,
    shuttle: "SH-105",
  }
];

export default function DriverSchedule() {
  const { user } = useAuth();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-10">
      
      {/* ─── TOP HEADER ─── */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-[var(--color-primary-dark)] tracking-tight sm:text-4xl">
            Daily Schedule
          </h2>
          <p className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-widest mt-1.5">
            Operational Log: Shift Circuit Updates
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-white border border-[var(--color-border)] rounded-xl flex items-center gap-2.5 shadow-xs">
            <div className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-pulse" />
            <span className="text-[10px] font-black text-[var(--color-primary-dark)] uppercase tracking-wider">
              On-Duty Network
            </span>
          </div>
          <button className="p-2.5 bg-white border border-[var(--color-border)] rounded-xl text-[var(--color-text-muted)] hover:text-[var(--color-primary-dark)] transition-colors shadow-xs">
            <Search size={16} />
          </button>
        </div>
      </header>

      {/* ─── HERO ASSIGNMENT SECTION ─── */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Main Route Tracking Block: Deep Emerald Theme Background */}
        <div className="lg:col-span-8 bg-[var(--color-primary)] text-white rounded-2xl p-8 relative overflow-hidden flex flex-col justify-between min-h-[260px] shadow-sm">
          <div className="relative z-10">
            <span className="text-[9px] font-black tracking-widest bg-white/15 px-3 py-1 rounded-full uppercase border border-white/10">
              Active Transponder Route
            </span>
            <h3 className="text-3xl font-black mt-5 tracking-tight">North-South Connector</h3>
            <p className="mt-2.5 text-white/85 flex items-center gap-2 font-semibold text-xs">
              <Bus size={14} /> Assigned License Key: <span className="font-mono">{user?.license_number || 'UNSET-CNF'}</span>
            </p>
          </div>
          
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6 mt-6 pt-6 border-t border-white/10">
            <div>
              <p className="text-[9px] font-bold text-white/60 uppercase tracking-widest mb-0.5">Next Operational Stop Node</p>
              <p className="text-lg font-black tracking-tight">Engineering Quad (Gate B)</p>
            </div>
            <button className="bg-white text-[var(--color-primary-dark)] font-black px-6 py-3.5 rounded-xl shadow-xs hover:bg-[var(--color-bg-soft)] transition-all text-xs flex items-center justify-center gap-2 shrink-0">
              <MapIcon size={14} /> Telemetry Map
            </button>
          </div>
          <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Progress Metrics Panel: Custom Accent Variable Integration */}
        <div className="lg:col-span-4 bg-white border border-[var(--color-border)] rounded-2xl p-6 flex flex-col justify-between shadow-xs">
          <div>
            <h4 className="text-[10px] font-black text-[var(--color-text-muted)] uppercase tracking-widest mb-4">
              Shift Operations Progress
            </h4>
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl font-black text-[var(--color-primary-dark)] tracking-tighter">3 / 5</span>
              <span className="text-[10px] font-black text-[var(--color-primary-dark)] bg-[var(--color-secondary-light)] px-2.5 py-1 rounded-full tracking-wide">
                60% CYCLE COMPLETE
              </span>
            </div>
            <div className="w-full bg-[var(--color-bg-soft)] h-2.5 rounded-full overflow-hidden border border-[var(--color-border)]/40">
              <div className="bg-[var(--color-primary)] h-full rounded-full transition-all duration-1000" style={{ width: '60%' }} />
            </div>
          </div>
          
          <div className="mt-6 flex items-center gap-3.5 bg-[var(--color-bg-soft)] p-3.5 rounded-xl border border-[var(--color-border)]">
            <div className="p-2 bg-white text-[var(--color-primary)] rounded-lg border border-[var(--color-border)] shadow-2xs">
              <Clock size={16} />
            </div>
            <div>
              <p className="text-[9px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider">Remaining Run Duration</p>
              <p className="text-base font-black text-[var(--color-primary-dark)] tracking-tight">04h 22m</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ROUTE SCHEDULE LIST ─── */}
      <section className="space-y-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-black text-[var(--color-primary-dark)] tracking-tight">
            Assigned Loops
          </h3>
          <div className="flex p-1 bg-[var(--color-bg-soft)] border border-[var(--color-border)] rounded-xl">
            <button className="px-4 py-1.5 text-[10px] font-black rounded-lg bg-white shadow-xs text-[var(--color-primary-dark)]">All Loops</button>
            <button className="px-4 py-1.5 text-[10px] font-bold rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-primary-dark)] transition-colors">Pending</button>
          </div>
        </div>

        <div className="space-y-3">
          {ROUTES.map((route) => (
            <div 
              key={route.id} 
              className={`group bg-white p-5 rounded-2xl border transition-all duration-200 flex flex-col md:flex-row md:items-center gap-5 
                ${route.isActive ? 'border-[var(--color-primary)] shadow-xs ring-1 ring-[var(--color-primary)]/10' : 'border-[var(--color-border)] hover:bg-[var(--color-bg-soft)]'}`}
            >
              <div className="flex-shrink-0">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-102
                  ${route.isCompleted ? 'bg-[var(--color-bg-soft)] text-[var(--color-text-muted)] border border-[var(--color-border)]' : route.isActive ? 'bg-[var(--color-secondary-light)] text-[var(--color-primary-dark)]' : 'bg-[var(--color-bg-soft)] text-[var(--color-primary-dark)] border border-[var(--color-border)]'}`}>
                  {route.isCompleted ? <CheckCircle2 size={22} /> : <Navigation size={22} />}
                </div>
              </div>

              <div className="flex-grow">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <h4 className={`text-base font-extrabold tracking-tight ${route.isCompleted ? 'text-[var(--color-text-muted)] line-through decoration-1' : 'text-[var(--color-primary-dark)]'}`}>
                    {route.title}
                  </h4>
                  <span className={`text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider
                    ${route.isCompleted ? 'bg-[var(--color-bg-soft)] text-[var(--color-text-muted)] border border-[var(--color-border)]' : route.isActive ? 'bg-[var(--color-secondary-light)] text-[var(--color-primary-dark)]' : 'bg-[var(--color-bg-soft)] text-[var(--color-primary-dark)] border border-[var(--color-border)]'}`}>
                    {route.status}
                  </span>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-semibold text-[var(--color-text-muted)]">
                  <span className="flex items-center gap-1"><Clock size={12} className={route.isActive ? 'text-[var(--color-primary)]' : ''} /> {route.time}</span>
                  <span className="flex items-center gap-1"><MapPin size={12} className={route.isActive ? 'text-[var(--color-primary)]' : ''} /> {route.stops} Terminals</span>
                  <span className="flex items-center gap-1"><Bus size={12} className={route.isActive ? 'text-[var(--color-primary)]' : ''} /> Asset {route.shuttle}</span>
                </div>
              </div>

              <div className="md:ml-auto shrink-0">
                {route.isCompleted ? (
                  <button className="w-full md:w-auto px-4 py-2.5 rounded-xl border border-[var(--color-border)] text-[var(--color-text-muted)] font-bold text-xs bg-[var(--color-bg-soft)] cursor-not-allowed">
                    Archived Log
                  </button>
                ) : (
                  <button className={`w-full md:w-auto px-4 py-2.5 rounded-xl font-bold text-xs shadow-2xs transition-all active:scale-98
                    ${route.isActive ? 'bg-[var(--color-primary)] text-white' : 'bg-[var(--color-primary-dark)] text-white'}`}>
                    Open Manifest
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── LIVE INFRASTRUCTURE CONTEXT ─── */}
      <section className="rounded-2xl overflow-hidden relative h-[240px] border border-[var(--color-border)] shadow-2xs group">
        <img 
          src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=2066&auto=format&fit=crop" 
          alt="University Grid Layout Map" 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102 grayscale opacity-25" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary-dark)]/20 to-transparent" />
        
        <div className="absolute bottom-5 left-5 right-5 p-5 bg-white/90 backdrop-blur-md rounded-xl flex items-center justify-between border border-white/40 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 bg-[var(--color-primary)] rounded-lg flex items-center justify-center text-white shadow-2xs">
              <MapIcon size={18} />
            </div>
            <div>
              <h5 className="font-extrabold text-[var(--color-primary-dark)] text-base tracking-tight">Campus Traffic Status</h5>
              <p className="text-xs text-[var(--color-primary)] font-bold uppercase tracking-wider">All Transit Vectors Clear</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-3">
             <button className="p-2.5 bg-white rounded-lg shadow-2xs border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-primary-dark)] transition-colors">
               <ExternalLink size={16} />
             </button>
          </div>
        </div>
      </section>

    </div>
  );
}