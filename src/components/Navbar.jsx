import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  
  const currentPath = window.location.pathname;
  const isHome = currentPath.endsWith('index.html') || currentPath.endsWith('/') || (!currentPath.includes('.html') && !currentPath.split('/').pop());

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);

      if (currentScrollY < lastScrollY.current) {
        setIsScrollingUp(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsScrollingUp(false);
        setIsMobileMenuOpen(false);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isShrunk = (isScrolled && !isScrollingUp) || isMobileMenuOpen;

  const navLinks = [
    { label: 'Home', href: './index.html' },
    { label: 'New Patient', href: './new-patient.html' },
    { label: 'Emergency', href: './emergency.html' },
    { label: 'Implants', href: './implants.html' },
    { label: 'Smile Transformation', href: './transformation.html' }
  ];

  return (
    <div className={`fixed top-0 left-0 right-0 z-[100] w-full flex flex-col items-center transition-all duration-700 ${isScrolled ? 'pt-4' : 'pt-6'}`}>
      <div 
        className={`relative group transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]
          ${isScrolled ? 'w-[95%] max-w-6xl h-[60px]' : 'w-full px-8 md:px-16 h-[72px]'}
        `}
      >
        <nav 
          className={`relative h-full w-full flex items-center justify-between transition-all duration-500
            ${isScrolled ? 'bg-black/20 backdrop-blur-xl border border-white/10 rounded-full px-6 shadow-2xl' : 'bg-transparent px-0 border-transparent'}
          `}
        >
          {/* Logo Section */}
          <a href="./index.html" className="flex items-center gap-3 shrink-0">
             {!isHome && isScrolled && (
                <div className="p-1.5 rounded-full bg-white/5 border border-white/10 text-white/40 hover:text-white transition-all">
                  <ArrowLeft size={16} />
                </div>
             )}
             <div className="h-6 md:h-8 flex items-center">
                <span className="font-serif text-lg md:text-xl tracking-tighter text-white uppercase font-bold">
                  TNT <span className="opacity-40 italic font-light mx-1">/</span> Library
                </span>
             </div>
          </a>

          {/* Nav Links - Desktop */}
          <div className="hidden md:flex items-center gap-8 lg:gap-12">
            {navLinks.map((link) => (
              <a 
                key={link.label} 
                href={link.href} 
                className={`text-[10px] lg:text-[11px] font-sans uppercase tracking-[0.2em] transition-all duration-300 relative group/link
                  ${currentPath.endsWith(link.href.replace('./', '')) ? 'text-white font-bold' : 'text-white/50 hover:text-white'}
                `}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-[1px] bg-white transition-all duration-500 group-hover/link:w-full ${currentPath.endsWith(link.href.replace('./', '')) ? 'w-full' : 'w-0'}`}></span>
              </a>
            ))}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-white/70 hover:text-white transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[-1] md:hidden transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]
        ${isMobileMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-full pointer-events-none'}
      `}>
         <div className="h-screen w-full bg-black/95 backdrop-blur-3xl pt-32 px-10 flex flex-col justify-start">
            <div className="flex flex-col gap-10">
               {navLinks.map((link, i) => (
                 <a 
                   key={link.label} 
                   href={link.href} 
                   className="text-4xl font-serif text-white uppercase tracking-tight hover:italic transition-all duration-500"
                   onClick={() => setIsMobileMenuOpen(false)}
                 >
                   {link.label}
                 </a>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
}
