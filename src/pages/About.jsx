import { Link } from "react-router-dom";
import { PageHeader, ContactBand, usePageTitle } from "../components/ui";
import { LanyardBadge, TimezoneGlobe } from "../components/v2/Scenes3D";
import { jobs, education, certificates, practices, profile } from "../data";

export default function About() {
  usePageTitle("About", "Experience, education and working style of Ashish Bhoure, full-stack developer in Indore.");

  return (
    <>
      <PageHeader title="About me" />

      <section className="section section--flush about-grid">
        <LanyardBadge />
        <div className="about-text">
          <p className="about-lede">
            I&apos;m a full-stack developer in {profile.location} with four years of building production web applications on
            the MERN stack.
          </p>
          <p>
            At work I build security and business platforms: vulnerability management, real-time log monitoring with
            alerting, workshop management and e-commerce. That means REST APIs with proper sign-in and role-based access,
            MongoDB schemas and aggregation pipelines that stay fast as data grows, and React frontends that handle large
            lists without stalling.
          </p>
          <p>
            Outside work I like small, sharp tools: a screenshot app that saves ten clicks, a converter that lives in the
            right-click menu, a search page that answers the question you actually had. Those live on the{" "}
            <Link to="/work?show=product">work page</Link>, and the tools I use are on the <Link to="/stack">stack page</Link>.
          </p>

          <div className="jobs">
            {jobs.map((j, i) => (
              <article key={j.company} className="job tilt">
                <span className={`when ${i === 0 ? "when--now" : ""}`}>{j.when}</span>
                <h3>{j.company}</h3>
                <p className="role">{j.title}</p>
                <ul>
                  {j.points.slice(0, 3).map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-label="Time zones">
        <TimezoneGlobe />
      </section>

      <section className="section" aria-labelledby="how">
        <header className="section-head">
          <h2 id="how">How I work</h2>
          <p>The habits I bring to every codebase, whatever the stack.</p>
        </header>
        <ul className="practices">
          {practices.map((p) => (
            <li key={p.title} className="tilt">
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="section edu" aria-labelledby="edu">
        <div>
          <h2 id="edu">Education</h2>
          <ul className="edu-list">
            {education.map((e) => (
              <li key={e.school}>
                <h3>{e.school}</h3>
                <p>{e.detail}</p>
                <p className="edu-when">{e.when}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Certificates</h2>
          <ul className="edu-list">
            {certificates.map((c) => (
              <li key={c}>
                <p>{c}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ContactBand />
    </>
  );
}
