import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/*
 * The base-vega components are written against shadcn's custom variants, not
 * Tailwind's built-in `data-*` ones. When theme.css was first generated from
 * the registry it carried the tokens and not these, and nothing failed: a
 * variant that is not defined is not an error, it is a selector that matches
 * nothing. The slider shipped at zero width and invisible because of it.
 *
 * jsdom does no layout, so this cannot be caught by rendering. It is caught
 * here instead, by the only thing that has to be true: every custom variant a
 * component uses is defined where the components' CSS is built.
 */
const CUSTOM_VARIANTS = [
	"data-open",
	"data-closed",
	"data-checked",
	"data-unchecked",
	"data-selected",
	"data-disabled",
	"data-active",
	"data-horizontal",
	"data-vertical",
];

const root = join(__dirname, "..");
const theme = readFileSync(join(root, "src/styles/theme.css"), "utf8");
const componentsDir = join(root, "src/components/ui");
const sources = readdirSync(componentsDir)
	.filter((f) => f.endsWith(".tsx"))
	.map((f) => readFileSync(join(componentsDir, f), "utf8"))
	.join("\n");

describe("theme.css", () => {
	it.each(CUSTOM_VARIANTS.filter((v) => new RegExp(`[\\s"'\`:]${v}:`).test(sources)))(
		"defines %s, which the components use",
		(variant) => {
			expect(theme).toMatch(new RegExp(`@custom-variant ${variant}\\b`));
		},
	);

	it("maps orientation to the attribute Base UI actually sets", () => {
		// Base UI writes `data-orientation`; a built-in `[data-horizontal]`
		// selector would match nothing.
		expect(theme).toContain('[data-orientation="horizontal"]');
		expect(theme).toContain('[data-orientation="vertical"]');
	});
});
