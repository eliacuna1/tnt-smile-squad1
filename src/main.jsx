import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import DoodleOverlay from './components/DoodleOverlay'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DoodleOverlay />
    <App />
  </StrictMode>,
)
