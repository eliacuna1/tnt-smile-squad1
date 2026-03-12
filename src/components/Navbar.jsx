export default function Navbar() {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-7xl rounded-full bg-obsidian/50 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-plasma-purple/10 to-plasma-pink/10 pointer-events-none mix-blend-overlay"></div>
      <div className="px-6 py-4 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          {/* Logo container */}
          <div className="h-8 md:h-10 w-auto flex items-center">
            <img 
              src="./assets/characters/tnt-logo-final.png" 
              alt="TNT Dental" 
              className="h-full w-auto object-contain brightness-0 invert" 
              // Using brightness-0 invert to make it Ghost White. If the logo is already white, remove this class later.
            />
          </div>
        </div>
        
        {/* Optional Navigation Links or CTA */}
        <div className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-[0.2em] text-ghost/70">
          <a href="#hero" className="hover:text-plasma-pink transition-colors">The Reveal</a>
          <a href="#stack" className="hover:text-plasma-purple transition-colors">Archive</a>
          <a href="#footer" className="hover:text-plasma-blue transition-colors">Select</a>
        </div>

        <button className="px-5 py-2 rounded-full border border-plasma-purple/50 text-plasma-purple font-mono text-xs uppercase tracking-widest hover:bg-plasma-purple hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(157,78,221,0.3)] hover:shadow-[0_0_25px_rgba(157,78,221,0.6)]">
          Launch
        </button>
      </div>
    </nav>
  );
}
