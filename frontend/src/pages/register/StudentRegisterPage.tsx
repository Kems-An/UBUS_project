import { useState } from 'react';
import { Link } from 'react-router-dom';

/* ============================================================
   STUDENT REGISTRATION PAGE
   - Shared Navbar (full)
   - Left side: editorial content + feature highlights
   - Right side: registration form card
   - Fields: Full Name, Email, Student ID, Phone, Password
   - Terms checkbox + submit
   - Shared Footer
   ============================================================ */

export default function StudentRegisterPage() {
  // Form state
  const [form, setForm] = useState({
    fullName:  '',
    email:     '',
    studentId: '',
    phone:     '',
    password:  '',
    agreed:    false,
  });

  // Generic change handler for text inputs
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  // Handle form submit (connect to Supabase later)
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log('Student registration:', form);
    // TODO: call Supabase signUp here
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--color-bg-soft)' }}>

      {/* ── Navbar (reusing same minimal header style as Login) ── */}
      <header
        className="fixed top-0 w-full z-50 h-16 flex items-center px-8 shadow-sm"
        style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(16px)' }}
      >
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl font-bold"
            style={{ color: 'var(--color-primary-dark)', fontFamily: 'Manrope, sans-serif' }}
          >
            Academic Velocity
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex gap-8 items-center text-sm font-semibold">
            {['Features', 'How It Works', 'Routes'].map(label => (
              <a
                key={label}
                href="#"
                className="transition-colors duration-150"
                style={{ color: 'var(--color-text-muted)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-primary)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-muted)')}
              >
                {label}
              </a>
            ))}
          </div>

          {/* Auth buttons */}
          <div className="flex items-center gap-3 text-sm font-semibold">
            <Link
              to="/login"
              className="transition-colors duration-150"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-5 py-2 rounded-lg text-white transition-colors duration-150"
              style={{ background: 'var(--color-primary)' }}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* ── Main content ── */}
      <main className="flex-1 pt-16 relative overflow-hidden">

        {/* Soft background decorations */}
        <div
          className="absolute top-0 right-0 w-1/3 h-full -z-10 opacity-40"
          style={{ background: 'var(--color-secondary-light)', clipPath: 'polygon(0 0, 100% 0, 100% 90%, 0% 100%)' }}
        />
        <div
          className="absolute bottom-0 left-0 w-64 h-64 rounded-full -z-10"
          style={{ background: 'var(--color-primary-light)', opacity: 0.15, filter: 'blur(60px)' }}
        />

        <div className="max-w-6xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-16 items-center">

          {/* ── Left: editorial content ── */}
          <div className="space-y-8">
            {/* Badge + heading */}
            <div>
              <span
                className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
                style={{ background: 'var(--color-secondary-light)', color: 'var(--color-primary-dark)' }}
              >
                New Registration
              </span>
              <h1
                className="text-4xl md:text-5xl font-bold leading-tight mb-4"
                style={{ color: 'var(--color-primary-dark)', fontFamily: 'Manrope, sans-serif' }}
              >
                Join the smart campus transit network.
              </h1>
              <p className="text-lg leading-relaxed max-w-md" style={{ color: 'var(--color-text-muted)' }}>
                Secure your seat, track shuttles in real-time, and breeze through your
                daily commute with the Academic Velocity student pass.
              </p>
            </div>

            {/* Feature highlights */}
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  icon:  '⚡',
                  title: 'Priority Access',
                  desc:  'Book up to 48 hours in advance for all campus routes.',
                },
                {
                  icon:  '📍',
                  title: 'Live Tracking',
                  desc:  'Precise arrival times at every designated stop.',
                },
              ].map(({ icon, title, desc }) => (
                <div
                  key={title}
                  className="p-5 rounded-xl"
                  style={{ background: 'var(--color-white)', border: '1px solid var(--color-border)' }}
                >
                  <span className="text-3xl mb-3 block">{icon}</span>
                  <h3
                    className="font-bold mb-1"
                    style={{ color: 'var(--color-primary-dark)', fontFamily: 'Manrope, sans-serif' }}
                  >
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: registration form card ── */}
          <div
            className="p-8 md:p-10 rounded-2xl shadow-lg border"
            style={{ background: 'var(--color-white)', borderColor: 'var(--color-border)' }}
          >
            {/* Card heading */}
            <div className="mb-8 text-center">
              <h2
                className="text-2xl font-bold mb-1"
                style={{ color: 'var(--color-primary-dark)', fontFamily: 'Manrope, sans-serif' }}
              >
                Student Registration
              </h2>
              <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                Enter your university credentials to begin.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--color-text-muted)' }}>
                  Full Name
                </label>
                <input
                  name="fullName"
                  type="text"
                  placeholder="Johnathan Doe"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-150"
                  style={{ background: 'var(--color-bg-soft)', border: '1.5px solid var(--color-border)', color: 'var(--color-text)' }}
                  onFocus={e => (e.currentTarget.style.borderColor = 'var(--color-primary)')}
                  onBlur={e  => (e.currentTarget.style.borderColor = 'var(--color-border)')}
                />
              </div>

              {/* Email + Student ID (side by side on md+) */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--color-text-muted)' }}>
                    University Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder="j.doe@uni.edu"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-150"
                    style={{ background: 'var(--color-bg-soft)', border: '1.5px solid var(--color-border)', color: 'var(--color-text)' }}
                    onFocus={e => (e.currentTarget.style.borderColor = 'var(--color-primary)')}
                    onBlur={e  => (e.currentTarget.style.borderColor = 'var(--color-border)')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--color-text-muted)' }}>
                    Student ID
                  </label>
                  <input
                    name="studentId"
                    type="text"
                    placeholder="ID-882910"
                    value={form.studentId}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-150"
                    style={{ background: 'var(--color-bg-soft)', border: '1.5px solid var(--color-border)', color: 'var(--color-text)' }}
                    onFocus={e => (e.currentTarget.style.borderColor = 'var(--color-primary)')}
                    onBlur={e  => (e.currentTarget.style.borderColor = 'var(--color-border)')}
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--color-text-muted)' }}>
                  Phone Number
                </label>
                <input
                  name="phone"
                  type="tel"
                  placeholder="+237 6XX XXX XXX"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-150"
                  style={{ background: 'var(--color-bg-soft)', border: '1.5px solid var(--color-border)', color: 'var(--color-text)' }}
                  onFocus={e => (e.currentTarget.style.borderColor = 'var(--color-primary)')}
                  onBlur={e  => (e.currentTarget.style.borderColor = 'var(--color-border)')}
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--color-text-muted)' }}>
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  placeholder="Min. 8 characters"
                  value={form.password}
                  onChange={handleChange}
                  required
                  minLength={8}
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-150"
                  style={{ background: 'var(--color-bg-soft)', border: '1.5px solid var(--color-border)', color: 'var(--color-text)' }}
                  onFocus={e => (e.currentTarget.style.borderColor = 'var(--color-primary)')}
                  onBlur={e  => (e.currentTarget.style.borderColor = 'var(--color-border)')}
                />
              </div>

              {/* Terms checkbox */}
              <div className="flex items-start gap-3 py-1">
                <input
                  id="agreed"
                  name="agreed"
                  type="checkbox"
                  checked={form.agreed}
                  onChange={handleChange}
                  required
                  className="mt-0.5 w-4 h-4 rounded"
                  style={{ accentColor: 'var(--color-primary)' }}
                />
                <label htmlFor="agreed" className="text-sm leading-snug" style={{ color: 'var(--color-text-muted)' }}>
                  I agree to the{' '}
                  <a href="#" className="font-semibold underline" style={{ color: 'var(--color-primary)' }}>
                    Terms of Service
                  </a>{' '}
                  and the campus code of conduct regarding shuttle usage.
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-bold text-base text-white shadow-md transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0"
                style={{ background: 'linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 100%)' }}
              >
                Create Account
              </button>

              {/* Sign in link */}
              <p className="text-center text-sm" style={{ color: 'var(--color-text-muted)' }}>
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="font-semibold"
                  style={{ color: 'var(--color-primary)' }}
                >
                  Sign In
                </Link>
              </p>

            </form>
          </div>

        </div>
      </main>

      {/* ── Footer ── */}
      <footer
        className="border-t"
        style={{ background: 'var(--color-white)', borderColor: 'var(--color-border)' }}
      >
        <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <p className="text-base font-bold mb-3" style={{ color: 'var(--color-primary-dark)', fontFamily: 'Manrope, sans-serif' }}>
              Academic Velocity
            </p>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: 'var(--color-text-muted)' }}>
              Connecting campus life through efficient, smart, and sustainable
              transportation solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--color-primary-dark)' }}>
              Quick Links
            </h4>
            <ul className="space-y-2">
              {['Routes & Schedules', 'Safety Protocols', 'Mobile App'].map(label => (
                <li key={label}>
                  <a
                    href="#"
                    className="text-sm transition-colors duration-150"
                    style={{ color: 'var(--color-text-muted)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-primary)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-muted)')}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--color-primary-dark)' }}>
              Contact Info
            </h4>
            <ul className="space-y-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>
              <li>✉ support@academicvelocity.edu</li>
              <li>📞 (555) TRANSIT-99</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--color-primary-dark)' }}>
              Follow Us
            </h4>
            <div className="flex gap-3">
              {['🌐', '🐦'].map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm transition-all duration-150"
                  style={{ background: 'var(--color-bg-muted)', color: 'var(--color-primary-dark)' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-primary)', e.currentTarget.style.color = 'white')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'var(--color-bg-muted)', e.currentTarget.style.color = 'var(--color-primary-dark)')}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div
          className="px-6 py-4 border-t text-center text-xs"
          style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)', opacity: 0.7 }}
        >
          © {new Date().getFullYear()} Academic Velocity. All rights reserved.
        </div>
      </footer>

    </div>
  );
}
