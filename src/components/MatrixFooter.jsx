import { useState, useRef } from 'react';

const characters = [
  { 
    id: 1,
    variant: 'zeek', 
    name: 'ZEEK',
    title: "Confused? Need Answers?", 
    image: "./assets/characters/zeek-placeholder.jpg",
    youtubeId: "GYl4OuSHAsU",
    hoverColor: "hover:border-plasma-blue hover:shadow-[0_0_40px_rgba(0,240,255,0.4)]",
    textColor: "text-plasma-blue"
  },
  { 
    id: 2,
    variant: 'olivia', 
    name: 'OLIVIA',
    title: "Avoid & Cover", 
    image: "./assets/characters/olivia-placeholder.jpg",
    youtubeId: "H2ebRDGQwpE", 
    hoverColor: "hover:border-plasma-pink hover:shadow-[0_0_40px_rgba(255,0,127,0.4)]",
    textColor: "text-plasma-pink"
  },
  { 
    id: 3,
    variant: 'molar', 
    name: 'MOLAR',
    title: "In a Glass?", 
    image: "./assets/characters/molar-placeholder.jpg",
    youtubeId: "9QG4IF25Qu8", 
    hoverColor: "hover:border-plasma-green hover:shadow-[0_0_40px_rgba(0,255,102,0.4)]",
    textColor: "text-plasma-green"
  },
  { 
    id: 4,
    variant: 'toothy', 
    name: 'TOOTHY',
    title: "Adhesive Confidence", 
    image: "./assets/characters/toothy-placeholder.jpeg",
    youtubeId: "", 
    hoverColor: "hover:border-plasma-orange hover:shadow-[0_0_40px_rgba(255,85,0,0.4)]",
    textColor: "text-plasma-orange"
  }
];

export default function MatrixFooter() {
  const footerRef = useRef(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const openFullscreen = (char) => {
    if (char.youtubeId) {
      setSelectedVideo(char);
    }
  };

  const closeFullscreen = () => {
    setSelectedVideo(null);
  };

  const currentPath = window.location.pathname;
  const isImplantsPage = currentPath.includes('implants.html') || currentPath.endsWith('implants') || currentPath.includes('implants/');

  if (!isImplantsPage) {
    return (
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
    );
  }

  return (
    <section ref={footerRef} id="footer" className="relative w-full bg-obsidian py-20 md:py-32 border-t border-white/5 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h3 className="text-5xl md:text-7xl font-good-castyll text-ghost tracking-tight uppercase">The Smile Squad</h3>
          <p className="mt-4 text-ghost/60 font-sans max-w-lg mx-auto">
            Connect with your Growth Leader today and let’s bring your campaign to life.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {characters.map((char) => (
            <div 
              key={char.id}
              onClick={() => openFullscreen(char)}
              className="group relative flex flex-col items-center cursor-pointer transition-all duration-500"
            >
              {/* Vertical Card wrapper for 9:16 */}
              <div className={`relative w-full aspect-[9/16] rounded-2xl overflow-hidden border border-white/10 bg-black transition-all duration-500 ease-out transform group-hover:-translate-y-2 ${char.hoverColor}`}>
                <img 
                  src={char.image} 
                  alt={char.title}
                  className="absolute top-1/2 left-1/2 w-[135%] h-[135%] max-w-none -translate-x-1/2 -translate-y-1/2 object-cover transition-opacity duration-500 group-hover:opacity-40"
                />
                
                {char.youtubeId && (
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden scale-100 group-hover:scale-110">
                    <iframe 
                      src={`https://www.youtube.com/embed/${char.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${char.youtubeId}&controls=0&modestbranding=1&playsinline=1&rel=0`}
                      className="absolute top-1/2 left-1/2 w-[110%] h-[110%] max-w-none -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                    ></iframe>
                  </div>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent opacity-80"></div>
                
                {/* Magnetic Hover Effect Name */}
                <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 overflow-hidden flex flex-col items-center text-center">
                  <span className={`text-base md:text-xl font-sans font-black tracking-widest ${char.textColor}`}>
                    {char.name}
                  </span>
                  <p className="mt-2 text-[10px] md:text-xs font-mono uppercase text-white tracking-[0.2em]">{char.title}</p>
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

      {/* Modern High-End Video Modal Interface */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10 bg-black/95 backdrop-blur-xl animate-in fade-in duration-500"
          onClick={closeFullscreen}
        >
          {/* Close interaction anywhere off the video */}
          <div className="absolute top-8 right-10 z-10">
            <button className="p-3 text-white/50 hover:text-white transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div 
            className="relative w-full max-w-4xl aspect-video rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,1)] border border-white/5 animate-in zoom-in-95 duration-500"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe 
              src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1&controls=1&modestbranding=1&rel=0&showinfo=0`}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
             <h4 className="text-white font-good-castyll text-3xl md:text-5xl tracking-wide">{selectedVideo.name}</h4>
             <p className="text-white/40 font-mono text-[10px] uppercase tracking-[0.5em]">Now Playing: Unmuted Original Template</p>
          </div>
        </div>
      )}
    </section>
  );
}
