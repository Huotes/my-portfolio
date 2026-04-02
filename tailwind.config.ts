import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gruvbox: {
          bg0_hard: '#1d2021',
          bg0: '#282828',
          bg0_soft: '#32302f',
          bg1: '#3c3836',
          bg2: '#504945',
          bg3: '#665c54',
          bg4: '#7c6f64',
          fg0: '#fbf1c7',
          fg1: '#ebdbb2',
          fg2: '#d5c4a1',
          fg3: '#bdae93',
          fg4: '#a89984',
          gray: '#928374',
          red: '#cc241d',
          'red-bright': '#fb4934',
          green: '#98971a',
          'green-bright': '#b8bb26',
          yellow: '#d79921',
          'yellow-bright': '#fabd2f',
          blue: '#458588',
          'blue-bright': '#83a598',
          purple: '#b16286',
          'purple-bright': '#d3869b',
          aqua: '#689d6a',
          'aqua-bright': '#8ec07c',
          orange: '#d65d0e',
          'orange-bright': '#fe8019',
        },
        neon: {
          green: '#39ff14',
          blue: '#00f0ff',
          pink: '#ff006e',
          purple: '#bf00ff',
          orange: '#ff6600',
          yellow: '#ffff00',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Orbitron', 'sans-serif'],
        body: ['Space Grotesk', 'sans-serif'],
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'glitch': 'glitch 0.3s ease-in-out',
        'scan-line': 'scan-line 8s linear infinite',
        'typing': 'typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite',
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
        'slide-in-left': 'slide-in-left 0.6s ease-out forwards',
        'slide-in-right': 'slide-in-right 0.6s ease-out forwards',
        'neon-flicker': 'neon-flicker 1.5s ease-in-out infinite alternate',
        'matrix-rain': 'matrix-rain 20s linear infinite',
        'xp-fill': 'xp-fill 1.5s ease-out forwards',
        'border-glow': 'border-glow 3s ease-in-out infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%': { boxShadow: '0 0 5px currentColor, 0 0 10px currentColor' },
          '100%': { boxShadow: '0 0 20px currentColor, 0 0 40px currentColor, 0 0 60px currentColor' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'glitch': {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-3px, 3px)' },
          '40%': { transform: 'translate(-3px, -3px)' },
          '60%': { transform: 'translate(3px, 3px)' },
          '80%': { transform: 'translate(3px, -3px)' },
          '100%': { transform: 'translate(0)' },
        },
        'scan-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-left': {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-in-right': {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'neon-flicker': {
          '0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%': {
            textShadow: '0 0 4px #39ff14, 0 0 11px #39ff14, 0 0 19px #39ff14, 0 0 40px #39ff14',
          },
          '20%, 24%, 55%': {
            textShadow: 'none',
          },
        },
        'xp-fill': {
          '0%': { width: '0%' },
          '100%': { width: 'var(--xp-width, 0%)' },
        },
        'border-glow': {
          '0%, 100%': { borderColor: '#39ff14' },
          '33%': { borderColor: '#00f0ff' },
          '66%': { borderColor: '#ff006e' },
        },
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(rgba(57, 255, 20, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(57, 255, 20, 0.03) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid': '50px 50px',
      },
    },
  },
  plugins: [],
};

export default config;
