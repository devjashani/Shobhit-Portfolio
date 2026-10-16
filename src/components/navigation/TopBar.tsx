import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Menu, X } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/content';

interface TopBarProps {
  onOpenCommandPalette: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onOpenCommandPalette }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sections = [
    { num: '01', title: 'HOME', href: '#hero' },
    { num: '02', title: 'ABOUT', href: '#about' },
    { num: '03', title: 'EXPERIENCE', href: '#experience' },
    { num: '04', title: 'PROJECTS', href: '#projects' },
    { num: '05', title: 'SKILLS', href: '#skills' },
    { num: '06', title: 'CONTACT', href: '#contact' },
  ];

  const handleMobileNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#05060A]/60 backdrop-blur-md border-b border-white/[0.06] transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          
          {/* Left: 'SN' Monogram Wordmark (Text only, in Syne) */}
          <a
            href="#hero"
            className="flex items-center gap-2 group focus:outline-none"
            aria-label="Shobhit Nandwana Home"
          >
            <span className="font-display font-extrabold text-2xl tracking-tighter text-white group-hover:text-cyan transition-colors">
              SN
            </span>
            <span className="font-mono text-[10px] tracking-widest text-ink-muted uppercase border-l border-white/10 pl-2 hidden sm:inline-block">
              QUANT / RESEARCH
            </span>
          </a>

          {/* Right: Mono ⌘K Hint Button & Download CV with gradient hairline border */}
          <div className="flex items-center gap-3">
            {/* ⌘K Trigger Button */}
            <button
              type="button"
              onClick={onOpenCommandPalette}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-ink-muted hover:text-white transition-all shadow-sm"
              aria-label="Open Command Palette"
            >
              <span>Search</span>
              <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-cyan">
                ⌘K
              </kbd>
            </button>

            {/* Download CV button with gradient hairline border */}
            <a
              href={PORTFOLIO_DATA.personal.cvUrl}
              download="Shobhit_Nandwana_CV_Revised.pdf"
              className="relative p-[1px] rounded-lg group inline-flex focus:outline-none"
            >
              <span className="absolute inset-0 rounded-lg bg-gradient-quant opacity-60 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-[7px] bg-midnight-surface group-hover:bg-midnight-surface/80 text-xs font-mono font-medium text-white transition-colors">
                <Download className="w-3.5 h-3.5 text-cyan stroke-[2.2]" />
                <span>CV</span>
              </span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-ink-muted hover:text-white hover:bg-white/5 transition-colors focus:outline-none"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Overlay Menu with Giant Syne Links */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 z-40 bg-[#05060A]/95 backdrop-blur-2xl flex flex-col justify-between pt-24 pb-12 px-6 sm:px-12 md:hidden"
          >
            <div className="flex flex-col space-y-4">
              <span className="font-mono text-xs text-ink-muted uppercase tracking-widest mb-2">
                INDEX // ARCHITECTURE
              </span>
              {sections.map((sec, idx) => (
                <motion.div
                  key={sec.num}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * idx, duration: 0.3 }}
                >
                  <a
                    href={sec.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleMobileNavClick(sec.href);
                    }}
                    className="group flex items-baseline justify-between py-2 border-b border-white/[0.08]"
                  >
                    <span className="font-display font-extrabold text-3xl sm:text-4xl text-white group-hover:text-cyan transition-colors">
                      {sec.title}
                    </span>
                    <span className="font-mono text-xs text-violet font-semibold">
                      {sec.num}
                    </span>
                  </a>
                </motion.div>
              ))}
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
              <a
                href={PORTFOLIO_DATA.personal.cvUrl}
                download="Shobhit_Nandwana_CV_Revised.pdf"
                className="w-full py-3 rounded-xl bg-gradient-quant text-midnight font-mono font-bold text-xs flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4 stroke-[2.2]" />
                <span>Download Revised CV (PDF)</span>
              </a>
              <p className="font-mono text-[10px] text-ink-muted text-center">
                SHOBHIT NANDWANA · INSTITUTIONAL PORTFOLIO
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
