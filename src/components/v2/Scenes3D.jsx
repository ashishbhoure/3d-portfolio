import { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { hasWebGL } from "../../three/env";
import portrait from "../../assets/ashish.webp";
import { projects, keySkills, skillAreas, profile, homeCity, cities } from "../../data";
import { Hint } from "./Interactive";

/**
 * Mounts a scene from three/scenes.js into a div once it's on the page.
 * `build(mod, el)` returns a dispose function or an object with dispose().
 */
function useScene(build, deps = []) {
  const ref = useRef(null);
  const api = useRef(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (!hasWebGL()) {
      setFailed(true);
      return undefined;
    }
    let cleanup = null;
    let cancelled = false;
    import("../../three/scenes").then((mod) => {
      if (cancelled) return;
      const out = build(mod, el);
      api.current = out;
      cleanup = typeof out === "function" ? out : out?.dispose;
    });
    return () => {
      cancelled = true;
      cleanup?.();
      api.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return { ref, api, failed };
}

const NoGL = () => <p className="no-gl">3D needs WebGL, which this browser has turned off.</p>;

const byId = (id) => projects.find((p) => p.id === id);

// ---------------------------------------------------------------------------
export function HeroDesk() {
  const navigate = useNavigate();
  const screens = ["vmaas", "repoatlas", "shieldguard", "skillverse", "lumishot"].map(byId);
  const { ref, failed } = useScene((m, el) =>
    m.heroDesk(el, { screens, onScreenClick: (id) => navigate(`/work/${id}`) })
  );
  return (
    <div className="stage3d stage3d--hero" ref={ref}>
      {failed && <NoGL />}
      <Hint>Grab a tile and throw it. Click the monitor.</Hint>
    </div>
  );
}

// ---------------------------------------------------------------------------
export function SkillCard({ letter }) {
  const s = keySkills[letter];
  if (!s) return null;
  const list = s.projects.map(byId).filter(Boolean);
  return (
    <div className="panel skill-card" aria-live="polite">
      <span className="key-cap" style={{ background: `linear-gradient(135deg, ${s.c}, #241d63)` }}>
        {letter}
      </span>
      <h3>{s.name}</h3>
      <p className="muted">{s.note}</p>
      <dl className="kv">
        <dt>Used at</dt>
        <dd>{s.at}</dd>
        <dt>Projects</dt>
        <dd>
          {list.length
            ? list.map((p, i) => (
                <span key={p.id}>
                  {i > 0 && ", "}
                  <Link to={`/work/${p.id}`}>{p.name}</Link>
                </span>
              ))
            : "Across day-to-day work"}
        </dd>
        <dt>Area</dt>
        <dd>{skillAreas[s.cat]}</dd>
      </dl>
    </div>
  );
}

export function SkillKeyboard() {
  const [letter, setLetter] = useState("R");
  const visible = useRef(false);
  const { ref, api, failed } = useScene((m, el) => m.skillKeyboard(el, { skills: keySkills, onPress: setLetter }));

  useEffect(() => {
    const el = ref.current;
    const io = new IntersectionObserver(([e]) => (visible.current = e.isIntersecting), { threshold: 0.3 });
    if (el) io.observe(el);
    const onKey = (e) => {
      if (!visible.current || e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = document.activeElement?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      const L = e.key.toUpperCase();
      if (!keySkills[L]) return;
      if (api.current?.press) api.current.press(L);
      else setLetter(L);
    };
    addEventListener("keydown", onKey);
    return () => {
      io.disconnect();
      removeEventListener("keydown", onKey);
    };
  }, [ref, api]);

  return (
    <div className="kb-grid">
      <div className="kb-stage" ref={ref}>
        {failed && <NoGL />}
        <Hint>Click a key or press R, N, M…</Hint>
      </div>
      <SkillCard letter={letter} />
    </div>
  );
}

// ---------------------------------------------------------------------------
function tzOffset(tz) {
  const d = new Date();
  return Math.round(
    (new Date(d.toLocaleString("en-US", { timeZone: tz })) - new Date(d.toLocaleString("en-US", { timeZone: "UTC" }))) /
      60000
  );
}
const hhmm = (m) => {
  const v = ((m % 1440) + 1440) % 1440;
  return `${String(Math.floor(v / 60)).padStart(2, "0")}:${String(v % 60).padStart(2, "0")}`;
};

export function TimezoneGlobe() {
  const [i, setI] = useState(0);
  const { ref, api, failed } = useScene((m, el) => m.timezoneGlobe(el, { home: homeCity, cities }));
  const c = cities[i];

  useEffect(() => {
    // the scene loads asynchronously; retry briefly until it can take the focus
    let n = 0;
    const t = setInterval(() => {
      if (api.current?.focus || ++n > 40) {
        api.current?.focus?.(c);
        clearInterval(t);
      }
    }, 100);
    return () => clearInterval(t);
  }, [c, api]);

  const diff = tzOffset(homeCity.tz) - tzOffset(c.tz);
  const hours = Math.abs(diff) / 60;
  const now = new Date();
  const there = now.toLocaleTimeString("en-GB", { timeZone: c.tz, hour: "2-digit", minute: "2-digit" });
  const here = now.toLocaleTimeString("en-GB", { timeZone: homeCity.tz, hour: "2-digit", minute: "2-digit" });

  return (
    <div className="globe-grid">
      <div className="globe-stage" ref={ref}>
        {failed && <NoGL />}
        <Hint>Drag to spin</Hint>
      </div>
      <div>
        <header className="section-head">
          <h2>From Indore to your time zone</h2>
          <p>I work remotely with teams anywhere. Pick your city to see how your working day lines up with mine.</p>
        </header>
        <div className="cities" role="group" aria-label="Choose a city">
          {cities.map((city, j) => (
            <button key={city.n} type="button" className="chip-btn" aria-pressed={i === j} onClick={() => setI(j)}>
              {city.n}
            </button>
          ))}
        </div>
        <div className="panel tz-out" aria-live="polite">
          <span className="muted">Your 09:00 – 18:00 in {c.n} is</span>
          <b>
            {hhmm(9 * 60 + diff)} – {hhmm(18 * 60 + diff)}
          </b>
          <span className="muted">
            in Indore. India is {hours % 1 ? hours.toFixed(1) : hours} hours {diff >= 0 ? "ahead" : "behind"}. Right now
            it&apos;s {there} in {c.n} and {here} in Indore.
          </span>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
export function LanyardBadge() {
  const { ref, failed } = useScene((m, el) => m.lanyardBadge(el, { portrait, profile }));
  return (
    <div className="badge-stage" ref={ref}>
      {failed && <img className="badge-fallback" src={portrait} alt="Ashish Bhoure" />}
      <Hint>Pull the badge, click to flip it</Hint>
    </div>
  );
}
