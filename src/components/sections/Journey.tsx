'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ChevronRight, Heart, ExternalLink, Users } from 'lucide-react';
import GlowCard from '@/components/ui/GlowCard';
import { journeyChapters, teamShoutout, funFacts } from '@/data/story';
import { IconLinkedIn } from '@/components/ui/SocialIcons';

export default function Journey() {
  const [activeChapter, setActiveChapter] = useState(0);

  const chapter = journeyChapters[activeChapter];

  return (
    <section id="journey" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-5 h-5 text-neon-blue" />
            <h2 className="font-display text-2xl sm:text-3xl tracking-wider text-gruvbox-fg1">
              <span className="text-neon-green font-mono text-sm mr-2">02.</span>
              Minha História
            </h2>
          </div>
          <div className="section-divider" />
          <p className="font-mono text-xs text-gruvbox-fg4 mt-4">
            <span className="text-neon-green">$</span> history | grep &quot;momentos_que_importam&quot;
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Chapter selector — left sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-1">
              {journeyChapters.map((ch, i) => (
                <motion.button
                  key={ch.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setActiveChapter(i)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg font-mono text-xs transition-all flex items-center gap-2 ${
                    activeChapter === i
                      ? 'bg-neon-green/10 border border-neon-green/20 text-neon-green'
                      : 'text-gruvbox-fg4 hover:text-gruvbox-fg2 hover:bg-gruvbox-bg1/50 border border-transparent'
                  }`}
                >
                  <ChevronRight
                    size={12}
                    className={`shrink-0 transition-transform ${
                      activeChapter === i ? 'rotate-90 text-neon-green' : ''
                    }`}
                  />
                  <div>
                    <span className="block text-[10px] text-gruvbox-gray">
                      {ch.period}
                    </span>
                    <span className="block">{ch.title}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Terminal story — main content */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={chapter.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-gruvbox-bg0 border border-gruvbox-bg2 rounded-lg overflow-hidden">
                  {/* Terminal header */}
                  <div className="flex items-center gap-2 px-4 py-2 bg-gruvbox-bg1 border-b border-gruvbox-bg2">
                    <span className="w-3 h-3 rounded-full bg-gruvbox-red" />
                    <span className="w-3 h-3 rounded-full bg-gruvbox-yellow" />
                    <span className="w-3 h-3 rounded-full bg-gruvbox-green" />
                    <span className="font-mono text-xs text-gruvbox-fg4 ml-2">
                      {chapter.title}
                    </span>
                    <span className="font-mono text-[10px] text-gruvbox-gray ml-auto">
                      {chapter.period}
                    </span>
                  </div>

                  {/* Terminal content */}
                  <div className="p-4 sm:p-5 font-mono text-sm">
                    {/* Command */}
                    <div className="flex gap-2 mb-3">
                      <span className="text-neon-green shrink-0">athos@arch:~$</span>
                      <span className="text-gruvbox-fg2">{chapter.prompt}</span>
                    </div>

                    {/* Story lines */}
                    <div className="pl-0 space-y-0.5">
                      {chapter.lines.map((line, i) => (
                        <motion.p
                          key={i}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.03 }}
                          className={`text-xs leading-relaxed ${
                            line === '' ? 'h-3' : 'text-gruvbox-fg3'
                          }`}
                        >
                          {line}
                        </motion.p>
                      ))}
                    </div>

                    {/* Next prompt */}
                    <div className="flex gap-2 mt-4">
                      <span className="text-neon-green shrink-0">athos@arch:~$</span>
                      <span className="inline-block w-2 h-4 bg-neon-green animate-pulse" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Team Shoutout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <GlowCard neonColor="pink">
            <div className="flex items-center gap-2 mb-3">
              <Heart size={16} className="text-neon-pink" />
              <h3 className="font-display text-xs tracking-wider text-neon-pink">
                Shoutout
              </h3>
            </div>
            <p className="text-xs text-gruvbox-fg3 leading-relaxed mb-4">
              {teamShoutout.message}
            </p>
            <div className="flex flex-wrap gap-2">
              {teamShoutout.members.map((member) => (
                <a
                  key={member.name}
                  href={member.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-gruvbox-bg0/60 border border-gruvbox-bg2/50 hover:border-neon-pink/30 transition-all group"
                >
                  <IconLinkedIn size={12} className="text-gruvbox-fg4 group-hover:text-neon-blue transition-colors" />
                  <span className="font-mono text-[11px] text-gruvbox-fg3 group-hover:text-gruvbox-fg1 transition-colors">
                    {member.name}
                  </span>
                  <ExternalLink size={8} className="text-gruvbox-gray opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </GlowCard>
        </motion.div>

        {/* Fun Facts — JSON style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-6"
        >
          <div className="bg-gruvbox-bg0 border border-gruvbox-bg2 rounded-lg overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2 bg-gruvbox-bg1 border-b border-gruvbox-bg2">
              <span className="w-3 h-3 rounded-full bg-gruvbox-red" />
              <span className="w-3 h-3 rounded-full bg-gruvbox-yellow" />
              <span className="w-3 h-3 rounded-full bg-gruvbox-green" />
              <span className="font-mono text-xs text-gruvbox-fg4 ml-2">
                curiosidades.json
              </span>
            </div>
            <div className="p-4 sm:p-5 font-mono text-xs">
              <span className="text-gruvbox-fg4">{'{'}</span>
              <div className="pl-4 space-y-1">
                <JsonLine k="personalidade" v={`"${funFacts.personality} — O Debatedor"`} />
                <JsonLine k="comida_favorita" v={`"${funFacts.favorite_food}"`} />
                <JsonLine k="jogo_favorito" v={`"${funFacts.favorite_game}"`} />
                <JsonLine k="cabelo" v={`"${funFacts.hair}"`} />
                <JsonLine k="musica" v={`"${funFacts.music}"`} />
                <JsonLine k="hobby_perigoso" v={`"${funFacts.hobby_dangerous}"`} />
                <JsonLine k="distro" v={`"${funFacts.distro}"`} />
                <div>
                  <span className="text-neon-blue">&quot;idiomas&quot;</span>
                  <span className="text-gruvbox-fg4">: [</span>
                </div>
                <div className="pl-4">
                  {funFacts.languages.map((lang, i) => (
                    <div key={lang}>
                      <span className="text-gruvbox-green">&quot;{lang}&quot;</span>
                      {i < funFacts.languages.length - 1 && (
                        <span className="text-gruvbox-fg4">,</span>
                      )}
                    </div>
                  ))}
                </div>
                <span className="text-gruvbox-fg4">],</span>
                <div>
                  <span className="text-neon-blue">&quot;interesses&quot;</span>
                  <span className="text-gruvbox-fg4">: [</span>
                  <span className="text-gruvbox-green">
                    {funFacts.interests.map((i) => `"${i}"`).join(', ')}
                  </span>
                  <span className="text-gruvbox-fg4">]</span>
                </div>
              </div>
              <span className="text-gruvbox-fg4">{'}'}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function JsonLine({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <span className="text-neon-blue">&quot;{k}&quot;</span>
      <span className="text-gruvbox-fg4">: </span>
      <span className="text-gruvbox-green">{v}</span>
      <span className="text-gruvbox-fg4">,</span>
    </div>
  );
}
