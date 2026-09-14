import { SITE } from "./site";

/**
 * Meta tags for one page. `exact` keeps the title as given (the home page);
 * everything else is suffixed with the site name.
 */
export function seo({
	title,
	description = SITE.description,
	path,
	exact = false,
}: {
	title: string;
	description?: string;
	path?: string;
	exact?: boolean;
}) {
	const fullTitle = exact ? title : `${title} — ${SITE.name}`;
	const url = path ? `${SITE.url}${path}` : SITE.url;

	return {
		meta: [
			{ title: fullTitle },
			{ name: "description", content: description },
			{ property: "og:type", content: "website" },
			{ property: "og:title", content: fullTitle },
			{ property: "og:description", content: description },
			{ property: "og:url", content: url },
			{ property: "og:site_name", content: SITE.name },
			{ name: "twitter:card", content: "summary_large_image" },
			{ name: "twitter:title", content: fullTitle },
			{ name: "twitter:description", content: description },
		],
		links: [{ rel: "canonical", href: url }],
	};
}
