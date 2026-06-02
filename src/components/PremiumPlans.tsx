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
    <section id="premium" className="py-16 px-4 border-t border-zinc-900">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-black text-white text-center mb-2">
          Premium
        </h2>
        <p className="text-zinc-600 text-sm text-center mb-10">
          Descarregue com mais estilo, mais modos e menos julgamento
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={[
                'rounded-2xl border p-5 flex flex-col',
                plan.highlight
                  ? 'bg-red-600/10 border-red-500/30'
                  : 'bg-zinc-900 border-zinc-800',
              ].join(' ')}
            >
              {plan.highlight && (
                <span className="text-xs font-bold text-red-400 uppercase tracking-wider mb-3">
                  Mais popular
                </span>
              )}

              <h3 className="font-black text-white text-xl mb-1">{plan.name}</h3>
              <div className="flex items-baseline gap-0.5 mb-5">
                <span className="text-2xl font-bold text-white">{plan.price}</span>
                <span className="text-zinc-600 text-sm">{plan.period}</span>
              </div>

              <ul className="flex flex-col gap-2.5 mb-6 flex-1">
                {plan.features.map(feature => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-zinc-300"
                  >
                    <Check size={13} className="text-green-400 mt-0.5 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <motion.button
                onClick={() => setShowModal(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className={[
                  'w-full py-2.5 rounded-xl font-bold text-sm cursor-pointer transition-all',
                  plan.highlight
                    ? 'bg-red-600 text-white hover:bg-red-500'
                    : 'bg-zinc-800 border border-zinc-700 text-zinc-300 hover:border-zinc-600 hover:text-white',
                ].join(' ')}
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
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 10 }}
              onClick={e => e.stopPropagation()}
              className="relative bg-zinc-900 border border-zinc-700 rounded-2xl p-6 max-w-sm w-full text-center"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-zinc-600 hover:text-white cursor-pointer transition-colors"
              >
                <X size={18} />
              </button>

              <div className="text-4xl mb-3">🔥</div>
              <h3 className="text-xl font-black text-white mb-2">Em breve</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                A primeira versão paga será liberada após os testes do MVP.
                Nos testes o produto vai tomar forma de verdade.
              </p>

              <button
                onClick={() => setShowModal(false)}
                className="mt-5 w-full py-2.5 bg-zinc-800 border border-zinc-700 text-zinc-300 rounded-xl text-sm font-semibold hover:border-zinc-600 cursor-pointer transition-colors"
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
