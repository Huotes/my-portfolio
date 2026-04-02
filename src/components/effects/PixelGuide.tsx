"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type Mood = "idle" | "happy" | "thinking" | "excited" | "sleepy" | "talking";

interface Message {
  text: string;
  type: "guide" | "question" | "reaction";
  options?: string[];
}

const sectionTips: Record<string, string> = {
  hero: "Fala! Bem-vindo ao meu cantinho. Rola pra baixo pra me conhecer!",
  about: "Prazer! Sou o guia do Athos. Ele programa desde os 15, sabia?",
  journey: "Cada capítulo conta um pedaço da história. Clica nas abas!",
  profile: "Passa o mouse nos pontos do radar pra ver os detalhes.",
  experience: "De São Paulo ao interior — cada quest rendeu XP real.",
  skills: "Filtra por categoria. Automação tá no topo!",
  projects: "Jogos, tools de hacking, dotfiles... tem de tudo.",
  certificates: "Loot drops! Clica pra ver o preview de cada um.",
  lab: "btw, he uses Arch. E sim, ele customiza os dotfiles.",
  contact: "Bora trocar ideia? Manda mensagem pro Athos!",
};

const conversations: Message[][] = [
  [
    { text: "E aí! Tudo bem? Deixa eu me apresentar...", type: "guide" },
    {
      text: "Sou o assistente do portfólio do Athos! Posso te guiar por aqui.",
      type: "guide",
    },
    {
      text: "Quer saber algo sobre ele?",
      type: "question",
      options: ["Quem é o Athos?", "Skills dele", "Projetos legais"],
    },
  ],
  [
    {
      text: "Me conta: o que te trouxe aqui?",
      type: "question",
      options: ["Curiosidade", "Procurando dev", "Vi no LinkedIn"],
    },
  ],
  [
    { text: "Pergunta rápida pra você:", type: "guide" },
    {
      text: "Qual área te interessa mais?",
      type: "question",
      options: ["Backend", "Segurança", "Game Dev", "DevOps"],
    },
  ],
  [
    {
      text: "Sabia que o Athos já criou jogos, ferramentas de pentest e até automações governamentais?",
      type: "guide",
    },
    {
      text: "Impressionante pra 21 anos, né?",
      type: "question",
      options: ["Demais!", "Quero saber mais"],
    },
  ],
];

const reactions: Record<string, string> = {
  "Quem é o Athos?":
    'Dev sênior, 21 anos, generalista full-stack. O coringa do baralho! Dá uma olhada na seção "Sobre".',
  "Skills dele":
    "Automação, DevOps e Backend são os top 3. Confere a Skill Tree!",
  "Projetos legais":
    "Cowgirl in Hell, GateHunter, 4viegomains... tá na seção Projetos!",
  Curiosidade:
    "Que bom! Fica à vontade, explora tudo. O portfólio é interativo!",
  "Procurando dev":
    "Achou o cara certo! Rola até o final pra entrar em contato.",
  "Vi no LinkedIn": "Show! O Athos mantém o LinkedIn sempre atualizado também.",
  Backend: "Python, Django, Flask, FastAPI, Go... ele domina o servidor!",
  Segurança: "Pentesting, OWASP, GateHunter... segurança é paixão dele.",
  "Game Dev":
    "De Game Maker a Godot — ele já publicou vários jogos no itch.io!",
  DevOps: "Docker, K8s, CI/CD, AWS... ele monta a infra inteira.",
  "Demais!": "Né?! E olha que ele ainda tá na faculdade!",
  "Quero saber mais": "Explora as seções! Cada uma tem algo diferente.",
};

function PixelCharacter({ mood, size = 40 }: { mood: Mood; size?: number }) {
  const eyeY = mood === "sleepy" ? 13 : 11;
  const eyeH = mood === "sleepy" ? 1 : 2;
  const mouthY = mood === "happy" || mood === "excited" ? 17 : 18;
  const mouthW = mood === "excited" ? 6 : mood === "happy" ? 4 : 3;
  const mouthX = mood === "excited" ? 9 : mood === "happy" ? 10 : 10;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className="pixelated"
      style={{ imageRendering: "pixelated" }}
    >
      {/* Head */}
      <rect
        x="6"
        y="4"
        width="12"
        height="14"
        rx="2"
        fill="#282828"
        stroke="#39ff14"
        strokeWidth="0.5"
      />

      {/* Eyes */}
      <rect
        x="9"
        y={eyeY}
        width="2"
        height={eyeH}
        fill={mood === "excited" ? "#fabd2f" : "#39ff14"}
      />
      <rect
        x="14"
        y={eyeY}
        width="2"
        height={eyeH}
        fill={mood === "excited" ? "#fabd2f" : "#39ff14"}
      />

      {/* Pupils / blink */}
      {mood === "thinking" && (
        <>
          <rect x="9" y="9" width="2" height="1" fill="#39ff14" opacity="0.4" />
          <rect
            x="14"
            y="9"
            width="2"
            height="1"
            fill="#39ff14"
            opacity="0.4"
          />
        </>
      )}

      {/* Mouth */}
      <rect
        x={mouthX}
        y={mouthY}
        width={mouthW}
        height="1"
        fill={mood === "excited" ? "#fb4934" : "#8ec07c"}
      />
      {(mood === "happy" || mood === "excited") && (
        <rect
          x={mouthX + 1}
          y={mouthY + 1}
          width={mouthW - 2}
          height="1"
          fill={mood === "excited" ? "#fb4934" : "#8ec07c"}
        />
      )}

      {/* Antenna */}
      <rect x="11" y="2" width="2" height="3" fill="#39ff14" />
      <rect
        x="10"
        y="1"
        width="4"
        height="1"
        fill={
          mood === "excited"
            ? "#fabd2f"
            : mood === "talking"
              ? "#00f0ff"
              : "#39ff14"
        }
      >
        {mood !== "sleepy" && (
          <animate
            attributeName="opacity"
            values="1;0.3;1"
            dur="1.5s"
            repeatCount="indefinite"
          />
        )}
      </rect>

      {/* Body */}
      <rect
        x="8"
        y="19"
        width="8"
        height="4"
        rx="1"
        fill="#282828"
        stroke="#39ff14"
        strokeWidth="0.3"
      />

      {/* Arms */}
      {mood === "excited" && (
        <>
          <rect
            x="5"
            y="19"
            width="3"
            height="1"
            fill="#39ff14"
            opacity="0.6"
          />
          <rect
            x="16"
            y="19"
            width="3"
            height="1"
            fill="#39ff14"
            opacity="0.6"
          />
        </>
      )}

      {/* Z's for sleepy */}
      {mood === "sleepy" && (
        <text x="18" y="8" fill="#a89984" fontSize="4" fontFamily="monospace">
          z
        </text>
      )}
    </svg>
  );
}

export default function PixelGuide() {
  const [isVisible, setIsVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [mood, setMood] = useState<Mood>("idle");
  const [bubbleText, setBubbleText] = useState("");
  const [showBubble, setShowBubble] = useState(false);
  const [showOptions, setShowOptions] = useState<string[]>([]);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatLog, setChatLog] = useState<
    Array<{ from: "guide" | "user"; text: string }>
  >([]);
  const [convIndex, setConvIndex] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);
  const [interactionCount, setInteractionCount] = useState(0);

  // Show after 2s
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      setMood("happy");
      setBubbleText("Oi! Clica em mim pra conversar!");
      setShowBubble(true);
      setTimeout(() => {
        if (!chatOpen) setShowBubble(false);
      }, 4000);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Section-based tips when scrolling (only when chat is closed)
  useEffect(() => {
    if (chatOpen) return;

    const handleScroll = () => {
      const sections = Object.keys(sectionTips);
      for (const section of [...sections].reverse()) {
        const el = document.getElementById(section);
        if (el && el.getBoundingClientRect().top <= 300) {
          setBubbleText(sectionTips[section]);
          setShowBubble(true);
          setMood("talking");
          setTimeout(() => {
            setShowBubble(false);
            setMood("idle");
          }, 3500);
          break;
        }
      }
    };

    let timeout: NodeJS.Timeout;
    const debounced = () => {
      clearTimeout(timeout);
      timeout = setTimeout(handleScroll, 500);
    };

    window.addEventListener("scroll", debounced, { passive: true });
    return () => {
      window.removeEventListener("scroll", debounced);
      clearTimeout(timeout);
    };
  }, [chatOpen]);

  // Sleepy after inactivity
  useEffect(() => {
    if (chatOpen) return;
    const sleepTimer = setTimeout(() => setMood("sleepy"), 30000);
    return () => clearTimeout(sleepTimer);
  }, [interactionCount, chatOpen]);

  const openChat = useCallback(() => {
    setChatOpen(true);
    setShowBubble(false);
    setMood("excited");
    setInteractionCount((c) => c + 1);

    if (chatLog.length === 0) {
      const firstConv = conversations[0];
      const firstMsg = firstConv[0];
      setChatLog([{ from: "guide", text: firstMsg.text }]);
      setConvIndex(0);
      setMsgIndex(0);

      // Auto-advance messages
      firstConv.forEach((msg, i) => {
        if (i === 0) return;
        setTimeout(() => {
          setChatLog((prev) => [...prev, { from: "guide", text: msg.text }]);
          setMsgIndex(i);
          if (msg.options) setShowOptions(msg.options);
          setMood(msg.type === "question" ? "thinking" : "talking");
        }, i * 1500);
      });
    }
  }, [chatLog.length]);

  const handleOption = useCallback(
    (option: string) => {
      setChatLog((prev) => [...prev, { from: "user", text: option }]);
      setShowOptions([]);
      setMood("happy");
      setInteractionCount((c) => c + 1);

      const reaction =
        reactions[option] || "Interessante! Explora as seções pra saber mais.";

      setTimeout(() => {
        setChatLog((prev) => [...prev, { from: "guide", text: reaction }]);
        setMood("excited");

        // Queue next conversation
        setTimeout(() => {
          const nextConv = convIndex + 1;
          if (nextConv < conversations.length) {
            const conv = conversations[nextConv];
            setConvIndex(nextConv);

            conv.forEach((msg, i) => {
              setTimeout(
                () => {
                  setChatLog((prev) => [
                    ...prev,
                    { from: "guide", text: msg.text },
                  ]);
                  if (msg.options) setShowOptions(msg.options);
                  setMood(msg.type === "question" ? "thinking" : "talking");
                },
                (i + 1) * 1500,
              );
            });
          } else {
            setTimeout(() => {
              setChatLog((prev) => [
                ...prev,
                {
                  from: "guide",
                  text: "Foi ótimo conversar! Explora o portfólio à vontade. Estarei aqui se precisar!",
                },
              ]);
              setMood("happy");
            }, 2000);
          }
        }, 2000);
      }, 800);
    },
    [convIndex],
  );

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2"
        >
          {/* Chat window */}
          <AnimatePresence>
            {chatOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="w-[280px] sm:w-[320px] max-h-[380px] bg-gruvbox-bg0 border border-neon-green/20 rounded-lg shadow-[0_0_25px_rgba(57,255,20,0.08)] overflow-hidden flex flex-col"
              >
                {/* Chat header */}
                <div className="flex items-center justify-between px-3 py-2 bg-gruvbox-bg1 border-b border-gruvbox-bg2">
                  <div className="flex items-center gap-2">
                    <PixelCharacter mood={mood} size={20} />
                    <div>
                      <span className="font-mono text-[10px] text-neon-green block leading-tight">
                        pixel_guide
                      </span>
                      <span className="font-mono text-[8px] text-gruvbox-gray">
                        {mood === "sleepy"
                          ? "zzz..."
                          : mood === "thinking"
                            ? "pensando..."
                            : "online"}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setChatOpen(false)}
                    className="text-gruvbox-fg4 hover:text-neon-green transition-colors p-1"
                  >
                    <X size={14} />
                  </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-3 space-y-2 min-h-[200px] max-h-[260px] scrollbar-thin">
                  {chatLog.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] px-2.5 py-1.5 rounded-lg font-mono text-[11px] leading-relaxed ${
                          msg.from === "user"
                            ? "bg-neon-green/10 text-neon-green border border-neon-green/20"
                            : "bg-gruvbox-bg1 text-gruvbox-fg3 border border-gruvbox-bg2/50"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </motion.div>
                  ))}

                  {/* Options */}
                  {showOptions.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-wrap gap-1.5 pt-1"
                    >
                      {showOptions.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleOption(opt)}
                          className="px-2.5 py-1 font-mono text-[10px] rounded border border-neon-blue/30 text-neon-blue hover:bg-neon-blue/10 hover:border-neon-blue/50 transition-all"
                        >
                          {opt}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating bubble (when chat is closed) */}
          <AnimatePresence>
            {showBubble && !chatOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 5, scale: 0.95 }}
                className="max-w-[200px] bg-gruvbox-bg1 border border-neon-green/20 rounded-lg p-2.5 shadow-[0_0_15px_rgba(57,255,20,0.06)] relative"
              >
                <p className="font-mono text-[10px] text-gruvbox-fg3 leading-relaxed">
                  {bubbleText}
                </p>
                <div className="absolute -bottom-1.5 right-5 w-3 h-3 bg-gruvbox-bg1 border-r border-b border-neon-green/20 rotate-45" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Character button */}
          <div className="relative group">
            <motion.button
              onClick={chatOpen ? () => setChatOpen(false) : openChat}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onMouseEnter={() => {
                if (mood === "sleepy") setMood("happy");
                setInteractionCount((c) => c + 1);
              }}
              className="w-14 h-14 rounded-full bg-gruvbox-bg1 border border-neon-green/30 flex items-center justify-center shadow-[0_0_15px_rgba(57,255,20,0.1)] hover:shadow-[0_0_25px_rgba(57,255,20,0.2)] transition-shadow cursor-pointer relative overflow-hidden"
              aria-label="Assistente do portfólio"
            >
              <PixelCharacter mood={mood} size={36} />
            </motion.button>

            {/* Dismiss */}
            <button
              onClick={() => setDismissed(true)}
              className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gruvbox-bg2 border border-gruvbox-bg3 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Fechar guia"
            >
              <X size={8} className="text-gruvbox-fg4" />
            </button>

            {/* Pulse */}
            {!chatOpen && (
              <motion.div
                className="absolute inset-0 rounded-full border border-neon-green/20"
                animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            )}

            {/* Notification dot when new messages */}
            {!chatOpen && interactionCount === 0 && (
              <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-neon-pink border-2 border-gruvbox-bg1 animate-pulse" />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
