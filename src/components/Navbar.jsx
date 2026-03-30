import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const lastScrollY = useRef(0);
  const location = useLocation();
  const isHome = location.pathname === '/';

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

  const getNavLinks = () => {
    if (isHome) {
      return [
        { label: 'Library', href: '#', active: true },
        { label: 'Campaigns', href: '#grid' },
        { label: 'AI Models', href: '#' }
      ];
    }
    return [
      { label: 'Creative Hub', href: '#', active: true },
      { label: 'Templates', href: '#stack' },
      { label: 'Strategy', href: '#' }
    ];
  };

  const navLinks = getNavLinks();

  return (
    <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-7xl flex flex-col items-center pointer-events-none transition-all duration-700`}>
      <div 
        className={`relative group pointer-events-auto transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]
          ${isShrunk ? 'md:w-[180px]' : 'w-full md:w-auto px-4 md:px-10'}
          h-[60px] md:h-[72px]
        `}
      >
        <div className="absolute -inset-[1.5px] rounded-full overflow-hidden pointer-events-none z-10">
           <div className="absolute inset-0 bg-gradient-to-r from-plasma-blue/50 via-plasma-purple/50 via-plasma-pink/50 via-plasma-green/50 to-plasma-blue/50 bg-[length:300%_100%] animate-siri-glow-border blur-[1px] opacity-70"></div>
        </div>

        <div className="absolute -inset-[15px] bg-gradient-to-r from-plasma-blue/10 via-plasma-purple/10 to-plasma-pink/10 rounded-full blur-3xl opacity-30 animate-siri-glow transition-opacity pointer-events-none"></div>

        <nav 
          className="relative h-full w-full bg-white/[0.04] backdrop-blur-[24px] border border-white/20 rounded-full overflow-hidden flex items-center shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
        >
          <div className="absolute top-0 left-0 right-0 h-[30%] bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none"></div>
          
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 via-purple-500/5 to-pink-500/5 pointer-events-none"></div>

          <div className={`relative h-full w-full flex items-center px-4 md:px-8 gap-6 md:gap-10
            ${isShrunk ? 'md:justify-center' : 'justify-between'}`}>
            
            <Link to="/" className={`flex items-center gap-3 transition-all duration-700 shrink-0
              ${isShrunk ? 'md:scale-90' : 'scale-100'}
            `}>
              {!isHome && !isShrunk && (
                <div className="p-1.5 md:p-2 rounded-full border border-white/10 hover:bg-white/10 transition-colors group flex items-center justify-center shrink-0">
                  <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 text-ghost group-hover:-translate-x-1 transition-transform" />
                </div>
              )}
              <div className="h-7 md:h-9 flex items-center">
                <span className="font-serif text-lg md:text-xl tracking-tight text-white whitespace-nowrap">
                  TNT <span className="text-ghost/40 font-light mx-1">/</span> Library
                </span>
              </div>
            </Link>
            
            <div className={`hidden md:flex items-center justify-center gap-10 font-mono text-[10px] uppercase tracking-[0.3em] text-white/70 transition-all duration-700
              ${isShrunk ? 'md:opacity-0 md:absolute md:translate-y-10 md:pointer-events-none' : 'opacity-100 translate-y-0'}
            `}>
              {navLinks.map((link) => (
                <a key={link.label} href={link.href} className="hover:text-white hover:scale-110 transition-all duration-500 whitespace-nowrap">
                  {link.label}
                </a>
              ))}
            </div>

            <button className={`hidden md:block px-5 py-2 rounded-full border border-plasma-purple/50 text-plasma-purple font-mono text-[10px] uppercase tracking-widest hover:bg-plasma-purple hover:text-white transition-all duration-500 shrink-0
              ${isShrunk ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'}
            `}>
              Book Demo
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}
