'use client';

import { motion } from 'framer-motion';
import {
  Award,
  ExternalLink,
  FileText,
  Shield,
  Code,
  Server,
  Cpu,
  Lock,
  Globe,
  Gamepad2,
  Database,
  Cloud,
} from 'lucide-react';
import GlowCard from '@/components/ui/GlowCard';
import { certificates } from '@/data/certificates';

const iconMap = {
  shield: Shield,
  code: Code,
  server: Server,
  cpu: Cpu,
  lock: Lock,
  globe: Globe,
  gamepad: Gamepad2,
  database: Database,
  cloud: Cloud,
};

const neonColors: Array<'green' | 'blue' | 'pink' | 'orange' | 'purple'> = [
  'green',
  'blue',
  'pink',
  'orange',
  'purple',
];

export default function Certificates() {
  return (
    <section id="certificates" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <Award className="w-5 h-5 text-neon-orange" />
            <h2 className="font-display text-2xl sm:text-3xl tracking-wider text-gruvbox-fg1">
              <span className="text-neon-green font-mono text-sm mr-2">05.</span>
              Certificados
            </h2>
          </div>
          <div className="section-divider" />
          <p className="font-mono text-xs text-gruvbox-fg4 mt-4">
            // Loot drops coletados ao longo da jornada
          </p>
        </motion.div>

        {/* Certificates grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certificates.map((cert, i) => {
            const Icon = iconMap[cert.icon];
            const neonColor = neonColors[i % neonColors.length];

            return (
              <GlowCard key={cert.id} neonColor={neonColor} delay={i * 0.08}>
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-gruvbox-bg0/80 border border-gruvbox-bg2/50 shrink-0">
                    <Icon size={20} className="text-gruvbox-fg4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-xs tracking-wide text-gruvbox-fg1 leading-snug mb-1">
                      {cert.title}
                    </h3>
                    <p className="font-mono text-[10px] text-gruvbox-fg4">
                      {cert.institution} • {cert.date}
                      {cert.hours && ` • ${cert.hours}h`}
                    </p>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mt-3 mb-3">
                  {cert.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-1.5 py-0.5 text-[9px] font-mono tracking-wide rounded border border-gruvbox-bg3/40 text-gruvbox-gray bg-gruvbox-bg0/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-2 border-t border-gruvbox-bg2/30">
                  {cert.credentialUrl && cert.credentialUrl !== '#' && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-[10px] text-gruvbox-fg4 hover:text-neon-green transition-colors"
                    >
                      <ExternalLink size={10} />
                      Verificar credencial
                    </a>
                  )}
                  {cert.pdfPath && (
                    <a
                      href={cert.pdfPath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-[10px] text-gruvbox-fg4 hover:text-neon-blue transition-colors ml-auto"
                    >
                      <FileText size={10} />
                      PDF
                    </a>
                  )}
                </div>
              </GlowCard>
            );
          })}
        </div>

        {/* CTA to add more */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center font-mono text-xs text-gruvbox-gray mt-8"
        >
          // {certificates.length} certificados coletados — keep grinding! 🎮
        </motion.p>
      </div>
    </section>
  );
}
