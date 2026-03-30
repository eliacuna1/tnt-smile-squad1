import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Play, X, ArrowUpRight } from 'lucide-react';

const campaigns = [
  {
    id: 'love-your-dentist',
    title: 'LOVE YOUR DENTIST?',
    tag: 'Emotional Strategy',
    youtubeId: '_KMMfnOGJWE',
    directorNotes: "Emotional hook first. Focus on trust and patient experience. Build connection before offer.",
    audience: "Families / Trust-driven decision makers",
    notePos: { top: '-15%', left: '-10%' },
    audiencePos: { bottom: '2%', right: '-15%' }
  },
  {
    id: 'free-visits-eng',
    title: 'FREE VISITS ENG',
    tag: 'Acquisition Flow',
    youtubeId: 'g6CDB9xWH_0',
    directorNotes: "Lead with value. Remove cost objections instantly. Clear and direct offer.",
    audience: "Price-sensitive patients / New movers",
    notePos: { top: '-10%', right: '-15%' },
    audiencePos: { bottom: '-5%', left: '-10%' }
  },
  {
    id: 'free-visitas-espl',
    title: 'FREE VISITAS ESPL',
    tag: 'Bilingual Reach',
    youtubeId: '9wRhHrTviYI',
    directorNotes: "Language-first connection. Cultural familiarity. Same offer, stronger relatability.",
    audience: "Spanish-speaking households / Community referrals",
    notePos: { top: '-15%', left: '-10%' },
    audiencePos: { bottom: '2%', right: '-15%' }
  },
  {
    id: 'healthy-habits',
    title: 'HEALTHY HABITS',
    tag: 'Preventive Care',
    youtubeId: 'mGdfxERd1rc',
    directorNotes: "Educational approach. Build long-term trust. Position as helpful, not salesy.",
    audience: "Parents / Families with kids / Preventive mindset",
    notePos: { top: '-10%', right: '-15%' },
    audiencePos: { bottom: '-5%', left: '-10%' }
  }
];

export default function NewPatientStack() {
  const [hoveredId, setHoveredId] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.campaign-wrapper', 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out', stagger: 0.15, scrollTrigger: '.campaign-grid' }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full bg-black min-h-screen pt-40 pb-60 px-8 md:px-16 overflow-x-hidden">
      {/* New Patient Campaign Hub Header */}
      <div className="max-w-4xl mx-auto mb-32 text-center px-6">
         <h1 className="font-bebas text-6xl md:text-8xl lg:text-[10vw] text-white tracking-widest uppercase mb-6 leading-none">NEW PATIENT CAMPAIGNS</h1>
         <p className="text-white/80 text-sm md:text-lg font-light leading-relaxed max-w-2xl mx-auto italic font-serif">
            AI-powered ad templates designed to generate new patients, increase engagement, and drive more booked appointments.
         </p>
      </div>

      {/* Video Grid with Director Notes */}
      <div className="campaign-grid max-w-[1700px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-20 md:gap-24 lg:gap-12">
        {campaigns.map((camp) => (
          <div key={camp.id} className="campaign-wrapper relative group">
            
            {/* Director Notes Annotation - Absolute positioned around card */}
            <div 
              className={`absolute z-20 pointer-events-none transition-all duration-700 md:block hidden
                ${hoveredId === camp.id ? 'opacity-100 translate-y-0' : 'opacity-20 translate-y-2'}
              `}
              style={camp.notePos}
            >
               <div className="w-48 xl:w-56 flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                     <div className="w-8 h-[1px] bg-white/20"></div>
                     <span className="text-[10px] font-serif italic text-white/40 uppercase tracking-widest">Director Notes</span>
                  </div>
                  <p className="text-[11px] font-sans font-light leading-relaxed text-white/60 pl-10 border-l border-white/5">
                     {camp.directorNotes}
                  </p>
               </div>
            </div>

            {/* Audience Annotation */}
            <div 
              className={`absolute z-20 pointer-events-none transition-all duration-700 md:block hidden
                ${hoveredId === camp.id ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}
              `}
              style={camp.audiencePos}
            >
               <div className="flex flex-col gap-2">
                  <span className="text-[9px] font-mono uppercase tracking-[0.4em] text-white/20">Target / Segment</span>
                  <div className="h-[1px] w-full bg-white/5 mb-1"></div>
                  <p className="text-[10px] font-sans text-white/40 whitespace-nowrap">
                     {camp.audience}
                  </p>
               </div>
            </div>

            {/* Main Interactive Card */}
            <div
              className="relative flex flex-col pt-[150%] md:pt-[133%] rounded-[24px] overflow-hidden border border-white/5 bg-neutral-900 cursor-pointer transition-all duration-1000 hover:border-white/20 hover:shadow-2xl hover:shadow-white/5 z-10"
              onMouseEnter={() => setHoveredId(camp.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => setSelectedVideo(camp)}
            >
              {/* Visual Layer */}
              <div className="absolute inset-0 w-full h-full">
                {hoveredId === camp.id ? (
                  <div className="w-full h-full relative">
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
                      className="w-full h-full object-cover grayscale saturate-0 opacity-50 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/20 to-transparent"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                       <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md bg-white/5 group-hover:scale-125 transition-transform duration-700">
                          <Play size={20} fill="white" className="text-white ml-1" />
                       </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Title Section (Same as homepage for consistency) */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10 z-10 pointer-events-none">
                 <div className="transform transition-all duration-700 group-hover:-translate-y-2">
                    <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-white/20 mb-4 block">{camp.tag}</span>
                    <h2 className="font-bebas text-3xl md:text-5xl text-white tracking-widest uppercase leading-[0.85] drop-shadow-xl">
                      {camp.title}
                    </h2>
                    <div className="flex items-center gap-3 mt-4 opacity-0 group-hover:opacity-100 transition-all duration-700">
                       <div className="w-10 h-[1px] bg-white/40"></div>
                       <ArrowUpRight size={14} className="text-white/40" />
                    </div>
                 </div>
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
