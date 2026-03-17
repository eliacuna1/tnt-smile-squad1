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
      <nav 
        style={{ 
          width: isShrunk ? '180px' : '100%',
          height: isShrunk ? '60px' : '72px',
          transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)'
        }}
        className={`bg-obsidian/70 backdrop-blur-2xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)] rounded-full overflow-hidden group pointer-events-auto relative
          ${isShrunk ? 'translate-x-[0%] ml-0' : ''}
        `}
      >
        {/* Siri-style Premium Glow */}
        <div className={`absolute -inset-[2px] rounded-full opacity-100 transition-opacity duration-1000 pointer-events-none mix-blend-screen
          ${!isShrunk ? 'bg-gradient-to-r from-plasma-blue/20 via-plasma-purple/20 to-plasma-pink/20 blur-xl animate-siri-glow' : 'bg-transparent'}
        `}></div>
        
        {/* Animated Internal Mesh */}
        <div className={`absolute inset-0 bg-gradient-to-br from-white/5 to-transparent transition-opacity duration-700 ${isShrunk ? 'opacity-0' : 'opacity-100'}`}></div>

        <div className={`relative h-full flex items-center transition-all duration-700 ${isShrunk ? 'px-4 justify-center' : 'px-8 justify-between'}`}>
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
          <div className={`flex items-center justify-center gap-10 font-mono text-[10px] uppercase tracking-[0.3em] text-white/50 transition-all duration-700
            ${isShrunk ? 'opacity-0 absolute translate-y-10 pointer-events-none' : 'opacity-100 translate-y-0'}
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
  );
}
