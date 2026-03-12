import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Features() {
  const containerRef = useRef(null);
  const [typedText, setTypedText] = useState('');
  
  const benefits = [
    "Increase Implant Leads",
    "Explain Complex Procedures",
    "Build Patient Trust",
    "Automate Consultations",
    "Pre-Qualify Patients"
  ];
  
  const scriptSnippet = "INITIALIZING MONSTER PROTOCOL...\nLOADING OCLUSION DATA...\nTARGET: PATIENT ANXIETY REDUCTION.\nEXECUTE CAMPAIGN: ZEEK_FAQ_01.";

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Diagnostic Shuffler
      gsap.to('.benefit-item', {
        yPercent: -100 * (benefits.length - 1),
        ease: "none",
        duration: 15, // Slowed down for smoother, premium feel
        repeat: -1,
        yoyo: true,
      });

      let i = 0;
      const typeInterval = setInterval(() => {
        setTypedText(scriptSnippet.slice(0, i));
        i++;
        if (i > scriptSnippet.length) i = 0; 
      }, 100);

      // Cursor Protocol Visualizer
      gsap.to('.demo-cursor', {
        x: 180,
        y: 80,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });
      
      gsap.to('.demo-button', {
        scale: 1.05,
        backgroundColor: '#ffffff',
        color: '#000000',
        duration: 0.3,
        repeat: -1,
        yoyo: true,
        repeatDelay: 2.2
      });

      return () => clearInterval(typeInterval);
    }, containerRef);
    
    return () => ctx.revert();
  }, [benefits.length]);

  return (
    <section ref={containerRef} className="relative w-full py-32 px-6 flex flex-col items-center min-h-screen z-10 theme-section border-t border-white/5" data-theme="bg-neutral-950">
      
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Card 1: Diagnostic Shuffler */}
        <div className="relative bg-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-[2rem] p-10 h-[450px] flex flex-col overflow-hidden group hover:bg-white/[0.04] transition-colors duration-500">
          <div className="flex justify-between items-start mb-8">
            <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-white/50">Diagnostic Shuffler</h3>
            <span className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-white transition-colors duration-500"></span>
          </div>
          <div className="relative flex-1 overflow-hidden px-2" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)' }}>
             <div className="absolute top-1/2 -translate-y-1/2 w-full">
               {benefits.map((benefit, j) => (
                 <div key={j} className="benefit-item text-3xl md:text-5xl font-sans tracking-tight py-4 text-white/40 hover:text-white transition-colors cursor-default">
                    {benefit}
                 </div>
               ))}
             </div>
          </div>
        </div>

        {/* Card 2: Telemetry Typewriter */}
        <div className="relative bg-black/40 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-10 h-[450px] flex flex-col font-mono text-xs md:text-sm shadow-2xl group hover:border-white/20 transition-colors duration-500">
          <div className="flex justify-between items-start mb-8">
            <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-white/50 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
              Telemetry Logs
            </h3>
          </div>
          <div className="flex-1 bg-black/60 rounded-xl p-6 border border-white/5 overflow-hidden text-white/80 leading-relaxed tracking-wider whitespace-pre-wrap">
            {typedText}
            <span className="w-2 h-4 inline-block bg-white/50 animate-pulse ml-1 align-middle"></span>
          </div>
        </div>

        {/* Card 3: Cursor Protocol */}
        <div className="relative bg-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-[2rem] p-10 h-[450px] flex flex-col items-center justify-center group hover:bg-white/[0.04] transition-colors duration-500">
          <h3 className="absolute top-10 left-10 text-sm font-mono uppercase tracking-[0.2em] text-white/50">Cursor Protocol</h3>
          
          <div className="relative w-full h-full flex items-center justify-center mt-8">
            {/* Minimalist Calendar UI */}
            <div className="w-64 h-56 bg-white/5 border border-white/10 rounded-2xl flex flex-col p-5 shadow-2xl relative backdrop-blur-sm">
              <div className="w-1/3 h-2 bg-white/20 rounded-full mb-6"></div>
              <div className="grid grid-cols-4 gap-3 flex-1">
                 {[...Array(12)].map((_, i) => (
                   <div key={i} className={`rounded-md ${i === 6 ? 'bg-white/10 demo-button' : 'bg-white/5'} transition-colors duration-300`}></div>
                 ))}
              </div>
              
              {/* Elegant Cursor */}
              <div className="demo-cursor absolute top-0 left-0 w-8 h-8 z-20 transition-transform" style={{ transform: 'translate(20px, 20px)' }}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-2xl">
                  <path d="M4 4L11.3813 21.0825C11.6669 21.7428 12.6074 21.6565 12.7844 20.9535L14.7156 13.2844L22.3847 11.3532C23.0877 11.1762 23.174 10.2357 22.5137 9.9501L5.43122 2.56885C4.78917 2.29124 4.09848 2.97825 4.36647 3.63604L4 4Z" fill="white" stroke="rgba(0,0,0,0.1)" strokeWidth="0.5"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
