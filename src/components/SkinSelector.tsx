import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Check } from 'lucide-react';
import { useState } from 'react';
import { SKINS } from '../types';
import type { Skin } from '../types';

interface SkinSelectorProps {
  currentSkinId: string;
  onSelectSkin: (id: string) => void;
}

export function SkinSelector({ currentSkinId, onSelectSkin }: SkinSelectorProps) {
  const [lockedToast, setLockedToast] = useState(false);

  function handleClick(skin: Skin) {
    if (!skin.free) {
      setLockedToast(true);
      setTimeout(() => setLockedToast(false), 2500);
      return;
    }
    onSelectSkin(skin.id);
  }

  const freeSkins = SKINS.filter(s => s.free);
  const premiumSkins = SKINS.filter(s => !s.free);

  return (
    <section id="skins" className="py-16 px-4" style={{ background: '#FFF8EC' }}>
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold tracking-wider uppercase mb-2" style={{ color: '#F46F5E' }}>
            Personalize
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-3" style={{ color: '#172B4D' }}>
            Skins de descarga
          </h2>
          <p className="text-base" style={{ color: '#667085' }}>
            Escolha o estilo que representa o que você está sentindo.
          </p>
        </motion.div>

        {/* Free skins */}
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: '#98A2B3' }}>
            Grátis
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {freeSkins.map(skin => {
              const active = skin.id === currentSkinId;
              return (
                <motion.button
                  key={skin.id}
                  onClick={() => handleClick(skin)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative text-left rounded-xl p-3.5 cursor-pointer transition-all duration-200"
                  style={
                    active
                      ? { background: '#FFFFFF', border: `1.5px solid ${skin.primaryColor}`, boxShadow: `0 2px 12px ${skin.primaryColor}22` }
                      : { background: '#FFFFFF', border: '1.5px solid #EDE0CB' }
                  }
                >
                  <div
                    className="w-full h-1.5 rounded-full mb-2.5"
                    style={{ background: `linear-gradient(90deg, ${skin.primaryColor}, ${skin.accentColor})` }}
                  />
                  <p className="font-bold text-sm leading-tight" style={{ color: '#172B4D' }}>
                    {skin.label}
                  </p>
                  <p className="text-xs mt-0.5 leading-tight" style={{ color: '#98A2B3' }}>
                    {skin.description}
                  </p>

                  {active && (
                    <div
                      className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ background: skin.primaryColor }}
                    >
                      <Check size={11} className="text-white" />
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Premium skins */}
        <div>
          <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: '#98A2B3' }}>
            Premium — em breve
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {premiumSkins.map(skin => (
              <motion.button
                key={skin.id}
                onClick={() => handleClick(skin)}
                whileHover={{ scale: 1.02 }}
                className="relative text-left rounded-xl p-3 cursor-pointer"
                style={{ background: '#FAFAF8', border: '1.5px solid #EDE0CB' }}
              >
                <div
                  className="w-full h-1.5 rounded-full mb-2 opacity-25"
                  style={{ background: `linear-gradient(90deg, ${skin.primaryColor}, ${skin.accentColor})` }}
                />
                <p className="font-semibold text-xs leading-tight" style={{ color: '#98A2B3' }}>
                  {skin.label}
                </p>
                <Lock size={9} className="absolute top-2.5 right-2.5" style={{ color: '#DDD0B8' }} />
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Locked toast */}
      <AnimatePresence>
        {lockedToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 text-sm px-5 py-3 rounded-xl shadow-lg z-50 whitespace-nowrap font-semibold"
            style={{ background: '#172B4D', color: '#FFFFFF' }}
          >
            🔒 Em breve — desbloqueie skins para descarregar com estilo.
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
