import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { AnimatedText } from '@/components/ui/AnimatedText';
import { ABOUT_PARAGRAPHS } from '@/data/portfolio';

const ABOUT_TEXT_PLAIN =
  "I'm Gaurav — a Full Stack Developer and AI Engineer obsessed with shipping work that feels next-generation. I don't believe in shortcuts. I believe in relentless, daily, deliberate practice. Every day I'm pushing commits, solving DSA problems, breaking down distributed systems, and prototyping with LLMs. I want to be in the top 1% of engineers — not because of titles, but because of craft.";

export function About() {
  return (
    <section id="about" className="relative py-32 overflow-hidden">
      <div className="absolute top-0 right-0 h-[30rem] w-[30rem] rounded-full bg-neon-blue/8 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-6 grid lg:grid-cols-[1fr_1.4fr] gap-16 items-start">
        {/* Left — Sticky Header */}
        <div className="lg:sticky lg:top-24 space-y-8">
          <div>
            <SectionHeader
              kicker="// About Me"
              title={<>Built for the <span className="text-gradient">long game</span>.</>}
            />

            {/* Scroll-driven text reveal */}
            <div className="mt-8 hidden lg:block">
              <AnimatedText
                text={ABOUT_TEXT_PLAIN}
                className="font-medium leading-relaxed text-muted-foreground text-lg"
              />
            </div>
          </div>

          {/* Workspace Spotlight Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative rounded-2xl overflow-hidden glass border border-white/10 glow-strong group shadow-lg aspect-[3/2] w-full"
          >
            {/* Ambient background light */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-0 border border-white/5 rounded-2xl pointer-events-none z-10" />

            {/* Futuristic viewfinder brackets */}
            <div className="absolute inset-6 border border-white/5 pointer-events-none z-10">
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/30" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/30" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/30" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/30" />
              
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 border border-white/15 rounded-full" />
            </div>

            {/* Image */}
            <img
              src="/profile_landscape.png"
              alt="Gaurav Developer Workspace"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter saturate-[0.85] group-hover:saturate-100"
              loading="lazy"
            />

            {/* Scanning line animation */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
              <motion.div
                initial={{ y: '-100%' }}
                animate={{ y: '100%' }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="w-full h-0.5 bg-gradient-to-r from-transparent via-neon-purple/40 to-transparent shadow-[0_0_8px_rgba(168,85,247,0.6)]"
              />
            </div>

            {/* LED Status Indicator */}
            <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 bg-background/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 text-[9px] font-mono tracking-widest text-foreground">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-purple opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-neon-purple" />
              </span>
              WORKSPACE SETUP
            </div>

            <div className="absolute bottom-3 left-3 z-20 text-[9px] font-mono text-muted-foreground/80">
              SYS // AI-POWERED DEV LAB
            </div>
          </motion.div>
        </div>

        {/* Right — Rich bio paragraphs */}
        <div className="space-y-8 text-lg leading-relaxed">
          {ABOUT_PARAGRAPHS.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-muted-foreground"
            >
              {p}
            </motion.p>
          ))}

          {/* Values Grid */}
          <div className="grid grid-cols-2 gap-4 pt-4">
            {[
              { emoji: '🎯', title: 'Discipline', desc: 'Consistent daily effort that compounds.' },
              { emoji: '⚡', title: 'Speed', desc: 'Learn fast, iterate faster, ship relentlessly.' },
              { emoji: '❤️', title: 'Passion', desc: 'Code is not just work, it\'s craft.' },
              { emoji: '✨', title: 'Growth', desc: 'Every day better than yesterday.' },
            ].map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.08 }}
                whileHover={{ y: -4 }}
                className="card-glass rounded-xl p-4"
              >
                <span className="text-2xl">{v.emoji}</span>
                <h3 className="text-foreground font-semibold mt-2">{v.title}</h3>
                <p className="text-muted-foreground text-sm mt-1">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
