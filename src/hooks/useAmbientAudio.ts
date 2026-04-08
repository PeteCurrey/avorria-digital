'use client';
import React, { useState, useRef, useEffect, useCallback } from "react";

interface UseAmbientAudioOptions {
  src: string;
  volume?: number;
  loop?: boolean;
}

interface UseAmbientAudioReturn {
  isPlaying: boolean;
  isLoading: boolean;
  toggle: () => void;
  play: () => Promise<void>;
  pause: () => void;
  setVolume: (volume: number) => void;
}

/**
 * Hook for managing ambient audio playback
 * Uses static audio files for reliability (no API calls)
 */
export function useAmbientAudio({
  src,
  volume = 0.4,
  loop = true,
}: UseAmbientAudioOptions): UseAmbientAudioReturn {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = loop;
    audio.volume = volume;
    audio.preload = "auto";
    audioRef.current = audio;

    // Handle loading states
    const handleCanPlay = () => setIsLoading(false);
    const handleLoadStart = () => setIsLoading(true);
    const handleEnded = () => {
      if (!loop) setIsPlaying(false);
    };
    const handleError = (e: Event) => {
      console.error("Audio error:", e);
      setIsLoading(false);
      setIsPlaying(false);
    };

    audio.addEventListener("canplaythrough", handleCanPlay);
    audio.addEventListener("loadstart", handleLoadStart);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("canplaythrough", handleCanPlay);
      audio.removeEventListener("loadstart", handleLoadStart);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
      audio.pause();
      audioRef.current = null;
    };
  }, [src, loop, volume]);

  const play = useCallback(async () => {
    if (!audioRef.current) return;
    
    try {
      setIsLoading(true);
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      console.error("Failed to play audio:", error);
      // Handle autoplay restrictions gracefully
      if (error instanceof Error && error.name === "NotAllowedError") {
        console.log("Autoplay blocked - user interaction required");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const pause = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  const setVolume = useCallback((newVolume: number) => {
    if (!audioRef.current) return;
    audioRef.current.volume = Math.max(0, Math.min(1, newVolume));
  }, []);

  return {
    isPlaying,
    isLoading,
    toggle,
    play,
    pause,
    setVolume,
  };
}

export default useAmbientAudio;

