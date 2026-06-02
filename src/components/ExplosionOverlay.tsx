import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { getIntensityLevel } from '../types';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  emoji?: string;
}

const EMOJIS = ['💢', '🔥', '💥', '⚡', '😤', '🤬'];

function createParticles(intensity: number, level: ReturnType<typeof getIntensityLevel>): Particle[] {
  const count = 12 + Math.floor(intensity / 10);
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;

  return Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2 + Math.random() * 0.5;
    const speed = 4 + Math.random() * 8 + intensity / 20;
    const useEmoji = Math.random() < 0.3 && intensity > 40;
    return {
      id: i,
      x: cx,
      y: cy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 2,
      size: 6 + Math.random() * 10,
      color: level.color,
      emoji: useEmoji ? EMOJIS[Math.floor(Math.random() * EMOJIS.length)] : undefined,
    };
  });
}

interface ExplosionOverlayProps {
  isExploding: boolean;
  intensity: number;
}

export function ExplosionOverlay({ isExploding, intensity }: ExplosionOverlayProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const level = getIntensityLevel(intensity);

  useEffect(() => {
    if (!isExploding) return;
    setParticles(createParticles(intensity, level));
  }, [isExploding, intensity, level]);

  return (
    <AnimatePresence>
      {isExploding && (
        <>
          {/* Flash overlay */}
          <motion.div
            className="fixed inset-0 pointer-events-none z-40"
            initial={{ opacity: 0.3 }}
            animate={{ opacity: 0 }}
            exit={{}}
            transition={{ duration: 0.3 }}
            style={{ backgroundColor: level.color }}
          />

          {/* Particles */}
          {particles.map(p => (
            <motion.div
              key={p.id}
              className="fixed z-50 pointer-events-none rounded-full flex items-center justify-center"
              style={{
                left: p.x,
                top: p.y,
                width: p.emoji ? 28 : p.size,
                height: p.emoji ? 28 : p.size,
                backgroundColor: p.emoji ? 'transparent' : p.color,
                fontSize: p.emoji ? 20 : undefined,
              }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{
                x: p.vx * 60,
                y: p.vy * 60,
                opacity: 0,
                scale: p.emoji ? 1.5 : 0,
              }}
              exit={{}}
              transition={{ duration: 0.7 + Math.random() * 0.3, ease: 'easeOut' }}
            >
              {p.emoji}
            </motion.div>
          ))}
        </>
      )}
    </AnimatePresence>
  );
}
