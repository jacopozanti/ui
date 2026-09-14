import { execFileSync } from "node:child_process";
import { copyFileSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { defineConfig } from "tsup";

const USE_CLIENT = '"use client";\n';

function addUseClient(file: string) {
	const code = readFileSync(file, "utf8");
	if (code.startsWith('"use client"') || code.startsWith("'use client'")) {
		return;
	}
	// Keep a CJS "use strict" prologue first if present.
	if (code.startsWith("'use strict';")) {
		writeFileSync(
			file,
			code.replace("'use strict';\n", `'use strict';\n${USE_CLIENT}`),
		);
	} else {
		writeFileSync(file, USE_CLIENT + code);
	}
}

function forEachBundle(dir: string, fn: (file: string) => void) {
	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		const path = join(dir, entry.name);
		if (entry.isDirectory()) forEachBundle(path, fn);
		else if (/\.(js|cjs)$/.test(entry.name)) fn(path);
	}
}

export default defineConfig({
	/*
	 * One entry per component, not a single bundle. With everything in one file
	 * a consumer importing `Badge` still executes every top-level import in it —
	 * esbuild drops the unused component functions, but not the 31 Base UI
	 * submodules and the lucide icons they pull. Separate entries plus code
	 * splitting keep each component's imports in its own chunk, so the barrel
	 * costs only what is actually used.
	 */
	entry: ["src/index.ts", "src/components/ui/*.tsx", "src/hooks/*.ts"],
	format: ["esm", "cjs"],
	splitting: true,
	outExtension({ format }) {
		return { js: format === "cjs" ? ".cjs" : ".js" };
	},
	dts: true,
	sourcemap: true,
	clean: true,
	treeshake: true,
	// React is provided by the consumer; every other runtime dependency is
	// declared in package.json and auto-externalized by tsup.
	external: ["react", "react-dom"],
	async onSuccess() {
		// esbuild strips a leading "use client" directive during bundling, so we
		// re-add it to every emitted bundle and shared chunk. Marks the package as
		// React client code for RSC-aware bundlers (Next.js App Router, etc.).
		forEachBundle("dist", addUseClient);
		// Ship the design-token stylesheet.
		copyFileSync("src/styles/theme.css", "dist/theme.css");
		// Tokens-only variant: identical, minus the `@source` that makes Tailwind
		// scan our bundles. Hosts that don't re-theme (and just import the
		// precompiled styles.css) import this instead and pay no extra CSS.
		writeFileSync(
			"dist/tokens.css",
			readFileSync("src/styles/theme.css", "utf8").replace(
				/^@source\s+[^;]+;\s*$/m,
				"/* Tailwind source scanning intentionally left out — import\n * \"@jacopozanti/ui/theme.css\" instead if you re-theme with Tailwind. */",
			),
			"utf8",
		);
		// Compile a standalone stylesheet (utilities the components use + tokens,
		// no Tailwind preflight) so consumers WITHOUT Tailwind can just
		// `import "@jacopozanti/ui/styles.css"`. Scans the built bundles.
		execFileSync(
			"npx",
			[
				"@tailwindcss/cli",
				"-i",
				"src/styles/build.css",
				"-o",
				"dist/styles.css",
				"--minify",
			],
			{ stdio: "inherit" },
		);
	},
});
