import { createFileRoute } from "@tanstack/react-router";

import { seo } from "#/lib/seo";
import meta from "#/generated/meta.json";

export const Route = createFileRoute("/tokens")({
	head: () => ({
		...seo({
			title: "Design tokens",
			description:
				"The stock shadcn token set (base color neutral) that @jacopozanti/ui ships, in light and dark.",
			path: "/tokens",
		}),
	}),
	component: Tokens,
});

function Swatch({ value }: { value: string }) {
	return (
		<span
			className="inline-block size-5 shrink-0 rounded border"
			style={{ background: value }}
		/>
	);
}

function Tokens() {
	const colors = meta.tokens.filter((t) => t.kind === "color");
	const sizes = meta.tokens.filter((t) => t.kind !== "color");

	return (
		<div className="mx-auto max-w-6xl px-4 py-10">
			<h1 className="text-2xl font-medium tracking-tight">Design tokens</h1>
			<p className="mt-2 max-w-2xl text-muted-foreground">
				The stock shadcn token set, base color <code className="font-mono">neutral</code>,
				generated from the registry and read here straight out of the stylesheet the
				package ships. Override any of them in your own CSS: the defaults live in{" "}
				<code className="font-mono">@layer base</code>, so an app's unlayered theme wins
				whatever the import order.
			</p>

			<div className="mt-8 overflow-x-auto rounded-lg border">
				<table className="w-full text-sm">
					<thead className="border-b bg-muted/50 text-left">
						<tr>
							<th className="px-4 py-2 font-medium">Token</th>
							<th className="px-4 py-2 font-medium">Light</th>
							<th className="px-4 py-2 font-medium">Dark</th>
						</tr>
					</thead>
					<tbody>
						{colors.map((token) => (
							<tr key={token.name} className="border-b last:border-0">
								<td className="px-4 py-2 font-mono text-xs">--{token.name}</td>
								<td className="px-4 py-2">
									<span className="flex items-center gap-2">
										<Swatch value={token.light} />
										<code className="font-mono text-xs text-muted-foreground">
											{token.light}
										</code>
									</span>
								</td>
								<td className="px-4 py-2">
									<span className="flex items-center gap-2">
										<Swatch value={token.dark} />
										<code className="font-mono text-xs text-muted-foreground">
											{token.dark}
										</code>
									</span>
								</td>
							</tr>
						))}
						{sizes.map((token) => (
							<tr key={token.name} className="border-b last:border-0">
								<td className="px-4 py-2 font-mono text-xs">--{token.name}</td>
								<td className="px-4 py-2 font-mono text-xs text-muted-foreground" colSpan={2}>
									{token.light}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
