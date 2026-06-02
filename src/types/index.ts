// ── Rage mode ───────────────────────────────────────────────────────────────
export type RageMode = 'escrever' | 'botao';

// ── Intensity levels ─────────────────────────────────────────────────────────
export interface IntensityLevel {
  label: string;
  color: string;
  emoji: string;
  bgColor: string;
}

export const INTENSITY_LEVELS: IntensityLevel[] = [
  { label: 'Tranquilo',   color: '#60a5fa', emoji: '😐', bgColor: 'rgba(96,165,250,0.12)'  },
  { label: 'Irritado',    color: '#34d399', emoji: '😤', bgColor: 'rgba(52,211,153,0.12)'  },
  { label: 'Bravo',       color: '#fbbf24', emoji: '😠', bgColor: 'rgba(251,191,36,0.12)'  },
  { label: 'Furioso',     color: '#f97316', emoji: '🤬', bgColor: 'rgba(249,115,22,0.12)'  },
  { label: 'IRADO TOTAL', color: '#ef4444', emoji: '💢', bgColor: 'rgba(239,68,68,0.12)'   },
];

export function getIntensityLevel(intensity: number): IntensityLevel {
  if (intensity < 20) return INTENSITY_LEVELS[0];
  if (intensity < 40) return INTENSITY_LEVELS[1];
  if (intensity < 60) return INTENSITY_LEVELS[2];
  if (intensity < 80) return INTENSITY_LEVELS[3];
  return INTENSITY_LEVELS[4];
}

// ── Modo Botão phases ─────────────────────────────────────────────────────────
export interface Phase {
  minClicks: number;
  label: string;
  color: string;
}

export const PHASES: Phase[] = [
  { minClicks: 0,   label: 'Irritado',          color: '#60a5fa' },
  { minClicks: 10,  label: 'Bufando',            color: '#34d399' },
  { minClicks: 25,  label: 'Já deu',             color: '#fbbf24' },
  { minClicks: 45,  label: 'Panela de pressão',  color: '#f97316' },
  { minClicks: 70,  label: 'AAAAAAAAAAAA',        color: '#ef4444' },
  { minClicks: 100, label: 'Surto protocolado',   color: '#dc2626' },
];

export function getCurrentPhase(clickCount: number): Phase {
  for (let i = PHASES.length - 1; i >= 0; i--) {
    if (clickCount >= PHASES[i].minClicks) return PHASES[i];
  }
  return PHASES[0];
}

export const MICROCOPIES: string[] = [
  'Vai, aperta. O teclado aguenta.',
  'Melhor aqui do que no grupo da família.',
  'Respira só depois. Agora descarrega.',
  'O botão não vai te julgar.',
  'Nenhum print será produzido.',
  'Surto em ambiente controlado.',
  'Protocolando indignação no vazio.',
  'Isso aqui é zona segura.',
  'Manda mais um. Pode.',
  'Mais intensidade. Menos WhatsApp.',
  'Ninguém vai ler isso. Vai fundo.',
  'Pressão liberada de forma responsável.',
];

export const FINALIZATIONS: string[] = [
  'Você descarregou. O teclado sobreviveu.',
  'Nada ficou salvo. Nem essa raiva precisa ficar.',
  'Melhor apertar um botão do que mandar uma mensagem errada.',
  'Parabéns. Nenhum grupo de WhatsApp foi destruído.',
  'O surto foi protocolado e imediatamente arquivado no vazio.',
  'Seu "eu de amanhã" agradece.',
  'Mais calmo? O botão continua aqui se precisar.',
  'Indignação processada com sucesso.',
];

// ── Skins ────────────────────────────────────────────────────────────────────
export interface Skin {
  id: string;
  label: string;
  description: string;
  free: boolean;
  primaryColor: string;
  accentColor: string;
  buttonLabel: string;
}

export const SKINS: Skin[] = [
  // Free
  { id: 'basic',     label: 'Básico',                free: true,  primaryColor: '#ef4444', accentColor: '#f97316', buttonLabel: 'APERTAR!',    description: 'O clássico. Sem frescura.' },
  { id: 'office',    label: 'Escritório em colapso', free: true,  primaryColor: '#6366f1', accentColor: '#8b5cf6', buttonLabel: 'PROCESSAR!',  description: 'Para quando a reunião nunca acaba.' },
  { id: 'student',   label: 'Estudante surtado',      free: true,  primaryColor: '#f59e0b', accentColor: '#fbbf24', buttonLabel: 'APERTAR!',    description: 'Prova amanhã, nada estudado.' },
  { id: 'gamer',     label: 'Gamer tiltado',           free: true,  primaryColor: '#06b6d4', accentColor: '#0ea5e9', buttonLabel: 'REPORTAR!',   description: 'Lag, feed, tilt. O ciclo.' },
  { id: 'adultlife', label: 'Vida adulta',             free: true,  primaryColor: '#94a3b8', accentColor: '#cbd5e1', buttonLabel: 'APERTAR!',    description: 'Boleto, trânsito, reunião.' },
  { id: 'monster',   label: 'Monstrinho da raiva',     free: true,  primaryColor: '#10b981', accentColor: '#34d399', buttonLabel: 'RUGIR!',      description: 'Solte o monstro interno.' },
  // Premium (locked)
  { id: 'monday',    label: 'Segunda-feira',           free: false, primaryColor: '#7c3aed', accentColor: '#a855f7', buttonLabel: 'APERTAR!',    description: 'A pior de todas.' },
  { id: 'bill',      label: 'Boleto vencido',          free: false, primaryColor: '#dc2626', accentColor: '#ef4444', buttonLabel: 'PAGAR!',      description: 'Juros e mais juros.' },
  { id: 'meeting',   label: 'Reunião infinita',        free: false, primaryColor: '#0891b2', accentColor: '#06b6d4', buttonLabel: 'ENCERRAR!',   description: 'Poderia ter sido um e-mail.' },
  { id: 'client',    label: 'Cliente sem noção',       free: false, primaryColor: '#b45309', accentColor: '#d97706', buttonLabel: 'ATENDER!',    description: 'O prazo era ontem.' },
  { id: 'traffic',   label: 'Trânsito brasileiro',     free: false, primaryColor: '#b91c1c', accentColor: '#dc2626', buttonLabel: 'BUZINAR!',    description: 'Uma hora preso no sinal.' },
  { id: 'whatsapp',  label: 'Grupo da família',        free: false, primaryColor: '#15803d', accentColor: '#22c55e', buttonLabel: 'SILENCIAR!',  description: 'Corrente às 7h da manhã.' },
  { id: 'court',     label: 'Audiência atrasada',      free: false, primaryColor: '#1d4ed8', accentColor: '#3b82f6', buttonLabel: 'PROTESTAR!',  description: 'Uma hora no corredor.' },
  { id: 'registry',  label: 'Cartório em chamas',      free: false, primaryColor: '#92400e', accentColor: '#b45309', buttonLabel: 'PROTOCOLAR!', description: 'Fila, senha, fila de novo.' },
];

export function getSkinById(id: string): Skin {
  return SKINS.find(s => s.id === id) ?? SKINS[0];
}

// ── Preferences (only non-sensitive data) ────────────────────────────────────
export interface Preferences {
  skinId: string;
  soundEnabled: boolean;
  reducedMotion: boolean;
}

export const DEFAULT_PREFERENCES: Preferences = {
  skinId: 'basic',
  soundEnabled: false,
  reducedMotion: false,
};

export const PREFERENCES_KEY = 'dsraq.preferences';
