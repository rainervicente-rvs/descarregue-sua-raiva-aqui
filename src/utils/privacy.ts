const SENSITIVE_KEYS = [
  'rageHistory',
  'rageSessions',
  'dsraq_sessions',
  'lastText',
  'userMessage',
  'problemName',
  'dontSendMessage',
];

export function clearSensitiveSessionState(): void {
  SENSITIVE_KEYS.forEach(key => localStorage.removeItem(key));
}
