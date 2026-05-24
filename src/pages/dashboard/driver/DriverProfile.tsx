import React, { useState, useRef, type ChangeEvent } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { 
  User, 
  Mail, 
  Phone, 
  CreditCard,
  Camera,
  ShieldCheck,
  UserCircle,
  BadgeCheck,
  AlertCircle,
  ShieldAlert
} from 'lucide-react';

const DriverProfile: React.FC = () => {
  // Corrected 'loading' to 'isLoading' to match your exact Context API contract
  const { user, isLoading } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Safely reading avatar/image fields with fallbacks
  const [profileImg, setProfileImg] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImg(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Uses your exact 'isLoading' property state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3 text-[var(--color-text-muted)]">
        <div className="w-8 h-8 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-bold uppercase tracking-widest">Syncing with Registry...</p>
      </div>
    );
  }

  // Graceful handling if no session or database user profile is active
  if (!user) {
    return (
      <div className="max-w-md mx-auto mt-12 p-6 rounded-2xl bg-white border border-[var(--color-border)] text-center space-y-4">
        <AlertCircle size={40} className="text-amber-500 mx-auto" />
        <h3 className="text-lg font-bold text-[var(--color-primary-dark)]">No Profile Discovered</h3>
        <p className="text-sm text-[var(--color-text-muted)]">
          We couldn't fetch any active credentials linked to this session. Please log in again or contact Transit Operations.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto animate-in fade-in duration-300">
      
      {/* ─── HEADER SECTION ─── */}
      <header className="mb-10">
        <div className="flex items-center gap-2 text-[var(--color-primary)] mb-1">
          <UserCircle size={16} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Driver Registry Network</span>
        </div>
        <h2 className="text-3xl font-black tracking-tight text-[var(--color-primary-dark)] sm:text-4xl">
          My Profile
        </h2>
        <p className="text-xs sm:text-sm text-[var(--color-text-muted)] mt-1.5 font-medium">
          Verified personnel data nodes, active fleet asset configurations, and operational history.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ─── LEFT PANEL: AVATAR CARD ─── */}
        <div className="lg:col-span-4">
          
          {/* Identity Card */}
          <div className="p-8 rounded-2xl bg-white border border-[var(--color-border)] shadow-sm flex flex-col items-center text-center relative group">
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageChange} 
              accept="image/*" 
              className="hidden" 
            />

            <div className="relative mb-4">
              <div className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center border-4 border-[var(--color-bg-soft)] bg-[var(--color-primary)] shadow-md transition-transform duration-300 group-hover:scale-102">
                {profileImg ? (
                  <img src={profileImg} alt="Driver avatar" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-3xl font-black text-white tracking-tighter">
                    {(user.full_name || user.email || 'D').charAt(0).toUpperCase()}
                  </span>
                )}
              </div>

              <button 
                onClick={triggerFileInput}
                className="absolute bottom-0 right-0 p-2 bg-white rounded-full border border-[var(--color-border)] text-[var(--color-primary)] shadow-sm hover:bg-[var(--color-primary)] hover:text-white transition-colors"
                title="Update portrait"
              >
                <Camera size={14} />
              </button>
            </div>

            <div className="space-y-1">
              <h3 className="font-extrabold text-lg text-[var(--color-primary-dark)] tracking-tight leading-tight">
                {user.full_name || 'Unnamed Personnel'}
              </h3>
              <p className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
                {user.role || 'Transit Specialist'}
              </p>
            </div>
            
            <div className="mt-6 w-full pt-4 border-t border-[var(--color-border)] flex justify-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-[var(--color-secondary-light)] text-[var(--color-primary-dark)] tracking-wide">
                <BadgeCheck size={12} className="text-[var(--color-primary)]" />
                System Status: Active
              </span>
            </div>
          </div>

        </div>

        {/* ─── RIGHT PANEL: DATABASE INPUTS ─── */}
        <div className="lg:col-span-8">
          
          {/* Core Credentials Form */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[var(--color-border)] shadow-sm">
            <div className="flex items-center gap-2 mb-6 text-[var(--color-primary-dark)] border-b border-[var(--color-border)] pb-4">
              <ShieldCheck size={16} className="text-[var(--color-primary)]" />
              <h3 className="font-bold text-xs uppercase tracking-wider">Database Security Matrix</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <DatabaseField 
                label="Legal Identity Name" 
                value={user.full_name} 
                icon={<User size={14} />} 
              />
              <DatabaseField 
                label="Permit / CDL Serial" 
                value={user.license_number} 
                icon={<CreditCard size={14} />} 
              />
              <DatabaseField 
                label="Network Email Destination" 
                value={user.email} 
                icon={<Mail size={14} />} 
              />
              <DatabaseField 
                label="Mobile Contact Connection" 
                value={user.phone} 
                icon={<Phone size={14} />} 
              />
            </div>

            <div className="mt-6 p-3.5 rounded-xl bg-[var(--color-bg-soft)] border border-[var(--color-border)] flex gap-2 items-start">
              <ShieldAlert size={16} className="text-[var(--color-primary)] shrink-0 mt-0.5" />
              <p className="text-[11px] text-[var(--color-text-muted)] leading-normal font-medium">
                <strong className="text-[var(--color-primary-dark)]">Immutable Registry Rule:</strong> Core system indexes are sync-locked to HR and campus telemetry data pools. Contact the Campus Transit Administration board directly to deploy modifications.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

interface DatabaseFieldProps {
  label: string;
  value: string | undefined;
  icon: React.ReactNode;
}

function DatabaseField({ label, value, icon }: DatabaseFieldProps) {
  return (
    <div className="space-y-1">
      <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--color-text-muted)] ml-0.5">
        {label}
      </label>
      <div className="flex items-center gap-2.5 px-3.5 py-3 rounded-xl bg-[var(--color-bg-soft)] border border-[var(--color-border)] text-xs font-bold text-[var(--color-primary-dark)] transition-colors hover:border-[var(--color-primary)]">
        <span className="text-[var(--color-primary)] shrink-0">{icon}</span>
        <span className="truncate">{value || <span className="text-[var(--color-text-muted)] font-normal italic">Unset in database</span>}</span>
      </div>
    </div>
  );
}

export default DriverProfile;