"use client";

import { motion } from "framer-motion";
import {
  Building2,
  ExternalLink,
  Factory,
  GitBranch,
  Rocket,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import GlowCard from "@/components/ui/GlowCard";
import NeonButton from "@/components/ui/NeonButton";
import { SOCIAL_LINKS } from "@/styles/theme";

const services = [
  {
    icon: Factory,
    title: "Software sob encomenda",
    desc: "Sistemas web, APIs, automações e integrações criadas a partir da necessidade real do cliente.",
  },
  {
    icon: Workflow,
    title: "Automação de processos",
    desc: "Rotinas manuais transformadas em fluxos rastreáveis, scripts, dashboards e ferramentas internas.",
  },
  {
    icon: GitBranch,
    title: "Entrega com pipeline",
    desc: "Projeto pensado para versionamento, deploy, CI/CD e evolução contínua desde o primeiro commit.",
  },
  {
    icon: ShieldCheck,
    title: "Base segura",
    desc: "Boas práticas de autenticação, configuração, revisão e segurança aplicadas no ciclo de entrega.",
  },
];

export default function GruvboxHouse() {
  return (
    <section
      id="gruvboxhouse"
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 grid-bg"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <Building2 className="w-5 h-5 text-neon-green" />
            <h2 className="font-display text-2xl sm:text-3xl tracking-wider text-gruvbox-fg1">
              <span className="text-neon-green font-mono text-sm mr-2">
                07.
              </span>
              GRUVBOXhouse
            </h2>
          </div>
          <div className="section-divider" />
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <GlowCard neonColor="green" className="h-full">
              <div className="font-mono text-xs text-gruvbox-fg4 mb-5">
                <span className="text-neon-green">athos@gruvboxhouse</span>
                <span>:~/software-house$ </span>
                <span className="text-gruvbox-fg2">cat mission.txt</span>
              </div>

              <h3 className="font-display text-xl sm:text-2xl tracking-wider text-gruvbox-fg1 mb-4">
                Software de verdade para problemas reais.
              </h3>

              <p className="text-sm text-gruvbox-fg3 leading-relaxed mb-5">
                A GRUVBOXhouse é minha software house para produção de software
                sob encomenda. O foco é construir soluções úteis, sustentáveis e
                prontas para crescer com clientes que precisam tirar uma ideia do
                papel, automatizar uma operação ou evoluir um sistema existente.
              </p>

              <div className="rounded border border-neon-green/20 bg-gruvbox-bg0/60 p-3 mb-6">
                <p className="font-mono text-xs text-neon-green mb-1">
                  status: accepting_clients
                </p>
                <p className="text-xs text-gruvbox-fg4 leading-relaxed">
                  Disponível atualmente para propostas, parcerias e projetos
                  sob demanda.
                </p>
              </div>

              <NeonButton href={SOCIAL_LINKS.gruvboxhouse} external variant="green">
                <ExternalLink size={16} />
                Visitar GRUVBOXhouse
              </NeonButton>
            </GlowCard>
          </motion.div>

          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-4">
            {services.map((service, i) => (
              <GlowCard
                key={service.title}
                neonColor={i % 2 === 0 ? "blue" : "orange"}
                delay={i * 0.08}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-gruvbox-bg0/80 border border-gruvbox-bg2/50 shrink-0">
                    <service.icon size={18} className="text-gruvbox-fg4" />
                  </div>
                  <div>
                    <h4 className="font-mono text-sm text-gruvbox-fg1 mb-2">
                      {service.title}
                    </h4>
                    <p className="text-xs text-gruvbox-fg4 leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
                </div>
              </GlowCard>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 font-mono text-xs text-gruvbox-fg4 border-l-2 border-neon-green/30 pl-4"
        >
          <span className="text-neon-green">{"// "}</span>
          Da conversa com o cliente ao deploy: escopo claro, código versionado,
          entrega acompanhável e manutenção possível.
          <Rocket size={12} className="inline ml-2 text-neon-orange" />
        </motion.div>
      </div>
    </section>
  );
}
