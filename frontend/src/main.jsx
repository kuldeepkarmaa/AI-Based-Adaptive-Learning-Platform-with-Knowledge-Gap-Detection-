import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google' // 
import './index.css'
import App from './App.jsx'


const GOOGLE_CLIENT_ID = "688028947460-l9bq72mnpqnv499dbjo0kl30p37j696a.apps.googleusercontent.com";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </StrictMode>,
)