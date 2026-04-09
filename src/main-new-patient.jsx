import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Navbar from './components/Navbar'
import NewPatientStack from './components/NewPatientStack'
import MatrixFooter from './components/MatrixFooter'
import EdgeGlow from './components/EdgeGlow'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <main className="relative w-full min-h-screen bg-obsidian text-ghost selection:bg-plasma-pink selection:text-obsidian overflow-x-hidden">
      <EdgeGlow />
      <div className="relative z-10">
        <Navbar />
        <NewPatientStack />
        <MatrixFooter />
      </div>
    </main>
  </StrictMode>
)
