import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AuthProvider } from './context/AuthContext'

// ── Load Google Maps ONCE at app startup ──
// This prevents the white screen caused by multiple useJsApiLoader
// instances conflicting when navigating between pages.
const GMAPS_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
if (GMAPS_KEY && !document.getElementById('google-maps-script')) {
  const script = document.createElement('script');
  script.id  = 'google-maps-script';
  script.src = `https://maps.googleapis.com/maps/api/js?key=${GMAPS_KEY}&libraries=places`;
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
}

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
