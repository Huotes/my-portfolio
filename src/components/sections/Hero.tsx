'use client';

import { motion } from 'framer-motion';
import { ChevronDown, Download, Gamepad2 } from 'lucide-react';
import { IconGitHub, IconLinkedIn } from '@/components/ui/SocialIcons';
import GlitchText from '@/components/effects/GlitchText';
import NeonButton from '@/components/ui/NeonButton';
import { SOCIAL_LINKS } from '@/styles/theme';
import { playerStats } from '@/data/skills';
import { useCountUp } from '@/hooks/useScrollAnimation';
import { useEffect, useState } from 'react';

const roles = [
  'Sr Backend Engineer',
  'Python Enthusiast',
  'DevSecOps Aspirant',
  'Game Developer',
  'Automation Wizard',
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayRole, setDisplayRole] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const yearsXP = useCountUp(6, 1500, true);
  const level = useCountUp(playerStats.level, 2000, true);

  // Typewriter para roles
  useEffect(() => {
    const currentRole = roles[roleIndex];
    const speed = isDeleting ? 40 : 80;

    if (!isDeleting && displayRole === currentRole) {
      const pause = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(pause);
    }

    if (isDeleting && displayRole === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayRole(
        isDeleting
          ? currentRole.slice(0, displayRole.length - 1)
          : currentRole.slice(0, displayRole.length + 1)
      );
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayRole, isDeleting, roleIndex]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 grid-bg"
    >
      <div className="max-w-5xl mx-auto text-center">
        {/* Player tag */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full border border-neon-green/30 bg-gruvbox-bg0/60 backdrop-blur-sm"
        >
          <Gamepad2 size={14} className="text-neon-green" />
          <span className="font-mono text-xs text-neon-green tracking-wider">
            LVL {level} • {playerStats.class}
          </span>
        </motion.div>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4">
            <span className="text-gruvbox-fg1">Athos</span>{' '}
            <GlitchText text="Aurélio" className="neon-text-green" />
          </h1>
        </motion.div>

        {/* Typewriter role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="h-8 mb-6"
        >
          <p className="font-mono text-base sm:text-lg md:text-xl text-gruvbox-fg4">
            {'> '}
            <span className="text-neon-blue">{displayRole}</span>
            <span className="inline-block w-0.5 h-5 bg-neon-green ml-1 animate-pulse" />
          </p>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="max-w-2xl mx-auto text-gruvbox-fg3 text-sm sm:text-base leading-relaxed mb-4"
        >
          &quot;O coringa que você precisa para o seu baralho.
          <br className="hidden sm:block" />
          Automatizo, protejo e entrego.&quot;
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex flex-wrap items-center justify-center gap-6 mb-8 font-mono text-xs sm:text-sm"
        >
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-neon-green shadow-[0_0_6px_#39ff14]" />
            <span className="text-gruvbox-fg4">{yearsXP}+ anos de XP</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-neon-blue shadow-[0_0_6px_#00f0ff]" />
            <span className="text-gruvbox-fg4">Full Stack Warrior</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-neon-pink shadow-[0_0_6px_#ff006e]" />
            <span className="text-gruvbox-fg4">Programando desde os 15</span>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <NeonButton href={SOCIAL_LINKS.github} variant="green" external>
            <IconGitHub size={16} />
            GitHub
          </NeonButton>
          <NeonButton href={SOCIAL_LINKS.linkedin} variant="blue" external>
            <IconLinkedIn size={16} />
            LinkedIn
          </NeonButton>
          <NeonButton href="#contact" variant="pink">
            <Download size={16} />
            Contato
          </NeonButton>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gruvbox-fg4 hover:text-neon-green transition-colors"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown size={24} />
        </motion.div>
      </motion.a>
    </section>
  );
}
