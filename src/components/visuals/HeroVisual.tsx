import React from 'react';
import scene from '../../assets/hero-scene.jpg';

// The rendered scene (robot, light rays, browser) is 1584 x 984.
// Overlays use the same viewBox / percentages so they sit exactly on top of it.

const tileIcons: Record<string, React.ReactNode> = {
  doc: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" className="w-1/2 h-1/2">
      <path d="M6 3h8l4 4v14H6z" />
      <path d="M14 3v4h4M9 12h6M9 15h6M9 18h4" strokeLinecap="round" />
    </svg>
  ),
  db: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-1/2 h-1/2">
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" />
    </svg>
  ),
  graph: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-1/2 h-1/2">
      <circle cx="12" cy="5" r="2.5" />
      <circle cx="5" cy="18" r="2.5" />
      <circle cx="19" cy="18" r="2.5" />
      <path d="M12 7.5v5M12 12.5l-5.3 3.8M12 12.5l5.3 3.8" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" className="w-1/2 h-1/2">
      <path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z" />
      <path d="m8.5 12 2.5 2.5 4.5-5" strokeLinecap="round" />
    </svg>
  ),
};

// Slot positions (in % of the scene) and stagger delays for the collect animation.
const TILES = [
  { key: 'doc', tone: 'orange', x: 7.2, y: 43.6, w: 6.6, r: -6, d: 0 },
  { key: 'db', tone: 'purple', x: 15.7, y: 49.4, w: 7.2, r: 0, d: 0.45 },
  { key: 'graph', tone: 'orange', x: 25.1, y: 56.2, w: 7.7, r: 0, d: 0.9 },
  { key: 'shield', tone: 'blue', x: 37.1, y: 61.1, w: 8.5, r: 0, d: 1.35 },
];

// Paths traced over the rays in the render; a soft light pulse travels along them.
const UPPER_RAY = 'M0 430 C220 420 520 452 840 440';
const LOWER_RAY = 'M0 455 C180 520 330 680 560 755 C640 778 700 780 770 772';
const BEAM = 'M842 438 C960 438 1070 456 1166 482';

export function HeroVisual() {
  return (
    <div className="relative w-full flex items-center justify-center">
      {/* Ambient warm orange blur behind the right edge matching the background blob */}
      <div
        className="absolute -right-10 top-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full blur-3xl pointer-events-none -z-10 opacity-70"
        style={{
          background: 'radial-gradient(circle, rgba(255, 106, 44, 0.4) 0%, rgba(255, 61, 110, 0.18) 45%, transparent 70%)',
        }}
      />

      <div className="visual" aria-hidden="true">
        <img className="visual__scene" src={scene} alt="Perfox Autonomous Scene" draggable="false" />

        <svg className="visual__fx" viewBox="0 0 1584 984" fill="none">
          <defs>
            <filter id="pulseBlur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="5" />
            </filter>
          </defs>
          <path className="pulse pulse--slow" d={UPPER_RAY} stroke="#ffc58a" strokeWidth="10" filter="url(#pulseBlur)" />
          <path className="pulse pulse--slower" d={LOWER_RAY} stroke="#ff9ec4" strokeWidth="14" filter="url(#pulseBlur)" />
          <path className="pulse pulse--fast" d={BEAM} stroke="#fff1dc" strokeWidth="10" strokeLinecap="round" filter="url(#pulseBlur)" />
        </svg>

        {/* glows synced to the collect cycle */}
        <span className="fx-glow fx-glow--chest" />
        <span className="fx-glow fx-glow--card" />

        {TILES.map((t) => (
          <div
            key={t.key}
            className={`tile tile--${t.tone}`}
            style={{
              '--x': `${t.x}%`,
              '--y': `${t.y}%`,
              '--w': `${t.w}%`,
              '--r': `${t.r}deg`,
              '--d': `${t.d}s`,
            } as React.CSSProperties}
          >
            {tileIcons[t.key]}
          </div>
        ))}
      </div>
    </div>
  );
}

export default HeroVisual;
