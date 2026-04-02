'use client';

import { Mail, Heart, Terminal } from 'lucide-react';
import { IconGitHub, IconLinkedIn } from '@/components/ui/SocialIcons';
import { SOCIAL_LINKS } from '@/styles/theme';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-gruvbox-bg2/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-neon-green" />
            <span className="font-display text-xs tracking-wider text-gruvbox-fg4">
              athos<span className="text-neon-green">.</span>dev
            </span>
          </div>

          {/* Social */}
          <div className="flex items-center gap-4">
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gruvbox-fg4 hover:text-neon-green transition-all hover:drop-shadow-[0_0_6px_rgba(57,255,20,0.5)]"
              aria-label="GitHub"
            >
              <IconGitHub size={18} />
            </a>
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gruvbox-fg4 hover:text-neon-blue transition-all hover:drop-shadow-[0_0_6px_rgba(0,240,255,0.5)]"
              aria-label="LinkedIn"
            >
              <IconLinkedIn size={18} />
            </a>
            <a
              href={`mailto:${SOCIAL_LINKS.email}`}
              className="text-gruvbox-fg4 hover:text-neon-pink transition-all hover:drop-shadow-[0_0_6px_rgba(255,0,110,0.5)]"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs font-mono text-gruvbox-fg4/60 flex items-center gap-1">
            &copy; {currentYear} — Feito com
            <Heart size={12} className="text-neon-pink inline" />
            e muito
            <span className="text-neon-green">café</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
