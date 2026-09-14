import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";

const repoRoot = fileURLToPath(new URL("../..", import.meta.url));

export default defineConfig({
	resolve: {
		tsconfigPaths: true,
		/*
		 * The library is a separate npm project with its own node_modules, so a
		 * bare `react` inside its sources resolves to *its* copy, not this app's.
		 * Two Reacts share no hook dispatcher — the first component that calls
		 * useRef renders null and the page comes back empty. Same for Base UI,
		 * whose providers pass state through context. Force one copy of each.
		 */
		dedupe: [
			"react",
			"react-dom",
			"@base-ui/react",
			"class-variance-authority",
			"cn",
			"lucide-react",
		],
		alias: {
			/*
			 * The site documents the library *in this repo*, not what is on npm:
			 * it resolves `@jacopozanti/ui` to `src/` rather than to a build, so
			 * `npm run dev` needs no `npm run build` upstairs and a page can never
			 * show a component that no longer looks like its source. The published
			 * package is what CI publishes; what this site renders is the truth
			 * the package is built from.
			 */
			"@jacopozanti/ui": `${repoRoot}src/index.ts`,
		},
	},
	// The library's sources live outside this app's root; Vite needs permission
	// to serve them in dev.
	server: { fs: { allow: [repoRoot] } },
	plugins: [devtools(), nitro(), tailwindcss(), tanstackStart(), viteReact()],
});
