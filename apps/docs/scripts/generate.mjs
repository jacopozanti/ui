/*
 * Turns the library's own sources into the site's content.
 *
 * Runs before `dev`, `build` and `typecheck`. Nothing under src/generated/ is
 * hand-written: a component added upstairs shows up here with its real source,
 * its real exports and its real dependencies, or not at all. The one thing the
 * site cannot derive is what a component should *look* like in use — that is
 * `src/demos/<name>.tsx`, and a component without one still gets a page.
 */
import { createHighlighter } from "shiki";
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const app = join(here, "..");
const repo = join(app, "..", "..");
const uiDir = join(repo, "src", "components", "ui");
const outDir = join(app, "src", "generated");

const SITE_URL = "https://docs.ui.jz.land";

/** Sidebar grouping. A component missing here lands in "Other", visibly. */
const GROUPS = [
	["Form", ["input", "textarea", "label", "field", "checkbox", "switch", "radio-group", "select", "native-select", "slider", "input-group", "combobox"]],
	["Overlay", ["dialog", "alert-dialog", "sheet", "drawer", "popover", "tooltip", "hover-card", "dropdown-menu", "context-menu", "menubar", "toast"]],
	["Layout", ["card", "separator", "tabs", "accordion", "collapsible", "scroll-area", "aspect-ratio", "item", "table", "sidebar"]],
	["Feedback", ["alert", "badge", "progress", "skeleton", "spinner", "empty", "kbd", "avatar"]],
	["Navigation", ["breadcrumb", "navigation-menu", "pagination"]],
	["Grouping", ["button", "button-group", "toggle", "toggle-group", "direction"]],
];

const titleCase = (name) =>
	name.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ");

/** Exported symbol names, as written in the file. */
function exportsOf(source) {
	const names = new Set();
	for (const block of source.matchAll(/export\s*(?:type\s*)?\{([^}]*)\}/g)) {
		for (const part of block[1].split(",")) {
			const clean = part.trim().replace(/^type\s+/, "").split(/\s+as\s+/).pop();
			if (clean) names.add(clean.trim());
		}
	}
	for (const m of source.matchAll(/export\s+(?:function|const|class|type|interface)\s+(\w+)/g)) {
		names.add(m[1]);
	}
	return [...names].sort();
}

const uniq = (xs) => [...new Set(xs)].sort();

function dependenciesOf(source) {
	return {
		baseUi: uniq([...source.matchAll(/from\s+"(@base-ui\/react[^"]*)"/g)].map((m) => m[1])),
		icons: uniq([...(source.match(/\b[A-Z]\w*Icon\b/g) ?? [])]),
		components: uniq(
			[...source.matchAll(/from\s+"@\/components\/ui\/([^"]+)"/g)].map((m) => m[1]),
		),
	};
}

/** Design tokens, read straight out of the stylesheet that ships them. */
function tokens() {
	const css = readFileSync(join(repo, "src", "styles", "theme.css"), "utf8");
	const read = (selector) => {
		const block = css.match(new RegExp(`\\t${selector} \\{([\\s\\S]*?)\\n\\t\\}`));
		if (!block) throw new Error(`theme.css: no ${selector} block — did its shape change?`);
		return Object.fromEntries(
			[...block[1].matchAll(/--([\w-]+):\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]),
		);
	};
	const light = read(":root");
	const dark = read("\\.dark");
	return Object.keys(light).map((name) => ({
		name,
		light: light[name],
		dark: dark[name] ?? light[name],
		// `--radius` is a length; everything else in this file is a color.
		kind: name === "radius" ? "size" : "color",
	}));
}

const highlighter = await createHighlighter({
	themes: ["github-light", "github-dark"],
	langs: ["tsx", "bash", "css", "json"],
});

// Dual themes with `defaultColor: false` emit CSS variables for both palettes,
// so a code block follows the site's light/dark toggle without re-highlighting.
const highlight = (code, lang) =>
	highlighter.codeToHtml(code.trimEnd(), {
		lang,
		themes: { light: "github-light", dark: "github-dark" },
		defaultColor: false,
	});

const demoFiles = new Set(
	readdirSync(join(app, "src", "demos"))
		.filter((f) => f.endsWith(".tsx"))
		.map((f) => basename(f, ".tsx")),
);

const components = readdirSync(uiDir)
	.filter((f) => f.endsWith(".tsx"))
	.map((file) => {
		const name = basename(file, ".tsx");
		const source = readFileSync(join(uiDir, file), "utf8");
		const group = GROUPS.find(([, names]) => names.includes(name))?.[0] ?? "Other";
		const hasDemo = demoFiles.has(name);
		return {
			name,
			title: titleCase(name),
			group,
			hasDemo,
			exports: exportsOf(source),
			deps: dependenciesOf(source),
			lines: source.trimEnd().split("\n").length,
			sourceHtml: highlight(source, "tsx"),
			demoHtml: hasDemo
				? highlight(readFileSync(join(app, "src", "demos", `${name}.tsx`), "utf8"), "tsx")
				: null,
		};
	})
	.sort((a, b) => a.name.localeCompare(b.name));

const pkg = JSON.parse(readFileSync(join(repo, "package.json"), "utf8"));

mkdirSync(outDir, { recursive: true });
writeFileSync(
	join(outDir, "components.json"),
	JSON.stringify(
		{
			groups: [...GROUPS.map(([g]) => g), "Other"].filter((g) =>
				components.some((c) => c.group === g),
			),
			components,
		},
		null,
		"\t",
	),
);
writeFileSync(
	join(outDir, "meta.json"),
	JSON.stringify(
		{
			version: pkg.version,
			dependencies: pkg.dependencies,
			peerDependencies: pkg.peerDependencies,
			componentCount: components.length,
			demoCount: components.filter((c) => c.hasDemo).length,
			tokens: tokens(),
			install: highlight("npm install @jacopozanti/ui", "bash"),
			tailwindSetup: highlight(
				'@import "tailwindcss";\n@import "tw-animate-css";\n@import "@jacopozanti/ui/theme.css";',
				"css",
			),
			plainSetup: highlight('import "@jacopozanti/ui/styles.css";', "tsx"),
		},
		null,
		"\t",
	),
);

const urls = ["/", "/tokens", ...components.map((c) => `/components/${c.name}`)];
writeFileSync(
	join(app, "public", "sitemap.xml"),
	`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
		.map((u) => `\t<url><loc>${SITE_URL}${u}</loc></url>`)
		.join("\n")}\n</urlset>\n`,
);
writeFileSync(
	join(app, "public", "robots.txt"),
	`User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
);

console.log(
	`generated ${components.length} components (${components.filter((c) => c.hasDemo).length} with demos), ${tokens().length} tokens`,
);
