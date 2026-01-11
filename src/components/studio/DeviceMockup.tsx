import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef, useState } from "react";

interface DeviceMockupProps {
  children: React.ReactNode;
  className?: string;
}

export const DeviceMockup = ({ children, className = "" }: DeviceMockupProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
    stiffness: 100,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), {
    stiffness: 100,
    damping: 20,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative ${className}`}
    >
      {/* MacBook Frame */}
      <div className="relative mx-auto w-full max-w-2xl">
        {/* Screen Bezel */}
        <div className="relative rounded-t-2xl bg-gradient-to-b from-zinc-700 to-zinc-800 p-2 shadow-2xl">
          {/* Camera Notch */}
          <div className="absolute left-1/2 top-1.5 h-2 w-2 -translate-x-1/2 rounded-full bg-zinc-600">
            <div className="absolute inset-0.5 rounded-full bg-zinc-900" />
          </div>

          {/* Screen */}
          <div className="relative overflow-hidden rounded-lg bg-black">
            {/* Browser Chrome */}
            <div className="flex items-center gap-2 border-b border-white/5 bg-zinc-900/80 px-3 py-2">
              {/* Traffic Lights */}
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
              </div>
              
              {/* URL Bar */}
              <div className="ml-4 flex-1">
                <div className="mx-auto max-w-xs rounded-md bg-zinc-800 px-3 py-1">
                  <span className="text-xs text-white/40">yourwebsite.com</span>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="aspect-[16/10] overflow-hidden bg-zinc-950">
              {children}
            </div>
          </div>
        </div>

        {/* MacBook Base */}
        <div className="relative h-4 rounded-b-xl bg-gradient-to-b from-zinc-700 to-zinc-800 shadow-xl">
          {/* Notch */}
          <div className="absolute left-1/2 top-0 h-1 w-20 -translate-x-1/2 rounded-b-lg bg-zinc-600" />
        </div>

        {/* Base Shadow */}
        <div className="absolute -bottom-4 left-1/2 h-8 w-[90%] -translate-x-1/2 rounded-full bg-black/40 blur-xl" />

        {/* Reflection/Glow Effect */}
        <motion.div
          animate={{
            opacity: isHovered ? 0.15 : 0.05,
          }}
          className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 via-transparent to-transparent"
        />
      </div>
    </motion.div>
  );
};

export default DeviceMockup;
