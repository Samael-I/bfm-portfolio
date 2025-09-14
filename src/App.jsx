import { useState, memo, useMemo } from "react";
import PropTypes from "prop-types";
import { PROFILE, projects, skills, experience } from "./data";
import profilePic from "./assets/profile.jpg";

/**
 * Badge component for displaying tags or skills
 */
const Badge = memo(({ children, darkMode }) => (
  <span className={`rounded-full border px-3 py-1 text-xs sm:text-sm font-medium leading-none transition ${darkMode ? 'border-gray-600 bg-gray-700 text-gray-200' : ''}`}>
    {children}
  </span>
));

Badge.propTypes = {
  children: PropTypes.node.isRequired,
};

/**
 * Section component for consistent section styling
 */
const Section = memo(({ id, title, kicker, children, darkMode }) => (
  <section id={id} className="w-full px-3 sm:px-6 lg:px-10 py-12 md:py-16">
    <div className="mb-6">
      {kicker && (
        <p className={`mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] ${darkMode ? 'text-gray-400' : 'text-zinc-500'}`}>{kicker}</p>
      )}
      <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">{title}</h2>
    </div>
    {children}
  </section>
));

Section.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  kicker: PropTypes.string,
  children: PropTypes.node.isRequired,
};

/**
 * ProjectCard component for displaying project details
 */
const ProjectCard = memo(({ project, darkMode }) => (
  <article className={`group relative flex flex-col justify-between rounded-2xl border p-4 sm:p-5 transition transform hover:scale-105 hover:shadow-lg ${darkMode ? 'border-gray-700 bg-gray-800 hover:bg-gray-750' : 'hover:shadow-md'}`}>
    <div>
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg sm:text-xl font-semibold leading-tight">{project.title}</h3>
        <div className="flex gap-3 opacity-90 text-sm">
          {project.repo && project.repo !== "#" && (
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer noopener"
              className={`underline-offset-2 hover:underline ${darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-zinc-600 hover:text-zinc-800'}`}
            >
              Repo
            </a>
          )}
          {project.link && project.link !== "#" && (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer noopener"
              className={`underline-offset-2 hover:underline ${darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-zinc-600 hover:text-zinc-800'}`}
            >
              Live
            </a>
          )}
        </div>
      </div>
      <p className={`mt-2 text-sm sm:text-base ${darkMode ? 'text-gray-300' : 'text-zinc-600'}`}>{project.description}</p>
    </div>
    <div className="mt-4 flex flex-wrap gap-2">
      {project.tags.map((tag) => (
        <Badge key={tag} darkMode={darkMode}>{tag}</Badge>
      ))}
    </div>
  </article>
));

ProjectCard.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    link: PropTypes.string,
    repo: PropTypes.string,
  }).isRequired,
};

/**
 * Header component with navigation
 */
const Header = memo(({ open, setOpen, darkMode, setDarkMode }) => (
  <header className={`sticky top-0 z-30 border-b backdrop-blur transition-colors duration-300 ${darkMode ? 'bg-gray-900/70 border-gray-700' : 'bg-white/70'}`}>
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:rounded-md focus:bg-black focus:px-3 focus:py-2 focus:text-white"
    >
      Skip to content
    </a>
    <div className="flex w-full items-center justify-between px-3 sm:px-6 lg:px-10 py-3">
      <a href="#home" className={`font-semibold tracking-tight ${darkMode ? 'text-gray-100' : 'text-zinc-900'}`}>
        {PROFILE.name}
      </a>
      <nav className="hidden gap-6 text-sm md:flex">
        <a className={`opacity-80 transition hover:opacity-100 ${darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-zinc-700 hover:text-zinc-900'}`} href="#projects">
          Projects
        </a>
        <a className={`opacity-80 transition hover:opacity-100 ${darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-zinc-700 hover:text-zinc-900'}`} href="#skills">
          Skills
        </a>
        <a className={`opacity-80 transition hover:opacity-100 ${darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-zinc-700 hover:text-zinc-900'}`} href="#experience">
          Experience
        </a>
        <a className={`opacity-80 transition hover:opacity-100 ${darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-zinc-700 hover:text-zinc-900'}`} href="#about">
          About
        </a>
        <a className={`opacity-80 transition hover:opacity-100 ${darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-zinc-700 hover:text-zinc-900'}`} href="#contact">
          Contact
        </a>
      </nav>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`rounded-lg border px-3 py-2 text-sm transition ${darkMode ? 'border-gray-600 bg-gray-800 text-gray-200' : 'border-gray-300 bg-white text-gray-700'}`}
          aria-label="Toggle dark mode"
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
        <button
          className={`md:hidden rounded-lg border px-3 py-2 text-sm ${darkMode ? 'border-gray-600 bg-gray-800 text-black' : ''}`}
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label="Toggle navigation"
        >
          Menu
        </button>
      </div>
    </div>
    {open && (
      <div id="mobile-nav" className={`border-t px-3 sm:px-4 py-2 md:hidden transition-colors duration-300 ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white'}`}>
        <div className="flex flex-col gap-2 text-sm">
          <a className={`py-2 ${darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-zinc-700 hover:text-zinc-900'}`} href="#projects" onClick={() => setOpen(false)}>
            Projects
          </a>
          <a className={`py-2 ${darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-zinc-700 hover:text-zinc-900'}`} href="#skills" onClick={() => setOpen(false)}>
            Skills
          </a>
          <a className={`py-2 ${darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-zinc-700 hover:text-zinc-900'}`} href="#experience" onClick={() => setOpen(false)}>
            Experience
          </a>
          <a className={`py-2 ${darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-zinc-700 hover:text-zinc-900'}`} href="#about" onClick={() => setOpen(false)}>
            About
          </a>
          <a className={`py-2 ${darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-zinc-700 hover:text-zinc-900'}`} href="#contact" onClick={() => setOpen(false)}>
            Contact
          </a>
        </div>
      </div>
    )}
  </header>
));

Header.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  darkMode: PropTypes.bool.isRequired,
  setDarkMode: PropTypes.func.isRequired,
};

/**
 * Hero section component
 */
const Hero = memo(({ darkMode }) => (
  <section id="home" className="w-full px-3 sm:px-6 lg:px-10 py-12 sm:py-14 md:py-20 lg:py-24">
    <div className="grid items-center gap-8 sm:gap-10 md:grid-cols-2">
      <div>
        <p className={`mb-2 text-xs sm:text-sm font-medium uppercase tracking-widest ${darkMode ? 'text-gray-400' : 'text-zinc-500'}`}>{PROFILE.role}</p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight animate-fade-in">
          I build scalable full-stack web apps with seamless user experiences.
        </h1>
        <p className={`mt-4 max-w-prose text-base sm:text-lg ${darkMode ? 'text-gray-300' : 'text-zinc-600'}`}>{PROFILE.summary}</p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
          <a href="#projects" className={`rounded-xl px-5 py-3 text-center text-sm sm:text-base transition transform hover:scale-105 ${darkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-black text-white hover:opacity-90'}`}>
            See Projects
          </a>
          <a href="#contact" className={`rounded-xl border px-5 py-3 text-center text-sm sm:text-base transition transform hover:scale-105 ${darkMode ? 'border-gray-600 text-gray-200 hover:bg-gray-800' : 'hover:bg-zinc-50'}`}>
            Contact Me
          </a>
        </div>
        <div className={`mt-4 flex flex-wrap gap-4 text-sm sm:text-base ${darkMode ? 'text-gray-300' : 'text-zinc-600'}`}>
          <span className={`rounded-md border px-2.5 py-1.5 ${darkMode ? 'border-gray-600' : ''}`}>{PROFILE.location}</span>
          {PROFILE.github && PROFILE.github !== "#" && (
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer noopener"
              className={`underline-offset-2 hover:underline ${darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-zinc-600 hover:text-zinc-800'}`}
            >
              GitHub
            </a>
          )}
          {PROFILE.linkedin && PROFILE.linkedin !== "#" && (
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className={`underline-offset-2 hover:underline ${darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-zinc-600 hover:text-zinc-800'}`}
            >
              LinkedIn
            </a>
          )}
        </div>
      </div>
      <div className="relative mx-auto h-32 w-32 sm:h-40 sm:w-40 md:h-56 md:w-56 lg:h-72 lg:w-72 overflow-hidden rounded-2xl border shadow-lg transform hover:scale-105 transition-transform duration-300">
        <img
          src={profilePic}
          alt="Profile"
          className="w-full h-full object-cover"
          role="img"
          aria-label="Profile picture"
        />
      </div>
    </div>
  </section>
));

/**
 * Projects section component
 */
const ProjectsSection = memo(({ darkMode }) => (
  <Section id="projects" title="Featured Projects" kicker="Work that shows impact" darkMode={darkMode}>
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {projects.map((project) => (
        <ProjectCard key={project.title} project={project} darkMode={darkMode} />
      ))}
    </div>
  </Section>
));

/**
 * Skills section component
 */
const SkillsSection = memo(({ darkMode }) => (
  <Section id="skills" title="Skills" kicker="Snapshot" darkMode={darkMode}>
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {skills.map((skillGroup) => (
        <div key={skillGroup.group} className={`rounded-2xl border p-4 sm:p-5 transition hover:shadow-md ${darkMode ? 'border-gray-700 bg-gray-800' : ''}`}>
          <h3 className="text-sm sm:text-base font-semibold tracking-tight">
            {skillGroup.group}
          </h3>
          <ul className={`mt-2 list-inside list-disc text-sm sm:text-base ${darkMode ? 'text-gray-300' : 'text-zinc-600'}`}>
            {skillGroup.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </Section>
));

/**
 * Experience section component
 */
const ExperienceSection = memo(({ darkMode }) => (
  <Section id="experience" title="Experience" kicker="Recent work" darkMode={darkMode}>
    <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
      {experience.map((exp) => (
        <div key={exp.role} className={`rounded-2xl border p-4 sm:p-5 transition hover:shadow-md ${darkMode ? 'border-gray-700 bg-gray-800' : ''}`}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h3 className="text-base sm:text-lg font-semibold">{exp.role}</h3>
            <span className={`text-xs sm:text-sm whitespace-nowrap ${darkMode ? 'text-gray-400' : 'text-zinc-500'}`}>
              {exp.period}
            </span>
          </div>
          <p className={`text-sm sm:text-base ${darkMode ? 'text-gray-300' : 'text-zinc-600'}`}>{exp.org}</p>
          <ul className={`mt-3 list-inside list-disc text-sm sm:text-base space-y-1.5 ${darkMode ? 'text-gray-300' : 'text-zinc-700'}`}>
            {exp.bullets.map((bullet, index) => (
              <li key={index}>{bullet}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </Section>
));

/**
 * About section component
 */
const AboutSection = memo(({ darkMode }) => (
  <Section id="about" title="About" kicker="Who I am" darkMode={darkMode}>
    <div className="grid gap-6 md:grid-cols-3">
      <div className="md:col-span-2">
        <p className={`text-base sm:text-lg ${darkMode ? 'text-gray-300' : 'text-zinc-700'}`}>
I’m a full-stack developer who designs and builds end-to-end web applications. From crafting responsive, accessible interfaces to architecting secure APIs and scalable databases, I focus on delivering products that are reliable, maintainable, and a joy to use. My strength lies in translating ideas into production-ready solutions with clean code, modern tooling, and a strong eye for user experience.
        </p>
      </div>
      <div className={`rounded-2xl border p-4 sm:p-5 text-sm sm:text-base ${darkMode ? 'border-gray-700 bg-gray-800 text-gray-300' : 'text-zinc-600'}`}>
        <p className="font-medium">Highlights</p>
        <ul className="mt-2 list-inside list-disc space-y-1.5">
          <li>CRUD operations</li>
          <li>REST API</li>
          <li>Web Socket</li>
          <li>Maximizing AI Tools</li>
          <li>Tech Support</li>
        </ul>
      </div>
    </div>
  </Section>
));

/**
 * Contact section component
 */
const ContactSection = memo(({ darkMode }) => (
  <Section id="contact" title="Contact" kicker="Let’s talk" darkMode={darkMode}>
    <div className={`rounded-2xl border p-6 ${darkMode ? 'border-gray-700 bg-gray-800' : ''}`}>
      <p className={` ${darkMode ? 'text-gray-300' : 'text-zinc-700'}`}>Open to roles, freelance, and collabs. Best way to reach me:</p>
      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm sm:text-base">
        {PROFILE.email && PROFILE.email !== "you@example.com" && (
          <a
            href={`mailto:${PROFILE.email}`}
            className={`rounded-lg border px-3 py-1.5 transition hover:scale-105 ${darkMode ? 'border-gray-600 text-gray-200 hover:bg-gray-700' : 'text-zinc-700 hover:bg-zinc-50'}`}
          >
            Email
          </a>
        )}
        {PROFILE.facebook && PROFILE.facebook !== "#" && (
          <a
            href={PROFILE.facebook}
            target="_blank"
            rel="noreferrer noopener"
            className={`rounded-lg border px-3 py-1.5 transition hover:scale-105 ${darkMode ? 'border-gray-600 text-gray-200 hover:bg-gray-700' : 'text-zinc-700 hover:bg-zinc-50'}`}
          >
            Facebook
          </a>
        )}

        {PROFILE.github && PROFILE.github !== "#" && (
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noreferrer noopener"
            className={`rounded-lg border px-3 py-1.5 transition hover:scale-105 ${darkMode ? 'border-gray-600 text-gray-200 hover:bg-gray-700' : 'text-zinc-700 hover:bg-zinc-50'}`}
          >
            GitHub
          </a>
        )}
        {PROFILE.linkedin && PROFILE.linkedin !== "#" && (
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            className={`rounded-lg border px-3 py-1.5 transition hover:scale-105 ${darkMode ? 'border-gray-600 text-gray-200 hover:bg-gray-700' : 'text-zinc-700 hover:bg-zinc-50'}`}
          >
            LinkedIn
          </a>
        )}
        {PROFILE.resumeUrl && PROFILE.resumeUrl !== "#" && (
          <a
            href={PROFILE.resumeUrl}
            className={`rounded-lg border px-3 py-1.5 transition hover:scale-105 ${darkMode ? 'border-gray-600 text-gray-200 hover:bg-gray-700' : 'text-zinc-700 hover:bg-zinc-50'}`}
          >
            Resume (PDF)
          </a>
        )}
      </div>
    </div>
  </Section>
));

/**
 * Footer component
 */
const Footer = memo(({ darkMode }) => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={`border-t py-8 text-center text-xs sm:text-sm transition-colors duration-300 ${darkMode ? 'border-gray-700 text-gray-400' : 'text-zinc-500'}`}>
      © {currentYear} {PROFILE.name} • Built with React
    </footer>
  );
});

/**
 * Main Portfolio component
 */
export default function PortfolioMVP() {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Memoize current year to avoid recalculating on re-renders
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100' : 'bg-gradient-to-b from-white to-zinc-50 text-zinc-900'}`}>
      <Header open={open} setOpen={setOpen} darkMode={darkMode} setDarkMode={setDarkMode} />
      <main id="main">
        <Hero darkMode={darkMode} />
        <ProjectsSection darkMode={darkMode} />
        <SkillsSection darkMode={darkMode} />
        <ExperienceSection darkMode={darkMode} />
        <AboutSection darkMode={darkMode} />
        <ContactSection darkMode={darkMode} />
      </main>
      <Footer darkMode={darkMode} />
    </div>
  );
}
