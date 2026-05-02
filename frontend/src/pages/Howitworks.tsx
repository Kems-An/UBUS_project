import React from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Armchair, 
  Navigation, 
  LayoutDashboard, 
  BarChart, 
  ShieldCheck,
  ArrowRight,
  Zap
} from 'lucide-react';

const HowItWorks: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#1a1c1c] font-sans antialiased">
      {/* ── HERO SECTION ── */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-1/2"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#9bf5c4]/30 text-[#00623f] text-xs font-bold uppercase tracking-widest mb-6">
              <Zap size={14} fill="currentColor" />
              Efficiency in Motion
            </div>
            <h1 className="text-6xl lg:text-7xl font-black text-[#1b512d] leading-[1.1] mb-8 tracking-tighter">
              Seamless Motion <br />
              <span className="text-[#00623f]/60">Across Campus.</span>
            </h1>
            <p className="text-lg text-[#3f4942] max-w-lg leading-relaxed mb-10 font-medium">
              A frictionless transit ecosystem designed for the modern academic lifestyle. 
              We’ve refined every interaction for students, drivers, and administrators.
            </p>
            <div className="flex gap-4">
              <button className="bg-[#00623f] text-white px-8 py-4 rounded-2xl font-bold hover:bg-[#1c7c54] transition-all shadow-xl shadow-[#00623f]/20 active:scale-95">
                Reserve Seat
              </button>
              <button className="bg-white border border-[#6f7a72]/20 px-8 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-all active:scale-95">
                Learn More
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:w-1/2 relative"
          >
            <div className="absolute inset-0 bg-[#7fd8a9]/20 rounded-[3rem] rotate-3 scale-105" />
            <img 
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1000" 
              alt="Campus Life" 
              className="relative rounded-[3rem] w-full h-[500px] object-cover shadow-2xl grayscale-[10%] hover:grayscale-0 transition-all duration-700"
            />
          </motion.div>
        </div>
      </section>

      {/* ── STUDENT FLOW (STEPS) ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-[#00623f] font-black uppercase tracking-[0.3em] text-sm mb-4">The Student Journey</h2>
            <h3 className="text-4xl font-black text-[#1b512d]">Booking in three taps</h3>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { 
                step: "01", 
                title: "Set Origin", 
                icon: <MapPin className="text-[#00623f]" />, 
                desc: "Select your dorm or hall. Our AI identifies the nearest pickup hub instantly.",
                color: "bg-[#9bf5c4]" 
              },
              { 
                step: "02", 
                title: "Reserve", 
                icon: <Armchair className="text-[#4f6600]" />, 
                desc: "Pick a departure window. Confirm your seat with no physical tickets needed.",
                color: "bg-[#cfef7a]" 
              },
              { 
                step: "03", 
                title: "Track Live", 
                icon: <Navigation className="text-[#2a5f39]" />, 
                desc: "Watch your shuttle in real-time. Get notified when your ride is 2 minutes away.",
                color: "bg-[#b6f0bf]" 
              }
            ].map((item, i) => (
              <motion.div key={i} variants={itemVariants} className="group p-10 rounded-[3rem] bg-[#f9f9f9] border border-slate-100 hover:shadow-2xl hover:shadow-emerald-900/5 transition-all">
                <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{item.step}</span>
                <h4 className="text-2xl font-black text-[#1b512d] mt-2 mb-4">{item.title}</h4>
                <p className="text-[#3f4942] leading-relaxed font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── DRIVER & ADMIN SECTIONS (BENTO) ── */}
      <section className="py-24 bg-[#f3f3f4]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Driver Large Card */}
            <div className="md:col-span-8 bg-[#00623f] rounded-[3.5rem] p-12 text-white relative overflow-hidden flex flex-col justify-end min-h-[450px]">
              <div className="absolute inset-0 bg-gradient-to-t from-[#002112] to-transparent z-10" />
              <img 
                src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=1000" 
                className="absolute inset-0 w-full h-full object-cover opacity-40" 
                alt="Navigation" 
              />
              <div className="relative z-20">
                <Navigation size={40} className="mb-6 text-[#9bf5c4]" />
                <h3 className="text-4xl font-black mb-4">Dynamic Navigation</h3>
                <p className="max-w-md text-emerald-50/80 font-medium text-lg leading-relaxed">
                  Drivers receive live demand heatmaps. Our AI reroutes vehicles to minimize wait times during finals week.
                </p>
              </div>
            </div>

            {/* Admin Small Card */}
            <div className="md:col-span-4 bg-white rounded-[3.5rem] p-10 flex flex-col items-center text-center justify-center border border-slate-200/60 shadow-sm">
              <div className="w-20 h-20 bg-[#cfef7a]/30 rounded-full flex items-center justify-center mb-6">
                <LayoutDashboard size={32} className="text-[#4f6600]" />
              </div>
              <h3 className="text-2xl font-black text-[#1b512d] mb-3">Shift Oversight</h3>
              <p className="text-[#3f4942] font-medium text-sm leading-relaxed">
                Clock in and monitor vehicle health through a distraction-free dashboard.
              </p>
            </div>

            {/* Stats Card */}
            <div className="md:col-span-4 bg-[#cfef7a] rounded-[3.5rem] p-12 flex flex-col justify-between">
              <h3 className="text-xl font-black text-[#161f00]">Real-time Stats</h3>
              <div>
                <div className="text-6xl font-black text-[#161f00] tracking-tighter">98%</div>
                <p className="text-sm font-bold text-[#3b4d00] uppercase tracking-widest mt-2">On-Time Accuracy</p>
              </div>
            </div>

            {/* Support Card */}
            <div className="md:col-span-8 bg-white rounded-[3.5rem] p-10 flex items-center gap-8 border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-24 h-24 rounded-3xl bg-[#f9f9f9] flex-shrink-0 flex items-center justify-center border border-slate-100">
                <ShieldCheck size={40} className="text-[#00623f]" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-[#1b512d] mb-2">Command Center</h3>
                <p className="text-[#3f4942] font-medium leading-relaxed">
                  Direct links to admin for incident reporting or route adjustments with automated safety logs.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#1c7c54] rounded-[4rem] p-16 md:p-24 text-center relative overflow-hidden shadow-2xl shadow-emerald-900/20">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-400/20 via-transparent to-transparent" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tighter">
                Ready to move <br /> with velocity?
              </h2>
              <p className="text-[#bdffd8] text-lg mb-12 font-medium opacity-90">
                Join the thousands of students and faculty who have reclaimed their commute. 
                Registration takes less than two minutes.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                <button className="w-full sm:w-auto px-10 py-5 bg-white text-[#00623f] font-black rounded-2xl hover:bg-[#9bf5c4] transition-all text-lg shadow-xl shadow-black/10 active:scale-95 flex items-center justify-center gap-2">
                  Register as Student <ArrowRight size={20} />
                </button>
                <button className="w-full sm:w-auto px-10 py-5 border-2 border-white/30 text-white font-black rounded-2xl hover:bg-white/10 transition-all text-lg active:scale-95">
                  Apply to Drive
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-white border-t border-slate-100 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="font-black text-[#1b512d] text-xl tracking-tighter">
            ACADEMIC VELOCITY
          </div>
          <div className="flex gap-8 text-[#3f4942] text-sm font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-[#00623f] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#00623f] transition-colors">Terms</a>
            <a href="#" className="hover:text-[#00623f] transition-colors">Support</a>
          </div>
          <div className="text-slate-400 text-xs font-bold uppercase tracking-widest">
            © 2026 The Fluid Campus Transit.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HowItWorks;