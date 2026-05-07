import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';

export default function StudentProfilePage() {
  const { student } = useAuth();

  const [form, setForm] = useState({
    fullName: student?.name ?? '',
    email: student?.email ?? '',
    phone: '+237 600 123 456',
  });
  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [saved, setSaved] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  const inputStyle: React.CSSProperties = {
    background: 'var(--color-bg-soft)',
    border: '1.5px solid var(--color-border)',
    color: 'var(--color-text)',
    width: '100%',
    padding: '12px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
  };

  return (
    <div className="p-8 lg:p-12">
      <header className="mb-10">
        <h2 className="text-3xl font-bold mb-1" style={{ color: 'var(--color-primary-dark)', fontFamily: 'Manrope, sans-serif' }}>
          My Profile
        </h2>
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
          Manage your student information and security settings.
        </p>
      </header>

      <div className="max-w-4xl space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Avatar Card */}
          <div className="md:col-span-1 space-y-5">
            <div className="p-8 rounded-2xl shadow-sm text-center relative overflow-hidden bg-white border border-[var(--color-border)]">
              <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full pointer-events-none bg-[var(--color-secondary-light)] opacity-40 blur-3xl" />
              <div className="relative inline-block mb-4">
                <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl font-bold text-white border-4 border-[var(--color-secondary-light)] bg-[var(--color-primary)] shadow-sm">
                  {student?.name.charAt(0)}
                </div>
                <button className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center text-white shadow-md bg-[var(--color-primary)]">
                  ✏️
                </button>
              </div>
              <h3 className="font-bold text-lg mb-0.5 text-[var(--color-primary-dark)]">{student?.name}</h3>
              <p className="text-sm mb-3 text-[var(--color-text-muted)]">Computer Science Senior</p>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[var(--color-secondary-light)] text-[var(--color-primary-dark)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
                On Campus
              </span>
            </div>

            {/* Usage stats */}
            <div className="p-6 rounded-2xl bg-[var(--color-bg-muted)] border border-[var(--color-border)]">
              <p className="text-xs font-bold uppercase tracking-widest mb-4 text-[var(--color-text-muted)]">Shuttle Usage</p>
              {[
                ['Monthly Rides', '24'],
                ['Time Saved', '12.5 hrs'],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between items-center py-2 border-b border-black/5 last:border-0">
                  <span className="text-sm text-[var(--color-text-muted)]">{label}</span>
                  <span className="text-sm font-bold text-[var(--color-primary)]">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Personal Details Form */}
          <div className="md:col-span-2">
            <form onSubmit={handleSave} className="p-8 rounded-2xl shadow-sm bg-white border border-[var(--color-border)]">
              <h3 className="font-bold text-base mb-7 flex items-center gap-2 text-[var(--color-primary-dark)]">
                🪪 Personal Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 text-[var(--color-text-muted)]">Full Name</label>
                  <input name="fullName" type="text" value={form.fullName} onChange={handleChange} style={inputStyle} />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 text-[var(--color-text-muted)]">Student ID</label>
                  <input type="text" value={student?.studentId} readOnly style={{ ...inputStyle, background: 'var(--color-bg-muted)', cursor: 'not-allowed', opacity: 0.7 }} />
                </div>
                <div className="sm:col-span-1">
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 text-[var(--color-text-muted)]">University Email</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} style={inputStyle} />
                </div>
                <div className="sm:col-span-1">
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 text-[var(--color-text-muted)]">Phone Number</label>
                  <input name="phone" type="tel" value={form.phone} onChange={handleChange} style={inputStyle} />
                </div>
              </div>
              <div className="flex justify-end">
                <button type="submit" className="px-6 py-3 rounded-xl font-bold text-sm text-white shadow-md transition-all hover:-translate-y-0.5 bg-gradient-to-r from-[var(--color-primary-dark)] to-[var(--color-primary)]">
                  {saved ? '✅ Saved!' : '💾 Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Security & Emergency */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-2xl shadow-sm bg-white border border-[var(--color-border)]">
            <h3 className="font-bold text-base mb-6 flex items-center gap-2 text-[var(--color-primary-dark)]">🔒 Security</h3>
            <div className="space-y-4">
              <input type="password" placeholder="Current Password" value={currentPwd} onChange={e => setCurrentPwd(e.target.value)} style={inputStyle} />
              <input type="password" placeholder="New Password" value={newPwd} onChange={e => setNewPwd(e.target.value)} style={inputStyle} />
              <button className="text-sm font-bold text-[var(--color-primary)]">Change Password →</button>
            </div>
          </div>

          <div className="p-8 rounded-2xl flex flex-col justify-between border-l-4 border-[var(--color-primary)] bg-[var(--color-bg-soft)]">
            <div>
              <h3 className="font-bold text-base mb-3 text-[var(--color-primary-dark)]">Emergency Contact</h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-6">Keeping your contact up-to-date ensures safety across all routes.</p>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-white border border-[var(--color-border)]">
              <div>
                <p className="text-xs font-bold text-[var(--color-text-muted)] uppercase mb-0.5">Primary Contact</p>
                <p className="font-bold text-sm text-[var(--color-primary-dark)]">Maria Rivera (Mother)</p>
              </div>
              <button className="text-xl">✏️</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}