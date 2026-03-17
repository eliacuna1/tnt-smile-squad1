export default function Footer() {
  return (
    <footer className="w-full bg-obsidian py-32 flex flex-col items-center justify-center gap-6 border-t border-white/5">
      <div className="h-14 w-auto flex items-center mb-2">
        <img 
          src="./assets/characters/tnt-logo-official.png" 
          alt="TNT Dental" 
          className="h-full w-auto object-contain brightness-0 invert opacity-40 hover:opacity-100 transition-opacity duration-700" 
        />
      </div>
      <div className="flex flex-col items-center gap-4">
        <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <p className="text-[10px] uppercase tracking-[0.5em] font-mono text-ghost/20 font-bold">
          All rights reserved.
        </p>
      </div>
    </footer>
  );
}
