import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface IntroProps {
  onComplete: () => void;
}

const STORAGE_KEY = 'sn_intro_seen';

export const Intro: React.FC<IntroProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'counting' | 'opening' | 'done'>('counting');
  const [count, setCount] = useState<number>(0);
  const finishedRef = useRef(false);

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;

    try {
      sessionStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      // Ignore storage restrictions (e.g. private mode)
    }

    // Always unlock page scroll
    try {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    } catch {
      // Ignore DOM issues
    }

    setPhase('done');
    onComplete();
  }, [onComplete]);

  const triggerOpening = useCallback(() => {
    setPhase('opening');
  }, []);

  const handleSkip = useCallback(() => {
    if (phase === 'counting') {
      setCount(100);
      triggerOpening();
    } else if (phase === 'opening') {
      finish();
    }
  }, [phase, triggerOpening, finish]);

  // Unconditional unmount cleanup for scroll locking
  useEffect(() => {
    return () => {
      try {
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
      } catch {
        // ignore
      }
    };
  }, []);

  // Hard timeout: after 3.5 seconds the overlay is removed and scroll is unlocked, no matter what.
  useEffect(() => {
    const hardTimeoutId = setTimeout(() => {
      finish();
    }, 3500);

    return () => {
      clearTimeout(hardTimeoutId);
      try {
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
      } catch {
        // ignore
      }
    };
  }, [finish]);

  // Initial checks: skip entirely on screens under 768px, prefers-reduced-motion, or already seen
  useEffect(() => {
    try {
      const isUnder768 = typeof window !== 'undefined' && (
        window.innerWidth < 768 ||
        (window.matchMedia && window.matchMedia('(max-width: 767px)').matches)
      );
      const prefersReduced = typeof window !== 'undefined' && (
        window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
      );
      let seen = false;
      try {
        seen = sessionStorage.getItem(STORAGE_KEY) === 'true';
      } catch {
        seen = false; // treat failure as not seen
      }

      if (isUnder768 || prefersReduced || seen) {
        finish();
        return;
      }
    } catch {
      // Proceed if query fails
    }

    // Lock page scroll during intro
    try {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } catch {
      // ignore
    }

    return () => {
      try {
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
      } catch {
        // ignore
      }
    };
  }, [finish]);

  // Global keydown / click listeners to skip
  useEffect(() => {
    if (phase === 'done') return;

    const onKeyDown = () => {
      handleSkip();
    };
    const onClick = () => {
      handleSkip();
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('click', onClick);
    window.addEventListener('touchstart', onClick, { passive: true });

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('click', onClick);
      window.removeEventListener('touchstart', onClick);
    };
  }, [phase, handleSkip]);

  // 000 to 100 counter over ~1.8 seconds
  useEffect(() => {
    if (phase !== 'counting') return;

    let start: number | null = null;
    const duration = 1800; // 1.8 seconds
    let rafId: number;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(1, elapsed / duration);
      const current = Math.floor(progress * 100);
      setCount(current);

      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        setCount(100);
        // Brief pause at 100 before splitting
        setTimeout(() => {
          triggerOpening();
        }, 80);
      }
    };

    rafId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(rafId);
  }, [phase, triggerOpening]);

  if (phase === 'done') {
    return null;
  }

  // Swap small mono status lines during the count
  const statusText =
    count < 40 ? 'LOADING MARKETS' : count < 85 ? 'BUILDING MODELS' : 'READY';

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden cursor-pointer select-none"
      aria-label="Start-up intro animation"
      role="dialog"
      aria-modal="true"
    >
      {/* Top Split Panel */}
      <motion.div
        className="fixed top-0 left-0 w-full bg-[#05060A] z-50"
        style={{ height: 'calc(50% + 1px)' }}
        initial={{ y: '0%' }}
        animate={phase === 'opening' ? { y: '-100%' } : { y: '0%' }}
        transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
      />

      {/* Bottom Split Panel */}
      <motion.div
        className="fixed bottom-0 left-0 w-full bg-[#05060A] z-50"
        style={{ height: 'calc(50% + 1px)' }}
        initial={{ y: '0%' }}
        animate={phase === 'opening' ? { y: '100%' } : { y: '0%' }}
        transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
        onAnimationComplete={() => {
          if (phase === 'opening') {
            finish();
          }
        }}
      />

      {/* Centered Monogram & Counters */}
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center pointer-events-none"
        animate={phase === 'opening' ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.25 }}
      >
        {/* "SN" Monogram in Syne */}
        <div className="relative mb-8">
          <span className="font-display font-extrabold text-7xl sm:text-8xl md:text-9xl tracking-tighter text-white drop-shadow-[0_0_35px_rgba(139,92,246,0.35)]">
            SN
          </span>
          <span className="absolute -bottom-1 -right-2 w-2.5 h-2.5 rounded-full bg-mint shadow-mint-glow" />
        </div>

        {/* Small mono status lines that swap */}
        <div className="h-6 mb-2 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.span
              key={statusText}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="font-mono text-xs tracking-[0.25em] text-cyan font-semibold uppercase"
            >
              {statusText}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Mono Counter 000 to 100 */}
        <div className="font-mono text-2xl sm:text-3xl font-bold tracking-widest text-white/90">
          {String(count).padStart(3, '0')}
        </div>

        {/* Subtle skip prompt */}
        <div className="absolute bottom-8 text-center">
          <span className="font-mono text-[10px] text-white/30 tracking-widest uppercase">
            [ CLICK OR PRESS ANY KEY TO SKIP ]
          </span>
        </div>
      </motion.div>

      {/* Thin Violet-to-Cyan Progress Line Filling Across the Bottom */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 h-[2px] bg-white/[0.08] z-50 pointer-events-none"
        animate={phase === 'opening' ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <div
          className="h-full bg-gradient-quant transition-[width] duration-75 ease-linear"
          style={{ width: `${count}%` }}
        />
      </motion.div>
    </div>
  );
};
