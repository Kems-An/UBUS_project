import React from 'react';
import { useLocation, Link, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Bus, 
  Map, 
  CircleDollarSign, 
  Settings, 
  Zap 
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', icon: <LayoutDashboard size={18} />, to: '/dashboard/admin' },
  { label: 'Students', icon: <Users size={18} />, to: '/dashboard/admin/students' },
  { label: 'Driver', icon: <Bus size={18} />, to: '/dashboard/admin/drivers' },
  { label: 'Routes', icon: <Map size={18} />, to: '/dashboard/admin/routes' },
  { label: 'Financials', icon: <CircleDollarSign size={18} />, to: '/dashboard/admin/financials' }, 
];

const AdminLayout: React.FC = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[var(--color-bg-soft)] flex font-sans text-[var(--color-text-main)]">
      
      {/* ─── SIDEBAR ARCHITECTURE ─── */}
      <aside className="w-72 bg-white h-screen sticky top-0 hidden lg:flex flex-col p-6 border-r border-[var(--color-border)] shadow-sm">
        
        {/* Network Branding Header */}
        <div className="flex items-center gap-3 px-2 mb-10">
          <div className="w-10 h-10 bg-[var(--color-primary)] rounded-xl flex items-center justify-center shadow-md shadow-[var(--color-primary)]/10 text-white">
            <Zap size={20} fill="currentColor" />
          </div>
          <div>
            <h1 className="text-[var(--color-primary-dark)] font-black text-xl tracking-tighter leading-none">
              UBUS
            </h1>
            <p className="text-[10px] font-bold text-[var(--color-primary)] uppercase tracking-widest mt-1">
              Admin Matrix
            </p>
          </div>
        </div>

        {/* Navigation Registry Tree */}
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.label}
                to={item.to}
                className={`relative w-full flex items-center gap-4 px-4 py-3.5 font-bold text-sm transition-all group ${
                  isActive 
                    ? 'text-[var(--color-primary-dark)]' 
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-primary-dark)]'
                }`}
              >
                {/* Active Underline Asset Indicator */}
                {isActive && (
                  <span className="absolute bottom-0 left-4 right-4 h-[3px] bg-[var(--color-primary)] rounded-full animate-in fade-in slide-in-from-bottom-1 duration-200" />
                )}

                <span className={`transition-colors ${isActive ? 'text-[var(--color-primary)]' : 'text-[var(--color-primary)] opacity-60 group-hover:opacity-100'}`}>
                  {item.icon}
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Personnel Profile Operator Node */}
        <div className="mt-auto pt-6 border-t border-[var(--color-border)]">
          <div className="bg-[var(--color-bg-soft)] p-4 rounded-2xl flex items-center gap-3 border border-[var(--color-border)]">
            <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)] text-white flex items-center justify-center font-black text-sm tracking-tighter shadow-sm">
              AD
            </div>
            <div className="overflow-hidden">
              <p className="text-[var(--color-primary-dark)] font-extrabold text-xs truncate">
                System Administrator
              </p>
              <p className="text-[10px] text-[var(--color-text-muted)] font-bold uppercase tracking-wider mt-0.5 truncate">
                Root Access
              </p>
            </div>
            <Settings 
              size={15} 
              className="ml-auto text-[var(--color-text-muted)] cursor-pointer hover:text-[var(--color-primary-dark)] transition-colors" 
            />
          </div>
        </div>
      </aside>

      {/* ─── MOBILE BOTTOM BAR ─── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[var(--color-border)] flex justify-around items-center py-2 px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <Link
              key={item.label}
              to={item.to}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all text-[9px] font-black min-w-[60px] text-center ${
                isActive
                  ? 'text-[var(--color-primary-dark)]'
                  : 'text-[var(--color-text-muted)]'
              }`}
            >
              <span className={`transition-colors ${isActive ? 'text-[var(--color-primary-dark)]' : 'text-[var(--color-text-muted)] opacity-60'}`}>
                {item.icon}
              </span>
              <span className="truncate max-w-full">{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* ─── MAIN ROUTE CONTENT EXECUTION LAYER ─── */}
      <main className="flex-1 overflow-y-auto pb-24 lg:pb-0">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;