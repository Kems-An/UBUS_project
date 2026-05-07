import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface Props {
  children: React.ReactNode;
  allowedRole?: 'student' | 'driver' | 'admin'; // optional role guard
}

export default function ProtectedRoute({ children, allowedRole }: Props) {
  const { isLoggedIn, isLoading, user } = useAuth();

  // Wait for auth check to finish before deciding
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500 font-medium">Loading...</p>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Optional: kick out wrong roles (e.g. student trying to reach /dashboard/admin)
  if (allowedRole && user?.role !== allowedRole) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}