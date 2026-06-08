import { motion } from 'framer-motion';
import { Shield, UserX, Lock, ArrowDown } from 'lucide-react';

const BADGES = [
  { Icon: Shield,  label: '100% privado'     },
  { Icon: UserX,   label: 'Sem cadastro'     },
  { Icon: Lock,    label: 'Nada fica salvo'  },
];

export function HeroSection() {
  return (
    <section
      className="relative overflow-hidden pt-16 pb-14 px-4 text-center"
      style={{ background: 'linear-gradient(180deg, #FFF8EC 0%, #FFF3E0 100%)' }}
    >
      {/* Subtle organic background shapes */}
      <div
        className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none opacity-30"
        style={{ background: 'radial-gradient(circle, #B9A7E8 0%, transparent 70%)', transform: 'translate(30%, -30%)' }}
      />
      <div
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(circle, #9CCBEA 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }}
      />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative max-w-xl mx-auto"
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-sm font-semibold tracking-wider uppercase mb-4"
          style={{ color: '#F46F5E' }}
        >
          Alívio emocional seguro
        </motion.p>

        {/* Main title */}
        <h1
          className="font-serif text-5xl sm:text-6xl leading-tight mb-5"
          style={{ color: '#172B4D', fontWeight: 700 }}
        >
          Descarregue<br />
          <span style={{ color: '#F46F5E', fontStyle: 'italic' }}>sua raiva</span><br />
          aqui.
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl leading-relaxed mb-3" style={{ color: '#667085' }}>
          Um espaço seguro para aliviar, respirar<br className="hidden sm:inline" /> e recuperar o controle.
        </p>
        <p className="text-base mb-9" style={{ color: '#98A2B3' }}>
          Expresse o que pesa, regule suas emoções e siga mais leve.
        </p>

        {/* Privacy badges */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {BADGES.map(({ Icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold"
              style={{ background: '#FFFFFF', border: '1px solid #EDE0CB', color: '#667085' }}
            >
              <Icon size={11} style={{ color: '#A8C49A' }} />
              {label}
            </span>
          ))}
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold"
            style={{ background: '#FFFFFF', border: '1px solid #EDE0CB', color: '#667085' }}
          >
            🇧🇷 Feito para o brasileiro que aguenta muito
          </span>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <a
            href="#app"
            className="pulse-cta inline-flex items-center justify-center gap-2 font-bold py-4 px-10 rounded-2xl text-white text-base transition-all hover:opacity-90 active:scale-95"
            style={{ background: '#F46F5E', boxShadow: '0 4px 20px rgba(244,111,94,0.35)' }}
          >
            Quero me sentir mais leve
          </a>
          <a
            href="#app"
            className="inline-flex items-center justify-center gap-2 font-semibold py-4 px-8 rounded-2xl text-base transition-all hover:opacity-80"
            style={{ background: '#FFFFFF', border: '1.5px solid #EDE0CB', color: '#172B4D' }}
          >
            Escrever o que sinto
          </a>
        </div>

        {/* Visual metaphor: nó ao fluxo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-14 flex items-center justify-center gap-4"
          aria-hidden="true"
        >
          {/* Tension — tangled lines */}
          <div className="flex flex-col gap-1 opacity-60">
            {[20, 32, 16, 28, 12].map((w, i) => (
              <div
                key={i}
                className="rounded-full"
                style={{ width: w, height: 3, background: '#B9A7E8', transform: `rotate(${(i - 2) * 8}deg)` }}
              />
            ))}
          </div>

          <motion.div
            animate={{ x: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ color: '#667085', fontSize: 20 }}
          >
            →
          </motion.div>

          {/* Flow — smooth waves */}
          <div className="flex flex-col gap-1.5 opacity-70">
            {[28, 36, 28, 20].map((w, i) => (
              <motion.div
                key={i}
                className="rounded-full"
                style={{ width: w, height: 3, background: '#9CCBEA' }}
                animate={{ scaleX: [1, 1.1, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1.4 }}
        className="mt-10"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="inline-block"
          style={{ color: '#DDD0B8' }}
        >
          <ArrowDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}
