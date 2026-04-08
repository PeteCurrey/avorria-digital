'use client';
import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { CaseMetric } from "@/data/caseStudies";

interface AnimatedCounterProps {
  value: string;
  highlight?: boolean;
}

const AnimatedCounter = ({ value, highlight }: AnimatedCounterProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    // Extract numeric part and suffix
    const match = value.match(/^([+-]?)([Â£$â‚¬]?)(\d+(?:\.\d+)?)(x|%|k|M|s)?(.*)$/i);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const [, sign, currency, numStr, suffix = "", rest] = match;
    const targetNum = parseFloat(numStr);
    const isDecimal = numStr.includes(".");
    const decimalPlaces = isDecimal ? numStr.split(".")[1].length : 0;

    const duration = 1500;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = targetNum * eased;

      const formatted = isDecimal ? current.toFixed(decimalPlaces) : Math.floor(current).toString();
      setDisplayValue(`${sign}${currency}${formatted}${suffix}${rest}`);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value]);

  return (
    <div
      ref={ref}
      className={`text-5xl md:text-6xl font-light ${
        highlight ? "text-accent" : "text-white"
      }`}
    >
      {displayValue}
    </div>
  );
};

interface CaseMetricsProps {
  metrics: CaseMetric[];
}

export const CaseMetrics = ({ metrics }: CaseMetricsProps) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{
            duration: 0.5,
            delay: index * 0.1,
            ease: [0.4, 0, 0.2, 1],
          }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center hover:border-accent/30 transition-colors"
        >
          <AnimatedCounter value={metric.value} highlight={metric.highlight} />
          <div className="text-lg text-white/80 mt-2">{metric.label}</div>
          {metric.baseline && (
            <div className="text-sm text-white/40 mt-1">{metric.baseline}</div>
          )}
        </motion.div>
      ))}
    </div>
  );
};


