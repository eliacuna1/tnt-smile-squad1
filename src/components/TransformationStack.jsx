import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Play, X, ArrowUpRight } from 'lucide-react';

const campaigns = [
  {
    id: 'braces',
    title: 'BRACES',
    youtubeId: 'dLq2-cJw-Ck',
    description: "Family-focused campaigns that connect with both parents and teens, remove cost barriers, and position your practice as the trusted choice for orthodontic care.",
    scribbles: [
      { text: 'Mom decision', pos: 'top-[-50px] left-0', style: 'default', depth: 0.1 },
      { text: 'Teen confidence', pos: 'top-[10%] left-[-110px]', style: 'italic', depth: 0.2 },
      { text: 'MassHealth', pos: 'bottom-[15%] right-[-60px]', style: 'underline', depth: 0.3 }
    ]
  },
  {
    id: 'teeth-whitening',
    title: 'TEETH\nWHITENING',
    youtubeId: 'mGdfxERd1rc', // Using the gym/grooming confidence video provided
    description: "Lifestyle-driven campaigns that tap into confidence and appearance to drive high-intent cosmetic treatment demand.",
    scribbles: [
      { text: 'Confidence', pos: 'top-[-60px] right-0', style: 'default', depth: 0.2 },
      { text: 'Glow up', pos: 'top-[30%] right-[-100px]', style: 'large-text', depth: 0.15 },
      { text: 'Lifestyle', pos: 'bottom-[-40px] left-0', style: 'underline', depth: 0.2 }
    ]
  },
  {
    id: 'night-guards',
    title: 'NIGHT\nGUARDS',
    youtubeId: 'IS7oWdUdHtc',
    description: "High-margin campaigns that showcase in-house capabilities, increase case acceptance, and position your practice as efficient and advanced.",
    scribbles: [
      { text: 'In-house', pos: 'top-[-50px] left-4', style: 'default', depth: 0.1 },
      { text: 'High margin', pos: 'bottom-[-60px] right-0', style: 'underline', depth: 0.25 },
      { text: 'Retention play', pos: 'top-[20%] right-[-120px]', style: 'italic-dim', depth: 0.3 }
    ]
  }
];

export default function TransformationStack() {
  const [hoveredId, setHoveredId] = useState(null);
  const [activeMobileId, setActiveMobileId] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const containerRef = useRef(null);
  const cardRefs = useRef({});

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.campaign-wrapper', 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.4, ease: 'power4.out', stagger: 0.1, scrollTrigger: '.campaign-grid' }
      );

      // Parallax for Scribbles
      gsap.to('.parallax-scribble', {
        y: (i, target) => {
          const depth = target.getAttribute('data-depth') || 0.2;
          return -120 * depth;
        },
        ease: "none",
        scrollTrigger: {
          trigger: '.campaign-grid',
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    }, containerRef);

    // Mobile Viewport Observer for Video Activation
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveMobileId(entry.target.getAttribute('data-id'));
          }
        });
      }, { threshold: 0.6 });

      Object.values(cardRefs.current).forEach(card => {
        if (card) observer.observe(card);
      });

      return () => observer.disconnect();
    }

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full bg-black min-h-screen pt-40 pb-60 px-8 md:px-16 overflow-x-hidden">
      {/* Transformation Page Header (Designer Serif) */}
      <div className="max-w-6xl mx-auto mb-20 md:mb-40 text-center px-4">
         <h1 className="hero-designer font-serif text-[clamp(2.8rem,14vw,8vw)] leading-[0.85] tracking-tighter text-white mb-8">
            SMILE <br/>
            <span className="italic font-light opacity-60 text-white/80">Transformation</span>
         </h1>
         <p className="text-white/80 text-sm md:text-xl font-light leading-relaxed max-w-3xl mx-auto px-4">
            High-converting campaigns designed to promote aesthetic treatments, boost confidence, and increase high-value patient bookings.
         </p>
      </div>

      {/* Video Grid (Vertical 3-Column Layout) */}
      <div className="campaign-grid max-w-[1700px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-20 md:gap-32 lg:gap-16 px-4">
        {campaigns.map((camp) => (
          <div key={camp.id} className="campaign-wrapper relative group flex flex-col h-full">
            
            {/* Parallax Scribbles Layer */}
            {camp.scribbles.map((sc, i) => (
              <div 
                key={i}
                data-depth={sc.depth}
                className={`parallax-scribble absolute z-20 ${sc.pos} pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-1000 md:block hidden`}
              >
                <span className={`font-['Caveat'] text-white whitespace-nowrap
                  ${sc.style === 'large-text' ? 'text-4xl px-4 rotate-[-4deg] opacity-80' : ''}
                  ${sc.style === 'underline' ? 'border-b border-white/50 px-2' : ''}
                  ${sc.style === 'italic' ? 'italic opacity-60 text-lg' : ''}
                  ${sc.style === 'italic-dim' ? 'italic opacity-60 text-base font-bold' : ''}
                  text-lg lg:text-3xl font-bold
                `}>
                  {sc.text}
                  {sc.text === 'Mom decision' && <span className="ml-3">→</span>}
                </span>
              </div>
            ))}

            {/* Main Vertical Poster Card */}
            <div
              ref={el => cardRefs.current[camp.id] = el}
              data-id={camp.id}
              className={`relative flex flex-col pt-[155%] md:pt-[145%] rounded-[16px] md:rounded-[24px] overflow-hidden bg-neutral-900 cursor-pointer transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] border border-white/0 hover:border-white/10 z-10 shadow-2xl`}
              onMouseEnter={() => setHoveredId(camp.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => setSelectedVideo(camp)}
            >
              {/* Visual Layer (Active on Hover or Mobile Scroll) */}
              <div className="absolute inset-0 w-full h-full">
                {(hoveredId === camp.id || activeMobileId === camp.id) ? (
                  <div className="w-full h-full relative">
                    <iframe
                      src={`https://www.youtube.com/embed/${camp.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${camp.youtubeId}&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&playsinline=1`}
                      className="w-full h-full aspect-[9/16] pointer-events-none scale-x-125 md:scale-x-150"
                      allow="autoplay; encrypted-media"
                      frameBorder="0"
                    />
                    <div className="absolute inset-0 bg-black/10"></div>
                  </div>
                ) : (
                  <div className="w-full h-full group-hover:scale-105 transition-transform duration-[1s]">
                    <img
                      src={`https://img.youtube.com/vi/${camp.youtubeId}/maxresdefault.jpg`}
                      alt={camp.title.replace('\n', ' ')}
                      className="w-full h-full object-cover grayscale saturate-0 opacity-40 transition-all duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/30 to-transparent"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                       <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-white/10 flex items-center justify-center backdrop-blur-md bg-white/5 group-hover:scale-110 transition-all duration-700">
                          <Play size={20} fill="white" className="text-white ml-1 opacity-40 group-hover:opacity-100 transition-opacity" />
                       </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom-Left Aligned Designer Typography Layer */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 z-10 pointer-events-none">
                  <div className={`transform transition-all duration-1000 ${(hoveredId === camp.id || activeMobileId === camp.id) ? '-translate-y-4' : ''}`}>
                    <h2 className="font-serif leading-[0.85] tracking-tighter text-white whitespace-pre-line break-words
                       text-[10vw] sm:text-[6vw] lg:text-[4vw] xl:text-[3.2vw]
                    ">
                      {camp.title}
                    </h2>
                    <div className={`flex items-center gap-3 mt-6 transition-all duration-1000 text-white/40
                      ${(hoveredId === camp.id || activeMobileId === camp.id) ? 'opacity-100 translate-y-0 text-white' : 'opacity-0 translate-y-4'}
                    `}>
                       <div className={`w-12 h-[1px] bg-white/40 transition-all ${(hoveredId === camp.id || activeMobileId === camp.id) ? 'bg-white' : ''}`}></div>
                       <span className="font-mono text-[9px] tracking-[0.6em] uppercase">High Value</span>
                    </div>
                 </div>
              </div>
            </div>

            {/* Strategy Description Below Card */}
            <div className="mt-12 border-l border-white/10 pl-6 group-hover:border-white/30 transition-all duration-1000">
               <p className="text-sm text-white/40 leading-relaxed font-light transition-colors duration-1000 group-hover:text-white/80 max-w-sm">
                  {camp.description}
               </p>
            </div>
          </div>
        ))}
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
            className="relative w-full max-w-4xl aspect-[9/16] md:aspect-video rounded-3xl overflow-hidden shadow-[0_0_120px_rgba(0,0,0,1)] border border-white/5 animate-in zoom-in-95 duration-700"
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
             <h4 className="font-serif text-3xl text-white tracking-widest uppercase mb-4 opacity-60 italic tracking-tighter">Confidence Growth Laboratory</h4>
             <p className="text-[10px] font-mono uppercase tracking-[0.6em] text-white/20">TNT AI CREATIVE LABORATORY</p>
          </div>
        </div>
      )}
    </div>
  );
}
