import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface SectionHeaderProps {
  kicker: string;
  title: ReactNode;
  subtitle?: string;
}

export function SectionHeader({ kicker, title, subtitle }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl"
    >
      <div className="inline-flex items-center gap-2 font-mono text-xs text-neon-blue uppercase tracking-widest">
        <span className="h-px w-8 bg-neon-blue" />
        {kicker}
      </div>
      <h2 className="mt-4 font-display font-bold text-[clamp(2rem,5vw,4rem)] leading-[1.05] tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-muted-foreground text-base sm:text-lg">{subtitle}</p>
      )}
    </motion.div>
  );
}
