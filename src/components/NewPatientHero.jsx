import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function NewPatientHero() {
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,240,255,0.1)_0%,transparent_70%)] opacity-50"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center">
        <div className="liquid-glass-wrapper overflow-visible">
          <h1 className="flex flex-col items-center text-[10vw] md:text-[5rem] lg:text-[7rem] font-good-castyll leading-[0.65] tracking-tight mb-8">
            <span className="block px-20 -mx-20">
              <span className="hero-line block px-10 liquid-glass-text">NEW PATIENT</span>
            </span>
            <span className="block px-20 -mx-20">
              <span className="hero-line block px-10 liquid-glass-text liquid-glass-blue">CAMPAIGNS</span>
            </span>
          </h1>
        </div>

        <div className="hero-fade max-w-2xl text-center px-4">
          <p className="text-lg md:text-xl font-inter text-ghost/70 leading-relaxed font-light tracking-wide italic">
            Explore high-converting AI ad templates designed to attract new patients, increase click-through rates, and drive more booked appointments.
          </p>
          <div className="mt-8 h-[1px] w-24 bg-gradient-to-r from-transparent via-plasma-blue to-transparent mx-auto"></div>
        </div>
      </div>
    </section>
  );
}
