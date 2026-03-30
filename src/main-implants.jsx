import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Navbar from './components/Navbar'
import ImplantsHero from './components/ImplantsHero'
import TemplateStack from './components/TemplateStack'
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
        <ImplantsHero />
        <TemplateStack />
        <MatrixFooter />
      </div>
    </main>
  </StrictMode>
)
