import { motion } from 'framer-motion';

const REASONS = [
  {
    num: '1',
    title: 'Expressar tem mais poder do que segurar.',
    description:
      'Dar saída a emoções acumuladas pode ajudar a reduzir a sensação de pressão interna. A expressão cria distância entre você e o que sente.',
    color: '#F46F5E',
    bg: '#FFF3F2',
  },
  {
    num: '2',
    title: 'Pausa e respiração ajudam o corpo a sair do alerta.',
    description:
      'Quando você para, mesmo por um minuto, o sistema nervoso começa a regular. Não é mágica — é fisiologia.',
    color: '#9CCBEA',
    bg: '#F0F8FD',
  },
  {
    num: '3',
    title: 'Nomear o que sente ajuda a recuperar clareza.',
    description:
      'Identificar a emoção reduz sua intensidade. Escrever ou nomear o que está acontecendo muda a relação com a experiência.',
    color: '#B9A7E8',
    bg: '#F5F2FD',
  },
];

export function PorQueFunciona() {
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
            Por que funciona
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-3" style={{ color: '#172B4D' }}>
            Tem lógica por trás.
          </h2>
          <p className="text-base" style={{ color: '#667085' }}>
            Sem promessa de cura. Com base em comportamento e fisiologia.
          </p>
        </motion.div>

        <div className="flex flex-col gap-4">
          {REASONS.map(({ num, title, description, color, bg }, i) => (
            <motion.div
              key={num}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="rounded-2xl p-6"
              style={{ background: bg, border: `1.5px solid ${color}33` }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black text-white flex-shrink-0"
                  style={{ background: color }}
                >
                  {num}
                </span>
                <h3 className="font-bold text-base leading-tight" style={{ color: '#172B4D' }}>
                  {title}
                </h3>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: '#667085' }}>
                {description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-xs mt-8"
          style={{ color: '#98A2B3' }}
        >
          Este site não é terapia e não substitui apoio profissional de saúde mental.
        </motion.p>
      </div>
    </section>
  );
}
