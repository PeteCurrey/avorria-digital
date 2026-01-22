import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface ArchetypeGuiltyToggleProps {
  archetypeNumber: number;
  isGuilty: boolean;
  onToggle: (archetypeNumber: number) => void;
}

const ArchetypeGuiltyToggle: React.FC<ArchetypeGuiltyToggleProps> = ({
  archetypeNumber,
  isGuilty,
  onToggle,
}) => {
  return (
    <motion.button
      onClick={() => onToggle(archetypeNumber)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
        transition-all duration-300 border
        ${
          isGuilty
            ? "bg-destructive/20 border-destructive/50 text-destructive"
            : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
        }
      `}
    >
      <AnimatePresence mode="wait">
        {isGuilty ? (
          <motion.span
            key="guilty"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            className="flex items-center gap-2"
          >
            <AlertCircle className="h-4 w-4" />
            I'm Guilty!
          </motion.span>
        ) : (
          <motion.span
            key="not-guilty"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="flex items-center gap-2"
          >
            <CheckCircle2 className="h-4 w-4" />
            Not Me
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default ArchetypeGuiltyToggle;
