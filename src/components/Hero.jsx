import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ReactPlayer from 'react-player/youtube';

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
      {/* Background Vertical Video loop (New YouTube URL via ReactPlayer) */}
      <div className="absolute inset-0 z-0 flex items-center justify-center bg-transparent pointer-events-none">
        <div className="relative w-full h-full max-w-[600px] aspect-[9/16] opacity-30 mix-blend-screen overflow-hidden">
          <div className="absolute inset-0 w-full h-full scale-[1.3]">
            <ReactPlayer
              url="https://www.youtube.com/watch?v=Qh5ddCxXEhU"
              playing={true}
              loop={true}
              muted={true}
              playsinline={true}
              controls={false}
              width="100%"
              height="100%"
              config={{
                youtube: {
                  playerVars: { showinfo: 0, modestbranding: 1, rel: 0, disablekb: 1 }
                }
              }}
            />
          </div>
           <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black pointer-events-none"></div>
           <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50 pointer-events-none"></div>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Massive Split-Text Headline */}
        <h1 className="flex flex-col items-center text-[18vw] md:text-[8rem] lg:text-[10rem] font-serif italic text-ghost leading-[0.8] tracking-tight [perspective:1000px]">
          <span className="block overflow-hidden pb-4"><span className="hero-line block drop-shadow-[0_0_30px_rgba(255,0,127,0.4)]">Smile</span></span>
          <span className="block overflow-hidden"><span className="hero-line block text-plasma-purple drop-shadow-[0_0_40px_rgba(157,78,221,0.6)]">Squad</span></span>
        </h1>

        <div className="hero-fade mt-12 max-w-xl text-center px-4">
          <p className="text-xs md:text-sm font-mono text-ghost/70 leading-relaxed uppercase tracking-widest">
            The Next Evolution of Dental Marketing.
          </p>
          <div className="mt-8 h-[1px] w-24 bg-gradient-to-r from-transparent via-plasma-pink to-transparent mx-auto"></div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="hero-fade absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-70">
        <span className="text-[10px] font-mono text-plasma-blue uppercase tracking-[0.3em] font-bold shadow-plasma-blue">Initialize Protocol</span>
        <div className="w-[1px] h-16 bg-white/10 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full bg-plasma-blue transform -translate-y-full animate-[scrolldown_2s_ease-in-out_infinite] shadow-[0_0_10px_#00F0FF]"></div>
        </div>
      </div>
    </section>
  );
}
