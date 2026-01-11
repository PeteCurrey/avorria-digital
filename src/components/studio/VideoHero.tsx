import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Volume2, VolumeX } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import heroCityscape from "@/assets/hero-cityscape.jpg";

// Use a reliable external video source - cinematic cityscape timelapse
const FALLBACK_VIDEO_URL = "https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4";

interface VideoHeroProps {
  onEnterStudio?: () => void;
}

export const VideoHero = ({ onEnterStudio }: VideoHeroProps) => {
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [audioLoading, setAudioLoading] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Load and cache audio
  const loadAudio = async () => {
    if (audioLoaded || audioLoading) return;
    
    setAudioLoading(true);
    
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
          body: JSON.stringify({
            prompt: "Cinematic ambient electronic music, dark atmospheric, futuristic city night skyline vibes, subtle tension building, corporate technology feel, slow ethereal pads, 70bpm, no vocals",
            duration: 30,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate audio");
      }

      const data = await response.json();
      
      if (data.audioContent) {
        const audioUrl = `data:audio/mpeg;base64,${data.audioContent}`;
        audioRef.current = new Audio(audioUrl);
        audioRef.current.loop = true;
        audioRef.current.volume = 0.3;
        setAudioLoaded(true);
      }
    } catch (error) {
      console.error("Audio loading error:", error);
    } finally {
      setAudioLoading(false);
    }
  };

  // Handle audio toggle
  const toggleAudio = async () => {
    if (!audioLoaded && !audioLoading) {
      await loadAudio();
    }

    if (audioRef.current) {
      if (audioEnabled) {
        audioRef.current.pause();
      } else {
        await audioRef.current.play();
      }
      setAudioEnabled(!audioEnabled);
    } else if (!audioLoading) {
      // If loading just finished, try to play
      setAudioEnabled(true);
    }
  };

  // Play audio once loaded if toggle was clicked during loading
  useEffect(() => {
    if (audioLoaded && audioEnabled && audioRef.current) {
      audioRef.current.play();
    }
  }, [audioLoaded, audioEnabled]);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleEnterStudio = () => {
    setIsTransitioning(true);
    
    // Fade out audio
    if (audioRef.current && audioEnabled) {
      const fadeOut = setInterval(() => {
        if (audioRef.current && audioRef.current.volume > 0.05) {
          audioRef.current.volume -= 0.05;
        } else {
          clearInterval(fadeOut);
          if (audioRef.current) {
            audioRef.current.pause();
          }
        }
      }, 50);
    }
    
    // Trigger the transition animation, then navigate
    setTimeout(() => {
      if (onEnterStudio) {
        onEnterStudio();
      } else {
        navigate("/web-design/studio/build");
      }
    }, 800);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Video Background */}
      <motion.div
        animate={{
          scale: isTransitioning ? 1.5 : 1,
          filter: isTransitioning ? "blur(20px)" : "blur(0px)",
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="absolute inset-0"
      >
        {/* Poster image shows immediately while video loads */}
        <img 
          src={heroCityscape} 
          alt="" 
          className="absolute inset-0 h-full w-full object-cover"
        />
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          poster={heroCityscape}
        >
          <source src={FALLBACK_VIDEO_URL} type="video/mp4" />
        </video>

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
        
        {/* Radial Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />
        
        {/* Subtle Blue Tint */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-primary/5" />
      </motion.div>

      {/* Animated Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div 
          className="h-full w-full"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--accent) / 0.3) 1px, transparent 1px),
                             linear-gradient(90deg, hsl(var(--accent) / 0.3) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Audio Toggle Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: isTransitioning ? 0 : 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        onClick={toggleAudio}
        disabled={audioLoading}
        className="absolute right-6 top-6 z-20 flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-2 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-black/50"
      >
        {audioLoading ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="h-4 w-4 rounded-full border-2 border-white/20 border-t-white"
          />
        ) : audioEnabled ? (
          <Volume2 className="h-4 w-4 text-accent" />
        ) : (
          <VolumeX className="h-4 w-4 text-white/60" />
        )}
        <span className="text-xs text-white/60">
          {audioLoading ? "Loading..." : audioEnabled ? "Sound On" : "Sound Off"}
        </span>
      </motion.button>

      {/* Hero Content */}
      <motion.div
        animate={{
          opacity: isTransitioning ? 0 : 1,
          y: isTransitioning ? -50 : 0,
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6"
      >
        {/* Premium Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-sm font-light tracking-widest text-accent uppercase">
              Web Design Studio
            </span>
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-6 text-center"
        >
          <span className="block text-5xl font-extralight tracking-tight text-white md:text-7xl lg:text-8xl">
            Build Your
          </span>
          <span className="mt-2 block bg-gradient-to-r from-accent via-white to-accent bg-clip-text text-5xl font-light tracking-tight text-transparent md:text-7xl lg:text-8xl">
            Vision
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mb-12 max-w-xl text-center text-lg font-extralight text-white/70 md:text-xl"
        >
          Configure your perfect website in minutes. Our AI-powered studio crafts 
          a bespoke blueprint tailored to your brand.
        </motion.p>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleEnterStudio}
          className="group relative overflow-hidden rounded-full bg-accent px-10 py-5 text-lg font-medium text-accent-foreground shadow-2xl shadow-accent/30 transition-all duration-300 hover:shadow-accent/50"
        >
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          
          <span className="relative flex items-center gap-3">
            Enter the Studio
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </motion.button>

        {/* Back Link */}
        <motion.a
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          href="/web-design"
          className="mt-6 text-sm text-white/40 transition-colors hover:text-white/60"
        >
          ← Back to Web Design
        </motion.a>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isTransitioning ? 0 : 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-white/40"
        >
          <span className="text-xs font-light tracking-widest uppercase">Enter to begin</span>
          <div className="h-8 w-[1px] bg-gradient-to-b from-white/40 to-transparent" />
        </motion.div>
      </motion.div>

      {/* Transition Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isTransitioning ? 1 : 0 }}
        transition={{ duration: 0.5, delay: isTransitioning ? 0.3 : 0 }}
        className="pointer-events-none absolute inset-0 z-20 bg-black"
      />
    </div>
  );
};

export default VideoHero;
