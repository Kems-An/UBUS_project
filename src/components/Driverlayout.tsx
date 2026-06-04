import { useState } from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import NotificationBell from './NotificationBell';
import { useDriverNotifications } from '../hooks/useNotifications';
import { 
  LayoutDashboard, 
  Bus, 
  UserCircle, 
  Bell, 
  LogOut,
  ShieldCheck,
  Menu,
  X,
  Globe
} from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Dashboard',      icon: <LayoutDashboard size={18} />, to: '/dashboard/driver' },
  { label: 'Routes',         icon: <Bus size={18} />,             to: '/dashboard/driver/routes' },
  { label: 'Profile',        icon: <UserCircle size={18} />,      to: '/dashboard/driver/profile' },
  { label: 'Communications', icon: <Bell size={18} />,            to: '/dashboard/driver/communicationshelp' },
];

const EXTERNAL_NAV_ITEMS = [
  { label: 'Home',     to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact',  to: '/contact' },
];

export default function DriverLayout() {
  const { user, logout } = useAuth(); 
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLandingLinksOpen, setIsLandingLinksOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const { notifications, unreadCount, markAllRead, dismiss } = useDriverNotifications();

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const confirmLogout = () => {
    setIsLogoutModalOpen(false);
    logout();
    navigate('/login');
  };

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="flex min-h-screen bg-[var(--color-bg-soft)] font-sans text-[var(--color-text-main)]">
      
      {/* ── Mobile Sidebar Menu Overlay Background Layer ── */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-[var(--color-primary-dark)]/20 backdrop-blur-xs z-[45] lg:hidden" onClick={closeMenu} />
      )}

      {/* ── Sidebar Component (Now supports fully responsive toggle states) ── */}
      <aside className={`
        w-72 fixed top-0 left-0 h-screen bg-white border-r border-[var(--color-border)] shadow-sm z-50 transition-transform duration-300 ease-in-out flex flex-col p-6
        lg:translate-x-0 lg:sticky lg:flex
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        
        {/* Brand Header */}
        <div className="flex items-center justify-between px-2 mb-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)] flex items-center justify-center text-white shadow-sm">
              <Bus size={20} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight text-[var(--color-primary-dark)] leading-none">UBUS</h1>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-primary)] mt-1.5 block">Driver Hub</span>
            </div>
          </div>
          <button onClick={closeMenu} className="lg:hidden p-2 text-[var(--color-text-muted)] hover:text-[var(--color-primary-dark)]">
            <X size={18} />
          </button>
        </div>

        {/* Navigation Links with Light Modern Underline Indicators */}
        <nav className="flex-1 space-y-4 pt-4 overflow-y-auto">
          {NAV_ITEMS.map(({ label, icon, to }) => (
            <NavLink
              key={label}
              to={to}
              onClick={closeMenu}
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
                    {/* Premium Underline Indicator */}
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
              onClick={handleLogoutClick}
              className="w-full flex items-center justify-center gap-2 py-3 text-xs font-black rounded-xl bg-white border border-[var(--color-border)] text-[var(--color-primary-dark)] hover:bg-[var(--color-bg-soft)] transition-all active:scale-98 shadow-2xs"
            >
              <LogOut size={14} strokeWidth={2.5} /> Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* ── Main Content Area ── */}
      <main className="flex-1 min-h-screen flex flex-col min-w-0 w-full pb-24 lg:pb-0">
        <header className="h-20 flex items-center justify-between px-4 sm:px-6 md:px-10 sticky top-0 bg-[var(--color-bg-soft)]/80 backdrop-blur-md z-30 border-b border-[var(--color-border)]/40">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2.5 bg-white border border-[var(--color-border)] rounded-xl shadow-2xs text-[var(--color-primary-dark)] active:scale-95 transition-transform">
              <Menu size={18} />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] animate-pulse" />
              <span className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-wide hidden sm:block">Driver Portal</span>
            </div>
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

            <NotificationBell
              notifications={notifications}
              unreadCount={unreadCount}
              markAllRead={markAllRead}
              dismiss={dismiss}
            />
          </div>
        </header>
        
        <div className="px-4 sm:px-6 md:px-10 py-10 w-full max-w-7xl mx-auto flex-1">
           <Outlet />
        </div>
      </main>

      {/* ── Modern Sign Out Confirmation Modal ── */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-[var(--color-primary-dark)]/30 backdrop-blur-sm transition-opacity" onClick={() => setIsLogoutModalOpen(false)} />
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full border border-[var(--color-border)] shadow-2xl relative z-10 text-center transform transition-all scale-100">
            <div className="w-12 h-12 rounded-2xl bg-[var(--color-bg-soft)] text-[var(--color-primary)] flex items-center justify-center mx-auto mb-4 border border-[var(--color-border)]">
              <LogOut size={22} strokeWidth={2.5} />
            </div>
            <h3 className="text-base font-black text-[var(--color-primary-dark)] tracking-tight">Confirm Sign Out</h3>
            <p className="text-xs text-[var(--color-text-muted)] font-medium mt-2 leading-relaxed">
              Are you sure you want to sign out of your UBUS account session?
            </p>
            <div className="grid grid-cols-2 gap-3 mt-6">
              <button
                onClick={() => setIsLogoutModalOpen(false)}
                className="py-3 px-4 text-xs font-black rounded-xl bg-[var(--color-bg-soft)] text-[var(--color-primary-dark)] hover:bg-[var(--color-border)]/50 transition-colors border border-[var(--color-border)]"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="py-3 px-4 text-xs font-black rounded-xl bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] transition-colors shadow-xs"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}