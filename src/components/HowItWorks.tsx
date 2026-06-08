import { motion } from 'framer-motion';

const STEPS = [
  {
    num: '01',
    title: 'Reconheça',
    description: 'Você está sobrecarregado. Irritado. No limite. Tudo bem — isso é humano.',
    color: '#9CCBEA',
    bg: '#F0F8FD',
  },
  {
    num: '02',
    title: 'Expresse',
    description: 'Escreva o que está sentindo ou aperte o botão. Sem filtro, sem audiência.',
    color: '#B9A7E8',
    bg: '#F5F2FD',
  },
  {
    num: '03',
    title: 'Descarregue',
    description: 'Solte a tensão aqui dentro. O app recebe tudo — nada vaza para fora.',
    color: '#F46F5E',
    bg: '#FFF3F2',
  },
  {
    num: '04',
    title: 'Respire',
    description: 'Depois da descarga, uma pausa. Observe como o peso foi um pouco embora.',
    color: '#A8C49A',
    bg: '#F2F8F0',
  },
  {
    num: '05',
    title: 'Reequilibre',
    description: 'Você não precisa resolver tudo agora. Volte mais calmo para o que importa.',
    color: '#172B4D',
    bg: '#F0F3F8',
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="py-16 px-4" style={{ background: '#FFF8EC' }}>
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold tracking-wider uppercase mb-2" style={{ color: '#F46F5E' }}>
            Do nó ao fluxo
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-3" style={{ color: '#172B4D' }}>
            Como funciona
          </h2>
          <p className="text-base" style={{ color: '#667085' }}>
            Cinco passos simples de descarga emocional segura.
          </p>
        </motion.div>

        <div className="flex flex-col gap-3">
          {STEPS.map(({ num, title, description, color, bg }, i) => (
            <motion.div
              key={num}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-4 rounded-2xl p-5"
              style={{ background: bg, border: `1px solid ${color}33` }}
            >
              <div
                className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
                style={{ background: color, color: '#FFFFFF' }}
              >
                {num}
              </div>
              <div>
                <h3 className="font-bold text-base mb-1" style={{ color: '#172B4D' }}>
                  {title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#667085' }}>
                  {description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
