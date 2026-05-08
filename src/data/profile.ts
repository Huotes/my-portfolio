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
  archetype: 'DevOps-Oriented Engineer',
  title: 'O Coringa que Você Precisa',
  subtitle: 'Backend forte migrando para DevOps, automação, cloud e segurança de pipelines',
  description:
    'Perfil que transforma experiência em backend em entrega confiável: containers, pipelines, Linux, cloud, observabilidade e segurança aplicada desde o início do ciclo.',
  strengths: [
    'Automação end-to-end para build, testes, segurança e deploy',
    'Infraestrutura e runtime com Docker, Linux, CI/CD, cloud e Kubernetes',
    'Arquitetura de sistemas com trade-offs claros',
    'Segurança ofensiva e defensiva (pentest, OWASP, hardening)',
  ],
  growthAreas: [
    'Aprofundar Kubernetes, Helm e troubleshooting em produção',
    'Consolidar Terraform/OpenTofu, GitOps e observabilidade',
    'Adicionar certificações cloud e segurança ao roadmap DevOps',
  ],
  quote: '"Backend experience loaded. Linux mindset enabled. Pipeline security initialized."',
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
