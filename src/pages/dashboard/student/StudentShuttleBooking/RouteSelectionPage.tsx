import { useState, useRef, useEffect } from 'react';
import { Search, Navigation, MapPin, ArrowRight, Circle, LocateFixed, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

// ── Load Google Maps with the Places library ──
const LIBRARIES: ('places')[] = ['places'];

// ── University of Buea map center ──
const UB_CENTER = { lat: 4.1549, lng: 9.2884 };

// ── Restrict autocomplete to Buea area only ──
const BUEA_BOUNDS = {
  north: 4.2100,
  south: 4.0900,
  east:  9.3600,
  west:  9.2200,
};

export default function RouteSelectionPage() {
  const navigate = useNavigate();

  const [departure,    setDeparture]    = useState('');
  const [destination,  setDestination]  = useState('');
  const [error,        setError]        = useState('');

  // Refs for the two input elements — Google Places attaches to these
  const depInputRef  = useRef<HTMLInputElement>(null);
  const destInputRef = useRef<HTMLInputElement>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: LIBRARIES,
  });

  // ── Attach Google Places Autocomplete once map is loaded ──
  useEffect(() => {
    if (!isLoaded) return;

    const options = {
      bounds: BUEA_BOUNDS,
      strictBounds: true,          // Only show results within Buea area
      componentRestrictions: { country: 'cm' }, // Cameroon only
      fields: ['name', 'formatted_address'],
    };

    // Departure autocomplete
    if (depInputRef.current) {
      const depAuto = new (window as any).google.maps.places.Autocomplete(
        depInputRef.current,
        options
      );
      depAuto.addListener('place_changed', () => {
        const place = depAuto.getPlace();
        const name  = place.name || place.formatted_address || '';
        setDeparture(name);
      });
    }

    // Destination autocomplete
    if (destInputRef.current) {
      const destAuto = new (window as any).google.maps.places.Autocomplete(
        destInputRef.current,
        options
      );
      destAuto.addListener('place_changed', () => {
        const place = destAuto.getPlace();
        const name  = place.name || place.formatted_address || '';
        setDestination(name);
      });
    }
  }, [isLoaded]);

  const handleContinue = () => {
    setError('');

    // Read directly from inputs in case user typed without selecting a suggestion
    const dep  = depInputRef.current?.value?.trim()  || departure;
    const dest = destInputRef.current?.value?.trim() || destination;

    if (!dep) {
      setError('Please enter a departure point.');
      return;
    }
    if (!dest) {
      setError('Please enter a destination.');
      return;
    }
    if (dep.toLowerCase() === dest.toLowerCase()) {
      setError('Departure and destination cannot be the same location.');
      return;
    }

    navigate('/dashboard/student/shuttle-selection', {
      state: { departure: dep, destination: dest },
    });
  };

  if (!isLoaded) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="pt-6 pb-12 px-8 lg:px-12 max-w-7xl mx-auto">

      {/* ── Header (unchanged from original) ── */}
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

        {/* ── Left: Search Panel (unchanged layout) ── */}
        <div className="lg:col-span-5 xl:col-span-4 2xl:col-span-4 space-y-6 w-full max-w-[620px]">

          <div className="w-full bg-white border border-[var(--color-border)] rounded-[2.5rem] p-6 sm:p-8 lg:p-6 shadow-sm relative overflow-hidden">

            <h3 className="text-xl font-black text-[var(--color-primary-dark)] mb-8">
              Plan Your Trip
            </h3>

            <div className="relative space-y-4">

              {/* Vertical Connector Line */}
              <div className="absolute left-[23px] top-12 bottom-12 w-0.5 bg-dashed border-l-2 border-dashed border-[var(--color-border)] z-0" />

              {/* ── Departure Input ── */}
              <div className="relative z-10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[var(--color-primary)] text-white flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <LocateFixed size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-text-muted)] ml-1">
                    Departure Point
                  </label>
                  {/*
                    Google Places Autocomplete attaches to this input via the ref.
                    The dropdown that appears IS Google's — real Buea locations.
                    No fake markers or routes are drawn on the map.
                  */}
                  <input
                    ref={depInputRef}
                    type="text"
                    placeholder="Enter your location..."
                    defaultValue={departure}
                    onChange={e => setDeparture(e.target.value)}
                    className="w-full mt-1 bg-[var(--color-bg-muted)] border border-[var(--color-border)] rounded-xl py-3 px-4 text-sm font-bold focus:outline-none focus:ring-2 ring-[var(--color-primary)]/20 transition-all overflow-hidden text-ellipsis"
                  />
                </div>
              </div>

              {/* ── Destination Input ── */}
              <div className="relative z-10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white border-2 border-[var(--color-primary)] text-[var(--color-primary)] flex items-center justify-center">
                  <MapPin size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-text-muted)] ml-1">
                    Destination
                  </label>
                  <input
                    ref={destInputRef}
                    type="text"
                    placeholder="Where are you going?"
                    defaultValue={destination}
                    onChange={e => setDestination(e.target.value)}
                    className="w-full mt-1 bg-[var(--color-bg-muted)] border border-[var(--color-border)] rounded-xl py-3 px-4 text-sm font-bold focus:outline-none focus:ring-2 ring-[var(--color-primary)]/20 transition-all overflow-hidden text-ellipsis"
                  />
                </div>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div className="mt-4 flex items-center gap-2 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700">
                <AlertCircle size={15} className="shrink-0" />
                <span className="text-xs font-bold">{error}</span>
              </div>
            )}

            {/* 
              ── SINGLE BUTTON: Find Shuttles ──
              Replaces "Show Route" + "Continue to Shuttle Selection".
              No fake route calculation — just validates and navigates.
            */}
            <button
              onClick={handleContinue}
              className="w-full mt-10 py-5 bg-[var(--color-primary-dark)] text-white rounded-2xl font-black text-sm flex items-center justify-center gap-3 hover:bg-[var(--color-primary)] transition-all shadow-xl shadow-blue-900/10"
            >
              Find Available Shuttles
              <ArrowRight size={20} />
            </button>
          </div>

          {/* Notice card (unchanged) */}
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

        {/* ── Right: Google Map (unchanged layout, no fake routes) ── */}
        <div className="lg:col-span-7 xl:col-span-8 2xl:col-span-8 min-w-0">
          <div className="bg-[var(--color-bg-muted)] border border-[var(--color-border)] rounded-[3rem] h-[500px] lg:h-full min-h-[400px] relative overflow-hidden shadow-inner group">

            {/*
              Map shows the real University of Buea area.
              No Polyline. No hardcoded Markers.
              Students can see the actual campus map while typing their locations.
            */}
            <GoogleMap
              mapContainerStyle={{ width: '100%', height: '100%' }}
              center={UB_CENTER}
              zoom={15}
              options={{
                mapTypeControl: false,
                streetViewControl: false,
                fullscreenControl: false,
                zoomControlOptions: {
                  position: (window as any).google?.maps?.ControlPosition?.RIGHT_CENTER,
                },
              }}
            />

            {/* Overlay Controls (unchanged) */}
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
