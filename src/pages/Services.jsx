import {
  PageHeader,
  Availability,
  ServiceList,
  Steps,
  Team,
  Testimonials,
  Faq,
  ContactBand,
  usePageTitle,
} from "../components/ui";
import { Link } from "react-router-dom";
import { engagements } from "../data";

export default function Services() {
  usePageTitle(
    "Services",
    "Hire Ashish Bhoure to build web apps, dashboards, APIs, online stores and Windows apps. Fixed-scope projects, retainers or a dedicated developer."
  );

  return (
    <>
      <PageHeader title="Work with me">
        <Availability />
        <p>
          I build the software your business runs on: web apps, dashboards, APIs, online stores and
          Windows tools. Freelance or as part of your team, with one person accountable from first
          call to launch.
        </p>
        <div className="hero-actions">
          <Link className="btn btn--primary" to="/contact">
            Start a project
          </Link>
          <Link className="btn btn--ghost" to="/work">
            See past work
          </Link>
        </div>
      </PageHeader>

      <section className="section" aria-labelledby="s-what">
        <header className="section-head">
          <h2 id="s-what">What I can build for you</h2>
        </header>
        <ServiceList />
      </section>

      <section className="section" aria-labelledby="s-how">
        <header className="section-head">
          <h2 id="s-how">How a project runs</h2>
          <p>Five steps, the same every time, so you always know what happens next.</p>
        </header>
        <Steps />
      </section>

      <section className="section" aria-labelledby="s-ways">
        <header className="section-head">
          <h2 id="s-ways">Ways to work together</h2>
        </header>
        <ul className="engagements">
          {engagements.map((e) => (
            <li key={e.title}>
              <h3>{e.title}</h3>
              <p className="engagement-fit">{e.fit}</p>
              <p>{e.how}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="section" aria-labelledby="s-team">
        <header className="section-head">
          <h2 id="s-team">A team when you need one</h2>
        </header>
        <Team />
      </section>

      <Testimonials />

      <section className="section" aria-labelledby="s-faq">
        <header className="section-head">
          <h2 id="s-faq">Questions clients ask</h2>
        </header>
        <Faq />
      </section>

      <ContactBand />
    </>
  );
}
