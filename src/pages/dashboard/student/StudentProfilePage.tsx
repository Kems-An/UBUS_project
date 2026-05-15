import { useRef, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { 
  User, 
  Mail, 
  Phone, 
  Fingerprint, 
  BadgeCheck,
  ShieldCheck,
  GraduationCap,
  UserCircle,
  Camera
} from 'lucide-react';

export default function StudentProfilePage() {
  const { user } = useAuth();

  const containerStyle = {
    background: 'var(--color-bg-soft)',
    border: '1.5px solid var(--color-border)',
    color: 'var(--color-text)',
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileImg, setProfileImg] = useState<string | null>(null);

  // Function to handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImg(reader.result as string);
        // Here you would typically upload the file to your backend/Firebase
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="p-8 lg:p-10 max-w-4xl mx-auto animate-in fade-in duration-500">
      <header className="mb-10">
        <div className="flex items-center gap-2 text-[var(--color-primary)] mb-2">
            <UserCircle size={20} />
            <span className="text-xs font-bold uppercase tracking-widest">Student Identity</span>
        </div>
        <h2 className="text-4xl font-extrabold tracking-tight text-[var(--color-primary-dark)]">
          My Profile
        </h2>
        <p className="text-sm text-[var(--color-text-muted)] mt-2">
          Official student record and verified university database information.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* ─── UPDATED AVATAR SIDEBAR (WITH UPLOAD) ─── */}
        <div className="md:col-span-4 space-y-5">
          <div className="p-8 rounded-[2rem] bg-white border border-[var(--color-border)] shadow-sm text-center relative overflow-hidden group">
            
            {/* Hidden File Input */}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageChange} 
              accept="image/*" 
              className="hidden" 
            />

            <div className="relative inline-block mb-4">
              {/* Profile Image / Initials Container */}
              <div className="w-28 h-28 rounded-full overflow-hidden flex items-center justify-center border-4 border-[var(--color-secondary-light)] bg-[var(--color-primary)] shadow-lg transition-transform group-hover:scale-105 duration-300">
                {profileImg ? (
                  <img src={profileImg} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-4xl font-bold text-white uppercase">
                    {user?.full_name?.charAt(0)}
                  </span>
                )}
              </div>

              {/* Upload Button Overlay */}
              <button 
                onClick={triggerFileInput}
                className="absolute bottom-0 right-0 p-2 bg-white rounded-full border border-[var(--color-border)] text-[var(--color-primary)] shadow-md hover:bg-[var(--color-primary)] hover:text-white transition-colors duration-200"
                title="Upload Profile Picture"
              >
                <Camera size={18} />
              </button>
            </div>

            <div className="space-y-1">
              <h3 className="font-bold text-xl text-[var(--color-primary-dark)] leading-tight">
                {user?.full_name}
              </h3>
              <p className="text-sm font-medium text-[var(--color-text-muted)]">
                Computer Science Student
              </p>
            </div>
            
            <div className="mt-5 pt-5 border-t border-[var(--color-border)]">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold bg-[var(--color-secondary-light)] text-[var(--color-primary-dark)]">
                <BadgeCheck size={14} />
                Verified Student
              </span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[var(--color-bg-muted)] border border-[var(--color-border)] flex items-center gap-3 text-[var(--color-primary-dark)] transition-all hover:bg-white hover:shadow-sm cursor-default">
            <GraduationCap size={20} className="text-[var(--color-primary)]" />
            <span className="text-sm font-bold tracking-tight">Academic Status: Active</span>
          </div>
        </div>

        {/* ─── DATA SECTION (REDUCED SIZE) ─── */}
        <div className="md:col-span-8">
          <div className="p-6 lg:p-8 rounded-2xl bg-white border border-[var(--color-border)] shadow-sm">
            <div className="flex items-center gap-2 mb-6 text-[var(--color-primary-dark)]">
              <ShieldCheck size={18} />
              <h3 className="font-bold text-sm uppercase tracking-wider">Database Records</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ReadOnlyField 
                label="Full Name" 
                value={user?.full_name} 
                icon={<User size={14} />} 
                style={containerStyle}
              />
              <ReadOnlyField 
                label="Student ID" 
                value={user?.student_id || 'UBA-2023-4581'} 
                icon={<Fingerprint size={14} />} 
                style={containerStyle}
              />
              <ReadOnlyField 
                label="Email Address" 
                value={user?.email} 
                icon={<Mail size={14} />} 
                style={containerStyle}
              />
              <ReadOnlyField 
                label="Phone Number" 
                value={user?.phone || '+237 670 000 000'} 
                icon={<Phone size={14} />} 
                style={containerStyle}
              />
            </div>

            <div className="mt-8 p-4 rounded-xl border-l-4 border-[var(--color-primary)] bg-[var(--color-bg-soft)]">
              <p className="text-[11px] text-[var(--color-text-muted)] leading-relaxed font-medium">
                Information is pulled from the university registrar. For modifications, please contact the administrative office.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Compact Read-Only Field Component */
function ReadOnlyField({ label, value, icon, style }: any) {
  return (
    <div>
      <label className="block text-[10px] font-bold uppercase tracking-wider mb-1.5 text-[var(--color-text-muted)] ml-1">
        {label}
      </label>
      <div 
        style={style}
        className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold opacity-90 transition-all hover:border-[var(--color-primary)]"
      >
        <span className="text-[var(--color-primary)]">{icon}</span>
        {value || 'Not available'}
      </div>
    </div>
  );
}