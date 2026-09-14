# @jacopozanti/ui

Personal UI library: [shadcn/ui](https://ui.shadcn.com) components on the `base-vega` style
([Base UI](https://base-ui.com) primitives) and Tailwind v4, shipped as a compiled npm
package instead of a registry — you install it and import it, you don't copy the source
into your app.

Components are kept **as shadcn publishes them**. Local changes are a fork, and forks make
`shadcn add` upgrades painful, so anything project-specific belongs in the consuming app.

## Install

```bash
npm install @jacopozanti/ui
```

**49 components**, added with the CLI and kept as shadcn publishes them.

Requires **React 19** (`react` and `react-dom` are peer dependencies). Components are written
the way shadcn writes them today — plain function components taking `ref` as a prop — which
React 18 does not support. `tailwindcss` is an optional peer dependency; see below.

## Styles

Pick one of the two entry points, depending on whether the host app runs Tailwind:

**With Tailwind v4** — import the tokens into your CSS. This also registers the package's
bundle as a Tailwind `@source`, so the utilities the components use get generated with your
own:

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "@jacopozanti/ui/theme.css";
```

`tw-animate-css` is what the eleven animated components (dialog, popover, tooltip,
sheet, the menus…) get `animate-in` / `slide-in-from-*` from — Tailwind has no
such utilities of its own, and shadcn assumes an app's `globals.css` imports it.
It cannot be imported from `theme.css`, because that file is resolved in *your*
`node_modules` and the dependency is optional; leave it out and the overlays
appear and disappear without animating. The precompiled `styles.css` below already
contains them.

**Without Tailwind** — import the precompiled stylesheet. It ships the exact utilities the
components use plus the tokens, and deliberately omits Tailwind's preflight, so it does not
reset your pages:

```ts
import "@jacopozanti/ui/styles.css";
```

There is also `@jacopozanti/ui/tokens.css`: the tokens without the `@source` directive, for
apps that import `styles.css` and only want to re-theme.

## Usage

```tsx
import { Button, Card, CardContent } from "@jacopozanti/ui";

<Button variant="outline" size="sm">Save</Button>
```

Each component is also published at its own subpath, should you prefer it:

```tsx
import { Button } from "@jacopozanti/ui/button";
```

Both cost the same. The build emits one entry per component with code splitting, so the
barrel is not a single bundle: importing `Badge` from `@jacopozanti/ui` pulls two Base UI
submodules, not the thirty-one the whole library uses.

## Documentation

[docs.ui.jz.land](https://docs.ui.jz.land) — every component with a live example,
its source and its exports, plus the token reference. The site lives in
[`apps/docs`](apps/docs) and renders this repo's `src/`, so it cannot drift from
what is documented here.

## Design tokens

`src/styles/theme.css` is the stock shadcn token set (base color `neutral`), generated from
`https://ui.shadcn.com/r/colors/neutral.json` — regenerate it rather than hand-editing if you
want another base color. An app that already has a shadcn theme keeps its own values: the
defaults here ship inside `@layer base`, and unlayered CSS always wins over layered CSS,
whatever the import order.

Two deliberate differences from an application's `globals.css`, both because this is a
package: the token defaults are layered (above), and there is no `body { background; color }`
rule — a library has no business painting the host's page.

Dark mode is driven by a `.dark` class on any ancestor, not just `<html>`.

## Adding a component

`components.json` is configured, so the CLI works as it does in an app:

```bash
npx shadcn@latest add dialog
```

It writes `src/components/ui/dialog.tsx` with `@/...` imports. Then add its
`export * from "@/components/ui/dialog";` line to `src/index.ts` (keep it sorted) and a test
under `tests/`.

What is deliberately **not** installed, because each one drags in a runtime dependency the
rest of the library does not need — add them if and when you want them:

| component | pulls in |
|---|---|
| `calendar` | `react-day-picker`, `date-fns` |
| `carousel` | `embla-carousel-react` |
| `chart` | `recharts` |
| `command` | `cmdk` |
| `input-otp` | `input-otp` |
| `resizable` | `react-resizable-panels` |
| `sonner` | `sonner`, `next-themes` |

`form`, `attachment`, `bubble`, `marker`, `message` and `message-scroller` are not available
on this style at all — shadcn ships them only for Radix and React Aria.

## Working on this repo

`main` is protected by a ruleset: no direct pushes, no force pushes, no
deletion, and both CI checks green before a pull request can merge. Reviews are
not required — GitHub does not let you approve your own pull request, so on a
solo repo any non-zero count would deadlock every PR; the gate is the test
suite instead.

```bash
git switch -c fix/something
git push -u origin fix/something && gh pr create --fill
gh pr merge --squash --delete-branch   # once the checks pass
```

Repository admins can bypass the rules, which is what makes an emergency fix —
or a repair to a CI that is itself broken — possible without disabling
anything. Treat it as the exception it is: a bypassed push skips the checks
that would have caught the thing you are in a hurry about.

## Development

```bash
npm install
npm run dev        # tsup --watch
npm run typecheck
npm test
npm run build
```

`npm run build` produces ESM + CJS bundles with type declarations, re-adds the `"use client"`
directive that esbuild strips (so RSC-aware bundlers treat the package as a client module),
and compiles the three stylesheets into `dist/`.

## License

MIT
