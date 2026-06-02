import { useState, useRef, useEffect } from 'react';
import { Search, Navigation, MapPin, ArrowRight, Circle, LocateFixed, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UB_CENTER = { lat: 4.1549, lng: 9.2884 };

export default function RouteSelectionPage() {
  const navigate    = useNavigate();
  const mapRef      = useRef<HTMLDivElement>(null);
  const depInputRef = useRef<HTMLInputElement>(null);
  const destInputRef= useRef<HTMLInputElement>(null);

  const [departure,   setDeparture]   = useState('');
  const [destination, setDestination] = useState('');
  const [error,       setError]       = useState('');

  // ── Init map + Places autocomplete using the global google script ──
  // No useJsApiLoader — loaded once in main.tsx
  useEffect(() => {
    const init = () => {
      const g = (window as any).google?.maps;
      if (!g) return;

      // Render map
      if (mapRef.current) {
        new g.Map(mapRef.current, {
          center: UB_CENTER,
          zoom: 15,
          mapTypeControl:    false,
          streetViewControl: false,
          fullscreenControl: false,
        });
      }

      // Attach Places autocomplete
      const options = {
        componentRestrictions: { country: 'cm' },
        fields: ['name', 'formatted_address'],
      };

      if (depInputRef.current) {
        const auto = new g.places.Autocomplete(depInputRef.current, options);
        auto.addListener('place_changed', () => {
          const p = auto.getPlace();
          setDeparture(p.name || p.formatted_address || '');
        });
      }

      if (destInputRef.current) {
        const auto = new g.places.Autocomplete(destInputRef.current, options);
        auto.addListener('place_changed', () => {
          const p = auto.getPlace();
          setDestination(p.name || p.formatted_address || '');
        });
      }
    };

    // If already loaded — run immediately
    if ((window as any).google?.maps) {
      init();
    } else {
      // Wait for the script tag in main.tsx to finish
      const script = document.getElementById('google-maps-script');
      script?.addEventListener('load', init);
      return () => script?.removeEventListener('load', init);
    }
  }, []);

  const handleContinue = () => {
    setError('');
    const dep  = depInputRef.current?.value?.trim()  || departure;
    const dest = destInputRef.current?.value?.trim() || destination;

    if (!dep)  { setError('Please enter a departure point.'); return; }
    if (!dest) { setError('Please enter a destination.'); return; }
    if (dep.toLowerCase() === dest.toLowerCase()) {
      setError('Departure and destination cannot be the same location.');
      return;
    }

    navigate('/dashboard/student/shuttle-selection', {
      state: { departure: dep, destination: dest },
    });
  };

  return (
    <div className="pt-6 pb-12 px-8 lg:px-12 max-w-7xl mx-auto">

      {/* Header */}
      <div className="bg-white border border-[var(--color-border)] rounded-[2.5rem] p-8 mb-10 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-[var(--color-primary)]/10 rounded-2xl flex items-center justify-center text-[var(--color-primary)]">
              <Navigation size={28} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-primary)] mb-1">Step 01</p>
              <h2 className="text-3xl font-black tracking-tight text-[var(--color-primary-dark)] leading-none">Route Selection</h2>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-[var(--color-bg-muted)] px-4 py-2 rounded-xl text-[var(--color-text-muted)] text-xs font-bold">
            <Circle size={8} className="fill-green-500 text-green-500" />
            System Operational
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

        {/* Left: Input Panel */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-6 w-full max-w-[620px]">
          <div className="w-full bg-white border border-[var(--color-border)] rounded-[2.5rem] p-6 sm:p-8 shadow-sm relative overflow-hidden">
            <h3 className="text-xl font-black text-[var(--color-primary-dark)] mb-8">Plan Your Trip</h3>

            <div className="relative space-y-4">
              <div className="absolute left-[23px] top-12 bottom-12 w-0.5 border-l-2 border-dashed border-[var(--color-border)] z-0" />

              {/* Departure */}
              <div className="relative z-10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[var(--color-primary)] text-white flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0">
                  <LocateFixed size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-text-muted)] ml-1">
                    Departure Point
                  </label>
                  <input ref={depInputRef} type="text"
                    placeholder="Enter your location..."
                    defaultValue={departure}
                    onChange={e => setDeparture(e.target.value)}
                    className="w-full mt-1 bg-[var(--color-bg-muted)] border border-[var(--color-border)] rounded-xl py-3 px-4 text-sm font-bold focus:outline-none focus:ring-2 ring-[var(--color-primary)]/20 transition-all"
                  />
                </div>
              </div>

              {/* Destination */}
              <div className="relative z-10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white border-2 border-[var(--color-primary)] text-[var(--color-primary)] flex items-center justify-center shrink-0">
                  <MapPin size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-text-muted)] ml-1">
                    Destination
                  </label>
                  <input ref={destInputRef} type="text"
                    placeholder="Where are you going?"
                    defaultValue={destination}
                    onChange={e => setDestination(e.target.value)}
                    className="w-full mt-1 bg-[var(--color-bg-muted)] border border-[var(--color-border)] rounded-xl py-3 px-4 text-sm font-bold focus:outline-none focus:ring-2 ring-[var(--color-primary)]/20 transition-all"
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="mt-4 flex items-center gap-2 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700">
                <AlertCircle size={15} className="shrink-0" />
                <span className="text-xs font-bold">{error}</span>
              </div>
            )}

            <button onClick={handleContinue}
              className="w-full mt-10 py-5 bg-[var(--color-primary-dark)] text-white rounded-2xl font-black text-sm flex items-center justify-center gap-3 hover:bg-[var(--color-primary)] transition-all shadow-xl shadow-blue-900/10">
              Find Available Shuttles <ArrowRight size={20} />
            </button>
          </div>

          <div className="bg-[var(--color-bg-muted)] rounded-3xl p-6 border border-[var(--color-border)]">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-text-muted)] mb-2">Notice</p>
            <p className="text-xs font-medium text-[var(--color-primary-dark)] leading-relaxed">
              Standard campus routes are running on a 15-minute interval. Real-time tracking will be available after shuttle selection.
            </p>
          </div>
        </div>

        {/* Right: Map — raw div, no React Google Maps component */}
        <div className="lg:col-span-7 xl:col-span-8 min-w-0">
          <div className="border border-[var(--color-border)] rounded-[3rem] h-[500px] lg:h-full min-h-[400px] relative overflow-hidden shadow-inner">
            {/* Map renders here via useEffect ref — no useJsApiLoader needed */}
            <div ref={mapRef} className="w-full h-full" />

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
