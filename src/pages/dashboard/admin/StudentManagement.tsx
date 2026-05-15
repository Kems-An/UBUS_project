import React, { useState } from 'react';
import { 
  TrendingUp, 
  Users, 
  Bus, 
  CalendarCheck, 
  Wallet, 
  ArrowUpRight,  
  Clock, 
  AlertCircle, 
  MoreHorizontal,
  ChevronRight,
  MapPin
} from 'lucide-react';

const StudentsManagement: React.FC = () => {
  const [timeframe, setTimeframe] = useState('Today');

  return (
    <div className="flex-1 p-8 space-y-10 animate-in fade-in duration-700">
      
      {/* --- Page Header --- */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div className="space-y-1">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">
            Operational <span className="text-emerald-600">Overview</span>
          </h2>
          <p className="text-slate-500 font-medium">
            Real-time performance metrics for the Academic Velocity shuttle network.
          </p>
        </div>

        {/* Segmented Control */}
        <div className="flex bg-slate-200/50 p-1.5 rounded-2xl border border-slate-200">
          {['Today', 'Week', 'Month'].map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`px-6 py-2 text-xs font-bold rounded-xl transition-all ${
                timeframe === t 
                ? "bg-white text-slate-900 shadow-sm" 
                : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* --- KPI Grid (Bento Style) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Students" 
          value="12,482" 
          trend="+15%" 
          icon={<Users size={22} />} 
          color="emerald" 
        />
        <StatCard 
          title="Active Drivers" 
          value="42" 
          subValue="/ 56" 
          trend="Live" 
          icon={<Bus size={22} />} 
          color="slate" 
          isLive
        />
        <StatCard 
          title="Bookings" 
          value="1,240" 
          subValue="82% Cap." 
          icon={<CalendarCheck size={22} />} 
          color="emerald" 
        />
        <StatCard 
          title="Total Revenue" 
          value="$24,850" 
          icon={<Wallet size={22} />} 
          color="dark" 
        />
      </div>

      {/* --- Visualization Section --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Chart Area */}
        <div className="lg:col-span-8 bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="flex justify-between items-center mb-10 relative z-10">
            <div>
              <h3 className="font-bold text-xl text-slate-900">Shuttle Utilization</h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Passenger load over time</p>
            </div>
            <button className="p-2 hover:bg-slate-50 rounded-xl transition-colors">
              <MoreHorizontal className="text-slate-400" />
            </button>
          </div>

          {/* Simulated Chart Bars */}
          <div className="h-64 flex items-end justify-between gap-4 relative z-10">
            {[40, 75, 55, 90, 65, 30, 80].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-4 group/bar">
                <div className="w-full bg-slate-50 rounded-2xl relative h-full flex flex-col justify-end overflow-hidden">
                  <div 
                    className="bg-emerald-500/20 group-hover/bar:bg-emerald-500/40 transition-all duration-500 rounded-t-xl" 
                    style={{ height: `${height}%` }}
                  >
                    <div className="h-1 w-full bg-emerald-500 opacity-0 group-hover/bar:opacity-100 transition-opacity" />
                  </div>
                </div>
                <span className="text-[10px] font-black text-slate-400">{8 + i * 2}:00</span>
              </div>
            ))}
          </div>
          {/* Decorative Background Element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50/50 rounded-full blur-[100px] -mr-32 -mt-32" />
        </div>

        {/* Route Status Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden h-full flex flex-col">
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-emerald-400 mb-6">
                <AlertCircle size={18} />
                <span className="text-xs font-black uppercase tracking-[0.2em]">Live Insights</span>
              </div>
              <h3 className="text-2xl font-bold leading-tight mb-6">Route Optimization Recommended</h3>
              
              <div className="space-y-4">
                <RouteMiniCard name="East Gate Express" status="Critical" delay="+12m" />
                <RouteMiniCard name="Science Hall" status="Normal" delay="On Time" />
              </div>
            </div>
            
            <button className="mt-auto relative z-10 w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all active:scale-95 shadow-xl shadow-emerald-500/20">
              Dispatch Standby
            </button>
            <div className="absolute -right-16 -bottom-16 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl" />
          </div>
        </div>
      </div>

      {/* --- Recent Bookings Table --- */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-10 py-8 flex justify-between items-center border-b border-slate-50">
          <h3 className="font-bold text-xl text-slate-900">Recent Bookings</h3>
          <button className="group flex items-center gap-2 text-xs font-black text-emerald-600 uppercase tracking-widest">
            Full Registry <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Student</th>
                <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Route Path</th>
                <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Fare</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <TableRow name="Elena Smith" route="Academic Core → Science Hall" status="Completed" />
              <TableRow name="Julian Weaver" route="Sports Complex → West Dorm" status="In Transit" />
              <TableRow name="Marcus Reed" route="Main Library → North Campus" status="Delayed" />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// --- Sub-Components ---

const StatCard = ({ title, value, trend, subValue, icon, color, isLive }: any) => {
  const themes: any = {
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
    slate: "bg-slate-50 text-slate-600 border-slate-100",
    dark: "bg-slate-900 text-white border-slate-800",
  };

  return (
    <div className={`p-7 rounded-[2rem] border bg-white shadow-sm hover:shadow-md transition-all group`}>
      <div className="flex justify-between items-start mb-6">
        <div className={`p-3 rounded-2xl ${themes[color] || themes.slate}`}>
          {icon}
        </div>
        {trend && (
          <span className={`flex items-center gap-1 text-[10px] font-black px-2.5 py-1 rounded-lg ${isLive ? 'bg-emerald-500 text-white animate-pulse' : 'bg-slate-100 text-slate-500'}`}>
            {trend}
          </span>
        )}
      </div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{title}</p>
      <div className="flex items-baseline gap-2">
        <h3 className="text-3xl font-black text-slate-900 tracking-tight">{value}</h3>
        {subValue && <span className="text-sm font-bold text-slate-300">{subValue}</span>}
      </div>
    </div>
  );
};

const RouteMiniCard = ({ name, status, delay }: any) => (
  <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex items-center justify-between group hover:bg-white/10 transition-colors cursor-default">
    <div className="flex items-center gap-3">
      <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400">
        <MapPin size={14} />
      </div>
      <div>
        <p className="text-xs font-bold">{name}</p>
        <p className="text-[10px] text-slate-400 font-medium">{delay}</p>
      </div>
    </div>
    <span className={`text-[10px] font-black px-2 py-1 rounded ${status === 'Critical' ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
      {status}
    </span>
  </div>
);

const TableRow = ({ name, route, status }: any) => (
  <tr className="hover:bg-slate-50/50 transition-colors group">
    <td className="px-10 py-5">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center font-black text-xs text-slate-500">
          {name.split(' ').map((n:any) => n[0]).join('')}
        </div>
        <span className="text-sm font-bold text-slate-700">{name}</span>
      </div>
    </td>
    <td className="px-10 py-5 text-sm font-medium text-slate-500">{route}</td>
    <td className="px-10 py-5">
      <span className={`px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest ${
        status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 
        status === 'Delayed' ? 'bg-rose-50 text-rose-600' : 'bg-blue-50 text-blue-600'
      }`}>
        {status}
      </span>
    </td>
    <td className="px-10 py-5 text-right">
      <button className="p-2 text-slate-300 hover:text-slate-900 transition-colors">
        <ArrowUpRight size={18} />
      </button>
    </td>
  </tr>
);

export default StudentsManagement;