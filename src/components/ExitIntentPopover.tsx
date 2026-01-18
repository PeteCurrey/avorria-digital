import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

export function ExitIntentPopover() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [email, setEmail] = useState("");
  const lastMouseY = useRef(0);

  // Don't activate exit intent for first 5 seconds
  useEffect(() => {
    const activationTimer = setTimeout(() => {
      setIsActive(true);
    }, 5000);
    
    return () => clearTimeout(activationTimer);
  }, []);

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

  if (!isOpen) return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />
      
      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 z-[60] w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 -translate-y-1/2">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/90 p-6 shadow-2xl backdrop-blur-xl">
          {/* Close button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute right-4 top-4 rounded-full p-1 text-white/40 transition-colors hover:bg-white/10 hover:text-white/60"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Content */}
          <div className="space-y-4">
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
                className="w-full rounded-xl bg-gradient-to-r from-[hsl(var(--accent))] to-[hsl(280,75%,60%)] px-4 py-3 text-sm font-medium text-white shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
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
      </div>
    </>,
    document.body
  );
}
