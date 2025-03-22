import { motion } from 'framer-motion';
import { OverlayProps } from '../types';
import { formatTime } from '../utils';

export function TimerOverlay({ currentTime, style }: OverlayProps) {
  const overlayStyles = {
    minimal: 'text-4xl font-mono bg-black/30 px-4 py-2 rounded',
    classic: 'text-5xl font-serif bg-white/20 px-6 py-3 rounded-lg border-2 border-white/50',
    modern: 'text-6xl font-sans bg-gradient-to-r from-purple-500/50 to-blue-500/50 px-8 py-4 rounded-xl'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`fixed top-4 right-4 text-white ${overlayStyles[style]}`}
    >
      {formatTime(currentTime)}
    </motion.div>
  );
}