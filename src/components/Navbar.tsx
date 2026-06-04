import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Menu, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import logo from "../assets/images/logo.png";

const NAV_ITEMS = [
  { label: 'Home',         to: '/' },
  { label: 'About Us',     to: '/about' },
  { label: 'Contact',      to: '/contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user } = useAuth(); // Read existing active authentication session

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  // Compute precise dashboard location destination fallback sequence links based on role
  const getDashboardLink = () => {
    if (!user) return '/login';
    const role = user.role?.toLowerCase();
    if (role === 'admin') return '/dashboard/admin';
    if (role === 'driver') return '/dashboard/driver';
    return '/dashboard/student';
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'py-2 shadow-sm border-b' : 'py-3.5'
      }`}
      style={{ 
        background: 'rgba(255, 255, 255, 0.85)', 
        backdropFilter: 'blur(16px)',
        borderColor: scrolled ? 'var(--color-border)' : 'transparent'
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between relative">
        
        {/* Logo Element Frame */}
        <Link to="/" onClick={closeMenu} className="w-24 shrink-0 transition-transform hover:scale-102">
          <img src={logo} alt="UBUS Logo" className="w-full h-auto" />
        </Link>

        {/* Desktop Links with Absolute Center Layout alignment to avoid overlapping */}
        <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {NAV_ITEMS.map(({ label, to }) => (
            <NavLink
              key={label}
              to={to}
              end={to === '/'}
              className={({ isActive }) => `
                group relative py-1 text-xs font-black tracking-tight uppercase transition-colors duration-300
                ${isActive ? 'text-[var(--color-primary-dark)]' : 'text-[var(--color-text-muted)] hover:text-[var(--color-primary-dark)]'}
              `}
            >
              {({ isActive }) => (
                <>
                  {label}
                  <span 
                    className={`absolute bottom-0 left-0 h-[2px] bg-[var(--color-primary)] transition-all duration-300 ease-out
                      ${isActive 
                        ? 'w-full opacity-100' 
                        : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                      }`} 
                  />
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Action Button Triggers */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          {user ? (
            <Link
              to={getDashboardLink()}
              className="px-5 py-2 text-xs font-black uppercase tracking-wider text-white rounded-full transition-all hover:scale-103 active:scale-98 shadow-sm flex items-center gap-2"
              style={{ background: 'var(--color-primary-dark)' }}
            >
              <LayoutDashboard size={14} />
              View Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="text-xs font-black uppercase tracking-wider px-4 py-2 text-[var(--color-text-main)] hover:text-[var(--color-primary-dark)] transition-colors"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="px-5 py-2 text-xs font-black uppercase tracking-wider text-white rounded-full transition-all hover:scale-103 active:scale-98 shadow-sm"
                style={{ background: 'var(--color-primary-dark)' }}
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Hamburger Trigger for Mobile (Hidden automatically when menu opens) */}
        {!menuOpen && (
          <button 
            className="md:hidden p-2 -mr-2 text-[var(--color-primary-dark)] active:scale-95 transition-transform focus:outline-none"
            onClick={() => setMenuOpen(true)}
            aria-label="Open Menu"
          >
            <Menu size={22} strokeWidth={2.5} />
          </button>
        )}
      </div>

      {/* Pop-up Full Screen Blurred Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 h-screen w-screen bg-slate-900/40 backdrop-blur-xl z-50 flex flex-col justify-center px-6 md:hidden"
          >
            {/* Pop-up Card Frame Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
              className="bg-white rounded-[2rem] border border-[var(--color-border)] p-8 shadow-2xl flex flex-col gap-6 w-full max-w-sm mx-auto relative"
            >
              {/* Exit Close Trigger Icon placed inside the upper container bounding zone */}
              <button 
                className="absolute top-6 right-6 p-1.5 text-[var(--color-text-muted)] hover:text-[var(--color-primary-dark)] active:scale-90 transition-transform focus:outline-none border border-[var(--color-border)]/40 rounded-xl bg-[var(--color-bg-soft)]"
                onClick={closeMenu}
                aria-label="Close Menu"
              >
                <X size={16} strokeWidth={2.5} />
              </button>

              <div className="flex flex-col gap-1.5 border-b border-[var(--color-border)]/60 pb-4 pr-10">
                <span className="text-[10px] font-black uppercase tracking-widest text-[var(--color-primary)]">Navigation Matrix</span>
                <h4 className="text-sm font-black text-[var(--color-primary-dark)]">Where would you like to go?</h4>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col gap-3">
                {NAV_ITEMS.map(({ label, to }) => (
                  <NavLink 
                    key={label}
                    to={to} 
                    end={to === '/'}
                    onClick={closeMenu}
                    className={({ isActive }) => `
                      text-sm font-black uppercase tracking-wide py-3 px-4 rounded-xl border transition-all
                      ${isActive 
                        ? 'bg-[var(--color-bg-soft)] border-[var(--color-primary)] text-[var(--color-primary-dark)] pl-6' 
                        : 'bg-white border-[var(--color-border)]/60 text-[var(--color-text-main)] hover:bg-[var(--color-bg-soft)]'
                      }
                    `}
                  >
                    {label}
                  </NavLink>
                ))}
              </div>

              {/* Action Trigger Buttons */}
              <div className="flex flex-col gap-2 pt-4 border-t border-[var(--color-border)]/60">
                {user ? (
                  <Link 
                    to={getDashboardLink()} 
                    onClick={closeMenu}
                    className="w-full py-4 text-center text-xs font-black uppercase tracking-widest text-white rounded-xl shadow-md active:scale-98 transition-all flex items-center justify-center gap-2"
                    style={{ background: 'var(--color-primary-dark)' }}
                  >
                    <LayoutDashboard size={14} />
                    View Dashboard
                  </Link>
                ) : (
                  <>
                    <Link 
                      to="/login" 
                      onClick={closeMenu}
                      className="w-full py-3.5 text-center text-xs font-black uppercase tracking-widest border border-[var(--color-border)] text-[var(--color-primary-dark)] rounded-xl hover:bg-[var(--color-bg-soft)] transition-colors"
                    >
                      Log In
                    </Link>
                    <Link 
                      to="/register" 
                      onClick={closeMenu}
                      className="w-full py-4 text-center text-xs font-black uppercase tracking-widest text-white rounded-xl shadow-md active:scale-98 transition-all"
                      style={{ background: 'var(--color-primary-dark)' }}
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}