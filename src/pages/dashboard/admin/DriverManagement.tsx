import React, { useState } from 'react';
import { 
  Bus, 
   
  UserCheck, 
  UserPlus,
  Clock, 
  CircleDollarSign, 
  Search, 
  Edit3, 
  Trash2, 
  Filter,
  ShieldAlert,
  ArrowUpRight,
  ChevronRight,
  MapPin
} from 'lucide-react';

// --- Types & Interfaces ---
interface Driver {
  id: string;
  driverId: string;
  name: string;
  phone: string;
  licenseNumber: string;
  assignedShuttle: string;
  status: 'On Duty' | 'Off Duty' | 'Suspended';
}

interface ActiveShift {
  id: string;
  driverName: string;
  driverId: string;
  shuttleModel: string;
  currentRoute: string;
  clockInTime: string;
  tripsCompleted: number;
  earningsToday: string;
}

const DriversManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'On Duty' | 'Off Duty' | 'Suspended'>('All');

  // Simulated Database State for Onboarded Drivers
  const [drivers, setDrivers] = useState<Driver[]>([
    { id: '1', driverId: 'DRV-26-004', name: 'Amadou Bello', phone: '+237 677 89 44 12', licenseNumber: 'NW-40192-B', assignedShuttle: 'Shuttle Alpha', status: 'On Duty' },
    { id: '2', driverId: 'DRV-26-012', name: 'Emmanuel Tchakounte', phone: '+237 699 45 11 88', licenseNumber: 'LT-88104-A', assignedShuttle: 'Shuttle Gamma', status: 'On Duty' },
    { id: '3', driverId: 'DRV-26-009', name: 'Divine Ngassa', phone: '+237 655 23 77 01', licenseNumber: 'SW-11029-C', assignedShuttle: 'Standby Fleet', status: 'Off Duty' },
    { id: '4', driverId: 'DRV-26-015', name: 'Paul Atangana', phone: '+237 681 12 90 43', licenseNumber: 'CE-99402-B', assignedShuttle: 'None (Unassigned)', status: 'Suspended' },
  ]);

  // Simulated Live Active Shift Manifest
  const [activeShifts] = useState<ActiveShift[]>([
    { id: 'S101', driverName: 'Amadou Bello', driverId: 'DRV-26-004', shuttleModel: 'Coaster (30-Str)', currentRoute: 'Mile 17 → Main Campus', clockInTime: '06:30 AM', tripsCompleted: 6, earningsToday: '9,000 FCFA' },
    { id: 'S102', driverName: 'Emmanuel Tchakounte', driverId: 'DRV-26-012', shuttleModel: 'HiAce (18-Str)', currentRoute: 'Molyko → UB Junction', clockInTime: '07:00 AM', tripsCompleted: 4, earningsToday: '6,000 FCFA' },
  ]);

  // --- CRUD Operational Triggers ---
  const handleEditDriver = (id: string) => {
    console.log(`Trigger Edit Modal or Route for driver ID: ${id}`);
  };

  const handleDeleteDriver = (id: string) => {
    if (confirm('Are you sure you want to remove this driver from the active transit network?')) {
      setDrivers(drivers.filter(driver => driver.id !== id));
    }
  };

  const handleOnboardDriver = () => {
    console.log('Trigger Add New Driver / Onboarding Flow');
  };

  // Filtered Driver Registry Logic
  const filteredDrivers = drivers.filter(driver => {
    const matchesSearch = driver.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          driver.driverId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          driver.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = statusFilter === 'All' || driver.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-4 lg:p-10 max-w-[1600px] mx-auto w-full animate-in fade-in duration-300 space-y-10">
      
      {/* ─── LAYER 1: VIEWPORT CONTEXT HEADER ─── */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-[var(--color-primary-dark)] tracking-tight">
            Driver <span className="text-[var(--color-primary)]">Personnel Hub</span>
          </h2>
          <p className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-widest mt-1">
            Operator Verification, Live Duty Allocation, & Performance Analytics
          </p>
        </div>
        
        <button 
          onClick={handleOnboardDriver}
          className="flex items-center justify-center gap-2 px-6 py-3.5 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-md transition-all active:scale-98 self-end md:self-auto"
        >
          <UserPlus size={16} /> Onboard New Driver
        </button>
      </header>

      {/* ─── LAYER 2: PERSONNEL ACCUMULATORS & PAYOUTS ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard label="Total Operators" value={drivers.length.toString()} trend="Contracted" icon={<UserCheck size={22} />} variant="primary" />
        <MetricCard label="Drivers On-Shift" value={drivers.filter(d => d.status === 'On Duty').length.toString()} trend="Active Live" icon={<Bus size={22} />} variant="secondary" />
        <MetricCard label="Total Completed Runs" value="102" trend="Today" icon={<Clock size={22} />} variant="primary" />
        <MetricCard label="Driver Payout Pool" value="154,000 FCFA" trend="Est. Pay Today" icon={<CircleDollarSign size={22} />} variant="dark" />
      </div>

      {/* ─── LAYER 3: CORE DRIVER DIRECTORY (WITH CRUD CONTROL) ─── */}
      <div className="bg-white rounded-2xl shadow-sm border border-[var(--color-border)] overflow-hidden">
        
        {/* Table Controls & Filter Header */}
        <div className="p-6 border-b border-[var(--color-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative w-full sm:max-w-xs group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] group-focus-within:text-[var(--color-primary)] transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="Search by name, ID, or license..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-[var(--color-bg-soft)] border border border-[var(--color-border)] rounded-xl text-xs font-semibold text-[var(--color-text-main)] outline-none focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)]/20 transition-all"
            />
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <Filter size={14} className="text-[var(--color-text-muted)]" />
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="bg-white border border-[var(--color-border)] rounded-xl px-4 py-2.5 text-xs font-black uppercase tracking-wider text-[var(--color-text-main)] outline-none cursor-pointer"
            >
              <option value="All">All Operations Statuses</option>
              <option value="On Duty">On Duty Status</option>
              <option value="Off Duty">Off Duty Status</option>
              <option value="Suspended">Suspended Status</option>
            </select>
          </div>
        </div>

        {/* Personnel Matrix Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[10px] font-black text-[var(--color-text-muted)] uppercase tracking-widest bg-[var(--color-bg-soft)] border-b border-[var(--color-border)]">
                <th className="px-6 py-4">Operator Info</th>
                <th className="px-6 py-4">Driver ID</th>
                <th className="px-6 py-4">License Vector</th>
                <th className="px-6 py-4">Assigned Vehicle</th>
                <th className="px-6 py-4">Duty Status</th>
                <th className="px-6 py-4 text-center">Action Controls</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {filteredDrivers.length > 0 ? (
                filteredDrivers.map((driver) => (
                  <tr key={driver.id} className="hover:bg-[var(--color-bg-soft)]/40 transition-colors">
                    <td className="px-6 py-4.5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[var(--color-bg-soft)] border border-[var(--color-border)] flex items-center justify-center font-black text-xs text-[var(--color-primary)]">
                          {driver.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-[var(--color-primary-dark)]">{driver.name}</p>
                          <p className="text-xs text-[var(--color-text-muted)] font-medium mt-0.5">{driver.phone}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4.5 text-xs font-black text-[var(--color-primary-dark)]">{driver.driverId}</td>
                    <td className="px-6 py-4.5 text-xs font-bold text-[var(--color-text-muted)] tracking-wide">{driver.licenseNumber}</td>
                    <td className="px-6 py-4.5 text-xs font-bold text-[var(--color-text-main)]">
                      <span className="flex items-center gap-1.5">
                        <Bus size={13} className="text-[var(--color-text-muted)]" />
                        {driver.assignedShuttle}
                      </span>
                    </td>
                    <td className="px-6 py-4.5">
                      <span className={`px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-wider ${
                        driver.status === 'On Duty' 
                          ? 'bg-[var(--color-secondary-light)] text-[var(--color-primary-dark)]' 
                          : driver.status === 'Off Duty'
                          ? 'bg-slate-100 text-slate-600 border border-slate-200'
                          : 'bg-rose-50 text-rose-600 border border-rose-100'
                      }`}>
                        {driver.status}
                      </span>
                    </td>
                    <td className="px-6 py-4.5">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          onClick={() => handleEditDriver(driver.id)}
                          className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-bg-soft)] rounded-lg transition-all"
                          title="Modify Driver File"
                        >
                          <Edit3 size={15} />
                        </button>
                        <button 
                          onClick={() => handleDeleteDriver(driver.id)}
                          className="p-2 text-[var(--color-text-muted)] hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                          title="Offboard / Revoke Operator Credentials"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-xs font-bold text-[var(--color-text-muted)]">
                    No operator records matching current parameters exist.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ─── LAYER 4: LIVE OPERATIONAL RUN MANIFEST ─── */}
      <div className="bg-white rounded-2xl shadow-sm border border-[var(--color-border)] overflow-hidden">
        <div className="p-6 sm:p-8 flex justify-between items-center border-b border-[var(--color-border)]">
          <div>
            <h3 className="text-lg font-black tracking-tight text-[var(--color-primary-dark)]">Live Shift Ledger</h3>
            <p className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest mt-0.5">
              Real-time load tracking metrics for active driver vectors
            </p>
          </div>
          <button className="flex items-center gap-1 text-xs font-black text-[var(--color-primary)] uppercase tracking-widest transition-transform hover:translate-x-0.5">
            View Live Shifts <ChevronRight size={14} />
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[10px] font-black text-[var(--color-text-muted)] uppercase tracking-widest bg-[var(--color-bg-soft)] border-b border-[var(--color-border)]">
                <th className="px-8 py-4 font-black">Operator Reference</th>
                <th className="px-8 py-4 font-black">Vehicle Vector</th>
                <th className="px-8 py-4 font-black">Active Route</th>
                <th className="px-8 py-4 font-black">Session Log-In</th>
                <th className="px-8 py-4 font-black">Runs Logged</th>
                <th className="px-8 py-4 font-black">Accrued Payout</th>
                <th className="px-8 py-4 font-black text-right">Route Trace</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {activeShifts.map((shift) => (
                <tr key={shift.id} className="hover:bg-[var(--color-bg-soft)]/50 transition-colors group">
                  <td className="px-8 py-4.5">
                    <div>
                      <span className="text-sm font-bold text-[var(--color-primary-dark)] block">{shift.driverName}</span>
                      <span className="text-[10px] font-bold text-[var(--color-text-muted)] tracking-wider block mt-0.5">{shift.driverId}</span>
                    </div>
                  </td>
                  <td className="px-8 py-4.5 text-xs font-semibold text-[var(--color-text-main)]">{shift.shuttleModel}</td>
                  <td className="px-8 py-4.5 text-xs font-bold text-[var(--color-primary)]">
                    <span className="flex items-center gap-1">
                      <MapPin size={12} />
                      {shift.currentRoute}
                    </span>
                  </td>
                  <td className="px-8 py-4.5 text-xs font-bold text-[var(--color-text-muted)]">{shift.clockInTime}</td>
                  <td className="px-8 py-4.5 text-xs font-black text-[var(--color-primary-dark)]">
                    {shift.tripsCompleted} <span className="text-[10px] font-medium text-[var(--color-text-muted)]">runs</span>
                  </td>
                  <td className="px-8 py-4.5 text-xs font-black text-emerald-600">{shift.earningsToday}</td>
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

export default DriversManagement;