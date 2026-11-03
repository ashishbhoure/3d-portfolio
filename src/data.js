import repoatlasShot from "./assets/projects/repoatlas.webp";
import repoatlasExplore from "./assets/projects/repoatlas-explore.webp";
import skillverseShot from "./assets/projects/skillverse.webp";
import skillverseRoadmap from "./assets/projects/skillverse-roadmap.webp";

export const profile = {
  name: "Ashish Bhoure",
  role: "Full-stack developer",
  location: "Indore, India",
  email: "ashishbhoure@gmail.com",
  github: "https://github.com/ashishbhoure",
  linkedin: "https://www.linkedin.com/in/ashishbhoure/",
  resume: "/Ashish-Bhoure-Resume.pdf",
};

export const categories = {
  work: "Built at work",
  product: "My own products",
};

/**
 * Every project with its own page. `pane` drives the window drawn in the
 * 3D hero and in previews: a screenshot (`image`) or a drawn mock (`mock`).
 */
export const projects = [
  // ---- Professional work ----
  {
    id: "vmaas",
    category: "work",
    name: "VMaaS",
    kind: "Vulnerability management platform",
    duration: "11 months",
    summary:
      "A central place for security teams to track vulnerabilities across every asset they own, see which ones matter most, and report on them.",
    points: [
      "Dashboards for vulnerability severity, risk ratios and impact analysis",
      "Tag-based asset inventory so teams can slice findings by environment, owner or product",
      "Role-based access control and compliance-ready reports",
    ],
    stack: ["React", "Redux", "Node.js", "Express", "MongoDB", "RBAC"],
    links: [],
    note: "Company project, code not public",
    pane: { mock: "vmaas", accent: "#E5484D" },
  },
  {
    id: "shieldguard",
    category: "work",
    name: "ShieldGuard",
    kind: "Log analysis and threat detection",
    duration: "9 months",
    summary:
      "Watches log data in real time and raises an alert the moment a customer-defined condition is met.",
    points: [
      "Alert builder for both simple and complex queries on top of Elasticsearch",
      "Alerts evaluated continuously against incoming logs, with notifications when they fire",
      "Per-customer alert configuration and live dashboards for a multi-tenant setup",
    ],
    stack: ["React", "Node.js", "Express", "Elasticsearch", "MongoDB"],
    links: [],
    note: "Company project, code not public",
    pane: { mock: "shieldguard", accent: "#2BB673" },
  },
  {
    id: "autorox",
    category: "work",
    name: "Autorox",
    kind: "Garage and workshop management",
    duration: "10 months",
    summary:
      "Runs the day-to-day of a car workshop: job cards, service history, stock and invoices in one system.",
    points: [
      "Job cards that follow a vehicle from check-in to delivery",
      "Service history per vehicle and automated billing",
      "Inventory and stock management tied to the jobs that use the parts",
    ],
    stack: ["React", "Node.js", "Express", "MongoDB"],
    links: [],
    note: "Company project, code not public",
    pane: { mock: "autorox", accent: "#F2A007" },
  },
  {
    id: "ecommerce",
    category: "work",
    name: "Wayfair e-commerce platform",
    kind: "Online store",
    duration: "9 months",
    summary:
      "A store with more than 5,000 products across many categories, with filtering, search, cart and checkout.",
    points: [
      "Advanced filtering and search across 5,000+ listings",
      "Cart management and a secure checkout flow",
      "REST APIs for users, products and orders",
    ],
    stack: ["React", "Redux", "Node.js", "Express", "MongoDB"],
    links: [],
    note: "Company project, code not public",
    pane: { mock: "shop", accent: "#7B3FE4" },
  },

  // ---- Own products ----
  {
    id: "lumishot",
    category: "product",
    name: "Lumishot",
    kind: "Windows desktop app",
    summary:
      "Screenshots for Windows that look good enough to post. Capture with a hotkey, drop the shot on a background with padding, rounded corners and a shadow, mark it up, then copy or save.",
    points: [
      "Region, window, full-screen, scrolling and timed capture from one floating bar",
      "Pixel loupe with colour picker and an on-screen ruler for exact measurements",
      "Ships as a signed installer with a tray icon and global hotkeys",
    ],
    stack: ["Electron", "React", "TypeScript", "Vite", "Native modules"],
    links: [],
    note: "Private repository",
    pane: { mock: "lumishot", accent: "#7C5CFF" },
  },
  {
    id: "repoatlas",
    category: "product",
    name: "RepoAtlas",
    kind: "Web app",
    summary:
      "Find open-source repositories worth building on. Search every public GitHub repository with advanced filters, rank them with transparent, versioned scores, and compare, save and watch projects.",
    points: [
      "Filters for language, topics, licence, stars, activity and good first issues, applied by GitHub across all matches",
      "Trending, hidden gems and a documented health score per repository",
      "Star history recorded over time, side-by-side compare, Playwright end-to-end tests",
    ],
    stack: ["Next.js", "TypeScript", "Prisma", "Docker", "Playwright"],
    links: [
      { label: "Live demo", href: "https://repoatlas-sage.vercel.app" },
      { label: "Source", href: "https://github.com/ashishbhoure/repoatlas" },
    ],
    gallery: [
      { src: repoatlasShot, alt: "RepoAtlas home page with the fastest-growing repositories" },
      { src: repoatlasExplore, alt: "RepoAtlas explore page with search filters" },
    ],
    pane: { image: repoatlasShot, accent: "#2E4BFF" },
  },
  {
    id: "skillverse",
    category: "product",
    name: "Skillverse",
    kind: "Web app",
    summary:
      "An interactive map of web skills: a pannable, zoomable constellation of 237 skills and 1,546 curated resources across 26 categories, with role-based learning paths and progress tracking.",
    points: [
      "Rebuilt from the MIT-licensed Web Skills project and extended with 58 new skills",
      "Learning paths, roadmap view, upcoming-skills radar and a Ctrl+K command palette",
      "Streaks and achievements kept locally, works on mobile",
    ],
    stack: ["React", "TypeScript", "Vite", "SVG"],
    links: [{ label: "Source", href: "https://github.com/ashishbhoure/skillverse" }],
    gallery: [
      { src: skillverseShot, alt: "Skillverse constellation with a highlighted learning path" },
      { src: skillverseRoadmap, alt: "Skillverse roadmap view for the frontend path" },
    ],
    pane: { image: skillverseShot, accent: "#12B5A6" },
  },
  {
    id: "tangerine",
    category: "product",
    name: "Tangerine for Windows",
    kind: "Windows desktop app",
    summary:
      "A local file converter. Right-click files in Explorer, pick a format from a wheel that opens at the cursor, and the converted copy lands beside the original. Files never leave the PC.",
    points: [
      "Images through sharp/libvips; audio, video and GIF through FFmpeg",
      "Only offers format pairs that are actually tested end to end",
      "Batch conversion with progress and cancel in the app window",
    ],
    stack: ["Electron", "React", "TypeScript", "FFmpeg", "Vitest"],
    links: [],
    note: "Private repository",
    pane: { mock: "tangerine", accent: "#FF8A1F" },
  },
  {
    id: "notes",
    category: "product",
    name: "Smart Notes",
    kind: "Full-stack web app",
    summary:
      "A notes app that files every note into the right section on its own, finds notes by meaning as well as keywords, and answers questions about what you have written.",
    points: [
      "Automatic classification into sections such as Frontend, DSA and Study",
      "Semantic search, summaries and edits made through chat",
      "Rich text editor with image uploads",
    ],
    stack: ["React", "Node.js", "Express", "MongoDB", "Groq", "TipTap"],
    links: [{ label: "Source", href: "https://github.com/ashishbhoure/AI_Pow_Notes_App" }],
    pane: { mock: "notes", accent: "#E8456B" },
  },
];

// Order matches the slots in HeroScene LAYOUT.
export const heroProjects = ["lumishot", "repoatlas", "skillverse", "tangerine", "vmaas"].map((id) =>
  projects.find((p) => p.id === id)
);

/** Team, client and open-source work. */
export const collaborations = [
  {
    name: "OpenMausBot",
    role: "Open-source contribution",
    summary: "A chat app where every contact is an AI agent with its own model, cloud computer and connected apps.",
    stack: ["Electron", "React", "TypeScript"],
    href: "https://www.openmausbot.com",
  },
  {
    name: "21 Spades",
    role: "Team project",
    summary: "A social exchange platform with a feed, NFT marketplace, real-time chat and market data.",
    stack: ["Next.js", "TypeScript", "Zustand", "Ant Design"],
    href: "https://github.com/mohitpunasiya88/21Spades",
  },
  {
    name: "Umiya Biotech",
    role: "Client work",
    summary: "Company web application with a biotech-themed interface, routing and API integration.",
    stack: ["React", "Ant Design"],
  },
  {
    name: "Study Champion Academy",
    role: "Client work",
    summary: "Education website with an easy-to-browse library of learning resources.",
    stack: ["React", "Bootstrap"],
    href: "https://www.studychampionacademy.com",
  },
];

/** Earlier projects. */
export const archive = [
  { name: "Foodies", what: "Food ordering with auth, cart and category search", stack: "MongoDB, Express, React, Node", href: "https://github.com/ashishbhoure/MERN_Project_foodies" },
  { name: "Slack clone", what: "Real-time chat rooms with Google sign-in", stack: "React, Appwrite, Redux Toolkit", href: null },
  { name: "Café management", what: "Order handling and daily operations for a café", stack: "MongoDB, Express, React, Node", href: "https://github.com/ochhanejay/ckn_management" },
  { name: "Armour Lab Selection", what: "Browse labs and their resources; admins create new labs", stack: "PHP, JavaScript, Bootstrap", href: "https://github.com/ashishbhoure/armour_labs" },
  { name: "Blackjack", what: "Multiplayer card game for mobile", stack: "React Native", href: "https://github.com/ashishbhoure/21CardGame" },
  { name: "Driver drowsiness detection", what: "Real-time blink tracking that sounds an alert", stack: "Python, OpenCV, dlib", href: "https://github.com/ashishbhoure/Driver_Drowsiness_Detection" },
];

/** Jobs, newest first. */
export const jobs = [
  {
    company: "3Columns",
    title: "Full-stack developer (MERN)",
    when: "Feb 2025 – now",
    points: [
      "Build and maintain production web apps on the MERN stack, from first design to deployment",
      "Design REST APIs with JWT and OAuth sign-in and role-based access control",
      "Speed up APIs by tuning MongoDB aggregation pipelines, caching and lazy loading",
      "Own features end to end: database design, React and Redux frontend, tests and AWS deploys",
      "Work with QA and design in Agile sprints to fix production issues and ship stable releases",
    ],
  },
  {
    company: "DevSecRoot Technology",
    title: "MERN stack developer",
    when: "Jun 2022 – Feb 2025",
    points: [
      "Built Node.js and Express services with structured logging and complex business rules",
      "Designed MongoDB schemas and data flows for high availability",
      "Wrote modular React components with lazy loading and list virtualisation for fast pages",
      "Integrated third-party APIs, payment gateways and notification services",
      "Took part in code reviews and CI/CD pipelines for production releases",
    ],
  },
];

export const education = [
  {
    school: "International Institute of Professional Studies, DAVV",
    detail: "Integrated M.Tech in Information Technology (B.Tech + M.Tech), CGPA 8.17",
    when: "2020 – 2025",
  },
  {
    school: "Kendriya Vidyalaya Mhow",
    detail: "Class XII, Physics, Chemistry, Maths and IP, 84%",
    when: "2019 – 2020",
  },
];

export const certificates = [
  "Postman API Fundamentals Student Expert",
  "Google Data Analytics Professional Certificate",
  "Programming in Java, Newton School",
];

/** How I work: from the résumé's engineering practices. */
export const practices = [
  {
    title: "Clean architecture",
    text: "Clear boundaries between routes, services and data so features can change without breaking each other.",
  },
  {
    title: "Security from the start",
    text: "JWT and OAuth sign-in with role-based access control, including multi-tenant platforms.",
  },
  {
    title: "Solid APIs",
    text: "Middleware validation, structured logs and consistent error handling on every endpoint.",
  },
  {
    title: "Fast by default",
    text: "Caching, query tuning, lazy loading, memoisation and virtualised lists where the data is large.",
  },
  {
    title: "Predictable state",
    text: "Redux or Context with modern hooks, chosen by how much state the screen really has.",
  },
  {
    title: "Reviewed code",
    text: "Small modular components, peer reviews and Git workflows that keep main shippable.",
  },
];

export const skills = [
  { group: "Frontend", items: ["React", "Next.js", "TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3", "Three.js"] },
  { group: "UI and styling", items: ["Tailwind CSS", "Material UI", "Ant Design", "Bootstrap", "Styled Components"] },
  { group: "State and data fetching", items: ["Redux", "Context API", "Zustand", "Axios", "WebSockets", "Apollo Client"] },
  { group: "Backend", items: ["Node.js", "Express", "REST APIs", "JWT", "OAuth", "RBAC"] },
  { group: "Databases and search", items: ["MongoDB", "Mongoose", "Aggregation pipelines", "MySQL", "Prisma", "Elasticsearch"] },
  { group: "Desktop", items: ["Electron", "Native modules", "FFmpeg", "sharp"] },
  { group: "Cloud and DevOps", items: ["AWS EC2 and S3", "Docker", "Jenkins", "CI/CD", "Vercel"] },
  { group: "Tools", items: ["Git", "GitHub", "GitLab", "Bitbucket", "Postman", "Swagger", "Jira", "Playwright", "Vitest"] },
];

// ---------------------------------------------------------------------------
// Freelance / hire-me content
// ---------------------------------------------------------------------------

/** Shown on the home page and the services page. Set `open: false` when booked up. */
export const availability = {
  open: true,
  text: "Taking new freelance projects",
};

/** Contact channels besides the form. Set `whatsapp` to a wa.me link to show that button. */
export const channels = {
  whatsapp: null, // hidden for now; was "https://wa.me/918305693299"
};

/** Plain facts, computed where possible so they stay true. */
export const stats = [
  { value: "4+", label: "years building production apps" },
  { value: `${projects.length + collaborations.length + archive.length}`, label: "projects built" },
  { value: "2", label: "product companies" },
];

/** Names that appear on the home page under "People I've built for". */
export const clients = ["3Columns", "DevSecRoot Technology", "Study Champion Academy", "Umiya Biotech", "21 Spades"];

/**
 * Real quotes only. Each: { quote, name, role }. The section stays hidden
 * while this list is empty.
 */
export const testimonials = [];

export const services = [
  {
    id: "web-apps",
    title: "Web apps and SaaS",
    text: "Customer-facing apps with sign-in, roles, payments and the dashboard your users live in.",
    examples: ["repoatlas", "notes"],
  },
  {
    id: "dashboards",
    title: "Admin panels and dashboards",
    text: "Internal tools that turn spreadsheets and email threads into one screen with the numbers that matter.",
    examples: ["vmaas", "autorox"],
  },
  {
    id: "apis",
    title: "APIs and backends",
    text: "REST APIs, databases and integrations with payment gateways, notifications and third-party services.",
    examples: ["shieldguard"],
  },
  {
    id: "ecommerce",
    title: "Online stores",
    text: "Catalogues, filtering and search, cart and checkout for stores with a handful or thousands of products.",
    examples: ["ecommerce"],
  },
  {
    id: "desktop",
    title: "Windows desktop apps",
    text: "Tools that live in the tray or the right-click menu, with installers and auto-updates.",
    examples: ["lumishot", "tangerine"],
  },
  {
    id: "websites",
    title: "Business websites",
    text: "Fast, mobile-friendly sites for companies, schools and clinics that are easy to update.",
    examples: [],
  },
  {
    id: "rescue",
    title: "Speed-ups and fixes",
    text: "Slow pages, timeouts and fragile code in an existing React or Node app found, measured and fixed.",
    examples: [],
  },
  {
    id: "support",
    title: "Maintenance and support",
    text: "Monthly upkeep after launch: updates, small features, monitoring and fixes when something breaks.",
    examples: [],
  },
];

/** A real sequence, so it is numbered on the page. */
export const steps = [
  {
    title: "Talk",
    short: "A short call about what you need",
    text: "A short call or chat about what you need, who uses it and when it has to be live.",
  },
  {
    title: "Plan",
    short: "Scope, price and dates in writing",
    text: "A written scope with screens, milestones, price and dates, so you know what you're paying for.",
  },
  {
    title: "Build",
    short: "A demo link you can click each week",
    text: "Work in short cycles with a demo link you can click every week. Feedback goes straight in.",
  },
  {
    title: "Launch",
    short: "Deploy and hand over everything",
    text: "Deployment, domain, analytics and a handover of the code and every account in your name.",
  },
  {
    title: "Support",
    short: "Fixes and monthly upkeep",
    text: "A bug-fix period after launch, then optional monthly support as the product grows.",
  },
];

export const engagements = [
  {
    title: "Fixed-scope project",
    fit: "You know what you want built.",
    how: "One agreed price split across milestones. You pay as each milestone is delivered.",
  },
  {
    title: "Monthly retainer",
    fit: "You have a live product that keeps needing work.",
    how: "A set number of hours each month for features, fixes and upkeep, rolled into one invoice.",
  },
  {
    title: "Dedicated developer",
    fit: "You need an extra full-stack developer on your team.",
    how: "I join your standups, tools and sprints, part-time or full-time, billed monthly.",
  },
];

/** Roles, not names: the people I bring in when a project needs more hands. */
export const team = {
  intro:
    "Bigger projects get a small team I've shipped with before. You still deal with one person: me. I plan the work, review every line that goes out and stay your single point of contact.",
  roles: [
    { title: "UI/UX designer", text: "Wireframes, visual design and a clickable prototype before code starts." },
    { title: "Frontend and backend developers", text: "Extra hands on React and Node when the timeline is tight." },
    { title: "QA tester", text: "Manual and automated testing on real devices before every release." },
    { title: "DevOps", text: "Cloud setup, CI/CD, backups and monitoring on AWS or Vercel." },
  ],
};

export const faqs = [
  {
    q: "How much does a project cost?",
    a: "It depends on scope. After our first call you get a written estimate with a fixed price per milestone, so there are no surprises.",
  },
  {
    q: "How long does it take?",
    a: "A business website usually takes a few weeks; a full web app or platform takes a few months. The estimate includes dates for every milestone.",
  },
  {
    q: "Do you work with clients outside India?",
    a: "Yes. I work remotely and keep a few hours of overlap with your time zone for calls and quick replies.",
  },
  {
    q: "Who owns the code?",
    a: "You do. The repository, hosting, domain and every account are set up in your name or handed over at launch.",
  },
  {
    q: "Will you sign an NDA?",
    a: "Yes, happily, before we discuss the details of your idea.",
  },
  {
    q: "What happens after launch?",
    a: "Bugs found shortly after launch are fixed at no cost. After that you can move to a monthly retainer or call me when you need something.",
  },
];

export const projectTypes = [...services.map((s) => s.title), "Something else"];
export const budgets = ["Not sure yet", "Under $1,000", "$1,000 – $5,000", "$5,000 – $15,000", "$15,000+"];
export const timelines = ["As soon as possible", "Within a month", "1 – 3 months", "Flexible"];

// ---------------------------------------------------------------------------
// v2 interactive content
// ---------------------------------------------------------------------------

/** 3D keyboard on the Stack page: one skill per letter key. `cat` drives the playground filters. */
export const keySkills = {
  R: { name: "React", cat: "front", c: "#4c6bff", at: "3Columns, DevSecRoot, own products", projects: ["vmaas", "shieldguard", "lumishot", "skillverse"], note: "Hooks, Redux and Context; lazy loading and list virtualisation for big screens." },
  N: { name: "Node.js", cat: "back", c: "#3ddc97", at: "3Columns, DevSecRoot", projects: ["vmaas", "shieldguard", "autorox", "notes"], note: "REST services with validation middleware, structured logging and clean error handling." },
  M: { name: "MongoDB", cat: "back", c: "#2bb673", at: "3Columns, DevSecRoot", projects: ["vmaas", "autorox", "ecommerce", "notes"], note: "Schema design and aggregation pipelines tuned for speed." },
  T: { name: "TypeScript", cat: "front", c: "#4c6bff", at: "Own products", projects: ["repoatlas", "lumishot", "tangerine", "skillverse"], note: "End-to-end types across Next.js, Electron and Vite apps." },
  E: { name: "Express", cat: "back", c: "#9ba3c0", at: "3Columns, DevSecRoot", projects: ["vmaas", "shieldguard", "autorox", "ecommerce"], note: "Routing, middleware and API structure for multi-tenant platforms." },
  X: { name: "Next.js", cat: "front", c: "#eef0f8", at: "Own products, team work", projects: ["repoatlas"], note: "Server rendering and API routes; also used on the 21 Spades team project." },
  D: { name: "Docker", cat: "cloud", c: "#4c6bff", at: "3Columns, own products", projects: ["repoatlas"], note: "Containerised development and deploys with docker-compose." },
  A: { name: "AWS", cat: "cloud", c: "#ffb01f", at: "3Columns", projects: [], note: "EC2 and S3 deployments for production apps." },
  J: { name: "Jenkins", cat: "cloud", c: "#ff5c9a", at: "DevSecRoot", projects: [], note: "CI/CD pipelines that build, test and ship releases." },
  L: { name: "Elasticsearch", cat: "back", c: "#ffb01f", at: "Work", projects: ["shieldguard"], note: "Log search and alert queries, from simple to complex." },
  P: { name: "Prisma", cat: "back", c: "#eef0f8", at: "Own products", projects: ["repoatlas"], note: "Typed database access and migrations." },
  K: { name: "Redux", cat: "front", c: "#9b5cff", at: "3Columns, DevSecRoot", projects: ["vmaas", "ecommerce"], note: "Predictable state for large dashboards." },
  I: { name: "Electron", cat: "desk", c: "#9b5cff", at: "Own products", projects: ["lumishot", "tangerine"], note: "Tray apps, global hotkeys, native modules and installers." },
  F: { name: "FFmpeg", cat: "desk", c: "#ff8a1f", at: "Own products", projects: ["tangerine"], note: "Audio, video and GIF conversion pipelines." },
  G: { name: "Git", cat: "cloud", c: "#ff5c9a", at: "Everywhere", projects: [], note: "GitHub, GitLab and Bitbucket flows with reviewed pull requests." },
  S: { name: "Tailwind", cat: "front", c: "#3ddc97", at: "Own and team projects", projects: ["notes"], note: "Fast, consistent styling with design tokens." },
  Z: { name: "Zustand", cat: "front", c: "#ffb01f", at: "Own and team projects", projects: ["notes"], note: "Light state for apps that don't need Redux." },
  W: { name: "WebSockets", cat: "back", c: "#4c6bff", at: "Team projects", projects: [], note: "Real-time chat and live updates." },
  O: { name: "OAuth", cat: "back", c: "#3ddc97", at: "3Columns", projects: ["vmaas"], note: "Sign-in with OAuth and JWT, plus role-based access control." },
  Y: { name: "Playwright", cat: "cloud", c: "#2bb673", at: "Own products", projects: ["repoatlas"], note: "End-to-end tests that run before every release." },
  U: { name: "Material UI", cat: "front", c: "#4c6bff", at: "Work and client projects", projects: [], note: "Also Ant Design, Bootstrap and Styled Components." },
  H: { name: "HTML/CSS", cat: "front", c: "#ff8a1f", at: "Everywhere", projects: [], note: "Accessible, responsive markup as the base of every UI." },
  C: { name: "CI/CD", cat: "cloud", c: "#9b5cff", at: "3Columns, DevSecRoot", projects: [], note: "Automated build, test and deploy steps." },
  V: { name: "Vite", cat: "front", c: "#9b5cff", at: "Own products", projects: ["skillverse", "lumishot"], note: "Fast builds for React and Electron front ends." },
  Q: { name: "Jira", cat: "cloud", c: "#4c6bff", at: "3Columns, DevSecRoot", projects: [], note: "Agile sprints with QA and design." },
  B: { name: "Ant Design", cat: "front", c: "#e5484d", at: "Client and team projects", projects: [], note: "Component library used for Umiya Biotech and 21 Spades." },
};

export const skillAreas = { front: "Frontend", back: "Backend and data", cloud: "Cloud and tooling", desk: "Desktop" };

/** Time-zone globe on the About page. */
export const homeCity = { n: "Indore", tz: "Asia/Kolkata", lat: 22.72, lon: 75.86 };
export const cities = [
  { n: "London", tz: "Europe/London", lat: 51.5, lon: -0.13 },
  { n: "New York", tz: "America/New_York", lat: 40.7, lon: -74 },
  { n: "San Francisco", tz: "America/Los_Angeles", lat: 37.8, lon: -122.4 },
  { n: "Berlin", tz: "Europe/Berlin", lat: 52.5, lon: 13.4 },
  { n: "Dubai", tz: "Asia/Dubai", lat: 25.2, lon: 55.3 },
  { n: "Singapore", tz: "Asia/Singapore", lat: 1.35, lon: 103.8 },
  { n: "Sydney", tz: "Australia/Sydney", lat: -33.9, lon: 151.2 },
];

/** "What I'm doing now" panel on the home page. Keep it current. */
export const nowItems = [
  "Taking on freelance web and desktop projects",
  "Building production MERN apps as a full-stack developer at 3Columns",
  "Working on Lumishot, a screenshot app for Windows",
  "Writing up how I tune MongoDB aggregation pipelines",
];

/** Notes page. `status: "planned"` shows as coming soon; add `href` once a post is live. */
export const notes = [
  { tag: "MongoDB", title: "Making aggregation pipelines fast", text: "Indexes, $match placement and when to precompute, with before and after timings.", mins: 6, status: "planned" },
  { tag: "Security", title: "Role-based access in a MERN app", text: "JWT, refresh tokens and permission checks that live in one place.", mins: 8, status: "planned" },
  { tag: "Electron", title: "Shipping a Windows app with a real installer", text: "Global hotkeys, tray icons, code signing and auto-updates for Lumishot.", mins: 7, status: "planned" },
  { tag: "React", title: "Rendering 10,000 rows without stalling", text: "List virtualisation, memoisation and when not to bother.", mins: 5, status: "planned" },
  { tag: "Three.js", title: "How this site's 3D desk works", text: "A throwable tile with a spring, a raycaster and sixty lines of physics.", mins: 6, status: "planned" },
];
