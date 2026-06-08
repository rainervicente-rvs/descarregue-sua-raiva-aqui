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

// Gentle brand-aligned emojis — releasing tension, not adding to it
const RELEASE_EMOJIS = ['💨', '🌊', '🍃', '✨', '💙'];
const BRAND_COLORS = ['#F46F5E', '#B9A7E8', '#9CCBEA', '#A8C49A', '#F0A030'];

function createParticles(intensity: number, level: ReturnType<typeof getIntensityLevel>): Particle[] {
  const count = 10 + Math.floor(intensity / 10);
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;

  return Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2 + Math.random() * 0.5;
    const speed = 3 + Math.random() * 6 + intensity / 25;
    const useEmoji = Math.random() < 0.4 && intensity > 30;
    const color = BRAND_COLORS[Math.floor(Math.random() * BRAND_COLORS.length)];
    return {
      id: i,
      x: cx,
      y: cy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 1.5,
      size: 5 + Math.random() * 8,
      color: useEmoji ? level.color : color,
      emoji: useEmoji ? RELEASE_EMOJIS[Math.floor(Math.random() * RELEASE_EMOJIS.length)] : undefined,
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
          {/* Soft flash overlay — much gentler than before */}
          <motion.div
            className="fixed inset-0 pointer-events-none z-40"
            initial={{ opacity: 0.18 }}
            animate={{ opacity: 0 }}
            exit={{}}
            transition={{ duration: 0.4 }}
            style={{ backgroundColor: level.color }}
          />

          {/* Brand-colored release particles */}
          {particles.map(p => (
            <motion.div
              key={p.id}
              className="fixed z-50 pointer-events-none rounded-full flex items-center justify-center"
              style={{
                left: p.x,
                top: p.y,
                width: p.emoji ? 26 : p.size,
                height: p.emoji ? 26 : p.size,
                backgroundColor: p.emoji ? 'transparent' : p.color,
                fontSize: p.emoji ? 18 : undefined,
              }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{
                x: p.vx * 55,
                y: p.vy * 55,
                opacity: 0,
                scale: p.emoji ? 1.4 : 0,
              }}
              exit={{}}
              transition={{ duration: 0.8 + Math.random() * 0.3, ease: 'easeOut' }}
            >
              {p.emoji}
            </motion.div>
          ))}
        </>
      )}
    </AnimatePresence>
  );
}
