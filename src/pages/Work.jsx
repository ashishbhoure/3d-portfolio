import { useSearchParams } from "react-router-dom";
import {
  PageHeader,
  ProjectCard,
  Collaborations,
  Archive,
  ContactBand,
  usePageTitle,
} from "../components/ui";
import { projects } from "../data";

const filters = [
  { id: "all", label: "All" },
  { id: "work", label: "Built at work" },
  { id: "product", label: "My own products" },
  { id: "team", label: "Teams and clients" },
  { id: "earlier", label: "Earlier" },
];

export default function Work() {
  usePageTitle("Work", "Projects by Ashish Bhoure: security platforms, web apps and Windows tools.");
  const [params, setParams] = useSearchParams();
  const active = filters.some((f) => f.id === params.get("show")) ? params.get("show") : "all";
  const shows = (id) => active === "all" || active === id;

  return (
    <>
      <PageHeader title="Work">
        <p>
          Production platforms from my jobs at 3Columns and DevSecRoot, products I design and ship
          myself, and work with teams and clients.
        </p>
      </PageHeader>

      <div className="section section--flush">
        <div className="filters" role="group" aria-label="Show projects">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              className="filter"
              aria-pressed={active === f.id}
              onClick={() => setParams(f.id === "all" ? {} : { show: f.id }, { replace: true })}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {shows("work") && (
        <section className="section section--tight" aria-labelledby="w-work">
          <header className="section-head">
            <h2 id="w-work">Built at work</h2>
            <p>Company projects, so the code stays private. Each page covers what I built.</p>
          </header>
          <ul className="card-grid card-grid--wide">
            {projects
              .filter((p) => p.category === "work")
              .map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
          </ul>
        </section>
      )}

      {shows("product") && (
        <section className="section section--tight" aria-labelledby="w-product">
          <header className="section-head">
            <h2 id="w-product">My own products</h2>
            <p>Designed, built and shipped end to end, from the first commit to the installer.</p>
          </header>
          <ul className="card-grid">
            {projects
              .filter((p) => p.category === "product")
              .map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
          </ul>
        </section>
      )}

      {shows("team") && (
        <section className="section section--tight" aria-labelledby="w-team">
          <header className="section-head">
            <h2 id="w-team">With teams and clients</h2>
          </header>
          <Collaborations />
        </section>
      )}

      {shows("earlier") && (
        <section className="section section--tight" aria-labelledby="w-earlier">
          <header className="section-head">
            <h2 id="w-earlier">Earlier projects</h2>
          </header>
          <Archive />
        </section>
      )}

      <ContactBand />
    </>
  );
}
