'use client';

import { motion } from 'framer-motion';
import {
  User, Target, Sword, Shield, Zap, Heart,
  Swords, Globe, Gamepad2, Bug, Bot, Moon,
} from 'lucide-react';
import GlowCard from '@/components/ui/GlowCard';
import TerminalText from '@/components/ui/TerminalText';
import { playerStats } from '@/data/skills';

const traits = [
  {
    icon: Sword,
    title: 'Ofensivo',
    desc: 'Backend & Automação — Python, Django, Flask, FastAPI',
    color: 'green' as const,
  },
  {
    icon: Shield,
    title: 'Defensivo',
    desc: 'Segurança da Informação — DevSecOps, Pentest, OWASP',
    color: 'blue' as const,
  },
  {
    icon: Zap,
    title: 'Suporte',
    desc: 'DevOps & Infra — Docker, K8s, CI/CD, AWS, Linux',
    color: 'orange' as const,
  },
  {
    icon: Heart,
    title: 'Passiva',
    desc: 'Game Dev — Godot, Level Design, Multiplayer',
    color: 'pink' as const,
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <User className="w-5 h-5 text-neon-green" />
            <h2 className="font-display text-2xl sm:text-3xl tracking-wider text-gruvbox-fg1">
              <span className="text-neon-green font-mono text-sm mr-2">01.</span>
              Sobre Mim
            </h2>
          </div>
          <div className="section-divider" />
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Bio - 3 cols */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 space-y-6"
          >
            {/* Terminal intro */}
            <div className="bg-gruvbox-bg0 border border-gruvbox-bg2 rounded-lg overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2 bg-gruvbox-bg1 border-b border-gruvbox-bg2">
                <span className="w-3 h-3 rounded-full bg-gruvbox-red" />
                <span className="w-3 h-3 rounded-full bg-gruvbox-yellow" />
                <span className="w-3 h-3 rounded-full bg-gruvbox-green" />
                <span className="font-mono text-xs text-gruvbox-fg4 ml-2">
                  athos@portfolio:~$
                </span>
              </div>
              <div className="p-4">
                <TerminalText
                  lines={[
                    'cat ~/about.md',
                    '',
                    '# O Coringa que você precisa',
                    '',
                    'Muito prazer, sou Athos Aurélio.',
                    'Desenvolvedor Sênior, 21 anos,',
                    'escrevendo código desde os 15.',
                    '',
                    'Generalista full-stack apaixonado por',
                    'resolver problemas e facilitar a vida',
                    'das pessoas através da tecnologia.',
                    '',
                    'Meu sonho? Tornar-me um DevSecOps capaz',
                    'de resolver problemas de milhões.',
                  ]}
                  typingSpeed={20}
                />
              </div>
            </div>

            <p className="text-gruvbox-fg3 leading-relaxed text-sm sm:text-base">
              Com bagagem em{' '}
              <span className="text-neon-green font-medium">desenvolvimento de jogos</span>,{' '}
              <span className="text-neon-blue font-medium">freelancing internacional</span>,{' '}
              estágio na{' '}
              <span className="text-neon-orange font-medium">PGFN</span> e sistemas para{' '}
              <span className="text-neon-pink font-medium">saúde ocupacional</span> — cada
              experiência moldou um profissional versátil, que entrega soluções
              robustas em backend, automatiza processos complexos e protege o que
              constrói.
            </p>

            <p className="font-mono text-xs text-gruvbox-fg4 border-l-2 border-neon-green/30 pl-4">
              &quot;O melhor código é aquele que resolve o problema de alguém.
              O segundo melhor é aquele que você automatizou para nunca mais precisar escrever.&quot;
            </p>
          </motion.div>

          {/* Character Sheet - 2 cols */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-4"
          >
            {/* Player card */}
            <GlowCard neonColor="green">
              <div className="text-center mb-4">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full border-2 border-neon-green/40 bg-gruvbox-bg2 flex items-center justify-center text-2xl">
                  🧙
                </div>
                <h3 className="font-display text-sm tracking-wider text-neon-green">
                  {playerStats.title}
                </h3>
                <p className="font-mono text-xs text-gruvbox-fg4">{playerStats.class}</p>
                <p className="font-mono text-[10px] text-gruvbox-gray mt-1">
                  Guild: {playerStats.guild}
                </p>
              </div>

              {/* XP bar */}
              <div className="mb-4">
                <div className="flex justify-between font-mono text-[10px] text-gruvbox-fg4 mb-1">
                  <span>LVL {playerStats.level}</span>
                  <span>
                    {playerStats.totalXP.toLocaleString()}/{playerStats.nextLevelXP.toLocaleString()} XP
                  </span>
                </div>
                <div className="xp-bar-container">
                  <motion.div
                    className="h-full rounded"
                    initial={{ width: 0 }}
                    whileInView={{
                      width: `${(playerStats.totalXP / playerStats.nextLevelXP) * 100}%`,
                    }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    style={{
                      background: 'linear-gradient(90deg, #39ff14, #00f0ff)',
                      boxShadow: '0 0 8px rgba(57,255,20,0.4)',
                    }}
                  />
                </div>
              </div>

              {/* Skill tree preview */}
              <div className="grid grid-cols-2 gap-2">
                {traits.map((trait, i) => (
                  <motion.div
                    key={trait.title}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-center gap-2 p-2 rounded bg-gruvbox-bg0/50 border border-gruvbox-bg2/50"
                  >
                    <trait.icon size={14} className="text-gruvbox-fg4 shrink-0" />
                    <div>
                      <p className="font-mono text-[10px] text-gruvbox-fg3">{trait.title}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlowCard>

            {/* Achievements preview */}
            <GlowCard neonColor="blue" delay={0.3}>
              <h4 className="font-display text-xs tracking-wider text-neon-blue mb-3">
                Conquistas Recentes
              </h4>
              <div className="grid grid-cols-4 gap-2">
                {playerStats.achievements.slice(0, 8).map((ach, i) => {
                  const AchIcon = ({
                    swords: Swords, globe: Globe, shield: Shield,
                    'gamepad-2': Gamepad2, bug: Bug, bot: Bot,
                    moon: Moon, zap: Zap,
                  } as Record<string, typeof Swords>)[ach.icon] || Zap;

                  return (
                    <motion.div
                      key={ach.name}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + i * 0.08, type: 'spring' }}
                      className="text-center group cursor-default"
                      title={`${ach.name}: ${ach.description}`}
                    >
                      <div className="flex justify-center group-hover:scale-125 transition-transform">
                        <AchIcon size={18} className="text-gruvbox-fg4 group-hover:text-neon-blue transition-colors" />
                      </div>
                      <p className="font-mono text-[8px] text-gruvbox-fg4 mt-1 truncate">
                        {ach.name}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </GlowCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
