export interface Certificate {
  id: string;
  title: string;
  institution: string;
  date: string;
  hours?: number;
  credentialUrl: string;
  pdfPath?: string;
  tags: string[];
  icon: 'shield' | 'code' | 'server' | 'cpu' | 'lock' | 'globe' | 'gamepad' | 'database' | 'cloud';
}

export const certificates: Certificate[] = [
  // ════════════════════════════════════════════
  // DIO — Certificados verificados via PDF
  // ════════════════════════════════════════════
  {
    id: 'dio-arq-sistemas',
    title: 'Fundamentos de Arquitetura de Sistemas',
    institution: 'DIO',
    date: 'Mar 2022',
    hours: 6,
    credentialUrl: 'https://hermes.dio.me/certificates/6A8806AB.pdf',
    pdfPath: '/certificates/6A8806AB.pdf',
    tags: ['Arquitetura', 'Sistemas', 'Fundamentos'],
    icon: 'server',
  },
  {
    id: 'dio-php-avancado',
    title: 'Desenvolvimento Avançado em PHP',
    institution: 'DIO',
    date: 'Abr 2022',
    hours: 10,
    credentialUrl: 'https://hermes.dio.me/certificates/6D59A092.pdf',
    pdfPath: '/certificates/6D59A092.pdf',
    tags: ['PHP', 'Backend', 'Avançado'],
    icon: 'code',
  },
  {
    id: 'dio-seg-python',
    title: 'Segurança da Informação com Python',
    institution: 'DIO',
    date: 'Abr 2022',
    hours: 5,
    credentialUrl: 'https://hermes.dio.me/certificates/03F16CEC.pdf',
    pdfPath: '/certificates/03F16CEC.pdf',
    tags: ['Python', 'Segurança', 'InfoSec'],
    icon: 'lock',
  },
  {
    id: 'dio-ruby-rails',
    title: 'Ruby on Rails: Montando uma Rede Social',
    institution: 'DIO',
    date: 'Jul 2022',
    hours: 9,
    credentialUrl: 'https://hermes.dio.me/certificates/952B753E.pdf',
    pdfPath: '/certificates/952B753E.pdf',
    tags: ['Ruby', 'Rails', 'Full Stack'],
    icon: 'code',
  },
  {
    id: 'dio-eventos-kafka',
    title: 'Arquitetura Orientada a Eventos com Java, Spring Boot e Kafka',
    institution: 'DIO',
    date: 'Nov 2022',
    hours: 3,
    credentialUrl: 'https://hermes.dio.me/certificates/CFCACEC5.pdf',
    pdfPath: '/certificates/CFCACEC5.pdf',
    tags: ['Java', 'Kafka', 'Spring Boot', 'Eventos'],
    icon: 'server',
  },
  {
    id: 'dio-serverless-aws',
    title: 'Desenvolvendo Soluções Serverless na AWS',
    institution: 'DIO',
    date: 'Nov 2022',
    hours: 4,
    credentialUrl: 'https://hermes.dio.me/certificates/3A639DFC.pdf',
    pdfPath: '/certificates/3A639DFC.pdf',
    tags: ['AWS', 'Serverless', 'Cloud'],
    icon: 'cloud',
  },
  {
    id: 'dio-poo',
    title: 'Programação Orientada a Objetos',
    institution: 'DIO',
    date: 'Nov 2022',
    hours: 4,
    credentialUrl: 'https://hermes.dio.me/certificates/91D23D13.pdf',
    pdfPath: '/certificates/91D23D13.pdf',
    tags: ['OOP', 'Fundamentos', 'Design Patterns'],
    icon: 'code',
  },
  {
    id: 'dio-api-rds-java',
    title: 'Criando uma API REST Conectada ao Amazon RDS com Java',
    institution: 'DIO',
    date: 'Nov 2022',
    hours: 5,
    credentialUrl: 'https://hermes.dio.me/certificates/EFA21209.pdf',
    pdfPath: '/certificates/EFA21209.pdf',
    tags: ['Java', 'AWS RDS', 'API REST'],
    icon: 'cloud',
  },
  {
    id: 'dio-postgresql',
    title: 'Conceitos e Melhores Práticas com PostgreSQL',
    institution: 'DIO',
    date: 'Dez 2022',
    hours: 9,
    credentialUrl: 'https://hermes.dio.me/certificates/70CFADCA.pdf',
    pdfPath: '/certificates/70CFADCA.pdf',
    tags: ['PostgreSQL', 'Banco de Dados', 'SQL'],
    icon: 'database',
  },
  {
    id: 'dio-django',
    title: 'Desenvolvimento Web com Python e Django',
    institution: 'DIO',
    date: 'Dez 2022',
    hours: 4,
    credentialUrl: 'https://hermes.dio.me/certificates/738AE74B.pdf',
    pdfPath: '/certificates/738AE74B.pdf',
    tags: ['Python', 'Django', 'Web'],
    icon: 'code',
  },

  // ════════════════════════════════════════════
  // FIAP — Nano Courses (verificados via imagem)
  // ════════════════════════════════════════════
  {
    id: 'fiap-cybersecurity',
    title: 'Cybersecurity Hacker Skills',
    institution: 'FIAP',
    date: 'Out 2024',
    hours: 120,
    credentialUrl: 'https://on.fiap.com.br/pluginfile.php/1/local_nanocourses/certificado_nanocourse/129995/1cd7ddaaef9b4b2e9542f3ee229a0022/certificado.png',
    tags: ['Cybersecurity', 'Hacking', 'Segurança'],
    icon: 'shield',
  },
  {
    id: 'fiap-banco-dados',
    title: 'Programação em Banco de Dados',
    institution: 'FIAP',
    date: 'Nov 2024',
    hours: 100,
    credentialUrl: 'https://on.fiap.com.br/pluginfile.php/1/local_nanocourses/certificado_nanocourse/132595/02aef706753a7848b0cecf024d679be7/certificado.png',
    tags: ['Banco de Dados', 'SQL', 'Programação'],
    icon: 'database',
  },
  {
    id: 'fiap-big-data',
    title: 'Big Data',
    institution: 'FIAP',
    date: 'Nov 2024',
    hours: 60,
    credentialUrl: 'https://on.fiap.com.br/pluginfile.php/1/local_nanocourses/certificado_nanocourse/133364/b80835810f1db93f8816ca1e0e807000/certificado.png',
    tags: ['Big Data', 'Analytics', 'Data Science'],
    icon: 'database',
  },
  {
    id: 'fiap-estruturas',
    title: 'Estruturas de Computadores',
    institution: 'FIAP',
    date: 'Dez 2024',
    hours: 40,
    credentialUrl: 'https://on.fiap.com.br/pluginfile.php/1/local_nanocourses/certificado_nanocourse/135101/ee754bc9f51f1d30370c50cbee88fa03/certificado.png',
    tags: ['Hardware', 'Arquitetura', 'Computação'],
    icon: 'cpu',
  },
  {
    id: 'fiap-iot',
    title: 'Dominando IoT',
    institution: 'FIAP',
    date: 'Dez 2024',
    hours: 80,
    credentialUrl: 'https://on.fiap.com.br/pluginfile.php/1/local_nanocourses/certificado_nanocourse/135250/c65ebf0ab4e3af36416844b4b3dea979/certificado.png',
    tags: ['IoT', 'Hardware', 'Automação'],
    icon: 'cpu',
  },
];

/*
 * ═══════════════════════════════════════════════════════
 * COMO ADICIONAR UM NOVO CERTIFICADO:
 * ═══════════════════════════════════════════════════════
 *
 * 1. Para PDFs: coloque em /public/certificates/NOME.pdf
 *    Para PNGs: coloque em /public/certificates/NOME.png
 *
 * 2. Adicione um novo objeto no array acima seguindo o padrão.
 *
 * 3. Ícones disponíveis (Lucide React):
 *    shield | code | server | cpu | lock | globe | gamepad | database | cloud
 *
 * NOTA: Os certificados DIO são PDFs acessíveis via URL direta.
 *       Os certificados FIAP são imagens PNG hospedadas no portal FIAP ON.
 *       Para validar FIAP: https://on.fiap.com.br/local/nanocourses/validar-certificado
 * ═══════════════════════════════════════════════════════
 */
