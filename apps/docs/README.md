# Docs site

Documentation site for `@jacopozanti/ui` — [docs.ui.jz.land](https://docs.ui.jz.land).
TanStack Start (SSR) + Tailwind v4, themed by the library's own tokens.

```bash
npm ci
npm run dev        # http://localhost:3002
npm run build      # nitro output in .output/
npm run typecheck
```

Installs independently of the library: its own `package.json`, lockfile and
`node_modules`, and its own CI job.

## What it renders

The site resolves `@jacopozanti/ui` to the repo's `src/`, not to a published
package (see `vite.config.ts`). So `npm run dev` needs no build upstairs, and a
page can never show a component that no longer looks like its source.

That has one consequence worth knowing: the library is a separate npm project
with its own `node_modules`, so a bare `react` inside its files would resolve to
*its* copy. Two Reacts share no hook dispatcher and every page comes back empty —
hence `resolve.dedupe` in the Vite config, and the matching `paths` entries in
`tsconfig.json` that keep tsc seeing one set of React types.

## How the content works

Nothing under `src/generated/` is hand-written. `scripts/generate.mjs` runs before
`dev`, `build` and `typecheck`, and turns the library's own files into:

- **`components.json`** — one entry per `src/components/ui/*.tsx`: its exports,
  the Base UI submodules and sibling components it builds on, and its full source,
  syntax-highlighted at build time with Shiki. A component added upstairs appears
  here, with no edit to this app.
- **`meta.json`** — version, dependency counts, and the design tokens parsed out
  of `src/styles/theme.css`, which is what the `/tokens` page tabulates.

It also writes `public/sitemap.xml` and `public/robots.txt`.

The one thing the generator cannot derive is what a component should look like in
use. That is `src/demos/<name>.tsx` — one default-exported component each,
collected by glob. Adding a file is the whole step; a component without one still
gets a page, with a note in place of the preview.

## Before the first deploy

Set the real hostname in [`src/lib/site.ts`](src/lib/site.ts): canonical URLs, OG
tags and the sitemap all derive from `SITE.url`, and a wrong value there is
invisible locally and wrong in production.
