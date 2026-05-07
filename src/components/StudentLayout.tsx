import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
// Modern Icon Library
import { 
  LayoutDashboard, 
  Bus, 
  Ticket, 
  UserCircle, 
  Bell, 
  MessageCircle, 
  LogOut,
  Search,
  Menu,
  ShieldCheck
} from 'lucide-react';

/* ============================================================
   STUDENT LAYOUT
   - React Icons (Lucide) integration
   - Floating sidebar with glassmorphism
   - Comprehensive Logout functionality
   ============================================================ */

const NAV_ITEMS = [
  { label: 'Dashboard',     icon: <LayoutDashboard size={20} />, to: '/dashboard/student'           },
  { label: 'Routes',        icon: <Bus size={20} />,             to: '/dashboard/student/routes'        },
  { label: 'Bookings',      icon: <Ticket size={20} />,          to: '/dashboard/student/bookings'      },
  { label: 'Profile',       icon: <UserCircle size={20} />,      to: '/dashboard/student/profile'       },
  { label: 'Notifications', icon: <Bell size={20} />,            to: '/dashboard/student/notifications' },
  { label: 'Support',       icon: <MessageCircle size={20} />,   to: '/dashboard/student/support'       },
];

export default function StudentLayout() {
  const { student, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Determine active page title for the header
  const currentTitle = NAV_ITEMS.find(item => item.to === location.pathname)?.label || 'Overview';

  // Logout Logic
  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      
      {/* ── Sidebar ── */}
      <aside className="w-72 fixed h-300rem p-6 z-40 hidden lg:flex flex-col">
        <div className="flex flex-col h-full bg-white rounded-[2.5rem] border border-slate-200/60 shadow-xl shadow-slate-200/40 overflow-hidden">
          
          {/* Brand/Logo */}
          <div className="p-8">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[var(--color-primary-dark)] to-[var(--color-primary)] flex items-center justify-center text-white shadow-lg shadow-indigo-100">
                <Bus size={24} strokeWidth={2.5} />
              </div>
              <div>
                <h1 className="text-xl font-black tracking-tight text-slate-800 leading-none">Velocity</h1>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Campus Transit</span>
              </div>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 px-4 space-y-1.5">
            {NAV_ITEMS.map(({ label, icon, to }) => (
              <NavLink
                key={label}
                to={to}
                end={to === '/dashboard/student'}
                className={({ isActive }) => `
                  group flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-300
                  ${isActive 
                    ? 'bg-slate-900 text-white shadow-lg shadow-slate-300' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}
                `}
              >
                <span className="transition-transform duration-300 group-hover:scale-110">
                  {icon}
                </span>
                {label}
              </NavLink>
            ))}
          </nav>

          {/* User & Logout Section */}
          <div className="p-4 mt-auto">
            <div className="bg-slate-50 rounded-[2rem] p-5 border border-slate-100 shadow-inner">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white font-bold ring-4 ring-white shadow-sm">
                  {student?.name?.charAt(0) || 'S'}
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs font-bold text-slate-900 truncate">{student?.name || 'Student'}</p>
                  <div className="flex items-center gap-1">
                    <ShieldCheck size={10} className="text-emerald-500" />
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Verified</p>
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 py-3 text-xs font-bold rounded-xl bg-white border border-slate-200 text-rose-600 hover:bg-rose-50 hover:border-rose-200 transition-all active:scale-95 shadow-sm"
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main content area ── */}
      <main className="flex-1 lg:ml-72 min-h-screen flex flex-col">
        
        {/* Dynamic Glass Header */}
        <header className="h-20 flex items-center justify-between px-10 sticky top-0 bg-[#F8FAFC]/80 backdrop-blur-md z-30 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2.5 bg-white border border-slate-200 rounded-xl shadow-sm">
              <Menu size={20} className="text-slate-600" />
            </button>
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">{currentTitle}</h2>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-full shadow-sm mr-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold text-slate-500 uppercase">System Active</span>
            </div>
            <button className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm hover:bg-slate-50 transition-all">
              <Search size={18} className="text-slate-400" />
            </button>
          </div>
        </header>

        {/* Child Pages Content */}
        <div className="px-10 py-10">
           <Outlet />
        </div>
      </main>

    </div>
  );
}