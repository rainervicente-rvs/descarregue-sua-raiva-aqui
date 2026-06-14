import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    q: 'Você lê o que eu escrevo aqui?',
    a: 'Não. Zero. Nada sai do seu dispositivo. Seu texto existe apenas na memória do navegador durante a sessão e desaparece quando você finaliza ou fecha a aba. Sem servidor que armazene conteúdo, sem analytics que registrem o que você escreveu.',
  },
  {
    q: 'Isso funciona de verdade ou é só placebo?',
    a: 'As duas coisas — e isso não é um problema. Externalizar emoção (escrever, apertar, respirar) é uma técnica reconhecida de regulação emocional. Dar saída física à tensão ajuda o sistema nervoso a "descarregar" a ativação fisiológica. O efeito pode ser modesto, mas é real. Para crises sérias, busque suporte profissional.',
  },
  {
    q: 'Preciso criar conta ou instalar alguma coisa?',
    a: 'Nunca. Funciona direto no navegador, sem login, sem cadastro, sem e-mail. Suas preferências visuais ficam salvas localmente no seu dispositivo — só isso. Pode instalar na tela inicial do celular como um app, mas é opcional.',
  },
  {
    q: 'Funciona sem internet?',
    a: 'Sim. Após a primeira visita, o app funciona completamente offline. Todo o processamento — inclusive o modo Filtrar — acontece no seu dispositivo, sem nenhuma chamada de rede.',
  },
  {
    q: 'Qual é o CVV?',
    a: 'Se você está em crise, ligue 188 (CVV — Centro de Valorização da Vida). Disponível 24h, gratuito, sigiloso. Este app é um suplemento de regulação emocional, não substitui suporte profissional em saúde mental.',
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-16 px-4" style={{ background: '#FFFDF6' }}>
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="text-sm font-semibold tracking-wider uppercase mb-2" style={{ color: '#B9A7E8' }}>
            Dúvidas comuns
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold" style={{ color: '#172B4D' }}>
            Perguntas frequentes
          </h2>
        </motion.div>

        <div className="flex flex-col gap-2">
          {FAQS.map(({ q, a }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="rounded-xl overflow-hidden"
              style={{ border: '1.5px solid #EDE0CB' }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left cursor-pointer"
                style={{ background: open === i ? '#FFF8EC' : '#FFFFFF' }}
              >
                <span className="font-semibold text-sm leading-snug" style={{ color: '#172B4D' }}>
                  {q}
                </span>
                <motion.span
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown size={16} style={{ color: '#B9A7E8' }} />
                </motion.span>
              </button>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-4 text-sm leading-relaxed" style={{ color: '#667085' }}>
                      {a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
