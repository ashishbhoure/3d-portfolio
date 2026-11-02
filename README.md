# Ashish Bhoure, portfolio

Personal site with pages for home, work (with a case-study page per project), services, about, résumé and contact.

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

The enquiry form sends through **Web3Forms** when `VITE_WEB3FORMS_KEY` is set (free key from
web3forms.com; there is no mailbox login that can expire), otherwise through EmailJS:

```
VITE_WEB3FORMS_KEY=...
# or
VITE_APP_EMAILJS_SERVICE_ID=...
VITE_APP_EMAILJS_TEMPLATE_ID=...
VITE_APP_EMAILJS_PUBLIC_KEY=...
```

Put them in `.env.local` (git-ignored) and in your hosting provider's environment settings.
If sending fails, the form offers a prefilled email and WhatsApp instead.

## Editing content

Everything shown on the site lives in `src/data.js`: projects, jobs, skills, services, process,
team, FAQ, availability and testimonials (add real quotes there and the section appears). Project screenshots go in `src/assets/projects/`.
