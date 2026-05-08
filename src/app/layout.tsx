import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Athos Aurélio | DevOps & Automation Engineer',
  description:
    'Portfólio de Athos Aurélio — DevOps em transição estruturada, com foco em automação, Linux, Docker, CI/CD, cloud, segurança de pipelines e observabilidade.',
  keywords: [
    'Athos Aurélio',
    'DevOps',
    'Automation Engineer',
    'Python',
    'Golang',
    'Docker',
    'Kubernetes',
    'AWS',
    'CI/CD',
    'Linux',
    'DevSecOps',
    'Platform Engineering',
    'Cybersecurity',
  ],
  authors: [{ name: 'Athos Aurélio' }],
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  },
  openGraph: {
    title: 'Athos Aurélio | DevOps & Automation Engineer',
    description: 'Backend experience turned into secure, automated and observable delivery pipelines.',
    url: 'https://athosaurelio.com.br',
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
