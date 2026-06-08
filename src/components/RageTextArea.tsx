import { motion } from 'framer-motion';
import { getIntensityLevel } from '../types';

const MAX_CHARS = 1000;

const PLACEHOLDERS = [
  'O que está te incomodando? Pode falar...',
  'Solte aqui. Ninguém vai te julgar.',
  'Escreva o que está pesando. Aqui é seguro.',
  'O que você não pode dizer lá fora, diz aqui.',
  'Que foi que aconteceu? Conta tudo.',
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
            ? `0 0 ${intensity / 6}px ${intensity / 12}px ${level.color}28`
            : 'none',
        }}
        transition={{ duration: 0.4 }}
        className="relative rounded-xl overflow-hidden transition-colors"
        style={{ border: `1.5px solid ${intensity > 20 ? level.color + '66' : '#EDE0CB'}` }}
      >
        <textarea
          value={value}
          onChange={e => onChange(e.target.value.slice(0, MAX_CHARS))}
          placeholder={placeholder}
          rows={6}
          className="w-full text-base leading-relaxed p-4 resize-none outline-none font-sans"
          style={{
            background: '#FFFDF6',
            color: '#172B4D',
            caretColor: level.color,
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-300"
          style={{
            backgroundColor: intensity > 0 ? level.color : 'transparent',
            opacity: 0.7,
          }}
        />
      </motion.div>

      <div className="flex justify-between mt-2 px-1">
        <span className="text-xs" style={{ color: '#98A2B3' }}>
          {value.length > 0 &&
            `${value.split(/\s+/).filter(Boolean).length} palavra${
              value.split(/\s+/).filter(Boolean).length !== 1 ? 's' : ''
            }`}
        </span>
        <span className="text-xs" style={{ color: nearLimit ? '#F46F5E' : '#98A2B3' }}>
          {remaining} restantes
        </span>
      </div>
      <p className="text-center text-[11px] mt-2" style={{ color: '#DDD0B8' }}>
        Seu texto desaparece ao finalizar — nada fica salvo
      </p>
    </div>
  );
}
