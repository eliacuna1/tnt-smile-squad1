export default function Footer() {
  return (
    <footer className="w-full bg-obsidian py-8 border-t border-white/5 flex items-center justify-center">
      <div className="flex items-center gap-8">
        <div className="h-8 w-auto flex items-center">
          <img 
            src="./assets/characters/tnt-logo-official.png" 
            alt="TNT Dental" 
            className="h-full w-auto object-contain brightness-0 invert opacity-40 hover:opacity-100 transition-opacity duration-700" 
          />
        </div>
        
        {/* Subtle Divider */}
        <div className="h-4 w-[1px] bg-white/10"></div>
        
        <p className="text-[10px] uppercase tracking-[0.4em] font-mono text-ghost/20 font-bold whitespace-nowrap">
          All rights reserved.
        </p>
      </div>
    </footer>
  );
}
