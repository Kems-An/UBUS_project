import { useLocation, useNavigate } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';
import { ArrowLeft, Download } from 'lucide-react';

export default function TicketPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const ticket = location.state as {
    bookingId: string;
    seat: string;
    phone: string;
    provider: string;
  };

  if (!ticket) {
    return (
      <div className="p-10 text-center">
        No ticket found
      </div>
    );
  }

  const qrValue = JSON.stringify({
  bookingId: "ABC123",
  seat: "2A",
  phone: "2376XXXXXX",
  status: "confirmed",

  // ISO format (BEST for databases + verification)
  timestamp: new Date().toISOString(),
});


  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="bg-white p-8 rounded-3xl border shadow-sm max-w-md w-full text-center">

        <h2 className="text-2xl font-black text-[var(--color-primary-dark)]">
          Your Shuttle Ticket
        </h2>

        <p className="text-sm text-gray-500 mt-2">
          Scan this QR code to verify your ride
        </p>

        <div className="flex justify-center mt-6">
          <QRCodeCanvas value={qrValue} size={200} />
        </div>

        <div className="mt-6 text-left space-y-2 text-sm">
          <p><b>Seat:</b> {ticket.seat}</p>
          <p><b>Phone:</b> {ticket.phone}</p>
          <p><b>Provider:</b> {ticket.provider}</p>
          <p><b>Status:</b> Confirmed</p>
        </div>

        <button
          onClick={() => window.print()}
          className="w-full mt-6 py-3 bg-[var(--color-primary-dark)] text-white rounded-xl font-bold flex items-center justify-center gap-2"
        >
          <Download size={18} />
          Download Ticket
        </button>

        <button
          onClick={() => navigate('/dashboard/student')}
          className="w-full mt-3 py-3 border rounded-xl font-bold flex items-center justify-center gap-2"
        >
          <ArrowLeft size={18} />
          Back
        </button>

      </div>
    </div>
  );
}