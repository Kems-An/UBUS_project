import { useState, useEffect } from 'react';
import { 
  Users, Search, 
  CheckCircle2,  Clock
} from 'lucide-react';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

interface Student {
  id: string;
  auth_id: string;
  full_name: string;
  email: string;
  phone: string;
  student_id: string;
  role: string;
  created_at: string;
}

interface Booking {
  id: string;
  user_id: string;
  seat_number: string;
  status: string;
  amount: number;
  created_at: string;
  reference: string;
  phone: string;
  provider: string;
}

export default function StudentsManagement() {
  const [students, setStudents] = useState<Student[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'students' | 'bookings'>('students');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [studentsRes, bookingsRes] = await Promise.all([
      fetch(`${SUPABASE_URL}/rest/v1/users?role=eq.student&order=created_at.desc&select=*`, {
        headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` }
      }),
      fetch(`${SUPABASE_URL}/rest/v1/bookings?order=created_at.desc&select=*`, {
        headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` }
      }),
    ]);

    const studentsData = await studentsRes.json();
    const bookingsData = await bookingsRes.json();

    if (Array.isArray(studentsData)) setStudents(studentsData);
    if (Array.isArray(bookingsData)) setBookings(bookingsData);
    setLoading(false);
  };

  const filteredStudents = students.filter(s =>
    s.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.student_id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredBookings = bookings.filter(b =>
    b.reference?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.seat_number?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'scanned': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'cancelled': return 'bg-rose-50 text-rose-600 border-rose-100';
      default: return 'bg-slate-50 text-slate-500 border-slate-100';
    }
  };

  const totalRevenue = bookings.reduce((sum, b) => sum + (b.amount || 0), 0);
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;
 

  return (
    <div className="p-4 lg:p-10 max-w-[1600px] mx-auto w-full animate-in fade-in duration-300">

      {/* ─── HEADER ─── */}
      <header className="mb-8">
        <p className="text-[10px] font-black text-[var(--color-primary)] uppercase tracking-[0.2em]">
          Admin Panel
        </p>
        <h2 className="text-3xl font-black text-[var(--color-primary-dark)] tracking-tight mt-1">
          Student Management
        </h2>
        <p className="text-sm text-[var(--color-text-muted)] mt-1">
          All registered students and their booking activity
        </p>
      </header>

      {/* ─── KPI CARDS ─── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Students', value: students.length, icon: <Users size={20} />, color: '#3b82f6' },
          { label: 'Total Bookings', value: bookings.length, icon: <CheckCircle2 size={20} />, color: '#10b981' },
          { label: 'Active Bookings', value: confirmedBookings, icon: <Clock size={20} />, color: '#f59e0b' },
          { label: 'Total Revenue', value: `${totalRevenue} XAF`, icon: <CheckCircle2 size={20} />, color: '#8b5cf6' },
        ].map((s, i) => (
          <div key={i} className="bg-white border border-[var(--color-border)] rounded-2xl p-5 shadow-sm">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
              style={{ backgroundColor: s.color + '15', color: s.color }}>
              {s.icon}
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-[var(--color-text-muted)]">{s.label}</p>
            <p className="text-xl font-black text-[var(--color-primary-dark)] mt-1">
              {loading ? '...' : s.value}
            </p>
          </div>
        ))}
      </div>

      {/* ─── SEARCH + TABS ─── */}
      <div className="bg-white border border-[var(--color-border)] rounded-[2rem] shadow-sm overflow-hidden">
        <div className="p-6 border-b border-[var(--color-border)] flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex gap-2">
            {(['students', 'bookings'] as const).map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                  activeTab === tab
                    ? 'bg-[var(--color-primary-dark)] text-white'
                    : 'bg-[var(--color-bg-soft,#f1f5f9)] text-[var(--color-text-muted)] hover:text-[var(--color-primary-dark)]'
                }`}>
                {tab} ({tab === 'students' ? students.length : bookings.length})
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-72">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
            <input
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder={activeTab === 'students' ? 'Search students...' : 'Search bookings...'}
              className="w-full pl-10 pr-4 py-3 border border-[var(--color-border)] rounded-xl text-sm outline-none focus:border-[var(--color-primary)] transition-colors"
            />
          </div>
        </div>

        {loading ? (
          <div className="p-10 text-center">
            <div className="w-8 h-8 border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm text-[var(--color-text-muted)] mt-3">Loading data...</p>
          </div>
        ) : activeTab === 'students' ? (
          /* ─── STUDENTS TABLE ─── */
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--color-border)] bg-[var(--color-bg-soft,#f8fafc)]">
                  {['Student', 'Email', 'Student ID', 'Phone', 'Joined', 'Bookings'].map(h => (
                    <th key={h} className="text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[var(--color-text-muted)]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                {filteredStudents.length === 0 ? (
                  <tr><td colSpan={6} className="px-6 py-10 text-center text-[var(--color-text-muted)]">No students found</td></tr>
                ) : filteredStudents.map(student => {
                  const studentBookings = bookings.filter(b => b.user_id === student.auth_id);
                  return (
                    <tr key={student.id} className="hover:bg-[var(--color-bg-soft,#f8fafc)] transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-xs font-black">
                            {student.full_name?.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-bold text-[var(--color-primary-dark)]">{student.full_name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[var(--color-text-muted)]">{student.email}</td>
                      <td className="px-6 py-4 font-mono text-xs text-[var(--color-primary-dark)]">{student.student_id || 'N/A'}</td>
                      <td className="px-6 py-4 text-[var(--color-text-muted)]">{student.phone || 'N/A'}</td>
                      <td className="px-6 py-4 text-[var(--color-text-muted)] text-xs">
                        {new Date(student.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-full text-xs font-black">
                          {studentBookings.length} trips
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          /* ─── BOOKINGS TABLE ─── */
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--color-border)] bg-[var(--color-bg-soft,#f8fafc)]">
                  {['Reference', 'Seat', 'Phone', 'Provider', 'Amount', 'Date', 'Status'].map(h => (
                    <th key={h} className="text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[var(--color-text-muted)]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                {filteredBookings.length === 0 ? (
                  <tr><td colSpan={7} className="px-6 py-10 text-center text-[var(--color-text-muted)]">No bookings found</td></tr>
                ) : filteredBookings.map(booking => (
                  <tr key={booking.id} className="hover:bg-[var(--color-bg-soft,#f8fafc)] transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-[var(--color-primary-dark)]">{booking.reference}</td>
                    <td className="px-6 py-4 font-bold text-[var(--color-primary-dark)]">{booking.seat_number}</td>
                    <td className="px-6 py-4 text-[var(--color-text-muted)]">+237 {booking.phone}</td>
                    <td className="px-6 py-4 uppercase text-xs font-bold text-[var(--color-text-muted)]">{booking.provider}</td>
                    <td className="px-6 py-4 font-black text-[var(--color-primary-dark)]">{booking.amount} XAF</td>
                    <td className="px-6 py-4 text-xs text-[var(--color-text-muted)]">
                      {new Date(booking.created_at).toLocaleString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', hour12: true })}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border w-fit ${getStatusStyle(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
