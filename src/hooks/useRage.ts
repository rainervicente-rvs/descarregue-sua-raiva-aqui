import { useState, useCallback, useEffect, useRef } from 'react';
import type { RageSession, RageMode } from '../types';

const SESSIONS_KEY = 'dsraq_sessions';
const MAX_SESSIONS = 20;

function calcIntensity(text: string, clickCount: number, mode: RageMode): number {
  if (mode === 'bater') {
    return Math.min(Math.round((clickCount / 50) * 100), 100);
  }

  if (!text.trim()) return 0;

  let score = 0;

  // Length factor (up to 25 pts)
  score += Math.min(text.length / 200, 1) * 25;

  // ALL CAPS ratio (up to 30 pts)
  const letters = text.replace(/[^a-zA-Z]/g, '');
  if (letters.length > 0) {
    const capsRatio = (text.replace(/[^A-Z]/g, '').length) / letters.length;
    score += capsRatio * 30;
  }

  // Exclamation marks (up to 25 pts)
  const bangs = (text.match(/!/g) || []).length;
  score += Math.min(bangs * 4, 25);

  // Repeated punctuation like "!!!" or "???" (up to 15 pts)
  const repeated = (text.match(/[!?]{2,}/g) || []).length;
  score += Math.min(repeated * 5, 15);

  // Profanity / rage words in PT (rough heuristic: ALL CAPS words)
  const capsWords = (text.match(/\b[A-Z]{3,}\b/g) || []).length;
  score += Math.min(capsWords * 3, 15);

  return Math.min(Math.round(score), 100);
}

function loadSessions(): RageSession[] {
  try {
    return JSON.parse(localStorage.getItem(SESSIONS_KEY) ?? '[]');
  } catch {
    return [];
  }
}

export function useRage() {
  const [sessions, setSessions] = useState<RageSession[]>(loadSessions);
  const [mode, setMode] = useState<RageMode>('escrever');
  const [text, setText] = useState('');
  const [clickCount, setClickCount] = useState(0);
  const [isExploding, setIsExploding] = useState(false);
  const [lastReleasedIntensity, setLastReleasedIntensity] = useState<number | null>(null);
  const clickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const intensity = calcIntensity(text, clickCount, mode);

  // Auto-reset click mode after 3s of inactivity
  useEffect(() => {
    if (mode !== 'bater' || clickCount === 0) return;
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    clickTimerRef.current = setTimeout(() => {
      // auto-release
      triggerRelease();
    }, 3000);
    return () => {
      if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clickCount, mode]);

  const hit = useCallback(() => {
    if (mode !== 'bater') return;
    setClickCount(c => c + 1);
  }, [mode]);

  const triggerRelease = useCallback(() => {
    const currentIntensity = calcIntensity(text, clickCount, mode);

    if (mode === 'escrever' && !text.trim()) return;
    if (mode === 'bater' && clickCount === 0) return;

    const session: RageSession = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      mode,
      text: mode === 'escrever' ? text : `${clickCount} batida${clickCount !== 1 ? 's' : ''}`,
      intensity: currentIntensity,
      clickCount: mode === 'bater' ? clickCount : 0,
      timestamp: Date.now(),
    };

    setSessions(prev => {
      const updated = [session, ...prev].slice(0, MAX_SESSIONS);
      localStorage.setItem(SESSIONS_KEY, JSON.stringify(updated));
      return updated;
    });

    setLastReleasedIntensity(currentIntensity);
    setIsExploding(true);
    setText('');
    setClickCount(0);

    setTimeout(() => setIsExploding(false), 1000);
  }, [text, clickCount, mode]);

  const clearHistory = useCallback(() => {
    setSessions([]);
    localStorage.removeItem(SESSIONS_KEY);
  }, []);

  const todaySessions = sessions.filter(s => {
    const now = new Date();
    const d = new Date(s.timestamp);
    return d.toDateString() === now.toDateString();
  });

  const canRelease = mode === 'escrever' ? text.trim().length > 0 : clickCount > 0;

  return {
    sessions,
    todaySessions,
    mode,
    setMode: (m: RageMode) => { setMode(m); setText(''); setClickCount(0); },
    text,
    setText,
    clickCount,
    hit,
    intensity,
    isExploding,
    lastReleasedIntensity,
    canRelease,
    triggerRelease,
    clearHistory,
  };
}
