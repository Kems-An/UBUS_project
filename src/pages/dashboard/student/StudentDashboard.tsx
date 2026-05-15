import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
} from '@react-google-maps/api';
import { 
  MapPin, 
  Bus, 
  Leaf, 
  Calendar, 
  ArrowRight, 
  Clock, 
  Navigation 
} from 'lucide-react';

export default function StudentDashboard() {

  const { user } = useAuth();
  
{/*setting the google API*/}
  const { isLoaded } = useJsApiLoader({
  googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
});

  if (!isLoaded) {
  return <div>Loading Map...</div>;
}
  return (
    <div className="pt-4 pb-8 px-8 lg:px-12 max-w-7xl mx-auto">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <h2 className="text-4xl font-extrabold tracking-tight text-[var(--color-primary-dark)]">
            <h2 className="text-4xl font-extrabold tracking-tight text-[var(--color-primary-dark)]">
           Welcome, {user?.full_name}
</h2>
          </h2>
          <div className="flex items-center gap-2 mt-2 text-sm text-[var(--color-text-muted)]">
            <Clock size={16} className="text-[var(--color-primary)]" />
            <span>Next shuttle departs in 12 minutes from </span>
            <span className="font-semibold text-[var(--color-primary-dark)]">Central Hub</span>
          </div>
        </div>
        <Link 
          to="/dashboard/student/route-selection" 
          className="group flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-sm text-white bg-gradient-to-br from-[var(--color-primary-dark)] to-[var(--color-primary)] shadow-xl shadow-blue-900/10 hover:scale-[1.02] transition-transform"
        >
          <Bus size={18} />
          Book a Shuttle
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Live Tracker (Map Surface) */}
        <div className="md:col-span-8 h-[400px] rounded-[2rem] bg-white border border-[var(--color-border)] relative overflow-hidden shadow-sm">
          <div className="absolute top-6 left-6 z-10 p-5 rounded-2xl bg-white/80 backdrop-blur-md shadow-xl border border-white/20">
            <div className="flex items-center gap-3 mb-1">
              <div className="p-2 bg-[var(--color-primary-dark)] rounded-lg text-white">
                <Navigation size={16} />
              </div>
              <h3 className="font-bold text-sm text-[var(--color-primary-dark)]">Bus 402 • Route A</h3>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <p className="text-[11px] text-green-600 font-bold uppercase tracking-wider">Arriving in 3 mins</p>
            </div>
          </div>

          {/* google map intergration*/}
          <GoogleMap
  mapContainerStyle={{
    width: '100%',
    height: '100%',
  }}
  center={{
    lat: 4.1549,
    lng: 9.2884,
  }}
  zoom={15}
>
  <Marker
    position={{
      lat: 4.1549,
      lng: 9.2884,
    }}
  />
</GoogleMap>
        </div>

        {/* Impact Stats */}
<div className="md:col-span-4 p-10 rounded-[2rem] bg-[var(--color-primary-dark)] text-white flex flex-col justify-between relative overflow-hidden group">
  {/* Subtle Background Pattern - Changed icon to Bus for relevance */}
  <div className="absolute -right-10 -top-10 opacity-10 group-hover:scale-110 transition-transform duration-700">
    <Bus size={200} />
  </div>

  <div className="relative z-10">
    <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center mb-6 backdrop-blur-sm">
      <Clock size={24} className="text-blue-300" />
    </div>
    <h3 className="text-xl font-bold italic">With UBUS!!</h3>
    <p className="text-sm opacity-80 mt-1">Saved 12 hours of walking this month</p>
  </div>

  <div className="relative z-10 pt-10">
    <div className="flex items-baseline gap-2">
      <span className="text-7xl font-black tracking-tighter">24</span>
      <span className="text-[var(--color-primary)] font-bold text-xl">trips</span>
    </div>
    <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-50 mt-2">Lifetime Bookings</p>
  </div>
</div>
        {/* Upcoming Trip Timeline */}
        <div className="md:col-span-5 p-10 rounded-[2rem] bg-white border border-[var(--color-border)] shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <h3 className="font-bold text-[var(--color-primary-dark)] flex items-center gap-2">
              <Calendar size={18} className="text-[var(--color-primary)]" />
              Upcoming Trip
            </h3>
            <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-[var(--color-bg-muted)] border border-[var(--color-border)] uppercase tracking-wider">
              Today
            </span>
          </div>

          <div className="flex gap-6">
            <div className="flex flex-col items-center py-1">
              <div className="w-4 h-4 rounded-full border-4 border-[var(--color-primary)] bg-white ring-4 ring-blue-50" />
              <div className="w-[2px] flex-1 bg-dashed bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-border)] my-2" />
              <div className="w-4 h-4 rounded-full bg-[var(--color-primary-dark)]" />
            </div>
            
            <div className="space-y-10">
              <div className="relative">
                <p className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest mb-1">Pickup — 14:15</p>
                <p className="font-bold text-lg text-[var(--color-primary-dark)]">Main Gate Station</p>
              </div>
              <div className="relative">
                <p className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest mb-1">Dropoff — 14:40</p>
                <p className="font-bold text-lg text-[var(--color-primary-dark)]">Student Union South</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions / Tertiary card */}
        <div className="md:col-span-7 p-10 rounded-[2rem] border border-dashed border-[var(--color-border)] flex items-center justify-center">
            <p className="text-sm text-[var(--color-text-muted)] font-medium">Recent Activity & Rewards History will appear here.</p>
        </div>

      </div>
    </div>
  );
}