import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '@fontsource/inter/400.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/900.css';
import '@fontsource/space-mono/400.css';
import '@fontsource/space-mono/700.css';

import NoiseOverlay from './components/NoiseOverlay';
import Hero from './components/Hero';
import CharacterAnchor from './components/CharacterAnchor';
import Features from './components/Features';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [activeTheme, setActiveTheme] = useState('bg-orange-800');
  const appRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      ScrollTrigger.refresh();
      
      // Smooth visual transitions between thematic sections
      const sections = gsap.utils.toArray('.theme-section');
      sections.forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          start: 'top 50%',
          end: 'bottom 50%',
          onEnter: () => setActiveTheme(section.dataset.theme),
          onEnterBack: () => setActiveTheme(section.dataset.theme),
        });
      });
      
    }, appRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <main ref={appRef} className="relative w-full text-white selection:bg-white selection:text-black">
      {/* Dynamic Background Mesh */}
      <div className={`mesh-bg ${activeTheme} transition-colors duration-[2s] ease-in-out`}></div>
      <NoiseOverlay />

      <Hero />
      <CharacterAnchor />
      <Features />
      
      {/* Footer / CTA section */}
      <section className="relative py-32 px-6 flex flex-col items-center justify-center text-center z-10 theme-section border-t border-white/5" data-theme="bg-neutral-900">
        <div className="max-w-4xl mx-auto text-left md:text-center">
          <p className="text-sm font-mono uppercase tracking-[0.2em] text-white/50 mb-6 border-b border-white/10 inline-block pb-2">Final Page</p>
          <h2 className="text-4xl md:text-6xl font-sans font-bold tracking-tight mb-10 leading-[1.1]">
            Meet the TNT Dental <br className="hidden md:block"/> <span className="font-serif italic text-white/70">Smile Squad</span>
          </h2>
          <div className="space-y-6 text-lg md:text-xl font-sans opacity-80 leading-relaxed max-w-3xl mx-auto">
            <p>
              Zeek, Olivia, Molar, and Toothy each represent a real patient concern that many dental practices encounter every day. Together they turn complex procedures and emotional barriers into simple, relatable stories that help patients understand their options and feel confident taking the next step toward care.
            </p>
            <p>
              Through engaging characters and clear messaging, the Smile Squad helps practices educate patients, build trust, and make dental treatment easier to understand.
            </p>
          </div>
          <button className="mt-16 px-10 py-5 bg-white text-black rounded-full font-sans font-bold text-sm tracking-widest uppercase hover:bg-white/90 transition-all duration-300">
            Deploy Campaign &rarr;
          </button>
        </div>
      </section>
    </main>
  );
}

export default App;
