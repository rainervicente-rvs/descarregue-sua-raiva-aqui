import { motion, AnimatePresence } from 'framer-motion';
import { useRage } from '../hooks/useRage';
import { Header } from '../components/Header';
import { ModeSelector } from '../components/ModeSelector';
import { RageMeter } from '../components/RageMeter';
import { RageTextArea } from '../components/RageTextArea';
import { HitZone } from '../components/HitZone';
import { ReleaseButton } from '../components/ReleaseButton';
import { ExplosionOverlay } from '../components/ExplosionOverlay';
import { ReleaseResult } from '../components/ReleaseResult';
import { RageHistory } from '../components/RageHistory';

export function HomePage() {
  const {
    sessions,
    todaySessions,
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
    clearHistory,
  } = useRage();

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans">
      <ExplosionOverlay isExploding={isExploding} intensity={lastReleasedIntensity ?? intensity} />

      <motion.div
        animate={isExploding ? { x: [-4, 4, -3, 3, -2, 2, 0] } : {}}
        transition={{ duration: 0.35 }}
        className="max-w-lg mx-auto"
      >
        <Header todayCount={todaySessions.length} />

        <div className="flex flex-col gap-5 pb-8">
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
                key="bater"
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
            {isExploding || lastReleasedIntensity !== null ? (
              <motion.div
                key={isExploding ? 'exploding' : 'result'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ReleaseResult intensity={lastReleasedIntensity} />
              </motion.div>
            ) : null}
          </AnimatePresence>

          {mode === 'escrever' && (
            <ReleaseButton
              onClick={triggerRelease}
              disabled={!canRelease}
              isExploding={isExploding}
            />
          )}

          {sessions.length > 0 && (
            <div className="mt-2">
              <RageHistory sessions={sessions} onClear={clearHistory} />
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
