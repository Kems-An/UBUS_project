import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Zap, Eye, EyeOff, ArrowRight, CheckCircle2, XCircle, Check, X } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

import studentIllustration from "../../assets/images/studentillu.png"; 

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
  { auth: { persistSession: false } }
);

// ── Password validation rules ──
const PASSWORD_RULES = [
  { id: 'length',  label: 'At least 6 characters',          test: (p: string) => p.length >= 6 },
  { id: 'letter',  label: 'Contains a letter (a–z or A–Z)', test: (p: string) => /[a-zA-Z]/.test(p) },
  { id: 'number',  label: 'Contains a number (0–9)',         test: (p: string) => /[0-9]/.test(p) },
  { id: 'special', label: 'Contains a special character (!@#$%^&*...)', test: (p: string) => /[^a-zA-Z0-9]/.test(p) },
];

export default function StudentRegisterPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading,      setLoading]      = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null, msg: string }>({
    type: null, msg: ''
  });
  const [form, setForm] = useState({ 
    fullName: '', email: '', studentId: '', phone: '', password: '', agreed: false 
  });

  // ── Live password rule evaluation ──
  const ruleResults = PASSWORD_RULES.map(rule => ({
    ...rule,
    passed: rule.test(form.password),
  }));
  const allRulesPassed = ruleResults.every(r => r.passed);
  const showRules      = form.password.length > 0;

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.agreed) {
      setStatus({ type: 'error', msg: 'Please agree to the terms of service.' });
      return;
    }

    // Block submission if password doesn't meet all rules
    if (!allRulesPassed) {
      setStatus({ type: 'error', msg: 'Password does not meet all requirements. Please check below.' });
      return;
    }

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
        setStatus({ type: 'error', msg: 'This email may already be registered. Please try logging in.' });
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
            auth_id:    data.user.id,
            full_name:  form.fullName.trim(),
            email:      form.email.trim().toLowerCase(),
            phone:      form.phone.trim(),
            student_id: form.studentId.trim(),
            role:       'student',
          }),
        }
      );

      if (!response.ok) {
        const errText = await response.text();
        setStatus({ type: 'error', msg: 'Profile save failed: ' + errText });
        setLoading(false);
        return;
      }

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

      <div className="w-full max-w-5xl grid md:grid-cols-2 bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 p-4 gap-4">
        
        {/* Left Side: Branding Panel — UNCHANGED */}
        <div className="bg-[#f8fafc] rounded-[2rem] border border-slate-200/60 p-8 md:p-10 flex flex-col justify-between relative overflow-hidden group min-h-[500px]">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-xs">
                <Zap size={14} className="text-lime-500 fill-lime-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-700">Priority Transit</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-lime-500 animate-pulse" />
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Live Workspace</span>
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight tracking-tighter">
              Ride with <br/> Velocity.
            </h2>
            <p className="text-slate-400 font-medium text-xs mt-2 max-w-[260px]">
              The smarter, high-performance transit layout configured for your daily campus commute operations.
            </p>
          </div>

          <div className="my-auto py-6 flex items-center justify-center relative z-10 w-full max-w-[280px] mx-auto mix-blend-multiply drop-shadow-sm transition-transform duration-500 group-hover:scale-[1.02]">
            <img src={studentIllustration} alt="Student Commuter Workspace Illustration" className="w-full h-auto object-contain max-h-[220px]" />
          </div>

          <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-xl border border-slate-800 relative z-10 transition-all duration-300 group-hover:border-lime-500/30">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[9px] font-black uppercase tracking-widest text-lime-400">Ecosystem Network Status</p>
              <div className="px-2 py-0.5 rounded-md bg-lime-500/10 border border-lime-500/20 text-[9px] font-extrabold text-lime-400 uppercase tracking-wider">Active</div>
            </div>
            <h4 className="font-bold text-sm tracking-tight text-slate-100">Automated Shuttle Dispatch Matrix</h4>
            <p className="text-[11px] text-slate-400 font-medium leading-normal mt-1">
              Isolated user sessions provide instantaneous real-time sync with network-wide bus tracking coordinates.
            </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="p-4 md:p-6 lg:p-8 flex flex-col justify-center">
          <div className="mb-6 text-center md:text-left">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight underline decoration-lime-500 decoration-4 underline-offset-4">Create Account</h3>
            <p className="text-slate-400 font-bold text-[11px] mt-2 uppercase tracking-widest">Student Verification</p>
          </div>

          <form className="space-y-4" onSubmit={handleSignup}>
            <div className="space-y-1">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Legal Name</label>
              <input required value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-lime-400/10 focus:border-lime-500 outline-none transition-all text-sm font-medium" 
                placeholder="Sarah Jenkins" />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Student ID</label>
                <input required value={form.studentId}
                  onChange={(e) => setForm({ ...form, studentId: e.target.value })}
                  className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-lime-400/10 focus:border-lime-500 outline-none transition-all text-sm font-medium" 
                  placeholder="ID-2026" />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone</label>
                <input required value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-lime-400/10 focus:border-lime-500 outline-none transition-all text-sm font-medium" 
                  placeholder="6xx xxx xxx" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Email</label>
              <input required type="email" value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-lime-400/10 focus:border-lime-500 outline-none transition-all text-sm font-medium" 
                placeholder="s.jenkins@uni.edu" />
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
              <div className="relative">
                <input required
                  type={showPassword ? "text" : "password"} 
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className={`w-full px-5 py-3 bg-slate-50 border rounded-xl focus:bg-white focus:ring-4 focus:ring-lime-400/10 outline-none transition-all pr-12 text-sm font-medium ${
                    showRules
                      ? allRulesPassed ? 'border-emerald-400 focus:border-emerald-500' : 'border-amber-400 focus:border-amber-500'
                      : 'border-slate-200 focus:border-lime-500'
                  }`}
                  placeholder="Min 6 chars, letters, numbers & symbols"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-300 hover:text-lime-600 transition-colors">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* ── Live password rules checklist ── */}
              {showRules && (
                <div className="mt-2 p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                  {ruleResults.map(rule => (
                    <div key={rule.id} className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                        rule.passed ? 'bg-emerald-500' : 'bg-slate-200'
                      }`}>
                        {rule.passed
                          ? <Check size={10} className="text-white" strokeWidth={3} />
                          : <X size={10} className="text-slate-400" strokeWidth={3} />
                        }
                      </div>
                      <span className={`text-[10px] font-bold ${rule.passed ? 'text-emerald-600' : 'text-slate-400'}`}>
                        {rule.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 py-1">
              <input type="checkbox" id="agreed" checked={form.agreed}
                onChange={(e) => setForm({...form, agreed: e.target.checked})}
                className="accent-lime-600 h-4 w-4 rounded cursor-pointer" />
              <label htmlFor="agreed" className="text-[10px] text-slate-500 font-bold uppercase tracking-tight cursor-pointer">
                I agree to terms of service.
              </label>
            </div>

            <button type="submit" disabled={loading}
              className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold text-base hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group mt-2 disabled:opacity-50">
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
