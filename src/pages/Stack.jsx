import { PageHeader, ContactBand, usePageTitle } from "../components/ui";
import { SkillKeyboard } from "../components/v2/Scenes3D";
import { SkillPlayground } from "../components/v2/Interactive";
import { skills } from "../data";

export default function Stack() {
  usePageTitle("Stack", "The tools Ashish Bhoure builds with, and where he has used each one.");

  return (
    <>
      <PageHeader title="My stack">
        <p>
          Four years of production MERN work plus my own desktop and web products. Press any key below to see where I&apos;ve
          used that skill.
        </p>
      </PageHeader>

      <section className="section section--flush" aria-label="Skill keyboard">
        <SkillKeyboard />
      </section>

      <section className="section" aria-labelledby="pit-t">
        <header className="section-head">
          <h2 id="pit-t">Skill playground</h2>
          <p>The same skills as physical blocks. Throw them around, hover one for details, or filter by area.</p>
        </header>
        <SkillPlayground />
      </section>

      <section className="section" aria-labelledby="all-t">
        <header className="section-head">
          <h2 id="all-t">Everything, in a list</h2>
        </header>
        <dl className="skills">
          {skills.map((g) => (
            <div key={g.group}>
              <dt>{g.group}</dt>
              <dd>{g.items.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </section>

      <ContactBand />
    </>
  );
}
