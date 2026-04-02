"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu,
  Code,
  Database,
  Cloud,
  Shield,
  Wrench,
  Gamepad2,
} from "lucide-react";
import XPBar from "@/components/ui/XPBar";
import { skills, skillCategories, type SkillCategory } from "@/data/skills";

const categoryIcons: Record<SkillCategory, typeof Code> = {
  languages: Code,
  frameworks: Cpu,
  databases: Database,
  devops: Cloud,
  security: Shield,
  tools: Wrench,
  gamedev: Gamepad2,
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory | "all">(
    "all",
  );
  const categories = Object.keys(skillCategories) as SkillCategory[];

  const filteredSkills =
    activeCategory === "all"
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  return (
    <section
      id="skills"
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
            <Cpu className="w-5 h-5 text-neon-pink" />
            <h2 className="font-display text-2xl sm:text-3xl tracking-wider text-gruvbox-fg1">
              <span className="text-neon-green font-mono text-sm mr-2">
                05.
              </span>
              Skill Tree
            </h2>
          </div>
          <div className="section-divider" />
          <p className="font-mono text-xs text-gruvbox-fg4 mt-4">
            <span className="text-neon-green">// </span>
            {skills.length} habilidades desbloqueadas — selecione uma categoria
            para filtrar
          </p>
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 mb-10"
        >
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-3 py-1.5 font-mono text-xs rounded border transition-all duration-300 ${
              activeCategory === "all"
                ? "border-neon-green text-neon-green bg-neon-green/10 shadow-[0_0_8px_rgba(57,255,20,0.2)]"
                : "border-gruvbox-bg3 text-gruvbox-fg4 hover:border-gruvbox-fg4"
            }`}
          >
            Todas ({skills.length})
          </button>
          {categories.map((cat) => {
            const Icon = categoryIcons[cat];
            const meta = skillCategories[cat];
            const count = skills.filter((s) => s.category === cat).length;
            const isActive = activeCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs rounded border transition-all duration-300 ${
                  isActive
                    ? "bg-opacity-10 shadow-[0_0_8px_rgba(255,255,255,0.1)]"
                    : "border-gruvbox-bg3 text-gruvbox-fg4 hover:border-gruvbox-fg4"
                }`}
                style={
                  isActive
                    ? {
                        borderColor: meta.neonColor,
                        color: meta.neonColor,
                        backgroundColor: `${meta.neonColor}15`,
                      }
                    : undefined
                }
              >
                <Icon size={12} />
                {meta.label} ({count})
              </button>
            );
          })}
        </motion.div>

        {/* Skills grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4"
          >
            {filteredSkills
              .sort((a, b) => b.level - a.level)
              .map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}
                >
                  <XPBar
                    label={skill.name}
                    level={skill.level}
                    delay={i * 0.03}
                  />
                </motion.div>
              ))}
          </motion.div>
        </AnimatePresence>

        {/* Stats summary */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {[
            {
              label: "Linguagens",
              value: skills.filter((s) => s.category === "languages").length,
              color: "#39ff14",
            },
            {
              label: "Lendárias",
              value: skills.filter((s) => s.level >= 90).length,
              color: "#ff006e",
            },
            {
              label: "Épicas",
              value: skills.filter((s) => s.level >= 75 && s.level < 90).length,
              color: "#bf00ff",
            },
            { label: "Total Skills", value: skills.length, color: "#00f0ff" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center p-4 rounded-lg bg-gruvbox-bg0/50 border border-gruvbox-bg2/30"
            >
              <p
                className="font-display text-2xl sm:text-3xl font-bold"
                style={{
                  color: stat.color,
                  textShadow: `0 0 10px ${stat.color}40`,
                }}
              >
                {stat.value}
              </p>
              <p className="font-mono text-[10px] text-gruvbox-fg4 tracking-wider uppercase mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
