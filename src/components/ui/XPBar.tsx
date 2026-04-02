'use client';

import { motion } from 'framer-motion';
import { getLevelTitle, getLevelColor, getXPBarGradient } from '@/lib/utils';

interface XPBarProps {
  label: string;
  level: number;
  showLabel?: boolean;
  delay?: number;
}

export default function XPBar({ label, level, showLabel = true, delay = 0 }: XPBarProps) {
  const title = getLevelTitle(level);
  const color = getLevelColor(level);

  return (
    <div className="space-y-1">
      {showLabel && (
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs text-gruvbox-fg3 tracking-wide">{label}</span>
          <div className="flex items-center gap-2">
            <span
              className="font-mono text-[10px] uppercase tracking-widest"
              style={{ color }}
            >
              {title}
            </span>
            <span className="font-mono text-xs text-gruvbox-fg4">{level}/100</span>
          </div>
        </div>
      )}
      <div className="xp-bar-container">
        <motion.div
          className="h-full rounded"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeOut', delay }}
          style={{
            background: getXPBarGradient(level),
            boxShadow: `0 0 8px ${color}40, 0 0 2px ${color}80`,
          }}
        />
      </div>
    </div>
  );
}
