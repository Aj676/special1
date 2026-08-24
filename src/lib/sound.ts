/**
 * Tiny Web-Audio helper that plays gentle celebratory tones.
 * Everything is generated on the fly so there are no audio files to load,
 * and tones only ever start from a user gesture (browser autoplay policy).
 */

let ctx: AudioContext | null = null;
let muted = false;

export function setMuted(value: boolean) {
  muted = value;
}

export function isMuted() {
  return muted;
}

function getCtx(): AudioContext | null {
  if (muted) return null;
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function tone(
  frequency: number,
  start: number,
  duration: number,
  type: OscillatorType = "sine",
  gainPeak = 0.16,
) {
  const audio = getCtx();
  if (!audio) return;
  const osc = audio.createOscillator();
  const gain = audio.createGain();
  osc.type = type;
  osc.frequency.value = frequency;
  osc.connect(gain);
  gain.connect(audio.destination);

  const t = audio.currentTime + start;
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.exponentialRampToValueAtTime(gainPeak, t + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);

  osc.start(t);
  osc.stop(t + duration + 0.05);
}

/** A bright ascending sparkle. */
export function playSparkle() {
  tone(880, 0, 0.18, "triangle", 0.12);
  tone(1318, 0.06, 0.2, "triangle", 0.1);
}

/** A soft pop for tapping candles / cards. */
export function playPop() {
  tone(523, 0, 0.12, "sine", 0.14);
  tone(784, 0.05, 0.14, "sine", 0.1);
}

/** A cheerful little birthday-style jingle. */
export function playJingle() {
  const notes: [number, number][] = [
    [523, 0],
    [659, 0.16],
    [784, 0.32],
    [1046, 0.48],
    [784, 0.68],
    [1046, 0.84],
  ];
  notes.forEach(([f, t]) => tone(f, t, 0.32, "triangle", 0.16));
}

/** A dreamy, rising chord for the grand finale. */
export function playFinale() {
  tone(392, 0, 1.1, "sine", 0.12);
  tone(523, 0.05, 1.1, "sine", 0.12);
  tone(659, 0.1, 1.1, "sine", 0.12);
  tone(1046, 0.5, 0.9, "triangle", 0.14);
  tone(1318, 0.66, 0.9, "triangle", 0.12);
}
