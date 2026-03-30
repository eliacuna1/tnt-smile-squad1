import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Play, X, ArrowUpRight } from 'lucide-react';

const campaigns = [
  {
    id: 'love-your-dentist',
    title: 'LOVE YOUR DENTIST?',
    tag: 'Emotional Strategy',
    youtubeId: '_KMMfnOGJWE',
    description: 'An emotional, curiosity-driven campaign focused on patient trust.'
  },
  {
    id: 'free-visits-eng',
    title: 'FREE VISITS ENG',
    tag: 'Acquisition Flow',
    youtubeId: 'g6CDB9xWH_0',
    description: 'Clean, value-driven English campaign designed for conversion.'
  },
  {
    id: 'free-visitas-espl',
    title: 'FREE VISITAS ESPL',
    tag: 'Bilingual Reach',
    youtubeId: '9wRhHrTviYI',
    description: 'Spanish/Spanglish version focused on culturally relevant trust.'
  },
  {
    id: 'healthy-habits',
    title: 'HEALTHY HABITS',
    tag: 'Preventive Care',
    youtubeId: 'mGdfxERd1rc',
    description: 'Family-friendly checklist campaign to drive long-term patient volume.'
  }
];

export default function NewPatientStack() {
  const [hoveredId, setHoveredId] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.campaign-card', 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.1, scrollTrigger: '.campaign-grid' }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full bg-black min-h-screen pt-32 pb-40 px-6 md:px-12">
      {/* Cinematic Header for Context */}
      <div className="max-w-7xl mx-auto mb-20 text-center">
         <h1 className="font-bebas text-6xl md:text-8xl text-white tracking-widest uppercase mb-4">NEW PATIENT CAMPAIGNS</h1>
         <p className="text-white/40 text-sm md:text-base font-light tracking-[0.2em] uppercase max-w-2xl mx-auto">
            Interactive Video Repository
         </p>
      </div>

      {/* Video Grid - Vertical Posters */}
      <div className="campaign-grid max-w-[1600px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {campaigns.map((camp) => (
          <div
            key={camp.id}
            className="group relative flex flex-col pt-[150%] md:pt-[133%] rounded-[32px] overflow-hidden border border-white/5 bg-neutral-900 cursor-pointer transition-all duration-700 hover:border-white/20 hover:shadow-2xl hover:shadow-white/5"
            onMouseEnter={() => setHoveredId(camp.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => setSelectedVideo(camp)}
          >
            {/* Visual Layer - Thumbnail or Playing Video */}
            <div className="absolute inset-0 w-full h-full">
              {hoveredId === camp.id ? (
                <div className="w-full h-full scale-105 transition-transform duration-700">
                  <iframe
                    src={`https://www.youtube.com/embed/${camp.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${camp.youtubeId}&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&playsinline=1`}
                    className="w-full h-full aspect-[9/16] pointer-events-none scale-x-125 md:scale-x-150"
                    allow="autoplay; encrypted-media"
                    frameBorder="0"
                  />
                  <div className="absolute inset-0 bg-black/20"></div>
                </div>
              ) : (
                <div className="w-full h-full group-hover:scale-105 transition-transform duration-[1s]">
                  <img
                    src={`https://img.youtube.com/vi/${camp.youtubeId}/maxresdefault.jpg`}
                    alt={camp.title}
                    className="w-full h-full object-cover grayscale saturate-0 opacity-60 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                     <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md bg-white/5 group-hover:scale-125 transition-transform">
                        <Play size={20} fill="white" className="text-white ml-1" />
                     </div>
                  </div>
                </div>
              )}
            </div>

            {/* Poster Info */}
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10 z-10 pointer-events-none">
              <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-white/40 mb-3 group-hover:text-white/60 transition-colors">
                {camp.tag}
              </span>
              <h2 className="font-bebas text-3xl md:text-5xl text-white tracking-widest uppercase leading-[0.9] mb-4 transform transition-all duration-500 group-hover:-translate-y-2">
                {camp.title}
              </h2>
              <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                 <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/60">Launch Preview</span>
                 <ArrowUpRight size={14} className="text-white/60" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full-Screen Video Modal */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-3xl flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-500"
          onClick={() => setSelectedVideo(null)}
        >
          {/* Close Interaction */}
          <button 
            className="absolute top-10 right-10 z-10 transition-transform hover:rotate-90 duration-500"
            onClick={() => setSelectedVideo(null)}
          >
            <X size={32} className="text-white/50 hover:text-white" />
          </button>

          <div 
            className="relative w-full max-w-4xl aspect-[9/16] md:aspect-video rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(255,255,255,0.05)] border border-white/10 animate-in zoom-in-95 duration-500"
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
             <h4 className="font-bebas text-4xl text-white tracking-widest uppercase mb-2">{selectedVideo.title}</h4>
             <p className="text-[10px] font-mono uppercase tracking-[0.5em] text-white/20">Now Playing / TNT Ad Library</p>
          </div>
        </div>
      )}
    </div>
  );
}
