import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const characters = [
  { 
    id: 1,
    variant: 'zeek', 
    name: 'ZEEK',
    title: "Confused? Need Answers?", 
    image: "/assets/characters/zeek-placeholder.jpg",
    youtubeId: "GYl4OuSHAsU",
    hoverColor: "hover:border-plasma-blue hover:shadow-[0_0_40px_rgba(0,240,255,0.4)]",
    textColor: "text-plasma-blue"
  },
  { 
    id: 2,
    variant: 'olivia', 
    name: 'OLIVIA',
    title: "Avoid & Cover", 
    image: "/assets/characters/olivia-placeholder.jpg",
    youtubeId: "H2ebRDGQwpE", 
    hoverColor: "hover:border-plasma-pink hover:shadow-[0_0_40px_rgba(255,0,127,0.4)]",
    textColor: "text-plasma-pink"
  },
  { 
    id: 3,
    variant: 'molar', 
    name: 'MOLAR',
    title: "In a Glass?", 
    image: "/assets/characters/molar-placeholder.jpg",
    youtubeId: "9QG4IF25Qu8", 
    hoverColor: "hover:border-plasma-green hover:shadow-[0_0_40px_rgba(0,255,102,0.4)]",
    textColor: "text-plasma-green"
  },
  { 
    id: 4,
    variant: 'toothy', 
    name: 'TOOTHY',
    title: "Adhesive Confidence", 
    image: "/assets/characters/toothy-placeholder.jpeg",
    youtubeId: "", 
    hoverColor: "hover:border-plasma-orange hover:shadow-[0_0_40px_rgba(255,85,0,0.4)]",
    textColor: "text-plasma-orange"
  }
];

export default function MatrixFooter() {
  const footerRef = useRef(null);

  return (
    <section ref={footerRef} id="footer" className="relative w-full bg-obsidian py-32 border-t border-white/5 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-xs font-mono text-white/50 uppercase tracking-[0.3em] mb-4">Section C</h2>
          <h3 className="text-4xl md:text-5xl font-serif italic text-ghost">The Matrix Picker</h3>
          <p className="mt-4 text-ghost/60 font-sans max-w-lg mx-auto">
            Select a module to deploy the corresponding campaign.
          </p>
        </div>

        {/* 4-Column Video Grid (2 on mobile) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {characters.map((char) => (
            <div 
              key={char.id}
              className={`group relative flex flex-col items-center cursor-pointer transition-all duration-500`}
            >
              {/* Vertical Card wrapper for 9:16 */}
              <div className={`relative w-full aspect-[9/16] rounded-2xl overflow-hidden border border-white/10 bg-black/50 transition-all duration-500 ease-out transform group-hover:-translate-y-2 ${char.hoverColor}`}>
                <img 
                  src={char.image} 
                  alt={char.title}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-40"
                />
                
                {char.youtubeId && (
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                    <iframe 
                      src={`https://www.youtube.com/embed/${char.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${char.youtubeId}&controls=0&modestbranding=1&playsinline=1&rel=0`}
                      className="w-full h-full scale-[1.3]"
                    ></iframe>
                  </div>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent opacity-80"></div>
                
                {/* Magnetic Hover Effect: Name fades up */}
                <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 overflow-hidden flex flex-col items-center text-center">
                  <span className={`text-xl font-sans font-black tracking-widest ${char.textColor}`}>
                    {char.name}
                  </span>
                  <p className="mt-2 text-xs font-mono uppercase text-white tracking-[0.2em]">{char.title}</p>
                </div>
              </div>

              {/* Default static text underneath */}
              <div className="mt-6 text-center group-hover:opacity-0 transition-opacity duration-300">
                <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-white/40">Select Module</span>
                <div className="text-sm font-sans font-bold text-ghost/80 mt-1">{char.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
