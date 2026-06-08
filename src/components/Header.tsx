import { motion } from 'framer-motion';

interface HeaderProps {
  sessionCount: number;
}

export function Header({ sessionCount }: HeaderProps) {
  return (
    <header className="text-center py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mb-2"
      >
        <h2
          className="font-serif text-2xl sm:text-3xl font-bold tracking-tight"
          style={{ color: '#172B4D' }}
        >
          Descarregue Sua Raiva Aqui
        </h2>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.5 }}
        className="text-sm mb-4"
        style={{ color: '#667085' }}
      >
        Você pode soltar um pouco agora.
      </motion.p>

      {sessionCount > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold"
          style={{ background: '#F5F2FD', border: '1px solid #D8CFF5', color: '#9A87D4' }}
        >
          <span style={{ color: '#A8C49A' }}>✓</span>
          <span>
            <strong style={{ color: '#172B4D' }}>{sessionCount}</strong>{' '}
            {sessionCount === 1 ? 'desabafo' : 'desabafos'} nessa sessão
          </span>
        </motion.div>
      )}
    </header>
  );
}
