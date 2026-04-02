export interface Project {
  id: string;
  title: string;
  description: string;
  type: 'game' | 'tool' | 'system' | 'automation' | 'dotfiles' | 'oss';
  url: string;
  repo?: string;
  techStack: string[];
  status: 'live' | 'archived' | 'private' | 'wip';
  neonColor: 'green' | 'blue' | 'pink' | 'orange' | 'purple';
  featured?: boolean;
}

export const projects: Project[] = [
  // ═══ GAMES (itch.io) ═══
  {
    id: 'cowgirl-in-hell',
    title: 'Cowgirl in Hell',
    description: 'Jogo de ação com temática infernal. Uma cowgirl presa no submundo precisa lutar para escapar.',
    type: 'game',
    url: 'https://huotes.itch.io/cowgirl-in-hell',
    techStack: ['Godot', 'GDScript', 'Pixel Art'],
    status: 'live',
    neonColor: 'pink',
    featured: true,
  },
  {
    id: 'half-baked-majesty',
    title: 'Half Baked Majesty',
    description: 'RPG com mecânicas experimentais e narrativa não-linear. Projeto ambicioso com múltiplas camadas de gameplay.',
    type: 'game',
    url: 'https://huotes.itch.io/half-baked-majesty',
    techStack: ['Godot', 'GDScript', 'Level Design'],
    status: 'live',
    neonColor: 'purple',
    featured: true,
  },
  {
    id: 'godot-stress-test',
    title: 'Godot Stress Test',
    description: 'Benchmark de performance para a Godot Engine. Testa limites de renderização e physics.',
    type: 'tool',
    url: 'https://huotes.itch.io/godot-stress-test',
    techStack: ['Godot', 'GDScript', 'Benchmarking'],
    status: 'live',
    neonColor: 'green',
  },

  // ═══ GITHUB HIGHLIGHTS ═══
  {
    id: '4viegomains',
    title: '4viegomains',
    description: 'Plataforma de analytics para League of Legends focada em Viego. Microserviços com Go e API da Riot Games.',
    type: 'tool',
    url: 'https://github.com/Huotes/4viegomains',
    repo: 'https://github.com/Huotes/4viegomains',
    techStack: ['Go', 'Riot API', 'Microservices'],
    status: 'live',
    neonColor: 'blue',
    featured: true,
  },
  {
    id: 'gate-hunter',
    title: 'GateHunter',
    description: 'Sistema de port scanning construído em Python. Ferramenta de reconhecimento para pentest e auditoria de redes.',
    type: 'tool',
    url: 'https://github.com/Huotes/GateHunter',
    repo: 'https://github.com/Huotes/GateHunter',
    techStack: ['Python', 'Networking', 'Security'],
    status: 'live',
    neonColor: 'orange',
    featured: true,
  },
  {
    id: 'harvest-link',
    title: 'HarvestLink',
    description: 'Plataforma de conexão entre produtores e consumidores. API REST com autenticação e gestão de dados.',
    type: 'system',
    url: 'https://github.com/Huotes/HarvestLink',
    repo: 'https://github.com/Huotes/HarvestLink',
    techStack: ['Python', 'REST API', 'MIT License'],
    status: 'live',
    neonColor: 'green',
  },
  {
    id: 'my-dots',
    title: 'my_dots',
    description: 'Dotfiles pessoais — configurações de Hyprland, Neovim, shell e todo o ecossistema Linux rice.',
    type: 'dotfiles',
    url: 'https://github.com/Huotes/my_dots',
    repo: 'https://github.com/Huotes/my_dots',
    techStack: ['Shell', 'Hyprland', 'Neovim', 'Linux'],
    status: 'live',
    neonColor: 'green',
    featured: true,
  },
  {
    id: 'my-hyprland',
    title: 'my_hyprland_conf',
    description: 'Configuração customizada do Hyprland — tiling WM com animações, keybinds e tema Gruvbox.',
    type: 'dotfiles',
    url: 'https://github.com/Huotes/my_hyprland_conf',
    repo: 'https://github.com/Huotes/my_hyprland_conf',
    techStack: ['Hyprland', 'Wayland', 'Rice'],
    status: 'live',
    neonColor: 'blue',
  },
  {
    id: 'commit-maker',
    title: 'CommitMaker',
    description: 'Ferramenta CLI para padronizar mensagens de commit seguindo Conventional Commits.',
    type: 'automation',
    url: 'https://github.com/Huotes/CommitMaker',
    repo: 'https://github.com/Huotes/CommitMaker',
    techStack: ['Python', 'CLI', 'Git'],
    status: 'live',
    neonColor: 'green',
  },
  {
    id: 'sou-athos',
    title: 'SouAthos',
    description: 'Mini-game feito durante uma aula de servidores que acabou escalando mais do que deveria...',
    type: 'game',
    url: 'https://github.com/Huotes/SouAthos',
    repo: 'https://github.com/Huotes/SouAthos',
    techStack: ['Python', 'Terminal', 'ASCII Art'],
    status: 'live',
    neonColor: 'pink',
  },
  {
    id: 'rogue-like',
    title: 'Simple Python Rogue-Like',
    description: 'Roguelike procedural em terminal puro. Dungeon crawling com geração aleatória de mapas.',
    type: 'game',
    url: 'https://github.com/Huotes/A-SIMPLE-PYTHON-ROGUE-LIKE-GAME',
    repo: 'https://github.com/Huotes/A-SIMPLE-PYTHON-ROGUE-LIKE-GAME',
    techStack: ['Python', 'Terminal', 'Procedural Gen'],
    status: 'live',
    neonColor: 'purple',
  },
  {
    id: 'openwisp',
    title: 'OpenWISP Controller',
    description: 'Contribuição open-source — Controller de redes WiFi com provisioning, PKI e gerenciamento de configurações.',
    type: 'oss',
    url: 'https://github.com/Huotes/openwisp-controller',
    repo: 'https://github.com/Huotes/openwisp-controller',
    techStack: ['Python', 'OpenWRT', 'Networking'],
    status: 'live',
    neonColor: 'blue',
  },
];

export const linuxDistros = [
  { name: 'Arch Linux', icon: 'arch', level: 'daily driver', years: 2 },
  { name: 'Debian', icon: 'debian', level: 'server', years: 3 },
  { name: 'Ubuntu Server', icon: 'ubuntu', level: 'production', years: 4 },
  { name: 'Fedora', icon: 'fedora', level: 'workstation', years: 1 },
  { name: 'Kubuntu', icon: 'kubuntu', level: 'desktop', years: 2 },
];

export const hackerHobbies = [
  {
    title: 'Linux Ricing',
    desc: 'Customizar .dotfiles é meditação. Hyprland, Neovim, Alacritty — cada pixel tem propósito.',
    icon: 'terminal',
  },
  {
    title: 'IoT & Hardware',
    desc: 'Raspberry Pi, ESP32, Arduino — montar circuitos e automatizar o mundo físico.',
    icon: 'cpu',
  },
  {
    title: 'Hacking Tools',
    desc: 'Construir ferramentas de pentest, port scanners e explorar redes como um hobby.',
    icon: 'shield',
  },
  {
    title: 'Game Dev',
    desc: 'De Game Maker a Godot — criar mundos interativos é a forma mais pura de programação.',
    icon: 'gamepad',
  },
];
