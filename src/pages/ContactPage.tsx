import React, { useState } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  HelpCircle
} from 'lucide-react';

const ContactUs: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const fadeInUp: HTMLMotionProps<"div"> = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5, ease: "easeOut" }
  };

  const contactChannels = [
    { icon: <Mail size={20} className="text-blue-600" />, bg: "bg-blue-50 border-blue-100", title: "General Support", detail: "support@ubus.com", label: "Email our operational desk" },
    { icon: <Phone size={20} className="text-amber-500" />, bg: "bg-amber-50 border-amber-100", title: "Hotline Hub", detail: "+1 (234) 567-8900", label: "Mon - Fri, 6am - 10pm" },
    { icon: <MapPin size={20} className="text-emerald-600" />, bg: "bg-emerald-50 border-emerald-100", title: "Central Depot", detail: "Suite 402, Science Park Way", label: "Campus Sector Alpha" },
  ];

  const faqs = [
    { q: "How do I update my registered digital passport keys?", a: "Log directly into your student portal portal, navigate to the security account matrix layer, and click re-synchronize digital code key to update your boarding credential matrix safely." },
    { q: "What should I do if the scanner rejects my MoMo balance verification?", a: "Ensure your operational week or semester pass is fully authorized inside your transit gateway history database. If persistent, present your physical student ID tracking card to the terminal controller driver." },
    { q: "Can I track multiple shuttle coordinates simultaneously?", a: "Yes. The unified live mapping terminal allows commuters to select filter parameters by route lanes or view the entire concurrent running campus fleet network in real-time." }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Operational tracking payload submitted:', formState);
    // Add communication integration actions here
  };

  return (
    <div className="min-h-screen bg-white text-[var(--color-text-main)] pt-24 selection:bg-[var(--color-primary)]/20 overflow-x-hidden">
      
      {/* ── HEADER INTRO HERO TIER ── */}
      <section className="py-16 px-6 max-w-7xl mx-auto text-center border-b border-[var(--color-border)]/60">
        <motion.div {...fadeInUp} className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-bg-soft)] border border-[var(--color-border)] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-wider text-[var(--color-text-muted)]">Communications Network</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[var(--color-primary-dark)] tracking-tighter leading-none mb-4">
            Connect with our <span className="text-[var(--color-primary)]">Transit Desk</span>
          </h1>
          <p className="text-[var(--color-text-muted)] text-sm font-semibold leading-relaxed">
            Have questions regarding terminal operations, digital pass validation codes, or system maintenance metrics? Drop our dispatch unit a line.
          </p>
        </motion.div>
      </section>

      {/* ── CORE COMMUNICATIONS & INTERACTIVE DATA HUB TIER ── */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 xl:gap-16 items-start">
          
          {/* Left Block: Communication Channel Tiles */}
          <div className="lg:col-span-5 space-y-4 w-full">
            <motion.h3 {...fadeInUp} className="text-xs font-black uppercase tracking-widest text-[var(--color-primary-dark)] mb-6">
              Operational Gateways
            </motion.h3>
            
            {contactChannels.map((channel, i) => (
              <motion.div 
                key={i}
                {...fadeInUp}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-5 p-5 bg-white border border-[var(--color-border)] rounded-2xl shadow-2xs hover:border-[var(--color-primary)] transition-colors duration-200"
              >
                <div className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 ${channel.bg}`}>
                  {channel.icon}
                </div>
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-muted)] leading-none mb-1">{channel.title}</h4>
                  <p className="text-base text-sm font-black  leading-tight mb-0.5">{channel.detail}</p>
                  <span className="text-[11px] font-semibold text-neutral-400 block">{channel.label}</span>
                </div>
              </motion.div>
            ))}

            {/* Quick Operational Status Alert Box */}
            <motion.div {...fadeInUp} transition={{ delay: 0.3 }} className="p-5 bg-[var(--color-bg-soft)] border border-[var(--color-border)] rounded-2xl flex gap-3.5 items-start">
              <Clock size={16} className="text-purple-600 mt-0.5 shrink-0" />
              <div>
                <h5 className="text-xs font-black text-[var(--color-primary-dark)] mb-1">Standard Processing Window</h5>
                <p className="text-[11px] text-[var(--color-text-muted)] font-semibold leading-relaxed">
                  Support message data pipelines are systematically reviewed within 2 hours during normal terminal operational intervals.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Block: High-Fidelity Modern Form Frame */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-7 w-full bg-[var(--color-bg-soft)] border border-[var(--color-border)] rounded-[2.5rem] p-8 sm:p-10 shadow-3xs"
          >
            <h3 className="text-lg font-black text-[var(--color-primary-dark)] tracking-tight mb-2">Transmit Digital Message</h3>
            <p className="text-xs text-[var(--color-text-muted)] font-semibold mb-8">Fill in individual validation fields below to queue your diagnostic support ticket entry request.</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase tracking-wider text-[var(--color-primary-dark)] px-1">Your Name</label>
                  <input 
                    type="text" required
                    value={formState.name} onChange={(e) => setFormState({...formState, name: e.target.value})}
                    placeholder="e.g kemugne Angele"
                    className="bg-white border border-[var(--color-border)] rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[var(--color-primary)] transition-colors text-[var(--color-text-main)] placeholder-neutral-400 font-semibold"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase tracking-wider text-[var(--color-primary-dark)] px-1">Campus Email</label>
                  <input 
                    type="email" required
                    value={formState.email} onChange={(e) => setFormState({...formState, email: e.target.value})}
                    placeholder="username@student.ub.com"
                    className="bg-white border border-[var(--color-border)] rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[var(--color-primary)] transition-colors text-[var(--color-text-main)] placeholder-neutral-400 font-semibold"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-wider text-[var(--color-primary-dark)] px-1">Inquiry Context Subject</label>
                <input 
                  type="text" required
                  value={formState.subject} onChange={(e) => setFormState({...formState, subject: e.target.value})}
                  placeholder="e.g. Digital Portal Pass sync issue"
                  className="bg-white border border-[var(--color-border)] rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[var(--color-primary)] transition-colors text-[var(--color-text-main)] placeholder-neutral-400 font-semibold"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-wider text-[var(--color-primary-dark)] px-1">Detailed Message Context</label>
                <textarea 
                  rows={5} required
                  value={formState.message} onChange={(e) => setFormState({...formState, message: e.target.value})}
                  placeholder="Describe your system operational parameter difficulties in detail..."
                  className="bg-white border border-[var(--color-border)] rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[var(--color-primary)] transition-colors text-[var(--color-text-main)] placeholder-neutral-400 font-semibold resize-none"
                />
              </div>

              <button 
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-black text-xs uppercase tracking-widest text-white shadow-md hover:opacity-95 transition-all active:scale-98 mt-2"
                style={{ background: 'var(--color-primary-dark)' }}
              >
                <Send size={14} /> Send Message
              </button>
            </form>
          </motion.div>

        </div>
      </section>

      {/* ── FAQS KNOWLEDGE BASE ACCORDION GRID TIER ── */}
      <section className="bg-[var(--color-bg-soft)] py-24 border-t border-[var(--color-border)]/60">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 mx-auto mb-4">
              <HelpCircle size={20} />
            </div>
            <h3 className="text-2xl font-black text-[var(--color-primary-dark)] tracking-tight mb-2">Instant Troubleshooting</h3>
            <p className="text-xs text-[var(--color-primary-dark)] font-black uppercase tracking-wider">Review common system solution configurations</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <motion.div 
                key={idx}
                {...fadeInUp}
                transition={{ delay: idx * 0.05 }}
                className="bg-white border border-[var(--color-border)] rounded-2xl overflow-hidden shadow-2xs"
              >
                <button 
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full text-left p-6 flex justify-between items-center gap-4 group"
                >
                  <span className=" text-xs sm:text-sm  group-hover:text-[var(--color-primary)] transition-colors">
                    {faq.q}
                  </span>
                  <span className="text-xl font-light text-[var(--color-border)] group-hover:text-[var(--color-text-muted)] select-none shrink-0">
                    {activeFaq === idx ? '−' : '+'}
                  </span>
                </button>
                
                {activeFaq === idx && (
                  <div className="px-6 pb-6 pt-1 border-t border-dashed border-[var(--color-border)]/60">
                    <p className="text-xs text-[var(--color-text-muted)] font-semibold leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BASE SYSTEM PROFILE MARKER ── */}
      <div className="bg-white py-8 border-t border-[var(--color-border)]/40 text-center">
        <p className="text-neutral-400 text-[11px] font-bold uppercase tracking-wider">
          UBUS Comm Desk &bull; Central Control Channel
        </p>
      </div>

    </div>
  );
};

export default ContactUs;