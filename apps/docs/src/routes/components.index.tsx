import { Link, createFileRoute } from "@tanstack/react-router";

import { seo } from "#/lib/seo";
import data from "#/generated/components.json";

export const Route = createFileRoute("/components/")({
	head: () => ({
		...seo({
			title: "Components",
			description: `All ${data.components.length} components in @jacopozanti/ui, with live examples and source.`,
			path: "/components",
		}),
	}),
	component: ComponentsIndex,
});

function ComponentsIndex() {
	return (
		<div>
			<h1 className="text-2xl font-medium tracking-tight">Components</h1>
			<p className="mt-2 text-muted-foreground">
				{data.components.length} components, grouped the way you reach for them.
			</p>

			{data.groups.map((group) => (
				<section key={group} className="mt-8">
					<h2 className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
						{group}
					</h2>
					<ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
						{data.components
							.filter((c) => c.group === group)
							.map((c) => (
								<li key={c.name}>
									<Link
										to="/components/$name"
										params={{ name: c.name }}
										className="block rounded-lg border p-3 transition hover:bg-muted"
									>
										<div className="text-sm font-medium">{c.title}</div>
										<div className="mt-0.5 text-xs text-muted-foreground">
											{c.exports.length} export{c.exports.length === 1 ? "" : "s"}
										</div>
									</Link>
								</li>
							))}
					</ul>
				</section>
			))}
		</div>
	);
}
