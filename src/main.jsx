import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId="193443061162-5u5sla2gcfvpf6ruiod7pf5midu5g383.apps.googleusercontent.com">
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </GoogleOAuthProvider>;
    </BrowserRouter>
  </StrictMode>
)
