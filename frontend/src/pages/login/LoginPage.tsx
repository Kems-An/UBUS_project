import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Hash, Lock, HelpCircle, ArrowRight, Eye, EyeOff } from 'lucide-react';
import logo from "../../assets/images/logo.png";
import campusImg from "../../assets/images/rounded1.jpg";
import { supabase } from "../../lib/superbaseClient";

const roles = [
  { id: 'student', label: 'Student', icon: '🎓' },
  { id: 'driver', label: 'Driver', icon: '🚌' },
  { id: 'admin', label: 'Admin', icon: '🛡️' },
] as const;

type Role = typeof roles[number]['id'];

export default function LoginPage() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<Role>('student');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ FIXED STATE (ONLY EMAIL + PASSWORD)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. LOGIN WITH SUPABASE (EMAIL + PASSWORD ONLY)
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      const user = data.user;

      // 2. GET USER PROFILE FROM DATABASE
      const { data: profile, error: profileError } = await supabase
        .from("users")
        .select("full_name, role")
        .eq("auth_id", user.id)
        .single();

      if (profileError || !profile) {
        throw new Error("User profile not found");
      }

      // 3. ROLE CHECK
      if (profile.role !== selectedRole) {
        throw new Error(`You are registered as ${profile.role}`);
      }

      // 4. SAVE NAME FOR WELCOME MESSAGE
      localStorage.setItem("user_name", profile.full_name);

      // 5. REDIRECT
      navigate(`/${profile.role}/dashboard`);

    } catch (error: any) {
      alert(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">

      {/* HEADER (UNCHANGED) */}
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

      {/* MAIN (UNCHANGED UI) */}
      <main className="flex-1 flex items-center justify-center pt-20 p-6">
        <div className="w-full max-w-6xl grid md:grid-cols-2 bg-white rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200 border border-slate-100">

          {/* LEFT IMAGE SECTION (UNCHANGED) */}
          <div className="hidden md:block relative p-16 overflow-hidden">
            <img src={campusImg} className="absolute inset-0 w-full h-full object-cover scale-105" alt="Campus" />
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-900/40 to-transparent" />
            <div className="relative z-10 h-full flex flex-col justify-end">
              <div className="bg-lime-400 w-16 h-1.5 mb-8 rounded-full" />
              <h1 className="text-5xl font-black text-white mb-6 tracking-tight leading-[1.1]">
                Your campus,<br />synchronized.
              </h1>
              <p className="text-slate-200 text-lg max-w-md leading-relaxed">
                Log in to access real-time shuttle tracking and campus logistics.
              </p>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="p-10 md:p-20 flex flex-col justify-center">

            <div className="mb-10">
              <h2 className="text-3xl font-black text-slate-900 mb-2">Welcome Back</h2>
              <p className="text-slate-500 font-medium italic">
                Login as {selectedRole} to continue.
              </p>
            </div>

            {/* ROLE SWITCH (UNCHANGED UI) */}
            <div className="flex p-1.5 bg-slate-100 rounded-2xl mb-10">
              {roles.map((role) => (
                <button
                  key={role.id}
                  type="button"
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

            {/* FORM */}
            <form onSubmit={handleLogin} className="space-y-5">

              {/* EMAIL INPUT (NEW BUT REQUIRED) */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                  Email
                </label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-lime-400/10 focus:border-lime-500 outline-none transition-all"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                  Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-14 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-lime-400/10 focus:border-lime-500 outline-none transition-all"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-lg shadow-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {loading ? "Authenticating..." : "Sign In"}
                <ArrowRight size={18} />
              </button>
            </form>

            <p className="mt-10 text-center text-slate-500 font-medium">
              Don't have an account?{" "}
              <Link to="/register" className="text-slate-900 font-bold border-b-2 border-lime-400 ml-1">
                Register your ID
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}