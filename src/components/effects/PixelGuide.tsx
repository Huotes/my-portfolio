"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import {
  X,
  MessageCircle,
  Gamepad2,
  Sparkles,
  GripVertical,
} from "lucide-react";

// ═══════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════
type Mood =
  | "idle"
  | "happy"
  | "thinking"
  | "excited"
  | "sleepy"
  | "talking"
  | "angry"
  | "love"
  | "dizzy";
type Panel =
  | "none"
  | "menu"
  | "chat"
  | "game-select"
  | "game-rps"
  | "game-guess"
  | "game-coin";

interface ChatMsg {
  from: "baw" | "user";
  text: string;
}

// ═══════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════
const sectionTips: Record<string, string> = {
  hero: "Baw-vindo! Rola pra baixo pra conhecer o Athos!",
  about: "Programando desde os 15 — respect!",
  journey: "Clica nas abas pra navegar pela história!",
  profile: "Passa o mouse nos pontos do radar!",
  experience: "Cada quest rendeu XP de verdade.",
  skills: "Filtra por categoria. Automação tá no topo!",
  projects: "Jogos, tools, dotfiles... tem de tudo.",
  certificates: "Loot drops! Clica pra ver preview.",
  lab: "btw, he uses Arch.",
  contact: "Manda msg pro Athos! Ele responde rápido.",
};

const chatConversations = [
  {
    q: "Quem é o Athos?",
    a: "Dev sênior de 21 anos, generalista full-stack. O coringa do baralho! Dá uma olhada na seção Sobre.",
  },
  {
    q: "Quais as skills dele?",
    a: "Automação, DevOps e Backend são o top 3. Python é a linguagem do coração.",
  },
  {
    q: "Ele faz jogos?",
    a: "Sim! De Game Maker a Godot — tem jogos publicados no itch.io. Cowgirl in Hell é brutal!",
  },
  {
    q: "Como contatar?",
    a: "Rola até a seção Contato ou manda email: aureliodosol@gmail.com",
  },
  {
    q: "O que é esse portfólio?",
    a: "Next.js + Tailwind + Framer Motion, tema Gruvbox com neon. Eu sou o mascote!",
  },
  {
    q: "Me surpreenda!",
    a: "Sabia que o Athos morou sozinho em SP aos 18 e já fez freelance pra gente do mundo todo?",
  },
];

const rpsOptions = ["Pedra", "Papel", "Tesoura"] as const;
const rpsEmoji: Record<string, string> = {
  Pedra: "🪨",
  Papel: "📄",
  Tesoura: "✂️",
};

const bawPhrases = [
  "Tô de boa aqui no canto...",
  "Me arrasta pra outro lugar se quiser!",
  "Baw baw! 🐾",
  "Será que tem bug nesse portfólio? Duvido.",
  "O Athos programa até dormindo, acho.",
  "Chacoalha o mouse em cima de mim!",
  "Quer jogar? Clica em mim!",
  "Gruvbox é a melhor paleta. Não aceito críticas.",
];

// ═══════════════════════════════════════════════
// PIXEL CHARACTER SVG
// ═══════════════════════════════════════════════
function BawCharacter({ mood, size = 40 }: { mood: Mood; size?: number }) {
  const eyeOpen = !["sleepy", "dizzy"].includes(mood);
  const eyeY = eyeOpen ? 10 : 12;
  const eyeH = eyeOpen ? 3 : 1;

  const leftEyeColor =
    mood === "love"
      ? "#fb4934"
      : mood === "excited"
        ? "#fabd2f"
        : mood === "angry"
          ? "#fb4934"
          : mood === "dizzy"
            ? "#fe8019"
            : "#39ff14";

  const rightEyeColor =
    mood === "love" ? "#fb4934" : mood === "dizzy" ? "#83a598" : leftEyeColor;

  const mouthProps = (() => {
    switch (mood) {
      case "happy":
      case "excited":
      case "love":
        return {
          x: 9,
          y: 16,
          w: 6,
          h: 1,
          extra: <rect x="10" y="17" width="4" height="1" fill="#8ec07c" />,
        };
      case "angry":
        return {
          x: 9,
          y: 17,
          w: 6,
          h: 1,
          extra: <rect x="10" y="16" width="4" height="1" fill="#fb4934" />,
        };
      case "dizzy":
        return { x: 10, y: 17, w: 4, h: 1, extra: null };
      default:
        return { x: 10, y: 17, w: 3, h: 1, extra: null };
    }
  })();

  const antennaColor =
    mood === "excited"
      ? "#fabd2f"
      : mood === "talking"
        ? "#00f0ff"
        : mood === "love"
          ? "#fb4934"
          : mood === "angry"
            ? "#fb4934"
            : "#39ff14";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      style={{ imageRendering: "pixelated" as const }}
    >
      {/* Antenna */}
      <rect x="11" y="2" width="2" height="3" fill="#39ff14" />
      <rect x="10" y="1" width="4" height="1" fill={antennaColor}>
        {mood !== "sleepy" && (
          <animate
            attributeName="opacity"
            values="1;0.3;1"
            dur={mood === "excited" ? "0.5s" : "1.5s"}
            repeatCount="indefinite"
          />
        )}
      </rect>

      {/* Head */}
      <rect
        x="5"
        y="4"
        width="14"
        height="14"
        rx="2"
        fill="#282828"
        stroke="#39ff14"
        strokeWidth="0.5"
      />

      {/* Eyebrows (angry) */}
      {mood === "angry" && (
        <>
          <line
            x1="8"
            y1="8"
            x2="11"
            y2="9"
            stroke="#fb4934"
            strokeWidth="0.8"
          />
          <line
            x1="16"
            y1="8"
            x2="13"
            y2="9"
            stroke="#fb4934"
            strokeWidth="0.8"
          />
        </>
      )}

      {/* Eyes */}
      {mood === "love" ? (
        <>
          <text x="7.5" y="14" fontSize="5" fill="#fb4934">
            ♥
          </text>
          <text x="13.5" y="14" fontSize="5" fill="#fb4934">
            ♥
          </text>
        </>
      ) : mood === "dizzy" ? (
        <>
          <text x="8" y="14" fontSize="5" fill="#fe8019" fontFamily="monospace">
            ×
          </text>
          <text
            x="14"
            y="14"
            fontSize="5"
            fill="#83a598"
            fontFamily="monospace"
          >
            ×
          </text>
        </>
      ) : (
        <>
          <rect
            x="8"
            y={eyeY}
            width="3"
            height={eyeH}
            rx="0.5"
            fill={leftEyeColor}
          />
          <rect
            x="14"
            y={eyeY}
            width="3"
            height={eyeH}
            rx="0.5"
            fill={rightEyeColor}
          />
        </>
      )}

      {/* Mouth */}
      <rect
        x={mouthProps.x}
        y={mouthProps.y}
        width={mouthProps.w}
        height={mouthProps.h}
        fill={mood === "angry" ? "#fb4934" : "#8ec07c"}
      />
      {mouthProps.extra}

      {/* Body */}
      <rect
        x="7"
        y="19"
        width="10"
        height="4"
        rx="1"
        fill="#282828"
        stroke="#39ff14"
        strokeWidth="0.3"
      />

      {/* "B" on body */}
      <text
        x="10"
        y="22.5"
        fontSize="3"
        fill="#39ff14"
        fontFamily="monospace"
        fontWeight="bold"
      >
        B
      </text>

      {/* Arms */}
      {mood === "excited" && (
        <>
          <rect
            x="3"
            y="19"
            width="4"
            height="1.5"
            rx="0.5"
            fill="#39ff14"
            opacity="0.6"
          />
          <rect
            x="17"
            y="19"
            width="4"
            height="1.5"
            rx="0.5"
            fill="#39ff14"
            opacity="0.6"
          />
        </>
      )}

      {/* Sleepy Z */}
      {mood === "sleepy" && (
        <>
          <text
            x="18"
            y="6"
            fill="#a89984"
            fontSize="3.5"
            fontFamily="monospace"
            fontWeight="bold"
          >
            Z
          </text>
          <text
            x="20"
            y="4"
            fill="#a89984"
            fontSize="2.5"
            fontFamily="monospace"
          >
            z
          </text>
        </>
      )}
    </svg>
  );
}

// ═══════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════
export default function PixelGuide() {
  const [dismissed, setDismissed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [mood, setMood] = useState<Mood>("idle");
  const [panel, setPanel] = useState<Panel>("none");
  const [bubbleText, setBubbleText] = useState("");
  const [showBubble, setShowBubble] = useState(false);

  // Chat
  const [chatLog, setChatLog] = useState<ChatMsg[]>([]);
  const [availableQs, setAvailableQs] = useState(
    chatConversations.map((c) => c.q),
  );

  // Games
  const [rpsScore, setRpsScore] = useState({ baw: 0, you: 0 });
  const [rpsResult, setRpsResult] = useState("");
  const [guessTarget, setGuessTarget] = useState(0);
  const [guessAttempts, setGuessAttempts] = useState(0);
  const [guessHint, setGuessHint] = useState("Escolha um número de 1 a 10!");
  const [coinResult, setCoinResult] = useState("");
  const [coinFlipping, setCoinFlipping] = useState(false);

  // Shake detection
  const shakeRef = useRef(0);
  const lastMousePos = useRef({ x: 0, y: 0 });

  // Idle expression cycle
  const [expressionTimer, setExpressionTimer] = useState(0);

  // ─── Lifecycle ───
  useEffect(() => {
    const t = setTimeout(() => {
      setIsVisible(true);
      setMood("happy");
      setBubbleText("Oi! Sou o Baw! Clica em mim!");
      setShowBubble(true);
      setTimeout(() => setShowBubble(false), 4000);
    }, 2000);
    return () => clearTimeout(t);
  }, []);

  // Random mood changes
  useEffect(() => {
    if (panel !== "none") return;
    const moods: Mood[] = [
      "idle",
      "happy",
      "thinking",
      "idle",
      "happy",
      "excited",
      "idle",
    ];
    const interval = setInterval(() => {
      const randomMood = moods[Math.floor(Math.random() * moods.length)];
      setMood(randomMood);
      setExpressionTimer((t) => t + 1);

      // Random bubble
      if (Math.random() > 0.6) {
        const phrase =
          bawPhrases[Math.floor(Math.random() * bawPhrases.length)];
        setBubbleText(phrase);
        setShowBubble(true);
        setTimeout(() => setShowBubble(false), 3000);
      }
    }, 6000);
    return () => clearInterval(interval);
  }, [panel]);

  // Sleepy after 45s no interaction
  useEffect(() => {
    if (panel !== "none") return;
    const sleepTimer = setTimeout(() => setMood("sleepy"), 45000);
    return () => clearTimeout(sleepTimer);
  }, [expressionTimer, panel]);

  // Section tips on scroll
  useEffect(() => {
    if (panel !== "none") return;
    let lastSection = "";
    const handleScroll = () => {
      const sections = Object.keys(sectionTips);
      for (const s of [...sections].reverse()) {
        const el = document.getElementById(s);
        if (el && el.getBoundingClientRect().top <= 300 && s !== lastSection) {
          lastSection = s;
          setBubbleText(sectionTips[s]);
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
      timeout = setTimeout(handleScroll, 800);
    };
    window.addEventListener("scroll", debounced, { passive: true });
    return () => {
      window.removeEventListener("scroll", debounced);
      clearTimeout(timeout);
    };
  }, [panel]);

  // Shake detection via rapid mouse movements over the character
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const dx = Math.abs(e.clientX - lastMousePos.current.x);
    const dy = Math.abs(e.clientY - lastMousePos.current.y);
    lastMousePos.current = { x: e.clientX, y: e.clientY };

    if (dx + dy > 30) {
      shakeRef.current += 1;
      if (shakeRef.current > 8) {
        shakeRef.current = 0;
        setMood("dizzy");
        setBubbleText("Aiii! Para de me chacoalhar! 🌀");
        setShowBubble(true);
        setTimeout(() => {
          const reactions = [
            "Tá bom, mudei de ideia!",
            "Ok ok, você venceu!",
            "Baw tá tonto mas aceita.",
            "Minha opinião agora é outra!",
          ];
          setBubbleText(
            reactions[Math.floor(Math.random() * reactions.length)],
          );
          setMood("happy");
          setTimeout(() => setShowBubble(false), 3000);
        }, 2000);
      }
    } else {
      shakeRef.current = Math.max(0, shakeRef.current - 1);
    }
  }, []);

  // ─── Panel handlers ───
  const openPanel = (p: Panel) => {
    setPanel(p);
    setShowBubble(false);
    setMood("excited");
    if (p === "game-guess") {
      setGuessTarget(Math.floor(Math.random() * 10) + 1);
      setGuessAttempts(0);
      setGuessHint("Escolha um número de 1 a 10!");
    }
  };

  const handleChatQ = (q: string) => {
    const conv = chatConversations.find((c) => c.q === q);
    if (!conv) return;
    setChatLog((prev) => [
      ...prev,
      { from: "user", text: q },
      { from: "baw", text: conv.a },
    ]);
    setAvailableQs((prev) => prev.filter((p) => p !== q));
    setMood("talking");
    setTimeout(() => setMood("happy"), 2000);
  };

  const playRPS = (choice: (typeof rpsOptions)[number]) => {
    const bawChoice = rpsOptions[Math.floor(Math.random() * 3)];
    let result = "";
    if (choice === bawChoice) {
      result = `Empate! Baw também escolheu ${rpsEmoji[bawChoice]}`;
      setMood("thinking");
    } else if (
      (choice === "Pedra" && bawChoice === "Tesoura") ||
      (choice === "Papel" && bawChoice === "Pedra") ||
      (choice === "Tesoura" && bawChoice === "Papel")
    ) {
      result = `Você ganhou! Baw jogou ${rpsEmoji[bawChoice]}`;
      setRpsScore((s) => ({ ...s, you: s.you + 1 }));
      setMood("angry");
      setTimeout(() => setMood("happy"), 2000);
    } else {
      result = `Baw ganhou! Baw jogou ${rpsEmoji[bawChoice]}`;
      setRpsScore((s) => ({ ...s, baw: s.baw + 1 }));
      setMood("excited");
    }
    setRpsResult(result);
  };

  const handleGuess = (n: number) => {
    setGuessAttempts((a) => a + 1);
    if (n === guessTarget) {
      setGuessHint(`Acertou em ${guessAttempts + 1} tentativa(s)! 🎉`);
      setMood("love");
    } else if (n < guessTarget) {
      setGuessHint("Maior! ⬆️");
      setMood("thinking");
    } else {
      setGuessHint("Menor! ⬇️");
      setMood("thinking");
    }
  };

  const flipCoin = () => {
    setCoinFlipping(true);
    setCoinResult("");
    setMood("excited");
    setTimeout(() => {
      const result = Math.random() > 0.5 ? "Cara! 🪙" : "Coroa! 👑";
      setCoinResult(result);
      setCoinFlipping(false);
      setMood("happy");
    }, 1000);
  };

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          drag
          dragMomentum={false}
          dragElastic={0.1}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2 touch-none"
          style={{ cursor: "default" }}
          onMouseMove={handleMouseMove}
        >
          {/* ═══ PANELS ═══ */}
          <AnimatePresence mode="wait">
            {panel !== "none" && (
              <motion.div
                key={panel}
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="w-[280px] sm:w-[300px] bg-gruvbox-bg0 border border-neon-green/20 rounded-lg shadow-[0_0_25px_rgba(57,255,20,0.08)] overflow-hidden"
              >
                {/* Panel header */}
                <div className="flex items-center justify-between px-3 py-2 bg-gruvbox-bg1 border-b border-gruvbox-bg2">
                  <div className="flex items-center gap-2">
                    <BawCharacter mood={mood} size={18} />
                    <span className="font-mono text-[11px] text-neon-green">
                      {panel === "chat"
                        ? "baw://chat"
                        : panel === "menu"
                          ? "baw://menu"
                          : panel.startsWith("game")
                            ? "baw://arcade"
                            : "baw"}
                    </span>
                  </div>
                  <button
                    onClick={() => setPanel("none")}
                    className="text-gruvbox-fg4 hover:text-neon-green transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>

                {/* ─── MENU ─── */}
                {panel === "menu" && (
                  <div className="p-3 space-y-2">
                    <p className="font-mono text-[10px] text-gruvbox-fg4 mb-2">
                      {">"} Oi! Sou o Baw, seu guia. O que quer fazer?
                    </p>
                    {[
                      {
                        label: "Conversar",
                        icon: MessageCircle,
                        p: "chat" as Panel,
                      },
                      {
                        label: "Jogar",
                        icon: Gamepad2,
                        p: "game-select" as Panel,
                      },
                      {
                        label: "Me chacoalha!",
                        icon: Sparkles,
                        p: "none" as Panel,
                      },
                    ].map((item) => (
                      <button
                        key={item.label}
                        onClick={() => {
                          if (item.label === "Me chacoalha!") {
                            setPanel("none");
                            setMood("dizzy");
                            setBubbleText(
                              "Weee! 🌀 Chacoalha o mouse em cima de mim!",
                            );
                            setShowBubble(true);
                            setTimeout(() => {
                              setShowBubble(false);
                              setMood("happy");
                            }, 3000);
                          } else {
                            openPanel(item.p);
                          }
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-gruvbox-bg1/50 border border-gruvbox-bg2/50 hover:border-neon-green/30 hover:bg-neon-green/5 transition-all font-mono text-xs text-gruvbox-fg3 hover:text-neon-green"
                      >
                        <item.icon size={14} />
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}

                {/* ─── CHAT ─── */}
                {panel === "chat" && (
                  <div className="flex flex-col max-h-[320px]">
                    <div className="flex-1 overflow-y-auto p-3 space-y-2 min-h-[160px]">
                      {chatLog.length === 0 && (
                        <p className="font-mono text-[10px] text-gruvbox-gray text-center py-4">
                          Escolha uma pergunta abaixo!
                        </p>
                      )}
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
                    </div>
                    {availableQs.length > 0 && (
                      <div className="p-2 border-t border-gruvbox-bg2 space-y-1">
                        {availableQs.map((q) => (
                          <button
                            key={q}
                            onClick={() => handleChatQ(q)}
                            className="w-full text-left px-2 py-1.5 font-mono text-[10px] text-neon-blue hover:bg-neon-blue/5 rounded border border-transparent hover:border-neon-blue/20 transition-all"
                          >
                            {"> "}
                            {q}
                          </button>
                        ))}
                      </div>
                    )}
                    {availableQs.length === 0 && chatLog.length > 0 && (
                      <div className="p-3 border-t border-gruvbox-bg2">
                        <p className="font-mono text-[10px] text-gruvbox-gray text-center">
                          Sem mais perguntas! Explora o portfólio 🚀
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* ─── GAME SELECT ─── */}
                {panel === "game-select" && (
                  <div className="p-3 space-y-2">
                    <p className="font-mono text-[10px] text-gruvbox-fg4 mb-2">
                      {">"} Escolhe um minigame!
                    </p>
                    {[
                      {
                        label: "Pedra Papel Tesoura",
                        p: "game-rps" as Panel,
                        emoji: "✊",
                      },
                      {
                        label: "Adivinhe o Número",
                        p: "game-guess" as Panel,
                        emoji: "🔢",
                      },
                      {
                        label: "Cara ou Coroa",
                        p: "game-coin" as Panel,
                        emoji: "🪙",
                      },
                    ].map((g) => (
                      <button
                        key={g.label}
                        onClick={() => openPanel(g.p)}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-gruvbox-bg1/50 border border-gruvbox-bg2/50 hover:border-neon-pink/30 hover:bg-neon-pink/5 transition-all font-mono text-xs text-gruvbox-fg3 hover:text-neon-pink"
                      >
                        <span>{g.emoji}</span>
                        {g.label}
                      </button>
                    ))}
                  </div>
                )}

                {/* ─── GAME: RPS ─── */}
                {panel === "game-rps" && (
                  <div className="p-3 text-center">
                    <p className="font-mono text-[10px] text-gruvbox-fg4 mb-3">
                      Baw {rpsScore.baw} × {rpsScore.you} Você
                    </p>
                    <div className="flex justify-center gap-2 mb-3">
                      {rpsOptions.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => playRPS(opt)}
                          className="px-3 py-2 rounded-lg bg-gruvbox-bg1 border border-gruvbox-bg2 hover:border-neon-green/40 hover:bg-neon-green/5 transition-all font-mono text-sm"
                        >
                          {rpsEmoji[opt]}
                        </button>
                      ))}
                    </div>
                    {rpsResult && (
                      <motion.p
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="font-mono text-[11px] text-gruvbox-fg2"
                      >
                        {rpsResult}
                      </motion.p>
                    )}
                    <button
                      onClick={() => openPanel("game-select")}
                      className="mt-3 font-mono text-[9px] text-gruvbox-gray hover:text-gruvbox-fg4 transition-colors"
                    >
                      ← voltar
                    </button>
                  </div>
                )}

                {/* ─── GAME: GUESS ─── */}
                {panel === "game-guess" && (
                  <div className="p-3 text-center">
                    <p className="font-mono text-[11px] text-gruvbox-fg2 mb-3">
                      {guessHint}
                    </p>
                    <div className="grid grid-cols-5 gap-1.5 mb-3">
                      {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                        <button
                          key={n}
                          onClick={() => handleGuess(n)}
                          disabled={guessHint.includes("Acertou")}
                          className="px-2 py-1.5 rounded bg-gruvbox-bg1 border border-gruvbox-bg2 hover:border-neon-blue/40 hover:bg-neon-blue/5 transition-all font-mono text-xs text-gruvbox-fg3 disabled:opacity-30"
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                    {guessHint.includes("Acertou") && (
                      <button
                        onClick={() => openPanel("game-guess")}
                        className="font-mono text-[10px] text-neon-green hover:underline"
                      >
                        Jogar de novo
                      </button>
                    )}
                    <br />
                    <button
                      onClick={() => openPanel("game-select")}
                      className="mt-2 font-mono text-[9px] text-gruvbox-gray hover:text-gruvbox-fg4 transition-colors"
                    >
                      ← voltar
                    </button>
                  </div>
                )}

                {/* ─── GAME: COIN ─── */}
                {panel === "game-coin" && (
                  <div className="p-3 text-center">
                    <p className="font-mono text-[10px] text-gruvbox-fg4 mb-3">
                      Cara ou Coroa?
                    </p>
                    <motion.div
                      animate={coinFlipping ? { rotateY: [0, 360, 720] } : {}}
                      transition={{ duration: 1 }}
                      className="text-4xl mb-3"
                    >
                      🪙
                    </motion.div>
                    <button
                      onClick={flipCoin}
                      disabled={coinFlipping}
                      className="px-4 py-2 rounded-lg bg-gruvbox-bg1 border border-neon-green/30 hover:bg-neon-green/10 transition-all font-mono text-xs text-neon-green disabled:opacity-50"
                    >
                      {coinFlipping ? "Girando..." : "Lançar!"}
                    </button>
                    {coinResult && (
                      <motion.p
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-3 font-mono text-lg text-gruvbox-fg1"
                      >
                        {coinResult}
                      </motion.p>
                    )}
                    <br />
                    <button
                      onClick={() => openPanel("game-select")}
                      className="mt-2 font-mono text-[9px] text-gruvbox-gray hover:text-gruvbox-fg4 transition-colors"
                    >
                      ← voltar
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* ═══ FLOATING BUBBLE ═══ */}
          <AnimatePresence>
            {showBubble && panel === "none" && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 5, scale: 0.95 }}
                className="max-w-[200px] bg-gruvbox-bg1 border border-neon-green/20 rounded-lg p-2.5 shadow-[0_0_12px_rgba(57,255,20,0.06)] relative"
              >
                <p className="font-mono text-[10px] text-gruvbox-fg3 leading-relaxed">
                  {bubbleText}
                </p>
                <div className="absolute -bottom-1.5 right-5 w-3 h-3 bg-gruvbox-bg1 border-r border-b border-neon-green/20 rotate-45" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* ═══ CHARACTER BUTTON ═══ */}
          <div className="relative">
            {/* Drag handle */}
            <div className="absolute -left-6 top-1/2 -translate-y-1/2 opacity-0 hover:opacity-60 transition-opacity cursor-grab">
              <GripVertical size={14} className="text-gruvbox-fg4" />
            </div>

            <motion.button
              onClick={() => {
                if (mood === "sleepy") {
                  setMood("happy");
                  return;
                }
                openPanel(panel === "none" ? "menu" : "none");
              }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="w-14 h-14 rounded-full bg-gruvbox-bg1 border border-neon-green/30 flex items-center justify-center shadow-[0_0_15px_rgba(57,255,20,0.1)] hover:shadow-[0_0_25px_rgba(57,255,20,0.2)] transition-shadow cursor-pointer"
              aria-label="Baw - guia do portfólio"
            >
              <BawCharacter mood={mood} size={36} />
            </motion.button>

            {/* Dismiss - top LEFT (away from notification) */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setDismissed(true);
              }}
              className="absolute -top-2 -left-2 w-5 h-5 rounded-full bg-gruvbox-bg2 border border-gruvbox-bg3 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity z-10"
              aria-label="Fechar Baw"
            >
              <X size={9} className="text-gruvbox-fg4" />
            </button>

            {/* Pulse ring */}
            {panel === "none" && (
              <motion.div
                className="absolute inset-0 rounded-full border border-neon-green/15 pointer-events-none"
                animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0, 0.2] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            )}

            {/* Name tag */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
              <span className="font-mono text-[8px] text-gruvbox-gray tracking-wider">
                BAW
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
