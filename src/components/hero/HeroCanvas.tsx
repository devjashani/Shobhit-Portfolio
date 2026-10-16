import React, { Suspense, useState, useEffect } from 'react';
import { VolatilitySurface2D } from './VolatilitySurface2D';

// Lazy load 3D component for performance and mobile friendliness
const VolatilitySurface3D = React.lazy(() => import('./VolatilitySurface3D'));

export const HeroCanvas: React.FC = () => {
  const [use3D, setUse3D] = useState(false);

  useEffect(() => {
    // Only load full 3D if on desktop and reduced motion is disabled
    const isMobile = window.matchMedia('(max-width: 768px)').matches || window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Check basic WebGL support
    let hasWebGL = false;
    try {
      const canvas = document.createElement('canvas');
      hasWebGL = !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch {
      hasWebGL = false;
    }

    if (!isMobile && !prefersReducedMotion && hasWebGL) {
      setUse3D(true);
    }
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
      {/* Background Soft Aurora Ambient Glows */}
      <div className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-violet/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] -right-[15%] w-[55vw] h-[55vw] rounded-full bg-cyan/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 left-[25%] w-[45vw] h-[45vw] rounded-full bg-mint/5 blur-[120px] pointer-events-none" />

      {/* Surface Render: 3D if eligible, otherwise 2D Canvas */}
      {use3D ? (
        <Suspense fallback={<VolatilitySurface2D />}>
          <VolatilitySurface3D />
        </Suspense>
      ) : (
        <VolatilitySurface2D />
      )}

      {/* Faint Axis Label in Mono */}
      <div className="absolute bottom-28 right-6 sm:right-12 pointer-events-none select-none z-10 flex items-center gap-2 text-[10px] font-mono tracking-widest text-ink-muted/40 uppercase">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan/60 animate-pulse" />
        <span>IMPLIED VOL / STRIKE / TIME (illustrative)</span>
      </div>
    </div>
  );
};
