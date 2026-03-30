import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

// Components
import Navbar from './components/Navbar';
import LibraryPortal from './components/LibraryPortal';
import NewPatientHero from './components/NewPatientHero';
import NewPatientStack from './components/NewPatientStack';
import EmergencyHero from './components/EmergencyHero';
import EmergencyStack from './components/EmergencyStack';
import ImplantsHero from './components/ImplantsHero';
import TemplateStack from './components/TemplateStack'; // Character Cards for Implants
import CosmeticHero from './components/CosmeticHero';
import CosmeticStack from './components/CosmeticStack';
import MatrixFooter from './components/MatrixFooter';
import DoodleOverlay from './components/DoodleOverlay';
import EdgeGlow from './components/EdgeGlow';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function PageWrapper({ children }) {
  return (
    <div className="animate-fade-in origin-top">
      {children}
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <main className="relative w-full min-h-screen bg-obsidian text-ghost selection:bg-plasma-pink selection:text-obsidian overflow-x-hidden">
        <EdgeGlow />
        <DoodleOverlay />
        <Navbar />
        
        <Routes>
          <Route path="/" element={
            <PageWrapper>
              <LibraryPortal />
            </PageWrapper>
          } />
          
          <Route path="/new-patient-campaigns" element={
            <PageWrapper>
              <NewPatientHero />
              <NewPatientStack />
              <MatrixFooter />
            </PageWrapper>
          } />

          <Route path="/emergency-conversion" element={
            <PageWrapper>
              <EmergencyHero />
              <EmergencyStack />
              <MatrixFooter />
            </PageWrapper>
          } />

          <Route path="/dental-implants" element={
            <PageWrapper>
              <ImplantsHero />
              <TemplateStack />
              <MatrixFooter />
            </PageWrapper>
          } />

          <Route path="/smile-transformation" element={
            <PageWrapper>
              <CosmeticHero />
              <CosmeticStack />
              <MatrixFooter />
            </PageWrapper>
          } />
        </Routes>


      </main>
    </Router>
  );
}

export default App;
