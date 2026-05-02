import { useState } from 'react';

const TICKETS = [
  { title: 'Shuttle 402 Delay Inquiry', status: 'In Progress', statusBg: 'var(--color-secondary-light)', statusColor: 'var(--color-primary-dark)', body: 'I waited for the 402 shuttle at North Campus for 20 minutes...', updated: 'Updated 2h ago', replies: '3 replies' },
  { title: 'Route Suggestion: Engineering Hub', status: 'Resolved', statusBg: 'var(--color-bg-muted)', statusColor: 'var(--color-text-muted)', body: 'It would be very beneficial to have a direct route...', updated: 'Oct 24, 2024', replies: 'Closed' },
  { title: 'App Notification Issues', status: 'Resolved', statusBg: 'var(--color-bg-muted)', statusColor: 'var(--color-text-muted)', body: 'The push notifications aren\'t showing up...', updated: 'Oct 12, 2024', replies: '' },
];

const CATEGORIES = ['Route Delay or Cancellation', 'Lost & Found', 'App Technical Support', 'General Feedback'];

const RESOURCES = [
  { icon: '📖', title: "Rider's Guide", desc: 'Essential campus transit rules and etiquette for every student traveler.' },
  { icon: '❓', title: 'Transit FAQ', desc: 'Find quick answers about scheduling, holiday breaks, and campus events.' },
  { icon: '🗺️', title: 'Live Map View', desc: 'Switch to real-time tracking for all active shuttle routes across campus.' },
];

export default function SupportPage() {
  const [form, setForm] = useState({ subject: '', category: '', description: '' });

  const inputStyle: React.CSSProperties = {
    background: 'var(--color-white)',
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
      <header className="mb-10 max-w-2xl">
        <span className="text-xs font-bold uppercase tracking-widest block mb-2 text-[var(--color-primary)]">Student Assistance</span>
        <h2 className="text-3xl font-bold mb-2 text-[var(--color-primary-dark)]">How can we help?</h2>
        <p className="text-sm text-[var(--color-text-muted)]">Browse resources or track your inquiries.</p>
      </header>

      <div className="grid grid-cols-12 gap-8 max-w-6xl">
        <section className="col-span-12 lg:col-span-7 space-y-5">
          <h3 className="font-bold text-lg text-[var(--color-primary-dark)]">Inquiry History</h3>
          <div className="space-y-4">
            {TICKETS.map(t => (
              <div key={t.title} className="p-6 rounded-xl bg-white border border-[var(--color-border)] hover:bg-[var(--color-bg-soft)] transition-colors cursor-pointer">
                <div className="flex justify-between items-start mb-2 gap-3">
                  <h4 className="font-bold text-sm text-[var(--color-primary-dark)]">{t.title}</h4>
                  <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: t.statusBg, color: t.statusColor }}>{t.status}</span>
                </div>
                <p className="text-sm mb-4 text-[var(--color-text-muted)] line-clamp-1">{t.body}</p>
                <div className="flex items-center gap-5 text-xs text-[var(--color-text-muted)]">
                  <span>🕐 {t.updated}</span>
                  {t.replies && <span>💬 {t.replies}</span>}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="col-span-12 lg:col-span-5">
          <div className="p-7 rounded-2xl bg-[var(--color-bg-soft)] border-t-4 border-[var(--color-primary)] sticky top-8">
            <h3 className="font-bold text-lg mb-1 text-[var(--color-primary-dark)]">New Inquiry</h3>
            <form className="space-y-4 mt-6">
              <input placeholder="Subject" style={inputStyle} value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} />
              <select style={inputStyle} value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                <option value="">Select Category</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <textarea placeholder="Description..." rows={5} style={{ ...inputStyle, resize: 'none' }} value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
              <button className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[var(--color-primary-dark)] to-[var(--color-primary)]">📤 Submit</button>
            </form>
          </div>
        </section>
      </div>

      <section className="mt-16 max-w-6xl">
        <h3 className="font-bold text-lg mb-6 text-[var(--color-primary-dark)]">Instant Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {RESOURCES.map(({ icon, title, desc }) => (
            <div key={title} className="p-6 rounded-xl bg-white border border-[var(--color-border)] hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 bg-[var(--color-bg-muted)]">{icon}</div>
              <h4 className="font-bold mb-2 text-[var(--color-primary-dark)]">{title}</h4>
              <p className="text-sm text-[var(--color-text-muted)]">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}