"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  projects,
  reel,
  siteConfig,
  skills,
  tools,
  type Project,
} from "@/data/projects";

const navItems = [
  { label: "Work", href: "#work" },
  { label: "Reel", href: "#reel" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.55, delay, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Arrow({ direction = "right" }: { direction?: "right" | "down" }) {
  return (
    <span aria-hidden="true" className={`arrow arrow-${direction}`}>
      →
    </span>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header
      className={`site-header ${scrolled ? "site-header-scrolled" : ""} ${
        menuOpen ? "site-header-open" : ""
      }`}
    >
      <nav className="nav-shell" aria-label="Primary navigation">
        <a className="wordmark" href="#top" onClick={() => setMenuOpen(false)}>
          {siteConfig.name}<span className="wordmark-dot">.</span>
        </a>
        <button
          className="menu-button"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-links"
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span>{menuOpen ? "Close" : "Menu"}</span>
        </button>
        <div className="nav-links" id="primary-links">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}

function ProjectCard({
  project,
  index,
  onSelect,
}: {
  project: Project;
  index: number;
  onSelect: (project: Project) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const playPreview = () => {
    videoRef.current?.play().catch(() => undefined);
  };
  const stopPreview = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
  };

  return (
    <Reveal className="project-reveal" delay={(index % 2) * 0.08}>
      <button
        className="project-card"
        onClick={() => onSelect(project)}
        onMouseEnter={playPreview}
        onMouseLeave={stopPreview}
        onFocus={playPreview}
        onBlur={stopPreview}
        aria-label={`View ${project.title} project`}
      >
        <span
          className={`project-media ${
            project.format === "vertical" ? "project-media-vertical" : ""
          }`}
        >
          <Image
            src={project.thumbnail}
            alt=""
            fill
            sizes="(max-width: 800px) 100vw, 50vw"
          />
          {project.previewVideo && (
            <video
              ref={videoRef}
              muted
              loop
              playsInline
              preload="none"
              poster={project.thumbnail}
              aria-hidden="true"
            >
              <source src={project.previewVideo} type="video/mp4" />
            </video>
          )}
          <span className="project-index">0{index + 1}</span>
          <span className="project-view">View project <Arrow /></span>
        </span>
        <span className="project-meta">
          <span>
            <strong>{project.title}</strong>
            <small>{project.category}</small>
          </span>
          <small>{project.year}</small>
        </span>
      </button>
    </Reveal>
  );
}

function ProjectDialog({
  project,
  onClose,
  onNext,
}: {
  project: Project;
  onClose: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  return (
    <motion.div
      className="project-dialog"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-dialog-title"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <button
        className="dialog-close"
        type="button"
        onClick={onClose}
        aria-label="Close project"
        autoFocus
      >
        Close
      </button>
      <motion.div
        className="dialog-content"
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 16, opacity: 0 }}
        transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
      >
        <p className="eyebrow">
          {project.category} · {project.year}
        </p>
        <h2 id="project-dialog-title">{project.title}</h2>
        <p className="dialog-lead">{project.description}</p>
        <div
          className={`dialog-video ${
            project.format === "vertical" ? "dialog-video-vertical" : ""
          }`}
        >
          {project.youtubeId ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${
                project.youtubeId
              }?rel=0${project.youtubeStart ? `&start=${project.youtubeStart}` : ""}`}
              title={`${project.title} video`}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : (
            <video
              controls
              playsInline
              preload="metadata"
              poster={project.thumbnail}
            >
              <source src={project.fullVideo} type="video/mp4" />
            </video>
          )}
        </div>
        <div className="dialog-details">
          <div>
            <p className="detail-label">Role</p>
            <p>{project.role}</p>
          </div>
          <div>
            <p className="detail-label">Tools</p>
            <p>{project.tools.join(", ")}</p>
          </div>
          <div>
            <p className="detail-label">Outcome</p>
            <p>{project.outcome}</p>
          </div>
        </div>
        <button className="next-project" type="button" onClick={onNext}>
          Next project <Arrow />
        </button>
      </motion.div>
    </motion.div>
  );
}

export default function Portfolio() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const goToNextProject = () => {
    if (!activeProject) return;
    const current = projects.findIndex((item) => item.id === activeProject.id);
    setActiveProject(projects[(current + 1) % projects.length]);
  };

  return (
    <>
      <Header />
      <main>
        <section className="hero" id="top" aria-labelledby="hero-title">
          <video
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={reel.poster}
            aria-hidden="true"
          >
            <source src={reel.video} type="video/mp4" />
          </video>
          <div className="hero-shade" />
          <div className="hero-content">
            <p className="hero-kicker">{siteConfig.role}</p>
            <h1 id="hero-title">
              Stories live
              <br />
              in the cut.
            </h1>
            <div className="hero-bottom">
              <p>{siteConfig.statement}</p>
              <a className="primary-cta" href="#reel">
                Watch the reel <span aria-hidden="true">↘</span>
              </a>
            </div>
          </div>
          <a className="scroll-cue" href="#work" aria-label="Scroll to work">
            Scroll <Arrow direction="down" />
          </a>
        </section>

        <section className="work-section" id="work" aria-labelledby="work-title">
          <div className="container">
            <Reveal className="section-heading">
              <p className="eyebrow">Selected work</p>
              <h2 id="work-title">Built frame by frame.</h2>
              <p className="section-intro">
                Editing, color, motion, and sound—shaped into stories with a
                point of view.
              </p>
            </Reveal>
            <div className="project-grid">
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onSelect={setActiveProject}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="reel-section" id="reel" aria-labelledby="reel-title">
          <div className="container reel-heading">
            <Reveal>
              <p className="eyebrow eyebrow-light">Showreel · 01:32</p>
              <h2 id="reel-title">The work, in motion.</h2>
            </Reveal>
          </div>
          <Reveal className="reel-media">
            <video controls playsInline preload="metadata" poster={reel.poster}>
              <source src={reel.video} type="video/mp4" />
            </video>
          </Reveal>
        </section>

        <section
          className="about-section"
          id="about"
          aria-labelledby="about-title"
        >
          <div className="container">
            <Reveal className="about-top">
              <p className="eyebrow">About</p>
              <h2 id="about-title">Cut with intent.</h2>
              <p className="about-lead">{siteConfig.bio}</p>
            </Reveal>
            <div className="about-grid">
              <Reveal className="about-philosophy">
                <p className="detail-label">Approach</p>
                <p>{siteConfig.philosophy}</p>
              </Reveal>
              <Reveal className="capability-list" delay={0.08}>
                <div>
                  <p className="detail-label">Tools</p>
                  <ul>
                    {tools.map((tool) => (
                      <li key={tool}>{tool}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="detail-label">Skills</p>
                  <ul>
                    {skills.map((skill) => (
                      <li key={skill}>{skill}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section
          className="contact-section"
          id="contact"
          aria-labelledby="contact-title"
        >
          <div className="container">
            <Reveal>
              <p className="eyebrow eyebrow-light">Available for select projects</p>
              <h2 id="contact-title">
                Have a story?
                <br />
                Let&apos;s cut it.
              </h2>
              <a className="contact-email" href={`mailto:${siteConfig.email}`}>
                {siteConfig.email} <Arrow />
              </a>
            </Reveal>
            <div className="social-links">
              {siteConfig.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {social.label} <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container footer-inner">
          <p>
            {siteConfig.name}<span className="wordmark-dot">.</span> © 2026
          </p>
          <div>
            {navItems.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </div>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>

      <AnimatePresence mode="wait">
        {activeProject && (
          <ProjectDialog
            key={activeProject.id}
            project={activeProject}
            onClose={() => setActiveProject(null)}
            onNext={goToNextProject}
          />
        )}
      </AnimatePresence>
    </>
  );
}
