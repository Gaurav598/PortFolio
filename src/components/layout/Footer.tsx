import { motion } from 'framer-motion';
import { Heart, Github, Linkedin, Mail, ArrowUp, Code2 } from 'lucide-react';
import { PERSONAL, SOCIAL_LINKS, NAV_ITEMS } from '@/data/portfolio';

const iconMap = { github: Github, linkedin: Linkedin, mail: Mail };

export function Footer() {
  return (
    <footer className="relative py-16 overflow-hidden border-t border-border">
      <div className="absolute inset-0 bg-mesh opacity-30" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-neon-blue/5 rounded-full blur-3xl" />

      <div className="relative z-10 section-container">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-aurora flex items-center justify-center glow-blue">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gradient font-display">{PERSONAL.name}</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              {PERSONAL.description}
            </p>
            <div className="flex gap-3">
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
                    className="p-2.5 rounded-lg card-glass text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-foreground font-semibold mb-4 font-display">Quick Links</h3>
            <ul className="space-y-2">
              {[{ label: 'Home', href: '#top' }, ...NAV_ITEMS].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-muted-foreground hover:text-neon-blue transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="text-neon-blue opacity-0 group-hover:opacity-100 transition-opacity">{'>'}</span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Terminal Widget */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-foreground font-semibold mb-4 font-display flex items-center gap-2">
              <span className="text-neon-green">●</span> Terminal
            </h3>
            <div className="card-glass rounded-xl p-4 font-mono text-xs">
              <div className="text-muted-foreground mb-1.5">{`> gaurav.status`}</div>
              <div className="text-neon-green">{`"Building amazing things"`}</div>
              <div className="mt-2.5 text-muted-foreground">{`> gaurav.passion`}</div>
              <div className="text-neon-blue">{`"Code • Learn • Grow"`}</div>
              <div className="mt-2.5 text-muted-foreground">{`> gaurav.available`}</div>
              <div className="text-neon-gold">{`true`}</div>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="inline-block w-1.5 h-3.5 bg-neon-blue ml-1 mt-2"
              />
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8" />

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              <Heart className="w-4 h-4 text-neon-pink inline" />
            </motion.span>
            <span>
              Built with passion by{' '}
              <span className="text-foreground font-medium">{PERSONAL.name}</span>
              {' '}© {new Date().getFullYear()}
            </span>
          </div>
          <p className="text-[10px] text-muted-foreground font-mono opacity-50">
            {`/* Press ⌘K for command palette */`}
          </p>
        </div>
      </div>
    </footer>
  );
}
