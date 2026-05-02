import React, { useState, useRef, type ChangeEvent } from 'react';
import profile from "../../../assets/images/profile.png"
import { 
  User, 
  Settings, 
  CreditCard, 
  Mail, 
  Phone, 
  Truck, 
  Calendar, 
  Download, 
  Zap, 
  PhoneCall, 
  Wrench,
  Camera,
  Loader2,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

const DriverProfile: React.FC = () => {
  // --- Profile Picture State ---
  const [imagePreview, setImagePreview] = useState<string>("https://images.unsplash.com/vector-1776244476031-db2aa624a2a0?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setTimeout(() => setIsUploading(false), 800);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 lg:pb-10">
      {/* --- Header Section --- */}
      <header className="px-8 pt-12 pb-8 max-w-7xl mx-auto">
        <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Driver Profile</h2>
        <p className="text-slate-500 font-medium max-w-xl">
          Manage your personal credentials, view your assigned campus vehicle details, and track your recent driving shifts.
        </p>
      </header>

      <div className="px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* --- Left Column: Info & History (8 Cols) --- */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Identity & Editable Form */}
          <section className="bg-white rounded-[2.5rem] p-8 lg:p-10 border border-slate-100 shadow-sm relative overflow-hidden">
            <div className="flex flex-col md:flex-row gap-10 relative z-10">
              
              {/* Profile Photo Uploader */}
              <div className="relative shrink-0 mx-auto md:mx-0">
                <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                <div className="w-40 h-40 rounded-[2rem] overflow-hidden ring-4 ring-emerald-50 shadow-inner bg-slate-100 relative group">
                  <img 
                    src={imagePreview} 
                    alt="Driver Portrait" 
                    className={`w-full h-full object-cover transition-all duration-500 ${isUploading ? 'blur-sm opacity-50' : 'opacity-100'}`}
                  />
                  {isUploading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Loader2 className="animate-spin text-emerald-600" size={32} />
                    </div>
                  )}
                  <div onClick={handleUploadClick} className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer flex flex-col items-center justify-center">
                    <Camera size={24} className="text-white mb-1" />
                    <span className="text-white text-[9px] font-black uppercase tracking-tighter">Edit Photo</span>
                  </div>
                </div>
                <button onClick={handleUploadClick} className="absolute -bottom-3 -right-3 p-3 bg-emerald-500 text-white rounded-2xl shadow-xl hover:bg-emerald-600 transition-all border-4 border-white">
                  <Camera size={20} />
                </button>
              </div>

              {/* Form Grid */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: 'Full Name', value: 'Marcus Thorne', icon: <User size={16}/> },
                  { label: 'License ID', value: 'TX-9988-2104', icon: <CreditCard size={16}/> },
                  { label: 'Contact', value: '+1 (555) 902-1432', icon: <Phone size={16}/> },
                  { label: 'Work Email', value: 'm.thorne@academicvelocity.edu', icon: <Mail size={16}/> },
                ].map((field, i) => (
                  <div key={i} className="group space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{field.label}</label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors">
                        {field.icon}
                      </div>
                      <input 
                        type="text" 
                        defaultValue={field.value}
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border-transparent rounded-2xl font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none"
                      />
                    </div>
                  </div>
                ))}
                <div className="md:col-span-2 flex justify-end pt-4">
                  <button className="bg-emerald-500 text-white px-10 py-4 rounded-2xl font-black text-sm shadow-xl shadow-emerald-500/20 hover:bg-emerald-600 transition-all active:scale-95">
                    {isUploading ? 'UPLOADING...' : 'SAVE CHANGES'}
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Shift History List */}
          <section className="bg-white/50 rounded-[2.5rem] p-8 border border-slate-100">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Recent Shift History</h3>
              <button className="text-emerald-600 font-black text-xs hover:underline flex items-center gap-1">
                <Download size={14} /> DOWNLOAD LOG
              </button>
            </div>
            <div className="space-y-3">
              {[
                { date: 'Monday, Oct 24', route: 'North Campus Express', hrs: '8.5', time: '06:00 - 14:30' },
                { date: 'Friday, Oct 21', route: 'Evening Dorm Loop', hrs: '6.0', time: '16:00 - 22:00' }
              ].map((shift, i) => (
                <div key={i} className="bg-white p-6 rounded-3xl flex items-center justify-between border border-slate-100 hover:shadow-md transition-shadow group">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                      <Calendar size={20} />
                    </div>
                    <div>
                      <p className="font-black text-slate-900">{shift.date}</p>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">{shift.route} • {shift.hrs} Hours</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-slate-900">{shift.time}</p>
                    <span className="text-[9px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-black uppercase">Completed</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* --- Right Column: Vehicle & Support (4 Cols) --- */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Assigned Vehicle Card */}
          <section className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6">
                <ShieldCheck size={16} className="text-emerald-400" />
                <h3 className="text-[10px] font-black uppercase tracking-widest text-white/60">Assigned Asset</h3>
              </div>

              <div className="mb-8">
                <img 
                  src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop" 
                  alt="Shuttle" 
                  className="w-full h-44 object-cover rounded-3xl shadow-2xl mb-6 brightness-90 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-2xl font-black tracking-tighter">Velocity EV-09</p>
                    <p className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest">Fleet Status: Active</p>
                  </div>
                  <div className="bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-md border border-white/10 flex items-center gap-2">
                    <Zap size={12} className="text-emerald-400" fill="currentColor" />
                    <span className="text-xs font-black">94%</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-y-6 border-t border-white/10 pt-6">
                <div>
                  <p className="text-[9px] uppercase font-black text-white/40 mb-1">Make / Model</p>
                  <p className="text-sm font-bold">Proterra ZX5</p>
                </div>
                <div>
                  <p className="text-[9px] uppercase font-black text-white/40 mb-1">Plate Number</p>
                  <p className="text-sm font-bold">AV-8809-X</p>
                </div>
                <div>
                  <p className="text-[9px] uppercase font-black text-white/40 mb-1">Last Service</p>
                  <p className="text-sm font-bold">Oct 12, 2024</p>
                </div>
                <div>
                  <p className="text-[9px] uppercase font-black text-white/40 mb-1">Inspection</p>
                  <p className="text-sm font-bold text-emerald-400">Valid (90d)</p>
                </div>
              </div>
            </div>
            {/* Abstract glow */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl" />
          </section>

          {/* Dispatcher Quick Connect */}
          <section className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 ml-1">Quick Support</h4>
            <div className="space-y-3">
              {[
                { name: 'Central Dispatch', icon: <PhoneCall size={18}/>, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                { name: 'Maintenance Team', icon: <Wrench size={18}/>, color: 'text-blue-600', bg: 'bg-blue-50' }
              ].map((item, i) => (
                <button key={i} className="w-full flex items-center justify-between p-5 bg-slate-50 hover:bg-white border border-transparent hover:border-slate-100 rounded-3xl transition-all group">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 ${item.bg} ${item.color} rounded-2xl shadow-sm group-hover:scale-110 transition-transform`}>
                      {item.icon}
                    </div>
                    <span className="font-black text-slate-900 text-sm tracking-tight">{item.name}</span>
                  </div>
                  <ChevronRight size={16} className="text-slate-300 group-hover:text-slate-900 transition-colors" />
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DriverProfile;