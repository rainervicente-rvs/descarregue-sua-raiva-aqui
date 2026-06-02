import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback } from 'react';
import { Zap } from 'lucide-react';
import { getIntensityLevel } from '../types';

interface HitZoneProps {
  clickCount: number;
  intensity: number;
  onHit: () => void;
}


interface Ripple {
  id: number;
  x: number;
  y: number;
}

export function HitZone({ clickCount, intensity, onHit }: HitZoneProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const level = getIntensityLevel(intensity);

  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const id = Date.now() + Math.random();
    setRipples(prev => [...prev.slice(-8), { id, x, y }]);
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 600);

    onHit();
  }, [onHit]);

  const size = Math.min(200 + clickCount * 2, 320);

  return (
    <div className="flex flex-col items-center gap-6 py-4">
      <div className="text-center">
        <p className="text-zinc-400 text-sm mb-1">Aperte quantas vezes quiser</p>
        <p className="text-zinc-600 text-xs">Pare por 3s para soltar a raiva — nada fica salvo</p>
      </div>

      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        {/* Glow rings */}
        {clickCount > 0 && (
          <>
            <motion.div
              className="absolute rounded-full border-2"
              style={{ borderColor: level.color, opacity: 0.2 }}
              animate={{ width: size + 20, height: size + 20 }}
              transition={{ type: 'spring', stiffness: 80 }}
            />
            <motion.div
              className="absolute rounded-full border"
              style={{ borderColor: level.color, opacity: 0.1 }}
              animate={{ width: size + 40, height: size + 40 }}
              transition={{ type: 'spring', stiffness: 60, delay: 0.05 }}
            />
          </>
        )}

        {/* Main hit button */}
        <motion.button
          onClick={handleClick}
          whileTap={{ scale: 0.88 }}
          className="relative rounded-full flex flex-col items-center justify-center gap-2 font-black text-white select-none overflow-hidden cursor-pointer"
          style={{
            width: size,
            height: size,
            background: `radial-gradient(circle at center, ${level.color}33 0%, ${level.color}11 60%, transparent 100%)`,
            border: `3px solid ${level.color}`,
            boxShadow: clickCount > 0 ? `0 0 ${30 + intensity / 3}px ${level.color}66` : 'none',
          }}
          animate={{ scale: [1, 1] }}
          whileHover={{ scale: 1.03 }}
        >
          {/* Ripples */}
          <AnimatePresence>
            {ripples.map(r => (
              <motion.span
                key={r.id}
                className="absolute rounded-full pointer-events-none"
                style={{
                  left: r.x,
                  top: r.y,
                  x: '-50%',
                  y: '-50%',
                  backgroundColor: level.color,
                }}
                initial={{ width: 0, height: 0, opacity: 0.6 }}
                animate={{ width: 200, height: 200, opacity: 0 }}
                exit={{}}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            ))}
          </AnimatePresence>

          <Zap size={36} style={{ color: level.color }} />
          <span className="text-xl tracking-widest" style={{ color: level.color }}>
            APERTAR!
          </span>
        </motion.button>
      </div>

      {clickCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="text-4xl font-black" style={{ color: level.color }}>
            {clickCount}
          </p>
          <p className="text-zinc-500 text-sm">
            {clickCount === 1 ? 'aperto' : 'apertas'}
          </p>
        </motion.div>
      )}
    </div>
  );
}
