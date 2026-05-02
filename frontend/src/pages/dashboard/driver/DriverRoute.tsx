import { useAuth } from '../../../context/AuthContext';
import { 
  Navigation, 
  CheckCircle2, 
  Calendar, 
  Search, 
  Map as MapIcon, 
  Clock, 
  Bus, 
  MapPin,
  ChevronRight,
  Info,
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
  const { driver } = useAuth();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Top Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Daily Schedule</h2>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mt-1">Monday, Oct 21, 2024</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-white border border-slate-100 rounded-2xl flex items-center gap-3 shadow-sm">
            <div className="w-2 h-2 rounded-full bg-[#4f6600] animate-pulse" />
            <span className="text-xs font-black text-[#4f6600] uppercase tracking-tighter">On-duty</span>
          </div>
          <button className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-slate-600 transition-colors">
            <Search size={20} />
          </button>
        </div>
      </header>

      {/* Hero Assignment Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2 bg-[#00623f] text-white rounded-[2.5rem] p-10 relative overflow-hidden flex flex-col justify-between min-h-[250px] shadow-xl shadow-emerald-900/10">
          <div className="relative z-10">
            <span className="text-[10px] font-black tracking-[0.2em] bg-white/20 px-4 py-1.5 rounded-full uppercase">
              Current Assignment
            </span>
            <h3 className="text-4xl font-black mt-6 tracking-tight">North-South Connector</h3>
            <p className="mt-3 text-emerald-100 flex items-center gap-2 font-bold text-sm">
              <Bus size={18} /> Shuttle ID: {driver?.fleetId || 'SH-102'}
            </p>
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 mt-8">
            <div>
              <p className="text-xs font-bold text-emerald-200/60 uppercase tracking-widest mb-1">Next Stop</p>
              <p className="text-xl font-black">Engineering Quad (Gate B)</p>
            </div>
            <button className="bg-white text-[#00623f] font-black px-8 py-4 rounded-2xl shadow-lg hover:scale-105 transition-all text-sm flex items-center gap-2">
              <MapIcon size={18} /> View Live Map
            </button>
          </div>
          <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        </div>

        <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 flex flex-col justify-between shadow-sm">
          <div>
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Today's Progress</h4>
            <div className="flex items-center justify-between mb-3">
              <span className="text-4xl font-black text-slate-900">3 / 5</span>
              <span className="text-xs font-black text-[#4f6600] bg-[#cfef7a]/30 px-3 py-1 rounded-full">60% DONE</span>
            </div>
            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
              <div className="bg-[#00623f] h-full rounded-full transition-all duration-1000" style={{ width: '60%' }} />
            </div>
          </div>
          <div className="mt-8 flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <div className="p-3 bg-white text-[#4f6600] rounded-xl shadow-sm">
              <Clock size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase">Remaining Time</p>
              <p className="text-lg font-black text-slate-900">04h 22m</p>
            </div>
          </div>
        </div>
      </section>

      {/* Route Schedule List */}
      <section className="space-y-6">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-black text-slate-900">Route Schedule</h3>
          <div className="flex p-1 bg-slate-100 rounded-xl">
            <button className="px-5 py-2 text-xs font-black rounded-lg bg-white shadow-sm text-slate-900">All Routes</button>
            <button className="px-5 py-2 text-xs font-black rounded-lg text-slate-500 hover:text-slate-700 transition-colors">Upcoming</button>
          </div>
        </div>

        <div className="space-y-4">
          {ROUTES.map((route) => (
            <div 
              key={route.id} 
              className={`group bg-white p-6 rounded-[2rem] border transition-all duration-300 flex flex-col md:flex-row md:items-center gap-6 
                ${route.isActive ? 'border-emerald-200 shadow-xl shadow-emerald-900/5 ring-1 ring-emerald-100' : 'border-slate-100 hover:bg-slate-50'}`}
            >
              <div className="flex-shrink-0">
                <div className={`w-16 h-16 rounded-[1.25rem] flex items-center justify-center transition-transform group-hover:scale-110 
                  ${route.isCompleted ? 'bg-slate-100 text-slate-400' : route.isActive ? 'bg-emerald-50 text-[#00623f]' : 'bg-slate-50 text-slate-900'}`}>
                  {route.isCompleted ? <CheckCircle2 size={32} /> : <Navigation size={32} />}
                </div>
              </div>

              <div className="flex-grow">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className={`text-xl font-black tracking-tight ${route.isCompleted ? 'text-slate-400 line-through decoration-2' : 'text-slate-900'}`}>
                    {route.title}
                  </h4>
                  <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest
                    ${route.isCompleted ? 'bg-slate-100 text-slate-400' : route.isActive ? 'bg-[#cfef7a] text-[#4f6600]' : 'bg-[#9bf5c4] text-[#005234]'}`}>
                    {route.status}
                  </span>
                </div>
                <div className="flex flex-wrap gap-5 text-xs font-bold text-slate-500">
                  <span className="flex items-center gap-1.5"><Clock size={14} className={route.isActive ? 'text-[#00623f]' : ''} /> {route.time}</span>
                  <span className="flex items-center gap-1.5"><MapPin size={14} className={route.isActive ? 'text-[#00623f]' : ''} /> {route.stops} Stops</span>
                  <span className="flex items-center gap-1.5"><Bus size={14} className={route.isActive ? 'text-[#00623f]' : ''} /> {route.shuttle}</span>
                </div>
              </div>

              <div className="md:ml-auto">
                {route.isCompleted ? (
                  <button className="px-6 py-3 rounded-2xl border border-slate-200 text-slate-400 font-black text-xs cursor-not-allowed">View Log</button>
                ) : (
                  <button className={`px-6 py-3 rounded-2xl font-black text-xs shadow-md transition-all active:scale-95
                    ${route.isActive ? 'bg-[#00623f] text-white shadow-emerald-900/20' : 'bg-slate-900 text-white'}`}>
                    View Route Details
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Traffic Context Map Section */}
      <section className="mt-12 rounded-[3rem] overflow-hidden relative h-[350px] border border-slate-100 shadow-inner group">
        <img 
          src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=2066&auto=format&fit=crop" 
          alt="University Map" 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 grayscale opacity-40" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
        
        <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/80 backdrop-blur-xl rounded-[2rem] flex items-center justify-between border border-white/50 shadow-2xl">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-[#00623f] rounded-2xl flex items-center justify-center text-white shadow-lg">
              <MapIcon size={24} />
            </div>
            <div>
              <h5 className="font-black text-slate-900 text-lg">Campus Traffic Status</h5>
              <p className="text-sm text-[#4f6600] font-black uppercase tracking-tighter">Clear - All routes on time</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-4">
             <div className="flex -space-x-3">
                {[1,2,3].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-slate-200" />
                ))}
                <div className="w-10 h-10 rounded-full bg-slate-900 border-4 border-white flex items-center justify-center text-[10px] font-black text-white">+12</div>
             </div>
             <button className="p-3 bg-white rounded-xl shadow-sm border border-slate-100 text-slate-400 hover:text-slate-900 transition-colors">
               <ExternalLink size={20} />
             </button>
          </div>
        </div>
      </section>
    </div>
  );
}