import { useState, useEffect, useRef, useCallback } from "react";

// Step soundscape configurations
export const STEP_SOUNDSCAPES = [
  {
    step: 0,
    name: "Inspiring",
    prompt: "Expansive electronic atmosphere, rising synthesizer pads, hopeful and inspiring ambient music, gentle energy building",
  },
  {
    step: 1,
    name: "Artistic",
    prompt: "Creative studio ambience, soft brush strokes, artistic electronic textures, contemplative and beautiful",
  },
  {
    step: 2,
    name: "Structured",
    prompt: "Architectural electronic soundscape, precise rhythmic elements, building blocks, organised and clear",
  },
  {
    step: 3,
    name: "Progressive",
    prompt: "Dynamic digital interface sounds, subtle technological pulses, forward motion, innovative atmosphere",
  },
  {
    step: 4,
    name: "Personal",
    prompt: "Warm human connection, organic textures with electronics, conversational ambient tones, friendly and approachable",
  },
  {
    step: 5,
    name: "Accomplished",
    prompt: "Calm completion sounds, gentle celebration, peaceful resolution, satisfied and accomplished feeling",
  },
];

// Soundscape theme presets
export const SOUNDSCAPE_THEMES: Record<string, { label: string; description: string; prompt: string }> = {
  auto: { label: "Auto (Step-Based)", description: "Changes with each wizard step", prompt: "" },
  cyberpunk: { label: "Cyberpunk Nightscape", description: "Neon city, rain, electronic hum", prompt: "Cyberpunk city rain, neon buzzing, distant synth bass, dark electronic atmosphere, blade runner ambience" },
  zen: { label: "Zen Garden", description: "Water, wind chimes, calm", prompt: "Japanese zen garden, gentle water fountain, sparse wind chimes, meditative calm, bamboo rustling" },
  lofi: { label: "Late Night Creative", description: "Lo-fi rain, vinyl crackle, cosy", prompt: "Late night studio, rain on windows, soft vinyl crackle, lo-fi warmth, distant jazz piano, creative flow" },
  space: { label: "Space Station", description: "Deep hums, satellite pings", prompt: "Space station observatory, deep cosmic hum, distant satellite pings, weightless atmosphere, sci-fi ambient" },
  highrise: { label: "High-Rise Studio", description: "Urban wind, soft typing", prompt: "High-rise creative studio, soft wind on glass, subtle keyboard typing, modern office calm, city below" },
};

interface CachedAudio {
  audioUrl: string;
  audioElement: HTMLAudioElement;
}

interface UseStepBasedAudioOptions {
  volume?: number;
  crossfadeDuration?: number;
  soundscapeTheme?: string;
}

interface UseStepBasedAudioReturn {
  isPlaying: boolean;
  isLoading: boolean;
  toggle: () => void;
  currentMood: string;
}

export function useStepBasedAudio(
  currentStep: number,
  options: UseStepBasedAudioOptions = {}
): UseStepBasedAudioReturn {
  const { volume = 0.3, crossfadeDuration = 1000, soundscapeTheme = "auto" } = options;
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  
  const audioCacheRef = useRef<Map<string, CachedAudio>>(new Map());
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const isGeneratingRef = useRef<Set<string>>(new Set());
  const volumeRef = useRef(volume);
  const isPlayingRef = useRef(false);
  const activeThemeRef = useRef(soundscapeTheme);
  
  // Keep refs in sync
  useEffect(() => {
    volumeRef.current = volume;
    if (currentAudioRef.current && isPlayingRef.current) {
      currentAudioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Build a cache key based on theme and step
  const getCacheKey = useCallback((theme: string, step: number): string => {
    return theme === "auto" ? `auto-${step}` : theme;
  }, []);

  // Get the prompt for a given theme+step
  const getPrompt = useCallback((theme: string, step: number): string => {
    if (theme === "auto") {
      return STEP_SOUNDSCAPES[step]?.prompt || "";
    }
    return SOUNDSCAPE_THEMES[theme]?.prompt || "";
  }, []);

  const getCurrentMood = useCallback(() => {
    if (soundscapeTheme !== "auto") {
      return SOUNDSCAPE_THEMES[soundscapeTheme]?.label || "Ambient";
    }
    return STEP_SOUNDSCAPES[currentStep]?.name || "Ambient";
  }, [currentStep, soundscapeTheme]);

  // Generate audio for a specific cache key
  const generateAudio = useCallback(async (cacheKey: string, prompt: string): Promise<CachedAudio | null> => {
    const cached = audioCacheRef.current.get(cacheKey);
    if (cached) return cached;

    if (isGeneratingRef.current.has(cacheKey)) return null;
    if (!prompt) return null;

    isGeneratingRef.current.add(cacheKey);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/studio-ambient-music`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ prompt, duration: 22 }),
        }
      );

      if (!response.ok) {
        throw new Error(`Audio generation failed: ${response.status}`);
      }

      const data = await response.json();
      const audioUrl = `data:audio/mpeg;base64,${data.audioContent}`;
      
      const audioElement = new Audio(audioUrl);
      audioElement.loop = true;
      audioElement.volume = 0;

      const cachedAudio: CachedAudio = { audioUrl, audioElement };
      audioCacheRef.current.set(cacheKey, cachedAudio);
      
      return cachedAudio;
    } catch (error) {
      console.error(`Failed to generate audio for ${cacheKey}:`, error);
      return null;
    } finally {
      isGeneratingRef.current.delete(cacheKey);
    }
  }, []);

  // Crossfade to a new cache key
  const crossfadeTo = useCallback(async (cacheKey: string, prompt: string) => {
    const oldAudio = currentAudioRef.current;
    const targetVolume = volumeRef.current;
    
    let newCached = audioCacheRef.current.get(cacheKey);
    if (!newCached) {
      setIsLoading(true);
      newCached = await generateAudio(cacheKey, prompt);
      setIsLoading(false);
    }
    
    if (!newCached) return;
    
    const newAudio = newCached.audioElement;
    newAudio.volume = 0;
    newAudio.currentTime = 0;
    
    try {
      await newAudio.play();
    } catch (error) {
      console.error("Failed to play audio:", error);
      return;
    }
    
    currentAudioRef.current = newAudio;
    
    const startTime = performance.now();
    const fadeStep = () => {
      const elapsed = performance.now() - startTime;
      const progress = Math.min(elapsed / crossfadeDuration, 1);
      
      if (oldAudio && oldAudio !== newAudio) {
        oldAudio.volume = targetVolume * (1 - progress);
      }
      newAudio.volume = targetVolume * progress;
      
      if (progress < 1) {
        requestAnimationFrame(fadeStep);
      } else {
        if (oldAudio && oldAudio !== newAudio) {
          oldAudio.pause();
          oldAudio.volume = 0;
        }
      }
    };
    
    requestAnimationFrame(fadeStep);
  }, [crossfadeDuration, generateAudio]);

  // Pre-generate next step's audio (only relevant in auto mode)
  const preGenerateNext = useCallback((theme: string, step: number) => {
    if (theme !== "auto") return;
    const nextStep = step + 1;
    if (nextStep < STEP_SOUNDSCAPES.length) {
      const key = getCacheKey(theme, nextStep);
      if (!audioCacheRef.current.has(key)) {
        generateAudio(key, getPrompt(theme, nextStep));
      }
    }
  }, [generateAudio, getCacheKey, getPrompt]);

  // Handle step changes (only matters in auto mode)
  useEffect(() => {
    if (!isPlayingRef.current || soundscapeTheme !== "auto") return;
    
    const key = getCacheKey("auto", currentStep);
    const currentKey = activeStep !== null ? getCacheKey("auto", activeStep) : null;
    
    if (currentKey !== null && currentKey !== key) {
      crossfadeTo(key, getPrompt("auto", currentStep));
      setActiveStep(currentStep);
    }
    
    preGenerateNext("auto", currentStep);
  }, [currentStep, activeStep, soundscapeTheme, crossfadeTo, preGenerateNext, getCacheKey, getPrompt]);

  // Handle theme changes while playing
  useEffect(() => {
    if (!isPlayingRef.current) {
      activeThemeRef.current = soundscapeTheme;
      return;
    }
    
    if (activeThemeRef.current === soundscapeTheme) return;
    activeThemeRef.current = soundscapeTheme;
    
    const key = getCacheKey(soundscapeTheme, currentStep);
    const prompt = getPrompt(soundscapeTheme, currentStep);
    crossfadeTo(key, prompt);
    setActiveStep(currentStep);
  }, [soundscapeTheme, currentStep, crossfadeTo, getCacheKey, getPrompt]);

  // Toggle playback
  const toggle = useCallback(async () => {
    if (isPlaying) {
      const currentAudio = currentAudioRef.current;
      if (currentAudio) {
        const startVolume = currentAudio.volume;
        const startTime = performance.now();
        const fadeOut = () => {
          const elapsed = performance.now() - startTime;
          const progress = Math.min(elapsed / 500, 1);
          currentAudio.volume = startVolume * (1 - progress);
          if (progress < 1) {
            requestAnimationFrame(fadeOut);
          } else {
            currentAudio.pause();
          }
        };
        requestAnimationFrame(fadeOut);
      }
      setIsPlaying(false);
      setActiveStep(null);
    } else {
      const key = getCacheKey(soundscapeTheme, currentStep);
      const prompt = getPrompt(soundscapeTheme, currentStep);
      
      setIsLoading(true);
      const cached = await generateAudio(key, prompt);
      setIsLoading(false);
      
      if (cached) {
        cached.audioElement.volume = volumeRef.current;
        cached.audioElement.currentTime = 0;
        try {
          await cached.audioElement.play();
          currentAudioRef.current = cached.audioElement;
          setActiveStep(currentStep);
          setIsPlaying(true);
          preGenerateNext(soundscapeTheme, currentStep);
        } catch (error) {
          console.error("Failed to start audio:", error);
        }
      }
    }
  }, [isPlaying, currentStep, soundscapeTheme, generateAudio, preGenerateNext, getCacheKey, getPrompt]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      audioCacheRef.current.forEach(({ audioElement }) => {
        audioElement.pause();
        audioElement.src = "";
      });
      audioCacheRef.current.clear();
    };
  }, []);

  return {
    isPlaying,
    isLoading,
    toggle,
    currentMood: getCurrentMood(),
  };
}
