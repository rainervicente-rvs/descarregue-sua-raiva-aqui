let ctx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!ctx) ctx = new AudioContext();
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

export function playReleaseSound(intensity: number): void {
  try {
    const ac = getCtx();
    const now = ac.currentTime;
    const vol = 0.25 + (intensity / 100) * 0.5;

    // Low thump — body impact
    const osc = ac.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(130 + intensity * 0.6, now);
    osc.frequency.exponentialRampToValueAtTime(32, now + 0.2);
    const oscGain = ac.createGain();
    oscGain.gain.setValueAtTime(vol, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
    osc.connect(oscGain);
    oscGain.connect(ac.destination);
    osc.start(now);
    osc.stop(now + 0.22);

    // Noise whoosh layered on top
    const bufLen = Math.floor(ac.sampleRate * 0.22);
    const buf = ac.createBuffer(1, bufLen, ac.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufLen; i++) data[i] = Math.random() * 2 - 1;
    const noise = ac.createBufferSource();
    noise.buffer = buf;
    const filt = ac.createBiquadFilter();
    filt.type = 'bandpass';
    filt.frequency.value = 500 + intensity * 9;
    filt.Q.value = 0.55;
    const noiseGain = ac.createGain();
    noiseGain.gain.setValueAtTime(vol * 0.35, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
    noise.connect(filt);
    filt.connect(noiseGain);
    noiseGain.connect(ac.destination);
    noise.start(now);
  } catch {
    // AudioContext blocked or unavailable — silent fail
  }
}

export function playHitSound(): void {
  try {
    const ac = getCtx();
    const now = ac.currentTime;
    const osc = ac.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(190, now);
    osc.frequency.exponentialRampToValueAtTime(65, now + 0.065);
    const gain = ac.createGain();
    gain.gain.setValueAtTime(0.11, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.065);
    osc.connect(gain);
    gain.connect(ac.destination);
    osc.start(now);
    osc.stop(now + 0.075);
  } catch {
    // silent fail
  }
}
