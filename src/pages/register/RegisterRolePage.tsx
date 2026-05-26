import { Link } from 'react-router-dom';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { GraduationCap, Bus, ArrowRight } from 'lucide-react';
import logo from "../../assets/images/logo.png"

const roles = [
  {
    id: 'student',
    icon: <GraduationCap size={24} className="text-blue-600" />,
    iconBg: 'bg-blue-50 border-blue-100',
    title: 'Student Profile',
    desc: 'Book secure transit seats, track live shuttle paths in real-time, and manage your daily campus commute schedules effortlessly.',
    link: '/register/student',
    badge: null,
    buttonLabel: 'Register as Student',
  },
  {
    id: 'driver',
    icon: <Bus size={24} className="text-amber-500" />,
    iconBg: 'bg-amber-50 border-amber-100',
    title: 'Driver Operator',
    desc: 'Join our logistics ecosystem network. Apply to become a verified platform driver. Requires identity verification processing.',
    link: '/register/driver',
    badge: 'Background Check',
    buttonLabel: 'Apply as Driver',
  },
];

export default function RegisterRolePage() {
  const fadeInUp: HTMLMotionProps<"div"> = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" }
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[var(--color-text-main)] selection:bg-[var(--color-primary)]/20 overflow-x-hidden">
      
      {/* ── PREMIUM FIXED HEADER ROW (Matches global token alignment) ── */}
      <header className="fixed top-0 w-full z-50 h-20 flex items-center px-6 bg-white/80 backdrop-blur-xl border-b border-[var(--color-border)]/60">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
           {/* Logo Element Frame */}
        <Link to="/" onClick={closeMenu} className="w-24 shrink-0 transition-transform hover:scale-102">
          <img src={logo} alt="UBUS Logo" className="w-full h-auto" />
        </Link>
          <div className="text-xs font-bold text-[var(--color-text-muted)]">
            Already registered?{' '}
            <Link 
              to="/login" 
              className="text-[var(--color-primary-dark)] border-b border-[var(--color-primary-dark)] ml-1 pb-0.5 hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </header>

      {/* ── SELECTION GRID TIER AREA ── */}
      <main className="flex-1 flex flex-col items-center justify-center pt-32 pb-20 px-6 max-w-7xl mx-auto w-full">
        
        {/* Title Statement Cluster */}
        <motion.div {...fadeInUp} className="text-center mb-16 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-bg-soft)] border border-[var(--color-border)] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-wider text-[var(--color-text-muted)]">Authentication Onboarding</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[var(--color-primary-dark)] tracking-tighter leading-[0.95] mb-4">
            Choose your journey
          </h1>
          <p className="text-sm text-[var(--color-text-muted)] font-semibold leading-relaxed">
            Select the verification profile workspace required for your daily operations. Each terminal delivers isolated tools.
          </p>
        </motion.div>

        {/* Roles Distribution Matrix - Centralized layout for 2 elements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl mx-auto justify-center">
          {roles.map((role, i) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-white p-8 rounded-[2rem] border border-[var(--color-border)] flex flex-col justify-between shadow-2xs hover:border-[var(--color-primary)] transition-all duration-300 group"
            >
              <div>
                <div className="flex justify-between items-start mb-6 ">
                  {/* Distinct high-end container tokens prevent monochromatic green dominance */}
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-transform duration-300 group-hover:scale-105 ${role.iconBg}`}>
                    {role.icon}
                  </div>
                  {role.badge && (
                    <span className="text-[9px] font-black px-2.5 py-1 bg-[var(--color-bg-soft)] border border-[var(--color-border)]/60 text-[var(--color-text-muted)] rounded-lg uppercase tracking-wider">
                      {role.badge}
                    </span>
                  )}
                </div>

                <h2 className="text-lg font-black text-[var(--color-primary-dark)] mb-2 tracking-tight">
                  {role.title}
                </h2>
                
                <p className="text-[var(--color-text-muted)] text-xs font-semibold leading-relaxed mb-10">
                  {role.desc}
                </p>
              </div>

              <Link
                to={role.link}
                className="w-full py-4 rounded-xl font-black text-[11px] uppercase tracking-widest text-center transition-all flex items-center justify-center gap-2 text-white hover:opacity-95 active:scale-98 shadow-sm"
                style={{ background: 'var(--color-primary-dark)' }}
              >
                {role.buttonLabel} <ArrowRight size={14} strokeWidth={2.5} />
              </Link>
            </motion.div>
          ))}
        </div>

      </main>

      {/* ── BASE PROFILE REGISTER CONTAINER TRACKING MARKER ── */}
      <footer className="py-8 text-center border-t border-[var(--color-border)]/40 bg-white text-neutral-400 text-[11px] font-bold uppercase tracking-wider">
        UBUS Network Core &bull; Security Access Routing Matrix
      </footer>

    </div>
  );
}

function setMenuOpen(arg0: boolean) {
  throw new Error('Function not implemented.');
}