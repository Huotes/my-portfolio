# 📜 Certificados

Diretório para armazenamento dos PDFs de certificados.

## Como adicionar um novo certificado

1. **Coloque o PDF** neste diretório com um nome identificável:
   ```
   certificates/
   ├── 6D59A092.pdf          # Fundamentos de Arquitetura de Sistemas
   ├── cybersecurity.pdf     # Cybersecurity Hacker Skills
   └── ...
   ```

2. **Registre no data file** em `src/data/certificates.ts`:
   ```typescript
   {
     id: 'meu-certificado',
     title: 'Nome do Certificado',
     institution: 'Instituição',
     date: '2025',
     credentialUrl: 'https://link-para-verificacao.com',
     pdfPath: '/certificates/nome-do-arquivo.pdf',
     tags: ['Tag1', 'Tag2'],
     icon: 'shield', // shield | code | server | cpu | lock | globe | gamepad
   }
   ```

3. **Copie o PDF também** para `public/certificates/` para que fique acessível via URL estática.

## Estrutura

```
certificates/          ← PDFs originais (backup)
public/certificates/   ← PDFs servidos pelo Next.js (acessíveis via URL)
src/data/certificates.ts ← Metadados e credenciais
```
