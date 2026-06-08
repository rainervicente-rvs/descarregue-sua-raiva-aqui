import { motion } from 'framer-motion';
import { ShieldCheck, RotateCcw, PenLine, Palette, Share2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { FINALIZATIONS, INTENSITY_LEVELS, getIntensityLevel } from '../types';

function getLevelIndex(intensity: number): number {
  for (let i = INTENSITY_LEVELS.length - 1; i >= 0; i--) {
    if (intensity >= i * 20) return i;
  }
  return 0;
}

interface PostReleaseActionsProps {
  intensity: number;
  onRestart: () => void;
  onWriteMode: () => void;
}

export function PostReleaseActions({
  intensity,
  onRestart,
  onWriteMode,
}: PostReleaseActionsProps) {
  const [shareLabel, setShareLabel] = useState<'share' | 'copied'>('share');

  const level = getIntensityLevel(intensity);
  const levelIndex = getLevelIndex(intensity);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const finalization = useMemo(
    () => FINALIZATIONS[Math.floor(Math.random() * FINALIZATIONS.length)],
    [],
  );

  async function handleShare() {
    const url = window.location.origin;
    const text = 'Achei um site para descarregar a raiva sem deixar rastro.';

    if (navigator.share) {
      try {
        await navigator.share({ title: 'Descarregue Sua Raiva Aqui', text, url });
      } catch {
        // user cancelled
      }
    } else {
      await navigator.clipboard.writeText(url);
      setShareLabel('copied');
      setTimeout(() => setShareLabel('share'), 2000);
    }
  }

  function scrollToSkins() {
    document.getElementById('skins')?.scrollIntoView({ behavior: 'smooth' });
  }

  const actions = [
    { Icon: RotateCcw, label: 'Descarregar de novo', onClick: onRestart },
    { Icon: PenLine,   label: 'Escrever agora',       onClick: onWriteMode },
    { Icon: Palette,   label: 'Ver skins',             onClick: scrollToSkins },
    {
      Icon: Share2,
      label: shareLabel === 'copied' ? 'Link copiado!' : 'Compartilhar',
      onClick: handleShare,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 280, damping: 24 }}
      className="mx-4"
    >
      {/* Result card */}
      <div
        className="rounded-2xl p-5 text-center mb-4"
        style={{
          background: level.bgColor,
          border: `1.5px solid ${level.color}44`,
        }}
      >
        <p className="text-3xl mb-2">{level.emoji}</p>
        <p className="font-bold mb-1" style={{ color: level.color }}>
          {INTENSITY_LEVELS[levelIndex].label}
        </p>
        <p className="text-sm mb-4 leading-relaxed" style={{ color: '#667085' }}>
          {finalization}
        </p>

        <div
          className="flex items-center justify-center gap-1.5 text-xs pt-3"
          style={{ borderTop: `1px solid ${level.color}22`, color: '#98A2B3' }}
        >
          <ShieldCheck size={11} style={{ color: '#A8C49A' }} />
          <span>Seu texto foi apagado. Nada fica salvo aqui.</span>
        </div>
      </div>

      {/* Action grid */}
      <div className="grid grid-cols-2 gap-2">
        {actions.map(({ Icon, label, onClick }) => (
          <motion.button
            key={label}
            onClick={onClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-sm font-semibold cursor-pointer transition-all"
            style={{
              background: '#FFFFFF',
              border: '1.5px solid #EDE0CB',
              color: '#667085',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = '#DDD0B8';
              (e.currentTarget as HTMLButtonElement).style.color = '#172B4D';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = '#EDE0CB';
              (e.currentTarget as HTMLButtonElement).style.color = '#667085';
            }}
          >
            <Icon size={13} className="flex-shrink-0" />
            <span className="truncate">{label}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
