import { motion } from 'framer-motion';

interface ReleaseButtonProps {
  onClick: () => void;
  disabled: boolean;
  isExploding: boolean;
}

export function ReleaseButton({ onClick, disabled, isExploding }: ReleaseButtonProps) {
  return (
    <div className="px-4">
      <motion.button
        onClick={onClick}
        disabled={disabled}
        whileHover={disabled ? {} : { scale: 1.02 }}
        whileTap={disabled ? {} : { scale: 0.96 }}
        animate={
          isExploding
            ? { scale: [1, 1.12, 0.94, 1.05, 1], rotate: [-1, 1, -1, 1, 0] }
            : {}
        }
        transition={{ duration: 0.4 }}
        className={[
          'w-full py-4 rounded-2xl font-black text-lg',
          'flex items-center justify-center gap-2 transition-all duration-200',
          disabled
            ? 'cursor-not-allowed'
            : 'cursor-pointer pulse-cta',
        ].join(' ')}
        style={
          disabled
            ? { background: '#F0EDE8', color: '#DDD0B8', border: '1.5px solid #EDE0CB' }
            : {
                background: '#F46F5E',
                color: '#FFFFFF',
                border: 'none',
                boxShadow: '0 4px 20px rgba(244,111,94,0.35)',
              }
        }
        aria-label={disabled ? 'Escreva algo para descarregar' : 'Descarregar agora'}
      >
        {disabled ? 'Escreva para descarregar' : 'Descarregue agora'}
      </motion.button>
    </div>
  );
}
