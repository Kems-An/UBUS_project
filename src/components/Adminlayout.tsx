import React from 'react';
import { useLocation, Link, Outlet } from 'react-router-dom'; // Added Outlet
import { 
  LayoutDashboard, Users, Bus, Map, 
  CalendarCheck, CircleDollarSign, Settings, Zap 
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', icon: <LayoutDashboard size={20} />, to: '/dashboard/admin' },
  { label: 'Students', icon: <Users size={20} />, to: '/dashboard/admin/students' },
  { label: 'Fleet Status', icon: <Bus size={20} />, to: '/admin/fleet' },
  { label: 'Routes', icon: <Map size={20} />, to: '/admin/routes' },
  { label: 'Bookings', icon: <CalendarCheck size={20} />, to: '/admin/bookings' },
  { label: 'Financials', icon: <CircleDollarSign size={20} />, to: '/admin/financials' }, 
];

const AdminLayout: React.FC = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex font-sans text-slate-900">
      {/* Sidebar - Kept exactly as you had it */}
      <aside className="w-72 bg-slate-900 h-screen sticky top-0 hidden lg:flex flex-col p-6 text-slate-300">
        <div className="flex items-center gap-3 px-2 mb-10">
          <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20 text-white">
            <Zap size={24} fill="currentColor" />
          </div>
          <div>
            <h1 className="text-white font-black text-xl tracking-tighter leading-none">VELOCITY</h1>
            <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mt-1">Admin Command</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.label}
                to={item.to}
                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all ${
                  isActive 
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-6 border-t border-white/10">
          <div className="bg-white/5 p-4 rounded-[2rem] flex items-center gap-3 border border-white/5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center font-bold text-white uppercase tracking-tighter">
              JV
            </div>
            <div className="overflow-hidden">
              <p className="text-white font-bold text-xs truncate">Julian Vane</p>
              <p className="text-[10px] text-slate-500 font-bold uppercase truncate">Fleet Director</p>
            </div>
            <Settings size={16} className="ml-auto text-slate-500 cursor-pointer hover:text-white transition-colors" />
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <Outlet /> {/* YOUR DASHBOARD CONTENT RENDERS HERE */}
      </main>
    </div>
  );
};

export default AdminLayout;