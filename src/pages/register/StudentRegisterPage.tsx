import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Zap, Eye, EyeOff, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// Creating a FRESH supabase client here to avoid session conflicts
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
  { auth: { persistSession: false } }  // <-- KEY FIX: don't persist session during signup
);

export default function StudentRegisterPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null, msg: string }>({
    type: null, msg: ''
  });
  const [form, setForm] = useState({ 
    fullName: '', email: '', studentId: '', phone: '', password: '', agreed: false 
  });

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.agreed) {
      setStatus({ type: 'error', msg: 'Please agree to the terms of service.' });
      return;
    }

    if (form.password.length < 6) {
      setStatus({ type: 'error', msg: 'Password must be at least 6 characters.' });
      return;
    }

    setLoading(true);
    setStatus({ type: null, msg: '' });

    try {
      // Step 1: Create auth user
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
        setStatus({ type: 'error', msg: 'This email may already be registered. Please try logging in.' });
        setLoading(false);
        return;
      }

      // Step 2: Insert into users table using fetch directly (bypasses session issues)
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
            student_id: form.studentId.trim(),
            role: 'student',
          }),
        }
      );

      if (!response.ok) {
        const errText = await response.text();
        setStatus({ type: 'error', msg: 'Profile save failed: ' + errText });
        setLoading(false);
        return;
      }

      // Success
      setStatus({ type: 'success', msg: 'Registration Successful! Redirecting to login...' });
      setLoading(false);
      setTimeout(() => navigate('/login'), 2000);

    } catch (err: any) {
      setStatus({ type: 'error', msg: 'Unexpected error: ' + err.message });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative">
      
      {status.type && (
        <div className={`fixed top-10 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border transition-all ${
          status.type === 'success' 
            ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
            : 'bg-rose-50 border-rose-200 text-rose-800'
        }`}>
          {status.type === 'success' ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
          <span className="font-bold text-sm tracking-tight">{status.msg}</span>
        </div>
      )}

      <div className="w-full max-w-4xl grid md:grid-cols-2 bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-slate-100">
        
        {/* Left Side: Branding */}
        <div className="p-8 md:p-10 bg-gradient-to-b from-lime-500 to-lime-600 flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12 blur-2xl" />
          <h2 className="text-4xl font-black text-slate-900 mb-4 leading-tight tracking-tighter">Ride with <br/> Velocity.</h2>
          <p className="text-slate-800 font-bold text-base mb-8 max-w-[240px]">The smarter way to move across campus.</p>
          
          <div className="space-y-4 mt-auto">
            <div className="bg-white/20 backdrop-blur-md p-4 rounded-[1.5rem] border border-white/20">
              <div className="flex items-center gap-2 mb-1 font-black text-slate-900 text-sm italic">
                <Zap size={16} /> Priority Transit
              </div>
              <p className="text-xs text-slate-800 font-medium leading-relaxed">Instant access to live tracking and reservations.</p>
            </div>
            
            <div className="bg-slate-900 text-white p-4 rounded-[1.5rem] shadow-lg">
              <div className="flex items-center justify-between mb-1">
                <p className="text-[9px] font-black uppercase tracking-widest text-lime-400">Network Status</p>
                <div className="w-1.5 h-1.5 bg-lime-400 rounded-full animate-pulse" />
              </div>
              <h4 className="font-bold text-base italic tracking-tight">Active Campus</h4>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-center">
          <div className="mb-6 text-center md:text-left">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight underline decoration-lime-500 decoration-4 underline-offset-4">Create Account</h3>
            <p className="text-slate-400 font-bold text-[11px] mt-2 uppercase tracking-widest">Student Verification</p>
          </div>

          <form className="space-y-4" onSubmit={handleSignup}>
            <div className="space-y-1">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Legal Name</label>
              <input 
                required
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-lime-400/10 focus:border-lime-500 outline-none transition-all text-sm font-medium" 
                placeholder="Sarah Jenkins" 
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Student ID</label>
                <input 
                  required
                  value={form.studentId}
                  onChange={(e) => setForm({ ...form, studentId: e.target.value })}
                  className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-lime-400/10 focus:border-lime-500 outline-none transition-all text-sm font-medium" 
                  placeholder="ID-2026" 
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone</label>
                <input 
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-lime-400/10 focus:border-lime-500 outline-none transition-all text-sm font-medium" 
                  placeholder="6xx xxx xxx" 
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Email</label>
              <input 
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-lime-400/10 focus:border-lime-500 outline-none transition-all text-sm font-medium" 
                placeholder="s.jenkins@uni.edu" 
              />
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
              <div className="relative">
                <input 
                  required
                  type={showPassword ? "text" : "password"} 
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-lime-400/10 focus:border-lime-500 outline-none transition-all pr-12 text-sm font-medium" 
                  placeholder="••••••••"
                  minLength={6}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-300 hover:text-lime-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 py-1">
              <input 
                type="checkbox" 
                id="agreed"
                checked={form.agreed}
                onChange={(e) => setForm({...form, agreed: e.target.checked})}
                className="accent-lime-600 h-4 w-4 rounded cursor-pointer"
              />
              <label htmlFor="agreed" className="text-[10px] text-slate-500 font-bold uppercase tracking-tight cursor-pointer">
                I agree to terms of service.
              </label>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold text-base hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group mt-2 disabled:opacity-50"
            >
              {loading ? "Registering..." : "Create Account"} 
              {!loading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
            </button>
          </form> 
          
          <p className="mt-6 text-center text-[11px] font-black text-slate-400 uppercase tracking-widest">
            Member? <Link to="/login" className="text-slate-900 border-b-2 border-lime-500 ml-1">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
