import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface BreathPhase {
  label: string;
  instruction: string;
  duration: number; // seconds
  scale: number;
  color: string;
  bg: string;
}

const PHASES: BreathPhase[] = [
  { label: 'Inspire',  instruction: 'Puxe o ar devagar pelo nariz',  duration: 4, scale: 1.45, color: '#9CCBEA', bg: '#EEF7FD' },
  { label: 'Segure',   instruction: 'Mantenha. Observe o ar dentro',  duration: 4, scale: 1.45, color: '#B9A7E8', bg: '#F3F0FD' },
  { label: 'Expire',   instruction: 'Solte devagar pela boca',        duration: 6, scale: 0.70, color: '#A8C49A', bg: '#EFF7EC' },
  { label: 'Pause',    instruction: 'Pause. Sinta o espaço aberto',   duration: 2, scale: 0.70, color: '#9CCBEA', bg: '#EEF7FD' },
];

const TOTAL_CYCLES = 5;

interface BreathingGuideProps {
  onExit: () => void;
}

export function BreathingGuide({ onExit }: BreathingGuideProps) {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(PHASES[0].duration);
  const [cycleCount, setCycleCount] = useState(0);
  const [done, setDone] = useState(false);
  const [paused, setPaused] = useState(false);

  const pausedRef = useRef(false);
  pausedRef.current = paused;

  const phase = PHASES[phaseIndex];

  useEffect(() => {
    if (done) return;
    const tick = setInterval(() => {
      if (pausedRef.current) return;
      setSecondsLeft(prev => {
        if (prev <= 1) {
          // Advance phase
          setPhaseIndex(pi => {
            const next = (pi + 1) % PHASES.length;
            if (next === 0) {
              setCycleCount(c => {
                const newC = c + 1;
                if (newC >= TOTAL_CYCLES) {
                  setTimeout(() => setDone(true), 400);
                }
                return newC;
              });
            }
            setSecondsLeft(PHASES[next].duration);
            return next;
          });
          return PHASES[(phaseIndex + 1) % PHASES.length].duration;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(tick);
  }, [phaseIndex, done]);

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
            {TOTAL_CYCLES} ciclos completos. O corpo agradece.<br />
            Esse espaço ainda está aqui se precisar.
          </p>
        </div>
        <motion.button
          onClick={onExit}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="py-3.5 px-10 rounded-2xl font-bold text-white text-base transition-all"
          style={{ background: '#F46F5E', boxShadow: '0 4px 16px rgba(244,111,94,0.30)' }}
        >
          Continuar
        </motion.button>
      </motion.div>
    );
  }

  const progress = 1 - (secondsLeft / phase.duration);
  const circumference = 2 * Math.PI * 54;

  return (
    <div className="flex flex-col items-center gap-5 py-6 px-4">
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

      {/* Animated breathing circle */}
      <div className="relative flex items-center justify-center" style={{ width: 200, height: 200 }}>
        {/* Outer glow */}
        <motion.div
          className="absolute rounded-full"
          animate={{ scale: phase.scale, opacity: 0.15 }}
          transition={{ duration: phase.duration, ease: phaseIndex % 2 === 0 ? 'easeInOut' : 'easeInOut' }}
          style={{ width: 200, height: 200, background: phase.color }}
        />

        {/* Progress ring */}
        <svg
          className="absolute"
          width="200"
          height="200"
          viewBox="0 0 120 120"
          aria-hidden="true"
        >
          {/* Track */}
          <circle cx="60" cy="60" r="54" fill="none" stroke="#EDE0CB" strokeWidth="3" />
          {/* Progress */}
          <motion.circle
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

        {/* Center breathing orb */}
        <motion.div
          className="rounded-full flex flex-col items-center justify-center gap-0.5"
          animate={{ scale: phase.scale }}
          transition={{ duration: phase.duration - 0.1, ease: 'easeInOut' }}
          style={{
            width: 100,
            height: 100,
            background: phase.bg,
            border: `2px solid ${phase.color}55`,
          }}
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={phase.label}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.3 }}
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
          transition={{ duration: 0.4 }}
          className="text-sm text-center leading-relaxed max-w-48"
          style={{ color: '#667085' }}
        >
          {phase.instruction}
        </motion.p>
      </AnimatePresence>

      {/* Controls */}
      <div className="flex gap-3 mt-1">
        <motion.button
          onClick={() => setPaused(p => !p)}
          whileTap={{ scale: 0.95 }}
          className="py-2 px-5 rounded-xl text-sm font-semibold transition-all"
          style={{ background: '#FFFFFF', border: '1.5px solid #EDE0CB', color: '#667085' }}
        >
          {paused ? 'Continuar' : 'Pausar'}
        </motion.button>
        <motion.button
          onClick={onExit}
          whileTap={{ scale: 0.95 }}
          className="py-2 px-5 rounded-xl text-sm font-semibold transition-all"
          style={{ background: '#FFFFFF', border: '1.5px solid #EDE0CB', color: '#98A2B3' }}
        >
          Sair
        </motion.button>
      </div>

      <p className="text-xs text-center" style={{ color: '#C0B8AA' }}>
        Respiração 4-6-2 · {TOTAL_CYCLES} ciclos · Respira pelo nariz, solta pela boca
      </p>
    </div>
  );
}
