import { useScrollProgress } from '@/hooks/useScrollProgress';

export function ScrollProgress() {
  const progress = useScrollProgress();
  return (
    <div
      className="fixed top-0 left-0 h-[3px] z-[60] bg-aurora"
      style={{ width: `${progress}%`, transition: 'width 0.05s linear' }}
    />
  );
}
