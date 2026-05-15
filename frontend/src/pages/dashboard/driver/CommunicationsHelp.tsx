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
    <div className="min-h-screen bg-[#F8FAFC] pb-12">
      {/* --- Floating Header --- */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200 px-8 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Command Center</h2>
            <p className="text-sm font-bold text-emerald-600 uppercase tracking-widest flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Live Dispatch Feed
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative hidden lg:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search alerts..." 
                className="pl-10 pr-4 py-2.5 bg-slate-100 border-transparent rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none w-64"
              />
            </div>
            <button className="bg-slate-900 text-white flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-xs tracking-widest uppercase shadow-xl shadow-slate-200 hover:bg-emerald-600 transition-all active:scale-95">
              <Headset size={16} /> Contact Dispatch
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* --- Notifications Panel (Left 7 Cols) --- */}
        <section className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                <Bell size={20} />
              </div>
              <h3 className="text-xl font-black text-slate-900">Notifications</h3>
            </div>
            <button className="text-xs font-black text-slate-400 hover:text-emerald-600 transition-colors uppercase tracking-widest">
              Clear All
            </button>
          </div>

          <div className="space-y-4">
            {/* Urgent Alert */}
            <div className="group bg-white p-6 rounded-[2rem] border-l-[6px] border-rose-500 shadow-sm hover:shadow-md transition-all relative overflow-hidden">
              <div className="flex gap-5 relative z-10">
                <div className="h-12 w-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
                  <AlertTriangle size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-black text-slate-900 text-lg tracking-tight">Bridge Closure: Route 42</h4>
                    <span className="text-[10px] font-black bg-rose-100 text-rose-600 px-2 py-1 rounded-lg uppercase">Urgent</span>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Main St. bridge closed for inspection. Use university bypass. Detour mapping synced to your tablet.
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">2 mins ago</span>
                    <button className="text-xs font-bold text-rose-500 hover:underline">View Detour</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Standard Alert */}
            <div className="bg-white p-6 rounded-[2rem] border-l-[6px] border-emerald-500 shadow-sm hover:shadow-md transition-all group">
              <div className="flex gap-5">
                <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0 group-hover:rotate-12 transition-transform">
                  <MapPinned size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-black text-slate-900 text-lg tracking-tight">Route Update: Science Lab</h4>
                    <span className="text-[10px] font-black bg-emerald-100 text-emerald-600 px-2 py-1 rounded-lg uppercase">Info</span>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed">Stop moved 50m North due to construction. Effective immediately.</p>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-4 block">1 hour ago</span>
                </div>
              </div>
            </div>

            {/* Read/History Items */}
            {[
              { title: 'Maintenance: Vehicle #402', desc: 'Oil change scheduled for tomorrow 06:00.', icon: <Wrench size={20}/>, time: 'Yesterday' },
              { title: 'Holiday Schedule', desc: 'Limited service during Reading Week.', icon: <Info size={20}/>, time: '2 days ago' }
            ].map((item, i) => (
              <div key={i} className="bg-slate-50/50 p-6 rounded-[2rem] flex gap-5 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all border border-transparent hover:border-slate-200">
                <div className="h-12 w-12 rounded-2xl bg-slate-200 text-slate-500 flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900">{item.title}</h4>
                  <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                  <span className="text-[10px] font-bold text-slate-400 mt-3 block">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- Support Panel (Right 5 Cols) --- */}
        <aside className="lg:col-span-5 space-y-6">
          <div className="px-2 flex items-center justify-between">
            <h3 className="text-xl font-black text-slate-900 tracking-tight">Help Desk</h3>
            <MoreVertical size={20} className="text-slate-400 cursor-pointer" />
          </div>

          <section className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm overflow-hidden relative">
            <div className="relative z-10">
              <div className="mb-8">
                <h4 className="text-lg font-black text-slate-900 mb-2">Report an Issue</h4>
                <p className="text-xs font-medium text-slate-500 leading-relaxed italic">
                  Non-emergency tickets only. For immediate roadside aid, use the "Dispatch" button above.
                </p>
              </div>

              <form className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Issue Category</label>
                  <select className="w-full bg-slate-50 border-transparent rounded-2xl p-4 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all outline-none appearance-none">
                    <option>Vehicle Maintenance</option>
                    <option>Shift / Scheduling</option>
                    <option>Route Obstruction</option>
                    <option>Passenger Incident</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Vehicle ID</label>
                  <input 
                    type="text" 
                    placeholder="e.g. AV-402" 
                    className="w-full bg-slate-50 border-transparent rounded-2xl p-4 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Description</label>
                  <textarea 
                    rows={4}
                    placeholder="Describe the problem..."
                    className="w-full bg-slate-50 border-transparent rounded-2xl p-4 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all outline-none resize-none"
                  />
                </div>

                <button type="submit" className="w-full flex items-center justify-center gap-3 bg-emerald-500 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-200 hover:bg-emerald-600 transition-all active:scale-95">
                  <Send size={16} /> Submit Ticket
                </button>
              </form>
            </div>
            {/* Decorative background shape */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-emerald-50 rounded-full blur-3xl opacity-50" />
          </section>

          {/* Pro-Tip Card */}
          <div className="bg-slate-900 rounded-[2.5rem] p-6 text-white relative overflow-hidden group">
            <div className="relative z-10 flex gap-4">
              <div className="p-3 bg-white/10 rounded-2xl text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500">
                <Lightbulb size={24} />
              </div>
              <div>
                <h5 className="font-black text-sm uppercase tracking-widest mb-1 italic">Pro Tip</h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Complete vehicle pre-checks <span className="text-white font-bold">15 mins</span> before shift start. Logs sync automatically to dispatch.
                </p>
              </div>
            </div>
            <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl" />
          </div>
        </aside>
      </main>
    </div>
  );
};

export default CommunicationsHelp;