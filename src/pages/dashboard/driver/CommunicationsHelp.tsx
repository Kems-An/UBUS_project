import React from 'react';
import { 
  Bell, 
  AlertTriangle, 
  MapPinned, 
  Wrench, 
  Info, 
  Headset, 
  Send,
  Lightbulb,
  Search,
  MoreVertical
} from 'lucide-react';

const CommunicationsHelp: React.FC = () => {
  return (
    <div className="min-h-screen bg-[var(--color-bg-soft)] pb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* ─── FLOATING HEADER ─── */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-[var(--color-border)] px-8 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black text-[var(--color-primary-dark)] tracking-tight">Command Center</h2>
            <p className="text-sm font-bold text-[var(--color-primary)] uppercase tracking-widest flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-primary)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-primary)]"></span>
              </span>
              Live Dispatch Feed
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative hidden lg:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" size={18} />
              <input 
                type="text" 
                placeholder="Search alerts..." 
                className="pl-10 pr-4 py-2.5 bg-[var(--color-bg-soft)] border border-transparent rounded-xl text-sm text-[var(--color-primary-dark)] font-semibold placeholder-[var(--color-text-muted)] focus:bg-white focus:border-[var(--color-border)] focus:ring-2 focus:ring-[var(--color-primary)]/10 transition-all outline-none w-64"
              />
            </div>
            <button className="bg-[var(--color-primary-dark)] text-white flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-xs tracking-widest uppercase shadow-xs hover:bg-[var(--color-primary)] transition-all active:scale-95">
              <Headset size={16} /> Contact Dispatch
            </button>
          </div>
        </div>
      </header>

      {/* ─── MAIN APP GRID ─── */}
      <main className="max-w-7xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* ─── NOTIFICATIONS PANEL (LEFT 7 COLS) ─── */}
        <section className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[var(--color-secondary-light)] text-[var(--color-primary-dark)] rounded-lg">
                <Bell size={20} />
              </div>
              <h3 className="text-xl font-black text-[var(--color-primary-dark)]">Notifications</h3>
            </div>
            <button className="text-xs font-black text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors uppercase tracking-widest">
              Clear All
            </button>
          </div>

          <div className="space-y-4">
            {/* Urgent Alert (Maintains system-compliant pop notification border using theme tokens) */}
            <div className="group bg-white p-6 rounded-[2rem] border border-[var(--color-border)] border-l-[6px] border-l-[var(--color-primary)] shadow-xs hover:shadow-md transition-all relative overflow-hidden">
              <div className="flex gap-5 relative z-10">
                <div className="h-12 w-12 rounded-2xl bg-[var(--color-secondary-light)] text-[var(--color-primary-dark)] flex items-center justify-center shrink-0">
                  <AlertTriangle size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-black text-[var(--color-primary-dark)] text-lg tracking-tight">Bridge Closure: Route 42</h4>
                    <span className="text-[10px] font-black bg-[var(--color-secondary-light)] text-[var(--color-primary-dark)] px-2.5 py-1 rounded-lg uppercase tracking-wide">Urgent</span>
                  </div>
                  <p className="text-[var(--color-text-muted)] text-sm font-medium leading-relaxed">
                    Main St. bridge closed for inspection. Use university bypass. Detour mapping synced to your tablet.
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest">2 mins ago</span>
                    <button className="text-xs font-bold text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-colors underline">View Detour</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Standard Info Alert */}
            <div className="bg-white p-6 rounded-[2rem] border border-[var(--color-border)] border-l-[6px] border-l-[var(--color-primary)] shadow-xs hover:shadow-md transition-all group">
              <div className="flex gap-5">
                <div className="h-12 w-12 rounded-2xl bg-[var(--color-secondary-light)] text-[var(--color-primary-dark)] flex items-center justify-center shrink-0 group-hover:rotate-6 transition-transform">
                  <MapPinned size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-black text-[var(--color-primary-dark)] text-lg tracking-tight">Route Update: Science Lab</h4>
                    <span className="text-[10px] font-black bg-[var(--color-bg-soft)] text-[var(--color-text-muted)] border border-[var(--color-border)] px-2.5 py-1 rounded-lg uppercase">Info</span>
                  </div>
                  <p className="text-[var(--color-text-muted)] text-sm font-medium leading-relaxed">Stop moved 50m North due to construction. Effective immediately.</p>
                  <span className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest mt-4 block">1 hour ago</span>
                </div>
              </div>
            </div>

            {/* Read/History Items */}
            {[
              { title: 'Maintenance: Vehicle #402', desc: 'Oil change scheduled for tomorrow 06:00.', icon: <Wrench size={20}/>, time: 'Yesterday' },
              { title: 'Holiday Schedule', desc: 'Limited service during Reading Week.', icon: <Info size={20}/>, time: '2 days ago' }
            ].map((item, i) => (
              <div key={i} className="bg-white/50 p-6 rounded-[2rem] flex gap-5 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all border border-[var(--color-border)] hover:bg-white shadow-2xs">
                <div className="h-12 w-12 rounded-2xl bg-[var(--color-bg-soft)] text-[var(--color-text-muted)] border border-[var(--color-border)] flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-extrabold text-[var(--color-primary-dark)]">{item.title}</h4>
                  <p className="text-xs font-semibold text-[var(--color-text-muted)] mt-1">{item.desc}</p>
                  <span className="text-[10px] font-bold text-[var(--color-text-muted)] mt-3 block">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── SUPPORT PANEL (RIGHT 5 COLS) ─── */}
        <aside className="lg:col-span-5 space-y-6">
          <div className="px-2 flex items-center justify-between">
            <h3 className="text-xl font-black text-[var(--color-primary-dark)] tracking-tight">Help Desk</h3>
            <MoreVertical size={20} className="text-[var(--color-text-muted)] cursor-pointer hover:text-[var(--color-primary-dark)] transition-colors" />
          </div>

          <section className="bg-white rounded-[2.5rem] p-8 border border-[var(--color-border)] shadow-xs overflow-hidden relative">
            <div className="relative z-10">
              <div className="mb-8">
                <h4 className="text-lg font-black text-[var(--color-primary-dark)] mb-2">Report an Issue</h4>
                <p className="text-xs font-bold text-[var(--color-text-muted)] leading-relaxed italic">
                  Non-emergency tickets only. For immediate roadside aid, use the "Dispatch" button above.
                </p>
              </div>

              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-[var(--color-text-muted)] uppercase tracking-widest ml-1">Issue Category</label>
                  <div className="relative">
                    <select className="w-full bg-[var(--color-bg-soft)] border border-[var(--color-border)] rounded-2xl p-4 text-sm font-bold text-[var(--color-primary-dark)] focus:ring-2 focus:ring-[var(--color-primary)]/10 focus:bg-white transition-all outline-none appearance-none cursor-pointer">
                      <option>Vehicle Maintenance</option>
                      <option>Shift / Scheduling</option>
                      <option>Route Obstruction</option>
                      <option>Passenger Incident</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-[var(--color-text-muted)] uppercase tracking-widest ml-1">Vehicle ID</label>
                  <input 
                    type="text" 
                    placeholder="e.g. AV-402" 
                    className="w-full bg-[var(--color-bg-soft)] border border-[var(--color-border)] rounded-2xl p-4 text-sm font-bold text-[var(--color-primary-dark)] placeholder-[var(--color-text-muted)] focus:ring-2 focus:ring-[var(--color-primary)]/10 focus:bg-white transition-all outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-[var(--color-text-muted)] uppercase tracking-widest ml-1">Description</label>
                  <textarea 
                    rows={4}
                    placeholder="Describe the problem..."
                    className="w-full bg-[var(--color-bg-soft)] border border-[var(--color-border)] rounded-2xl p-4 text-sm font-bold text-[var(--color-primary-dark)] placeholder-[var(--color-text-muted)] focus:ring-2 focus:ring-[var(--color-primary)]/10 focus:bg-white transition-all outline-none resize-none"
                  />
                </div>

                <button type="submit" className="w-full flex items-center justify-center gap-3 bg-[var(--color-primary)] text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xs hover:bg-[var(--color-primary-dark)] transition-all active:scale-98">
                  <Send size={16} /> Submit Ticket
                </button>
              </form>
            </div>
            {/* Cleaned up decorative layout circle */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[var(--color-bg-soft)] rounded-full blur-3xl opacity-60" />
          </section>

          {/* Pro-Tip Dark Structural Card */}
          <div className="bg-[var(--color-primary-dark)] rounded-[2.5rem] p-6 text-white relative overflow-hidden group shadow-xs">
            <div className="relative z-10 flex gap-4">
              <div className="p-3 bg-white/10 rounded-2xl text-white group-hover:bg-[var(--color-primary)] transition-all duration-500">
                <Lightbulb size={24} />
              </div>
              <div>
                <h5 className="font-black text-sm uppercase tracking-widest mb-1 italic">Pro Tip</h5>
                <p className="text-xs text-white/70 font-semibold leading-relaxed">
                  Complete vehicle pre-checks <span className="text-white font-black underline decoration-[var(--color-primary)] decoration-2">15 mins</span> before shift start. Logs sync automatically to dispatch.
                </p>
              </div>
            </div>
            <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-[var(--color-primary)]/20 rounded-full blur-2xl" />
          </div>
        </aside>
      </main>
    </div>
  );
};

export default CommunicationsHelp;