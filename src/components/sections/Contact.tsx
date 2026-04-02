'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, Send, MessageSquare } from 'lucide-react';
import { IconGitHub, IconLinkedIn } from '@/components/ui/SocialIcons';
import NeonButton from '@/components/ui/NeonButton';
import { SOCIAL_LINKS } from '@/styles/theme';

const contactLinks = [
  {
    icon: Mail,
    label: 'Email',
    value: SOCIAL_LINKS.email,
    href: `mailto:${SOCIAL_LINKS.email}`,
    color: 'text-neon-pink',
    hoverGlow: 'hover:shadow-[0_0_15px_rgba(255,0,110,0.2)]',
  },
  {
    icon: IconGitHub,
    label: 'GitHub',
    value: '@Huotes',
    href: SOCIAL_LINKS.github,
    color: 'text-neon-green',
    hoverGlow: 'hover:shadow-[0_0_15px_rgba(57,255,20,0.2)]',
  },
  {
    icon: IconLinkedIn,
    label: 'LinkedIn',
    value: '/in/athosaurelio',
    href: SOCIAL_LINKS.linkedin,
    color: 'text-neon-blue',
    hoverGlow: 'hover:shadow-[0_0_15px_rgba(0,240,255,0.2)]',
  },
  {
    icon: Phone,
    label: 'Telefone',
    value: '+55 (18) 99789-6156',
    href: `tel:${SOCIAL_LINKS.phone}`,
    color: 'text-neon-orange',
    hoverGlow: 'hover:shadow-[0_0_15px_rgba(255,102,0,0.2)]',
  },
];

export default function Contact() {
  return (
    <section id="contact" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 grid-bg">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <MessageSquare className="w-5 h-5 text-neon-green" />
            <h2 className="font-display text-2xl sm:text-3xl tracking-wider text-gruvbox-fg1">
              <span className="text-neon-green font-mono text-sm mr-2">09.</span>
              Contato
            </h2>
          </div>
          <div className="section-divider max-w-md mx-auto" />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-gruvbox-fg3 text-sm sm:text-base max-w-lg mx-auto leading-relaxed"
          >
            Tem um projeto que precisa de um coringa no time? Quer trocar ideia sobre
            infra, segurança ou automatizar algo impossível? Cola comigo.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-3 font-mono text-xs text-gruvbox-fg4"
          >
            &quot;O próximo <span className="text-neon-green">git commit</span> pode ser o começo de algo grande.&quot;
          </motion.p>
        </motion.div>

        {/* Contact cards */}
        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          {contactLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.label !== 'Telefone' && link.label !== 'Email' ? '_blank' : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className={`
                flex items-center gap-4 p-4 rounded-lg
                bg-gradient-to-br from-gruvbox-bg0 to-gruvbox-bg1
                border border-gruvbox-bg2/50
                transition-all duration-300
                ${link.hoverGlow}
                hover:border-opacity-60
                group
              `}
            >
              <div
                className={`p-3 rounded-lg bg-gruvbox-bg0/80 border border-gruvbox-bg2/50 ${link.color} group-hover:scale-110 transition-transform`}
              >
                <link.icon size={20} />
              </div>
              <div>
                <p className="font-display text-xs tracking-wider text-gruvbox-fg4 uppercase">
                  {link.label}
                </p>
                <p className="font-mono text-sm text-gruvbox-fg2 group-hover:text-gruvbox-fg0 transition-colors">
                  {link.value}
                </p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <NeonButton
            href={`mailto:${SOCIAL_LINKS.email}?subject=Contato%20via%20Portfolio`}
            variant="green"
            size="lg"
          >
            <Send size={16} />
            Enviar Email
          </NeonButton>
        </motion.div>
      </div>
    </section>
  );
}
