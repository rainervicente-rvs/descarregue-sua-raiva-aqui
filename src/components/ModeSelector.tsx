import { motion } from 'framer-motion';
import { PenLine, MousePointerClick, Wind, Filter } from 'lucide-react';
import type { RageMode } from '../types';

interface ModeSelectorProps {
  mode: RageMode;
  onChange: (mode: RageMode) => void;
}

const MODES: {
  id: RageMode;
  label: string;
  shortDesc: string;
  Icon: typeof PenLine;
  color: string;
}[] = [
  { id: 'escrever', label: 'Escrever',  shortDesc: 'Jogue tudo pra fora',       Icon: PenLine,           color: '#B9A7E8' },
  { id: 'botao',    label: 'Botão',     shortDesc: 'Aperte até esgotar',        Icon: MousePointerClick, color: '#F46F5E' },
  { id: 'respirar', label: 'Respirar',  shortDesc: 'Guia de respiração',        Icon: Wind,              color: '#9CCBEA' },
  { id: 'filtrar',  label: 'Filtrar',   shortDesc: 'Não Envie Isso',            Icon: Filter,            color: '#172B4D' },
];

export function ModeSelector({ mode, onChange }: ModeSelectorProps) {
  return (
    <div className="px-4">
      <div className="grid grid-cols-4 gap-1.5">
        {MODES.map(({ id, label, shortDesc, Icon, color }) => {
          const active = mode === id;
          return (
            <motion.button
              key={id}
              onClick={() => onChange(id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="flex flex-col items-center gap-1 rounded-xl border py-3 px-1.5 cursor-pointer transition-all duration-200"
              style={
                active
                  ? { background: `${color}18`, border: `1.5px solid ${color}`, color: '#172B4D' }
                  : { background: '#FFFFFF', border: '1.5px solid #EDE0CB', color: '#667085' }
              }
              aria-pressed={active}
              aria-label={`Modo ${label}: ${shortDesc}`}
            >
              <Icon size={18} style={{ color: active ? color : '#DDD0B8' }} />
              <span className="font-bold text-xs leading-tight">{label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
