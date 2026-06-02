import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { getIntensityLevel, INTENSITY_LEVELS } from '../types';

const MESSAGES_BY_LEVEL: Record<number, string[]> = {
  0: [
    'Até que ficou suave. Mais calmo agora?',
    'Raiva pequena, mas aliviou, né?',
  ],
  1: [
    'Isso! Boa de liberar isso.',
    'Um pouco de raiva saiu. Saudável!',
  ],
  2: [
    'Pronto! Já está melhor, né?',
    'Essa tava guardada faz tempo!',
    'Raiva liberada. 🔥',
  ],
  3: [
    'CARAMBA! Essa raiva era pesada mesmo!',
    'Que descarga! Respira fundo agora.',
    'LIBERADO! Você tava precisando disso.',
  ],
  4: [
    '🤬 DESTRUIÇÃO TOTAL! Raiva massacrada!',
    'NÍVEL MÁXIMO LIBERADO!! Você está ok?',
    'KABOOM!! Essa foi de rachar o teto!!',
  ],
};

function getLevelIndex(intensity: number): number {
  for (let i = INTENSITY_LEVELS.length - 1; i >= 0; i--) {
    if (intensity >= i * 20) return i;
  }
  return 0;
}

interface ReleaseResultProps {
  intensity: number | null;
}

export function ReleaseResult({ intensity }: ReleaseResultProps) {
  if (intensity === null) return null;

  const levelIndex = getLevelIndex(intensity);
  const level = getIntensityLevel(intensity);
  const messages = MESSAGES_BY_LEVEL[levelIndex];
  const message = messages[Math.floor(Math.random() * messages.length)];

  return (
    <AnimatePresence>
      {intensity !== null && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="mx-4 rounded-2xl border p-5 text-center"
          style={{
            backgroundColor: level.bgColor,
            borderColor: `${level.color}44`,
          }}
        >
          <p className="text-3xl mb-2">{level.emoji}</p>
          <p className="font-bold mb-1" style={{ color: level.color }}>
            {level.label}
          </p>
          <p className="text-zinc-300 text-sm mb-4">{message}</p>

          <div className="flex items-center justify-center gap-1.5 text-xs text-zinc-500 border-t pt-3" style={{ borderColor: `${level.color}22` }}>
            <ShieldCheck size={12} className="text-zinc-600" />
            <span>Seu texto foi apagado. Nada fica salvo aqui.</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
