import { useState, useEffect } from 'react';

export function useTypewriter(words: string[], speed = 70, pause = 1800) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index];
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          setText(word.slice(0, text.length + 1));
          if (text.length + 1 === word.length) {
            setTimeout(() => setDeleting(true), pause);
          }
        } else {
          setText(word.slice(0, text.length - 1));
          if (text.length - 1 === 0) {
            setDeleting(false);
            setIndex((i) => (i + 1) % words.length);
          }
        }
      },
      deleting ? speed / 2 : speed,
    );
    return () => clearTimeout(timeout);
  }, [text, deleting, index, words, speed, pause]);

  return text;
}
