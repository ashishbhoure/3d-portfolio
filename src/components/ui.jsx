import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { paintPane } from "./hero/panePaint";
import { collaborations, archive, jobs, skills, profile } from "../data";

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
    <li className="card" style={{ "--accent": p.pane.accent }}>
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

export function ContactBand() {
  return (
    <section className="section">
      <div className="band">
        <div>
          <h2>Have something to build?</h2>
          <p>Freelance projects, full-time roles or a quick question. I usually reply within a day.</p>
        </div>
        <div className="band-actions">
          <Link className="btn btn--primary" to="/contact">
            Get in touch
          </Link>
          <a className="btn btn--ghost" href={`mailto:${profile.email}`}>
            Email me
          </a>
        </div>
      </div>
    </section>
  );
}
