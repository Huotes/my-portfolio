'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle } from 'lucide-react';

const tips = [
  { section: 'hero', text: 'Fala! Bem-vindo ao meu cantinho na internet. Rola pra baixo!' },
  { section: 'about', text: 'Prazer, sou o Athos — o coringa do seu baralho.' },
  { section: 'journey', text: 'Cada capítulo me trouxe até aqui. Clique nas abas para navegar.' },
  { section: 'profile', text: 'Passe o mouse nos pontos do radar para os detalhes!' },
  { section: 'experience', text: 'De SP para o interior — cada quest rendeu muito XP.' },
  { section: 'skills', text: 'Filtre por categoria. Automação tá no topo, como deveria.' },
  { section: 'projects', text: 'Jogos, tools de hacking, dotfiles... tem de tudo aqui.' },
  { section: 'certificates', text: 'Loot drops coletados ao longo da jornada.' },
  { section: 'lab', text: 'btw, I use Arch. E sim, eu customizo meus dotfiles.' },
  { section: 'contact', text: 'Bora construir algo juntos? Manda mensagem!' },
];

export default function PixelGuide() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTip, setCurrentTip] = useState(tips[0]);
  const [showBubble, setShowBubble] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Mostra depois de 3s
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Detecta seção visível
  useEffect(() => {
    const handleScroll = () => {
      const sections = tips.map((t) => t.section);
      for (const section of [...sections].reverse()) {
        const el = document.getElementById(section);
        if (el && el.getBoundingClientRect().top <= 300) {
          const tip = tips.find((t) => t.section === section);
          if (tip && tip.section !== currentTip.section) {
            setCurrentTip(tip);
            setShowBubble(true);
            setTimeout(() => setShowBubble(false), 4000);
          }
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentTip]);

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2"
        >
          {/* Speech bubble */}
          <AnimatePresence>
            {showBubble && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 5, scale: 0.95 }}
                className="max-w-[220px] bg-gruvbox-bg1 border border-neon-green/20 rounded-lg p-3 shadow-[0_0_15px_rgba(57,255,20,0.08)]"
              >
                <p className="font-mono text-[11px] text-gruvbox-fg2 leading-relaxed">
                  {currentTip.text}
                </p>
                <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-gruvbox-bg1 border-r border-b border-neon-green/20 rotate-45" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Character */}
          <div className="relative group">
            <motion.button
              onClick={() => setShowBubble(!showBubble)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 rounded-full bg-gruvbox-bg1 border border-neon-green/30 flex items-center justify-center shadow-[0_0_15px_rgba(57,255,20,0.1)] hover:shadow-[0_0_25px_rgba(57,255,20,0.2)] transition-shadow cursor-pointer"
              aria-label="Assistente do portfólio"
            >
              {/* Pixel face */}
              <svg width="28" height="28" viewBox="0 0 16 16" className="pixelated">
                <rect x="4" y="2" width="8" height="8" rx="1" fill="#39ff14" opacity="0.15" />
                <rect x="5" y="4" width="2" height="2" fill="#39ff14" />
                <rect x="9" y="4" width="2" height="2" fill="#39ff14" />
                <rect x="5" y="8" width="6" height="1" fill="#39ff14" />
                <rect x="6" y="7" width="1" height="1" fill="#39ff14" />
                <rect x="9" y="7" width="1" height="1" fill="#39ff14" />
                <rect x="3" y="11" width="10" height="3" rx="1" fill="#39ff14" opacity="0.1" />
                <rect x="4" y="12" width="3" height="1" fill="#39ff14" opacity="0.4" />
                <rect x="9" y="12" width="3" height="1" fill="#39ff14" opacity="0.4" />
              </svg>
            </motion.button>

            {/* Dismiss button */}
            <button
              onClick={() => setDismissed(true)}
              className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gruvbox-bg2 border border-gruvbox-bg3 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Fechar guia"
            >
              <X size={8} className="text-gruvbox-fg4" />
            </button>

            {/* Pulse ring */}
            <motion.div
              className="absolute inset-0 rounded-full border border-neon-green/20"
              animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
