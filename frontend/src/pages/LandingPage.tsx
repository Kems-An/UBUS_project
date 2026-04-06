import { Link } from 'react-router-dom';

/* ============================================================
   LANDING PAGE
   Sections:
   1. Hero
   2. Features (Bento Grid)
   3. CTA Banner
   ============================================================ */

// ── 1. HERO SECTION ──────────────────────────────────────────
function Hero() {
  return (
    <section className="min-h-[870px] flex items-center overflow-hidden" style={{ background: 'var(--color-white)' }}>
      <div className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">

        {/* Left: copy */}
        <div>
          {/* Badge */}
          <span
            className="inline-block px-4 py-1.5 mb-6 rounded-full text-xs font-bold tracking-widest uppercase"
            style={{ background: 'var(--color-secondary-light)', color: 'var(--color-primary-dark)' }}
          >
            Campus Mobility Reimagined
          </span>

          {/* Heading */}
          <h1
            className="text-4xl md:text-5xl font-bold leading-tight mb-6"
            style={{ color: 'var(--color-primary-dark)', fontFamily: 'Manrope, sans-serif' }}
          >
            Safe, Fast, and Reliable{' '}
            <br />
            <span style={{ color: 'var(--color-primary)' }}>Campus Transit</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg max-w-lg mb-10 leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
            Navigate your university life with Academic Velocity. Real-time tracking,
            guaranteed seating, and seamless digital boarding — all in one platform.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <Link
              to="/register"
              className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white shadow-lg transition-transform duration-150 hover:scale-105"
              style={{ background: 'linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 100%)' }}
            >
              Book Your Seat
              <span>→</span>
            </Link>
            <Link
              to="/routes"
              className="px-8 py-4 rounded-xl font-bold transition-colors duration-150"
              style={{ background: 'var(--color-bg-soft)', color: 'var(--color-primary)' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-bg-muted)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--color-bg-soft)')}
            >
              Explore Routes
            </Link>
          </div>
        </div>

        {/* Right: image + floating card */}
        <div className="relative">
          {/* Main image */}
          <div className="w-full h-[500px] rounded-[2rem] overflow-hidden shadow-2xl">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOwRO6_2AYL8s-pdKhLtbfSTWmOckI5xNsP9Bwl_LG-MV7LVofyn82Mpv_PjSnxa5vyBliJC_avWiZzvxernRyXeIHF_iQdSE0DJFiH8tbtgdjAgiHvgb9uFM8Ky3WKAlb72pFOyyH3JvEnk3kTnhV7rCCBo7LgMScYW5u3o0wtUFGKxbZxq6n5cE8woupYEPYwlJo8lxrxnRZxFdmEE2Tjo4-oFUFP8b1RcPXkX4Li7JuxBRCChwMZ_qCYqbvbrWGV-DlSTRJ_VKG"
              alt="Modern university shuttle at campus station"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Floating stat card */}
          <div
            className="absolute -bottom-6 -left-6 p-5 rounded-2xl shadow-xl border max-w-[220px]"
            style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(16px)', borderColor: 'var(--color-border)' }}
          >
            <div className="flex items-center gap-3 mb-1">
              <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'var(--color-secondary-light)' }}>
                <span style={{ fontSize: 18 }}>🕐</span>
              </div>
              <div>
                <p className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>Next Arrival</p>
                <p className="text-base font-bold" style={{ color: 'var(--color-primary-dark)' }}>3 Minutes</p>
              </div>
            </div>
            <p className="text-xs italic" style={{ color: 'var(--color-primary)' }}>Route: Main Library Express</p>
          </div>
        </div>

      </div>
    </section>
  );
}

// ── 2. FEATURES SECTION ──────────────────────────────────────
function Features() {
  return (
    <section id="features" className="py-24" style={{ background: 'var(--color-bg-soft)' }}>
      <div className="max-w-6xl mx-auto px-6">

        {/* Section header */}
        <div className="mb-14 text-center lg:text-left">
          <h2
            className="text-3xl md:text-4xl font-bold mb-3"
            style={{ color: 'var(--color-primary-dark)', fontFamily: 'Manrope, sans-serif' }}
          >
            Precision on Every Route
          </h2>
          <p className="text-base max-w-xl" style={{ color: 'var(--color-text-muted)' }}>
            Designed specifically for the fast-paced university environment where every minute counts.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Card 1: Real-time tracking — wide */}
          <div
            className="md:col-span-2 p-8 rounded-3xl hover:shadow-md transition-shadow duration-200"
            style={{ background: 'var(--color-white)' }}
          >
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: 'var(--color-secondary-light)' }}>
              <span style={{ fontSize: 28 }}>📍</span>
            </div>
            <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--color-primary-dark)', fontFamily: 'Manrope, sans-serif' }}>
              Real-time GPS Tracking
            </h3>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--color-text-muted)' }}>
              Never miss a ride again. Monitor shuttle locations live on your map with accurate arrival times.
            </p>
            {/* Map placeholder image */}
            <div className="h-40 rounded-xl overflow-hidden">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQnMOQnHkYD8PvgnbXgfDbzzpInKl3wvmytMogDNuef_MVStf4U-uiyutiKF4i_adGaLwyRXnMXFps58IkGoKDW35xuj7XVwkiQxHQGUllfny9g9QtGBkevjZBisqwbT76aVEGGfWVgI3a1ChKb5CBg37GBPmGY3geskzH5sd63CgHrOzQToo2lUSrR9T7dGc1NVZGtv3Ep6N1hKYz0bxEOw3kS1EHN0i1k9qZ8vTGmF7OjoPXNzz0KX7erckvejAZC6JzsHu7ZUbv"
                alt="Live map tracking interface"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Card 2: Seat reservation */}
          <div
            className="p-8 rounded-3xl flex flex-col justify-between"
            style={{ background: 'var(--color-primary)', color: 'white' }}
          >
            <div>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: 'var(--color-primary-light)', opacity: 0.9 }}>
                <span style={{ fontSize: 28 }}>💺</span>
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Smart Seat Reservation
              </h3>
              <p className="text-sm leading-relaxed opacity-80">
                Book your preferred seat in advance. No more standing — just a guaranteed comfortable ride.
              </p>
            </div>
            {/* Mini seat grid visual */}
            <div className="flex gap-2 mt-8">
              {[true, false, true, true].map((taken, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded"
                  style={{
                    background: taken ? 'rgba(255,255,255,0.2)' : 'var(--color-primary-light)',
                    border: taken ? '1px solid rgba(255,255,255,0.3)' : 'none',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Card 3: Payments */}
          <div
            className="p-8 rounded-3xl hover:shadow-md transition-shadow duration-200"
            style={{ background: 'var(--color-white)' }}
          >
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: 'var(--color-secondary-light)' }}>
              <span style={{ fontSize: 28 }}>💳</span>
            </div>
            <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--color-primary-dark)', fontFamily: 'Manrope, sans-serif' }}>
              Easy Digital Payments
            </h3>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--color-text-muted)' }}>
              Use MTN Mobile Money, Orange Money, or your student ID for instant, paperless ticket purchases.
            </p>
            {/* Payment badges */}
            <div className="flex gap-2">
              {['MTN MoMo', 'Orange Money'].map(label => (
                <span
                  key={label}
                  className="px-3 py-1 rounded text-xs font-bold uppercase tracking-wider"
                  style={{ background: 'var(--color-bg-soft)', color: 'var(--color-text-muted)' }}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Card 4: Schedule sync — wide */}
          <div
            className="md:col-span-2 p-8 rounded-3xl flex flex-col md:flex-row items-center gap-8 border hover:shadow-md transition-shadow duration-200"
            style={{ background: 'var(--color-white)', borderColor: 'var(--color-border)' }}
          >
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--color-primary-dark)', fontFamily: 'Manrope, sans-serif' }}>
                Sync with your Class Schedule
              </h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--color-text-muted)' }}>
                Get smart route suggestions based on your timetable. Automatically reserve your commute for the entire semester.
              </p>
              <a
                href="#"
                className="text-sm font-bold inline-flex items-center gap-1 transition-colors duration-150"
                style={{ color: 'var(--color-primary)' }}
              >
                Learn More →
              </a>
            </div>
            {/* Calendar icon placeholder */}
            <div
              className="w-full md:w-56 h-36 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'var(--color-bg-soft)' }}
            >
              <span style={{ fontSize: 56, opacity: 0.4 }}>📅</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ── 3. CTA BANNER ────────────────────────────────────────────
function CTABanner() {
  return (
    <section className="py-24" style={{ background: 'var(--color-white)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div
          className="rounded-[3rem] p-12 lg:p-20 flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden"
          style={{ background: 'var(--color-primary-dark)' }}
        >
          {/* Soft glow decoration */}
          <div
            className="absolute -top-24 -right-24 w-80 h-80 rounded-full pointer-events-none"
            style={{ background: 'var(--color-primary)', opacity: 0.2, filter: 'blur(80px)' }}
          />

          {/* Left: text */}
          <div className="max-w-xl relative z-10">
            <h2
              className="text-3xl md:text-4xl font-bold text-white mb-5"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              Ready to upgrade your commute?
            </h2>
            <p className="text-base mb-10 leading-relaxed" style={{ color: 'var(--color-secondary-light)' }}>
              Join 15,000+ students and staff who travel smarter every day with Academic Velocity.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/register"
                className="px-8 py-4 rounded-full font-bold shadow-lg transition-all duration-150 hover:scale-105"
                style={{ background: 'var(--color-secondary)', color: 'var(--color-primary-dark)' }}
              >
                Get Started Now
              </Link>
              <Link
                to="/routes"
                className="px-8 py-4 rounded-full font-bold border text-white transition-colors duration-150"
                style={{ borderColor: 'rgba(255,255,255,0.3)' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                View All Routes
              </Link>
            </div>
          </div>

          {/* Right: live route widget */}
          <div
            className="relative z-10 w-full lg:w-72 p-6 rounded-3xl border"
            style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', borderColor: 'rgba(255,255,255,0.1)' }}
          >
            {/* Header row */}
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.5)' }}>Route Activity</span>
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.5)' }}>Live Now</span>
            </div>
            {/* Progress bar */}
            <div className="h-1 rounded-full mb-4 overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
              <div className="h-full rounded-full w-[65%]" style={{ background: 'var(--color-secondary)' }} />
            </div>
            {/* Route list */}
            {[
              { name: 'East Campus Express',   seats: '14 Seats Left' },
              { name: 'Innovation Hub Circle',  seats: '4 Seats Left'  },
            ].map(route => (
              <div key={route.name} className="flex items-center gap-3 py-3 border-b last:border-0" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                <span style={{ fontSize: 20 }}>🚌</span>
                <div>
                  <p className="text-sm font-bold text-white">{route.name}</p>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>On Time · {route.seats}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

// ── PAGE EXPORT ───────────────────────────────────────────────
export default function LandingPage() {
  return (
    <>
      <Hero />
      <Features />
      <CTABanner />
    </>
  );
}
