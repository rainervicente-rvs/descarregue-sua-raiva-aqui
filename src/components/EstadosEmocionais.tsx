import { motion } from 'framer-motion';

const STATES = [
  {
    emoji: '😮‍💨',
    label: 'Tensão leve',
    copy: 'Algo incomoda. Um pensamento que não para.',
    color: '#9CCBEA',
    bg: '#F0F8FD',
    lines: [12, 18, 10],
  },
  {
    emoji: '😤',
    label: 'Irritação',
    copy: 'A paciência já foi. Tudo parece demais.',
    color: '#B9A7E8',
    bg: '#F5F2FD',
    lines: [16, 24, 14],
  },
  {
    emoji: '😠',
    label: 'Frustração',
    copy: 'Não está saindo como deveria. Nada funciona.',
    color: '#F0A030',
    bg: '#FFF8EC',
    lines: [20, 28, 16],
  },
  {
    emoji: '🤯',
    label: 'Sobrecarga',
    copy: 'Tudo ao mesmo tempo. A cabeça não aguenta mais.',
    color: '#F46F5E',
    bg: '#FFF3F2',
    lines: [24, 32, 20],
  },
  {
    emoji: '💨',
    label: 'Liberação',
    copy: 'Saiu. O peito aliviou. Um pouco mais de espaço.',
    color: '#A8C49A',
    bg: '#F2F8F0',
    lines: [28, 20, 24],
  },
  {
    emoji: '😮‍💨',
    label: 'Alívio',
    copy: 'Você voltou para si. Ainda cansa. Mas o controle é seu.',
    color: '#9CCBEA',
    bg: '#F0F8FD',
    lines: [16, 28, 12],
  },
];

export function EstadosEmocionais() {
  return (
    <section className="py-16 px-4" style={{ background: '#FFFFFF' }}>
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold tracking-wider uppercase mb-2" style={{ color: '#F46F5E' }}>
            Você se reconhece em algum deles?
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-3" style={{ color: '#172B4D' }}>
            Estados emocionais
          </h2>
          <p className="text-base" style={{ color: '#667085' }}>
            Da tensão ao alívio — todos são válidos aqui.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {STATES.map(({ emoji, label, copy, color, bg, lines }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl p-4 flex flex-col gap-3"
              style={{ background: bg, border: `1px solid ${color}33` }}
            >
              {/* Abstract visual placeholder */}
              <div className="flex items-end justify-center gap-1 h-10" aria-hidden="true">
                {lines.map((h, j) => (
                  <motion.div
                    key={j}
                    className="w-2 rounded-full"
                    style={{ height: h, background: color, opacity: 0.7 }}
                    animate={{ scaleY: [1, 1.15, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: j * 0.3 + i * 0.2 }}
                  />
                ))}
                <span className="text-2xl ml-2">{emoji}</span>
              </div>

              <div>
                <p className="font-bold text-sm mb-1" style={{ color: '#172B4D' }}>{label}</p>
                <p className="text-xs leading-relaxed" style={{ color: '#667085' }}>{copy}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
