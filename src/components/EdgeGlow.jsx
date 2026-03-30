export default function EdgeGlow() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden select-none">
      {/* Top Left Glow - Cyan/Teal */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.08)_0%,transparent_70%)] blur-[120px] opacity-60"></div>
      
      {/* Top Right Glow - Soft Blue */}
      <div className="absolute top-[-15%] right-[-10%] w-[50%] h-[40%] bg-[radial-gradient(circle_at_center,rgba(0,120,255,0.06)_0%,transparent_70%)] blur-[140px] opacity-40"></div>
      
      {/* Bottom Left Glow - Magenta/Purple Blend */}
      <div className="absolute bottom-[-10%] left-[-15%] w-[45%] h-[45%] bg-[radial-gradient(circle_at_center,rgba(255,0,255,0.04)_0%,transparent_70%)] blur-[150px] opacity-30"></div>
      
      {/* Bottom Right Glow - Cyan/Blue Mix */}
      <div className="absolute bottom-[-15%] right-[-15%] w-[50%] h-[50%] bg-[radial-gradient(circle_at_center,rgba(0,200,255,0.05)_0%,transparent_70%)] blur-[140px] opacity-50"></div>

      {/* Side Edge Glows for Depth */}
      <div className="absolute top-0 left-0 w-[5vw] h-full bg-gradient-to-r from-cyan-500/5 to-transparent blur-[80px] opacity-20"></div>
      <div className="absolute top-0 right-0 w-[5vw] h-full bg-gradient-to-l from-blue-500/5 to-transparent blur-[80px] opacity-20"></div>
      
      {/* Subtle Grain Overlay for Texture */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
    </div>
  );
}
