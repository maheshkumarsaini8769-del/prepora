// Audio & Haptic Feedback System using Web Audio API (Zero external assets required)

class AudioManager {
  private audioCtx: AudioContext | null = null;
  private isMuted: boolean = false;

  constructor() {
    this.isMuted = localStorage.getItem('prepora_sound_enabled') === 'false';
  }

  private getAudioContext(): AudioContext | null {
    if (this.isMuted) return null;
    try {
      if (!this.audioCtx) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioContextClass) {
          this.audioCtx = new AudioContextClass();
        }
      }
      if (this.audioCtx && this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
      return this.audioCtx;
    } catch {
      return null;
    }
  }

  public isSoundEnabled(): boolean {
    return !this.isMuted;
  }

  public toggleSound(enabled?: boolean): boolean {
    if (enabled !== undefined) {
      this.isMuted = !enabled;
    } else {
      this.isMuted = !this.isMuted;
    }
    localStorage.setItem('prepora_sound_enabled', this.isMuted ? 'false' : 'true');
    return !this.isMuted;
  }

  public vibrate(pattern: number | number[] = 25): void {
    try {
      if (typeof window !== 'undefined' && 'navigator' in window && navigator.vibrate) {
        navigator.vibrate(pattern);
      }
    } catch {
      // Ignore vibration errors if restricted by device policy
    }
  }

  // Soft subtle click sound for buttons / toggles
  public playClick(): void {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.04);
      this.vibrate(10);
    } catch {
      // Ignore audio synthesis errors
    }
  }

  // Celebratory Ding for correct answer or task completion
  public playSuccess(): void {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      // Tone 1: 587.33 Hz (D5)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(587.33, now);
      gain1.gain.setValueAtTime(0.12, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.2);

      // Tone 2: 880 Hz (A5)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(880, now + 0.09);
      gain2.gain.setValueAtTime(0.15, now + 0.09);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.09);
      osc2.stop(now + 0.35);

      this.vibrate([20, 40, 20]);
    } catch {
      // Ignore audio synthesis errors
    }
  }

  // Major Triad Fanfare for Streak / Goal milestones
  public playStreakCelebration(): void {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      const now = ctx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = now + idx * 0.09;
        const duration = idx === notes.length - 1 ? 0.45 : 0.15;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.12, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(start);
        osc.stop(start + duration);
      });

      this.vibrate([30, 50, 40, 80]);
    } catch {
      // Ignore audio synthesis errors
    }
  }
}

export const soundFeedback = new AudioManager();
