import { ShieldCheck } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-12 px-4" style={{ background: '#FFF8EC', borderTop: '1px solid #EDE0CB' }}>
      <div className="max-w-lg mx-auto text-center">
        <ShieldCheck size={18} className="mx-auto mb-3" style={{ color: '#A8C49A' }} />

        <p className="text-xs leading-relaxed mb-3 max-w-sm mx-auto" style={{ color: '#98A2B3' }}>
          Nada fica salvo por padrão. Preferências visuais podem ser salvas
          localmente no seu dispositivo. Este site é uma experiência de
          descompressão e não substitui apoio profissional.
        </p>

        <p className="text-xs mb-1" style={{ color: '#98A2B3' }}>
          Se houver risco a você ou a alguém, procure ajuda imediata.
        </p>
        <a
          href="tel:188"
          className="text-xs font-bold transition-opacity hover:opacity-70"
          style={{ color: '#A8C49A' }}
        >
          CVV 188 — Brasil, 24h, gratuito
        </a>

        <p className="text-xs mt-8 font-semibold" style={{ color: '#EDE0CB' }}>
          DSRAQ · Descarregue Sua Raiva Aqui
        </p>
      </div>
    </footer>
  );
}
