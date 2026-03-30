import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function EdgeGlow() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Subtle pulse and sweep for the 'Siri' effect
      gsap.to('.glow-layer', {
        scale: 1.1,
        opacity: (i) => i % 2 === 0 ? 0.8 : 0.6,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          each: 2,
          from: "random"
        }
      });

      // Ambient sweep - slow migration of light
      gsap.to('.glow-sweep', {
        x: '20vw',
        y: '10vh',
        duration: 12,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden select-none bg-black">
      {/* Top Left Glow - Cyan/Teal (Main Siri-style accent) */}
      <div className="glow-layer absolute top-[-10%] left-[-15%] w-[50%] h-[50%] bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.15)_0%,transparent_70%)] blur-[180px] opacity-70"></div>
      
      {/* Top Right Glow - Soft Blue/Indigo */}
      <div className="glow-layer absolute top-[-15%] right-[-15%] w-[60%] h-[50%] bg-[radial-gradient(circle_at_center,rgba(0,100,255,0.12)_0%,transparent_70%)] blur-[200px] opacity-50"></div>
      
      {/* Bottom Left Glow - Vibrant Magenta/Purple (Deep Base) */}
      <div className="glow-layer absolute bottom-[-10%] left-[-20%] w-[55%] h-[55%] bg-[radial-gradient(circle_at_center,rgba(255,0,255,0.1)_0%,transparent_70%)] blur-[220px] opacity-40"></div>
      
      {/* Bottom Right Glow - Cyan/Teal (Secondary Frame) */}
      <div className="glow-layer absolute bottom-[-15%] right-[-15%] w-[60%] h-[60%] bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.12)_0%,transparent_70%)] blur-[180px] opacity-60"></div>

      {/* Side Edge Highlighters (Stronger presence on sides) */}
      <div className="glow-sweep absolute top-0 left-[-5%] w-[20vw] h-full bg-gradient-to-r from-cyan-500/10 to-transparent blur-[120px] opacity-30"></div>
      <div className="glow-sweep absolute top-0 right-[-5%] w-[20vw] h-full bg-gradient-to-l from-blue-500/10 to-transparent blur-[120px] opacity-30"></div>
      
      {/* Additional Magenta Wash */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-[radial-gradient(circle_at_center,rgba(255,0,255,0.03)_0%,transparent_80%)] blur-[250px] opacity-20"></div>

      {/* Global Grain/Noise Texture */}
      <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none bg-[url('https://grainY-gradients.vercel.app/noise.svg')]"></div>
    </div>
  );
}
