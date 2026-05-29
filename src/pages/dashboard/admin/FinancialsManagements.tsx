import { useState, useEffect } from 'react';
import { 
   TrendingUp,
  Wallet, Receipt, CreditCard, Search, Download
} from 'lucide-react';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

interface Booking {
  id: string;
  reference: string;
  seat_number: string;
  phone: string;
  provider: string;
  amount: number;
  status: string;
  created_at: string;
  user_id: string;
}

interface UserMap { [authId: string]: string; }

export default function FinancialsManagement() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [userMap, setUserMap] = useState<UserMap>({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [providerFilter, setProviderFilter] = useState<'all' | 'mtn' | 'orange'>('all');

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    const [bRes, uRes] = await Promise.all([
      fetch(`${SUPABASE_URL}/rest/v1/bookings?order=created_at.desc&select=*`, {
        headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` }
      }),
      fetch(`${SUPABASE_URL}/rest/v1/users?select=auth_id,full_name`, {
        headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` }
      }),
    ]);
    const b = await bRes.json();
    const u = await uRes.json();
    if (Array.isArray(b)) setBookings(b);
    if (Array.isArray(u)) {
      const map: UserMap = {};
      u.forEach((user: any) => { map[user.auth_id] = user.full_name; });
      setUserMap(map);
    }
    setLoading(false);
  };

  const confirmedBookings = bookings.filter(b => b.status === 'confirmed' || b.status === 'scanned');
  const totalRevenue = confirmedBookings.reduce((s, b) => s + (b.amount || 0), 0);
  const mtnRevenue = confirmedBookings.filter(b => b.provider === 'mtn').reduce((s, b) => s + (b.amount || 0), 0);
  const orangeRevenue = confirmedBookings.filter(b => b.provider === 'orange').reduce((s, b) => s + (b.amount || 0), 0);
  const mtnCount = confirmedBookings.filter(b => b.provider === 'mtn').length;
  const orangeCount = confirmedBookings.filter(b => b.provider === 'orange').length;

  const today = new Date().toDateString();
  const todayRevenue = confirmedBookings
    .filter(b => new Date(b.created_at).toDateString() === today)
    .reduce((s, b) => s + (b.amount || 0), 0);

  const filtered = bookings.filter(b => {
    const matchSearch = b.reference?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.phone?.includes(searchTerm) ||
      userMap[b.user_id]?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchProvider = providerFilter === 'all' || b.provider === providerFilter;
    return matchSearch && matchProvider;
  });

  const getStatusStyle = (status: string) => {
    if (status === 'confirmed' || status === 'scanned') return 'bg-emerald-50 text-emerald-700';
    if (status === 'cancelled') return 'bg-rose-50 text-rose-700';
    return 'bg-amber-50 text-amber-700';
  };

  const handleExport = () => {
    const headers = ['Reference', 'Student', 'Seat', 'Provider', 'Amount (XAF)', 'Status', 'Date'];
    const rows = bookings.map(b => [
      b.reference, userMap[b.user_id] ?? 'Unknown', b.seat_number,
      b.provider.toUpperCase(), b.amount, b.status,
      new Date(b.created_at).toLocaleString('en-GB')
    ]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ubus-financials-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const channelData = [
    { channel: 'MTN Mobile Money', total: mtnRevenue, count: mtnCount, share: totalRevenue ? (mtnRevenue / totalRevenue) * 100 : 0 },
    { channel: 'Orange Money', total: orangeRevenue, count: orangeCount, share: totalRevenue ? (orangeRevenue / totalRevenue) * 100 : 0 },
  ];

  return (
    <div className="p-4 lg:p-10 max-w-[1600px] mx-auto w-full animate-in fade-in duration-300 space-y-10">
      
      {/* ─── HEADER ─── */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-[var(--color-primary-dark)] tracking-tight">
            Platform <span className="text-[var(--color-primary)]">Financials</span>
          </h2>
          <p className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-widest mt-1">
            Real payment data from CamPay transactions
          </p>
        </div>
        <button onClick={handleExport}
          className="flex items-center justify-center gap-2 px-5 py-3.5 bg-white border border-[var(--color-border)] hover:bg-[var(--color-bg-soft)] text-[var(--color-primary-dark)] rounded-xl font-black text-xs uppercase tracking-widest shadow-sm transition-all self-start sm:self-auto"
        >
          <Download size={14} /> Export CSV
        </button>
      </header>

      {/* ─── KPI CARDS ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Revenue', value: `${totalRevenue.toLocaleString()} XAF`, icon: <Wallet size={22} />, trend: 'All time', color: 'var(--color-primary)' },
          { label: "Today's Revenue", value: `${todayRevenue.toLocaleString()} XAF`, icon: <TrendingUp size={22} />, trend: 'Today', color: '#10b981' },
          { label: 'MTN MoMo', value: `${mtnRevenue.toLocaleString()} XAF`, icon: <CreditCard size={22} />, trend: `${mtnCount} tx`, color: '#f59e0b' },
          { label: 'Orange Money', value: `${orangeRevenue.toLocaleString()} XAF`, icon: <Receipt size={22} />, trend: `${orangeCount} tx`, color: '#f97316' },
        ].map((s, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-[var(--color-border)] hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-xl" style={{ backgroundColor: s.color + '15', color: s.color }}>
                {s.icon}
              </div>
              <span className="text-[9px] font-black text-[var(--color-text-muted)] uppercase tracking-wider px-2 py-1 bg-[var(--color-bg-soft,#f1f5f9)] rounded-md">
                {s.trend}
              </span>
            </div>
            <p className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest mb-1">{s.label}</p>
            <h3 className="text-xl font-black tracking-tight text-[var(--color-primary-dark)]">
              {loading ? '...' : s.value}
            </h3>
          </div>
        ))}
      </div>

      {/* ─── CHANNEL BREAKDOWN ─── */}
      <div className="bg-white rounded-2xl shadow-sm border border-[var(--color-border)] overflow-hidden">
        <div className="p-6 border-b border-[var(--color-border)]">
          <h3 className="text-lg font-black text-[var(--color-primary-dark)]">Payment Channel Breakdown</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black text-[var(--color-text-muted)] uppercase tracking-widest bg-[var(--color-bg-soft,#f8fafc)] border-b border-[var(--color-border)]">
                {['Channel', 'Total Collected', 'Transactions', 'Volume Share'].map(h => (
                  <th key={h} className="px-6 py-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {channelData.map((c, i) => (
                <tr key={i} className="hover:bg-[var(--color-bg-soft,#f8fafc)]/40 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-[var(--color-bg-soft,#f1f5f9)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-primary)]">
                        <CreditCard size={14} />
                      </div>
                      <span className="text-sm font-bold text-[var(--color-primary-dark)]">{c.channel}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-black text-[var(--color-primary-dark)]">
                    {loading ? '...' : `${c.total.toLocaleString()} XAF`}
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-[var(--color-text-muted)]">{loading ? '...' : `${c.count} transactions`}</td>
                  <td className="px-6 py-4 w-48">
                    <div className="w-full bg-[var(--color-bg-soft,#f1f5f9)] h-2 rounded-full overflow-hidden">
                      <div className="h-full bg-[var(--color-primary)] rounded-full transition-all duration-500"
                        style={{ width: `${c.share}%` }} />
                    </div>
                    <span className="text-xs font-black text-[var(--color-text-muted)] mt-1 block">{c.share.toFixed(1)}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ─── TRANSACTION LEDGER ─── */}
      <div className="bg-white rounded-2xl shadow-sm border border-[var(--color-border)] overflow-hidden">
        <div className="p-6 border-b border-[var(--color-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="text-lg font-black text-[var(--color-primary-dark)]">Transaction Ledger</h3>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
              <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search..."
                className="pl-9 pr-4 py-2.5 border border-[var(--color-border)] rounded-xl text-xs outline-none focus:border-[var(--color-primary)] transition-colors w-48"
              />
            </div>
            <select value={providerFilter} onChange={e => setProviderFilter(e.target.value as any)}
              className="border border-[var(--color-border)] rounded-xl px-3 py-2.5 text-xs font-black uppercase outline-none cursor-pointer bg-white">
              <option value="all">All Providers</option>
              <option value="mtn">MTN MoMo</option>
              <option value="orange">Orange Money</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="p-10 text-center">
            <div className="w-8 h-8 border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-black text-[var(--color-text-muted)] uppercase tracking-widest bg-[var(--color-bg-soft,#f8fafc)] border-b border-[var(--color-border)]">
                  {['Reference', 'Student', 'Seat', 'Channel', 'Date', 'Amount', 'Status'].map(h => (
                    <th key={h} className="px-6 py-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                {filtered.length === 0 ? (
                  <tr><td colSpan={7} className="px-6 py-10 text-center text-sm text-[var(--color-text-muted)]">No transactions found</td></tr>
                ) : filtered.map(b => (
                  <tr key={b.id} className="hover:bg-[var(--color-bg-soft,#f8fafc)]/40 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-[var(--color-primary-dark)]">{b.reference || 'N/A'}</td>
                    <td className="px-6 py-4 text-sm font-bold text-[var(--color-primary-dark)] max-w-[120px] truncate">
                      {userMap[b.user_id] ?? 'Unknown'}
                    </td>
                    <td className="px-6 py-4 font-bold text-sm text-[var(--color-primary-dark)]">{b.seat_number}</td>
                    <td className="px-6 py-4 text-xs font-bold uppercase text-[var(--color-text-muted)]">{b.provider}</td>
                    <td className="px-6 py-4 text-xs text-[var(--color-text-muted)]">
                      {new Date(b.created_at).toLocaleString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', hour12: true })}
                    </td>
                    <td className={`px-6 py-4 text-sm font-black ${b.status === 'cancelled' ? 'text-rose-600' : 'text-emerald-600'}`}>
                      +{b.amount} XAF
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${getStatusStyle(b.status)}`}>
                        {b.status}
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
