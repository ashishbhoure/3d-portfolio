# Ashish Bhoure, portfolio

Personal site for Ashish Bhoure: Home, Work (with a case study per project), Services, Stack, About, Notes, Résumé and Contact.

Interactive pieces (all respect reduced motion and fall back without WebGL):

- **Home:** a 3D desk with throwable tech tiles; the monitor cycles project screens and opens the case study on click. Flip-card services, a 3D project carousel, a process path that draws on scroll, and live GitHub activity.
- **Stack:** a 3D keyboard where each key is a skill (click or type), plus a physics playground (matter-js).
- **About:** an ID badge on a verlet-rope lanyard you can swing and flip, and a time-zone globe.
- **Contact:** the enquiry form plus a working terminal (`help`, `projects`, `open <name>`).

three.js and matter-js load only on the pages that use them (`src/three/`).

## Stack

React 18, Vite 5, three.js, matter-js, framer-motion, EmailJS. Plain CSS with design
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
