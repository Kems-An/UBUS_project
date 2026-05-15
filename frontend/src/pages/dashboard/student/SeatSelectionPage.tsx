import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/* ============================================================
   SEAT SELECTION PAGE
   Step 3 of booking flow: Student picks a seat from a visual
   shuttle layout, sees a summary, then proceeds to payment.
   ============================================================ */

// Seat status types
type SeatStatus = 'available' | 'booked' | 'selected';

interface Seat {
  id:     string; // e.g. "1A", "2B"
  status: SeatStatus;
}

// Initial seat layout: 5 rows, aisle between col 2 and col 3
// null = aisle gap
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
          // Deselect previous selection
          if (s.status === 'selected') return { ...s, status: 'available' };
          // Select clicked seat
          if (rIdx === rowIdx && cIdx === colIdx) {
            setSelectedSeat(s.id);
            return { ...s, status: 'selected' };
          }
          return s;
        })
      )
    );
  }

  function getSeatStyle(status: SeatStatus): React.CSSProperties {
    switch (status) {
      case 'booked':   return { background: '#E8E8E8', color: '#BDBDBD', cursor: 'not-allowed' };
      case 'selected': return { background: 'var(--color-primary)', color: 'white', transform: 'scale(1.08)' };
      default:         return { background: 'var(--color-bg-muted)', color: 'var(--color-text-muted)', cursor: 'pointer' };
    }
  }

  function handleConfirm() {
    if (!selectedSeat) return;
    // Pass selected seat to payment page via state
    navigate('/dashboard/student/payment', { state: { seat: selectedSeat } });
  }

  return (
    <div className="p-8 lg:p-12">

      {/* ── Header + stepper ── */}
      <div
        className="p-6 rounded-2xl mb-8"
        style={{ background: 'var(--color-bg-muted)', border: '1px solid var(--color-border)' }}
      >
        <div className="flex justify-between items-start mb-5 flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-bold" style={{ color: 'var(--color-primary-dark)', fontFamily: 'Manrope, sans-serif' }}>
              Select Your Seat
            </h2>
            <p className="text-sm mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
              Route 42: Science Quad → North Dorms · 4:30 PM Departure
            </p>
          </div>
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold"
            style={{ background: 'var(--color-white)', border: '1px solid var(--color-border)', color: 'var(--color-primary-dark)' }}
          >
            🚌 Shuttle #882
          </div>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-3">
          {[['01', 'Route'], ['02', 'Shuttle'], ['03', 'Seat']].map(([num, label], i) => {
            const isActive = i === 2;
            return (
              <div key={num} className="flex items-center gap-2">
                {i > 0 && <div className="w-6 h-px" style={{ background: 'var(--color-border)' }} />}
                <div className="flex items-center gap-2">
                  <span
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{
                      background: isActive ? 'var(--color-primary)' : 'var(--color-secondary-light)',
                      color:      isActive ? 'white' : 'var(--color-primary-dark)',
                    }}
                  >
                    {num}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: isActive ? 'var(--color-primary-dark)' : 'var(--color-text-muted)' }}>
                    {label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Main grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Seat map */}
        <div className="lg:col-span-7">
          <div
            className="p-8 rounded-2xl shadow-sm"
            style={{ background: 'var(--color-white)', border: '1px solid var(--color-border)' }}
          >
            <div className="max-w-[280px] mx-auto">
              {/* Driver area */}
              <div
                className="flex justify-between items-center mb-8 pb-5 border-b-2 border-dashed"
                style={{ borderColor: 'var(--color-border)' }}
              >
                <div
                  className="w-11 h-11 rounded-lg flex items-center justify-center text-xl"
                  style={{ background: 'var(--color-bg-muted)' }}
                >
                  🧑‍✈️
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold uppercase tracking-widest block mb-1" style={{ color: 'var(--color-text-muted)' }}>Entrance</span>
                  <div className="w-14 h-1.5 rounded-full" style={{ background: 'var(--color-secondary-light)' }} />
                </div>
              </div>

              {/* Seat grid */}
              <div className="space-y-3">
                {seats.map((row, rowIdx) => (
                  <div key={rowIdx} className="grid grid-cols-4 gap-3">
                    {row.map((seat, colIdx) => {
                      if (!seat) {
                        // Aisle gap
                        return <div key={`aisle-${rowIdx}-${colIdx}`} />;
                      }
                      return (
                        <button
                          key={seat.id}
                          onClick={() => handleSeatClick(rowIdx, colIdx)}
                          disabled={seat.status === 'booked'}
                          title={`Seat ${seat.id}`}
                          className="aspect-square rounded-xl flex items-center justify-center text-xs font-bold transition-all duration-150"
                          style={getSeatStyle(seat.status)}
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

        {/* Right panel */}
        <div className="lg:col-span-5 flex flex-col gap-5">

          {/* Legend */}
          <div className="p-5 rounded-2xl" style={{ background: 'var(--color-bg-muted)', border: '1px solid var(--color-border)' }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--color-text-muted)' }}>
              Seat Legend
            </p>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Available',       style: { background: 'var(--color-bg-muted)', border: '1px solid var(--color-border)' } },
                { label: 'Booked',          style: { background: '#E8E8E8' } },
                { label: 'Your Selection',  style: { background: 'var(--color-primary)' } },
              ].map(({ label, style }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex-shrink-0" style={style} />
                  <span className="text-sm font-medium" style={{ color: 'var(--color-primary-dark)' }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reservation summary */}
          <div
            className="p-7 rounded-2xl shadow-sm flex flex-col gap-5"
            style={{ background: 'var(--color-white)', border: '1px solid var(--color-secondary-light)' }}
          >
            <h4 className="font-bold text-base" style={{ color: 'var(--color-primary-dark)', fontFamily: 'Manrope, sans-serif' }}>
              Reservation Summary
            </h4>
            <div className="space-y-3">
              {[
                ['Selected Seat',     selectedSeat ? `Seat ${selectedSeat}` : '— not yet selected —'],
                ['Estimated Arrival', '4:52 PM'],
                ['Service Fee',       '0 XAF (Student Pass)'],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between items-center py-2 border-b" style={{ borderColor: 'var(--color-border)' }}>
                  <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{label}</span>
                  <span className="text-sm font-bold" style={{ color: 'var(--color-primary-dark)' }}>{value}</span>
                </div>
              ))}
            </div>

            <button
              onClick={handleConfirm}
              disabled={!selectedSeat}
              className="w-full py-3.5 rounded-xl font-bold text-sm text-white shadow-md transition-all duration-150"
              style={{
                background: selectedSeat
                  ? 'linear-gradient(135deg, var(--color-primary-dark), var(--color-primary))'
                  : 'var(--color-bg-muted)',
                color:   selectedSeat ? 'white' : 'var(--color-text-muted)',
                cursor:  selectedSeat ? 'pointer' : 'not-allowed',
              }}
            >
              {selectedSeat ? 'Proceed to Payment →' : 'Select a seat to continue'}
            </button>

            <p className="text-xs text-center" style={{ color: 'var(--color-text-muted)' }}>
              Seats are held for 5 minutes. Show your digital ID upon boarding.
            </p>
          </div>

          {/* Shuttle features card */}
          <div className="p-5 rounded-2xl flex items-center gap-4" style={{ background: 'var(--color-bg-muted)' }}>
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEqofVPFJh-tzT30imouJSYYvLsTds7Q-Y0t3tqFk1cv_MjtEfTb9RVC5YzJ5LwQc5fNj1lUIFSPOnnUX75dkhZDLMt4yZKhOvMOma7QBNRA5sTBYbIdx2owbMH_zyqzdVNSM1gqWcZQCD-I35TqdFzZ9wDo9pJwj1d0GZpyRoIhVcj1nj5xD391l0r0_GIQsUTllnAwbqMwOMccDiFSYyjoDCglBhWtOzEgIG_--6j6T4jafEQSn-3pn6qolqZs9ZHcccTHmkx8TM"
              alt="Shuttle interior"
              className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
            />
            <div>
              <p className="text-xs font-bold" style={{ color: 'var(--color-primary-dark)' }}>Shuttle Features</p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>Free Campus Wi-Fi, USB Ports, ADA Accessible</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
