import React from 'react';

interface GlitchTextProps {
  text: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  as?: 'h1' | 'h2' | 'p' | 'span';
  className?: string;
  color?: string;
}

const GlitchText: React.FC<GlitchTextProps> = ({ 
  text, 
  size = 'lg', 
  as: Component = 'h1', 
  className = '',
  color = 'text-white'
}) => {
  // We inject the styles dynamically to keep them encapsulated
  const glitchStyles = `
    .glitch-wrapper {
      position: relative;
    }
    
    .glitch-effect::before,
    .glitch-effect::after {
      content: attr(data-text);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    .glitch-effect::before {
      left: 2px;
      text-shadow: -2px 0 #8B0000;
      clip-path: inset(44px 0 56px 0); /* CSS clip-path replaces obsolete clip: rect() */
      animation: glitch-anim 5s infinite linear alternate-reverse;
    }

    .glitch-effect::after {
      left: -2px;
      text-shadow: -2px 0 #00fff9, 2px 2px #8B0000;
      animation: glitch-anim2 1s infinite linear alternate-reverse;
    }

    @keyframes glitch-anim {
      0% { clip-path: inset(20% 0 80% 0); transform: skew(0.37deg); }
      20% { clip-path: inset(60% 0 10% 0); transform: skew(0.32deg); }
      40% { clip-path: inset(40% 0 50% 0); transform: skew(0.73deg); }
      60% { clip-path: inset(80% 0 5% 0); transform: skew(0.26deg); }
      80% { clip-path: inset(10% 0 60% 0); transform: skew(0.92deg); }
      100% { clip-path: inset(30% 0 30% 0); transform: skew(0.18deg); }
    }

    @keyframes glitch-anim2 {
      0% { clip-path: inset(10% 0 30% 0); transform: skew(0.36deg); }
      20% { clip-path: inset(80% 0 10% 0); transform: skew(0.72deg); }
      40% { clip-path: inset(30% 0 20% 0); transform: skew(0.54deg); }
      60% { clip-path: inset(15% 0 70% 0); transform: skew(0.06deg); }
      80% { clip-path: inset(55% 0 5% 0); transform: skew(0.2deg); }
      100% { clip-path: inset(40% 0 40% 0); transform: skew(0.86deg); }
    }

    @keyframes flicker {
      0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100% { opacity: 0.99; }
      20%, 21.999%, 63%, 63.999%, 65%, 69.999% { opacity: 0.4; }
    }
  `;

  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl md:text-6xl',
    xl: 'text-6xl md:text-8xl'
  };

  return (
    <>
      <style>{glitchStyles}</style>
      <div className="glitch-wrapper inline-block">
        <Component 
          className={`glitch-effect ${color} ${sizeClasses[size]} font-righteous tracking-wider ${className}`}
          data-text={text}
          style={{ animation: 'flicker 3.732s infinite linear alternate-reverse' }}
        >
          {text}
        </Component>
      </div>
    </>
  );
};

export default GlitchText;