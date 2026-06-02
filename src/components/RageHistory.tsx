import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Clock, PenLine, Hand } from 'lucide-react';
import { getIntensityLevel } from '../types';
import type { RageSession } from '../types';

function timeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60)   return `${seconds}s atrás`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}min atrás`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h atrás`;
  return `${Math.floor(seconds / 86400)}d atrás`;
}

interface RageHistoryProps {
  sessions: RageSession[];
  onClear: () => void;
}

export function RageHistory({ sessions, onClear }: RageHistoryProps) {
  if (sessions.length === 0) return null;

  return (
    <div className="px-4 pb-8">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">
          Histórico
        </h2>
        <motion.button
          onClick={onClear}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-1.5 text-xs text-zinc-600 hover:text-red-400 transition-colors cursor-pointer"
        >
          <Trash2 size={12} />
          Limpar
        </motion.button>
      </div>

      <div className="flex flex-col gap-2">
        <AnimatePresence initial={false}>
          {sessions.slice(0, 8).map((session, i) => {
            const level = getIntensityLevel(session.intensity);
            return (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: i * 0.04 }}
                className="flex items-start gap-3 bg-zinc-900 border border-zinc-800 rounded-xl p-3"
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm"
                  style={{ backgroundColor: level.bgColor }}
                >
                  {session.mode === 'escrever'
                    ? <PenLine size={14} style={{ color: level.color }} />
                    : <Hand size={14} style={{ color: level.color }} />
                  }
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm text-zinc-300 truncate leading-snug">
                    {session.text || '—'}
                  </p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs flex items-center gap-1 text-zinc-600">
                      <Clock size={10} />
                      {timeAgo(session.timestamp)}
                    </span>
                    <span
                      className="text-xs font-semibold"
                      style={{ color: level.color }}
                    >
                      {session.intensity}% · {level.label}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
