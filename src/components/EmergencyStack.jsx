import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Play, X, ArrowUpRight } from 'lucide-react';

const emergencyCampaign = {
  id: 'emergency-visits',
  title: 'EMERGENCY\nVISITS',
  youtubeId: '65KyQJboVo8',
  description: "Emergency-driven campaigns built to capture high-intent patients in urgent moments. Designed to stop the scroll, drive immediate action, and convert searches into real calls and booked appointments.",
  scribbles: [
    { text: 'fresh', pos: 'top-[-40px] left-10', style: 'underline', depth: 0.1 },
    { text: 'city', pos: 'top-[10%] left-[-80px]', style: 'default', depth: 0.2 },
    { text: 'culture', pos: 'top-[-50px] right-20', style: 'default', depth: 0.15 },
    { text: 'diversity', pos: 'bottom-[20%] right-[-100px]', style: 'italic-dim', depth: 0.3 },
    { text: 'hiphop', pos: 'bottom-[-60px] left-1/2 -translate-x-1/2', style: 'circle', depth: 0.4 }
  ]
};

export default function EmergencyStack() {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-designer', 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.4, ease: 'power4.out' }
      );

      gsap.fromTo('.campaign-card-container',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out', delay: 0.4 }
      );

      // Parallax Scribbles
      gsap.to('.parallax-scribble', {
        y: (i, target) => {
          const depth = target.getAttribute('data-depth') || 0.2;
          return -150 * depth;
        },
        ease: "none",
        scrollTrigger: {
          trigger: '.campaign-card-container',
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full bg-black min-h-screen pt-40 pb-60 px-8 md:px-16 overflow-x-hidden">
      {/* Emergency Campaign Header (Designer Serif) */}
      <div className="max-w-6xl mx-auto mb-40 text-center px-6">
         <h1 className="hero-designer font-serif text-[18vw] md:text-[14vw] lg:text-[8vw] leading-[0.85] tracking-tighter text-white mb-10">
            EMERGENCY <br/>
            <span className="italic font-light opacity-60">Visits</span>
         </h1>
         <p className="text-white/80 text-sm md:text-xl font-light leading-relaxed max-w-3xl mx-auto">
            High-converting emergency campaigns designed to capture high-intent patients and drive immediate calls and bookings.
         </p>
      </div>

      {/* Main Wide Video Section */}
      <div className="campaign-card-container max-w-6xl mx-auto relative group flex flex-col items-center">
        
        {/* Parallax Scribbles Layer */}
        {emergencyCampaign.scribbles.map((sc, i) => (
          <div 
            key={i}
            data-depth={sc.depth}
            className={`parallax-scribble absolute z-20 ${sc.pos} pointer-events-none opacity-20 group-hover:opacity-70 transition-opacity duration-1000 md:block hidden`}
          >
            <span className={`font-['Caveat'] text-white whitespace-nowrap
              ${sc.style === 'circle' ? 'border-2 border-white/40 rounded-[50%] px-8 py-4 rotate-[-5deg] text-2xl' : ''}
              ${sc.style === 'underline' ? 'border-b border-white/50 px-2' : ''}
              ${sc.style === 'italic-dim' ? 'italic opacity-40 text-base' : ''}
              text-lg lg:text-2xl
            `}>
              {sc.text}
              {sc.text === 'diversity' && <span className="ml-3">↓</span>}
            </span>
          </div>
        ))}

        {/* 16:9 Wide Poster Card */}
        <div
          className="relative w-full aspect-video rounded-[12px] md:rounded-[32px] overflow-hidden bg-neutral-900 cursor-pointer transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] border border-white/0 hover:border-white/10 z-10 shadow-2xl"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => setSelectedVideo(emergencyCampaign)}
        >
          {/* Visual Layer */}
          <div className="absolute inset-0 w-full h-full">
            {isHovered ? (
              <div className="w-full h-full relative">
                <iframe
                  src={`https://www.youtube.com/embed/${emergencyCampaign.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${emergencyCampaign.youtubeId}&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&playsinline=1`}
                  className="w-full h-full pointer-events-none scale-105 md:scale-[1.08]"
                  allow="autoplay; encrypted-media"
                  frameBorder="0"
                />
                <div className="absolute inset-0 bg-black/10"></div>
              </div>
            ) : (
              <div className="w-full h-full group-hover:scale-105 transition-transform duration-[1.5s]">
                <img
                  src={`https://img.youtube.com/vi/${emergencyCampaign.youtubeId}/maxresdefault.jpg`}
                  alt={emergencyCampaign.title.replace('\n', ' ')}
                  className="w-full h-full object-cover grayscale saturate-0 opacity-40 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/20 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-white/10 flex items-center justify-center backdrop-blur-md bg-white/5 group-hover:scale-110 transition-all duration-1000">
                      <Play size={28} fill="white" className="text-white ml-2 opacity-40 group-hover:opacity-100 transition-opacity" />
                   </div>
                </div>
              </div>
            )}
          </div>

          {/* Designer Typography Layer */}
          <div className="absolute inset-0 flex flex-col justify-end p-10 md:p-16 z-10 pointer-events-none">
             <div className="transform transition-all duration-1000 group-hover:-translate-y-4">
                <h2 className="font-serif leading-[0.8] tracking-tighter text-white whitespace-pre-line break-words
                   text-[10vw] sm:text-[6vw] lg:text-[4vw]
                ">
                  {emergencyCampaign.title}
                </h2>
                <div className="flex items-center gap-4 mt-8 opacity-0 group-hover:opacity-100 transition-all duration-1000 translate-y-4 group-hover:translate-y-0 text-white/40 group-hover:text-white">
                   <div className="w-20 h-[1px] bg-white/40 group-hover:bg-white transition-all"></div>
                   <span className="font-mono text-[10px] tracking-[0.6em] uppercase">High Intent</span>
                </div>
             </div>
          </div>
        </div>

        {/* High-Impact Description Below Card */}
        <div className="mt-16 border-l border-white/10 pl-10 group-hover:border-white/30 transition-all duration-1000 max-w-4xl w-full">
           <p className="text-sm md:text-xl text-white/50 leading-relaxed font-light transition-colors duration-1000 group-hover:text-white/80">
              {emergencyCampaign.description}
           </p>
        </div>
      </div>

      {/* Full-Screen Video Modal */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 z-[1000] bg-black/98 backdrop-blur-3xl flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-700"
          onClick={() => setSelectedVideo(null)}
        >
          <button 
            className="absolute top-10 right-10 z-20 transition-all hover:rotate-90 duration-500 bg-white/5 p-4 rounded-full border border-white/10"
            onClick={() => setSelectedVideo(null)}
          >
            <X size={24} className="text-white/40 hover:text-white" />
          </button>

          <div 
            className="relative w-full max-w-5xl aspect-video rounded-3xl overflow-hidden shadow-[0_0_120px_rgba(0,0,0,1)] border border-white/5 animate-in zoom-in-95 duration-700"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3`}
              className="w-full h-full"
              allow="autoplay; encrypted-media"
              frameBorder="0"
              allowFullScreen
            />
          </div>

          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center pointer-events-none">
             <h4 className="font-serif text-3xl text-white tracking-widest uppercase mb-4 opacity-60 italic tracking-tighter">Emergency Conversion Laboratory</h4>
             <p className="text-[10px] font-mono uppercase tracking-[0.6em] text-white/20">Now Playing / TNT Ad Library</p>
          </div>
        </div>
      )}
    </div>
  );
}
