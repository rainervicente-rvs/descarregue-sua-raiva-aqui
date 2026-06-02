import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { useRage } from '../hooks/useRage';
import { Header } from '../components/Header';
import { ModeSelector } from '../components/ModeSelector';
import { RageMeter } from '../components/RageMeter';
import { RageTextArea } from '../components/RageTextArea';
import { HitZone } from '../components/HitZone';
import { ReleaseButton } from '../components/ReleaseButton';
import { ExplosionOverlay } from '../components/ExplosionOverlay';
import { ReleaseResult } from '../components/ReleaseResult';

export function HomePage() {
  const {
    mode,
    setMode,
    text,
    setText,
    clickCount,
    hit,
    intensity,
    isExploding,
    lastReleasedIntensity,
    canRelease,
    triggerRelease,
    sessionReleaseCount,
  } = useRage();

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans">
      <ExplosionOverlay isExploding={isExploding} intensity={lastReleasedIntensity ?? intensity} />

      <motion.div
        animate={isExploding ? { x: [-4, 4, -3, 3, -2, 2, 0] } : {}}
        transition={{ duration: 0.35 }}
        className="max-w-lg mx-auto"
      >
        <Header sessionCount={sessionReleaseCount} />

        <div className="flex flex-col gap-5 pb-12">
          <ModeSelector mode={mode} onChange={setMode} />

          <RageMeter intensity={intensity} />

          <AnimatePresence mode="wait">
            {mode === 'escrever' ? (
              <motion.div
                key="escrever"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <RageTextArea value={text} onChange={setText} intensity={intensity} />
              </motion.div>
            ) : (
              <motion.div
                key="botao"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <HitZone clickCount={clickCount} intensity={intensity} onHit={hit} />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {lastReleasedIntensity !== null && (
              <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <ReleaseResult intensity={lastReleasedIntensity} />
              </motion.div>
            )}
          </AnimatePresence>

          {mode === 'escrever' && (
            <ReleaseButton
              onClick={triggerRelease}
              disabled={!canRelease}
              isExploding={isExploding}
            />
          )}

          {/* Privacy footer */}
          <div className="flex items-center justify-center gap-1.5 text-xs text-zinc-700 px-4 mt-2">
            <ShieldCheck size={12} />
            <span>Aperte. Grite. Escreva. Nada fica salvo.</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
