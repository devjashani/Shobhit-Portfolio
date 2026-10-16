import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const sections = [
  { id: 'hero', label: '01', title: 'HOME' },
  { id: 'about', label: '02', title: 'ABOUT' },
  { id: 'experience', label: '03', title: 'EXPERIENCE' },
  { id: 'projects', label: '04', title: 'PROJECTS' },
  { id: 'skills', label: '05', title: 'SKILLS' },
  { id: 'contact', label: '06', title: 'CONTACT' },
];

export const DotRail: React.FC = () => {
  const [activeId, setActiveId] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.35;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        const el = document.getElementById(sec.id);
        if (el && scrollPos >= el.offsetTop) {
          setActiveId(sec.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <aside
      className="fixed right-6 sm:right-8 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-end gap-4 pointer-events-none"
      aria-label="Section navigation rail"
    >
      {sections.map((sec) => {
        const isActive = activeId === sec.id;
        return (
          <button
            key={sec.id}
            type="button"
            onClick={() => scrollTo(sec.id)}
            className="pointer-events-auto group flex items-center gap-3 py-1 text-right focus:outline-none"
            aria-label={`Jump to section ${sec.title}`}
          >
            {/* Title Tooltip on Hover */}
            <span
              className={`font-mono text-[10px] tracking-widest uppercase transition-all duration-300 ${
                isActive
                  ? 'text-cyan opacity-100 font-semibold'
                  : 'text-ink-muted opacity-0 group-hover:opacity-100 group-hover:text-white'
              }`}
            >
              {sec.title}
            </span>

            {/* Mono Number */}
            <span
              className={`font-mono text-[11px] transition-colors duration-200 ${
                isActive ? 'text-white font-bold' : 'text-ink-muted/50 group-hover:text-ink-muted'
              }`}
            >
              {sec.label}
            </span>

            {/* Indicator Dot */}
            <div className="relative flex items-center justify-center w-3 h-3">
              <span
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'w-2 h-2 bg-gradient-quant shadow-cyan-glow'
                    : 'bg-white/20 group-hover:bg-white/60'
                }`}
              />
              {isActive && (
                <motion.span
                  layoutId="dotRailRing"
                  className="absolute inset-0 rounded-full border border-cyan/60"
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                />
              )}
            </div>
          </button>
        );
      })}
    </aside>
  );
};
