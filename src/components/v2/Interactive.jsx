import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PanePreview } from "../ui";
import { projects, services, steps, keySkills, skillAreas, jobs, profile } from "../../data";
import { reducedMotion, coarsePointer } from "../../three/env";

/** Small amber label that tells visitors what they can do. */
export function Hint({ children }) {
  return (
    <span className="hint">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M8 13V5a2 2 0 1 1 4 0v6m0-1a2 2 0 1 1 4 0v2m0-1a2 2 0 1 1 4 0v4a7 7 0 0 1-7 7h-1a7 7 0 0 1-6-3.5L4 14a2 2 0 0 1 3.4-2L8 13"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {children}
    </span>
  );
}

// ---------------------------------------------------------------------------
const included = {
  "web-apps": ["Accounts and roles", "Payments and emails", "Admin dashboard"],
  dashboards: ["Role-based access", "Reports and CSV export", "Audit log of changes"],
  apis: ["REST API with docs", "MongoDB schema design", "Third-party integrations"],
  ecommerce: ["Filtering and search", "Cart and checkout", "Order management"],
  desktop: ["Global hotkeys and tray", "Installer and updates", "Native file handling"],
  websites: ["Mobile-first pages", "Easy content updates", "Fast load and SEO basics"],
  rescue: ["Performance audit", "Query and bundle tuning", "Before and after numbers"],
  support: ["Monthly updates", "Monitoring and fixes", "Small features on request"],
};
const svcColors = ["#4c6bff", "#9b5cff", "#2bb673", "#ff5c9a", "#ff8a1f", "#12b5a6", "#e5484d", "#ffb01f"];

export function FlipCards({ limit }) {
  const list = limit ? services.slice(0, limit) : services;
  const [on, setOn] = useState({});
  const toggle = (id) => setOn((o) => ({ ...o, [id]: !o[id] }));
  return (
    <div className="flip-grid">
      {list.map((s, i) => {
        const ex = s.examples.map((id) => projects.find((p) => p.id === id)).filter(Boolean);
        return (
          <div
            key={s.id}
            className={`flip ${on[s.id] ? "on" : ""}`}
            style={{ "--c": svcColors[i % svcColors.length] }}
            role="button"
            tabIndex={0}
            aria-pressed={!!on[s.id]}
            aria-label={`${s.title}: show what's included`}
            onClick={() => toggle(s.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggle(s.id);
              }
            }}
          >
            <div className="flip-inner">
              <div className="face front">
                <span className="cube" />
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
              <div className="face back">
                <h3>Included</h3>
                <ul>
                  {(included[s.id] || []).map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
                <span className="ex">
                  {ex.length ? `Example: ${ex.map((p) => p.name).join(", ")}` : "Ask me for examples"}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
export function ProjectCarousel() {
  const navigate = useNavigate();
  const N = projects.length;
  const step = 360 / N;
  const [angle, setAngle] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [cardW, setCardW] = useState(() => (typeof innerWidth !== "undefined" && innerWidth < 600 ? 290 : 400));
  const drag = useRef(null);

  useEffect(() => {
    const onResize = () => setCardW(innerWidth < 600 ? 290 : 400);
    addEventListener("resize", onResize);
    return () => removeEventListener("resize", onResize);
  }, []);

  const radius = Math.round(cardW / 2 / Math.tan(Math.PI / N)) + 30;
  const front = ((Math.round(-angle / step) % N) + N) % N;
  const p = projects[front];
  const snap = (a) => Math.round(a / step) * step;

  const down = (e) => {
    drag.current = { x: e.clientX, a: angle, moved: false };
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const move = (e) => {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.x;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    setAngle(drag.current.a + dx * 0.25);
  };
  const up = (e) => {
    if (!drag.current) return;
    const { moved } = drag.current;
    drag.current = null;
    setDragging(false);
    setAngle((a) => snap(a));
    if (!moved) {
      const hit = document.elementFromPoint(e.clientX, e.clientY)?.closest(".c-card");
      if (!hit) return;
      const i = Number(hit.dataset.i);
      if (i === front) navigate(`/work/${projects[i].id}`);
      else setAngle(-i * step);
    }
  };

  return (
    <>
      <div
        className={`carousel ${dragging ? "is-grabbing" : ""}`}
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerCancel={() => {
          drag.current = null;
          setDragging(false);
        }}
      >
        <div
          className={`ring ${dragging ? "dragging" : ""}`}
          style={{ transform: `translateZ(${-radius}px) rotateY(${angle}deg)` }}
        >
          {projects.map((proj, i) => (
            <div
              key={proj.id}
              className={`c-card ${i === front ? "front" : ""}`}
              data-i={i}
              style={{ "--c": proj.pane.accent, transform: `rotateY(${i * step}deg) translateZ(${radius}px)` }}
            >
              <div className="vis">
                <PanePreview project={proj} />
              </div>
              <div className="cap">
                <b>{proj.name}</b>
                <span>{proj.category === "work" ? "Built at work" : "Own product"}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="car-ui">
        <div className="car-detail" aria-live="polite">
          <span className="kind">{p.kind}</span>
          <h3>{p.name}</h3>
          <p className="muted">{p.summary}</p>
          <p>
            <Link className="ext-link" to={`/work/${p.id}`}>
              Read the case study
            </Link>
          </p>
        </div>
        <div className="car-arrows">
          <button className="sq-btn" type="button" aria-label="Previous project" onClick={() => setAngle((a) => snap(a) + step)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="m15 18-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button className="sq-btn" type="button" aria-label="Next project" onClick={() => setAngle((a) => snap(a) - step)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="m9 18 6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}

// ---------------------------------------------------------------------------
const PATH_D = "M40 230 C220 50 360 50 500 170 C640 290 800 290 960 130 C1040 50 1140 70 1170 90";
const STOPS = [0, 0.22, 0.46, 0.7, 0.92];

export function ProcessPath() {
  const svgRef = useRef(null);
  const drawRef = useRef(null);
  const [pts, setPts] = useState([]);
  const [progress, setProgress] = useState(reducedMotion() ? 1 : 0);
  const [len, setLen] = useState(0);

  useEffect(() => {
    const path = drawRef.current;
    const L = path.getTotalLength();
    setLen(L);
    setPts(STOPS.map((s) => path.getPointAtLength(L * s)));
    if (reducedMotion()) return undefined;
    const update = () => {
      const r = svgRef.current.getBoundingClientRect();
      setProgress(Math.max(0, Math.min(1, (innerHeight * 0.85 - r.top) / (r.height + innerHeight * 0.35))));
    };
    update();
    addEventListener("scroll", update, { passive: true });
    return () => removeEventListener("scroll", update);
  }, []);

  return (
    <div className="path-box">
      <svg ref={svgRef} className="path-svg" viewBox="0 0 1200 330" role="img" aria-label={steps.map((s) => s.title).join(", ")}>
        <defs>
          <linearGradient id="pathGrad" x1="0" x2="1">
            <stop offset="0" stopColor="#4c6bff" />
            <stop offset=".6" stopColor="#9b5cff" />
            <stop offset="1" stopColor="#ff5c9a" />
          </linearGradient>
        </defs>
        <path className="base" d={PATH_D} fill="none" strokeWidth="3" />
        <path
          ref={drawRef}
          className="draw"
          d={PATH_D}
          fill="none"
          strokeWidth="5"
          strokeLinecap="round"
          style={len ? { strokeDasharray: len, strokeDashoffset: len * (1 - progress) } : undefined}
        />
        {pts.map((pt, i) => {
          const s = steps[i];
          const lit = progress >= STOPS[i] - 0.01;
          const below = pt.y <= 160;
          const tx = Math.min(pt.x - 20, 1000);
          return (
            <g key={s.title}>
              <rect x={pt.x - 22} y={pt.y - 22} width="44" height="44" rx="13" className={`step-dot ${lit ? "lit" : ""}`} />
              <text className="num" x={pt.x} y={pt.y + 6} textAnchor="middle">
                {i + 1}
              </text>
              <text className="t" x={tx} y={pt.y + (below ? 62 : -44)}>
                {s.title}
              </text>
              <text className="d" x={tx} y={pt.y + (below ? 86 : -20)}>
                {s.short || s.text}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ---------------------------------------------------------------------------
export function SkillPlayground() {
  const pitRef = useRef(null);
  const [filter, setFilter] = useState("all");
  const itemsRef = useRef([]);
  const MatterRef = useRef(null);
  const [tip, setTip] = useState(null);

  useEffect(() => {
    const pit = pitRef.current;
    let alive = true;
    let cleanup = () => {};
    import("matter-js").then(({ default: M }) => {
      if (!alive) return;
      MatterRef.current = M;
      const { Engine, Bodies, Composite, Mouse, MouseConstraint, Body } = M;
      const engine = Engine.create();
      let W = pit.clientWidth;
      let H = pit.clientHeight;
      const wallOpt = { isStatic: true };
      let walls = [];
      const makeWalls = () => {
        Composite.remove(engine.world, walls);
        walls = [
          Bodies.rectangle(W / 2, H + 40, W * 2, 80, wallOpt),
          Bodies.rectangle(-40, H / 2, 80, H * 3, wallOpt),
          Bodies.rectangle(W + 40, H / 2, 80, H * 3, wallOpt),
        ];
        Composite.add(engine.world, walls);
      };
      makeWalls();
      const els = [...pit.querySelectorAll(".blk")];
      const items = els.map((el, i) => {
        const w = el.offsetWidth;
        const h = el.offsetHeight;
        const body = Bodies.rectangle(40 + ((i * 97) % Math.max(1, W - 80)), -60 - i * 45, w, h, {
          chamfer: { radius: 12 },
          restitution: 0.35,
          friction: 0.3,
          angle: (((i * 37) % 10) - 5) / 12,
        });
        return { el, body, w, h };
      });
      itemsRef.current = items;
      Composite.add(engine.world, items.map((it) => it.body));
      for (let k = 0; k < 420; k++) Engine.update(engine, 1000 / 60);
      const paint = () => {
        for (const it of items) {
          const { x, y } = it.body.position;
          it.el.style.transform = `translate(${x - it.w / 2}px, ${y - it.h / 2}px) rotate(${it.body.angle}rad)`;
        }
      };
      paint();
      pit.classList.add("ready");

      let mc = null;
      const onTap = (e) => {
        const r = pit.getBoundingClientRect();
        const x = e.clientX - r.left;
        items.forEach((it) => {
          const dx = it.body.position.x - x;
          if (Math.abs(dx) < 160) Body.applyForce(it.body, it.body.position, { x: Math.sign(dx) * 0.02, y: -0.06 });
        });
      };
      if (!coarsePointer()) {
        const mouse = Mouse.create(pit);
        mouse.element.removeEventListener("wheel", mouse.mousewheel);
        mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);
        mc = MouseConstraint.create(engine, { mouse, constraint: { stiffness: 0.2, render: { visible: false } } });
        Composite.add(engine.world, mc);
      } else {
        pit.addEventListener("click", onTap);
      }

      let running = false;
      let popped = false;
      const frame = () => {
        if (!running || !alive) return;
        Engine.update(engine, 1000 / 60);
        paint();
        requestAnimationFrame(frame);
      };
      const io = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting && !popped && !reducedMotion()) {
            popped = true;
            items.forEach((it) => Body.applyForce(it.body, it.body.position, { x: (Math.random() - 0.5) * 0.03, y: -0.06 - Math.random() * 0.04 }));
          }
          const was = running;
          running = e.isIntersecting;
          if (running && !was) requestAnimationFrame(frame);
        },
        { threshold: 0.25 }
      );
      io.observe(pit);
      const ro = new ResizeObserver(() => {
        W = pit.clientWidth;
        H = pit.clientHeight;
        makeWalls();
      });
      ro.observe(pit);
      cleanup = () => {
        io.disconnect();
        ro.disconnect();
        pit.removeEventListener("click", onTap);
        if (mc) Mouse.clearSourceEvents?.(mc.mouse);
        Engine.clear(engine);
      };
    });
    return () => {
      alive = false;
      cleanup();
    };
  }, []);

  const applyFilter = (f) => {
    setFilter(f);
    const M = MatterRef.current;
    if (!M || f === "all") return;
    itemsRef.current.forEach((it) => {
      if (it.el.dataset.cat === f) M.Body.applyForce(it.body, it.body.position, { x: (Math.random() - 0.5) * 0.02, y: -0.05 });
    });
  };

  const showTip = (e, s) => {
    const r = pitRef.current.getBoundingClientRect();
    setTip({ s, x: Math.min(e.clientX - r.left + 14, r.width - 250), y: e.clientY - r.top + 14 });
  };

  return (
    <div className="pit" ref={pitRef}>
      <div className="filters" role="group" aria-label="Filter skills">
        {[["all", "All"], ...Object.entries(skillAreas)].map(([f, label]) => (
          <button key={f} className="chip-btn" type="button" aria-pressed={filter === f} onClick={() => applyFilter(f)}>
            {label}
          </button>
        ))}
      </div>
      {Object.values(keySkills).map((s) => {
        const match = filter === "all" || s.cat === filter;
        return (
          <div
            key={s.name}
            className={`blk ${match ? "" : "dim"} ${match && filter !== "all" ? "hl" : ""}`}
            data-cat={s.cat}
            style={{ "--c": s.c }}
            onPointerEnter={(e) => showTip(e, s)}
            onPointerMove={(e) => showTip(e, s)}
            onPointerLeave={() => setTip(null)}
          >
            <i />
            {s.name}
          </div>
        );
      })}
      {tip && (
        <div className="pit-tip" style={{ left: tip.x, top: tip.y }}>
          <b>{tip.s.name}</b>
          <br />
          {tip.s.at}
        </div>
      )}
      <Hint>Drag and throw</Hint>
    </div>
  );
}

// ---------------------------------------------------------------------------
export function Terminal() {
  const navigate = useNavigate();
  const [lines, setLines] = useState([
    { k: "out", html: 'Welcome to ashish@portfolio. Type <span class="accent">help</span> to get started.' },
  ]);
  const [value, setValue] = useState("");
  const hist = useRef([]);
  const hi = useRef(0);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);
  const termRef = useRef(null);

  useEffect(() => {
    bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines]);

  useEffect(() => {
    const term = termRef.current;
    const scene = term.parentElement;
    if (reducedMotion() || coarsePointer()) return undefined;
    const move = (e) => {
      const r = term.getBoundingClientRect();
      term.style.setProperty("--ry", `${((e.clientX - r.left) / r.width - 0.5) * 8}deg`);
      term.style.setProperty("--rx", `${6 - ((e.clientY - r.top) / r.height - 0.5) * 6}deg`);
    };
    scene.addEventListener("pointermove", move);
    return () => scene.removeEventListener("pointermove", move);
  }, []);

  const esc = (s) => s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c]);
  const accent = (s) => `<span class="accent">${s}</span>`;
  const CMDS = {
    help: () =>
      [
        "Commands:",
        `  ${accent("about")}       who I am`,
        `  ${accent("projects")}    things I've built`,
        `  ${accent("open")} &lt;name&gt;  open a case study`,
        `  ${accent("skills")}      my stack`,
        `  ${accent("experience")}  where I've worked`,
        `  ${accent("services")}    what I can build for you`,
        `  ${accent("hire")}        how to start a project`,
        `  ${accent("contact")}     how to reach me`,
        `  ${accent("clear")}       clear the screen`,
      ].join("\n"),
    about: () => "Ashish Bhoure, full-stack developer in Indore, India.\n4+ years building production MERN apps: security platforms,\ndashboards, online stores and Windows tools.",
    projects: () => `${projects.map((p) => `  ${accent(p.name.padEnd(24))}${p.kind}`).join("\n")}\n\nTry: open repoatlas`,
    skills: () => Object.values(keySkills).map((s) => s.name).join(", "),
    experience: () => jobs.map((j) => `  ${accent(j.company.padEnd(23))}${j.title.padEnd(30)}${j.when}`).join("\n"),
    services: () => services.map((s) => `  - ${s.title}`).join("\n"),
    hire: () => "1. Tell me about the project in the form above\n2. We talk for 20–30 minutes\n3. You get a written plan with price and dates",
    contact: () => `Email     ${profile.email}\nLinkedIn  linkedin.com/in/ashishbhoure\nGitHub    github.com/ashishbhoure`,
    whoami: () => "a visitor with good taste in portfolios",
    ls: () => "about  projects  skills  experience  services  hire  contact",
  };

  const run = (raw) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    hist.current.push(raw);
    hi.current = hist.current.length;
    const out = [{ k: "cmd", html: esc(raw) }];
    if (cmd === "clear") {
      setLines([]);
      return;
    }
    if (cmd.startsWith("open ")) {
      const q = cmd.slice(5).replace(/\s+/g, "");
      const p = projects.find((x) => x.id === q || x.name.toLowerCase().replace(/\s+/g, "") === q);
      if (p) {
        out.push({ k: "out", html: `Opening ${esc(p.name)}…` });
        setTimeout(() => navigate(`/work/${p.id}`), 500);
      } else out.push({ k: "out", html: `No project called "${esc(cmd.slice(5))}". Type ${accent("projects")} to see the list.` });
    } else if (CMDS[cmd]) {
      out.push({ k: "out", html: CMDS[cmd]() });
      if (cmd === "hire") setTimeout(() => document.getElementById("enquiry")?.scrollIntoView({ behavior: "smooth" }), 600);
    } else {
      out.push({ k: "out", html: `Command not found: ${esc(cmd)}. Type ${accent("help")} for the list.` });
    }
    setLines((l) => [...l, ...out]);
  };

  return (
    <>
      <div className="term-scene">
        <div className="term" ref={termRef}>
          <div className="term-bar">
            <i style={{ background: "#ff5c9a" }} />
            <i style={{ background: "#ffb01f" }} />
            <i style={{ background: "#3ddc97" }} />
            <span>ashish@portfolio: ~</span>
          </div>
          <div className="term-body" ref={bodyRef} aria-live="polite" onClick={() => inputRef.current?.focus()}>
            {lines.map((l, i) => (
              // eslint-disable-next-line react/no-danger
              <div key={i} className={l.k} dangerouslySetInnerHTML={{ __html: l.html }} />
            ))}
          </div>
          <form
            className="term-in"
            autoComplete="off"
            onSubmit={(e) => {
              e.preventDefault();
              run(value);
              setValue("");
            }}
          >
            <label htmlFor="termInput">ashish@portfolio:~$</label>
            <input
              id="termInput"
              ref={inputRef}
              value={value}
              spellCheck={false}
              aria-label="Terminal command"
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "ArrowUp" && hi.current > 0) {
                  hi.current -= 1;
                  setValue(hist.current[hi.current]);
                  e.preventDefault();
                }
                if (e.key === "ArrowDown") {
                  hi.current = Math.min(hist.current.length, hi.current + 1);
                  setValue(hist.current[hi.current] || "");
                }
              }}
            />
          </form>
        </div>
      </div>
      <div className="term-keys">
        {["help", "about", "projects", "experience", "contact"].map((c) => (
          <button key={c} className="chip-btn mono" type="button" onClick={() => run(c)}>
            {c}
          </button>
        ))}
      </div>
    </>
  );
}

// ---------------------------------------------------------------------------
/** Real contribution graph from GitHub, via a public proxy. Hidden if it fails. */
export function Activity({ user = "ashishbhoure" }) {
  const [data, setData] = useState(null);
  const [state, setState] = useState("loading");
  useEffect(() => {
    let alive = true;
    fetch(`https://github-contributions-api.jogruber.de/v4/${user}?y=last`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((j) => {
        if (alive) {
          setData(j);
          setState("ok");
        }
      })
      .catch(() => alive && setState("error"));
    return () => {
      alive = false;
    };
  }, [user]);

  // pad so the first column starts on Sunday
  const days = data?.contributions ?? [];
  const pad = days.length ? new Date(days[0].date).getDay() : 0;
  return (
    <div className="panel">
      <div className="panel-top">
        <div>
          <h3>GitHub activity</h3>
          <p className="muted small">
            {state === "ok" && `${data.total.lastYear ?? Object.values(data.total)[0]} contributions in the last year`}
            {state === "loading" && "Loading from GitHub…"}
            {state === "error" && "GitHub activity couldn't load right now."}
          </p>
        </div>
        <a className="ext-link small" href={`https://github.com/${user}`} target="_blank" rel="noopener noreferrer">
          github.com/{user}
        </a>
      </div>
      <div className="heat-wrap">
        <div className="heat" aria-label="Contribution graph">
          {Array.from({ length: pad }, (_, i) => (
            <i key={`p${i}`} className="pad" />
          ))}
          {(state === "ok" ? days : Array.from({ length: 364 }, () => ({ level: 0 }))).map((d, i) => (
            <i key={i} data-l={d.level} title={d.date ? `${d.count} on ${d.date}` : undefined} />
          ))}
        </div>
      </div>
    </div>
  );
}
