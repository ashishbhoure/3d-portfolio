import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import { ProjectRow, JobTimeline, ContactBand, usePageTitle } from "../components/ui";
import { projects } from "../data";

const homePicks = ["vmaas", "repoatlas", "lumishot", "shieldguard"].map((id) =>
  projects.find((p) => p.id === id)
);

export default function Home() {
  usePageTitle(
    null,
    "Ashish Bhoure is a full-stack developer in Indore building MERN platforms, web apps and Windows tools."
  );

  return (
    <>
      <Hero />

      <section className="section" aria-labelledby="home-work">
        <header className="section-head section-head--split">
          <div>
            <h2 id="home-work">Selected work</h2>
            <p>Platforms I built at work, and products I build on my own time.</p>
          </div>
          <Link className="ext-link" to="/work">
            All projects
          </Link>
        </header>
        <div className="projects">
          {homePicks.map((p) => (
            <ProjectRow key={p.id} project={p} />
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="home-exp">
        <header className="section-head section-head--split">
          <div>
            <h2 id="home-exp">Where I work</h2>
            <p>Four years shipping production MERN applications.</p>
          </div>
          <Link className="ext-link" to="/about">
            Full experience
          </Link>
        </header>
        <JobTimeline compact />
      </section>

      <ContactBand />
    </>
  );
}
