import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgressLine: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] bg-transparent z-50 pointer-events-none">
      <motion.div
        className="h-full bg-gradient-quant origin-left relative"
        style={{ scaleX }}
      >
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-mint shadow-mint-glow" />
      </motion.div>
    </div>
  );
};
