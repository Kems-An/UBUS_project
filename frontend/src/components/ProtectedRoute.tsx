import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/* ============================================================
   PROTECTED ROUTE
   Wraps any page that requires a logged-in user.
   If not logged in → redirects to /login.
   Usage in App.tsx:
     <Route path="/dashboard/student" element={
       <ProtectedRoute><StudentDashboard /></ProtectedRoute>
     } />
   ============================================================ */

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
