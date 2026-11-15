<div align="center">

<a href="https://sudonova.surfacesignal.earth/">
  <img src="public/images/sudo-nova-logo-transparent.png" alt="Sudo Nova — mascote pinguim astronauta" width="220" />
</a>

**Engenharia, software e dados. Em conjunto.**

Três pessoas, diferentes perspectivas e a vontade compartilhada de transformar curiosidade em projetos reais.

[English](./README.md) · **Português**

[![Explorar Portfólio](https://img.shields.io/badge/EXPLORAR_PORTF%C3%93LIO-00DBE7?style=for-the-badge&labelColor=071824&logo=cloudflare&logoColor=white)](https://sudonova.surfacesignal.earth/)
[![GitHub da Equipe](https://img.shields.io/badge/GITHUB_DA_EQUIPE-172A38?style=for-the-badge&logo=github&logoColor=white)](https://github.com/sudo-nova-nsac26)

![Next.js 16](https://img.shields.io/badge/Next.js_16-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![React 19](https://img.shields.io/badge/React_19-149ECA?style=flat-square&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![CSS Modules](https://img.shields.io/badge/CSS_Modules-264DE4?style=flat-square&logo=css&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-0B0B0B?style=flat-square&logo=greensock&logoColor=88CE02)
![Lucide React](https://img.shields.io/badge/Lucide_React-F56565?style=flat-square&logo=lucide&logoColor=white)
![Cloudflare Pages](https://img.shields.io/badge/Cloudflare_Pages-F38020?style=flat-square&logo=cloudflare&logoColor=white)

**[Site oficial](https://sudonova.surfacesignal.earth/)** · **[Projetos](https://sudonova.surfacesignal.earth/#projetos)** · **[Equipe](https://sudonova.surfacesignal.earth/#equipe)** · **[Contato](https://sudonova.surfacesignal.earth/#contato)**

</div>

---

## ◇ Sobre a Sudo Nova

Somos **Arthur, Mateus e Yuri** — estudantes de Engenharia Elétrica e Engenharia de Software unidos pelo interesse em **tecnologia, dados, inteligência artificial, software livre e exploração espacial**.

Este repositório contém o código-fonte do portfólio da equipe: um espaço para nos apresentar, divulgar nossos projetos e registrar nossa trajetória.

> **Ideias ganham força em conjunto.**

## ✦ O que você encontra no portfólio

- **Conheça a equipe:** perfis, fotografias e links para GitHub e LinkedIn.
- **Projetos em destaque:** contexto, objetivos e estágio de desenvolvimento.
- **Experiência interativa:** animações GSAP, elementos orbitais e um mascote com o qual é possível interagir.
- **Acessibilidade e personalização:** layout responsivo, temas claro e escuro e conteúdo em **português e inglês**.
- **Contato direto:** formulário que prepara uma mensagem para envio pelo aplicativo de e-mail do visitante.

## ◇ Projeto em destaque: SurfaceSignal

<div align="center">
  <img src="public/images/logo-surface-signal.png" alt="Identidade visual do projeto SurfaceSignal" width="460" />
</div>

O **[SurfaceSignal](https://surfacesignal.earth/)** é uma aplicação interativa de observação da Terra publicada para o **[NASA Space Apps Challenge 2026](https://www.spaceappschallenge.org/2026/)**, no desafio **Dancing with the SARs**.

Utilizando observações da missão **NASA–ISRO NISAR**, o projeto piloto investiga mudanças na superfície terrestre perto de **Lajeado e Estrela, no Vale do Taquari (RS)**. Foram processadas **19 aquisições reais do NISAR (aproximadamente 131 GB de dados HDF5 originais)**, resultando em **17 comparações históricas de radar**.

As análises são contextualizadas com estimativas de chuva (CHIRPS), ocorrência histórica de água (JRC), uso e cobertura da terra (ESA WorldCover), informações de terreno (Copernicus DEM), limites geográficos do IBGE e contexto hidrológico do SGB. Os visitantes podem explorar visualizações geográficas interativas em 2D/3D, comparações temporais e explicações com fontes identificadas em português e inglês.

**[Explorar a aplicação SurfaceSignal](https://surfacesignal.earth/)** · **[Ver apresentação do projeto](https://github.com/sudo-nova-nsac26/presentation/blob/main/Surface%20Signal%20-%20Presentation.pdf)**

> **Limitação científica:** as mudanças detectadas por radar são observações exploratórias, não inundações ou impactos ambientais confirmados de forma independente. O SurfaceSignal não é um sistema de previsão de enchentes ou de alertas de emergência.

## ◇ Conheça a equipe

| Integrante | GitHub | LinkedIn |
| :--- | :--- | :--- |
| **Arthur Fassina** | [@arthurhfassina](https://github.com/arthurhfassina) | [LinkedIn • Arthur](https://www.linkedin.com/in/arthur-henrique-f-3a7065142) |
| **Mateus Carniel Brambilla** | [@matbdev](https://github.com/matbdev) | [LinkedIn • Mateus](https://www.linkedin.com/in/mateus-carniel-brambilla/) |
| **Yuri Korolko** | [@korolkoo](https://github.com/korolkoo) | [LinkedIn • Yuri](https://www.linkedin.com/in/yuri-korolko-192689401/) |

## ◇ Tecnologias e arquitetura

| Tecnologia | Função no projeto |
| :--- | :--- |
| **Next.js 16 + App Router** | Estrutura da aplicação e exportação estática |
| **React 19** | Interface e componentes interativos |
| **TypeScript** | Tipagem estática e organização do código |
| **CSS Modules** | Estilos isolados e layout responsivo |
| **GSAP + ScrollTrigger** | Animações e transições |
| **Lucide React** | Ícones da interface |
| **Cloudflare Pages** | Hospedagem e publicação do portfólio |

### Estrutura do projeto

```text
sudo-nova-portfolio/
├── public/
│   └── images/                 # Identidade visual, projetos e fotos da equipe
├── src/
│   ├── app/                    # App Router, layout e página principal
│   └── components/
│       └── sudo-nova/
│           ├── content.ts         # Textos em português/inglês e integrantes
│           ├── landing.tsx        # Componentes da página principal
│           ├── landing.module.css # Estilos
│           ├── mascot-motion.ts   # Animações do mascote
│           ├── free-mascot.tsx    # Mascote interativo
│           ├── orbital-background.tsx # Elementos orbitais
│           └── preferences.ts     # Preferências da interface
├── next.config.ts             # Configuração de exportação estática
└── package.json               # Dependências e scripts
```

## ◇ Executar localmente

**Pré-requisitos:** Node.js e npm compatíveis com Next.js 16.

```bash
# Clonar o repositório
git clone https://github.com/sudo-nova-nsac26/sudo-nova-portfolio.git

# Entrar na pasta
cd sudo-nova-portfolio

# Instalar dependências conforme o lockfile
npm ci

# Iniciar o servidor de desenvolvimento
npm run dev
```

Abra **http://localhost:3000** no navegador.

Para gerar os arquivos estáticos de produção:

```bash
npm run build
```

A configuração `output: "export"` em `next.config.ts` gera o site na pasta **`out/`**.

**Windows / PowerShell:** se a política de execução bloquear `npm.ps1`, utilize `npm.cmd run dev` ou `npm.cmd run build`.

## ◇ Publicação

O portfólio é hospedado no **Cloudflare Pages**, integrado ao GitHub.

| Configuração | Valor |
| :--- | :--- |
| Branch de produção | `main` |
| Comando de build | `npm run build` |
| Diretório de saída | `out` |
| Endereço oficial | [sudonova.surfacesignal.earth](https://sudonova.surfacesignal.earth/) |

Novas alterações integradas à branch de produção podem iniciar automaticamente uma publicação pelo Cloudflare Pages.

## ◇ Contato

Tem uma ideia, um projeto ou uma dúvida técnica? Fale com a equipe:

**[sudonova@matbdev.com](mailto:sudonova@matbdev.com)**

Você também pode acessar a **[seção de contato do portfólio](https://sudonova.surfacesignal.earth/#contato)**. O formulário prepara uma mensagem no aplicativo de e-mail do visitante, que deve confirmar o envio.

---

<div align="center">
  <sub>Feito pela equipe <a href="https://github.com/sudo-nova-nsac26"><strong>Sudo Nova</strong></a> · Brasil · 2026</sub>
  <br />
  <sub><strong>Explorar. Construir. Inovar.</strong></sub>
</div>
