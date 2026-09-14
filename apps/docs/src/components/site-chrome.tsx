import { Link } from "@tanstack/react-router";
import { SITE } from "#/lib/site";
import { ThemeToggle } from "#/components/theme-toggle";
import meta from "#/generated/meta.json";

export function SiteHeader() {
	return (
		<header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
			<div className="mx-auto flex h-14 max-w-6xl items-center gap-6 px-4">
				<Link to="/" className="font-medium tracking-tight">
					{SITE.name}
				</Link>
				<nav className="flex items-center gap-4 text-sm text-muted-foreground">
					<Link
						to="/components"
						className="transition hover:text-foreground [&.active]:text-foreground"
					>
						Components
					</Link>
					<Link
						to="/tokens"
						className="transition hover:text-foreground [&.active]:text-foreground"
					>
						Tokens
					</Link>
				</nav>
				<div className="ml-auto flex items-center gap-3 text-sm text-muted-foreground">
					<span className="hidden font-mono text-xs sm:inline">v{meta.version}</span>
					<a href={SITE.repo} className="transition hover:text-foreground">
						GitHub
					</a>
					<ThemeToggle />
				</div>
			</div>
		</header>
	);
}

export function SiteFooter() {
	return (
		<footer className="border-t">
			<div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-8 text-sm text-muted-foreground">
				<p>
					{meta.componentCount} components, {meta.demoCount} with a live example. Every
					page on this site is generated from the library's own source.
				</p>
				<p>
					<a href={SITE.npm} className="underline-offset-4 hover:underline">
						npm
					</a>
					{" · "}
					<a href={SITE.repo} className="underline-offset-4 hover:underline">
						source
					</a>
				</p>
			</div>
		</footer>
	);
}
