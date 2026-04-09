import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const characters = [
  { 
    variant: 'zeek', 
    title: "Confused? Need Answers?", 
    subtitle: "Zeek represents patients who feel overwhelmed by dental information. He turns confusion into clarity.", 
    image: "./assets/characters/zeek-placeholder.jpg",
    youtubeId: "GYl4OuSHAsU", 
    borderColor: "border-plasma-blue/30",
    shadowColor: "shadow-[0_0_30px_rgba(0,240,255,0.2)]",
    textColor: "text-plasma-blue",
    stats: { type: "CLARITY", confidence: "98.2%" },
    scribbles: [
      { text: 'Trust first', pos: 'top-[-40px] left-10', depth: 0.1, style: 'default' },
      { text: 'Fear → Confidence', pos: 'bottom-[-60px] right-[-20px]', depth: 0.3, style: 'underline' }
    ]
  },
  { 
    variant: 'olivia', 
    title: "Avoid & Cover", 
    subtitle: "Olivia represents patients who hide their smile. She shows how cosmetic dentistry rebuilds confidence.", 
    image: "./assets/characters/olivia-placeholder.jpg",
    youtubeId: "H2ebRDGQwpE", 
    borderColor: "border-plasma-pink/30",
    shadowColor: "shadow-[0_0_30px_rgba(255,0,127,0.2)]",
    textColor: "text-plasma-pink",
    stats: { type: "COSMETIC", confidence: "94.5%" },
    scribbles: [
      { text: 'Relatable', pos: 'top-[-50px] right-0', depth: 0.15, style: 'circle' },
      { text: 'Story driven', pos: 'bottom-[-40px] left-[-30px]', depth: 0.2, style: 'italic' }
    ]
  },
  { 
    variant: 'molar', 
    title: "In a Glass?", 
    subtitle: "Molar represents patients living with traditional dentures who want implant-supported stability.", 
    image: "./assets/characters/molar-placeholder.jpg",
    youtubeId: "9QG4IF25Qu8", 
    borderColor: "border-plasma-green/30",
    shadowColor: "shadow-[0_0_30px_rgba(0,255,102,0.2)]",
    textColor: "text-plasma-green",
    stats: { type: "IMPLANTS", confidence: "99.9%" },
    scribbles: [
      { text: 'Before → After', pos: 'top-[-55px] left-20', depth: 0.25, style: 'underline' },
      { text: 'Mindset shift', pos: 'bottom-[-30px] right-10', depth: 0.2, style: 'italic' }
    ]
  },
  { 
    variant: 'toothy', 
    title: "Adhesive Confidence", 
    subtitle: "Toothy helps patients understand the difference between temporary solutions and permanent implants.", 
    image: "./assets/characters/toothy-placeholder.jpeg",
    youtubeId: "", 
    borderColor: "border-plasma-orange/30",
    shadowColor: "shadow-[0_0_30px_rgba(255,85,0,0.2)]",
    textColor: "text-plasma-orange",
    stats: { type: "PERMANENT", confidence: "100%" },
    scribbles: [
      { text: 'Education heavy', pos: 'top-[-60px] right-20', depth: 0.2, style: 'circle' },
      { text: 'Authority builder', pos: 'bottom-[-45px] left-0', depth: 0.4, style: 'underline' }
    ]
  }
];

export default function TemplateStack() {
  const containerRef = useRef(null);
  
  useEffect(() => {
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.stack-card');
      
      let mm = gsap.matchMedia();

      // Desktop/Tablet Stacking Effect
      mm.add("(min-width: 768px)", () => {
        cards.forEach((card, i) => {
          ScrollTrigger.create({
            trigger: card,
            start: `top top+=80`, 
            endTrigger: ".stack-container",
            end: `bottom bottom-=${(cards.length - i) * 20}`,
            pin: true,
            pinSpacing: false,
            scrub: true,
          });

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
      });

      // Parallax for Scribbles
      gsap.to('.parallax-scribble', {
        y: (i, target) => {
          const depth = target.getAttribute('data-depth') || 0.2;
          return -150 * depth;
        },
        ease: "none",
        scrollTrigger: {
          trigger: '.stack-container',
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="stack" className="relative w-full py-16 md:py-24 pb-[20vh] md:pb-[40vh] z-20 bg-black">
      
      <div className="text-center mb-20 md:mb-32 max-w-4xl mx-auto px-6 select-none">
        <h3 className="font-serif text-[clamp(2.5rem,10vw,8vw)] leading-[0.85] tracking-tighter text-white mb-6">Meet the <span className="italic opacity-60">Squad</span></h3>
        <p className="text-white/50 font-inter text-[10px] md:text-lg max-w-xl mx-auto leading-relaxed tracking-[0.3em] md:tracking-widest uppercase italic">
          High-Ticket Psychology for High-Value Procedures
        </p>
      </div>

      <div className="stack-container relative w-full max-w-5xl mx-auto px-4 md:px-8">
        {characters.map((char, index) => (
          <div key={char.variant} className="relative mb-[15vh]">
            
            {/* Parallax Strategist Scribbles Layer */}
            {char.scribbles.map((sc, i) => (
              <div 
                key={i}
                data-depth={sc.depth}
                className={`parallax-scribble absolute z-[60] ${sc.pos} pointer-events-none opacity-70 group-hover:opacity-100 transition-opacity duration-1000 md:block hidden`}
              >
                <span className={`font-['Caveat'] text-white whitespace-nowrap
                  ${sc.style === 'circle' ? 'border border-white/40 rounded-[50%] px-4 py-1 rotate-[-5deg]' : ''}
                  ${sc.style === 'large-text' ? 'text-2xl px-4 rotate-[-4deg] opacity-70' : ''}
                  ${sc.style === 'underline' ? 'border-b border-white/40 px-2' : ''}
                  ${sc.style === 'italic' ? 'italic opacity-60 font-light' : ''}
                  text-base lg:text-xl font-light opacity-70 tracking-wide
                `}>
                  {sc.text}
                  {sc.text.includes('→') && <span className="ml-2">→</span>}
                </span>
              </div>
            ))}

            <div 
              className={`stack-card relative w-full min-h-[70vh] flex flex-col md:flex-row items-center rounded-3xl overflow-hidden bg-neutral-900 border border-white/5 ${char.shadowColor} origin-top z-10 transition-all duration-700 hover:border-white/10`}
            >
              {/* Visual Column */}
              <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 min-h-[45vh] bg-black/60 border-r border-white/10">
                <div className="relative w-full max-w-[280px] md:max-w-[320px] aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 bg-obsidian">
                  <img src={char.image} alt={char.title} className="absolute top-1/2 left-1/2 w-[135%] h-[135%] -translate-x-1/2 -translate-y-1/2 object-cover grayscale opacity-40" />
                  {char.youtubeId && (
                    <div className="absolute inset-0 pointer-events-auto">
                      <iframe 
                        src={`https://www.youtube.com/embed/${char.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${char.youtubeId}&controls=0&modestbranding=1&playsinline=1&rel=0`}
                        className="absolute top-1/2 left-1/2 w-[135%] h-[135%] -translate-x-1/2 -translate-y-1/2"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        loading="lazy"
                      ></iframe>
                    </div>
                  )}
                </div>
              </div>

              {/* Content Column */}
              <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
                <span className={`text-[10px] font-mono uppercase tracking-[0.4em] font-bold ${char.textColor} mb-3 md:mb-6`}>
                  Strategy Module // {char.variant}
                </span>
                <h3 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white leading-[0.9] tracking-tighter mb-8 italic">
                  {char.title}
                </h3>
                <p className="text-base md:text-lg text-white/50 font-light leading-relaxed mb-6 md:mb-12">
                  {char.subtitle}
                </p>
                <div className="border-t border-white/10 pt-8 mt-auto flex items-center justify-between">
                  <div>
                    <div className="text-[9px] font-mono text-white/20 uppercase tracking-[0.5em] mb-2">Psychological Focus</div>
                    <div className="font-serif text-xl md:text-2xl text-white/80">{char.stats.type}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[9px] font-mono text-white/20 uppercase tracking-[0.5em] mb-2">Confidence Score</div>
                    <div className="font-serif text-xl md:text-2xl text-white italic">{char.stats.confidence}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
