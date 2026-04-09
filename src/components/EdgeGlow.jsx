import ReactDOM from 'react-dom';
import './EdgeGlow.css'; // We'll add corresponding styles here

export default function EdgeGlow() {
  return ReactDOM.createPortal(
    <>
      <div className="siri-glow pointer-events-none select-none z-[9999]">
        <div className="siri-glow__edge siri-glow__top"></div>
        <div className="siri-glow__edge siri-glow__right"></div>
        <div className="siri-glow__edge siri-glow__bottom"></div>
        <div className="siri-glow__edge siri-glow__left"></div>
      </div>
      {/* Global Grain/Noise Texture kept from old component */}
      <div className="fixed inset-0 select-none opacity-[0.05] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-[2]"></div>
    </>,
    document.body
  );
}
