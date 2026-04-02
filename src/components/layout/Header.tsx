'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Terminal } from 'lucide-react';

const navItems = [
  { label: 'Início', href: '#hero' },
  { label: 'Sobre', href: '#about' },
  { label: 'Perfil', href: '#profile' },
  { label: 'Experiência', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Certificados', href: '#certificates' },
  { label: 'Contato', href: '#contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Detecta seção ativa
      const sections = navItems.map((item) => item.href.replace('#', ''));
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-gruvbox-bg0_hard/90 backdrop-blur-md border-b border-neon-green/20 shadow-[0_0_15px_rgba(57,255,20,0.05)]'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2 group">
            <Terminal className="w-5 h-5 text-neon-green group-hover:animate-pulse" />
            <span className="font-display text-sm md:text-base tracking-wider text-gruvbox-fg1 group-hover:text-neon-green transition-colors">
              athos<span className="text-neon-green">.</span>dev
            </span>
          </a>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={`relative px-3 py-2 text-sm font-mono tracking-wide transition-colors hover-neon-underline ${
                      isActive
                        ? 'text-neon-green'
                        : 'text-gruvbox-fg4 hover:text-gruvbox-fg1'
                    }`}
                  >
                    <span className="text-neon-green/50 mr-1 text-xs">
                      {String(navItems.indexOf(item)).padStart(2, '0')}.
                    </span>
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gruvbox-fg4 hover:text-neon-green transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gruvbox-bg0/95 backdrop-blur-md border-b border-neon-green/20"
          >
            <ul className="px-4 py-4 space-y-1">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <a
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-3 text-sm font-mono text-gruvbox-fg3 hover:text-neon-green transition-colors border-l-2 border-transparent hover:border-neon-green hover:bg-gruvbox-bg1/50"
                  >
                    <span className="text-neon-green/50 mr-2">0{i}.</span>
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
