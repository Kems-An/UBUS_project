import React from 'react';
import { 
  Users, 
  Bus, 
  CircleDollarSign, 
  CalendarCheck, 
  Search, 
  Bell, 
  ArrowUpRight, 
  ChevronRight, 
  ShieldAlert, 
  MoreVertical 
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  return (
    <div className="p-4 lg:p-10 max-w-[1600px] mx-auto w-full animate-in fade-in duration-300">
      
      {/* ─── HEADER CONTROLS LAYER ─── */}
      <header className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div className="relative w-full max-w-md group">
          <Search 
            className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] group-focus-within:text-[var(--color-primary)] transition-colors" 
            size={18} 
          />
          <input 
            type="text" 
            placeholder="Search assets, routes, or students..." 
            className="w-full pl-14 pr-6 py-4 bg-white border border-[var(--color-border)] rounded-2xl text-sm font-semibold shadow-sm focus:ring-4 focus:ring-[var(--color-primary)]/5 transition-all outline-none text-[var(--color-text-main)]"
          />
        </div>
        
        <div className="flex items-center gap-4 self-end md:self-auto">
          <div className="flex bg-white p-1 rounded-xl shadow-sm border border-[var(--color-border)]">
            <button className="px-6 py-2 bg-[var(--color-primary-dark)] text-white rounded-lg text-xs font-black tracking-widest uppercase shadow-sm">
              Live
            </button>
            <button className="px-6 py-2 text-[var(--color-text-muted)] text-xs font-black tracking-widest uppercase hover:text-[var(--color-primary-dark)] transition-colors">
              History
            </button>
          </div>
          <button className="relative p-3.5 bg-white rounded-xl text-[var(--color-text-muted)] shadow-sm border border-[var(--color-border)] hover:bg-[var(--color-bg-soft)] transition-all">
            <Bell size={18} />
            <span className="absolute top-3 right-3 w-2 h-2 bg-rose-500 rounded-full border-2 border-white animate-pulse" />
          </button>
        </div>
      </header>

      {/* ─── METRIC CARD LEDGER ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <KPICard label="Total Students" value="12,482" trend="+12%" icon={<Users size={22} />} variant="primary" />
        <KPICard label="Active Buses" value="42" total="/ 56" trend="Live" icon={<Bus size={22} />} variant="secondary" isLive />
        <KPICard label="Today's Bookings" value="1,240" trend="Peak" icon={<CalendarCheck size={22} />} variant="primary" />
        <KPICard label="Daily Revenue" value="2,850 FCFA" trend="+5.4%" icon={<CircleDollarSign size={22} />} variant="dark" />
      </div>

      {/* ─── METRICS & DISPATCH OVERVIEW ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">
        
        {/* Utilization Column Chart */}
        <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-[var(--color-border)]">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="text-xl font-black tracking-tight text-[var(--color-primary-dark)]">Network Utilization</h3>
              <p className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest mt-1">Traffic Load Metrics</p>
            </div>
          </div>
          <div className="h-64 flex items-end justify-between gap-3 sm:gap-6 px-2">
            {[60, 85, 45, 95, 70, 30, 55, 80].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-3 group cursor-pointer h-full">
                <div className="w-full bg-[var(--color-bg-soft)] rounded-t-xl relative overflow-hidden flex flex-col justify-end h-full">
                  <div 
                    className="bg-[var(--color-primary)] opacity-20 group-hover:opacity-40 transition-all duration-300 rounded-t-lg" 
                    style={{ height: `${height}%` }}
                  />
                </div>
                <span className="text-[10px] font-bold text-[var(--color-text-muted)]">{8 + i * 2}:00</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tactical Incident Node */}
        <div className="lg:col-span-4 flex flex-col">
          <div className="bg-[var(--color-primary-dark)] p-6 sm:p-8 rounded-2xl text-white shadow-md relative overflow-hidden flex flex-col h-full justify-between">
            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <ShieldAlert size={16} className="text-rose-400" />
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-white/50">Active System Alert</h3>
                </div>
                <MoreVertical size={16} className="text-white/30 cursor-pointer hover:text-white transition-colors" />
              </div>
              <h4 className="text-2xl font-black tracking-tight mb-3 leading-tight">
                East Gate<br />Express Delay
              </h4>
              <p className="text-white/70 text-xs font-medium leading-relaxed">
                Traffic congestion at Main St. intersection nodes. 3 standby fleet assets deployed to track.
              </p>
            </div>
            <button className="mt-8 w-full py-3.5 bg-[var(--color-primary)] text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-md transition-transform active:scale-98">
              Open Control Map
            </button>
          </div>
        </div>
      </div>

      {/* ─── DATA LEDGER ROUTE ENTRIES ─── */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-[var(--color-border)]">
        <div className="p-6 sm:p-8 flex justify-between items-center border-b border-[var(--color-border)]">
          <div>
            <h3 className="text-xl font-black tracking-tight text-[var(--color-primary-dark)]">Recent Network Activity</h3>
            <p className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest mt-0.5">Real-time entry stream</p>
          </div>
          <button className="flex items-center gap-1 text-xs font-black text-[var(--color-primary)] uppercase tracking-widest transition-transform hover:translate-x-0.5">
            Full History <ChevronRight size={14} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[10px] font-black text-[var(--color-text-muted)] uppercase tracking-widest bg-[var(--color-bg-soft)] border-b border-[var(--color-border)]">
                <th className="px-8 py-4 font-black">Passenger Profile</th>
                <th className="px-8 py-4 font-black">Fleet Asset ID</th>
                <th className="px-8 py-4 font-black">Network Status</th>
                <th className="px-8 py-4 font-black text-right">Telemetry Matrix</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              <TableRow name="Elena Smith" id="SH-102" status="Completed" variant="success" />
              <TableRow name="Julian Weaver" id="SH-114" status="In Transit" variant="info" />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

/* ─── REGISTRY DESIGN PATTERNS ─── */

interface KPICardProps {
  label: string;
  value: string;
  trend: string;
  icon: React.ReactNode;
  variant: 'primary' | 'secondary' | 'dark';
  total?: string;
  isLive?: boolean;
}

const KPICard = ({ label, value, trend, icon, variant, total, isLive }: KPICardProps) => {
  const stylesMap = {
    primary: 'bg-[var(--color-bg-soft)] text-[var(--color-primary)] border-[var(--color-border)]',
    secondary: 'bg-[var(--color-secondary-light)] text-[var(--color-primary-dark)] border-[var(--color-border)]',
    dark: 'bg-[var(--color-primary-dark)] text-white border-transparent'
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-[var(--color-border)] transition-all duration-300 hover:shadow-md">
      <div className="flex justify-between items-start mb-6">
        <div className={`p-3 rounded-xl border ${stylesMap[variant]}`}>
          {icon}
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[var(--color-bg-soft)] rounded-md border border-[var(--color-border)]">
          {isLive && <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] animate-pulse" />}
          <span className="text-[9px] font-black text-[var(--color-text-muted)] uppercase tracking-wider">{trend}</span>
        </div>
      </div>
      <p className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest mb-1">{label}</p>
      <h3 className="text-2xl font-black tracking-tight text-[var(--color-primary-dark)]">
        {value} 
        {total && <span className="text-sm font-bold text-[var(--color-text-muted)] ml-1">{total}</span>}
      </h3>
    </div>
  );
};

interface TableRowProps {
  name: string;
  id: string;
  status: string;
  variant: 'success' | 'info';
}

const TableRow = ({ name, id, status, variant }: TableRowProps) => {
  const statusStyles = {
    success: 'bg-[var(--color-secondary-light)] text-[var(--color-primary-dark)]',
    info: 'bg-[var(--color-bg-soft)] text-[var(--color-primary)] border border-[var(--color-border)]'
  };

  return (
    <tr className="hover:bg-[var(--color-bg-soft)]/50 transition-colors group">
      <td className="px-8 py-5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[var(--color-bg-soft)] border border-[var(--color-border)] flex items-center justify-center font-black text-xs text-[var(--color-primary)]">
            {name.charAt(0)}
          </div>
          <span className="text-sm font-bold text-[var(--color-primary-dark)]">{name}</span>
        </div>
      </td>
      <td className="px-8 py-5 text-sm font-extrabold text-[var(--color-text-muted)]">{id}</td>
      <td className="px-8 py-5">
        <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${statusStyles[variant]}`}>
          {status}
        </span>
      </td>
      <td className="px-8 py-5 text-right">
        <ArrowUpRight size={16} className="ml-auto text-[var(--color-text-muted)] opacity-60 group-hover:opacity-100 group-hover:text-[var(--color-primary)] transition-all" />
      </td>
    </tr>
  );
};

export default AdminDashboard;