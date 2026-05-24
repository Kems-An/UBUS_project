import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import ourmission from "../assets/images/our mission.jpg"
import ourvision from "../assets/images/our vision.jpg"
import { 
  Zap, 
  Leaf, 
  ShieldCheck, 
  Target, 
  Eye, 
  Users, 
  Bus, 
  Route 
} from 'lucide-react';

const AboutUs: React.FC = () => {
  const fadeInUp: HTMLMotionProps<"div"> = {
    initial: { opacity: 0, y: 25 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5, ease: "easeOut" }
  };

  const metrics = [
    { icon: <Users size={20} className="text-blue-600" />, bg: "bg-blue-50 border-blue-100", value: "12,000+", label: "Active Commuters" },
    { icon: <Bus size={20} className="text-amber-500" />, bg: "bg-amber-50 border-amber-100", value: "24", label: "Smart Fleet Shuttles" },
    { icon: <Route size={20} className="text-purple-600" />, bg: "bg-purple-50 border-purple-100", value: "99.4%", label: "On-Time Dispatch" }
  ];

  return (
    <div className="min-h-screen bg-white text-[var(--color-text-main)] pt-10 selection:bg-[var(--color-primary)]/20 overflow-x-hidden">
      
      {/* ── MISSION SECTION (Adjusted column span and text max-width to prevent image overlap) ── */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-b border-[var(--color-border)]/60">
        <div className="grid lg:grid-cols-12 gap-12 xl:gap-16 items-center">
          
          {/* Text Column - Reduced from 7 to 6 columns to create more space */}
          <motion.div {...fadeInUp} className="lg:col-span-6 ">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-100 text-[var(--color-primary)]">
                <Target size={18} />
              </div>
              <h2 className="text-[var(--color-primary)] font-black uppercase tracking-[0.15em] text-[10px]">Our Mission</h2>
            </div>
            
            <h3 className="text-4xl md:text-5xl font-black text-[var(--color-primary-dark)] leading-[0.95] mb-6 tracking-tighter">
              Empowering campus life through intelligent mobility.
            </h3>
            
            {/* Added stricter max-width to protect the text block */}
            <p className="text-sm md:text-base text-[var(--color-text-muted)] leading-relaxed font-semibold max-w-[580px]">
              We believe every minute spent waiting at a terminal loop is an opportunity lost to innovation. By combining secure real-time telemetry datasets and efficient route loops, we guarantee your commute is as seamless as your destination itself.
            </p>
          </motion.div>

          {/* Image Column - Moved to span 6 columns for better balance */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-6 lg:col-start-7 relative"
          >
            <div className="rounded-[2.5rem] border border-[var(--color-border)] p-2.5 bg-[var(--color-bg-soft)] shadow-xs">
              <div className="w-full aspect-[4/3] sm:aspect-video lg:aspect-square rounded-[2rem] overflow-hidden bg-neutral-100 shadow-inner">
                <img 
                  src={ourmission}
                  alt="Students collaborating on campus" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ── LIVE DATA PERFORMANCE MILESTONES (UNTOUCHED) ── */}
      <section className="py-16 bg-[var(--color-bg-soft)] border-b border-[var(--color-border)]/60">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {metrics.map((metric, i) => (
            <motion.div 
              key={i} 
              {...fadeInUp} 
              transition={{ delay: i * 0.1 }}
              className="bg-white border border-[var(--color-border)] rounded-2xl p-6 flex items-center gap-5 shadow-2xs"
            >
              <div className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 ${metric.bg}`}>
                {metric.icon}
              </div>
              <div>
                <h4 className="text-2xl font-black tracking-tight text-[var(--color-primary-dark)] leading-none mb-1">{metric.value}</h4>
                <p className="text-[var(--color-text-muted)] text-[11px] font-bold uppercase tracking-wider">{metric.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── VISION SECTION (Adjusted column span and text max-width to prevent image overlap) ── */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 xl:gap-16 items-center">
          
          {/* Image Column - Adjusted to span 6 columns */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-6 order-2 lg:order-1 relative"
          >
            <div className="rounded-[2.5rem] border border-[var(--color-border)] p-2.5 bg-[var(--color-bg-soft)] shadow-xs">
              <div className="w-full aspect-[4/3] sm:aspect-video lg:aspect-square rounded-[2rem] overflow-hidden bg-neutral-100 shadow-inner">
                <img 
                  src={ourvision}
                  alt="Future transit technology" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Text Column - Adjusted to span 6 columns, aligned to end */}
          <motion.div {...fadeInUp} className="lg:col-span-6 lg:col-start-7 order-1 lg:order-2">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="p-2 rounded-lg bg-emerald-50 border border-sky-100 text-[var(--color-primary)]">
                <Eye size={18} />
              </div>
              <h2 className="text-[var(--color-primary)] font-black uppercase tracking-[0.15em] text-[10px]">Our Vision</h2>
            </div>
            
            <h3 className="text-4xl md:text-5xl font-black text-[var(--color-primary-dark)] leading-[0.95] mb-6 tracking-tighter">
              A connected, standardized campus in motion.
            </h3>
            
            {/* Added stricter max-width to protect the text block */}
            <p className="text-sm md:text-base text-[var(--color-text-muted)] leading-relaxed font-semibold max-w-[580px]">
              Our framework extends beyond traditional fleet coordination. We aim to construct an open global benchmark for regional academic transit infrastructure, incorporating predictive routing matrices and eco-friendly practices.
            </p>
          </motion.div>

        </div>
      </section>

      {/* ── CORE VALUES SECTION (UNTOUCHED) ── */}
      <section className="bg-[var(--color-bg-soft)] py-24 border-t border-[var(--color-border)]/60">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="text-[var(--color-primary)] uppercase tracking-[0.2em] text-[10px] font-black mb-3">Integrity</h2>
            <h3 className="text-3xl font-black text-[var(--color-primary-dark)] tracking-tight">The pillars of our infrastructure</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Zap size={22} className="text-fuchsia-600" />, bg: "bg-fuchsia-50 border-fuchsia-100", title: "Efficiency", desc: "Precision arrival schedules and AI-driven intervals ensure students reach transit zones with complete velocity." },
              { icon: <Leaf size={22} className="text-emerald-600" />, bg: "bg-emerald-50 border-emerald-100", title: "Sustainability", desc: "Our commit to Configurations engineered to maintain a clean, quiet, and optimized campus network." },
              { icon: <ShieldCheck size={22} className="text-indigo-600" />, bg: "bg-indigo-50 border-indigo-100", title: "Safety Protocol", desc: "Rigorous fleet maintenance checks and secure terminal verification make every ride safe and reliable." }
            ].map((value, i) => (
              <motion.div 
                key={i} 
                {...fadeInUp} 
                transition={{ delay: i * 0.1 }} 
                className="bg-white border border-[var(--color-border)] rounded-[2rem] p-8 flex flex-col shadow-2xs hover:border-[var(--color-primary)] transition-colors duration-300"
              >
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-6 ${value.bg}`}>
                  {value.icon}
                </div>
                <h4 className="text-base font-black text-[var(--color-primary-dark)] mb-2.5">{value.title}</h4>
                <p className="text-[var(--color-text-muted)] text-xs font-semibold leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── MINIMAL BASE METADATA BLOCK (UNTOUCHED) ── */}
      <div className="bg-white py-8 border-t border-[var(--color-border)]/40 text-center">
        <p className="text-neutral-400 text-[11px] font-bold uppercase tracking-wider">
          UBUS Hub System &bull; Secure Transit Matrix
        </p>
      </div>

    </div>
  );
};

export default AboutUs;