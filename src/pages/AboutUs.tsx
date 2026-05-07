import React from 'react';
import { motion , type HTMLMotionProps} from 'framer-motion';

import { 
  Zap, 
  Leaf, 
  ShieldCheck, 
  Target, 
  Eye, 
  MoveUpRight 
} from 'lucide-react';

const AboutUs: React.FC = () => {
  const fadeInUp: HTMLMotionProps<"div"> = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeOut" }
};

  const team = [
    { name: "Dr. Helena Vance", role: "Founder & CEO", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop" },
    { name: "Marcus Thorne", role: "Head of Logistics", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop" },
    { name: "Sarah Chen", role: "Sustainability Lead", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1000&auto=format&fit=crop" },
    { name: "David Kalu", role: "Operations Director", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop" }
  ];

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#1a1c1c] font-sans pt-20">
      
      {/* ── MISSION SECTION (Text Left, Image Right) ── */}
      <section className="py-24 px-8 max-w-7xl mx-auto border-b border-slate-100">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeInUp}>
            <div className="flex items-center gap-3 mb-6">
              <Target className="text-[#00623f]" size={28} />
              <h2 className="text-[#00623f] font-bold uppercase tracking-[0.2em] text-sm">Our Mission</h2>
            </div>
            <h3 className="text-5xl md:text-6xl font-black text-[#1b512d] leading-tight mb-8 tracking-tighter">
              Empowering students through kinetic mobility.
            </h3>
            <p className="text-xl text-[#3f4942] leading-relaxed font-medium">
              We believe every minute spent waiting for a shuttle is a minute lost to innovation. By integrating real-time telemetry and sustainable energy, we ensure your journey is as productive as the destination itself.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-video lg:aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000&auto=format&fit=crop" 
                alt="Students collaborating on campus" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── VISION SECTION (Image Left, Text Right) ── */}
      <section className="py-24 px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1 relative"
          >
            <div className="aspect-video lg:aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1000&auto=format&fit=crop" 
                alt="Future transit technology" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
          <motion.div {...fadeInUp} className="order-1 lg:order-2">
            <div className="flex items-center gap-3 mb-6">
              <Eye className="text-[#00623f]" size={28} />
              <h2 className="text-[#00623f] font-bold uppercase tracking-[0.2em] text-sm">Our Vision</h2>
            </div>
            <h3 className="text-5xl md:text-6xl font-black text-[#1b512d] leading-tight mb-8 tracking-tighter">
              A carbon-neutral campus in motion.
            </h3>
            <p className="text-xl text-[#3f4942] leading-relaxed font-medium">
              Our vision extends beyond transport; we aim to create a global standard for campus connectivity. By 2030, we intend to operate the first fully autonomous, zero-emission academic network in the region.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── CORE VALUES ── */}
      <section className="bg-white py-32 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: <Zap />, title: "Efficiency", desc: "Precision scheduling and AI-optimized routing ensure students reach class with velocity." },
              { icon: <Leaf />, title: "Sustainability", desc: "Our fleet is 100% electric. Committed to a silent, clean, and green campus environment." },
              { icon: <ShieldCheck />, title: "Safety", desc: "Rigorous maintenance and professional transit experts make every ride a secure experience." }
            ].map((value, i) => (
              <motion.div key={i} {...fadeInUp} transition={{ delay: i * 0.1 }} className="group">
                <div className="w-14 h-14 rounded-2xl bg-[#9bf5c4] text-[#00623f] flex items-center justify-center mb-6">
                  {value.icon}
                </div>
                <h4 className="text-2xl font-black text-[#1b512d] mb-3">{value.title}</h4>
                <p className="text-[#3f4942] font-medium leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

     

      {/* ── FOOTER ── */}
      <footer className="py-12 px-8 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 border-t border-slate-200">
        <div className="text-2xl font-black text-[#1b512d] tracking-tighter uppercase">Academic Velocity</div>
        <p className="text-[#3f4942]/60 text-sm font-medium">© 2026 Academic Velocity. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AboutUs;