import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight, Github, Menu, X } from 'lucide-react';
import {
  contributions,
  projects,
  toolkit,
  type Contribution,
  type Project,
} from './data/portfolio';
import { CodeVisual, FluxVisual, FlashVisual, NetworkVisual } from './components/SystemVisuals';

const navigation = [
  ['about', 'About'],
  ['work', 'Work'],
  ['open-source', 'Open source'],
  ['toolkit', 'Toolkit'],
  ['journey', 'Journey'],
  ['contact', 'Contact'],
] as const;

function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('top');
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (current) setActive(current.target.id);
      },
      { rootMargin: '-20% 0px -60% 0px' },
    );
    ['top', ...navigation.map(([id]) => id)].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);
  return (
    <header className="site-header">
      <nav className="nav-shell" aria-label="Primary navigation">
        <a
          className="wordmark"
          href="#top"
          onClick={() => setOpen(false)}
          aria-label="Gaurav Thakur, back to top"
        >
          <span className="mark">
            G<span>.</span>
          </span>
          <span>
            GAURAV <em>/ ENGINEER</em>
          </span>
        </a>
        <div className="nav-links">
          {navigation.map(([id, label]) => (
            <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined}>
              {label}
            </a>
          ))}
        </div>
        <a
          className="nav-contact"
          href="https://github.com/Gaurav598"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub <ArrowUpRight size={15} aria-hidden="true" />
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>
      <div id="mobile-menu" className={`mobile-menu ${open ? 'is-open' : ''}`} hidden={!open}>
        {navigation.map(([id, label]) => (
          <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
            {label}
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        ))}
        <a
          href="https://github.com/Gaurav598"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setOpen(false)}
        >
          GitHub
          <ArrowUpRight size={16} />
        </a>
      </div>
    </header>
  );
}

function SectionHeading({
  index,
  label,
  title,
  intro,
}: {
  index: string;
  label: string;
  title: ReactNode;
  intro?: string;
}) {
  return (
    <div className="section-heading">
      <div className="section-index">
        <span>{index}</span>
        <span className="index-line" />
        <span>{label}</span>
      </div>
      <h2>{title}</h2>
      {intro && <p>{intro}</p>}
    </div>
  );
}

function Hero() {
  const reduced = useReducedMotion();
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-grid" aria-hidden="true" />
      <div className="container hero-content">
        <div className="hero-copy">
          <div className="eyebrow hero-eyebrow">
            <span className="live-dot" /> ENGINEERING PORTFOLIO / 2026
          </div>
          <h1 id="hero-title" aria-label="Hi, I’m Gaurav Thakur. I build systems that hold up.">
            <motion.span
              className="hero-line hero-hello"
              aria-hidden="true"
              initial={reduced ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              Hi, I’m Gaurav Thakur.
            </motion.span>
            <motion.span
              className="hero-line"
              aria-hidden="true"
              initial={reduced ? false : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.72, delay: 0.17, ease: [0.22, 1, 0.36, 1] }}
            >
              I build <em>systems</em>
            </motion.span>
            <motion.span
              className="hero-line"
              aria-hidden="true"
              initial={reduced ? false : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.72, delay: 0.29, ease: [0.22, 1, 0.36, 1] }}
            >
              that hold up.
            </motion.span>
          </h1>
          <motion.p
            className="hero-description"
            initial={reduced ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            I build real-time, full-stack products with a backend focus, and deepen my understanding
            of distributed systems by implementing them.
          </motion.p>
          <motion.div
            className="hero-actions"
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.52 }}
          >
            <a className="button button-primary" href="#work">
              Explore the work <ArrowDownRight size={17} />
            </a>
            <a
              className="button button-quiet"
              href="https://github.com/Gaurav598"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={17} /> GitHub <ArrowUpRight size={16} />
            </a>
          </motion.div>
          <div className="hero-meta">
            <span>
              <strong>FOCUS</strong> Backend / Distributed systems
            </span>
            <span>
              <strong>ALSO</strong> Full-stack / Open source
            </span>
          </div>
        </div>
        <div className="hero-art">
          <NetworkVisual />
        </div>
      </div>
      <a href="#about" className="scroll-cue">
        SCROLL TO EXPLORE <ArrowDownRight size={15} />
      </a>
    </section>
  );
}

function About() {
  return (
    <section className="section about-section" id="about">
      <div className="container">
        <Reveal>
          <SectionHeading
            index="01"
            label="ABOUT"
            title={
              <>
                Curiosity, backed by <em>implementation.</em>
              </>
            }
          />
        </Reveal>
        <div className="about-layout">
          <Reveal className="about-lead">
            <p>
              I’m Gaurav Thakur, a B.Tech Computer Science student building toward backend and
              distributed systems engineering.
            </p>
          </Reveal>
          <Reveal className="about-body">
            <p>
              I learn by building complete systems: collaborative editing across services, two-sided
              ride workflows, and inventory under contention. That work has taught me to pay
              attention to state, failure paths, and the contract between interfaces and
              infrastructure.
            </p>
            <p>
              Contributing to Kubernetes projects puts that thinking in front of real maintainers
              and review processes. I’m continuing to study infrastructure, system design, and
              production engineering while improving the software I ship.
            </p>
            <p>
              At Maharishi Markandeshwar (Deemed to be University), I’m studying Computer Science
              from 2024–2028. A three-month Software Engineering Trainee internship at FamilyShell
              gave me experience with development, testing, and debugging across Flutter, FastAPI,
              MongoDB, and Git workflows.
            </p>
            <a className="text-link" href="#open-source">
              See the open-source work <ArrowUpRight size={16} />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const visual =
    project.id === 'codecollab' ? (
      <CodeVisual />
    ) : project.id === 'flux' ? (
      <FluxVisual />
    ) : (
      <FlashVisual />
    );
  return (
    <article className={`project-card project-${project.id}`}>
      <div className="project-topline">
        <span>
          PROJECT {project.number} / {project.eyebrow}
        </span>
        <span className="project-signal">
          <span className="signal-dot" /> SOURCE VERIFIED
        </span>
      </div>
      <div className="project-main">
        <div className="project-copy">
          <div className="project-heading">
            <span className="project-number">{project.number}</span>
            <h3>{project.name}</h3>
          </div>
          <p className="project-summary">{project.summary}</p>
          <p className="project-problem">
            <strong>THE PROBLEM</strong>
            {project.problem}
          </p>
          <div className="project-actions">
            <a
              className="button button-primary"
              href={project.repository}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.name} source on GitHub`}
            >
              View source <ArrowUpRight size={16} />
            </a>
            <span className="project-note">{project.note || 'Architecture & implementation'}</span>
          </div>
        </div>
        <div className="project-visual">{visual}</div>
      </div>
      <div className="project-bottom">
        <div className="tags">
          {project.stack.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <details className="case-study">
          <summary>
            Explore case study{' '}
            <span className="plus" aria-hidden="true">
              +
            </span>
          </summary>
          <div className="case-study-grid">
            <div>
              <h4>Solution</h4>
              <p>{project.solution}</p>
              <h4>Verified implementation</h4>
              <p>{project.result}</p>
            </div>
            <div>
              <h4>Architecture</h4>
              <ol>
                {project.architecture.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ol>
              <h4>Engineering decisions</h4>
              <ul>
                {project.decisions.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
            <div className="tradeoff">
              <h4>Trade-off / current scope</h4>
              <p>{project.tradeoff}</p>
              <a
                className="text-link"
                href={project.repository}
                target="_blank"
                rel="noopener noreferrer"
              >
                Inspect repository <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </details>
      </div>
    </article>
  );
}

function Work() {
  return (
    <section className="section work-section" id="work">
      <div className="container">
        <Reveal>
          <SectionHeading
            index="02"
            label="SELECTED WORK"
            title={
              <>
                Built to explain <em>how</em> it works.
              </>
            }
            intro="Three systems, three different engineering problems. Open each case study for the design decisions and current limits."
          />
        </Reveal>
        <div className="project-list">
          {projects.map((project) => (
            <Reveal key={project.id}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContributionCard({
  item,
  featured,
  index,
}: {
  item: Contribution;
  featured: boolean;
  index: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.a
      className={`contribution ${featured ? 'featured' : 'compact'}`}
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={reduced ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-45px' }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
    >
      <div>
        <span className="contribution-repo">
          {item.repo} <small>#{item.number}</small>
        </span>
        <h3>{item.title}</h3>
        <p>{item.detail}</p>
      </div>
      <ArrowUpRight size={featured ? 20 : 18} aria-hidden="true" />
    </motion.a>
  );
}

function OpenSource() {
  const merged = contributions.filter((x) => x.status === 'Merged');
  const open = contributions.filter((x) => x.status === 'Open');
  return (
    <section className="section open-section" id="open-source">
      <div className="container">
        <Reveal>
          <SectionHeading
            index="03"
            label="OPEN SOURCE"
            title={
              <>
                Engineering beyond <em>my own repositories.</em>
              </>
            }
            intro="Contributions to the Kubernetes ecosystem, from rollout reporting and resource restoration to ongoing reliability and performance work. Status checked 9 October 2026."
          />
        </Reveal>
        <div className="oss-layout">
          <div className="oss-intro">
            <div className="oss-orbit" aria-hidden="true">
              <span>K8s</span>
            </div>
            <p>
              Working upstream means reading unfamiliar code, writing tests, discussing trade-offs,
              and letting review improve the result.
            </p>
            <a
              className="text-link"
              href="https://github.com/Gaurav598"
              target="_blank"
              rel="noopener noreferrer"
            >
              View GitHub activity <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="oss-feed">
            <div className="feed-title">
              <span className="status merged">● MERGED</span>
              <span>UPSTREAM / 02</span>
            </div>
            {merged.map((item, index) => (
              <ContributionCard item={item} featured index={index} key={item.url} />
            ))}
            <div className="feed-title open-title">
              <span className="status open">◌ OPEN FOR REVIEW</span>
              <span>IN PROGRESS / 04</span>
            </div>
            {open.map((item, index) => (
              <ContributionCard item={item} featured={false} index={index} key={item.url} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Toolkit() {
  return (
    <section className="section toolkit-section" id="toolkit">
      <div className="container">
        <Reveal>
          <SectionHeading
            index="04"
            label="ENGINEERING TOOLKIT"
            title={
              <>
                Tools shaped by <em>the work.</em>
              </>
            }
            intro="A practical stack, organized by where I use it. Current focus: backend systems, infrastructure, and reliable real-time experiences."
          />
        </Reveal>
        <div className="toolkit-grid">
          {toolkit.map((group, i) => (
            <Reveal className="toolkit-card" delay={i * 0.07} key={group.title}>
              <span className="toolkit-index">0{i + 1} /</span>
              <h3>{group.title}</h3>
              <div className="toolkit-items">
                {group.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
        <div className="toolkit-footer">
          <span>EXPLORING NEXT</span>
          <p>Cloud infrastructure, observability, AI/ML, and developer tooling.</p>
        </div>
      </div>
    </section>
  );
}

function Journey() {
  return (
    <section className="section journey-section" id="journey">
      <div className="container">
        <Reveal>
          <SectionHeading
            index="05"
            label="ENGINEERING JOURNEY"
            title={
              <>
                Learning in <em>public.</em>
              </>
            }
            intro="A path through formal study, product engineering, and upstream collaboration."
          />
        </Reveal>
        <div className="journey-grid">
          <Reveal className="journey-item">
            <span className="journey-date">2024–2028</span>
            <div>
              <h3>B.Tech in Computer Science</h3>
              <p>
                Maharishi Markandeshwar (Deemed to be University). Studying software engineering
                while building backend-heavy products and exploring distributed systems.
              </p>
            </div>
          </Reveal>
          <Reveal className="journey-item" delay={0.07}>
            <span className="journey-date">3 MONTHS</span>
            <div>
              <h3>Software Engineering Trainee · FamilyShell</h3>
              <p>
                Completed an internship spanning development, testing, and debugging with Flutter,
                FastAPI, MongoDB, and Git workflows. Received an Internship Completion Certificate
                and Letter of Recommendation.
              </p>
            </div>
          </Reveal>
          <Reveal className="journey-item" delay={0.14}>
            <span className="journey-date">2026</span>
            <div>
              <h3>Two Kubernetes ecosystem PRs merged</h3>
              <p>
                Changes to perf-tests rollout reporting and the DRA example driver’s restored claim
                path.
              </p>
            </div>
          </Reveal>
          <Reveal className="journey-item" delay={0.21}>
            <span className="journey-date">ONGOING</span>
            <div>
              <h3>From projects to upstream review</h3>
              <p>
                CodeCollab, Flux, and FlashFlow inform current contributions in reliability,
                measurement, and documentation.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ProblemSolving() {
  return (
    <section className="section problem-section" id="practice">
      <div className="container problem-layout">
        <Reveal>
          <div className="section-index">
            <span>06</span>
            <span className="index-line" />
            <span>PROBLEM SOLVING</span>
          </div>
          <h2>Fundamentals are part of the build.</h2>
          <p>
            Algorithms and data structures support the engineering decisions behind my projects. My
            September 2026 self-reported practice included <strong>343 LeetCode</strong> and{' '}
            <strong>404 Take U Forward</strong> problems. These sets may overlap and are not a
            unique total.
          </p>
        </Reveal>
        <div className="practice-graphic" aria-hidden="true">
          <span>DSA</span>
          <span>→</span>
          <span>DESIGN</span>
          <span>→</span>
          <span>SYSTEMS</span>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact-section" id="contact">
      <div className="container">
        <Reveal>
          <div className="section-index">
            <span>07</span>
            <span className="index-line" />
            <span>CONTACT</span>
          </div>
          <h2>
            Let’s build something <em>that matters.</em>
          </h2>
          <p>
            Interested in backend systems, real-time products, and thoughtful engineering teams.
            Explore my source and contribution history on GitHub, or connect with me on LinkedIn.
          </p>
          <div className="contact-actions">
            <a
              className="button button-primary"
              href="https://github.com/Gaurav598"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={18} /> Connect on GitHub <ArrowUpRight size={18} />
            </a>
            <a
              className="button button-quiet"
              href="https://www.linkedin.com/in/gaurav-thakur-193619321/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn <ArrowUpRight size={18} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <Reveal className="footer-top">
          <a href="#top" className="footer-wordmark">
            G<span>.</span>
          </a>
          <p>
            Gaurav Thakur · Software engineering student
            <br />
            Backend · Distributed systems · Full-stack
          </p>
          <a href="#top" className="back-to-top">
            BACK TO TOP ↑
          </a>
        </Reveal>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} GAURAV THAKUR</span>
          <div>
            <a href="#work">WORK</a>
            <a href="#open-source">OPEN SOURCE</a>
            <a href="https://github.com/Gaurav598" target="_blank" rel="noopener noreferrer">
              GITHUB ↗
            </a>
            <a
              href="https://www.linkedin.com/in/gaurav-thakur-193619321/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LINKEDIN ↗
            </a>
          </div>
          <span>BUILT WITH INTENT</span>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let scheduled = false;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
      scheduled = false;
    };
    const onScroll = () => {
      if (!scheduled) {
        scheduled = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div
        className="reading-progress"
        style={{ '--progress': progress } as CSSProperties}
        aria-hidden="true"
      />
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Work />
        <OpenSource />
        <Toolkit />
        <Journey />
        <ProblemSolving />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
