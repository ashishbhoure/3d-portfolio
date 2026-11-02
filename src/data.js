import repoatlasShot from "./assets/projects/repoatlas.webp";
import skillverseShot from "./assets/projects/skillverse.webp";

export const profile = {
  name: "Ashish Bhoure",
  email: "ashishbhoure@gmail.com",
  github: "https://github.com/ashishbhoure",
  linkedin: "https://www.linkedin.com/in/ashish-bhoure-945717204/",
  resume: "/Ashish-Bhoure-Resume.pdf",
};

/**
 * Featured work. `pane` drives the floating window in the 3D hero:
 * either a screenshot (`image`) or a procedural mock (`mock`).
 */
export const featured = [
  {
    id: "lumishot",
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
    image: repoatlasShot,
    pane: { image: repoatlasShot, accent: "#2E4BFF" },
  },
  {
    id: "skillverse",
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
    image: skillverseShot,
    pane: { image: skillverseShot, accent: "#12B5A6" },
  },
  {
    id: "tangerine",
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

/** Newest first. */
export const timeline = [
  {
    when: "2023 – now",
    title: "Freelance full-stack developer",
    where: "Self-employed, remote",
    detail:
      "Build web apps, admin panels and desktop tools for individuals and small businesses, from first sketch to deployment.",
  },
  {
    when: "2020 – 2025",
    title: "Integrated M.Tech, Information Technology",
    where: "International Institute of Professional Studies, DAVV Indore",
    detail: "Graduated with a CGPA of 8.14. Data structures and algorithms, operating systems, DBMS and object-oriented design.",
  },
  {
    when: "Certifications",
    title: "Postman API Fundamentals Student Expert, Google Data Analytics",
    where: "Plus programming in Java, Newton School",
  },
];

export const skills = [
  { group: "Languages", items: ["TypeScript", "JavaScript", "Python", "Java", "C++", "PHP"] },
  { group: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "Redux", "Zustand", "Three.js", "React Native"] },
  { group: "Backend and data", items: ["Node.js", "Express", "REST APIs", "MongoDB", "MySQL", "Prisma"] },
  { group: "Desktop", items: ["Electron", "Native modules", "FFmpeg", "sharp"] },
  { group: "Shipping", items: ["Git", "Docker", "Vercel", "Playwright", "Vitest"] },
];
