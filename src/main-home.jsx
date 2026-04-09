import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Navbar from './components/Navbar'
import LibraryPortal from './components/LibraryPortal'
import EdgeGlow from './components/EdgeGlow'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <main className="relative w-full min-h-screen bg-obsidian overflow-x-hidden text-ghost selection:bg-plasma-pink selection:text-obsidian">
      <EdgeGlow />
      <div className="relative z-10">
        <Navbar />
        <LibraryPortal />
      </div>
    </main>
  </StrictMode>
)
