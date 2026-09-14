import { Link, createFileRoute } from "@tanstack/react-router";

import { CodeBlock } from "#/components/code-block";
import { seo } from "#/lib/seo";
import { SITE } from "#/lib/site";
import meta from "#/generated/meta.json";
import data from "#/generated/components.json";

export const Route = createFileRoute("/")({
	head: () => ({ ...seo({ title: SITE.title, exact: true, path: "/" }) }),
	component: Home,
});

function Home() {
	return (
		<div className="mx-auto max-w-6xl px-4">
			<section className="border-b py-16">
				<h1 className="text-3xl font-medium tracking-tight sm:text-4xl">
					{SITE.name}
				</h1>
				<p className="mt-3 max-w-2xl text-muted-foreground">
					shadcn/ui components on the <code className="font-mono">base-vega</code> style
					— Base UI primitives and Tailwind v4 — shipped as a compiled npm package
					rather than a registry. {meta.componentCount} components, kept exactly as
					shadcn publishes them.
				</p>
				<div className="mt-6 flex flex-wrap gap-3">
					<Link
						to="/components"
						className="inline-flex h-9 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:bg-primary/80"
					>
						Browse components
					</Link>
					<a
						href={SITE.repo}
						className="inline-flex h-9 items-center rounded-md border px-4 text-sm font-medium transition hover:bg-muted"
					>
						Source
					</a>
				</div>
			</section>

			<section className="grid gap-10 border-b py-12 md:grid-cols-2">
				<div>
					<h2 className="text-lg font-medium">Install</h2>
					<CodeBlock className="mt-3" html={meta.install} />
					<p className="mt-3 text-sm text-muted-foreground">
						Requires React 19. Components take <code className="font-mono">ref</code> as
						a prop, the way shadcn writes them today.
					</p>
				</div>
				<div>
					<h2 className="text-lg font-medium">Styles</h2>
					<p className="mt-3 text-sm text-muted-foreground">With Tailwind v4:</p>
					<CodeBlock className="mt-2" html={meta.tailwindSetup} />
					<p className="mt-3 text-sm text-muted-foreground">Without Tailwind:</p>
					<CodeBlock className="mt-2" html={meta.plainSetup} />
				</div>
			</section>

			<section className="py-12">
				<h2 className="text-lg font-medium">What ships</h2>
				<dl className="mt-4 grid gap-6 sm:grid-cols-3">
					<div>
						<dt className="text-sm text-muted-foreground">Components</dt>
						<dd className="mt-1 text-2xl">{meta.componentCount}</dd>
					</div>
					<div>
						<dt className="text-sm text-muted-foreground">Runtime dependencies</dt>
						<dd className="mt-1 text-2xl">
							{Object.keys(meta.dependencies).length}
						</dd>
					</div>
					<div>
						<dt className="text-sm text-muted-foreground">Design tokens</dt>
						<dd className="mt-1 text-2xl">{meta.tokens.length}</dd>
					</div>
				</dl>
				<p className="mt-6 max-w-2xl text-sm text-muted-foreground">
					The build emits one entry per component with code splitting, so importing{" "}
					<code className="font-mono">Badge</code> from the barrel costs two Base UI
					submodules rather than the {data.components.length} components' worth the
					library uses in total.
				</p>
			</section>
		</div>
	);
}
