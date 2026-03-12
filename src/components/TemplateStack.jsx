import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const characters = [
  { 
    variant: 'zeek', 
    title: "Confused? Need Answers?", 
    subtitle: "Zeek represents patients who feel overwhelmed by dental information. He turns confusion into clarity.", 
    image: "/assets/characters/zeek-placeholder.jpg",
    youtubeId: "GYl4OuSHAsU", 
    borderColor: "border-plasma-blue/30",
    shadowColor: "shadow-[0_0_30px_rgba(0,240,255,0.2)]",
    textColor: "text-plasma-blue",
    stats: { type: "CLARITY", confidence: "98.2%" }
  },
  { 
    variant: 'olivia', 
    title: "Avoid & Cover", 
    subtitle: "Olivia represents patients who hide their smile. She shows how cosmetic dentistry rebuilds confidence.", 
    image: "/assets/characters/olivia-placeholder.jpg",
    youtubeId: "H2ebRDGQwpE", 
    borderColor: "border-plasma-pink/30",
    shadowColor: "shadow-[0_0_30px_rgba(255,0,127,0.2)]",
    textColor: "text-plasma-pink",
    stats: { type: "COSMETIC", confidence: "94.5%" }
  },
  { 
    variant: 'molar', 
    title: "In a Glass?", 
    subtitle: "Molar represents patients living with traditional dentures who want implant-supported stability.", 
    image: "/assets/characters/molar-placeholder.jpg",
    youtubeId: "9QG4IF25Qu8", 
    borderColor: "border-plasma-green/30",
    shadowColor: "shadow-[0_0_30px_rgba(0,255,102,0.2)]",
    textColor: "text-plasma-green",
    stats: { type: "IMPLANTS", confidence: "99.9%" }
  },
  { 
    variant: 'toothy', 
    title: "Adhesive Confidence", 
    subtitle: "Toothy helps patients understand the difference between temporary solutions and permanent implants.", 
    image: "/assets/characters/toothy-placeholder.jpeg",
    youtubeId: "", // Empty until provided
    borderColor: "border-plasma-orange/30",
    shadowColor: "shadow-[0_0_30px_rgba(255,85,0,0.2)]",
    textColor: "text-plasma-orange",
    stats: { type: "PERMANENT", confidence: "100%" }
  }
];

export default function TemplateStack() {
  const containerRef = useRef(null);
  
  useEffect(() => {
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.stack-card');
      
      cards.forEach((card, i) => {
        // Sticky pinning for stacking effect
        ScrollTrigger.create({
          trigger: card,
          start: `top top+=80`, 
          endTrigger: ".stack-container",
          end: `bottom bottom-=${(cards.length - i) * 20}`,
          pin: true,
          pinSpacing: false,
          scrub: true,
        });

        // Scale down previous cards
        if (i > 0) {
          gsap.to(cards[i - 1], {
            scale: 0.95 - (0.05 * i),
            opacity: 0.5,
            y: -20,
            scrollTrigger: {
              trigger: card,
              start: 'top center',
              end: 'top top+=80',
              scrub: true,
            }
          });
        }
      });
      
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="stack" className="relative w-full py-24 pb-[40vh] z-20 bg-obsidian">
      
      <div className="text-center mb-16 max-w-4xl mx-auto px-6">
        <h2 className="text-xs font-mono text-plasma-purple uppercase tracking-[0.3em] mb-4">Section B</h2>
        <h3 className="text-4xl md:text-6xl font-serif italic text-ghost mb-6">The Template Protocol</h3>
        <p className="text-ghost/70 font-sans text-lg max-w-xl mx-auto leading-relaxed">
          Four distinct modules engineered to address critical patient barriers.
        </p>
      </div>

      <div className="stack-container relative w-full max-w-5xl mx-auto px-4 md:px-8">
        {characters.map((char, index) => (
          <div 
            key={char.variant} 
            className={`stack-card relative w-full min-h-[70vh] mb-[10vh] flex flex-col md:flex-row items-center rounded-3xl overflow-hidden bg-obsidian/90 backdrop-blur-3xl border border-t-white/10 ${char.borderColor} ${char.shadowColor} origin-top`}
            style={{ zIndex: index * 10 }}
          >
            {/* Visual Column - Strict 9:16 Aspect Ratio */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 h-[45vh] lg:h-full border-b md:border-b-0 md:border-r border-white/5 bg-black/40">
              <div className="relative w-full max-w-[280px] md:max-w-[320px] aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 mx-auto bg-obsidian">
                <img 
                  src={char.image} 
                  alt={char.title}
                  className="absolute top-1/2 left-1/2 w-[135%] h-[135%] max-w-none -translate-x-1/2 -translate-y-1/2 object-cover"
                />
                {char.youtubeId && (
                  <div className="absolute inset-0 pointer-events-auto overflow-hidden">
                    <iframe 
                      src={`https://www.youtube.com/embed/${char.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${char.youtubeId}&controls=0&modestbranding=1&playsinline=1&rel=0`}
                      className="absolute top-1/2 left-1/2 w-[135%] h-[135%] max-w-none -translate-x-1/2 -translate-y-1/2"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    ></iframe>
                  </div>
                )}
              </div>
            </div>

            {/* Content Column */}
            <div className="w-full md:w-1/2 p-6 md:p-16 flex flex-col justify-center text-left">
              <span className={`text-[10px] font-mono uppercase tracking-[0.2em] font-bold ${char.textColor} mb-3 md:mb-4 block`}>
                Subject: {char.variant}
              </span>
              <h3 className="text-3xl md:text-5xl font-serif italic text-ghost tracking-tight mb-4 md:mb-6 mt-1 md:mt-2">
                {char.title}
              </h3>
              <p className="text-base md:text-lg text-ghost/70 font-sans leading-relaxed mb-6 md:mb-10">
                {char.subtitle}
              </p>
              
              <div className="grid grid-cols-2 gap-4 md:gap-8 border-t border-white/10 pt-6 mt-auto">
                <div>
                  <div className="text-[10px] font-mono text-ghost/40 uppercase tracking-widest mb-1 md:mb-2">Target</div>
                  <div className="font-sans text-lg md:text-xl font-bold tracking-tight text-ghost">{char.stats.type}</div>
                </div>
                <div>
                  <div className="text-[10px] font-mono text-ghost/40 uppercase tracking-widest mb-1 md:mb-2">Efficacy</div>
                  <div className={`font-mono text-lg md:text-xl font-bold ${char.textColor}`}>{char.stats.confidence}</div>
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
