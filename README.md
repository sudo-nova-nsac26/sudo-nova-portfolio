<div align="center">

<h1>Sudo Nova</h1>

<a href="https://sudonova.surfacesignal.earth/">
  <img src="https://raw.githubusercontent.com/sudo-nova-nsac26/sudo-nova-portfolio/main/public/images/sudo-nova-logo-transparent.png" alt="Sudo Nova astronaut penguin mascot" width="220" />
</a>

<p><strong>From open-source curiosity to real-world impact.</strong></p>
<p>Engineering, software, and data. Together.</p>

<p><strong>English</strong> · <a href="./README.pt-BR.md">Português</a></p>

<p><a href="https://sudonova.surfacesignal.earth/">Website</a> · <a href="https://sudonova.surfacesignal.earth/#projetos">Projects</a> · <a href="https://sudonova.surfacesignal.earth/#equipe">Team</a> · <a href="https://sudonova.surfacesignal.earth/#contato">Contact</a></p>

</div>

<!-- Technology badges — verified against package.json and application source -->
<p align="center">
  <sub><strong>FRAMEWORK &amp; INTERFACE</strong></sub>
</p>
<p align="center">
  <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js_16-071824?style=for-the-badge&amp;logo=nextdotjs&amp;logoColor=FFFFFF" alt="Next.js 16" /></a>
  <a href="https://react.dev/"><img src="https://img.shields.io/badge/React_19-133A4A?style=for-the-badge&amp;logo=react&amp;logoColor=61DAFB" alt="React 19" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-1B4774?style=for-the-badge&amp;logo=typescript&amp;logoColor=FFFFFF" alt="TypeScript" /></a>
  <a href="https://github.com/css-modules/css-modules"><img src="https://img.shields.io/badge/CSS_Modules-174B62?style=for-the-badge&amp;logo=css3&amp;logoColor=FFFFFF" alt="CSS Modules" /></a>
</p>
<p align="center">
  <sub><strong>ANIMATION, ICONS &amp; HOSTING</strong></sub>
</p>
<p align="center">
  <a href="https://gsap.com/"><img src="https://img.shields.io/badge/GSAP-18382E?style=for-the-badge&amp;logo=gsap&amp;logoColor=88CE02" alt="GSAP" /></a>
  <a href="https://lucide.dev/"><img src="https://img.shields.io/badge/Lucide_React-3A2A42?style=for-the-badge&amp;logo=lucide&amp;logoColor=F5A3B5" alt="Lucide React" /></a>
  <a href="https://pages.cloudflare.com/"><img src="https://img.shields.io/badge/Cloudflare_Pages-55361E?style=for-the-badge&amp;logo=cloudflare&amp;logoColor=F38020" alt="Cloudflare Pages" /></a>
</p>

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

**[SurfaceSignal](https://surfacesignal.earth/)** is a published interactive Earth observation application developed for the **[NASA Space Apps Challenge 2026](https://www.spaceappschallenge.org/2026/)** and the **Dancing with the SARs** challenge.

Using observations from the **NASA–ISRO NISAR** mission, its pilot examines surface changes near **Lajeado and Estrela, in Brazil's Taquari Valley**. The analysis processed **19 real NISAR acquisitions (approximately 131 GB of original HDF5 data)** and produced **17 historical radar comparisons**.

The results are complemented with rainfall estimates (CHIRPS), historical water occurrence (JRC), land cover (ESA WorldCover), terrain information (Copernicus DEM), IBGE boundaries, and SGB hydrological context. Visitors can explore interactive 2D/3D geographic visualizations, temporal comparisons, and source-aware explanations in Portuguese or English.

**[Explore the live SurfaceSignal application](https://surfacesignal.earth/)** · **[View the project presentation](https://github.com/sudo-nova-nsac26/presentation/blob/main/Surface%20Signal%20-%20Presentation.pdf)**

> **Scientific limitation:** Detected radar changes are exploratory observations, not independently confirmed floods or environmental impacts. SurfaceSignal is not a flood-prediction or emergency-alert system.

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
