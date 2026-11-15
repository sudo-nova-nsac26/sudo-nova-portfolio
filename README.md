<div align="center">

<a href="https://sudonova.surfacesignal.earth/">
  <img src="public/images/sudo-nova-logo-transparent.png" alt="Sudo Nova — mascote pinguim astronauta" width="220" />
</a>

# Sudo Nova

**Engenharia, software e dados. Em conjunto.**

Três pessoas, diferentes perspectivas e a vontade de transformar curiosidade em projetos reais.

[![Visitar portfólio](https://img.shields.io/badge/EXPLORAR_O_PORTFÓLIO-00DBE7?style=for-the-badge&labelColor=071824&logo=cloudflare&logoColor=white)](https://sudonova.surfacesignal.earth/)
[![GitHub da equipe](https://img.shields.io/badge/GITHUB_DA_EQUIPE-172A38?style=for-the-badge&logo=github&logoColor=white)](https://github.com/sudo-nova-nsac26)

![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React_19-149ECA?style=flat-square&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-0B0B0B?style=flat-square&logo=greensock&logoColor=88CE02)
![Cloudflare Pages](https://img.shields.io/badge/Cloudflare_Pages-F38020?style=flat-square&logo=cloudflare&logoColor=white)

**[Website](https://sudonova.surfacesignal.earth/)** · **[Projetos](https://sudonova.surfacesignal.earth/#projetos)** · **[Equipe](https://sudonova.surfacesignal.earth/#equipe)** · **[Contato](https://sudonova.surfacesignal.earth/#contato)**

</div>

---

## ◇ Sobre a Sudo Nova

Somos **Arthur, Mateus e Yuri** — estudantes de Engenharia Elétrica e Engenharia de Software reunidos pelo interesse em **tecnologia, dados, inteligência artificial, software livre e exploração espacial**.

Este repositório contém o código-fonte do nosso portfólio: um espaço para apresentar quem somos, compartilhar os projetos em desenvolvimento e registrar nossa evolução como equipe.

> **Ideias ganham força em conjunto.**

## ✦ O que você encontra neste portfólio

- **Apresentação da equipe:** perfis, fotografias e links para GitHub e LinkedIn.
- **Projetos em destaque:** contexto, objetivos e estágio atual do que estamos desenvolvendo.
- **Experiência interativa:** animações com GSAP, elementos orbitais e mascote com interação no navegador.
- **Acessibilidade e personalização:** interface responsiva, opções de tema claro/escuro e conteúdo em **português e inglês**.
- **Contato direto:** formulário que prepara uma mensagem para envio pelo aplicativo de e-mail do visitante.

## ◇ Projeto em destaque: SurfaceSignal

<div align="center">
  <img src="public/images/logo-surface-signal.png" alt="Identidade visual do projeto SurfaceSignal" width="460" />
</div>

**SurfaceSignal** é uma proposta em fase inicial, apresentada no contexto do **NASA Space Apps Challenge 2026**. O projeto explora como comparar observações de radar da missão **NISAR** para investigar possíveis mudanças na superfície terrestre e comunicar essas evidências de maneira compreensível.

O recorte inicial considera **Lajeado e Estrela, no Vale do Taquari (RS)**.

**Questão central:** como comparar observações da mesma região em momentos distintos, investigar diferenças e apresentar seus resultados com contexto e limitações?

> **Nota técnica:** diferenças em sinais de radar exigem interpretação e validação. Elas não confirmam, isoladamente, a ocorrência de inundações. O SurfaceSignal não é um sistema operacional de alerta.

## ◇ Quem constrói

| Integrante | GitHub | LinkedIn |
| :--- | :--- | :--- |
| **Arthur Fassina** | [@arthurhfassina](https://github.com/arthurhfassina) | [Perfil](https://www.linkedin.com/in/arthur-henrique-f-3a7065142) |
| **Mateus Carniel Brambilla** | [@matbdev](https://github.com/matbdev) | [Perfil](https://www.linkedin.com/in/mateus-carniel-brambilla/) |
| **Yuri Korolko** | [@korolkoo](https://github.com/korolkoo) | [Perfil](https://www.linkedin.com/in/yuri-korolko-192689401/) |

## ◇ Tecnologias e arquitetura

| Tecnologia | Utilização no projeto |
| :--- | :--- |
| **Next.js 16 + App Router** | Estrutura da aplicação e exportação estática |
| **React 19** | Interface e componentes interativos |
| **TypeScript** | Tipagem e organização do código |
| **CSS Modules** | Estilos isolados e layout responsivo |
| **GSAP + ScrollTrigger** | Animações e transições |
| **Lucide React** | Ícones da interface |
| **Cloudflare Pages** | Hospedagem e publicação do portfólio |

### Estrutura principal

```text
sudo-nova-portfolio/
├── public/
│   └── images/                 # Identidade visual, projetos e fotos da equipe
├── src/
│   ├── app/                    # App Router, layout e página principal
│   └── components/
│       └── sudo-nova/
│           ├── content.ts         # Textos em português e inglês; membros
│           ├── landing.tsx        # Componentes da landing page
│           ├── landing.module.css # Estilos da página
│           ├── mascot-motion.ts   # Animações do mascote
│           ├── free-mascot.tsx    # Interação com o mascote
│           ├── orbital-background.tsx # Elementos orbitais
│           └── preferences.ts     # Preferências de interface
├── next.config.ts             # Exportação estática
└── package.json               # Dependências e scripts
```

## ◇ Executar localmente

**Pré-requisitos:** Node.js e npm instalados em versões compatíveis com Next.js 16.

```bash
# Clonar o repositório
git clone https://github.com/sudo-nova-nsac26/sudo-nova-portfolio.git

# Acessar a pasta do projeto
cd sudo-nova-portfolio

# Instalar dependências conforme o lockfile
npm ci

# Iniciar o servidor de desenvolvimento
npm run dev
```

Abra **http://localhost:3000** no navegador.

Para gerar a versão estática de produção:

```bash
npm run build
```

Com `output: "export"` em `next.config.ts`, a saída estática é gerada no diretório **`out/`**.

**Windows / PowerShell:** caso a política de execução bloqueie `npm.ps1`, use `npm.cmd run dev` ou `npm.cmd run build`.

## ◇ Publicação

O site é publicado no **Cloudflare Pages**, com integração ao GitHub.

| Configuração | Valor |
| :--- | :--- |
| Branch de produção | `main` |
| Comando de build | `npm run build` |
| Diretório de saída | `out` |
| URL pública | [sudonova.surfacesignal.earth](https://sudonova.surfacesignal.earth/) |

Novas alterações integradas à branch de produção podem acionar automaticamente o processo de publicação no Cloudflare Pages.

## ◇ Contato

Tem uma ideia, um projeto ou uma dúvida técnica? Fale com a equipe:

**[sudonova@matbdev.com](mailto:sudonova@matbdev.com)**

Você também pode utilizar a **[seção de contato do portfólio](https://sudonova.surfacesignal.earth/#contato)**. O formulário prepara uma mensagem no aplicativo de e-mail do visitante; o envio é confirmado por ele.

---

<div align="center">
  <sub>Feito pela equipe <a href="https://github.com/sudo-nova-nsac26"><strong>Sudo Nova</strong></a> · Brasil · 2026</sub>
  <br />
  <sub><strong>Explore. Build. Innovate.</strong></sub>
</div>
