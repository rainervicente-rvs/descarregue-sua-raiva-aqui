import { motion } from 'framer-motion';
import { Shield, EyeOff, Trash2 } from 'lucide-react';

const ITEMS = [
  {
    Icon: EyeOff,
    title: 'Você não precisa se identificar.',
    description: 'Sem cadastro. Sem nome. Sem e-mail. Nenhum perfil é criado.',
    color: '#9CCBEA',
  },
  {
    Icon: Trash2,
    title: 'Nada do que você faz aqui é salvo.',
    description: 'O que você escreve ou aperta desaparece ao finalizar. Nada vai para servidor, nuvem ou banco de dados.',
    color: '#A8C49A',
  },
  {
    Icon: Shield,
    title: 'Este espaço existe para te aliviar.',
    description: 'Não para te expor. Não para vender seus dados. Não para te julgar.',
    color: '#B9A7E8',
  },
];

export function PrivacidadeSection() {
  return (
    <section className="py-16 px-4" style={{ background: '#FFF8EC' }}>
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold tracking-wider uppercase mb-2" style={{ color: '#A8C49A' }}>
            Privacidade emocional
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-3" style={{ color: '#172B4D' }}>
            O que acontece aqui, fica aqui.
          </h2>
          <p className="text-base" style={{ color: '#667085' }}>
            Garantias reais, não promessas vagas.
          </p>
        </motion.div>

        <div className="flex flex-col gap-4">
          {ITEMS.map(({ Icon, title, description, color }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="flex items-start gap-4 rounded-2xl p-5"
              style={{ background: '#FFFFFF', border: '1.5px solid #EDE0CB' }}
            >
              <div
                className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: `${color}22`, border: `1.5px solid ${color}44` }}
              >
                <Icon size={18} style={{ color }} />
              </div>
              <div>
                <p className="font-bold text-base mb-1" style={{ color: '#172B4D' }}>{title}</p>
                <p className="text-sm leading-relaxed" style={{ color: '#667085' }}>{description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-sm mt-8 leading-relaxed"
          style={{ color: '#98A2B3' }}
        >
          Apenas preferências visuais (tema, skin) podem ser salvas localmente no seu dispositivo,<br className="hidden sm:inline" /> com sua permissão. Nunca conteúdo emocional.
        </motion.p>
      </div>
    </section>
  );
}
