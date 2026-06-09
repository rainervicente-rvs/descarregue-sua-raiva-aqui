import { motion } from 'framer-motion';
import { PenLine, MousePointerClick, Wind, Lock } from 'lucide-react';
import type { RageMode } from '../types';

interface ModeSelectorProps {
  mode: RageMode;
  onChange: (mode: RageMode) => void;
}

const ACTIVE_MODES: {
  id: RageMode;
  label: string;
  description: string;
  Icon: typeof PenLine;
  color: string;
}[] = [
  {
    id: 'escrever',
    label: 'Escrever',
    description: 'Jogue tudo pra fora digitando',
    Icon: PenLine,
    color: '#B9A7E8',
  },
  {
    id: 'botao',
    label: 'Botão',
    description: 'Aperte até esgotar a tensão',
    Icon: MousePointerClick,
    color: '#F46F5E',
  },
  {
    id: 'respirar',
    label: 'Respirar',
    description: 'Guia de respiração reguladora',
    Icon: Wind,
    color: '#9CCBEA',
  },
];

export function ModeSelector({ mode, onChange }: ModeSelectorProps) {
  return (
    <div className="flex flex-col gap-2 px-4">
      <div className="flex gap-2 justify-center flex-wrap">
        {ACTIVE_MODES.map(({ id, label, description, Icon, color }) => {
          const active = mode === id;
          return (
            <motion.button
              key={id}
              onClick={() => onChange(id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="flex-1 min-w-24 flex flex-col items-center gap-1 rounded-xl border py-3.5 px-2 cursor-pointer transition-all duration-200"
              style={
                active
                  ? { background: `${color}18`, border: `1.5px solid ${color}`, color: '#172B4D' }
                  : { background: '#FFFFFF', border: '1.5px solid #EDE0CB', color: '#667085' }
              }
              aria-pressed={active}
            >
              <Icon size={20} style={{ color: active ? color : '#DDD0B8' }} />
              <span className="font-bold text-sm">{label}</span>
              <span className="text-xs text-center leading-tight opacity-65 hidden sm:block">
                {description}
              </span>
            </motion.button>
          );
        })}

        {/* Não Envie Isso — locked */}
        <div
          className="relative flex-1 min-w-24 flex flex-col items-center gap-1 rounded-xl py-3.5 px-2 select-none"
          style={{ background: '#FAFAF8', border: '1.5px solid #F0EDE8' }}
        >
          <Lock size={20} style={{ color: '#DDD0B8' }} />
          <span className="font-bold text-sm" style={{ color: '#C0B8AA' }}>Filtrar</span>
          <span className="text-xs text-center leading-tight hidden sm:block" style={{ color: '#C0B8AA' }}>
            Não Envie Isso
          </span>
          <span
            className="absolute top-1.5 right-1.5 text-[8px] font-bold px-1 py-0.5 rounded-full leading-tight"
            style={{ background: '#F0EDE8', color: '#98A2B3' }}
          >
            breve
          </span>
        </div>
      </div>
    </div>
  );
}
