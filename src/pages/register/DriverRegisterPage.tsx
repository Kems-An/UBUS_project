import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldIcon, CheckCircle2, XCircle } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
  { auth: { persistSession: false } }
);

export default function DriverRegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: '', licenseNumber: '', phone: '', email: '', password: '',
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
            phone: form.phone.trim(),
            license_number: form.licenseNumber.trim(),
            role: 'driver',
          }),
        }
      );

      if (!response.ok) {
        const errText = await response.text();
        setStatus({ type: 'error', msg: 'Profile save failed: ' + errText });
        setLoading(false);
        return;
      }

      setStatus({ type: 'success', msg: 'Driver account created! Redirecting to login...' });
      setLoading(false);
      setTimeout(() => navigate('/login'), 2000);

    } catch (err: any) {
      setStatus({ type: 'error', msg: 'Unexpected error: ' + err.message });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-12 px-6 flex justify-center">

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

      <div className="w-full max-w-4xl grid md:grid-cols-2 bg-white rounded-[2rem] shadow-xl overflow-hidden border border-slate-100">
        
        <div className="p-12 bg-gradient-to-b from-lime-500 to-lime-600 flex flex-col">
          <h2 className="text-4xl font-black text-slate-900 mb-6 leading-tight">Drive with<br/>Velocity.</h2>
          <p className="text-slate-800 font-medium mb-10">Join our network of elite campus transit partners.</p>
          <div className="space-y-6 mt-auto">
            <div className="bg-white/30 backdrop-blur-md p-5 rounded-2xl border border-white/20">
              <div className="flex items-center gap-3 mb-2 font-black text-slate-900">
                <ShieldIcon size={20} /> Safety First
              </div>
              <p className="text-sm text-slate-800 font-medium leading-relaxed">
                All drivers undergo a background check and university-led safety orientation.
              </p>
            </div>
            <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-xl">
              <p className="text-xs font-bold uppercase tracking-widest text-lime-400 mb-1">Status</p>
              <h4 className="font-bold">Pending Approval</h4>
              <p className="text-xs text-slate-400 mt-2 italic">Standard verification: 24–48 hours.</p>
            </div>
          </div>
        </div>

        <div className="p-12 md:p-16">
          <h3 className="text-2xl font-black text-slate-900 mb-8 tracking-tight">Driver Registration</h3>
          <form onSubmit={handleSignup} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Full Legal Name</label>
              <input value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-lime-400/10 focus:border-lime-500 outline-none transition-all"
                placeholder="Sarah Jenkins" required />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">University Email</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-lime-400/10 focus:border-lime-500 outline-none transition-all"
                placeholder="driver@university.edu" required />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Driver's License ID</label>
              <input value={form.licenseNumber} onChange={(e) => setForm({ ...form, licenseNumber: e.target.value })}
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-lime-400/10 focus:border-lime-500 outline-none transition-all"
                placeholder="D882-XXX-XXX" required />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Phone Number</label>
              <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-lime-400/10 focus:border-lime-500 outline-none transition-all"
                placeholder="+237 600-000-000" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Password</label>
              <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-lime-400/10 focus:border-lime-500 outline-none transition-all"
                placeholder="••••••••" required minLength={6} />
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:shadow-2xl transition-all mt-4 disabled:opacity-50">
              {loading ? 'Creating account...' : 'Apply to Drive'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
