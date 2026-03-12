import { useRef } from 'react';
import '@fontsource/inter/400.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/900.css';
import '@fontsource/space-mono/400.css';
import '@fontsource/space-mono/700.css';

import NoiseOverlay from './components/NoiseOverlay';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TemplateStack from './components/TemplateStack';
import MatrixFooter from './components/MatrixFooter';

function App() {
  const appRef = useRef(null);

  return (
    <main ref={appRef} className="relative w-full min-h-screen bg-obsidian text-ghost selection:bg-plasma-pink selection:text-obsidian overflow-x-hidden">
      <NoiseOverlay />
      <Navbar />
      
      {/* Section A: The Reveal */}
      <Hero />
      
      {/* Section B: The Template Protocol */}
      <TemplateStack />
      
      {/* Section C: The Matrix Footer */}
      <MatrixFooter />
    </main>
  );
}

export default App;
