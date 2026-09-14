import type { ComponentType } from "react";

/*
 * Every file under src/demos is a page's live example. Collected eagerly and by
 * glob rather than listed by hand: adding `src/demos/<name>.tsx` is the whole
 * step, and a demo whose file is deleted stops existing here instead of
 * throwing at render time.
 */
const modules = import.meta.glob<{ default: ComponentType }>("../demos/*.tsx", {
	eager: true,
});

export const demos: Record<string, ComponentType> = Object.fromEntries(
	Object.entries(modules).map(([path, mod]) => [
		path.replace("../demos/", "").replace(".tsx", ""),
		mod.default,
	]),
);
