import { motion } from 'framer-motion';
import { PenLine, Hand } from 'lucide-react';
import type { RageMode } from '../types';

interface ModeSelectorProps {
  mode: RageMode;
  onChange: (mode: RageMode) => void;
}

const MODES: { id: RageMode; label: string; description: string; Icon: typeof PenLine }[] = [
  {
    id: 'escrever',
    label: 'Escrever',
    description: 'Jogue tudo pra fora digitando',
    Icon: PenLine,
  },
  {
    id: 'bater',
    label: 'Bater',
    description: 'Bata no botão até esgotar',
    Icon: Hand,
  },
];

export function ModeSelector({ mode, onChange }: ModeSelectorProps) {
  return (
    <div className="flex gap-3 justify-center px-4">
      {MODES.map(({ id, label, description, Icon }) => {
        const active = mode === id;
        return (
          <motion.button
            key={id}
            onClick={() => onChange(id)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={[
              'flex-1 max-w-48 flex flex-col items-center gap-1.5 rounded-xl border py-4 px-3 cursor-pointer transition-colors duration-200',
              active
                ? 'bg-red-600/20 border-red-500 text-white'
                : 'bg-zinc-900 border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200',
            ].join(' ')}
          >
            <Icon size={22} className={active ? 'text-red-400' : 'text-zinc-500'} />
            <span className="font-bold text-sm">{label}</span>
            <span className="text-xs text-center leading-tight opacity-70">{description}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
