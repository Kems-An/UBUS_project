import React, { useState } from 'react';
import { useLocation, Link, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Bus, 
  Map, 
  CircleDollarSign, 
  Settings, 
  Zap,
  Menu,
  X,
  Globe
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', icon: <LayoutDashboard size={18} />, to: '/dashboard/admin' },
  { label: 'Students', icon: <Users size={18} />, to: '/dashboard/admin/students' },
  { label: 'Driver', icon: <Bus size={18} />, to: '/dashboard/admin/drivers' },
  { label: 'Shuttle', icon: <Bus size={18} />, to: '/dashboard/admin/shuttle-management' },
  { label: 'Routes', icon: <Map size={18} />, to: '/dashboard/admin/routes' },
  { label: 'Financials', icon: <CircleDollarSign size={18} />, to: '/dashboard/admin/financials' }, 
];

const EXTERNAL_NAV_ITEMS = [
  { label: 'Home',     to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact',  to: '/contact' },
];

const AdminLayout: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLandingLinksOpen, setIsLandingLinksOpen] = useState(false);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="min-h-screen bg-[var(--color-bg-soft)] flex font-sans text-[var(--color-text-main)]">
      
      {/* Mobile Drawer Slide Back Backdrop Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-[var(--color-primary-dark)]/20 backdrop-blur-xs z-[45] lg:hidden" onClick={closeMenu} />
      )}

      {/* ─── SIDEBAR ARCHITECTURE ─── */}
      <aside className={`
        w-72 bg-white h-screen fixed top-0 left-0 z-50 flex flex-col p-6 border-r border-[var(--color-border)] shadow-sm transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:sticky lg:flex
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        
        {/* Network Branding Header */}
        <div className="flex items-center justify-between px-2 mb-10">
          <div className="flex items-center gap-3">
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
          <button onClick={closeMenu} className="lg:hidden p-2 text-[var(--color-text-muted)] hover:text-[var(--color-primary-dark)]">
            <X size={18} />
          </button>
        </div>

        {/* Navigation Registry Tree */}
        <nav className="flex-1 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.label}
                to={item.to}
                onClick={closeMenu}
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
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[40] bg-white border-t border-[var(--color-border)] flex justify-around items-center py-2 px-2 overflow-x-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <Link
              key={item.label}
              to={item.to}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all text-[9px] font-black min-w-[55px] text-center ${
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

      {/* ─── MAIN CONTENT ARCHITECTURE CONTAINER ─── */}
      <div className="flex-1 flex flex-col min-w-0 w-full">
        {/* Top Header Row Panel */}
        <header className="h-20 flex items-center justify-between px-4 sm:px-6 md:px-10 sticky top-0 bg-[var(--color-bg-soft)]/80 backdrop-blur-md z-30 border-b border-[var(--color-border)]/40 w-full">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2.5 bg-white border border-[var(--color-border)] rounded-xl shadow-2xs text-[var(--color-primary-dark)] active:scale-95 transition-transform">
              <Menu size={18} />
            </button>
            <h2 className="text-xs font-black text-[var(--color-text-muted)] uppercase tracking-[0.2em]">Admin Portal</h2>
          </div>

          <div className="flex items-center gap-3 relative">
            {/* ── Shared Top Bar Portal Menu Trigger Dropdown ── */}
            <div className="relative">
              <button 
                onClick={() => setIsLandingLinksOpen(!isLandingLinksOpen)}
                className="h-9 px-3 gap-1.5 rounded-xl bg-white border border-[var(--color-border)] flex items-center justify-center shadow-2xs text-xs font-black text-[var(--color-primary-dark)] hover:bg-[var(--color-bg-soft)] transition-colors"
              >
                <Globe size={15} className="text-[var(--color-primary)]" />
                <span>Portal Menu</span>
              </button>

              {isLandingLinksOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsLandingLinksOpen(false)} />
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-[var(--color-border)] rounded-2xl shadow-xl p-2 z-50 flex flex-col gap-1">
                    {EXTERNAL_NAV_ITEMS.map((item) => (
                      <Link
                        key={item.label}
                        to={item.to}
                        className="w-full text-left px-4 py-2.5 text-xs font-black text-[var(--color-text-main)] hover:bg-[var(--color-bg-soft)] hover:text-[var(--color-primary-dark)] rounded-xl transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* ─── MAIN ROUTE CONTENT EXECUTION LAYER ─── */}
        <main className="flex-1 overflow-y-auto pb-24 lg:pb-0 px-4 sm:px-6 md:px-10 py-10 w-full max-w-7xl mx-auto">
          <Outlet />
        </main>
      </div>

    </div>
  );
};

export default AdminLayout;