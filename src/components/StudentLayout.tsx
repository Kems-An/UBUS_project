import { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, Bus, Ticket, UserCircle, LogOut,
  Search, Menu, X, ShieldCheck
} from 'lucide-react';
import NotificationBell from './NotificationBell';
import { useStudentNotifications } from '../hooks/useNotifications';

const NAV_ITEMS = [
  { label: 'Dashboard', icon: <LayoutDashboard size={18} />, to: '/dashboard/student'          },
  { label: 'Routes',    icon: <Bus size={18} />,             to: '/dashboard/student/routes'    },
  { label: 'Bookings',  icon: <Ticket size={18} />,          to: '/dashboard/student/bookings'  },
  { label: 'Profile',   icon: <UserCircle size={18} />,      to: '/dashboard/student/profile'   },
];

export default function StudentLayout() {
  const { user, logout } = useAuth();
  const navigate         = useNavigate();
  const location         = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // ── Real-time notifications for this student ──
  const { notifications, unreadCount, markAllRead, dismiss } =
    useStudentNotifications(user?.auth_id);

  const currentTitle = NAV_ITEMS.find(item => item.to === location.pathname)?.label || 'Overview';

  function handleLogout() { logout(); navigate('/login'); }
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="flex min-h-screen bg-[var(--color-bg-soft)] font-sans text-[var(--color-text-main)]">
      
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-[var(--color-primary-dark)]/20 backdrop-blur-xs z-[45] lg:hidden" onClick={closeMenu} />
      )}

      <aside className={`
        w-72 fixed top-0 left-0 h-screen bg-white border-r border-[var(--color-border)] shadow-sm z-50 transition-transform duration-300 ease-in-out flex flex-col p-6
        lg:translate-x-0 lg:sticky
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between px-2 mb-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)] flex items-center justify-center text-white shadow-sm">
              <Bus size={20} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight text-[var(--color-primary-dark)] leading-none">UBUS</h1>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-primary)] mt-1.5 block">Route Made Easy</span>
            </div>
          </div>
          <button onClick={closeMenu} className="lg:hidden p-2 text-[var(--color-text-muted)] hover:text-[var(--color-primary-dark)]">
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 space-y-4 pt-4 overflow-y-auto">
          {NAV_ITEMS.map(({ label, icon, to }) => (
            <NavLink key={label} to={to} onClick={closeMenu} end={to === '/dashboard/student'}
              className={({ isActive }) => `
                group relative flex items-center gap-3 py-2 text-sm font-bold tracking-tight transition-colors duration-300
                ${isActive ? 'text-[var(--color-primary-dark)]' : 'text-[var(--color-text-muted)] hover:text-[var(--color-primary-dark)]'}
              `}
            >
              {({ isActive }) => (
                <>
                  <span className="transition-transform duration-300 group-hover:scale-105 shrink-0 text-current">{icon}</span>
                  <span className="relative py-1">
                    {label}
                    <span className={`absolute bottom-0 left-0 h-[2px] bg-[var(--color-primary)] transition-all duration-300 ease-out
                      ${isActive ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'}`}
                    />
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-[var(--color-border)]">
          <div className="bg-[var(--color-bg-soft)] rounded-2xl p-5 border border-[var(--color-border)]">
            <div className="flex items-center gap-3 mb-5 min-w-0">
              <div className="w-10 h-10 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white font-black ring-4 ring-white shadow-xs shrink-0">
                {user?.full_name?.charAt(0) || 'S'}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-black text-[var(--color-primary-dark)] truncate">{user?.full_name || 'Student Profile'}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <ShieldCheck size={12} className="text-[var(--color-primary)] shrink-0" />
                  <p className="text-[10px] font-black text-[var(--color-text-muted)] uppercase tracking-tight">Verified Student</p>
                </div>
              </div>
            </div>
            <button onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-3 text-xs font-black rounded-xl bg-white border border-[var(--color-border)] text-[var(--color-primary-dark)] hover:bg-[var(--color-bg-soft)] transition-all shadow-2xs">
              <LogOut size={14} strokeWidth={2.5} /> Sign Out
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 min-h-screen flex flex-col min-w-0 w-full">
        <header className="h-20 flex items-center justify-between px-4 sm:px-6 md:px-10 sticky top-0 bg-[var(--color-bg-soft)]/80 backdrop-blur-md z-30 border-b border-[var(--color-border)]/40">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2.5 bg-white border border-[var(--color-border)] rounded-xl shadow-2xs text-[var(--color-primary-dark)] active:scale-95 transition-transform">
              <Menu size={18} />
            </button>
            <h2 className="text-xs font-black text-[var(--color-text-muted)] uppercase tracking-[0.2em]">{currentTitle}</h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white border border-[var(--color-border)] rounded-full shadow-2xs mr-1">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] animate-pulse" />
              <span className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-wide">System Live</span>
            </div>
            {/* ── Notification Bell ── */}
            <NotificationBell
              notifications={notifications}
              unreadCount={unreadCount}
              markAllRead={markAllRead}
              dismiss={dismiss}
            />
            <button className="w-9 h-9 rounded-full bg-white border border-[var(--color-border)] flex items-center justify-center shadow-2xs hover:bg-[var(--color-bg-soft)] transition-colors">
              <Search size={16} className="text-[var(--color-text-muted)]" />
            </button>
          </div>
        </header>

        <div className="px-4 sm:px-6 md:px-10 py-10 w-full max-w-7xl mx-auto flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
