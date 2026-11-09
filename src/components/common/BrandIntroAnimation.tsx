import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BrandIntroAnimationProps {
  onStartReveal?: () => void;
  onComplete?: () => void;
}

export const BrandIntroAnimation: React.FC<BrandIntroAnimationProps> = ({
  onStartReveal,
  onComplete,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Stage 1 & 2: Logo and Typography reveal (0 - 2.4s)
    // Stage 3: Smooth curtain wipe & page unveil begins (2.4s)
    const timer = setTimeout(() => {
      onStartReveal?.();
      setIsVisible(false);
    }, 2400);

    return () => clearTimeout(timer);
  }, [onStartReveal]);

  if (isDone) return null;

  const brandLetters = ['É', 'L', 'V', 'A', 'R', 'A'];

  return (
    <AnimatePresence
      onExitComplete={() => {
        setIsDone(true);
        onComplete?.();
      }}
    >
      {isVisible && (
        <motion.div
          key="brand-intro"
          initial={{ opacity: 1 }}
          exit={{
            y: '-100%',
            transition: {
              duration: 1.1,
              ease: [0.77, 0, 0.175, 1],
            },
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#49111C] text-[#F9EDF0] overflow-hidden select-none border-b border-[#E1A140]/40 shadow-2xl"
        >
          {/* Subtle luxury ambient glow in background */}
          <div className="absolute w-[500px] h-[500px] bg-[#E1A140]/15 rounded-full blur-[140px] pointer-events-none" />

          {/* Center Brand Container with graceful exit fade */}
          <motion.div
            exit={{
              opacity: 0,
              y: -30,
              scale: 0.95,
              transition: { duration: 0.45, ease: 'easeOut' },
            }}
            className="relative z-10 flex flex-col items-center text-center px-6"
          >
            {/* Architectural Monogram Logo SVG */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-16 h-16 sm:w-20 sm:h-20 mb-6 relative flex items-center justify-center"
            >
              {/* Outer Geometric Diamond Ring */}
              <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
                <motion.rect
                  x="20"
                  y="20"
                  width="60"
                  height="60"
                  rx="2"
                  transform="rotate(45 50 50)"
                  stroke="#E1A140"
                  strokeWidth="1.2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.8 }}
                  transition={{ duration: 1.2, ease: 'easeInOut' }}
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="34"
                  stroke="#E1A140"
                  strokeWidth="0.8"
                  strokeDasharray="2 4"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 180 }}
                  transition={{ duration: 3, ease: 'linear' }}
                />
              </svg>

              {/* Center Monogram Serif Letter 'É' */}
              <motion.span
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute font-serif text-2xl sm:text-3xl text-[#F9EDF0] font-light tracking-widest"
              >
                É
              </motion.span>
            </motion.div>

            {/* Brand Letters Staggered Reveal */}
            <div className="overflow-hidden flex items-center justify-center space-x-2 sm:space-x-3.5 my-1">
              {brandLetters.map((letter, idx) => (
                <motion.span
                  key={idx}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.5 + idx * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="font-serif text-3xl sm:text-5xl md:text-6xl tracking-[0.25em] text-[#F9EDF0] font-light inline-block"
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Expanding Hairline Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="w-40 sm:w-56 h-[1px] bg-gradient-to-r from-transparent via-[#E1A140] to-transparent my-3.5 origin-center"
            />

            {/* Tagline Reveal */}
            <motion.div
              initial={{ opacity: 0, y: 10, letterSpacing: '0.2em' }}
              animate={{ opacity: 1, y: 0, letterSpacing: '0.38em' }}
              transition={{ duration: 0.9, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-[9px] sm:text-[11px] uppercase text-[#E1A140] font-sans font-light"
            >
              Timeless by Design
            </motion.div>
          </motion.div>

          {/* Bottom Luxury Progress Indicator */}
          <div className="absolute bottom-8 inset-x-0 flex justify-center">
            <div className="w-24 h-[1px] bg-[#49111C] border border-[#E1A140]/30 overflow-hidden">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 2.2, ease: 'easeInOut' }}
                className="w-full h-full bg-[#E1A140]"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
