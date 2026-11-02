import { useEffect, useRef } from "react";
import { paintPane } from "./hero/panePaint";
import { featured, collaborations, archive, timeline, skills, profile } from "../data";

function PanePreview({ project }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) paintPane(ref.current, project);
  }, [project]);
  return (
    <canvas
      ref={ref}
      className="pane-preview"
      role="img"
      aria-label={`${project.name} app window`}
    />
  );
}

function ExternalLink({ href, children, className = "" }) {
  return (
    <a className={`ext-link ${className}`} href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
        <path d="M5 3h8v8M13 3 4 12" fill="none" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    </a>
  );
}

export function Work() {
  return (
    <section className="section" id="work" aria-labelledby="work-title">
      <header className="section-head">
        <h2 id="work-title">Selected work</h2>
        <p>
          Things I designed and built end to end, from the first commit to the installer or the
          deployed site.
        </p>
      </header>

      <div className="projects">
        {featured.map((p) => (
          <article className="project" id={p.id} key={p.id} style={{ "--accent": p.pane.accent }}>
            <div className="project-visual">
              <PanePreview project={p} />
            </div>
            <div className="project-body">
              <p className="project-kind">{p.kind}</p>
              <h3>{p.name}</h3>
              <p className="project-summary">{p.summary}</p>
              <ul className="project-points">
                {p.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
              <ul className="tags" aria-label="Built with">
                {p.stack.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              <div className="project-links">
                {p.links.map((l) => (
                  <ExternalLink key={l.href} href={l.href}>
                    {l.label}
                  </ExternalLink>
                ))}
                {p.note && <span className="project-note">{p.note}</span>}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function Collaborations() {
  return (
    <section className="section section--tight" aria-labelledby="collab-title">
      <header className="section-head">
        <h2 id="collab-title">With teams and clients</h2>
      </header>
      <ul className="collab-grid">
        {collaborations.map((c) => (
          <li className="collab" key={c.name}>
            <p className="collab-role">{c.role}</p>
            <h3>
              {c.href ? <ExternalLink href={c.href}>{c.name}</ExternalLink> : c.name}
            </h3>
            <p>{c.summary}</p>
            <p className="collab-stack">{c.stack.join(", ")}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Archive() {
  return (
    <section className="section section--tight" aria-labelledby="archive-title">
      <header className="section-head">
        <h2 id="archive-title">Earlier projects</h2>
      </header>
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
    </section>
  );
}

export function Experience() {
  return (
    <section className="section" id="experience" aria-labelledby="exp-title">
      <header className="section-head">
        <h2 id="exp-title">Experience and education</h2>
      </header>
      <ol className="timeline">
        {timeline.map((t) => (
          <li key={t.title}>
            <p className="timeline-when">{t.when}</p>
            <div>
              <h3>{t.title}</h3>
              <p className="timeline-where">{t.where}</p>
              {t.detail && <p>{t.detail}</p>}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Skills() {
  return (
    <section className="section" id="skills" aria-labelledby="skills-title">
      <header className="section-head">
        <h2 id="skills-title">What I work with</h2>
      </header>
      <dl className="skills">
        {skills.map((g) => (
          <div key={g.group}>
            <dt>{g.group}</dt>
            <dd>{g.items.join(", ")}</dd>
          </div>
        ))}
      </dl>
      <p className="skills-more">
        Full history on <ExternalLink href={profile.github}>GitHub</ExternalLink>
      </p>
    </section>
  );
}
