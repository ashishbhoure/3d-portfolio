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
