import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: string[]) {
  return inputs.filter(Boolean).join(' ');
}

export function getLevelTitle(level: number): string {
  if (level >= 90) return 'Lendário';
  if (level >= 75) return 'Épico';
  if (level >= 60) return 'Raro';
  if (level >= 40) return 'Incomum';
  return 'Comum';
}

export function getLevelColor(level: number): string {
  if (level >= 90) return '#ff006e'; // neon pink
  if (level >= 75) return '#bf00ff'; // neon purple
  if (level >= 60) return '#00f0ff'; // neon blue
  if (level >= 40) return '#39ff14'; // neon green
  return '#a89984'; // gruvbox gray
}

export function getXPBarGradient(level: number): string {
  if (level >= 90) return 'linear-gradient(90deg, #ff006e, #bf00ff)';
  if (level >= 75) return 'linear-gradient(90deg, #bf00ff, #00f0ff)';
  if (level >= 60) return 'linear-gradient(90deg, #00f0ff, #39ff14)';
  if (level >= 40) return 'linear-gradient(90deg, #39ff14, #fabd2f)';
  return 'linear-gradient(90deg, #928374, #a89984)';
}

export function formatDate(dateStr: string): string {
  return dateStr;
}
