import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

const DOODLES = [
  // Star
  { id: 'star', d: "M25 5 L31 18 L45 18 L34 26 L38 40 L25 32 L12 40 L16 26 L5 18 L19 18 Z", width: 60, height: 60 },
  // Smiley
  { id: 'smiley', d: "M25 5 A20 20 0 1 0 25 45 A20 20 0 1 0 25 5 M18 18 L18 20 M32 18 L32 20 M15 30 Q25 40 35 30", width: 60, height: 60 },
  // Arrow
  { id: 'arrow', d: "M5 40 Q25 5 45 40 M32 25 L45 40 L50 25", width: 80, height: 80 },
  // Circle TNT
  { id: 'tnt-circle', d: "M25 5 A20 20 0 1 0 25 45 A20 20 0 1 0 25 5 M15 25 L20 25 M22 25 L28 25 M30 25 L35 25", text: "TNT", width: 70, height: 70 },
  // Clapper
  { id: 'clapper', d: "M5 15 L45 15 L45 45 L5 45 Z M5 15 L45 5 M15 15 L15 5 M35 15 L35 5", width: 60, height: 60 },
  // Scribble Underline
  { id: 'scribble', d: "M5 25 C15 15 25 35 35 25 S45 15 60 25", width: 100, height: 40 },
  // Film Strip
  { id: 'film', d: "M5 10 L45 10 L45 40 L5 40 Z M10 10 L10 40 M40 10 L40 40 M5 18 L10 18 M5 25 L10 25 M5 32 L10 32 M40 18 L45 18 M40 25 L45 25 M40 32 L45 32", width: 70, height: 70 },
  // Rough X
  { id: 'x-mark', d: "M10 10 L40 40 M40 10 L10 40", width: 50, height: 50 }
];

export default function DoodleOverlay() {
  const containerRef = useRef(null);
  const [activeDoodles, setActiveDoodles] = useState([]);

  useEffect(() => {
    const spawnDoodle = () => {
      // Increase max concurrent doodles
      if (activeDoodles.length >= 4) return;

      const doodleType = DOODLES[Math.floor(Math.random() * DOODLES.length)];
      const id = Math.random().toString(36).substr(2, 9);
      
      const newDoodle = {
        ...doodleType,
        uniqueId: id,
        x: Math.random() * 85 + 7.5, // Buffer from edges
        y: Math.random() * 85 + 7.5,
        rotation: Math.random() * 60 - 30, // More dynamic rotation
        scale: Math.random() * 0.4 + 1.0 // Slightly larger
      };

      setActiveDoodles(prev => [...prev, newDoodle]);

      // Remove after animation (slightly longer visible time)
      setTimeout(() => {
        setActiveDoodles(prev => prev.filter(d => d.uniqueId !== id));
      }, 7000);
    };

    // More frequent spawns
    const interval = setInterval(spawnDoodle, 2500);
    return () => clearInterval(interval);
  }, [activeDoodles]);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[100] overflow-hidden select-none">
      {activeDoodles.map((doodle) => (
        <Doodle key={doodle.uniqueId} doodle={doodle} />
      ))}
    </div>
  );
}

function Doodle({ doodle }) {
  const doodleRef = useRef(null);

  useEffect(() => {
    const el = doodleRef.current;
    if (!el) return;

    const path = el.querySelector('path');
    const length = path.getTotalLength();

    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

    const tl = gsap.timeline();

    tl.to(path, {
      strokeDashoffset: 0,
      duration: 1.2,
      ease: "power2.out"
    })
    .to(el, {
      opacity: 1,
      duration: 0.4
    }, 0)
    .to(el, {
       opacity: 0,
       scale: 0.9,
       delay: 4,
       duration: 1.2,
       ease: "power2.inOut"
    });

    if (doodle.text) {
      tl.fromTo(el.querySelector('text'), { opacity: 0 }, { opacity: 0.8, duration: 0.8 }, 0.8);
    }

  }, [doodle]);

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
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="opacity-80 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
        />
        {doodle.text && (
          <text 
            x="25" 
            y="28" 
            textAnchor="middle" 
            className="font-serif italic text-[10px] fill-white opacity-0"
          >
            {doodle.text}
          </text>
        )}
      </svg>
    </div>
  );
}
