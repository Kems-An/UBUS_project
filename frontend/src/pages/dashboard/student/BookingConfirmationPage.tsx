import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

export default function BookingConfirmationPage() {
  const location = useLocation();
  const [downloaded, setDownloaded] = useState(false);

  const state = location.state as { seat?: string; provider?: string } | null;
  const seat = state?.seat ?? 'N/A';
  const provider = state?.provider ?? 'MoMo';

  return (
    <div className="p-8 lg:p-12 max-w-4xl mx-auto">
      <header className="flex items-center gap-4 mb-10">
        <div className="w-12 h-12 rounded-full bg-[var(--color-secondary-light)] flex items-center justify-center text-2xl">✅</div>
        <div>
          <h2 className="text-3xl font-bold text-[var(--color-primary-dark)]">Booking Confirmed</h2>
          <p className="text-sm text-[var(--color-text-muted)]">Paid via {provider.toUpperCase()}</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white rounded-3xl border border-[var(--color-border)] overflow-hidden shadow-lg">
          <div className="h-32 bg-[var(--color-primary)] p-6 flex items-end">
            <span className="px-4 py-1 rounded-full bg-white text-[var(--color-primary)] text-xs font-bold">BOARDING PASS</span>
          </div>
          <div className="p-8">
            <div className="flex justify-between mb-8">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[var(--color-text-muted)]">From</p>
                <p className="font-bold text-lg">Main Library</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-widest text-[var(--color-text-muted)]">To</p>
                <p className="font-bold text-lg">Tech Park</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="p-4 bg-[var(--color-bg-muted)] rounded-xl">
                <p className="text-[10px] text-[var(--color-text-muted)]">SEAT</p>
                <p className="font-bold">{seat}</p>
              </div>
              <div className="p-4 bg-[var(--color-bg-muted)] rounded-xl col-span-2">
                <p className="text-[10px] text-[var(--color-text-muted)]">SHUTTLE ID</p>
                <p className="font-bold">AV-882 (Express)</p>
              </div>
            </div>

            <div className="flex items-center justify-between border-t pt-8 border-dashed border-[var(--color-border)]">
              <div className="text-5xl">▦</div>
              <button 
                onClick={() => { setDownloaded(true); setTimeout(() => setDownloaded(false), 2000); }}
                className="px-6 py-3 bg-[var(--color-primary-dark)] text-white rounded-xl font-bold text-sm"
              >
                {downloaded ? 'Saved!' : 'Download Ticket'}
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-4">
          <div className="p-6 bg-white rounded-2xl border border-[var(--color-border)]">
            <h4 className="font-bold mb-2">Boarding Info</h4>
            <p className="text-sm text-[var(--color-text-muted)]">Shuttle arrives in 8 mins at Gate 4B.</p>
          </div>
          <Link to="/dashboard/student/routes" className="block text-center text-sm font-bold text-[var(--color-primary)] underline">
            Back to Schedules
          </Link>
        </div>
      </div>
    </div>
  );
}