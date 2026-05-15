import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  Bus, 
  Ticket, 
  UserCircle, 
  Bell, 
  LifeBuoy, 
  LogOut,
  ShieldCheck
} from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Dashboard',     icon: <LayoutDashboard size={20} />, to: '/dashboard/driver' },
  { label: 'Routes',        icon: <Bus size={20} />,             to: '/dashboard/driver/routes' },
  { label: 'Profile',       icon: <UserCircle size={20} />,      to: '/dashboard/driver/profile' },
  { label: 'CommunicationsHelp', icon: <Bell size={20} />,            to: '/dashboard/driver/communicationshelp' },
  
];

export default function DriverLayout() {
  const { user, logout } = useAuth(); // Assuming 'driver' object in context 
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* ── Sidebar ── */}
      <aside className="w-72 fixed h-screen p-6 z-40 hidden lg:flex flex-col">
        <div className="flex flex-col h-full bg-white rounded-[2.5rem] border border-slate-200/60 shadow-xl shadow-slate-200/40 overflow-hidden">
          
          <div className="p-8">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#00623f] to-[#1c7c54] flex items-center justify-center text-white shadow-lg">
                <Bus size={24} strokeWidth={2.5} />
              </div>
              <div>
                <h1 className="text-xl font-black tracking-tight text-slate-800 leading-none">Velocity</h1>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Driver Hub</span>
              </div>
            </div>
          </div>

          <nav className="flex-1 px-4 space-y-1.5">
            {NAV_ITEMS.map(({ label, icon, to }) => (
              <NavLink
                key={label}
                to={to}
                end={to === '/dashboard/driver'}
                className={({ isActive }) => `
                  group flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-300
                  ${isActive 
                    ? 'bg-slate-900 text-white shadow-lg shadow-slate-300' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}
                `}
              >
                <span className="transition-transform duration-300 group-hover:scale-110">{icon}</span>
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="p-4 mt-auto">
            <div className="bg-slate-50 rounded-[2rem] p-5 border border-slate-100 shadow-inner">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-[#00623f] flex items-center justify-center text-white font-bold ring-4 ring-white">
                   {user?.full_name?.charAt(0) || 'M'}
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs font-bold text-slate-900 truncate">{user?.full_name || 'Marcus Chen'}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter flex items-center gap-1">
                    <ShieldCheck size={10} className="text-emerald-500" /> ID: #AV-902
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 py-3 text-xs font-bold rounded-xl bg-white border border-slate-200 text-rose-600 hover:bg-rose-50 transition-all active:scale-95 shadow-sm"
              >
                <LogOut size={16} /> Sign Out
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main Content Area ── */}
      <main className="flex-1 lg:ml-72 min-h-screen flex flex-col">
        <div className="px-10 py-10">
           <Outlet />
        </div>
      </main>
    </div>
  );
}