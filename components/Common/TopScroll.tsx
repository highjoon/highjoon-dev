'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

const TopScroll = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[10px] bg-primary-500 origin-top-left z-20"
      style={{ scaleX }}
    />
  );
};

export default TopScroll;
