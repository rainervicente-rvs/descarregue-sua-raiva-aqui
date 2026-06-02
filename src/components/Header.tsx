import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';

interface HeaderProps {
  todayCount: number;
}

export function Header({ todayCount }: HeaderProps) {
  return (
    <header className="text-center py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="flex items-center justify-center gap-3 mb-3"
      >
        <motion.div
          animate={{ rotate: [-5, 5, -5], scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Flame size={36} className="text-orange-500" />
        </motion.div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase">
          Descarregue Sua Raiva Aqui
        </h1>
        <motion.div
          animate={{ rotate: [5, -5, 5], scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.75 }}
        >
          <Flame size={36} className="text-orange-500" />
        </motion.div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-zinc-400 text-sm sm:text-base mb-4"
      >
        O lugar certo para soltar tudo que está te irritando
      </motion.p>

      {todayCount > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 bg-zinc-800 border border-zinc-700 rounded-full px-4 py-1.5 text-sm text-zinc-300"
        >
          <Flame size={14} className="text-orange-400" />
          <span>
            <strong className="text-white">{todayCount}</strong>{' '}
            {todayCount === 1 ? 'desabafo hoje' : 'desabafos hoje'}
          </span>
        </motion.div>
      )}
    </header>
  );
}
