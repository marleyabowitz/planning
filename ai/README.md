# AI project briefing

Start here before exploring the codebase. Prefer these docs over guessing.

| File | Purpose |
|------|---------|
| [PROJECT.md](./PROJECT.md) | What this site is, stack, layout, how to run |
| [STANDARDS.md](./STANDARDS.md) | Coding practices, verification, accuracy |
| [CALENDAR.md](./CALENDAR.md) | Event title prefixes → bubble colors (use when adding calendar events) |
| [PUBLIC_REPO.md](./PUBLIC_REPO.md) | Public GitHub / Pages safety — **read before committing secrets or personal data** |

## Agent checklist (every task)

1. Read the relevant files in this folder first.
2. Follow [STANDARDS.md](./STANDARDS.md): best practices, verify claims, double-check changes.
3. Treat the repo as **public** — follow [PUBLIC_REPO.md](./PUBLIC_REPO.md) and **warn the user** before anything sensitive lands in git or on the site.
4. Only change what the task needs. Do not rewrite unrelated files.
5. After edits: run `npm run build` when TypeScript/config/pages change, and confirm behavior matches the request.
