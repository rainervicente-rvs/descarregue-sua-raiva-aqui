import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { Copy, Check, AlertTriangle } from 'lucide-react';
import { transformMessage } from '../utils/transformMessage';

const MAX_CHARS = 800;

const PLACEHOLDERS = [
  'Cole aqui a mensagem que você está segurando...',
  'O que você quer mandar mas não deveria?',
  'Cole o texto que está na ponta da língua...',
];
const placeholder = PLACEHOLDERS[Math.floor(Math.random() * PLACEHOLDERS.length)];

interface NaoEnvieIssoProps {
  onAchievement?: () => void;
}

export function NaoEnvieIsso({ onAchievement }: NaoEnvieIssoProps) {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<ReturnType<typeof transformMessage> | null>(null);
  const [copied, setCopied] = useState(false);
  const hasTriggeredAchievement = useRef(false);

  function handleTransform() {
    if (!input.trim()) return;
    setResult(transformMessage(input));
    if (!hasTriggeredAchievement.current) {
      hasTriggeredAchievement.current = true;
      onAchievement?.();
    }
  }

  function handleCopy() {
    if (!result?.transformed) return;
    navigator.clipboard.writeText(result.transformed);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleReset() {
    setInput('');
    setResult(null);
    hasTriggeredAchievement.current = false;
  }

  return (
    <div className="px-4 flex flex-col gap-4">
      {!result ? (
        <>
          {/* Input */}
          <div>
            <label className="block text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: '#98A2B3' }}>
              A mensagem original
            </label>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value.slice(0, MAX_CHARS))}
              placeholder={placeholder}
              rows={6}
              className="w-full text-base leading-relaxed p-4 resize-none outline-none font-sans rounded-xl"
              style={{
                background: '#FFFDF6',
                border: '1.5px solid #EDE0CB',
                color: '#172B4D',
                caretColor: '#B9A7E8',
              }}
            />
            <div className="flex justify-between mt-1 px-1">
              <span className="text-xs" style={{ color: '#98A2B3' }}>
                {input.length > 0 ? `${input.split(/\s+/).filter(Boolean).length} palavras` : ''}
              </span>
              <span className="text-xs" style={{ color: input.length > 700 ? '#F46F5E' : '#98A2B3' }}>
                {MAX_CHARS - input.length} restantes
              </span>
            </div>
          </div>

          {/* Disclaimer */}
          <div
            className="flex items-start gap-2 rounded-xl p-3 text-xs leading-relaxed"
            style={{ background: '#FFFAF0', border: '1px solid #F0DDB0', color: '#A07840' }}
          >
            <AlertTriangle size={13} className="flex-shrink-0 mt-0.5" />
            <span>
              A transformação é feita no seu próprio dispositivo. Nada é enviado para fora. Você revisa antes de usar.
            </span>
          </div>

          <motion.button
            onClick={handleTransform}
            disabled={!input.trim()}
            whileHover={input.trim() ? { scale: 1.02 } : {}}
            whileTap={input.trim() ? { scale: 0.97 } : {}}
            className="w-full py-4 rounded-2xl font-bold text-base transition-all cursor-pointer"
            style={
              input.trim()
                ? { background: '#172B4D', color: '#FFFFFF', boxShadow: '0 4px 16px rgba(23,43,77,0.20)' }
                : { background: '#F0EDE8', color: '#DDD0B8', cursor: 'not-allowed' }
            }
          >
            Filtrar e reformular
          </motion.button>
        </>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-4"
          >
            {/* Changes made */}
            {result.changes.length > 0 && (
              <div
                className="rounded-xl p-3 text-xs"
                style={{ background: '#F2F8F0', border: '1px solid #D0E8C8' }}
              >
                <p className="font-bold mb-1.5" style={{ color: '#5A8A4A' }}>O que foi ajustado:</p>
                <ul className="flex flex-col gap-1">
                  {result.changes.map(c => (
                    <li key={c} className="flex items-center gap-1.5" style={{ color: '#5A8A4A' }}>
                      <span>→</span> {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Transformed output */}
            <div>
              <label className="block text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: '#98A2B3' }}>
                Sugestão reformulada — edite livremente
              </label>
              <textarea
                value={result.transformed}
                onChange={e => setResult({ ...result, transformed: e.target.value })}
                rows={7}
                className="w-full text-base leading-relaxed p-4 resize-none outline-none font-sans rounded-xl"
                style={{
                  background: '#F5F2FD',
                  border: '1.5px solid #D8CFF5',
                  color: '#172B4D',
                  caretColor: '#B9A7E8',
                }}
              />
              <p className="text-[11px] mt-1.5 px-1" style={{ color: '#C0B8AA' }}>
                Esta é uma sugestão. Você decide o que enviar.
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <motion.button
                onClick={handleCopy}
                whileTap={{ scale: 0.97 }}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all"
                style={{ background: '#172B4D', color: '#FFFFFF' }}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Copiado!' : 'Copiar'}
              </motion.button>
              <motion.button
                onClick={handleReset}
                whileTap={{ scale: 0.97 }}
                className="flex-1 py-3 rounded-xl font-semibold text-sm transition-all"
                style={{ background: '#FFFFFF', border: '1.5px solid #EDE0CB', color: '#667085' }}
              >
                Recomeçar
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
