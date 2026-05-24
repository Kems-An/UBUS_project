import React, { useState } from 'react';
import { 
  Users, 
  UserPlus,
  CalendarCheck, 
  CircleDollarSign, 
  Search, 
  Edit3, 
  Trash2, 
  UserCheck,
  MoreVertical,
  ChevronRight,
  Filter,
  ArrowUpRight
} from 'lucide-react';

// --- Types & Interfaces ---
interface Student {
  id: string;
  matricule: string;
  name: string;
  email: string;
  department: string;
  status: 'Active' | 'Suspended';
}

interface Booking {
  id: string;
  studentName: string;
  matricule: string;
  route: string;
  time: string;
  fare: string;
  status: 'Confirmed' | 'Scanned' | 'Missed';
}

const StudentsManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Suspended'>('All');

  // Simulated Database State for Registered Students
  const [students, setStudents] = useState<Student[]>([
    { id: '1', matricule: 'UB22A402', name: 'Elena Smith', email: 'elena.smith@ubuea.cm', department: 'FET (Software)', status: 'Active' },
    { id: '2', matricule: 'UB23B115', name: 'Julian Weaver', email: 'julian.w@ubuea.cm', department: 'FS (Biochemistry)', status: 'Active' },
    { id: '3', matricule: 'UB21C084', name: 'Marcus Reed', email: 'm.reed@ubuea.cm', department: 'ASTI (Translation)', status: 'Suspended' },
    { id: '4', matricule: 'UB22A109', name: 'Carine Ngo', email: 'carine.ngo@ubuea.cm', department: 'FSMS (Economics)', status: 'Active' },
  ]);

  // Simulated Real-Time Booking Ledger
  const [bookings] = useState<Booking[]>([
    { id: 'B901', studentName: 'Elena Smith', matricule: 'UB22A402', route: 'Mile 17 → Main Campus', time: '07:45 AM', fare: '150 FCFA', status: 'Confirmed' },
    { id: 'B902', studentName: 'Julian Weaver', matricule: 'UB23B115', route: 'Molyko → UB Junction', time: '08:15 AM', fare: '150 FCFA', status: 'Scanned' },
    { id: 'B903', studentName: 'Carine Ngo', matricule: 'UB22A109', route: 'Biaka → Main Campus', time: '09:00 AM', fare: '200 FCFA', status: 'Confirmed' },
  ]);

  // --- CRUD Operational Triggers ---
  const handleEditStudent = (id: string) => {
    console.log(`Trigger Edit Modal/Routing for student ID: ${id}`);
    // Tie into your routing or central state modal system here
  };

  const handleDeleteStudent = (id: string) => {
    if (confirm('Are you sure you want to remove this student from the registry?')) {
      setStudents(students.filter(student => student.id !== id));
    }
  };

  const handleCreateStudent = () => {
    console.log('Trigger Add New Student Modal');
  };

  // Filtered Student List Logic
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          student.matricule.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = statusFilter === 'All' || student.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-4 lg:p-10 max-w-[1600px] mx-auto w-full animate-in fade-in duration-300 space-y-10">
      
      {/* ─── LAYER 1: VIEWPORT CONTEXT HEADER ─── */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-[var(--color-primary-dark)] tracking-tight">
            Student <span className="text-[var(--color-primary)]">Registry Matrix</span>
          </h2>
          <p className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-widest mt-1">
            Account Provisioning, Transit Access Profiles, & Booking Data Ledger
          </p>
        </div>
        
        <button 
          onClick={handleCreateStudent}
          className="flex items-center justify-center gap-2 px-6 py-3.5 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-md transition-all active:scale-98 self-end md:self-auto"
        >
          <UserPlus size={16} /> Register Student
        </button>
      </header>

      {/* ─── LAYER 2: STUDENT FINANCIALS & ACCUMULATORS ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard label="Registered Profiles" value={students.length.toString()} trend="Total DB" icon={<Users size={22} />} variant="primary" />
        <MetricCard label="Active Transit Passes" value={students.filter(s => s.status === 'Active').length.toString()} trend="Eligible" icon={<UserCheck size={22} />} variant="secondary" />
        <MetricCard label="Active Ride Bookings" value={bookings.length.toString()} trend="Today" icon={<CalendarCheck size={22} />} variant="primary" />
        <MetricCard label="Student Ledger Revenue" value="342,500 FCFA" trend="Gross MTD" icon={<CircleDollarSign size={22} />} variant="dark" />
      </div>

      {/* ─── LAYER 3: CORE STUDENT DIRECTORY (WITH CRUD) ─── */}
      <div className="bg-white rounded-2xl shadow-sm border border-[var(--color-border)] overflow-hidden">
        
        {/* Table Management & Filtering Header */}
        <div className="p-6 border-b border-[var(--color-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative w-full sm:max-w-xs group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] group-focus-within:text-[var(--color-primary)] transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="Search by name or matricule..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-[var(--color-bg-soft)] border border-[var(--color-border)] rounded-xl text-xs font-semibold text-[var(--color-text-main)] outline-none focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)]/20 transition-all"
            />
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <Filter size={14} className="text-[var(--color-text-muted)]" />
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="bg-white border border-[var(--color-border)] rounded-xl px-4 py-2.5 text-xs font-black uppercase tracking-wider text-[var(--color-text-main)] outline-none cursor-pointer"
            >
              <option value="All">All Standings</option>
              <option value="Active">Active Status</option>
              <option value="Suspended">Suspended Status</option>
            </select>
          </div>
        </div>

        {/* Directory Matrix Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[10px] font-black text-[var(--color-text-muted)] uppercase tracking-widest bg-[var(--color-bg-soft)] border-b border-[var(--color-border)]">
                <th className="px-6 py-4">Student Info</th>
                <th className="px-6 py-4">Matricule</th>
                <th className="px-6 py-4">Academic Division</th>
                <th className="px-6 py-4">System Status</th>
                <th className="px-6 py-4 text-center">Action Controls</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-[var(--color-bg-soft)]/40 transition-colors">
                    <td className="px-6 py-4.5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[var(--color-bg-soft)] border border-[var(--color-border)] flex items-center justify-center font-black text-xs text-[var(--color-primary)]">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-[var(--color-primary-dark)]">{student.name}</p>
                          <p className="text-xs text-[var(--color-text-muted)] font-medium mt-0.5">{student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4.5 text-xs font-black text-[var(--color-primary-dark)]">{student.matricule}</td>
                    <td className="px-6 py-4.5 text-xs font-bold text-[var(--color-text-muted)]">{student.department}</td>
                    <td className="px-6 py-4.5">
                      <span className={`px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-wider ${
                        student.status === 'Active' 
                          ? 'bg-[var(--color-secondary-light)] text-[var(--color-primary-dark)]' 
                          : 'bg-rose-50 text-rose-600 border border-rose-100'
                      }`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="px-6 py-4.5">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          onClick={() => handleEditStudent(student.id)}
                          className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-bg-soft)] rounded-lg transition-all"
                          title="Modify Account Record"
                        >
                          <Edit3 size={15} />
                        </button>
                        <button 
                          onClick={() => handleDeleteStudent(student.id)}
                          className="p-2 text-[var(--color-text-muted)] hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                          title="Revoke Student From System"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-xs font-bold text-[var(--color-text-muted)]">
                    No student records matching current constraints found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ─── LAYER 4: RECENT ACTIVE SHUTTLE BOOKINGS BY STUDENTS ─── */}
      <div className="bg-white rounded-2xl shadow-sm border border-[var(--color-border)] overflow-hidden">
        <div className="p-6 sm:p-8 flex justify-between items-center border-b border-[var(--color-border)]">
          <div>
            <h3 className="text-lg font-black tracking-tight text-[var(--color-primary-dark)]">Live Ride Manifest</h3>
            <p className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest mt-0.5">
              Active tracking of student shuttle reservations
            </p>
          </div>
          <button className="flex items-center gap-1 text-xs font-black text-[var(--color-primary)] uppercase tracking-widest transition-transform hover:translate-x-0.5">
            View Live Board <ChevronRight size={14} />
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[10px] font-black text-[var(--color-text-muted)] uppercase tracking-widest bg-[var(--color-bg-soft)] border-b border-[var(--color-border)]">
                <th className="px-8 py-4 font-black">Student Passenger</th>
                <th className="px-8 py-4 font-black">Route Path Vector</th>
                <th className="px-8 py-4 font-black">Departure Time</th>
                <th className="px-8 py-4 font-black">Access Fee</th>
                <th className="px-8 py-4 font-black">Ticket Status</th>
                <th className="px-8 py-4 font-black text-right">Receipt Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-[var(--color-bg-soft)]/50 transition-colors group">
                  <td className="px-8 py-4.5">
                    <div>
                      <span className="text-sm font-bold text-[var(--color-primary-dark)] block">{booking.studentName}</span>
                      <span className="text-[10px] font-bold text-[var(--color-text-muted)] tracking-wider block mt-0.5">{booking.matricule}</span>
                    </div>
                  </td>
                  <td className="px-8 py-4.5 text-xs font-semibold text-[var(--color-text-main)]">{booking.route}</td>
                  <td className="px-8 py-4.5 text-xs font-bold text-[var(--color-text-muted)]">{booking.time}</td>
                  <td className="px-8 py-4.5 text-xs font-black text-[var(--color-primary-dark)]">{booking.fare}</td>
                  <td className="px-8 py-4.5">
                    <span className={`px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-wider ${
                      booking.status === 'Scanned'
                        ? 'bg-[var(--color-secondary-light)] text-[var(--color-primary-dark)]'
                        : 'bg-blue-50 text-blue-600 border border-blue-100'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-8 py-4.5 text-right">
                    <button className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">
                      <ArrowUpRight size={16} className="ml-auto opacity-60 group-hover:opacity-100 transition-all" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

// ─── REUSABLE DESIGN LAYOUT COMPONENTS ───

interface MetricCardProps {
  label: string;
  value: string;
  trend: string;
  icon: React.ReactNode;
  variant: 'primary' | 'secondary' | 'dark';
}

const MetricCard = ({ label, value, trend, icon, variant }: MetricCardProps) => {
  const containerThemes = {
    primary: 'bg-[var(--color-bg-soft)] text-[var(--color-primary)] border-[var(--color-border)]',
    secondary: 'bg-[var(--color-secondary-light)] text-[var(--color-primary-dark)] border-[var(--color-border)]',
    dark: 'bg-[var(--color-primary-dark)] text-white border-transparent'
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-[var(--color-border)] transition-all duration-300 hover:shadow-md">
      <div className="flex justify-between items-start mb-6">
        <div className={`p-3 rounded-xl border ${containerThemes[variant]}`}>
          {icon}
        </div>
        <div className="px-2.5 py-1 bg-[var(--color-bg-soft)] rounded-md border border-[var(--color-border)]">
          <span className="text-[9px] font-black text-[var(--color-text-muted)] uppercase tracking-wider">{trend}</span>
        </div>
      </div>
      <p className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest mb-1">{label}</p>
      <h3 className="text-2xl font-black tracking-tight text-[var(--color-primary-dark)]">{value}</h3>
    </div>
  );
};

export default StudentsManagement;