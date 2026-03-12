import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function MonsterCard({ variant, title, subtitle, color, image, index }) {
  const cardRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Entrance Animation
      gsap.fromTo(cardRef.current,
        { y: 100, opacity: 0, rotationX: 45 },
        { 
          y: 0, opacity: 1, rotationX: 0, 
          duration: 1.5, 
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 80%",
            end: "top 20%",
            toggleActions: "play none none reverse",
          }
        }
      );

      // Character-specific nested animations
      if (variant === 'zeek') {
        gsap.to('.q-mark', {
          rotationY: 360,
          duration: 4,
          repeat: -1,
          ease: "linear",
          stagger: 0.2
        });
        gsap.to('.q-mark', {
          y: -10,
          duration: 1.5,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          stagger: 0.3
        });
      }

      if (variant === 'olivia') {
        gsap.to('.scan-line', {
          y: 250,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut"
        });
      }

      if (variant === 'molar') {
        gsap.to('.pulse-ring', {
          scale: 2.5,
          opacity: 0,
          duration: 2,
          repeat: -1,
          ease: "power2.out",
          stagger: 0.4
        });
      }

      // Toothy interaction handled via ScrollTrigger or simple interval for visual flair
      if (variant === 'toothy') {
        let obj = { val: 0 };
        gsap.to(obj, {
          val: 100,
          duration: 3,
          repeat: -1,
          ease: "power4.out",
          onUpdate: () => {
            if(document.querySelector('.confidence-val')) {
              document.querySelector('.confidence-val').innerText = Math.round(obj.val) + "%";
            }
          }
        });
      }
    }, cardRef);

    return () => ctx.revert();
  }, [variant]);

  return (
    <div 
      ref={cardRef} 
      className={`relative w-full h-full rounded-[2rem] overflow-hidden shadow-2xl ${color} text-white flex flex-col justify-end p-8 border border-white/10`}
      style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}
    >
      {/* Background Image / Texture */}
      <div className="absolute inset-0 z-0">
        {image && <img src={image} alt={title} className="w-full h-full object-cover" />}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent mix-blend-multiply"></div>
      </div>

      {/* Unique Character Visualization */}
      <div 
        ref={animRef}
        className="absolute top-0 left-0 w-full h-2/3 flex items-center justify-center z-10 opacity-80 mix-blend-overlay pointer-events-none"
      >
        {variant === 'zeek' && (
          <div className="flex gap-4 perspective-1000">
            {['?', '?', '?'].map((q, i) => (
              <span key={i} className="q-mark text-6xl md:text-8xl font-serif font-bold opacity-80">{q}</span>
            ))}
          </div>
        )}

        {variant === 'olivia' && (
          <div className="relative w-32 h-32 md:w-48 md:h-48 border-4 border-white/30 rounded-[3rem] overflow-hidden flex items-center justify-center">
             <div className="w-16 h-8 border-b-4 border-white/80 rounded-b-full"></div>
             <div className="scan-line absolute top-0 -mt-10 left-0 w-full h-1 bg-white/80 shadow-[0_0_15px_rgba(255,255,255,0.8)]"></div>
          </div>
        )}

        {variant === 'molar' && (
          <div className="relative flex items-center justify-center">
            <div className="pulse-ring absolute w-24 h-24 border-2 border-white/50 rounded-lg"></div>
            <div className="pulse-ring absolute w-24 h-24 border-2 border-white/50 rounded-lg delay-200"></div>
            <div className="relative z-10 w-24 h-32 bg-white/90 rounded-t-3xl rounded-b-xl flex flex-col justify-end p-2 gap-1 shadow-inner">
               <div className="flex gap-1">
                 <div className="w-1/2 h-8 bg-gray-200 rounded-b-lg"></div>
                 <div className="w-1/2 h-8 bg-gray-200 rounded-b-lg"></div>
               </div>
            </div>
          </div>
        )}

        {variant === 'toothy' && (
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-32 h-40 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 flex items-center justify-center">
               <span className="text-5xl">🦷</span>
            </div>
            <div className="flex flex-col items-center">
                <span className="text-sm uppercase tracking-widest opacity-80 font-bold mb-1">Confidence</span>
                <span className="confidence-val text-6xl font-serif italic font-bold text-white shadow-sm">0%</span>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative z-20 bg-primary/40 backdrop-blur-lg -mx-8 -mb-8 p-8 border-t border-white/20">
        <h3 className="text-3xl font-sans font-bold mb-2 uppercase tracking-wide">{title}</h3>
        <p className="text-lg opacity-90 font-serif italic">{subtitle}</p>
      </div>
    </div>
  );
}
