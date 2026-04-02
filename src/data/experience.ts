export interface Experience {
  id: string;
  company: string;
  role: string;
  level: string;
  period: string;
  location: string;
  description: string[];
  techStack: string[];
  neonColor: 'green' | 'blue' | 'pink' | 'orange' | 'purple';
  xp: number; // "XP" gamificado (0-100)
}

export const experiences: Experience[] = [
  {
    id: 'pgfn',
    company: 'Procuradoria-Geral da Fazenda Nacional',
    role: 'Desenvolvedor de Software',
    level: 'Estagiário',
    period: 'Nov 2025 — Presente',
    location: 'Presidente Prudente, SP',
    description: [
      'Desenvolvimento e manutenção de soluções de automação para a PGFN',
      'Automação de processos com coleta de dados via API e web scraping',
      'Integração com BigQuery e Google Apps Script para pipelines de dados',
      'Gerenciamento de CI/CD para qualidade de código e versionamento Git',
    ],
    techStack: ['Python', 'Google Apps Script', 'BigQuery', 'Git', 'CI/CD'],
    neonColor: 'green',
    xp: 85,
  },
  {
    id: 'cmi-sr',
    company: 'Centro Médico Integrado',
    role: 'Desenvolvedor Full Stack',
    level: 'Sênior',
    period: 'Jun 2025 — Mar 2026',
    location: 'Presidente Prudente, SP',
    description: [
      'Responsável principal por sistemas de controle e automação de distribuição de serviços',
      'Desenvolvimento com Python/Flask e integrações com sistemas governamentais',
      'Controle de atividades ocupacionais e compliance com normas regulatórias (NR-4, NR-7, NR-9)',
    ],
    techStack: ['Python', 'Flask', 'React', 'TypeScript', 'PostgreSQL', 'Docker', 'Redis'],
    neonColor: 'blue',
    xp: 95,
  },
  {
    id: 'cmi-pl',
    company: 'Centro Médico Integrado',
    role: 'Desenvolvedor Full Stack',
    level: 'Pleno',
    period: 'Jul 2024 — Jun 2025',
    location: 'Presidente Prudente, SP',
    description: [
      'Desenvolvimento de sistemas para controle financeiro de clínica ocupacional',
      'Criação de esteira CI/CD estável com Kubernetes e Jenkins',
      'Automatização de entrega de relatórios com integrações em APIs governamentais',
      'Otimização de código, resolução de bugs e documentação técnica',
    ],
    techStack: ['Python', 'Flask', 'Kubernetes', 'Jenkins', 'Docker', 'PostgreSQL'],
    neonColor: 'blue',
    xp: 80,
  },
  {
    id: 'igs',
    company: 'IGS | Desenvolvimento de Software',
    role: 'Desenvolvedor Full Stack',
    level: 'Pleno',
    period: 'Ago 2023 — Mai 2025',
    location: 'São Paulo, SP',
    description: [
      'Plataforma de controle de operações e servidor online para jogos de cassino',
      'Criação de jogos de cassino e vídeo-bingo em Godot com backend Django',
      'Manutenção de projetos legados e desenvolvimento de bibliotecas Python',
      'Revisão de código, resolução de problemas e documentação técnica',
    ],
    techStack: ['Python', 'Django', 'Godot', 'PostgreSQL', 'Docker'],
    neonColor: 'purple',
    xp: 75,
  },
  {
    id: 'fiverr',
    company: 'Fiverr',
    role: 'Desenvolvedor Web Freelancer',
    level: 'Freelancer',
    period: 'Ago 2022 — Ago 2023',
    location: 'São Paulo, SP',
    description: [
      'Criação de jogos completos para terceiros',
      'Level design detalhado e funcionalidades multiplayer local e online',
    ],
    techStack: ['Godot', 'GDScript', 'Python', 'Networking'],
    neonColor: 'orange',
    xp: 60,
  },
  {
    id: 'result',
    company: 'Result Soluções',
    role: 'Desenvolvedor de Jogos',
    level: 'Júnior',
    period: 'Mai 2023 — Jul 2023',
    location: 'Presidente Prudente, SP',
    description: [
      'Desenvolvimento de jogos em equipe',
      'Primeira experiência profissional na área de desenvolvimento',
    ],
    techStack: ['Godot', 'GDScript', 'Git'],
    neonColor: 'pink',
    xp: 40,
  },
];

export const education = [
  {
    id: 'fatec',
    institution: 'FATEC Presidente Prudente',
    course: 'Análise e Desenvolvimento de Sistemas',
    degree: 'Tecnólogo (CST)',
    period: 'Fev 2023 — Presente',
    status: 'Em andamento',
  },
  {
    id: 'fiap',
    institution: 'FIAP',
    course: 'Defesa Cibernética',
    degree: 'Tecnólogo (CST)',
    period: 'Ago 2024 — Mar 2026',
    status: 'Cancelado',
  },
  {
    id: 'senac',
    institution: 'Senac São Paulo',
    course: 'Desenvolvimento de Jogos',
    degree: 'Técnico',
    period: 'Fev 2022 — Abr 2023',
    status: 'Concluído',
  },
];
