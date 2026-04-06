import { Link } from 'react-router-dom';

/* Footer is shared across all pages via the Layout component */
export default function Footer() {
  return (
    <footer className="border-t" style={{ background: 'var(--color-white)', borderColor: 'var(--color-border)' }}>
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="md:col-span-1">
          <p className="text-lg font-bold mb-4" style={{ color: 'var(--color-primary-dark)', fontFamily: 'Manrope, sans-serif' }}>
            Academic Velocity
          </p>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
            Elevating the campus experience through intelligent transit solutions. Modern, efficient, and student-focused mobility.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: 'var(--color-primary-dark)' }}>
            Quick Links
          </h4>
          <ul className="flex flex-col gap-3">
            {['Find a Route', 'Book a Seat', 'Real-time Map', 'Accessibility'].map(label => (
              <li key={label}>
                <a href="#" className="text-sm transition-colors duration-150" style={{ color: 'var(--color-text-muted)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-primary)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-muted)')}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: 'var(--color-primary-dark)' }}>
            Contact Info
          </h4>
          <ul className="flex flex-col gap-3 text-sm" style={{ color: 'var(--color-text-muted)' }}>
            <li>✉ transit@university.edu</li>
            <li>📞 (555) 123-4567</li>
            <li>📍 Campus Center, Suite 402</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: 'var(--color-primary-dark)' }}>
            Social Media
          </h4>
          <div className="flex gap-3 mb-6">
            {['🌐', '🐦', '📘'].map((icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 rounded-full flex items-center justify-center text-sm transition-colors duration-150"
                style={{ background: 'var(--color-bg-muted)', color: 'var(--color-primary-dark)' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-secondary-light)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'var(--color-bg-muted)')}
              >
                {icon}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-xs" style={{ color: 'var(--color-text-muted)', opacity: 0.7 }}>
            © {new Date().getFullYear()} Academic Velocity. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
