# Project overview

Personal planner website for **one user** (Marley). Hosted for free on **GitHub Pages** from the public repo `marleyabowitz/planning`.

## Goals

- Simple, chic, plain UI — **Times New Roman** only
- Home: weekly calendar + to-do list
- Menu dropdown: Home, Algos, Probability, AI, Languages, BC1014, Cantor, Career
- Mobile-friendly (may later wrap the live URL in a mobile WebView/app)
- No auth, no backend in v1

## Stack (locked)

- **Vite + TypeScript + multi-page HTML/CSS** (not React/Next)
- Static build → `dist/` → GitHub Pages
- Persistence: browser **`localStorage`** only (`planning:events`, `planning:todos`)
- Vite `base`: `/planning/` (must match the GitHub repo name for project Pages)

## Repo map

```
index.html              Home page shell
algos.html … career.html  Topic page shells (shared topic.ts)
vite.config.ts          Multi-page inputs + base path
src/main.ts             Home boot (nav + calendar + todo)
src/topic.ts            Topic page boot (nav + placeholder)
src/nav.ts              Shared header + accessible dropdown
src/calendar.ts         Week view (Mon–Sun) + events
src/todo.ts             To-do list
src/storage.ts          Typed localStorage helpers
src/styles/global.css   Global design tokens + layout
.github/workflows/deploy.yml   Pages deploy on push to main
ai/                     Briefing for AI agents (this folder)
```

## Commands

```bash
npm install
npm run dev       # http://localhost:5173/planning/
npm run build     # tsc + vite build → dist/
npm run preview   # preview production build
```

## Design constraints

- Off-white background, near-black text, thin borders, generous whitespace
- No decorative cards, purple gradients, glows, or emoji UI
- Accessible nav: button menu, Esc / outside click to close
- Touch-friendly controls (~44px) where interactive

## Out of scope unless asked

Auth, backend/sync, real notes editor, monthly calendar, PWA/service worker, native app shell.
