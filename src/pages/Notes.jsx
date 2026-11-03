import { PageHeader, ContactBand, usePageTitle } from "../components/ui";
import { notes } from "../data";

export default function Notes() {
  usePageTitle("Notes", "Short write-ups by Ashish Bhoure on problems solved at work and in his own projects.");

  return (
    <>
      <PageHeader title="Notes">
        <p>Short write-ups on problems I&apos;ve solved at work and in my own projects. The first ones are on the way.</p>
      </PageHeader>

      <section className="section section--flush" aria-label="Notes">
        <ul className="notes-grid">
          {notes.map((n) => {
            const inner = (
              <>
                <span className="tag">{n.tag}</span>
                <h3>{n.title}</h3>
                <p>{n.text}</p>
                <span className="note-meta">
                  <span>{n.status === "planned" ? "Coming soon" : "Read the note"}</span>
                  <span>{n.mins} min read</span>
                </span>
              </>
            );
            return (
              <li key={n.title} className={`note-card tilt ${n.href ? "" : "note-card--planned"}`}>
                {n.href ? <a href={n.href}>{inner}</a> : inner}
              </li>
            );
          })}
        </ul>
      </section>

      <ContactBand />
    </>
  );
}
