"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { ArrowDown, ArrowUpRight, CodeXml, Menu, X, Sun, Moon, Mail, Copy, Send } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { content, members, organizationUrl } from "./content";
import { usePreferences, savePreference } from "./preferences";
import styles from "./landing.module.css";
import { useMascotMotion } from "./mascot-motion";

import FreeMascot from "./free-mascot";
import OrbitalBackground from "./orbital-background";

const sections = ["sobre", "projetos", "equipe", "contato"];
const CONTACT_EMAIL = "sudonova@matbdev.com";

function LinkedInIcon() {
  return <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M5 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM3.3 9h3.4v12H3.3V9Zm5.7 0h3.3v1.6c.6-1.1 1.8-1.9 3.5-1.9 3.5 0 4.2 2.3 4.2 5.3v7h-3.4v-6.2c0-1.5 0-3.3-2-3.3s-2.3 1.6-2.3 3.2V21H9V9Z"/></svg>;
}
function SurfaceArt() {
  return <svg className={styles.surface} viewBox="0 0 800 410" fill="none" aria-hidden="true">
    {Array.from({ length: 23 }, (_, i) => <path key={i} d={`M-80 ${100+i*15} C110 ${-50+i*13}, 200 ${390-i*3}, 370 ${150+i*9} S620 ${60+i*10}, 880 ${160+i*12}`} stroke="currentColor" strokeOpacity={0.18+i*0.025} />)}
    <circle cx="425" cy="205" r="68" stroke="currentColor" strokeDasharray="4 7"/><path d="M410 205h30M425 190v30" stroke="currentColor"/>
  </svg>;
}
function safeProfile(value: string, domain: string) {
  if (!value) return null;
  try { const url = new URL(value); return url.protocol === "https:" && (url.hostname === domain || url.hostname.endsWith(`.${domain}`)) ? url.href : null; } catch { return null; }
}

export default function SudoNovaLanding() {
  const root = useRef<HTMLDivElement>(null);
  const logoStage = useRef<HTMLDivElement>(null);
  const mascotDock = useRef<HTMLSpanElement>(null);
  const flyingMascot = useRef<HTMLDivElement>(null);
  const originalLogo = useRef<HTMLDivElement>(null);
  const logoBase = useRef<HTMLDivElement>(null);
  useMascotMotion({ root, stage: logoStage, dock: mascotDock, flyer: flyingMascot, original: originalLogo, base: logoBase });
  const { language, theme } = usePreferences();
  const t = content[language];
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [hoverMember, setHoverMember] = useState<string | null>(null);
  const activeMember = hoverMember ?? selectedMember;
  const [contactTopic, setContactTopic] = useState(0);
  const [contactName, setContactName] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);
  function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const subject = "[Sudo Nova] " + t.contactTopics[contactTopic];
    const body = (contactName.trim() ? contactName.trim() + "\n\n" : "") + contactMessage.trim();
    window.location.href = "mailto:" + CONTACT_EMAIL + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
  }
  async function copyContactEmail() {
    try { await navigator.clipboard.writeText(CONTACT_EMAIL); setCopiedEmail(true); }
    catch { setCopiedEmail(false); }
  }
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-intro]", { y: 22, opacity: 0, duration: .8, stagger: .12, ease: "power2.out" });
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach(element => {
          gsap.from(element, { y: 24, opacity: 0, duration: .7, ease: "power2.out", scrollTrigger: { trigger: element, start: "top 94%", once: true } });
        });
      });
    }, root);
    return () => { media.revert(); context.revert(); };
  }, []);

  useEffect(() => {
    document.documentElement.lang = language === "pt" ? "pt-BR" : "en";
    document.title = language === "pt" ? "Sudo Nova — Engenharia, software e exploração" : "Sudo Nova — Engineering, software and exploration";
    ScrollTrigger.refresh();
  }, [language]);

  useEffect(() => {
    const previous = document.documentElement.style.colorScheme;
    document.documentElement.style.colorScheme = theme;
    return () => { document.documentElement.style.colorScheme = previous; };
  }, [theme]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") { setMenuOpen(false); menuButton.current?.focus(); } };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return <div className={styles.site} data-theme={theme} lang={language === "pt" ? "pt-BR" : "en"} ref={root}>
    <OrbitalBackground/>
    <a href="#conteudo" className={styles.skip}>{t.skip}</a>
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <a className={styles.brand} href="#inicio" aria-label={t.home}><span ref={mascotDock} className={styles.mascotDock} aria-hidden="true"><Image src="/images/sudo-nova-mascot.png" alt="" width={1254} height={1254} sizes="46px"/></span><span className={styles.wordmark}>Sudo <span>Nova</span></span></a>
        <nav className={styles.desktopNav} aria-label={t.navigation}>{sections.map((id,i) => <a key={id} href={`#${id}`}>{t.nav[i]}</a>)}</nav>
        <div className={styles.headerActions}>
          <div className={styles.languageSwitch} role="group" aria-label={language === "pt" ? "Idioma" : "Language"}>
            <button type="button" lang="pt-BR" aria-label="Português" aria-pressed={language === "pt"} onClick={() => savePreference("language", "pt")}>PT</button>
            <button type="button" lang="en" aria-label="English" aria-pressed={language === "en"} onClick={() => savePreference("language", "en")}>EN</button>
          </div>
          <button className={styles.toolButton} title={`${t.theme} ${theme === "dark" ? t.light : t.dark}`} aria-label={`${t.theme} ${theme === "dark" ? t.light : t.dark}`} onClick={() => savePreference("theme", theme === "dark" ? "light" : "dark")}>{theme === "dark" ? <Sun size={18} aria-hidden="true"/> : <Moon size={18} aria-hidden="true"/>}</button>
          <a className={styles.github} href={organizationUrl} target="_blank" rel="noopener noreferrer"><CodeXml size={17} aria-hidden="true"/><span>GitHub</span><ArrowUpRight size={15} aria-hidden="true"/></a>
          <button ref={menuButton} className={styles.menuButton} aria-label={menuOpen ? t.closeMenu : t.openMenu} aria-expanded={menuOpen} aria-controls="mobile-nav" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X aria-hidden="true"/> : <Menu aria-hidden="true"/>}</button>
        </div>
        <nav id="mobile-nav" aria-label={t.mobileNavigation} hidden={!menuOpen} className={styles.mobileNav}>{sections.map((id,i) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{t.nav[i]}<ArrowUpRight size={18} aria-hidden="true"/></a>)}</nav>
      </div>
    </header>
    <main id="conteudo">
      <section className={styles.hero} id="inicio" aria-labelledby="hero-title">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow} data-intro=""><span className={styles.statusDot}/>{t.eyebrow}</p>
          <h1 id="hero-title" data-intro="">{t.title} <em>{t.titleAccent}</em></h1>
          <p className={styles.lead} data-intro="">{t.lead}</p>
          <div className={styles.actions} data-intro=""><a className={styles.primary} href="#projetos">{t.explore}<ArrowUpRight size={19} aria-hidden="true"/></a><a className={styles.textLink} href="#equipe">{t.meet}<ArrowDown size={16} aria-hidden="true"/></a></div>
        </div>
        <div className={styles.diagram}>
          <div className={styles.diagramTop}><span>{t.connection}</span><span>01 — 03</span></div>
          <div ref={logoStage} className={styles.logoStage}>
            <div ref={logoBase} className={styles.logoLayerBase} aria-hidden="true"><Image src="/images/sudo-nova-logo-base.png" alt="" width={1254} height={1254} sizes="(max-width:720px) 88vw, 440px" className={styles.logoHero}/></div>
            <div ref={originalLogo} className={styles.logoLayerOriginal}><Image src="/images/sudo-nova-logo-transparent.png" alt={t.logoAlt} width={1254} height={1254} sizes="(max-width:720px) 88vw, 440px" priority className={styles.logoHero}/></div>
          </div>
          <div className={styles.diagramBottom}><span>{t.three}</span><span>{t.one}</span></div>
        </div>
      </section>
      <div className={styles.memberStrip}><span>{t.builders}</span>{members.map(member => <a key={member.number} href={`#member-${member.number}`} onClick={() => setSelectedMember(member.number)}><span className={styles.miniAvatar}>{member.initials}</span>{member.name}</a>)}</div>
      <section className={styles.about} id="sobre" aria-labelledby="about-title" data-reveal="">
        <p className={styles.eyebrow}>{t.aboutLabel}</p><div><h2 id="about-title">{t.aboutTitle}<br/><span>{t.aboutAccent}</span></h2><p>{t.aboutText}</p><p>{t.aboutText2}</p></div>
      </section>
      <section className={styles.projects} id="projetos" aria-labelledby="projects-title">
        <div className={styles.sectionHeading} data-reveal=""><p className={styles.eyebrow}>{t.projectLabel}</p><h2 id="projects-title">{t.projectTitle}</h2></div>
        <article className={styles.project} data-reveal="">
          <div className={styles.projectVisual}><span className={styles.visualLabel}>{t.projectNumber}</span><SurfaceArt/><span className={styles.visualCaption}>SURFACE<br/><strong>SIGNAL</strong></span><span className={styles.artLabel}>{t.conceptual}</span></div>
          <div className={styles.projectCopy}><p className={styles.eyebrow}>{t.projectTag}</p><h3>SurfaceSignal<span>.</span></h3><p className={styles.projectLead}>{t.projectLead}</p><p>{t.projectText}</p><p className={styles.competition}>{t.projectContext}</p><a className={styles.textLink} href={organizationUrl} target="_blank" rel="noopener noreferrer">{t.projectLink}<ArrowUpRight size={19} aria-hidden="true"/></a></div>
        </article>
        <div className={styles.projectScope} aria-label={t.projectDetails} data-reveal="">{t.projectScope.map(([title,description],index) => <div key={index}><span>0{index+1}</span><h3>{title}</h3><p>{description}</p></div>)}</div>
        <p className={styles.projectLimit}>{t.projectLimit}</p>
      </section>
      <section className={styles.team} id="equipe" aria-labelledby="team-title">
        <div className={styles.teamHeading} data-reveal=""><div><p className={styles.eyebrow}>{t.teamLabel}</p><h2 id="team-title">{t.teamTitle}<br/><span>{t.teamAccent}</span></h2></div><p>{t.teamText}</p></div>
        <div className={styles.memberGrid} data-has-active={Boolean(activeMember)}>{members.map(member => {
          const gh = safeProfile(member.github, "github.com");
          const li = safeProfile(member.linkedin, "linkedin.com");
          return <article className={styles.member} id={`member-${member.number}`} data-active={activeMember === member.number} key={member.number} onMouseEnter={() => setHoverMember(member.number)} onMouseLeave={() => setHoverMember(null)} onFocusCapture={() => setHoverMember(member.number)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setHoverMember(null); }}>
            <div className={styles.memberTop}><span>SUDO NOVA</span><span>/{member.number}</span></div>
            <div className={styles.memberIdentity}>
              <span className={styles.initials} aria-hidden="true">{member.initials}</span>
              <div className={styles.memberPortrait}>
                {member.photo ? <Image src={member.photo} alt={member.name} fill sizes="(max-width: 720px) 150px, 180px" className={styles.memberPhoto} /> : <span className={styles.portraitPlaceholder} aria-hidden="true">{member.initials}</span>}
              </div>
            </div>
            <h3><button className={styles.memberSelect} aria-pressed={selectedMember === member.number} aria-label={`${t.select} ${member.name}`} onClick={() => setSelectedMember(selectedMember === member.number ? null : member.number)}>{member.name}</button></h3>
            <p>{t.member}</p><div className={styles.profileLinks}>
              {gh ? <a href={gh} target="_blank" rel="noopener noreferrer" aria-label={`${t.openProfile} ${member.name} — GitHub`}><CodeXml size={17} aria-hidden="true"/>GitHub<ArrowUpRight size={13} aria-hidden="true"/></a> : <span aria-disabled="true" title={t.missingProfile}><CodeXml size={17} aria-hidden="true"/>GitHub</span>}
              {li ? <a href={li} target="_blank" rel="noopener noreferrer" aria-label={`${t.openProfile} ${member.name} — LinkedIn`}><LinkedInIcon/>LinkedIn<ArrowUpRight size={13} aria-hidden="true"/></a> : <span aria-disabled="true" title={t.missingProfile}><LinkedInIcon/>LinkedIn</span>}
            </div>{!gh && !li && <p className={styles.profilePending}>{t.profilesSoon}</p>}
          </article>;
        })}</div>
      </section>
      <section className={`${styles.interests} ${styles.collective}`} aria-labelledby="interests-title" data-reveal=""><div><p className={styles.eyebrow}>{t.interestsLabel}</p><h2 id="interests-title">{t.interestsTitle}</h2></div><div className={styles.collectiveBody}><p className={styles.collectiveIntro}>{t.interestsIntro}</p><p>{t.collectiveText}</p></div></section>
      <section className={styles.contact} id="contato" aria-labelledby="contact-title" data-reveal="">
        <div className={styles.contactInner}>
          <div className={styles.contactIntro}>
            <p className={styles.eyebrow}>{t.contactLabel}</p>
            <h2 id="contact-title">{t.contactTitle}<br/><em>{t.contactAccent}</em></h2>
            <p className={styles.contactLead}>{t.contactIntro}</p>
            <div className={styles.contactEmail}>
              <a href={`mailto:${CONTACT_EMAIL}`}><Mail size={19} aria-hidden="true"/><span>{CONTACT_EMAIL}</span><ArrowUpRight size={17} aria-hidden="true"/></a>
              <button type="button" onClick={copyContactEmail}><Copy size={16} aria-hidden="true"/>{copiedEmail ? t.contactCopied : t.contactCopy}</button>
            </div>
            <a className={styles.contactGithub} href={organizationUrl} target="_blank" rel="noopener noreferrer"><CodeXml size={17} aria-hidden="true"/>{t.github}<ArrowUpRight size={15} aria-hidden="true"/></a>
          </div>
          <form className={styles.contactForm} onSubmit={handleContactSubmit}>
            <p className={styles.contactFormTitle}>{t.contactQuick}</p>
            <div className={styles.topicButtons} role="group" aria-label={t.contactQuick}>
              {t.contactTopics.map((topic, index) => <button type="button" key={topic} aria-pressed={contactTopic === index} onClick={() => setContactTopic(index)}>{topic}</button>)}
            </div>
            <label className={styles.contactField}><span>{t.contactName}</span><input type="text" maxLength={100} value={contactName} onChange={event => setContactName(event.target.value)} placeholder={t.contactNamePlaceholder}/></label>
            <label className={styles.contactField}><span>{t.contactMessage}</span><textarea required minLength={2} maxLength={2500} rows={5} value={contactMessage} onChange={event => setContactMessage(event.target.value)} placeholder={t.contactMessagePlaceholder}/></label>
            <button className={styles.contactSubmit} type="submit"><Send size={17} aria-hidden="true"/>{t.contactSend}<ArrowUpRight size={16} aria-hidden="true"/></button>
            <p className={styles.contactNotice}>{t.contactNotice}</p>
          </form>
        </div>
      </section>
    </main>
    <footer className={styles.footer}><span>SUDO NOVA</span><p>{t.footer}</p><a href="#inicio">{t.backTop} ↑</a></footer>
    <div ref={flyingMascot} className={styles.flyingMascot} aria-hidden="true"><Image src="/images/sudo-nova-mascot.png" alt="" width={1254} height={1254} sizes="280px"/></div>
    <FreeMascot language={language}/>
  </div>;
}

