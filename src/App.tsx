import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import IntroLoader from './components/IntroLoader';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

import '@maptiler/sdk/dist/maptiler-sdk.css';

// Public pages
import LandingPage from './pages/LandingPage';

// Auth pages
import LoginPage             from './pages/login/LoginPage';
import RegisterRolePage      from './pages/register/RegisterRolePage';
import StudentRegisterPage  from './pages/register/StudentRegisterPage';
import DriverRegisterPage   from './pages/register/DriverRegisterPage';
import StudentLayout from './components/StudentLayout';
import ProtectedRoute from './components/ProtectedRoute';
import StudentDashboard from './pages/dashboard/student/StudentDashboard';
import RoutesSchedulePage from './pages/dashboard/student/RouteSchedulePage';
import SeatSelectionPage from './pages/dashboard/student/StudentShuttleBooking/SeatSelectionPage';
import PaymentPage from './pages/dashboard/student/StudentShuttleBooking/PaymentPage';
import BookingConfirmationPage from './pages/dashboard/student/StudentShuttleBooking/BookingConfirmationPage';
import StudentProfilePage from './pages/dashboard/student/StudentProfilePage';
import StudentBookingsPage from './pages/dashboard/student/StudentResumePage';

import { supabase } from "./lib/superbaseClient";
import DriverLayout from './components/Driverlayout';
import DriverDashboard from './pages/dashboard/driver/DriverDashboard';
import DriverSchedule from './pages/dashboard/driver/DriverRoute';
import DriverProfile from './pages/dashboard/driver/DriverProfile';
import CommunicationsHelp from './pages/dashboard/driver/CommunicationsHelp';
import AdminDashboard from './pages/dashboard/admin/AdminDashboard';
import AdminLayout from './components/Adminlayout';
import Studentsmanagement from './pages/dashboard/admin/StudentManagement';
import ContactUs from './pages/ContactPage';
import AboutUs from './pages/AboutUs';
import RouteSelectionPage from './pages/dashboard/student/StudentShuttleBooking/RouteSelectionPage';
import ShuttleSelectionPage from './pages/dashboard/student/StudentShuttleBooking/ShuttleSelectionPage';
import DriversManagement from './pages/dashboard/admin/DriverManagement';
import RoutesAnalytics from './pages/dashboard/admin/RouteAnalytics';
import FinancialsManagement from './pages/dashboard/admin/FinancialsManagements';
import AdminLoginPage from './pages/login/AdminLoginPage';
import TicketPage from './pages/dashboard/student/StudentShuttleBooking/TicketPage';

export default function App() {
  // Initialize state based on session storage to prevent the "flicker"
  const [isLoading, setIsLoading] = useState(() => {
    return !sessionStorage.getItem('ubus_intro_seen');
  });

  const handleComplete = () => {
    sessionStorage.setItem('ubus_intro_seen', 'true');
    setIsLoading(false);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <IntroLoader key="loader" onComplete={handleComplete} />
        )}
      </AnimatePresence>

      {/* 
          If it's a sub-page reload, isLoading is false immediately.
          The Loader won't even mount for a single millisecond.
      */}
      {!isLoading && (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path='' element={<LandingPage />} />
              <Route path='/contact'  element={<ContactUs />} />
              <Route path='/about'  element={<AboutUs />} />
            </Route>

            <Route path="/login"             element={<LoginPage />} />
            <Route path="/register"          element={<RegisterRolePage />} />
            <Route path="/register/student"  element={<StudentRegisterPage />} />
            <Route path="/register/driver"   element={<DriverRegisterPage />} />
            <Route path="/adminonly" element={<AdminLoginPage />} />
            

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
              <Route path="route-selection"       element={<RouteSelectionPage />} />
              <Route path="shuttle-selection"       element={<ShuttleSelectionPage />} />
              <Route path="payment"              element={<PaymentPage />} />
              <Route path="booking-confirmation" element={<BookingConfirmationPage />} />
              <Route path="ticket" element={<TicketPage />} />
      
              <Route path="profile"              element={<StudentProfilePage />} />
              <Route path="Bookings"              element={<StudentBookingsPage />} />
            </Route>

            <Route
              path="/dashboard/driver"
              element={
                <ProtectedRoute>
                  <DriverLayout />
                </ProtectedRoute>
              }
            >
              <Route index                       element={<DriverDashboard />} />
              <Route path="profile"               element={<DriverProfile />} />
              <Route path="routes"               element={<DriverSchedule />} />
              <Route path="booking-confirmation" element={<BookingConfirmationPage />} />
              <Route path="communicationshelp"        element={<CommunicationsHelp />} />
            </Route>

            <Route
              path="/dashboard/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="students" element={<Studentsmanagement />} />
              <Route path="drivers" element={<DriversManagement />} />
              <Route path="routes" element={<RoutesAnalytics />} />
              <Route path="financials" element={<FinancialsManagement />} />
            </Route>
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}