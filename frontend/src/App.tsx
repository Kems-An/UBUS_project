import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

// Public pages (use shared Navbar + Footer via Layout)
import LandingPage from './pages/LandingPage';

// Auth pages (each has its own minimal header/footer)
import LoginPage            from './pages/login/LoginPage';
import RegisterRolePage     from './pages/register/RegisterRolePage';
import StudentRegisterPage  from './pages/register/StudentRegisterPage';
import DriverRegisterPage   from './pages/register/DriverRegisterPage';
import AdminRegisterPage   from './pages/register/AdminRegisterPage';

/*
  ROUTING STRUCTURE
  ─────────────────────────────────────────────
  /                     → Landing Page  (shared layout)

  /login                → Login         (own layout)
  /register             → Role picker   (own layout) ← "Sign Up" links here
  /register/student     → Student form  (own layout)
  /register/driver      → Driver form   (own layout)

  Coming soon (add as you build them):
  /forgot-password      → Forgot Password
  /dashboard/student    → Student Dashboard
  /dashboard/driver     → Driver Dashboard
  /dashboard/admin      → Admin Dashboard
  ─────────────────────────────────────────────
*/

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Pages that use the shared Navbar + Footer */}
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
        </Route>

        {/* Auth pages — each manages its own header/footer */}
        <Route path="/login"             element={<LoginPage />} />
        <Route path="/register"          element={<RegisterRolePage />} />
        <Route path="/register/student"  element={<StudentRegisterPage />} />
        <Route path="/register/driver"   element={<DriverRegisterPage />} />
        <Route path="/register/admin"    element={<AdminRegisterPage />} />

        {/* Placeholder routes — uncomment as you build each page:
        <Route path="/forgot-password"      element={<ForgotPasswordPage />} />
        <Route path="/dashboard/student"    element={<StudentDashboard />} />
        <Route path="/dashboard/driver"     element={<DriverDashboard />} />
        <Route path="/dashboard/admin"      element={<AdminDashboard />} />
        */}

      </Routes>
    </BrowserRouter>
  );
}
