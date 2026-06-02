import { motion } from 'framer-motion';
import { MousePointerClick, Zap, Wind } from 'lucide-react';

const STEPS = [
  {
    Icon: MousePointerClick,
    title: 'Aperte',
    description:
      'Use o botão, o ENTER, o ESPAÇO ou qualquer tecla para descarregar.',
  },
  {
    Icon: Zap,
    title: 'Exploda',
    description:
      'A interface reage, vibra e libera a raiva em forma de animação.',
  },
  {
    Icon: Wind,
    title: 'Respire',
    description: 'Ao final, tudo some. Nada fica salvo.',
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="py-16 px-4 border-t border-zinc-900">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-black text-white text-center mb-2">
          Como funciona
        </h2>
        <p className="text-zinc-600 text-sm text-center mb-10">
          Simples, rápido e catártico
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {STEPS.map(({ Icon, title, description }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 text-center"
            >
              <div className="w-10 h-10 rounded-full bg-red-600/10 border border-red-500/20 flex items-center justify-center mx-auto mb-3">
                <Icon size={18} className="text-red-400" />
              </div>
              <h3 className="font-bold text-white mb-2">{title}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
