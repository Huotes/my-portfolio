import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Athos Aurélio | Backend Warlock & DevSecOps Aspirant',
  description:
    'Portfólio de Athos Aurélio — Generalista apaixonado por backend, infraestrutura, segurança da informação e desenvolvimento de jogos. 6+ anos de experiência transformando código em soluções.',
  keywords: [
    'Athos Aurélio',
    'Backend Developer',
    'Python',
    'Django',
    'Flask',
    'DevSecOps',
    'Full Stack',
    'Game Developer',
    'Cybersecurity',
  ],
  authors: [{ name: 'Athos Aurélio' }],
  openGraph: {
    title: 'Athos Aurélio | Backend Warlock',
    description: 'Generalista que se diverte com backend, infra e segurança.',
    url: 'https://athosaurelio.dev',
    siteName: 'Athos Aurélio Portfolio',
    locale: 'pt_BR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className="bg-gruvbox-bg0_hard text-gruvbox-fg1 font-body antialiased">
        {children}
      </body>
    </html>
  );
}
