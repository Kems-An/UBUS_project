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
import StudentLayout from './components/StudentLayout';
import ProtectedRoute from './components/ProtectedRoute';
import StudentDashboard from './pages/dashboard/student/StudentDashboard';
import RoutesSchedulePage from './pages/dashboard/student/RouteSchedulePage';
import SeatSelectionPage from './pages/dashboard/student/SeatSelectionPage';
import PaymentPage from './pages/dashboard/student/PaymentPage';
import BookingConfirmationPage from './pages/dashboard/student/BookingConfirmationPage';
import NotificationsPage from './pages/dashboard/student/NotificationsPage';
import SupportPage from './pages/dashboard/student/SupportPage';
import StudentProfilePage from './pages/dashboard/student/StudentProfilePage';
import StudentBookingsPage from './pages/dashboard/student/StudentBookingPage';

import { supabase } from "./lib/superbaseClient";
import DriverLayout from './components/Driverlayout';
import DriverDashboard from './pages/dashboard/driver/DriverDashboard';
import DriverSchedule from './pages/dashboard/driver/DriverRoute';
import DriverProfile from './pages/dashboard/driver/DriverProfile';
import CommunicationsHelp from './pages/dashboard/driver/CommunicationsHelp';
import AdminDashboard from './pages/dashboard/admin/AdminDashboard';
import AdminLayout from './components/Adminlayout';
import Studentsmanagement from './pages/dashboard/admin/StudentManagement';
import HowItWorks from './pages/Howitworks';
import AboutUs from './pages/AboutUs';

async function testConnection() {
  const { data, error } = await supabase.from("test").select("*");
  console.log(data, error);
}

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
          <Route path='' element={<LandingPage />} />
          <Route path='/howitworks'  element={<HowItWorks />} />
          <Route path='/about'  element={<AboutUs />} />

        </Route>

        {/* Auth pages — each manages its own header/footer */}
        <Route path="/login"             element={<LoginPage />} />
        <Route path="/register"          element={<RegisterRolePage />} />
        <Route path="/register/student"  element={<StudentRegisterPage />} />
        <Route path="/register/driver"   element={<DriverRegisterPage />} />
        <Route path="/register/admin"    element={<AdminRegisterPage />} />

        {/* Placeholder routes — uncomment as you build each page:
        <Route path="/forgot-password"      element={<ForgotPasswordPage />} />
        
        
        <Route path="/dashboard/admin"      element={<AdminDashboard />} />
        */}

         {/* Student dashboard — all nested under StudentLayout sidebar */}
        <Route
          path="/dashboard/student"
          element={
            <ProtectedRoute>
              <StudentLayout />
            </ProtectedRoute>
          }
        >
          <Route index                       element={<StudentDashboard />} />
          <Route path="routes"               element={<RoutesSchedulePage />} />
          <Route path="seat-selection"       element={<SeatSelectionPage />} />
          <Route path="payment"              element={<PaymentPage />} />
          <Route path="booking-confirmation" element={<BookingConfirmationPage />} />
          <Route path="notifications"        element={<NotificationsPage />} />
          <Route path="support"              element={<SupportPage />} />
          <Route path="profile"              element={<StudentProfilePage />} />
          <Route path="Bookings"              element={<StudentBookingsPage />} />
        </Route>

        {/* Driver dashboard — all nested under StudentLayout sidebar */}

        <Route
          path="/dashboard/driver"
          element={
            <ProtectedRoute>
              <DriverLayout />
            </ProtectedRoute>
          }
        >
          <Route index                       element={<DriverDashboard />} />
          <Route path="routes"               element={<DriverSchedule />} />
          <Route path="booking-confirmation" element={<BookingConfirmationPage />} />
          <Route path="communicationshelp"        element={<CommunicationsHelp />} />
          
        
        </Route>

        
         {/* admin dashboard — all nested under StudentLayout sidebar */}
        <Route
  path="/dashboard/admin" // Lowercase to match sidebar links
  element={
    <ProtectedRoute>
      <AdminLayout />
    </ProtectedRoute>
  }
>
  <Route index element={<AdminDashboard />} />
  <Route path="students" element={<Studentsmanagement />} />
</Route>
        {/* Coming soon:
        <Route path="/dashboard/driver" element={<ProtectedRoute><DriverLayout /></ProtectedRoute>}>
          ...driver pages...
        </Route>
        <Route path="/dashboard/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          ...admin pages...
        </Route>
        */}

      </Routes>
    </BrowserRouter>
  );
}


{/*git add .
git commit -m "your message"
git push*/}