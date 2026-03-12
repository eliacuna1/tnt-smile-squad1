import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MonsterCard from './MonsterCard';

export default function TemplateStack() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.monster-card');
      
      cards.forEach((card, i) => {
        ScrollTrigger.create({
          trigger: card,
          start: `top top+=${100 + (i * 20)}`,
          endTrigger: containerRef.current,
          end: `bottom bottom-=${100 - (i * 20)}`,
          pin: true,
          pinSpacing: false,
          scrub: 1,
        });

        if (i > 0) {
          gsap.fromTo(card, 
            { scale: 0.8, opacity: 0, y: 50 },
            { 
              scale: 1 - ((cards.length - 1 - i) * 0.05), 
              opacity: 1, 
              y: 0,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: `top center`,
                end: `top top+=${100 + (i * 20)}`,
                scrub: true
              }
            }
          );
        }
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  const templates = [
    { variant: 'zeek', title: "Confused? Need Answers?", subtitle: "Maximize FAQ engagement, explain complex procedures.", color: "bg-blue-600", image: "/assets/characters/zeek.png" },
    { variant: 'olivia', title: "Avoid & Cover", subtitle: "Solve cosmetic anxiety with reassuring visuals.", color: "bg-pink-500", image: "/assets/characters/olivia.png" },
    { variant: 'molar', title: "In a Glass?", subtitle: "The clean transition from dentures to full implants.", color: "bg-emerald-500", image: "/assets/characters/molar.jpg" },
    { variant: 'toothy', title: "Adhesive vs Stability", subtitle: "Build confidence in permanent stability.", color: "bg-orange-500", image: "/assets/characters/toothy.jpg" }
  ];

  return (
    <section ref={containerRef} className="relative w-full py-32 px-6 flex flex-col items-center min-h-[400vh]">
      <div className="w-full max-w-lg mb-32 z-10 text-center">
        <h2 className="text-4xl md:text-6xl font-sans font-bold mb-4 uppercase tracking-tight">The Roster</h2>
        <p className="text-xl opacity-80 font-serif italic">Meet the characters driving your campaigns.</p>
      </div>

      <div className="relative w-full max-w-sm md:max-w-md aspect-[9/16] mt-10">
        {templates.map((template, index) => (
          <div 
            key={template.variant} 
            className="monster-card absolute top-0 left-0 w-full h-full will-change-transform"
            style={{ zIndex: index }}
          >
            <MonsterCard {...template} index={index} />
          </div>
        ))}
      </div>
    </section>
  );
}
