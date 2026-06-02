import { ShieldCheck } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-10 px-4 border-t border-zinc-900 mt-4">
      <div className="max-w-lg mx-auto text-center">
        <ShieldCheck size={18} className="text-zinc-800 mx-auto mb-3" />

        <p className="text-xs text-zinc-700 leading-relaxed mb-3 max-w-sm mx-auto">
          Nada fica salvo por padrão. Preferências visuais podem ser salvas
          localmente no seu dispositivo. Este site é uma experiência de
          descompressão e não substitui apoio profissional.
        </p>

        <p className="text-xs text-zinc-700 mb-1">
          Se houver risco a você ou a alguém, procure ajuda imediata.
        </p>
        <a
          href="tel:188"
          className="text-xs font-bold text-zinc-600 hover:text-zinc-300 transition-colors"
        >
          CVV 188 — Brasil, 24h, gratuito
        </a>

        <p className="text-xs text-zinc-900 mt-8 font-medium">
          DSRAQ · Descarregue Sua Raiva Aqui
        </p>
      </div>
    </footer>
  );
}
