import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from "../assets/images/logo.png"

/* Navbar is shared across all pages via the Layout component */
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 w-full z-50 shadow-sm"
      style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(16px)' }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-xl font-bold w-30" style={{ color: 'var(--color-primary-dark)', fontFamily: 'Manrope, sans-serif' }}>
        <img src={logo} alt="" />
          
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: 'Features',     to: '/#features'  },
            { label: 'How It Works', to: '/#how-it-works' },
            { label: 'Routes',       to: '/routes'     },
          ].map(({ label, to }) => (
            <a
              key={label}
              href={to}
              className="text-sm font-semibold transition-colors duration-200"
              style={{ color: 'var(--color-text-muted)', fontFamily: 'Manrope, sans-serif' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-primary)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-muted)')}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Auth buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/login"
            className="px-5 py-2 text-sm font-semibold rounded-lg transition-colors duration-150"
            style={{ color: 'var(--color-primary-dark)' }}
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-5 py-2 text-sm font-semibold text-white rounded-lg shadow-sm transition-colors duration-150"
            style={{ background: 'var(--color-primary)' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-primary-dark)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--color-primary)')}
          >
            Sign Up
          </Link>
        </div>

        {/* Hamburger (mobile) */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label="Toggle menu"
        >
          <span className="block w-5 h-0.5 rounded" style={{ background: 'var(--color-primary-dark)', transition: 'transform 0.2s', transform: menuOpen ? 'rotate(45deg) translate(3px,5px)' : 'none' }} />
          <span className="block w-5 h-0.5 rounded" style={{ background: 'var(--color-primary-dark)', opacity: menuOpen ? 0 : 1 }} />
          <span className="block w-5 h-0.5 rounded" style={{ background: 'var(--color-primary-dark)', transition: 'transform 0.2s', transform: menuOpen ? 'rotate(-45deg) translate(3px,-5px)' : 'none' }} />
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-4 border-t" style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
          {['Features', 'How It Works', 'Routes'].map(label => (
            <a key={label} href="#" className="text-sm font-semibold py-1" style={{ color: 'var(--color-text-muted)' }} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
          <div className="flex gap-3 pt-2 border-t" style={{ borderColor: 'var(--color-border)' }}>
            <Link to="/login"    className="flex-1 py-2.5 text-sm font-semibold text-center rounded-lg border" style={{ color: 'var(--color-primary)', borderColor: 'var(--color-border)' }}>Login</Link>
            <Link to="/register" className="flex-1 py-2.5 text-sm font-semibold text-center text-white rounded-lg" style={{ background: 'var(--color-primary)' }}>Sign Up</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
