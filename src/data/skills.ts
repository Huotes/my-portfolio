export interface Skill {
  name: string;
  level: number; // 0-100 (barra de XP)
  category: SkillCategory;
  icon?: string;
}

export type SkillCategory =
  | 'languages'
  | 'frameworks'
  | 'databases'
  | 'devops'
  | 'security'
  | 'tools'
  | 'gamedev';

export const skillCategories: Record<SkillCategory, { label: string; neonColor: string }> = {
  languages: { label: 'Linguagens', neonColor: '#39ff14' },
  frameworks: { label: 'Frameworks', neonColor: '#00f0ff' },
  databases: { label: 'Bancos de Dados', neonColor: '#ff006e' },
  devops: { label: 'DevOps & Infra', neonColor: '#bf00ff' },
  security: { label: 'Segurança', neonColor: '#fe8019' },
  tools: { label: 'Ferramentas', neonColor: '#fabd2f' },
  gamedev: { label: 'Game Dev', neonColor: '#d3869b' },
};

export const skills: Skill[] = [
  // Languages
  { name: 'Python', level: 95, category: 'languages' },
  { name: 'TypeScript', level: 80, category: 'languages' },
  { name: 'JavaScript', level: 85, category: 'languages' },
  { name: 'Go', level: 55, category: 'languages' },
  { name: 'PHP', level: 60, category: 'languages' },
  { name: 'GDScript', level: 75, category: 'languages' },
  { name: 'Bash', level: 70, category: 'languages' },

  // Frameworks
  { name: 'Django', level: 90, category: 'frameworks' },
  { name: 'Flask', level: 92, category: 'frameworks' },
  { name: 'FastAPI', level: 75, category: 'frameworks' },
  { name: 'React', level: 78, category: 'frameworks' },
  { name: 'Next.js', level: 65, category: 'frameworks' },

  // Databases
  { name: 'PostgreSQL', level: 88, category: 'databases' },
  { name: 'MySQL', level: 80, category: 'databases' },
  { name: 'MongoDB', level: 65, category: 'databases' },
  { name: 'Redis', level: 72, category: 'databases' },
  { name: 'BigQuery', level: 70, category: 'databases' },

  // DevOps
  { name: 'Docker', level: 88, category: 'devops' },
  { name: 'Kubernetes', level: 65, category: 'devops' },
  { name: 'CI/CD', level: 80, category: 'devops' },
  { name: 'Linux', level: 85, category: 'devops' },
  { name: 'AWS', level: 60, category: 'devops' },
  { name: 'Nginx', level: 70, category: 'devops' },

  // Security
  { name: 'Pentest Basics', level: 55, category: 'security' },
  { name: 'Network Security', level: 60, category: 'security' },
  { name: 'OWASP', level: 65, category: 'security' },
  { name: 'Cryptography', level: 50, category: 'security' },

  // Tools
  { name: 'Git', level: 90, category: 'tools' },
  { name: 'Google Apps Script', level: 85, category: 'tools' },
  { name: 'Jenkins', level: 65, category: 'tools' },

  // Game Dev
  { name: 'Godot Engine', level: 85, category: 'gamedev' },
  { name: 'Level Design', level: 70, category: 'gamedev' },
  { name: 'Multiplayer Networking', level: 60, category: 'gamedev' },
];

export const playerStats = {
  class: 'Backend Warlock',
  title: 'O Coringa',
  level: 21,
  totalXP: 15000,
  nextLevelXP: 20000,
  guild: 'DevSecOps Aspirant',
  achievements: [
    { name: 'First Blood', description: 'Primeiro commit profissional', icon: 'swords' },
    { name: 'Polyglot', description: 'Dominou 5+ linguagens', icon: 'globe' },
    { name: 'Full Stack', description: 'Frontend + Backend + Infra', icon: 'shield' },
    { name: 'Game Creator', description: 'Publicou jogos no itch.io', icon: 'gamepad-2' },
    { name: 'Bug Slayer', description: '1000+ bugs resolvidos', icon: 'bug' },
    { name: 'Automator', description: 'Automatizou processos gov', icon: 'bot' },
    { name: 'Night Owl', description: 'Commits depois da meia-noite', icon: 'moon' },
    { name: 'Speed Runner', description: 'Deploy em prod em < 10min', icon: 'zap' },
  ],
};
