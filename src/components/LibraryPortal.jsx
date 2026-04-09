import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';

const LibraryPortal = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const [activeMobileId, setActiveMobileId] = useState(null);
  const containerRef = useRef(null);
  const cardRefs = useRef({});

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Designers Entrance
      gsap.fromTo('.hero-designer',
        { y: 60, opacity: 0, rotateX: -30 },
        { y: 0, opacity: 1, rotateX: 0, duration: 2.2, ease: "expo.out", delay: 0.2 }
      );
      
      // Draw in the scribbles
      gsap.fromTo('.scribble-path',
        { opacity: 0, strokeDashoffset: 400 },
        { opacity: 0.8, strokeDashoffset: 0, duration: 1.8, ease: "power4.out", delay: 1.2 }
      );

      gsap.fromTo('.hero-sub',
        { opacity: 0 },
        { opacity: 1, duration: 1.8, ease: "power2.out", delay: 1.2 }
      );

      // Grid Entrance
      gsap.fromTo('.category-card',
        { y: 40, opacity: 0 },
        { 
          y: 0, opacity: 1, duration: 1.4, ease: "power4.out", 
          stagger: 0.1, 
          scrollTrigger: {
            trigger: '.category-grid',
            start: 'top bottom-=100'
          }
        }
      );

      // Parallax for Scribbles
      gsap.to('.parallax-scribble', {
        y: (i, target) => {
          const depth = target.getAttribute('data-depth') || 0.2;
          return -100 * depth;
        },
        ease: "none",
        scrollTrigger: {
          trigger: '.category-grid',
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Mobile Viewport Observer for Video Activation
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (!isMobile) return;

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
  }, []);

  const sections = [
    {
      id: 'new-patient',
      title: 'NEW PATIENT\nCAMPAIGNS',
      tag: 'HOOK',
      youtubeId: '6J7lJdCTuSw',
      path: './new-patient.html',
      scribbles: [
        { text: 'Butts in Seats', pos: 'bottom-[-60px] left-0', style: 'underline', depth: 0.1 },
        { text: 'Scroll Stopper', pos: 'top-[20%] left-[-80px]', style: 'arrow-right', depth: 0.3 },
        { text: 'FOMO', pos: 'bottom-[10%] right-[-40px]', style: 'tilt', depth: 0.2 }
      ]
    },
    {
      id: 'emergency',
      title: 'EMERGENCY\nVISITS',
      tag: 'URGENCY',
      youtubeId: '65KyQJboVo8',
      path: './emergency.html',
      scribbles: [
        { text: 'urgency', pos: 'top-[-50px] left-4', style: 'circle', depth: 0.2 },
        { text: 'call now', pos: 'top-[-30px] right-4', style: 'double-underline', depth: 0.4 },
        { text: 'attention grabber', pos: 'top-[10%] right-[-100px]', style: 'default', depth: 0.15 }
      ]
    },
    {
      id: 'implants',
      title: 'DENTAL\nIMPLANTS',
      tag: 'VALUE',
      youtubeId: 'Qh5ddCxXEhU',
      path: './implants.html',
      scribbles: [
        { text: 'story telling', pos: 'bottom-[-40px] left-10', style: 'default', depth: 0.1 },
        { text: 'build trust', pos: 'bottom-[-60px] right-10', style: 'underline', depth: 0.3 },
        { text: 'you are not alone', pos: 'top-[40%] right-[-120px]', style: 'italic', depth: 0.2 }
      ]
    },
    {
      id: 'cosmetic',
      title: 'ORTHO',
      tag: 'AESTHETIC',
      youtubeId: 'Cy2bMX54GHs',
      path: './transformation.html',
      scribbles: [
        { text: 'SMILE', pos: 'top-[-60px] left-1/2 -translate-x-1/2', style: 'large-curve', depth: 0.5 },
        { text: 'Confidence', pos: 'top-[20%] right-[-80px]', style: 'default', depth: 0.2 },
        { text: 'happy', pos: 'bottom-[-40px] left-4', style: 'circle', depth: 0.3 }
      ]
    }
  ];

  const ScribbleUnderline = () => (
    <svg className="absolute -bottom-4 -left-2 w-[110%] h-8 pointer-events-none overflow-visible opacity-70" viewBox="0 0 300 20">
       <path className="scribble-path" style={{strokeDasharray: 400}} d="M5,15 Q50,5 150,15 Q250,25 295,10" fill="none" stroke="white" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white font-inter selection:bg-white selection:text-black overflow-x-hidden">
      {/* Cinematic Hero */}
      <header className="relative h-[100svh] flex flex-col items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
           <div className="relative w-full h-full overflow-hidden">
              <iframe 
                src="https://www.youtube.com/embed/E5vGhT6HT9A?autoplay=1&mute=1&loop=1&playlist=E5vGhT6HT9A&controls=0&modestbranding=1&playsinline=1&rel=0&showinfo=0&iv_load_policy=3"
                className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 pointer-events-none scale-[1.1] brightness-[0.5]"
                allow="autoplay; encrypted-media"
                frameBorder="0"
              ></iframe>
               <div className="absolute inset-0 bg-black/40"></div>
               {/* Siri-style Ambient Color Wash for Hero */}
               <div className="absolute top-1/2 left-0 w-[40%] h-[40%] bg-[radial-gradient(circle_at_left,rgba(0,255,255,0.15)_0%,transparent_70%)] blur-[200px] animate-pulse-slow"></div>
               <div className="absolute top-1/2 right-0 w-[40%] h-[40%] bg-[radial-gradient(circle_at_right,rgba(255,0,255,0.12)_0%,transparent_70%)] blur-[220px] animate-pulse-slow delay-700"></div>
            </div>
        </div>

        <div className="relative z-10 text-center flex flex-col items-center select-none w-full max-w-[100vw] overflow-hidden">
          <h1 className="hero-designer font-serif text-[clamp(3.5rem,15vw,10rem)] leading-[0.85] tracking-tighter text-white mb-10 [perspective:1000px] w-full px-4">
            <span className="relative inline-block">
              AI
            </span>
            <span className="relative inline-block mx-2 md:mx-4">
              <span className="font-['Mr_Dafoe'] italic font-normal text-[1.1em] opacity-80 text-white block transform translate-y-2 -rotate-3 scale-110">
                 Creative
              </span>
              <ScribbleUnderline />
            </span><br/>
            LIBRARY
          </h1>
          <div className="hero-sub max-w-xl mx-auto px-6">
             <p className="text-white/40 text-sm md:text-base font-light leading-relaxed tracking-[0.2em] uppercase">
               Strategic intelligence for high-performing dental practices
             </p>
          </div>
        </div>
      </header>

      {/* Strategic Statement: OUR APPROACH */}
      <section className="py-24 md:py-48 px-8 bg-black">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
           <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.8em] text-white/20 mb-12 block">
              OUR APPROACH
           </span>
           <div className="space-y-6 md:space-y-10">
              <p className="text-xl md:text-4xl lg:text-5xl font-serif font-light text-white leading-[1.2] tracking-tighter">
                 We focus on four core campaign types, each designed to attract a <span className="italic font-serif opacity-60">specific patient profile</span> and demographic. Every campaign is built with a clear strategy behind it.
              </p>
              <p className="text-xs md:text-lg text-white/40 font-light leading-relaxed max-w-2xl mx-auto tracking-wide uppercase">
                 We have refined these systems to ensure your ads do more than generate clicks. They are built to convert attention into real appointments and real growth.
              </p>
           </div>
        </div>
      </section>

      {/* High-End Studio Portfolio Grid */}
      <main className="category-grid pb-60 px-4 md:px-8 bg-black">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-20 md:gap-24 lg:gap-8 max-w-[1700px] mx-auto">
          {sections.map((section, index) => (
            <div key={section.id} className="relative">
              
              {/* Director Scribbles Layer (Parallax) */}
              {section.scribbles.map((sc, i) => (
                <div 
                  key={i}
                  data-depth={sc.depth}
                  className={`parallax-scribble absolute z-20 ${sc.pos} pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-1000 md:block hidden`}
                >
                  <span className={`font-['Caveat'] text-white whitespace-nowrap
                    ${sc.style === 'circle' ? 'border border-white/40 rounded-[50%] px-4 py-1 rotate-[-5deg]' : ''}
                    ${sc.style === 'underline' ? 'border-b border-white/40 px-2' : ''}
                    ${sc.style === 'double-underline' ? 'border-b border-double border-white/40 px-2' : ''}
                    ${sc.style === 'tilt' ? 'rotate-[-12deg] block' : ''}
                    ${sc.style === 'large-curve' ? 'text-4xl lg:text-5xl rotate-[5deg] block border-b border-white/40 pb-2 rounded-[40%]' : ''}
                    ${sc.style === 'italic' ? 'italic opacity-60 font-light' : ''}
                    text-base lg:text-lg font-light opacity-70 tracking-wide
                  `}>
                    {sc.text}
                    {sc.style === 'arrow-right' && <span className="ml-2">→</span>}
                  </span>
                </div>
              ))}

              <a
                href={section.path}
                ref={el => cardRefs.current[section.id] = el}
                data-id={section.id}
                className={`category-card relative group flex flex-col pt-[155%] md:pt-[145%] rounded-[12px] md:rounded-[20px] overflow-hidden bg-neutral-900 cursor-pointer transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] border border-white/0 hover:border-white/10 z-10`}
                onMouseEnter={() => setHoveredId(section.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Background Layer (Hover or Scroll Active) */}
                <div className="absolute inset-0 w-full h-full overflow-hidden text-clip">
                  {(hoveredId === section.id || activeMobileId === section.id) ? (
                    <div className="w-full h-full relative transition-transform duration-[1.5s]">
                      <iframe 
                        src={`https://www.youtube.com/embed/${section.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${section.youtubeId}&controls=0&modestbranding=1&playsinline=1&rel=0&showinfo=0&iv_load_policy=3`}
                        className={`absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-[1.5s]
                          ${section.id === 'emergency' ? 'scale-[1.05] md:scale-[1.10] object-[center_40%]' : 
                            section.id === 'implants' ? 'scale-[1.25] md:scale-[1.45]' : 'scale-[1.0]'}
                        `}
                        allow="autoplay; encrypted-media"
                        frameBorder="0"
                      />
                      <div className="absolute inset-0 bg-black/20"></div>
                    </div>
                  ) : (
                    <div className="w-full h-full group-hover:scale-105 transition-transform duration-[1.5s]">
                      <img 
                        src={`https://img.youtube.com/vi/${section.youtubeId}/maxresdefault.jpg`}
                        alt={section.title.replace('\n', ' ')} 
                        className="w-full h-full object-cover grayscale saturate-0 opacity-40 transition-all duration-1000"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/30 to-transparent"></div>
                    </div>
                  )}
                </div>

                {/* High-End Studio Typography Layer */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10 z-10 pointer-events-none translate-y-2 group-hover:translate-y-0 transition-all duration-700">
                  <div className="flex flex-col gap-6">
                     <div className="relative">
                        {/* Sub-label Annotation (Handwritten Style) */}
                        <span className="absolute -top-10 left-0 font-['Caveat'] text-lg text-white/30 tracking-tight transition-all duration-700 group-hover:text-white/60 group-hover:-translate-y-2 group-hover:rotate-6">
                           {section.tag}
                        </span>
                        <h2 className="font-serif leading-[0.85] tracking-tighter text-white whitespace-pre-line break-words
                           text-[9vw] sm:text-[4vw] lg:text-[2.2vw] xl:text-[2.4vw]
                        ">
                           {section.title}
                        </h2>
                     </div>
                     
                     {/* Minimalist Line Transition */}
                     <div className="flex items-center gap-4 mt-2">
                        <div className={`h-[1px] bg-white/40 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]
                          ${(hoveredId === section.id || activeMobileId === section.id) ? 'w-16 bg-white opacity-100' : 'w-0 opacity-0'}
                        `}></div>
                        <ArrowRight className={`w-4 h-4 text-white transition-all duration-700 delay-100
                          ${(hoveredId === section.id || activeMobileId === section.id) ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}
                        `} />
                     </div>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </main>

      {/* Sleek Global Signature Footer */}
      <footer className="py-10 px-8 md:px-16 border-t border-white/5 bg-black">
           <div className="max-w-7xl mx-auto flex items-center justify-start gap-6">
              <div className="h-6 md:h-8 flex items-center">
                 <img 
                   src="./assets/tnt-logo-official.png" 
                   alt="TNT Dental" 
                   className="h-full w-auto object-contain brightness-0 invert opacity-60" 
                 />
              </div>
              <div className="h-4 w-[1px] bg-white/10"></div>
              <p className="text-white/20 text-[9px] md:text-[10px] font-mono tracking-[0.4em] uppercase whitespace-nowrap">
                 Strategic Intelligence for the Modern Dental Practice
              </p>
           </div>
      </footer>
    </div>
  );
};

export default LibraryPortal;
