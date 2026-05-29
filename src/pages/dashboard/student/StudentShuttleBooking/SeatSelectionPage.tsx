import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Bus, Info, Wifi, Zap, Accessibility, ArrowRight, RefreshCw } from 'lucide-react';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

type SeatStatus = 'available' | 'booked' | 'selected';
interface Seat { id: string; status: SeatStatus; }

// Base layout — aisle between col 1 and col 2
const SEAT_LAYOUT: (string | null)[][] = [
  ['1A', '1B', null, '1C', '1D'],
  ['2A', '2B', null, '2C', '2D'],
  ['3A', '3B', null, '3C', '3D'],
  ['4A', '4B', null, '4C', '4D'],
  ['5A', '5B', null, '5C', '5D'],
  ['6A', '6B', null, '6C', '6D'],
];

export default function SeatSelectionPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const shuttleId = (location.state as any)?.shuttleId ?? null;
  const routeName = (location.state as any)?.routeName ?? 'Campus Route';

  const [seats, setSeats] = useState<Seat[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => { loadSeats(); }, []);

  const loadSeats = async () => {
    setRefreshing(true);

    // Get all confirmed/scanned bookings for this shuttle to mark as booked
    let bookedSeats: string[] = [];
    
    if (shuttleId) {
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/bookings?shuttle_id=eq.${shuttleId}&status=in.(confirmed,scanned)&select=seat_number`,
        { headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` } }
      );
      const data = await res.json();
      if (Array.isArray(data)) bookedSeats = data.map((b: any) => b.seat_number);
    }

    // Build seats array from layout
    const allSeats: Seat[] = [];
    SEAT_LAYOUT.forEach(row => {
      row.forEach(seatId => {
        if (seatId) {
          allSeats.push({
            id: seatId,
            status: bookedSeats.includes(seatId) ? 'booked' : 'available',
          });
        }
      });
    });

    setSeats(allSeats);
    setLoading(false);
    setRefreshing(false);
  };

  const getSeat = (id: string): Seat | undefined => seats.find(s => s.id === id);

  const handleSeatClick = (id: string) => {
    const seat = getSeat(id);
    if (!seat || seat.status === 'booked') return;
    setSelected(prev => prev === id ? null : id);
  };

  const getSeatClasses = (id: string): string => {
    const seat = getSeat(id);
    if (!seat) return '';
    const base = 'w-10 h-10 sm:w-12 sm:h-12 rounded-xl font-black text-xs flex items-center justify-center cursor-pointer transition-all duration-200 border-2 select-none';
    if (seat.id === selected) return `${base} bg-[var(--color-primary-dark)] border-[var(--color-primary-dark)] text-white scale-110 shadow-lg`;
    if (seat.status === 'booked') return `${base} bg-[var(--color-bg-soft,#f1f5f9)] border-[var(--color-border)] text-[var(--color-text-muted)] cursor-not-allowed opacity-40`;
    return `${base} bg-white border-[var(--color-border)] text-[var(--color-primary-dark)] hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 hover:scale-105`;
  };

  const availableCount = seats.filter(s => s.status === 'available').length;
  const bookedCount = seats.filter(s => s.status === 'booked').length;

  const handleContinue = () => {
    if (!selected) return;
    navigate('/dashboard/student/payment', {
      state: { seat: selected, shuttleId, routeName }
    });
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-[var(--color-text-muted)] mt-3">Loading seats...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-6 pb-12 px-4 sm:px-8 lg:px-12 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-[var(--color-primary-dark)]">
          Select Your Seat
        </h2>
        <p className="text-xs md:text-sm text-[var(--color-text-muted)] mt-2 font-medium">
          {routeName} — {availableCount} seats available
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Seat Map */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-[2rem] border border-[var(--color-border)] p-6 shadow-sm">
            
            {/* Bus Front */}
            <div className="flex items-center justify-center gap-2 mb-6 pb-4 border-b border-[var(--color-border)]">
              <Bus size={20} className="text-[var(--color-primary)]" />
              <span className="text-xs font-black uppercase tracking-widest text-[var(--color-text-muted)]">Front of Bus</span>
              <button onClick={loadSeats} disabled={refreshing}
                className="ml-auto p-1.5 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">
                <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
              </button>
            </div>

            {/* Seat Grid */}
            <div className="space-y-3">
              {SEAT_LAYOUT.map((row, rowIdx) => (
                <div key={rowIdx} className="flex items-center justify-center gap-2">
                  {row.map((seatId, colIdx) =>
                    seatId === null ? (
                      <div key={colIdx} className="w-6" />
                    ) : (
                      <div key={seatId} onClick={() => handleSeatClick(seatId)}
                        className={getSeatClasses(seatId)}>
                        {seatId}
                      </div>
                    )
                  )}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-[var(--color-border)]">
              {[
                { label: 'Available', style: 'bg-white border-2 border-[var(--color-border)]' },
                { label: 'Selected', style: 'bg-[var(--color-primary-dark)] border-2 border-[var(--color-primary-dark)]' },
                { label: 'Booked', style: 'bg-[var(--color-bg-soft,#f1f5f9)] border-2 border-[var(--color-border)] opacity-40' },
              ].map(l => (
                <div key={l.label} className="flex items-center gap-2">
                  <div className={`w-5 h-5 rounded-md ${l.style}`} />
                  <span className="text-[10px] font-black uppercase tracking-wider text-[var(--color-text-muted)]">{l.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary Panel */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Stats */}
          <div className="bg-white rounded-[2rem] border border-[var(--color-border)] p-6 shadow-sm">
            <h3 className="text-sm font-black uppercase tracking-widest text-[var(--color-text-muted)] mb-4">Shuttle Status</h3>
            <div className="space-y-3">
              {[
                { label: 'Available', value: availableCount, color: 'text-emerald-600' },
                { label: 'Booked', value: bookedCount, color: 'text-rose-500' },
                { label: 'Total Seats', value: seats.length, color: 'text-[var(--color-primary-dark)]' },
              ].map(s => (
                <div key={s.label} className="flex justify-between items-center">
                  <span className="text-sm font-medium text-[var(--color-text-muted)]">{s.label}</span>
                  <span className={`text-sm font-black ${s.color}`}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div className="bg-white rounded-[2rem] border border-[var(--color-border)] p-6 shadow-sm">
            <h3 className="text-sm font-black uppercase tracking-widest text-[var(--color-text-muted)] mb-4">Amenities</h3>
            <div className="space-y-3">
              {[
                { icon: <Wifi size={16} />, label: 'Free Wi-Fi' },
                { icon: <Zap size={16} />, label: 'USB Charging' },
                { icon: <Accessibility size={16} />, label: 'Accessible Seating' },
              ].map(a => (
                <div key={a.label} className="flex items-center gap-3 text-sm text-[var(--color-text-muted)]">
                  <span className="text-[var(--color-primary)]">{a.icon}</span>
                  <span className="font-medium">{a.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Selected seat + CTA */}
          {selected && (
            <div className="bg-[var(--color-primary-dark)] rounded-[2rem] p-6 text-white shadow-lg">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Selected Seat</p>
              <h3 className="text-4xl font-black">{selected}</h3>
              <p className="text-white/70 text-xs mt-1 font-medium">{routeName}</p>
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/10">
                <span className="text-white/70 text-sm font-medium">Fare</span>
                <span className="text-lg font-black">100 XAF</span>
              </div>
              <button onClick={handleContinue}
                className="mt-4 w-full py-4 bg-white text-[var(--color-primary-dark)] rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-opacity-90 transition-all">
                Continue to Payment <ArrowRight size={16} />
              </button>
            </div>
          )}

          {!selected && (
            <div className="bg-[var(--color-bg-soft,#f1f5f9)] rounded-[2rem] border border-[var(--color-border)] p-6 text-center">
              <Info size={24} className="text-[var(--color-text-muted)] mx-auto mb-2 opacity-40" />
              <p className="text-sm font-bold text-[var(--color-text-muted)]">Click a seat to select it</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
