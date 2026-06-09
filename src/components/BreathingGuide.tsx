import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface BreathPhase {
  label: string;
  instruction: string;
  duration: number;
  scale: number;
  color: string;
  bg: string;
}

const PHASES: BreathPhase[] = [
  { label: 'Inspire',  instruction: 'Puxe o ar devagar pelo nariz',   duration: 4, scale: 1.42, color: '#9CCBEA', bg: '#EEF7FD' },
  { label: 'Segure',   instruction: 'Mantenha. Observe o ar dentro',   duration: 4, scale: 1.42, color: '#B9A7E8', bg: '#F3F0FD' },
  { label: 'Expire',   instruction: 'Solte devagar pela boca',         duration: 6, scale: 0.72, color: '#A8C49A', bg: '#EFF7EC' },
  { label: 'Pause',    instruction: 'Pause. Sinta o espaço aberto',    duration: 2, scale: 0.72, color: '#9CCBEA', bg: '#EEF7FD' },
];

const TOTAL_CYCLES = 5;

interface BreathingGuideProps {
  onExit: () => void;
  onComplete?: () => void;
}

export function BreathingGuide({ onExit, onComplete }: BreathingGuideProps) {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(PHASES[0].duration);
  const [cycleCount, setCycleCount] = useState(0);
  const [done, setDone] = useState(false);
  const [paused, setPaused] = useState(false);

  // Use refs for mutable timer state — prevents closure drift in setInterval
  const phaseRef     = useRef(0);
  const secondsRef   = useRef(PHASES[0].duration);
  const cycleRef     = useRef(0);
  const pausedRef    = useRef(false);
  const completedRef = useRef(false);
  pausedRef.current  = paused;

  useEffect(() => {
    if (done) return;

    const interval = setInterval(() => {
      if (pausedRef.current) return;

      secondsRef.current -= 1;

      if (secondsRef.current <= 0) {
        const nextPhase = (phaseRef.current + 1) % PHASES.length;

        if (nextPhase === 0) {
          cycleRef.current += 1;
          setCycleCount(cycleRef.current);
          if (cycleRef.current >= TOTAL_CYCLES && !completedRef.current) {
            completedRef.current = true;
            clearInterval(interval);
            setTimeout(() => setDone(true), 400);
            return;
          }
        }

        phaseRef.current = nextPhase;
        secondsRef.current = PHASES[nextPhase].duration;
        setPhaseIndex(nextPhase);
        setSecondsLeft(PHASES[nextPhase].duration);
      } else {
        setSecondsLeft(secondsRef.current);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [done]); // Only re-runs when done changes — no timer drift

  const phase = PHASES[phaseIndex];
  const circumference = 2 * Math.PI * 54;
  const progress = 1 - (secondsLeft / phase.duration);

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-6 py-8 px-4 text-center"
      >
        <div className="text-5xl">🌊</div>
        <div>
          <h3 className="font-serif text-2xl font-bold mb-2" style={{ color: '#172B4D' }}>
            Você respirou.
          </h3>
          <p className="text-base leading-relaxed" style={{ color: '#667085' }}>
            {TOTAL_CYCLES} ciclos completos.<br />O corpo agradece.
          </p>
        </div>
        <motion.button
          onClick={() => { onComplete?.(); onExit(); }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="py-3.5 px-10 rounded-2xl font-bold text-white text-base"
          style={{ background: '#F46F5E', boxShadow: '0 4px 16px rgba(244,111,94,0.30)' }}
        >
          Continuar
        </motion.button>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-5 py-4 px-4">
      {/* Cycle counter */}
      <div className="flex gap-1.5" aria-label={`Ciclo ${cycleCount + 1} de ${TOTAL_CYCLES}`}>
        {Array.from({ length: TOTAL_CYCLES }).map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full transition-all duration-500"
            style={{ background: i < cycleCount ? '#A8C49A' : i === cycleCount ? phase.color : '#EDE0CB' }}
          />
        ))}
      </div>

      {/* Breathing circle */}
      <div className="relative flex items-center justify-center" style={{ width: 200, height: 200 }}>
        {/* Outer glow pulse */}
        <motion.div
          className="absolute rounded-full pointer-events-none"
          animate={{ scale: phase.scale, opacity: 0.12 }}
          transition={{ duration: phase.duration - 0.15, ease: 'easeInOut' }}
          style={{ width: 200, height: 200, background: phase.color }}
        />

        {/* Progress ring */}
        <svg className="absolute" width="200" height="200" viewBox="0 0 120 120" aria-hidden="true">
          <circle cx="60" cy="60" r="54" fill="none" stroke="#EDE0CB" strokeWidth="3" />
          <circle
            cx="60" cy="60" r="54"
            fill="none"
            stroke={phase.color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - progress)}
            transform="rotate(-90 60 60)"
            style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.5s ease' }}
          />
        </svg>

        {/* Center orb */}
        <motion.div
          className="rounded-full flex flex-col items-center justify-center gap-0.5 z-10"
          animate={{ scale: phase.scale }}
          transition={{ duration: phase.duration - 0.15, ease: 'easeInOut' }}
          style={{ width: 100, height: 100, background: phase.bg, border: `2px solid ${phase.color}55` }}
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={phase.label}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.25 }}
              className="font-bold text-sm text-center leading-tight"
              style={{ color: phase.color }}
            >
              {phase.label}
            </motion.p>
          </AnimatePresence>
          <p className="text-xl font-black tabular-nums" style={{ color: '#172B4D' }}>
            {secondsLeft}
          </p>
        </motion.div>
      </div>

      {/* Instruction */}
      <AnimatePresence mode="wait">
        <motion.p
          key={phase.label}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="text-sm text-center leading-relaxed max-w-52"
          style={{ color: '#667085' }}
        >
          {phase.instruction}
        </motion.p>
      </AnimatePresence>

      {/* Controls */}
      <div className="flex gap-2 mt-1">
        <motion.button
          onClick={() => setPaused(p => !p)}
          whileTap={{ scale: 0.95 }}
          className="py-2 px-5 rounded-xl text-sm font-semibold"
          style={{ background: '#FFFFFF', border: '1.5px solid #EDE0CB', color: '#667085' }}
        >
          {paused ? 'Continuar' : 'Pausar'}
        </motion.button>
        <motion.button
          onClick={onExit}
          whileTap={{ scale: 0.95 }}
          className="py-2 px-5 rounded-xl text-sm font-semibold"
          style={{ background: '#FFFFFF', border: '1.5px solid #EDE0CB', color: '#98A2B3' }}
        >
          Sair
        </motion.button>
      </div>

      <p className="text-xs text-center" style={{ color: '#C0B8AA' }}>
        Ciclo 4-4-6-2 · {TOTAL_CYCLES} ciclos · nariz e boca
      </p>
    </div>
  );
}
