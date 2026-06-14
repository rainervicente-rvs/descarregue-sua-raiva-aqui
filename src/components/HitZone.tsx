import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback, useEffect, useMemo } from 'react';
import { getCurrentPhase, MICROCOPIES } from '../types';
import type { Skin } from '../types';
import { playHitSound } from '../utils/sound';

interface Ripple {
  id: number;
  x: number;
  y: number;
}

interface HitZoneProps {
  clickCount: number;
  skin: Skin;
  onHit: () => void;
  soundEnabled: boolean;
}

const CLICK_EMOJIS = ['😤', '😩', '😫', '🤯', '💨'] as const;

function clickEmoji(clicks: number): string {
  if (clicks === 0)  return CLICK_EMOJIS[0];
  if (clicks < 25)   return CLICK_EMOJIS[1];
  if (clicks < 50)   return CLICK_EMOJIS[2];
  if (clicks < 100)  return CLICK_EMOJIS[3];
  return CLICK_EMOJIS[4];
}

export function HitZone({ clickCount, skin, onHit, soundEnabled }: HitZoneProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const phase = getCurrentPhase(clickCount);

  // New random microcopy per phase
  const microcopy = useMemo(
    () => MICROCOPIES[Math.floor(Math.random() * MICROCOPIES.length)],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [phase.label],
  );

  // Any keypress (non-modifier, non-combo) triggers a hit
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (
        ['Shift', 'Control', 'Alt', 'Meta', 'Tab', 'CapsLock', 'Escape',
          'F1','F2','F3','F4','F5','F6','F7','F8','F9','F10','F11','F12',
        ].includes(e.key)
      ) return;
      const target = e.target as HTMLElement;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) return;
      e.preventDefault();
      navigator.vibrate?.(20);
      if (soundEnabled) playHitSound();
      onHit();
    }
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onHit]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const id = Date.now() + Math.random();
      setRipples(prev => [
        ...prev.slice(-8),
        { id, x: e.clientX - rect.left, y: e.clientY - rect.top },
      ]);
      setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 500);
      navigator.vibrate?.(28);
      if (soundEnabled) playHitSound();
      onHit();
    },
    [onHit],
  );

  const size = Math.min(200 + clickCount * 1.4, 300);
  const color = clickCount > 0 ? phase.color : skin.primaryColor;

  return (
    <div className="flex flex-col items-center gap-4 py-4 px-4">
      {/* Phase / prompt */}
      <div className="text-center h-12 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={phase.label + clickCount.toString().slice(0, 1)}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="font-black text-lg leading-tight"
            style={{ color }}
          >
            {clickCount > 0 ? phase.label : 'Aperte para começar'}
          </motion.p>
        </AnimatePresence>

        {clickCount > 0 && (
          <motion.p
            key={microcopy}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.65 }}
            className="text-xs mt-0.5"
            style={{ color: '#667085' }}
          >
            {microcopy}
          </motion.p>
        )}
      </div>

      {/* Button */}
      <div
        className="relative flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        {clickCount > 0 && (
          <>
            <motion.div
              className="absolute rounded-full border-2"
              style={{ borderColor: color, opacity: 0.18 }}
              animate={{ width: size + 24, height: size + 24 }}
              transition={{ type: 'spring', stiffness: 80 }}
            />
            <motion.div
              className="absolute rounded-full border"
              style={{ borderColor: color, opacity: 0.09 }}
              animate={{ width: size + 52, height: size + 52 }}
              transition={{ type: 'spring', stiffness: 55, delay: 0.05 }}
            />
          </>
        )}

        <motion.button
          onClick={handleClick}
          whileTap={{ scale: 0.88 }}
          whileHover={{ scale: 1.03 }}
          className="relative rounded-full flex flex-col items-center justify-center gap-2 select-none overflow-hidden cursor-pointer"
          style={{
            width: size,
            height: size,
            background: `radial-gradient(circle at center, ${color}18 0%, ${color}05 65%, transparent 100%)`,
            border: `2.5px solid ${color}`,
            boxShadow: clickCount > 0
              ? `0 0 ${16 + Math.min(clickCount / 4, 28)}px ${color}44`
              : `0 4px 20px ${color}22`,
            transition: 'border-color 0.4s, box-shadow 0.4s',
          }}
          aria-label={`Botão de descarga emocional — ${skin.buttonLabel}`}
        >
          {/* Ripples */}
          <AnimatePresence>
            {ripples.map(r => (
              <motion.span
                key={r.id}
                className="absolute rounded-full pointer-events-none"
                style={{ left: r.x, top: r.y, x: '-50%', y: '-50%', backgroundColor: color }}
                initial={{ width: 0, height: 0, opacity: 0.4 }}
                animate={{ width: 200, height: 200, opacity: 0 }}
                exit={{}}
                transition={{ duration: 0.45, ease: 'easeOut' }}
              />
            ))}
          </AnimatePresence>

          <span className="text-2xl select-none pointer-events-none">
            {clickEmoji(clickCount)}
          </span>
          <span
            className="text-lg font-black tracking-widest select-none pointer-events-none"
            style={{ color }}
          >
            {skin.buttonLabel}
          </span>
        </motion.button>
      </div>

      {/* Counter */}
      {clickCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="text-4xl font-black" style={{ color }}>
            {clickCount}
          </p>
          <p className="text-xs mt-0.5" style={{ color: '#98A2B3' }}>
            {clickCount === 1 ? 'aperto' : 'apertas'} · pare 3s para liberar
          </p>
        </motion.div>
      )}
    </div>
  );
}
