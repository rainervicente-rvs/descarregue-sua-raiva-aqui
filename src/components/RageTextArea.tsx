import { motion } from 'framer-motion';
import { getIntensityLevel } from '../types';

const MAX_CHARS = 1000;

const PLACEHOLDERS = [
  'O que está te irritando? Pode falar...',
  'Solte tudo aqui. Ninguém vai te julgar.',
  'Manda ver. Xinga, grita, chora. Aqui é seguro.',
  'Digite toda a sua raiva. Vai, pode falar.',
  'Que foi que aconteceu? Conta tudinho.',
];

const placeholder = PLACEHOLDERS[Math.floor(Math.random() * PLACEHOLDERS.length)];

interface RageTextAreaProps {
  value: string;
  onChange: (v: string) => void;
  intensity: number;
}

export function RageTextArea({ value, onChange, intensity }: RageTextAreaProps) {
  const level = getIntensityLevel(intensity);
  const remaining = MAX_CHARS - value.length;
  const nearLimit = remaining < 100;

  return (
    <div className="px-4">
      <motion.div
        animate={{
          boxShadow: intensity > 0
            ? `0 0 ${intensity / 5}px ${intensity / 10}px ${level.color}33`
            : 'none',
        }}
        transition={{ duration: 0.3 }}
        className="relative rounded-xl overflow-hidden border border-zinc-700 focus-within:border-zinc-500 transition-colors"
      >
        <textarea
          value={value}
          onChange={e => onChange(e.target.value.slice(0, MAX_CHARS))}
          placeholder={placeholder}
          rows={6}
          className="w-full bg-zinc-900 text-white placeholder-zinc-600 text-base leading-relaxed p-4 resize-none outline-none font-sans"
          style={{
            caretColor: level.color,
          }}
        />

        <div
          className="absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-300"
          style={{ backgroundColor: intensity > 0 ? level.color : 'transparent', opacity: 0.6 }}
        />
      </motion.div>

      <div className="flex justify-between mt-2 px-1">
        <span className="text-xs text-zinc-600">
          {value.length > 0 && `${value.split(/\s+/).filter(Boolean).length} palavra${value.split(/\s+/).filter(Boolean).length !== 1 ? 's' : ''}`}
        </span>
        <span className={`text-xs ${nearLimit ? 'text-orange-400' : 'text-zinc-600'}`}>
          {remaining} restantes
        </span>
      </div>
      <p className="text-center text-[11px] text-zinc-700 mt-2">
        Seu texto desaparece ao finalizar — nada fica salvo
      </p>
    </div>
  );
}
