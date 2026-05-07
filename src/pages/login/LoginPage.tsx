import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, HelpCircle, ArrowRight } from 'lucide-react';
import logo from "../../assets/images/logo.png";
import campusImg from "../../assets/images/rounded1.jpg";
import { saveSession } from '../../context/AuthContext';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const roles = [
  { id: 'student', label: 'Student', icon: '🎓' },
  { id: 'driver', label: 'Driver', icon: '🚌' },
  { id: 'admin', label: 'Admin', icon: '🛡️' },
];

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [debugMsg, setDebugMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setDebugMsg('Signing in...');

    try {
      // Step 1: Sign in via raw fetch
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
        setDebugMsg('❌ ' + (authData.error_description || authData.msg || 'Wrong email or password'));
        setLoading(false);
        return;
      }

      const accessToken = authData.access_token;
      const userId = authData.user?.id;
      const expiresAt = authData.expires_at;

      if (!accessToken || !userId) {
        setDebugMsg('❌ No token received. Try again.');
        setLoading(false);
        return;
      }

      setDebugMsg('✅ Signed in. Fetching profile...');

      // Step 2: Fetch profile
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
        setDebugMsg('❌ Profile not found. Please re-register.');
        setLoading(false);
        return;
      }

      const profile = profiles[0];

      // Step 3: Save session
      saveSession(profile, expiresAt);

      setDebugMsg('✅ Welcome ' + profile.full_name + '! Redirecting...');

      // Step 4: Use window.location instead of navigate — forces full page reload
      // This ensures AuthContext re-reads localStorage with the new session
      setTimeout(() => {
        if (profile.role === 'student') window.location.href = '/dashboard/student';
        else if (profile.role === 'driver') window.location.href = '/dashboard/driver';
        else if (profile.role === 'admin') window.location.href = '/dashboard/admin';
        else setDebugMsg('❌ Unknown role: ' + profile.role);
      }, 800);

    } catch (err: any) {
      setDebugMsg('❌ Unexpected error: ' + err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <header className="fixed top-0 w-full z-50 h-20 flex items-center bg-white/80 backdrop-blur-md border-b border-slate-200/60 px-8">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <Link to="/" className="w-32 hover:opacity-80 transition-opacity">
            <img src={logo} alt="Academic Velocity" />
          </Link>
          <Link to="/help" className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">
            <HelpCircle size={18} /> Help Center
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center pt-20 p-6">
        <div className="w-full max-w-6xl grid md:grid-cols-2 bg-white rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200 border border-slate-100">
          
          <div className="hidden md:block relative p-16 overflow-hidden">
            <img src={campusImg} className="absolute inset-0 w-full h-full object-cover scale-105" alt="Campus" />
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-900/40 to-transparent" />
            <div className="relative z-10 h-full flex flex-col justify-end">
              <div className="bg-lime-400 w-16 h-1.5 mb-8 rounded-full" />
              <h1 className="text-5xl font-black text-white mb-6 tracking-tight leading-[1.1]">
                Your campus,<br/>synchronized.
              </h1>
              <p className="text-slate-200 text-lg max-w-md leading-relaxed">
                Log in to access real-time shuttle tracking, optimized routes, and campus-wide transit logistics.
              </p>
            </div>
          </div>

          <div className="p-10 md:p-20 flex flex-col justify-center">
            <div className="mb-10">
              <h2 className="text-3xl font-black text-slate-900 mb-2">Welcome Back</h2>
              <p className="text-slate-500 font-medium italic">Please select your role to continue.</p>
            </div>

            <div className="flex p-1.5 bg-slate-100 rounded-2xl mb-6">
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300 ${
                    selectedRole === role.id 
                    ? 'bg-white text-slate-900 shadow-md' 
                    : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <span className="mr-2">{role.icon}</span> {role.label}
                </button>
              ))}
            </div>

            {debugMsg && (
              <div className={`mb-6 p-4 rounded-xl text-sm font-mono font-bold border ${
                debugMsg.startsWith('❌') 
                  ? 'bg-rose-50 border-rose-200 text-rose-700' 
                  : debugMsg.startsWith('✅')
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                  : 'bg-blue-50 border-blue-200 text-blue-700'
              }`}>
                {debugMsg}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">University Email</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-lime-600 transition-colors" size={20} />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-lime-400/10 focus:border-lime-500 outline-none transition-all placeholder:text-slate-300"
                    placeholder="name@university.edu"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Password</label>
                  <Link to="/forgot" className="text-xs font-bold text-lime-600 hover:text-lime-700">Forgot Password?</Link>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-lime-600 transition-colors" size={20} />
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-lime-400/10 focus:border-lime-500 outline-none transition-all"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-lg shadow-xl shadow-slate-900/20 hover:bg-slate-800 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                {loading ? 'Signing in...' : <> Sign In <ArrowRight className="group-hover:translate-x-1 transition-transform" /> </>}
              </button>
            </form>

            <p className="mt-10 text-center text-slate-500 font-medium">
              Don't have an account? <Link to="/register" className="text-slate-900 font-bold border-b-2 border-lime-400 pb-0.5 hover:border-slate-900 transition-all ml-1">Register your ID</Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
