import React, { useEffect, useRef } from 'react';

export const VolatilitySurface2D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      canvas.width = window.innerWidth * Math.min(window.devicePixelRatio, 2);
      canvas.height = window.innerHeight * Math.min(window.devicePixelRatio, 2);
      ctx.scale(Math.min(window.devicePixelRatio, 2), Math.min(window.devicePixelRatio, 2));
    };

    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx.clearRect(0, 0, width, height);

      // Render 2D contour grid lines representing volatility surface
      const rows = 18;
      const cols = 32;

      ctx.lineWidth = 1;

      for (let r = 0; r < rows; r++) {
        const rowProgress = r / rows;
        // Gradient from violet to cyan
        const grad = ctx.createLinearGradient(0, 0, width, height);
        grad.addColorStop(0, `rgba(139, 92, 246, ${0.12 + rowProgress * 0.25})`);
        grad.addColorStop(1, `rgba(34, 211, 238, ${0.12 + rowProgress * 0.25})`);
        ctx.strokeStyle = grad;

        ctx.beginPath();
        for (let c = 0; c <= cols; c++) {
          const colProgress = c / cols;
          const x = width * colProgress;
          // Volatility smile + undulating wave formula
          const smile = Math.pow(colProgress - 0.5, 2) * 120;
          const wave = prefersReducedMotion
            ? Math.sin(colProgress * 4 + rowProgress * 3) * 20
            : Math.sin(colProgress * 5 + time + rowProgress * 2) * 25 +
              Math.cos(colProgress * 3 - time * 0.6) * 15;

          const baseY = height * 0.45 + rowProgress * (height * 0.45);
          const y = baseY - wave + smile;

          if (c === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      if (!prefersReducedMotion) {
        time += 0.015;
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-80"
      aria-hidden="true"
    />
  );
};
