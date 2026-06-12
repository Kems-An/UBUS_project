import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import caroussel1  from "../assets/images/caroussel1.jpeg";
import caroussel2  from "../assets/images/caroussel2.jpeg";
import shuttle   from "../assets/images/shuttle.png";
import mola1       from "../assets/images/mola1.jpg"; 
import mola2       from "../assets/images/mola2.jpg";
import mola3       from "../assets/images/mola3.jpg";

const images = { mola1, mola2, mola3 };

import { 
  MapPinned, Cpu, Wallet, Armchair, BarChart3, Headphones,
  Compass, QrCode, Star, ArrowRight, Navigation, TrendingUp,
  Clock, Zap, BarChart2
} from 'lucide-react';

const SUPABASE_URL     = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// ── Types ──
interface RouteCard {
  departure:    string;
  destination:  string;
  count:        number;      // how many times booked
  isPersonal:   boolean;     // true = from this student's history
  lastUsed?:    string;      // ISO date string
}

// ── HERO 
function Hero() {
  const navigate = useNavigate();
  const carouselImages = [shuttle, caroussel1, caroussel2];
  const [index, setIndex] = useState(0);
  const { user, isLoggedIn, isLoading } = useAuth();

  useEffect(() => {
    const timer = setInterval(() => setIndex(p => (p + 1) % carouselImages.length), 4500);
    return () => clearInterval(timer);
  }, [carouselImages.length]);

  return (
    <section className="relative min-h-[calc(100vh-5rem)] pt-28 pb-16 flex items-center bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 flex flex-col text-left">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-bg-soft)] border border-[var(--color-border)] w-fit mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)]">Smart Campus Transit Ecosystem</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black text-[var(--color-primary-dark)] tracking-tighter leading-[0.95] mb-6">
            The future of commuting with <span className="text-[var(--color-primary)]">UB Shuttle</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-[var(--color-text-muted)] text-sm max-w-xl mb-10 leading-relaxed font-medium">
            Elevate your campus mobility. Access real-time satellite tracking, smart AI scheduling intervals, and secure digital boarding keys straight from your student hub.
          </motion.p>
          <div className="flex flex-wrap items-center gap-4 min-h-[64px]">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div key="loading-skeleton" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="w-32 h-12 rounded-xl bg-[var(--color-bg-soft)] animate-pulse border border-[var(--color-border)]" />
              ) : !isLoggedIn || !user ? (
                <motion.div key="guest-actions" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.2 }} className="flex flex-wrap gap-4">
                  <button onClick={() => navigate('/register')}
                    className="px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest text-white shadow-md hover:opacity-90 transition-all active:scale-98 cursor-pointer"
                    style={{ background: 'var(--color-primary-dark)' }}>
                    Get Started
                  </button>
                </motion.div>
              ) : (
                <motion.div key="authenticated-status"
                  initial={{ opacity: 0, y: 15, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -15, scale: 0.98 }} transition={{ type: "spring", stiffness: 380, damping: 28 }}
                  onClick={() => navigate('/dashboard/student')}
                  className="inline-flex items-center gap-4 p-2 pr-6 bg-[var(--color-bg-soft)] border border-[var(--color-border)] rounded-2xl group cursor-pointer select-none relative overflow-hidden transition-all duration-300 hover:border-[var(--color-primary)]/50 shadow-2xs hover:shadow-sm">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-sm uppercase transition-transform duration-300 group-hover:scale-105 relative z-10"
                    style={{ background: 'var(--color-primary-dark)' }}>
                    {user.full_name ? user.full_name.charAt(0) : (user.email ? user.email.charAt(0) : 'U')}
                  </div>
                  <div className="flex flex-col text-left relative z-10">
                    <span className="text-[9px] font-black uppercase tracking-wider text-[var(--color-primary)] flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-[var(--color-primary)] animate-ping" />
                      Welcome back, {user.full_name.split(' ')[0] || 'User'}
                    </span>
                    <span className="text-xs font-black text-[var(--color-primary-dark)] flex items-center gap-1.5 mt-0.5">
                      Go to Dashboard <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1 text-[var(--color-primary)]" />
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="lg:col-span-6 w-full h-[350px] sm:h-[450px] relative">
          <div className="absolute inset-0 rounded-[2.5rem] border border-[var(--color-border)] p-3 bg-[var(--color-bg-soft)] shadow-sm">
            <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-neutral-100 shadow-inner">
              <AnimatePresence mode="wait">
                <motion.img key={index} src={carouselImages[index]}
                  initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full object-cover" alt="UBUS Smart Vehicle Fleet" />
              </AnimatePresence>
            </div>
          </div>
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {carouselImages.map((_, i) => (
              <button key={i} onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? 'bg-[var(--color-primary-dark)] w-8' : 'bg-[var(--color-border)] w-2 hover:bg-[var(--color-text-muted)]'}`}
                aria-label={`Go to slide ${i + 1}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── HOW IT WORKS 
function HowItWorks() {
  const steps = [
    { number: "01", title: "Activate Portal Pass", desc: "Log into your secure student portal and activate an operational route pass tailored to your class timetables.", icon: <Compass className="text-blue-600" size={22} />, iconBg: "bg-blue-50 border-blue-100" },
    { number: "02", title: "Monitor Fleet Position", desc: "Track live operational positions of active shuttles on our live platform grid map to minimize depot wait delays.", icon: <MapPinned className="text-amber-500" size={22} />, iconBg: "bg-amber-50 border-amber-100" },
    { number: "03", title: "Board & Standardize", desc: "Present your secure encrypted digital booking ID pass key to the terminal vehicle scanner for instant verification.", icon: <QrCode className="text-purple-600" size={22} />, iconBg: "bg-purple-50 border-purple-100" },
  ];
  return (
    <section className="bg-[var(--color-bg-soft)] py-28 border-y border-[var(--color-border)]/60">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-20">
          <h2 className="text-[var(--color-primary)] uppercase tracking-[0.2em] text-[10px] font-black mb-3">Workflow</h2>
          <h3 className="text-3xl font-black text-[var(--color-primary-dark)] tracking-tight">How the system operates</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="relative bg-white border border-[var(--color-border)] rounded-[2rem] p-8 flex flex-col justify-between shadow-2xs group hover:border-[var(--color-primary)] transition-colors duration-300">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div className={`w-12 h-12 border rounded-xl flex items-center justify-center ${step.iconBg}`}>{step.icon}</div>
                  <span className="text-3xl font-black tracking-tight text-[var(--color-border)] group-hover:text-[var(--color-primary)]/20 transition-colors">{step.number}</span>
                </div>
                <h4 className="text-base font-black text-[var(--color-primary-dark)] mb-3">{step.title}</h4>
                <p className="text-[var(--color-text-muted)] text-xs leading-relaxed font-semibold">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── FEATURES 
function Features() {
  const features = [
    { title: "Google Direction API", desc: "Live directions from departure to destination point. Know exactly where your heading to.", icon: <MapPinned size={22} className="text-indigo-600" />, bg: "bg-indigo-50/70 border-indigo-100" },
    { title: "Smart Scheduling", desc: "AI-optimized routes based on most frequent Bookings.", icon: <Cpu size={22} className="text-fuchsia-600" />, bg: "bg-fuchsia-50/70 border-fuchsia-100" },
    { title: "Digital Payments", desc: "Seamless MoMo & OM integration. Pay for your needs in seconds.", icon: <Wallet size={22} className="text-emerald-600" />, bg: "bg-emerald-50/70 border-emerald-100" },
    { title: "Seat Reservation", desc: "Guarantee your spot before the bus arrives. No more standing in long queues.", icon: <Armchair size={22} className="text-orange-500" />, bg: "bg-orange-50/70 border-orange-100" },
    { title: "Route Analytics", desc: "View peak hours and optimize your departure times for a smoother commute.", icon: <BarChart3 size={22} className="text-sky-600" />, bg: "bg-sky-50/70 border-sky-100" },
    { title: "Instant Support", desc: "24/7 assistance for all transit queries via our dedicated support line.", icon: <Headphones size={22} className="text-rose-500" />, bg: "bg-rose-50/70 border-rose-100" },
  ];
  return (
    <section className="bg-white py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-[var(--color-primary)] uppercase tracking-[0.2em] text-[10px] font-black mb-3">Our Services</h2>
          <h3 className="text-3xl font-black text-[var(--color-primary-dark)] tracking-tight">Everything you need for a smooth commute</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div key={i} className="bg-white p-8 rounded-[2rem] border border-[var(--color-border)] hover:shadow-md transition-all group">
              <div className={`mb-5 p-3.5 border inline-block rounded-xl ${f.bg}`}>{f.icon}</div>
              <h4 className="text-base font-black text-[var(--color-primary-dark)] mb-2">{f.title}</h4>
              <p className="text-[var(--color-text-muted)] text-xs leading-relaxed font-semibold">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── WHY CHOOSE US 
function WhyChooseUs() {
  return (
    <section className="bg-white pb-28">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="flex justify-center items-center font-bold text-3xl sm:text-4xl md:text-6xl text-[var(--color-primary-dark)]">Why choose us</h1>
        <motion.div className="flex flex-col lg:flex-row justify-between lg:items-start gap-5 md:gap-10 mt-16"
          initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }} transition={{ duration: 1, ease: "easeOut" }}>
          <div className="flex flex-col gap-5 mt-10 lg:mt-32 text-center lg:text-left">
            <p className="text-xl sm:text-5xl text-[var(--color-primary)] font-bold">We Got you Covered</p>
            <p className="text-xl sm:text-4xl text-[var(--color-text-main)] font-bold">Active 6/7</p>
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-row gap-5 items-center lg:items-start w-full lg:w-auto justify-center">
            <div className="w-40 sm:w-50 h-40 sm:h-96 overflow-hidden rounded-full border border-[var(--color-border)] shadow-2xs">
              <img src={images.mola1} alt="Commuters Asset 1" className="w-full h-full object-cover" />
            </div>
            <div className="w-40 sm:w-50 h-40 sm:h-80 overflow-hidden rounded-full border border-[var(--color-border)] shadow-2xs mt-5 sm:mt-20">
              <img src={images.mola2} alt="Commuters Asset 2" className="w-full h-full object-cover" />
            </div>
            <div className="w-40 sm:w-50 h-40 sm:h-96 overflow-hidden rounded-full border border-[var(--color-border)] shadow-2xs">
              <img src={images.mola3} alt="Commuters Asset 3" className="w-full h-full object-cover" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════
// ── SMART ROUTE RECOMMENDATIONS ──

// Logic:
//  - Logged-in student → shows THEIR most-booked routes first
//    (personalised), then fills remaining slots with platform-wide
//    popular routes they haven't used yet.
//  - Guest / not logged in → shows only platform-wide top routes
//    with booking counts as social proof.
// ══════════════════════════════════════════════════════════════
function SmartRouteRecommendations() {
  const navigate             = useNavigate();
  const { user, isLoggedIn } = useAuth();
  const [routes,  setRoutes]  = useState<RouteCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRoutes();
  }, [user]);

  const fetchRoutes = async () => {
    setLoading(true);
    try {
      // ── Fetch ALL bookings with departure+destination ──
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/bookings?departure=not.is.null&destination=not.is.null&select=departure,destination,user_id,created_at`,
        { headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` } }
      );
      const all: any[] = await res.json();

      if (!Array.isArray(all) || all.length === 0) {
        setRoutes(getDefaultRoutes());
        setLoading(false);
        return;
      }

      // ── Build frequency map for ALL bookings (platform-wide) ──
      const globalMap: Record<string, { count: number; lastUsed: string }> = {};
      all.forEach(b => {
        const key = `${b.departure}|||${b.destination}`;
        if (!globalMap[key]) globalMap[key] = { count: 0, lastUsed: b.created_at };
        globalMap[key].count++;
        if (b.created_at > globalMap[key].lastUsed) globalMap[key].lastUsed = b.created_at;
      });

      const globalTop: RouteCard[] = Object.entries(globalMap)
        .map(([key, v]) => {
          const [departure, destination] = key.split('|||');
          return { departure, destination, count: v.count, isPersonal: false, lastUsed: v.lastUsed };
        })
        .sort((a, b) => b.count - a.count)
        .slice(0, 12);

      if (!isLoggedIn || !user) {
        // Guest show top platform routes
        setRoutes(globalTop);
        setLoading(false);
        return;
      }

      // ── Build personal frequency map for this student ──
      const mine = all.filter(b => b.user_id === user.auth_id);
      const personalMap: Record<string, { count: number; lastUsed: string }> = {};
      mine.forEach(b => {
        const key = `${b.departure}|||${b.destination}`;
        if (!personalMap[key]) personalMap[key] = { count: 0, lastUsed: b.created_at };
        personalMap[key].count++;
        if (b.created_at > personalMap[key].lastUsed) personalMap[key].lastUsed = b.created_at;
      });

      const personalRoutes: RouteCard[] = Object.entries(personalMap)
        .map(([key, v]) => {
          const [departure, destination] = key.split('|||');
          return { departure, destination, count: v.count, isPersonal: true, lastUsed: v.lastUsed };
        })
        .sort((a, b) => b.count - a.count)
        .slice(0, 6);

      // ── Fill remaining slots with global routes the student hasn't used ──
      const personalKeys = new Set(personalRoutes.map(r => `${r.departure}|||${r.destination}`));
      const filler = globalTop
        .filter(r => !personalKeys.has(`${r.departure}|||${r.destination}`))
        .slice(0, 12 - personalRoutes.length);

      const combined = [...personalRoutes, ...filler];

      // ── Need at least some cards; fall back to defaults ──
      setRoutes(combined.length > 0 ? combined : getDefaultRoutes());
    } catch {
      setRoutes(getDefaultRoutes());
    }
    setLoading(false);
  };

  // ── Default cards shown when there is no booking data yet ──
  function getDefaultRoutes(): RouteCard[] {
    return [
      { departure: 'Molyko',         destination: 'Main Campus Gate',     count: 0, isPersonal: false },
      { departure: 'Mile 17 Motor Park', destination: 'Faculty of Engineering', count: 0, isPersonal: false },
      { departure: 'Small Soppo',    destination: 'Faculty of Science',   count: 0, isPersonal: false },
      { departure: 'Bonduma',        destination: 'Senate Building',       count: 0, isPersonal: false },
      { departure: 'Great Soppo',    destination: 'UB Sports Complex',    count: 0, isPersonal: false },
      { departure: 'GRA Buea',       destination: 'University Bookshop',  count: 0, isPersonal: false },
      { departure: 'Buea Town',      destination: 'Faculty of Health Sciences', count: 0, isPersonal: false },
      { departure: 'Check Point',    destination: 'UB Male Hostel',       count: 0, isPersonal: false },
    ];
  }

  // ── Format time ago ──
  const timeAgo = (iso?: string) => {
    if (!iso) return null;
    const diff = Date.now() - new Date(iso).getTime();
    const days = Math.floor(diff / 86400000);
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7)  return `${days}d ago`;
    if (days < 30) return `${Math.floor(days / 7)}w ago`;
    return `${Math.floor(days / 30)}mo ago`;
  };

  // Duplicate cards for infinite scroll effect (same as original Reviews)
  const displayed = routes.length > 0 ? routes : getDefaultRoutes();
  const duplicated = [...displayed, ...displayed, ...displayed];

  return (
    <section className="bg-white py-24 overflow-hidden border-t border-[var(--color-border)]/60">

      {/* Section header */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-[var(--color-primary)] uppercase tracking-[0.2em] text-[10px] font-black mb-3 flex items-center gap-2">
              <Zap size={12} /> Smart Recommendations
            </h2>
            <h3 className="text-3xl font-black text-[var(--color-primary-dark)] tracking-tight">
              {isLoggedIn && user
                ? `Routes for you, ${user.full_name.split(' ')[0]}`
                : 'Popular campus routes'}
            </h3>
            <p className="text-[var(--color-text-muted)] text-xs font-semibold mt-2">
              {isLoggedIn && user
                ? 'Personalised routes for you - Select What Suit You Best Today'
                : 'Most-booked routes across the UB campus network'}
            </p>
          </div>
          {isLoggedIn && user && (
            <button onClick={() => navigate('/dashboard/student/route-selection')}
              className="flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider text-white self-start sm:self-auto shrink-0"
              style={{ background: 'var(--color-primary-dark)' }}>
              Book a Route <ArrowRight size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Scrolling cards — same structure as original Reviews */}
      <div className="relative flex w-full overflow-x-hidden py-4 mask-gradient">
        {loading ? (
          // Skeleton while loading
          <div className="flex gap-6 px-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-[280px] sm:w-[320px] bg-[var(--color-bg-soft)] border border-[var(--color-border)] rounded-2xl p-6 shrink-0 animate-pulse">
                <div className="h-3 bg-slate-200 rounded-full w-3/4 mb-4" />
                <div className="h-5 bg-slate-200 rounded-full w-full mb-2" />
                <div className="h-5 bg-slate-200 rounded-full w-2/3 mb-6" />
                <div className="h-3 bg-slate-200 rounded-full w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            className="flex gap-6 shrink-0 pr-6"
            animate={{ x: [0, -2000] }}
            transition={{ ease: "linear", duration: 40, repeat: Infinity }}
          >
            {duplicated.map((route, i) => (
              <div
                key={i}
                onClick={() => {
                  if (isLoggedIn && user) {
                    navigate('/dashboard/student/shuttle-selection', {
                      state: { departure: route.departure, destination: route.destination }
                    });
                  } else {
                    navigate('/register');
                  }
                }}
                className="w-[280px] sm:w-[320px] bg-[var(--color-bg-soft)] border border-[var(--color-border)] rounded-2xl p-6 flex flex-col justify-between shrink-0 cursor-pointer hover:border-[var(--color-primary)] hover:shadow-md transition-all duration-200 group"
              >
                {/* Top: badge row */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1.5">
                    {route.isPersonal ? (
                      <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-[9px] font-black uppercase tracking-wider">
                        <Star size={9} fill="currentColor" /> Your Route
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-slate-100 text-slate-500 text-[9px] font-black uppercase tracking-wider">
                        <TrendingUp size={9} /> Popular
                      </span>
                    )}
                  </div>
                  {route.count > 0 && (
                    <span className="text-[9px] font-black text-[var(--color-text-muted)] flex items-center gap-1">
                      <BarChart2 size={9} />
                      {route.count} {route.count === 1 ? 'trip' : 'trips'}
                    </span>
                  )}
                </div>

                {/* Route display */}
                <div className="flex-1">
                  <div className="flex items-start gap-3">
                    {/* Vertical connector */}
                    <div className="flex flex-col items-center mt-1 shrink-0">
                      <div className="w-2.5 h-2.5 rounded-full border-2 border-[var(--color-primary)] bg-white" />
                      <div className="w-0.5 h-8 bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-border)]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-primary-dark)]" />
                    </div>
                    <div className="space-y-3 flex-1 min-w-0">
                      <div>
                        <p className="text-[9px] font-black uppercase tracking-widest text-[var(--color-text-muted)]">From</p>
                        <p className="text-sm font-black text-[var(--color-primary-dark)] truncate group-hover:text-[var(--color-primary)] transition-colors">
                          {route.departure}
                        </p>
                      </div>
                      <div>
                        <p className="text-[9px] font-black uppercase tracking-widest text-[var(--color-text-muted)]">To</p>
                        <p className="text-sm font-black text-[var(--color-primary-dark)] truncate">
                          {route.destination}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom row */}
                <div className="flex items-center justify-between mt-5 pt-4 border-t border-[var(--color-border)]/60">
                  {route.lastUsed ? (
                    <span className="text-[9px] font-bold text-[var(--color-text-muted)] flex items-center gap-1">
                      <Clock size={9} /> {timeAgo(route.lastUsed)}
                    </span>
                  ) : (
                    <span className="text-[9px] font-bold text-[var(--color-text-muted)] flex items-center gap-1">
                      <Navigation size={9} /> UB Campus
                    </span>
                  )}
                  <span className="text-[9px] font-black text-[var(--color-primary)] flex items-center gap-1 group-hover:gap-2 transition-all">
                    Book now <ArrowRight size={9} />
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}

// ── PRICING — UNCHANGED from previous implementation ──
function Pricing() {
  const navigate             = useNavigate();
  const { user, isLoggedIn } = useAuth();

  const handleBookShuttle = () => {
    if (!isLoggedIn || !user) navigate('/register');
    else navigate('/dashboard/student/route-selection');
  };

  const handlePlatformCharges = () => {
    if (!isLoggedIn || !user) navigate('/register');
    else navigate('/dashboard/student/platform-charges');
  };

  return (
    <section className="bg-[var(--color-bg-soft)] py-28 border-t border-[var(--color-border)]/60">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-black text-[var(--color-primary-dark)] mb-3 tracking-tight">Flexible Plans</h3>
          <p className="text-[var(--color-text-muted)] font-black uppercase text-[10px] tracking-widest">Pick the pass that fits your schedule</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div className="bg-white p-10 rounded-[2rem] border border-[var(--color-border)] flex flex-col items-center text-center shadow-2xs">
            <h4 className="text-[var(--color-text-muted)] font-black uppercase text-[10px] tracking-widest mb-4">Ticket</h4>
            <div className="flex items-baseline gap-1.5 mb-8">
              <span className="text-[var(--color-primary-dark)] text-4xl font-black tracking-tight">100</span>
              <span className="text-[var(--color-text-muted)] font-black text-sm uppercase">FCFA</span>
            </div>
            <button onClick={handleBookShuttle}
              className="w-full py-4 rounded-xl font-black text-xs uppercase tracking-widest text-white hover:opacity-90 transition-all active:scale-98 cursor-pointer"
              style={{ background: 'var(--color-primary-dark)' }}>
              Book a shuttle
            </button>
          </div>
          <div className="bg-white p-10 rounded-[2rem] border-2 border-[var(--color-primary)] flex flex-col items-center text-center relative overflow-hidden shadow-sm">
            <div className="absolute top-0 right-0 bg-[var(--color-primary)] text-white px-4 py-1.5 rounded-bl-xl font-black text-[9px] uppercase tracking-widest">Best Value</div>
            <h4 className="text-[var(--color-text-muted)] font-black uppercase text-[10px] tracking-widest mb-4">Platform Charges</h4>
            <div className="flex items-baseline gap-1.5 mb-8">
              <span className="text-[var(--color-primary-dark)] text-4xl font-black tracking-tight">500</span>
              <span className="text-[var(--color-text-muted)] font-black text-sm uppercase">FCFA</span>
            </div>
            <button onClick={handlePlatformCharges}
              className="w-full bg-[var(--color-primary)] text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:opacity-90 transition-all active:scale-98 shadow-sm cursor-pointer">
              Pay Platform Charge
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── MAIN ──
export default function LandingPage() {
  return (
    <main className="bg-white min-h-screen text-[var(--color-text-main)] selection:bg-[var(--color-primary)]/20">
      <Hero />
      <HowItWorks />
      <Features />
      <WhyChooseUs />
      <SmartRouteRecommendations />
      <Pricing />
    </main>
  );
}
