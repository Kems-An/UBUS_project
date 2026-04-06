import { Link } from 'react-router-dom';

/* ============================================================
   REGISTER ROLE SELECTION PAGE
   - Shown when user clicks "Sign Up" from the Navbar
   - Three cards: Student, Driver, Admin
   - Each card links to the correct registration page
   - Simple, clean, no form here — just role routing
   ============================================================ */

// The three registration roles
const roles = [
  {
    id:          'student',
    icon:        '🎓',
    title:       'Student',
    desc:        'Register as a student to book seats, track shuttles, and manage your campus commute.',
    link:        '/register/student',
    badge:       null,
    buttonLabel: 'Register as Student',
  },
  {
    id:          'driver',
    icon:        '🚌',
    title:       'Driver',
    desc:        'Apply to join our campus transit network. Your account will require admin approval.',
    link:        '/register/driver',
    badge:       'Requires Approval',
    buttonLabel: 'Apply as Driver',
  },
  {
    id:          'admin',
    icon:        '🛡️',
    title:       'Admin',
    desc:        'Admin accounts are created by the system administrator. Contact your university IT office.',
    link:        '/register/admin',
    badge:       'Restricted Access',
    buttonLabel: 'Register as Admin',
  },
];

export default function RegisterRolePage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--color-bg-soft)' }}>

      {/* ── Navbar ── */}
      <header
        className="fixed top-0 w-full z-50 h-16 flex items-center px-8 shadow-sm"
        style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(16px)' }}
      >
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <Link
            to="/"
            className="text-xl font-bold"
            style={{ color: 'var(--color-primary-dark)', fontFamily: 'Manrope, sans-serif' }}
          >
            Academic Velocity
          </Link>
          <div className="flex items-center gap-3 text-sm font-semibold">
            <Link to="/login" style={{ color: 'var(--color-text-muted)' }}>
              Already have an account? <span style={{ color: 'var(--color-primary)' }}>Sign In</span>
            </Link>
          </div>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="flex-1 flex flex-col items-center justify-center pt-16 px-6 py-16">

        {/* Heading */}
        <div className="text-center mb-12 max-w-xl">
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
            style={{ background: 'var(--color-secondary-light)', color: 'var(--color-primary-dark)' }}
          >
            Create an Account
          </span>
          <h1
            className="text-4xl font-bold mb-3"
            style={{ color: 'var(--color-primary-dark)', fontFamily: 'Manrope, sans-serif' }}
          >
            Who are you registering as?
          </h1>
          <p className="text-base" style={{ color: 'var(--color-text-muted)' }}>
            Choose your role to get started with the right registration form.
          </p>
        </div>

        {/* Role cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          {roles.map(({ id, icon, title, desc, link, badge, buttonLabel }) => (
            <div
              key={id}
              className="flex flex-col p-8 rounded-2xl border transition-all duration-200"
              style={{
                background:   'var(--color-white)',
                borderColor:  'var(--color-border)',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--color-primary)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--color-border)')}
            >
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-5"
                style={{ background: 'var(--color-bg-muted)' }}
              >
                {icon}
              </div>

              {/* Title + badge */}
              <div className="flex items-center gap-2 mb-2">
                <h2
                  className="text-xl font-bold"
                  style={{ color: 'var(--color-primary-dark)', fontFamily: 'Manrope, sans-serif' }}
                >
                  {title}
                </h2>
                {badge && (
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider"
                    style={{ background: 'var(--color-secondary-light)', color: 'var(--color-primary-dark)' }}
                  >
                    {badge}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-sm leading-relaxed mb-8 flex-1" style={{ color: 'var(--color-text-muted)' }}>
                {desc}
              </p>

              {/* CTA button — disabled for admin */}
              {link ? (
                <Link
                  to={link}
                  className="w-full py-3 rounded-xl font-bold text-sm text-center text-white transition-all duration-150 hover:-translate-y-0.5"
                  style={{ background: 'linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 100%)' }}
                >
                  {buttonLabel}
                </Link>
              ) : (
                <button
                  disabled
                  className="w-full py-3 rounded-xl font-bold text-sm text-center cursor-not-allowed"
                  style={{ background: 'var(--color-bg-muted)', color: 'var(--color-text-muted)' }}
                >
                  {buttonLabel}
                </button>
              )}
            </div>
          ))}
        </div>

      </main>

      {/* ── Minimal footer ── */}
      <footer
        className="border-t py-6 px-8 text-center text-xs"
        style={{ background: 'var(--color-white)', borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}
      >
        © {new Date().getFullYear()} Academic Velocity. All rights reserved. ·{' '}
        <a href="#" className="underline" style={{ color: 'var(--color-primary)' }}>Privacy Policy</a>
      </footer>

    </div>
  );
}
