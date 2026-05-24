import React, { useState } from 'react';
import { 
  CircleDollarSign, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Wallet, 
  Receipt, 
  CreditCard, 
  Calendar, 
  Search, 
  Filter, 
  Download,
  AlertCircle
} from 'lucide-react';

// --- Types & Interfaces ---
interface Transaction {
  id: string;
  reference: string;
  user: string;
  role: 'Student' | 'Driver' | 'System Vendor';
  type: 'Top-up' | 'Payout' | 'System Expense';
  channel: 'MTN MoMo' | 'Orange Money' | 'Cash / Ticket Desk';
  amount: number;
  timestamp: string;
  status: 'Settled' | 'Processing' | 'Failed';
}

interface RevenueChannelBreakdown {
  channel: string;
  totalCollected: number;
  transactionCount: number;
  growthPercentage: number;
}

const FinancialsManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'All' | 'Top-up' | 'Payout' | 'System Expense'>('All');

  // Simulated Global Financial Ledger Data
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 'T8901', reference: 'TXN-MOMO-9021', user: 'Elena Smith (UB22A402)', role: 'Student', type: 'Top-up', channel: 'MTN MoMo', amount: 1500, timestamp: 'Today, 08:14 AM', status: 'Settled' },
    { id: 'T8902', reference: 'TXN-OM-1104', user: 'Amadou Bello (DRV-004)', role: 'Driver', type: 'Payout', channel: 'Orange Money', amount: -9000, timestamp: 'Today, 07:30 AM', status: 'Settled' },
    { id: 'T8903', reference: 'TXN-CASH-7482', user: 'Molyko Ticket Desk B', role: 'System Vendor', type: 'Top-up', channel: 'Cash / Ticket Desk', amount: 12450, timestamp: 'Yesterday, 04:55 PM', status: 'Settled' },
    { id: 'T8904', reference: 'TXN-SYS-0041', user: 'Total Filling Station Mile 17', role: 'System Vendor', type: 'System Expense', channel: 'Cash / Ticket Desk', amount: -25000, timestamp: 'Yesterday, 01:15 PM', status: 'Settled' },
    { id: 'T8905', reference: 'TXN-MOMO-9044', user: 'Julian Weaver (UB23B115)', role: 'Student', type: 'Top-up', channel: 'MTN MoMo', amount: 3000, timestamp: '22 May 2026', status: 'Processing' },
  ]);

  // Simulated Payment Vector Performance Metrics
  const channelBreakdown: RevenueChannelBreakdown[] = [
    { channel: 'MTN Mobile Money', totalCollected: 184500, transactionCount: 412, growthPercentage: 12.4 },
    { channel: 'Orange Money Cameroon', totalCollected: 123000, transactionCount: 298, growthPercentage: 8.1 },
    { channel: 'Physical Ticket Terminals', totalCollected: 35000, transactionCount: 74, growthPercentage: -2.3 },
  ];

  // Financial Summary Aggregations
  const grossRevenue = transactions.filter(t => t.amount > 0 && t.status === 'Settled').reduce((acc, c) => acc + c.amount, 0);
  const operationalOutflow = Math.abs(transactions.filter(t => t.amount < 0 && t.status === 'Settled').reduce((acc, c) => acc + c.amount, 0));
  const netBalancePool = grossRevenue - operationalOutflow;

  // Search and Filtering Mechanics
  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.user.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          t.reference.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = typeFilter === 'All' || t.type === typeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-4 lg:p-10 max-w-[1600px] mx-auto w-full animate-in fade-in duration-300 space-y-10">
      
      {/* ─── LAYER 1: VIEWPORT CONTEXT HEADER ─── */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-[var(--color-primary-dark)] tracking-tight">
            Platform <span className="text-[var(--color-primary)]">Fiscal Treasury</span>
          </h2>
          <p className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-widest mt-1">
            Centralized Transit Wallets, Settlement Reconciliation, & Operational Cash Flow
          </p>
        </div>
        
        <button 
          onClick={() => console.log('Generate Audit Export PDF/CSV')}
          className="flex items-center justify-center gap-2 px-5 py-3.5 bg-white border border-[var(--color-border)] hover:bg-[var(--color-bg-soft)] text-[var(--color-primary-dark)] rounded-xl font-black text-xs uppercase tracking-widest shadow-sm transition-all active:scale-98 self-start sm:self-auto"
        >
          <Download size={14} /> Export Financial Audit
        </button>
      </header>

      {/* ─── LAYER 2: CASH FLOW ACCUMULATORS ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard label="Total Top-Up Gross" value="342,500 FCFA" trend="+14.2% MoM" icon={<Wallet size={22} />} variant="primary" />
        <MetricCard label="Disbursed Expenses" value={`${operationalOutflow.toLocaleString()} FCFA`} trend="Driver/Fuel Out" icon={<ArrowDownRight size={22} />} variant="secondary" />
        <MetricCard label="Net Treasury Balance" value={`${netBalancePool.toLocaleString()} FCFA`} trend="Liquid Pool" icon={<CircleDollarSign size={22} />} variant="dark" />
        <MetricCard label="Pending Settlements" value="3,000 FCFA" trend="Escrow MoM" icon={<Clock size={22} />} variant="primary" />
        {/* Note: Clock is re-declared locally as a fall back icon or imported explicitly */}
      </div>

      {/* ─── LAYER 3: PAYMENT GATEWAY RECONCILIATION CHARTS ─── */}
      <div className="bg-white rounded-2xl shadow-sm border border-[var(--color-border)] overflow-hidden">
        <div className="p-6 sm:p-8 border-b border-[var(--color-border)]">
          <h3 className="text-lg font-black tracking-tight text-[var(--color-primary-dark)]">Gateway Integration Volume</h3>
          <p className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest mt-0.5">
            Active validation of incoming payment vectors and digital wallet channel caps
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[10px] font-black text-[var(--color-text-muted)] uppercase tracking-widest bg-[var(--color-bg-soft)] border-b border-[var(--color-border)]">
                <th className="px-8 py-4">Integration Channel</th>
                <th className="px-8 py-4">Total Settled Volume</th>
                <th className="px-8 py-4">Transaction Count</th>
                <th className="px-8 py-4">Channel Volume Share</th>
                <th className="px-8 py-4 text-right">Weekly Delta Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {channelBreakdown.map((channel, idx) => {
                const totalPoolSum = channelBreakdown.reduce((s, c) => s + c.totalCollected, 0);
                const volumeShare = (channel.totalCollected / totalPoolSum) * 100;

                return (
                  <tr key={idx} className="hover:bg-[var(--color-bg-soft)]/40 transition-colors">
                    <td className="px-8 py-4.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-[var(--color-bg-soft)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-primary)]">
                          <CreditCard size={14} />
                        </div>
                        <span className="text-sm font-bold text-[var(--color-primary-dark)]">{channel.channel}</span>
                      </div>
                    </td>
                    <td className="px-8 py-4.5 text-xs font-black text-[var(--color-primary-dark)]">{channel.totalCollected.toLocaleString()} FCFA</td>
                    <td className="px-8 py-4.5 text-xs font-bold text-[var(--color-text-muted)]">{channel.transactionCount} hits</td>
                    <td className="px-8 py-4.5 w-1/4">
                      <div className="w-full bg-[var(--color-bg-soft)] h-2 rounded-full overflow-hidden border border-[var(--color-border)]">
                        <div 
                          className="h-full bg-[var(--color-primary)] rounded-full transition-all duration-500"
                          style={{ width: `${volumeShare}%` }}
                        />
                      </div>
                    </td>
                    <td className="px-8 py-4.5 text-right text-xs font-black">
                      <span className={`inline-flex items-center gap-0.5 font-bold ${channel.growthPercentage > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {channel.growthPercentage > 0 ? '+' : ''}{channel.growthPercentage}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ─── LAYER 4: LIVE REVENUE LOG & AUDIT LEDGER ─── */}
      <div className="bg-white rounded-2xl shadow-sm border border-[var(--color-border)] overflow-hidden">
        
        {/* Table Management Control Row */}
        <div className="p-6 border-b border-[var(--color-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative w-full sm:max-w-xs group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] group-focus-within:text-[var(--color-primary)] transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="Search reference code or user tag..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-[var(--color-bg-soft)] border border-[var(--color-border)] rounded-xl text-xs font-semibold text-[var(--color-text-main)] outline-none focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)]/20 transition-all"
            />
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <Filter size={14} className="text-[var(--color-text-muted)]" />
            <select 
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as any)}
              className="bg-white border border-[var(--color-border)] rounded-xl px-4 py-2.5 text-xs font-black uppercase tracking-wider text-[var(--color-text-main)] outline-none cursor-pointer"
            >
              <option value="All">All Entry Modalities</option>
              <option value="Top-up">Wallet Top-up</option>
              <option value="Payout">Driver Payout</option>
              <option value="System Expense">Operating Costs</option>
            </select>
          </div>
        </div>

        {/* Core Transaction Audit Matrix */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[10px] font-black text-[var(--color-text-muted)] uppercase tracking-widest bg-[var(--color-bg-soft)] border-b border-[var(--color-border)]">
                <th className="px-8 py-4">Transaction Reference</th>
                <th className="px-8 py-4">Entity Identity Profile</th>
                <th className="px-8 py-4">Accounting Allocation</th>
                <th className="px-8 py-4">Payment Channel</th>
                <th className="px-8 py-4">Timestamp Loop</th>
                <th className="px-8 py-4">Ledger Value</th>
                <th className="px-8 py-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-[var(--color-bg-soft)]/40 transition-colors">
                    <td className="px-8 py-4.5 font-mono text-xs font-bold text-[var(--color-primary-dark)] tracking-wide">{tx.reference}</td>
                    <td className="px-8 py-4.5">
                      <div>
                        <span className="text-xs font-bold text-[var(--color-text-main)] block">{tx.user}</span>
                        <span className="text-[9px] font-black text-[var(--color-text-muted)] uppercase tracking-wider mt-0.5 block">{tx.role}</span>
                      </div>
                    </td>
                    <td className="px-8 py-4.5">
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded-md ${
                        tx.type === 'Top-up' ? 'text-emerald-700 bg-emerald-50' : tx.type === 'Payout' ? 'text-blue-700 bg-blue-50' : 'text-amber-700 bg-amber-50'
                      }`}>
                        {tx.type}
                      </span>
                    </td>
                    <td className="px-8 py-4.5 text-xs font-bold text-[var(--color-text-muted)]">{tx.channel}</td>
                    <td className="px-8 py-4.5 text-xs font-semibold text-[var(--color-text-muted)]">{tx.timestamp}</td>
                    <td className={`px-8 py-4.5 text-xs font-black ${tx.amount > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {tx.amount > 0 ? `+${tx.amount.toLocaleString()}` : `${tx.amount.toLocaleString()}`} FCFA
                    </td>
                    <td className="px-8 py-4.5 text-center">
                      <span className={`px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-wider ${
                        tx.status === 'Settled' 
                          ? 'bg-[var(--color-secondary-light)] text-[var(--color-primary-dark)]' 
                          : tx.status === 'Processing'
                          ? 'bg-amber-50 text-amber-600 border border-amber-100'
                          : 'bg-rose-50 text-rose-600 border border-rose-100'
                      }`}>
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-8 py-12 text-center text-xs font-bold text-[var(--color-text-muted)]">
                    No transaction entries exist matches the selected ledger scope.
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

// ─── REUSABLE DESIGN COMPONENT CODES ───
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

// Declaring minor local fallback icon for the 4th card to protect bundling errors
const Clock = ({ size, className }: { size: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);

export default FinancialsManagement;