import { useLocation, useNavigate } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';
import { ArrowLeft, Download, CheckCircle2, Bus, User, Phone, Calendar, Hash, MapPin, Navigation } from 'lucide-react';
import { useRef } from 'react';

interface TicketData {
  bookingId:   string;
  seat:        string;
  phone:       string;
  provider:    string;
  bookedAt:    string;
  status:      string;
  reference:   string;
  shuttleName: string;
  departure:   string;
  destination: string;
  studentName: string;
  studentId:   string;
}

export default function TicketPage() {
  const location  = useLocation();
  const navigate  = useNavigate();
  const ticketRef = useRef<HTMLDivElement>(null);

  const ticket = location.state as TicketData;

  if (!ticket) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="bg-white rounded-[2rem] p-10 shadow-sm border border-[var(--color-border)] text-center max-w-md w-full">
          <p className="font-bold text-[var(--color-text-muted)]">
            No ticket found. Please complete payment first.
          </p>
          <button onClick={() => navigate('/dashboard/student')}
            className="mt-6 px-6 py-3 bg-[var(--color-primary-dark)] text-white rounded-xl font-bold text-sm">
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(ticket.bookedAt).toLocaleString('en-GB', {
    weekday: 'short', day: '2-digit', month: 'long',
    year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true,
  });

  // ── Secure QR value ──
  // Contains booking ID, trip details, student info, and integrity stamp.
  // Driver verifies bookingId in Supabase → confirmed = valid, scanned = already used, missing = fake.
  const integrityStamp = btoa(
    `${ticket.bookingId}|${ticket.seat}|${ticket.bookedAt}`
  ).slice(0, 16);

  const qrValue = JSON.stringify({
    bookingId:   ticket.bookingId,
    seat:        ticket.seat,
    phone:       ticket.phone,
    provider:    ticket.provider,
    bookedAt:    ticket.bookedAt,
    status:      ticket.status,
    reference:   ticket.reference,
    shuttleName: ticket.shuttleName,
    departure:   ticket.departure,
    destination: ticket.destination,
    studentName: ticket.studentName,
    studentId:   ticket.studentId,
    stamp:       integrityStamp,
  });

  const handleDownload = () => {
    const style = document.createElement('style');
    style.id    = 'print-style';
    style.innerHTML = `
      @media print {
        body * { visibility: hidden !important; }
        #printable-ticket, #printable-ticket * { visibility: visible !important; }
        #printable-ticket {
          position: fixed !important;
          left: 50% !important;
          top: 50% !important;
          transform: translate(-50%, -50%) !important;
          width: 420px !important;
          box-shadow: none !important;
          border: 2px solid #e2e8f0 !important;
        }
      }
    `;
    document.head.appendChild(style);
    window.print();
    setTimeout(() => { document.getElementById('print-style')?.remove(); }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-[var(--color-bg-muted,#f8fafc)]">
      <div className="w-full max-w-md space-y-4">

        {/* ── Printable Ticket ── */}
        <div id="printable-ticket" ref={ticketRef}
          className="bg-white rounded-3xl border border-[var(--color-border)] shadow-sm overflow-hidden">

          {/* Header */}
          <div className="bg-[var(--color-primary-dark)] px-6 py-5 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bus size={24} />
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-70">UBUS Shuttle System</p>
                  <p className="text-lg font-black">Boarding Ticket</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 bg-green-400/20 border border-green-400/30 px-3 py-1.5 rounded-full">
                <CheckCircle2 size={12} className="text-green-300" />
                <span className="text-[10px] font-black uppercase tracking-wider text-green-300">{ticket.status}</span>
              </div>
            </div>
          </div>

          {/* Trip Route Banner */}
          {(ticket.departure || ticket.destination) && (
            <div className="bg-[var(--color-primary)]/5 border-b border-[var(--color-border)] px-6 py-4">
              <div className="flex items-center gap-3">
                <Navigation size={16} className="text-[var(--color-primary)] shrink-0" />
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-black text-[var(--color-primary-dark)]">{ticket.departure}</span>
                  <span className="text-[var(--color-primary)] font-black">→</span>
                  <span className="text-sm font-black text-[var(--color-primary-dark)]">{ticket.destination}</span>
                </div>
              </div>
            </div>
          )}

          {/* QR Code */}
          <div className="flex flex-col items-center py-6 px-6 border-b border-dashed border-[var(--color-border)]">
            <div className="p-3 bg-white rounded-2xl shadow-sm border border-[var(--color-border)]">
              <QRCodeCanvas
                value={qrValue}
                size={180}
                level="H"
                includeMargin={true}
              />
            </div>
            <p className="text-[10px] text-[var(--color-text-muted)] font-black uppercase tracking-widest mt-3">
              Scan to verify at boarding
            </p>
          </div>

          {/* Ticket Details */}
          <div className="px-6 py-5 space-y-3">

            {ticket.studentName && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[var(--color-text-muted)]">
                  <User size={14} />
                  <span className="text-xs font-black uppercase tracking-wider">Passenger</span>
                </div>
                <span className="font-bold text-sm text-[var(--color-primary-dark)]">{ticket.studentName}</span>
              </div>
            )}

            {ticket.studentId && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[var(--color-text-muted)]">
                  <Hash size={14} />
                  <span className="text-xs font-black uppercase tracking-wider">Student ID</span>
                </div>
                <span className="font-bold text-sm text-[var(--color-primary-dark)]">{ticket.studentId}</span>
              </div>
            )}

            {ticket.shuttleName && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[var(--color-text-muted)]">
                  <Bus size={14} />
                  <span className="text-xs font-black uppercase tracking-wider">Shuttle</span>
                </div>
                <span className="font-bold text-sm text-[var(--color-primary-dark)]">{ticket.shuttleName}</span>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[var(--color-text-muted)]">
                <Bus size={14} />
                <span className="text-xs font-black uppercase tracking-wider">Seat</span>
              </div>
              <span className="font-bold text-sm text-[var(--color-primary-dark)]">{ticket.seat}</span>
            </div>

            {ticket.departure && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[var(--color-text-muted)]">
                  <MapPin size={14} />
                  <span className="text-xs font-black uppercase tracking-wider">Departure</span>
                </div>
                <span className="font-bold text-sm text-[var(--color-primary-dark)] text-right max-w-[55%]">{ticket.departure}</span>
              </div>
            )}

            {ticket.destination && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[var(--color-text-muted)]">
                  <MapPin size={14} />
                  <span className="text-xs font-black uppercase tracking-wider">Destination</span>
                </div>
                <span className="font-bold text-sm text-[var(--color-primary-dark)] text-right max-w-[55%]">{ticket.destination}</span>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[var(--color-text-muted)]">
                <Phone size={14} />
                <span className="text-xs font-black uppercase tracking-wider">Phone</span>
              </div>
              <span className="font-bold text-sm text-[var(--color-primary-dark)]">+237 {ticket.phone}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[var(--color-text-muted)]">
                <Calendar size={14} />
                <span className="text-xs font-black uppercase tracking-wider">Booked At</span>
              </div>
              <span className="font-bold text-xs text-[var(--color-primary-dark)] text-right max-w-[55%]">
                {formattedDate}
              </span>
            </div>

            <div className="pt-3 border-t border-[var(--color-border)]">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-[var(--color-text-muted)]">
                  Transaction Ref
                </span>
                <span className="text-xs font-black text-[var(--color-primary-dark)] break-all max-w-[60%] text-right">
                  {ticket.reference}
                </span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-[var(--color-text-muted)]">
                  Booking ID
                </span>
                <span className="text-[10px] font-bold text-[var(--color-primary-dark)] break-all max-w-[60%] text-right opacity-50">
                  {ticket.bookingId}
                </span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-[var(--color-bg-muted,#f8fafc)] border-t border-[var(--color-border)]">
            <p className="text-[10px] text-center text-[var(--color-text-muted)] font-medium leading-relaxed">
              Valid for one trip only. Show QR code to driver for boarding verification. 
              Ticket is non-transferable.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <button onClick={handleDownload}
          className="w-full py-4 bg-[var(--color-primary-dark)] text-white rounded-2xl font-black text-sm flex items-center justify-center gap-3 hover:bg-[var(--color-primary)] transition-all shadow-lg">
          <Download size={18} />
          Download Ticket as PDF
        </button>

        <button onClick={() => navigate('/dashboard/student')}
          className="w-full py-4 border border-[var(--color-border)] bg-white text-[var(--color-primary-dark)] rounded-2xl font-black text-sm flex items-center justify-center gap-3 hover:bg-[var(--color-bg-muted)] transition-all">
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
