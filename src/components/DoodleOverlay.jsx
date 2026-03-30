import { useEffect, useState, useRef } from 'react';

export default function DoodleOverlay() {
  const [activeDoodles, setActiveDoodles] = useState([]);

  useEffect(() => {
    console.log("DoodleOverlay: STARTING");
    
    // Test doodle that spawns immediately and stays forever
    const testDoodle = {
      uniqueId: 'diagnostic-1',
      id: 'diagnostic-star',
      x: 50,
      y: 50,
      rotation: 0,
      scale: 2,
      d: "M25 5 L31 18 L45 18 L34 26 L38 40 L25 32 L12 40 L16 26 L5 18 L19 18 Z",
      width: 100,
      height: 100
    };

    setActiveDoodles([testDoodle]);

    const interval = setInterval(() => {
        const id = 'doodle-' + Math.random().toString(36).substr(2, 5);
        const newDoodle = {
            uniqueId: id,
            id: 'random-doodle',
            x: Math.random() * 80 + 10,
            y: Math.random() * 80 + 10,
            rotation: Math.random() * 180,
            scale: 1.5,
            d: "M5 40 Q25 5 45 40 M32 25 L45 40 L50 25", // Arrow
            width: 100, height: 100
        };
        setActiveDoodles(prev => [...prev.slice(-5), newDoodle]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      id="doodle-overlay-container"
      className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden select-none flex items-center justify-center"
      style={{ backgroundColor: 'transparent' }}
    >
      <div className="absolute top-10 left-10 bg-red-600 text-white p-2 text-xs font-bold z-[10000] rounded">
        ATMOSPHERE LAYER ACTIVE
      </div>
      
      {activeDoodles.map((doodle) => (
        <div 
          key={doodle.uniqueId}
          className="absolute"
          style={{ 
            left: `${doodle.x}%`, 
            top: `${doodle.y}%`, 
            transform: `translate(-50%, -50%) rotate(${doodle.rotation}deg) scale(${doodle.scale})`,
            transition: 'opacity 1s ease-in-out'
          }}
        >
          <svg width={doodle.width} height={doodle.height} viewBox={`0 0 50 50`} className="overflow-visible">
            <path 
              d={doodle.d} 
              fill="none" 
              stroke="#ff00ff" 
              strokeWidth="4" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="drop-shadow-[0_0_15px_rgba(255,0,255,1)]"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
