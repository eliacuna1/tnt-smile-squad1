import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const LibraryPortal = () => {
  const [visibleCards, setVisibleCards] = useState(new Set());

  useEffect(() => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.dataset.id;
                setVisibleCards(prev => new Set([...prev, id]));
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.library-card').forEach(card => {
        observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  const sections = [
    {
      id: 'new-patient',
      tag: 'High Velocity',
      title: 'New Patient Campaigns',
      description: 'High-converting AI ad templates designed to drive consistent new patient flow. Built to capture attention and turn visitors into booked appointments.',
      image: './assets/new-patients.png',
      color: 'blue',
      path: '/new-patient-campaigns'
    },
    {
      id: 'emergency',
      tag: 'Urgency Driven',
      title: 'Emergency Conversion',
      description: 'Urgency-driven AI ads built for immediate action. Optimized for high-intent searches and converting emergency cases into same-day calls.',
      image: './assets/emergency.png',
      color: 'pink',
      path: '/emergency-conversion'
    },
    {
      id: 'implants',
      tag: 'High Value',
      title: 'Dental Implants',
      description: 'Premium AI campaigns focused on high-value procedures. Designed to educate, build trust, and convert prospects into qualified consultations.',
      image: './assets/implants.png',
      color: 'orange',
      path: '/dental-implants'
    },
    {
      id: 'cosmetic',
      tag: 'Aesthetic Focus',
      title: 'Smile Transformation',
      description: 'Transformation-focused AI templates highlighting lifestyle benefits. Designed to increase perceived value and build desire for smile makeovers.',
      image: './assets/cosmetic.png',
      color: 'purple',
      path: '/smile-transformation'
    }
  ];

  const getColorClass = (color) => {
    switch(color) {
      case 'blue': return 'text-plasma-blue border-plasma-blue';
      case 'pink': return 'text-plasma-pink border-plasma-pink';
      case 'orange': return 'text-plasma-orange border-plasma-orange';
      case 'purple': return 'text-plasma-purple border-plasma-purple';
      default: return 'text-ghost border-ghost';
    }
  };

  return (
    <div className="min-h-screen bg-obsidian text-ghost font-inter relative overflow-hidden flex flex-col items-center">
      <header className="relative py-32 px-6 text-center max-w-4xl flex flex-col items-center justify-center min-h-[60vh]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(157,78,221,0.1)_0%,transparent_70%)] pointer-events-none"></div>
        <div className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-plasma-blue mb-4 opacity-80">
          Central Repository v2.0
        </div>
        <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl mb-8 leading-[0.9] bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">
          TNT AI & Creative<br/>Ad Library
        </h1>
        <p className="text-ghost/60 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
          The front door to the world’s most advanced AI-driven dental ad templates. 
          Designed to elevate branding while maximizing conversion.
        </p>
      </header>

      <main className="w-full max-w-[1400px] px-6 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sections.map((section) => (
            <Link
              to={section.path}
              key={section.id}
              data-id={section.id}
              className={`library-card relative aspect-[16/10] rounded-[32px] overflow-hidden border border-white/10 bg-white/5 cursor-pointer 
                          transition-all duration-[800ms] cubic-bezier(0.16,1,0.3,1) group
                          ${visibleCards.has(section.id) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                          hover:-translate-y-3 hover:scale-[1.02] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] hover:border-white/30`}
            >
              <img 
                src={section.image} 
                alt={section.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[800ms] cubic-bezier(0.16,1,0.3,1) group-hover:scale-110 -z-10"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/40 to-transparent z-0"></div>
              
              <div className="relative h-full flex flex-col justify-end p-8 md:p-12 z-10">
                <div className={`font-mono text-[0.65rem] uppercase py-1 px-3 rounded-full bg-white/10 backdrop-blur-md mb-4 inline-block border w-fit ${getColorClass(section.color)}`}>
                  {section.tag}
                </div>
                <h2 className="font-serif text-4xl md:text-5xl mb-3 text-white">
                   {section.title}
                </h2>
                <p className="text-white/60 text-sm md:text-base line-clamp-2 max-w-md mb-6 transition-opacity duration-300 group-hover:opacity-100">
                  {section.description}
                </p>
                <div className="flex items-center gap-2 font-bold text-sm transition-all duration-300 transform group-hover:translate-x-1">
                  Launch Category Page
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <footer className="w-full py-16 text-center border-t border-white/10 text-[0.75rem] text-ghost/40 font-mono uppercase tracking-widest">
        &copy; 2024 TNT AI Lab. Built to elevate dental marketing.
      </footer>
    </div>
  );
};

export default LibraryPortal;
