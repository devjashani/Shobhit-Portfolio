import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Plus } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/content';

export const SkillsSection: React.FC = () => {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);
  const [hoveredSkillRow, setHoveredSkillRow] = useState<number | null>(null);

  const toggleAccordion = (idx: number) => {
    setActiveAccordion(activeAccordion === idx ? null : idx);
  };

  return (
    <section id="skills" className="relative py-24 sm:py-36 border-b border-white/[0.08]">
      
      {/* Header */}
      <div className="section-container mb-16">
        <div className="flex items-center gap-2 font-mono text-xs tracking-widest text-violet uppercase mb-2">
          <span className="w-2 h-2 rounded-full bg-violet" />
          <span>05 // ARSENAL & GOVERNANCE</span>
        </div>
        <h2 className="font-display font-extrabold text-white tracking-tight section-heading">
          Competencies & Credentials
        </h2>
      </div>

      <div className="section-container space-y-28">
        
        {/* Part A: Typographic Skills Index */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-4 font-mono text-xs text-ink-muted uppercase tracking-wider">
            <span>INDEX OF TECHNICAL COMPETENCIES</span>
            <span className="hidden sm:inline">NO ARBITRARY PERCENTAGES // 100% AUDITABLE</span>
          </div>

          <div className="divide-y divide-white/[0.08] border-b border-white/[0.08]">
            {PORTFOLIO_DATA.skills.map((cat, idx) => {
              const isHovered = hoveredSkillRow === idx;

              return (
                <div
                  key={cat.category}
                  onMouseEnter={() => setHoveredSkillRow(idx)}
                  onMouseLeave={() => setHoveredSkillRow(null)}
                  className="group py-8 sm:py-10 transition-colors cursor-default"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    
                    {/* Category Title in Large Syne */}
                    <div className="flex items-baseline gap-4 sm:gap-6 min-w-[280px] sm:min-w-[360px]">
                      <span className="font-mono text-xs sm:text-sm text-ink-muted/50 font-bold">
                        0{idx + 1}
                      </span>
                      <h3 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-white group-hover:text-cyan transition-colors">
                        {cat.category}
                      </h3>
                    </div>

                    {/* Skill Chips (Revealed with Stagger on hover or expanded on mobile) */}
                    <div className="flex-1 flex flex-wrap gap-2 lg:justify-end transition-opacity duration-300">
                      {cat.skills.map((skill, sIdx) => (
                        <motion.span
                          key={skill}
                          initial={{ opacity: 0.7, y: 0 }}
                          animate={
                            isHovered
                              ? { opacity: 1, y: -2, scale: 1.04 }
                              : { opacity: 0.75, y: 0, scale: 1 }
                          }
                          transition={{ duration: 0.2, delay: sIdx * 0.03 }}
                          className="px-3.5 py-1.5 rounded-lg bg-white/[0.03] group-hover:bg-white/[0.08] border border-white/10 group-hover:border-cyan/40 text-ink-light font-mono text-xs sm:text-sm font-medium transition-all"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Part B: Certifications in a 2x2 Grid with Rotating Gradient Border */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-8 font-mono text-xs text-ink-muted uppercase tracking-wider">
            <span>VERIFIED PROFESSIONAL ACCREDITATIONS</span>
            <span>2X2 MATRIX</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PORTFOLIO_DATA.certifications.map((cert, cIdx) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: cIdx * 0.1 }}
                className="relative p-[1px] rounded-2xl group overflow-hidden"
              >
                {/* Rotating gradient hairline border on hover */}
                <div className="absolute inset-0 bg-gradient-quant opacity-20 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                <div className="relative p-6 sm:p-8 rounded-[15px] bg-midnight-surface h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-cyan">
                        <Award className="w-5 h-5 stroke-[2]" />
                      </div>
                      <span className="font-mono text-xs text-ink-muted px-2.5 py-0.5 rounded bg-white/[0.03] border border-white/5">
                        {cert.code}
                      </span>
                    </div>

                    <h4 className="font-display font-bold text-lg sm:text-xl text-white tracking-tight mb-2">
                      {cert.title}
                    </h4>
                    <p className="font-mono text-xs text-violet font-semibold">
                      {cert.issuer}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-ink-muted">
                    <span className="text-mint flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-mint shadow-mint-glow" />
                      {cert.verifiedBadge}
                    </span>
                    <span className="text-xs">VERIFIED CREDENTIAL</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Part C: Positions of Responsibility Accordion Rows */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-8 font-mono text-xs text-ink-muted uppercase tracking-wider">
            <span>INSTITUTIONAL LEADERSHIP & RESPONSIBILITY</span>
            <span>ACCORDION ARCHITECTURE</span>
          </div>

          <div className="divide-y divide-white/[0.08] border-b border-white/[0.08]">
            {PORTFOLIO_DATA.responsibilities.map((resp, rIdx) => {
              const isOpen = activeAccordion === rIdx;

              return (
                <div key={resp.id} className="py-6 sm:py-8 transition-colors">
                  <button
                    type="button"
                    onClick={() => toggleAccordion(rIdx)}
                    className="w-full flex items-center justify-between text-left focus:outline-none group"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-baseline gap-4 sm:gap-6 pr-4">
                      <span className="font-mono text-xs sm:text-sm text-cyan font-bold">
                        0{rIdx + 1}
                      </span>
                      <div>
                        <h4 className="font-display font-bold text-xl sm:text-2xl text-white group-hover:text-cyan transition-colors">
                          {resp.role}
                        </h4>
                        <p className="font-mono text-xs sm:text-sm text-ink-muted mt-0.5">
                          {resp.organization}
                        </p>
                      </div>
                    </div>

                    {/* Rotating Plus to Close Icon */}
                    <div
                      className={`w-9 h-9 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                        isOpen ? 'bg-gradient-quant text-midnight rotate-45' : 'bg-white/[0.03] text-white group-hover:border-white/30'
                      }`}
                    >
                      <Plus className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  </button>

                  {/* Expandable Content */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="overflow-hidden"
                      >
                        <div className="pl-8 sm:pl-12 pt-4 pb-2">
                          <p className="text-ink-light/90 text-sm sm:text-base leading-relaxed max-w-3xl">
                            {resp.description}
                          </p>
                          <div className="mt-3 inline-flex items-center gap-2 font-mono text-xs text-mint">
                            <span className="w-1.5 h-1.5 rounded-full bg-mint" />
                            <span>MANDATE: {resp.tag}</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </section>
  );
};
