import { useState } from 'react';
import { Link } from 'react-router-dom';

/* ============================================================
   DRIVER REGISTRATION PAGE
   - Same nav/footer as Student Register
   - Left panel: green branding + feature list + approval notice
   - Right panel: registration form
   - Fields: Full Name, Email, Phone, Driver License, Password
   - Approval note: admin must verify before access
   ============================================================ */

export default function DriverRegisterPage() {
  const [form, setForm] = useState({
    fullName:  '',
    email:     '',
    phone:     '',
    license:   '',
    password:  '',
    agreed:    false,
  });
  const [showPassword, setShowPassword] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log('Driver registration:', form);
    // TODO: call Supabase signUp + set role as 'driver' + flag as pending approval
  }

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

          <div className="flex items-center gap-3 text-sm font-semibold">
            <Link to="/login" style={{ color: 'var(--color-text-muted)' }}>Login</Link>
            <Link
              to="/register"
              className="px-5 py-2 rounded-lg text-white"
              style={{ background: 'var(--color-primary)' }}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="flex-1 pt-24 pb-16 px-4 flex items-center justify-center relative overflow-hidden">

        {/* Background decorations */}
        <div
          className="absolute -top-24 -right-24 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: 'var(--color-primary-light)', opacity: 0.12, filter: 'blur(60px)' }}
        />
        <div
          className="absolute bottom-0 -left-24 w-72 h-72 rounded-full pointer-events-none"
          style={{ background: 'var(--color-secondary)', opacity: 0.12, filter: 'blur(60px)' }}
        />

        <div
          className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 overflow-hidden rounded-2xl shadow-lg"
          style={{ background: 'var(--color-white)' }}
        >

          {/* ── Left: branding panel ── */}
          <div
            className="md:col-span-5 p-10 flex flex-col justify-between text-white"
            style={{ background: 'linear-gradient(160deg, var(--color-primary-dark) 0%, var(--color-primary) 100%)' }}
          >
            <div>
              <h1
                className="text-3xl font-bold mb-4 leading-tight"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                Drive the Future of Campus.
              </h1>
              <p className="text-sm leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.75)' }}>
                Join our network of campus transit partners. We provide the tools, you provide the momentum.
              </p>

              {/* Feature list */}
              <div className="space-y-5">
                {[
                  { icon: '✅', title: 'Verified Excellence', desc: 'Join a trusted university safety network.' },
                  { icon: '🕐', title: 'Flexible Slots',      desc: 'Balance your driving schedule with campus life.' },
                ].map(({ icon, title, desc }) => (
                  <div key={title} className="flex items-start gap-4">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 text-base"
                      style={{ background: 'rgba(255,255,255,0.12)' }}
                    >
                      {icon}
                    </div>
                    <div>
                      <p className="text-sm font-bold" style={{ fontFamily: 'Manrope, sans-serif' }}>{title}</p>
                      <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.65)' }}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Approval notice */}
            <div
              className="mt-10 p-5 rounded-xl border"
              style={{ background: 'rgba(255,255,255,0.07)', borderColor: 'rgba(255,255,255,0.12)' }}
            >
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
                ⚠ Notice
              </p>
              <p className="text-sm font-semibold">Requires admin approval</p>
              <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.65)' }}>
                Verification typically takes 24–48 business hours.
              </p>
            </div>
          </div>

          {/* ── Right: form ── */}
          <div className="md:col-span-7 p-10 md:p-12">
            <div className="mb-8">
              <h2
                className="text-2xl font-bold mb-1"
                style={{ color: 'var(--color-primary-dark)', fontFamily: 'Manrope, sans-serif' }}
              >
                Driver Registration
              </h2>
              <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                Submit your details to start your application.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Full Name + Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--color-text-muted)' }}>
                    Full Name
                  </label>
                  <input
                    name="fullName"
                    type="text"
                    placeholder="Alex Rivera"
                    value={form.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-150"
                    style={{ background: 'var(--color-bg-soft)', border: '1.5px solid var(--color-border)', color: 'var(--color-text)' }}
                    onFocus={e => (e.currentTarget.style.borderColor = 'var(--color-primary)')}
                    onBlur={e  => (e.currentTarget.style.borderColor = 'var(--color-border)')}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--color-text-muted)' }}>
                    University Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder="a.rivera@campus.edu"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-150"
                    style={{ background: 'var(--color-bg-soft)', border: '1.5px solid var(--color-border)', color: 'var(--color-text)' }}
                    onFocus={e => (e.currentTarget.style.borderColor = 'var(--color-primary)')}
                    onBlur={e  => (e.currentTarget.style.borderColor = 'var(--color-border)')}
                  />
                </div>
              </div>

              {/* Phone + License */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--color-text-muted)' }}>
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
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--color-text-muted)' }}>
                    Driver License #
                  </label>
                  <input
                    name="license"
                    type="text"
                    placeholder="ABC-12345678"
                    value={form.license}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-150"
                    style={{ background: 'var(--color-bg-soft)', border: '1.5px solid var(--color-border)', color: 'var(--color-text)' }}
                    onFocus={e => (e.currentTarget.style.borderColor = 'var(--color-primary)')}
                    onBlur={e  => (e.currentTarget.style.borderColor = 'var(--color-border)')}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--color-text-muted)' }}>
                  Secure Password
                </label>
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Min. 8 characters"
                    value={form.password}
                    onChange={handleChange}
                    required
                    minLength={8}
                    className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-150 pr-12"
                    style={{ background: 'var(--color-bg-soft)', border: '1.5px solid var(--color-border)', color: 'var(--color-text)' }}
                    onFocus={e => (e.currentTarget.style.borderColor = 'var(--color-primary)')}
                    onBlur={e  => (e.currentTarget.style.borderColor = 'var(--color-border)')}
                  />
                  {/* Toggle password visibility */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(prev => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-lg transition-colors duration-150"
                    style={{ color: 'var(--color-text-muted)' }}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
                <p className="text-xs mt-1.5 italic" style={{ color: 'var(--color-text-muted)' }}>
                  Minimum 8 characters with at least one number and special character.
                </p>
              </div>

              {/* Agreement checkbox */}
              <div className="flex items-start gap-3 pt-2">
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
                <label htmlFor="agreed" className="text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                  I confirm that all information provided is accurate and I understand that this
                  account is subject to verification and{' '}
                  <strong style={{ color: 'var(--color-primary-dark)' }}>admin approval</strong>.
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-bold text-sm text-white shadow-md transition-all duration-150 hover:-translate-y-0.5 active:scale-[0.98]"
                style={{ background: 'linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 100%)' }}
              >
                Request Account Approval
              </button>

              {/* Sign in link */}
              <p className="text-center text-sm" style={{ color: 'var(--color-text-muted)' }}>
                Already have an account?{' '}
                <Link to="/login" className="font-semibold" style={{ color: 'var(--color-primary)' }}>
                  Sign In
                </Link>
              </p>

            </form>
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t" style={{ background: 'var(--color-white)', borderColor: 'var(--color-border)' }}>
        <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <p className="text-base font-bold mb-3" style={{ color: 'var(--color-primary-dark)', fontFamily: 'Manrope, sans-serif' }}>
              Academic Velocity
            </p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
              Optimizing campus mobility through intelligent transit solutions.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--color-primary-dark)' }}>Quick Links</h4>
            <ul className="space-y-2">
              {['Campus Map', 'Safety Guidelines', 'Driver Rewards'].map(label => (
                <li key={label}>
                  <a href="#" className="text-sm transition-colors duration-150" style={{ color: 'var(--color-text-muted)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-primary)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-muted)')}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--color-primary-dark)' }}>Contact Info</h4>
            <ul className="space-y-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>
              <li>✉ fleet@academicvelocity.edu</li>
              <li>📞 (555) VELO-DRIVE</li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--color-primary-dark)' }}>Follow Us</h4>
            <div className="flex gap-3">
              {['🌐', '🐦'].map((icon, i) => (
                <a key={i} href="#"
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm transition-all duration-150"
                  style={{ background: 'var(--color-bg-muted)', color: 'var(--color-primary-dark)' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-primary)'; e.currentTarget.style.color = 'white'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'var(--color-bg-muted)'; e.currentTarget.style.color = 'var(--color-primary-dark)'; }}>
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="px-6 py-4 border-t text-center text-xs" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)', opacity: 0.7 }}>
          © {new Date().getFullYear()} Academic Velocity. All rights reserved.
        </div>
      </footer>

    </div>
  );
}
