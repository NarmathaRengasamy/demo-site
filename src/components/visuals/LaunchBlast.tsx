import React, { useEffect, useRef } from "react";

interface LaunchBlastProps {
  onDone: () => void;
  title?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  spin: number;
  size: number;
  color: string;
  alpha: number;
  shape: "rect" | "circle" | "spark";
  decay: number;
}

// Sophisticated brand-aligned palette: Ember Orange, Coral, Emerald, Starlight White & Indigo
const COLORS = [
  "#ff8a2b", "#ff5c00", "#ff3d6e", "#00e5a3",
  "#facc15", "#818cf8", "#ffffff"
];

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
}

function createParticle(cx: number, cy: number): Particle {
  const angle = randomBetween(0, Math.PI * 2);
  const speed = randomBetween(5, 20);
  const shapes: Particle["shape"][] = ["rect", "circle", "spark"];
  return {
    x: cx,
    y: cy,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed - randomBetween(3, 9),
    angle: randomBetween(0, Math.PI * 2),
    spin: randomBetween(-0.25, 0.25),
    size: randomBetween(5, 10),
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    alpha: 1,
    shape: shapes[Math.floor(Math.random() * shapes.length)],
    decay: randomBetween(0.016, 0.026),
  };
}

export function LaunchBlast({ onDone, title }: LaunchBlastProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const particles = useRef<Particle[]>([]);
  const startTime = useRef(Date.now());
  const doneCalled = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const updateDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateDimensions();

    let resizeRafId: number | null = null;
    const handleResize = () => {
      if (resizeRafId !== null) cancelAnimationFrame(resizeRafId);
      resizeRafId = requestAnimationFrame(() => {
        if (!canvas) return;
        updateDimensions();
        resizeRafId = null;
      });
    };
    window.addEventListener("resize", handleResize);

    const cx = window.innerWidth / 2;
    const cy = window.innerHeight * 0.44;

    const initialBurst: Particle[] = [];
    for (let i = 0; i < 110; i++) {
      initialBurst.push(createParticle(cx, cy));
    }
    particles.current = initialBurst;

    // Secondary micro-sparkle burst at 350ms
    const secondaryTimer = setTimeout(() => {
      for (let i = 0; i < 40; i++) {
        particles.current.push(
          createParticle(cx + (Math.random() - 0.5) * 80, cy + (Math.random() - 0.5) * 50)
        );
      }
    }, 350);

    const render = () => {
      const elapsed = Date.now() - startTime.current;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.current.length - 1; i >= 0; i--) {
        const p = particles.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.24;
        p.vx *= 0.985;
        p.angle += p.spin;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);

        if (p.shape === "rect") {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.55);
        } else if (p.shape === "circle") {
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.45, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.moveTo(0, -p.size);
          ctx.lineTo(p.size * 0.35, 0);
          ctx.lineTo(0, p.size);
          ctx.lineTo(-p.size * 0.35, 0);
          ctx.closePath();
          ctx.fill();
        }
        ctx.restore();
      }

      if (elapsed > 1850 && !doneCalled.current) {
        doneCalled.current = true;
        cancelAnimationFrame(rafRef.current);
        onDone();
        return;
      }

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      if (resizeRafId !== null) cancelAnimationFrame(resizeRafId);
      clearTimeout(secondaryTimer);
      window.removeEventListener("resize", handleResize);
    };
  }, [onDone]);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[100] flex items-center justify-center overflow-hidden bg-black/60 backdrop-blur-xs transition-opacity duration-300"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Single Central Shockwave */}
      <div
        className="absolute rounded-full border border-accent/50 pointer-events-none"
        style={{
          width: "20px",
          height: "20px",
          top: "44%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          animation: "blastShockwave 0.85s cubic-bezier(0.1, 0.8, 0.3, 1) forwards",
          boxShadow: "0 0 50px rgba(255, 106, 44, 0.7), inset 0 0 25px rgba(255, 61, 110, 0.5)",
        }}
      />

      {/* Streamlined Aerospace Vector Rocket Pod */}
      <div
        className="relative z-10 flex flex-col items-center pointer-events-auto"
        style={{
          animation: "rocketAscend 1.85s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        }}
      >
        <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-b from-[#1c1928] to-[#0f0d18] border border-white/25 shadow-[0_0_40px_rgba(255,106,44,0.65)] backdrop-blur-md">
          <svg
            viewBox="0 0 24 24"
            className="w-7 h-7 text-white drop-shadow-[0_2px_10px_rgba(255,138,43,0.9)]"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
            <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
            <path d="M9 12H4s.55-3.03 2-4.5c1.62-1.63 5-2.5 5-2.5" />
            <path d="M12 15v5s3.03-.55 4.5-2c1.63-1.62 2.5-5 2.5-5" />
          </svg>

          {/* Engine Exhaust Flame Thruster */}
          <div
            className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 w-2.5 h-5 rounded-full bg-gradient-to-b from-[#ff8a2b] via-[#ff3d6e] to-transparent blur-[1px]"
            style={{
              animation: "pulse 0.35s ease-in-out infinite alternate",
            }}
          />
        </div>

        {/* Status Pill with Micro Progress Bar */}
        <div className="mt-3.5 px-4 py-1.5 rounded-full bg-[#16131f]/95 border border-white/15 backdrop-blur-lg shadow-2xl flex flex-col items-center gap-1.5">
          <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold tracking-wider text-t1 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>LAUNCHING {title ? title.toUpperCase() : 'SANDBOX'}</span>
          </div>
          <div className="w-28 h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-accent via-from to-emerald-400 rounded-full"
              style={{
                animation: "rocketProgress 1.4s ease-out forwards",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
