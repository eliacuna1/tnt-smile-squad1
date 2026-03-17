import { useState, useEffect, useRef } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setIsScrolled(currentScrollY > 50);

      // Determine scroll direction
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

  // Shrink when scrolled down AND scrolling down
  const isShrunk = isScrolled && !isScrollingUp;

  return (
    <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-7xl flex pointer-events-none transition-all duration-700 ${isShrunk ? 'px-0' : ''}`}>
      <div 
        className="relative group pointer-events-auto"
        style={{ 
          width: isShrunk ? '180px' : '100%',
          height: isShrunk ? '60px' : '72px',
          transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)'
        }}
      >
        {/* Apple Siri-Style Edge Glow Border */}
        <div className="absolute -inset-[1.5px] rounded-full overflow-hidden pointer-events-none">
           <div className="absolute inset-0 bg-gradient-to-r from-plasma-blue via-plasma-purple via-plasma-pink via-plasma-green to-plasma-blue bg-[length:300%_100%] animate-siri-glow-border blur-[2px] opacity-100 group-hover:opacity-100 transition-opacity duration-1000"></div>
        </div>

        {/* Outer Soft Bloom/Blur Glow */}
        <div className="absolute -inset-[10px] bg-gradient-to-r from-plasma-blue/10 via-plasma-purple/10 to-plasma-pink/10 rounded-full blur-2xl opacity-40 animate-siri-glow transition-opacity pointer-events-none"></div>

        <nav 
          className="relative h-full w-full bg-obsidian/40 backdrop-blur-3xl border border-white/10 rounded-full overflow-hidden flex items-center shadow-2xl"
        >
          {/* Animated Internal Mist / Mesh - Apple Style */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-60 pointer-events-none"></div>
          
          <div className={`relative h-full w-full flex items-center transition-all duration-700 ${isShrunk ? 'px-4 justify-center' : 'px-8 justify-between'}`}>
            {/* Logo Section */}
            <div className={`flex items-center transition-all duration-700 delay-100
              ${isShrunk ? 'scale-90' : 'scale-100'}
            `}>
              <div className="h-8 md:h-9 w-auto flex items-center">
                <img 
                  src="./assets/characters/tnt-logo-official.png" 
                  alt="TNT Dental" 
                  className="h-full w-auto object-contain brightness-0 invert" 
                />
              </div>
            </div>
            
            {/* Navigation Links - Full Menu */}
            <div className={`flex items-center justify-center gap-10 font-mono text-[10px] uppercase tracking-[0.3em] text-white/60 transition-all duration-700
              ${isScrolled && !isScrollingUp ? 'opacity-0 absolute translate-y-10 pointer-events-none' : 'opacity-100 translate-y-0'}
            `}>
              <a href="#hero" className="hover:text-plasma-pink hover:scale-110 transition-all duration-500 whitespace-nowrap">Casa</a>
              <a href="#stack" className="hover:text-plasma-purple hover:scale-110 transition-all duration-500 whitespace-nowrap">The Characters</a>
              <a href="#footer" className="hover:text-plasma-blue hover:scale-110 transition-all duration-500 whitespace-nowrap">All Templates</a>
            </div>

            {/* Spacer */}
            {!isShrunk && <div className="w-[50px] hidden md:block opacity-0"></div>}
          </div>
        </nav>
      </div>
    </div>
  );
}
