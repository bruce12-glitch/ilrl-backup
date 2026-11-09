import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowDown, ArrowUpRight, Mail, Menu, Pause, Play, X } from "lucide-react";
import { GOALS, INTERESTS, LAB, PAPERS, PEOPLE } from "./data/lab";
import { activeSection, resolveSection, SECTIONS, type Section } from "./utils/navigation";
import { HeroWireframeHands } from "./components/HeroWireframeHands";
import { CyberneticTouch } from "./components/CyberneticTouch";
import "./styles/tokens.css";

const LABELS: Record<Section, string> = {
  about: "About",
  members: "Members",
  research: "Research",
  interests: "Interests",
  "future-goals": "Future Goals",
};

function Mark() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect x="1" y="1" width="26" height="26" stroke="currentColor" strokeWidth="1.5" />
      <polygon points="1,27 1,1 27,27" fill="currentColor" />
    </svg>
  );
}

function SectionTitle({
  number,
  title,
  note,
  id,
}: {
  number: string;
  title: string;
  note: string;
  id: string;
}) {
  return (
    <div className="section-intro">
      <span className="section-number">{number} / {title}</span>
      <h2 id={id}>{title}</h2>
      <p>{note}</p>
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<Section>(() => resolveSection(window.location.hash));
  const [motionRequested, setMotionRequested] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const motionEnabled = motionRequested && !reducedMotion;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const navigate = () => {
      const section = resolveSection(window.location.hash);
      setActive(section);
      setMenuOpen(false);
      if (window.location.hash.startsWith("#/")) {
        window.history.replaceState(null, "", `#${section}`);
      }
      document.getElementById(section)?.scrollIntoView({ behavior: "instant", block: "start" });
    };
    if (window.location.hash) navigate();
    window.addEventListener("hashchange", navigate);

    const trackSection = () => {
      const tops = SECTIONS.map(
        (id) => [id, document.getElementById(id)?.getBoundingClientRect().top ?? Infinity] as const
      );
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      setActive(activeSection(tops, atBottom));
    };

    window.addEventListener("scroll", trackSection, { passive: true });
    window.addEventListener("resize", trackSection);
    trackSection();

    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", escape);

    return () => {
      window.removeEventListener("hashchange", navigate);
      window.removeEventListener("keydown", escape);
      window.removeEventListener("scroll", trackSection);
      window.removeEventListener("resize", trackSection);
    };
  }, []);

  return (
    <div className="site" data-motion={motionEnabled}>
      <a
        className="skip-link"
        href="#main-content"
        onClick={(event) => {
          event.preventDefault();
          document.getElementById("main-content")?.focus();
        }}
      >
        Skip to content
      </a>

      <header className="site-header">
        <div className="container header-inner">
          <a href="#about" className="brand" aria-label="ILRL Labs home">
            <Mark />
            <span>
              ILRL<span className="brand-labs"> Labs</span>
            </span>
          </a>

          <nav
            id="site-navigation"
            className={menuOpen ? "navigation is-open" : "navigation"}
            aria-label="Main navigation"
          >
            {SECTIONS.map((section) => (
              <a
                key={section}
                href={`#${section}`}
                aria-current={active === section ? "location" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {LABELS[section]}
              </a>
            ))}
          </nav>

          <div className="header-controls">
            <button
              className="control-button"
              type="button"
              disabled={reducedMotion}
              onClick={() => setMotionRequested((value) => !value)}
              aria-label={
                reducedMotion
                  ? "Motion reduced by system setting"
                  : motionEnabled
                  ? "Pause animation"
                  : "Resume animation"
              }
              title={
                reducedMotion
                  ? "Following your reduced-motion setting"
                  : motionEnabled
                  ? "Pause animation"
                  : "Resume animation"
              }
            >
              {motionEnabled ? <Pause size={14} /> : <Play size={14} />}
            </button>
            <a
              href={`mailto:${LAB.email}`}
              className="control-button email-control"
              aria-label="Email ILRL Labs"
            >
              <Mail size={15} strokeWidth={1.5} />
            </a>
            <button
              className="control-button menu-toggle"
              type="button"
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              aria-controls="site-navigation"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((value) => !value)}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      <main id="main-content" tabIndex={-1}>
        <section id="about" className="about-section container" aria-labelledby="about-title">
          <motion.div
            className="about-copy"
            initial={motionEnabled ? { opacity: 0, y: 18 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 id="about-title">{LAB.fullName}</h1>
            <div className="about-details">
              <p className="about-description">{LAB.about}</p>
              <p className="about-interests">
                Our interests include holographic model compression, looped transformers, the future
                of inference in AGI, and unexplored conflicts in AGI.
              </p>
              <div className="about-links">
                <a className="inline-link inline-link-primary" href="#research">
                  Research papers <ArrowDown size={14} />
                </a>
                <a className="inline-link" href="#interests">
                  Our interests <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </motion.div>

          <HeroWireframeHands motionEnabled={motionEnabled} />
        </section>

        <section id="research" className="content-section container" aria-labelledby="research-title">
          <SectionTitle
            id="research-title"
            number="01"
            title="Research"
            note="Current papers on inference and memory."
          />
          <div className="paper-list">
            {PAPERS.map((paper, idx) => (
              <motion.article
                className="paper"
                key={paper.id}
                id={paper.id}
                initial={motionEnabled ? { opacity: 0, y: 14 } : false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <div>
                  <div className="paper-meta">
                    <span>Preprint · {paper.date}</span>
                    <span>{paper.topic}</span>
                  </div>
                  <h3>
                    <a href={paper.arxiv} target="_blank" rel="noreferrer">
                      <strong>{paper.name}</strong>: {paper.title}
                      <ArrowUpRight size={17} />
                    </a>
                  </h3>
                  <p className="paper-author">{paper.author}</p>
                  <p className="paper-summary">{paper.summary}</p>
                </div>
                <div className="paper-links" aria-label={`${paper.name} resources`}>
                  <a className="paper-primary" href={paper.arxiv} target="_blank" rel="noreferrer">
                    arXiv
                    <ArrowUpRight size={12} />
                  </a>
                  <a href={paper.pdf} target="_blank" rel="noreferrer">
                    PDF
                    <ArrowUpRight size={12} />
                  </a>
                  <a href={paper.code} target="_blank" rel="noreferrer">
                    Code
                    <ArrowUpRight size={12} />
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="interests" className="content-section container" aria-labelledby="interests-title">
          <SectionTitle
            id="interests-title"
            number="02"
            title="Interests"
            note="Directions we want to explore."
          />
          <div className="interest-list">
            {INTERESTS.map((interest, i) => (
              <motion.article
                className={`interest interest-${interest.id}`}
                key={interest.id}
                initial={motionEnabled ? { opacity: 0, y: 12 } : false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="interest-symbol" aria-hidden="true">
                  {i === 0 ? "⊞" : i === 1 ? "↶" : "↗"}
                </span>
                <div>
                  <h3>{interest.title}</h3>
                  <p>{interest.description}</p>
                  <span className="interest-keywords">{interest.keywords}</span>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section
          id="future-goals"
          className="content-section goals-section container"
          aria-labelledby="goals-title"
        >
          <SectionTitle
            id="goals-title"
            number="03"
            title="Future Goals"
            note="What we want to do next."
          />
          <ol className="goal-list">
            {GOALS.map((goal, idx) => (
              <motion.li
                key={goal.title}
                initial={motionEnabled ? { opacity: 0, y: 12 } : false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <h3>{goal.title}</h3>
                <p>{goal.text}</p>
              </motion.li>
            ))}
          </ol>
        </section>

        <section
          id="members"
          className="content-section members-section container"
          aria-labelledby="members-title"
        >
          <SectionTitle
            id="members-title"
            number="04"
            title="Members"
            note="The people working on these questions."
          />
          <div className="member-list">
            {PEOPLE.map((person, idx) => (
              <motion.article
                className="member"
                key={person.name}
                initial={motionEnabled ? { opacity: 0, y: 14 } : false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <img
                  className="portrait"
                  src={`${import.meta.env.BASE_URL}${person.photo}`}
                  width="136"
                  height="164"
                  alt={person.name}
                  loading="lazy"
                />
                <div className="member-information">
                  <p className="member-role">{person.role}</p>
                  <h3>{person.name}</h3>
                  {person.education && (
                    <a
                      className="member-education"
                      href={person.educationSource}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {person.education}
                    </a>
                  )}
                  <p className="member-focus">{person.focus}</p>
                  <div className="member-links">
                    {person.links.map((link) => (
                      <a href={link.href} key={link.label} target="_blank" rel="noreferrer">
                        {link.label}
                        <ArrowUpRight size={11} />
                      </a>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Centered Cybernetic & Human Hand Merging Stage at the Bottom */}
          <motion.div
            className="bottom-stage-container"
            initial={motionEnabled ? { opacity: 0, y: 20 } : false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <CyberneticTouch motionEnabled={motionEnabled} variant="bottom" />
          </motion.div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div>
            <a href="#about" className="brand" aria-label="ILRL Labs home">
              <Mark />
              <span>ILRL Labs</span>
            </a>
            <p>{LAB.fullName}</p>
          </div>
          <a className="footer-email" href={`mailto:${LAB.email}`}>
            {LAB.email}
            <ArrowUpRight size={13} />
          </a>
          <a className="back-top" href="#about">
            Back to top ↑
          </a>
        </div>
      </footer>
    </div>
  );
}
