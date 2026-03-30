import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const templates = [
  { 
    id: 'broken-tooth',
    title: "BROKEN TOOTH?", 
    subtitle: "A high-urgency campaign targeting common dental emergencies with immediate 'call now' intent.", 
    image: "./assets/emergency.png",
    borderColor: "border-plasma-pink/30",
    shadowColor: "shadow-[0_0_30px_rgba(255,0,127,0.1)]",
    textColor: "text-plasma-pink",
    stats: { type: "URGENCY", confidence: "99.1%" }
  },
  { 
    id: 'pain-relief',
    title: "PAIN RELIEF FAST", 
    subtitle: "Focused on compassionate care and same-day appointments for relief from dental pain.", 
    image: "./assets/emergency.png",
    borderColor: "border-plasma-blue/30",
    shadowColor: "shadow-[0_0_30px_rgba(0,240,255,0.1)]",
    textColor: "text-plasma-blue",
    stats: { type: "ACQUISITION", confidence: "98.5%" }
  },
  { 
    id: 'emergency-spanish',
    title: "URGENCIA DENTAL", 
    subtitle: "Connecting with the Spanish-speaking community during dental crises with culturally relevant speed.", 
    image: "./assets/emergency.png",
    borderColor: "border-plasma-green/30",
    shadowColor: "shadow-[0_0_30px_rgba(0,255,102,0.1)]",
    textColor: "text-plasma-green",
    stats: { type: "REACH", confidence: "97.4%" }
  },
  { 
    id: 'trauma-care',
    title: "TRAUMA CARE", 
    subtitle: "Highly specialized campaign for dental trauma, offering a calm and expert clinical first-response.", 
    image: "./assets/emergency.png",
    borderColor: "border-plasma-orange/30",
    shadowColor: "shadow-[0_0_30px_rgba(255,85,0,0.1)]",
    textColor: "text-plasma-orange",
    stats: { type: "SPECIALIZED", confidence: "98.9%" }
  }
];

export default function EmergencyStack() {
  const containerRef = useRef(null);
  
  useEffect(() => {
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.template-card');
      
      let mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        cards.forEach((card, i) => {
          ScrollTrigger.create({
            trigger: card,
            start: `top top+=80`, 
            endTrigger: ".template-stack-container",
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

      mm.add("(max-width: 767px)", () => {
        cards.forEach((card) => {
          gsap.from(card, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top bottom-=50",
              toggleActions: "play none none reverse"
            }
          });
        });
      });
      
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="stack" className="relative w-full py-24 pb-[40vh] z-20 bg-obsidian">
      
      <div className="text-center mb-16 max-w-4xl mx-auto px-6">
        <h3 className="text-5xl md:text-8xl font-good-castyll text-ghost mb-6 tracking-tight">Emergency Hub</h3>
        <p className="text-ghost/70 font-sans text-lg max-w-xl mx-auto leading-relaxed">
          The fastest path from patient pain to practice appointment. Speed-optimized conversion creatives.
        </p>
      </div>

      <div className="template-stack-container relative w-full max-w-5xl mx-auto px-4 md:px-8">
        {templates.map((temp, index) => (
          <div 
            key={temp.id} 
            className={`template-card relative w-full min-h-[70vh] mb-[10vh] flex flex-col md:flex-row items-center rounded-3xl overflow-hidden bg-obsidian/90 backdrop-blur-3xl border border-t-white/10 ${temp.borderColor} ${temp.shadowColor} origin-top`}
            style={{ zIndex: index * 10 }}
          >
            <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 min-h-[45vh] py-10 lg:py-0 lg:h-full border-b md:border-b-0 md:border-r border-white/5 bg-black/40">
              <div className="relative w-full max-w-[280px] md:max-w-[320px] aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 mx-auto bg-obsidian group">
                <img 
                   src={temp.image} 
                   alt={temp.title}
                   className="absolute top-1/2 left-1/2 w-[135%] h-[135%] max-w-none -translate-x-1/2 -translate-y-1/2 object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent opacity-60"></div>
              </div>
            </div>

            <div className="w-full md:w-1/2 p-6 md:p-16 flex flex-col justify-center text-left">
              <span className={`text-[10px] font-mono uppercase tracking-[0.3em] font-bold ${temp.textColor} mb-4 block`}>
                Campaign Protocol {index + 1}
              </span>
              <h3 className="text-4xl md:text-6xl font-good-castyll text-white tracking-tight leading-[0.9] mb-6">
                {temp.title}
              </h3>
              <p className="text-base md:text-lg text-ghost/70 font-sans font-light leading-relaxed mb-10">
                {temp.subtitle}
              </p>
              
              <div className="flex flex-col gap-8 md:gap-12 mt-auto">
                <div className="border-t border-white/10 pt-6">
                  <div className="text-[10px] font-mono text-ghost/40 uppercase tracking-widest mb-2">Strategy Type</div>
                  <div className="font-sans text-xl font-bold tracking-tight text-white mb-8">{temp.stats.type}</div>
                  
                  <button className={`group relative inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 transform hover:scale-[1.02] cursor-pointer w-fit overflow-hidden`}>
                    <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out`}></div>
                    <span className="relative text-[10px] uppercase font-mono tracking-[0.3em] text-white">Full Review</span>
                    <svg className={`relative w-4 h-4 text-white transition-transform group-hover:translate-x-1`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
