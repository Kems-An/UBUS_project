import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Smartphone } from 'lucide-react';

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
    <div className="pt-6 pb-12 px-4 sm:px-8 lg:px-12 max-w-5xl mx-auto overflow-x-hidden">
      {/* ── Header ── */}
      <div className="mb-8 md:mb-10 text-center lg:text-left">
        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-[var(--color-primary-dark)]">
          Complete Reservation
        </h2>
        <p className="text-xs md:text-sm text-[var(--color-text-muted)] mt-2 font-medium">
          Secure payment via Mobile Money
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10 items-start">
        
        {/* ── Summary Card ── */}
        <div className="lg:col-span-5 space-y-5 order-2 lg:order-1">
          <div className="p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] bg-white border border-[var(--color-border)] shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-text-muted)]">Total Amount</span>
            <h3 className="text-3xl md:text-4xl font-black text-[var(--color-primary-dark)] mt-2">100 XAF</h3>
            
            <div className="mt-6 md:mt-8 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-[var(--color-text-muted)] font-medium">Seat Reference</span>
                <span className="font-bold text-[var(--color-primary-dark)]">{selectedSeat}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-[var(--color-text-muted)] font-medium">Service Fee</span>
                <span className="font-bold text-green-500">Included</span>
              </div>
            </div>

            <div className="mt-6 md:mt-8 pt-6 border-t border-[var(--color-border)] flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-[var(--color-primary)]">
                <ShieldCheck size={18} />
              </div>
              <p className="text-[10px] font-black uppercase tracking-wider text-[var(--color-primary)]">
                Encrypted Transaction
              </p>
            </div>
          </div>
        </div>

        {/* ── Payment Form ── */}
        <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
          
          {/* Provider Selection */}
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {(['mtn', 'orange'] as const).map(p => (
              <button
                key={p}
                type="button"
                onClick={() => setProvider(p)}
                className={`p-4 md:p-5 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 md:gap-3 ${
                  provider === p 
                  ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5' 
                  : 'border-[var(--color-border)] bg-white hover:border-[var(--color-primary)]/30'
                }`}
              >
                <img 
                  src={p === 'mtn' 
                    ? "https://upload.wikimedia.org/wikipedia/commons/9/93/New-mtn-logo.jpg" 
                    : "https://upload.wikimedia.org/wikipedia/commons/c/c8/Orange_logo.svg"
                  } 
                  alt={p} 
                  className="w-8 h-8 md:w-10 md:h-10 rounded-lg object-contain"
                />
                <p className="font-black uppercase text-[9px] md:text-[10px] tracking-widest text-[var(--color-primary-dark)]">
                  {p === 'mtn' ? 'MTN MoMo' : 'Orange Money'}
                </p>
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form onSubmit={handlePay} className="p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] bg-white border border-[var(--color-border)] space-y-6 md:space-y-8">
            <div className="w-full">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-text-muted)] mb-3 ml-1">
                Phone Number
              </label>
              
              {/* Responsive Phone Input Group */}
              <div className="flex w-full min-w-0">
                <div className="px-3 md:px-5 py-4 bg-[var(--color-bg-muted)] border border-r-0 border-[var(--color-border)] rounded-l-2xl text-xs md:text-sm font-bold text-[var(--color-primary-dark)] flex items-center gap-1 md:gap-2 shrink-0">
                  <Smartphone size={14} className="text-[var(--color-text-muted)] hidden xs:block" />
                  +237
                </div>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="6XX XXX XXX"
                  className="flex-1 min-w-0 px-4 md:px-5 py-4 border border-[var(--color-border)] rounded-r-2xl outline-none text-sm font-bold focus:border-[var(--color-primary)] focus:ring-4 ring-[var(--color-primary)]/5 transition-all"
                />
              </div>
            </div>

            <button
              disabled={loading}
              className="w-full py-4 md:py-5 rounded-2xl bg-[var(--color-primary-dark)] text-white font-black text-xs md:text-sm flex items-center justify-center gap-3 transition-all hover:bg-[var(--color-primary)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-blue-900/10"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Confirming...
                </span>
              ) : (
                <>Confirm & Pay Now <ArrowRight size={18} /></>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}