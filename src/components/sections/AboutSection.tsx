import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PORTFOLIO_DATA } from '../../data/content';

// Helper component for word-by-word scroll reveal
const ScrollWord: React.FC<{ word: string; progress: any; start: number; end: number }> = ({
  word,
  progress,
  start,
  end,
}) => {
  const opacity = useTransform(progress, [start, end], [0.22, 1]);
  const color = useTransform(progress, [start, end], ['#8A90A2', '#F1F2F6']);

  return (
    <motion.span style={{ opacity, color }} className="inline-block mr-2 transition-colors">
      {word}
    </motion.span>
  );
};

export const AboutSection: React.FC = () => {
  const summaryContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: summaryContainerRef,
    offset: ['start 0.85', 'end 0.4'],
  });

  const summaryWords = PORTFOLIO_DATA.about.summary.split(' ');

  return (
    <section id="about" className="relative py-24 sm:py-36 border-b border-white/[0.08] overflow-hidden">
      
      {/* Background Section Number */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 mb-16">
        <div className="flex items-center gap-2 font-mono text-xs tracking-widest text-violet uppercase mb-2">
          <span className="w-2 h-2 rounded-full bg-violet" />
          <span>02 // PROFILE & MANDATE</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
          
          {/* Left Column: Sticky Giant Outlined 'ABOUT' with '02' */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <span className="font-mono text-cyan text-sm tracking-widest font-semibold block mb-2">
              SECTION_02
            </span>
            <div className="flex items-baseline gap-4">
              <h2 className="font-display font-extrabold text-7xl sm:text-8xl lg:text-9xl text-outline tracking-tighter leading-none select-none">
                ABOUT
              </h2>
            </div>
            <p className="font-mono text-xs text-ink-muted mt-6 max-w-xs leading-relaxed">
              INSTITUTIONAL UNDERWRITING // VALUATION CORRIDORS // SECTOR THESIS DEVELOPMENT
            </p>
          </div>

          {/* Right Column: Scroll-Linked Large Typography Reveal */}
          <div ref={summaryContainerRef} className="lg:col-span-8">
            <p className="font-sans font-medium text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] leading-[1.3] tracking-tight">
              {summaryWords.map((word, i) => {
                const start = i / summaryWords.length;
                const end = Math.min(1, start + 0.08);
                return (
                  <ScrollWord
                    key={i}
                    word={word}
                    progress={scrollYProgress}
                    start={start}
                    end={end}
                  />
                );
              })}
            </p>
          </div>

        </div>

        {/* Education as a LEDGER */}
        <div className="mb-24">
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-2 font-mono text-xs text-ink-muted uppercase tracking-wider">
            <span>EDUCATION LEDGER</span>
            <span>ACADEMIC FOUNDATION // TIMELINE</span>
          </div>

          <div className="relative divide-y divide-white/[0.08] border-b border-white/[0.08]">
            {/* Animated vertical connector hairline */}
            <div className="absolute left-[120px] sm:left-[160px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-violet via-cyan to-transparent opacity-30 hidden sm:block" />

            {PORTFOLIO_DATA.about.education.map((edu) => (
              <div
                key={edu.degree}
                className="group relative py-8 sm:py-10 transition-all duration-300 hover:bg-white/[0.02]"
              >
                {/* Gradient left hover indicator */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-quant opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 transition-transform duration-300 group-hover:translate-x-3">
                  
                  {/* Years in Mono */}
                  <div className="w-32 sm:w-40 flex-shrink-0 font-mono text-sm sm:text-base text-cyan font-bold">
                    {edu.period}
                  </div>

                  {/* Degree in Syne */}
                  <div className="flex-1">
                    <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white group-hover:text-cyan transition-colors mb-1">
                      {edu.degree}
                    </h3>
                    <p className="font-sans text-sm sm:text-base text-ink-muted">
                      {edu.institution}
                    </p>
                  </div>

                  {/* Right Status Badge */}
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-mint" />
                    <span className="text-white/60">{edu.location}</span>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Career Focus: Full-Width Infinite MARQUEE of Giant Outlined Words */}
      <div className="w-full overflow-hidden select-none py-6 border-t border-b border-white/[0.08] bg-black/40">
        
        {/* Row 1: Leftward Scroll */}
        <div className="flex w-[200%] animate-marquee hover:[animation-play-state:paused] mb-4">
          <div className="flex shrink-0 items-center gap-12 font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl text-outline tracking-tight uppercase">
            <span>ASSET MANAGEMENT</span>
            <span className="text-violet">✦</span>
            <span>HEDGE FUNDS</span>
            <span className="text-cyan">✦</span>
            <span>PRIVATE EQUITY</span>
            <span className="text-mint">✦</span>
            <span>PRIVATE CREDIT</span>
            <span className="text-violet">✦</span>
          </div>
          <div className="flex shrink-0 items-center gap-12 font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl text-outline tracking-tight uppercase pl-12">
            <span>ASSET MANAGEMENT</span>
            <span className="text-violet">✦</span>
            <span>HEDGE FUNDS</span>
            <span className="text-cyan">✦</span>
            <span>PRIVATE EQUITY</span>
            <span className="text-mint">✦</span>
            <span>PRIVATE CREDIT</span>
            <span className="text-violet">✦</span>
          </div>
        </div>

        {/* Row 2: Rightward Scroll */}
        <div className="flex w-[200%] animate-marquee-reverse hover:[animation-play-state:paused]">
          <div className="flex shrink-0 items-center gap-12 font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl text-outline tracking-tight uppercase">
            <span>EQUITY RESEARCH</span>
            <span className="text-cyan">✦</span>
            <span>VALUATION MODELS</span>
            <span className="text-mint">✦</span>
            <span>FP&A ANALYSIS</span>
            <span className="text-violet">✦</span>
            <span>DUE DILIGENCE</span>
            <span className="text-cyan">✦</span>
          </div>
          <div className="flex shrink-0 items-center gap-12 font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl text-outline tracking-tight uppercase pl-12">
            <span>EQUITY RESEARCH</span>
            <span className="text-cyan">✦</span>
            <span>VALUATION MODELS</span>
            <span className="text-mint">✦</span>
            <span>FP&A ANALYSIS</span>
            <span className="text-violet">✦</span>
            <span>DUE DILIGENCE</span>
            <span className="text-cyan">✦</span>
          </div>
        </div>

      </div>

    </section>
  );
};
