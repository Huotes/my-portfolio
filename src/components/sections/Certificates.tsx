'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award, ExternalLink, FileText, Shield, Code, Server, Cpu,
  Lock, Globe, Gamepad2, Database, Cloud, X, Eye, Clock,
} from 'lucide-react';
import GlowCard from '@/components/ui/GlowCard';
import { certificates, type Certificate } from '@/data/certificates';

const iconMap: Record<string, typeof Code> = {
  shield: Shield, code: Code, server: Server, cpu: Cpu,
  lock: Lock, globe: Globe, gamepad: Gamepad2,
  database: Database, cloud: Cloud,
};

const neonColors: Array<'green' | 'blue' | 'pink' | 'orange' | 'purple'> = [
  'green', 'blue', 'pink', 'orange', 'purple',
];

export default function Certificates() {
  const [previewCert, setPreviewCert] = useState<Certificate | null>(null);

  const totalHours = certificates.reduce((sum, c) => sum + (c.hours || 0), 0);

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
              <span className="text-neon-green font-mono text-sm mr-2">07.</span>
              Certificados
            </h2>
          </div>
          <div className="section-divider" />
          <div className="mt-4 flex flex-wrap items-center gap-4 font-mono text-xs text-gruvbox-fg4">
            <span>
              <span className="text-neon-green">$</span> find ~/certificates -type f | wc -l
              <span className="text-gruvbox-fg2 ml-2">{certificates.length}</span>
            </span>
            <span className="text-gruvbox-bg3">|</span>
            <span className="flex items-center gap-1">
              <Clock size={10} />
              {totalHours}h+ de formação
            </span>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certificates.map((cert, i) => {
            const Icon = iconMap[cert.icon] || Code;
            const neonColor = neonColors[i % neonColors.length];
            const hasPreview = !!cert.thumbnailPath || !!cert.pdfPath;

            return (
              <GlowCard key={cert.id} neonColor={neonColor} delay={i * 0.05}>
                {/* Thumbnail */}
                {cert.thumbnailPath && (
                  <button
                    onClick={() => setPreviewCert(cert)}
                    className="w-full mb-3 rounded overflow-hidden border border-gruvbox-bg2/30 hover:border-neon-green/30 transition-all group relative cursor-pointer"
                  >
                    <img
                      src={cert.thumbnailPath}
                      alt={cert.title}
                      className="w-full h-24 object-cover object-top opacity-70 group-hover:opacity-100 transition-opacity"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gruvbox-bg0/40 group-hover:bg-transparent transition-colors flex items-center justify-center">
                      <Eye size={16} className="text-gruvbox-fg4 group-hover:text-neon-green transition-colors" />
                    </div>
                  </button>
                )}

                {/* PDF thumbnail placeholder */}
                {!cert.thumbnailPath && cert.pdfPath && (
                  <button
                    onClick={() => setPreviewCert(cert)}
                    className="w-full mb-3 rounded overflow-hidden border border-gruvbox-bg2/30 hover:border-neon-green/30 transition-all group relative cursor-pointer h-24 bg-gruvbox-bg0/60 flex items-center justify-center"
                  >
                    <div className="text-center">
                      <FileText size={20} className="mx-auto text-gruvbox-fg4 group-hover:text-neon-green transition-colors mb-1" />
                      <span className="font-mono text-[9px] text-gruvbox-gray group-hover:text-gruvbox-fg4 transition-colors">
                        Visualizar PDF
                      </span>
                    </div>
                  </button>
                )}

                {/* Content */}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-gruvbox-bg0/80 border border-gruvbox-bg2/50 shrink-0">
                    <Icon size={18} className="text-gruvbox-fg4" />
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
                      Verificar
                    </a>
                  )}
                  {hasPreview && (
                    <button
                      onClick={() => setPreviewCert(cert)}
                      className="inline-flex items-center gap-1 font-mono text-[10px] text-gruvbox-fg4 hover:text-neon-blue transition-colors ml-auto"
                    >
                      <Eye size={10} />
                      Preview
                    </button>
                  )}
                </div>
              </GlowCard>
            );
          })}
        </div>

        {/* CTA */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center font-mono text-xs text-gruvbox-gray mt-8"
        >
          // {certificates.length} loot drops coletados — a jornada nunca para
        </motion.p>
      </div>

      {/* Lightbox modal */}
      <AnimatePresence>
        {previewCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-gruvbox-bg0_hard/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setPreviewCert(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-3xl w-full max-h-[85vh] bg-gruvbox-bg0 border border-neon-green/20 rounded-lg overflow-hidden shadow-[0_0_40px_rgba(57,255,20,0.1)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header */}
              <div className="flex items-center justify-between px-4 py-3 bg-gruvbox-bg1 border-b border-gruvbox-bg2">
                <div>
                  <h3 className="font-display text-sm text-gruvbox-fg1">{previewCert.title}</h3>
                  <p className="font-mono text-[10px] text-gruvbox-fg4">
                    {previewCert.institution} • {previewCert.date}
                  </p>
                </div>
                <button
                  onClick={() => setPreviewCert(null)}
                  className="p-1 text-gruvbox-fg4 hover:text-neon-green transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal content */}
              <div className="p-4 overflow-auto max-h-[calc(85vh-60px)]">
                {previewCert.thumbnailPath ? (
                  <img
                    src={previewCert.thumbnailPath}
                    alt={previewCert.title}
                    className="w-full rounded border border-gruvbox-bg2/30"
                  />
                ) : previewCert.pdfPath ? (
                  <iframe
                    src={previewCert.pdfPath}
                    className="w-full h-[70vh] rounded border border-gruvbox-bg2/30"
                    title={previewCert.title}
                  />
                ) : (
                  <p className="text-center font-mono text-sm text-gruvbox-fg4 py-12">
                    Preview não disponível
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
