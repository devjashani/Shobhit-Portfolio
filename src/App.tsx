import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { CustomCursor } from './components/ui/CustomCursor';
import { CommandPalette } from './components/ui/CommandPalette';
import { TopBar } from './components/navigation/TopBar';
import { DotRail } from './components/navigation/DotRail';
import { ScrollProgressLine } from './components/navigation/ScrollProgressLine';
import { Intro } from './components/Intro';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { ContactSection } from './components/sections/ContactSection';

export const App: React.FC = () => {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [introDone, setIntroDone] = useState<boolean>(() => {
    try {
      if (typeof window !== 'undefined') {
        const isUnder768 = window.innerWidth < 768 || (window.matchMedia && window.matchMedia('(max-width: 767px)').matches);
        const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (isUnder768 || prefersReducedMotion) return true;

        try {
          return sessionStorage.getItem('sn_intro_seen') === 'true';
        } catch {
          // Treat storage access error as not seen
          return false;
        }
      }
    } catch {
      // ignore
    }
    return false;
  });

  // Initialize Lenis Smooth Scrolling only on desktop with fine mouse pointer
  useEffect(() => {
    try {
      if (typeof window === 'undefined') return;
      const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isTouchOrCoarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
      const isSmallScreen = window.innerWidth < 1024;

      // Disable Lenis on touch devices, small screens, and reduced motion
      if (prefersReducedMotion || isTouchOrCoarse || isSmallScreen) return;

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
      });

      let rafId: number;
      function raf(time: number) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }

      rafId = requestAnimationFrame(raf);

      return () => {
        cancelAnimationFrame(rafId);
        lenis.destroy();
      };
    } catch {
      // Use native scrolling if Lenis fails to initialize
    }
  }, []);

  // Global Cmd+K / Ctrl+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#05060A] text-[#F1F2F6] font-sans selection:bg-violet/30 selection:text-mint">
      {/* Start-Up Intro Animation Overlay (Runs once per session) */}
      {!introDone && (
        <ErrorBoundary name="Intro" silentFallback onError={() => setIntroDone(true)}>
          <Intro onComplete={() => setIntroDone(true)} />
        </ErrorBoundary>
      )}

      {/* Desktop Custom Cursor */}
      <ErrorBoundary name="CustomCursor" silentFallback>
        <CustomCursor />
      </ErrorBoundary>

      {/* Film Grain Texture Overlay */}
      <div className="film-grain" />

      {/* Soft Cinematic Edge Vignette */}
      <div className="screen-vignette" />

      {/* Top Gradient Scroll Progress Line */}
      <ErrorBoundary name="ScrollProgressLine" silentFallback>
        <ScrollProgressLine />
      </ErrorBoundary>

      {/* Minimal Top Navigation Bar */}
      <ErrorBoundary name="TopBar" silentFallback>
        <TopBar onOpenCommandPalette={() => setCommandPaletteOpen(true)} />
      </ErrorBoundary>

      {/* Right-Edge Vertical Dot Rail */}
      <ErrorBoundary name="DotRail" silentFallback>
        <DotRail />
      </ErrorBoundary>

      {/* Keyboard Command Palette Modal */}
      <ErrorBoundary name="CommandPalette" silentFallback>
        <CommandPalette
          isOpen={commandPaletteOpen}
          onClose={() => setCommandPaletteOpen(false)}
        />
      </ErrorBoundary>

      {/* Main Single Page Sections */}
      <main className="relative z-10">
        <ErrorBoundary name="HeroSection">
          <HeroSection isReady={introDone} />
        </ErrorBoundary>

        <ErrorBoundary name="AboutSection">
          <AboutSection />
        </ErrorBoundary>

        <ErrorBoundary name="ExperienceSection">
          <ExperienceSection />
        </ErrorBoundary>

        <ErrorBoundary name="ProjectsSection">
          <ProjectsSection />
        </ErrorBoundary>

        <ErrorBoundary name="SkillsSection">
          <SkillsSection />
        </ErrorBoundary>

        <ErrorBoundary name="ContactSection">
          <ContactSection />
        </ErrorBoundary>
      </main>
    </div>
  );
};

export default App;
