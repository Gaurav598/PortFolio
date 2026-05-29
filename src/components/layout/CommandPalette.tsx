import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { Search, ArrowRight, Download, Moon, Sun } from 'lucide-react';
import { NAV_ITEMS, PERSONAL } from '@/data/portfolio';

interface CommandPaletteProps {
  onToggleTheme: () => void;
  isDark: boolean;
}

export function CommandPalette({ onToggleTheme, isDark }: CommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const commands = [
    ...NAV_ITEMS.map((item) => ({
      label: `Go to ${item.label}`,
      action: () => {
        document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
        setOpen(false);
      },
      icon: <ArrowRight className="w-4 h-4" />,
    })),
    {
      label: 'Download Resume',
      action: () => {
        window.open(PERSONAL.resumeUrl, '_blank');
        setOpen(false);
      },
      icon: <Download className="w-4 h-4" />,
    },
    {
      label: isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode',
      action: () => {
        onToggleTheme();
        setOpen(false);
      },
      icon: isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />,
    },
  ];

  const filtered = commands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase()),
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
        setQuery('');
      }
      if (e.key === 'Escape') setOpen(false);
    },
    [],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-start justify-center pt-[20vh]"
          onClick={() => setOpen(false)}
        >
          <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: -10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="relative w-full max-w-lg mx-4 rounded-2xl glass-strong border border-border overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command..."
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <kbd className="hidden sm:inline text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div className="max-h-64 overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <p className="px-3 py-4 text-sm text-muted-foreground text-center">No results found</p>
              ) : (
                filtered.map((cmd, i) => (
                  <button
                    key={i}
                    onClick={cmd.action}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-left hover:bg-neon-blue/10 hover:text-neon-blue transition-colors group"
                  >
                    <span className="text-muted-foreground group-hover:text-neon-blue transition-colors">
                      {cmd.icon}
                    </span>
                    {cmd.label}
                  </button>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2 border-t border-border flex items-center justify-between text-[10px] font-mono text-muted-foreground">
              <span>Navigate with ↑↓ · Select with ↵</span>
              <span>⌘K to toggle</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
