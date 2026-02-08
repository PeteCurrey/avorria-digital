import { useRef, useCallback } from "react";

export type SoundType = 
  | "select" 
  | "hover" 
  | "success" 
  | "navigate" 
  | "whoosh" 
  | "chime" 
  | "tick" 
  | "celebration";

// Premium sound effects using Web Audio API
export function useClickSound() {
  const audioContextRef = useRef<AudioContext | null>(null);

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }
    return audioContextRef.current;
  }, []);

  const playClick = useCallback((type: SoundType = "select", volume: number = 1) => {
    try {
      const ctx = getAudioContext();
      const masterGain = ctx.createGain();
      masterGain.connect(ctx.destination);
      masterGain.gain.value = volume;

      switch (type) {
        case "select":
          playSelect(ctx, masterGain);
          break;

        case "hover":
          playHover(ctx, masterGain);
          break;

        case "success":
          playSuccess(ctx, masterGain);
          break;

        case "navigate":
          playNavigate(ctx, masterGain);
          break;

        case "whoosh":
          playWhoosh(ctx, masterGain);
          break;

        case "chime":
          playChime(ctx, masterGain);
          break;

        case "tick":
          playTick(ctx, masterGain);
          break;

        case "celebration":
          playCelebration(ctx, masterGain);
          break;
      }
    } catch (error) {
      // Silently fail if audio is not supported
      console.debug("Audio not supported:", error);
    }
  }, [getAudioContext]);

  return { playClick };
}

// Simple select sound
function playSelect(ctx: AudioContext, destination: GainNode) {
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(destination);

  oscillator.frequency.setValueAtTime(800, ctx.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.05);
  oscillator.type = "sine";
  gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
  
  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + 0.1);
}

// Subtle hover sound
function playHover(ctx: AudioContext, destination: GainNode) {
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(destination);

  oscillator.frequency.setValueAtTime(600, ctx.currentTime);
  oscillator.type = "sine";
  gainNode.gain.setValueAtTime(0.03, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
  
  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + 0.05);
}

// Two-tone success sound
function playSuccess(ctx: AudioContext, destination: GainNode) {
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(destination);

  oscillator.frequency.setValueAtTime(523, ctx.currentTime); // C5
  oscillator.frequency.setValueAtTime(659, ctx.currentTime + 0.1); // E5
  oscillator.frequency.setValueAtTime(784, ctx.currentTime + 0.2); // G5
  oscillator.type = "sine";
  gainNode.gain.setValueAtTime(0.12, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
  
  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + 0.3);
}

// Navigation sound
function playNavigate(ctx: AudioContext, destination: GainNode) {
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(destination);

  oscillator.frequency.setValueAtTime(400, ctx.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.08);
  oscillator.type = "sine";
  gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
  
  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + 0.12);
}

// Soft whoosh for step transitions - filtered noise sweep
function playWhoosh(ctx: AudioContext, destination: GainNode) {
  const duration = 0.15;
  const bufferSize = ctx.sampleRate * duration;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  
  // Create white noise
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  
  // Low-pass filter for softer sound
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(2000, ctx.currentTime);
  filter.frequency.exponentialRampToValueAtTime(500, ctx.currentTime + duration);
  
  const gainNode = ctx.createGain();
  gainNode.gain.setValueAtTime(0, ctx.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.03);
  gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
  
  noise.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(destination);
  
  noise.start(ctx.currentTime);
  noise.stop(ctx.currentTime + duration);
}

// Gentle chime for selections - layered harmonics
function playChime(ctx: AudioContext, destination: GainNode) {
  const fundamentalFreq = 523; // C5
  const frequencies = [
    fundamentalFreq,           // Fundamental
    fundamentalFreq * 2,       // Octave
    fundamentalFreq * 1.5,     // Perfect fifth
  ];
  
  frequencies.forEach((freq, index) => {
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(destination);
    
    oscillator.frequency.setValueAtTime(freq, ctx.currentTime);
    oscillator.type = "sine";
    
    // Slight delay for each harmonic layer
    const startDelay = index * 0.01;
    const attackTime = 0.02;
    const decayTime = 0.18;
    
    gainNode.gain.setValueAtTime(0, ctx.currentTime + startDelay);
    gainNode.gain.linearRampToValueAtTime(0.05, ctx.currentTime + startDelay + attackTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + startDelay + attackTime + decayTime);
    
    oscillator.start(ctx.currentTime + startDelay);
    oscillator.stop(ctx.currentTime + startDelay + attackTime + decayTime + 0.01);
  });
}

// Quick tick for checkboxes and sliders
function playTick(ctx: AudioContext, destination: GainNode) {
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(destination);

  oscillator.frequency.setValueAtTime(1200, ctx.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.03);
  oscillator.type = "sine";
  
  // Very fast attack and decay
  gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
  
  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + 0.05);
}

// Celebratory ascending arpeggio for success/completion
function playCelebration(ctx: AudioContext, destination: GainNode) {
  // C major arpeggio ascending to the octave
  const notes = [
    { freq: 523, time: 0 },      // C5
    { freq: 659, time: 0.08 },   // E5
    { freq: 784, time: 0.16 },   // G5
    { freq: 1047, time: 0.24 },  // C6
  ];
  
  notes.forEach(({ freq, time }) => {
    // Main tone
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(destination);
    
    oscillator.frequency.setValueAtTime(freq, ctx.currentTime + time);
    oscillator.type = "sine";
    
    gainNode.gain.setValueAtTime(0, ctx.currentTime + time);
    gainNode.gain.linearRampToValueAtTime(0.1, ctx.currentTime + time + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + time + 0.25);
    
    oscillator.start(ctx.currentTime + time);
    oscillator.stop(ctx.currentTime + time + 0.3);
    
    // Add subtle shimmer (octave above, quieter)
    const shimmer = ctx.createOscillator();
    const shimmerGain = ctx.createGain();
    
    shimmer.connect(shimmerGain);
    shimmerGain.connect(destination);
    
    shimmer.frequency.setValueAtTime(freq * 2, ctx.currentTime + time);
    shimmer.type = "sine";
    
    shimmerGain.gain.setValueAtTime(0, ctx.currentTime + time);
    shimmerGain.gain.linearRampToValueAtTime(0.03, ctx.currentTime + time + 0.02);
    shimmerGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + time + 0.2);
    
    shimmer.start(ctx.currentTime + time);
    shimmer.stop(ctx.currentTime + time + 0.25);
  });
}

export default useClickSound;
