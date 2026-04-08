'use client';
import React, { useState, useCallback, useRef, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface PreviewConfig {
  purpose: string;
  palette: string;
  density: string;
  energy: string;
}

interface UseStudioPreviewResult {
  previewUrl: string | null;
  isLoading: boolean;
  error: string | null;
  generatePreview: (config: PreviewConfig) => Promise<void>;
}

// Cache for generated previews
const previewCache = new Map<string, string>();

export function useStudioPreview(): UseStudioPreviewResult {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Generate cache key from config
  const getCacheKey = (config: PreviewConfig): string => {
    return `${config.purpose}-${config.palette}-${config.density}-${config.energy}`;
  };

  const generatePreview = useCallback(async (config: PreviewConfig) => {
    // Clear any pending debounce
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Cancel any in-flight request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Check cache first
    const cacheKey = getCacheKey(config);
    const cachedUrl = previewCache.get(cacheKey);
    if (cachedUrl) {
      setPreviewUrl(cachedUrl);
      return;
    }

    // Debounce the actual API call
    debounceRef.current = setTimeout(async () => {
      setIsLoading(true);
      setError(null);

      abortControllerRef.current = new AbortController();

      try {
        const { data, error: fnError } = await supabase.functions.invoke(
          "generate-studio-preview",
          {
            body: config,
          }
        );

        if (fnError) throw fnError;

        if (data?.imageUrl) {
          previewCache.set(cacheKey, data.imageUrl);
          setPreviewUrl(data.imageUrl);
        } else if (data?.fallback) {
          // Use fallback image based on config
          setError("Preview generation unavailable");
        } else if (data?.error) {
          setError(data.error);
        }
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          return; // Ignore aborted requests
        }
        console.error("Preview generation error:", err);
        setError(err instanceof Error ? err.message : "Failed to generate preview");
      } finally {
        setIsLoading(false);
      }
    }, 1000); // Debounce for 1 second
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    previewUrl,
    isLoading,
    error,
    generatePreview,
  };
}


