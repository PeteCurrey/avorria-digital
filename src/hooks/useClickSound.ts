import React, { useRef, useCallback } from "react";

// Simple click sound using Web Audio API
export function useClickSound() {
  const audioContextRef = useRef<AudioContext | null>(null);

  const playClick = useCallback((type: "select" | "hover" | "success" | "navigate" = "select") => {
    try {
      // Initialize AudioContext on first use (must be after user interaction)
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext();
      }

      const ctx = audioContextRef.current;
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      // Different sound profiles for different interactions
      switch (type) {
        case "select":
          oscillator.frequency.setValueAtTime(800, ctx.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.05);
          oscillator.type = "sine";
          gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
          oscillator.start(ctx.currentTime);
          oscillator.stop(ctx.currentTime + 0.1);
          break;

        case "hover":
          oscillator.frequency.setValueAtTime(600, ctx.currentTime);
          oscillator.type = "sine";
          gainNode.gain.setValueAtTime(0.03, ctx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
          oscillator.start(ctx.currentTime);
          oscillator.stop(ctx.currentTime + 0.05);
          break;

        case "success":
          // Two-tone success sound
          oscillator.frequency.setValueAtTime(523, ctx.currentTime); // C5
          oscillator.frequency.setValueAtTime(659, ctx.currentTime + 0.1); // E5
          oscillator.frequency.setValueAtTime(784, ctx.currentTime + 0.2); // G5
          oscillator.type = "sine";
          gainNode.gain.setValueAtTime(0.12, ctx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
          oscillator.start(ctx.currentTime);
          oscillator.stop(ctx.currentTime + 0.3);
          break;

        case "navigate":
          oscillator.frequency.setValueAtTime(400, ctx.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.08);
          oscillator.type = "sine";
          gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
          oscillator.start(ctx.currentTime);
          oscillator.stop(ctx.currentTime + 0.12);
          break;
      }
    } catch (error) {
      // Silently fail if audio is not supported
      console.debug("Audio not supported:", error);
    }
  }, []);

  return { playClick };
}

export default useClickSound;
