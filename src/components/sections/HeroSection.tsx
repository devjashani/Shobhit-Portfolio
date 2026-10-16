import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Download, Mail } from 'lucide-react';
import { HeroCanvas } from '../hero/HeroCanvas';
import { CountUp } from '../CountUp';
import { LinkedInIcon } from '../icons/LinkedInIcon';
import { PORTFOLIO_DATA } from '../../data/content';

export const HeroSection: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % PORTFOLIO_DATA.personal.rotatingRoles.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const firstName = "SHOBHIT";
  const lastName = "NANDWANA";

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-24 sm:pt-28 pb-8 px-4 sm:px-6 lg:px-12 overflow-hidden border-b border-white/[0.08]"
    >
      {/* 3D Volatility Surface & Ambient Auroras */}
      <HeroCanvas />

      {/* Main Hero Foreground */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center py-8">
        
        {/* Eyebrow Label */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex items-center gap-2 mb-4"
        >
          <span className="w-2 h-2 rounded-full bg-mint animate-pulse shadow-mint-glow" />
          <span className="font-mono text-xs sm:text-sm tracking-widest text-cyan uppercase font-medium">
            {PORTFOLIO_DATA.personal.eyebrow}
          </span>
          <span className="text-white/20 font-mono text-xs hidden sm:inline">// SYSTEM ID: SN-INSTITUTIONAL</span>
        </motion.div>

        {/* Huge Cinematic Display Typography: SHOBHIT NANDWANA */}
        <div className="relative mb-6">
          {/* Line 1: SHOBHIT Solid White */}
          <div className="overflow-hidden leading-[0.9]">
            <h1 className="font-display font-extrabold text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10.5rem] tracking-tighter text-white uppercase select-none">
              {firstName.split('').map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.05 + index * 0.04,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </h1>
          </div>

          {/* Line 2: NANDWANA as Outlined Text that fills with Gradient */}
          <div className="overflow-hidden leading-[0.9]">
            <h1 className="font-display font-extrabold text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10.5rem] tracking-tighter text-outline hover:text-outline-active uppercase select-none cursor-default">
              {lastName.split('').map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.25 + index * 0.04,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block text-outline hover:text-outline-active transition-all"
                >
                  {char}
                </motion.span>
              ))}
            </h1>
          </div>

          {/* Rotating Circular Text Badge (Positioned at Top-Right on Desktop) */}
          <div className="hidden lg:block absolute -top-8 right-0 pointer-events-none">
            <div className="relative w-36 h-36 flex items-center justify-center animate-spin-slow">
              <svg className="w-full h-full" viewBox="0 0 140 140">
                <defs>
                  <path
                    id="circlePath"
                    d="M 70, 70 m -52, 0 a 52,52 0 1,1 104,0 a 52,52 0 1,1 -104,0"
                  />
                </defs>
                <text className="font-mono text-[9.5px] fill-cyan tracking-[0.22em] uppercase font-semibold">
                  <textPath href="#circlePath">
                    OPEN TO ROLES · ASSET MGMT · HEDGE FUNDS · PE · CREDIT ·
                  </textPath>
                </text>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-mint shadow-mint-glow" />
              </div>
            </div>
          </div>
        </div>

        {/* Slot Machine Dynamic Word Cycler */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap items-center gap-3 mb-6 font-mono text-sm sm:text-base"
        >
          <span className="text-ink-muted uppercase tracking-wider text-xs sm:text-sm">
            MANDATE //
          </span>
          <div className="h-8 overflow-hidden inline-flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={roleIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="px-3 py-1 rounded-md bg-white/[0.04] border border-white/10 text-cyan font-bold tracking-tight shadow-sm"
              >
                {PORTFOLIO_DATA.personal.rotatingRoles[roleIndex]}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* One-Line Intro */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-ink-muted text-base sm:text-xl font-normal max-w-2xl leading-relaxed mb-8"
        >
          {PORTFOLIO_DATA.personal.heroIntro}
        </motion.p>

        {/* Action CTAs & Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-wrap items-center gap-4"
        >
          {/* View Experience (Solid Quant Gradient) */}
          <a
            href="#experience"
            className="group relative inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-quant text-midnight font-display font-bold text-sm tracking-tight transition-transform hover:scale-[1.03] active:scale-[0.98] shadow-quant-glow"
            data-cursor="EXP"
          >
            <span>View Experience</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.5] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          {/* Download CV (Gradient Hairline Outline) */}
          <a
            href={PORTFOLIO_DATA.personal.cvUrl}
            download="Shobhit_Nandwana_CV_Revised.pdf"
            className="relative p-[1px] rounded-xl group inline-flex"
            data-cursor="PDF"
          >
            <span className="absolute inset-0 rounded-xl bg-gradient-quant opacity-50 group-hover:opacity-100 transition-opacity" />
            <span className="relative flex items-center gap-2 px-6 py-3.5 rounded-[11px] bg-midnight-surface group-hover:bg-midnight-surface/80 text-white font-mono text-xs font-semibold tracking-wider uppercase transition-colors">
              <Download className="w-4 h-4 text-cyan stroke-[2]" />
              <span>Download CV</span>
            </span>
          </a>

          {/* Contact Me (Text Link with Animated Arrow) */}
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 px-4 py-3 text-sm font-mono text-ink-muted hover:text-white transition-colors"
          >
            <span>Contact Me</span>
            <ArrowUpRight className="w-4 h-4 text-cyan transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>

          {/* Social Icon Buttons */}
          <div className="flex items-center gap-2.5 ml-auto sm:ml-2">
            <a
              href={PORTFOLIO_DATA.personal.linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 flex items-center justify-center text-ink-muted hover:text-cyan transition-all"
              aria-label="LinkedIn Profile"
              data-cursor="IN"
            >
              <LinkedInIcon className="w-4 h-4" />
            </a>

            <a
              href={PORTFOLIO_DATA.personal.emailMailto}
              className="w-10 h-10 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 flex items-center justify-center text-ink-muted hover:text-mint transition-all"
              aria-label="Send Email"
              data-cursor="MAIL"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </motion.div>

      </div>

      {/* Bottom Full-Width Stats Rail Separated by Hairlines */}
      <div className="relative z-10 w-full max-w-7xl mx-auto pt-6 border-t border-white/[0.08]">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.06]">
          {PORTFOLIO_DATA.heroStats.map((stat, idx) => (
            <div
              key={stat.id}
              className={`pt-3 sm:pt-0 ${idx !== 0 ? 'sm:pl-6' : ''} flex flex-col justify-between`}
            >
              <div className="flex items-baseline gap-2 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-mint shadow-mint-glow inline-block" />
                <div className="font-mono text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                  <CountUp end={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                </div>
              </div>
              <p className="font-mono text-[11px] sm:text-xs text-ink-muted uppercase tracking-wider pl-3.5">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Scroll Prompt Bottom-Left */}
        <div className="mt-6 flex items-center justify-between text-xs font-mono text-ink-muted/50">
          <div className="flex items-center gap-2">
            <ArrowDown className="w-3.5 h-3.5 text-cyan animate-bounce" />
            <span className="tracking-widest uppercase text-[10px]">SCROLL TO EXPLORE</span>
          </div>
          <span className="text-[10px] tracking-widest hidden sm:inline">SYSTEM STATUS // 01</span>
        </div>
      </div>
    </section>
  );
};
