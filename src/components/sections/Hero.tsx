import { motion } from 'framer-motion';
import { useTypewriter } from '@/hooks/useTypewriter';
import { PERSONAL, ROLES, SOCIAL_LINKS } from '@/data/portfolio';
import { Github, Linkedin, Mail, Download } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Magnet } from '@/components/ui/Magnet';

const iconMap = { github: Github, linkedin: Linkedin, mail: Mail };

function FloatingChip({ text, className, delay }: { text: string; className: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
      transition={{
        opacity: { delay, duration: 0.5 },
        scale: { delay, duration: 0.5 },
        y: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay },
      }}
      className={`absolute glass rounded-full px-3 py-1.5 text-xs font-mono whitespace-nowrap ${className}`}
    >
      {text}
    </motion.div>
  );
}

export function Hero() {
  const typed = useTypewriter(ROLES);
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowBubble(true), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="top" className="relative min-h-screen w-full overflow-hidden pt-32 pb-20">
      {/* Ambient backgrounds */}
      <div className="absolute inset-0 bg-mesh opacity-90" aria-hidden />
      <div className="absolute inset-0 grid-bg opacity-30" aria-hidden />
      <div className="absolute -top-40 -left-40 h-[40rem] w-[40rem] rounded-full bg-neon-blue/15 blur-[120px]" aria-hidden />
      <div className="absolute -bottom-40 -right-40 h-[40rem] w-[40rem] rounded-full bg-neon-purple/20 blur-[120px]" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-6 grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
        {/* LEFT — Text Content */}
        <div>
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs font-mono"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-green opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-green" />
            </span>
            <span className="text-muted-foreground">SYSTEM ONLINE · AVAILABLE FOR WORK</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-6 font-display font-bold tracking-tight text-[clamp(2.75rem,7vw,6.25rem)] leading-[0.95]"
          >
            Hi, I'm <span className="text-gradient">{PERSONAL.name}</span>
            <br />
            <span className="font-serif italic text-foreground/80">building the </span>
            <span className="text-gradient-primary">future</span>
            <span className="font-serif italic text-foreground/80">, one</span>
            <br />
            <span>commit at a time.</span>
          </motion.h1>

          {/* Typewriter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 flex items-center gap-3 font-mono text-base sm:text-lg"
          >
            <span className="text-muted-foreground">{'>'}</span>
            <span className="text-neon-blue">{typed}</span>
            <span className="inline-block w-2 h-5 bg-neon-blue animate-pulse" />
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-6 max-w-xl text-muted-foreground text-base sm:text-lg leading-relaxed"
          >
            {PERSONAL.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Magnet>
              <a href="#work" className="btn-primary animate-glow-pulse">
                Explore Work <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </Magnet>
            <a href="#contact" className="btn-outline">
              <span className="h-2 w-2 rounded-full bg-neon-gold" />
              Hire Me
            </a>
            <a href={PERSONAL.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn-outline">
              <Download className="w-4 h-4" />
              Resume
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="mt-8 flex items-center gap-3"
          >
            {SOCIAL_LINKS.map((social) => {
              const Icon = iconMap[social.icon];
              return (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2.5 rounded-lg card-glass text-muted-foreground hover:text-neon-blue transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              );
            })}
            <span className="text-xs font-mono text-muted-foreground ml-2">⌘K for commands</span>
          </motion.div>

          {/* Mini Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="mt-10 grid grid-cols-3 gap-4 max-w-lg"
          >
            {[
              { v: '435+', l: 'DSA Solved' },
              { v: '20+', l: 'Projects' },
              { v: '10+', l: 'Tech Stacks' },
            ].map((s) => (
              <div key={s.l} className="glass rounded-2xl p-4">
                <div className="text-2xl sm:text-3xl font-bold text-gradient">{s.v}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT — Avatar */}
        <div className="relative flex items-center justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative w-[min(90vw,440px)] aspect-square"
          >
            {/* Rotating rings */}
            <div className="absolute inset-0 rounded-full border border-neon-blue/20 animate-spin-slow" />
            <div className="absolute inset-4 rounded-full border border-neon-purple/25" style={{ animation: 'spin-slow 30s linear infinite reverse' }} />
            <div className="absolute inset-8 rounded-full border border-dashed border-neon-gold/15 animate-spin-slow" />

            {/* Glow */}
            <div className="absolute inset-0 rounded-full bg-aurora opacity-20 blur-3xl" />

            {/* Avatar */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-6 rounded-full overflow-hidden border border-white/10 glow-strong"
            >
              <img
                src={PERSONAL.avatar}
                alt={`${PERSONAL.name} avatar`}
                className="w-full h-full object-cover"
                width={1024}
                height={1024}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
            </motion.div>

            {/* Speech Bubble */}
            {showBubble && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 220, damping: 16 }}
                className="absolute -top-4 -left-2 sm:left-0 glass-strong rounded-2xl px-4 py-3 max-w-[220px] glow-blue"
              >
                <div className="flex items-center gap-2 text-[10px] font-mono text-neon-blue uppercase tracking-widest">
                  <span className="h-1.5 w-1.5 rounded-full bg-neon-blue animate-pulse" />
                  AI Assistant
                </div>
                <div className="mt-1 font-display font-semibold">Hello dude 👋</div>
                <div className="text-xs text-muted-foreground mt-0.5">Welcome to my universe.</div>
                <div className="absolute -bottom-2 left-8 h-3 w-3 rotate-45 bg-surface-elevated border-r border-b border-border" />
              </motion.div>
            )}

            {/* Floating Chips */}
            <FloatingChip text="</> React" className="-right-2 top-12" delay={0.2} />
            <FloatingChip text="⚡ Node.js" className="-left-4 top-32" delay={0.5} />
            <FloatingChip text="☁ AWS" className="-right-6 bottom-20" delay={0.8} />
            <FloatingChip text="🧠 GenAI" className="-left-2 bottom-8" delay={1.1} />
          </motion.div>
        </div>
      </div>

      {/* Scroll Cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[10px] font-mono text-muted-foreground tracking-widest"
      >
        SCROLL
        <span className="h-10 w-px bg-gradient-to-b from-neon-blue to-transparent" />
      </motion.div>
    </section>
  );
}
