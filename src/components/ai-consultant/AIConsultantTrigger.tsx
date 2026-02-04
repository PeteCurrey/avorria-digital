import React, { useState, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

// Lazy load the chat component to avoid HMR issues
const AIConsultantChat = lazy(() => import("./AIConsultantChat"));

const AIConsultantTrigger = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Trigger Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.3 }}
        className="fixed bottom-6 right-6 z-40"
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-primary text-primary-foreground"
          aria-label="Open consultation"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
        
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping pointer-events-none" />
      </motion.div>

      {/* Chat Panel - Only render when opened to avoid HMR issues */}
      {isOpen && (
        <Suspense fallback={null}>
          <AIConsultantChat isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </Suspense>
      )}
    </>
  );
};

export default AIConsultantTrigger;
