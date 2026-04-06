import { useState } from 'react';
import { Link } from 'react-router-dom';

/* ============================================================
   ADMIN REGISTRATION PAGE
   - Left panel: green branding + admin feature highlights
   - Right panel: registration form
   - Fields: Full Name, Email, Admin ID, Department, Password
   - Note: This page would normally be invite-only.
     For the prototype, it's accessible at /register/admin
     but in production, access should be restricted.
   ============================================================ */

// Department options for the select dropdown
const DEPARTMENTS = [
  'Transit Operations',
  'Campus Security',
  'Student Affairs',
  'Facilities Management',
];

export default function AdminRegisterPage() {
  const [form, setForm] = useState({
    fullName:   '',
    email:      '',
    adminId:    '',
    department: '',
    password:   '',
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log('Admin registration:', form);
    // TODO: call Supabase signUp + set role as 'admin' + flag for super-admin approval
  }

  // Shared input style — keeps all inputs consistent
  const inputStyle: React.CSSProperties = {
    background:  'var(--color-bg-soft)',
    border:      '1.5px solid var(--color-border)',
    color:       'var(--color-text)',
  };

  function onFocus(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) {
    e.currentTarget.style.borderColor = 'var(--color-primary)';
  }
  function onBlur(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) {
    e.currentTarget.style.borderColor = 'var(--color-border)';
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
      <main
        className="flex-1 pt-24 pb-16 px-6 flex items-center justify-center"
        style={{ background: 'var(--color-secondary-light)' }}
      >
        <div
          className="w-full max-w-5xl flex flex-col md:flex-row overflow-hidden rounded-2xl shadow-lg"
          style={{ background: 'var(--color-white)' }}
        >

          {/* ── Left: info panel ── */}
          <div
            className="w-full md:w-5/12 p-10 md:p-14 flex flex-col justify-center relative overflow-hidden text-white"
            style={{ background: 'linear-gradient(160deg, var(--color-primary-dark) 0%, var(--color-primary) 100%)' }}
          >
            {/* Subtle glow blobs */}
            <div
              className="absolute -top-10 -left-10 w-40 h-40 rounded-full pointer-events-none"
              style={{ background: 'rgba(255,255,255,0.08)', filter: 'blur(40px)' }}
            />
            <div
              className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
              style={{ background: 'rgba(255,255,255,0.06)', filter: 'blur(60px)' }}
            />

            <div className="relative z-10">
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-8"
                style={{ background: 'rgba(255,255,255,0.15)' }}
              >
                🛡️
              </div>

              <h1
                className="text-4xl font-extrabold tracking-tight mb-3 leading-tight"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                Administrator Access
              </h1>
              <p className="text-lg mb-10" style={{ color: 'rgba(255,255,255,0.8)' }}>
                Empowering Campus Mobility
              </p>

              {/* Feature list */}
              <ul className="space-y-6">
                {[
                  { icon: '🚌', title: 'Fleet Control',        desc: 'Manage shuttle deployments and real-time route adjustments.' },
                  { icon: '📊', title: 'Real-time Analytics',  desc: 'Visualize transit demand patterns and campus congestion data.' },
                  { icon: '👥', title: 'Driver Oversight',     desc: 'Monitor schedules, performance metrics, and safety compliance.' },
                ].map(({ icon, title, desc }) => (
                  <li key={title} className="flex items-start gap-4">
                    <span className="text-xl mt-0.5">{icon}</span>
                    <div>
                      <h3 className="font-semibold text-sm mb-0.5" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        {title}
                      </h3>
                      <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
                        {desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── Right: form ── */}
          <div className="w-full md:w-7/12 p-10 md:p-14">
            <div className="max-w-md mx-auto">

              {/* Heading */}
              <div className="mb-8">
                <h2
                  className="text-2xl font-bold mb-1"
                  style={{ color: 'var(--color-primary-dark)', fontFamily: 'Manrope, sans-serif' }}
                >
                  Create Admin Account
                </h2>
                <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                  Provide your official university credentials to request access.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--color-text-muted)' }}>
                    Full Name
                  </label>
                  <input
                    name="fullName"
                    type="text"
                    placeholder="Dr. Sarah Jenkins"
                    value={form.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-150"
                    style={inputStyle}
                    onFocus={onFocus}
                    onBlur={onBlur}
                  />
                </div>

                {/* University Email */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--color-text-muted)' }}>
                    University Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder="s.jenkins@university.edu"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-150"
                    style={inputStyle}
                    onFocus={onFocus}
                    onBlur={onBlur}
                  />
                  <p className="mt-1.5 text-xs italic" style={{ color: 'var(--color-text-muted)' }}>
                    Must end in a valid .edu domain for validation.
                  </p>
                </div>

                {/* Admin ID + Department (side by side) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--color-text-muted)' }}>
                      Staff / Admin ID
                    </label>
                    <input
                      name="adminId"
                      type="text"
                      placeholder="ADM-9942"
                      value={form.adminId}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-150"
                      style={inputStyle}
                      onFocus={onFocus}
                      onBlur={onBlur}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--color-text-muted)' }}>
                      Department
                    </label>
                    <select
                      name="department"
                      value={form.department}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-150 appearance-none"
                      style={{
                        ...inputStyle,
                        color: form.department ? 'var(--color-text)' : 'var(--color-text-muted)',
                      }}
                      onFocus={onFocus}
                      onBlur={onBlur}
                    >
                      <option value="" disabled>Select Dept</option>
                      {DEPARTMENTS.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--color-text-muted)' }}>
                    Secure Password
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
                    style={inputStyle}
                    onFocus={onFocus}
                    onBlur={onBlur}
                  />
                </div>

                {/* Submit */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 shadow-md transition-all duration-150 hover:-translate-y-0.5 active:scale-[0.98]"
                    style={{ background: 'linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 100%)' }}
                  >
                    Request Admin Account
                    <span>→</span>
                  </button>
                </div>

              </form>

              {/* Sign in link */}
              <p className="mt-8 text-center text-sm" style={{ color: 'var(--color-text-muted)' }}>
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="font-bold"
                  style={{ color: 'var(--color-primary)' }}
                >
                  Sign In
                </Link>
              </p>

            </div>
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer
        className="py-10 px-8 border-t"
        style={{ background: 'var(--color-bg-muted)', borderColor: 'var(--color-border)' }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--color-text-muted)' }}>
            © {new Date().getFullYear()} Academic Velocity. The Fluid Campus Transit Initiative.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Campus Map', 'Support'].map(label => (
              <a
                key={label}
                href="#"
                className="text-xs font-semibold uppercase tracking-wide underline underline-offset-4 transition-colors duration-150"
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
