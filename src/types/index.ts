// ── Rage mode ───────────────────────────────────────────────────────────────
export type RageMode = 'escrever' | 'botao' | 'respirar' | 'filtrar';

// ── Intensity levels ─────────────────────────────────────────────────────────
export interface IntensityLevel {
  label: string;
  color: string;
  emoji: string;
  bgColor: string;
}

export const INTENSITY_LEVELS: IntensityLevel[] = [
  { label: 'Tranquilo',   color: '#9CCBEA', emoji: '😮‍💨', bgColor: 'rgba(156,203,234,0.12)' },
  { label: 'Irritado',    color: '#B9A7E8', emoji: '😤',   bgColor: 'rgba(185,167,232,0.12)' },
  { label: 'Bravo',       color: '#F46F5E', emoji: '😠',   bgColor: 'rgba(244,111,94,0.12)'  },
  { label: 'Furioso',     color: '#E05040', emoji: '🤬',   bgColor: 'rgba(224,80,64,0.12)'   },
  { label: 'No limite',   color: '#C83020', emoji: '💢',   bgColor: 'rgba(200,48,32,0.12)'   },
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
  { minClicks: 0,   label: 'Irritado',         color: '#9CCBEA' },
  { minClicks: 10,  label: 'Bufando',           color: '#B9A7E8' },
  { minClicks: 25,  label: 'Já deu',            color: '#F46F5E' },
  { minClicks: 45,  label: 'Panela de pressão', color: '#E05040' },
  { minClicks: 70,  label: 'AAAAAAAAAAAA',       color: '#C83020' },
  { minClicks: 100, label: 'Surto protocolado',  color: '#A82010' },
];

export function getCurrentPhase(clickCount: number): Phase {
  for (let i = PHASES.length - 1; i >= 0; i--) {
    if (clickCount >= PHASES[i].minClicks) return PHASES[i];
  }
  return PHASES[0];
}

export const MICROCOPIES: string[] = [
  'Você está soltando um pouco. Continue.',
  'Melhor aqui do que no grupo da família.',
  'Coloque pra fora com segurança.',
  'O botão não vai te julgar.',
  'Nenhum print será produzido.',
  'Surto em ambiente controlado.',
  'Protocolando indignação no vazio.',
  'Aqui é zona segura. Vai fundo.',
  'Mais um. Pode.',
  'Mais intensidade. Menos WhatsApp.',
  'Ninguém vai ler isso.',
  'Pressão liberada de forma responsável.',
];

export const FINALIZATIONS: string[] = [
  'Você descarregou. Agora respire.',
  'Nada ficou salvo. Esse peso pode ir embora.',
  'Melhor apertar um botão do que mandar uma mensagem errada.',
  'Nenhum grupo de WhatsApp foi destruído. Parabéns.',
  'O surto foi protocolado e imediatamente arquivado no vazio.',
  'Seu "eu de amanhã" agradece.',
  'Mais calmo? O botão continua aqui se precisar.',
  'Indignação processada. Você segue.',
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
  { id: 'basic',     label: 'Básico',                free: true,  primaryColor: '#F46F5E', accentColor: '#E05040', buttonLabel: 'SOLTAR!',     description: 'O clássico. Sem frescura.'              },
  { id: 'office',    label: 'Escritório em colapso', free: true,  primaryColor: '#B9A7E8', accentColor: '#9A87D4', buttonLabel: 'PROCESSAR!',  description: 'Para quando a reunião nunca acaba.'     },
  { id: 'student',   label: 'Estudante surtado',      free: true,  primaryColor: '#F0A030', accentColor: '#E08820', buttonLabel: 'APERTAR!',    description: 'Prova amanhã, nada estudado.'           },
  { id: 'gamer',     label: 'Gamer tiltado',           free: true,  primaryColor: '#9CCBEA', accentColor: '#6AAED6', buttonLabel: 'REPORTAR!',   description: 'Lag, feed, tilt. O ciclo.'              },
  { id: 'adultlife', label: 'Vida adulta',             free: true,  primaryColor: '#A8C49A', accentColor: '#7FA870', buttonLabel: 'APERTAR!',    description: 'Boleto, trânsito, reunião.'             },
  { id: 'monster',   label: 'Monstrinho da raiva',     free: true,  primaryColor: '#A8C49A', accentColor: '#7FA870', buttonLabel: 'RUGIR!',      description: 'Solte o monstro interno.'              },
  // Premium (locked)
  { id: 'monday',    label: 'Segunda-feira',           free: false, primaryColor: '#7c3aed', accentColor: '#a855f7', buttonLabel: 'APERTAR!',    description: 'A pior de todas.'                      },
  { id: 'bill',      label: 'Boleto vencido',          free: false, primaryColor: '#C83020', accentColor: '#E05040', buttonLabel: 'PAGAR!',      description: 'Juros e mais juros.'                   },
  { id: 'meeting',   label: 'Reunião infinita',        free: false, primaryColor: '#0891b2', accentColor: '#06b6d4', buttonLabel: 'ENCERRAR!',   description: 'Poderia ter sido um e-mail.'           },
  { id: 'client',    label: 'Cliente sem noção',       free: false, primaryColor: '#b45309', accentColor: '#d97706', buttonLabel: 'ATENDER!',    description: 'O prazo era ontem.'                    },
  { id: 'traffic',   label: 'Trânsito brasileiro',     free: false, primaryColor: '#C83020', accentColor: '#E05040', buttonLabel: 'BUZINAR!',    description: 'Uma hora preso no sinal.'              },
  { id: 'whatsapp',  label: 'Grupo da família',        free: false, primaryColor: '#15803d', accentColor: '#22c55e', buttonLabel: 'SILENCIAR!',  description: 'Corrente às 7h da manhã.'              },
  { id: 'court',     label: 'Audiência atrasada',      free: false, primaryColor: '#1d4ed8', accentColor: '#3b82f6', buttonLabel: 'PROTESTAR!',  description: 'Uma hora no corredor.'                 },
  { id: 'registry',  label: 'Cartório em chamas',      free: false, primaryColor: '#92400e', accentColor: '#b45309', buttonLabel: 'PROTOCOLAR!', description: 'Fila, senha, fila de novo.'            },
];

export function getSkinById(id: string): Skin {
  return SKINS.find(s => s.id === id) ?? SKINS[0];
}

// ── Achievements (ethical: one-time unlocks, no streaks, no pressure) ────────
export interface AchievementDef {
  id: string;
  emoji: string;
  label: string;
}

export const ACHIEVEMENT_DEFS: AchievementDef[] = [
  { id: 'first_release', emoji: '🌊', label: 'Primeira descarga' },
  { id: 'writer',        emoji: '✍️',  label: 'Colocou pra fora'  },
  { id: 'presser',       emoji: '💪',  label: '50 apertas de uma vez' },
  { id: 'breather',      emoji: '💨',  label: 'Respirou de verdade' },
  { id: 'triple',        emoji: '⚡',  label: 'Três em uma sessão'  },
  { id: 'filtered',      emoji: '🧩',  label: 'Não enviou, filtrou' },
];

// ── Preferences (only non-sensitive data) ────────────────────────────────────
export interface Preferences {
  skinId: string;
  soundEnabled: boolean;
  reducedMotion: boolean;
  unlockedAchievements: string[];
}

export const DEFAULT_PREFERENCES: Preferences = {
  skinId: 'basic',
  soundEnabled: false,
  reducedMotion: false,
  unlockedAchievements: [],
};

export const PREFERENCES_KEY = 'dsraq.preferences';
