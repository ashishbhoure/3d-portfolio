import { PageHeader, usePageTitle } from "../components/ui";
import { profile } from "../data";

export default function Resume() {
  usePageTitle("Résumé", "Résumé of Ashish Bhoure, full-stack developer.");

  return (
    <>
      <PageHeader title="Résumé">
        <p>Two pages: experience, projects, skills and education.</p>
        <div className="hero-actions">
          <a className="btn btn--primary" href={profile.resume} download="Ashish-Bhoure-Resume.pdf">
            Download PDF
          </a>
          <a className="btn btn--ghost" href={profile.resume} target="_blank" rel="noopener noreferrer">
            Open in a new tab
          </a>
        </div>
      </PageHeader>

      <div className="section section--flush resume-frame-wrap">
        <iframe className="resume-frame" src={`${profile.resume}#view=FitH`} title="Ashish Bhoure résumé (PDF)" />
        <p className="resume-fallback">
          The PDF preview doesn&apos;t show on some phones.{" "}
          <a className="text-link" href={profile.resume}>
            Open the résumé
          </a>{" "}
          instead.
        </p>
      </div>
    </>
  );
}
