import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bus, 
  Info, 
  ChevronRight, 
  User, 
  Wifi, 
  Zap, 
  Accessibility,
  ArrowRight,
  Circle
} from 'lucide-react';

/* ============================================================
   REFINED SEAT SELECTION PAGE
   ============================================================ */

type SeatStatus = 'available' | 'booked' | 'selected';

interface Seat {
  id: string;
  status: SeatStatus;
}

const INITIAL_SEATS: (Seat | null)[][] = [
  [{ id: '1A', status: 'booked' }, { id: '1B', status: 'available' }, null, { id: '1C', status: 'available' }],
  [{ id: '2A', status: 'available' }, { id: '2B', status: 'available' }, null, { id: '2C', status: 'booked' }],
  [{ id: '3A', status: 'available' }, { id: '3B', status: 'available' }, null, { id: '3C', status: 'available' }],
  [{ id: '4A', status: 'available' }, { id: '4B', status: 'available' }, null, { id: '4C', status: 'available' }],
  [{ id: '5A', status: 'available' }, { id: '5B', status: 'available' }, { id: '5C', status: 'available' }, { id: '5D', status: 'available' }],
];

export default function SeatSelectionPage() {
  const navigate = useNavigate();
  const [seats, setSeats] = useState<(Seat | null)[][]>(INITIAL_SEATS);
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);

  function handleSeatClick(rowIdx: number, colIdx: number) {
    const seat = seats[rowIdx][colIdx];
    if (!seat || seat.status === 'booked') return;

    setSeats(prev =>
      prev.map((row, rIdx) =>
        row.map((s, cIdx) => {
          if (!s) return s;
          if (s.status === 'selected') return { ...s, status: 'available' };
          if (rIdx === rowIdx && cIdx === colIdx) {
            setSelectedSeat(s.id);
            return { ...s, status: 'selected' };
          }
          return s;
        })
      )
    );
  }

  const getSeatClasses = (status: SeatStatus) => {
    switch (status) {
      case 'booked':
        return 'bg-gray-100 text-gray-300 cursor-not-allowed';
      case 'selected':
        return 'bg-[var(--color-primary)] text-white ring-4 ring-blue-100 scale-110 shadow-lg';
      default:
        return 'bg-white border border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]';
    }
  };

  return (
    <div className="pt-6 pb-12 px-8 lg:px-12 max-w-7xl mx-auto">
      
      {/* ── Progress Header ── */}
 {/* ── Refined Modern Header ── */}
      <div className="bg-white border border-[var(--color-border)] rounded-[2.5rem] p-8 mb-10 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-[var(--color-primary)]/10 rounded-2xl flex items-center justify-center text-[var(--color-primary)]">
              <Bus size={28} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-primary)] mb-1">
                Step 03
              </p>
              <h2 className="text-3xl font-black tracking-tight text-[var(--color-primary-dark)] leading-none">
                Seat Selection
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-[var(--color-bg-muted)] p-2 rounded-2xl border border-[var(--color-border)]">
            <div className="px-4 py-2 bg-white rounded-xl shadow-sm">
              <span className="text-[10px] font-black uppercase tracking-wider text-[var(--color-text-muted)] block">Shuttle</span>
              <span className="text-sm font-bold text-[var(--color-primary-dark)]">#882</span>
            </div>
            <div className="px-4 py-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-[var(--color-text-muted)] block">Status</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-bold text-[var(--color-primary-dark)]">Live</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

        {/* ── Seat Map Chassis ── */}
        <div className="lg:col-span-7">
          <div className="bg-white border border-[var(--color-border)] rounded-[3rem] p-12 relative shadow-sm">
            {/* Windshield / Front of Bus Decor */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-2 bg-[var(--color-bg-muted)] rounded-b-full" />
            
            <div className="max-w-[320px] mx-auto">
              {/* Cockpit Area */}
              <div className="flex justify-between items-center mb-12 pb-8 border-b border-dashed border-[var(--color-border)]">
                <div className="w-12 h-12 rounded-2xl bg-[var(--color-bg-muted)] flex items-center justify-center text-[var(--color-primary-dark)]">
                  <User size={24} />
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-text-muted)] block mb-2">Main Entry</span>
                  <div className="w-16 h-2 bg-gradient-to-r from-transparent to-[var(--color-primary)] rounded-full opacity-30" />
                </div>
              </div>

              {/* Seat Grid */}
              <div className="space-y-4">
                {seats.map((row, rowIdx) => (
                  <div key={rowIdx} className="grid grid-cols-4 gap-4">
                    {row.map((seat, colIdx) => {
                      if (!seat) return <div key={`aisle-${rowIdx}-${colIdx}`} className="w-full h-12" />;
                      return (
                        <button
                          key={seat.id}
                          onClick={() => handleSeatClick(rowIdx, colIdx)}
                          disabled={seat.status === 'booked'}
                          className={`h-14 rounded-2xl flex items-center justify-center text-sm font-black transition-all duration-200 ${getSeatClasses(seat.status)}`}
                        >
                          {seat.id}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Right Control Panel ── */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Legend Card */}
          <div className="bg-white border border-[var(--color-border)] rounded-3xl p-6">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[var(--color-text-muted)] mb-6 flex items-center gap-2">
              <Info size={14} /> Availability
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Open', color: 'bg-white border border-[var(--color-border)]' },
                { label: 'Booked', color: 'bg-gray-100' },
                { label: 'Selected', color: 'bg-[var(--color-primary)]' }
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center gap-2">
                  <div className={`w-full h-10 rounded-xl ${item.color}`} />
                  <span className="text-[10px] font-bold uppercase text-[var(--color-text-muted)]">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Checkout Card */}
          <div className="bg-[var(--color-primary-dark)] rounded-[2.5rem] p-8 text-white shadow-2xl shadow-blue-900/20">
            <h3 className="text-xl font-bold mb-8">Reservation Summary</h3>
            
            <div className="space-y-5 mb-8">
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <span className="text-sm opacity-60 font-medium">Selected Seat</span>
                <span className="text-lg font-black tracking-tight">{selectedSeat ? `Seat ${selectedSeat}` : '—'}</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <span className="text-sm opacity-60 font-medium">Est. Arrival</span>
                <span className="text-lg font-black tracking-tight">16:52</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm opacity-60 font-medium">Fare</span>
                <span className="text-sm font-bold bg-white/10 px-3 py-1 rounded-full uppercase tracking-widest text-green-300">Free Pass</span>
              </div>
            </div>

            <button
              onClick={() => selectedSeat && navigate('/dashboard/student/payment', { state: { seat: selectedSeat } })}
              disabled={!selectedSeat}
              className={`w-full py-5 rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-2 ${
                selectedSeat 
                ? 'bg-[var(--color-primary)] hover:bg-white hover:text-[var(--color-primary-dark)] text-white shadow-lg' 
                : 'bg-white/5 text-white/20 cursor-not-allowed'
              }`}
            >
              {selectedSeat ? 'Confirm Selection' : 'Pick a Seat'}
              {selectedSeat && <ArrowRight size={18} />}
            </button>
          </div>

          {/* Features Sidebar Card */}
          <div className="bg-[var(--color-bg-muted)] rounded-3xl p-6 border border-[var(--color-border)]">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-text-muted)] mb-4">Shuttle Amenities</p>
            <div className="flex gap-4">
              <div className="p-3 bg-white rounded-xl shadow-sm"><Wifi size={18} className="text-[var(--color-primary)]" /></div>
              <div className="p-3 bg-white rounded-xl shadow-sm"><Zap size={18} className="text-[var(--color-primary)]" /></div>
              <div className="p-3 bg-white rounded-xl shadow-sm"><Accessibility size={18} className="text-[var(--color-primary)]" /></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}