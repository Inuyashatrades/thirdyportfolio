"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { projects, services, siteConfig, type Project } from "@/data/projects";

const navItems = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
];

const shortFormProjects = projects.filter((project) => project.format === "short-form");
const longFormProjects = projects.filter((project) => project.format === "long-form");
const aiAnimationProjects = projects.filter((project) => project.format === "ai-animation");
const orderedProjects = [...shortFormProjects, ...longFormProjects, ...aiAnimationProjects];

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
      </nav>
    </header>
  );
}

function ProjectCard({ project, index, onSelect }: { project: Project; index: number; onSelect: (project: Project) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const ratioClass = `ratio-${project.aspectRatio.replace(":", "-")}`;
  const analyticsLabel = project.analytics
    ? `${project.analytics.views} views${project.analytics.platform ? ` on ${project.analytics.platform}` : ""}${project.analytics.reactions ? `, ${project.analytics.reactions} reactions` : ""}${project.analytics.shares ? `, ${project.analytics.shares} shares` : ""}`
    : undefined;
  const playPreview = () => videoRef.current?.play().catch(() => undefined);
  const stopPreview = () => { if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0; } };
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !window.matchMedia("(hover: none), (pointer: coarse)").matches) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => undefined);
      else video.pause();
    }, { threshold: 0.35 });

    observer.observe(video);
    return () => observer.disconnect();
  }, []);
  return (
    <Reveal className={`project-reveal ${ratioClass}`} delay={(index % 4) * 0.05}>
      <article className="project-card" onMouseEnter={playPreview} onMouseLeave={stopPreview}>
        <span className={`project-media ${ratioClass}`}>
          {project.previewVideo && <video ref={videoRef} muted loop playsInline preload="metadata" poster={project.previewPoster} aria-hidden="true"><source src={project.previewVideo} type="video/mp4" /></video>}
          {project.youtubeId && <iframe src={`https://www.youtube-nocookie.com/embed/${project.youtubeId}?controls=0&mute=1&rel=0${project.youtubeStart ? `&start=${project.youtubeStart}` : ""}`} title={`${project.title} preview`} loading="lazy" tabIndex={-1} aria-hidden="true" />}
          <span className="project-number">0{index + 1}</span><span className="project-action">View <Arrow /></span>
        </span>
        <span className="project-meta"><span><strong>{project.title}</strong>{!project.hideCategory && <small>{project.category}</small>}</span><small>{project.year}</small></span>
        {project.analytics && <span className={`project-analytics ${!project.analytics.reactions && !project.analytics.shares ? "is-single" : ""}`} aria-label={analyticsLabel}><span><strong>{project.analytics.views}</strong><small>{project.analytics.platform ? `Views · ${project.analytics.platform}` : "Views"}</small></span>{project.analytics.reactions && <span><strong>{project.analytics.reactions}</strong><small>Reacts</small></span>}{project.analytics.shares && <span><strong>{project.analytics.shares}</strong><small>Shares</small></span>}</span>}
        <button className="project-open" type="button" onClick={() => onSelect(project)} onFocus={playPreview} onBlur={stopPreview} aria-label={`View ${project.title}`}><span className="sr-only">View {project.title}</span></button>
      </article>
    </Reveal>
  );
}

function ProjectDialog({ project, onClose, onNext }: { project: Project; onClose: () => void; onNext: () => void }) {
  const ratioClass = `ratio-${project.aspectRatio.replace(":", "-")}`;
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    document.body.style.overflow = "hidden"; document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; document.removeEventListener("keydown", onKey); };
  }, [onClose]);
  return (
    <motion.div className="project-dialog" role="dialog" aria-modal="true" aria-labelledby="project-dialog-title" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <button className="dialog-close" type="button" onClick={onClose} autoFocus>Close ×</button>
      <motion.div className="dialog-content" initial={{ y: 24 }} animate={{ y: 0 }} transition={{ duration: 0.42 }}>
        {!project.hideCategory && <p className="kicker">{project.category} / {project.year}</p>}<h2 id="project-dialog-title">{project.title}</h2><p className="dialog-lead">{project.description}</p>
        <div className={`dialog-video ${ratioClass}`}>
          {project.youtubeId ? <iframe src={`https://www.youtube-nocookie.com/embed/${project.youtubeId}?rel=0${project.youtubeStart ? `&start=${project.youtubeStart}` : ""}`} title={`${project.title} video`} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /> : <video controls playsInline preload="metadata" poster={project.previewPoster}><source src={project.fullVideo} type="video/mp4" /></video>}
        </div>
        <div className="dialog-details"><div><p className="detail-label">Role</p><p>{project.role}</p></div><div><p className="detail-label">Tools</p><p>{project.tools.join(", ")}</p></div><div><p className="detail-label">Outcome</p><p>{project.outcome}</p></div></div>
        <button className="next-project" type="button" onClick={onNext}>Next project <Arrow /></button>
      </motion.div>
    </motion.div>
  );
}

export default function Portfolio() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const nextProject = () => { if (activeProject) { const index = orderedProjects.findIndex((project) => project.id === activeProject.id); setActiveProject(orderedProjects[(index + 1) % orderedProjects.length]); } };
  return (
    <><Header /><main>
      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-copy"><h1 id="hero-title">Your search for a <span>video specialist</span> ends here.</h1><p className="hero-statement">Hire someone who thinks <mark>strategically</mark>, not just executes.</p><div className="hero-actions"><a className="button button-primary" href="#booking">Book a consultation <Arrow /></a><a className="text-link" href="#contact">Start a project →</a></div></div>
        <div className="hero-visual" aria-label="Portrait of Thirdy Razon"><div className="shape shape-purple" /><div className="shape shape-lime" /><div className="edit-badge">⌘ CUT</div><div className="availability">Available for projects</div><div className="hero-portrait"><Image src="/images/thirdy-portrait-cutout.png" alt="Thirdy Razon, video specialist" fill priority sizes="(max-width: 900px) 92vw, 46vw" /></div><div className="spark" aria-hidden="true">✦</div></div>
      </section>
      <section className="work-section" id="work" aria-labelledby="work-title"><h2 className="sr-only" id="work-title">Selected work</h2><div className="work-group" aria-labelledby="short-form-title"><Reveal className="work-group-heading"><p>Selected work</p><h3 id="short-form-title">Short-form videos</h3></Reveal><div className="project-grid is-five">{shortFormProjects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} onSelect={setActiveProject} />)}</div></div><div className="work-group" aria-labelledby="long-form-title"><Reveal className="work-group-heading"><p>Selected work</p><h3 id="long-form-title">Long-form videos</h3></Reveal><div className="project-grid">{longFormProjects.map((project, index) => <ProjectCard key={project.id} project={project} index={shortFormProjects.length + index} onSelect={setActiveProject} />)}</div></div><div className="work-group" aria-labelledby="ai-animation-title"><Reveal className="work-group-heading"><p>Selected work</p><h3 id="ai-animation-title">AI animation</h3></Reveal><div className="project-grid">{aiAnimationProjects.map((project, index) => <ProjectCard key={project.id} project={project} index={shortFormProjects.length + longFormProjects.length + index} onSelect={setActiveProject} />)}</div></div></section>
      <section className="services-offered" id="services" aria-labelledby="services-title"><Reveal className="services-heading"><p>What I do</p><h2 id="services-title">Services offered</h2><span aria-hidden="true" /></Reveal><div className="services-offered-grid">{services.map((service, index) => <Reveal className="offered-card" delay={(index % 2) * 0.06} key={service.title}><span className={`offered-mark ${service.color}`} aria-hidden="true">{service.mark}</span><div><h3>{service.title}</h3><span className="card-rule" aria-hidden="true" /><p>{service.description}</p></div></Reveal>)}</div></section>
      <section className="contact-section" id="contact" aria-labelledby="contact-title"><div className="contact-copy"><p className="kicker">Need a specialist who sees the bigger picture?</p><h2 id="contact-title">Let&apos;s make your next video impossible to ignore.</h2><div className="contact-row"><a className="button button-dark" href={`mailto:${siteConfig.email}`}>Email Thirdy <Arrow /></a><p>{siteConfig.email}</p></div></div><div className="booking-panel" id="booking"><div className="calendly-inline-widget" data-url="https://calendly.com/razongerardo/30min" aria-label="Book a 30-minute consultation with Thirdy" /></div><Script id="calendly-widget" src="https://assets.calendly.com/assets/external/widget.js" strategy="afterInteractive" /></section>
    </main><footer><p>Thirdy Razon © 2026</p><p>Video specialist · Philippines</p><a href="#top">Back to top ↑</a></footer><AnimatePresence mode="wait">{activeProject && <ProjectDialog key={activeProject.id} project={activeProject} onClose={() => setActiveProject(null)} onNext={nextProject} />}</AnimatePresence></>
  );
}
