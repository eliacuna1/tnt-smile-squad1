import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Navbar from './components/Navbar'
import EmergencyHero from './components/EmergencyHero'
import EmergencyStack from './components/EmergencyStack'
import MatrixFooter from './components/MatrixFooter'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <main className="relative w-full min-h-screen bg-obsidian text-ghost selection:bg-plasma-pink selection:text-obsidian overflow-x-hidden">
      <Navbar />
      <EmergencyHero />
      <EmergencyStack />
      <MatrixFooter />
    </main>
  </StrictMode>
)
