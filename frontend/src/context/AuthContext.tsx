import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

/* ============================================================
   MULTI-ROLE AUTH CONTEXT
   Supports both Student and Driver profiles.
   ============================================================ */

interface Student {
  name: string;
  email: string;
  studentId: string;
  role: 'student';
}

interface Driver {
  name: string;
  email: string;
  fleetId: string;
  role: 'driver';
  status: 'active' | 'off-duty';
}

// A Union type to handle any logged-in user
type User = Student | Driver;

interface AuthContextType {
  user: User | null;
  // Role-specific helpers for easy access in layouts
  student: Student | null;
  driver: Driver | null;
  isLoggedIn: boolean;
  login: (role: 'student' | 'driver') => void;
  logout: () => void;
}

const MOCK_STUDENT: Student = {
  name: 'Alex Rivera',
  email: 'a.rivera@university.edu',
  studentId: '2024-8812',
  role: 'student',
};

const MOCK_DRIVER: Driver = {
  name: 'Marcus Chen',
  email: 'm.chen@velocity.edu',
  fleetId: 'AV-902',
  role: 'driver',
  status: 'active',
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Toggle this initial state between MOCK_STUDENT and MOCK_DRIVER to test layouts
  const [user, setUser] = useState<User | null>(MOCK_STUDENT);

  const login = (role: 'student' | 'driver') => {
    setUser(role === 'student' ? MOCK_STUDENT : MOCK_DRIVER);
  };

  const logout = () => setUser(null);

  // Derived values for role-specific access
  const student = user?.role === 'student' ? user : null;
  const driver = user?.role === 'driver' ? user : null;

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        student, 
        driver, 
        isLoggedIn: !!user, 
        login, 
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}