'use client';
import { useState, useRef, useCallback } from "react";

interface UseGeneratedAmbientAudioReturn {
  isPlaying: boolean;
  isLoading: boolean;
  error: string | null;
  toggle: () => void;
  play: () => Promise<void>;
  pause: () => void;
}

/**
 * Hook for managing AI-generated ambient audio via edge function
 * Caches generated audio in memory to avoid re-generation on toggle
 */
export function useGeneratedAmbientAudio(volume = 0.4): UseGeneratedAmbientAudioReturn {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUrlRef = useRef<string | null>(null);

  const generateAudio = async (): Promise<string> => {
    if (audioUrlRef.current) return audioUrlRef.current;
    
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Supabase environment variables are missing");
    }

    const response = await fetch(`${supabaseUrl}/functions/v1/studio-ambient-music`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": supabaseKey,
        "Authorization": `Bearer ${supabaseKey}`,
      },
      body: JSON.stringify({
        prompt: "Deep cinematic ambient technology atmosphere, futuristic floating textures, high-end professional digital agency background music, subtle movement",
        duration: 30
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Audio generation failed: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error);
    }

    if (!data.audioContent) {
      throw new Error("No audio content received");
    }

    // Create data URI from base64 audio
    const audioUrl = `data:audio/mpeg;base64,${data.audioContent}`;
    audioUrlRef.current = audioUrl;
    
    return audioUrl;
  };

  const play = useCallback(async () => {
    try {
      setError(null);
      setIsLoading(true);

      const audioUrl = await generateAudio();

      // Create or reuse audio element
      if (!audioRef.current) {
        audioRef.current = new Audio(audioUrl);
        audioRef.current.loop = true;
        audioRef.current.volume = volume;
      }

      await audioRef.current.play();
      setIsPlaying(true);
    } catch (err) {
      console.error("Failed to play generated audio:", err);
      setError(err instanceof Error ? err.message : "Failed to generate audio");
      setIsPlaying(false);
    } finally {
      setIsLoading(false);
    }
  }, [volume]);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  return {
    isPlaying,
    isLoading,
    error,
    toggle,
    play,
    pause,
  };
}

export default useGeneratedAmbientAudio;


