import { useState, useCallback } from 'react';
import type { Preferences, Skin } from '../types';
import { DEFAULT_PREFERENCES, PREFERENCES_KEY, ACHIEVEMENT_DEFS, getSkinById } from '../types';

function loadPreferences(): Preferences {
  try {
    const stored = localStorage.getItem(PREFERENCES_KEY);
    if (!stored) return DEFAULT_PREFERENCES;
    return { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) };
  } catch {
    return DEFAULT_PREFERENCES;
  }
}

export function usePreferences() {
  const [preferences, setPreferences] = useState<Preferences>(loadPreferences);

  const updatePreferences = useCallback((updates: Partial<Preferences>) => {
    setPreferences(prev => {
      const next = { ...prev, ...updates };
      localStorage.setItem(PREFERENCES_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  // One-time achievement unlock — idempotent
  const unlockAchievement = useCallback((id: string) => {
    setPreferences(prev => {
      if (prev.unlockedAchievements.includes(id)) return prev;
      const valid = ACHIEVEMENT_DEFS.some(a => a.id === id);
      if (!valid) return prev;
      const next = { ...prev, unlockedAchievements: [...prev.unlockedAchievements, id] };
      localStorage.setItem(PREFERENCES_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const currentSkin: Skin = getSkinById(preferences.skinId);

  return { preferences, currentSkin, updatePreferences, unlockAchievement };
}
