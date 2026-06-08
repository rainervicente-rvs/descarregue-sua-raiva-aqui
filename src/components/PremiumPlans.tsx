import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { useState } from 'react';

const PLANS = [
  {
    id: 'alivio',
    name: 'Alívio',
    price: 'R$ 9,90',
    period: '/mês',
    highlight: false,
    features: [
      'Sem anúncios',
      'Todas as skins grátis',
      'Temas visuais extras',
      'Sons de descarga',
    ],
  },
  {
    id: 'controle',
    name: 'Controle',
    price: 'R$ 19,90',
    period: '/mês',
    highlight: true,
    features: [
      'Tudo do Alívio',
      'Modo Não Envie Isso',
      'Versões profissionais',
      'Versões firmes',
      'Atalhos para WhatsApp',
    ],
  },
  {
    id: 'vitalicio',
    name: 'Vitalício',
    price: 'R$ 49,90',
    period: ' lançamento',
    highlight: false,
    features: [
      'Acesso vitalício',
      'Skins de lançamento',
      'Temas especiais',
      'Prioridade em novos recursos',
    ],
  },
];

export function PremiumPlans() {
  const [showModal, setShowModal] = useState(false);

  return (
    <section id="premium" className="py-16 px-4" style={{ background: '#FFFFFF' }}>
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold tracking-wider uppercase mb-2" style={{ color: '#F46F5E' }}>
            Planos
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-3" style={{ color: '#172B4D' }}>
            Descarregue com mais profundidade
          </h2>
          <p className="text-base" style={{ color: '#667085' }}>
            Mais modos, mais skins, mais controle emocional.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl p-5 flex flex-col"
              style={
                plan.highlight
                  ? { background: '#FFF3F2', border: '1.5px solid #F9C4BE', boxShadow: '0 4px 24px rgba(244,111,94,0.12)' }
                  : { background: '#FAFAF8', border: '1.5px solid #EDE0CB' }
              }
            >
              {plan.highlight && (
                <span
                  className="text-xs font-bold uppercase tracking-wider mb-3"
                  style={{ color: '#F46F5E' }}
                >
                  Mais popular
                </span>
              )}

              <h3 className="font-serif font-bold text-xl mb-1" style={{ color: '#172B4D' }}>
                {plan.name}
              </h3>
              <div className="flex items-baseline gap-0.5 mb-5">
                <span className="text-2xl font-black" style={{ color: '#172B4D' }}>{plan.price}</span>
                <span className="text-sm" style={{ color: '#98A2B3' }}>{plan.period}</span>
              </div>

              <ul className="flex flex-col gap-2.5 mb-6 flex-1">
                {plan.features.map(feature => (
                  <li key={feature} className="flex items-start gap-2 text-sm" style={{ color: '#667085' }}>
                    <Check size={13} className="flex-shrink-0 mt-0.5" style={{ color: '#A8C49A' }} />
                    {feature}
                  </li>
                ))}
              </ul>

              <motion.button
                onClick={() => setShowModal(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-2.5 rounded-xl font-bold text-sm cursor-pointer transition-all"
                style={
                  plan.highlight
                    ? { background: '#F46F5E', color: '#FFFFFF', border: 'none' }
                    : { background: '#FFFFFF', border: '1.5px solid #EDE0CB', color: '#667085' }
                }
              >
                Quero ser avisado
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Coming soon modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            style={{ background: 'rgba(23,43,77,0.5)', backdropFilter: 'blur(4px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 10 }}
              onClick={e => e.stopPropagation()}
              className="relative rounded-2xl p-6 max-w-sm w-full text-center"
              style={{ background: '#FFFFFF', border: '1.5px solid #EDE0CB' }}
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 cursor-pointer transition-opacity hover:opacity-60"
                style={{ color: '#98A2B3' }}
                aria-label="Fechar"
              >
                <X size={18} />
              </button>

              <div className="text-4xl mb-3">🌊</div>
              <h3 className="font-serif text-xl font-bold mb-2" style={{ color: '#172B4D' }}>
                Em breve
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#667085' }}>
                A primeira versão paga será liberada após os testes do MVP.
                Nos testes o produto vai tomar forma de verdade.
              </p>

              <button
                onClick={() => setShowModal(false)}
                className="mt-5 w-full py-2.5 rounded-xl text-sm font-semibold cursor-pointer transition-all hover:opacity-80"
                style={{ background: '#FFF8EC', border: '1.5px solid #EDE0CB', color: '#667085' }}
              >
                Entendido
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
