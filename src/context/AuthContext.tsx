import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

interface UserProfile {
  id: string;
  auth_id: string;
  full_name: string;
  email: string;
  role: 'student' | 'driver' | 'admin';
  phone?: string;
  student_id?: string;
  license_number?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const SESSION_KEY = 'shuttle_session';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // On app start, check if there's a saved session in localStorage
    const saved = localStorage.getItem(SESSION_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Verify it's not expired
        if (parsed.expires_at && Date.now() / 1000 < parsed.expires_at) {
          setUser(parsed.profile);
        } else {
          localStorage.removeItem(SESSION_KEY);
        }
      } catch {
        localStorage.removeItem(SESSION_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
    // Also clear any supabase storage
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('sb-')) localStorage.removeItem(key);
    });
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Called by LoginPage after successful login to save session
export function saveSession(profile: UserProfile, expiresAt: number) {
  localStorage.setItem(SESSION_KEY, JSON.stringify({ profile, expires_at: expiresAt }));
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
