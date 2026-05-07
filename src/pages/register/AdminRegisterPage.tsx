import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, BarChart3, Users, Truck, CheckCircle2, XCircle } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
  { auth: { persistSession: false } }
);

export default function AdminRegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: '', email: '', adminId: '', department: 'Transit Ops', password: '',
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null, msg: string }>({
    type: null, msg: ''
  });

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, msg: '' });

    try {
      const { data, error: authError } = await supabase.auth.signUp({
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });

      if (authError) {
        setStatus({ type: 'error', msg: authError.message });
        setLoading(false);
        return;
      }

      if (!data.user) {
        setStatus({ type: 'error', msg: 'This email may already be registered. Try logging in.' });
        setLoading(false);
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/users`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            'Prefer': 'return=minimal',
          },
          body: JSON.stringify({
            auth_id: data.user.id,
            full_name: form.fullName.trim(),
            email: form.email.trim().toLowerCase(),
            role: 'admin',
          }),
        }
      );

      if (!response.ok) {
        const errText = await response.text();
        setStatus({ type: 'error', msg: 'Profile save failed: ' + errText });
        setLoading(false);
        return;
      }

      setStatus({ type: 'success', msg: 'Admin account created! Redirecting to login...' });
      setLoading(false);
      setTimeout(() => navigate('/login'), 2000);

    } catch (err: any) {
      setStatus({ type: 'error', msg: 'Unexpected error: ' + err.message });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-12 px-6 flex justify-center items-center">

      {status.type && (
        <div className={`fixed top-10 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border ${
          status.type === 'success'
            ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
            : 'bg-rose-50 border-rose-200 text-rose-800'
        }`}>
          {status.type === 'success' ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
          <span className="font-bold text-sm">{status.msg}</span>
        </div>
      )}

      <div className="w-full max-w-5xl bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-slate-100">
        <div className="md:w-5/12 bg-slate-900 p-12 text-white flex flex-col justify-center">
          <div className="inline-flex p-3 bg-lime-400/10 text-lime-400 rounded-2xl mb-6 w-fit">
            <ShieldCheck size={32} />
          </div>
          <h2 className="text-4xl font-black mb-4 leading-tight">Administrator Console Access</h2>
          <p className="text-slate-400 mb-10 leading-relaxed">Request access to the university transit management suite.</p>
          <ul className="space-y-8">
            {[
              { icon: <Truck />, label: 'Fleet Control', desc: 'Deploy and monitor shuttle units.' },
              { icon: <BarChart3 />, label: 'Real-time Analytics', desc: 'Monitor peak travel times.' },
              { icon: <Users />, label: 'Staff Management', desc: 'Onboard and verify driver credentials.' },
            ].map((item, i) => (
              <li key={i} className="flex gap-4">
                <div className="text-lime-400 mt-1">{item.icon}</div>
                <div>
                  <h4 className="font-bold text-white">{item.label}</h4>
                  <p className="text-sm text-slate-500">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:w-7/12 p-12 md:p-16">
          <div className="max-w-md mx-auto">
            <h3 className="text-2xl font-black text-slate-900 mb-2">Request Credentials</h3>
            <p className="text-slate-500 mb-8 font-medium">Verify your university staff status to continue.</p>
            <form onSubmit={handleSignup} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Staff ID</label>
                  <input value={form.adminId} onChange={(e) => setForm({ ...form, adminId: e.target.value })}
                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-lime-400/10 focus:border-lime-500 outline-none transition-all"
                    placeholder="ADM-001" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Dept</label>
                  <select value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })}
                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-lime-400/10 outline-none">
                    <option>Transit Ops</option>
                    <option>Campus Safety</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Full Name</label>
                <input value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-lime-400/10 outline-none transition-all"
                  placeholder="John Doe" required />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">University Email</label>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-lime-400/10 outline-none transition-all"
                  placeholder="admin@university.edu" required />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Password</label>
                <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-lime-400/10 outline-none transition-all"
                  placeholder="••••••••" required minLength={6} />
              </div>
              <button type="submit" disabled={loading}
                className="w-full py-4 bg-lime-500 hover:bg-lime-600 text-slate-900 font-black rounded-xl transition-all shadow-lg mt-6 disabled:opacity-50">
                {loading ? 'Submitting...' : 'Submit Request'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
