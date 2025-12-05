import { motion } from "framer-motion";

export const HeroGradient = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute -top-1/2 -left-1/4 w-[80vw] h-[80vw] rounded-full opacity-30"
        style={{
          background: "radial-gradient(circle, hsl(var(--accent) / 0.4) 0%, transparent 70%)",
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute -bottom-1/4 -right-1/4 w-[60vw] h-[60vw] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary) / 0.5) 0%, transparent 70%)",
        }}
        animate={{
          x: [0, -40, 0],
          y: [0, -20, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/4 right-1/4 w-[40vw] h-[40vw] rounded-full opacity-15"
        style={{
          background: "radial-gradient(circle, hsl(var(--accent) / 0.3) 0%, transparent 60%)",
        }}
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -40, 20, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-accent/40"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}
      
      {/* Subtle grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
};

export default HeroGradient;
