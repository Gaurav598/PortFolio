import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { TECH_CATEGORIES, MARQUEE_TAGS } from '@/data/portfolio';
import { useState } from 'react';

export function TechStack() {
  const allCategories = ['All', ...TECH_CATEGORIES.map((c) => c.title)];
  const [active, setActive] = useState('All');

  const filtered = active === 'All'
    ? TECH_CATEGORIES
    : TECH_CATEGORIES.filter((c) => c.title === active);

  return (
    <section id="stack" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[30rem] w-[30rem] rounded-full bg-neon-purple/8 blur-[120px]" />

      <div className="relative section-container">
        <SectionHeader
          kicker="// Tech Arsenal"
          title={<>The <span className="text-gradient">weapons</span> in my stack</>}
          subtitle="Carefully chosen. Constantly sharpened. Battle-tested in production."
        />

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 flex flex-wrap gap-2"
        >
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                active === cat
                  ? 'bg-aurora text-white glow-blue'
                  : 'card-glass text-muted-foreground hover:text-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Tech Grid */}
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group relative rounded-2xl glass p-6 hover:border-neon-blue/40 transition overflow-hidden"
            >
              <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-neon-blue/10 blur-2xl opacity-60 group-hover:opacity-100 transition" />
              <h3 className="relative font-display font-semibold text-lg mb-4">{cat.title}</h3>
              <ul className="relative flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <li
                    key={item}
                    className="text-xs font-mono px-2.5 py-1 rounded-md bg-white/5 border border-white/10 hover:border-neon-blue/40 hover:text-neon-blue transition cursor-default"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Infinite Marquee */}
      <div className="relative mt-24 overflow-hidden border-y border-border py-8">
        <div className="flex animate-marquee w-max gap-12 text-3xl sm:text-5xl font-display font-bold whitespace-nowrap">
          {[...MARQUEE_TAGS, ...MARQUEE_TAGS].map((t, i) => (
            <span key={i} className="text-foreground/10 hover:text-gradient transition">
              {t} <span className="text-neon-blue">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
