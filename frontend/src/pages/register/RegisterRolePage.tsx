import { Link } from 'react-router-dom';
import { GraduationCap, Bus, ShieldAlert, ArrowRight } from 'lucide-react';

const roles = [
  {
    id: 'student',
    icon: <GraduationCap size={32} />,
    title: 'Student',
    desc: 'Book seats, track shuttles in real-time, and manage your daily campus commute effortlessly.',
    link: '/register/student',
    badge: null,
    buttonLabel: 'Register as Student',
    color: 'bg-lime-400',
  },
  {
    id: 'driver',
    icon: <Bus size={32} />,
    title: 'Driver',
    desc: 'Join our transit network. Apply to become a verified campus driver. Requires background check.',
    link: '/register/driver',
    badge: 'Pending Review',
    buttonLabel: 'Apply as Driver',
    color: 'bg-slate-900 text-white',
  },
  {
    id: 'admin',
    icon: <ShieldAlert size={32} />,
    title: 'Admin',
    desc: 'Restricted to university transit staff and IT. Manage fleet logistics and user permissions.',
    link: '/register/admin',
    badge: 'Staff Only',
    buttonLabel: 'Request Admin Access',
    color: 'bg-slate-100 text-slate-400',
  },
];

export default function RegisterRolePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* --- Glass Navbar --- */}
      <header className="fixed top-0 w-full z-50 h-20 flex items-center px-8 bg-white/70 backdrop-blur-xl border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <Link to="/" className="text-2xl font-black text-slate-900 tracking-tighter">
            ACADEMIC<span className="text-lime-500">VELOCITY</span>
          </Link>
          <div className="text-sm font-bold text-slate-500">
            Already have an account? <Link to="/login" className="text-slate-900 border-b-2 border-lime-400 ml-1">Sign In</Link>
          </div>
        </div>
      </header>

      {/* --- Role Selection Grid --- */}
      <main className="flex-1 flex flex-col items-center justify-center pt-32 pb-20 px-6">
        <div className="text-center mb-16 max-w-2xl">
          <span className="px-4 py-1.5 rounded-full bg-lime-400/10 text-lime-700 text-[10px] font-black uppercase tracking-[0.2em] mb-6 inline-block">
            Getting Started
          </span>
          <h1 className="text-5xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
            Choose your journey.
          </h1>
          <p className="text-lg text-slate-500 font-medium leading-relaxed">
            Select the role that fits your campus needs. Each account type offers a tailored transit experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
          {roles.map((role) => (
            <div
              key={role.id}
              className="group relative bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl flex flex-col"
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110 ${role.color}`}>
                {role.icon}
              </div>

              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-2xl font-black text-slate-900">{role.title}</h2>
                {role.badge && (
                  <span className="text-[9px] font-black px-2 py-1 bg-slate-100 text-slate-500 rounded-md uppercase tracking-wider">
                    {role.badge}
                  </span>
                )}
              </div>

              <p className="text-slate-500 font-medium leading-relaxed mb-10 flex-1">
                {role.desc}
              </p>

              <Link
                to={role.link}
                className="w-full py-4 rounded-2xl font-bold text-sm text-center transition-all flex items-center justify-center gap-2 bg-slate-900 text-white hover:bg-slate-800"
              >
                {role.buttonLabel} <ArrowRight size={16} />
              </Link>
            </div>
          ))}
        </div>
      </main>

      <footer className="py-10 text-center border-t border-slate-100 bg-white text-slate-400 text-sm font-medium">
        © {new Date().getFullYear()} Academic Velocity · Smart Campus Logistics
      </footer>
    </div>
  );
}