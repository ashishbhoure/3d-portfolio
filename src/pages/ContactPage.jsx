import Contact from "../components/Contact";
import { usePageTitle } from "../components/ui";
import { Terminal } from "../components/v2/Interactive";

export default function ContactPage() {
  usePageTitle("Contact", "Get in touch with Ashish Bhoure about freelance work or a full-time role.");
  return (
    <>
      <Contact />
      <section className="section" aria-labelledby="term-t">
        <header className="section-head">
          <h2 id="term-t">Prefer the command line?</h2>
          <p>
            This terminal works. Type <code>help</code> to see what it knows, or <code>open repoatlas</code> to jump to a
            case study.
          </p>
        </header>
        <Terminal />
      </section>
    </>
  );
}
