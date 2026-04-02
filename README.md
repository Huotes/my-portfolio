# ⚡ Athos Aurélio — Portfolio

> *"Código é a minha arte. Segurança é o meu escudo. Automação é a minha magia."*

Portfólio pessoal construído com **Next.js 14**, **TypeScript** e **Tailwind CSS**, no tema **Gruvbox** com elementos **neon** e gamificação.

## 🎮 Features

- **Tema Gruvbox + Neon** — Paleta retro groove com efeitos luminosos
- **Gamificação** — XP bars, skill tree, achievements, player card
- **Animações** — Framer Motion, partículas, glitch text, typing effect
- **Terminal UI** — Elementos estilo terminal para aquele toque dev
- **Responsivo** — Mobile-first, funciona em qualquer tela
- **Performance** — Server Components, lazy loading, otimizado para SEO
- **Certificados** — Sistema de gerenciamento com PDFs e credenciais

## 🚀 Quick Start

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build de produção
npm run build

# Servir produção
npm start
```

Acesse [http://localhost:3000](http://localhost:3000)

## 📁 Estrutura do Projeto

```
athos-portfolio/
├── public/
│   ├── certificates/          # PDFs dos certificados (servidos via URL)
│   └── images/                # Imagens estáticas
├── certificates/              # PDFs originais (backup)
├── src/
│   ├── app/                   # App Router (Next.js 14)
│   │   ├── layout.tsx         # Layout raiz
│   │   ├── page.tsx           # Página principal
│   │   └── globals.css        # Estilos globais + neon effects
│   ├── components/
│   │   ├── layout/            # Header, Footer
│   │   ├── ui/                # GlowCard, NeonButton, XPBar, TerminalText
│   │   ├── sections/          # Hero, About, Experience, Skills, Certificates, Contact
│   │   └── effects/           # ParticleBackground, GlitchText
│   ├── data/                  # Dados estruturados (experiência, skills, certificados)
│   ├── hooks/                 # Custom hooks (scroll animations, countUp)
│   ├── lib/                   # Utilidades (level colors, XP gradients)
│   └── styles/                # Theme constants (Gruvbox + Neon)
├── tailwind.config.ts         # Cores Gruvbox, animações, fontes
├── next.config.js
├── tsconfig.json
└── package.json
```

## 🎨 Design System

### Cores Gruvbox
| Papel         | Hex       |
|---------------|-----------|
| Background    | `#1d2021` |
| Surface       | `#282828` |
| Card          | `#3c3836` |
| Text Primary  | `#ebdbb2` |
| Text Muted    | `#a89984` |

### Cores Neon
| Nome    | Hex       | Uso                |
|---------|-----------|---------------------|
| Green   | `#39ff14` | Primário, CTAs      |
| Blue    | `#00f0ff` | Links, destaque     |
| Pink    | `#ff006e` | Alertas, lendário   |
| Purple  | `#bf00ff` | Épico, educação     |
| Orange  | `#ff6600` | Avisos, freelance   |

### Fontes
- **Display**: Orbitron (títulos, headers)
- **Body**: Space Grotesk (texto corrido)
- **Mono**: JetBrains Mono (código, terminal, labels)

## 📜 Gerenciando Certificados

Veja `certificates/README.md` para instruções detalhadas.

**Resumo rápido:**
1. Coloque o PDF em `public/certificates/`
2. Adicione os metadados em `src/data/certificates.ts`

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Linguagem**: TypeScript
- **Estilos**: Tailwind CSS + CSS custom
- **Animações**: Framer Motion
- **Ícones**: Lucide React
- **Fontes**: Google Fonts (Orbitron, Space Grotesk, JetBrains Mono)

## 📝 Licença

MIT — Use como quiser.

---

*Built with 💚 and lots of ☕ by Athos Aurélio*
