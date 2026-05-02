import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, BarChart3, Users, Truck, Eye, EyeOff, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';
import { supabase } from "../../lib/superbaseClient";

export default function AdminRegisterPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Status Notification State
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null, msg: string }>({
    type: null,
    msg: ''
  });

  const [form, setForm] = useState({ 
    fullName: '', 
    email: '', 
    password: '' 
  });

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, msg: '' });

    // 1. Auth Sign Up
    const { data, error: authError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    });

    if (authError) {
      setStatus({ type: 'error', msg: authError.message });
      setLoading(false);
      return;
    }

    // 2. Database Insert into 'users' table
    const { error: dbError } = await supabase.from("users").insert([
      {
        auth_id: data.user?.id,
        full_name: form.fullName,
        email: form.email,
        role: "admin",
        status: "pending_verification" // Admins usually require manual backend activation
      },
    ]);

    if (dbError) {
      setStatus({ type: 'error', msg: "System error: " + dbError.message });
      setLoading(false);
    } else {
      setStatus({ type: 'success', msg: 'Access Request Sent! Redirecting...' });
      setLoading(false);
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative">
      
      {/* Floating Status Notification */}
      {status.type && (
        <div className={`fixed top-10 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border transition-all animate-in fade-in slide-in-from-top-4 duration-300 ${
          status.type === 'success' 
            ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
            : 'bg-rose-50 border-rose-200 text-rose-800'
        }`}>
          {status.type === 'success' ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
          <span className="font-bold text-sm tracking-tight">{status.msg}</span>
        </div>
      )}

      <div className="w-full max-w-4xl grid md:grid-cols-2 bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-slate-100">
        
        {/* Left Side: Admin Features (Dark Theme) */}
        <div className="p-8 md:p-10 bg-slate-900 text-white flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-lime-400/10 rounded-full -mr-16 -mt-16 blur-3xl" />
          
          <div className="inline-flex p-3 bg-lime-400/10 text-lime-400 rounded-xl mb-4 w-fit">
            <ShieldCheck size={28} />
          </div>
          <h2 className="text-3xl font-black mb-3 leading-tight tracking-tighter">
            Admin <br/> Console.
          </h2>
          <p className="text-slate-400 font-medium text-sm mb-8 leading-relaxed">
            University transit management and fleet oversight.
          </p>
          
          <div className="space-y-5 mt-auto">
            {[
              { icon: <Truck size={18} />, label: 'Fleet Control' },
              { icon: <BarChart3 size={18} />, label: 'Analytics' },
              { icon: <Users size={18} />, label: 'Staffing' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 group">
                <div className="text-lime-400 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-slate-300">
                  {item.label}
                </span>
              </div>
            ))}
            
            <div className="mt-4 pt-4 border-t border-slate-800">
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">Security Status</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse" />
                <span className="text-[11px] font-bold text-slate-300 italic">Encrypted Connection Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Compact Form */}
        <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-center">
          <div className="mb-6">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight underline decoration-lime-500 decoration-4 underline-offset-4">Request Access</h3>
            <p className="text-slate-400 font-bold text-[11px] mt-2 uppercase tracking-widest">Verification Required</p>
          </div>

          <form className="space-y-4" onSubmit={handleSignup}>
            <div className="space-y-1">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Legal Name</label>
              <input 
                required
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-lime-400/10 focus:border-lime-500 outline-none transition-all text-sm font-medium" 
                placeholder="Admin Staff Name" 
              />
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">University Email</label>
              <input 
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-lime-400/10 focus:border-lime-500 outline-none transition-all text-sm font-medium" 
                placeholder="staff@university.edu" 
              />
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Access Password</label>
              <div className="relative">
                <input 
                  required
                  type={showPassword ? "text" : "password"} 
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-lime-400/10 focus:border-lime-500 outline-none transition-all pr-12 text-sm font-medium" 
                  placeholder="••••••••" 
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

            <button 
              disabled={loading}
              className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold text-base hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group mt-4 disabled:opacity-50"
            >
              {loading ? "Processing..." : "Submit Request"} 
              {!loading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>
          
          <p className="mt-8 text-center text-[11px] font-black text-slate-400 uppercase tracking-widest">
            Back to <Link to="/" className="text-slate-900 border-b-2 border-lime-500 ml-1">Home</Link>
          </p>
        </div>
      </div>
    </div>
  );
}