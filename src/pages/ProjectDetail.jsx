import { Link, useParams } from "react-router-dom";
import { PanePreview, ExternalLink, Tags, ContactBand, usePageTitle } from "../components/ui";
import { projects, categories } from "../data";
import NotFound from "./NotFound";

export default function ProjectDetail() {
  const { id } = useParams();
  const index = projects.findIndex((p) => p.id === id);
  const p = projects[index];
  usePageTitle(p?.name, p?.summary);
  if (!p) return <NotFound />;

  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  return (
    <article style={{ "--accent": p.pane.accent }}>
      <header className="page-header detail-header">
        <p className="crumbs">
          <Link to="/work">Work</Link> / <Link to={`/work?show=${p.category}`}>{categories[p.category]}</Link>
        </p>
        <p className="project-kind">{p.kind}</p>
        <h1>{p.name}</h1>
        <p className="page-header-lede">{p.summary}</p>
      </header>

      <div className="section section--flush">
        <div className="detail-visual">
          <PanePreview project={p} />
        </div>
      </div>

      <div className="section section--tight detail-body">
        <section aria-labelledby="built">
          <h2 id="built">What I built</h2>
          <ul className="detail-points">
            {p.points.map((pt) => (
              <li key={pt}>{pt}</li>
            ))}
          </ul>
        </section>

        <aside className="detail-facts" aria-label="Project facts">
          <dl>
            <div>
              <dt>Type</dt>
              <dd>{categories[p.category]}</dd>
            </div>
            {p.duration && (
              <div>
                <dt>Duration</dt>
                <dd>{p.duration}</dd>
              </div>
            )}
            <div>
              <dt>Built with</dt>
              <dd>
                <Tags items={p.stack} />
              </dd>
            </div>
            <div>
              <dt>Links</dt>
              <dd className="detail-links">
                {p.links.map((l) => (
                  <ExternalLink key={l.href} href={l.href}>
                    {l.label}
                  </ExternalLink>
                ))}
                {p.note && <span className="project-note">{p.note}</span>}
              </dd>
            </div>
          </dl>
        </aside>
      </div>

      {p.gallery && (
        <section className="section section--tight" aria-labelledby="shots">
          <h2 id="shots" className="detail-subhead">
            Screens
          </h2>
          <div className="gallery">
            {p.gallery.map((g) => (
              <figure key={g.src}>
                <img src={g.src} alt={g.alt} loading="lazy" width="1400" height="875" />
                <figcaption>{g.alt}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      <nav className="section section--tight pager" aria-label="More projects">
        <Link to={`/work/${prev.id}`} className="pager-link">
          <span>Previous</span>
          {prev.name}
        </Link>
        <Link to={`/work/${next.id}`} className="pager-link pager-link--next">
          <span>Next</span>
          {next.name}
        </Link>
      </nav>

      <ContactBand />
    </article>
  );
}
