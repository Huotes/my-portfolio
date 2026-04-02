"use client";

import { motion } from "framer-motion";
import { Terminal, Cpu, Shield, Gamepad2, Monitor, Wifi } from "lucide-react";
import GlowCard from "@/components/ui/GlowCard";
import { linuxDistros, hackerHobbies } from "@/data/projects";

const hobbyIcons: Record<string, typeof Terminal> = {
  terminal: Terminal,
  cpu: Cpu,
  shield: Shield,
  gamepad: Gamepad2,
};

export default function HackerLab() {
  return (
    <section
      id="lab"
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 grid-bg"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <Terminal className="w-5 h-5 text-neon-green" />
            <h2 className="font-display text-2xl sm:text-3xl tracking-wider text-gruvbox-fg1">
              <span className="text-neon-green font-mono text-sm mr-2">
                08.
              </span>
              Hacker Lab
            </h2>
          </div>
          <div className="section-divider" />
        </motion.div>

        {/* Neofetch-style system info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="bg-gruvbox-bg0 border border-gruvbox-bg2 rounded-lg overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2 bg-gruvbox-bg1 border-b border-gruvbox-bg2">
              <span className="w-3 h-3 rounded-full bg-gruvbox-red" />
              <span className="w-3 h-3 rounded-full bg-gruvbox-yellow" />
              <span className="w-3 h-3 rounded-full bg-gruvbox-green" />
              <span className="font-mono text-xs text-gruvbox-fg4 ml-2">
                neofetch --athos
              </span>
            </div>
            <div className="p-4 sm:p-6 grid sm:grid-cols-2 gap-6">
              {/* ASCII art side */}
              <pre className="font-mono text-[10px] sm:text-xs leading-tight text-neon-green">
                {`
              +----------------------+
              |   /\\  /\\  /\\  /\\     |
              |  /__\\/__\\/__\\/__\\    |
              |  \\  /\\  /\\  /\\  /    |
              |   \\/  \\/  \\/  \\/     |
              |     A T H O S        |
              |        DEV           |
              +----------------------+`}
              </pre>

              {/* System info */}
              <div className="font-mono text-xs space-y-1">
                <div>
                  <span className="text-neon-green">OS</span>
                  <span className="text-gruvbox-fg4">: </span>
                  <span className="text-gruvbox-fg2">Arch Linux x86_64</span>
                </div>
                <div>
                  <span className="text-neon-green">Host</span>
                  <span className="text-gruvbox-fg4">: </span>
                  <span className="text-gruvbox-fg2">Athos Aurélio</span>
                </div>
                <div>
                  <span className="text-neon-green">Kernel</span>
                  <span className="text-gruvbox-fg4">: </span>
                  <span className="text-gruvbox-fg2">Backend v6.x LTS</span>
                </div>
                <div>
                  <span className="text-neon-green">Uptime</span>
                  <span className="text-gruvbox-fg4">: </span>
                  <span className="text-gruvbox-fg2">6 years, 0 crashes</span>
                </div>
                <div>
                  <span className="text-neon-green">Shell</span>
                  <span className="text-gruvbox-fg4">: </span>
                  <span className="text-gruvbox-fg2">zsh + oh-my-zsh</span>
                </div>
                <div>
                  <span className="text-neon-green">WM</span>
                  <span className="text-gruvbox-fg4">: </span>
                  <span className="text-gruvbox-fg2">Hyprland (Wayland)</span>
                </div>
                <div>
                  <span className="text-neon-green">Editor</span>
                  <span className="text-gruvbox-fg4">: </span>
                  <span className="text-gruvbox-fg2">
                    Neovim + custom init.lua
                  </span>
                </div>
                <div>
                  <span className="text-neon-green">Terminal</span>
                  <span className="text-gruvbox-fg4">: </span>
                  <span className="text-gruvbox-fg2">Alacritty + tmux</span>
                </div>
                <div>
                  <span className="text-neon-green">Theme</span>
                  <span className="text-gruvbox-fg4">: </span>
                  <span className="text-gruvbox-fg2">Gruvbox Dark Hard</span>
                </div>
                <div className="pt-2 flex gap-1">
                  {[
                    "#cc241d",
                    "#98971a",
                    "#d79921",
                    "#458588",
                    "#b16286",
                    "#689d6a",
                    "#d65d0e",
                    "#ebdbb2",
                  ].map((c) => (
                    <span
                      key={c}
                      className="w-4 h-4 rounded-sm"
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Linux Distro Experience */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <h3 className="font-mono text-sm text-gruvbox-fg3 mb-4 flex items-center gap-2">
            <Monitor size={14} className="text-neon-blue" />
            <span className="text-neon-blue">$</span> cat /etc/distro-history
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {linuxDistros.map((distro, i) => (
              <motion.div
                key={distro.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, type: "spring" }}
                whileHover={{ y: -4, borderColor: "rgba(57,255,20,0.4)" }}
                className="text-center p-3 rounded-lg bg-gruvbox-bg0/60 border border-gruvbox-bg2/40 transition-all"
              >
                <p className="font-mono text-xs text-gruvbox-fg1 mb-1">
                  {distro.name}
                </p>
                <p className="font-mono text-[9px] text-neon-green/70 uppercase tracking-wider">
                  {distro.level}
                </p>
                <p className="font-mono text-[9px] text-gruvbox-gray mt-1">
                  {distro.years}+ anos
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Hobbies & Passions */}
        <div className="grid sm:grid-cols-2 gap-4">
          {hackerHobbies.map((hobby, i) => {
            const Icon = hobbyIcons[hobby.icon];
            const colors: Array<"green" | "blue" | "orange" | "pink"> = [
              "green",
              "blue",
              "orange",
              "pink",
            ];
            return (
              <GlowCard
                key={hobby.title}
                neonColor={colors[i % 4]}
                delay={i * 0.1}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-gruvbox-bg0/80 border border-gruvbox-bg2/50 shrink-0">
                    <Icon size={18} className="text-gruvbox-fg4" />
                  </div>
                  <div>
                    <h4 className="font-mono text-sm text-gruvbox-fg1 mb-1">
                      {hobby.title}
                    </h4>
                    <p className="text-xs text-gruvbox-fg4 leading-relaxed">
                      {hobby.desc}
                    </p>
                  </div>
                </div>
              </GlowCard>
            );
          })}
        </div>

        {/* .config quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8"
        >
          <div className="font-mono text-xs text-gruvbox-fg4 border-l-2 border-neon-green/30 pl-4">
            <span className="text-neon-green">{"// "}</span>
            Customizar dotfiles não é perda de tempo — é investimento em
            qualidade de vida.
            <br />
            <span className="text-neon-green">{"// "}</span>
            Cada keybind economiza milissegundos. Milissegundos viram horas.
            Horas viram projetos.
          </div>
        </motion.div>
      </div>
    </section>
  );
}
