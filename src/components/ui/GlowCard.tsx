'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  neonColor?: 'green' | 'blue' | 'pink' | 'orange' | 'purple';
  delay?: number;
}

const colorMap = {
  green: { border: 'rgba(57,255,20,0.15)', glow: 'rgba(57,255,20,0.08)', hover: 'rgba(57,255,20,0.25)' },
  blue: { border: 'rgba(0,240,255,0.15)', glow: 'rgba(0,240,255,0.08)', hover: 'rgba(0,240,255,0.25)' },
  pink: { border: 'rgba(255,0,110,0.15)', glow: 'rgba(255,0,110,0.08)', hover: 'rgba(255,0,110,0.25)' },
  orange: { border: 'rgba(255,102,0,0.15)', glow: 'rgba(255,102,0,0.08)', hover: 'rgba(255,102,0,0.25)' },
  purple: { border: 'rgba(191,0,255,0.15)', glow: 'rgba(191,0,255,0.08)', hover: 'rgba(191,0,255,0.25)' },
};

export default function GlowCard({
  children,
  className = '',
  neonColor = 'green',
  delay = 0,
}: GlowCardProps) {
  const colors = colorMap[neonColor];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{
        borderColor: colors.hover,
        boxShadow: `0 0 20px ${colors.glow}, 0 8px 32px rgba(0,0,0,0.3)`,
        y: -4,
      }}
      className={`
        relative overflow-hidden rounded-lg p-5
        bg-gradient-to-br from-gruvbox-bg0 to-gruvbox-bg1
        border transition-all duration-300
        ${className}
      `}
      style={{ borderColor: colors.border }}
    >
      {/* Shimmer effect on hover */}
      <div
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `linear-gradient(105deg, transparent 40%, ${colors.glow} 50%, transparent 60%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
