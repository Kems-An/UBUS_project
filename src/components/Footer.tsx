import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="pt-16 pb-12" style={{ background: 'var(--color-neutral-900)' }}>
      <div className="max-w-7xl mx-auto px-8">
        
        {/* ─── UPPER TIER: HIGH-IMPACT IDENTITY & CONTACT LAYER ─── */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-6 pb-12 border-b border-neutral-800">
          
          {/* Left Block: Modern Flat Brand Identity */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              {/* Minimalist Flat Bus Icon */}
              <svg 
                className="w-7 h-7 text-[var(--color-primary)] shrink-0" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-1.1 0-2 .9-2 2v7c0 .6.4 1 1 1h1" />
                <circle cx="7.5" cy="17.5" r="2.5" />
                <circle cx="16.5" cy="17.5" r="2.5" />
              </svg>
              <h2 className="text-3xl font-black  text-white  uppercase leading-none">
               
              </h2>
            </div>
            <p className="text-neutral-500 text-xs font-bold uppercase tracking-widest pl-1">
              Intelligent Campus Transit
            </p>
          </div>

          {/* Right Block: Minimalist Metadata Matrix */}
          <div className="text-left sm:text-right font-sans">
            <p className="text-xl font-black tracking-tight text-white mb-1">
              +1 234 567 89 00
            </p>
            <p className="text-sm font-bold text-neutral-400 hover:text-[var(--color-primary)] transition-colors cursor-pointer">
              support@ubus.com
            </p>
          </div>
        </div>

        {/* ─── LOWER TIER: 4-COLUMN CONTENT DIRECTORY ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 py-16">
          
          {/* Column 1: About Platform Summary */}
          <div>
            <h4 className="text-white text-sm font-extrabold tracking-tight mb-4">About Us</h4>
            <p className="text-neutral-400 text-xs leading-relaxed max-w-xs">
              UBUS is a centralized smart transit ecosystem designed to optimize, monitor, and streamline daily commuter routes for students, operators, and administration.
            </p>
          </div>

          {/* Column 2: Operational Schedule Data */}
          <div>
            <h4 className="text-white text-sm font-extrabold tracking-tight mb-4">Operational Hours</h4>
            <ul className="space-y-2 text-neutral-400 text-xs font-medium">
              <li className="flex justify-between max-w-[200px]"><span>Monday - Friday</span> <span className="text-white font-bold">6am – 10pm</span></li>
              <li className="flex justify-between max-w-[200px]"><span>Saturday</span> <span className="text-white font-bold">8am – 6pm</span></li>
              <li className="flex justify-between max-w-[200px]"><span>Sunday</span> <span className="text-neutral-500 uppercase tracking-wider text-[10px] font-black">Fleet Standby</span></li>
            </ul>
          </div>

          {/* Column 3: Regional Terminal Address */}
          <div>
            <h4 className="text-white text-sm font-extrabold tracking-tight mb-4">Central Depot</h4>
            <address className="text-neutral-400 text-xs not-italic leading-relaxed">
              Transit Operations Complex Suite 402<br />
              University Science Park Way<br />
              Campus Sector Alpha
            </address>
          </div>

          {/* Column 4: Relational Route Gateways */}
          <div>
            <h4 className="text-white text-sm font-extrabold tracking-tight mb-4">Follow Us</h4>
            <ul className="space-y-2 text-xs font-bold">
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors duration-200 block">
                  Digital Matrix Logs
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors duration-200 block">
                  Internal Fleet Updates
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors duration-200 block">
                  System Status Network
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* ─── BASEBOARD: COPYRIGHT & COMPLIANCE RULES ─── */}
        <div className="pt-8 border-t border-neutral-800/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-neutral-600 text-xs font-medium">
            &copy; {new Date().getFullYear()} UBUS Platform. All operations monitored securely.
          </p>
          <div className="flex gap-6 text-xs font-bold">
            <Link to="/privacy" className="text-neutral-500 hover:text-neutral-400 transition-colors">Privacy</Link>
            <Link to="/terms" className="text-neutral-500 hover:text-neutral-400 transition-colors">Terms</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}