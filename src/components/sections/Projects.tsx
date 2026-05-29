import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X, Search, Rocket } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { PROJECTS } from '@/data/portfolio';
import { useState, useMemo } from 'react';
import type { Project } from '@/data/portfolio';

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = useMemo(() => {
    const cats = ['All', ...new Set(PROJECTS.map((p) => p.category))];
    return cats;
  }, []);

  const filtered = useMemo(() => {
    return PROJECTS.filter((p) => {
      const matchesFilter = activeFilter === 'All' || p.category === activeFilter;
      const matchesSearch =
        search === '' ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, search]);

  return (
    <section id="work" className="relative py-32 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[30rem] w-[60rem] bg-neon-blue/8 blur-[140px] rounded-full" />

      <div className="relative section-container">
        <SectionHeader
          kicker="// Featured Work"
          title={<>Projects that <span className="text-gradient">ship</span>.</>}
          subtitle="From AI tools to mobile apps — a curated set of things I've built end-to-end."
        />

        {/* Search + Filter Bar */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-border text-sm focus:outline-none focus:border-neon-blue/50 transition placeholder:text-muted-foreground"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  activeFilter === cat
                    ? 'bg-aurora text-white'
                    : 'card-glass text-muted-foreground hover:text-foreground'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.article
                key={p.id}
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.06 }}
                whileHover={{ y: -6 }}
                className="group relative rounded-3xl glass p-6 overflow-hidden hover:border-white/20 transition cursor-pointer"
                onClick={() => setSelectedProject(p)}
              >
                {/* Accent Glow */}
                <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-neon-blue/15 blur-3xl opacity-60 group-hover:opacity-100 transition" />
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-blue/60 to-transparent opacity-0 group-hover:opacity-100 transition" />

                <div className="relative">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-neon-blue">
                      {p.category}
                    </span>
                    {p.featured && (
                      <span className="flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-neon-gold">
                        <Rocket className="w-3 h-3" /> Featured
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <h3 className="mt-4 font-display font-bold text-2xl leading-tight group-hover:text-neon-blue transition-colors">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {p.description}
                  </p>

                  {/* Tags */}
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 border border-white/10"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="mt-6 flex items-center gap-3 text-sm">
                    <a
                      href={p.live}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 font-medium hover:text-neon-blue transition"
                    >
                      Live Demo <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <span className="h-3 w-px bg-border" />
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 font-medium text-muted-foreground hover:text-foreground transition"
                    >
                      GitHub <Github className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="mt-16 text-center text-muted-foreground">
            <p className="text-lg">No projects match your search.</p>
            <button onClick={() => { setSearch(''); setActiveFilter('All'); }} className="mt-4 text-neon-blue hover:underline">
              Clear filters
            </button>
          </div>
        )}

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/Gaurav598"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            <Github className="w-4 h-4" />
            View All on GitHub
            <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
          </a>
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <div className="absolute inset-0 bg-background/85 backdrop-blur-xl" />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ type: 'spring', damping: 20 }}
              className="relative max-w-2xl w-full rounded-3xl glass-strong border border-border p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-mono text-neon-blue uppercase tracking-widest">{selectedProject.category}</span>
                {selectedProject.featured && (
                  <span className="flex items-center gap-1 text-xs font-mono text-neon-gold">
                    <Rocket className="w-3 h-3" /> Featured
                  </span>
                )}
              </div>

              <h3 className="text-3xl font-bold font-display">{selectedProject.title}</h3>
              <p className="mt-4 text-muted-foreground leading-relaxed">{selectedProject.description}</p>

              <div className="mt-6">
                <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1.5 rounded-lg bg-white/5 border border-border text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex gap-4">
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 btn-outline justify-center"
                >
                  <Github className="w-4 h-4" /> View Code
                </a>
                <a href={selectedProject.live} className="flex-1 btn-primary justify-center">
                  <ExternalLink className="w-4 h-4" /> Live Demo
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
