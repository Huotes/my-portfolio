export interface ProfileAxis {
  key: string;
  label: string;
  shortLabel: string;
  value: number; // 0-100
  neonColor: string;
  icon: string;
}

export const profileAxes: ProfileAxis[] = [
  { key: 'backend',    label: 'Backend & APIs',         shortLabel: 'Backend',    value: 85, neonColor: '#39ff14', icon: 'server' },
  { key: 'frontend',   label: 'Frontend & UI',          shortLabel: 'Frontend',   value: 72, neonColor: '#00f0ff', icon: 'monitor' },
  { key: 'devops',     label: 'DevOps & Infra',         shortLabel: 'DevOps',     value: 92, neonColor: '#bf00ff', icon: 'container' },
  { key: 'security',   label: 'Segurança',              shortLabel: 'Security',   value: 88, neonColor: '#fe8019', icon: 'shield' },
  { key: 'architecture', label: 'Arquitetura de Sistemas', shortLabel: 'Arquitetura', value: 90, neonColor: '#fabd2f', icon: 'blocks' },
  { key: 'automation', label: 'Automação & Dados',      shortLabel: 'Automação',  value: 95, neonColor: '#b8bb26', icon: 'workflow' },
  { key: 'leadership', label: 'Liderança & Comunicação', shortLabel: 'Liderança',  value: 70, neonColor: '#83a598', icon: 'users' },
  { key: 'gamedev',    label: 'Game Dev & Criatividade', shortLabel: 'Game Dev',   value: 50, neonColor: '#d3869b', icon: 'gamepad' },
];

export const profileMeta = {
  archetype: 'Pi-Shaped Developer',
  title: 'O Coringa que Você Precisa',
  subtitle: 'Especialista em Backend + DevOps + Security com base generalista ampla',
  description:
    'Perfil raro que combina profundidade em infraestrutura, automação e segurança com competência sólida em frontend e arquitetura. Um profissional que não apenas escreve código — projeta sistemas completos, automatiza processos e protege o que construiu.',
  strengths: [
    'Automação end-to-end (pipelines, ETL, scrapers, analytics)',
    'Infraestrutura como código (Docker, K8s, CI/CD, cloud)',
    'Arquitetura de sistemas com trade-offs claros',
    'Segurança ofensiva e defensiva (pentest, OWASP, hardening)',
  ],
  growthAreas: [
    'Expandir experiência com SecOps no geral',
    'Adquirir certificações oficiais de segurança da informação',
    'Evoluir de guia técnico para liderança formal de squads',
  ],
  quote: '"Não sou o melhor em uma coisa — sou perigosamente bom em várias."',
};

/*
 * Valores derivados do assessment profissional:
 *
 * Backend:      3/4 → 85  (resolve com confiança)
 * Frontend:     3/4 → 72  (UIs completas, não é o foco principal)
 * DevOps:       4/4 → 92  (projeta cloud, monitora, escala)
 * Segurança:    4/4 → 88  (pentests, auditoria, defesas — cursando Defesa Cibernética)
 * Arquitetura:  4/4 → 90  (arquitetura completa com trade-offs)
 * Automação:    4/4 → 95  (sistemas E2E — ponto mais forte)
 * Liderança:    3/4 → 70  (documenta, review, guia — não lidera squads formalmente)
 * Game Dev:     2/4 → 50  (interesse mas poucos projetos recentes)
 */
