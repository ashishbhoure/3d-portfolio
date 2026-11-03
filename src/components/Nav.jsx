import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../assets/logoAB.png";

const links = [
  { to: "/work", label: "Work" },
  { to: "/services", label: "Services" },
  { to: "/stack", label: "Stack" },
  { to: "/about", label: "About" },
  { to: "/notes", label: "Notes" },
  { to: "/resume", label: "Résumé" },
];

function getInitialTheme() {
  try {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    /* storage blocked */
  }
  return "dark"; // default for first-time visitors
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState(getInitialTheme);
  const { pathname } = useLocation();

  // Close the mobile menu whenever the page changes.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* storage blocked */
    }
  }, [theme]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="nav-inner">
        <Link to="/" className="nav-brand">
          <img src={logo} alt="" width="28" height="28" />
          <span>Ashish Bhoure</span>
        </Link>

        <nav id="site-menu" className={`nav-links ${open ? "is-open" : ""}`} aria-label="Main">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to}>
              {l.label}
            </NavLink>
          ))}
          <NavLink to="/contact" className="nav-cta">
            Start a project
          </NavLink>
        </nav>

        <div className="nav-actions">
          <button
            type="button"
            className="icon-btn"
            onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          >
            {theme === "dark" ? (
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                <circle cx="12" cy="12" r="4.5" fill="currentColor" />
                <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                <path fill="currentColor" d="M20.5 14.6A8.5 8.5 0 0 1 9.4 3.5a8.5 8.5 0 1 0 11.1 11.1Z" />
              </svg>
            )}
          </button>
          <button
            type="button"
            className="icon-btn nav-toggle"
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
              <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </g>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
