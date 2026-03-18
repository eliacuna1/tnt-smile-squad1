import { useState, useEffect, useRef } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);

      if (currentScrollY < lastScrollY.current) {
        setIsScrollingUp(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsScrollingUp(false);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isShrunk = isScrolled && !isScrollingUp;

  return (
    <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-7xl flex flex-col items-center pointer-events-none transition-all duration-700`}>
      <div 
        className={`relative group pointer-events-auto transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]
          ${isShrunk ? 'md:w-[180px]' : 'w-full'}
          h-[60px] md:h-[72px]
        `}
      >
        {/* Apple Siri-Style Edge Glow Border: Thinner, Higher Contrast */}
        <div className="absolute -inset-[1.5px] rounded-full overflow-hidden pointer-events-none z-10">
           <div className="absolute inset-0 bg-gradient-to-r from-plasma-blue/50 via-plasma-purple/50 via-plasma-pink/50 via-plasma-green/50 to-plasma-blue/50 bg-[length:300%_100%] animate-siri-glow-border blur-[1px] opacity-70"></div>
        </div>

        {/* Soft External Bloom */}
        <div className="absolute -inset-[15px] bg-gradient-to-r from-plasma-blue/10 via-plasma-purple/10 to-plasma-pink/10 rounded-full blur-3xl opacity-30 animate-siri-glow transition-opacity pointer-events-none"></div>

        <nav 
          className="relative h-full w-full bg-white/[0.04] backdrop-blur-[24px] border border-white/20 rounded-full overflow-hidden flex items-center shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
        >
          {/* Liquid Retina Highlight Effect: A subtle white shine at the top edge */}
          <div className="absolute top-0 left-0 right-0 h-[30%] bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none"></div>
          
          {/* Interior Surface Mesh: Ultra subtle blue-purple wash to match screenshot */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 via-purple-500/5 to-pink-500/5 pointer-events-none"></div>

          <div className={`relative h-full w-full flex items-center px-4 md:px-8 
            ${isShrunk ? 'md:justify-center' : 'justify-between'}`}>
            
            {/* Logo Section */}
            <div className={`flex items-center transition-all duration-700 w-full md:w-auto justify-center md:justify-start
              ${isShrunk ? 'md:scale-90' : 'scale-100'}
            `}>
              <div className="h-7 md:h-9 w-auto flex items-center">
                <img 
                  src="./assets/characters/tnt-logo-official.png" 
                  alt="TNT Dental" 
                  className="h-full w-auto object-contain brightness-0 invert" 
                />
              </div>
            </div>
            
            {/* Navigation Links */}
            <div className={`hidden md:flex items-center justify-center gap-10 font-mono text-[10px] uppercase tracking-[0.3em] text-white/70 transition-all duration-700
              ${isScrolled && !isScrollingUp ? 'md:opacity-0 md:absolute md:translate-y-10 md:pointer-events-none' : 'opacity-100 translate-y-0'}
            `}>
              <a href="#hero" className="hover:text-white hover:scale-110 transition-all duration-500 whitespace-nowrap">Casa</a>
              <a href="#stack" className="hover:text-white hover:scale-110 transition-all duration-500 whitespace-nowrap">The Characters</a>
              <a href="#footer" className="hover:text-white hover:scale-110 transition-all duration-500 whitespace-nowrap">All Templates</a>
            </div>

            {/* Desktop Spacer */}
            <div className={`hidden md:block transition-all duration-700 ${isShrunk ? 'w-0' : 'w-[50px] opacity-0'}`}></div>
          </div>
        </nav>
      </div>
    </div>
  );
}
