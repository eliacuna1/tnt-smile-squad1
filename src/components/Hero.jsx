import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ReactPlayer from 'react-player';

export default function Hero() {
  const containerRef = useRef(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split text line animation using power4.out
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
      id="hero"
      className="relative min-h-[100svh] flex flex-col justify-center items-center text-center px-6 z-10 overflow-hidden"
    >
      {/* Full-Screen Background Video for Desktop/Mobile Crop */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        {/* The Video Layer - Clean and Visible */}
        <div className="video-background-cover-16-9 z-0">
          <iframe 
            src={`https://www.youtube.com/embed/Qh5ddCxXEhU?autoplay=1&mute=1&loop=1&playlist=Qh5ddCxXEhU&controls=0&modestbranding=1&playsinline=1&rel=0&enablejsapi=1`}
            className="w-full h-full border-none pointer-events-none opacity-100 transition-opacity duration-1000"
            allow="accelerometer; autoplay; encrypted-media; gyroscope;"
          ></iframe>
        </div>
        {/* Very subtle vignette for text legibility */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-obsidian via-black/20 to-obsidian/40 opacity-70"></div>
      </div>






      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Massive Liquid Glass Headline */}
        <h1 className="flex flex-col items-center text-[18vw] md:text-[8.5rem] lg:text-[11rem] font-good-castyll leading-[0.6] tracking-tight [perspective:1000px] py-10">
          <span className="block px-20 -mx-20"><span className="hero-line block px-10 glass-text">Smile</span></span>
          <span className="block px-20 -mx-20"><span className="hero-line block px-10 glass-text-purple">Squad</span></span>
        </h1>


        <div className="hero-fade mt-1 max-w-xl text-center px-4">
          <p className="text-sm md:text-base font-inter text-ghost/90 leading-relaxed tracking-wide italic">
            Where the right message meets the right patient.
          </p>
          <div className="mt-8 h-[1px] w-24 bg-gradient-to-r from-transparent via-plasma-pink to-transparent mx-auto"></div>
        </div>
      </div>
      
      {/* Magical Scroll Cue */}
      <div className="hero-fade absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none">
        <div className="relative flex flex-col items-center animate-magical-float">
          {/* Multi-color Bloom Effect */}
          <div className="absolute inset-0 w-32 h-32 bg-gradient-to-tr from-plasma-blue via-plasma-purple to-plasma-pink opacity-20 blur-3xl rounded-full -translate-y-1/2 -translate-x-1/2 left-1/2 top-1/2 animate-pulse"></div>
          <div className="absolute inset-0 w-40 h-40 bg-gradient-to-br from-plasma-green via-plasma-blue to-plasma-purple opacity-10 blur-[40px] rounded-full -translate-y-1/2 -translate-x-1/2 left-1/2 top-1/2 animate-pulse delay-700"></div>
          
          {/* Thin Light Trail Arrow */}
          <svg width="24" height="80" viewBox="0 0 24 80" className="relative z-10 filter drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]">
            <path 
              d="M12 0V70M12 70L4 62M12 70L20 62" 
              stroke="white" 
              strokeWidth="0.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="opacity-60"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
