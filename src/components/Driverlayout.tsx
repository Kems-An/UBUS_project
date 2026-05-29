
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, Bus, UserCircle, Bell, LogOut, QrCode
} from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Dashboard',      icon: <LayoutDashboard size={18} />, to: '/dashboard/driver' },
  { label: 'Routes',         icon: <Bus size={18} />,             to: '/dashboard/driver/routes' },
  { label: 'Scan Ticket',    icon: <QrCode size={18} />,          to: '/dashboard/driver/scan' },
  { label: 'Profile',        icon: <UserCircle size={18} />,      to: '/dashboard/driver/profile' },
  { label: 'Communications', icon: <Bell size={18} />,             to: '/dashboard/driver/communicationshelp' },
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
      {/* ── Sidebar ── */}
      <aside className="w-72 bg-white h-screen sticky top-0 z-40 hidden lg:flex flex-col p-6 border-r border-[var(--color-border)] shadow-sm">
        
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-2 mb-10">
          <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)] flex items-center justify-center text-white shadow-sm">
            <Bus size={20} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight text-[var(--color-primary-dark)] leading-none">UBUS</h1>
            <p className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest mt-0.5">Driver Portal</p>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 space-y-2">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/dashboard/driver'}
              className={({ isActive }) =>
                `relative w-full flex items-center gap-4 px-4 py-3.5 font-bold text-sm transition-all group ${
                  isActive
                    ? 'text-[var(--color-primary-dark)]'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-primary-dark)]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {/* Active Underline Line Indicator Asset */}
                  {isActive && (
                    <span className="absolute bottom-0 left-4 right-4 h-[3px] bg-[var(--color-primary)] rounded-full animate-in fade-in slide-in-from-bottom-1 duration-200" />
                  )}

                  <span className={`transition-colors ${isActive ? 'text-[var(--color-primary)]' : 'text-[var(--color-primary)] opacity-60 group-hover:opacity-100'}`}>
                    {item.icon}
                  </span>
                  {item.label}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* User Info + Logout */}
        <div className="border-t border-[var(--color-border)] pt-4 mt-4">
          <div className="flex items-center gap-3 px-2 mb-4">
            <div className="w-9 h-9 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm font-black">
              {user?.full_name?.charAt(0).toUpperCase() ?? 'D'}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-black text-[var(--color-primary-dark)] truncate">{user?.full_name ?? 'Driver'}</p>
              <p className="text-[10px] text-[var(--color-text-muted)] truncate">{user?.email ?? ''}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-[var(--color-text-muted)] hover:bg-rose-50 hover:text-rose-600 transition-all"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* ── Mobile Bottom Bar ── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[var(--color-border)] flex justify-around items-center py-2 px-2">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/dashboard/driver'}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 p-2 rounded-xl transition-all text-[9px] font-black min-w-[60px] text-center ${
                isActive
                  ? 'text-[var(--color-primary-dark)]'
                  : 'text-[var(--color-text-muted)]'
              }`
            }
          >
            {item.icon}
            <span className="truncate max-w-full">{item.label.split(' ')[0]}</span>
          </NavLink>
        ))}
        <button
          onClick={handleLogout}
          className="flex flex-col items-center gap-1 p-2 rounded-xl transition-all text-[9px] font-black min-w-[60px] text-center text-rose-600 active:scale-95"
        >
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </div>

      {/* ── Main Content ── */}
      <main className="flex-1 overflow-auto pb-24 lg:pb-0">
        <Outlet />
      </main>
    </div>
  );
}