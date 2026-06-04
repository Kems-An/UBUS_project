import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
// Pulling in your authentic context hook setup directly
import { useAuth } from '../context/AuthContext'; // Adjust this path if necessary to point to your context file

import caroussel1 from "../assets/images/caroussel1.jpeg";
import caroussel2 from "../assets/images/caroussel2.jpeg";
import ourvision from "../assets/images/our vision.jpg";

// Placeholder setup for your new section's images—adjust paths as needed
import mola1 from "../assets/images/mola1.jpg"; 
import mola2 from "../assets/images/mola2.jpg";
import mola3 from "../assets/images/mola3.jpg";

const images = { mola1, mola2, mola3 };

import { 
  MapPinned, 
  Cpu, 
  Wallet, 
  Armchair, 
  BarChart3, 
  Headphones,
  Compass,
  QrCode,
  Star,
  ArrowRight
} from 'lucide-react';

// ── HERO SECTION ──
function Hero() {
  const navigate = useNavigate();
  const carouselImages = [ ourvision, caroussel1, caroussel2 ];
  const [index, setIndex] = useState(0);

  // ── True App Authentication Connection ──
  const { user, isLoggedIn, isLoading } = useAuth();

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % carouselImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [carouselImages.length]);

  return (
    <section className="relative min-h-[calc(100vh-5rem)] pt-28 pb-16 flex items-center bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column */}
        <div className="lg:col-span-6 flex flex-col text-left">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-bg-soft)] border border-[var(--color-border)] w-fit mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)]">Smart Campus Transit Ecosystem</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black text-[var(--color-primary-dark)] tracking-tighter leading-[0.95] mb-6"
          >
            The future of commuting with <span className="text-[var(--color-primary)]">UB Shuttle</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[var(--color-text-muted)] text-sm md:text-sm max-w-xl mb-10 leading-relaxed font-medium"
          >
            Elevate your campus mobility. Access real-time satellite tracking, smart AI scheduling intervals, and secure digital boarding keys straight from your student hub.
          </motion.p>

          {/* Interactive Modern Action Control Hub */}
          <div className="flex flex-wrap items-center gap-4 min-h-[64px]">
            <AnimatePresence mode="wait">
              {isLoading ? (
                // Smooth structural placeholder loading block to prevent asset popping
                <motion.div 
                  key="loading-skeleton"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-32 h-12 rounded-xl bg-[var(--color-bg-soft)] animate-pulse border border-[var(--color-border)]"
                />
              ) : !isLoggedIn || !user ? (
                // Guest View: Standard onboarding triggers
                <motion.div
                  key="guest-actions"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-wrap gap-4"
                >
                  <button 
                    onClick={() => navigate('/register')} 
                    className="px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest text-white shadow-md hover:opacity-90 transition-all active:scale-98 cursor-pointer" 
                    style={{ background: 'var(--color-primary-dark)' }}
                  >
                    Get Started
                  </button>
                </motion.div>
              ) : (
                // Authenticated View: Framer Motion animated responsive status panel card
                <motion.div
                  key="authenticated-status"
                  initial={{ opacity: 0, y: 15, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -15, scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 380, damping: 28 }}
                  onClick={() => navigate('/dashboard')}
                  className="inline-flex items-center gap-4 p-2 pr-6 bg-[var(--color-bg-soft)] border border-[var(--color-border)] rounded-2xl group cursor-pointer select-none relative overflow-hidden transition-all duration-300 hover:border-[var(--color-primary)]/50 shadow-2xs hover:shadow-sm"
                >
                  {/* Performance-optimized ambient glow effect layer */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-primary)]/5 to-transparent -translate-x-full group-hover:animate-shimmer" style={{ animationDuration: '2s' }} />
                  
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-sm uppercase transition-transform duration-300 group-hover:scale-105 relative z-10"
                    style={{ background: 'var(--color-primary-dark)' }}
                  >
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

        {/* Right Column */}
        <div className="lg:col-span-6 w-full h-[350px] sm:h-[450px] relative">
          <div className="absolute inset-0 rounded-[2.5rem] border border-[var(--color-border)] p-3 bg-[var(--color-bg-soft)] shadow-sm">
            <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-neutral-100 shadow-inner">
              <AnimatePresence mode="wait">
                <motion.img
                  key={index}
                  src={carouselImages[index]}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full object-cover"
                  alt="UBUS Smart Vehicle Fleet"
                />
              </AnimatePresence>
            </div>
          </div>

          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {carouselImages.map((_, i) => (
              <button 
                key={i}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? 'bg-[var(--color-primary-dark)] w-8' : 'bg-[var(--color-border)] w-2 hover:bg-[var(--color-text-muted)]'
                }`} 
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

// ── HOW IT WORKS SECTION (UNTOUCHED) ──
function HowItWorks() {
  const steps = [
    { 
      number: "01", 
      title: "Activate Portal Pass", 
      desc: "Log into your secure student portal and activate an operational route pass tailored to your class timetables.", 
      icon: <Compass className="text-blue-600" size={22} />,
      iconBg: "bg-blue-50 border-blue-100"
    },
    { 
      number: "02", 
      title: "Monitor Fleet Position", 
      desc: "Track live operational positions of active shuttles on our live platform grid map to minimize depot wait delays.", 
      icon: <MapPinned className="text-amber-500" size={22} />,
      iconBg: "bg-amber-50 border-amber-100"
    },
    { 
      number: "03", 
      title: "Board & Standardize", 
      desc: "Present your secure encrypted digital booking ID pass key to the terminal vehicle scanner for instant verification.", 
      icon: <QrCode className="text-purple-600" size={22} />,
      iconBg: "bg-purple-50 border-purple-100"
    }
  ];

  return (
    <section className="bg-[var(--color-bg-soft)] py-28 border-y border-[var(--color-border)]/60">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center max-w-xl mx-auto mb-20">
          <h2 className="text-[var(--color-primary)] uppercase tracking-[0.2em] text-[10px] font-black mb-3">Workflow</h2>
          <h3 className="text-3xl font-black text-[var(--color-primary-dark)] tracking-tight">How the system operates</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, i) => (
            <div key={i} className="relative bg-white border border-[var(--color-border)] rounded-[2rem] p-8 flex flex-col justify-between shadow-2xs group hover:border-[var(--color-primary)] transition-colors duration-300">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div className={`w-12 h-12 border rounded-xl flex items-center justify-center ${step.iconBg}`}>
                    {step.icon}
                  </div>
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

// ── SERVICES / FEATURES SECTION (UNTOUCHED) ──
function Features() {
  const features = [
    { title: "Real-time Tracking", desc: "Live GPS updates for every shuttle on campus. Know exactly where your ride is.", icon: <MapPinned size={22} className="text-indigo-600" />, bg: "bg-indigo-50/70 border-indigo-100" },
    { title: "Smart Scheduling", desc: "AI-optimized routes based on class timetables to reduce your waiting time.", icon: <Cpu size={22} className="text-fuchsia-600" />, bg: "bg-fuchsia-50/70 border-fuchsia-100" },
    { title: "Digital Payments", desc: "Seamless MoMo & Student ID integration. Pay in seconds without looking for change.", icon: <Wallet size={22} className="text-emerald-600" />, bg: "bg-emerald-50/70 border-emerald-100" },
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

// ── NEW SECTION: WHY CHOOSE US (UNTOUCHED) ──
function WhyChooseUs() {
  return (
    <section className="bg-white pb-28">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="flex justify-center items-center font-bold text-3xl sm:text-4xl md:text-6xl text-[var(--color-primary-dark)]">
          Why choose us
        </h1>
        <motion.div
          className="flex flex-col lg:flex-row justify-between lg:items-start gap-5 md:gap-10 mt-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Text */}
          <div className="flex flex-col gap-5 mt-10 lg:mt-32 text-center lg:text-left">
            <p className="text-xl sm:text-5xl text-[var(--color-primary)] font-bold">
              We Got you Covered
            </p>
            <p className="text-xl sm:text-4xl text-[var(--color-text-main)] font-bold">
              Active 6/7
            </p>
          </div>

          {/* Rounded Images */}
          <div className="flex flex-col sm:flex-row lg:flex-row gap-5 items-center lg:items-start w-full lg:w-auto justify-center">
            <div className="w-40 sm:w-50 h-40 sm:h-96 overflow-hidden rounded-full border border-[var(--color-border)] shadow-2xs">
              <img
                src={images.mola1}
                alt="Commuters Asset 1"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-40 sm:w-50 h-40 sm:h-80 overflow-hidden rounded-full border border-[var(--color-border)] shadow-2xs mt-5 sm:mt-20">
              <img
                src={images.mola2}
                alt="Commuters Asset 2"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-40 sm:w-50 h-40 sm:h-96 overflow-hidden rounded-full border border-[var(--color-border)] shadow-2xs">
              <img
                src={images.mola3}
                alt="Commuters Asset 3"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── REVIEWS SECTION (UNTOUCHED) ──
function Reviews() {
  const testimonials = [
    { name: "Brenda T.", role: "FET Student", text: "Real-time mapping entirely eliminated my daily tracking anxieties before morning lectures." },
    { name: "Mark A.", role: "FS Student", text: "Purchasing my pass directly via mobile money on the web interface took seconds. Highly recommended." },
    { name: "Dr. Collins N.", role: "Campus Admin", text: "The system provides our tracking team complete diagnostic fleet command data parameters safely." },
    { name: "Stacy W.", role: "ASTI Student", text: "Seat confirmation tools guarantee I am never stranded at the central loop terminal anymore." },
    { name: "Emmanuel E.", role: "COT Student", text: "Clean layout interfaces that look premium and work exceptionally well on mobile viewports." }
  ];

  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section className="bg-white py-24 overflow-hidden border-t border-[var(--color-border)]/60">
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <h2 className="text-[var(--color-primary)] uppercase tracking-[0.2em] text-[10px] font-black mb-3">User Feedback</h2>
        <h3 className="text-3xl font-black text-[var(--color-primary-dark)] tracking-tight">Trusted by campus commuters</h3>
      </div>

      <div className="relative flex w-full overflow-x-hidden py-4 mask-gradient">
        <motion.div 
          className="flex gap-6 shrink-0 pr-6"
          animate={{ x: [0, -2000] }}
          transition={{
            ease: "linear",
            duration: 35,
            repeat: Infinity,
          }}
        >
          {duplicatedTestimonials.map((review, i) => (
            <div 
              key={i} 
              className="w-[280px] sm:w-[320px] bg-[var(--color-bg-soft)] border border-[var(--color-border)] rounded-2xl p-6 flex flex-col justify-between shrink-0"
            >
              <div>
                <div className="flex gap-0.5 mb-4 text-[var(--color-primary)]">
                  {[...Array(5)].map((_, idx) => <Star key={idx} size={12} fill="currentColor" />)}
                </div>
                <p className="text-[var(--color-text-main)] text-xs font-semibold leading-relaxed mb-6">
                  "{review.text}"
                </p>
              </div>
              <div className="flex items-center gap-2.5 pt-4 border-t border-[var(--color-border)]/60">
                <div className="w-8 h-8 rounded-full bg-[var(--color-primary-dark)] text-white font-black text-[10px] flex items-center justify-center uppercase">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xs font-black text-[var(--color-primary-dark)] leading-none">{review.name}</h4>
                  <span className="text-[9px] font-bold text-[var(--color-text-muted)] uppercase tracking-wide mt-1 block">{review.role}</span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ── PRICING SECTION (UNTOUCHED) ──
function Pricing() {
  return (
    <section className="bg-[var(--color-bg-soft)] py-28 border-t border-[var(--color-border)]/60">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-black text-[var(--color-primary-dark)] mb-3 tracking-tight">Flexible Plans</h3>
          <p className="text-[var(--color-text-muted)] font-black uppercase text-[10px] tracking-widest">Pick the pass that fits your schedule</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div className="bg-white p-10 rounded-[2rem] border border-[var(--color-border)] flex flex-col items-center text-center shadow-2xs">
            <h4 className="text-[var(--color-text-muted)] font-black uppercase text-[10px] tracking-widest mb-4">Weekly Pass</h4>
            <div className="flex items-baseline gap-1.5 mb-8">
              <span className="text-[var(--color-primary-dark)] text-4xl font-black tracking-tight">100</span>
              <span className="text-[var(--color-text-muted)] font-black text-sm uppercase">FCFA</span>
            </div>
            <button className="w-full py-4 rounded-xl font-black text-xs uppercase tracking-widest text-white hover:opacity-90 transition-all active:scale-98 cursor-pointer" style={{ background: 'var(--color-primary-dark)' }}>
              Get Weekly Access
            </button>
          </div>

          <div className="bg-white p-10 rounded-[2rem] border-2 border-[var(--color-primary)] flex flex-col items-center text-center relative overflow-hidden shadow-sm">
            <div className="absolute top-0 right-0 bg-[var(--color-primary)] text-white px-4 py-1.5 rounded-bl-xl font-black text-[9px] uppercase tracking-widest">Best Value</div>
            <h4 className="text-[var(--color-text-muted)] font-black uppercase text-[10px] tracking-widest mb-4">Semester Pro</h4>
            <div className="flex items-baseline gap-1.5 mb-8">
              <span className="text-[var(--color-primary-dark)] text-4xl font-black tracking-tight">1000</span>
              <span className="text-[var(--color-text-muted)] font-black text-sm uppercase">FCFA</span>
            </div>
            <button className="w-full bg-[var(--color-primary)] text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:opacity-90 transition-all active:scale-98 shadow-sm cursor-pointer">
              Get Semester Access
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── MAIN LANDING PAGE COMPONENT ──
export default function LandingPage() {
  return (
    <main className="bg-white min-h-screen text-[var(--color-text-main)] selection:bg-[var(--color-primary)]/20">
      <Hero />
      <HowItWorks />
      <Features />
      <WhyChooseUs />
      <Reviews />
      <Pricing />
    </main>
  );
}