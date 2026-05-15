import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  QrCode, 
  Download, 
  ArrowLeft, 
  Info, 
  MapPin, 
  Calendar,
  Check,
  ChevronRight
} from 'lucide-react';

export default function BookingConfirmationPage() {
  const location = useLocation();
  const [downloaded, setDownloaded] = useState(false);

  const state = location.state as { seat?: string; provider?: string } | null;
  const seat = state?.seat ?? 'N/A';
  const provider = state?.provider ?? 'MoMo'; 
 
  return (
    <div className="pt-8 pb-16 px-8 lg:px-12 max-w-5xl mx-auto font-sans"> 
      
      {/* ── Minimalist Header ── */}
      <header className="flex items-center gap-5 mb-12">
        <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center border border-emerald-100">
          <CheckCircle2 size={20} strokeWidth={1.5} />
        </div>
        <div>
          <h2 className="text-2xl font-medium text-[var(--color-primary-dark)] tracking-tight">Booking Confirmed</h2>
          <p className="text-xs text-[var(--color-text-muted)] mt-0.5">Your digital pass is ready for boarding.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* ── The "Light" Ticket ── */}
        <div className="lg:col-span-8 bg-white rounded-[2rem] border border-[var(--color-border)] shadow-sm relative overflow-hidden">
          
          {/* Top Section */}
          <div className="p-8 border-b border-gray-50 flex justify-between items-center">
            <div className="flex items-center gap-3">
               <div className="w-2 h-2 rounded-full bg-emerald-400" />
               <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
                 Shuttle Boarding Pass
               </span>
            </div>
            <span className="text-[10px] font-medium text-[var(--color-text-muted)]">#{provider.toUpperCase()}29440</span>
          </div>

          <div className="p-10">
            {/* Travel Path */}
            <div className="flex justify-between items-center mb-10">
              <div className="flex-1">
                <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Departure</p>
                <p className="text-xl font-medium text-[var(--color-primary-dark)]">Main Library</p>
              </div>
              
              <div className="flex items-center px-6 text-gray-300">
                <ChevronRight size={20} strokeWidth={1} />
              </div>

              <div className="flex-1 text-right">
                <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Arrival</p>
                <p className="text-xl font-medium text-[var(--color-primary-dark)]">Tech Park</p>
              </div>
            </div>
            
            {/* Info Grid - Softened grays */}
            <div className="grid grid-cols-3 gap-8 mb-12">
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Seat</p>
                <p className="text-lg text-[var(--color-primary-dark)] font-medium">{seat}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Vehicle</p>
                <p className="text-lg text-[var(--color-primary-dark)] font-medium">AV-882</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Class</p>
                <p className="text-lg text-[var(--color-primary-dark)] font-medium">Express</p>
              </div>
            </div>

            {/* QR Section - Clean & Minimal */}
            <div className="pt-10 border-t border-dashed border-gray-200 relative">
              {/* Ticket Notches (Decorative punch-holes) */}
              <div className="absolute -left-[53px] -top-[13px] w-6 h-6 rounded-full bg-[#f8fafc] border border-gray-200" />
              <div className="absolute -right-[53px] -top-[13px] w-6 h-6 rounded-full bg-[#f8fafc] border border-gray-200" />

              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-6">
                  <div className="p-3 bg-white border border-gray-100 rounded-xl shadow-sm">
                      <QrCode size={80} className="text-gray-800" strokeWidth={1} />
                  </div>
                  <div className="space-y-1">
                      <p className="text-[10px] uppercase tracking-widest text-gray-400">Scan at Entry</p>
                      <p className="font-mono text-xs text-gray-600">ID: BR-9902-XZ</p>
                  </div>
                </div>

                <button 
                  onClick={() => { setDownloaded(true); setTimeout(() => setDownloaded(false), 2000); }}
                  className="flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-all active:scale-95"
                >
                  {downloaded ? <Check size={14} className="text-emerald-500" /> : <Download size={14} />}
                  {downloaded ? 'Pass Saved' : 'Download PDF'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Side Details ── */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-8 bg-gray-50/50 border border-gray-100 rounded-[2rem]">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
                <Info size={14} /> Boarding Info
            </h4>
            <div className="space-y-6">
                <div className="flex gap-4">
                    <MapPin size={16} className="text-gray-400 shrink-0" />
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Please be at <span className="text-gray-800 font-semibold">Gate 4B</span> at least 5 minutes before departure.
                    </p>
                </div>
                <div className="flex gap-4">
                    <Calendar size={16} className="text-gray-400 shrink-0" />
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Valid for the <span className="text-gray-800 font-semibold">16:30 Service</span> on May 15, 2026.
                    </p>
                </div>
            </div>
          </div>

          <Link to="/dashboard/student/routes" className="flex items-center justify-center gap-2 w-full py-4 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-[var(--color-primary)] transition-all no-underline">
            <ArrowLeft size={12} /> Return to Schedules
          </Link>
        </div>
      </div>
    </div>
  );
}