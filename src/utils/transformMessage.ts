// Rule-based, 100% client-side, zero network. Transforms aggressive BR-PT
// messages into firm-but-calm versions. Output is a *suggestion* — user edits.

interface TransformResult {
  transformed: string;
  changes: string[];
}

const AGGRESSIVE_WORDS: [RegExp, string][] = [
  [/\babsurdo\b/gi, 'inadequado'],
  [/\babsurda\b/gi, 'inadequada'],
  [/\bidiota\b/gi, 'equivocado'],
  [/\bburro\b/gi, 'confuso'],
  [/\bburra\b/gi, 'confusa'],
  [/\bimcompetente\b/gi, 'despreparado'],
  [/\bincompetente\b/gi, 'despreparado'],
  [/\binepto\b/gi, 'despreparado'],
  [/\bque vergonha\b/gi, 'isso me preocupa'],
  [/\bnão acredito\b/gi, 'estou surpreso(a) com'],
  [/\bnão aguento mais\b/gi, 'preciso de uma solução'],
  [/\bestou farto\b/gi, 'preciso que isso seja resolvido'],
  [/\bdeixei claro\b/gi, 'mencionei anteriormente'],
  [/\bpelo amor de deus\b/gi, 'por favor'],
  [/\bpelo amor d[e']deus\b/gi, 'por favor'],
];

const OPENER_PATTERNS: RegExp[] = [
  /^você é/i,
  /^vocês são/i,
  /^isso é um absurdo/i,
  /^isso é ridículo/i,
  /^não acredito que/i,
  /^jamais imaginei/i,
];

const PROFESSIONAL_CLOSERS = [
  'Fico no aguardo de um retorno.',
  'Podemos alinhar isso em breve?',
  'Conto com a sua atenção.',
  'Aguardo uma posição.',
];

function normalizeCaps(text: string): [string, boolean] {
  let changed = false;
  const result = text.replace(/\b([A-ZÁÉÍÓÚÃÕÂÊÎÔÛÇ]{3,})\b/g, (word) => {
    changed = true;
    return word[0] + word.slice(1).toLowerCase();
  });
  return [result, changed];
}

function normalizeEmphasis(text: string): [string, boolean] {
  let changed = false;
  let result = text;
  if (/!{2,}/.test(result)) { result = result.replace(/!{2,}/g, '!'); changed = true; }
  if (/\?{2,}/.test(result)) { result = result.replace(/\?{2,}/g, '?'); changed = true; }
  if (/\.{4,}/.test(result)) { result = result.replace(/\.{4,}/g, '...'); changed = true; }
  result = result.replace(/k{3,}/gi, ''); // Remove KKKKK
  result = result.replace(/hahaha+/gi, ''); // Remove prolonged laughs used sarcastically
  return [result.trim(), changed];
}

function replaceAggressiveWords(text: string): [string, boolean] {
  let changed = false;
  let result = text;
  for (const [pattern, replacement] of AGGRESSIVE_WORDS) {
    if (pattern.test(result)) {
      result = result.replace(pattern, replacement);
      changed = true;
    }
  }
  return [result, changed];
}

function reframeOpener(text: string): [string, boolean] {
  const firstLine = text.split('\n')[0];
  const matched = OPENER_PATTERNS.some(p => p.test(firstLine));
  if (!matched) return [text, false];

  const rest = text.split('\n').slice(1).join('\n');
  const newOpener = 'Preciso tratar um ponto importante.';
  return [rest ? `${newOpener}\n${rest}` : newOpener, true];
}

function addCloserIfNeeded(text: string): [string, boolean] {
  const endsWithPunctuation = /[.!?]$/.test(text.trimEnd());
  if (!endsWithPunctuation) return [text, false];

  // Don't add closer if text already sounds professional
  const alreadyFormal = /aguardo|retorno|posição|atenção$/i.test(text);
  if (alreadyFormal) return [text, false];

  const closer = PROFESSIONAL_CLOSERS[Math.floor(Math.random() * PROFESSIONAL_CLOSERS.length)];
  return [`${text.trimEnd()}\n\n${closer}`, true];
}

export function transformMessage(raw: string): TransformResult {
  if (!raw.trim()) return { transformed: '', changes: [] };

  const changes: string[] = [];
  let text = raw;

  const [afterCaps, capsChanged] = normalizeCaps(text);
  if (capsChanged) changes.push('Palavras em maiúsculo normalizadas');
  text = afterCaps;

  const [afterEmphasis, emphasisChanged] = normalizeEmphasis(text);
  if (emphasisChanged) changes.push('Pontuação excessiva suavizada');
  text = afterEmphasis;

  const [afterWords, wordsChanged] = replaceAggressiveWords(text);
  if (wordsChanged) changes.push('Palavras de impacto reformuladas');
  text = afterWords;

  const [afterOpener, openerChanged] = reframeOpener(text);
  if (openerChanged) changes.push('Abertura reformulada (menos acusatória)');
  text = afterOpener;

  const [afterCloser, closerChanged] = addCloserIfNeeded(text);
  if (closerChanged) changes.push('Encerramento profissional adicionado');
  text = afterCloser;

  return { transformed: text, changes };
}
