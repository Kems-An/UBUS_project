import { 
  BatteryFull, 
  Users, 
  ShieldCheck, 
  PlayCircle, 
  AlertTriangle, 
  Map as MapIcon, 
  ChevronRight, 
  Clock,
  Info,
  Mail
} from 'lucide-react';

export default function DriverDashboard() {
  return (
    <div className="animate-in fade-in duration-700">
      {/* Header */}
      <header className="mb-10 flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <p className="text-[10px] font-black text-[#1b512d] uppercase tracking-[0.2em] mb-2">GOOD MORNING, MARCUS</p>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-none">Ready for Route 4A?</h2>
        </div>
        <div className="flex gap-4">
          <div className="px-5 py-3 bg-white border border-slate-100 rounded-2xl shadow-sm">
            <p className="text-[9px] text-slate-400 font-bold uppercase mb-1">Shift Starts</p>
            <p className="text-sm font-black text-slate-900">08:45 AM</p>
          </div>
          <div className="px-5 py-3 bg-white border border-slate-100 rounded-2xl shadow-sm">
            <p className="text-[9px] text-emerald-500 font-bold uppercase mb-1">Weather</p>
            <p className="text-sm font-black text-slate-900">68°F Clear</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Assigned Shuttle Card */}
        <div className="lg:col-span-8 bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm relative overflow-hidden flex flex-col md:flex-row items-center gap-8 group">
          <div className="relative z-10 flex-1">
            <span className="px-3 py-1 bg-[#cfef7a] text-[#546d00] text-[10px] font-black rounded-full mb-4 inline-block uppercase tracking-wider">
              Assigned Fleet
            </span>
            <h3 className="text-3xl font-black text-slate-900 mb-2">Emerald Express #88</h3>
            <p className="text-slate-500 text-sm mb-8 max-w-xs font-medium leading-relaxed">
              2023 Electric Volvo G-Series. Inspected & charged to 94%.
            </p>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <BatteryFull size={20} className="text-[#00623f] mb-2" />
                <p className="text-[10px] font-bold text-slate-400 uppercase">Range</p>
                <p className="text-lg font-black text-slate-900">142 mi</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <Users size={20} className="text-[#00623f] mb-2" />
                <p className="text-[10px] font-bold text-slate-400 uppercase">Capacity</p>
                <p className="text-lg font-black text-slate-900">42 Seats</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <ShieldCheck size={20} className="text-[#00623f] mb-2" />
                <p className="text-[10px] font-bold text-slate-400 uppercase">Safety</p>
                <p className="text-lg font-black text-slate-900">Clear</p>
              </div>
            </div>
          </div>
          <div className="flex-1 relative h-64 w-full">
            <img 
              src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2070&auto=format&fit=crop" 
              alt="Electric Shuttle"
              className="w-full h-full object-cover rounded-3xl group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Quick Operations */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-[#00623f] p-8 rounded-[2.5rem] text-white shadow-xl shadow-[#00623f]/20 relative overflow-hidden group">
            <h4 className="font-black text-xl mb-6">Shift Operations</h4>
            <div className="flex flex-col gap-3">
              <button className="w-full py-4 bg-white text-[#00623f] rounded-2xl font-black text-sm flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform">
                <PlayCircle size={20} /> Start Active Shift
              </button>
              <button className="w-full py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl font-black text-sm flex items-center justify-center gap-3 hover:bg-white/20">
                <AlertTriangle size={20} /> Report Issue
              </button>
            </div>
          </div>
          
          <div className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-sm">
            <h4 className="font-black text-lg mb-6 text-slate-900">System Status</h4>
            <div className="space-y-4">
              {[
                { label: 'Fleet Network', status: 'Optimal', color: 'bg-emerald-500' },
                { label: 'GPS Signal', status: 'Strong', color: 'bg-emerald-500' },
                { label: 'Main St. Traffic', status: 'High Delay', color: 'bg-rose-500' },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${item.color}`} />
                    <span className="text-xs font-bold text-slate-600">{item.label}</span>
                  </div>
                  <span className={`text-[10px] font-black uppercase ${item.status === 'High Delay' ? 'text-rose-500' : 'text-slate-400'}`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Route Timeline & Map */}
        <div className="lg:col-span-12 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm overflow-hidden flex flex-col lg:flex-row h-auto lg:h-[450px]">
          <div className="w-full lg:w-1/2 p-10 overflow-y-auto border-r border-slate-50">
            <div className="mb-8">
              <h4 className="text-xl font-black text-slate-900">Upcoming Run: Route 4A</h4>
              <p className="text-slate-400 text-sm font-bold uppercase tracking-tighter">Departs in 18 minutes</p>
            </div>
            
            <div className="space-y-10 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
              {[
                { stop: 'Central Library Depot', time: '08:45 AM', sub: 'Gate 14B', badge: '12 Boarding', active: true },
                { stop: 'Engineering Quad', time: '08:58 AM', sub: 'North Entrance', badge: '8 Waiting', active: false },
                { stop: 'Stadium South Lot', time: '09:12 AM', sub: 'Commuter Station', badge: 'Terminus', active: false },
              ].map((stop, i) => (
                <div key={i} className="relative pl-10">
                  <div className={`absolute left-0 top-1 w-6 h-6 rounded-full border-4 border-white shadow-sm z-10 ${stop.active ? 'bg-[#00623f]' : 'bg-slate-200'}`} />
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className={`font-bold text-lg ${stop.active ? 'text-slate-900' : 'text-slate-400'}`}>{stop.stop}</h5>
                      <p className="text-xs text-slate-400 font-medium">{stop.sub}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-black text-sm ${stop.active ? 'text-[#00623f]' : 'text-slate-400'}`}>{stop.time}</p>
                      <span className="bg-slate-50 text-slate-500 text-[9px] px-2 py-1 rounded-lg font-black uppercase tracking-tighter">{stop.badge}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 relative min-h-[300px] bg-slate-100">
            <img 
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop" 
              className="w-full h-full object-cover grayscale opacity-50" 
              alt="Campus Map" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 bg-white/80 backdrop-blur-md p-5 rounded-2xl shadow-xl flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="bg-[#00623f] w-10 h-10 rounded-xl flex items-center justify-center text-white">
                  <MapIcon size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Live Traffic</p>
                  <p className="text-sm font-black text-slate-900">Clear to Quad</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 bg-white rounded-xl shadow-sm hover:bg-slate-50 transition-colors border border-slate-100"><Clock size={16} /></button>
                <button className="p-2 bg-white rounded-xl shadow-sm hover:bg-slate-50 transition-colors border border-slate-100"><Info size={16} /></button>
              </div>
            </div>
          </div>
        </div>

        {/* Dispatch Comms */}
        <div className="lg:col-span-12 bg-white border border-slate-100 p-10 rounded-[2.5rem] shadow-sm">
          <h4 className="text-xl font-black text-slate-900 mb-8">Dispatch Comms</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="flex gap-5 p-6 rounded-[1.5rem] bg-emerald-50/50 border border-emerald-100 transition-all hover:shadow-md shadow-emerald-100/20">
                <div className="w-12 h-12 rounded-2xl bg-[#cfef7a] flex items-center justify-center text-[#546d00] shrink-0">
                  <Info size={24} />
                </div>
                <div>
                  <p className="text-sm font-black text-slate-900">New Route Adjustment</p>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed mt-1">Construction on Elm St. Use 4th Ave bypass until further notice.</p>
                  <p className="text-[10px] text-emerald-600 font-black mt-3 uppercase tracking-tighter">12 MIN AGO</p>
                </div>
             </div>
             <div className="flex gap-5 p-6 rounded-[1.5rem] bg-slate-50 border border-slate-100 transition-all hover:shadow-md">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-slate-400 shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-sm font-black text-slate-900">Shift Confirmation</p>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed mt-1">Your weekend overtime request has been approved by Dispatch.</p>
                  <p className="text-[10px] text-slate-400 font-black mt-3 uppercase tracking-tighter">2 HOURS AGO</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}