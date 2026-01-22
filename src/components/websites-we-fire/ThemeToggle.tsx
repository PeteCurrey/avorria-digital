import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { trackEvent } from "@/lib/tracking";

const badStyles = `
  .fired-mode {
    font-family: 'Comic Sans MS', 'Papyrus', cursive !important;
  }
  .fired-mode h1, .fired-mode h2, .fired-mode h3 {
    color: #ff00ff !important;
    text-shadow: 2px 2px 0 #00ff00, -2px -2px 0 #ff0000 !important;
  }
  .fired-mode button {
    background: linear-gradient(45deg, #ff00ff, #00ffff, #ffff00) !important;
    animation: rainbow 1s infinite !important;
  }
  @keyframes rainbow {
    0% { filter: hue-rotate(0deg); }
    100% { filter: hue-rotate(360deg); }
  }
  .fired-mode .blink {
    animation: blink-animation 0.5s steps(2, start) infinite !important;
  }
  @keyframes blink-animation {
    to { visibility: hidden; }
  }
  .fired-mode img {
    border: 5px dashed #ff00ff !important;
  }
  .fired-mode a {
    color: #0000ff !important;
    text-decoration: underline !important;
  }
  .fired-visitor-counter {
    position: fixed;
    bottom: 80px;
    left: 20px;
    background: #000;
    color: #0f0;
    font-family: 'Courier New', monospace;
    padding: 10px;
    border: 2px solid #0f0;
    z-index: 9999;
  }
  .fired-construction {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9998;
    pointer-events: none;
  }
  .fired-marquee {
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    background: #ffff00;
    color: #ff0000;
    font-weight: bold;
    padding: 10px;
    z-index: 9997;
    overflow: hidden;
  }
  .fired-marquee span {
    display: inline-block;
    animation: marquee 10s linear infinite;
  }
  @keyframes marquee {
    from { transform: translateX(100%); }
    to { transform: translateX(-100%); }
  }
`;

const ThemeToggle: React.FC = () => {
  const [isFiredMode, setIsFiredMode] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);

  const enableFiredMode = useCallback(() => {
    setIsFiredMode(true);
    setTimeRemaining(10);
    document.body.classList.add("fired-mode");
    
    trackEvent("theme_toggle_clicked", { mode: "fired" });

    toast.warning("🔥 You're now experiencing a 'Fired' website!", {
      description: "This is what your visitors might be suffering through.",
      duration: 3000,
    });
  }, []);

  const disableFiredMode = useCallback(() => {
    setIsFiredMode(false);
    setTimeRemaining(0);
    document.body.classList.remove("fired-mode");

    trackEvent("theme_toggle_reverted", { duration_seconds: 10 - timeRemaining });

    toast.success("Phew! Back to normal 😅", {
      description: "Premium design matters, doesn't it?",
      duration: 3000,
    });
  }, [timeRemaining]);

  // Auto-revert timer
  useEffect(() => {
    if (!isFiredMode) return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          disableFiredMode();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isFiredMode, disableFiredMode]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.classList.remove("fired-mode");
    };
  }, []);

  return (
    <>
      {/* Inject styles when in fired mode */}
      {isFiredMode && (
        <>
          <style>{badStyles}</style>
          {/* Visitor Counter */}
          <div className="fired-visitor-counter">
            <span className="blink">●</span> You are visitor #
            {Math.floor(Math.random() * 1000) + 12345}
          </div>
          {/* Marquee */}
          <div className="fired-marquee">
            <span>
              🚧 WELCOME TO OUR WEBSITE 🚧 BEST PRICES GUARANTEED 🚧 CLICK HERE FOR AMAZING DEALS 🚧 
              UNDER CONSTRUCTION - CHECK BACK SOON 🚧 WE DO EVERYTHING FOR EVERYONE 🚧
            </span>
          </div>
        </>
      )}

      {/* Toggle Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-6 left-6 z-50"
      >
        <AnimatePresence mode="wait">
          {!isFiredMode ? (
            <motion.button
              key="enable"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={enableFiredMode}
              className="flex items-center gap-2 px-4 py-3 rounded-full bg-destructive/90 text-white shadow-lg hover:bg-destructive transition-colors"
            >
              <Flame className="h-5 w-5" />
              <span className="text-sm font-medium">Experience a "Fired" Site</span>
            </motion.button>
          ) : (
            <motion.button
              key="disable"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={disableFiredMode}
              className="flex items-center gap-2 px-4 py-3 rounded-full bg-accent text-accent-foreground shadow-lg hover:bg-accent/90 transition-colors"
            >
              <Sparkles className="h-5 w-5" />
              <span className="text-sm font-medium">
                Escape! ({timeRemaining}s)
              </span>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Tooltip */}
        <AnimatePresence>
          {isFiredMode && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-card border border-border rounded-lg shadow-lg max-w-xs"
            >
              <p className="text-xs text-muted-foreground">
                Scary, right? This is what your visitors might be experiencing.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default ThemeToggle;
