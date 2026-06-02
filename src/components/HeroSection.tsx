import { motion } from 'framer-motion';
import { Shield, UserX, Zap, ArrowDown } from 'lucide-react';

const BADGES = [
  { Icon: Shield,  label: 'Privado por padrão' },
  { Icon: UserX,   label: 'Sem cadastro'        },
  { Icon: Zap,     label: 'Nada fica salvo'     },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-16 pb-12 px-4 text-center">
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(239,68,68,0.12) 0%, transparent 70%)' }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative max-w-lg mx-auto"
      >
        <h1 className="text-5xl sm:text-6xl font-black text-white leading-tight mb-5 tracking-tight">
          Descarregue<br />
          <span className="text-red-500">sua raiva</span><br />
          aqui.
        </h1>

        <p className="text-zinc-400 text-lg sm:text-xl mb-8 leading-relaxed">
          Aperte, grite, escreva e apague.<br />
          <strong className="text-zinc-200">Nada fica salvo.</strong>
        </p>

        {/* Badges */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {BADGES.map(({ Icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 rounded-full px-3 py-1.5 text-xs text-zinc-400"
            >
              <Icon size={11} className="text-zinc-600" />
              {label}
            </span>
          ))}
          <span className="inline-flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 rounded-full px-3 py-1.5 text-xs text-zinc-400">
            🇧🇷 Feito para descompressão rápida
          </span>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="#app"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-red-700 to-orange-600 text-white font-bold py-3.5 px-8 rounded-2xl hover:from-red-600 hover:to-orange-500 transition-all shadow-lg shadow-red-950/50"
          >
            Começar agora
          </a>
          <a
            href="#como-funciona"
            className="inline-flex items-center justify-center gap-2 bg-zinc-900 border border-zinc-800 text-zinc-300 font-semibold py-3.5 px-8 rounded-2xl hover:border-zinc-600 hover:text-white transition-all"
          >
            Ver como funciona
          </a>
        </div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-12"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="inline-block text-zinc-700"
        >
          <ArrowDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}
