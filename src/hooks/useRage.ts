import { useState, useCallback, useEffect, useRef } from 'react';
import type { RageMode } from '../types';
import { clearSensitiveSessionState } from '../utils/privacy';

// Wipe any sensitive data persisted by older versions
clearSensitiveSessionState();

function calcIntensity(text: string, clickCount: number, mode: RageMode): number {
  if (mode === 'botao')    return Math.min(Math.round((clickCount / 50) * 100), 100);
  if (mode === 'respirar') return 0;
  if (mode === 'filtrar')  return 0;

  if (!text.trim()) return 0;

  let score = 0;

  score += Math.min(text.length / 200, 1) * 25;

  const letters = text.replace(/[^a-zA-Z]/g, '');
  if (letters.length > 0) {
    const capsRatio = text.replace(/[^A-Z]/g, '').length / letters.length;
    score += capsRatio * 30;
  }

  const bangs = (text.match(/!/g) ?? []).length;
  score += Math.min(bangs * 4, 25);

  const repeated = (text.match(/[!?]{2,}/g) ?? []).length;
  score += Math.min(repeated * 5, 15);

  const capsWords = (text.match(/\b[A-Z]{3,}\b/g) ?? []).length;
  score += Math.min(capsWords * 3, 15);

  return Math.min(Math.round(score), 100);
}

export function useRage() {
  const [mode, setModeState] = useState<RageMode>('escrever');
  const [text, setText] = useState('');
  const [clickCount, setClickCount] = useState(0);
  const [isExploding, setIsExploding] = useState(false);
  const [lastReleasedIntensity, setLastReleasedIntensity] = useState<number | null>(null);
  const [sessionReleaseCount, setSessionReleaseCount] = useState(0);

  const clickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clickCountRef = useRef(clickCount);
  clickCountRef.current = clickCount;

  const doRelease = useCallback((intensity: number) => {
    setLastReleasedIntensity(intensity);
    setIsExploding(true);
    setSessionReleaseCount(c => c + 1);
    setText('');
    setClickCount(0);
    setTimeout(() => setIsExploding(false), 1000);
  }, []);

  // Auto-release in Modo Botão after 3s of inactivity
  useEffect(() => {
    if (mode !== 'botao' || clickCount === 0) return;
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    clickTimerRef.current = setTimeout(() => {
      const count = clickCountRef.current;
      if (count === 0) return;
      doRelease(Math.min(Math.round((count / 50) * 100), 100));
    }, 3000);
    return () => {
      if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    };
  }, [clickCount, mode, doRelease]);

  // Listen for landing CTA mode requests
  useEffect(() => {
    function onModeRequest(e: Event) {
      const requestedMode = (e as CustomEvent<RageMode>).detail;
      setMode(requestedMode);
    }
    window.addEventListener('dsraq:mode', onModeRequest);
    return () => window.removeEventListener('dsraq:mode', onModeRequest);
  // setMode is stable (useCallback), but we define it below — safe to omit
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hit = useCallback(() => {
    setClickCount(c => c + 1);
  }, []);

  const triggerRelease = useCallback(() => {
    const intensity = calcIntensity(text, clickCount, mode);
    if (mode === 'escrever' && !text.trim()) return;
    if (mode === 'botao' && clickCount === 0) return;
    doRelease(intensity);
  }, [text, clickCount, mode, doRelease]);

  const setMode = useCallback((m: RageMode) => {
    setModeState(m);
    setText('');
    setClickCount(0);
    setLastReleasedIntensity(null);
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
  }, []);

  const resetToInput = useCallback(() => {
    setLastReleasedIntensity(null);
  }, []);

  const intensity = calcIntensity(text, clickCount, mode);
  const canRelease =
    mode === 'escrever' ? text.trim().length > 0 :
    mode === 'botao'    ? clickCount > 0 :
    false;

  return {
    mode,
    setMode,
    text,
    setText,
    clickCount,
    hit,
    intensity,
    isExploding,
    lastReleasedIntensity,
    canRelease,
    triggerRelease,
    resetToInput,
    sessionReleaseCount,
  };
}
