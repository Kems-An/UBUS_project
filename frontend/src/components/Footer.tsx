export default function Footer() {
  return (
    <footer className="pt-24 pb-12" style={{ background: 'var(--color-neutral-900)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
          
          {/* Brand & Mission */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-full" style={{ background: 'var(--color-primary)' }} />
              <span className="text-2xl font-bold text-white tracking-tighter">Academic Velocity</span>
            </div>
            <p className="text-slate-400 text-lg max-w-sm leading-relaxed">
              We’re redefining campus mobility with tech that puts students first. Real-time, reliable, and remarkably simple.
            </p>
          </div>

          {/* Quick Nav */}
          <div className="md:col-span-2">
            <h4 className="text-white font-bold mb-6">Explore</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Live Map</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Schedules</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Safety</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="md:col-span-2">
            <h4 className="text-white font-bold mb-6">Support</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Feedback</a></li>
            </ul>
          </div>

          {/* Social Icons */}
          <div className="md:col-span-3">
            <h4 className="text-white font-bold mb-6">Join the Community</h4>
            <div className="flex gap-4">
              {['𝕏', '📸', '🎧'].map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-12 h-12 rounded-full border border-slate-700 flex items-center justify-center text-xl hover:bg-slate-800 hover:border-slate-500 transition-all"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-xs">
            © {new Date().getFullYear()} Academic Velocity. Built for the next generation of students.
          </p>
          <div className="flex gap-8 text-xs text-slate-500">
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}