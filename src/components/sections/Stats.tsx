import { motion } from 'framer-motion';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { STATS } from '@/data/portfolio';

export function Stats() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="relative section-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative rounded-3xl glass p-6 sm:p-8 text-center overflow-hidden group"
            >
              <div className="absolute inset-0 bg-aurora opacity-0 group-hover:opacity-10 transition" />
              <div className="relative font-display font-bold text-4xl sm:text-5xl text-gradient">
                <AnimatedCounter to={s.value} suffix={s.suffix} />
              </div>
              <div className="relative mt-2 text-xs sm:text-sm text-muted-foreground uppercase tracking-wider">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
