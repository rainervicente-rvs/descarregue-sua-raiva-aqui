import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { useRage } from '../hooks/useRage';
import { usePreferences } from '../hooks/usePreferences';
import { Header } from '../components/Header';
import { ModeSelector } from '../components/ModeSelector';
import { RageMeter } from '../components/RageMeter';
import { RageTextArea } from '../components/RageTextArea';
import { HitZone } from '../components/HitZone';
import { ReleaseButton } from '../components/ReleaseButton';
import { ExplosionOverlay } from '../components/ExplosionOverlay';
import { PostReleaseActions } from '../components/PostReleaseActions';
import { HeroSection } from '../components/HeroSection';
import { HowItWorks } from '../components/HowItWorks';
import { SkinSelector } from '../components/SkinSelector';
import { PremiumPlans } from '../components/PremiumPlans';
import { Footer } from '../components/Footer';

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
    resetToInput,
    sessionReleaseCount,
  } = useRage();

  const { currentSkin, updatePreferences } = usePreferences();

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans">
      <ExplosionOverlay
        isExploding={isExploding}
        intensity={lastReleasedIntensity ?? intensity}
      />

      {/* ── Landing hero ──────────────────────────────────────────────────── */}
      <HeroSection />

      {/* ── App section ───────────────────────────────────────────────────── */}
      <section id="app" className="border-t border-zinc-900 pb-4">
        <motion.div
          animate={isExploding ? { x: [-4, 4, -3, 3, -2, 2, 0] } : {}}
          transition={{ duration: 0.35 }}
          className="max-w-lg mx-auto"
        >
          <Header sessionCount={sessionReleaseCount} />

          <div className="flex flex-col gap-5 pb-8">
            <ModeSelector mode={mode} onChange={setMode} />

            <AnimatePresence mode="wait">
              {lastReleasedIntensity === null ? (
                <motion.div
                  key="active"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex flex-col gap-5"
                >
                  <RageMeter intensity={intensity} />

                  {mode === 'escrever' ? (
                    <RageTextArea
                      value={text}
                      onChange={setText}
                      intensity={intensity}
                    />
                  ) : (
                    <HitZone
                      clickCount={clickCount}
                      skin={currentSkin}
                      onHit={hit}
                    />
                  )}

                  {mode === 'escrever' && (
                    <ReleaseButton
                      onClick={triggerRelease}
                      disabled={!canRelease}
                      isExploding={isExploding}
                    />
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <PostReleaseActions
                    intensity={lastReleasedIntensity}
                    onRestart={resetToInput}
                    onWriteMode={() => setMode('escrever')}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Privacy promise */}
            <div className="flex items-center justify-center gap-1.5 text-xs text-zinc-800 px-4">
              <ShieldCheck size={11} />
              <span>Aperte. Grite. Escreva. Nada fica salvo.</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Landing sections ──────────────────────────────────────────────── */}
      <HowItWorks />

      <SkinSelector
        currentSkinId={currentSkin.id}
        onSelectSkin={id => updatePreferences({ skinId: id })}
      />

      <PremiumPlans />

      <Footer />
    </div>
  );
}
