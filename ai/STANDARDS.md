# Coding standards for agents

## Accuracy

- Use only facts from this repo, `ai/` docs, or tools you actually run. Do not invent APIs, files, or deploy steps.
- If something is unknown, check the file or ask — do not guess and present it as fact.
- Prefer citing real paths (`src/calendar.ts`, `vite.config.ts`) over vague descriptions.

## Best practices

- Match existing patterns: small TypeScript modules, semantic HTML, shared CSS tokens in `src/styles/global.css`.
- Keep the stack static and GitHub Pages–compatible. Do not add a server, secrets in client code, or SPA-only routing that breaks Pages.
- Preserve Times New Roman and the plain visual language unless the user asks to change design.
- Type storage and shared helpers; escape user text before injecting into HTML.
- Prefer focused diffs. No drive-by refactors, unrelated renames, or unsolicited docs outside the task.
- Do not commit unless the user asks. Do not force-push or change git config.

## Double-check before finishing

1. Does the change match the user’s request and existing conventions?
2. Could anything private or secret end up in the public repo? (See [PUBLIC_REPO.md](./PUBLIC_REPO.md).)
3. Will `base: '/planning/'` and multi-page links (`./`, `./algos.html`, etc.) still work?
4. Run `npm run build` after TS/HTML/CSS/config changes; fix errors before claiming done.
5. For UI work, consider mobile layout (week grid stacks on narrow screens).

## When adding features

- New pages: real HTML entry + Vite `rollupOptions.input` entry (same pattern as `algos.html`).
- New persisted data: extend `src/storage.ts` with typed keys — no ad-hoc `localStorage` strings.
- Shared chrome: reuse `nav.ts` / `navMarkup`.
