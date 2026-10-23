/**
 * AzTU 6326A2 — unprompted.cool üslublu Web Audio API SFX Mühərriki
 * Xarici audio fayllarından (mp3/wav) asılı olmadan brauzerdə dərhal və oflayn işləyən sintetik səslər.
 */

let audioCtx: AudioContext | null = null;
let isMuted = false;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function setSfxMuted(muted: boolean) {
  isMuted = muted;
}

export function getSfxMuted(): boolean {
  return isMuted;
}

/**
 * unprompted.cool mexaniki slot çıqqıltısı (Mechanical click ticker)
 * Ağ küy buferi (noise buffer) + bandpass süzgəci + eksponensial sönmə.
 */
export function playTickSound(pitchMultiplier = 1) {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const duration = 0.016; // 16ms kəskin çıqqıltı
  const sampleCount = Math.max(1, Math.floor(ctx.sampleRate * duration));
  const buffer = ctx.createBuffer(1, sampleCount, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < sampleCount; i++) {
    // Təsadüfi amplituda ilə küy zərbəsi
    data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / sampleCount, 1.5);
  }

  const source = ctx.createBufferSource();
  source.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime((2400 + Math.random() * 600) * pitchMultiplier, now);
  filter.Q.value = 1.6;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.001, now);
  gain.gain.exponentialRampToValueAtTime(0.18, now + 0.002);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  source.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  source.start(now);
  source.stop(now + duration + 0.01);
}

/**
 * Slotun dayanması / kilidlənməsi səsi (Reel Lock / Click-Thud)
 */
export function playReelLockSound() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // 1. Zərbə osc
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(320, now);
  osc.frequency.exponentialRampToValueAtTime(80, now + 0.08);

  gain.gain.setValueAtTime(0.25, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.1);

  // 2. Parlaq metalik klik
  playTickSound(1.4);
}

/**
 * Püşk tamamlandıqda zərif akkord səsi (Arrival Chime)
 */
export function playTicketCompleteSound() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const notes = [587.33, 739.99, 880.0]; // D5, F#5, A5 (Major triad)

  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now + idx * 0.06);

    gain.gain.setValueAtTime(0.001, now + idx * 0.06);
    gain.gain.exponentialRampToValueAtTime(0.12, now + idx * 0.06 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 0.5);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + idx * 0.06);
    osc.stop(now + idx * 0.06 + 0.55);
  });
}

/**
 * Bilet təhvil verildikdə və ya cavablar təsdiqləndikdə qısa fanfar
 */
export function playSubmitFanfare() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const chords = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6

  chords.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now + i * 0.05);

    gain.gain.setValueAtTime(0.001, now + i * 0.05);
    gain.gain.exponentialRampToValueAtTime(0.14, now + i * 0.05 + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.05 + 0.6);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + i * 0.05);
    osc.stop(now + i * 0.05 + 0.65);
  });
}
