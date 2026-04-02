'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FolderGit2, ExternalLink, Gamepad2, Terminal, Wrench,
  Server, Bot, FileCode, Code,
} from 'lucide-react';
import GlowCard from '@/components/ui/GlowCard';
import { projects, type Project } from '@/data/projects';

const typeIcons: Record<Project['type'], typeof Code> = {
  game: Gamepad2,
  tool: Wrench,
  system: Server,
  automation: Bot,
  dotfiles: Terminal,
  oss: FileCode,
};

const typeLabels: Record<Project['type'], string> = {
  game: 'Game',
  tool: 'Tool',
  system: 'System',
  automation: 'Automation',
  dotfiles: 'Dotfiles',
  oss: 'Open Source',
};

type FilterType = 'all' | Project['type'];

export default function Projects() {
  const [filter, setFilter] = useState<FilterType>('all');

  const filtered = filter === 'all'
    ? projects
    : projects.filter((p) => p.type === filter);

  const types = [...new Set(projects.map((p) => p.type))];

  return (
    <section id="projects" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header — terminal style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <FolderGit2 className="w-5 h-5 text-neon-green" />
            <h2 className="font-display text-2xl sm:text-3xl tracking-wider text-gruvbox-fg1">
              <span className="text-neon-green font-mono text-sm mr-2">06.</span>
              Projetos
            </h2>
          </div>
          <div className="section-divider" />

          {/* Terminal prompt */}
          <div className="mt-4 bg-gruvbox-bg0 border border-gruvbox-bg2 rounded-lg p-3 font-mono text-xs">
            <span className="text-neon-green">athos@arch</span>
            <span className="text-gruvbox-fg4">:</span>
            <span className="text-neon-blue">~/projects</span>
            <span className="text-gruvbox-fg4">$ </span>
            <span className="text-gruvbox-fg2">ls -la --sort=relevance</span>
            <br />
            <span className="text-gruvbox-fg4">
              total {projects.length} — {projects.filter((p) => p.type === 'game').length} games,{' '}
              {projects.filter((p) => p.type === 'tool').length} tools,{' '}
              {projects.filter((p) => p.type === 'dotfiles').length} dotfiles
            </span>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 mb-8"
        >
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 font-mono text-xs rounded border transition-all ${
              filter === 'all'
                ? 'border-neon-green text-neon-green bg-neon-green/10'
                : 'border-gruvbox-bg3 text-gruvbox-fg4 hover:border-gruvbox-fg4'
            }`}
          >
            * ({projects.length})
          </button>
          {types.map((type) => {
            const Icon = typeIcons[type];
            const count = projects.filter((p) => p.type === type).length;
            return (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs rounded border transition-all ${
                  filter === type
                    ? 'border-neon-blue text-neon-blue bg-neon-blue/10'
                    : 'border-gruvbox-bg3 text-gruvbox-fg4 hover:border-gruvbox-fg4'
                }`}
              >
                <Icon size={12} />
                {typeLabels[type]} ({count})
              </button>
            );
          })}
        </motion.div>

        {/* Projects grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {filtered.map((project, i) => {
              const Icon = typeIcons[project.type];
              return (
                <GlowCard key={project.id} neonColor={project.neonColor} delay={i * 0.05}>
                  {/* Header */}
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Icon size={16} className="text-gruvbox-fg4 shrink-0" />
                      <h3 className="font-mono text-sm text-gruvbox-fg1 leading-tight">
                        {project.title}
                      </h3>
                    </div>
                    {project.featured && (
                      <span className="px-1.5 py-0.5 text-[8px] font-mono tracking-wider rounded bg-neon-green/10 text-neon-green border border-neon-green/20">
                        FEATURED
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-xs text-gruvbox-fg4 leading-relaxed mb-3 min-h-[36px]">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-1.5 py-0.5 text-[9px] font-mono rounded border border-gruvbox-bg3/40 text-gruvbox-gray bg-gruvbox-bg0/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-3 pt-2 border-t border-gruvbox-bg2/30">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-[10px] text-gruvbox-fg4 hover:text-neon-green transition-colors"
                    >
                      <ExternalLink size={10} />
                      {project.type === 'game' ? 'Jogar' : 'Acessar'}
                    </a>
                    {project.repo && (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-[10px] text-gruvbox-fg4 hover:text-neon-blue transition-colors ml-auto"
                      >
                        <Code size={10} />
                        Source
                      </a>
                    )}
                  </div>
                </GlowCard>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <a
            href="https://github.com/Huotes?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs text-gruvbox-fg4 hover:text-neon-green transition-colors border border-gruvbox-bg3 hover:border-neon-green/30 px-4 py-2 rounded"
          >
            <FolderGit2 size={14} />
            Ver todos os repositórios no GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
