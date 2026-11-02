import { Link } from "react-router-dom";
import { PageHeader, usePageTitle } from "../components/ui";

export default function NotFound() {
  usePageTitle("Page not found");
  return (
    <PageHeader title="This page doesn't exist">
      <p>The link may be old: this site was reorganised. Try one of these instead.</p>
      <div className="hero-actions">
        <Link className="btn btn--primary" to="/">
          Go to the home page
        </Link>
        <Link className="btn btn--ghost" to="/work">
          See all projects
        </Link>
      </div>
    </PageHeader>
  );
}
