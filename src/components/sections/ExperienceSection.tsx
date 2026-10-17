import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Building2 } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/content';

export const ExperienceSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const roleRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute('data-index'));
            if (!isNaN(idx)) {
              setActiveIndex(idx);
            }
          }
        });
      },
      {
        rootMargin: '-45% 0px -45% 0px',
        threshold: 0,
      }
    );

    roleRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToRole = (idx: number) => {
    setActiveIndex(idx);
    roleRefs.current[idx]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section id="experience" className="relative py-24 sm:py-36 border-b border-white/[0.08]">
      
      {/* Section Header */}
      <div className="section-container mb-16">
        <div className="flex items-center gap-2 font-mono text-xs tracking-widest text-cyan uppercase mb-2">
          <span className="w-2 h-2 rounded-full bg-cyan" />
          <span>03 // TRACK RECORD & MANDATES</span>
        </div>
        <h2 className="font-display font-extrabold text-white tracking-tight section-heading">
          Institutional Experience
        </h2>
      </div>

      <div className="section-container">
        {/* Mobile Sticky Mini Progress Bar */}
        <div className="lg:hidden sticky top-14 sm:top-16 z-20 mb-8 py-3 px-4 rounded-xl bg-midnight-surface/90 border border-white/10 backdrop-blur-md shadow-lg flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <span className="font-mono text-xs font-bold text-cyan flex-shrink-0">
              0{activeIndex + 1} / 0{PORTFOLIO_DATA.experience.length}
            </span>
            <span className="text-white/20">·</span>
            <span className="font-display font-bold text-xs text-white truncate">
              {PORTFOLIO_DATA.experience[activeIndex]?.role}
            </span>
          </div>

          <div className="flex items-center gap-1.5 flex-shrink-0 ml-3">
            {PORTFOLIO_DATA.experience.map((exp, idx) => (
              <button
                key={exp.id}
                type="button"
                onClick={() => scrollToRole(idx)}
                aria-label={`Jump to role ${exp.index}`}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  activeIndex === idx
                    ? 'w-6 bg-gradient-quant'
                    : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="experience-split-grid">
          
          {/* Left Column Sticky: Vertical Role Selector with Dynamic Progress Line */}
          <div className="experience-left-col hidden lg:block lg:sticky lg:top-28">
            <div className="p-6 rounded-2xl bg-midnight-surface/80 border border-white/[0.08] backdrop-blur-md">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-ink-muted uppercase tracking-widest">
                  TENURE PIPELINE
                </span>
                <span className="font-mono text-xs font-bold text-cyan">
                  0{activeIndex + 1} / 0{PORTFOLIO_DATA.experience.length}
                </span>
              </div>

              <div className="relative flex flex-col space-y-4">
                {/* Vertical Progress Track */}
                <div className="absolute left-[18px] top-4 bottom-4 w-[2px] bg-white/[0.08]" />
                <motion.div
                  className="absolute left-[18px] top-4 w-[2px] bg-gradient-quant origin-top"
                  animate={{
                    height: `${(activeIndex / (PORTFOLIO_DATA.experience.length - 1)) * 100}%`,
                  }}
                  transition={{ duration: 0.3 }}
                />

                {PORTFOLIO_DATA.experience.map((exp, idx) => {
                  const isActive = activeIndex === idx;
                  return (
                    <button
                      key={exp.id}
                      type="button"
                      onClick={() => scrollToRole(idx)}
                      className={`relative z-10 flex items-start gap-4 p-3 rounded-xl text-left transition-all cursor-pointer ${
                        isActive
                          ? 'bg-white/[0.06] border border-white/10 shadow-quant-glow'
                          : 'hover:bg-white/[0.02] opacity-60 hover:opacity-100'
                      }`}
                    >
                      {/* Number Node */}
                      <span
                        className={`w-7 h-7 rounded-full font-mono text-xs font-bold flex items-center justify-center flex-shrink-0 transition-colors ${
                          isActive
                            ? 'bg-gradient-quant text-midnight shadow-cyan-glow'
                            : 'bg-midnight-elevated text-ink-muted border border-white/10'
                        }`}
                      >
                        {exp.index}
                      </span>

                      <div className="flex-1 min-w-0">
                        <p
                          className={`font-display font-bold text-sm tracking-tight truncate ${
                            isActive ? 'text-white' : 'text-ink-muted'
                          }`}
                        >
                          {exp.role}
                        </p>
                        <p className="font-mono text-xs text-ink-muted/80 truncate">
                          {exp.company}
                        </p>
                        <span className="font-mono text-xs text-cyan block mt-0.5">
                          {exp.period}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Verified Ledger Badge */}
              <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-ink-muted">
                <span>NEWEST TO EARLIEST</span>
                <span className="text-mint flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-mint" />
                  VERIFIED
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Scrolling Detailed Role Blocks */}
          <div className="experience-right-col space-y-24">
            {PORTFOLIO_DATA.experience.map((exp, idx) => (
              <div
                key={exp.id}
                data-index={idx}
                ref={(el) => {
                  roleRefs.current[idx] = el;
                }}
                className={`scroll-mt-28 p-6 sm:p-10 rounded-2xl border transition-all duration-300 relative group ${
                  activeIndex === idx
                    ? 'bg-midnight-surface/60 border-cyan/30 shadow-quant-glow'
                    : 'bg-midnight-surface/40 border-white/[0.08]'
                }`}
              >
                {/* Outlined Section Number Watermark */}
                <span
                  className={`absolute top-6 right-8 font-display font-extrabold text-7xl select-none pointer-events-none transition-colors duration-300 ${
                    activeIndex === idx ? 'text-white/[0.08]' : 'text-white/[0.02]'
                  }`}
                >
                  {exp.index}
                </span>

                {/* Metadata Row */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4 font-mono text-xs text-ink-muted">
                  <div className="flex items-center gap-1.5 text-cyan">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{exp.period}</span>
                  </div>
                  <span>·</span>
                  <div className="flex items-center gap-1.5 text-ink-muted">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{exp.location}</span>
                  </div>
                </div>

                {/* Role Title in Big Syne */}
                <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight mb-2">
                  {exp.role}
                </h3>

                {/* Company Name */}
                <div className="flex items-center gap-2 font-mono text-sm sm:text-base text-violet font-semibold mb-8">
                  <Building2 className="w-4 h-4 text-violet" />
                  <span>{exp.company}</span>
                </div>

                {/* Bullets Styled as Terminal Log Lines with '>' in Mint */}
                <div className="space-y-4 mb-8">
                  {exp.bullets.map((bullet, bIdx) => (
                    <motion.div
                      key={bIdx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: bIdx * 0.08 }}
                      className="flex items-start gap-3"
                    >
                      <span className="font-mono text-mint font-bold text-base select-none leading-relaxed flex-shrink-0">
                        &gt;
                      </span>
                      <p className="font-sans body-bullet text-ink-light/90">
                        {bullet}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Tag Chips with Gradient Hairline */}
                <div className="pt-6 border-t border-white/[0.08] flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs text-ink-muted uppercase tracking-widest mr-2">
                    CORE DOMAINS:
                  </span>
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-md bg-white/[0.03] border border-white/10 hover:border-cyan/40 text-cyan font-mono text-xs transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

    </section>
  );
};
