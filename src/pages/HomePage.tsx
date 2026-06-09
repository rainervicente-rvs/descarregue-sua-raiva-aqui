import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
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
import { BreathingGuide } from '../components/BreathingGuide';
import { NaoEnvieIsso } from '../components/NaoEnvieIsso';
import { HeroSection } from '../components/HeroSection';
import { CaminhoDeAlivio } from '../components/CaminhoDeAlivio';
import { HowItWorks } from '../components/HowItWorks';
import { EstadosEmocionais } from '../components/EstadosEmocionais';
import { PrivacidadeSection } from '../components/PrivacidadeSection';
import { PorQueFunciona } from '../components/PorQueFunciona';
import { SkinSelector } from '../components/SkinSelector';
import { PremiumPlans } from '../components/PremiumPlans';
import { CtaFinal } from '../components/CtaFinal';
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

  const { currentSkin, preferences, updatePreferences, unlockAchievement } = usePreferences();

  // Achievement toast — show id for 3s then clear
  const [newAchievementId, setNewAchievementId] = useState<string | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function award(id: string) {
    if (preferences.unlockedAchievements.includes(id)) return;
    unlockAchievement(id);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setNewAchievementId(id);
    toastTimerRef.current = setTimeout(() => setNewAchievementId(null), 3000);
  }

  // Achievement triggers
  useEffect(() => {
    if (sessionReleaseCount >= 1) award('first_release');
    if (sessionReleaseCount >= 3) award('triple');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionReleaseCount]);

  useEffect(() => {
    if (lastReleasedIntensity !== null && mode === 'escrever') award('writer');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastReleasedIntensity]);

  useEffect(() => {
    if (clickCount >= 50) award('presser');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clickCount]);

  // Cleanup
  useEffect(() => () => { if (toastTimerRef.current) clearTimeout(toastTimerRef.current); }, []);

  return (
    <div className="min-h-screen font-sans" style={{ background: '#FFF8EC', color: '#172B4D' }}>
      <ExplosionOverlay
        isExploding={isExploding}
        intensity={lastReleasedIntensity ?? intensity}
      />

      <HeroSection />
      <CaminhoDeAlivio />

      {/* ── App section ─────────────────────────────────────────────────── */}
      <section id="app" className="pb-4" style={{ borderTop: '1px solid #EDE0CB', background: '#FFF8EC' }}>
        <motion.div
          animate={isExploding ? { x: [-3, 3, -2, 2, -1, 1, 0] } : {}}
          transition={{ duration: 0.35 }}
          className="max-w-lg mx-auto"
        >
          <Header
            sessionCount={sessionReleaseCount}
            unlockedAchievements={preferences.unlockedAchievements}
            newAchievementId={newAchievementId}
          />

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
                  {mode !== 'respirar' && mode !== 'filtrar' && (
                    <RageMeter intensity={intensity} />
                  )}

                  {mode === 'escrever' && (
                    <RageTextArea value={text} onChange={setText} intensity={intensity} />
                  )}
                  {mode === 'botao' && (
                    <HitZone clickCount={clickCount} skin={currentSkin} onHit={hit} />
                  )}
                  {mode === 'respirar' && (
                    <BreathingGuide
                      onExit={() => setMode('escrever')}
                      onComplete={() => award('breather')}
                    />
                  )}
                  {mode === 'filtrar' && (
                    <NaoEnvieIsso onAchievement={() => award('filtered')} />
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
                    mode={mode}
                    onRestart={resetToInput}
                    onWriteMode={() => { setMode('escrever'); resetToInput(); }}
                    onBreatheMode={() => { setMode('respirar'); resetToInput(); }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {mode !== 'respirar' && mode !== 'filtrar' && (
              <div
                className="flex items-center justify-center gap-1.5 text-xs px-4"
                style={{ color: '#C0B8AA' }}
              >
                <ShieldCheck size={11} style={{ color: '#A8C49A' }} />
                <span>Aperte. Respire. Escreva. Nada fica salvo.</span>
              </div>
            )}
          </div>
        </motion.div>
      </section>

      <HowItWorks />
      <EstadosEmocionais />
      <PrivacidadeSection />
      <PorQueFunciona />
      <SkinSelector
        currentSkinId={currentSkin.id}
        onSelectSkin={id => updatePreferences({ skinId: id })}
      />
      <PremiumPlans />
      <CtaFinal />
      <Footer />
    </div>
  );
}
