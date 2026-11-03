import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import { ContactBand, Stats, Testimonials, usePageTitle } from "../components/ui";
import { FlipCards, ProjectCarousel, ProcessPath, Activity, Hint } from "../components/v2/Interactive";
import { clients, nowItems } from "../data";

export default function Home() {
  usePageTitle(
    null,
    "Ashish Bhoure is a full-stack developer in Indore who builds web apps, dashboards, APIs and Windows tools for companies and freelance clients."
  );

  return (
    <>
      <Hero />

      <section className="proof-strip" aria-label="At a glance">
        <div className="proof-inner">
          <Stats />
          <ul className="clients" aria-label="People I've built for">
            {clients.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="now-t">
        <header className="section-head">
          <h2 id="now-t">What I&apos;m doing now</h2>
        </header>
        <div className="now">
          <div className="panel">
            <h3>This month</h3>
            <ul className="now-list">
              {nowItems.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </div>
          <Activity />
        </div>
      </section>

      <section className="section" aria-labelledby="svc-t">
        <header className="section-head section-head--split">
          <div>
            <h2 id="svc-t">What I can build for you</h2>
            <p>Hover a card, or tap it, to flip it and see what&apos;s included.</p>
          </div>
          <Link className="ext-link" to="/services">
            All services
          </Link>
        </header>
        <FlipCards limit={6} />
      </section>

      <section className="section" aria-labelledby="work-t">
        <header className="section-head section-head--split">
          <div>
            <h2 id="work-t">Selected work</h2>
            <p>Platforms I built at work and products I ship myself.</p>
          </div>
          <Hint>Drag to spin, click the front card</Hint>
        </header>
        <ProjectCarousel />
      </section>

      <section className="section" aria-labelledby="proc-t">
        <header className="section-head">
          <h2 id="proc-t">How a project runs</h2>
          <p>The path draws itself as you scroll. Every project follows the same five steps.</p>
        </header>
        <ProcessPath />
      </section>

      <Testimonials />

      <section className="section explore" aria-labelledby="ex-t">
        <header className="section-head">
          <h2 id="ex-t">Play with it</h2>
          <p>Every page has something to touch.</p>
        </header>
        <div className="explore-grid">
          <Link className="explore-card tilt" to="/stack">
            <b>3D keyboard</b>
            <span>Press a key to see where I&apos;ve used each skill.</span>
          </Link>
          <Link className="explore-card tilt" to="/about">
            <b>ID badge and globe</b>
            <span>Swing my badge, then check our time-zone overlap.</span>
          </Link>
          <Link className="explore-card tilt" to="/contact">
            <b>Terminal</b>
            <span>Type commands to explore the site.</span>
          </Link>
        </div>
      </section>

      <ContactBand />
    </>
  );
}
