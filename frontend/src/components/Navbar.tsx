import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/images/logo.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add a slight shadow when user scrolls
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'py-3 shadow-md border-b' : 'py-5'
      }`}
      style={{ 
        background: 'rgba(255, 255, 255, 0.8)', 
        backdropFilter: 'blur(12px)',
        borderColor: scrolled ? 'var(--color-border)' : 'transparent'
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="w-28 transition-transform hover:scale-105">
          <img src={logo} alt="Logo" className="w-full h-auto" />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {[
            { label: 'Home', to: '/' },
            { label: 'How It Works', to: '/howitworks' },
            { label: 'About us', to: '/about' },
          ].map(({ label, to }) => (
            <a
              key={label}
              href={to}
              className="text-sm font-bold tracking-tight transition-all hover:opacity-70"
              style={{ color: 'var(--color-neutral-900)' }}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/login"
            className="text-sm font-bold px-4 py-2"
            style={{ color: 'var(--color-neutral-900)' }}
          >
            Log in
          </Link>
          <Link
            to="/register"
            className="px-6 py-2.5 text-sm font-bold text-white rounded-full transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-lime-500/20"
            style={{ background: 'var(--color-neutral-900)' }}
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden flex flex-col gap-1"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className={`w-6 h-0.5 bg-slate-900 transition-all ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
          <div className={`w-6 h-0.5 bg-slate-900 ${menuOpen ? 'opacity-0' : ''}`} />
          <div className={`w-6 h-0.5 bg-slate-900 transition-all ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b p-6 flex flex-col gap-6 md:hidden">
          <a href="#features" className="text-xl font-bold">Features</a>
          <a href="#how-it-works" className="text-xl font-bold">How It Works</a>
          <Link to="/routes" className="text-xl font-bold">Routes</Link>
          <div className="flex flex-col gap-3 pt-4 border-t">
            <Link to="/register" className="w-full py-4 text-center bg-black text-white rounded-xl font-bold">Sign Up</Link>
          </div>
        </div>
      )}
    </nav>
  );
}