import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, AlertTriangle, Shield } from "lucide-react";

interface FireRiskMeterProps {
  guiltyCount: number;
  totalCount: number;
}

const FireRiskMeter: React.FC<FireRiskMeterProps> = ({ guiltyCount, totalCount }) => {
  const percentage = (guiltyCount / totalCount) * 100;
  
  const getStatus = () => {
    if (guiltyCount === 0) return { label: "All Clear", color: "text-green-500", bgColor: "bg-green-500" };
    if (guiltyCount <= 1) return { label: "Minor Issues", color: "text-yellow-500", bgColor: "bg-yellow-500" };
    if (guiltyCount <= 2) return { label: "At Risk", color: "text-orange-500", bgColor: "bg-orange-500" };
    return { label: "Should Be Fired", color: "text-destructive", bgColor: "bg-destructive" };
  };

  const status = getStatus();

  return (
    <AnimatePresence>
      {guiltyCount > 0 && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          className="fixed right-6 bottom-32 z-40 hidden lg:block"
        >
          <div className="bg-card/95 backdrop-blur-sm border border-border rounded-xl p-4 shadow-xl w-48">
            {/* Header */}
            <div className="flex items-center gap-2 mb-3">
              <motion.div
                animate={guiltyCount >= 3 ? { 
                  scale: [1, 1.2, 1],
                  rotate: [0, -10, 10, 0]
                } : {}}
                transition={{ duration: 0.5, repeat: guiltyCount >= 3 ? Infinity : 0, repeatDelay: 2 }}
              >
                {guiltyCount >= 3 ? (
                  <Flame className="h-5 w-5 text-destructive" />
                ) : guiltyCount >= 1 ? (
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                ) : (
                  <Shield className="h-5 w-5 text-green-500" />
                )}
              </motion.div>
              <span className="text-sm font-medium text-foreground">Fire Risk</span>
            </div>

            {/* Progress Bar */}
            <div className="h-3 bg-muted rounded-full overflow-hidden mb-2">
              <motion.div
                className={`h-full ${status.bgColor}`}
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ type: "spring", damping: 15 }}
              />
            </div>

            {/* Stats */}
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">
                {guiltyCount} of {totalCount}
              </span>
              <span className={`font-medium ${status.color}`}>
                {status.label}
              </span>
            </div>

            {/* Warning Message */}
            {guiltyCount >= 3 && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 text-xs text-destructive text-center"
              >
                Your site has serious issues!
              </motion.p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FireRiskMeter;
