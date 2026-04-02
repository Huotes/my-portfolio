'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface NeonButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'green' | 'blue' | 'pink' | 'orange';
  size?: 'sm' | 'md' | 'lg';
  external?: boolean;
  className?: string;
}

const variantStyles = {
  green: {
    border: 'border-neon-green/60',
    text: 'text-neon-green',
    shadow: 'hover:shadow-[0_0_15px_rgba(57,255,20,0.3),0_0_30px_rgba(57,255,20,0.1)]',
    bg: 'hover:bg-neon-green/10',
  },
  blue: {
    border: 'border-neon-blue/60',
    text: 'text-neon-blue',
    shadow: 'hover:shadow-[0_0_15px_rgba(0,240,255,0.3),0_0_30px_rgba(0,240,255,0.1)]',
    bg: 'hover:bg-neon-blue/10',
  },
  pink: {
    border: 'border-neon-pink/60',
    text: 'text-neon-pink',
    shadow: 'hover:shadow-[0_0_15px_rgba(255,0,110,0.3),0_0_30px_rgba(255,0,110,0.1)]',
    bg: 'hover:bg-neon-pink/10',
  },
  orange: {
    border: 'border-neon-orange/60',
    text: 'text-neon-orange',
    shadow: 'hover:shadow-[0_0_15px_rgba(255,102,0,0.3),0_0_30px_rgba(255,102,0,0.1)]',
    bg: 'hover:bg-neon-orange/10',
  },
};

const sizeStyles = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3 text-base',
};

export default function NeonButton({
  children,
  href,
  onClick,
  variant = 'green',
  size = 'md',
  external = false,
  className = '',
}: NeonButtonProps) {
  const styles = variantStyles[variant];
  const baseClasses = `
    inline-flex items-center justify-center gap-2
    font-mono tracking-wider uppercase
    border ${styles.border} ${styles.text}
    ${styles.shadow} ${styles.bg}
    bg-transparent rounded
    transition-all duration-300
    ${sizeStyles[size]}
    ${className}
  `;

  const MotionComponent = href ? motion.a : motion.button;

  return (
    <MotionComponent
      href={href}
      onClick={onClick}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={baseClasses}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </MotionComponent>
  );
}
