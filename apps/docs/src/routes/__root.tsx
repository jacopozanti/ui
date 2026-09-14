import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import appCss from "#/styles.css?url";
import { SITE } from "#/lib/site";
import { seo } from "#/lib/seo";
import { SiteFooter, SiteHeader } from "#/components/site-chrome";

/*
 * Runs before first paint: the server cannot know which theme this visitor
 * chose, so the class is applied here rather than in an effect. Without it the
 * page renders light and then flips, on every navigation to the site.
 */
const THEME_SCRIPT = `
try {
	var stored = localStorage.getItem("theme");
	var dark = stored ? stored === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
	if (dark) document.documentElement.classList.add("dark");
} catch (e) {}
`;

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			...seo({ title: SITE.title, exact: true }).meta,
		],
		links: [
			{ rel: "stylesheet", href: appCss },
			{ rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
		],
	}),
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang={SITE.locale} suppressHydrationWarning>
			<head>
				<HeadContent />
				<script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
			</head>
			<body className="min-h-screen">
				{/* First tab stop on every page. */}
				<a
					href="#main"
					className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
				>
					Skip to content
				</a>
				<SiteHeader />
				<main id="main">{children}</main>
				<SiteFooter />
				{/* Dev only: `import.meta.env.DEV` is a compile-time constant, so the
				    production build drops this branch and the panels with it. */}
				{import.meta.env.DEV && (
					<TanStackDevtools
						config={{ position: "bottom-right" }}
						plugins={[
							{ name: "TanStack Router", render: <TanStackRouterDevtoolsPanel /> },
						]}
					/>
				)}
				<Scripts />
			</body>
		</html>
	);
}
