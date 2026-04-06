import { useState } from 'react';
import { Link } from 'react-router-dom';

/* ============================================================
   LOGIN PAGE
   - Minimal header (brand only, no full Navbar)
   - Split layout: image/branding on left, form on right
   - Role selector: Student / Driver / Admin
   - Email + Password form
   - Minimal footer with legal links
   ============================================================ */

// Role options for the selector
type Role = 'student' | 'driver' | 'admin';

const roles: { id: Role; label: string; icon: string }[] = [
  { id: 'student', label: 'Student', icon: '🎓' },
  { id: 'driver',  label: 'Driver',  icon: '🚌' },
  { id: 'admin',   label: 'Admin',   icon: '🛡️' },
];

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<Role>('student');
  const [email,        setEmail]        = useState('');
  const [password,     setPassword]     = useState('');
  const [remember,     setRemember]     = useState(false);

  // Handle form submission (connect to Supabase auth later)
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log({ role: selectedRole, email, password, remember });
    // TODO: call Supabase signIn here
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--color-bg-soft)' }}>

      {/* ── Minimal Header (brand only on login pages) ── */}
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
          <a
            href="#"
            className="text-sm font-semibold transition-colors duration-150"
            style={{ color: 'var(--color-text-muted)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-primary)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-muted)')}
          >
            Help Center
          </a>
        </div>
      </header>

      {/* ── Main: split card layout ── */}
      <main className="flex-1 flex items-center justify-center pt-16 px-6 py-12">
        <div
          className="w-full max-w-5xl grid md:grid-cols-2 rounded-2xl overflow-hidden shadow-xl min-h-[600px]"
          style={{ background: 'var(--color-white)' }}
        >

          {/* ── Left: branding panel ── */}
          <div className="hidden md:flex relative overflow-hidden">
            {/* Background image */}
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBb4W1P0_msOOjn15Ng1TO2MdSoGiuaon6QRe4UqJjZbq_Hi7q_n5Ak8tYEX7h-KZp2EdWLMTgYFL110u-w9uRsXdUapAFDNhh1ek3_TaZuzpI0wgbfb8eHrCwU8sOAPoV1RhqgdvplH_n4t5nBRsbVg_cR7M5UkWShGk0Bfc5pQ-sWeY9RT368-5R3njuWtev_RUPCsO6LKrEDYob3HJYBQHfUf8uXonaCnbtgiBmh9BWzu3kQ0bJKmDeqxUjOF56iVNCvLQjYrB9q"
              alt="University campus"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Green gradient overlay */}
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 100%)', opacity: 0.75 }}
            />
            {/* Text content at bottom */}
            <div className="absolute inset-0 p-12 flex flex-col justify-end text-white">
              <h1
                className="text-3xl font-bold mb-3 leading-tight"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                Your gateway to efficient campus travel.
              </h1>
              <p className="text-base leading-relaxed" style={{ color: 'var(--color-secondary-light)' }}>
                Academic Velocity connects students and faculty through high-precision shuttle logistics.
              </p>
            </div>
          </div>

          {/* ── Right: login form ── */}
          <div className="p-8 md:p-12 flex flex-col justify-center">

            {/* Heading */}
            <div className="mb-8">
              <h2
                className="text-3xl font-bold mb-1"
                style={{ color: 'var(--color-primary-dark)', fontFamily: 'Manrope, sans-serif' }}
              >
                Welcome Back
              </h2>
              <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                Select your role and enter your credentials.
              </p>
            </div>

            {/* Role selector */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              {roles.map(({ id, label, icon }) => {
                const isActive = selectedRole === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setSelectedRole(id)}
                    className="flex flex-col items-center justify-center p-4 rounded-xl text-sm font-semibold uppercase tracking-wider transition-all duration-150"
                    style={{
                      background:  isActive ? 'var(--color-bg-muted)'     : 'var(--color-bg-soft)',
                      color:       isActive ? 'var(--color-primary-dark)' : 'var(--color-text-muted)',
                      border:      `2px solid ${isActive ? 'var(--color-primary)' : 'transparent'}`,
                    }}
                  >
                    <span className="text-2xl mb-1">{icon}</span>
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Login form */}
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold mb-1.5"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  University Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="name@university.edu"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-150"
                  style={{
                    background:  'var(--color-bg-soft)',
                    color:       'var(--color-text)',
                    border:      '1.5px solid var(--color-border)',
                  }}
                  onFocus={e  => (e.currentTarget.style.borderColor = 'var(--color-primary)')}
                  onBlur={e   => (e.currentTarget.style.borderColor = 'var(--color-border)')}
                />
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-xs font-semibold transition-colors duration-150"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    Forgot Password?
                  </Link>
                </div>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-150"
                  style={{
                    background: 'var(--color-bg-soft)',
                    color:      'var(--color-text)',
                    border:     '1.5px solid var(--color-border)',
                  }}
                  onFocus={e => (e.currentTarget.style.borderColor = 'var(--color-primary)')}
                  onBlur={e  => (e.currentTarget.style.borderColor = 'var(--color-border)')}
                />
              </div>

              {/* Remember me */}
              <div className="flex items-center gap-2">
                <input
                  id="remember"
                  type="checkbox"
                  checked={remember}
                  onChange={e => setRemember(e.target.checked)}
                  className="rounded"
                  style={{ accentColor: 'var(--color-primary)' }}
                />
                <label htmlFor="remember" className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                  Stay signed in for 30 days
                </label>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-bold text-base text-white shadow-md transition-all duration-150 hover:scale-[1.01] active:scale-95"
                style={{ background: 'linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 100%)' }}
              >
                Sign In
              </button>
            </form>

            {/* Register link */}
            <p className="mt-8 text-center text-sm" style={{ color: 'var(--color-text-muted)' }}>
              Don't have an account?{' '}
              <Link
                to="/register"
                className="font-semibold transition-colors duration-150"
                style={{ color: 'var(--color-primary)' }}
              >
                Register your ID
              </Link>
            </p>

          </div>
        </div>
      </main>

      {/* ── Minimal Footer (legal links only) ── */}
      <footer
        className="w-full border-t py-6 px-8"
        style={{ background: 'var(--color-white)', borderColor: 'var(--color-border)' }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-4">
            <span
              className="font-bold text-base"
              style={{ color: 'var(--color-primary-dark)', fontFamily: 'Manrope, sans-serif' }}
            >
              Academic Velocity
            </span>
            <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
              © {new Date().getFullYear()} Academic Velocity. All rights reserved.
            </span>
          </div>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'System Status'].map(label => (
              <a
                key={label}
                href="#"
                className="text-xs font-medium transition-colors duration-150"
                style={{ color: 'var(--color-text-muted)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-primary)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-muted)')}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </footer>

    </div>
  );
}
