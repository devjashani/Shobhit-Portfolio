import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Building2 } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/content';

export const ExperienceSection: React.FC = () => {
  const [activeExpIndex, setActiveExpIndex] = useState(0);
  const roleRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.45;

      roleRefs.current.forEach((ref, idx) => {
        if (!ref) return;
        const top = ref.offsetTop;
        const height = ref.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          setActiveExpIndex(idx);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToRole = (idx: number) => {
    roleRefs.current[idx]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section id="experience" className="relative py-24 sm:py-36 border-b border-white/[0.08]">
      
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 mb-16">
        <div className="flex items-center gap-2 font-mono text-xs tracking-widest text-cyan uppercase mb-2">
          <span className="w-2 h-2 rounded-full bg-cyan" />
          <span>03 // TRACK RECORD & MANDATES</span>
        </div>
        <h2 className="font-display font-extrabold text-4xl sm:text-6xl text-white tracking-tight">
          Institutional Experience
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column Sticky: Vertical Role Selector with Dynamic Progress Line */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <div className="p-6 rounded-2xl bg-midnight-surface/80 border border-white/[0.08] backdrop-blur-md">
              <span className="font-mono text-[11px] text-ink-muted uppercase tracking-widest block mb-4">
                TENURE PIPELINE // 03 ENTRIES
              </span>

              <div className="relative flex flex-col space-y-4">
                {/* Vertical Progress Track */}
                <div className="absolute left-[18px] top-4 bottom-4 w-[2px] bg-white/[0.08]" />
                <motion.div
                  className="absolute left-[18px] top-4 w-[2px] bg-gradient-quant origin-top"
                  animate={{
                    height: `${(activeExpIndex / (PORTFOLIO_DATA.experience.length - 1)) * 80}%`,
                  }}
                  transition={{ duration: 0.3 }}
                />

                {PORTFOLIO_DATA.experience.map((exp, idx) => {
                  const isActive = activeExpIndex === idx;
                  return (
                    <button
                      key={exp.id}
                      type="button"
                      onClick={() => scrollToRole(idx)}
                      className={`relative z-10 flex items-start gap-4 p-3 rounded-xl text-left transition-all ${
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
                        <span className="font-mono text-[10px] text-cyan block mt-0.5">
                          {exp.period}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Verified Ledger Badge */}
              <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-ink-muted">
                <span>NEWEST TO EARLIEST</span>
                <span className="text-mint flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-mint" />
                  VERIFIED
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Scrolling Detailed Role Blocks */}
          <div className="lg:col-span-8 space-y-24">
            {PORTFOLIO_DATA.experience.map((exp, idx) => (
              <div
                key={exp.id}
                ref={(el) => {
                  roleRefs.current[idx] = el;
                }}
                className="scroll-mt-28 p-6 sm:p-10 rounded-2xl bg-midnight-surface/40 border border-white/[0.08] relative group"
              >
                {/* Outlined Section Number Watermark */}
                <span className="absolute top-6 right-8 font-display font-extrabold text-7xl text-white/[0.03] select-none pointer-events-none">
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
                      <p className="font-sans text-sm sm:text-base text-ink-light/90 leading-relaxed">
                        {bullet}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Tag Chips with Gradient Hairline */}
                <div className="pt-6 border-t border-white/[0.08] flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[10px] text-ink-muted uppercase tracking-widest mr-2">
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
