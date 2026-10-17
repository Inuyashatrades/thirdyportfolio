"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { projects, siteConfig, skills, tools, type Project } from "@/data/projects";

const navItems = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
];

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduceMotion = useReducedMotion();
  return <motion.div className={className} initial={reduceMotion ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.48, delay, ease: [0.4, 0, 0.2, 1] }}>{children}</motion.div>;
}

function Arrow() { return <span aria-hidden="true">↗</span>; }

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className={`site-header ${menuOpen ? "is-open" : ""}`}>
      <nav className="nav-shell" aria-label="Primary navigation">
        <a className="wordmark" href="#top" onClick={() => setMenuOpen(false)}>Thirdy Razon<span>.</span></a>
        <button className="menu-button" type="button" aria-expanded={menuOpen} aria-controls="primary-links" onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? "Close" : "Menu"}</button>
        <div className="nav-links" id="primary-links">{navItems.map((item) => <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>)}</div>
        <a className="hire-link" href="#contact">Hire me <Arrow /></a>
      </nav>
    </header>
  );
}

function ProjectCard({ project, index, onSelect }: { project: Project; index: number; onSelect: (project: Project) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playPreview = () => videoRef.current?.play().catch(() => undefined);
  const stopPreview = () => { if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0; } };
  return (
    <Reveal className="project-reveal" delay={(index % 2) * 0.06}>
      <button className="project-card" onClick={() => onSelect(project)} onMouseEnter={playPreview} onMouseLeave={stopPreview} onFocus={playPreview} onBlur={stopPreview} aria-label={`View ${project.title}`}>
        <span className={`project-media ${project.format === "vertical" ? "is-vertical" : ""}`}>
          <Image src={project.thumbnail} alt="" fill sizes="(max-width: 760px) 100vw, 50vw" />
          {project.previewVideo && <video ref={videoRef} muted loop playsInline preload="none" poster={project.thumbnail} aria-hidden="true"><source src={project.previewVideo} type="video/mp4" /></video>}
          <span className="project-number">0{index + 1}</span><span className="project-action">View <Arrow /></span>
        </span>
        <span className="project-meta"><span><strong>{project.title}</strong><small>{project.category}</small></span><small>{project.year}</small></span>
      </button>
    </Reveal>
  );
}

function ProjectDialog({ project, onClose, onNext }: { project: Project; onClose: () => void; onNext: () => void }) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    document.body.style.overflow = "hidden"; document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; document.removeEventListener("keydown", onKey); };
  }, [onClose]);
  return (
    <motion.div className="project-dialog" role="dialog" aria-modal="true" aria-labelledby="project-dialog-title" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <button className="dialog-close" type="button" onClick={onClose} autoFocus>Close ×</button>
      <motion.div className="dialog-content" initial={{ y: 24 }} animate={{ y: 0 }} transition={{ duration: 0.42 }}>
        <p className="kicker">{project.category} / {project.year}</p><h2 id="project-dialog-title">{project.title}</h2><p className="dialog-lead">{project.description}</p>
        <div className={`dialog-video ${project.format === "vertical" ? "is-vertical" : ""}`}>
          {project.youtubeId ? <iframe src={`https://www.youtube-nocookie.com/embed/${project.youtubeId}?rel=0${project.youtubeStart ? `&start=${project.youtubeStart}` : ""}`} title={`${project.title} video`} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /> : <video controls playsInline preload="metadata" poster={project.thumbnail}><source src={project.fullVideo} type="video/mp4" /></video>}
        </div>
        <div className="dialog-details"><div><p className="detail-label">Role</p><p>{project.role}</p></div><div><p className="detail-label">Tools</p><p>{project.tools.join(", ")}</p></div><div><p className="detail-label">Outcome</p><p>{project.outcome}</p></div></div>
        <button className="next-project" type="button" onClick={onNext}>Next project <Arrow /></button>
      </motion.div>
    </motion.div>
  );
}

export default function Portfolio() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const nextProject = () => { if (activeProject) { const index = projects.findIndex((project) => project.id === activeProject.id); setActiveProject(projects[(index + 1) % projects.length]); } };
  return (
    <><Header /><main>
      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-copy"><p className="kicker">Hi, I&apos;m Thirdy — video editor &amp; creative partner</p><h1 id="hero-title">Your search for a <span>video editor</span> ends here.</h1><p className="hero-statement">Hire someone who thinks strategically, not just executes.</p><div className="hero-actions"><a className="button button-primary" href="#work">View my work <Arrow /></a><a className="text-link" href="#contact">Start a project →</a></div></div>
        <div className="hero-visual" aria-label="Featured video edit preview"><div className="shape shape-purple" /><div className="shape shape-lime" /><div className="edit-badge">⌘ CUT</div><div className="availability">Available for projects</div><div className="hero-frame"><video autoPlay muted loop playsInline preload="metadata" aria-label="Short-form editing preview"><source src="/videos/short-form-01.mp4" type="video/mp4" /></video></div><div className="spark" aria-hidden="true">✦</div></div>
      </section>
      <section className="work-section" id="work" aria-labelledby="work-title"><h2 className="sr-only" id="work-title">Selected work</h2><div className="project-grid">{projects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} onSelect={setActiveProject} />)}</div></section>
      <section className="about-section" id="about" aria-labelledby="about-title"><Reveal className="about-lead"><p className="kicker">Behind the edits</p><h2 id="about-title">I don&apos;t just assemble footage. <span>I find the idea.</span></h2></Reveal><div className="about-grid"><Reveal className="about-copy"><p>{siteConfig.bio}</p><p>{siteConfig.philosophy}</p></Reveal><Reveal className="tool-panel" delay={0.08}><div><p className="detail-label">What I do</p><ul>{skills.map((skill) => <li key={skill}>{skill}</li>)}</ul></div><div><p className="detail-label">My toolkit</p><ul>{tools.map((tool) => <li key={tool}>{tool}</li>)}</ul></div></Reveal></div></section>
      <section className="contact-section" id="contact" aria-labelledby="contact-title"><p className="kicker">Need an editor who sees the bigger picture?</p><h2 id="contact-title">Let&apos;s make your next video impossible to ignore.</h2><div className="contact-row"><a className="button button-dark" href={`mailto:${siteConfig.email}`}>Email Thirdy <Arrow /></a><p>{siteConfig.email}</p></div></section>
    </main><footer><p>Thirdy Razon © 2026</p><p>Video editor · Philippines</p><a href="#top">Back to top ↑</a></footer><AnimatePresence mode="wait">{activeProject && <ProjectDialog key={activeProject.id} project={activeProject} onClose={() => setActiveProject(null)} onNext={nextProject} />}</AnimatePresence></>
  );
}
