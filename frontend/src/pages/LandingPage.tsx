import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import caroussel1  from "../assets/images/caroussel1.jpeg"
import caroussel2  from "../assets/images/caroussel2.jpeg"
import hero  from "../assets/images/hero.png"

import { 
  MapPinned, 
  Cpu, 
  Wallet, 
  Armchair, 
  BarChart3, 
  Headphones, 
  Link
} from 'lucide-react';
import { img } from 'framer-motion/client';

// ── HERO SECTION WITH TEXT OVERLAY ──────────────────────────
function Hero() {
  const carouselImages = [
    caroussel1,
    caroussel2,
    hero
  
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [carouselImages.length]);

  return (
    <section className="relative h-[85vh] min-h-[600px] w-full overflow-hidden bg-white">
      {/* 1. Background Carousel */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={index}
            src={carouselImages[index]}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
            alt="Campus Transit"
          />
        </AnimatePresence>
        {/* Dark Overlay for Readability */}
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]" />
      </div>

      {/* 2. Content Overlay (Text on Top) */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-center items-center text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tighter leading-[0.9]"
        >
          The Future of Commuting <br />
          with <span className="text-lime-400">UB Shuttle</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-slate-200 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-medium"
        >
          Expert tech to elevate your campus mobility. Real-time tracking, 
          AI-driven routing, and seamless digital boarding.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4"
        >
          

          <button
           className="bg-lime-400 text-slate-900 px-10 py-5 rounded-full font-black text-sm uppercase tracking-widest hover:bg-lime-300 transition-all shadow-xl shadow-lime-400/20">
            Get Started
          </button>
           
          
          <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-full font-black text-sm uppercase tracking-widest hover:bg-white/20 transition-all">
            Try Demo
          </button>
        </motion.div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-10 flex gap-3">
          {carouselImages.map((_, i) => (
            <button 
              key={i}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === index ? 'bg-lime-400 w-12' : 'bg-white/30 w-3 hover:bg-white/50'
              }`} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── FEATURES SECTION ────────────────────────────────────────
function Features() {
  const features = [
    { title: "Real-time Tracking", desc: "Live GPS updates for every shuttle on campus. Know exactly where your ride is.", icon: <MapPinned size={26} className="text-indigo-600" /> },
    { title: "Smart Scheduling", desc: "AI-optimized routes based on class timetables to reduce your waiting time.", icon: <Cpu size={26} className="text-purple-600" /> },
    { title: "Digital Payments", desc: "Seamless MoMo & Student ID integration. Pay in seconds without looking for change.", icon: <Wallet size={26} className="text-emerald-600" /> },
    { title: "Seat Reservation", desc: "Guarantee your spot before the bus arrives. No more standing in long queues.", icon: <Armchair size={26} className="text-orange-600" /> },
    { title: "Route Analytics", desc: "View peak hours and optimize your departure times for a smoother commute.", icon: <BarChart3 size={26} className="text-blue-600" /> },
    { title: "Instant Support", desc: "24/7 assistance for all transit queries via our dedicated support line.", icon: <Headphones size={26} className="text-rose-600" /> },
  ];

  return (
    <section className="bg-white py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-lime-600 uppercase tracking-[0.2em] text-xs font-black mb-4">Our Services</h2>
          <h3 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Everything you need for a smooth commute</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
              <div className="mb-6 p-4 bg-white inline-block rounded-2xl shadow-sm">{f.icon}</div>
              <h4 className="text-xl font-black text-slate-900 mb-3">{f.title}</h4>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── PRICING SECTION ─────────────────────────────────────────
function Pricing() {
  return (
    <section className="bg-slate-50 py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Flexible Plans</h3>
          <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">Pick the pass that fits your schedule</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white p-12 rounded-[3rem] shadow-sm border border-slate-100 flex flex-col items-center text-center">
            <h4 className="text-slate-400 font-black uppercase text-xs tracking-widest mb-4">Weekly Pass</h4>
            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-slate-900 text-5xl font-black">100</span>
              <span className="text-slate-400 font-bold text-xl uppercase">FCFA</span>
            </div>
            <button className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-800 transition-all">Get Weekly Access</button>
          </div>

          <div className="bg-slate-900 p-12 rounded-[3rem] text-white relative overflow-hidden shadow-2xl flex flex-col items-center text-center border-4 border-lime-400/20">
            <div className="absolute top-0 right-0 bg-lime-400 text-slate-900 px-6 py-2 rounded-bl-3xl font-black text-[10px] uppercase tracking-widest">Best Value</div>
            <h4 className="text-slate-400 font-black uppercase text-xs tracking-widest mb-4">Semester Pro</h4>
            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-white text-5xl font-black">1000</span>
              <span className="text-slate-400 font-bold text-xl uppercase">FCFA</span>
            </div>
            <button className="w-full bg-lime-400 text-slate-900 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-[1.03] transition-transform">Get Semester Access</button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── MAIN LANDING PAGE COMPONENT ─────────────────────────────
export default function LandingPage() {
  return (
    <main className="bg-white min-h-screen text-slate-900 selection:bg-lime-200">
      <Hero />
      <Features />
      <Pricing />
      <footer className="bg-slate-900 py-16 text-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-lime-400 rounded-lg flex items-center justify-center text-slate-900 font-black">V</div>
            <span className="font-black tracking-tighter text-xl">VELOCITY</span>
          </div>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
            © 2026 Academic Velocity. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}