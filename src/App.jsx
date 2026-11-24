import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, Outlet, Navigate, useLocation } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import { profile } from "./data";

const Work = lazy(() => import("./pages/Work"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const Services = lazy(() => import("./pages/Services"));
const Stack = lazy(() => import("./pages/Stack"));
const Notes = lazy(() => import("./pages/Notes"));
const About = lazy(() => import("./pages/About"));
const Resume = lazy(() => import("./pages/Resume"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Ashish Bhoure, {profile.location}</p>
      <ul>
        <li>
          <a href={profile.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </li>
        <li>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </li>
        <li>
          <a href={`mailto:${profile.email}`}>Email</a>
        </li>
      </ul>
    </footer>
  );
}

/** One listener tilts every .tilt element toward the pointer. */
function useTiltDelegation() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || matchMedia("(pointer: coarse)").matches) return undefined;
    let active = null;
    const reset = (el) => {
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
      el.style.setProperty("--go", 0);
    };
    const move = (e) => {
      const el = e.target.closest?.(".tilt");
      if (active && active !== el) reset(active);
      active = el;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      el.style.setProperty("--ry", `${(x - 0.5) * 10}deg`);
      el.style.setProperty("--rx", `${(0.5 - y) * 8}deg`);
      el.style.setProperty("--gx", `${x * 100}%`);
      el.style.setProperty("--gy", `${y * 100}%`);
      el.style.setProperty("--go", 1);
    };
    document.addEventListener("pointermove", move, { passive: true });
    return () => document.removeEventListener("pointermove", move);
  }, []);
}

function Layout() {
  useTiltDelegation();
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <ScrollToTop />
      <Nav />
      <main id="main">
        <Suspense fallback={<div className="page-loading" aria-busy="true" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "")} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="work" element={<Work />} />
          <Route path="work/:id" element={<ProjectDetail />} />
          <Route path="services" element={<Services />} />
          <Route path="stack" element={<Stack />} />
          <Route path="notes" element={<Notes />} />
          <Route path="skills" element={<Navigate to="/stack" replace />} />
          <Route path="about" element={<About />} />
          <Route path="resume" element={<Resume />} />
          <Route path="contact" element={<ContactPage />} />
          {/* old URLs from the previous site */}
          <Route path="projects" element={<Navigate to="/work" replace />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="hire" element={<Navigate to="/services" replace />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
