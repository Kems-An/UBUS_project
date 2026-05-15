import { Bus, Users, Map, Wifi, Zap, ArrowRight, Gauge } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ShuttleSelectionPage() {
  const navigate = useNavigate();
  return (
    <div className="pt-6 pb-12 px-8 lg:px-12 max-w-7xl mx-auto">
      
      {/* ── Header ── */}
      <div className="bg-white border border-[var(--color-border)] rounded-[2.5rem] p-8 mb-10 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-[var(--color-primary)]/10 rounded-2xl flex items-center justify-center text-[var(--color-primary)]">
              <Map size={28} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-primary)] mb-1">Step 02</p>
              <h2 className="text-3xl font-black tracking-tight text-[var(--color-primary-dark)] leading-none">Choose Shuttle</h2>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-[var(--color-bg-muted)] px-5 py-3 rounded-2xl border border-[var(--color-border)]">
             <span className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider">Route</span>
             <span className="text-sm font-black text-[var(--color-primary-dark)]">Line 42: Science Quad</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {[
          { id: '882', time: '16:30', cap: '12/40', speed: 'On Time' },
          { id: '401', time: '16:45', cap: '05/40', speed: '2m Delayed' },
          { id: '912', time: '17:00', cap: '00/40', speed: 'On Time' },
        ].map((shuttle) => (
          <div key={shuttle.id} className="bg-white border border-[var(--color-border)] rounded-3xl p-6 hover:shadow-lg transition-all group">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              
              <div className="flex items-center gap-6 w-full lg:w-auto">
                <div className="w-16 h-16 bg-[var(--color-primary-dark)] text-white rounded-2xl flex flex-col items-center justify-center">
                  <span className="text-[10px] font-bold opacity-60">BUS</span>
                  <span className="text-lg font-black">#{shuttle.id}</span>
                </div>
                <div>
                  <h4 className="text-xl font-black text-[var(--color-primary-dark)]">Departure: {shuttle.time}</h4>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="flex items-center gap-1.5 text-xs font-bold text-[var(--color-text-muted)]">
                      <Users size={14} /> {shuttle.cap} Seats Taken
                    </span>
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${shuttle.speed === 'On Time' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {shuttle.speed}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-[var(--color-bg-muted)] rounded-xl text-[var(--color-primary)]"><Wifi size={18} /></div>
                <div className="p-2.5 bg-[var(--color-bg-muted)] rounded-xl text-[var(--color-primary)]"><Zap size={18} /></div>
              </div>

              <button 
              onClick={() => navigate('/dashboard/student/seat-selection')}
              className="w-full lg:w-auto px-8 py-4 bg-[var(--color-primary)] text-white rounded-2xl font-black text-sm flex items-center justify-center gap-3 group-hover:scale-105 transition-transform">
                Select Shuttle <ArrowRight size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}