import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, MapPin, Clock, Send, HelpCircle, MessageSquare
} from 'lucide-react';

// ── Your real contact details ──
const WHATSAPP_NUMBER = '237687663134';  
const ADMIN_GMAIL     = 'angelakemugne@gmail.com';

const ContactUs: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [sent, setSent] = useState(false);

  const fadeInUp = {
    initial:     { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0  },
    viewport:    { once: true },
    transition:  { duration: 0.5, ease: 'easeOut' },
  };

  const contactChannels = [
    {
      icon:   <MessageSquare size={20} className="text-emerald-600" />,
      bg:     'bg-emerald-50 border-emerald-100',
      title:  'WhatsApp Support',
      detail: '+237 687 663 134',      
      label:  'Chat with us on WhatsApp',
      href:   `https://wa.me/${WHATSAPP_NUMBER}`,
    },
    {
      icon:   <Mail size={20} className="text-blue-600" />,
      bg:     'bg-blue-50 border-blue-100',
      title:  'Email Support',
      detail: ADMIN_GMAIL,
      label:  'Send us an email directly',
      href:   `mailto:${ADMIN_GMAIL}`,
    },
    {
      icon:   <MapPin size={20} className="text-amber-500" />,
      bg:     'bg-amber-50 border-amber-100',
      title:  'Campus Location',
      detail: 'University of Buea',
      label:  'Molyko, Buea, Cameroon',
      href:   '#',
    },
  ];

  const faqs = [
    {
      q: 'How do I book a shuttle?',
      a: 'Log into your student dashboard, click "Book a Shuttle", enter your departure and destination points, choose an available shuttle, select your seat, and pay via MTN MoMo or Orange Money.',
    },
    {
      q: 'What should I do if my ticket QR code is not scanning?',
      a: 'Ensure your screen brightness is at maximum and the QR code is fully visible. If the issue persists, show your booking reference number to the driver directly. Contact support via WhatsApp if needed.',
    },
    {
      q: 'How do I know when my shuttle is ready for departure?',
      a: 'You will receive a real-time notification in your student dashboard as soon as the driver scans your ticket, indicating the shuttle is ready for boarding.',
    },
    {
      q: 'Can I cancel my booking?',
      a: 'Currently, cancellations must be requested via WhatsApp or email to our support team. Provide your booking reference number for a faster resolution.',
    },
    {
      q: 'What payment methods are accepted?',
      a: 'We accept MTN Mobile Money and Orange Money. Payments are processed securely through CamPay. Exact amount must be available in your MoMo wallet at the time of booking.',
    },
  ];

  // ── WhatsApp submission ──
  // Formats the form data into a WhatsApp message and opens it
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const waMessage = encodeURIComponent(
      `*UBUS Support Request*\n\n` +
      `*Name:* ${formState.name}\n` +
      `*Email:* ${formState.email}\n` +
      `*Subject:* ${formState.subject}\n\n` +
      `*Message:*\n${formState.message}`
    );

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`, '_blank');
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setFormState({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-white text-[var(--color-text-main)] pt-24 selection:bg-[var(--color-primary)]/20 overflow-x-hidden">

      {/* Header */}
      <section className="py-16 px-6 max-w-7xl mx-auto text-center border-b border-[var(--color-border)]/60">
        <motion.div  className="max-w-2xl mx-auto">
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

      {/* Main Contact Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 xl:gap-16 items-start">

          {/* Left: Contact Channels */}
          <div className="lg:col-span-5 space-y-4 w-full">
            <motion.h3  className="text-xs font-black uppercase tracking-widest text-[var(--color-primary-dark)] mb-6">
              Contact Channels
            </motion.h3>

            {contactChannels.map((channel, i) => (
              <motion.a
                key={i}
                href={channel.href}
                target={channel.href !== '#' ? '_blank' : undefined}
                rel="noopener noreferrer"
                {...fadeInUp}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-5 p-5 bg-white border border-[var(--color-border)] rounded-2xl shadow-2xs hover:border-[var(--color-primary)] transition-colors duration-200 cursor-pointer group"
              >
                <div className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 ${channel.bg}`}>
                  {channel.icon}
                </div>
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-muted)] leading-none mb-1">{channel.title}</h4>
                  <p className="text-sm font-black text-[var(--color-neutral-600)] leading-tight mb-0.5 group-hover:text-[var(--color-primary)] transition-colors">
                    {channel.detail}
                  </p>
                  <span className="text-[11px] font-semibold text-neutral-400 block">{channel.label}</span>
                </div>
              </motion.a>
            ))}

            <motion.div {...fadeInUp} transition={{ delay: 0.3 }}
              className="p-5 bg-[var(--color-bg-soft)] border border-[var(--color-border)] rounded-2xl flex gap-3.5 items-start">
              <Clock size={16} className="text-[var(--color-primary)] mt-0.5 shrink-0" />
              <div>
                <h5 className="text-xs font-black text-[var(--color-primary-dark)] mb-1">Response Time</h5>
                <p className="text-[11px] text-[var(--color-text-muted)] font-semibold leading-relaxed">
                  WhatsApp messages are typically responded to within 1–2 hours during operational hours (6am – 10pm).
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right: Contact Form → sends to WhatsApp */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-7 w-full bg-[var(--color-bg-soft)] border border-[var(--color-border)] rounded-[2.5rem] p-8 sm:p-10 shadow-3xs"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center">
                <MessageSquare size={16} className="text-emerald-600" />
              </div>
              <h3 className="text-lg font-black text-[var(--color-primary-dark)] tracking-tight">Send a Message</h3>
            </div>
            <p className="text-xs text-[var(--color-text-muted)] font-semibold mb-8">
              Fill in the form below. Clicking "Send" will open WhatsApp with your message pre-filled — 
              just hit send on WhatsApp to reach us directly.
            </p>

            {sent && (
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-emerald-700">
                <MessageSquare size={16} />
                <span className="text-xs font-black">WhatsApp opened! Send the message to complete your request.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase tracking-wider text-[var(--color-primary-dark)] px-1">Your Name</label>
                  <input type="text" required
                    value={formState.name}
                    onChange={e => setFormState({ ...formState, name: e.target.value })}
                    placeholder="e.g. Kemugne Angela"
                    className="bg-white border border-[var(--color-border)] rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[var(--color-primary)] transition-colors placeholder-neutral-400 font-semibold"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase tracking-wider text-[var(--color-primary-dark)] px-1">Your Email</label>
                  <input type="email" required
                    value={formState.email}
                    onChange={e => setFormState({ ...formState, email: e.target.value })}
                    placeholder="you@student.ub.cm"
                    className="bg-white border border-[var(--color-border)] rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[var(--color-primary)] transition-colors placeholder-neutral-400 font-semibold"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-wider text-[var(--color-primary-dark)] px-1">Subject</label>
                <input type="text" required
                  value={formState.subject}
                  onChange={e => setFormState({ ...formState, subject: e.target.value })}
                  placeholder="e.g. Payment issue, Booking problem..."
                  className="bg-white border border-[var(--color-border)] rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[var(--color-primary)] transition-colors placeholder-neutral-400 font-semibold"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-wider text-[var(--color-primary-dark)] px-1">Message</label>
                <textarea rows={5} required
                  value={formState.message}
                  onChange={e => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Describe your issue or question in detail..."
                  className="bg-white border border-[var(--color-border)] rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[var(--color-primary)] transition-colors placeholder-neutral-400 font-semibold resize-none"
                />
              </div>

              <button type="submit"
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-black text-xs uppercase tracking-widest text-white shadow-md hover:opacity-95 transition-all active:scale-98 mt-2 bg-[var(--color-primary-dark)] hover:bg-[var(--color-primary)]"
              >
                <Send size={14} /> Send via WhatsApp
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--color-bg-soft)] py-24 border-t border-[var(--color-border)]/60">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 mx-auto mb-4">
              <HelpCircle size={20} />
            </div>
            <h3 className="text-2xl font-black text-[var(--color-primary-dark)] tracking-tight mb-2">Frequently Asked Questions</h3>
            <p className="text-xs text-[var(--color-primary-dark)] font-black uppercase tracking-wider">Quick answers to common questions</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <motion.div key={idx} {...fadeInUp} transition={{ delay: idx * 0.05 }}
                className="bg-white border border-[var(--color-border)] rounded-2xl overflow-hidden shadow-2xs">
                <button onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full text-left p-6 flex justify-between items-center gap-4 group">
                  <span className="text-xs sm:text-sm font-bold text-[var(--color-neutral-600)] group-hover:text-[var(--color-primary)] transition-colors">
                    {faq.q}
                  </span>
                  <span className="text-xl font-light text-[var(--color-border)] group-hover:text-[var(--color-text-muted)] select-none shrink-0">
                    {activeFaq === idx ? '−' : '+'}
                  </span>
                </button>
                {activeFaq === idx && (
                  <div className="px-6 pb-6 pt-1 border-t border-dashed border-[var(--color-border)]/60">
                    <p className="text-xs text-[var(--color-text-muted)] font-semibold leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-white py-8 border-t border-[var(--color-border)]/40 text-center">
        <p className="text-neutral-400 text-[11px] font-bold uppercase tracking-wider">
          UBUS Support &bull; University of Buea Campus Transit
        </p>
      </div>
    </div>
  );
};

export default ContactUs;
