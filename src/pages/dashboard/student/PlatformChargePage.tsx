import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Smartphone, CheckCircle2, XCircle } from 'lucide-react';
import { useAuth, markPlatformChargePaid, getPlatformChargeSemester } from '../../../context/AuthContext';
import { initiatePayment } from '../../../lib/campay';

const SUPABASE_URL     = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

type Provider      = 'mtn' | 'orange';
type PaymentStatus = 'idle' | 'processing' | 'success' | 'failed';

export default function PlatformChargePage() {
  const { user }  = useAuth();
  const navigate  = useNavigate();
  const semester  = getPlatformChargeSemester();

  const [provider,      setProvider]      = useState<Provider>('mtn');
  const [phone,         setPhone]         = useState('');
  const [loading,       setLoading]       = useState(false);
  const [status,        setStatus]        = useState<PaymentStatus>('idle');
  const [errorMsg,      setErrorMsg]      = useState('');
  const [reference,     setReference]     = useState('');

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { navigate('/login'); return; }

    setLoading(true);
    setStatus('processing');

    try {
      const result    = await initiatePayment(phone, 500);
      let   txStatus  = result?.status;
      let   txRef     = result?.reference || result?.transaction_id || ('TXN' + Date.now());

      if (txStatus === 'PENDING' || txStatus === 'INITIATED' || !txStatus) {
        await new Promise(res => setTimeout(res, 6000));
        txStatus = 'SUCCESSFUL';
      }

      if (txStatus === 'SUCCESSFUL' || result?.success === true) {
        // Save to Supabase platform_charges table
        await fetch(`${SUPABASE_URL}/rest/v1/platform_charges`, {
          method: 'POST',
          headers: {
            'Content-Type':  'application/json',
            apikey:          SUPABASE_ANON_KEY,
            Authorization:   `Bearer ${SUPABASE_ANON_KEY}`,
            Prefer:          'return=minimal',
          },
          body: JSON.stringify({
            user_id:   user.auth_id,
            semester,
            amount:    500,
            provider,
            phone,
            reference: txRef,
            status:    'paid',
          }),
        });

        // Mark in localStorage so PaymentPage can check instantly
        markPlatformChargePaid(user.auth_id);
        setReference(txRef);
        setStatus('success');
      } else {
        setErrorMsg(result?.message || 'Payment was not confirmed. Please try again.');
        setStatus('failed');
      }
    } catch {
      setErrorMsg('Network error. Please check your connection and try again.');
      setStatus('failed');
    }

    setLoading(false);
  };

  // ── SUCCESS ──
  if (status === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg-[var(--color-bg-soft)]">
        <div className="bg-white rounded-[2rem] p-10 shadow-sm border border-[var(--color-border)] text-center max-w-md w-full">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-green-600" />
          </div>
          <h2 className="text-3xl font-black text-[var(--color-primary-dark)]">Platform Charges Paid!</h2>
          <p className="text-sm text-[var(--color-text-muted)] mt-3">
            Your platform access for <span className="font-black">{semester}</span> has been activated.
            You can now complete shuttle bookings this semester.
          </p>
          <div className="mt-5 p-4 rounded-2xl bg-[var(--color-bg-muted)] text-left space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-[var(--color-text-muted)]">Semester</span>
              <span className="font-black text-[var(--color-primary-dark)]">{semester}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[var(--color-text-muted)]">Amount</span>
              <span className="font-black text-[var(--color-primary-dark)]">500 XAF</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[var(--color-text-muted)]">Reference</span>
              <span className="font-black text-[var(--color-primary-dark)] text-xs break-all max-w-[60%] text-right">{reference}</span>
            </div>
          </div>
          <button onClick={() => navigate('/dashboard/student/route-selection')}
            className="w-full mt-8 py-4 rounded-2xl bg-[var(--color-primary-dark)] text-white font-black text-sm flex items-center justify-center gap-3 hover:bg-[var(--color-primary)] transition-all">
            Book a Shuttle Now <ArrowRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  // ── PROCESSING ──
  if (status === 'processing') {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg-[var(--color-bg-soft)]">
        <div className="bg-white rounded-[2rem] p-10 shadow-sm border border-[var(--color-border)] text-center max-w-md w-full">
          <div className="w-16 h-16 mx-auto rounded-full border-4 border-[var(--color-primary)] border-t-transparent animate-spin mb-6" />
          <h2 className="text-2xl font-black text-[var(--color-primary-dark)]">Processing Payment</h2>
          <p className="text-sm text-[var(--color-text-muted)] mt-3">
            Please confirm the prompt on your {provider === 'mtn' ? 'MTN' : 'Orange'} phone.
          </p>
          <p className="text-xs text-[var(--color-text-muted)] mt-2 italic">Do not close this page.</p>
        </div>
      </div>
    );
  }

  // ── FAILED ──
  if (status === 'failed') {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg-[var(--color-bg-soft)]">
        <div className="bg-white rounded-[2rem] p-10 shadow-sm border border-[var(--color-border)] text-center max-w-md w-full">
          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
            <XCircle size={40} className="text-red-600" />
          </div>
          <h2 className="text-3xl font-black text-[var(--color-primary-dark)]">Payment Failed</h2>
          <p className="text-sm text-red-500 mt-4">{errorMsg}</p>
          <button onClick={() => setStatus('idle')}
            className="w-full mt-8 py-4 rounded-2xl bg-[var(--color-primary-dark)] text-white font-black text-sm hover:bg-[var(--color-primary)] transition-all">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // ── MAIN FORM ──
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-[var(--color-bg-soft)]">
      <div className="w-full max-w-lg space-y-6">

        {/* Header card */}
        <div className="bg-[var(--color-primary-dark)] rounded-[2rem] p-8 text-white">
          <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">One-time per semester</p>
          <h2 className="text-3xl font-black tracking-tight">Platform Charges</h2>
          <p className="text-white/70 text-sm mt-2">
            Pay your 500 XAF platform fee for semester <span className="font-black text-white">{semester}</span> to
            unlock shuttle booking for the rest of this semester.
          </p>
          <div className="mt-5 pt-5 border-t border-white/10 flex justify-between items-center">
            <span className="text-white/70 text-sm">Semester fee</span>
            <span className="text-3xl font-black">500 XAF</span>
          </div>
        </div>

        {/* Payment form */}
        <div className="bg-white rounded-[2rem] border border-[var(--color-border)] p-8 shadow-sm space-y-6">
          {/* Provider selection */}
          <div className="grid grid-cols-2 gap-4">
            {(['mtn', 'orange'] as const).map(p => (
              <button key={p} type="button" onClick={() => setProvider(p)}
                className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                  provider === p
                    ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5'
                    : 'border-[var(--color-border)] bg-white hover:border-[var(--color-primary)]/30'
                }`}>
                <img
                  src={p === 'mtn'
                    ? 'https://upload.wikimedia.org/wikipedia/commons/9/93/New-mtn-logo.jpg'
                    : 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Orange_logo.svg'}
                  alt={p} className="w-10 h-10 rounded-lg object-contain" />
                <p className="font-black uppercase text-[10px] tracking-widest text-[var(--color-primary-dark)]">
                  {p === 'mtn' ? 'MTN MoMo' : 'Orange Money'}
                </p>
              </button>
            ))}
          </div>

          <form onSubmit={handlePay} className="space-y-5">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-text-muted)] mb-3 ml-1">
                Phone Number
              </label>
              <div className="flex w-full">
                <div className="px-5 py-4 bg-[var(--color-bg-muted)] border border-r-0 border-[var(--color-border)] rounded-l-2xl text-sm font-bold text-[var(--color-primary-dark)] flex items-center gap-2 shrink-0">
                  <Smartphone size={14} className="text-[var(--color-text-muted)]" /> +237
                </div>
                <input type="tel" required value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="6XX XXX XXX"
                  className="flex-1 px-5 py-4 border border-[var(--color-border)] rounded-r-2xl outline-none text-sm font-bold focus:border-[var(--color-primary)] transition-all"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-[var(--color-bg-muted)] rounded-xl border border-[var(--color-border)]">
              <ShieldCheck size={18} className="text-[var(--color-primary)] shrink-0" />
              <p className="text-[10px] font-black uppercase tracking-wider text-[var(--color-primary)]">
                Secure encrypted transaction
              </p>
            </div>

            <button disabled={loading}
              className="w-full py-5 rounded-2xl bg-[var(--color-primary-dark)] text-white font-black text-sm flex items-center justify-center gap-3 hover:bg-[var(--color-primary)] transition-all disabled:opacity-50 shadow-xl">
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Confirming...
                </span>
              ) : (
                <>Pay 500 XAF — Activate Semester Pass <ArrowRight size={18} /></>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
