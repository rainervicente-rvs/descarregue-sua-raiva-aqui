import { motion } from 'framer-motion';
import { PenLine, MousePointerClick, Lock } from 'lucide-react';
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
}[] = [
  {
    id: 'escrever',
    label: 'Escrever',
    description: 'Jogue tudo pra fora digitando',
    Icon: PenLine,
  },
  {
    id: 'botao',
    label: 'Modo Botão',
    description: 'Aperte até esgotar a tensão',
    Icon: MousePointerClick,
  },
];

export function ModeSelector({ mode, onChange }: ModeSelectorProps) {
  return (
    <div className="flex gap-3 justify-center px-4 flex-wrap">
      {ACTIVE_MODES.map(({ id, label, description, Icon }) => {
        const active = mode === id;
        return (
          <motion.button
            key={id}
            onClick={() => onChange(id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className={[
              'flex-1 min-w-32 max-w-48 flex flex-col items-center gap-1.5 rounded-xl border py-4 px-3 cursor-pointer transition-all duration-200',
            ].join(' ')}
            style={
              active
                ? { background: '#FFF3F2', border: '1.5px solid #F46F5E', color: '#172B4D' }
                : { background: '#FFFFFF', border: '1.5px solid #EDE0CB', color: '#667085' }
            }
          >
            <Icon
              size={22}
              style={{ color: active ? '#F46F5E' : '#DDD0B8' }}
            />
            <span className="font-bold text-sm">{label}</span>
            <span className="text-xs text-center leading-tight opacity-70">
              {description}
            </span>
          </motion.button>
        );
      })}

      {/* Não Envie Isso — coming soon */}
      <div
        className="relative flex-1 min-w-32 max-w-48 flex flex-col items-center gap-1.5 rounded-xl py-4 px-3 select-none"
        style={{ background: '#FAFAF8', border: '1.5px solid #EDE0CB' }}
      >
        <Lock size={22} style={{ color: '#DDD0B8' }} />
        <span className="font-bold text-sm" style={{ color: '#98A2B3' }}>Não Envie Isso</span>
        <span className="text-xs text-center leading-tight" style={{ color: '#C0B8AA' }}>
          Cole a mensagem impulsiva e transforme em algo firme e educado
        </span>
        <span
          className="absolute top-2 right-2 text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-tight"
          style={{ background: '#F0EDE8', color: '#98A2B3', border: '1px solid #EDE0CB' }}
        >
          em breve
        </span>
      </div>
    </div>
  );
}
