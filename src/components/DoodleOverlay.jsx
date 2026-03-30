import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

const DOODLES = [
  // Star
  { id: 'star', d: "M25 5 L31 18 L45 18 L34 26 L38 40 L25 32 L12 40 L16 26 L5 18 L19 18 Z", width: 50, height: 50 },
  // Smiley
  { id: 'smiley', d: "M25 5 A20 20 0 1 0 25 45 A20 20 0 1 0 25 5 M18 18 L18 20 M32 18 L32 20 M15 30 Q25 40 35 30", width: 50, height: 50 },
  // Arrow
  { id: 'arrow', d: "M10 25 Q25 10 40 25 M30 15 L40 25 L30 35", width: 50, height: 50 },
  // Circle TNT
  { id: 'tnt-circle', d: "M25 5 A20 20 0 1 0 25 45 A20 20 0 1 0 25 5 M15 25 L20 25 M22 25 L28 25 M30 25 L35 25", text: "TNT", width: 50, height: 50 },
  // Clapper
  { id: 'clapper', d: "M5 15 L45 15 L45 45 L5 45 Z M5 15 L45 5 M15 15 L15 5 M35 15 L35 5", width: 50, height: 50 },
  // Scribble
  { id: 'scribble', d: "M5 25 C15 15 25 35 35 25 S45 15 50 25", width: 60, height: 50 },
  // Film Strip
  { id: 'film', d: "M5 10 L45 10 L45 40 L5 40 Z M10 10 L10 40 M40 10 L40 40 M5 18 L10 18 M5 25 L10 25 M5 32 L10 32 M40 18 L45 18 M40 25 L45 25 M40 32 L45 32", width: 50, height: 50 }
];

export default function DoodleOverlay() {
  const containerRef = useRef(null);
  const [activeDoodles, setActiveDoodles] = useState([]);

  useEffect(() => {
    const spawnDoodle = () => {
      if (activeDoodles.length >= 3) return;

      const doodleType = DOODLES[Math.floor(Math.random() * DOODLES.length)];
      const id = Math.random().toString(36).substr(2, 9);
      
      const newDoodle = {
        ...doodleType,
        uniqueId: id,
        x: Math.random() * 90 + 5, // 5% to 95%
        y: Math.random() * 90 + 5,
        rotation: Math.random() * 40 - 20,
        scale: Math.random() * 0.5 + 0.8
      };

      setActiveDoodles(prev => [...prev, newDoodle]);

      // Remove after animation
      setTimeout(() => {
        setActiveDoodles(prev => prev.filter(d => d.uniqueId !== id));
      }, 6000);
    };

    const interval = setInterval(spawnDoodle, 3000);
    return () => clearInterval(interval);
  }, [activeDoodles]);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[1] overflow-hidden select-none">
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
      duration: 1.5,
      ease: "power2.inOut"
    })
    .to(el, {
      opacity: 1,
      duration: 0.5
    }, 0)
    .to(path, {
       opacity: 0,
       delay: 3,
       duration: 1,
       ease: "power1.inOut"
    });

    if (doodle.text) {
      tl.fromTo(el.querySelector('text'), { opacity: 0 }, { opacity: 0.6, duration: 1 }, 1);
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
      <svg width={doodle.width} height={doodle.height} viewBox={`0 0 50 50`} className="overflow-visible">
        <path 
          d={doodle.d} 
          fill="none" 
          stroke="white" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="opacity-40"
        />
        {doodle.text && (
          <text 
            x="25" 
            y="28" 
            textAnchor="middle" 
            className="font-serif italic text-[8px] fill-white opacity-0"
          >
            {doodle.text}
          </text>
        )}
      </svg>
    </div>
  );
}
