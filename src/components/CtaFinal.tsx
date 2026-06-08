import { motion } from 'framer-motion';

export function CtaFinal() {
  return (
    <section
      className="py-20 px-4 text-center relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #172B4D 0%, #2D4A7A 100%)' }}
    >
      {/* Decorative circles */}
      <div
        className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none opacity-10"
        style={{ background: 'radial-gradient(circle, #B9A7E8 0%, transparent 70%)', transform: 'translate(30%, -30%)' }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-64 h-64 rounded-full pointer-events-none opacity-10"
        style={{ background: 'radial-gradient(circle, #9CCBEA 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }}
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative max-w-lg mx-auto"
      >
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
          Você não precisa aguentar<br />tudo sozinho.
        </h2>
        <p className="text-lg mb-2 leading-relaxed" style={{ color: '#CBE7F5' }}>
          Solte um pouco do peso agora.
        </p>
        <p className="text-base mb-10" style={{ color: '#9CCBEA' }}>
          Um passo pequeno também é cuidado.
        </p>

        <a
          href="#app"
          className="pulse-cta inline-flex items-center justify-center gap-2 font-bold py-4 px-12 rounded-2xl text-white text-base transition-all hover:opacity-90 active:scale-95"
          style={{ background: '#F46F5E', boxShadow: '0 4px 24px rgba(244,111,94,0.40)' }}
        >
          Começar descarga
        </a>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-10">
          {['Privado por padrão', 'Sem cadastro', 'Nada fica salvo'].map(item => (
            <span key={item} className="text-sm flex items-center gap-1.5" style={{ color: '#9CCBEA' }}>
              <span style={{ color: '#A8C49A' }}>✓</span>
              {item}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
