import { useState, useRef } from 'react';
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
import Footer from './components/Footer';
import LibraryPortal from './components/LibraryPortal';
import NewPatientHero from './components/NewPatientHero';
import NewPatientStack from './components/NewPatientStack';

function App() {
  const [currentView, setCurrentView] = useState('LIBRARY'); // 'LIBRARY', 'SMILE_SQUAD', 'NEW_PATIENT_CAMPAIGNS'
  const appRef = useRef(null);

  const resetToLibrary = () => {
    window.scrollTo(0, 0);
    setCurrentView('LIBRARY');
  };

  if (currentView === 'LIBRARY') {
    return (
      <main ref={appRef} className="relative w-full min-h-screen bg-obsidian text-ghost selection:bg-plasma-pink selection:text-obsidian overflow-x-hidden">
        <NoiseOverlay />
        <Navbar currentView={currentView} />
        <LibraryPortal 
          onLaunchCampaign={() => setCurrentView('SMILE_SQUAD')} 
          onNewPatientCampaigns={() => setCurrentView('NEW_PATIENT_CAMPAIGNS')}
        />
      </main>
    )
  }

  return (
    <main ref={appRef} className="relative w-full min-h-screen bg-obsidian text-ghost selection:bg-plasma-pink selection:text-obsidian overflow-x-hidden animate-fade-in">
      <NoiseOverlay />
      <Navbar onBack={resetToLibrary} currentView={currentView} />
      
      {currentView === 'SMILE_SQUAD' && (
        <>
          <Hero />
          <TemplateStack />
          <MatrixFooter />
        </>
      )}

      {currentView === 'NEW_PATIENT_CAMPAIGNS' && (
        <>
          <NewPatientHero />
          <NewPatientStack />
        </>
      )}
      
      <Footer />
    </main>
  );
}

export default App;
