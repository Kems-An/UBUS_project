import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type Provider = 'mtn' | 'orange';

export default function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedSeat = (location.state as { seat?: string })?.seat ?? 'N/A';

  const [provider, setProvider] = useState<Provider>('mtn');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  function handlePay(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard/student/booking-confirmation', {
        state: { seat: selectedSeat, phone, provider },
      });
    }, 2000);
  }

  return (
    <div className="p-8 lg:p-12 max-w-5xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[var(--color-primary-dark)]">Complete Reservation</h2>
        <p className="text-sm text-[var(--color-text-muted)]">Payment via Mobile Money</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 space-y-5">
          <div className="p-7 rounded-2xl bg-white border border-[var(--color-border)] shadow-sm">
            <h3 className="text-3xl font-black text-[var(--color-primary-dark)]">3,500 XAF</h3>
            <p className="text-sm text-[var(--color-text-muted)] mt-2">Seat Reference: {selectedSeat}</p>
            <div className="mt-6 pt-6 border-t border-[var(--color-border)]">
              <p className="text-xs font-bold text-[var(--color-primary)]">🔒 Encrypted Transaction</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {(['mtn', 'orange'] as const).map(p => (
              <button
                key={p}
                onClick={() => setProvider(p)}
                className={`p-5 rounded-xl border-2 transition-all ${provider === p ? 'border-[var(--color-primary)] bg-[var(--color-bg-soft)]' : 'border-[var(--color-border)] bg-white'}`}
              >
                <p className="font-bold uppercase text-xs">{p === 'mtn' ? 'MTN MoMo' : 'Orange Money'}</p>
              </button>
            ))}
          </div>

          <form onSubmit={handlePay} className="p-7 rounded-2xl bg-white border border-[var(--color-border)] space-y-6">
            <div>
              <label className="block text-sm font-bold mb-2">Phone Number</label>
              <div className="flex">
                <span className="px-4 py-3 bg-[var(--color-bg-muted)] border border-r-0 border-[var(--color-border)] rounded-l-lg text-sm">+237</span>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="6XX XXX XXX"
                  className="flex-1 px-4 py-3 border border-[var(--color-border)] rounded-r-lg outline-none focus:border-[var(--color-primary)]"
                />
              </div>
            </div>
            <button
              disabled={loading}
              className="w-full py-4 rounded-xl bg-[var(--color-primary)] text-white font-bold transition-transform active:scale-95 disabled:opacity-50"
            >
              {loading ? 'Confirming on Phone...' : 'Confirm & Pay Now →'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}