'use client';

import { motion } from 'framer-motion';
import {
  Radar, Trophy, TrendingUp, Crosshair, Sparkles,
  Server, Monitor, Cloud, Shield, Blocks, Workflow, Users, Gamepad2,
} from 'lucide-react';
import RadarChart from '@/components/ui/RadarChart';
import GlowCard from '@/components/ui/GlowCard';
import { profileAxes, profileMeta } from '@/data/profile';

export default function Profile() {
  // Média geral
  const avgScore = Math.round(
    profileAxes.reduce((sum, a) => sum + a.value, 0) / profileAxes.length
  );

  // Top 3 skills
  const topSkills = [...profileAxes].sort((a, b) => b.value - a.value).slice(0, 3);

  return (
    <section id="profile" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 grid-bg">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <Radar className="w-5 h-5 text-neon-green" />
            <h2 className="font-display text-2xl sm:text-3xl tracking-wider text-gruvbox-fg1">
              <span className="text-neon-green font-mono text-sm mr-2">03.</span>
              Perfil Profissional
            </h2>
          </div>
          <div className="section-divider" />
          <p className="font-mono text-xs text-gruvbox-fg4 mt-4">
            // scan completo de atributos — hover nos pontos para detalhes
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Radar Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <RadarChart />

            {/* Score médio abaixo do chart */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1 }}
              className="text-center mt-4"
            >
              <p className="font-mono text-xs text-gruvbox-fg4">
                Score médio:{' '}
                <span className="text-neon-green font-bold text-sm">{avgScore}</span>
                <span className="text-gruvbox-gray">/100</span>
              </p>
            </motion.div>
          </motion.div>

          {/* Profile Info */}
          <div className="space-y-4">
            {/* Archetype card */}
            <GlowCard neonColor="green">
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gruvbox-bg0 border border-neon-green/20">
                  <Sparkles size={20} className="text-neon-green" />
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-neon-green/60 mb-0.5">
                    Arquétipo Detectado
                  </p>
                  <h3 className="font-display text-lg tracking-wide text-gruvbox-fg0">
                    {profileMeta.archetype}
                  </h3>
                  <p className="font-display text-xs text-neon-blue tracking-wider">
                    {profileMeta.title}
                  </p>
                </div>
              </div>
              <p className="text-sm text-gruvbox-fg3 leading-relaxed">
                {profileMeta.description}
              </p>
              <p className="font-mono text-xs text-gruvbox-fg4 border-l-2 border-neon-green/30 pl-3 mt-4 italic">
                {profileMeta.quote}
              </p>
            </GlowCard>

            {/* Top skills */}
            <GlowCard neonColor="blue" delay={0.1}>
              <div className="flex items-center gap-2 mb-3">
                <Trophy size={16} className="text-neon-blue" />
                <h4 className="font-display text-xs tracking-wider text-neon-blue">
                  Top Competências
                </h4>
              </div>
              <div className="space-y-3">
                {topSkills.map((skill, i) => (
                  <motion.div
                    key={skill.key}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    {(() => {
                      const IconMap: Record<string, typeof Server> = {
                        server: Server, monitor: Monitor, container: Cloud,
                        shield: Shield, blocks: Blocks, workflow: Workflow,
                        users: Users, gamepad: Gamepad2,
                      };
                      const SkillIcon = IconMap[skill.icon] || Server;
                      return <SkillIcon size={18} style={{ color: skill.neonColor }} className="shrink-0" />;
                    })()}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-xs text-gruvbox-fg2">{skill.label}</span>
                        <span
                          className="font-mono text-xs font-bold"
                          style={{ color: skill.neonColor }}
                        >
                          {skill.value}
                        </span>
                      </div>
                      <div className="h-1.5 bg-gruvbox-bg2 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.value}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.5 + i * 0.15 }}
                          style={{
                            backgroundColor: skill.neonColor,
                            boxShadow: `0 0 6px ${skill.neonColor}60`,
                          }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlowCard>

            {/* Strengths & Growth */}
            <div className="grid grid-cols-2 gap-4">
              <GlowCard neonColor="green" delay={0.2}>
                <div className="flex items-center gap-2 mb-3">
                  <Crosshair size={14} className="text-neon-green" />
                  <h4 className="font-display text-[10px] tracking-wider text-neon-green uppercase">
                    Forças
                  </h4>
                </div>
                <ul className="space-y-2">
                  {profileMeta.strengths.map((s, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-neon-green text-[10px] mt-0.5 shrink-0">▹</span>
                      <span className="font-mono text-[10px] text-gruvbox-fg3 leading-snug">{s}</span>
                    </li>
                  ))}
                </ul>
              </GlowCard>

              <GlowCard neonColor="orange" delay={0.3}>
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp size={14} className="text-neon-orange" />
                  <h4 className="font-display text-[10px] tracking-wider text-neon-orange uppercase">
                    Evolução
                  </h4>
                </div>
                <ul className="space-y-2">
                  {profileMeta.growthAreas.map((g, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-neon-orange text-[10px] mt-0.5 shrink-0">▹</span>
                      <span className="font-mono text-[10px] text-gruvbox-fg3 leading-snug">{g}</span>
                    </li>
                  ))}
                </ul>
              </GlowCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
