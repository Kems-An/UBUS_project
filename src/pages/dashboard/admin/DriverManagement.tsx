import React, { useState, useEffect } from 'react';
import { 
  Bus, UserCheck, UserPlus, Clock, CircleDollarSign,
  Search, Edit3, Trash2, Filter, ChevronRight,
  MapPin, X, CheckCircle2, AlertCircle
} from 'lucide-react';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

interface Driver {
  id: string;
  auth_id: string;
  full_name: string;
  email: string;
  phone: string;
  license_number: string;
  role: string;
  created_at: string;
}

interface Toast {
  type: 'success' | 'error';
  msg: string;
}

const DriversManagement: React.FC = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [toast, setToast] = useState<Toast | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);
  const [totalBookings, setTotalBookings] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => { fetchData(); }, []);

  const showToast = (type: 'success' | 'error', msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchData = async () => {
    setLoading(true);
    const [dRes, bRes] = await Promise.all([
      fetch(`${SUPABASE_URL}/rest/v1/users?role=eq.driver&order=created_at.desc&select=*`, {
        headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` }
      }),
      fetch(`${SUPABASE_URL}/rest/v1/bookings?select=amount,status`, {
        headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` }
      }),
    ]);
    const d = await dRes.json();
    const b = await bRes.json();
    if (Array.isArray(d)) setDrivers(d);
    if (Array.isArray(b)) {
      setTotalBookings(b.length);
      setTotalRevenue(b.reduce((s: number, x: any) => s + (x.amount || 0), 0));
    }
    setLoading(false);
  };

  const handleDelete = async (authId: string) => {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/users?auth_id=eq.${authId}`,
      {
        method: 'DELETE',
        headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` }
      }
    );
    if (res.ok || res.status === 204) {
      setDrivers(prev => prev.filter(d => d.auth_id !== authId));
      showToast('success', 'Driver removed from system.');
    } else {
      showToast('error', 'Failed to remove driver.');
    }
    setShowDeleteModal(null);
  };

  const filtered = drivers.filter(d =>
    d.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.license_number?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 lg:p-10 max-w-[1600px] mx-auto w-full animate-in fade-in duration-300 space-y-10">

      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border ${
          toast.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-rose-50 border-rose-200 text-rose-700'
        }`}>
          {toast.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span className="font-bold text-sm">{toast.msg}</span>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl">
            <h3 className="text-xl font-black text-[var(--color-primary-dark)] mb-2">Remove Driver?</h3>
            <p className="text-sm text-[var(--color-text-muted)] mb-6">
              This will remove the driver from the system. Their auth account will remain but they won't appear in the driver list.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setShowDeleteModal(null)}
                className="flex-1 py-3 border border-[var(--color-border)] rounded-xl text-sm font-bold text-[var(--color-text-muted)] hover:bg-[var(--color-bg-soft)] transition-colors">
                Cancel
              </button>
              <button onClick={() => handleDelete(showDeleteModal)}
                className="flex-1 py-3 bg-rose-500 text-white rounded-xl text-sm font-bold hover:bg-rose-600 transition-colors">
                Remove Driver
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <p className="text-[10px] font-black text-[var(--color-primary)] uppercase tracking-[0.2em]">Admin Panel</p>
          <h2 className="text-3xl font-black text-[var(--color-primary-dark)] tracking-tight mt-1">
            Driver <span className="text-[var(--color-primary)]">Personnel Hub</span>
          </h2>
          <p className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-widest mt-1">
            All registered drivers — pulled live from Supabase
          </p>
        </div>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Drivers', value: loading ? '...' : drivers.length.toString(), trend: 'Registered', icon: <UserCheck size={22} />, variant: 'primary' },
          { label: 'Active Drivers', value: loading ? '...' : drivers.length.toString(), trend: 'In system', icon: <Bus size={22} />, variant: 'secondary' },
          { label: 'Total Bookings', value: loading ? '...' : totalBookings.toString(), trend: 'Platform-wide', icon: <Clock size={22} />, variant: 'primary' },
          { label: 'Total Revenue', value: loading ? '...' : `${totalRevenue.toLocaleString()} XAF`, trend: 'All time', icon: <CircleDollarSign size={22} />, variant: 'dark' },
        ].map((s, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-[var(--color-border)] hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-6">
              <div className={`p-3 rounded-xl border ${
                s.variant === 'dark'
                  ? 'bg-[var(--color-primary-dark)] text-white border-transparent'
                  : 'bg-[var(--color-bg-soft,#f1f5f9)] text-[var(--color-primary)] border-[var(--color-border)]'
              }`}>{s.icon}</div>
              <span className="text-[9px] font-black text-[var(--color-text-muted)] uppercase tracking-wider px-2 py-1 bg-[var(--color-bg-soft,#f1f5f9)] rounded-md border border-[var(--color-border)]">{s.trend}</span>
            </div>
            <p className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest mb-1">{s.label}</p>
            <h3 className="text-2xl font-black tracking-tight text-[var(--color-primary-dark)]">{s.value}</h3>
          </div>
        ))}
      </div>

      {/* Driver Directory Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-[var(--color-border)] overflow-hidden">
        <div className="p-6 border-b border-[var(--color-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="font-black text-[var(--color-primary-dark)]">Driver Registry</h3>
          <div className="relative w-full sm:max-w-xs group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" size={16} />
            <input type="text" placeholder="Search by name, email, or license..."
              value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-[var(--color-bg-soft,#f8fafc)] border border-[var(--color-border)] rounded-xl text-xs font-semibold outline-none focus:ring-2 ring-[var(--color-primary)]/20 transition-all"
            />
          </div>
        </div>

        {loading ? (
          <div className="p-10 text-center">
            <div className="w-8 h-8 border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm text-[var(--color-text-muted)] mt-3">Loading drivers...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-black text-[var(--color-text-muted)] uppercase tracking-widest bg-[var(--color-bg-soft,#f8fafc)] border-b border-[var(--color-border)]">
                  {['Driver', 'Email', 'Phone', 'License Number', 'Joined', 'Actions'].map(h => (
                    <th key={h} className="px-6 py-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                {filtered.length === 0 ? (
                  <tr><td colSpan={6} className="px-6 py-12 text-center text-sm text-[var(--color-text-muted)]">
                    {drivers.length === 0 ? 'No drivers registered yet. Drivers sign up through the registration page.' : 'No drivers match your search.'}
                  </td></tr>
                ) : filtered.map(driver => (
                  <tr key={driver.id} className="hover:bg-[var(--color-bg-soft,#f8fafc)]/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] font-black text-sm">
                          {driver.full_name?.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-bold text-sm text-[var(--color-primary-dark)]">{driver.full_name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs text-[var(--color-text-muted)]">{driver.email}</td>
                    <td className="px-6 py-4 text-xs text-[var(--color-text-muted)]">{driver.phone || 'N/A'}</td>
                    <td className="px-6 py-4 font-mono text-xs text-[var(--color-primary-dark)]">{driver.license_number || 'Not set'}</td>
                    <td className="px-6 py-4 text-xs text-[var(--color-text-muted)]">
                      {new Date(driver.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4">
                      <button onClick={() => setShowDeleteModal(driver.auth_id)}
                        className="p-2 text-[var(--color-text-muted)] hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all">
                        <Trash2 size={15} />
                      </button>
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
};

export default DriversManagement;
