import { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { ScrollProgress } from '@/components/layout/ScrollProgress';
import { CustomCursor } from '@/components/layout/CustomCursor';
import { LoadingScreen } from '@/components/layout/LoadingScreen';
import { BackToTop } from '@/components/layout/BackToTop';
import { CommandPalette } from '@/components/layout/CommandPalette';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { Stats } from '@/components/sections/Stats';
import { About } from '@/components/sections/About';
import { TechStack } from '@/components/sections/TechStack';
import { Projects } from '@/components/sections/Projects';
import { Journey } from '@/components/sections/Journey';
import { Contact } from '@/components/sections/Contact';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(true);

  // Loading screen
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(t);
  }, []);

  // Theme toggle
  const toggleTheme = () => {
    setIsDark((d) => {
      const next = !d;
      document.documentElement.classList.toggle('light', !next);
      document.documentElement.classList.toggle('dark', next);
      return next;
    });
  };

  return (
    <>
      <LoadingScreen isLoading={loading} />
      <CustomCursor />
      <ScrollProgress />
      <CommandPalette onToggleTheme={toggleTheme} isDark={isDark} />
      <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
      <BackToTop />

      {!loading && (
        <div className="relative">
          <Navbar />
          <main>
            <Hero />
            <Stats />
            <About />
            <TechStack />
            <Projects />
            <Journey />
            <Contact />
          </main>
          <Footer />
        </div>
      )}
    </>
  );
}
