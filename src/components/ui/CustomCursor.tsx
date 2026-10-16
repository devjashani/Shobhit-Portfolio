import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const springConfig = { damping: 28, stiffness: 380, mass: 0.4 };
  const cursorX = useSpring(-100, springConfig);
  const cursorY = useSpring(-100, springConfig);

  useEffect(() => {
    // Only enable on desktop with fine mouse pointer
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const interactiveEl = target?.closest('[data-cursor], a, button, input, textarea, [role="button"]');
      
      if (interactiveEl) {
        setIsHovered(true);
        const customText = (interactiveEl as HTMLElement).dataset.cursor;
        if (customText) {
          setCursorText(customText);
        } else if (interactiveEl.tagName === 'A' || interactiveEl.closest('a')) {
          setCursorText('OPEN');
        } else if (interactiveEl.closest('.project-card')) {
          setCursorText('VIEW');
        } else {
          setCursorText('');
        }
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden md:block">
      {/* Outer Ring with mix-blend-mode: difference */}
      <motion.div
        className="fixed top-0 left-0 rounded-full flex items-center justify-center pointer-events-none text-[#05060A] font-mono text-[10px] font-bold tracking-widest uppercase transition-[width,height,background-color] duration-200"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          mixBlendMode: 'difference',
        }}
        animate={{
          width: isHovered ? (cursorText ? 64 : 44) : 26,
          height: isHovered ? (cursorText ? 64 : 44) : 26,
          backgroundColor: isHovered ? '#FFFFFF' : 'transparent',
          border: isHovered ? 'none' : '1px solid rgba(255, 255, 255, 0.45)',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
      >
        {isHovered && cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="select-none"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>

      {/* Small Center Dot */}
      {!isHovered && (
        <motion.div
          className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: '-50%',
            translateY: '-50%',
            mixBlendMode: 'difference',
          }}
        />
      )}
    </div>
  );
};
