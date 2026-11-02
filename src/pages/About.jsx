import { Link } from "react-router-dom";
import portrait from "../assets/ashish.webp";
import { PageHeader, JobTimeline, Skills, ContactBand, usePageTitle } from "../components/ui";
import { education, certificates, practices, profile } from "../data";

export default function About() {
  usePageTitle("About", "Experience, skills and education of Ashish Bhoure, full-stack developer.");

  return (
    <>
      <PageHeader title="About me" />

      <section className="section section--flush about">
        <img className="about-photo" src={portrait} alt="Ashish Bhoure" width="600" height="832" />
        <div className="about-text">
          <p className="about-lede">
            I&apos;m a full-stack developer in {profile.location} with four years of building
            production web applications on the MERN stack.
          </p>
          <p>
            At work I build security and business platforms: vulnerability management, real-time
            log monitoring with alerting, workshop management and e-commerce. That means REST APIs
            with proper sign-in and role-based access, MongoDB schemas and aggregation pipelines
            that stay fast as data grows, and React frontends that handle large lists without
            stalling.
          </p>
          <p>
            Outside work I like small, sharp tools: a screenshot app that saves ten clicks, a
            converter that lives in the right-click menu, a search page that answers the question
            you actually had. Those live on the <Link to="/work?show=product">work page</Link>.
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="exp">
        <header className="section-head">
          <h2 id="exp">Experience</h2>
        </header>
        <JobTimeline />
      </section>

      <section className="section" aria-labelledby="how">
        <header className="section-head">
          <h2 id="how">How I work</h2>
          <p>The habits I bring to every codebase, whatever the stack.</p>
        </header>
        <ul className="practices">
          {practices.map((p) => (
            <li key={p.title}>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="section" id="skills" aria-labelledby="skills-title">
        <header className="section-head">
          <h2 id="skills-title">Skills</h2>
        </header>
        <Skills />
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
