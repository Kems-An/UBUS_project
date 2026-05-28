import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, XCircle, Camera, ArrowLeft, RefreshCw } from 'lucide-react';
import jsQR from 'jsqr';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

type ScanResult = 'idle' | 'scanning' | 'valid' | 'invalid' | 'already_used' | 'error';

interface ScannedTicket {
  bookingId: string;
  seat: string;
  phone: string;
  studentName: string;
  studentId: string;
  routeName: string;
  bookedAt: string;
  status: string;
  reference: string;
  stamp: string;
}

export default function QRScannerPage() {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animFrameRef = useRef<number>(0);

  const [scanResult, setScanResult] = useState<ScanResult>('idle');
  const [scannedTicket, setScannedTicket] = useState<ScannedTicket | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [cameraError, setCameraError] = useState('');

  // ── Start camera ──
  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }, // rear camera on mobile
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setScanResult('scanning');
        requestAnimationFrame(scanFrame);
      }
    } catch {
      setCameraError('Camera access denied. Please allow camera permissions.');
    }
  };

  const stopCamera = () => {
    cancelAnimationFrame(animFrameRef.current);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
    }
  };

  // ── Scan each frame for QR code ──
  const scanFrame = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || video.readyState !== video.HAVE_ENOUGH_DATA) {
      animFrameRef.current = requestAnimationFrame(scanFrame);
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: 'dontInvert',
    });

    if (code) {
      stopCamera();
      processQRCode(code.data);
    } else {
      animFrameRef.current = requestAnimationFrame(scanFrame);
    }
  };

  // ── Verify QR against Supabase ──
  const processQRCode = async (rawData: string) => {
    setScanResult('scanning');

    try {
      // Parse QR data
      let ticket: ScannedTicket;
      try {
        ticket = JSON.parse(rawData);
      } catch {
        setScanResult('invalid');
        setErrorMsg('QR code is not a valid UBUS ticket.');
        return;
      }

      if (!ticket.bookingId || !ticket.stamp) {
        setScanResult('invalid');
        setErrorMsg('Invalid ticket format. Missing required fields.');
        return;
      }

      // Verify integrity stamp
      const expectedStamp = btoa(
        `${ticket.bookingId}|${ticket.seat}|${ticket.bookedAt}`
      ).slice(0, 16);

      if (ticket.stamp !== expectedStamp) {
        setScanResult('invalid');
        setErrorMsg('Ticket integrity check failed. This ticket may be forged.');
        return;
      }

      // Verify booking exists in Supabase
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/bookings?id=eq.${ticket.bookingId}&select=*`,
        {
          headers: {
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          },
        }
      );

      const rows = await res.json();

      if (!rows || rows.length === 0) {
        setScanResult('invalid');
        setErrorMsg('Booking not found in the system. Fake ticket.');
        return;
      }

      const booking = rows[0];

      if (booking.status === 'scanned') {
        setScanResult('already_used');
        setScannedTicket(ticket);
        return;
      }

      if (booking.status !== 'confirmed') {
        setScanResult('invalid');
        setErrorMsg(`Booking status is "${booking.status}". Boarding not allowed.`);
        return;
      }

      // ✅ Mark as scanned in Supabase
      await fetch(
        `${SUPABASE_URL}/rest/v1/bookings?id=eq.${ticket.bookingId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
            Prefer: 'return=minimal',
          },
          body: JSON.stringify({ status: 'scanned' }),
        }
      );

      setScannedTicket(ticket);
      setScanResult('valid');

    } catch (err) {
      setScanResult('error');
      setErrorMsg('Network error. Check your connection.');
    }
  };

  const resetScanner = () => {
    setScanResult('idle');
    setScannedTicket(null);
    setErrorMsg('');
    startCamera();
  };

  const formattedDate = scannedTicket
    ? new Date(scannedTicket.bookedAt).toLocaleString('en-GB', {
        weekday: 'short', day: '2-digit', month: 'short',
        year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true,
      })
    : '';

  // ── CAMERA ERROR ──
  if (cameraError) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="bg-white rounded-[2rem] p-10 border border-[var(--color-border)] text-center max-w-md w-full">
          <Camera size={40} className="text-[var(--color-text-muted)] mx-auto mb-4" />
          <h3 className="text-xl font-black text-[var(--color-primary-dark)] mb-2">Camera Required</h3>
          <p className="text-sm text-[var(--color-text-muted)]">{cameraError}</p>
          <button onClick={() => navigate(-1)}
            className="mt-6 px-6 py-3 bg-[var(--color-primary-dark)] text-white rounded-xl font-bold text-sm">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // ── VALID TICKET ──
  if (scanResult === 'valid' && scannedTicket) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-10">
        <div className="bg-white rounded-[2rem] border border-[var(--color-border)] shadow-sm max-w-md w-full overflow-hidden">
          <div className="bg-emerald-500 px-6 py-5 text-white text-center">
            <CheckCircle2 size={40} className="mx-auto mb-2" />
            <h2 className="text-2xl font-black">Ticket Valid ✓</h2>
            <p className="text-emerald-100 text-sm mt-1">Passenger cleared for boarding</p>
          </div>
          <div className="p-6 space-y-3 text-sm">
            {[
              ['Student', scannedTicket.studentName || 'N/A'],
              ['Student ID', scannedTicket.studentId || 'N/A'],
              ['Seat', scannedTicket.seat],
              ['Route', scannedTicket.routeName || 'N/A'],
              ['Phone', '+237 ' + scannedTicket.phone],
              ['Booked At', formattedDate],
              ['Reference', scannedTicket.reference],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between items-start border-b border-slate-100 pb-2 last:border-0">
                <span className="text-[var(--color-text-muted)] font-medium">{label}</span>
                <span className="font-bold text-[var(--color-primary-dark)] text-right max-w-[55%] break-all">{value}</span>
              </div>
            ))}
          </div>
          <div className="px-6 pb-6">
            <button onClick={resetScanner}
              className="w-full py-4 bg-[var(--color-primary-dark)] text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2">
              <RefreshCw size={16} /> Scan Next Ticket
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── ALREADY USED ──
  if (scanResult === 'already_used') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-10">
        <div className="bg-white rounded-[2rem] border border-amber-200 shadow-sm max-w-md w-full overflow-hidden">
          <div className="bg-amber-400 px-6 py-5 text-white text-center">
            <XCircle size={40} className="mx-auto mb-2" />
            <h2 className="text-2xl font-black">Already Scanned</h2>
            <p className="text-amber-100 text-sm mt-1">This ticket was already used for boarding</p>
          </div>
          {scannedTicket && (
            <div className="p-6 space-y-3 text-sm">
              {[
                ['Student', scannedTicket.studentName || 'N/A'],
                ['Seat', scannedTicket.seat],
                ['Reference', scannedTicket.reference],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between border-b border-slate-100 pb-2 last:border-0">
                  <span className="text-[var(--color-text-muted)] font-medium">{label}</span>
                  <span className="font-bold text-[var(--color-primary-dark)]">{value}</span>
                </div>
              ))}
            </div>
          )}
          <div className="px-6 pb-6">
            <button onClick={resetScanner}
              className="w-full py-4 bg-[var(--color-primary-dark)] text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2">
              <RefreshCw size={16} /> Scan Next Ticket
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── INVALID / ERROR ──
  if (scanResult === 'invalid' || scanResult === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-10">
        <div className="bg-white rounded-[2rem] border border-rose-200 shadow-sm max-w-md w-full overflow-hidden">
          <div className="bg-rose-500 px-6 py-5 text-white text-center">
            <XCircle size={40} className="mx-auto mb-2" />
            <h2 className="text-2xl font-black">Invalid Ticket</h2>
            <p className="text-rose-100 text-sm mt-1">Boarding denied</p>
          </div>
          <div className="p-6 text-center">
            <p className="text-sm text-[var(--color-text-muted)]">{errorMsg}</p>
          </div>
          <div className="px-6 pb-6">
            <button onClick={resetScanner}
              className="w-full py-4 bg-[var(--color-primary-dark)] text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2">
              <RefreshCw size={16} /> Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── SCANNER UI ──
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--color-bg-muted,#f8fafc)] px-4 py-10">
      <div className="w-full max-w-md space-y-4">

        <div className="flex items-center gap-3 mb-2">
          <button onClick={() => navigate(-1)}
            className="p-2 rounded-xl bg-white border border-[var(--color-border)] text-[var(--color-text-muted)]">
            <ArrowLeft size={18} />
          </button>
          <div>
            <h2 className="text-xl font-black text-[var(--color-primary-dark)]">QR Ticket Scanner</h2>
            <p className="text-xs text-[var(--color-text-muted)] font-medium">Point camera at student's QR code</p>
          </div>
        </div>

        <div className="relative bg-black rounded-[2rem] overflow-hidden aspect-square shadow-xl">
          <video ref={videoRef} className="w-full h-full object-cover" playsInline muted />
          <canvas ref={canvasRef} className="hidden" />

          {/* Scanning overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-56 h-56 relative">
              {/* Corner guides */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-lg" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-lg" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-lg" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-lg" />
              {/* Scan line animation */}
              <div className="absolute left-0 right-0 h-0.5 bg-[var(--color-primary)] opacity-80 animate-bounce top-1/2" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[var(--color-border)] p-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-[var(--color-primary)] rounded-full animate-pulse" />
            <p className="text-xs font-black uppercase tracking-widest text-[var(--color-text-muted)]">
              {scanResult === 'scanning' ? 'Scanning...' : 'Initializing camera...'}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
