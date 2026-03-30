import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';

const LibraryPortal = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Entrance
      gsap.fromTo('.hero-title',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.8, ease: "power4.out", delay: 0.2 }
      );
      
      gsap.fromTo('.hero-sub',
        { opacity: 0 },
        { opacity: 1, duration: 1.5, ease: "power2.out", delay: 0.6 }
      );

      // Grid Entrance
      gsap.fromTo('.category-card',
        { y: 40, opacity: 0 },
        { 
          y: 0, opacity: 1, duration: 1.2, ease: "power3.out", 
          stagger: 0.15, 
          scrollTrigger: {
            trigger: '.category-grid',
            start: 'top bottom-=100'
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const sections = [
    {
      id: 'new-patient',
      title: 'New Patient Campaigns',
      youtubeId: '6J7lJdCTuSw',
      path: './new-patient.html'
    },
    {
      id: 'emergency',
      title: 'Emergency Conversion',
      youtubeId: '65KyQJboVo8',
      path: './emergency.html'
    },
    {
      id: 'implants',
      title: 'Dental Implants',
      youtubeId: 'Qh5ddCxXEhU',
      path: './implants.html'
    },
    {
      id: 'cosmetic',
      title: 'Smile Transformation',
      youtubeId: 'Cy2bMX54GHs',
      path: './transformation.html'
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white font-inter selection:bg-white selection:text-black">
      {/* Cinematic Hero */}
      <header className="relative h-[90svh] flex flex-col items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
           <div className="relative w-full h-full overflow-hidden">
              <iframe 
                src="https://www.youtube.com/embed/E5vGhT6HT9A?autoplay=1&mute=1&loop=1&playlist=E5vGhT6HT9A&controls=0&modestbranding=1&playsinline=1&rel=0&showinfo=0&iv_load_policy=3"
                className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 pointer-events-none scale-[1.1] brightness-[0.7]"
                allow="autoplay; encrypted-media"
                frameBorder="0"
              ></iframe>
              <div className="absolute inset-0 bg-black/40"></div>
           </div>
        </div>

        <div className="relative z-10 text-center flex flex-col items-center">
          <h1 className="hero-title font-bebas text-[18vw] md:text-[14vw] lg:text-[11vw] leading-[0.85] tracking-tight text-white mb-8">
            AI CREATIVE LIBRARY
          </h1>
          <div className="hero-sub max-w-xl mx-auto px-6">
             <p className="text-white/60 text-sm md:text-lg font-light leading-relaxed tracking-wider">
               The front door to TNT’s AI-driven dental ad templates built to elevate branding and drive conversion.
             </p>
          </div>
        </div>
      </header>

      {/* Strategic Statement: OUR APPROACH */}
      <section className="py-24 md:py-40 px-8">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
           <span className="font-mono text-[10px] uppercase tracking-[0.6em] text-white/30 mb-10 block">
              OUR APPROACH
           </span>
           <div className="space-y-8">
              <p className="text-xl md:text-3xl font-light text-white leading-relaxed tracking-tight animate-fade-in-up">
                 At TNT Dental Marketing, we focus on four core campaign types, each designed to attract a specific patient profile and demographic. Every campaign is built with a clear strategy behind it, targeting the right audience with the right message at the right time.
              </p>
              <p className="text-sm md:text-lg text-white/40 font-light leading-relaxed max-w-2xl mx-auto animate-fade-in-up delay-300">
                 We have tested and refined these systems to ensure your ads do more than generate clicks. They are built to convert attention into real patients, real appointments, and real growth.
              </p>
           </div>
        </div>
      </section>

      {/* Minimal Portfolio Style Grid */}
      <main className="category-grid pb-40 px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-[1700px] mx-auto">
          {sections.map((section, index) => (
            <a
              key={section.id}
              href={section.path}
              className={`category-card relative group flex flex-col pt-[150%] md:pt-[140%] rounded-[24px] overflow-hidden border border-white/5 bg-neutral-900 cursor-pointer transition-all duration-700 ease-in-out hover:border-white/20`}
              onMouseEnter={() => setHoveredId(section.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Background Layer */}
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                {hoveredId === section.id ? (
                  <div className="w-full h-full relative transition-transform duration-[1s]">
                    <iframe 
                      src={`https://www.youtube.com/embed/${section.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${section.youtubeId}&controls=0&modestbranding=1&playsinline=1&rel=0&showinfo=0&iv_load_policy=3`}
                      className={`absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-700
                        ${(section.id === 'emergency' || section.id === 'implants') ? 'scale-[1.75] md:scale-[2.1]' : 'scale-[1.0]'}
                      `}
                      allow="autoplay; encrypted-media"
                      frameBorder="0"
                    />
                    <div className="absolute inset-0 bg-black/20"></div>
                  </div>
                ) : (
                  <div className="w-full h-full group-hover:scale-105 transition-transform duration-[1s]">
                    <img 
                      src={`https://img.youtube.com/vi/${section.youtubeId}/maxresdefault.jpg`}
                      alt={section.title} 
                      className="w-full h-full object-cover grayscale saturate-0 opacity-50 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                  </div>
                )}
              </div>

              {/* Minimalist Title Layer */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10 z-10 pointer-events-none">
                <div className="flex flex-col gap-4 transform transition-all duration-500 group-hover:-translate-y-2">
                   <h2 className="font-bebas text-3xl md:text-5xl text-white tracking-widest uppercase leading-[0.85] drop-shadow-lg">
                      {section.title}
                   </h2>
                   
                   {/* Animated Line Indicator */}
                   <div className="flex items-center gap-3 mt-4">
                      <div className={`h-[1px] bg-white transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]
                        ${hoveredId === section.id ? 'w-12 opacity-100' : 'w-0 opacity-0'}
                      `}></div>
                      <ArrowRight className={`w-4 h-4 text-white transition-all duration-700 delay-100
                        ${hoveredId === section.id ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}
                      `} />
                   </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </main>

      {/* Sleek Minimal Signature Footer */}
      <footer className="py-8 px-6 md:px-16 border-t border-white/5 bg-black">
           <div className="max-w-7xl mx-auto flex items-center justify-start gap-6">
              <div className="h-6 md:h-8 flex items-center">
                 <img 
                   src="./assets/tnt-logo-official.png" 
                   alt="TNT Dental" 
                   className="h-full w-auto object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-opacity" 
                 />
              </div>
              <div className="h-4 w-[1px] bg-white/10"></div>
              <p className="text-white/20 text-[9px] md:text-[10px] font-mono tracking-[0.3em] uppercase whitespace-nowrap">
                 Strategic Intelligence for the Modern Dental Practice
              </p>
           </div>
      </footer>
    </div>
  );
};

export default LibraryPortal;
