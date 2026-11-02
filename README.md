# Ashish Bhoure, portfolio

Personal site with pages for home, work (with a case-study page per project), about, résumé and contact.

The hero is a small Three.js scene: one floating app window per featured project, painted onto a
canvas texture at runtime (screenshots where they exist, drawn mock-ups otherwise). It tilts with
the pointer and clicking a window opens that project's case study. The 3D code is lazy-loaded, skipped
without WebGL, and holds still for people who prefer reduced motion.

## Stack

React 18, Vite 5, @react-three/fiber + three, framer-motion, EmailJS. Plain CSS with design
tokens and a light/dark theme.

## Run

```bash
npm install
npm run dev
```

## Contact form

Copy `.env.local.demo` to `.env.local` and fill in the EmailJS keys:

```
VITE_APP_EMAILJS_SERVICE_ID=...
VITE_APP_EMAILJS_TEMPLATE_ID=...
VITE_APP_EMAILJS_PUBLIC_KEY=...
```

Without them the form opens the visitor's mail app instead. `.env.local` is git-ignored; set the
same variables in your hosting provider's settings.

## Editing content

Everything shown on the page lives in `src/data.js`: projects, collaborations, archive,
timeline and skills. Project screenshots go in `src/assets/projects/`.
