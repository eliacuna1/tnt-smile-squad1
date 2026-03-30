import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Navbar from './components/Navbar'
import CosmeticHero from './components/CosmeticHero'
import CosmeticStack from './components/CosmeticStack'
import MatrixFooter from './components/MatrixFooter'
import EdgeGlow from './components/EdgeGlow'
import DoodleOverlay from './components/DoodleOverlay'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <main className="relative w-full min-h-screen bg-obsidian text-ghost selection:bg-plasma-pink selection:text-obsidian overflow-x-hidden">
      <EdgeGlow />
      <DoodleOverlay />
      <div className="relative z-10">
        <Navbar />
        <CosmeticHero />
        <CosmeticStack />
        <MatrixFooter />
      </div>
    </main>
  </StrictMode>
)
