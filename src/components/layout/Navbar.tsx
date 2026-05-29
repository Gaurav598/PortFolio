import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';
import { NAV_ITEMS, PERSONAL, SOCIAL_LINKS } from '@/data/portfolio';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      // Detect active section
      const sections = NAV_ITEMS.map((item) => item.href.replace('#', ''));
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 px-4 pt-4"
      >
        <nav
          className={`mx-auto max-w-6xl flex items-center justify-between rounded-full px-5 py-2.5 transition-all duration-500 ${
            scrolled ? 'glass-strong glow-blue' : 'glass'
          }`}
        >
          {/* Logo */}
          <a href="#top" className="flex items-center gap-2 group">
            <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-full bg-aurora glow-blue">
              <span className="font-display font-bold text-white text-sm">G</span>
            </span>
            <span className="font-display font-semibold tracking-tight">
              {PERSONAL.name}<span className="text-neon-blue">.</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-1 text-sm">
            {NAV_ITEMS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`relative px-3 py-2 rounded-full transition-colors ${
                    activeSection === l.href.replace('#', '')
                      ? 'text-neon-blue'
                      : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                  }`}
                >
                  {l.label}
                  {activeSection === l.href.replace('#', '') && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-neon-blue/10 border border-neon-blue/20"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden sm:flex items-center gap-2">
            <a
              href={SOCIAL_LINKS[0].href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={SOCIAL_LINKS[1].href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium bg-aurora text-white hover:opacity-90 transition glow-blue"
            >
              Let's Talk <span className="text-base">→</span>
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="absolute inset-0 bg-background/95 backdrop-blur-2xl" onClick={() => setMobileOpen(false)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 20 }}
              className="absolute right-0 top-0 h-full w-72 bg-surface/95 backdrop-blur-xl border-l border-border p-6 pt-24"
            >
              <div className="flex flex-col space-y-3">
                {NAV_ITEMS.map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08 }}
                    className={`py-3 px-4 rounded-xl text-lg font-medium transition-colors ${
                      activeSection === item.href.replace('#', '')
                        ? 'bg-neon-blue/10 text-neon-blue'
                        : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </motion.a>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: NAV_ITEMS.length * 0.08 }}
                  className="pt-4 border-t border-border"
                >
                  <a
                    href="#contact"
                    onClick={() => setMobileOpen(false)}
                    className="w-full block text-center py-3 rounded-xl bg-aurora text-white font-medium"
                  >
                    Let's Talk →
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
