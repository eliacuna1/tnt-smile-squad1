import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ArrowUpRight } from 'lucide-react';

const LibraryPortal = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.fromTo('.hero-title',
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 2, ease: "power4.out", delay: 0.5 }
      );
      
      gsap.fromTo('.hero-sub',
        { opacity: 0 },
        { opacity: 1, duration: 1.5, ease: "power2.out", delay: 1.2 }
      );

      // Grid entrance
      gsap.fromTo('.category-card',
        { y: 50, opacity: 0 },
        { 
          y: 0, opacity: 1, duration: 1.5, ease: "power3.out", 
          stagger: 0.2, 
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
      description: 'AI-powered templates to drive immediate patient acquisition.',
      image: './assets/new-patients.png',
      path: './new-patient.html'
    },
    {
      id: 'emergency',
      tag: '02 / Urgency Driven',
      title: 'Emergency Conversion',
      description: 'Capturing urgent intent with hyper-targeted creative.',
      image: './assets/emergency.png',
      path: './emergency.html'
    },
    {
      id: 'implants',
      tag: '03 / High Value',
      title: 'Dental Implants',
      description: 'Building trust for life-changing clinical transformations.',
      image: './assets/implants.png',
      path: './implants.html'
    },
    {
      id: 'cosmetic',
      tag: '04 / Aesthetic Focus',
      title: 'Smile Transformation',
      description: 'Premium creative for cosmetic and elective excellence.',
      image: './assets/cosmetic.png',
      path: './transformation.html'
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white font-inter selection:bg-white selection:text-black">
      {/* Cinematic Hero with Video Background */}
      <header className="relative h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        {/* Full-screen Background Video */}
        <div className="absolute inset-0 z-0 pointer-events-none">
           <div className="relative w-full h-full scale-[1.3] md:scale-110">
              <iframe 
                src="https://www.youtube.com/embed/2MRmV2ePfUQ?autoplay=1&mute=1&loop=1&playlist=2MRmV2ePfUQ&controls=0&modestbranding=1&playsinline=1&rel=0&showinfo=0&iv_load_policy=3"
                className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 pointer-events-none brightness-[0.6] saturate-[0.8]"
                allow="autoplay; encrypted-media"
                frameBorder="0"
              ></iframe>
              {/* Dark Gradient Overlay for optimal readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80"></div>
           </div>
        </div>

        <div className="relative z-10 text-center flex flex-col items-center">
          <h1 className="hero-title font-bebas text-[18vw] md:text-[12vw] lg:text-[10vw] leading-[0.85] tracking-tight text-white mb-8 drop-shadow-2xl">
            AI CREATIVE LIBRARY
          </h1>
          
          <div className="hero-sub max-w-2xl px-6">
             <p className="text-white/80 text-sm md:text-xl font-light leading-relaxed tracking-wide">
               The front door to TNT’s AI-driven dental ad templates built to elevate branding and drive conversion.
             </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-40">
           <div className="w-[1px] h-12 bg-white/40"></div>
           <span className="text-[9px] font-mono uppercase tracking-[0.4em]">Explore Library</span>
        </div>
      </header>

      {/* Category Grid - 2 Column wall of content */}
      <main className="category-grid pb-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-white/10 border-l border-white/10">
          {sections.map((section, index) => (
            <a
              key={section.id}
              href={section.path}
              className={`category-card relative group flex flex-col overflow-hidden aspect-square md:aspect-[1.1/1] border border-white/5 cursor-pointer`}
              onMouseEnter={() => setHoveredId(section.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Image Layer */}
              <div className="absolute inset-0 w-full h-full">
                <img 
                  src={section.image} 
                  alt={section.title} 
                  className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-700"></div>
              </div>

              {/* Info Overlay */}
              <div className="relative h-full flex flex-col justify-between p-8 md:p-16 z-10">
                <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/50">
                   {section.tag}
                </span>
                
                <div className="mt-auto">
                   <h2 className="font-serif text-3xl md:text-5xl lg:text-7xl text-white tracking-tight uppercase leading-[0.9] group-hover:translate-x-2 transition-transform duration-500">
                      {section.title}
                   </h2>
                   <p className="mt-6 text-xs md:text-sm text-white/40 font-light max-w-xs group-hover:opacity-100 transition-opacity duration-500 opacity-60">
                      {section.description}
                   </p>
                </div>
              </div>

              {/* Focus Interaction Icon */}
              <div 
                className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-700 z-20
                  ${hoveredId === section.id ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}
                `}
              >
                <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transform group-hover:rotate-[-45deg] transition-transform duration-700">
                   <ArrowUpRight className="text-white w-8 h-8 md:w-10 md:h-10" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-32 px-8 border-t border-white/10 bg-black text-center">
           <div className="flex flex-col items-center gap-8">
              <span className="font-bebas text-4xl text-white tracking-widest uppercase">
                 TNT LABORATORY
              </span>
              <p className="text-white/20 text-[10px] font-mono tracking-[0.4em] uppercase max-w-sm">
                 Elevating Dental Marketing through AI Complexity & Strategic Design
              </p>
              <div className="mt-12 text-[10px] text-white/10 font-mono tracking-[0.2em] uppercase">
                 &copy; 2024 TNT Dental AI Lab.
              </div>
           </div>
      </footer>
    </div>
  );
};

export default LibraryPortal;
