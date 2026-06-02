import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';

interface ReleaseButtonProps {
  onClick: () => void;
  disabled: boolean;
  isExploding: boolean;
}

export function ReleaseButton({ onClick, disabled, isExploding }: ReleaseButtonProps) {
  return (
    <div className="px-4">
      <motion.button
        onClick={onClick}
        disabled={disabled}
        whileHover={disabled ? {} : { scale: 1.02 }}
        whileTap={disabled ? {} : { scale: 0.96 }}
        animate={
          isExploding
            ? { scale: [1, 1.15, 0.92, 1.05, 1], rotate: [-2, 2, -1, 1, 0] }
            : {}
        }
        transition={{ duration: 0.4 }}
        className={[
          'w-full py-4 rounded-2xl font-black text-lg uppercase tracking-widest',
          'flex items-center justify-center gap-3 transition-all duration-200',
          disabled
            ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed border border-zinc-700'
            : 'bg-gradient-to-r from-red-700 to-orange-600 text-white cursor-pointer shadow-lg shadow-red-900/40 hover:shadow-red-800/60 hover:from-red-600 hover:to-orange-500',
        ].join(' ')}
      >
        <Flame size={22} className={disabled ? 'text-zinc-600' : 'text-orange-200'} />
        DESCARREGUE!
        <Flame size={22} className={disabled ? 'text-zinc-600' : 'text-orange-200'} />
      </motion.button>
    </div>
  );
}
