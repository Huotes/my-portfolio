"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  MessageCircle,
  Gamepad2,
  Heart,
  Zap,
  Moon,
  Swords,
  HelpCircle,
  Timer,
  Brain,
  Coins,
  Pause,
  Play,
  Coffee,
  Star,
  ChevronRight,
  RotateCcw,
  Trophy,
  Target,
  Sparkles,
} from "lucide-react";

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
  | "games"
  | "rps"
  | "guess"
  | "coin"
  | "memory"
  | "reaction"
  | "trivia"
  | "stats";

const sectionTips: Record<string, string> = {
  hero: "Baw-vindo! Rola pra baixo pra conhecer o Athos!",
  about: "Ele programa desde os 15. Respeito!",
  journey: "Clica nas abas pra navegar pela história!",
  profile: "Passa o mouse nos pontos do radar!",
  experience: "Cada quest rendeu XP de verdade.",
  skills: "Filtra por categoria pra explorar.",
  projects: "Jogos, tools, dotfiles... tem de tudo.",
  certificates: "Loot drops! Clica pra ver preview.",
  lab: "btw, he uses Arch.",
  contact: "Manda msg pro Athos!",
};

const chatQA = [
  {
    q: "Quem é o Athos?",
    a: "Dev sênior de 21 anos, generalista full-stack. O coringa do baralho!",
  },
  {
    q: "Quais as top skills?",
    a: "Automação, DevOps e Backend. Python é a linguagem do coração.",
  },
  {
    q: "Ele faz jogos?",
    a: "Sim! De Game Maker a Godot — tem jogos publicados no itch.io.",
  },
  {
    q: "Como contatar?",
    a: "Rola até Contato ou manda email: aureliodosol@gmail.com",
  },
  {
    q: "O que é esse portfólio?",
    a: "Next.js + Tailwind + Framer Motion, tema Gruvbox. Eu sou o mascote!",
  },
  {
    q: "Me surpreenda!",
    a: "O Athos morou sozinho em SP aos 18 e fez freelance pro mundo todo!",
  },
  {
    q: "Distro favorita?",
    a: "Arch Linux, óbvio. Mas ele já quebrou Debian, Fedora, Kubuntu...",
  },
  {
    q: "Hobbies?",
    a: "IoT, Linux ricing, RPGs, montar circuitos com Raspberry Pi e strogonoff.",
  },
];

const triviaQs = [
  {
    q: "Comida favorita do Athos?",
    opts: ["Pizza", "Strogonoff", "Sushi"],
    c: 1,
  },
  { q: "Desde que idade programa?", opts: ["12", "15", "18"], c: 1 },
  { q: "Jogo favorito?", opts: ["Minecraft", "LoL", "Undertale"], c: 2 },
  { q: "Personalidade MBTI?", opts: ["INTJ", "ENTP", "ISFP"], c: 1 },
  { q: "Qual distro ele usa?", opts: ["Ubuntu", "Fedora", "Arch"], c: 2 },
  { q: "Engine de jogos favorita?", opts: ["Unity", "Unreal", "Godot"], c: 2 },
  { q: "Quantos idiomas fala?", opts: ["1", "2", "3"], c: 2 },
  { q: "Qual o WM que ele usa?", opts: ["i3", "Hyprland", "KDE"], c: 1 },
];

const bawPhrases = [
  "Tô de boa aqui...",
  "Me arrasta pra outro lugar!",
  "Baw baw!",
  "Será que tem bug aqui? Duvido.",
  "O Athos programa até dormindo.",
  "Chacoalha o mouse em cima de mim!",
  "Quer jogar? Clica em mim!",
  "Gruvbox = melhor paleta. Fato.",
  "Vou quicar pelas bordas...",
  "Me alimenta! Clica no café.",
  "Baw precisa de carinho...",
  "Tô com saudade de quicar...",
  "Arch Linux é religião.",
];

const rpsOpts = ["Pedra", "Papel", "Tesoura"] as const;
const rpsIcons = { Pedra: Target, Papel: Coins, Tesoura: Swords };
const rpsWins: Record<string, string> = {
  Pedra: "Tesoura",
  Papel: "Pedra",
  Tesoura: "Papel",
};

// ═══ BAW SVG ═══
function BawFace({ mood, size = 40 }: { mood: Mood; size?: number }) {
  const open = !["sleepy", "dizzy"].includes(mood);
  const eyeY = open ? 10 : 12;
  const eyeH = open ? 3 : 1;
  const ec =
    mood === "love"
      ? "#fb4934"
      : mood === "excited"
        ? "#fabd2f"
        : mood === "angry"
          ? "#fb4934"
          : mood === "dizzy"
            ? "#fe8019"
            : "#39ff14";
  const ac =
    mood === "excited"
      ? "#fabd2f"
      : mood === "talking"
        ? "#00f0ff"
        : mood === "love"
          ? "#fb4934"
          : mood === "angry"
            ? "#fb4934"
            : "#39ff14";
  const mc = mood === "angry" ? "#fb4934" : "#8ec07c";
  const mouthOpen = ["happy", "excited", "love"].includes(mood);
  const mw = mood === "excited" ? 6 : mouthOpen ? 4 : 3;
  const mx = mood === "excited" ? 9 : mouthOpen ? 10 : 10;
  const my = mouthOpen ? 16 : 17;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      style={{ imageRendering: "pixelated" as const }}
    >
      <rect x="11" y="2" width="2" height="3" fill="#39ff14" />
      <rect x="10" y="1" width="4" height="1" fill={ac}>
        {mood !== "sleepy" && (
          <animate
            attributeName="opacity"
            values="1;0.3;1"
            dur={mood === "excited" ? "0.4s" : "1.5s"}
            repeatCount="indefinite"
          />
        )}
      </rect>
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
      {mood === "angry" && (
        <>
          <line
            x1="8"
            y1="8"
            x2="11"
            y2="9.5"
            stroke="#fb4934"
            strokeWidth="0.7"
          />
          <line
            x1="16"
            y1="8"
            x2="13"
            y2="9.5"
            stroke="#fb4934"
            strokeWidth="0.7"
          />
        </>
      )}
      {mood === "love" ? (
        <>
          <text x="7.5" y="14" fontSize="5" fill="#fb4934">
            &#x2665;
          </text>
          <text x="13.5" y="14" fontSize="5" fill="#fb4934">
            &#x2665;
          </text>
        </>
      ) : mood === "dizzy" ? (
        <>
          <text
            x="8"
            y="13.5"
            fontSize="5"
            fill="#fe8019"
            fontFamily="monospace"
          >
            x
          </text>
          <text
            x="14"
            y="13.5"
            fontSize="5"
            fill="#83a598"
            fontFamily="monospace"
          >
            x
          </text>
        </>
      ) : (
        <>
          <rect x="8" y={eyeY} width="3" height={eyeH} rx="0.5" fill={ec} />
          <rect x="14" y={eyeY} width="3" height={eyeH} rx="0.5" fill={ec} />
        </>
      )}
      <rect x={mx} y={my} width={mw} height="1" fill={mc} />
      {mouthOpen && (
        <rect x={mx + 1} y={my + 1} width={mw - 2} height="1" fill={mc} />
      )}
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

// ═══ MAIN ═══
export default function PixelGuide() {
  const [dismissed, setDismissed] = useState(false);
  const [visible, setVisible] = useState(false);
  const [mood, setMood] = useState<Mood>("idle");
  const [panel, setPanel] = useState<Panel>("none");
  const [bubble, setBubble] = useState("");
  const [showBubble, setShowBubble] = useState(false);
  const [energy, setEnergy] = useState(80);
  const [happiness, setHappiness] = useState(70);
  const [interactions, setInteractions] = useState(0);
  const [bouncing, setBouncing] = useState(false);
  const posRef = useRef({ x: 0, y: 0 });
  const velRef = useRef({ dx: 1.2, dy: 0.8 });
  const bounceElRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const [chatLog, setChatLog] = useState<
    Array<{ from: "baw" | "user"; text: string }>
  >([]);
  const [availQ, setAvailQ] = useState(chatQA.map((c) => c.q));
  const [rpsScore, setRpsScore] = useState({ baw: 0, you: 0 });
  const [rpsResult, setRpsResult] = useState("");
  const [guessTarget, setGuessTarget] = useState(0);
  const [guessAttempts, setGuessAttempts] = useState(0);
  const [guessHint, setGuessHint] = useState("Escolha de 1 a 10!");
  const [coinResult, setCoinResult] = useState("");
  const [coinFlip, setCoinFlip] = useState(false);
  const [memSeq, setMemSeq] = useState<number[]>([]);
  const [memInput, setMemInput] = useState<number[]>([]);
  const [memShow, setMemShow] = useState(false);
  const [memLevel, setMemLevel] = useState(1);
  const [memMsg, setMemMsg] = useState("");
  const [reactionState, setReactionState] = useState<"wait" | "ready" | "done">(
    "wait",
  );
  const [reactionTime, setReactionTime] = useState(0);
  const [reactionBest, setReactionBest] = useState(999);
  const reactionStart = useRef(0);
  const reactionTimeout = useRef<NodeJS.Timeout | null>(null);
  const [triviaIdx, setTriviaIdx] = useState(0);
  const [triviaScore, setTriviaScore] = useState(0);
  const [triviaMsg, setTriviaMsg] = useState("");
  const shakeCount = useRef(0);
  const lastMouse = useRef({ x: 0, y: 0 });

  // ── Init ──
  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(true);
      setMood("happy");
      flash("Oi! Sou o Baw! Clica em mim!");
    }, 2000);
    return () => clearTimeout(t);
  }, []);

  // ── Mood cycle ──
  useEffect(() => {
    if (panel !== "none") return;
    const ms: Mood[] = [
      "idle",
      "happy",
      "thinking",
      "idle",
      "happy",
      "excited",
      "idle",
    ];
    const iv = setInterval(() => {
      if (energy < 15) {
        setMood("sleepy");
        return;
      }
      if (happiness < 15) {
        setMood("angry");
        return;
      }
      setMood(ms[Math.floor(Math.random() * ms.length)]);
      if (Math.random() > 0.6)
        flash(bawPhrases[Math.floor(Math.random() * bawPhrases.length)]);
    }, 7000);
    return () => clearInterval(iv);
  }, [panel, energy, happiness]);

  // ── Stat decay ──
  useEffect(() => {
    const iv = setInterval(() => {
      setEnergy((e) => Math.max(0, e - 1));
      setHappiness((h) => Math.max(0, h - 1));
    }, 15000);
    return () => clearInterval(iv);
  }, []);

  // ── Scroll tips ──
  useEffect(() => {
    if (panel !== "none") return;
    let last = "";
    const handler = () => {
      for (const s of Object.keys(sectionTips).reverse()) {
        const el = document.getElementById(s);
        if (el && el.getBoundingClientRect().top <= 300 && s !== last) {
          last = s;
          flash(sectionTips[s]);
          setMood("talking");
          setTimeout(() => setMood("idle"), 3000);
          break;
        }
      }
    };
    let to: NodeJS.Timeout;
    const db = () => {
      clearTimeout(to);
      to = setTimeout(handler, 800);
    };
    window.addEventListener("scroll", db, { passive: true });
    return () => {
      window.removeEventListener("scroll", db);
      clearTimeout(to);
    };
  }, [panel]);

  // ── Bouncing ──
  useEffect(() => {
    if (!bouncing) {
      cancelAnimationFrame(rafRef.current);
      return;
    }
    const el = bounceElRef.current;
    if (!el) return;
    if (posRef.current.x === 0)
      posRef.current = {
        x: window.innerWidth - 100,
        y: window.innerHeight - 100,
      };
    const animate = () => {
      const w = window.innerWidth - 76;
      const h = window.innerHeight - 76;
      let { x, y } = posRef.current;
      let { dx, dy } = velRef.current;
      x += dx;
      y += dy;
      if (x <= 0 || x >= w) {
        dx *= -1;
        setMood((p) => (p === "happy" ? "excited" : "happy"));
      }
      if (y <= 0 || y >= h) dy *= -1;
      posRef.current = {
        x: Math.max(0, Math.min(x, w)),
        y: Math.max(0, Math.min(y, h)),
      };
      velRef.current = { dx, dy };
      el.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px)`;
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [bouncing]);

  // ── Helpers ──
  const flash = (t: string) => {
    setBubble(t);
    setShowBubble(true);
    setTimeout(() => setShowBubble(false), 3500);
  };
  const interact = () => {
    setInteractions((i) => i + 1);
    setHappiness((h) => Math.min(100, h + 3));
  };
  const feed = () => {
    setEnergy((e) => Math.min(100, e + 25));
    setMood("love");
    flash("Hmm, café! Obrigado!");
    interact();
    setTimeout(() => setMood("happy"), 2000);
  };
  const pet = () => {
    setHappiness((h) => Math.min(100, h + 20));
    setMood("love");
    flash("Baw está feliz!");
    interact();
    setTimeout(() => setMood("happy"), 2000);
  };
  const openP = (p: Panel) => {
    setPanel(p);
    setShowBubble(false);
    setMood("excited");
    interact();
  };

  // ── Shake ──
  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const dx = Math.abs(e.clientX - lastMouse.current.x);
    const dy = Math.abs(e.clientY - lastMouse.current.y);
    lastMouse.current = { x: e.clientX, y: e.clientY };
    if (dx + dy > 30) {
      shakeCount.current += 1;
      if (shakeCount.current > 8) {
        shakeCount.current = 0;
        setMood("dizzy");
        flash("Aiii! Para! Mudei de opinião!");
        setHappiness((h) => Math.max(0, h - 5));
        setTimeout(() => {
          setMood("happy");
          flash(bawPhrases[Math.floor(Math.random() * bawPhrases.length)]);
        }, 2500);
      }
    } else shakeCount.current = Math.max(0, shakeCount.current - 1);
  }, []);

  // ── Chat ──
  const chatAsk = (q: string) => {
    const a = chatQA.find((c) => c.q === q);
    if (!a) return;
    setChatLog((l) => [
      ...l,
      { from: "user", text: q },
      { from: "baw", text: a.a },
    ]);
    setAvailQ((qs) => qs.filter((x) => x !== q));
    setMood("talking");
    interact();
    setTimeout(() => setMood("happy"), 2000);
  };

  // ── Games ──
  const playRPS = (c: string) => {
    const b = rpsOpts[Math.floor(Math.random() * 3)];
    if (c === b) {
      setRpsResult(`Empate! Baw jogou ${b}`);
      setMood("thinking");
    } else if (rpsWins[c] === b) {
      setRpsResult(`Você ganhou! Baw jogou ${b}`);
      setRpsScore((s) => ({ ...s, you: s.you + 1 }));
      setMood("angry");
      setTimeout(() => setMood("happy"), 2000);
    } else {
      setRpsResult(`Baw ganhou com ${b}!`);
      setRpsScore((s) => ({ ...s, baw: s.baw + 1 }));
      setMood("excited");
    }
    interact();
  };

  const initGuess = () => {
    setGuessTarget(Math.floor(Math.random() * 10) + 1);
    setGuessAttempts(0);
    setGuessHint("Escolha de 1 a 10!");
  };
  const doGuess = (n: number) => {
    setGuessAttempts((a) => a + 1);
    interact();
    if (n === guessTarget) {
      setGuessHint(`Acertou em ${guessAttempts + 1}x!`);
      setMood("love");
    } else {
      setGuessHint(n < guessTarget ? "Maior!" : "Menor!");
      setMood("thinking");
    }
  };

  const flipCoin = () => {
    setCoinFlip(true);
    setCoinResult("");
    setMood("excited");
    interact();
    setTimeout(() => {
      setCoinResult(Math.random() > 0.5 ? "Cara!" : "Coroa!");
      setCoinFlip(false);
      setMood("happy");
    }, 1000);
  };

  const startMemory = (level: number) => {
    const seq = Array.from({ length: level + 2 }, () =>
      Math.floor(Math.random() * 4),
    );
    setMemSeq(seq);
    setMemInput([]);
    setMemShow(true);
    setMemMsg(`Memorize ${seq.length} cores!`);
    setTimeout(() => setMemShow(false), 1200 + level * 400);
  };
  const memClick = (n: number) => {
    const next = [...memInput, n];
    setMemInput(next);
    interact();
    if (memSeq[next.length - 1] !== n) {
      setMemMsg("Errou!");
      setMood("angry");
      setMemLevel(1);
      setTimeout(() => {
        setMood("happy");
        startMemory(1);
      }, 1500);
      return;
    }
    if (next.length === memSeq.length) {
      setMemMsg(`Nível ${memLevel + 1}!`);
      setMood("excited");
      setMemLevel((l) => l + 1);
      setTimeout(() => startMemory(memLevel + 1), 1200);
    }
  };
  const memColors = [
    "bg-[#39ff14]",
    "bg-[#00f0ff]",
    "bg-[#ff006e]",
    "bg-[#fabd2f]",
  ];

  const startReaction = () => {
    setReactionState("wait");
    setReactionTime(0);
    reactionTimeout.current = setTimeout(
      () => {
        setReactionState("ready");
        reactionStart.current = Date.now();
      },
      1500 + Math.random() * 3000,
    );
  };
  const hitReaction = () => {
    if (reactionState === "ready") {
      const t = Date.now() - reactionStart.current;
      setReactionTime(t);
      setReactionState("done");
      interact();
      if (t < reactionBest) setReactionBest(t);
      setMood(t < 300 ? "excited" : "happy");
    } else if (reactionState === "wait") {
      clearTimeout(reactionTimeout.current);
      setReactionTime(-1);
      setReactionState("done");
      setMood("angry");
    }
  };

  const ansTrivia = (i: number) => {
    interact();
    const ok = triviaQs[triviaIdx].c === i;
    if (ok) {
      setTriviaScore((s) => s + 1);
      setTriviaMsg("Certo!");
      setMood("excited");
    } else {
      setTriviaMsg(
        `Errado! Era: ${triviaQs[triviaIdx].opts[triviaQs[triviaIdx].c]}`,
      );
      setMood("angry");
    }
    setTimeout(() => {
      setTriviaMsg("");
      setTriviaIdx((x) => (x + 1) % triviaQs.length);
      setMood("happy");
    }, 2000);
  };

  if (dismissed || !visible) return null;

  // ═══ Panel Content Builder ═══
  const panelContent = panel !== "none" && (
    <motion.div
      key={panel}
      initial={{ opacity: 0, y: 15, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10 }}
      className="w-[285px] sm:w-[310px] bg-gruvbox-bg0 border border-neon-green/20 rounded-lg shadow-[0_0_20px_rgba(57,255,20,0.06)] overflow-hidden"
    >
      <div className="flex items-center justify-between px-3 py-2 bg-gruvbox-bg1 border-b border-gruvbox-bg2">
        <div className="flex items-center gap-2">
          <BawFace mood={mood} size={18} />
          <span className="font-mono text-[10px] text-neon-green">baw</span>
          <span className="font-mono text-[8px] text-gruvbox-gray">
            {mood === "sleepy" ? "zzz" : mood === "thinking" ? "..." : "online"}
          </span>
        </div>
        <button
          onClick={() => setPanel("none")}
          className="text-gruvbox-fg4 hover:text-neon-green transition-colors"
        >
          <X size={13} />
        </button>
      </div>

      {panel === "menu" && (
        <div className="p-3 space-y-1.5">
          <p className="font-mono text-[10px] text-gruvbox-fg4 mb-2">
            O que quer fazer?
          </p>
          {(
            [
              { label: "Conversar", icon: MessageCircle, p: "chat" as Panel },
              { label: "Jogar", icon: Gamepad2, p: "games" as Panel },
              { label: "Status do Baw", icon: Heart, p: "stats" as Panel },
              {
                label: bouncing ? "Parar de quicar" : "Quicar pelas bordas",
                icon: bouncing ? Pause : Play,
                p: "none" as Panel,
                act: () => setBouncing(!bouncing),
              },
            ] as Array<{
              label: string;
              icon: typeof Star;
              p: Panel;
              act?: () => void;
            }>
          ).map((it) => (
            <button
              key={it.label}
              onClick={() => {
                if (it.act) {
                  it.act();
                  setPanel("none");
                } else openP(it.p);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded bg-gruvbox-bg1/50 border border-gruvbox-bg2/40 hover:border-neon-green/30 hover:bg-neon-green/5 transition-all font-mono text-[11px] text-gruvbox-fg3 hover:text-neon-green"
            >
              <it.icon size={13} />
              {it.label}
            </button>
          ))}
          <div className="flex gap-1.5 pt-2 border-t border-gruvbox-bg2/30 mt-2">
            <button
              onClick={() => {
                feed();
                setPanel("none");
              }}
              className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded bg-gruvbox-bg1/50 border border-gruvbox-bg2/40 hover:border-neon-blue/30 font-mono text-[10px] text-gruvbox-fg4 hover:text-neon-blue transition-all"
            >
              <Coffee size={11} />
              Café
            </button>
            <button
              onClick={() => {
                pet();
                setPanel("none");
              }}
              className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded bg-gruvbox-bg1/50 border border-gruvbox-bg2/40 hover:border-neon-pink/30 font-mono text-[10px] text-gruvbox-fg4 hover:text-neon-pink transition-all"
            >
              <Heart size={11} />
              Carinho
            </button>
          </div>
        </div>
      )}

      {panel === "stats" && (
        <div className="p-3 space-y-3">
          <div className="text-center">
            <BawFace mood={mood} size={48} />
          </div>
          <p className="font-mono text-[10px] text-gruvbox-fg4 text-center">
            Baw — O Guia do Portfólio
          </p>
          {[
            { l: "Energia", v: energy, c: "#b8bb26", i: Zap },
            { l: "Felicidade", v: happiness, c: "#fb4934", i: Heart },
          ].map((s) => (
            <div key={s.l}>
              <div className="flex items-center justify-between font-mono text-[10px] text-gruvbox-fg4 mb-1">
                <span className="flex items-center gap-1">
                  <s.i size={10} style={{ color: s.c }} />
                  {s.l}
                </span>
                <span style={{ color: s.c }}>{s.v}%</span>
              </div>
              <div className="h-1.5 bg-gruvbox-bg2 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${s.v}%`, backgroundColor: s.c }}
                />
              </div>
            </div>
          ))}
          <p className="font-mono text-[9px] text-gruvbox-gray text-center">
            <Star size={9} className="inline mr-1" />
            {interactions} interações
          </p>
          <div className="flex gap-1.5">
            <button
              onClick={feed}
              className="flex-1 py-1.5 rounded bg-gruvbox-bg1 border border-gruvbox-bg2 hover:border-neon-blue/30 font-mono text-[10px] text-gruvbox-fg4 hover:text-neon-blue transition-all flex items-center justify-center gap-1"
            >
              <Coffee size={10} />
              Café
            </button>
            <button
              onClick={pet}
              className="flex-1 py-1.5 rounded bg-gruvbox-bg1 border border-gruvbox-bg2 hover:border-neon-pink/30 font-mono text-[10px] text-gruvbox-fg4 hover:text-neon-pink transition-all flex items-center justify-center gap-1"
            >
              <Heart size={10} />
              Carinho
            </button>
          </div>
        </div>
      )}

      {panel === "chat" && (
        <div className="flex flex-col max-h-[320px]">
          <div className="flex-1 overflow-y-auto p-3 space-y-2 min-h-[140px]">
            {chatLog.length === 0 && (
              <p className="font-mono text-[10px] text-gruvbox-gray text-center py-4">
                Escolha uma pergunta!
              </p>
            )}
            {chatLog.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] px-2.5 py-1.5 rounded-lg font-mono text-[11px] leading-relaxed ${m.from === "user" ? "bg-neon-green/10 text-neon-green border border-neon-green/20" : "bg-gruvbox-bg1 text-gruvbox-fg3 border border-gruvbox-bg2/50"}`}
                >
                  {m.text}
                </div>
              </motion.div>
            ))}
          </div>
          {availQ.length > 0 ? (
            <div className="p-2 border-t border-gruvbox-bg2 space-y-0.5 max-h-[140px] overflow-y-auto">
              {availQ.map((q) => (
                <button
                  key={q}
                  onClick={() => chatAsk(q)}
                  className="w-full text-left px-2 py-1.5 font-mono text-[10px] text-neon-blue hover:bg-neon-blue/5 rounded transition-all flex items-center gap-1"
                >
                  <ChevronRight size={9} />
                  {q}
                </button>
              ))}
            </div>
          ) : (
            <div className="p-2 border-t border-gruvbox-bg2">
              <p className="font-mono text-[10px] text-gruvbox-gray text-center">
                Sem mais perguntas!
              </p>
            </div>
          )}
        </div>
      )}

      {panel === "games" && (
        <div className="p-3 space-y-1.5">
          <p className="font-mono text-[10px] text-gruvbox-fg4 mb-2">
            Escolhe um minigame!
          </p>
          {[
            { l: "Pedra Papel Tesoura", p: "rps" as Panel, i: Swords },
            { l: "Adivinha o Número", p: "guess" as Panel, i: HelpCircle },
            { l: "Cara ou Coroa", p: "coin" as Panel, i: Coins },
            { l: "Memória", p: "memory" as Panel, i: Brain },
            { l: "Tempo de Reação", p: "reaction" as Panel, i: Timer },
            { l: "Quiz do Athos", p: "trivia" as Panel, i: Trophy },
          ].map((g) => (
            <button
              key={g.l}
              onClick={() => {
                openP(g.p);
                if (g.p === "guess") initGuess();
                if (g.p === "memory") {
                  setMemLevel(1);
                  startMemory(1);
                }
                if (g.p === "reaction") startReaction();
              }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded bg-gruvbox-bg1/50 border border-gruvbox-bg2/40 hover:border-neon-pink/30 hover:bg-neon-pink/5 transition-all font-mono text-[11px] text-gruvbox-fg3 hover:text-neon-pink"
            >
              <g.i size={13} />
              {g.l}
            </button>
          ))}
        </div>
      )}

      {panel === "rps" && (
        <div className="p-3 text-center">
          <p className="font-mono text-[10px] text-gruvbox-fg4 mb-3">
            Baw {rpsScore.baw} x {rpsScore.you} Você
          </p>
          <div className="flex justify-center gap-2 mb-3">
            {rpsOpts.map((o) => {
              const I = rpsIcons[o];
              return (
                <button
                  key={o}
                  onClick={() => playRPS(o)}
                  className="px-3 py-2 rounded bg-gruvbox-bg1 border border-gruvbox-bg2 hover:border-neon-green/40 transition-all flex flex-col items-center gap-1"
                >
                  <I size={18} className="text-gruvbox-fg3" />
                  <span className="font-mono text-[9px] text-gruvbox-gray">
                    {o}
                  </span>
                </button>
              );
            })}
          </div>
          {rpsResult && (
            <p className="font-mono text-[11px] text-gruvbox-fg2">
              {rpsResult}
            </p>
          )}
          <button
            onClick={() => openP("games")}
            className="mt-3 font-mono text-[9px] text-gruvbox-gray hover:text-gruvbox-fg4 block mx-auto"
          >
            &#x2190; voltar
          </button>
        </div>
      )}

      {panel === "guess" && (
        <div className="p-3 text-center">
          <p className="font-mono text-[11px] text-gruvbox-fg2 mb-3">
            {guessHint}
          </p>
          <div className="grid grid-cols-5 gap-1.5 mb-3">
            {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => doGuess(n)}
                disabled={guessHint.includes("Acertou")}
                className="py-1.5 rounded bg-gruvbox-bg1 border border-gruvbox-bg2 hover:border-neon-blue/40 transition-all font-mono text-xs text-gruvbox-fg3 disabled:opacity-30"
              >
                {n}
              </button>
            ))}
          </div>
          {guessHint.includes("Acertou") && (
            <button
              onClick={initGuess}
              className="font-mono text-[10px] text-neon-green hover:underline flex items-center gap-1 mx-auto"
            >
              <RotateCcw size={10} />
              De novo
            </button>
          )}
          <button
            onClick={() => openP("games")}
            className="mt-2 font-mono text-[9px] text-gruvbox-gray hover:text-gruvbox-fg4 block mx-auto"
          >
            &#x2190; voltar
          </button>
        </div>
      )}

      {panel === "coin" && (
        <div className="p-3 text-center">
          <motion.div
            animate={coinFlip ? { rotateY: [0, 360, 720] } : {}}
            transition={{ duration: 1 }}
            className="mb-3"
          >
            <Coins size={40} className="mx-auto text-gruvbox-yellow" />
          </motion.div>
          <button
            onClick={flipCoin}
            disabled={coinFlip}
            className="px-4 py-2 rounded bg-gruvbox-bg1 border border-neon-green/30 hover:bg-neon-green/10 font-mono text-xs text-neon-green disabled:opacity-50"
          >
            {coinFlip ? "Girando..." : "Lançar!"}
          </button>
          {coinResult && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-3 font-mono text-base text-gruvbox-fg1"
            >
              {coinResult}
            </motion.p>
          )}
          <button
            onClick={() => openP("games")}
            className="mt-3 font-mono text-[9px] text-gruvbox-gray hover:text-gruvbox-fg4 block mx-auto"
          >
            &#x2190; voltar
          </button>
        </div>
      )}

      {panel === "memory" && (
        <div className="p-3 text-center">
          <p className="font-mono text-[10px] text-gruvbox-fg4 mb-1">
            Nível {memLevel}
          </p>
          <p className="font-mono text-[11px] text-gruvbox-fg2 mb-3">
            {memMsg}
          </p>
          <div className="grid grid-cols-2 gap-2 mb-3 max-w-[140px] mx-auto">
            {[0, 1, 2, 3].map((n) => (
              <button
                key={n}
                onClick={() => !memShow && memClick(n)}
                disabled={memShow}
                className={`h-12 rounded border-2 transition-all ${memShow && memSeq.includes(n) ? memColors[n] + " border-transparent opacity-100" : "bg-gruvbox-bg1 border-gruvbox-bg2 hover:border-gruvbox-fg4 opacity-50 hover:opacity-100"}`}
              />
            ))}
          </div>
          <button
            onClick={() => openP("games")}
            className="font-mono text-[9px] text-gruvbox-gray hover:text-gruvbox-fg4"
          >
            &#x2190; voltar
          </button>
        </div>
      )}

      {panel === "reaction" && (
        <div className="p-3 text-center">
          <p className="font-mono text-[10px] text-gruvbox-fg4 mb-2">
            Melhor: {reactionBest < 999 ? reactionBest + "ms" : "--"}
          </p>
          <button
            onClick={reactionState === "done" ? startReaction : hitReaction}
            className={`w-full h-24 rounded-lg border-2 transition-all font-mono text-sm flex items-center justify-center gap-2 ${
              reactionState === "wait"
                ? "bg-gruvbox-red/10 border-gruvbox-red/30 text-gruvbox-red-bright"
                : reactionState === "ready"
                  ? "bg-neon-green/10 border-neon-green/40 text-neon-green animate-pulse"
                  : "bg-gruvbox-bg1 border-gruvbox-bg2 text-gruvbox-fg3"
            }`}
          >
            {reactionState === "wait" && (
              <>
                <Timer size={16} />
                Espere o verde...
              </>
            )}
            {reactionState === "ready" && (
              <>
                <Zap size={16} />
                AGORA!
              </>
            )}
            {reactionState === "done" &&
              (reactionTime < 0
                ? "Cedo demais! Tente de novo."
                : `${reactionTime}ms! Tente de novo.`)}
          </button>
          <button
            onClick={() => openP("games")}
            className="mt-3 font-mono text-[9px] text-gruvbox-gray hover:text-gruvbox-fg4 block mx-auto"
          >
            &#x2190; voltar
          </button>
        </div>
      )}

      {panel === "trivia" && (
        <div className="p-3">
          <p className="font-mono text-[10px] text-gruvbox-fg4 mb-1 flex items-center gap-1">
            <Trophy size={10} className="text-neon-green" />
            {triviaScore} acertos
          </p>
          <p className="font-mono text-[12px] text-gruvbox-fg2 mb-3">
            {triviaQs[triviaIdx].q}
          </p>
          {triviaMsg ? (
            <p
              className={`font-mono text-[12px] text-center py-4 ${triviaMsg === "Certo!" ? "text-neon-green" : "text-gruvbox-red-bright"}`}
            >
              {triviaMsg}
            </p>
          ) : (
            <div className="space-y-1.5">
              {triviaQs[triviaIdx].opts.map((opt, i) => (
                <button
                  key={opt}
                  onClick={() => ansTrivia(i)}
                  className="w-full text-left px-3 py-2 rounded bg-gruvbox-bg1/50 border border-gruvbox-bg2/40 hover:border-neon-green/30 font-mono text-[11px] text-gruvbox-fg3 hover:text-neon-green transition-all"
                >
                  {String.fromCharCode(65 + i)}. {opt}
                </button>
              ))}
            </div>
          )}
          <button
            onClick={() => openP("games")}
            className="mt-3 font-mono text-[9px] text-gruvbox-gray hover:text-gruvbox-fg4 block mx-auto"
          >
            &#x2190; voltar
          </button>
        </div>
      )}
    </motion.div>
  );

  // ═══ Bubble + Character ═══
  const bawBody = (
    <div className="flex flex-col items-end gap-2" onMouseMove={onMouseMove}>
      <AnimatePresence mode="wait">{panelContent}</AnimatePresence>
      <AnimatePresence>
        {showBubble && panel === "none" && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-[190px] bg-gruvbox-bg1 border border-neon-green/20 rounded-lg p-2.5 shadow-[0_0_10px_rgba(57,255,20,0.05)] relative"
          >
            <p className="font-mono text-[10px] text-gruvbox-fg3 leading-relaxed">
              {bubble}
            </p>
            <div className="absolute -bottom-1.5 right-5 w-3 h-3 bg-gruvbox-bg1 border-r border-b border-neon-green/20 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="relative">
        <motion.button
          onClick={() => {
            if (mood === "sleepy") {
              setMood("happy");
              setEnergy((e) => Math.min(100, e + 10));
              return;
            }
            openP(panel === "none" ? "menu" : "none");
          }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className="w-14 h-14 rounded-full bg-gruvbox-bg1 border border-neon-green/30 flex items-center justify-center shadow-[0_0_12px_rgba(57,255,20,0.08)] hover:shadow-[0_0_20px_rgba(57,255,20,0.15)] transition-shadow cursor-pointer"
          aria-label="Baw"
        >
          <BawFace mood={mood} size={36} />
        </motion.button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setDismissed(true);
          }}
          className="absolute -top-3 -left-3 w-5 h-5 rounded-full bg-gruvbox-bg2 border border-gruvbox-bg3 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity z-10"
          aria-label="Fechar Baw"
        >
          <X size={9} className="text-gruvbox-fg4" />
        </button>
        <div className="absolute -bottom-3.5 left-1/2 -translate-x-1/2">
          <span className="font-mono text-[7px] text-gruvbox-gray tracking-widest uppercase">
            Baw
          </span>
        </div>
        {panel === "none" && !bouncing && (
          <motion.div
            className="absolute inset-0 rounded-full border border-neon-green/10 pointer-events-none"
            animate={{ scale: [1, 1.25, 1], opacity: [0.15, 0, 0.15] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        )}
      </div>
    </div>
  );

  if (bouncing)
    return (
      <div
        ref={bounceElRef}
        className="fixed z-50 touch-none"
        style={{ left: 0, top: 0 }}
      >
        {bawBody}
      </div>
    );
  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.05}
      className="fixed bottom-5 right-5 z-50 touch-none"
    >
      {bawBody}
    </motion.div>
  );
}
