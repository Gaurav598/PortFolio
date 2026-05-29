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
        <div className="lg:sticky lg:top-32">
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
