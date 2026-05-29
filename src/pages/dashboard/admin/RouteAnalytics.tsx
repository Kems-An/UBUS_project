import React, { useState } from 'react';
import { 
  MapPin, 
  TrendingUp, 
  Calendar, 
  Route, 
  Clock, 
  Bus, 
  Search, 
  
  Users,
  
  Filter,
  Layers
} from 'lucide-react';

// --- Types & Interfaces ---
interface WeeklySummary {
  day: string;
  totalRuns: number;
  passengersCarried: number;
  peakHour: string;
}

interface RouteTracker {
  id: string;
  routeName: string;
  origin: string;
  destination: string;
  totalRunsThisWeek: number;
  avgDurationMin: number;
  currentStatus: 'Active' | 'High Traffic' | 'Idle';
}

const RoutesAnalytics: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'High Traffic' | 'Idle'>('All');

  // Simulated Static Weekly Run Ledger Data
  const [weeklyLog] = useState<WeeklySummary[]>([
    { day: 'Monday', totalRuns: 42, passengersCarried: 1120, peakHour: '07:30 AM - 09:00 AM' },
    { day: 'Tuesday', totalRuns: 45, passengersCarried: 1240, peakHour: '07:30 AM - 09:00 AM' },
    { day: 'Wednesday', totalRuns: 38, passengersCarried: 980, peakHour: '11:40 AM - 01:15 PM' },
    { day: 'Thursday', totalRuns: 48, passengersCarried: 1310, peakHour: '07:00 AM - 08:45 AM' },
    { day: 'Friday', totalRuns: 52, passengersCarried: 1450, peakHour: '03:30 PM - 05:00 PM' },
    { day: 'Saturday', totalRuns: 12, passengersCarried: 240, peakHour: '10:00 AM - 12:00 PM' },
  ]);

  // Simulated Network Active Routes Record 
  const [routes] = useState<RouteTracker[]>([
    { id: 'RT-01', routeName: 'Campus Express', origin: 'Mile 17 Terminal', destination: 'UB Main Campus', totalRunsThisWeek: 98, avgDurationMin: 18, currentStatus: 'High Traffic' },
    { id: 'RT-02', routeName: 'Molyko Shuttle Line', origin: 'Molyko Junction', destination: 'UB Gate 2', totalRunsThisWeek: 84, avgDurationMin: 12, currentStatus: 'Active' },
    { id: 'RT-03', routeName: 'Biaka Extension Route', origin: 'UB Main Campus', destination: 'Biaka Health Campus', totalRunsThisWeek: 32, avgDurationMin: 25, currentStatus: 'Active' },
    { id: 'RT-04', routeName: 'Weekend Special Ring', origin: 'Mile 17 Terminal', destination: 'Check Point Molyko', totalRunsThisWeek: 23, avgDurationMin: 15, currentStatus: 'Idle' },
  ]);

  // Aggregate Performance Vectors
  const totalWeeklyRuns = weeklyLog.reduce((acc, curr) => acc + curr.totalRuns, 0);
  const totalWeeklyPassengers = weeklyLog.reduce((acc, curr) => acc + curr.passengersCarried, 0);

  // Filtering System Logic
  const filteredRoutes = routes.filter(route => {
    const matchesSearch = route.routeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          route.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          route.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = statusFilter === 'All' || route.currentStatus === statusFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-4 lg:p-10 max-w-[1600px] mx-auto w-full animate-in fade-in duration-300 space-y-10">
      
      {/* ─── LAYER 1: VIEWPORT CONTEXT HEADER ─── */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-[var(--color-primary-dark)] tracking-tight">
            Transit <span className="text-[var(--color-primary)]">Route Logistics</span>
          </h2>
          <p className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-widest mt-1">
            Weekly Network Performance Monitoring & Corridor Utilization Metrics
          </p>
        </div>
        
        <div className="flex items-center gap-2 self-start sm:self-auto bg-white px-4 py-2.5 rounded-xl border border-[var(--color-border)] shadow-sm">
          <Calendar size={14} className="text-[var(--color-primary)]" />
          <span className="text-xs font-black text-[var(--color-primary-dark)] uppercase tracking-wide">Current Week Cycle</span>
        </div>
      </header>

      {/* ─── LAYER 2: LOGISTICS ACCUMULATORS ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard label="Total Runs Logged" value={totalWeeklyRuns.toString()} trend="This Week" icon={<Route size={22} />} variant="primary" />
        <MetricCard label="Est. System Ridership" value={totalWeeklyPassengers.toLocaleString()} trend="Weekly Total" icon={<Users size={22} />} variant="secondary" />
        <MetricCard label="Active Track Channels" value={routes.length.toString()} trend="Configured Vectors" icon={<Layers size={22} />} variant="primary" />
        <MetricCard label="Busiest Operating Day" value="Friday Line" trend="Max Load Threshold" icon={<TrendingUp size={22} />} variant="dark" />
      </div>

      {/* ─── LAYER 3: LIVE WEEKLY SUMMARY GRAPHIC / LEDGER CHART ─── */}
      <div className="bg-white rounded-2xl shadow-sm border border-[var(--color-border)] overflow-hidden">
        <div className="p-6 sm:p-8 border-b border-[var(--color-border)]">
          <h3 className="text-lg font-black tracking-tight text-[var(--color-primary-dark)]">Weekly Run Distributions</h3>
          <p className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest mt-0.5">
            Logistical breakdown of completed transport loops by working calendar day
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[10px] font-black text-[var(--color-text-muted)] uppercase tracking-widest bg-[var(--color-bg-soft)] border-b border-[var(--color-border)]">
                <th className="px-8 py-4">Calendar Day</th>
                <th className="px-8 py-4">Total Runs Completed</th>
                <th className="px-8 py-4">Visual Load Weight Indicator</th>
                <th className="px-8 py-4">Estimated Ridership Count</th>
                <th className="px-8 py-4 text-right">Identified Peak Network Stress Window</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {weeklyLog.map((log, index) => {
                // Calculate percentage width for visual indicator baseline
                const maxRuns = Math.max(...weeklyLog.map(l => l.totalRuns));
                const volumePercentage = (log.totalRuns / maxRuns) * 100;

                return (
                  <tr key={index} className="hover:bg-[var(--color-bg-soft)]/40 transition-colors">
                    <td className="px-8 py-4.5 font-bold text-sm text-[var(--color-primary-dark)]">{log.day}</td>
                    <td className="px-8 py-4.5 text-xs font-black text-[var(--color-text-main)]">
                      {log.totalRuns} <span className="text-[10px] font-medium text-[var(--color-text-muted)]">Completed Loops</span>
                    </td>
                    <td className="px-8 py-4.5 w-1/4">
                      <div className="w-full bg-[var(--color-bg-soft)] h-2.5 rounded-full overflow-hidden border border-[var(--color-border)]">
                        <div 
                          className="h-full bg-[var(--color-primary)] rounded-full transition-all duration-500"
                          style={{ width: `${volumePercentage}%` }}
                        />
                      </div>
                    </td>
                    <td className="px-8 py-4.5 text-xs font-bold text-[var(--color-text-muted)]">
                      <span className="text-[var(--color-primary-dark)] font-black">{log.passengersCarried.toLocaleString()}</span> Students
                    </td>
                    <td className="px-8 py-4.5 text-right text-xs font-bold text-slate-600">
                      <span className="inline-flex items-center gap-1 bg-slate-50 border border-slate-100 rounded-md px-2 py-1 text-[11px]">
                        <Clock size={11} className="text-[var(--color-text-muted)]" />
                        {log.peakHour}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ─── LAYER 4: DETAILED ROUTE EFFICIENCY TRACKER ─── */}
      <div className="bg-white rounded-2xl shadow-sm border border-[var(--color-border)] overflow-hidden">
        
        {/* Table Management Filters */}
        <div className="p-6 border-b border-[var(--color-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative w-full sm:max-w-xs group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] group-focus-within:text-[var(--color-primary)] transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="Search by terminal or corridor path..."
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
              <option value="All">All Live Statuses</option>
              <option value="Active">Active Corridor</option>
              <option value="High Traffic">High Traffic Node</option>
              <option value="Idle">Idle Tracking</option>
            </select>
          </div>
        </div>

        {/* Route Database Registry Matrix */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[10px] font-black text-[var(--color-text-muted)] uppercase tracking-widest bg-[var(--color-bg-soft)] border-b border-[var(--color-border)]">
                <th className="px-8 py-4">Route Designation</th>
                <th className="px-8 py-4">Origin Terminal</th>
                <th className="px-8 py-4">Destination Target</th>
                <th className="px-8 py-4">Cumulative Weekly Cycles</th>
                <th className="px-8 py-4">Avg Runtime Trace</th>
                <th className="px-8 py-4 text-right">Operational Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {filteredRoutes.length > 0 ? (
                filteredRoutes.map((route) => (
                  <tr key={route.id} className="hover:bg-[var(--color-bg-soft)]/40 transition-colors group">
                    <td className="px-8 py-4.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-[var(--color-bg-soft)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-primary)]">
                          <Bus size={14} />
                        </div>
                        <div>
                          <span className="text-sm font-bold text-[var(--color-primary-dark)] block">{route.routeName}</span>
                          <span className="text-[10px] font-bold text-[var(--color-text-muted)] tracking-wider mt-0.5 block">{route.id}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-4.5 text-xs font-bold text-[var(--color-text-main)]">
                      <span className="flex items-center gap-1.5">
                        <MapPin size={12} className="text-slate-400" />
                        {route.origin}
                      </span>
                    </td>
                    <td className="px-8 py-4.5 text-xs font-bold text-[var(--color-text-main)]">
                      <span className="flex items-center gap-1.5">
                        <MapPin size={12} className="text-[var(--color-primary)]" />
                        {route.destination}
                      </span>
                    </td>
                    <td className="px-8 py-4.5 text-xs font-black text-[var(--color-primary-dark)]">
                      {route.totalRunsThisWeek} <span className="text-[10px] font-semibold text-[var(--color-text-muted)]">runs</span>
                    </td>
                    <td className="px-8 py-4.5 text-xs font-bold text-[var(--color-text-muted)]">
                      {route.avgDurationMin} Mins
                    </td>
                    <td className="px-8 py-4.5 text-right">
                      <span className={`inline-block px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-wider ${
                        route.currentStatus === 'High Traffic' 
                          ? 'bg-amber-50 text-amber-600 border border-amber-100' 
                          : route.currentStatus === 'Active'
                          ? 'bg-[var(--color-secondary-light)] text-[var(--color-primary-dark)]'
                          : 'bg-slate-100 text-slate-500 border border-slate-200'
                      }`}>
                        {route.currentStatus}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-8 py-12 text-center text-xs font-bold text-[var(--color-text-muted)]">
                    No individual transit corridor vectors match selection filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

// ─── REUSABLE DESIGN CONFIGURATION MEMBRANE ───
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

export default RoutesAnalytics;