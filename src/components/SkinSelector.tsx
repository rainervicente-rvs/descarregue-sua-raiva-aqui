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
    <section id="skins" className="py-16 px-4 border-t border-zinc-900">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-black text-white text-center mb-2">Skins</h2>
        <p className="text-zinc-600 text-sm text-center mb-10">
          Escolha o estilo da sua descarga
        </p>

        {/* Free skins */}
        <div className="mb-8">
          <p className="text-xs text-zinc-700 uppercase tracking-wider font-bold mb-3">
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
                  className={[
                    'relative text-left rounded-xl p-3.5 border cursor-pointer transition-all duration-200',
                    active
                      ? 'bg-zinc-800 border-zinc-500'
                      : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700',
                  ].join(' ')}
                >
                  <div
                    className="w-full h-1.5 rounded-full mb-2.5"
                    style={{
                      background: `linear-gradient(90deg, ${skin.primaryColor}, ${skin.accentColor})`,
                    }}
                  />
                  <p className="font-bold text-sm text-white leading-tight">{skin.label}</p>
                  <p className="text-xs text-zinc-600 mt-0.5 leading-tight">{skin.description}</p>

                  {active && (
                    <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-white flex items-center justify-center">
                      <Check size={11} className="text-zinc-900" />
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Premium skins */}
        <div>
          <p className="text-xs text-zinc-700 uppercase tracking-wider font-bold mb-3">
            Premium — em breve
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {premiumSkins.map(skin => (
              <motion.button
                key={skin.id}
                onClick={() => handleClick(skin)}
                whileHover={{ scale: 1.02 }}
                className="relative text-left rounded-xl p-3 border border-zinc-800 bg-zinc-900/40 cursor-pointer"
              >
                <div
                  className="w-full h-1.5 rounded-full mb-2 opacity-30"
                  style={{
                    background: `linear-gradient(90deg, ${skin.primaryColor}, ${skin.accentColor})`,
                  }}
                />
                <p className="font-semibold text-xs text-zinc-500 leading-tight">{skin.label}</p>
                <Lock size={9} className="text-zinc-700 absolute top-2.5 right-2.5" />
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
            className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-zinc-800 border border-zinc-700 text-white text-sm px-4 py-2.5 rounded-xl shadow-lg z-50 whitespace-nowrap"
          >
            🔒 Em breve — desbloqueie skins para descarregar com estilo.
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
