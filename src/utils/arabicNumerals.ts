/**
 * Utilities for Eastern Arabic Numerals (٠، ١، ٢، ٣، ٤، ٥، ٦، ٧، ٨، ٩)
 * and Classroom Sound Synthesis.
 */

const EASTERN_ARABIC_DIGITS: string[] = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

export function toArabicNumerals(num: number | string): string {
  const str = String(num);
  return str.replace(/[0-9]/g, (digit) => EASTERN_ARABIC_DIGITS[parseInt(digit, 10)]);
}

export function formatTimeInArabic(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const minsStr = mins < 10 ? `0${mins}` : `${mins}`;
  const secsStr = secs < 10 ? `0${secs}` : `${secs}`;
  return `${toArabicNumerals(minsStr)}:${toArabicNumerals(secsStr)}`;
}

/**
 * Web Audio API synthesized gentle school bell / chime.
 * No external mp3 dependency ensures 100% offline reliability.
 */
export function playChimeSound(): void {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    const now = ctx.currentTime;
    
    // Two-tone pleasant marimba/chime
    const tones = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    tones.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.12);

      gain.gain.setValueAtTime(0.2, now + idx * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.12);
      osc.stop(now + idx * 0.12 + 0.85);
    });
  } catch (err) {
    console.error('Audio playback error', err);
  }
}
