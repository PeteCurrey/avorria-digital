import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TypewriterTextProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
  cursor?: boolean;
  cursorChar?: string;
  onComplete?: () => void;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  className = '',
  speed = 30,
  delay = 0,
  cursor = true,
  cursorChar = '|',
  onComplete,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    setDisplayedText('');
    setIsComplete(false);
    setIsStarted(false);

    const startTimeout = setTimeout(() => {
      setIsStarted(true);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [text, delay]);

  useEffect(() => {
    if (!isStarted) return;

    if (displayedText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      setIsComplete(true);
      onComplete?.();
    }
  }, [displayedText, text, speed, isStarted, onComplete]);

  return (
    <span className={`inline ${className}`}>
      {displayedText}
      {cursor && (
        <motion.span
          className="inline-block ml-0.5 text-primary"
          animate={{ opacity: [1, 0] }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        >
          {cursorChar}
        </motion.span>
      )}
    </span>
  );
};

// Auto-rotating typewriter for multiple texts
interface RotatingTypewriterProps {
  texts: string[];
  className?: string;
  speed?: number;
  pauseDuration?: number;
  cursor?: boolean;
}

export const RotatingTypewriter: React.FC<RotatingTypewriterProps> = ({
  texts,
  className = '',
  speed = 30,
  pauseDuration = 3000,
  cursor = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const currentText = texts[currentIndex];

    if (isPaused) {
      const pauseTimeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDuration);
      return () => clearTimeout(pauseTimeout);
    }

    if (isDeleting) {
      if (displayedText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, speed / 2);
        return () => clearTimeout(timeout);
      } else {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % texts.length);
      }
    } else {
      if (displayedText.length < currentText.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(currentText.slice(0, displayedText.length + 1));
        }, speed);
        return () => clearTimeout(timeout);
      } else {
        setIsPaused(true);
      }
    }
  }, [displayedText, currentIndex, isDeleting, isPaused, texts, speed, pauseDuration]);

  return (
    <span className={`inline ${className}`}>
      {displayedText}
      {cursor && (
        <motion.span
          className="inline-block ml-0.5 text-primary"
          animate={{ opacity: [1, 0] }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        >
          |
        </motion.span>
      )}
    </span>
  );
};

export default TypewriterText;
