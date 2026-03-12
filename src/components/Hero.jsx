import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const containerRef = useRef(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Smooth fade-in and float up for the drinksom aesthetic
      gsap.fromTo('.hero-text', 
        { y: 50, opacity: 0, filter: 'blur(10px)' }, 
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 2, ease: "power2.out", stagger: 0.2 }
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[100svh] flex flex-col justify-center px-12 md:px-24 z-10 theme-section"
      data-theme="bg-neutral-900"
    >
      <div className="max-w-7xl">
        {/* Logo / Brand Intro */}
        <div className="hero-text mb-8 border-l border-white/20 pl-4 py-2">
          <img src="/assets/tnt-logo-final.png" alt="TNT Dental" className="h-10 md:h-14 opacity-90 object-contain rounded-md mix-blend-screen" />
        </div>

        {/* Large atmospheric heading */}
        <h1 className="hero-text text-5xl md:text-8xl lg:text-[7rem] font-sans font-black tracking-[-0.04em] leading-[1] text-white">
          Meet the TNT Dental
          <br />
          <span className="font-serif italic font-normal text-white/70">Smile Squad.</span>
        </h1>

        <div className="hero-text mt-12 max-w-xl">
          <p className="text-lg md:text-xl font-sans opacity-80 leading-relaxed">
            A group of characters bringing common dental struggles to life — helping patients understand their options, feel confident, and take the next step toward care.
          </p>
        </div>
      </div>
      
      {/* Scroll indicator - Monospace */}
      <div className="absolute bottom-12 right-12 flex items-center gap-4 opacity-70">
        <span className="hero-text text-xs font-mono uppercase tracking-[0.2em]">Discover the Squad</span>
        <div className="hero-text w-12 h-[1px] bg-white/30 overflow-hidden relative">
          <div className="absolute top-0 left-0 h-full w-full bg-white transform -translate-x-full animate-[scrollright_2s_ease-in-out_infinite]"></div>
        </div>
      </div>
    </section>
  );
}
