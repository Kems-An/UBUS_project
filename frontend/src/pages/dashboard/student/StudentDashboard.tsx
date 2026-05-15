import { Link } from 'react-router-dom';

export default function StudentDashboard() {
  return (
    <div className="p-8 lg:p-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <h2 className="text-3xl font-bold text-[var(--color-primary-dark)]">Welcome back, Alex.</h2>
          <p className="text-sm text-[var(--color-text-muted)]">Next shuttle departs in 12 minutes from Central Hub.</p>
        </div>
        <Link to="/dashboard/student/seat-selection" className="px-6 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[var(--color-primary-dark)] to-[var(--color-primary)] shadow-lg">
          + Book a Shuttle
        </Link>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Live Tracker */}
        <div className="md:col-span-8 h-80 rounded-2xl bg-white border border-[var(--color-border)] relative overflow-hidden">
          <div className="absolute top-5 left-5 z-10 p-4 rounded-xl bg-white/90 backdrop-blur shadow-lg border border-[var(--color-border)]">
            <h3 className="font-bold text-sm">Bus 402 - Route A</h3>
            <p className="text-[10px] text-green-600 font-bold animate-pulse">● Arriving in 3 mins</p>
          </div>
          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-[var(--color-text-muted)]">
            [ Interactive Map Surface ]
          </div>
        </div>

        {/* Impact Stats */}
        <div className="md:col-span-4 p-8 rounded-2xl bg-[var(--color-primary-dark)] text-white flex flex-col justify-between">
          <div>
            <span className="text-3xl">🌱</span>
            <h3 className="text-lg font-bold mt-2">Campus Legend</h3>
            <p className="text-xs opacity-70">Saved 42kg of CO₂ this month.</p>
          </div>
          <div className="mt-8">
            <span className="text-5xl font-black">24</span>
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Total Trips</p>
          </div>
        </div>

        {/* Trip Timeline */}
        <div className="md:col-span-5 p-8 rounded-2xl bg-[var(--color-bg-muted)] border border-[var(--color-border)]">
          <h3 className="font-bold mb-6">Upcoming Trip</h3>
          <div className="flex gap-4">
            <div className="flex flex-col items-center py-1">
              <div className="w-3 h-3 rounded-full border-2 border-[var(--color-primary)] bg-white" />
              <div className="w-0.5 flex-1 bg-[var(--color-border)] my-1" />
              <div className="w-3 h-3 rounded-full bg-[var(--color-primary)]" />
            </div>
            <div className="space-y-6">
              <div>
                <p className="text-[10px] font-bold text-[var(--color-text-muted)]">PICKUP — 14:15</p>
                <p className="font-bold text-sm">Main Gate Station</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-[var(--color-text-muted)]">DROPOFF — 14:40</p>
                <p className="font-bold text-sm">Student Union South</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}