import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AuthProvider } from './context/AuthContext'   // ADD THIS

createRoot(document.getElementById('root')!).render(
  
    <AuthProvider>        {/* ADD THIS */}
      <App />
    </AuthProvider>,      
)