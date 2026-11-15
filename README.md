<div align="center">

<a href="https://sudonova.surfacesignal.earth/">
  <img src="public/images/sudo-nova-logo-transparent.png" alt="Sudo Nova — astronaut penguin mascot" width="220" />
</a>

**Engineering, software, and data. Together.**

Three people, different perspectives, and a shared drive to turn curiosity into real projects.

[![Explore Portfolio](https://img.shields.io/badge/EXPLORE_PORTFOLIO-00DBE7?style=for-the-badge&labelColor=071824&logo=cloudflare&logoColor=white)](https://sudonova.surfacesignal.earth/)
[![Team GitHub](https://img.shields.io/badge/TEAM_GITHUB-172A38?style=for-the-badge&logo=github&logoColor=white)](https://github.com/sudo-nova-nsac26)

![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React_19-149ECA?style=flat-square&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-0B0B0B?style=flat-square&logo=greensock&logoColor=88CE02)
![Cloudflare Pages](https://img.shields.io/badge/Cloudflare_Pages-F38020?style=flat-square&logo=cloudflare&logoColor=white)

**[Website](https://sudonova.surfacesignal.earth/)** · **[Projects](https://sudonova.surfacesignal.earth/#projetos)** · **[Team](https://sudonova.surfacesignal.earth/#equipe)** · **[Contact](https://sudonova.surfacesignal.earth/#contato)**

</div>

---

## ◇ About Sudo Nova

We are **Arthur, Mateus, and Yuri** — Electrical Engineering and Software Engineering students brought together by a shared interest in **technology, data, artificial intelligence, open-source software, and space exploration**.

This repository contains the source code for our team portfolio: a space to introduce ourselves, share the projects we're developing, and document our growth as a team.

> **Ideas grow stronger together.**

## ✦ What You'll Find in This Portfolio

- **Meet the team:** member profiles, photographs, and links to GitHub and LinkedIn.
- **Featured projects:** background, goals, and the current stage of our work.
- **Interactive experience:** GSAP animations, orbital elements, and a mascot you can interact with in the browser.
- **Accessibility and customization:** responsive design, light/dark themes, and content in **Portuguese and English**.
- **Direct contact:** a form that prepares a message for visitors to send using their email application.

## ◇ Featured Project: SurfaceSignal

<div align="center">
  <img src="public/images/logo-surface-signal.png" alt="SurfaceSignal project visual identity" width="460" />
</div>

**SurfaceSignal** is an early-stage concept presented in the context of the **NASA Space Apps Challenge 2026**. The project explores ways to compare radar observations from the **NISAR** mission to investigate potential changes on Earth's surface and communicate the findings clearly.

The initial area of interest covers **Lajeado and Estrela, in the Taquari Valley, Rio Grande do Sul, Brazil**.

**Core question:** How can we compare observations of the same region at different times, investigate differences, and present the results with appropriate context and limitations?

> **Technical note:** Differences in radar signals require interpretation and validation. On their own, they do not confirm flooding. SurfaceSignal is not an operational warning system.

## ◇ Meet the Team

| Team Member | GitHub | LinkedIn |
| :--- | :--- | :--- |
| **Arthur Fassina** | [@arthurhfassina](https://github.com/arthurhfassina) | [LinkedIn • Arthur](https://www.linkedin.com/in/arthur-henrique-f-3a7065142) |
| **Mateus Carniel Brambilla** | [@matbdev](https://github.com/matbdev) | [LinkedIn • Mateus](https://www.linkedin.com/in/mateus-carniel-brambilla/) |
| **Yuri Korolko** | [@korolkoo](https://github.com/korolkoo) | [LinkedIn • Yuri](https://www.linkedin.com/in/yuri-korolko-192689401/) |

## ◇ Tech Stack and Architecture

| Technology | Role in the Project |
| :--- | :--- |
| **Next.js 16 + App Router** | Application structure and static export |
| **React 19** | User interface and interactive components |
| **TypeScript** | Type safety and code organization |
| **CSS Modules** | Scoped styles and responsive layout |
| **GSAP + ScrollTrigger** | Animations and transitions |
| **Lucide React** | Interface icons |
| **Cloudflare Pages** | Portfolio hosting and deployment |

### Project Structure

```text
sudo-nova-portfolio/
├── public/
│   └── images/                 # Branding, projects, and team photos
├── src/
│   ├── app/                    # App Router, layout, and main page
│   └── components/
│       └── sudo-nova/
│           ├── content.ts         # Portuguese/English content and members
│           ├── landing.tsx        # Landing page components
│           ├── landing.module.css # Page styles
│           ├── mascot-motion.ts   # Mascot animations
│           ├── free-mascot.tsx    # Interactive mascot
│           ├── orbital-background.tsx # Orbital elements
│           └── preferences.ts     # Interface preferences
├── next.config.ts             # Static export configuration
└── package.json               # Dependencies and scripts
```

## ◇ Run Locally

**Prerequisites:** Node.js and npm versions compatible with Next.js 16.

```bash
# Clone the repository
git clone https://github.com/sudo-nova-nsac26/sudo-nova-portfolio.git

# Navigate to the project directory
cd sudo-nova-portfolio

# Install dependencies using the lockfile
npm ci

# Start the development server
npm run dev
```

Open **http://localhost:3000** in your browser.

To create a static production build:

```bash
npm run build
```

With `output: "export"` set in `next.config.ts`, the static output is generated in the **`out/`** directory.

**Windows / PowerShell:** If the execution policy blocks `npm.ps1`, use `npm.cmd run dev` or `npm.cmd run build` instead.

## ◇ Deployment

The website is hosted on **Cloudflare Pages**, integrated with GitHub.

| Setting | Value |
| :--- | :--- |
| Production branch | `main` |
| Build command | `npm run build` |
| Output directory | `out` |
| Public URL | [sudonova.surfacesignal.earth](https://sudonova.surfacesignal.earth/) |

New changes merged into the production branch can automatically trigger a new Cloudflare Pages deployment.

## ◇ Contact

Have an idea, a project, or a technical question? Get in touch with the team:

**[sudonova@matbdev.com](mailto:sudonova@matbdev.com)**

You can also use the **[portfolio contact section](https://sudonova.surfacesignal.earth/#contato)**. The form prepares a message in the visitor's email application; the visitor completes and confirms the send action there.

---

<div align="center">
  <sub>Made by the <a href="https://github.com/sudo-nova-nsac26"><strong>Sudo Nova</strong></a> team · Brazil · 2026</sub>
  <br />
  <sub><strong>Explore. Build. Innovate.</strong></sub>
</div>
