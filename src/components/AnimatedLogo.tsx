import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface AnimatedLogoProps {
  isTransparent?: boolean;
}

const AnimatedLogo = ({ isTransparent = false }: AnimatedLogoProps) => {
  return (
    <Link to="/" className="flex items-center flex-shrink-0">
      <span 
        className={`text-[1.75rem] font-extralight tracking-wider transition-colors flex items-baseline ${
          isTransparent ? "text-white" : "text-foreground"
        }`}
      >
        {/* Initial "A" */}
        <span className="inline-block align-baseline">A</span>
        
        {/* Rest of the letters fade in with clip-path for clean reveal */}
        <motion.span
          initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
          animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
          transition={{ 
            delay: 0.4,
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1]
          }}
          className="inline-block align-baseline"
        >
          vorria
        </motion.span>
        
        {/* Animated pink dot - slides from left position to final position */}
        <motion.span
          initial={{ marginLeft: "-4.2ch" }}
          animate={{ marginLeft: "0ch" }}
          whileHover={{ 
            scale: [1, 1.3, 1],
            transition: { duration: 0.4, ease: "easeInOut" }
          }}
          transition={{ 
            delay: 0.3,
            duration: 0.7,
            ease: [0.25, 0.1, 0.25, 1]
          }}
          className="text-pink-500 font-bold inline-block align-baseline cursor-pointer"
        >
          .
        </motion.span>
      </span>
    </Link>
  );
};

export default AnimatedLogo;
