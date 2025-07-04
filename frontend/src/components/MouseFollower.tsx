import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const MouseFollower = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      // Clamp the position so the follower never goes outside the viewport
      const x = Math.max(0, Math.min(window.innerWidth - 32, e.clientX - 16));
      const y = Math.max(0, Math.min(window.innerHeight - 32, e.clientY - 16));
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={cursorRef}
      className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-50 mix-blend-difference"
      style={{
        x: cursorX,
        y: cursorY,
        maxWidth: '100vw',
        maxHeight: '100vh',
        overflow: 'clip',
      }}
    >
      <div className="w-full h-full bg-white rounded-full opacity-75" />
    </motion.div>
  );
};