'use client';
import { useState, useEffect, useRef, useCallback } from "react";

// Step soundscape configurations
const STEP_SOUNDSCAPES = [
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

interface CachedAudio {
  audioUrl: string;
  audioElement: HTMLAudioElement;
}

interface UseStepBasedAudioOptions {
  volume?: number;
  crossfadeDuration?: number;
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
  const { volume = 0.3, crossfadeDuration = 1000 } = options;
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  
  const audioCacheRef = useRef<Map<number, CachedAudio>>(new Map());
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const isGeneratingRef = useRef<Set<number>>(new Set());
  const volumeRef = useRef(volume);
  const isPlayingRef = useRef(false);
  
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

  const getCurrentMood = useCallback(() => {
    const soundscape = STEP_SOUNDSCAPES[currentStep];
    return soundscape?.name || "Ambient";
  }, [currentStep]);

  // Generate audio for a specific step
  const generateAudioForStep = useCallback(async (step: number): Promise<CachedAudio | null> => {
    // Check cache first
    const cached = audioCacheRef.current.get(step);
    if (cached) return cached;

    // Check if already generating
    if (isGeneratingRef.current.has(step)) return null;

    const soundscape = STEP_SOUNDSCAPES[step];
    if (!soundscape) return null;

    isGeneratingRef.current.add(step);

    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      
      const response = await fetch(
        `${supabaseUrl}/functions/v1/studio-ambient-music`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: supabaseKey || "",
            Authorization: `Bearer ${supabaseKey || ""}`,
          },
          body: JSON.stringify({ 
            prompt: soundscape.prompt,
            duration: 22 // Maximum duration for sound effects
          }),
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
      audioCacheRef.current.set(step, cachedAudio);
      
      return cachedAudio;
    } catch (error) {
      console.error(`Failed to generate audio for step ${step}:`, error);
      return null;
    } finally {
      isGeneratingRef.current.delete(step);
    }
  }, []);

  // Crossfade between audio tracks
  const crossfadeTo = useCallback(async (newStep: number) => {
    const oldAudio = currentAudioRef.current;
    const targetVolume = volumeRef.current;
    
    // Get or generate new audio
    let newCached = audioCacheRef.current.get(newStep);
    if (!newCached) {
      setIsLoading(true);
      newCached = await generateAudioForStep(newStep);
      setIsLoading(false);
    }
    
    if (!newCached) return;
    
    const newAudio = newCached.audioElement;
    
    // Start new audio at volume 0
    newAudio.volume = 0;
    newAudio.currentTime = 0;
    
    try {
      if (typeof window !== 'undefined') {
        await newAudio.play();
      }
    } catch (error) {
      console.error("Failed to play audio:", error);
      return;
    }
    
    currentAudioRef.current = newAudio;
    setActiveStep(newStep);
    
    // Crossfade animation
    const startTime = performance.now();
    const fadeStep = () => {
      const elapsed = performance.now() - startTime;
      const progress = Math.min(elapsed / crossfadeDuration, 1);
      
      // Fade out old audio
      if (oldAudio && oldAudio !== newAudio) {
        oldAudio.volume = targetVolume * (1 - progress);
      }
      
      // Fade in new audio
      newAudio.volume = targetVolume * progress;
      
      if (progress < 1) {
        requestAnimationFrame(fadeStep);
      } else {
        // Cleanup old audio
        if (oldAudio && oldAudio !== newAudio) {
          oldAudio.pause();
          oldAudio.volume = 0;
        }
      }
    };
    
    requestAnimationFrame(fadeStep);
  }, [crossfadeDuration, generateAudioForStep]);

  // Pre-generate next step's audio
  const preGenerateNext = useCallback((step: number) => {
    const nextStep = step + 1;
    if (nextStep < STEP_SOUNDSCAPES.length && !audioCacheRef.current.has(nextStep)) {
      // Generate in background, don't await
      generateAudioForStep(nextStep);
    }
  }, [generateAudioForStep]);

  // Handle step changes
  useEffect(() => {
    if (!isPlayingRef.current) return;
    
    // Only crossfade if step actually changed and we're playing
    if (activeStep !== null && activeStep !== currentStep) {
      crossfadeTo(currentStep);
    }
    
    // Pre-generate next step
    preGenerateNext(currentStep);
  }, [currentStep, activeStep, crossfadeTo, preGenerateNext]);

  // Toggle playback
  const toggle = useCallback(async () => {
    if (isPlaying) {
      // Stop all audio
      const currentAudio = currentAudioRef.current;
      if (currentAudio) {
        // Fade out
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
      // Start playing current step
      setIsLoading(true);
      const cached = await generateAudioForStep(currentStep);
      setIsLoading(false);
      
      if (cached) {
        cached.audioElement.volume = volumeRef.current;
        cached.audioElement.currentTime = 0;
        try {
          if (typeof window !== 'undefined') {
            await cached.audioElement.play();
          }
          currentAudioRef.current = cached.audioElement;
          setActiveStep(currentStep);
          setIsPlaying(true);
          
          // Pre-generate next step
          preGenerateNext(currentStep);
        } catch (error) {
          console.error("Failed to start audio:", error);
        }
      }
    }
  }, [isPlaying, currentStep, generateAudioForStep, preGenerateNext]);

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

