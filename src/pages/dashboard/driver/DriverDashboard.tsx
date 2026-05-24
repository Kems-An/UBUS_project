import React from 'react';
import { 
  BatteryFull, 
  Users, 
  ShieldCheck, 
  PlayCircle, 
  AlertTriangle, 
  Clock,
  Info,
  Mail,
  Zap,
  Radio,
  Milestone,
  CheckCircle2,
  CalendarDays,
  Gauge,
  Award
} from 'lucide-react';

interface DriverDashboardProps {
  driverName?: string;
}

export default function DriverDashboard({ driverName = "Driver" }: DriverDashboardProps) {
  return (
    <div className="animate-in fade-in duration-700 space-y-8 pb-12 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* ─── HEADER SECTION ─── */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-[var(--color-border)]">
        <div className="space-y-1 min-w-0 flex-1">
          <p className="text-[10px] font-black text-[var(--color-primary)] uppercase tracking-[0.2em] break-words">
            Driver Analytics Hub
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[var(--color-primary-dark)] tracking-tight text-balance truncate">
            {driverName}'s Performance Profile
          </h2>
        </div>
        
        <div className="flex flex-wrap sm:flex-nowrap gap-3 w-full md:w-auto shrink-0">
          <div className="flex-1 sm:flex-none min-w-[140px] px-5 py-3 bg-white border border-[var(--color-border)] rounded-2xl shadow-2xs">
            <p className="text-[9px] text-[var(--color-text-muted)] font-bold uppercase tracking-wider mb-0.5 whitespace-nowrap">Active Assignment</p>
            <p className="text-sm font-black text-[var(--color-primary-dark)] truncate">Toyota Coaster #88</p>
          </div>
          <div className="flex-1 sm:flex-none min-w-[140px] px-5 py-3 bg-white border border-[var(--color-border)] rounded-2xl shadow-2xs">
            <p className="text-[9px] text-[var(--color-primary)] font-bold uppercase tracking-wider mb-0.5 whitespace-nowrap">Current Shift Status</p>
            <p className="text-sm font-black text-[var(--color-primary-dark)] truncate">Standby (08:45 AM)</p>
          </div>
        </div>
      </header>

      {/* ─── CORE STATISTICS GRID (RESPONSIVE WRAPPING) ─── */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Safe Driving Score", value: "98/100", desc: "Top 5% of campus network", icon: <ShieldCheck size={22} />, trend: "+1.2% wk" },
          { title: "Total Passengers Hauled", value: "14,240", desc: "Across all active terms", icon: <Users size={22} />, trend: "840 rot" },
          { title: "Distance Covered", value: "3,150 km", desc: "Total log history tracking", icon: <Milestone size={22} />, trend: "94 km today" },
          { title: "On-Time Arrival Rate", value: "96.4%", desc: "Evaluated over past 90 loops", icon: <Clock size={22} />, trend: "Optimal" }
        ].map((stat, idx) => (
          <div key={idx} className="bg-white border border-[var(--color-border)] p-6 rounded-[2rem] shadow-2xs flex flex-col justify-between hover:border-[var(--color-primary)]/40 transition-colors group min-w-0">
            <div className="flex justify-between items-start gap-2 mb-4">
              <div className="p-3 bg-[var(--color-bg-soft)] text-[var(--color-primary-dark)] rounded-xl group-hover:bg-[var(--color-secondary-light)] transition-colors shrink-0">
                {stat.icon}
              </div>
              <span className="text-[9px] font-black text-[var(--color-primary)] bg-[var(--color-secondary-light)] px-2 py-0.5 rounded-md uppercase tracking-wide whitespace-nowrap truncate max-w-[100px]">
                {stat.trend}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-black text-[var(--color-text-muted)] uppercase tracking-wider mb-1 truncate">{stat.title}</p>
              <h3 className="text-xl sm:text-2xl font-black text-[var(--color-primary-dark)] tracking-tight mb-1 truncate">{stat.value}</h3>
              <p className="text-xs font-medium text-[var(--color-text-muted)] line-clamp-2 md:line-clamp-none leading-normal text-balance">{stat.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* ─── DETAILED WORKSPACE SPLIT ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COMPONENT: FLEET EFFICIENCY & ROSTERS (8 COLS) */}
        <div className="lg:col-span-8 space-y-6 min-w-0">
          
          {/* ASSIGNED SHUTTLE EFFICIENCY SUMMARY */}
          <div className="bg-white border border-[var(--color-border)] rounded-[2.5rem] p-6 sm:p-8 shadow-2xs relative overflow-hidden flex flex-col md:flex-row items-center gap-6 md:gap-8 group min-w-0">
            <div className="relative z-10 flex-1 w-full min-w-0">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--color-secondary-light)] text-[var(--color-primary-dark)] text-[10px] font-black rounded-full mb-4 uppercase tracking-wider border border-[var(--color-border)]">
                <Zap size={12} strokeWidth={2.5} /> Daily Asset Performance
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-[var(--color-primary-dark)] tracking-tight mb-2 truncate">
                Active Vehicle Metrics
              </h3>
              <p className="text-[var(--color-text-muted)] text-sm mb-6 max-w-sm font-medium leading-relaxed text-balance">
                Live operational efficiency data for today's allocated loop rotation asset.
              </p>
              
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                <div className="bg-[var(--color-bg-soft)] p-3 sm:p-4 rounded-2xl border border-[var(--color-border)] min-w-0 text-center sm:text-left">
                  <BatteryFull size={18} className="text-[var(--color-primary)] mb-1.5 mx-auto sm:mx-0" />
                  <p className="text-[9px] sm:text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-tight truncate">Charge</p>
                  <p className="text-xs sm:text-sm md:text-base font-black text-[var(--color-primary-dark)] truncate">94% Cap</p>
                </div>
                <div className="bg-[var(--color-bg-soft)] p-3 sm:p-4 rounded-2xl border border-[var(--color-border)] min-w-0 text-center sm:text-left">
                  <Gauge size={18} className="text-[var(--color-primary)] mb-1.5 mx-auto sm:mx-0" />
                  <p className="text-[9px] sm:text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-tight truncate">Eco-Drive</p>
                  <p className="text-xs sm:text-sm md:text-base font-black text-[var(--color-primary-dark)] truncate">A+ Rating</p>
                </div>
                <div className="bg-[var(--color-bg-soft)] p-3 sm:p-4 rounded-2xl border border-[var(--color-border)] min-w-0 text-center sm:text-left">
                  <Award size={18} className="text-[var(--color-primary)] mb-1.5 mx-auto sm:mx-0" />
                  <p className="text-[9px] sm:text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-tight truncate">Logs</p>
                  <p className="text-xs sm:text-sm md:text-base font-black text-[var(--color-primary-dark)] truncate">100% Ok</p>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-5/12 relative h-48 sm:h-56 rounded-3xl overflow-hidden shadow-inner shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2070&auto=format&fit=crop" 
                alt="Electric Shuttle Diagnostics"
                className="w-full h-full object-cover opacity-90 group-hover:scale-102 transition-transform duration-700"
              />
            </div>
          </div>

          {/* HISTORICAL SHIFT MILESTONES */}
          <div className="bg-white border border-[var(--color-border)] rounded-[2.5rem] p-6 sm:p-8 shadow-2xs min-w-0">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-2.5 min-w-0">
                <CalendarDays size={20} className="text-[var(--color-primary)] shrink-0" />
                <h4 className="text-lg sm:text-xl font-black text-[var(--color-primary-dark)] tracking-tight truncate">Recent Runtime Records</h4>
              </div>
              <span className="text-xs font-bold text-[var(--color-text-muted)] shrink-0 whitespace-nowrap">Past 3 Days</span>
            </div>

            <div className="space-y-4">
              {[
                { date: "May 22, 2026", route: "Route 4A (Main Campus Loop)", hours: "6.5 hrs", distance: "112 km" },
                { date: "May 21, 2026", route: "Route 2B (Science Extension)", hours: "8.0 hrs", distance: "145 km" },
                { date: "May 20, 2026", route: "Route 4A (Main Campus Loop)", hours: "4.2 hrs", distance: "78 km" }
              ].map((log, index) => (
                <div key={index} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-[var(--color-bg-soft)] rounded-2xl border border-[var(--color-border)] gap-4 min-w-0">
                  <div className="min-w-0">
                    <p className="text-[10px] font-black text-[var(--color-text-muted)] uppercase tracking-wider">{log.date}</p>
                    <h5 className="font-extrabold text-[var(--color-primary-dark)] text-sm mt-0.5 truncate">{log.route}</h5>
                  </div>
                  <div className="flex items-center gap-4 sm:gap-6 text-xs font-bold text-[var(--color-primary-dark)] w-full sm:w-auto justify-between sm:justify-end shrink-0">
                    <div className="whitespace-nowrap">
                      <span className="block text-[9px] text-[var(--color-text-muted)] uppercase tracking-tight">Runtime</span>
                      {log.hours}
                    </div>
                    <div className="whitespace-nowrap">
                      <span className="block text-[9px] text-[var(--color-text-muted)] uppercase tracking-tight">Log Range</span>
                      {log.distance}
                    </div>
                    <div className="flex items-center gap-1.5 bg-white px-2.5 py-1.5 rounded-xl border border-[var(--color-border)] text-[var(--color-primary-dark)] text-[10px] font-black uppercase whitespace-nowrap">
                      <CheckCircle2 size={12} className="text-[var(--color-primary)] shrink-0" /> Verified
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COMPONENT: TELEMETRY & DISPATCH FEEDS (4 COLS) */}
        <div className="lg:col-span-4 flex flex-col gap-6 min-w-0">
          
          {/* ACTIVE SHIFT ACTION PANEL */}
          <div className="bg-[var(--color-primary-dark)] p-6 sm:p-8 rounded-[2.5rem] text-white shadow-lg flex flex-col justify-between min-h-[190px] relative overflow-hidden group min-w-0">
            <div className="relative z-10">
              <h4 className="font-black text-lg tracking-tight mb-1 truncate">Shift Control Room</h4>
              <p className="text-white/60 text-xs font-semibold text-balance">Broadcast active telemetry to tracking grid</p>
            </div>
            <div className="flex flex-col gap-3 mt-6 relative z-10 w-full">
              <button className="w-full py-3.5 px-4 bg-white text-[var(--color-primary-dark)] rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-transform active:scale-98 shadow-sm hover:bg-[var(--color-bg-soft)] text-center truncate">
                <PlayCircle size={18} strokeWidth={2.5} className="shrink-0" /> Initialize Tracking
              </button>
              <button className="w-full py-3.5 px-4 bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors hover:bg-white/15 text-center truncate">
                <AlertTriangle size={18} className="shrink-0" /> Flag Maintenance Issue
              </button>
            </div>
            <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-[var(--color-primary)]/20 rounded-full blur-2xl pointer-events-none" />
          </div>
          
          {/* SYSTEM TELEMETRY DEVIATIONS */}
          <div className="bg-white border border-[var(--color-border)] p-6 rounded-[2.5rem] shadow-2xs min-w-0">
            <div className="flex items-center gap-2 mb-5">
              <Radio size={16} className="text-[var(--color-primary)] shrink-0" />
              <h4 className="font-black text-base text-[var(--color-primary-dark)] tracking-tight truncate">System Telemetry</h4>
            </div>
            <div className="space-y-3.5">
              {[
                { label: 'Fleet Node Sync', status: 'Optimal', active: true },
                { label: 'GPS Transponder Signal', status: 'Strong', active: true },
                { label: 'Congestion Detours', status: 'Active (2)', active: false },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-[var(--color-bg-soft)] last:border-0 last:pb-0 first:pt-0 gap-2 min-w-0">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className={`w-2 h-2 rounded-full shrink-0 ${item.active ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-primary-dark)]'} shadow-2xs`} />
                    <span className="text-xs font-bold text-[var(--color-primary-dark)] truncate">{item.label}</span>
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-wider shrink-0 whitespace-nowrap ${!item.active ? 'text-[var(--color-primary-dark)]' : 'text-[var(--color-text-muted)]'}`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* SIMPLIFIED DISPATCH ALERTS SUB-FEED */}
          <div className="bg-white border border-[var(--color-border)] p-6 rounded-[2.5rem] shadow-2xs space-y-4 min-w-0">
            <h4 className="text-sm font-black text-[var(--color-primary-dark)] uppercase tracking-wider truncate">Broadcast Bulletins</h4>
            
            <div className="p-4 rounded-xl bg-[var(--color-bg-soft)] border border-[var(--color-border)] space-y-1 min-w-0">
              <div className="flex items-center gap-2 text-[var(--color-primary-dark)] min-w-0">
                <Info size={14} className="shrink-0" />
                <p className="text-xs font-black truncate">Route Realignment Update</p>
              </div>
              <p className="text-[11px] text-[var(--color-text-muted)] font-medium leading-relaxed pl-5 line-clamp-2 sm:line-clamp-none text-balance">
                Construction ongoing near Elm St. Pull down 4th Ave detour loops.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[var(--color-bg-soft)] border border-[var(--color-border)] space-y-1 min-w-0">
              <div className="flex items-center gap-2 text-[var(--color-text-muted)] min-w-0">
                <Mail size={14} className="shrink-0" />
                <p className="text-xs font-black truncate">Shift Schedule Released</p>
              </div>
              <p className="text-[11px] text-[var(--color-text-muted)] font-medium leading-relaxed pl-5 line-clamp-2 sm:line-clamp-none text-balance">
                Alternative premium weekend runtimes processed securely.
              </p>
            </div>
          </div>

        </div>
        
      </div>
    </div>
  );
}