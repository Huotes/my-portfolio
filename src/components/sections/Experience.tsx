'use client';

import { motion } from 'framer-motion';
import { Briefcase, MapPin, Calendar, GraduationCap } from 'lucide-react';
import GlowCard from '@/components/ui/GlowCard';
import XPBar from '@/components/ui/XPBar';
import { experiences, education } from '@/data/experience';

export default function Experience() {
  return (
    <section id="experience" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <Briefcase className="w-5 h-5 text-neon-blue" />
            <h2 className="font-display text-2xl sm:text-3xl tracking-wider text-gruvbox-fg1">
              <span className="text-neon-green font-mono text-sm mr-2">04.</span>
              Experiência
            </h2>
          </div>
          <div className="section-divider" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-neon-green via-neon-blue to-neon-pink opacity-30" />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative pl-12 md:pl-20"
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-2.5 md:left-6.5 top-6 w-3 h-3 rounded-full border-2"
                  style={{
                    borderColor: `var(--neon-${exp.neonColor === 'pink' ? 'pink' : exp.neonColor})`,
                    boxShadow: `0 0 8px var(--neon-${exp.neonColor === 'pink' ? 'pink' : exp.neonColor})`,
                    backgroundColor: '#1d2021',
                  }}
                />

                <GlowCard neonColor={exp.neonColor} delay={i * 0.05}>
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <div>
                      <h3 className="font-display text-sm sm:text-base tracking-wide text-gruvbox-fg1">
                        {exp.role}
                      </h3>
                      <p className="font-mono text-xs text-neon-green/80">
                        {exp.company}
                        <span className="text-gruvbox-fg4 ml-2">• {exp.level}</span>
                      </p>
                    </div>
                    <div className="flex flex-col items-start sm:items-end gap-1 shrink-0">
                      <span className="inline-flex items-center gap-1 font-mono text-[11px] text-gruvbox-fg4">
                        <Calendar size={11} />
                        {exp.period}
                      </span>
                      <span className="inline-flex items-center gap-1 font-mono text-[11px] text-gruvbox-gray">
                        <MapPin size={11} />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <ul className="space-y-1.5 mb-4">
                    {exp.description.map((desc, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2 text-sm text-gruvbox-fg3"
                      >
                        <span className="text-neon-green mt-1 shrink-0 text-xs">▹</span>
                        {desc}
                      </li>
                    ))}
                  </ul>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {exp.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-[10px] font-mono tracking-wide rounded border border-gruvbox-bg3/50 text-gruvbox-fg4 bg-gruvbox-bg0/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* XP bar */}
                  <XPBar label="Quest XP" level={exp.xp} delay={i * 0.1} />
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <GraduationCap className="w-5 h-5 text-neon-purple" />
            <h3 className="font-display text-xl tracking-wider text-gruvbox-fg1">
              Formação Acadêmica
            </h3>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {education.map((edu, i) => (
              <GlowCard key={edu.id} neonColor="purple" delay={i * 0.1}>
                <h4 className="font-display text-xs tracking-wider text-gruvbox-fg1 mb-1">
                  {edu.institution}
                </h4>
                <p className="font-mono text-[11px] text-neon-purple/80 mb-1">{edu.course}</p>
                <p className="font-mono text-[10px] text-gruvbox-fg4">{edu.degree}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="font-mono text-[10px] text-gruvbox-gray">{edu.period}</span>
                  <span
                    className={`font-mono text-[10px] px-2 py-0.5 rounded-full border ${
                      edu.status === 'Em andamento'
                        ? 'text-neon-green border-neon-green/30'
                        : edu.status === 'Cancelado'
                        ? 'text-gruvbox-red-bright border-gruvbox-red/30 line-through opacity-70'
                        : 'text-gruvbox-fg4 border-gruvbox-bg3'
                    }`}
                  >
                    {edu.status}
                  </span>
                </div>
              </GlowCard>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
