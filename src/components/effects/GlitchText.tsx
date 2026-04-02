'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface GlitchTextProps {
  text: string;
  className?: string;
}

export default function GlitchText({ text, className = '' }: GlitchTextProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.span
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        color: '#39ff14',
        textShadow: '0 0 7px #39ff14, 0 0 14px #39ff14, 0 0 28px #39ff14',
      }}
    >
      {/* Main text */}
      <span className="relative z-10">{text}</span>

      {/* Glitch layer 1 — red offset */}
      <motion.span
        aria-hidden
        className="absolute inset-0 z-0"
        style={{
          color: '#fb4934',
          clipPath: 'polygon(0 0, 100% 0, 100% 33%, 0 33%)',
          textShadow: 'none',
        }}
        animate={
          isHovered
            ? {
                x: [0, -3, 2, -1, 3, 0],
                y: [0, 1, -1, 2, -1, 0],
              }
            : { x: 0, y: 0 }
        }
        transition={{ duration: 0.4, repeat: isHovered ? Infinity : 0, repeatType: 'mirror' }}
      >
        {text}
      </motion.span>

      {/* Glitch layer 2 — cyan offset */}
      <motion.span
        aria-hidden
        className="absolute inset-0 z-0"
        style={{
          color: '#00f0ff',
          clipPath: 'polygon(0 66%, 100% 66%, 100% 100%, 0 100%)',
          textShadow: 'none',
        }}
        animate={
          isHovered
            ? {
                x: [0, 2, -3, 1, -2, 0],
                y: [0, -1, 1, -2, 1, 0],
              }
            : { x: 0, y: 0 }
        }
        transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0, repeatType: 'mirror' }}
      >
        {text}
      </motion.span>
    </motion.span>
  );
}
