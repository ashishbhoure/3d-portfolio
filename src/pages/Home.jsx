import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import {
  ProjectRow,
  JobTimeline,
  ContactBand,
  Stats,
  ServiceList,
  Steps,
  Testimonials,
  usePageTitle,
} from "../components/ui";
import { projects, clients, team } from "../data";

const homePicks = ["vmaas", "repoatlas", "lumishot", "shieldguard"].map((id) =>
  projects.find((p) => p.id === id)
);

export default function Home() {
  usePageTitle(
    null,
    "Ashish Bhoure is a full-stack developer in Indore who builds web apps, dashboards, APIs and Windows tools for companies and freelance clients."
  );

  return (
    <>
      <Hero />

      <section className="section section--flush proof" aria-label="At a glance">
        <Stats />
        <div className="clients">
          <h2>People I&apos;ve built for</h2>
          <ul>
            {clients.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="home-services">
        <header className="section-head section-head--split">
          <div>
            <h2 id="home-services">What I can build for you</h2>
            <p>Freelance projects for startups and businesses, from a first version to a growing product.</p>
          </div>
          <Link className="ext-link" to="/services">
            All services and how I work
          </Link>
        </header>
        <ServiceList limit={6} />
      </section>

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

      <section className="section" aria-labelledby="home-steps">
        <header className="section-head">
          <h2 id="home-steps">How a project runs</h2>
          <p>A demo you can click every week, and a written plan before any money changes hands.</p>
        </header>
        <Steps />
      </section>

      <Testimonials />

      <section className="section team-teaser" aria-labelledby="home-team">
        <div>
          <h2 id="home-team">Need more than one developer?</h2>
          <p>{team.intro}</p>
          <p className="team-teaser-roles">
            Design, frontend, backend, QA and DevOps, under one plan.
          </p>
          <Link className="ext-link" to="/services">
            See how the team works
          </Link>
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
