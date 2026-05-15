import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

/*
  Layout wraps every page with the shared Navbar and Footer.
  The <Outlet /> renders whichever page the current route points to.
*/
export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {/* pt-16 offsets the fixed navbar height */}
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
