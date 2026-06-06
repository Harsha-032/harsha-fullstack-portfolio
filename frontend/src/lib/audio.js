class AudioManager {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.isUnlocked = false;
    if (typeof window !== 'undefined') {
      const unlock = () => {
        if (this.isUnlocked) return;

        this.init();

        if (this.ctx) {
          if (this.ctx.state === 'suspended') {
            this.ctx.resume().catch(() => {});
          }

          // Force play a silent sound to unlock the audio engine on iOS/Mobile
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          gain.gain.value = 0;
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(0);
          osc.stop(0.001);

          // Once running, remove listeners
          setTimeout(() => {
            if (this.ctx?.state === 'running') {
              this.isUnlocked = true;
              window.removeEventListener('touchstart', unlock, true);
              window.removeEventListener('touchend', unlock, true);
              window.removeEventListener('click', unlock, true);
              window.removeEventListener('keydown', unlock, true);
            }
          }, 50);
        }
      };

      // Ensure we catch early events (capture phase)
      window.addEventListener('touchstart', unlock, { capture: true, passive: true });
      window.addEventListener('touchend', unlock, { capture: true, passive: true });
      window.addEventListener('click', unlock, { capture: true, passive: true });
      window.addEventListener('keydown', unlock, { capture: true, passive: true });
    }
  }

  init() {
    if (!this.ctx) {
      try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioContextClass();
        this.masterGain = this.ctx.createGain();
        // Set higher master gain for mobile compatibility
        this.masterGain.gain.value = 1.0;
        this.masterGain.connect(this.ctx.destination);
      } catch (e) {
        console.error("Web Audio API not supported", e);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  playClick(freq = 600, type = 'sine', duration = 0.05, vol = 0.1) {
    this.init();
    if (!this.ctx || !this.masterGain || this.ctx.state !== 'running') return;

    const osc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    // Very slight pitch drop sounds more natural and less like a beep
    osc.frequency.exponentialRampToValueAtTime(freq * 0.9, this.ctx.currentTime + duration);

    // Gentler envelope string to remove harsh clicks/pops
    const attackTime = Math.min(0.02, duration * 0.2);
    gainNode.gain.setValueAtTime(0, this.ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(vol * 1.5, this.ctx.currentTime + attackTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

    // Additional lowpass filter to completely smooth the tone and remove any irritating high-frequencies
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(Math.min(freq * 1.5, 2000), this.ctx.currentTime);
    filter.Q.value = 0.5;

    osc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.masterGain);

    osc.start(this.ctx.currentTime);
    osc.stop(this.ctx.currentTime + duration + 0.1); // let the release trail naturally
  }

  playDotClick() {
    this.playClick(400, 'sine', 0.12, 0.1);
  }

  playHover() {
    // Avoid excessive playback overlay on touch if state isn't pristine
    if (this.ctx && this.ctx.state !== 'running') return;
    this.playClick(500, 'sine', 0.06, 0.03);
  }

  playTerminalClick() {
    this.playClick(300, 'sine', 0.15, 0.1);
  }

  playTransition() {
    this.playClick(200, 'sine', 0.25, 0.15);
  }
}

export const audio = new AudioManager();
