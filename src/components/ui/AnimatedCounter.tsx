import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface AnimatedCounterProps {
  to: number;
  suffix?: string;
  className?: string;
}

export function AnimatedCounter({ to, suffix = '', className }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.floor(v).toLocaleString() + suffix);

  useEffect(() => {
    if (inView) {
      const controls = animate(count, to, { duration: 2, ease: 'easeOut' });
      return controls.stop;
    }
  }, [inView, to, count]);

  return <motion.span ref={ref} className={className}>{rounded}</motion.span>;
}
