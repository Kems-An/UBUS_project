import React from 'react';
import { 
  Users, Bus, CircleDollarSign, CalendarCheck, Search, Bell, 
  ArrowUpRight, ChevronRight, ShieldAlert, TrendingUp, Clock, MoreVertical 
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  return (
    /* Removed the outer flex/aside wrapper. Dashboard now uses full width of the <Outlet /> */
    <div className="p-4 lg:p-10 max-w-[1600px] mx-auto w-full">
      
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div className="relative w-full max-w-md group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search assets, routes, or students..." 
            className="w-full pl-14 pr-6 py-4 bg-white border-none rounded-[2rem] text-sm font-semibold shadow-sm focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none"
          />
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-slate-200/50">
            <button className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-black tracking-widest uppercase shadow-lg">Live</button>
            <button className="px-6 py-2.5 text-slate-400 text-xs font-black tracking-widest uppercase hover:text-slate-900 transition-colors">History</button>
          </div>
          <button className="relative p-4 bg-white rounded-2xl text-slate-600 shadow-sm border border-slate-200/50 hover:bg-slate-50 transition-all">
            <Bell size={20} />
            <span className="absolute top-3.5 right-3.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white animate-pulse"></span>
          </button>
        </div>
      </header>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <KPICard label="Total Students" value="12,482" trend="+12%" icon={<Users size={24} />} color="blue" />
        <KPICard label="Active Buses" value="42" total="/ 56" trend="Live" icon={<Bus size={24} />} color="emerald" isLive />
        <KPICard label="Today's Bookings" value="1,240" trend="Peak" icon={<CalendarCheck size={24} />} color="amber" />
        <KPICard label="Daily Revenue" value="$2,850" trend="+5.4%" icon={<CircleDollarSign size={24} />} color="slate" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
        <div className="lg:col-span-8 bg-white p-8 rounded-[3rem] shadow-sm border border-white">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h3 className="text-xl font-black tracking-tight">Network Utilization</h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Traffic Load Metrics</p>
            </div>
          </div>
          <div className="h-64 flex items-end justify-between gap-4 sm:gap-8 px-4">
            {[60, 85, 45, 95, 70, 30, 55, 80].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-4 group cursor-pointer h-full">
                <div className="w-full bg-slate-50 rounded-t-2xl relative overflow-hidden flex flex-col justify-end h-full">
                  <div className="bg-emerald-500/20 w-full group-hover:bg-emerald-500/40 transition-all duration-500 rounded-t-xl" style={{ height: `${height}%` }}></div>
                </div>
                <span className="text-[10px] font-black text-slate-400">{8 + i * 2}:00</span>
              </div>
            ))}
          </div>
        </div>

        {/* Incident Card */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-slate-900 p-8 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group flex-1">
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <ShieldAlert size={18} className="text-rose-500" />
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">Active Incident</h3>
                </div>
                <MoreVertical size={16} className="text-white/30 cursor-pointer" />
              </div>
              <h4 className="text-2xl font-black mb-4 leading-tight">East Gate<br/>Express Delay</h4>
              <p className="text-slate-400 text-xs font-medium mb-8 leading-relaxed">Traffic congestion at Main St. intersection. 3 standby vehicles deployed.</p>
              <button className="mt-auto w-full py-4 bg-emerald-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl">Control Map</button>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[3rem] shadow-sm overflow-hidden border border-white">
        <div className="p-8 flex justify-between items-center">
          <h3 className="text-xl font-black tracking-tight">Recent Activity</h3>
          <button className="flex items-center gap-2 text-xs font-black text-emerald-600 uppercase tracking-widest">Full History <ChevronRight size={16} /></button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] bg-slate-50/50">
                <th className="px-8 py-5">Passenger</th>
                <th className="px-8 py-5">Bus ID</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Fare</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <TableRow name="Elena Smith" id="SH-102" status="Completed" statusColor="emerald" />
              <TableRow name="Julian Weaver" id="SH-114" status="In Transit" statusColor="blue" />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

/* Sub-components kept exactly as you had them */
const KPICard = ({ label, value, trend, icon, color, total, isLive }: any) => {
  const colorMap: any = { blue: 'bg-blue-50 text-blue-600', emerald: 'bg-emerald-50 text-emerald-600', amber: 'bg-amber-50 text-amber-600', slate: 'bg-slate-900 text-white' };
  return (
    <div className="bg-white p-7 rounded-[2.5rem] shadow-sm border border-white hover:shadow-xl transition-all">
      <div className="flex justify-between items-start mb-6">
        <div className={`p-3.5 rounded-2xl ${colorMap[color]}`}>{icon}</div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 rounded-lg">
          {isLive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />}
          <span className="text-[10px] font-black text-slate-500 uppercase">{trend}</span>
        </div>
      </div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
      <h3 className="text-3xl font-black tracking-tight">{value} <span className="text-lg font-bold text-slate-300 ml-1">{total}</span></h3>
    </div>
  );
};

const TableRow = ({ name, id, status, statusColor }: any) => {
  const colors: any = { emerald: 'bg-emerald-50 text-emerald-600', blue: 'bg-blue-50 text-blue-600', rose: 'bg-rose-50 text-rose-600' };
  return (
    <tr className="hover:bg-slate-50/50 transition-colors group">
      <td className="px-8 py-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center font-black text-[11px] text-slate-500">{name[0]}</div>
          <span className="text-sm font-bold text-slate-900">{name}</span>
        </div>
      </td>
      <td className="px-8 py-6 text-sm font-black text-slate-400">{id}</td>
      <td className="px-8 py-6">
        <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${colors[statusColor]}`}>{status}</span>
      </td>
      <td className="px-8 py-6 text-right"><ArrowUpRight size={18} className="ml-auto text-slate-300" /></td>
    </tr>
  );
};

export default AdminDashboard;