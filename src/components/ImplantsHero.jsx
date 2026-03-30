import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function ImplantsHero() {
  const containerRef = useRef(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-line', 
        { y: 100, opacity: 0, rotationX: -20 }, 
        { y: 0, opacity: 1, rotationX: 0, duration: 2.5, ease: "power4.out", stagger: 0.15 }
      );
      
      gsap.fromTo('.hero-fade',
        { opacity: 0 },
        { opacity: 1, duration: 2, ease: "power2.out", delay: 1 }
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[70svh] flex flex-col justify-center items-center text-center px-6 z-10 overflow-hidden"
    >
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-obsidian via-black/20 to-obsidian/40 opacity-70"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,133,0,0.1)_0%,transparent_70%)] opacity-50"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center">
        <div className="liquid-glass-wrapper overflow-visible">
          <h1 className="flex flex-col items-center text-[12vw] md:text-[6.5rem] lg:text-[8.5rem] font-good-castyll leading-[0.65] tracking-tight mb-8">
            <span className="block px-20 -mx-20">
              <span className="hero-line block px-10 liquid-glass-text">DENTAL</span>
            </span>
            <span className="block px-20 -mx-20">
              <span className="hero-line block px-10 liquid-glass-text liquid-glass-orange">IMPLANTS</span>
            </span>
          </h1>
        </div>

        <div className="hero-fade max-w-2xl text-center px-4">
          <p className="text-lg md:text-xl font-inter text-ghost/70 leading-relaxed font-light tracking-wide italic">
             Premium AI campaigns focused on high-value procedures. Designed to educate, build trust, and convert prospects into qualified consultations.
          </p>
          <div className="mt-8 h-[1px] w-24 bg-gradient-to-r from-transparent via-plasma-orange to-transparent mx-auto"></div>
        </div>
      </div>

      <div className="hero-fade absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-20">
        <div className="relative flex flex-col items-center animate-magical-float">
          <div className="absolute inset-0 w-32 h-32 bg-gradient-to-tr from-plasma-orange via-plasma-pink to-plasma-purple opacity-20 blur-3xl rounded-full -translate-y-1/2 -translate-x-1/2 left-1/2 top-1/2 animate-pulse"></div>
          <svg width="24" height="80" viewBox="0 0 24 80" className="relative z-10 filter drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]">
            <path d="M12 0V70M12 70L4 62M12 70L20 62" stroke="white" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-60" />
          </svg>
        </div>
      </div>

      <svg className="absolute w-0 h-0 pointer-events-none opacity-0 invisible" aria-hidden="true">
        <defs>
          <filter id="liquid-refraction" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="4" result="warp-noise" />
            <feDisplacementMap in="SourceGraphic" in2="warp-noise" scale="12" xChannelSelector="R" yChannelSelector="G" result="refracted" />
            <feSpecularLighting in="refracted" surfaceScale="5" specularConstant="1.5" specularExponent="45" lighting-color="#ffffff" result="rim-shine">
              <feDistantLight azimuth="225" elevation="60" />
            </feSpecularLighting>
            <feComposite in="rim-shine" in2="refracted" operator="in" result="rim-clipping" />
            <feComposite in="refracted" in2="rim-clipping" operator="arithmetic" k1="0" k2="1" k3="0.8" k4="0" />
          </filter>
        </defs>
      </svg>
    </section>
  );
}
