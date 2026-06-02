export type RageMode = 'escrever' | 'bater';

export interface RageSession {
  id: string;
  mode: RageMode;
  text: string;
  intensity: number;
  clickCount: number;
  timestamp: number;
}

export interface IntensityLevel {
  label: string;
  color: string;
  emoji: string;
  bgColor: string;
}

export const INTENSITY_LEVELS: IntensityLevel[] = [
  { label: 'Tranquilo',    color: '#60a5fa', emoji: '😐', bgColor: 'rgba(96,165,250,0.15)'  },
  { label: 'Irritado',     color: '#34d399', emoji: '😤', bgColor: 'rgba(52,211,153,0.15)'  },
  { label: 'Bravo',        color: '#fbbf24', emoji: '😠', bgColor: 'rgba(251,191,36,0.15)'  },
  { label: 'Furioso',      color: '#f97316', emoji: '🤬', bgColor: 'rgba(249,115,22,0.15)'  },
  { label: 'IRADO TOTAL',  color: '#ef4444', emoji: '💢', bgColor: 'rgba(239,68,68,0.15)'   },
];

export function getIntensityLevel(intensity: number): IntensityLevel {
  if (intensity < 20)  return INTENSITY_LEVELS[0];
  if (intensity < 40)  return INTENSITY_LEVELS[1];
  if (intensity < 60)  return INTENSITY_LEVELS[2];
  if (intensity < 80)  return INTENSITY_LEVELS[3];
  return INTENSITY_LEVELS[4];
}
