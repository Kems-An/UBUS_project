import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  Bus, 
  UserCircle, 
  Bell, 
  LogOut,
  ShieldCheck
} from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Dashboard',      icon: <LayoutDashboard size={18} />, to: '/dashboard/driver' },
  { label: 'Routes',         icon: <Bus size={18} />,             to: '/dashboard/driver/routes' },
  { label: 'Profile',        icon: <UserCircle size={18} />,      to: '/dashboard/driver/profile' },
  { label: 'Communications', icon: <Bell size={18} />,            to: '/dashboard/driver/communicationshelp' },
];

export default function DriverLayout() {
  const { user, logout } = useAuth(); 
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-[var(--color-bg-soft)] font-sans text-[var(--color-text-main)]">
      {/* ── Sidebar (Refactored to match AdminLayout screen space structural footprint) ── */}
      <aside className="w-72 bg-white h-screen sticky top-0 z-40 hidden lg:flex flex-col p-6 border-r border-[var(--color-border)] shadow-sm">
        
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-2 mb-10">
          <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)] flex items-center justify-center text-white shadow-sm">
            <Bus size={20} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight text-[var(--color-primary-dark)] leading-none">UBUS</h1>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-primary)] mt-1.5 block">Driver Hub</span>
          </div>
        </div>

        {/* Navigation Links with Light Modern Underline Indicators */}
        <nav className="flex-1 space-y-4 pt-4">
          {NAV_ITEMS.map(({ label, icon, to }) => (
            <NavLink
              key={label}
              to={to}
              end={to === '/dashboard/driver'}
              className={({ isActive }) => `
                group relative flex items-center gap-3 py-2 text-sm font-bold tracking-tight transition-colors duration-300
                ${isActive 
                  ? 'text-[var(--color-primary-dark)]' 
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-primary-dark)]'}
              `}
            >
              {({ isActive }) => (
                <>
                  <span className="transition-transform duration-300 group-hover:scale-105 shrink-0 text-current">
                    {icon}
                  </span>
                  <span className="relative py-1">
                    {label}
                    {/* Premium Underline Indicator: Spans full width when active, transitions up from 0 width on hover */}
                    <span 
                      className={`absolute bottom-0 left-0 h-[2px] bg-[var(--color-primary)] transition-all duration-300 ease-out
                        ${isActive 
                          ? 'w-full opacity-100' 
                          : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                        }`} 
                    />
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* User Profile Card Footer */}
        <div className="mt-auto pt-6 border-t border-[var(--color-border)]">
          <div className="bg-[var(--color-bg-soft)] rounded-2xl p-5 border border-[var(--color-border)]">
            <div className="flex items-center gap-3 mb-5 min-w-0">
              <div className="w-10 h-10 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white font-black ring-4 ring-white shadow-xs shrink-0">
                 {user?.full_name?.charAt(0) || 'D'}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-black text-[var(--color-primary-dark)] truncate">
                  {user?.full_name || 'Driver Profile'}
                </p>
                <p className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-tight flex items-center gap-1 mt-0.5">
                  <ShieldCheck size={12} className="text-[var(--color-primary)] shrink-0" /> ID: #AV-902
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-3 text-xs font-black rounded-xl bg-white border border-[var(--color-border)] text-[var(--color-primary-dark)] hover:bg-[var(--color-bg-soft)] transition-all active:scale-98 shadow-2xs"
            >
              <LogOut size={14} strokeWidth={2.5} /> Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* ── Main Content Area ── */}
      <main className="flex-1 min-h-screen flex flex-col min-w-0 w-full">
        <div className="px-4 sm:px-6 md:px-10 py-10 w-full max-w-7xl mx-auto flex-1">
           <Outlet />
        </div>
      </main>
    </div>
  );
}