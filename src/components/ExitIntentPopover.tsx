import React, { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Clock } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

export function ExitIntentPopover() {
  const { data: siteSettings } = useSiteSettings();
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [email, setEmail] = useState("");
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const lastMouseY = useRef(0);
  
  // If disabled globally, don't activate
  const isEnabled = siteSettings?.popup_exit_intent_enabled ?? true;

  // Don't activate exit intent for first 5 seconds
  useEffect(() => {
    if (!isEnabled) return;
    
    const activationTimer = setTimeout(() => {
      setIsActive(true);
    }, 5000);
    
    return () => clearTimeout(activationTimer);
  }, [isEnabled]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    // Only show on desktop (768px+)
    if (window.innerWidth < 768) return;
    if (hasShown) return;
    if (!isActive) return; // Wait for activation delay
    
    // Only trigger if mouse is moving UPWARD (exiting)
    const isMovingUp = e.clientY < lastMouseY.current;
    lastMouseY.current = e.clientY;
    
    // Trigger when mouse moves to top 10px AND is moving upward
    if (e.clientY <= 10 && isMovingUp) {
      console.log("Event: lead_popover_opened");
      setIsOpen(true);
      setHasShown(true);
    }
  }, [hasShown, isActive]);

  useEffect(() => {
    // Only add listener on desktop
    if (window.innerWidth < 768) return;
    if (hasShown) return;

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [hasShown, handleMouseMove]);

  // Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Countdown timer
  useEffect(() => {
    if (!isOpen || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handlePrimaryClick = () => {
    console.log("Event: cta_exit_intent_audit_clicked", { websiteUrl, email });
    
    // Build query params for prefilling the form
    const params = new URLSearchParams();
    params.set("source", "exit-intent");
    if (websiteUrl) params.set("website", websiteUrl);
    if (email) params.set("email", email);
    
    window.location.href = `/free-seo-website-audit?${params.toString()}`;
  };

  const handleSecondaryClick = () => {
    console.log("Event: cta_exit_intent_dismissed");
    setIsOpen(false);
  };

  const isFormValid = websiteUrl.trim().length > 0;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Modal */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: "-48%", x: "-50%" }}
            animate={{ opacity: 1, scale: 1, y: "-50%", x: "-50%" }}
            exit={{ opacity: 0, scale: 0.95, y: "-48%", x: "-50%" }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="fixed left-1/2 top-1/2 z-[70] w-[calc(100%-2rem)] max-w-sm"
          >
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-black/20 backdrop-blur-2xl">
              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute right-4 top-4 rounded-full p-1 text-white/40 transition-colors hover:bg-white/10 hover:text-white/60"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Content */}
              <div className="space-y-4">
                {/* Urgency Timer */}
                <div className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 px-3 py-2">
                  <Clock className="h-4 w-4 text-pink-400 animate-pulse" />
                  <span className="text-sm text-white/80">
                    Offer expires in{" "}
                    <span className="font-mono font-semibold text-pink-400">
                      {formatTime(timeLeft)}
                    </span>
                  </span>
                </div>

                <div className="space-y-2 pr-6">
                  <h2 className="text-lg font-medium text-white">
                    Before you go – want a free website audit?
                  </h2>
                  <p className="text-sm text-white/60">
                    We'll analyze your site and send you a clear breakdown of what's working and what's holding you back.
                  </p>
                </div>
                
                <div className="space-y-3 pt-2">
                  <div className="space-y-1.5">
                    <label htmlFor="exit-website" className="text-sm text-white">
                      Your website URL *
                    </label>
                    <input
                      id="exit-website"
                      type="url"
                      placeholder="https://yourwebsite.com"
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                      className="w-full rounded-lg border border-white/10 bg-slate-800/50 px-3 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/50"
                    />
                  </div>
                  
                  <div className="space-y-1.5">
                    <label htmlFor="exit-email" className="text-sm text-white">
                      Your email (optional)
                    </label>
                    <input
                      id="exit-email"
                      type="email"
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-lg border border-white/10 bg-slate-800/50 px-3 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/50"
                    />
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 pt-2">
                  <button 
                    onClick={handlePrimaryClick} 
                    disabled={!isFormValid}
                    className="relative w-full rounded-xl bg-gradient-to-r from-[hsl(320,90%,65%)] to-[hsl(280,85%,70%)] bg-[length:200%_200%] px-4 py-3 text-sm font-medium text-white shadow-lg shadow-pink-500/25 hover:shadow-xl hover:shadow-pink-500/30 transition-all hover:scale-[1.02] animate-gradient-shift disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-r before:from-[hsl(320,90%,65%)] before:to-[hsl(280,85%,70%)] before:blur-lg before:opacity-50 before:animate-pulse before:-z-10"
                  >
                    Get my free audit
                  </button>
                  <button
                    onClick={handleSecondaryClick}
                    className="w-full px-4 py-2 text-sm text-white/50 transition-colors hover:text-white/70"
                  >
                    No thanks, I'm good
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
