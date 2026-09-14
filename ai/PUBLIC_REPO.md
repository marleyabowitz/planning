# Public repository safety

This repo is **public** on GitHub so the site can be hosted free on GitHub Pages.

Anything committed can be seen by anyone. The built site is also public on the internet.

## Always warn the user before adding

Stop and warn clearly if the user asks to put any of the following in the repo, site source, README, notes content that ships with the build, or commit history:

- Passwords, API keys, tokens, `.env` files, private keys, session cookies
- Personal contact details they would not want public (phone, home address, private email)
- Medical, financial, school, work-confidential, or legal information
- Private calendar details, journal entries, or notes meant only for them
- Screenshots or files that include sensitive text
- Third-party secrets or someone else’s private data

Default advice: keep sensitive content in **local-only** storage the user controls, or a private backend later — **not** in this public git repo or static site files.

## Safe for this public site

- UI code, styles, build config, GitHub Actions deploy workflow
- Generic placeholder copy
- Client-side `localStorage` for events/todos on **their** browser (not shared via git)

## Agent obligations

1. Before committing or writing user content into tracked files, scan for secrets and personal data.
2. If risk exists: **warn first**, explain why, and suggest a safer approach. Do not silently add it.
3. Never invent or paste example secrets into the repo “for demo.”
4. Remind the user that `localStorage` data stays on each device and is **not** what GitHub Pages serves from the repo — but any text hardcoded in source **is** public.
