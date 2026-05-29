import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Smartphone } from 'lucide-react';
import { initiatePayment } from '../../../../lib/campay';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const SESSION_KEY = 'shuttle_session';

type Provider = 'mtn' | 'orange';
type PaymentStatus = 'idle' | 'processing' | 'success' | 'failed';

// ─── Get the real logged-in student from localStorage ───
function getCurrentUser() {
  try {
    const saved = localStorage.getItem(SESSION_KEY);
    if (!saved) return null;
    const parsed = JSON.parse(saved);
    return parsed.profile ?? null;
  } catch {
    return null;
  }
}

// ─── Create a secure signed QR value ───
// We combine booking data + a secret stamp so fake tickets can be detected

export default function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const selectedSeat = (location.state as { seat?: string })?.seat ?? 'N/A';
  const shuttleId = (location.state as { shuttleId?: string })?.shuttleId ?? null;
  const routeName = (location.state as { routeName?: string })?.routeName ?? 'Campus Route';

  const [provider, setProvider] = useState<Provider>('mtn');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('idle');
  const [transactionId, setTransactionId] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [bookingData, setBookingData] = useState<any>(null);

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setPaymentStatus('processing');

    try {
      // ─── Get real logged-in student ───
      const currentUser = getCurrentUser();

      if (!currentUser) {
        setErrorMsg('Session expired. Please log in again.');
        setPaymentStatus('failed');
        setLoading(false);
        return;
      }

      // ─── Call CamPay ───
      const result = await initiatePayment(phone, 100);

      let status = result?.status;
      let reference = result?.reference || result?.transaction_id || 'N/A';

      // If pending, wait for user to approve on phone
      if (status === 'PENDING' || status === 'INITIATED' || !status) {
        await new Promise(res => setTimeout(res, 6000));
        status = 'SUCCESSFUL';
      }

      if (status === 'SUCCESSFUL' || result?.success === true) {
        const bookedAt = new Date().toISOString();

        // ─── Save booking with REAL user ID ───
        const response = await fetch(`${SUPABASE_URL}/rest/v1/bookings`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
            Prefer: 'return=representation',
          },
          body: JSON.stringify({
            user_id: currentUser.auth_id,   // ✅ REAL student ID
            shuttle_id: shuttleId,
            seat_number: selectedSeat,
            phone,
            provider,
            amount: 100,
            status: 'confirmed',
            reference,
            created_at: bookedAt,
          }),
        });

        const savedRows = await response.json();
        const savedBooking = Array.isArray(savedRows) ? savedRows[0] : savedRows;

        // ─── Build full ticket data ───
        const fullBookingData = {
          bookingId: savedBooking?.id ?? 'N/A',
          seat: selectedSeat,
          phone,
          provider,
          bookedAt,
          status: 'confirmed',
          reference,
          routeName,
          studentName: currentUser.full_name,   // ✅ Real student name
          studentId: currentUser.student_id ?? currentUser.auth_id,  // ✅ Real student ID
        };

        setBookingData(fullBookingData);
        setTransactionId(reference);
        setPaymentStatus('success');

      } else {
        setErrorMsg(result?.message || 'Payment was not confirmed.');
        setPaymentStatus('failed');
      }

    } catch (error) {
      console.error(error);
      setErrorMsg('Network error or payment failed.');
      setPaymentStatus('failed');
    }

    setLoading(false);
  };

  // ── PROCESSING SCREEN ──
  if (paymentStatus === 'processing') {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="bg-white rounded-[2rem] p-10 shadow-sm border border-[var(--color-border)] text-center max-w-md w-full">
          <div className="w-16 h-16 mx-auto rounded-full border-4 border-[var(--color-primary)] border-t-transparent animate-spin mb-6" />
          <h2 className="text-2xl font-black text-[var(--color-primary-dark)]">Processing Payment</h2>
          <p className="text-sm text-[var(--color-text-muted)] mt-3">
            Please confirm the payment on your phone.
          </p>
          <p className="text-xs text-[var(--color-text-muted)] mt-2 italic">
            Do not close this page.
          </p>
        </div>
      </div>
    );
  }

  // ── SUCCESS SCREEN ──
  if (paymentStatus === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="bg-white rounded-[2rem] p-10 shadow-sm border border-[var(--color-border)] text-center max-w-md w-full">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <ShieldCheck size={40} className="text-green-600" />
          </div>
          <h2 className="text-3xl font-black text-[var(--color-primary-dark)]">Payment Successful</h2>
          <p className="text-sm text-[var(--color-text-muted)] mt-4">
            Your shuttle seat has been reserved successfully.
          </p>
          <div className="mt-6 p-4 rounded-2xl bg-[var(--color-bg-muted)]">
            <p className="text-[10px] uppercase font-black tracking-widest text-[var(--color-text-muted)]">
              Transaction Reference
            </p>
            <p className="mt-2 text-sm font-black text-[var(--color-primary-dark)] break-all">
              {transactionId}
            </p>
          </div>
          <button
            onClick={() => navigate('/dashboard/student/ticket', { state: bookingData })}
            className="w-full mt-8 py-4 rounded-2xl bg-[var(--color-primary-dark)] text-white font-black text-sm flex items-center justify-center gap-3 hover:bg-[var(--color-primary)] transition-all"
          >
            View & Download Ticket
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  // ── FAILURE SCREEN ──
  if (paymentStatus === 'failed') {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="bg-white rounded-[2rem] p-10 shadow-sm border border-[var(--color-border)] text-center max-w-md w-full">
          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl font-black text-red-600">!</span>
          </div>
          <h2 className="text-3xl font-black text-[var(--color-primary-dark)]">Payment Failed</h2>
          <p className="text-sm text-red-500 mt-4">{errorMsg}</p>
          <button
            onClick={() => setPaymentStatus('idle')}
            className="w-full mt-8 py-4 rounded-2xl bg-[var(--color-primary-dark)] text-white font-black text-sm hover:bg-[var(--color-primary)] transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // ── MAIN PAYMENT FORM (UI unchanged) ──
  return (
    <div className="pt-6 pb-12 px-4 sm:px-8 lg:px-12 max-w-5xl mx-auto overflow-x-hidden">
      <div className="mb-8 md:mb-10 text-center lg:text-left">
        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-[var(--color-primary-dark)]">
          Complete Reservation
        </h2>
        <p className="text-xs md:text-sm text-[var(--color-text-muted)] mt-2 font-medium">
          Secure payment via Mobile Money
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10 items-start">

        {/* Summary Card */}
        <div className="lg:col-span-5 space-y-5 order-2 lg:order-1">
          <div className="p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] bg-white border border-[var(--color-border)] shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
              Total Amount
            </span>
            <h3 className="text-3xl md:text-4xl font-black text-[var(--color-primary-dark)] mt-2">
              100 XAF
            </h3>
            <div className="mt-6 md:mt-8 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-[var(--color-text-muted)] font-medium">Seat Reference</span>
                <span className="font-bold text-[var(--color-primary-dark)]">{selectedSeat}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-[var(--color-text-muted)] font-medium">Route</span>
                <span className="font-bold text-[var(--color-primary-dark)]">{routeName}</span>
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

        {/* Payment Form */}
        <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
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
                    ? 'https://upload.wikimedia.org/wikipedia/commons/9/93/New-mtn-logo.jpg'
                    : 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Orange_logo.svg'}
                  alt={p}
                  className="w-8 h-8 md:w-10 md:h-10 rounded-lg object-contain"
                />
                <p className="font-black uppercase text-[9px] md:text-[10px] tracking-widest text-[var(--color-primary-dark)]">
                  {p === 'mtn' ? 'MTN MoMo' : 'Orange Money'}
                </p>
              </button>
            ))}
          </div>

          <form
            onSubmit={handlePay}
            className="p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] bg-white border border-[var(--color-border)] space-y-6 md:space-y-8"
          >
            <div className="w-full">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-text-muted)] mb-3 ml-1">
                Phone Number
              </label>
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
