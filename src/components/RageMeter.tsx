import { motion, AnimatePresence } from 'framer-motion';
import { getIntensityLevel } from '../types';

interface RageMeterProps {
  intensity: number;
}

export function RageMeter({ intensity }: RageMeterProps) {
  const level = getIntensityLevel(intensity);

  return (
    <div className="px-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-zinc-500 font-medium uppercase tracking-wider">
          Nível de raiva
        </span>
        <AnimatePresence mode="wait">
          <motion.span
            key={level.label}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="text-xs font-bold flex items-center gap-1"
            style={{ color: level.color }}
          >
            <span>{level.emoji}</span>
            <span>{level.label}</span>
          </motion.span>
        </AnimatePresence>
      </div>

      <div className="h-2.5 bg-zinc-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${intensity}%` }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          style={{ backgroundColor: level.color, boxShadow: `0 0 8px ${level.color}` }}
        />
      </div>

      <div className="flex justify-between mt-1">
        <span className="text-[10px] text-zinc-600">0</span>
        <span className="text-[10px] text-zinc-600">100</span>
      </div>
    </div>
  );
}
