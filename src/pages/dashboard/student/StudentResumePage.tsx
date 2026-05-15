import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Ticket, 
  ArrowRight, 
  CreditCard, 
  CheckCircle2,
  History,
  Wallet,
  Activity,
  ArrowUpRight,
  ArrowDownLeft
} from 'lucide-react'; 

const MOCK_STATS = {
  totalBookings: 24,
  totalSpent: '12,500', 
  successRate: '92%',
  cancelled: 2,
  walletBalance: '4,250' 
};

const RECENT_ACTIVITY = [
  { id: 'TRX-992', description: 'Seat Booking: Science District', date: 'May 14', amount: '-500', status: 'Completed', type: 'Debit' },
  { id: 'TRX-990', description: 'Wallet Top-up: MoMo', date: 'May 13', amount: '+5,000', status: 'Completed', type: 'Credit' },
  { id: 'TRX-988', description: 'Seat Booking: Night Loop', date: 'May 12', amount: '-500', status: 'Completed', type: 'Debit' },
  { id: 'TRX-980', description: 'Seat Booking: East Express', date: 'May 10', amount: '500', status: 'Refunded', type: 'Credit' },
];

export default function StudentDashboardResume() {
  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 lg:p-10 space-y-8 animate-in fade-in duration-700 overflow-x-hidden">
      
      {/* ─── HEADER ─── */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[var(--color-primary)]">
            <Activity size={16} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Live Account Status</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-black tracking-tight text-[var(--color-primary-dark)]">
            System Resume
          </h2>
          <p className="text-xs md:text-sm text-[var(--color-text-muted)]">
            Your transit interactions and financial logs.
          </p>
        </div>

        <Link 
          to="/dashboard/student/route-selection"
          className="flex items-center justify-center gap-3 px-6 py-4 bg-[var(--color-primary)] text-white rounded-2xl font-bold text-sm shadow-lg shadow-[var(--color-primary)]/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <Ticket size={18} />
          Book New Trip
        </Link>
      </header>

      {/* ─── PRIMARY KPI GRID ─── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        <StatCard label="Trips" value={MOCK_STATS.totalBookings} icon={<Ticket size={18} />} color="var(--color-primary)" />
        <StatCard label="Spent" value={MOCK_STATS.totalSpent} icon={<CreditCard size={18} />} color="var(--color-primary-dark)" />
        <StatCard label="Wallet" value={MOCK_STATS.walletBalance} icon={<Wallet size={18} />} color="var(--color-primary)" />
        <StatCard label="Success" value={MOCK_STATS.successRate} icon={<CheckCircle2 size={18} />} color="var(--color-primary-dark)" />
      </div>

      {/* ─── INTERACTION LOG ─── */}
      <div className="bg-white border border-[var(--color-border)] rounded-[1.5rem] md:rounded-[2rem] shadow-sm overflow-hidden">
        <div className="p-5 md:p-8 border-b border-[var(--color-border)] flex items-center justify-between bg-gray-50/30">
          <h3 className="text-sm md:text-lg font-bold text-[var(--color-primary-dark)] flex items-center gap-2">
            <History size={18} className="opacity-40" />
            History
          </h3>
          <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Recent Logs</span>
        </div>

        {/* Desktop Table: Hidden on Mobile */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black uppercase tracking-widest text-gray-400 border-b border-gray-100">
                <th className="py-5 px-8">Transaction</th>
                <th className="py-5 px-4">Date</th>
                <th className="py-5 px-4">Amount</th>
                <th className="py-5 px-8 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {RECENT_ACTIVITY.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-5 px-8">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.type === 'Credit' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                        {item.type === 'Credit' ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-800">{item.description}</p>
                        <p className="text-[10px] font-mono text-gray-400">{item.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-5 px-4 text-sm font-medium text-gray-500">{item.date}</td>
                  <td className={`py-5 px-4 text-sm font-black ${item.type === 'Credit' ? 'text-emerald-600' : 'text-gray-900'}`}>{item.amount} XAF</td>
                  <td className="py-5 px-8 text-right">
                    <StatusLabel status={item.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile List View: Only visible on Small Screens */}
        <div className="md:hidden divide-y divide-gray-50">
          {RECENT_ACTIVITY.map((item) => (
            <div key={item.id} className="p-4 flex items-center justify-between gap-3 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3 min-w-0">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${item.type === 'Credit' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                  {item.type === 'Credit' ? <ArrowDownLeft size={14} /> : <ArrowUpRight size={14} />}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-gray-800 truncate">{item.description}</p>
                  <p className="text-[10px] text-gray-400">{item.date} • {item.id}</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className={`text-xs font-black mb-1 ${item.type === 'Credit' ? 'text-emerald-600' : 'text-gray-900'}`}>
                  {item.amount}
                </p>
                <StatusLabel status={item.status} />
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-4 bg-gray-50/50 text-center">
           <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">End of History</p>
        </div>
      </div>
    </div>
  );
}

function StatusLabel({ status }: { status: string }) {
  const styles: Record<string, string> = {
    'Completed': 'bg-emerald-50 border-emerald-100 text-emerald-700',
    'Refunded': 'bg-blue-50 border-blue-100 text-blue-700',
    'Cancelled': 'bg-rose-50 border-rose-100 text-rose-700',
  };
  return (
    <span className={`inline-block px-2 py-0.5 rounded md:rounded-lg text-[8px] md:text-[10px] font-black uppercase border tracking-tighter ${styles[status] || styles['Cancelled']}`}>
      {status}
    </span>
  );
}

function StatCard({ label, value, icon, color }: { label: string, value: string | number, icon: React.ReactNode, color: string }) {
  return (
    <div className="p-4 md:p-6 bg-white border border-[var(--color-border)] rounded-2xl shadow-sm hover:shadow-md transition-all">
      <div 
        style={{ backgroundColor: 'var(--color-bg-soft)', color: color }}
        className="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center mb-3 md:mb-6"
      >
        {icon}
      </div>
      <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">{label}</p>
      <p className="text-sm md:text-2xl font-black text-[var(--color-primary-dark)] truncate">{value}</p>
    </div>
  );
}