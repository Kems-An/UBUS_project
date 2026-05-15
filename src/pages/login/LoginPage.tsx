import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Lock, 
  HelpCircle, 
  ArrowRight, 
  GraduationCap, 
  Bus, 
  ShieldCheck,
  Zap,
  Activity,
  Fingerprint
} from 'lucide-react';
import logo from "../../assets/images/logo.png";
import campusImg from "../../assets/images/rounded1.jpg";
import { saveSession } from '../../context/AuthContext';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Updated roles with React Icons instead of emojis
const roles = [
  { id: 'student', label: 'Student', icon: GraduationCap },
  { id: 'driver', label: 'Driver', icon: Bus },
  { id: 'admin', label: 'Admin', icon: ShieldCheck },
];

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | 'info' | null, msg: string }>({
    type: null, msg: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: 'info', msg: 'System: Initializing Handshake...' });

    try {
      const authRes = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON_KEY,
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password: password,
        }),
      });

      const authData = await authRes.json();

      if (!authRes.ok) {
        setStatus({ type: 'error', msg: `Auth Error: ${authData.error_description || 'Invalid Credentials'}` });
        setLoading(false);
        return;
      }

      const accessToken = authData.access_token;
      const userId = authData.user?.id;
      const expiresAt = authData.expires_at;

      setStatus({ type: 'info', msg: 'System: Fetching Profile Data...' });

      const profileRes = await fetch(
        `${SUPABASE_URL}/rest/v1/users?auth_id=eq.${userId}&select=*`,
        {
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );

      const profiles = await profileRes.json();

      if (!profileRes.ok || !profiles || profiles.length === 0) {
        setStatus({ type: 'error', msg: 'Sync Error: Profile Not Found' });
        setLoading(false);
        return;
      }

      const profile = profiles[0];
      saveSession(profile, expiresAt);

      setStatus({ type: 'success', msg: `Access Granted: Welcome ${profile.full_name.split(' ')[0]}` });

      setTimeout(() => {
        if (profile.role === 'student') window.location.href = '/dashboard/student';
        else if (profile.role === 'driver') window.location.href = '/dashboard/driver';
        else if (profile.role === 'admin') window.location.href = '/dashboard/admin';
        else setStatus({ type: 'error', msg: 'Protocol Error: Unknown Role' });
      }, 1000);

    } catch (err: any) {
      setStatus({ type: 'error', msg: 'Network Failure: Critical error' });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans relative">
      
      {/* ─── SYSTEM NOTIFICATION OVERLAY ─── */}
      {status.type && (
        <div className={`fixed top-10 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 px-8 py-4 bg-white rounded-2xl shadow-2xl border transition-all animate-in slide-in-from-top-4 duration-300 ${
          status.type === 'success' ? 'border-emerald-500 text-emerald-600' : 
          status.type === 'error' ? 'border-rose-500 text-rose-600' : 'border-blue-500 text-blue-600'
        }`}>
          <div className={`w-2 h-2 rounded-full animate-pulse ${
            status.type === 'success' ? 'bg-emerald-500' : 
            status.type === 'error' ? 'bg-rose-500' : 'bg-blue-500'
          }`} />
          <span className="font-black text-[11px] uppercase tracking-[0.15em] whitespace-nowrap">
            {status.msg}
          </span>
        </div>
      )}

      <header className="fixed top-0 w-full z-50 h-20 flex items-center bg-white/80 backdrop-blur-md border-b border-slate-200/60 px-8">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <Link to="/" className="w-32 hover:opacity-80 transition-opacity">
            <img src={logo} alt="Academic Velocity" />
          </Link>
          <Link to="/help" className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">
            <HelpCircle size={16} /> Help Center
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center pt-24 p-6">
        <div className="w-full max-w-6xl grid md:grid-cols-2 bg-white rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200 border border-slate-100">
          
          {/* ─── LEFT SIDE: BRANDING ─── */}
          <div className="hidden md:block relative p-16 overflow-hidden bg-slate-900">
            <img src={campusImg} className="absolute inset-0 w-full h-full object-cover opacity-50 scale-105" alt="Campus" />
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-900/40 to-transparent" />
            
            <div className="relative z-10 h-full flex flex-col justify-end">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-lime-400 w-12 h-1.5 rounded-full" />
                <Activity size={20} className="text-lime-400 animate-pulse" />
              </div>
              <h1 className="text-5xl font-black text-white mb-6 tracking-tighter leading-[1.1]">
                Your campus,<br/>synchronized.
              </h1>
              <p className="text-slate-300 text-lg max-w-sm font-medium leading-relaxed italic">
                Secure access to real-time shuttle tracking and optimized campus logistics.
              </p>
            </div>
          </div>

          {/* ─── RIGHT SIDE: FORM ─── */}
          <div className="p-10 md:p-20 flex flex-col justify-center">
            <div className="mb-8">
              <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight flex items-center gap-2">
                <Fingerprint className="text-lime-600" size={32} /> Welcome Back
              </h2>
              <p className="text-slate-400 font-bold text-[11px] uppercase tracking-widest flex items-center gap-1.5">
                <ShieldCheck size={12} /> Identity Verification
              </p>
            </div>

            {/* Role Selector with Icons */}
            <div className="flex p-1.5 bg-slate-100 rounded-2xl mb-8">
              {roles.map((role) => {
                const Icon = role.icon;
                return (
                  <button
                    key={role.id}
                    onClick={() => setSelectedRole(role.id)}
                    className={`flex-1 py-3 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all duration-300 ${
                      selectedRole === role.id 
                      ? 'bg-white text-slate-900 shadow-md' 
                      : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    <Icon size={14} className={selectedRole === role.id ? 'text-lime-600' : ''} />
                    {role.label}
                  </button>
                );
              })}
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-1">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1">
                  <Mail size={10} /> University Email
                </label>
                <div className="relative group">
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-lime-400/10 focus:border-lime-500 outline-none transition-all placeholder:text-slate-300 font-medium text-sm"
                    placeholder="name@university.edu"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                    <Lock size={10} /> Secure Password
                  </label>
                  <Link to="/forgot" className="text-[9px] font-black text-lime-600 hover:text-lime-700 uppercase tracking-widest">Forgot?</Link>
                </div>
                <div className="relative group">
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-lime-400/10 focus:border-lime-500 outline-none transition-all font-medium text-sm"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold text-base shadow-xl shadow-slate-900/10 hover:bg-slate-800 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 mt-4"
              >
                {loading ? 'Initializing...' : 'Authorize Access'} 
                {!loading && <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />}
              </button>
            </form>

            <p className="mt-10 text-center text-[11px] font-black text-slate-400 uppercase tracking-widest">
              No account? <Link to="/register" className="text-slate-900 border-b-2 border-lime-500 ml-1">Register ID</Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}