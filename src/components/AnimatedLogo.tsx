import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface AnimatedLogoProps {
  isTransparent?: boolean;
}

const AnimatedLogo = ({ isTransparent = false }: AnimatedLogoProps) => {
  return (
    <Link to="/" className="flex items-center flex-shrink-0">
      <span 
        className={`text-[1.75rem] font-extralight tracking-wider transition-colors ${
          isTransparent ? "text-white" : "text-foreground"
        }`}
      >
        {/* Initial "A" */}
        <motion.span
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          className="inline-block"
        >
          A
        </motion.span>
        
        {/* Rest of the letters fade in */}
        <motion.span
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "auto" }}
          transition={{ 
            delay: 0.4,
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1]
          }}
          className="inline-block overflow-hidden"
        >
          vorria
        </motion.span>
        
        {/* Animated pink dot */}
        <motion.span
          initial={{ x: -68, opacity: 1 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ 
            delay: 0.3,
            duration: 0.7,
            ease: [0.25, 0.1, 0.25, 1]
          }}
          className="text-pink-500 font-bold inline-block"
        >
          .
        </motion.span>
      </span>
    </Link>
  );
};

export default AnimatedLogo;
