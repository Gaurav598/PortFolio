import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
}

function Char({ char, index, total, progress }: { char: string; index: number; total: number; progress: MotionValue<number> }) {
  const start = index / total;
  const end = start + 1 / total;
  const opacity = useTransform(progress, [start, end], [0.15, 1]);

  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      <span style={{ opacity: 0.15 }}>{char}</span>
      <motion.span
        style={{ opacity, position: 'absolute', left: 0, top: 0, width: '100%' }}
        aria-hidden="true"
      >
        {char}
      </motion.span>
    </span>
  );
}

export function AnimatedText({ text, className }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.25'],
  });

  const words = text.split(' ');
  const totalChars = text.length;
  let runningIndex = 0;

  return (
    <p ref={ref} className={className}>
      {words.map((word, wi) => {
        const wordChars = Array.from(word);
        const wordStart = runningIndex;
        runningIndex += wordChars.length + 1;

        return (
          <span key={wi} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
            {wordChars.map((ch, ci) => (
              <Char key={ci} char={ch} index={wordStart + ci} total={totalChars} progress={scrollYProgress} />
            ))}
            {wi < words.length - 1 && '\u00A0'}
          </span>
        );
      })}
    </p>
  );
}
