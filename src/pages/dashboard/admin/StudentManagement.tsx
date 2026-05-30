import { useState, useEffect } from 'react';
import { Bus, Plus, Trash2, Edit3, CheckCircle2, AlertCircle, X } from 'lucide-react';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

interface Shuttle {
  id: string;
  name: string;
  route: string;
  capacity: number;
  departure_time: string;
  status: string;
}

interface Toast { type: 'success' | 'error'; msg: string; }

const EMPTY_FORM = { name: '', route: '', capacity: 24, departure_time: '', status: 'available' };

export default function ShuttleManagementPage() {
  const [shuttles, setShuttles] = useState<Shuttle[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editId, setEditId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => { fetchShuttles(); }, []);

  const showToast = (type: 'success' | 'error', msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchShuttles = async () => {
    setLoading(true);
    const res = await fetch(`${SUPABASE_URL}/rest/v1/shuttles?order=created_at.desc&select=*`, {
      headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` }
    });
    const data = await res.json();
    if (Array.isArray(data)) setShuttles(data);
    setLoading(false);
  };

  const handleSave = async () => {
    if (!form.name || !form.route || !form.departure_time) {
      showToast('error', 'Please fill in all required fields.');
      return;
    }
    setSaving(true);

    if (editId) {
      // Update
      const res = await fetch(`${SUPABASE_URL}/rest/v1/shuttles?id=eq.${editId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          Prefer: 'return=representation',
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setShuttles(prev => prev.map(s => s.id === editId ? (Array.isArray(data) ? data[0] : data) : s));
        showToast('success', 'Shuttle updated successfully.');
      } else {
        showToast('error', 'Failed to update shuttle.');
      }
    } else {
      // Create
      const res = await fetch(`${SUPABASE_URL}/rest/v1/shuttles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          Prefer: 'return=representation',
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        const newShuttle = Array.isArray(data) ? data[0] : data;
        setShuttles(prev => [newShuttle, ...prev]);
        showToast('success', 'Shuttle created successfully.');
      } else {
        showToast('error', 'Failed to create shuttle. Run the SQL below first.');
      }
    }

    setSaving(false);
    setShowForm(false);
    setForm(EMPTY_FORM);
    setEditId(null);
  };

  const handleEdit = (shuttle: Shuttle) => {
    setForm({
      name: shuttle.name,
      route: shuttle.route,
      capacity: shuttle.capacity,
      departure_time: shuttle.departure_time,
      status: shuttle.status,
    });
    setEditId(shuttle.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/shuttles?id=eq.${id}`, {
      method: 'DELETE',
      headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` }
    });
    if (res.ok || res.status === 204) {
      setShuttles(prev => prev.filter(s => s.id !== id));
      showToast('success', 'Shuttle deleted.');
    } else {
      showToast('error', 'Failed to delete shuttle.');
    }
    setDeleteId(null);
  };

  const getStatusStyle = (status: string) => {
    if (status === 'available') return 'bg-emerald-50 text-emerald-700';
    if (status === 'full') return 'bg-amber-50 text-amber-700';
    return 'bg-slate-50 text-slate-500';
  };

  return (
    <div className="p-4 lg:p-10 max-w-[1600px] mx-auto w-full animate-in fade-in duration-300 space-y-8">

      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border ${
          toast.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-rose-50 border-rose-200 text-rose-700'
        }`}>
          {toast.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span className="font-bold text-sm">{toast.msg}</span>
        </div>
      )}

      {/* Delete Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl">
            <h3 className="text-xl font-black text-[var(--color-primary-dark)] mb-2">Delete Shuttle?</h3>
            <p className="text-sm text-[var(--color-text-muted)] mb-6">This will permanently remove this shuttle from the system.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)}
                className="flex-1 py-3 border border-[var(--color-border)] rounded-xl text-sm font-bold text-[var(--color-text-muted)]">Cancel</button>
              <button onClick={() => handleDelete(deleteId)}
                className="flex-1 py-3 bg-rose-500 text-white rounded-xl text-sm font-bold">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <p className="text-[10px] font-black text-[var(--color-primary)] uppercase tracking-[0.2em]">Admin Panel</p>
          <h2 className="text-3xl font-black text-[var(--color-primary-dark)] tracking-tight mt-1">Shuttle Management</h2>
          <p className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-widest mt-1">
            Create and manage shuttles that students can book
          </p>
        </div>
        <button onClick={() => { setShowForm(true); setEditId(null); setForm(EMPTY_FORM); }}
          className="flex items-center gap-2 px-6 py-3.5 bg-[var(--color-primary)] text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-md hover:bg-[var(--color-primary-dark)] transition-all self-start sm:self-auto">
          <Plus size={16} /> Add Shuttle
        </button>
      </header>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white border border-[var(--color-border)] rounded-[2rem] p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-black text-[var(--color-primary-dark)]">{editId ? 'Edit Shuttle' : 'Create New Shuttle'}</h3>
            <button onClick={() => { setShowForm(false); setEditId(null); setForm(EMPTY_FORM); }}
              className="p-2 rounded-lg text-[var(--color-text-muted)] hover:bg-[var(--color-bg-soft)]">
              <X size={18} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { label: 'Shuttle Name *', key: 'name', placeholder: 'Shuttle Alpha', type: 'text' },
              { label: 'Route *', key: 'route', placeholder: 'Mile 17 → Main Campus', type: 'text' },
              { label: 'Departure Time *', key: 'departure_time', placeholder: '16:30', type: 'text' },
              { label: 'Capacity', key: 'capacity', placeholder: '24', type: 'number' },
            ].map(f => (
              <div key={f.key} className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-text-muted)]">{f.label}</label>
                <input type={f.type} value={(form as any)[f.key]} placeholder={f.placeholder}
                  onChange={e => setForm(prev => ({ ...prev, [f.key]: f.type === 'number' ? Number(e.target.value) : e.target.value }))}
                  className="w-full px-4 py-3 border border-[var(--color-border)] rounded-xl text-sm outline-none focus:border-[var(--color-primary)] transition-colors"
                />
              </div>
            ))}
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-text-muted)]">Status</label>
              <select value={form.status} onChange={e => setForm(prev => ({ ...prev, status: e.target.value }))}
                className="w-full px-4 py-3 border border-[var(--color-border)] rounded-xl text-sm outline-none bg-white">
                <option value="available">Available</option>
                <option value="unavailable">Unavailable</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button onClick={() => { setShowForm(false); setEditId(null); setForm(EMPTY_FORM); }}
              className="px-6 py-3 border border-[var(--color-border)] rounded-xl text-sm font-bold text-[var(--color-text-muted)] hover:bg-[var(--color-bg-soft)]">
              Cancel
            </button>
            <button onClick={handleSave} disabled={saving}
              className="px-8 py-3 bg-[var(--color-primary-dark)] text-white rounded-xl text-sm font-bold hover:bg-[var(--color-primary)] disabled:opacity-50 transition-colors">
              {saving ? 'Saving...' : editId ? 'Update Shuttle' : 'Create Shuttle'}
            </button>
          </div>
        </div>
      )}

      {/* Shuttles Table */}
      <div className="bg-white border border-[var(--color-border)] rounded-[2rem] shadow-sm overflow-hidden">
        <div className="p-6 border-b border-[var(--color-border)] flex items-center gap-3">
          <Bus size={18} className="text-[var(--color-primary)]" />
          <h3 className="font-black text-[var(--color-primary-dark)]">
            All Shuttles ({loading ? '...' : shuttles.length})
          </h3>
        </div>
        {loading ? (
          <div className="p-10 text-center">
            <div className="w-8 h-8 border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : shuttles.length === 0 ? (
          <div className="p-10 text-center">
            <Bus size={32} className="text-[var(--color-text-muted)] mx-auto mb-3 opacity-30" />
            <p className="font-bold text-[var(--color-text-muted)]">No shuttles yet</p>
            <p className="text-sm text-[var(--color-text-muted)] mt-1">Click "Add Shuttle" to create your first shuttle</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-black text-[var(--color-text-muted)] uppercase tracking-widest bg-[var(--color-bg-soft,#f8fafc)] border-b border-[var(--color-border)]">
                  {['Name', 'Route', 'Departure', 'Capacity', 'Status', 'Actions'].map(h => (
                    <th key={h} className="px-6 py-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                {shuttles.map(s => (
                  <tr key={s.id} className="hover:bg-[var(--color-bg-soft,#f8fafc)]/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[var(--color-primary-dark)] text-white flex items-center justify-center">
                          <Bus size={16} />
                        </div>
                        <span className="font-bold text-sm text-[var(--color-primary-dark)]">{s.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-[var(--color-text-muted)]">{s.route}</td>
                    <td className="px-6 py-4 font-bold text-sm text-[var(--color-primary-dark)]">{s.departure_time}</td>
                    <td className="px-6 py-4 text-sm text-[var(--color-text-muted)]">{s.capacity} seats</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${getStatusStyle(s.status)}`}>
                        {s.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button onClick={() => handleEdit(s)}
                          className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-bg-soft)] rounded-lg transition-all">
                          <Edit3 size={15} />
                        </button>
                        <button onClick={() => setDeleteId(s.id)}
                          className="p-2 text-[var(--color-text-muted)] hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all">
                          <Trash2 size={15} />
                        </button>
                      </div>
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
