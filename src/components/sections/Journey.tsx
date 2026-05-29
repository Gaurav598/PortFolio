import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { MILESTONES } from '@/data/portfolio';

export function Journey() {
  return (
    <section id="journey" className="relative py-32 overflow-hidden">
      <div className="absolute top-1/3 -left-40 h-[30rem] w-[30rem] rounded-full bg-neon-purple/10 blur-[120px]" />

      <div className="relative mx-auto max-w-5xl px-6">
        <SectionHeader
          kicker="// The Journey"
          title={<>From curiosity to <span className="text-gradient">craft</span>.</>}
          subtitle="A roadmap of relentless learning, building, and refusing to stand still."
        />

        <div className="relative mt-20 pl-8 sm:pl-16">
          {/* Timeline line */}
          <div className="absolute left-2 sm:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-neon-blue via-neon-purple to-neon-gold opacity-40" />

          {MILESTONES.map((m, i) => (
            <motion.div
              key={m.year}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="relative mb-14 last:mb-0"
            >
              {/* Dot */}
              <div className="absolute -left-[22px] sm:-left-[42px] top-1 h-4 w-4 rounded-full bg-aurora ring-4 ring-background glow-blue" />

              <div className="font-mono text-xs text-neon-blue tracking-widest">{m.year}</div>
              <h3 className="mt-2 font-display font-bold text-2xl sm:text-3xl">{m.title}</h3>
              <p className="mt-2 text-muted-foreground max-w-2xl leading-relaxed">{m.description}</p>

              {/* Emoji accent */}
              <span className="absolute -right-4 top-0 text-2xl opacity-40 hidden sm:block">{m.icon}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
