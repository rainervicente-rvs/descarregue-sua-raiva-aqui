import { motion, AnimatePresence } from 'framer-motion';
import { ACHIEVEMENT_DEFS } from '../types';

interface HeaderProps {
  sessionCount: number;
  unlockedAchievements: string[];
  newAchievementId: string | null;
}

export function Header({ sessionCount, unlockedAchievements, newAchievementId }: HeaderProps) {
  const unlockedDefs = ACHIEVEMENT_DEFS.filter(a => unlockedAchievements.includes(a.id));
  const newAchievement = newAchievementId ? ACHIEVEMENT_DEFS.find(a => a.id === newAchievementId) : null;

  return (
    <header className="text-center py-8 px-4 relative">
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mb-2"
      >
        <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: '#172B4D' }}>
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

      {/* Session count */}
      {sessionCount > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold mb-3"
          style={{ background: '#F5F2FD', border: '1px solid #D8CFF5', color: '#9A87D4' }}
        >
          <span style={{ color: '#A8C49A' }}>✓</span>
          <span>
            <strong style={{ color: '#172B4D' }}>{sessionCount}</strong>{' '}
            {sessionCount === 1 ? 'desabafo' : 'desabafos'} nessa sessão
          </span>
        </motion.div>
      )}

      {/* Achievement badges */}
      {unlockedDefs.length > 0 && (
        <div className="flex flex-wrap justify-center gap-1.5 mt-1">
          {unlockedDefs.map(a => (
            <motion.span
              key={a.id}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              title={a.label}
              className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold cursor-default"
              style={{ background: '#FFFDF6', border: '1px solid #EDE0CB', color: '#98A2B3' }}
            >
              <span>{a.emoji}</span>
              <span className="hidden sm:inline">{a.label}</span>
            </motion.span>
          ))}
        </div>
      )}

      {/* New achievement toast */}
      <AnimatePresence>
        {newAchievement && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.9 }}
            className="absolute left-1/2 -translate-x-1/2 -bottom-2 flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold shadow-lg whitespace-nowrap z-10"
            style={{ background: '#172B4D', color: '#FFFFFF' }}
          >
            <span>{newAchievement.emoji}</span>
            <span>{newAchievement.label}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
