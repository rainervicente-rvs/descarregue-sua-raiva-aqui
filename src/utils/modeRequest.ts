import type { RageMode } from '../types';

// Module-level event bus for landing → app mode pre-selection.
// Fires from CaminhoDeAlivio cards, consumed by useRage.
export function dispatchModeRequest(mode: RageMode) {
  window.dispatchEvent(new CustomEvent('dsraq:mode', { detail: mode }));
}
