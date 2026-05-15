import { useState } from 'react';
import { Search, Navigation, MapPin, ArrowRight, Circle, LocateFixed } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  GoogleMap,
  DirectionsRenderer,
  useJsApiLoader,
} from '@react-google-maps/api';

export default function RouteSelectionPage() {
  const navigate = useNavigate();

  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [routeReady, setRouteReady] = useState(false);

  {/*function to calculate the route direction*/}
  const calculateRoute = async () => {
    if (!departure || !destination) {
      alert('Please enter departure and destination');
      return;
    }

    try {
      const directionsService = new google.maps.DirectionsService();

      const results = await directionsService.route({
        origin: departure,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
      });

      setDirections(results);

      // route now available
      setRouteReady(true);

    } catch (error) {
      console.error(error);
      alert('Could not calculate route');
    }
  };

  {/*setting the google API*/}
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) {
    return <div>Loading Map...</div>;
  }

  return (
    <div className="pt-6 pb-12 px-8 lg:px-12 max-w-7xl mx-auto">

      {/* ── Header (Matching your new style) ── */}
      <div className="bg-white border border-[var(--color-border)] rounded-[2.5rem] p-8 mb-10 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-[var(--color-primary)]/10 rounded-2xl flex items-center justify-center text-[var(--color-primary)]">
              <Navigation size={28} />
            </div>

            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-primary)] mb-1">
                Step 01
              </p>

              <h2 className="text-3xl font-black tracking-tight text-[var(--color-primary-dark)] leading-none">
                Route Selection
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-[var(--color-bg-muted)] px-4 py-2 rounded-xl text-[var(--color-text-muted)] text-xs font-bold">
            <Circle size={8} className="fill-green-500 text-green-500" />
            System Operational
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

        {/* ── Left: Search Panel ── */}
        <div className="lg:col-span-5 xl:col-span-4 2xl:col-span-4 space-y-6 w-full max-w-[620px]">

          <div className="w-full bg-white border border-[var(--color-border)] rounded-[2.5rem] p-6 sm:p-8 lg:p-6 shadow-sm relative overflow-hidden">

            <h3 className="text-xl font-black text-[var(--color-primary-dark)] mb-8">
              Plan Your Trip
            </h3>

            <div className="relative space-y-4">

              {/* Vertical Connector Line */}
              <div className="absolute left-[23px] top-12 bottom-12 w-0.5 bg-dashed border-l-2 border-dashed border-[var(--color-border)] z-0" />

              {/* Departure Input */}
              <div className="relative z-10 flex items-center gap-4">

                <div className="w-12 h-12 rounded-2xl bg-[var(--color-primary)] text-white flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <LocateFixed size={20} />
                </div>

                <div className="flex-1 min-w-0">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-text-muted)] ml-1">
                    Departure Point
                  </label>

                  <input
                    type="text"
                    placeholder="Enter your location..."
                    value={departure}
                    onChange={(e) => setDeparture(e.target.value)}
                    className="w-full mt-1 bg-[var(--color-bg-muted)] border border-[var(--color-border)] rounded-xl py-3 px-4 text-sm font-bold focus:outline-none focus:ring-2 ring-[var(--color-primary)]/20 transition-all overflow-hidden text-ellipsis"
                  />
                </div>
              </div>

              {/* Destination Input */}
              <div className="relative z-10 flex items-center gap-4">

                <div className="w-12 h-12 rounded-2xl bg-white border-2 border-[var(--color-primary)] text-[var(--color-primary)] flex items-center justify-center">
                  <MapPin size={20} />
                </div>

                <div className="flex-1 min-w-0">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-text-muted)] ml-1">
                    Destination
                  </label>

                  <input
                    type="text"
                    placeholder="Where are you going?"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full mt-1 bg-[var(--color-bg-muted)] border border-[var(--color-border)] rounded-xl py-3 px-4 text-sm font-bold focus:outline-none focus:ring-2 ring-[var(--color-primary)]/20 transition-all overflow-hidden text-ellipsis"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={calculateRoute}
              className="w-full mt-10 py-5 bg-[var(--color-primary-dark)] text-white rounded-2xl font-black text-sm flex items-center justify-center gap-3 hover:bg-[var(--color-primary)] transition-all shadow-xl shadow-blue-900/10"
            >
              Show Route
              <ArrowRight size={20} />
            </button>

            {routeReady && (
              <button
                onClick={() => navigate('/dashboard/student/shuttle-selection')}
                className="w-full mt-4 py-4 bg-[var(--color-primary)] text-white rounded-2xl font-black text-sm flex items-center justify-center gap-3 hover:opacity-90 transition-all"
              >
                Continue to Shuttle Selection
                <ArrowRight size={18} />
              </button>
            )}
          </div>

          {/* Quick Info Card */}
          <div className="bg-[var(--color-bg-muted)] rounded-3xl p-6 border border-[var(--color-border)]">

            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-text-muted)] mb-2">
              Notice
            </p>

            <p className="text-xs font-medium text-[var(--color-primary-dark)] leading-relaxed">
              Standard campus routes are running on a 15-minute interval.
              Real-time tracking will be available after shuttle selection.
            </p>
          </div>
        </div>

        {/* ── Right: Map Integration Area ── */}
        <div className="lg:col-span-7 xl:col-span-8 2xl:col-span-8 min-w-0">

          <div className="bg-[var(--color-bg-muted)] border border-[var(--color-border)] rounded-[3rem] h-[500px] lg:h-full min-h-[400px] relative overflow-hidden shadow-inner group">

            <GoogleMap
              mapContainerStyle={{
                width: '100%',
                height: '100%',
              }}
              center={{
                lat: 4.1549,
                lng: 9.2884,
              }}
              zoom={14}
            >
              {directions && (
                <DirectionsRenderer directions={directions} />
              )}
            </GoogleMap>

            {/* Overlay Controls */}
            <div className="absolute top-6 right-6 flex flex-col gap-2">

              <button className="p-3 bg-white border border-[var(--color-border)] rounded-xl shadow-sm text-[var(--color-primary-dark)] hover:bg-[var(--color-bg-muted)]">
                <Search size={18} />
              </button>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}