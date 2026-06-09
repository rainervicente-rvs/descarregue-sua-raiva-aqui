import { motion } from 'framer-motion';

const PATHS = [
  {
    emoji: '👊',
    title: 'Toque e solte',
    description: 'Aperte o botão até a tensão esvaziar. Cada toque conta. O corpo precisa de saída.',
    color: '#F46F5E',
    bg: '#FFF3F2',
    border: '#F9C4BE',
    cta: 'Começar descarga',
    href: '#app',
  },
  {
    emoji: '✍️',
    title: 'Escrever o que sinto',
    description: 'Coloque para fora o que está incomodando. Sem julgamento, sem filtro, sem rastro.',
    color: '#B9A7E8',
    bg: '#F5F2FD',
    border: '#D8CFF5',
    cta: 'Começar a escrever',
    href: '#app',
  },
  {
    emoji: '🌊',
    title: 'Respirar e acalmar',
    description: 'Guia de respiração para regular o corpo e a mente depois da descarga.',
    color: '#9CCBEA',
    bg: '#F0F8FD',
    border: '#CBE7F5',
    cta: 'Iniciar respiração',
    href: '#app',
  },
];

export function CaminhoDeAlivio() {
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
            Como você quer começar?
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-3" style={{ color: '#172B4D' }}>
            Caminhos de alívio
          </h2>
          <p className="text-base" style={{ color: '#667085' }}>
            Escolha o que faz sentido para o que você está sentindo agora.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {PATHS.map(({ emoji, title, description, color, bg, border, cta, href }, i) => (
            <motion.a
              key={title}
              href={href}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4, boxShadow: `0 12px 32px ${color}22` }}
              className="rounded-2xl p-6 flex flex-col gap-3 transition-all duration-300 no-underline"
              style={{ background: bg, border: `1.5px solid ${border}` }}
            >
              <span className="text-3xl" role="img" aria-label={title}>{emoji}</span>
              <h3 className="font-bold text-lg leading-tight" style={{ color: '#172B4D' }}>
                {title}
              </h3>
              <p className="text-sm leading-relaxed flex-1" style={{ color: '#667085' }}>
                {description}
              </p>
              <span
                className="mt-2 inline-flex items-center gap-1.5 text-sm font-bold transition-opacity hover:opacity-75"
                style={{ color }}
              >
                {cta} →
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
