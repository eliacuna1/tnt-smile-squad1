import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ArrowUpRight } from 'lucide-react';

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
      tag: '01 / High Velocity',
      title: 'New Patient Campaigns',
      description: 'Strategic acquisition focused on quality and performance.',
      image: './assets/new-patients.png',
      youtubeId: '6J7lJdCTuSw',
      path: './new-patient.html'
    },
    {
      id: 'emergency',
      tag: '02 / Urgency Driven',
      title: 'Emergency Conversion',
      description: 'High-intent creative for immediate clinical action.',
      image: './assets/emergency.png',
      youtubeId: '65KyQJboVo8',
      path: './emergency.html'
    },
    {
      id: 'implants',
      tag: '03 / High Value',
      title: 'Dental Implants',
      description: 'Educational authority for the high-end implant market.',
      image: './assets/implants.png',
      youtubeId: 'Qh5ddCxXEhU',
      path: './implants.html'
    },
    {
      id: 'cosmetic',
      tag: '04 / Aesthetic Focus',
      title: 'Smile Transformation',
      description: 'Aesthetic transformation with lifestyle-driven appeal.',
      image: './assets/cosmetic.png',
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

      {/* Living Preview Grid */}
      <main className="category-grid pb-24 px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-[1600px] mx-auto">
          {sections.map((section, index) => (
            <a
              key={section.id}
              href={section.path}
              className={`category-card relative group flex flex-col pt-[150%] md:pt-[133%] rounded-[30px] overflow-hidden border border-white/5 bg-neutral-900 cursor-pointer transition-all duration-700 ease-in-out hover:border-white/20 hover:shadow-2xl hover:shadow-white/5`}
              onMouseEnter={() => setHoveredId(section.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Background Video / Thumbnail Layer */}
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
                    <div className="absolute inset-0 bg-black/10"></div>
                  </div>
                ) : (
                  <div className="w-full h-full group-hover:scale-105 transition-transform duration-[1.2s]">
                    <img 
                      src={`https://img.youtube.com/vi/${section.youtubeId}/maxresdefault.jpg`}
                      alt={section.title} 
                      className="w-full h-full object-cover grayscale saturate-0 opacity-40 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90"></div>
                  </div>
                )}
              </div>

              {/* Poster Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10 z-10">
                <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-white/30 mb-3 group-hover:text-white/60 transition-colors">
                   {section.tag}
                </span>
                <h2 className="font-bebas text-3xl md:text-5xl text-white tracking-widest uppercase leading-[0.9] mb-4 transform transition-all duration-500 group-hover:-translate-y-2">
                   {section.title}
                </h2>
                <p className="text-[11px] md:text-xs text-white/30 font-light leading-relaxed max-w-xs transition-all duration-500 opacity-60 group-hover:opacity-100 group-hover:-translate-y-2 group-hover:text-white/50">
                  {section.description}
                </p>

                <div className={`mt-8 flex items-center gap-3 transition-all duration-700 transform
                  ${hoveredId === section.id ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
                `}>
                   <div className="w-8 h-[1px] bg-white/40 group-hover:bg-white transition-colors"></div>
                   <span className="text-[9px] font-mono uppercase tracking-[0.4em] text-white/60">Launch Repository</span>
                   <ArrowUpRight className="w-4 h-4 text-white" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="py-24 px-8 border-t border-white/10 bg-black text-center">
           <div className="flex flex-col items-center gap-6">
              <div className="h-10 md:h-12 flex items-center justify-center">
                 <img 
                   src="./assets/tnt-logo-official.png" 
                   alt="TNT Dental" 
                   className="h-full w-auto object-contain brightness-0 invert opacity-40 hover:opacity-100 transition-opacity" 
                 />
              </div>
              <p className="text-white/20 text-[9px] font-mono tracking-[0.4em] uppercase max-w-sm mt-4">
                 Strategic Intelligence for the Modern Dental Practice
              </p>
           </div>
      </footer>
    </div>
  );
};

export default LibraryPortal;
