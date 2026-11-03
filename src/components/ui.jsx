import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { paintPane } from "./hero/panePaint";
import {
  collaborations,
  archive,
  jobs,
  skills,
  profile,
  projects,
  availability,
  stats,
  services,
  steps,
  team,
  testimonials,
  faqs,
  channels,
} from "../data";

export function usePageTitle(title, description) {
  useEffect(() => {
    document.title = title ? `${title} | Ashish Bhoure` : "Ashish Bhoure, full-stack developer";
    if (description) {
      document.querySelector('meta[name="description"]')?.setAttribute("content", description);
    }
  }, [title, description]);
}

export function PanePreview({ project, className = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) paintPane(ref.current, project);
  }, [project]);
  return (
    <canvas
      ref={ref}
      className={`pane-preview ${className}`}
      role="img"
      aria-label={`${project.name} app window`}
    />
  );
}

export function ExternalLink({ href, children, className = "" }) {
  return (
    <a className={`ext-link ${className}`} href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
        <path d="M5 3h8v8M13 3 4 12" fill="none" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    </a>
  );
}

export function PageHeader({ title, children }) {
  return (
    <header className="page-header">
      <h1>{title}</h1>
      {children && <div className="page-header-lede">{children}</div>}
    </header>
  );
}

export function Tags({ items }) {
  return (
    <ul className="tags" aria-label="Built with">
      {items.map((s) => (
        <li key={s}>{s}</li>
      ))}
    </ul>
  );
}

/** Big alternating row used on the home page. */
export function ProjectRow({ project: p }) {
  return (
    <article className="project" style={{ "--accent": p.pane.accent }}>
      <Link className="project-visual" to={`/work/${p.id}`} tabIndex={-1} aria-hidden="true">
        <PanePreview project={p} />
      </Link>
      <div className="project-body">
        <p className="project-kind">{p.kind}</p>
        <h3>
          <Link to={`/work/${p.id}`}>{p.name}</Link>
        </h3>
        <p className="project-summary">{p.summary}</p>
        <Tags items={p.stack} />
        <p className="project-links">
          <Link className="ext-link" to={`/work/${p.id}`}>
            Read the case study
          </Link>
        </p>
      </div>
    </article>
  );
}

/** Compact card used on the work page grid. The whole card is the link. */
export function ProjectCard({ project: p }) {
  return (
    <li className="card tilt" style={{ "--accent": p.pane.accent }}>
      <div className="card-visual">
        <PanePreview project={p} />
      </div>
      <p className="project-kind">{p.kind}</p>
      <h3>
        <Link className="card-link" to={`/work/${p.id}`}>
          {p.name}
        </Link>
      </h3>
      <p className="card-summary">{p.summary}</p>
      <p className="card-stack">{p.stack.slice(0, 4).join(", ")}</p>
    </li>
  );
}

export function Collaborations() {
  return (
    <ul className="collab-grid">
      {collaborations.map((c) => (
        <li className="collab" key={c.name}>
          <p className="collab-role">{c.role}</p>
          <h3>{c.href ? <ExternalLink href={c.href}>{c.name}</ExternalLink> : c.name}</h3>
          <p>{c.summary}</p>
          <p className="collab-stack">{c.stack.join(", ")}</p>
        </li>
      ))}
    </ul>
  );
}

export function Archive() {
  return (
    <div className="table-wrap">
      <table className="archive">
        <thead>
          <tr>
            <th scope="col">Project</th>
            <th scope="col">What it does</th>
            <th scope="col">Built with</th>
            <th scope="col">
              <span className="sr-only">Link</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {archive.map((a) => (
            <tr key={a.name}>
              <th scope="row">{a.name}</th>
              <td>{a.what}</td>
              <td className="archive-stack">{a.stack}</td>
              <td className="archive-link">
                {a.href && <ExternalLink href={a.href}>Code</ExternalLink>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Job history as a timeline; `compact` drops the bullet points. */
export function JobTimeline({ compact = false }) {
  return (
    <ol className="timeline">
      {jobs.map((j) => (
        <li key={j.company}>
          <p className="timeline-when">{j.when}</p>
          <div>
            <h3>{j.company}</h3>
            <p className="timeline-where">{j.title}</p>
            {!compact && (
              <ul className="timeline-points">
                {j.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

export function Skills() {
  return (
    <dl className="skills">
      {skills.map((g) => (
        <div key={g.group}>
          <dt>{g.group}</dt>
          <dd>{g.items.join(", ")}</dd>
        </div>
      ))}
    </dl>
  );
}

export function ContactBand({ title = "Have a project in mind?" }) {
  return (
    <section className="section">
      <div className="band">
        <svg className="plane plane--band" viewBox="0 0 220 180" aria-hidden="true">
          <path d="M8 82 L210 8 L150 170 L104 112 Z" fill="#eef0f8" />
          <path d="M104 112 L210 8 L120 140 Z" fill="#b9c2e8" />
          <path d="M104 112 L120 140 L98 160 Z" fill="#8d97c6" />
        </svg>
        <div>
          <Availability />
          <h2>{title}</h2>
          <p>
            Tell me what you want to build. You get a reply within a day and a written estimate after
            a short call.
          </p>
        </div>
        <div className="band-actions">
          <Link className="btn btn--primary" to="/contact">
            Start a project
          </Link>
          {channels.whatsapp ? (
            <a className="btn btn--ghost" href={channels.whatsapp} target="_blank" rel="noopener noreferrer">
              Chat on WhatsApp
            </a>
          ) : (
            <a className="btn btn--ghost" href={`mailto:${profile.email}`}>
              Email me
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Freelance blocks
// ---------------------------------------------------------------------------

export function Availability() {
  if (!availability.open) return null;
  return (
    <p className="availability">
      <span className="availability-dot" aria-hidden="true" />
      {availability.text}
    </p>
  );
}

export function Stats() {
  return (
    <dl className="stats">
      {stats.map((s) => (
        <div key={s.label}>
          <dt>{s.label}</dt>
          <dd>{s.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function ServiceList({ limit }) {
  const list = limit ? services.slice(0, limit) : services;
  return (
    <ul className="services">
      {list.map((s) => {
        const ex = s.examples.map((id) => projects.find((p) => p.id === id)).filter(Boolean);
        return (
          <li key={s.id}>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
            {ex.length > 0 && (
              <p className="service-examples">
                For example{" "}
                {ex.map((p, i) => (
                  <span key={p.id}>
                    {i > 0 && (i === ex.length - 1 ? " and " : ", ")}
                    <Link to={`/work/${p.id}`}>{p.name}</Link>
                  </span>
                ))}
              </p>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export function Steps() {
  return (
    <ol className="steps">
      {steps.map((s, i) => (
        <li key={s.title}>
          <span className="step-num" aria-hidden="true">
            {i + 1}
          </span>
          <h3>{s.title}</h3>
          <p>{s.text}</p>
        </li>
      ))}
    </ol>
  );
}

export function Team() {
  return (
    <div className="team">
      <p className="team-intro">{team.intro}</p>
      <ul className="team-roles">
        <li className="team-lead">
          <h3>Ashish Bhoure</h3>
          <p>Lead developer and your point of contact. Plans, builds and reviews.</p>
        </li>
        {team.roles.map((r) => (
          <li key={r.title}>
            <h3>{r.title}</h3>
            <p>{r.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Testimonials() {
  if (!testimonials.length) return null;
  return (
    <section className="section" aria-labelledby="t-title">
      <header className="section-head">
        <h2 id="t-title">What clients say</h2>
      </header>
      <ul className="quotes">
        {testimonials.map((t) => (
          <li key={t.name}>
            <blockquote>{t.quote}</blockquote>
            <p className="quote-by">
              {t.name}, {t.role}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Faq() {
  return (
    <div className="faq">
      {faqs.map((f) => (
        <details key={f.q}>
          <summary>{f.q}</summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  );
}
