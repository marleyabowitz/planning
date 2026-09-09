# Planning

A simple personal planner site: weekly calendar, to-do list, and a Notes placeholder. Built with Vite and TypeScript for static hosting on GitHub Pages.

## Local development

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173/planning/`).

```bash
npm run build    # production build to dist/
npm run preview  # preview the production build
```

## Features

- **Home** — current week (Mon–Sun), add/remove events, to-do list
- **Notes** — placeholder page via the Menu dropdown
- Data is stored in the browser with `localStorage` (device-local)

## GitHub Pages

The site is configured with `base: '/planning/'` in `vite.config.ts` for a project site at `https://<user>.github.io/planning/`.

1. Push this repo to GitHub (name it `planning`, or change `base` to match your repo name).
2. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Push to `main` (or `master`); the workflow in `.github/workflows/deploy.yml` builds and deploys `dist/`.

If you later use a custom domain or a `username.github.io` root repo, set `base: '/'` in `vite.config.ts`.

## Stack

- Vite + TypeScript (multi-page HTML)
- Plain CSS (Times New Roman, minimal styling)
- No backend or authentication
