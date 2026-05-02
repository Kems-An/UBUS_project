import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Ticket, 
  Calendar, 
  MapPin, 
  Clock, 
  ArrowRight, 
  Inbox,
  Download,
  MoreVertical
} from 'lucide-react';

/* Mock Data: Toggle this to '[]' to see the Empty State
  In a real app, you would fetch this from your backend/context.
*/
const MOCK_BOOKINGS = [
  {
    id: 'TKT-88291',
    route: 'Main Campus → Technology Hub',
    date: 'Oct 24, 2023',
    time: '04:30 PM',
    busNo: '#882',
    seat: 'A12',
    status: 'Upcoming'
  }
];

export default function StudentBookingsPage() {
  const [bookings] = useState(MOCK_BOOKINGS);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-10">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">My Bookings</h2>
        <p className="text-slate-500 font-medium">Manage your campus transit reservations</p>
      </header>

      {bookings.length === 0 ? (
        /* ─── EMPTY STATE ─── */
        <div className="flex flex-col items-center justify-center py-20 px-6 bg-white rounded-[2.5rem] border border-dashed border-slate-200 shadow-sm">
          <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-300 mb-6">
            <Inbox size={40} strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">No bookings yet</h3>
          <p className="text-slate-500 text-center max-w-xs mb-8">
            You haven't reserved any seats yet. Start your journey by checking available routes.
          </p>
          <Link 
            to="/dashboard/student/routes"
            className="flex items-center gap-2 px-8 py-3.5 bg-slate-900 text-white rounded-2xl font-bold text-sm shadow-xl shadow-slate-200 hover:-translate-y-0.5 transition-all"
          >
            Find a Route
            <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        /* ─── BOOKINGS LIST ─── */
        <div className="grid gap-6">
          {bookings.map((booking) => (
            <div 
              key={booking.id} 
              className="group bg-white border border-slate-100 rounded-[2rem] shadow-sm hover:shadow-md transition-all overflow-hidden"
            >
              <div className="flex flex-col md:flex-row">
                {/* Left Side: Ticket Info */}
                <div className="flex-1 p-8">
                  <div className="flex items-center justify-between mb-6">
                    <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-full">
                      {booking.status}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">ID: {booking.id}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <MapPin size={18} className="text-[var(--color-primary)]" />
                    {booking.route}
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Date</p>
                      <p className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                        <Calendar size={14} /> {booking.date}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Time</p>
                      <p className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                        <Clock size={14} /> {booking.time}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Bus</p>
                      <p className="text-sm font-bold text-slate-700">{booking.busNo}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Seat</p>
                      <p className="text-sm font-bold text-[var(--color-primary)]">{booking.seat}</p>
                    </div>
                  </div>
                </div>

                {/* Right Side: Quick Actions */}
                <div className="bg-slate-50/50 border-t md:border-t-0 md:border-l border-slate-100 p-6 flex md:flex-col justify-center gap-3 min-w-[180px]">
                  <button className="flex-1 md:flex-none flex items-center justify-center gap-2 py-3 px-4 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors">
                    <Download size={14} />
                    Ticket
                  </button>
                  <button className="flex-1 md:flex-none flex items-center justify-center gap-2 py-3 px-4 bg-rose-50 text-rose-600 rounded-xl text-xs font-bold hover:bg-rose-100 transition-colors">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          <p className="text-center text-xs font-bold text-slate-400 mt-4">
            Showing {bookings.length} active reservation(s)
          </p>
        </div>
      )}
    </div>
  );
}