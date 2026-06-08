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
        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#98A2B3' }}>
          Nível de tensão
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

      <div
        className="h-2.5 rounded-full overflow-hidden"
        style={{ background: '#EDE0CB' }}
      >
        <motion.div
          className="h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${intensity}%` }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          style={{
            backgroundColor: level.color,
            boxShadow: intensity > 0 ? `0 0 8px ${level.color}66` : 'none',
          }}
        />
      </div>

      <div className="flex justify-between mt-1">
        <span className="text-[10px]" style={{ color: '#DDD0B8' }}>calmo</span>
        <span className="text-[10px]" style={{ color: '#DDD0B8' }}>no limite</span>
      </div>
    </div>
  );
}
