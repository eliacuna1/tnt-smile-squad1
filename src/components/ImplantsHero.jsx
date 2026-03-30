import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function ImplantsHero() {
  const containerRef = useRef(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-line', 
        { y: 80, opacity: 0, rotateX: -20 }, 
        { y: 0, opacity: 1, rotateX: 0, duration: 2.2, ease: "power4.out", stagger: 0.15 }
      );
      
      gsap.fromTo('.hero-fade',
        { opacity: 0 },
        { opacity: 1, duration: 1.8, ease: "power2.out", delay: 1.2 }
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  const ScribbleUnderline = () => (
    <svg className="absolute -bottom-6 -left-4 w-[110%] h-12 pointer-events-none overflow-visible opacity-40 mix-blend-overlay" viewBox="0 0 400 30">
       <path className="scribble-path" d="M10,20 Q100,5 200,20 Q300,35 390,15" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[85svh] flex flex-col justify-center items-center text-center px-6 z-10 overflow-hidden bg-black"
    >
      {/* Cinematic Background Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-transparent to-black/60 opacity-90"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05)_0%,transparent_80%)] opacity-40"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center select-none">
          <h1 className="font-serif text-[18vw] md:text-[14vw] lg:text-[10vw] leading-[0.85] tracking-tighter text-white mb-16 [perspective:1000px]">
            <span className="hero-line block">DENTAL</span>
            <span className="relative inline-block mt-4">
              <span className="hero-line block italic font-light opacity-60">
                 Implants
              </span>
              <ScribbleUnderline />
            </span>
          </h1>

        <div className="hero-fade max-w-2xl text-center px-4">
          <p className="text-base md:text-xl font-inter text-white/50 leading-relaxed font-light tracking-[0.1em] uppercase">
             Strategic Intel for High-Value Patient Acquisition
          </p>
          <div className="mt-12 h-[1px] w-32 bg-white/10 mx-auto"></div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hero-fade absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-20">
        <div className="relative flex flex-col items-center animate-bounce-slow">
          <svg width="24" height="60" viewBox="0 0 24 60" className="relative z-10">
            <path d="M12 0V50M12 50L4 42M12 50L20 42" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="opacity-20" />
          </svg>
        </div>
      </div>
    </section>
  );
}
