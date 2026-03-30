import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

const DOODLES = [
  { id: 'star', d: "M25 5 L31 18 L45 18 L34 26 L38 40 L25 32 L12 40 L16 26 L5 18 L19 18 Z", width: 60, height: 60 },
  { id: 'smiley', d: "M25 5 A20 20 0 1 0 25 45 A20 20 0 1 0 25 5 M18 18 L18 20 M32 18 L32 20 M15 30 Q25 40 35 30", width: 60, height: 60 },
  { id: 'arrow', d: "M5 40 Q25 5 45 40 M32 25 L45 40 L50 25", width: 80, height: 80 },
  { id: 'tnt-circle', d: "M25 5 A20 20 0 1 0 25 45 A20 20 0 1 0 25 5 M15 25 L20 25 M22 25 L28 25 M30 25 L35 25", text: "TNT", width: 70, height: 70 },
  { id: 'clapper', d: "M5 15 L45 15 L45 45 L5 45 Z M5 15 L45 5 M15 15 L15 5 M35 15 L35 5", width: 60, height: 60 },
  { id: 'scribble', d: "M5 25 C15 15 25 35 35 25 S45 15 60 25", width: 100, height: 40 },
  { id: 'film', d: "M5 10 L45 10 L45 40 L5 40 Z M10 10 L10 40 M40 10 L40 40 M5 18 L10 18 M5 25 L10 25 M5 32 L10 32 M40 18 L45 18 M40 25 L45 25 M40 32 L45 32", width: 70, height: 70 },
  { id: 'x-mark', d: "M10 10 L40 40 M40 10 L10 40", width: 50, height: 50 }
];

export default function DoodleOverlay() {
  const [activeDoodles, setActiveDoodles] = useState([]);

  useEffect(() => {
    console.log("DoodleOverlay: Mounted and starting spawn cycle.");
    
    const spawnDoodle = () => {
      setActiveDoodles(prev => {
        if (prev.length >= 6) return prev; // Allowing more for testing

        const doodleType = DOODLES[Math.floor(Math.random() * DOODLES.length)];
        const id = Math.random().toString(36).substr(2, 9);
        
        const newDoodle = {
          ...doodleType,
          uniqueId: id,
          x: Math.random() * 80 + 10,
          y: Math.random() * 80 + 10,
          rotation: Math.random() * 90 - 45,
          scale: Math.random() * 0.5 + 1.2 // Made even larger
        };

        console.log(`DoodleOverlay: Spawning ${newDoodle.id} at ${newDoodle.x}%, ${newDoodle.y}%`);
        return [...prev, newDoodle];
      });

      // Clear doodle after animation
      setTimeout(() => {
        setActiveDoodles(prev => prev.filter(d => !prev.find(p => p.uniqueId === d.uniqueId && Date.now() - parseInt(d.uniqueId, 36) > 7000)));
        // Note: the logic above is a bit flawed, let's just use a simple timeout for each id inside the state update or a separate effect.
      }, 8000);
    };

    // Initial spawn
    spawnDoodle();
    
    const interval = setInterval(spawnDoodle, 3000);
    return () => clearInterval(interval);
  }, []); // Only run once on mount

  // Cleanup effect for doodles
  useEffect(() => {
    const timer = setInterval(() => {
        setActiveDoodles(prev => prev.slice(-6)); // Just keep the latest 6 for safety
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[999] overflow-hidden select-none">
      {activeDoodles.map((doodle) => (
        <Doodle key={doodle.uniqueId} doodle={doodle} onComplete={() => {
            setActiveDoodles(prev => prev.filter(d => d.uniqueId !== doodle.uniqueId));
        }} />
      ))}
    </div>
  );
}

function Doodle({ doodle, onComplete }) {
  const doodleRef = useRef(null);

  useEffect(() => {
    const el = doodleRef.current;
    if (!el) return;

    const path = el.querySelector('path');
    if (!path) return;
    
    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

    const tl = gsap.timeline({
      onComplete: () => {
        // Optional: wait a bit before calling onComplete to let it fade out
        setTimeout(onComplete, 1000);
      }
    });

    tl.to(path, {
      strokeDashoffset: 0,
      duration: 1.5,
      ease: "power2.out"
    })
    .to(el, {
      opacity: 1,
      duration: 0.5
    }, 0)
    .to(el, {
       opacity: 0,
       scale: 0.8,
       delay: 5,
       duration: 1.5,
       ease: "power2.inOut"
    });

    if (doodle.text) {
      tl.fromTo(el.querySelector('text'), { opacity: 0 }, { opacity: 1, duration: 1 }, 1);
    }
    
    return () => tl.kill();
  }, [doodle, onComplete]);

  return (
    <div 
      ref={doodleRef}
      className="absolute opacity-0"
      style={{ 
        left: `${doodle.x}%`, 
        top: `${doodle.y}%`, 
        transform: `rotate(${doodle.rotation}deg) scale(${doodle.scale})` 
      }}
    >
      <svg width={doodle.width} height={doodle.height} viewBox={`0 0 ${doodle.width} ${doodle.height}`} className="overflow-visible">
        <path 
          d={doodle.d} 
          fill="none" 
          stroke="white" 
          strokeWidth="3" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="drop-shadow-[0_0_12px_rgba(255,255,255,0.5)]"
        />
        {doodle.text && (
          <text 
            x="25" 
            y="28" 
            textAnchor="middle" 
            className="font-serif italic text-[12px] fill-white"
          >
            {doodle.text}
          </text>
        )}
      </svg>
    </div>
  );
}
