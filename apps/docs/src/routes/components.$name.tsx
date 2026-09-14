import { createFileRoute, notFound } from "@tanstack/react-router";

import { CodeBlock } from "#/components/code-block";
import { Preview } from "#/components/preview";
import { demos } from "#/components/demo-registry";
import { seo } from "#/lib/seo";
import data from "#/generated/components.json";

export const Route = createFileRoute("/components/$name")({
	loader: ({ params }) => {
		const component = data.components.find((c) => c.name === params.name);
		if (!component) throw notFound();
		return component;
	},
	head: ({ loaderData }) =>
		loaderData
			? seo({
					title: loaderData.title,
					description: `${loaderData.title} from @jacopozanti/ui: live example, source and exports.`,
					path: `/components/${loaderData.name}`,
				})
			: {},
	component: ComponentPage,
	notFoundComponent: () => (
		<div className="py-16">
			<h1 className="text-2xl font-medium">No such component</h1>
			<p className="mt-2 text-muted-foreground">
				It is not in this version of the library.
			</p>
		</div>
	),
});

function ComponentPage() {
	const component = Route.useLoaderData();
	const Demo = demos[component.name];

	return (
		<article>
			<header>
				<div className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
					{component.group}
				</div>
				<h1 className="mt-1 text-2xl font-medium tracking-tight">{component.title}</h1>
				<p className="mt-2 text-sm text-muted-foreground">
					{component.exports.length} export
					{component.exports.length === 1 ? "" : "s"} · {component.lines} lines
				</p>
			</header>

			<section className="mt-6">
				{Demo ? (
					<Preview component={Demo} />
				) : (
					<div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
						No example yet. Add <code className="font-mono">src/demos/{component.name}.tsx</code>{" "}
						and it appears here.
					</div>
				)}
			</section>

			{component.demoHtml && (
				<section className="mt-4">
					<h2 className="mb-2 text-sm font-medium">Example</h2>
					<CodeBlock html={component.demoHtml} />
				</section>
			)}

			<section className="mt-8">
				<h2 className="text-sm font-medium">Exports</h2>
				<ul className="mt-2 flex flex-wrap gap-1.5">
					{component.exports.map((name) => (
						<li
							key={name}
							className="rounded-md border px-2 py-0.5 font-mono text-xs text-muted-foreground"
						>
							{name}
						</li>
					))}
				</ul>
			</section>

			{(component.deps.baseUi.length > 0 || component.deps.components.length > 0) && (
				<section className="mt-6 grid gap-4 sm:grid-cols-2">
					{component.deps.baseUi.length > 0 && (
						<div>
							<h2 className="text-sm font-medium">Base UI</h2>
							<ul className="mt-2 flex flex-col gap-1 font-mono text-xs text-muted-foreground">
								{component.deps.baseUi.map((m) => (
									<li key={m}>{m}</li>
								))}
							</ul>
						</div>
					)}
					{component.deps.components.length > 0 && (
						<div>
							<h2 className="text-sm font-medium">Builds on</h2>
							<ul className="mt-2 flex flex-col gap-1 font-mono text-xs text-muted-foreground">
								{component.deps.components.map((m) => (
									<li key={m}>{m}</li>
								))}
							</ul>
						</div>
					)}
				</section>
			)}

			<section className="mt-8">
				<h2 className="mb-2 text-sm font-medium">Source</h2>
				<p className="mb-2 text-sm text-muted-foreground">
					Exactly what is in the repo — the library does not fork what shadcn publishes.
				</p>
				<CodeBlock html={component.sourceHtml} />
			</section>
		</article>
	);
}
