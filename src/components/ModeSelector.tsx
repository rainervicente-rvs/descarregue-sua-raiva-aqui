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
    description: 'Aperte até esgotar a raiva',
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
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={[
              'flex-1 min-w-32 max-w-48 flex flex-col items-center gap-1.5 rounded-xl border py-4 px-3 cursor-pointer transition-colors duration-200',
              active
                ? 'bg-red-600/20 border-red-500 text-white'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200',
            ].join(' ')}
          >
            <Icon size={22} className={active ? 'text-red-400' : 'text-zinc-600'} />
            <span className="font-bold text-sm">{label}</span>
            <span className="text-xs text-center leading-tight opacity-60">
              {description}
            </span>
          </motion.button>
        );
      })}

      {/* Não Envie Isso — coming soon */}
      <div className="relative flex-1 min-w-32 max-w-48 flex flex-col items-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-900/40 py-4 px-3 select-none">
        <Lock size={22} className="text-zinc-700" />
        <span className="font-bold text-sm text-zinc-600">Não Envie Isso</span>
        <span className="text-xs text-center leading-tight text-zinc-700">
          Cole a mensagem impulsiva e transforme em algo firme e educado
        </span>
        <span className="absolute top-2 right-2 text-[9px] font-bold bg-zinc-800 text-zinc-600 px-1.5 py-0.5 rounded-full border border-zinc-700 leading-tight">
          em breve
        </span>
        <span className="text-[9px] text-zinc-700 font-medium mt-0.5">
          Salva empregos e grupos de WhatsApp
        </span>
      </div>
    </div>
  );
}
