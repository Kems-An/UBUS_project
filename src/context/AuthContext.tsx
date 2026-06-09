import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

const SUPABASE_URL    = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

interface UserProfile {
  id: string;
  auth_id: string;
  full_name: string;
  email: string;
  role: 'student' | 'driver' | 'admin';
  phone?: string;
  student_id?: string;
  fleetId?: string;
  license_number?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const SESSION_KEY    = 'shuttle_session';
const SESSION_DURATION_MS = 30 * 60 * 1000; // 30 minutes in milliseconds

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user,      setUser]      = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkSession();
  }, []);

  // ── Check session validity on app load ──
  const checkSession = () => {
    const saved = localStorage.getItem(SESSION_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Use our 30-min local expiry (session_expires_at), not Supabase's token expiry
        if (parsed.session_expires_at && Date.now() < parsed.session_expires_at) {
          setUser(parsed.profile);
        } else {
          // Session expired — clear and force re-login
          localStorage.removeItem(SESSION_KEY);
        }
      } catch {
        localStorage.removeItem(SESSION_KEY);
      }
    }
    setIsLoading(false);
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
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

// ── Called by LoginPage after successful login ──
// Saves session with a 30-minute local expiry timestamp
export function saveSession(profile: UserProfile, _supabaseExpiresAt: number) {
  localStorage.setItem(SESSION_KEY, JSON.stringify({
    profile,
    session_expires_at: Date.now() + SESSION_DURATION_MS, // 30 mins from now
  }));
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}

// ── Check if platform charges are paid for this semester ──
const PLATFORM_CHARGE_KEY = 'platform_charge_paid';

export function getPlatformChargeSemester(): string {
  // Semester key: e.g. "2024-S2" — change when new semester starts
  const now = new Date();
  const year = now.getFullYear();
  const semester = now.getMonth() < 6 ? 'S1' : 'S2';
  return `${year}-${semester}`;
}

export async function checkPlatformCharge(authId: string): Promise<boolean> {
  const semesterKey = getPlatformChargeSemester();
  const localKey    = `${PLATFORM_CHARGE_KEY}_${authId}_${semesterKey}`;

  // Check local cache first (fast)
  if (localStorage.getItem(localKey) === 'paid') return true;

  // Check Supabase platform_charges table
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/platform_charges?user_id=eq.${authId}&semester=eq.${semesterKey}&status=eq.paid&select=id`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
      }
    );
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      localStorage.setItem(localKey, 'paid'); // cache it
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

export function markPlatformChargePaid(authId: string) {
  const semesterKey = getPlatformChargeSemester();
  const localKey    = `${PLATFORM_CHARGE_KEY}_${authId}_${semesterKey}`;
  localStorage.setItem(localKey, 'paid');
}
