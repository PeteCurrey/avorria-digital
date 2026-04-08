'use client';
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Cookie, X } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const CONSENT_KEY = "avorria_cookie_consent";

type ConsentStatus = "pending" | "accepted" | "rejected";

export const CookieConsent = () => {
  const [status, setStatus] = useState<ConsentStatus>("pending");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored === "accepted" || stored === "rejected") {
      setStatus(stored as ConsentStatus);
    } else {
      // Delay showing banner for better UX
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setStatus("accepted");
    setIsVisible(false);
    // Enable analytics/tracking here if needed
    console.log("Cookie consent: accepted");
  };

  const handleReject = () => {
    localStorage.setItem(CONSENT_KEY, "rejected");
    setStatus("rejected");
    setIsVisible(false);
    // Disable analytics/tracking here if needed
    console.log("Cookie consent: rejected");
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (status !== "pending") return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="container mx-auto max-w-4xl">
            <div className="bg-background/95 backdrop-blur-xl border border-border/50 rounded-xl shadow-2xl p-4 md:p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                {/* Icon */}
                <div className="hidden md:flex w-12 h-12 rounded-xl bg-accent/10 items-center justify-center flex-shrink-0">
                  <Cookie className="w-6 h-6 text-accent" />
                </div>

                {/* Content */}
                <div className="flex-1 space-y-2">
                  <h3 className="text-base font-semibold text-foreground">
                    We value your privacy
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    We use cookies to enhance your browsing experience, analyse site traffic, and understand where our visitors come from. By clicking "Accept", you consent to our use of cookies.{" "}
                    <Link 
                      to="/privacy" 
                      className="text-accent hover:underline underline-offset-2"
                    >
                      Learn more
                    </Link>
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 w-full md:w-auto flex-shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleReject}
                    className="flex-1 md:flex-none"
                  >
                    Reject
                  </Button>
                  <Button
                    variant="accent"
                    size="sm"
                    onClick={handleAccept}
                    className="flex-1 md:flex-none"
                  >
                    Accept
                  </Button>
                </div>

                {/* Close button (mobile) */}
                <button
                  onClick={handleClose}
                  className="absolute top-3 right-3 md:hidden p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  aria-label="Close cookie banner"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;

