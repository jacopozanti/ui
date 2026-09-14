import { Link, Outlet, createFileRoute } from "@tanstack/react-router";

import data from "#/generated/components.json";

export const Route = createFileRoute("/components")({
	component: ComponentsLayout,
});

function ComponentsLayout() {
	return (
		<div className="mx-auto flex max-w-6xl gap-10 px-4 py-10">
			<nav className="hidden w-52 shrink-0 md:block">
				<div className="sticky top-24 flex max-h-[calc(100vh-8rem)] flex-col gap-5 overflow-y-auto pb-8">
					{data.groups.map((group) => (
						<div key={group}>
							<div className="mb-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
								{group}
							</div>
							<ul className="flex flex-col">
								{data.components
									.filter((c) => c.group === group)
									.map((c) => (
										<li key={c.name}>
											<Link
												to="/components/$name"
												params={{ name: c.name }}
												className="block rounded-md px-2 py-1 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground [&.active]:bg-muted [&.active]:text-foreground"
											>
												{c.title}
											</Link>
										</li>
									))}
							</ul>
						</div>
					))}
				</div>
			</nav>
			<div className="min-w-0 flex-1">
				<Outlet />
			</div>
		</div>
	);
}
