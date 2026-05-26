import { useState } from 'react';
import { saveSession } from '../../context/AuthContext';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const ADMIN_EMAIL = 'angelakemugne@gmail.com';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email.trim().toLowerCase() !== ADMIN_EMAIL) {
      setMsg('Access denied.');
      return;
    }

    const authRes = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
      },
      body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
    });

    const authData = await authRes.json();

    if (!authRes.ok) {
      setMsg('Wrong credentials.');
      return;
    }

    saveSession({
      id: authData.user.id,
      auth_id: authData.user.id,
      full_name: 'Admin',
      email: ADMIN_EMAIL,
      role: 'admin',
    }, authData.expires_at);

    window.location.href = '/dashboard/admin';
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <form onSubmit={handleLogin} className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-sm space-y-4">
        <h2 className="text-xl font-black text-slate-900">System Access</h2>
        {msg && <p className="text-rose-600 text-sm font-bold">{msg}</p>}
        <input type="email" value={email} onChange={e => setEmail(e.target.value)}
          className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none text-sm"
          placeholder="Email" required />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)}
          className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none text-sm"
          placeholder="Password" required />
        <button type="submit"
          className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-sm">
          Enter
        </button>
      </form>
    </div>
  );
}