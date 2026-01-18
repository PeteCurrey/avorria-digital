import React from 'react';
import { motion, Variants } from 'framer-motion';

interface CharacterRevealProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  duration?: number;
  emphasis?: boolean;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
}

const CharacterReveal: React.FC<CharacterRevealProps> = ({
  text,
  className = '',
  delay = 0,
  staggerDelay = 0.03,
  duration = 0.5,
  emphasis = false,
  as: Component = 'span',
}) => {
  const words = text.split(' ');

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const characterVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: 'blur(10px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const emphasisVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: 'blur(10px)',
      textShadow: '0 0 0px hsl(var(--primary) / 0)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      textShadow: [
        '0 0 0px hsl(var(--primary) / 0)',
        '0 0 30px hsl(var(--primary) / 0.6)',
        '0 0 20px hsl(var(--primary) / 0.4)',
      ],
      transition: {
        duration,
        ease: [0.22, 1, 0.36, 1],
        textShadow: {
          duration: 2,
          repeat: Infinity,
          repeatType: 'reverse',
        },
      },
    },
  };

  return (
    <motion.span
      className={`inline-block ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {word.split('').map((char, charIndex) => (
            <motion.span
              key={`${wordIndex}-${charIndex}`}
              className="inline-block"
              variants={emphasis ? emphasisVariants : characterVariants}
              style={{ willChange: 'transform, opacity, filter' }}
            >
              {char}
            </motion.span>
          ))}
          {wordIndex < words.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </motion.span>
  );
};

export default CharacterReveal;
