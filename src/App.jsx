import Nav from "./components/Nav";
import Hero from "./components/Hero";
import { Work, Collaborations, Archive, Experience, Skills } from "./components/Sections";
import Contact from "./components/Contact";
import portrait from "./assets/ashish.webp";
import { profile } from "./data";

function About() {
  return (
    <section className="section about" aria-labelledby="about-title">
      <img className="about-photo" src={portrait} alt="Ashish Bhoure" width="600" height="832" loading="lazy" />
      <div>
        <h2 id="about-title">About me</h2>
        <p>
          I like small, sharp tools: a screenshot app that saves ten clicks, a converter that lives in
          the right-click menu, a search page that answers the question you actually had. Most of my
          work is TypeScript end to end, React on the front, Node on the back, Electron when it needs
          to live on the desktop.
        </p>
        <p>
          Since 2023 I have been freelancing, building web apps and admin panels for small businesses
          and shipping my own products alongside. I finished an integrated M.Tech in Information
          Technology at DAVV, Indore in 2025.
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Ashish Bhoure</p>
      <ul>
        <li>
          <a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a>
        </li>
        <li>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </li>
        <li>
          <a href={`mailto:${profile.email}`}>Email</a>
        </li>
      </ul>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Work />
        <Collaborations />
        <Archive />
        <About />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
