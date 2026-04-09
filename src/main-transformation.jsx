import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Navbar from './components/Navbar'
import TransformationStack from './components/TransformationStack'
import MatrixFooter from './components/MatrixFooter'
import EdgeGlow from './components/EdgeGlow'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <main className="relative w-full min-h-screen bg-obsidian text-ghost selection:bg-plasma-pink selection:text-obsidian overflow-x-hidden">
      <EdgeGlow />
      <div className="relative z-10">
        <Navbar />
        <TransformationStack />
        <MatrixFooter />
      </div>
    </main>
  </StrictMode>
)
