import { motion } from 'framer-motion';
import { useMousePosition } from '@/hooks/useMousePosition';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export function CustomCursor() {
  const { x, y } = useMousePosition();
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (!isDesktop) return null;

  return (
    <>
      <motion.div
        className="fixed w-5 h-5 rounded-full bg-neon-blue/40 blur-sm pointer-events-none z-[9999] mix-blend-screen"
        animate={{ x: x - 10, y: y - 10 }}
        transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
      />
      <motion.div
        className="fixed w-1.5 h-1.5 rounded-full bg-white pointer-events-none z-[9999]"
        animate={{ x: x - 3, y: y - 3 }}
        transition={{ type: 'spring', stiffness: 1000, damping: 28 }}
      />
    </>
  );
}
