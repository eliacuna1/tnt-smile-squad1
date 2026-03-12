import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function CharacterAnchor() {
  const containerRef = useRef(null);
  const characterRef = useRef(null);
  const [activeChar, setActiveChar] = useState(0);

  const characters = [
    { 
      variant: 'zeek', 
      title: "Confused? Need Answers?", 
      subtitle: "Zeek represents patients who feel overwhelmed by dental information or unsure where to begin. Through simple stories and familiar situations, Zeek helps explain common procedures, answers frequent questions, and turns confusion into clarity.", 
      image: "/assets/characters/Confused? Need Answers?.jpg",
      theme: "bg-blue-900",
      stats: { type: "CLARITY", confidence: "98.2%" }
    },
    { 
      variant: 'olivia', 
      title: "Avoid and Cover", 
      subtitle: "Olivia represents patients who hide their smile or avoid photos because they feel self conscious about cosmetic issues. Her story shows how modern cosmetic dentistry can rebuild confidence and help patients feel comfortable sharing their smile again.", 
      image: "/assets/characters/Avoid and Cover.jpg",
      theme: "bg-pink-900",
      stats: { type: "COSMETIC", confidence: "94.5%" }
    },
    { 
      variant: 'molar', 
      title: "In a Glass", 
      subtitle: "Molar represents patients who have lived with dentures for years and want something more stable. His story helps patients understand the transition from traditional dentures to implant supported solutions that restore comfort, confidence, and everyday freedom.", 
      image: "/assets/characters/In a Glass.jpg",
      theme: "bg-emerald-900",
      stats: { type: "IMPLANTS", confidence: "99.9%" }
    },
    { 
      variant: 'toothy', 
      title: "Adhesive vs Stability", 
      subtitle: "Toothy helps patients understand the difference between temporary denture solutions and the long term stability of dental implants. His story focuses on restoring confidence through permanent solutions that allow patients to eat, speak, and live comfortably again.", 
      image: "/assets/characters/Adhesive.jpeg",
      theme: "bg-orange-800",
      stats: { type: "PERMANENT", confidence: "100%" }
    }
  ];

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      const sections = gsap.utils.toArray('.char-section');
      
      // Pin the character in the center for the duration of the container
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: characterRef.current,
        scrub: true,
      });

      // Character image rotation/scale logic based on scroll
      sections.forEach((section, index) => {
        ScrollTrigger.create({
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setActiveChar(index),
          onEnterBack: () => setActiveChar(index),
          scrub: 1,
          animation: gsap.fromTo(characterRef.current, 
            { rotationY: index % 2 === 0 ? -10 : 10, scale: 0.95 },
            { rotationY: index % 2 === 0 ? 10 : -10, scale: 1.05 }
          )
        });
      });

    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full z-10">
      
      {/* The Central Pinned Anchor */}
      <div 
        ref={characterRef} 
        className="absolute top-0 left-0 w-full h-screen flex items-center justify-center pointer-events-none"
      >
        <div className="relative w-full max-w-md md:max-w-lg aspect-[3/4] transition-all duration-1000 ease-in-out">
          {characters.map((char, index) => (
            <img 
              key={char.variant}
              src={char.image} 
              alt={char.title}
              className={`absolute inset-0 w-full h-full object-cover rounded-[2rem] shadow-2xl transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] ${index === activeChar ? 'opacity-100 scale-100 filter-none' : 'opacity-0 scale-95 blur-md'}`}
              style={{
                boxShadow: index === activeChar ? '0 30px 60px -15px rgba(0,0,0,0.6)' : 'none'
              }}
            />
          ))}
          
          {/* Glass Overlay on the active character */}
          <div className="absolute inset-x-4 bottom-4 h-32 bg-gradient-to-t from-black/80 to-transparent rounded-b-[1.5rem] flex flex-col justify-end p-6">
             <div className="flex justify-between items-end">
                <p className="font-mono text-xs uppercase tracking-widest text-white/50">{characters[activeChar].stats.type}</p>
                <p className="font-mono text-xs text-white/50">{characters[activeChar].stats.confidence}</p>
             </div>
          </div>
        </div>
      </div>

      {/* The Scrollable Text Sections */}
      <div className="relative w-full z-20">
        {characters.map((char, index) => (
          <div 
            key={char.variant} 
            className="char-section theme-section relative w-full h-[150vh] flex flex-col justify-center px-12 md:px-24"
            data-theme={char.theme}
          >
            <div className={`w-full max-w-4xl flex flex-col ${index % 2 === 0 ? 'items-start text-left' : 'items-end text-right ml-auto'}`}>
              <span className="font-mono text-sm tracking-[0.2em] opacity-50 mb-4 border-b border-white/20 pb-2">
                0{index + 1} / 04
              </span>
              <h2 className="text-4xl md:text-6xl font-sans font-bold tracking-tight mb-6 max-w-2xl drop-shadow-lg leading-[1.1]">
                {char.title}
              </h2>
              <p className="text-lg md:text-xl font-sans opacity-80 max-w-lg drop-shadow-md leading-relaxed">
                {char.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
      
    </section>
  );
}
